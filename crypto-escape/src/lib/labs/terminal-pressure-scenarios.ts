import { dir, file, pathExists, processExists, ran } from "./terminal-engine";
import type { Scenario } from "./terminal-engine";

/**
 * Laboratórios do módulo "Terminal: Ataque e Defesa" (episódio 48).
 * Continuação de "Terminal e Linux" (47): aqui entram processos (ps/kill) e, em alguns
 * laboratórios, um cronômetro real (Scenario.timeLimitSeconds).
 */

const FLAG_TWOHOP = "FLAG{dois_saltos_contra_o_relogio}";

// ======================= Lab 1: ps e kill (sem cronômetro) =======================

export const TERM_PS_KILL: Scenario = {
  id: "term-ps-kill",
  start: { ip: "10.0.0.2", user: "aluno" },
  welcome: ["Terminal do laboratório (simulado).", "Seu computador está lento. Algo estranho está rodando."],
  commands: ["help", "ls", "cat", "ps", "kill", "clear"],
  machines: [
    {
      hostname: "aluno-pc",
      ip: "10.0.0.2",
      ports: [],
      users: { aluno: { home: "/home/aluno" } },
      fs: dir({
        home: dir({
          aluno: dir({
            "leiame.txt": file(
              "O ventilador do computador não para de girar e tudo ficou lento.\nUse ps para ver o que está rodando."
            ),
          }),
        }),
      }),
      processes: [
        { pid: 1, user: "root", cmd: "/sbin/init" },
        { pid: 120, user: "root", cmd: "/usr/sbin/sshd" },
        { pid: 842, user: "aluno", cmd: "-bash" },
        { pid: 1337, user: "aluno", cmd: "/tmp/.oculto/minerador.sh" },
      ],
    },
  ],
  tasks: [
    { label: "Listar os processos (ps)", done: (st) => ran(st, /^ps\b/) },
    { label: "Encerrar o processo suspeito (kill 1337)", done: (st) => !processExists(st, 1337) },
  ],
  solution: ["ps", "kill 1337"],
};

// ======================= Lab 2: conter o ataque (CRONOMETRADO) =======================

export const TERM_CONTAIN: Scenario = {
  id: "term-contain",
  start: { ip: "10.0.0.9", user: "root" },
  welcome: [
    "⏱ CRONÔMETRO ATIVO — laboratório simulado.",
    "Você é o administrador da loja-srv, logado como root. O monitoramento disparou um alerta agora mesmo.",
  ],
  commands: ["help", "ls", "cd", "cat", "grep", "find", "ps", "kill", "rm", "clear"],
  timeLimitSeconds: 240,
  timeoutMessage:
    "Tempo esgotado! O processo malicioso continuou ativo e o atacante manteve o acesso ao servidor. Respire fundo — na próxima você já sabe o caminho. Clique em Reiniciar.",
  machines: [
    {
      hostname: "loja-srv",
      ip: "10.0.0.9",
      ports: [{ port: 22, service: "ssh" }, { port: 80, service: "http" }],
      users: { root: { home: "/root" } },
      fs: dir({
        root: dir({
          "missao.txt": file(
            [
              "ALERTA: uso de CPU anormal e tentativas de login em série.",
              "",
              "Contenha a ameaça:",
              "  1) Investigue as tentativas de login (/var/log/auth.log)",
              "  2) Ache o processo malicioso (ps) e finalize-o (kill)",
              "  3) Ache o arquivo que o mantém ativo (persistência) e remova-o",
            ].join("\n")
          ),
        }),
        var: dir({
          log: dir({
            "auth.log": file(
              [
                "10:58:02 FALHA login admin de 203.0.113.5",
                "10:58:05 FALHA login root de 203.0.113.5",
                "10:58:09 FALHA login admin de 203.0.113.5",
                "10:58:14 SUCESSO login admin de 203.0.113.5",
                "10:58:20 FALHA login root de 203.0.113.5",
              ].join("\n")
            ),
          }),
        }),
        etc: dir({
          hostname: file("loja-srv"),
          "cron.d": dir({
            atualizacao: file("* * * * * root /tmp/.svc/agent.sh"),
          }),
        }),
      }),
      processes: [
        { pid: 1, user: "root", cmd: "/sbin/init" },
        { pid: 210, user: "www-data", cmd: "/usr/sbin/nginx" },
        { pid: 842, user: "root", cmd: "-bash" },
        { pid: 1319, user: "root", cmd: "/tmp/.svc/agent.sh" },
      ],
    },
  ],
  tasks: [
    { label: "Investigar as tentativas de login (grep em auth.log)", done: (st) => ran(st, /^grep\b.*auth\.log/) },
    { label: "Listar os processos (ps)", done: (st) => ran(st, /^ps\b/) },
    { label: "Encerrar o processo malicioso (kill 1319)", done: (st) => !processExists(st, 1319, "10.0.0.9") },
    { label: "Achar o arquivo de persistência (find)", done: (st) => ran(st, /^find\b.*atualizacao/) },
    {
      label: "Remover o arquivo de persistência (rm)",
      done: (st) => pathExists(st, "/etc/cron.d/atualizacao", "10.0.0.9") === null,
    },
  ],
  solution: [
    "grep FALHA /var/log/auth.log",
    "ps",
    "kill 1319",
    "find /etc/cron.d -name atualizacao",
    "rm /etc/cron.d/atualizacao",
  ],
};

