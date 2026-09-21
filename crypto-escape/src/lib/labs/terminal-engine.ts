/**
 * Motor do terminal simulado (modo hacker).
 * Tudo roda em memória, no navegador: sistema de arquivos virtual, usuários,
 * permissões e um conjunto pequeno de comandos. Nenhuma rede real é usada.
 */

export interface FileNode {
  type: "file";
  content: string;
  /** Usuários que podem ler; sem isso, qualquer um lê (root sempre lê) */
  only?: string[];
}

export interface DirNode {
  type: "dir";
  children: Record<string, FsNode>;
  only?: string[];
}

export type FsNode = FileNode | DirNode;

export interface Machine {
  hostname: string;
  ip: string;
  fs: DirNode;
  users: Record<string, { home: string; password?: string }>;
  ports: { port: number; service: string }[];
}

export interface Scenario {
  id: string;
  machines: Machine[];
  start: { ip: string; user: string };
  flag: string;
  welcome: string[];
  /** Comandos que aparecem na cola "comandos úteis" */
  commands: string[];
}

export interface Session {
  ip: string;
  user: string;
  cwd: string;
}

export interface TermState extends Session {
  /** Sessões anteriores (para `exit` depois de um `ssh`) */
  stack: Session[];
  /** Aguardando senha de um `ssh` */
  pending: { ip: string; user: string } | null;
}

export interface ExecResult {
  state: TermState;
  lines: string[];
  clear?: boolean;
}

export const COMMAND_HELP: Record<string, string> = {
  help: "mostra esta ajuda",
  ls: "lista arquivos (ls -a mostra os ocultos, ls -l mostra detalhes)",
  cd: "entra em uma pasta (cd .. volta, cd ~ vai para sua pasta)",
  pwd: "mostra a pasta atual",
  cat: "mostra o conteúdo de um arquivo",
  grep: "procura texto (grep palavra arquivo, -i ignora maiúsculas, -r pasta inteira)",
  find: "procura arquivos pelo nome (find / -name '*.txt')",
  whoami: "mostra seu usuário",
  id: "mostra seu usuário e grupos",
  hostname: "mostra o nome da máquina",
  echo: "imprime um texto",
  nmap: "descobre portas abertas (nmap 10.0.0.5)",
  ssh: "conecta em outra máquina (ssh usuario@10.0.0.5)",
  exit: "sai da máquina remota",
  clear: "limpa a tela",
};

export const file = (content: string, only?: string[]): FileNode => ({ type: "file", content, only });
export const dir = (children: Record<string, FsNode> = {}, only?: string[]): DirNode => ({
  type: "dir",
  children,
  only,
});

function machineOf(s: Scenario, ip: string): Machine {
  return s.machines.find((m) => m.ip === ip) ?? s.machines[0];
}

export function initialState(s: Scenario): TermState {
  const m = machineOf(s, s.start.ip);
  return {
    ip: m.ip,
    user: s.start.user,
    cwd: m.users[s.start.user].home,
    stack: [],
    pending: null,
  };
}

/** Texto que aparece antes do cursor (ex.: hacker@kali:~$) */
export function promptOf(s: Scenario, st: TermState): string {
  if (st.pending) return `${st.pending.user}@${st.pending.ip}'s password:`;
  const m = machineOf(s, st.ip);
  const home = m.users[st.user]?.home;
  let cwd = st.cwd;
  if (home && cwd === home) cwd = "~";
  else if (home && cwd.startsWith(home + "/")) cwd = "~" + cwd.slice(home.length);
  return `${st.user}@${m.hostname}:${cwd}$`;
}

function normalize(path: string, cwd: string, home: string): string[] {
  let p = path;
  if (p === "~") p = home;
  else if (p.startsWith("~/")) p = home + p.slice(1);
  const full = p.startsWith("/") ? p : `${cwd}/${p}`;
  const out: string[] = [];
  for (const part of full.split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") out.pop();
    else out.push(part);
  }
  return out;
}

