/**
 * Motor do terminal simulado.
 * Tudo roda em memória, no navegador: sistema de arquivos virtual editável, usuários,
 * permissões, pipes e um conjunto de comandos parecido com o de um Linux real.
 * Nenhuma rede real é usada.
 */

export interface FileNode {
  type: "file";
  content: string;
  /** Usuários que podem ler; sem isso, vale o modo (permissões). root sempre lê. */
  only?: string[];
  owner?: string;
  /** Permissões em octal (ex.: 0o644). Padrão: 0o644 */
  mode?: number;
  /** Linhas que o "script" imprime quando executado (./arquivo) */
  run?: string[];
}

export interface DirNode {
  type: "dir";
  children: Record<string, FsNode>;
  only?: string[];
  owner?: string;
  /** Padrão: 0o755 */
  mode?: number;
}

export type FsNode = FileNode | DirNode;

export interface Process {
  pid: number;
  user: string;
  cmd: string;
  /** Se existir, matar este processo mostra este aviso extra (ex.: era um serviço legítimo) */
  warnOnKill?: string;
}

export interface Machine {
  hostname: string;
  ip: string;
  fs: DirNode;
  users: Record<string, { home: string; password?: string }>;
  ports: { port: number; service: string }[];
  /** Processos "rodando" na máquina (ps, kill) */
  processes?: Process[];
}

/** Uma tarefa de um laboratório: some da lista de pendências quando `done` fica verdadeiro */
export interface Task {
  label: string;
  done: (st: TermState) => boolean;
}

export interface Scenario {
  id: string;
  machines: Machine[];
  start: { ip: string; user: string };
  /** Se existir, o laboratório também conclui quando esta flag aparece na saída */
  flag?: string;
  welcome: string[];
  /** Comandos que aparecem na cola "comandos úteis" */
  commands: string[];
  /** Se existir, o laboratório conclui quando TODAS as tarefas estiverem feitas */
  tasks?: Task[];
  /** Sequência de comandos que resolve o laboratório (usada pelo verificador) */
  solution?: string[];
  /** Se existir, um cronômetro real (em segundos) aparece; ao chegar a 0 sem concluir, o laboratório "falha" */
  timeLimitSeconds?: number;
  /** Mensagem mostrada quando o tempo acaba */
  timeoutMessage?: string;
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
  /** Sistema de arquivos atual de cada máquina (editável) */
  files: Record<string, DirNode>;
  /** Processos rodando em cada máquina (editável: ps, kill) */
  processes: Record<string, Process[]>;
  /** Comandos digitados (tentativas, funcionando ou não) */
  history: string[];
  /** Só os comandos que funcionaram (sem erro): é o que conta para as tarefas */
  okHistory: string[];
  /** Pastas onde o usuário já esteve (cd) */
  visited: string[];
  /** Eventos especiais, como "exec:backup.sh" */
  events: string[];
}

export interface ExecResult {
  state: TermState;
  lines: string[];
  clear?: boolean;
}

export const COMMAND_HELP: Record<string, string> = {
  help: "mostra esta ajuda",
  pwd: "mostra a pasta atual",
  ls: "lista arquivos (-a mostra os ocultos, -l mostra detalhes e permissões)",
  cd: "entra em uma pasta (cd .. volta, cd ~ vai para a sua pasta, cd / vai para a raiz)",
  cat: "mostra o conteúdo de um arquivo",
  head: "mostra o começo de um arquivo (head -n 3 arquivo)",
  tail: "mostra o fim de um arquivo (tail -n 3 arquivo)",
  wc: "conta linhas, palavras e caracteres (wc -l arquivo conta linhas)",
  echo: 'imprime um texto; com > grava em um arquivo (echo "oi" > arq.txt)',
  mkdir: "cria uma pasta (mkdir -p cria também as pastas do caminho)",
  touch: "cria um arquivo vazio",
  cp: "copia um arquivo (cp origem destino; -r copia pastas)",
  mv: "move ou renomeia (mv origem destino)",
  rm: "APAGA para sempre (rm arquivo; -r apaga pastas)",
  grep: "procura texto (grep palavra arquivo; -i ignora maiúsculas, -n mostra a linha, -v inverte, -c conta, -r pasta inteira)",
  find: "procura arquivos pelo nome (find / -name '*.txt')",
  sort: "ordena linhas (-r inverte, -n numérico)",
  uniq: "junta linhas repetidas vizinhas (-c conta quantas)",
  cut: "recorta colunas (cut -d ' ' -f 4 arquivo)",
  chmod: "muda permissões (chmod +x arquivo, chmod 644 arquivo)",
  ps: "lista os processos rodando (ps ou ps aux)",
  kill: "encerra um processo pelo PID (kill 1337)",
  whoami: "mostra seu usuário",
  id: "mostra seu usuário e grupos",
  hostname: "mostra o nome da máquina",
  nmap: "descobre portas abertas (nmap 10.0.0.5)",
  ssh: "conecta em outra máquina (ssh usuario@10.0.0.5)",
  exit: "sai da máquina remota",
  clear: "limpa a tela",
};