// ======================= Lab 3: dois saltos contra o relógio (CRONOMETRADO, ataque) =======================

export const TERM_TWOHOP: Scenario = {
  id: "term-twohop",
  start: { ip: "10.0.0.2", user: "hacker" },
  flag: FLAG_TWOHOP,
  welcome: [
    "⏱ CRONÔMETRO ATIVO — laboratório simulado.",
    "Missão: chegar ao servidor interno antes que o SOC perceba. Leia missao.txt.",
  ],
  commands: ["help", "ls", "cat", "grep", "ssh", "exit", "clear"],
  timeLimitSeconds: 240,
  timeoutMessage:
    "Tempo esgotado! O time de segurança percebeu a invasão e revogou o acesso. Recomece — agora você já sabe o caminho.",
  machines: [
    {
      hostname: "kali",
      ip: "10.0.0.2",
      ports: [],
      users: { hacker: { home: "/home/hacker" } },
      fs: dir({
        home: dir({
          hacker: dir({
            "missao.txt": file(
              [
                "ALVO FINAL: servidor db-interno (10.0.0.11).",
                "Ele não é acessível diretamente: primeiro entre no gateway (10.0.0.10).",
                "",
                "Dica: creds.txt tem uma lista de credenciais vazadas. Não leia tudo,",
                "procure só o que interessa (grep é mais rápido que cat).",
              ].join("\n")
            ),
            "creds.txt": file(
              [
                "joao:futebol10",
                "maria:qwerty123",
                "ops:Gtw!2024",
                "carlos:senha123",
                "pedro:abc12345",
                "julia:iloveyou",
              ].join("\n")
            ),
          }),
        }),
      }),
    },
    {
      hostname: "gateway",
      ip: "10.0.0.10",
      ports: [{ port: 22, service: "ssh" }],
      users: { ops: { home: "/home/ops", password: "Gtw!2024" } },
      fs: dir({
        home: dir({
          ops: dir({
            "notas.txt": file(
              [
                "Lembrete pessoal:",
                "- servidor interno: 10.0.0.11",
                "- reaproveitei a senha pra não esquecer: dbadmin / Interna@2024",
                "- (eu sei, eu sei... vou trocar essa semana)",
              ].join("\n")
            ),
          }),
        }),
      }),
    },
    {
      hostname: "db-interno",
      ip: "10.0.0.11",
      ports: [{ port: 22, service: "ssh" }],
      users: { dbadmin: { home: "/home/dbadmin", password: "Interna@2024" } },
      fs: dir({
        home: dir({
          dbadmin: dir({
            "clientes.sql.bak": file(
              [
                "-- Backup do banco de clientes",
                "INSERT INTO clientes VALUES (1, 'Helena Prado');",
                "INSERT INTO clientes VALUES (2, 'Marcos Lima');",
                `-- ${FLAG_TWOHOP}`,
              ].join("\n")
            ),
          }),
        }),
      }),
    },
  ],
  solution: [
    "grep ops creds.txt",
    "ssh ops@10.0.0.10",
    "Gtw!2024",
    "cat notas.txt",
    "ssh dbadmin@10.0.0.11",
    "Interna@2024",
    "cat clientes.sql.bak",
  ],
};