const toPath = (parts: string[]) => "/" + parts.join("/");

function allowed(node: FsNode, user: string): boolean {
  return user === "root" || !node.only || node.only.includes(user);
}

/** Caminha pela árvore; `denied` = algum item do caminho é proibido para o usuário */
function lookup(root: DirNode, parts: string[], user: string): { node: FsNode | null; denied: boolean } {
  let node: FsNode = root;
  if (!allowed(node, user)) return { node, denied: true };
  for (const part of parts) {
    if (node.type !== "dir") return { node: null, denied: false };
    const next: FsNode | undefined = node.children[part];
    if (!next) return { node: null, denied: false };
    node = next;
    if (!allowed(node, user)) return { node, denied: true };
  }
  return { node, denied: false };
}

function tokenize(cmd: string): string[] {
  const out: string[] = [];
  const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(cmd)) !== null) out.push(m[1] ?? m[2] ?? m[3]);
  return out;
}

function splitFlags(args: string[]): { flags: string; rest: string[] } {
  let flags = "";
  const rest: string[] = [];
  for (const a of args) {
    if (/^-[a-zA-Z]+$/.test(a)) flags += a.slice(1);
    else rest.push(a);
  }
  return { flags, rest };
}

function buildMatcher(pattern: string, ignoreCase: boolean): (line: string) => boolean {
  try {
    const re = new RegExp(pattern, ignoreCase ? "i" : "");
    return (line) => re.test(line);
  } catch {
    const p = ignoreCase ? pattern.toLowerCase() : pattern;
    return (line) => (ignoreCase ? line.toLowerCase() : line).includes(p);
  }
}

function walk(
  node: FsNode,
  parts: string[],
  user: string,
  visit: (path: string[], node: FsNode) => void
) {
  visit(parts, node);
  if (node.type !== "dir") return;
  for (const name of Object.keys(node.children).sort()) {
    const child = node.children[name];
    if (!allowed(child, user)) continue;
    walk(child, [...parts, name], user, visit);
  }
}

function globToRegex(glob: string): RegExp {
  const escaped = glob.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".");
  return new RegExp(`^${escaped}$`);
}

function grepLines(lines: string[], matcher: (l: string) => boolean, number: boolean, prefix = ""): string[] {
  const out: string[] = [];
  lines.forEach((line, i) => {
    if (matcher(line)) out.push(`${prefix}${number ? `${i + 1}:` : ""}${line}`);
  });
  return out;
}

