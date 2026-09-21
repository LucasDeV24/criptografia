import { attempted, dir, file, modeOf, pathExists, ran, readFile } from "./terminal-engine";
import type { DirNode, FileNode, Scenario, TermState } from "./terminal-engine";

/**
 * Laboratórios do módulo "Terminal e Linux" (episódio 47).
 * Cada cenário tem TAREFAS que o sistema confere sozinho e uma `solution`
 * (sequência de comandos que resolve) usada pelo verificador (npm run verify:terminal).
 */

const HOME = "/home/aluno";

/** Máquina do aluno usada nos laboratórios do módulo de terminal */
const alunoPc = (home: Record<string, FileNode | DirNode>, extra: Record<string, DirNode> = {}) => ({
  hostname: "aluno-pc",
  ip: "10.0.0.2",
  ports: [] as { port: number; service: string }[],
  users: { aluno: { home: HOME } },
  fs: dir({
    home: dir({ aluno: dir(home) }),
    etc: dir({ hosts: file("127.0.0.1 localhost"), hostname: file("aluno-pc") }),
    ...extra,
  }),
});

const LOG_ACESSO = [
  "2024-05-01 10:00:01 SUCESSO 10.0.0.7 ana",
  "2024-05-01 10:00:09 FALHA 203.0.113.5 admin",
  "2024-05-01 10:00:15 FALHA 203.0.113.5 root",
  "2024-05-01 10:01:02 SUCESSO 10.0.0.8 bruno",
  "2024-05-01 10:01:30 FALHA 198.51.100.9 admin",
  "2024-05-01 10:02:11 FALHA 203.0.113.5 admin",
  "2024-05-01 10:02:45 SUCESSO 10.0.0.7 ana",
  "2024-05-01 10:03:03 FALHA 203.0.113.5 teste",
  "2024-05-01 10:03:40 SUCESSO 10.0.0.9 carla",
  "2024-05-01 10:04:12 FALHA 198.51.100.9 root",
  "2024-05-01 10:05:00 SUCESSO 10.0.0.8 bruno",
  "2024-05-01 10:05:21 FALHA 203.0.113.5 admin",
].join("\n");

const start = { ip: "10.0.0.2", user: "aluno" };

/** Lab 1: onde estou? (pwd, ls) */
export const TERM_NAV: Scenario = {
  id: "term-nav",
  start,
  welcome: ["Terminal do laboratório (simulado). Você está no computador do aluno.", "Cumpra as tarefas da lista."],
  commands: ["help", "pwd", "ls", "clear"],
  machines: [
    alunoPc({
      "leiame.txt": file("Bem-vindo ao terminal!"),
      Documentos: dir({ "relatorio.txt": file("Relatório de estudos") }),
      Downloads: dir({ "foto.png": file("[imagem]"), "musica.mp3": file("[áudio]") }),
      projetos: dir({ site: dir(), jogo: dir() }),
      ".bashrc": file("# configurações do terminal"),
      ".config": dir({ "tema.conf": file("tema=escuro") }),
    }),
  ],
  tasks: [
    { label: "Descobrir em qual pasta você está (pwd)", done: (st) => ran(st, /^pwd\b/) },
    { label: "Listar o conteúdo da pasta (ls)", done: (st) => ran(st, /^ls\b/) },
    { label: "Listar também os arquivos ocultos (ls -a)", done: (st) => ran(st, /^ls\s+-\w*a/) },
  ],
  solution: ["pwd", "ls", "ls -a"],
};

/** Lab 2: navegando (cd, caminhos relativos e absolutos, ~) */
export const TERM_PATHS: Scenario = {
  id: "term-paths",
  start,
  welcome: ["Terminal do laboratório (simulado).", "Use ls para ver onde pode ir e cd para entrar nas pastas."],
  commands: ["help", "pwd", "ls", "cd", "clear"],
  machines: [
    alunoPc({
      Documentos: dir({ "relatorio.txt": file("Relatório de estudos") }),
      projetos: dir({
        site: dir({
          "index.html": file("<h1>Meu site</h1>"),
          "estilo.css": file("body { color: green; }"),
          imagens: dir({ "logo.png": file("[imagem]") }),
        }),
        jogo: dir({ "main.py": file('print("jogo")') }),
      }),
    }),
  ],
  tasks: [
    { label: "Entrar em projetos/site usando caminhos relativos", done: (st) => st.visited.includes(HOME + "/projetos/site") },
    { label: "Entrar na pasta imagens, dentro de site", done: (st) => st.visited.includes(HOME + "/projetos/site/imagens") },
    { label: "Ir para /etc usando um caminho absoluto", done: (st) => st.visited.includes("/etc") },
    { label: "Voltar para a sua pasta pessoal (cd ~)", done: (st) => st.cwd === HOME && st.visited.includes("/etc") },
  ],
  solution: ["cd projetos", "cd site", "cd imagens", "cd /etc", "cd ~"],
};