// ======================= Lab 4: duas ameaças, uma real (CRONOMETRADO, defesa avançada) =======================

export const TERM_TWO_THREATS: Scenario = {
  id: "term-two-threats",
  start: { ip: "10.0.0.12", user: "root" },
  welcome: [
    "⏱ CRONÔMETRO ATIVO — laboratório simulado.",
    "Você está logado como root. O IDS do financeiro-srv disparou um alerta de conexão suspeita.",
  ],
  commands: ["help", "ls", "cat", "grep", "ps", "kill", "clear"],
  timeLimitSeconds: 240,
  timeoutMessage:
    "Tempo esgotado! A conexão suspeita continuou ativa e dados do financeiro foram expostos. Vamos de novo, com calma — a pista estava no log de conexões.",
  machines: [
    {
      hostname: "financeiro-srv",
      ip: "10.0.0.12",
      ports: [],
      users: { root: { home: "/root" } },
      fs: dir({
        root: dir({
          "missao.txt": file(
            [
              "ALERTA do IDS: conexão de saída fora do padrão.",
              "",
              "O backup-nightly.sh É LEGÍTIMO (não finalize!). Investigue o",
              "log de conexões para achar a ameaça real e finalize só ela.",
            ].join("\n")
          ),
        }),
        var: dir({
          log: dir({
            "conexoes.log": file(
              [
                "13:58 PID=305 CONEXAO PARA 10.0.0.1:443 (padrao)",
                "14:01 PID=1210 CONEXAO PARA 203.0.113.44:4444 (fora do padrao)",
                "14:03 PID=305 CONEXAO PARA 10.0.0.1:443 (padrao)",
                "14:06 PID=1210 CONEXAO PARA 203.0.113.44:4444 (fora do padrao)",
              ].join("\n")
            ),
          }),
        }),
      }),
      processes: [
        { pid: 1, user: "root", cmd: "/sbin/init" },
        {
          pid: 305,
          user: "root",
          cmd: "/usr/local/bin/backup-nightly.sh",
          warnOnKill:
            "⚠ Você encerrou o backup-nightly.sh no meio da execução. Ele era legítimo — o backup desta noite ficou incompleto.",
        },
        { pid: 842, user: "root", cmd: "-bash" },
        { pid: 1210, user: "root", cmd: "[kworker/0:2]" },
      ],
    },
  ],
  tasks: [
    { label: "Ler o alerta (cat missao.txt)", done: (st) => ran(st, /^cat\b.*missao\.txt/) },
    { label: "Examinar o log de conexões (grep ou cat)", done: (st) => ran(st, /^(cat|grep)\b.*conexoes\.log/) },
    { label: "Listar os processos (ps)", done: (st) => ran(st, /^ps\b/) },
    { label: "Encerrar SOMENTE a ameaça real (kill 1210)", done: (st) => !processExists(st, 1210, "10.0.0.12") },
  ],
  solution: ["cat missao.txt", 'grep "fora do padrao" /var/log/conexoes.log', "ps", "kill 1210"],
};

export const TERMINAL_PRESSURE_SCENARIOS: Record<string, Scenario> = {
  "term-ps-kill": TERM_PS_KILL,
  "term-contain": TERM_CONTAIN,
  "term-twohop": TERM_TWOHOP,
  "term-two-threats": TERM_TWO_THREATS,
};