function runCommand(s: Scenario, st: TermState, line: string): ExecResult {
  const m = machineOf(s, st.ip);
  const home = m.users[st.user]?.home ?? "/";
  const argv = tokenize(line);
  const cmd = argv[0];
  const args = argv.slice(1);
  const res = (lines: string[], state: TermState = st): ExecResult => ({ state, lines });
  const resolve = (p: string) => normalize(p, st.cwd, home);

  switch (cmd) {
    case "help":
      return res(["Comandos disponíveis:", ...s.commands.map((c) => `  ${c.padEnd(9)} ${COMMAND_HELP[c] ?? ""}`)]);

    case "clear":
      return { state: st, lines: [], clear: true };

    case "pwd":
      return res([st.cwd]);

    case "whoami":
      return res([st.user]);

    case "id":
      return res([`uid=1000(${st.user}) gid=1000(${st.user}) grupos=1000(${st.user})`]);

    case "hostname":
      return res([m.hostname]);

    case "echo":
      return res([args.join(" ")]);

    case "ls": {
      const { flags, rest } = splitFlags(args);
      const parts = rest[0] ? resolve(rest[0]) : normalize(st.cwd, "/", home);
      const { node, denied } = lookup(m.fs, parts, st.user);
      if (denied) return res([`ls: sem permissão para acessar '${rest[0] ?? st.cwd}': Permissão negada`]);
      if (!node) return res([`ls: não foi possível acessar '${rest[0]}': Arquivo ou diretório inexistente`]);
      if (node.type === "file") return res([parts[parts.length - 1]]);
      const showAll = flags.includes("a");
      const names = Object.keys(node.children)
        .filter((n) => showAll || !n.startsWith("."))
        .sort();
      if (flags.includes("l")) {
        return res(
          names.map((n) => {
            const child = node.children[n];
            const kind = child.type === "dir" ? "drwxr-xr-x" : child.only ? "-rw-------" : "-rw-r--r--";
            const owner = child.only?.[0] ?? st.user;
            return `${kind} ${owner.padEnd(6)} ${n}${child.type === "dir" ? "/" : ""}`;
          })
        );
      }
      return res([names.map((n) => (node.children[n].type === "dir" ? `${n}/` : n)).join("  ")].filter(Boolean));
    }

    case "cd": {
      const target = args[0] ?? "~";
      const parts = resolve(target);
      const { node, denied } = lookup(m.fs, parts, st.user);
      if (denied) return res([`bash: cd: ${target}: Permissão negada`]);
      if (!node) return res([`bash: cd: ${target}: Arquivo ou diretório inexistente`]);
      if (node.type !== "dir") return res([`bash: cd: ${target}: Não é um diretório`]);
      return res([], { ...st, cwd: toPath(parts) });
    }

    case "cat": {
      if (!args.length) return res(["cat: informe o arquivo (ex.: cat README.txt)"]);
      const out: string[] = [];
      for (const target of args) {
        const { node, denied } = lookup(m.fs, resolve(target), st.user);
        if (denied) out.push(`cat: ${target}: Permissão negada`);
        else if (!node) out.push(`cat: ${target}: Arquivo ou diretório inexistente`);
        else if (node.type === "dir") out.push(`cat: ${target}: É um diretório`);
        else out.push(...node.content.split("\n"));
      }
      return res(out);
    }

    case "grep": {
      const { flags, rest } = splitFlags(args);
      const [pattern, ...targets] = rest;
      if (!pattern || !targets.length) return res(["uso: grep [-i] [-n] [-r] padrão arquivo"]);
      const matcher = buildMatcher(pattern, flags.includes("i"));
      const number = flags.includes("n");
      const out: string[] = [];
      for (const target of targets) {
        const parts = resolve(target);
        const { node, denied } = lookup(m.fs, parts, st.user);
        if (denied) out.push(`grep: ${target}: Permissão negada`);
        else if (!node) out.push(`grep: ${target}: Arquivo ou diretório inexistente`);
        else if (node.type === "dir") {
          if (!flags.includes("r")) out.push(`grep: ${target}: É um diretório (use -r para buscar dentro)`);
          else {
            walk(node, parts, st.user, (p, n) => {
              if (n.type === "file") out.push(...grepLines(n.content.split("\n"), matcher, number, `${toPath(p)}:`));
            });
          }
        } else {
          const prefix = targets.length > 1 ? `${target}:` : "";
          out.push(...grepLines(node.content.split("\n"), matcher, number, prefix));
        }
      }
      return res(out);
    }

    case "find": {
      const nameIdx = args.indexOf("-name");
      const pattern = nameIdx >= 0 ? args[nameIdx + 1] : undefined;
      const startArg = args[0] && !args[0].startsWith("-") ? args[0] : ".";
      const parts = resolve(startArg);
      const { node, denied } = lookup(m.fs, parts, st.user);
      if (denied) return res([`find: '${startArg}': Permissão negada`]);
      if (!node) return res([`find: '${startArg}': Arquivo ou diretório inexistente`]);
      const re = pattern ? globToRegex(pattern) : null;
      const out: string[] = [];
      walk(node, parts, st.user, (p) => {
        const name = p[p.length - 1] ?? "/";
        if (!re || re.test(name)) out.push(toPath(p));
      });
      return res(out);
    }

    case "nmap": {
      const ip = args.filter((a) => !a.startsWith("-"))[0];
      if (!ip) return res(["uso: nmap <ip>  (ex.: nmap 10.0.0.5)"]);
      const target = s.machines.find((x) => x.ip === ip);
      if (!target) {
        return res([
          "Starting Nmap 7.94 ( https://nmap.org )",
          "Nota: o host parece estar fora do ar (ou não existe).",
          "Nmap done: 1 IP address (0 hosts up)",
        ]);
      }
      return res([
        "Starting Nmap 7.94 ( https://nmap.org )",
        `Nmap scan report for ${target.ip}`,
        "PORT     STATE  SERVICE",
        ...target.ports.map((p) => `${`${p.port}/tcp`.padEnd(8)} open   ${p.service}`),
        `Nmap done: 1 IP address (1 host up) scanned in 0.42 seconds`,
      ]);
    }

    case "ssh": {
      const dest = args.find((a) => !a.startsWith("-"));
      if (!dest) return res(["uso: ssh usuario@ip  (ex.: ssh admin@10.0.0.5)"]);
      const [user, ip] = dest.includes("@") ? dest.split("@") : [st.user, dest];
      const target = s.machines.find((x) => x.ip === ip);
      if (!target) return res([`ssh: connect to host ${ip} port 22: No route to host`]);
      if (!target.ports.some((p) => p.port === 22)) {
        return res([`ssh: connect to host ${ip} port 22: Connection refused`]);
      }
      return res([], { ...st, pending: { ip, user } });
    }

    case "exit": {
      if (!st.stack.length) return res(["Você já está na sua máquina. Use ssh para entrar em outra."]);
      const previous = st.stack[st.stack.length - 1];
      return res(["logout", `Connection to ${st.ip} closed.`], {
        ...previous,
        stack: st.stack.slice(0, -1),
        pending: null,
      });
    }

    case "sudo":
      return res([
        st.user === "root"
          ? "Você já é root."
          : `${st.user} não está no arquivo sudoers. Este incidente será relatado.`,
      ]);

    default:
      return res([`bash: ${cmd}: comando não encontrado (digite help)`]);
  }
}