/** Lab 3: lendo arquivos (cat, head, tail, wc) */
export const TERM_READ: Scenario = {
  id: "term-read",
  start,
  welcome: ["Terminal do laboratório (simulado).", "Há um README.txt e um arquivo de log (acesso.log) na sua pasta."],
  commands: ["help", "ls", "cat", "head", "tail", "wc", "clear"],
  machines: [
    alunoPc({
      "README.txt": file("Este é o servidor de estudos.\nO arquivo acesso.log guarda os logins.\nLeia com cuidado!"),
      "acesso.log": file(LOG_ACESSO),
    }),
  ],
  tasks: [
    { label: "Ler o README.txt inteiro (cat)", done: (st) => ran(st, /^cat\s+README\.txt/) },
    { label: "Contar quantas linhas tem o acesso.log (wc -l)", done: (st) => ran(st, /^wc\s+-l\s+acesso\.log/) },
    { label: "Ver só as primeiras linhas do log (head -n 3)", done: (st) => ran(st, /^head\b.*acesso\.log/) },
    { label: "Ver só as últimas linhas do log (tail -n 3)", done: (st) => ran(st, /^tail\b.*acesso\.log/) },
  ],
  solution: ["cat README.txt", "wc -l acesso.log", "head -n 3 acesso.log", "tail -n 3 acesso.log"],
};

/** Lab 4: criando e organizando (mkdir, echo >, cp, mv, rm) */
export const TERM_FILES: Scenario = {
  id: "term-files",
  start,
  welcome: ["Terminal do laboratório (simulado).", "Atenção: rm apaga para sempre. Aqui pode errar sem medo: use Reiniciar se precisar."],
  commands: ["help", "ls", "cd", "cat", "echo", "mkdir", "touch", "cp", "mv", "rm", "clear"],
  machines: [
    alunoPc({
      "rascunho.txt": file("anotações antigas, pode apagar"),
      "ideias.txt": file("ideias para o projeto"),
      Documentos: dir(),
    }),
  ],
  tasks: [
    { label: "Criar a pasta projeto (mkdir)", done: (st) => pathExists(st, HOME + "/projeto") === "dir" },
    {
      label: 'Criar projeto/notas.txt com algum texto (echo "..." > arquivo)',
      done: (st) => (readFile(st, HOME + "/projeto/notas.txt") ?? "").trim().length > 0,
    },
    {
      label: "Copiar notas.txt para projeto/notas-backup.txt (cp)",
      done: (st) => {
        const a = readFile(st, HOME + "/projeto/notas.txt");
        return a !== undefined && a === readFile(st, HOME + "/projeto/notas-backup.txt");
      },
    },
    {
      label: "Mover ideias.txt para dentro de projeto (mv)",
      done: (st) => pathExists(st, HOME + "/projeto/ideias.txt") === "file" && pathExists(st, HOME + "/ideias.txt") === null,
    },
    { label: "Apagar o rascunho.txt (rm)", done: (st) => pathExists(st, HOME + "/rascunho.txt") === null },
  ],
  solution: [
    "mkdir projeto",
    'echo "aprender terminal" > projeto/notas.txt',
    "cp projeto/notas.txt projeto/notas-backup.txt",
    "mv ideias.txt projeto/",
    "rm rascunho.txt",
  ],
};