export const file = (content: string, extra: Partial<Omit<FileNode, "type" | "content">> = {}): FileNode => ({
  type: "file",
  content,
  ...extra,
});

/** Atalho antigo: file(conteudo, ["root"]) restringe a leitura a esses usuários */
export const fileOnly = (content: string, only: string[]): FileNode => ({ type: "file", content, only });

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
  const files: Record<string, DirNode> = {};
  const processes: Record<string, Process[]> = {};
  for (const machine of s.machines) {
    files[machine.ip] = structuredClone(machine.fs);
    processes[machine.ip] = structuredClone(machine.processes ?? []);
  }
  const cwd = m.users[s.start.user].home;
  return {
    ip: m.ip,
    user: s.start.user,
    cwd,
    stack: [],
    pending: null,
    files,
    processes,
    history: [],
    okHistory: [],
    visited: [cwd],
    events: [],
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

/** Tarefas concluídas neste momento */
export function tasksDone(s: Scenario, st: TermState): boolean[] {
  return (s.tasks ?? []).map((t) => t.done(st));
}

// ---------------------------------------------------------------- caminhos e permissões

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

/** Bits rwx (0 a 7) que o usuário tem no nó */
function bitsFor(node: FsNode, user: string): number {
  if (user === "root") return 7;
  const mode = node.mode ?? (node.type === "dir" ? 0o755 : 0o644);
  const isOwner = !node.owner || node.owner === user;
  return isOwner ? (mode >> 6) & 7 : mode & 7;
}

const canRead = (node: FsNode, user: string) => allowed(node, user) && (bitsFor(node, user) & 4) !== 0;
const canWrite = (node: FsNode, user: string) => allowed(node, user) && (bitsFor(node, user) & 2) !== 0;
const canExec = (node: FsNode, user: string) => allowed(node, user) && (bitsFor(node, user) & 1) !== 0;

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

const modeString = (node: FsNode): string => {
  const mode = node.mode ?? (node.type === "dir" ? 0o755 : 0o644);
  const rwx = (b: number) => `${b & 4 ? "r" : "-"}${b & 2 ? "w" : "-"}${b & 1 ? "x" : "-"}`;
  return `${node.type === "dir" ? "d" : "-"}${rwx((mode >> 6) & 7)}${rwx((mode >> 3) & 7)}${rwx(mode & 7)}`;
};

// ---------------------------------------------------------------- utilitários de texto

function tokenize(cmd: string): string[] {
  // "-d' '" vira "-d ' '" para o tokenizador
  const fixed = cmd.replace(/(^|\s)-([df])(["'])/g, "$1-$2 $3");
  const out: string[] = [];
  const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(fixed)) !== null) out.push(m[1] ?? m[2] ?? m[3]);
  return out;
}

/** Separa flags (-a, -n 3) dos argumentos. `valueFlags` são as flags que recebem um valor. */
function parseArgs(args: string[], valueFlags: string[] = []) {
  const flags = new Set<string>();
  const values: Record<string, string> = {};
  const rest: string[] = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (/^-\d+$/.test(a)) {
      values.n = a.slice(1); // head -3
    } else if (/^-[a-zA-Z]+$/.test(a)) {
      const letters = a.slice(1).split("");
      letters.forEach((ch, idx) => {
        if (valueFlags.includes(ch) && idx === letters.length - 1) values[ch] = args[++i] ?? "";
        else flags.add(ch);
      });
    } else if (/^-[a-zA-Z]./.test(a) && valueFlags.includes(a[1])) {
      values[a[1]] = a.slice(2);
    } else {
      rest.push(a);
    }
  }
  return { flags, values, rest };
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

function walk(node: FsNode, parts: string[], user: string, visit: (path: string[], node: FsNode) => void) {
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

const splitLines = (content: string): string[] => (content === "" ? [] : content.replace(/\n$/, "").split("\n"));

// ---------------------------------------------------------------- filtros (recebem linhas)

type FilterResult = { lines: string[]; error?: string };

/** Aplica um comando de filtro sobre linhas (vindas de um arquivo ou de um pipe) */
function applyFilter(cmd: string, args: string[], input: string[], withName?: string): FilterResult {
  switch (cmd) {
    case "grep": {
      const { flags, rest } = parseArgs(args);
      const pattern = rest[0];
      if (!pattern) return { lines: [], error: "uso: grep [-i] [-n] [-v] [-c] padrão arquivo" };
      const match = buildMatcher(pattern, flags.has("i"));
      const invert = flags.has("v");
      const out: string[] = [];
      input.forEach((line, i) => {
        if (match(line) !== invert) out.push(`${flags.has("n") ? `${i + 1}:` : ""}${line}`);
      });
      return { lines: flags.has("c") ? [String(out.length)] : out };
    }
    case "wc": {
      const { flags } = parseArgs(args);
      const text = input.join("\n");
      const lines = input.length;
      const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
      const chars = text.length + (input.length ? 1 : 0);
      const suffix = withName ? ` ${withName}` : "";
      if (flags.has("l")) return { lines: [`${lines}${suffix}`] };
      if (flags.has("w")) return { lines: [`${words}${suffix}`] };
      if (flags.has("c")) return { lines: [`${chars}${suffix}`] };
      return { lines: [`${lines} ${words} ${chars}${suffix}`] };
    }
    case "sort": {
      const { flags } = parseArgs(args);
      const sorted = [...input].sort((a, b) => (flags.has("n") ? parseFloat(a) - parseFloat(b) || (a < b ? -1 : 1) : a < b ? -1 : a > b ? 1 : 0));
      return { lines: flags.has("r") ? sorted.reverse() : sorted };
    }
    case "uniq": {
      const { flags } = parseArgs(args);
      const groups: { line: string; n: number }[] = [];
      for (const line of input) {
        const last = groups[groups.length - 1];
        if (last && last.line === line) last.n++;
        else groups.push({ line, n: 1 });
      }
      return { lines: groups.map((g) => (flags.has("c") ? `${String(g.n).padStart(7)} ${g.line}` : g.line)) };
    }
    case "head":
    case "tail": {
      const { values } = parseArgs(args, ["n"]);
      const n = values.n !== undefined ? Math.max(0, parseInt(values.n, 10) || 0) : 10;
      return { lines: cmd === "head" ? input.slice(0, n) : n === 0 ? [] : input.slice(-n) };
    }
    case "cut": {
      const { values } = parseArgs(args, ["d", "f"]);
      const delimiter = values.d ?? "\t";
      const field = parseInt(values.f ?? "", 10);
      if (!field || field < 1) return { lines: [], error: "uso: cut -d ' ' -f 2 arquivo" };
      return { lines: input.map((line) => (line.split(delimiter)[field - 1] ?? "")) };
    }
    default:
      return { lines: [], error: `${cmd}: não pode ser usado depois de um pipe neste laboratório` };
  }
}

const FILTERS = ["grep", "wc", "sort", "uniq", "head", "tail", "cut"];

// ---------------------------------------------------------------- comandos

function cloneFs(st: TermState): DirNode {
  return structuredClone(st.files[st.ip]);
}

function withFs(st: TermState, root: DirNode, extra: Partial<TermState> = {}): TermState {
  return { ...st, ...extra, files: { ...st.files, [st.ip]: root } };
}

function parentOf(root: DirNode, parts: string[]): { parent: DirNode | null; name: string } {
  if (!parts.length) return { parent: null, name: "" };
  const name = parts[parts.length - 1];
  const found = lookup(root, parts.slice(0, -1), "root");
  return { parent: found.node && found.node.type === "dir" ? found.node : null, name };
}

function runCommand(s: Scenario, st: TermState, line: string): ExecResult {
  const m = machineOf(s, st.ip);
  const home = m.users[st.user]?.home ?? "/";
  const fsRoot = st.files[st.ip];
  const argv = tokenize(line);
  const cmd = argv[0];
  const args = argv.slice(1);
  const res = (lines: string[], state: TermState = st): ExecResult => ({ state, lines });
  const resolve = (p: string) => normalize(p, st.cwd, home);
  const read = (p: string) => lookup(fsRoot, resolve(p), st.user);

  // "./script" executa um arquivo
  if (cmd.startsWith("./") || cmd.startsWith("/") && !cmd.includes(" ") && cmd.length > 1 && lookup(fsRoot, resolve(cmd), st.user).node?.type === "file") {
    const { node, denied } = read(cmd);
    if (denied) return res([`bash: ${cmd}: Permissão negada`]);
    if (!node) return res([`bash: ${cmd}: Arquivo ou diretório inexistente`]);
    if (node.type === "dir") return res([`bash: ${cmd}: É um diretório`]);
    if (!canExec(node, st.user)) return res([`bash: ${cmd}: Permissão negada`]);
    const name = cmd.split("/").pop() ?? cmd;
    return res(node.run ?? ["(o script rodou sem imprimir nada)"], { ...st, events: [...st.events, `exec:${name}`] });
  }

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

    case "bash": {
      if (!args[0]) return res(["uso: bash arquivo"]);
      const { node, denied } = read(args[0]);
      if (denied || !node) return res([`bash: ${args[0]}: Arquivo ou diretório inexistente`]);
      if (node.type === "dir") return res([`bash: ${args[0]}: É um diretório`]);
      if (!canRead(node, st.user)) return res([`bash: ${args[0]}: Permissão negada`]);
      return res(node.run ?? ["(o script rodou sem imprimir nada)"], { ...st, events: [...st.events, `exec:${args[0].split("/").pop()}`] });
    }

    case "ls": {
      const { flags, rest } = parseArgs(args);
      const parts = rest[0] ? resolve(rest[0]) : normalize(st.cwd, "/", home);
      const { node, denied } = lookup(fsRoot, parts, st.user);
      if (denied) return res([`ls: sem permissão para acessar '${rest[0] ?? st.cwd}': Permissão negada`]);
      if (!node) return res([`ls: não foi possível acessar '${rest[0]}': Arquivo ou diretório inexistente`]);
      if (node.type === "file") {
        return res([flags.has("l") ? `${modeString(node)} ${(node.owner ?? st.user).padEnd(7)} ${String(node.content.length).padStart(5)} ${parts[parts.length - 1]}` : parts[parts.length - 1]]);
      }
      const names = Object.keys(node.children)
        .filter((n) => flags.has("a") || !n.startsWith("."))
        .sort();
      if (flags.has("l")) {
        return res(
          names.map((n) => {
            const child = node.children[n];
            const size = child.type === "dir" ? 4096 : child.content.length;
            return `${modeString(child)} ${(child.owner ?? st.user).padEnd(7)} ${String(size).padStart(5)} ${n}${child.type === "dir" ? "/" : ""}`;
          })
        );
      }
      return res([names.map((n) => (node.children[n].type === "dir" ? `${n}/` : n)).join("  ")].filter(Boolean));
    }

    case "cd": {
      const target = args[0] ?? "~";
      const parts = resolve(target);
      const { node, denied } = lookup(fsRoot, parts, st.user);
      if (denied) return res([`bash: cd: ${target}: Permissão negada`]);
      if (!node) return res([`bash: cd: ${target}: Arquivo ou diretório inexistente`]);
      if (node.type !== "dir") return res([`bash: cd: ${target}: Não é um diretório`]);
      const cwd = toPath(parts);
      return res([], { ...st, cwd, visited: st.visited.includes(cwd) ? st.visited : [...st.visited, cwd] });
    }

    case "cat": {
      if (!args.length) return res(["cat: informe o arquivo (ex.: cat README.txt)"]);
      const out: string[] = [];
      for (const target of args) {
        const { node, denied } = read(target);
        if (denied) out.push(`cat: ${target}: Permissão negada`);
        else if (!node) out.push(`cat: ${target}: Arquivo ou diretório inexistente`);
        else if (node.type === "dir") out.push(`cat: ${target}: É um diretório`);
        else if (!canRead(node, st.user)) out.push(`cat: ${target}: Permissão negada`);
        else out.push(...node.content.split("\n"));
      }
      return res(out);
    }

    case "head":
    case "tail":
    case "wc":
    case "sort":
    case "uniq":
    case "cut": {
      const valueFlags = cmd === "cut" ? ["d", "f"] : cmd === "head" || cmd === "tail" ? ["n"] : [];
      const { rest } = parseArgs(args, valueFlags);
      const target = rest[rest.length - 1];
      if (!target) return res([`uso: ${cmd} [opções] arquivo (ou use um pipe: comando | ${cmd})`]);
      const { node, denied } = read(target);
      if (denied || (node && node.type === "file" && !canRead(node, st.user))) return res([`${cmd}: ${target}: Permissão negada`]);
      if (!node) return res([`${cmd}: ${target}: Arquivo ou diretório inexistente`]);
      if (node.type === "dir") return res([`${cmd}: ${target}: É um diretório`]);
      const r = applyFilter(cmd, args.filter((a) => a !== target), splitLines(node.content), cmd === "wc" ? target : undefined);
      return res(r.error ? [r.error] : r.lines);
    }

    case "grep": {
      const { flags, rest } = parseArgs(args);
      const [pattern, ...targets] = rest;
      if (!pattern || !targets.length) return res(["uso: grep [-i] [-n] [-v] [-c] [-r] padrão arquivo"]);
      const passFlags = args.filter((a) => /^-[a-zA-Z]+$/.test(a));
      const out: string[] = [];
      for (const target of targets) {
        const parts = resolve(target);
        const { node, denied } = lookup(fsRoot, parts, st.user);
        if (denied) out.push(`grep: ${target}: Permissão negada`);
        else if (!node) out.push(`grep: ${target}: Arquivo ou diretório inexistente`);
        else if (node.type === "dir") {
          if (!flags.has("r")) out.push(`grep: ${target}: É um diretório (use -r para buscar dentro)`);
          else {
            walk(node, parts, st.user, (p, n) => {
              if (n.type !== "file" || !canRead(n, st.user)) return;
              const r = applyFilter("grep", [...passFlags.filter((f) => f !== "-r"), pattern], splitLines(n.content));
              out.push(...r.lines.map((l) => `${toPath(p)}:${l}`));
            });
          }
        } else if (!canRead(node, st.user)) {
          out.push(`grep: ${target}: Permissão negada`);
        } else {
          const r = applyFilter("grep", [...passFlags.filter((f) => f !== "-r"), pattern], splitLines(node.content));
          out.push(...r.lines.map((l) => (targets.length > 1 ? `${target}:${l}` : l)));
        }
      }
      return res(out);
    }

    case "find": {
      const nameIdx = args.indexOf("-name");
      const pattern = nameIdx >= 0 ? args[nameIdx + 1] : undefined;
      const startArg = args[0] && !args[0].startsWith("-") ? args[0] : ".";
      const parts = resolve(startArg);
      const { node, denied } = lookup(fsRoot, parts, st.user);
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

    case "mkdir": {
      const { flags, rest } = parseArgs(args);
      if (!rest.length) return res(["uso: mkdir [-p] pasta"]);
      const root = cloneFs(st);
      const out: string[] = [];
      for (const target of rest) {
        const parts = resolve(target);
        if (!parts.length) continue;
        if (flags.has("p")) {
          let cur: DirNode = root;
          for (const part of parts) {
            const next: FsNode | undefined = cur.children[part];
            if (!next) {
              const created: DirNode = { type: "dir", children: {}, owner: st.user };
              cur.children[part] = created;
              cur = created;
            } else if (next.type === "dir") cur = next;
            else {
              out.push(`mkdir: não foi possível criar '${target}': Arquivo existe`);
              break;
            }
          }
          continue;
        }
        const { parent, name } = parentOf(root, parts);
        if (!parent) out.push(`mkdir: não foi possível criar a pasta '${target}': Arquivo ou diretório inexistente (use -p)`);
        else if (parent.children[name]) out.push(`mkdir: não foi possível criar a pasta '${target}': Arquivo existe`);
        else if (!canWrite(parent, st.user)) out.push(`mkdir: não foi possível criar a pasta '${target}': Permissão negada`);
        else parent.children[name] = { type: "dir", children: {}, owner: st.user };
      }
      return res(out, withFs(st, root));
    }

    case "touch": {
      if (!args.length) return res(["uso: touch arquivo"]);
      const root = cloneFs(st);
      const out: string[] = [];
      for (const target of args) {
        const { parent, name } = parentOf(root, resolve(target));
        if (!parent) out.push(`touch: não foi possível tocar '${target}': Arquivo ou diretório inexistente`);
        else if (!parent.children[name]) {
          if (!canWrite(parent, st.user)) out.push(`touch: não foi possível tocar '${target}': Permissão negada`);
          else parent.children[name] = { type: "file", content: "", owner: st.user };
        }
      }
      return res(out, withFs(st, root));
    }

    case "rm": {
      const { flags, rest } = parseArgs(args);
      if (!rest.length) return res(["uso: rm [-r] arquivo"]);
      const root = cloneFs(st);
      const out: string[] = [];
      for (const target of rest) {
        const parts = resolve(target);
        if (!parts.length) {
          out.push("rm: perigoso apagar '/'. Operação recusada.");
          continue;
        }
        const { parent, name } = parentOf(root, parts);
        const node = parent?.children[name];
        if (!parent || !node) out.push(`rm: não foi possível remover '${target}': Arquivo ou diretório inexistente`);
        else if (!canWrite(parent, st.user)) out.push(`rm: não foi possível remover '${target}': Permissão negada`);
        else if (node.type === "dir" && !flags.has("r")) out.push(`rm: não foi possível remover '${target}': É um diretório (use -r)`);
        else if (toPath(parts) === st.cwd || st.cwd.startsWith(toPath(parts) + "/")) out.push(`rm: não foi possível remover '${target}': você está dentro dessa pasta`);
        else delete parent.children[name];
      }
      return res(out, withFs(st, root));
    }

    case "cp":
    case "mv": {
      const { flags, rest } = parseArgs(args);
      if (rest.length < 2) return res([`uso: ${cmd} origem destino`]);
      const [src, dst] = rest;
      const root = cloneFs(st);
      const srcParts = resolve(src);
      const { parent: sp, name: sname } = parentOf(root, srcParts);
      const srcNode = sp?.children[sname];
      if (!sp || !srcNode) return res([`${cmd}: não foi possível obter estado de '${src}': Arquivo ou diretório inexistente`]);
      if (srcNode.type === "dir" && cmd === "cp" && !flags.has("r")) return res([`cp: -r não especificado; omitindo o diretório '${src}'`]);
      if (srcNode.type === "file" && !canRead(srcNode, st.user)) return res([`${cmd}: não foi possível abrir '${src}': Permissão negada`]);
      let dstParts = resolve(dst);
      const dstFound = lookup(root, dstParts, "root");
      if (dstFound.node && dstFound.node.type === "dir") dstParts = [...dstParts, sname];
      const { parent: dp, name: dname } = parentOf(root, dstParts);
      if (!dp) return res([`${cmd}: não foi possível criar '${dst}': Arquivo ou diretório inexistente`]);
      if (!canWrite(dp, st.user)) return res([`${cmd}: não foi possível criar '${dst}': Permissão negada`]);
      if (cmd === "mv") {
        if (dp === sp && dname === sname) return res([]);
        delete sp.children[sname];
        dp.children[dname] = srcNode;
      } else {
        dp.children[dname] = structuredClone(srcNode);
        (dp.children[dname] as FsNode).owner = st.user;
      }
      return res([], withFs(st, root));
    }

    case "chmod": {
      const [modeArg, ...targets] = args;
      if (!modeArg || !targets.length) return res(["uso: chmod +x arquivo   ou   chmod 644 arquivo"]);
      const root = cloneFs(st);
      const out: string[] = [];
      for (const target of targets) {
        const { parent, name } = parentOf(root, resolve(target));
        const node = parent?.children[name];
        if (!parent || !node) {
          out.push(`chmod: não foi possível acessar '${target}': Arquivo ou diretório inexistente`);
          continue;
        }
        if (st.user !== "root" && node.owner && node.owner !== st.user) {
          out.push(`chmod: alterando as permissões de '${target}': Operação não permitida`);
          continue;
        }
        const current = node.mode ?? (node.type === "dir" ? 0o755 : 0o644);
        if (/^[0-7]{3}$/.test(modeArg)) {
          node.mode = parseInt(modeArg, 8);
        } else {
          const sym = /^([ugoa]*)([+-])([rwx]+)$/.exec(modeArg);
          if (!sym) {
            out.push(`chmod: modo inválido: '${modeArg}'`);
            continue;
          }
          const who = sym[1] || "a";
          const bit = sym[3].split("").reduce((acc, c) => acc | (c === "r" ? 4 : c === "w" ? 2 : 1), 0);
          let mode = current;
          for (const [letter, shift] of [["u", 6], ["g", 3], ["o", 0]] as const) {
            if (who.includes("a") || who.includes(letter)) {
              mode = sym[2] === "+" ? mode | (bit << shift) : mode & ~(bit << shift);
            }
          }
          node.mode = mode & 0o777;
        }
      }
      return res(out, withFs(st, root));
    }

    case "ps": {
      const procs = [...(st.processes[st.ip] ?? [])].sort((a, b) => a.pid - b.pid);
      return res([
        "USER       PID COMMAND",
        ...procs.map((p) => `${p.user.padEnd(10)} ${String(p.pid).padStart(3)} ${p.cmd}`),
      ]);
    }

    case "kill": {
      const pidArg = args.find((a) => !a.startsWith("-"));
      const pid = pidArg ? parseInt(pidArg, 10) : NaN;
      if (!pidArg || Number.isNaN(pid)) return res(["uso: kill <pid>  (veja o PID com ps)"]);
      const procs = st.processes[st.ip] ?? [];
      const proc = procs.find((p) => p.pid === pid);
      if (!proc) return res([`kill: (${pid}): Nenhum processo com esse PID`]);
      if (st.user !== "root" && proc.user !== st.user) return res([`kill: (${pid}): Operação não permitida`]);
      const next = { ...st, processes: { ...st.processes, [st.ip]: procs.filter((p) => p.pid !== pid) } };
      return res(proc.warnOnKill ? [proc.warnOnKill] : [], next);
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
        ...st,
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
    ...st,
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

const ERROR_HINT = /(inexistente|Permissão negada|não encontrado|É um diretório|não foi possível|^uso:|\(use -\w\)|perigoso|não permitida|inválido|só grep, wc|Nenhum processo)/i;

/** A saída parece uma mensagem de erro (no Linux real ela iria para a tela, não para o pipe) */
export const looksLikeError = (lines: string[]): boolean => lines.length > 0 && lines.every((l) => ERROR_HINT.test(l));

/** Executa uma linha digitada e registra no histórico de comandos que funcionaram */
export function execute(s: Scenario, st: TermState, raw: string): ExecResult {
  const result = executeLine(s, st, raw);
  const line = raw.trim();
  if (st.pending || !line || looksLikeError(result.lines)) return result;
  return { ...result, state: { ...result.state, okHistory: [...result.state.okHistory, line] } };
}

/** Executa uma linha digitada, com suporte a pipes (|) e redirecionamento (> e >>) */
function executeLine(s: Scenario, st: TermState, raw: string): ExecResult {
  if (st.pending) return handlePassword(s, st, raw);

  const line = raw.trim();
  if (!line) return { state: st, lines: [] };

  const started: TermState = { ...st, history: [...st.history, line] };

  // Redirecionamento no fim da linha: ... > arquivo   ou   ... >> arquivo
  let command = line;
  let redirect: { mode: ">" | ">>"; target: string } | null = null;
  const redir = /^(.*?)\s*(>>|>)\s*(\S+)\s*$/.exec(line);
  if (redir && !/^\s*(grep|find)\b.*["'][^"']*>[^"']*["']/.test(line)) {
    command = redir[1];
    redirect = { mode: redir[2] as ">" | ">>", target: redir[3] };
  }

  const stages = command.split("|").map((p) => p.trim());
  if (stages.some((p) => p === "")) return { state: started, lines: ["bash: erro de sintaxe perto de '|'"] };

  let result = runCommand(s, started, stages[0]);
  // Se o primeiro comando falhou, o erro vai para a tela e o resto da linha não roda
  if (looksLikeError(result.lines)) return result;
  for (const stage of stages.slice(1)) {
    const argv = tokenize(stage);
    if (!FILTERS.includes(argv[0])) {
      return { state: result.state, lines: [`${argv[0]}: só grep, wc, sort, uniq, head, tail e cut funcionam depois de um pipe neste laboratório`] };
    }
    const filtered = applyFilter(argv[0], argv.slice(1), result.lines);
    result = { state: result.state, lines: filtered.error ? [filtered.error] : filtered.lines };
  }

  if (redirect) {
    const root = structuredClone(result.state.files[result.state.ip]);
    const home = machineOf(s, result.state.ip).users[result.state.user]?.home ?? "/";
    const parts = normalize(redirect.target, result.state.cwd, home);
    const { parent, name } = parentOf(root, parts);
    if (!parent) return { state: result.state, lines: [`bash: ${redirect.target}: Arquivo ou diretório inexistente`] };
    if (!canWrite(parent, result.state.user)) return { state: result.state, lines: [`bash: ${redirect.target}: Permissão negada`] };
    const existing = parent.children[name];
    if (existing && existing.type === "dir") return { state: result.state, lines: [`bash: ${redirect.target}: É um diretório`] };
    const text = result.lines.join("\n");
    const previous = existing && existing.type === "file" ? existing.content : "";
    const content = redirect.mode === ">>" && previous ? `${previous}\n${text}` : text;
    parent.children[name] = { ...(existing && existing.type === "file" ? existing : {}), type: "file", content, owner: existing?.owner ?? result.state.user };
    return { state: withFs(result.state, root), lines: [] };
  }

  return result;
}

// ---------------------------------------------------------------- consultas para as tarefas

/** Lê o conteúdo de um arquivo em qualquer máquina do cenário (padrão: a máquina atual) */
export function readFile(st: TermState, path: string, ip: string = st.ip): string | undefined {
  const parts = normalize(path, "/", "/");
  const { node } = lookup(st.files[ip], parts, "root");
  return node && node.type === "file" ? node.content : undefined;
}

export function pathExists(st: TermState, path: string, ip: string = st.ip): "file" | "dir" | null {
  const { node } = lookup(st.files[ip], normalize(path, "/", "/"), "root");
  return node ? node.type : null;
}

/** Permissões (octal) de um arquivo ou pasta */
export function modeOf(st: TermState, path: string, ip: string = st.ip): number | undefined {
  const { node } = lookup(st.files[ip], normalize(path, "/", "/"), "root");
  return node ? (node.mode ?? (node.type === "dir" ? 0o755 : 0o644)) : undefined;
}

/** O processo com esse PID ainda está rodando nessa máquina? */
export function processExists(st: TermState, pid: number, ip: string = st.ip): boolean {
  return (st.processes[ip] ?? []).some((p) => p.pid === pid);
}

/** Algum comando que FUNCIONOU combina com a expressão? */
export const ran = (st: TermState, re: RegExp): boolean => st.okHistory.some((h) => re.test(h));

/** Alguma TENTATIVA (funcionando ou não) combina com a expressão? */
export const attempted = (st: TermState, re: RegExp): boolean => st.history.some((h) => re.test(h));