function handlePassword(s: Scenario, st: TermState, password: string): ExecResult {
  const pending = st.pending!;
  const target = machineOf(s, pending.ip);
  const account = target.users[pending.user];
  if (!account || account.password !== password) {
    return { state: { ...st, pending: null }, lines: ["Permission denied, please try again."] };
  }
  const next: TermState = {
    ip: target.ip,
    user: pending.user,
    cwd: account.home,
    stack: [...st.stack, { ip: st.ip, user: st.user, cwd: st.cwd }],
    pending: null,
  };
  return {
    state: next,
    lines: [`Welcome to ${target.hostname} (Ubuntu 22.04 LTS)`, "Último login: ontem, de 10.0.0.2"],
  };
}

export function execute(s: Scenario, st: TermState, raw: string): ExecResult {
  if (st.pending) return handlePassword(s, st, raw);

  const line = raw.trim();
  if (!line) return { state: st, lines: [] };

  // Suporte simples a "comando | grep padrão"
  if (line.includes("|")) {
    const [first, second, ...extra] = line.split("|").map((p) => p.trim());
    const filter = tokenize(second ?? "");
    if (extra.length || filter[0] !== "grep") {
      return { state: st, lines: ["Neste laboratório só é possível usar um pipe com grep (ex.: cat arquivo | grep senha)"] };
    }
    const { flags, rest } = splitFlags(filter.slice(1));
    if (!rest[0]) return { state: st, lines: ["uso: comando | grep [-i] padrão"] };
    const base = runCommand(s, st, first);
    const matcher = buildMatcher(rest[0], flags.includes("i"));
    return { ...base, lines: grepLines(base.lines, matcher, flags.includes("n")) };
  }

  return runCommand(s, st, line);
}