/** Lab 5: caçando informações (find, grep) */
export const TERM_SEARCH: Scenario = {
  id: "term-search",
  start,
  welcome: ["Terminal do laboratório (simulado).", "Missão: descobrir a porta do banco de dados e investigar os erros do sistema."],
  commands: ["help", "ls", "cd", "cat", "find", "grep", "clear"],
  machines: [
    alunoPc(
      { "missao.txt": file("1) ache o arquivo banco.conf\n2) descubra a porta configurada\n3) veja as linhas de ERRO do log do sistema") },
      {
        var: dir({
          log: dir({
            "sistema.log": file(
              [
                "10:00 INFO servico iniciado",
                "10:02 ERRO falha ao conectar no banco",
                "10:05 INFO tentando novamente",
                "10:06 AVISO memoria alta",
                "10:09 ERRO tempo esgotado",
                "10:12 Erro de leitura no disco",
                "10:15 INFO tudo normal",
              ].join("\n")
            ),
          }),
        }),
        opt: dir({
          app: dir({
            "banco.conf": file("host=localhost\nporta=5432\nusuario=app"),
            "site.conf": file("porta=8080\nmodo=producao"),
          }),
        }),
      }
    ),
  ],
  tasks: [
    { label: "Achar o arquivo banco.conf no computador (find / -name)", done: (st) => ran(st, /^find\b.*-name\s+["']?banco\.conf/) },
    { label: "Ver a linha da porta dentro dele (grep porta arquivo)", done: (st) => ran(st, /^grep\s+["']?porta["']?\s+\S*banco\.conf/) },
    { label: "Buscar ERRO no log do sistema (grep)", done: (st) => ran(st, /^grep\b.*ERRO.*sistema\.log/) },
    { label: "Ver o número da linha de cada erro (grep -n)", done: (st) => ran(st, /^grep\s+-\w*n\w*\s+.*sistema\.log/) },
    { label: "Buscar sem diferenciar maiúsculas (grep -i)", done: (st) => ran(st, /^grep\s+-\w*i\w*\s+.*sistema\.log/) },
  ],
  solution: [
    "find / -name banco.conf",
    "grep porta /opt/app/banco.conf",
    "grep ERRO /var/log/sistema.log",
    "grep -n ERRO /var/log/sistema.log",
    "grep -i erro /var/log/sistema.log",
  ],
};

/** Lab 6: pipes e redirecionamento (|, >, sort, uniq, cut, wc) */
export const TERM_PIPES: Scenario = {
  id: "term-pipes",
  start,
  welcome: ["Terminal do laboratório (simulado).", "Cada linha do acesso.log é: data hora STATUS ip usuario"],
  commands: ["help", "ls", "cat", "head", "grep", "wc", "sort", "uniq", "cut", "clear"],
  machines: [alunoPc({ "acesso.log": file(LOG_ACESSO) })],
  tasks: [
    { label: "Contar as linhas com FALHA (grep ... | wc -l)", done: (st) => ran(st, /^grep\s+FALHA\s+acesso\.log\s*\|\s*wc\s+-l/) },
    {
      label: "Salvar só as linhas de FALHA em falhas.txt (grep ... > arquivo)",
      done: (st) => {
        const text = readFile(st, HOME + "/falhas.txt");
        return text !== undefined && text.trim() !== "" && text.split("\n").every((l) => l.includes("FALHA"));
      },
    },
    { label: "Contar quantas falhas cada IP teve (cut | sort | uniq -c)", done: (st) => ran(st, /^cut\b.*\|\s*sort\b.*\|\s*uniq\s+-c/) },
  ],
  solution: ["grep FALHA acesso.log | wc -l", "grep FALHA acesso.log > falhas.txt", "cut -d' ' -f4 falhas.txt | sort | uniq -c"],
};

/** Lab 7: permissões (ls -l, chmod, ./script) */
export const TERM_PERM: Scenario = {
  id: "term-perm",
  start,
  welcome: ["Terminal do laboratório (simulado).", "Existe um script de backup na sua pasta, mas ele não está rodando..."],
  commands: ["help", "ls", "cat", "chmod", "clear"],
  machines: [
    alunoPc({
      "backup.sh": file("#!/bin/bash\necho fazendo backup", {
        owner: "aluno",
        mode: 0o644,
        run: ["Iniciando backup...", "3 arquivos copiados", "Backup concluído com sucesso!"],
      }),
      "notas.txt": file("minhas notas", { owner: "aluno", mode: 0o644 }),
    }),
  ],
  tasks: [
    { label: "Ver as permissões dos arquivos (ls -l)", done: (st) => ran(st, /^ls\s+-\w*l/) },
    { label: "Tentar executar o script (./backup.sh)", done: (st) => attempted(st, /^\.\/backup\.sh/) },
    { label: "Dar permissão de execução ao script (chmod +x)", done: (st) => ((modeOf(st, HOME + "/backup.sh") ?? 0) & 0o100) !== 0 },
    { label: "Executar o script com sucesso", done: (st: TermState) => st.events.includes("exec:backup.sh") },
  ],
  solution: ["ls -l", "./backup.sh", "chmod +x backup.sh", "./backup.sh"],
};

export const TERMINAL_MODULE_SCENARIOS: Record<string, Scenario> = {
  "term-nav": TERM_NAV,
  "term-paths": TERM_PATHS,
  "term-read": TERM_READ,
  "term-files": TERM_FILES,
  "term-search": TERM_SEARCH,
  "term-pipes": TERM_PIPES,
  "term-perm": TERM_PERM,
};
