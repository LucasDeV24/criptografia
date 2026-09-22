import { dir, file } from "./terminal-engine";
import type { Scenario } from "./terminal-engine";
import { TERMINAL_MODULE_SCENARIOS } from "./terminal-module-scenarios";
import { TERMINAL_PRESSURE_SCENARIOS } from "./terminal-pressure-scenarios";
import { TERMINAL_NETWORKING_SCENARIOS } from "./terminal-networking-scenarios";
import { TERMINAL_AD_SCENARIOS } from "./terminal-ad-scenarios";
import { TERMINAL_PENTEST_SCENARIOS } from "./terminal-pentest-scenarios";
import { TERMINAL_SIEM_SCENARIOS } from "./terminal-siem-scenarios";
import { TERMINAL_MALWARE_SCENARIOS } from "./terminal-malware-scenarios";

/** Laboratório 1: primeiros passos no terminal (arquivos ocultos) */
const RECON_FLAG = "FLAG{ls_a_revela_o_que_esta_escondido}";

export const RECON: Scenario = {
  id: "terminal-recon",
  flag: RECON_FLAG,
  start: { ip: "10.0.0.2", user: "hacker" },
  welcome: [
    "Bem-vindo ao terminal do laboratório (tudo aqui é simulado).",
    "Digite help para ver os comandos. Comece lendo o README.txt.",
  ],
  commands: ["help", "ls", "cd", "pwd", "cat", "clear"],
  machines: [
    {
      hostname: "kali",
      ip: "10.0.0.2",
      ports: [],
      users: { hacker: { home: "/home/hacker" } },
      fs: dir({
        home: dir({
          hacker: dir({
            "README.txt": file(
              [
                "Bem-vindo(a), hacker!",
                "",
                "Missão: encontrar a FLAG escondida nesta máquina.",
                "Ela está em um arquivo dentro de uma pasta OCULTA",
                "(nomes que começam com ponto, como .cofre).",
                "",
                'Um "ls" simples não mostra esses itens... mas existe uma opção para isso.',
              ].join("\n")
            ),
            Documentos: dir({
              "lista-de-compras.txt": file("pão\nleite\ncafé"),
              "ideias.txt": file("Aprender Python\nCriar um app\nSubir no ranking"),
            }),
            Downloads: dir({ "wallpaper.png": file("[dados binários]") }),
            ".cofre": dir({
              "flag.txt": file(RECON_FLAG),
              ".aviso": file("Parabéns por chegar até aqui! Agora leia o flag.txt."),
            }),
          }),
        }),
        etc: dir({ hostname: file("kali") }),
        tmp: dir(),
      }),
    },
  ],
};

/** Laboratório 2: invasão de servidor (nmap, grep em vazamento, ssh) */
const SSH_FLAG = "FLAG{senha_vazada_vira_acesso_total}";

export const SSH: Scenario = {
  id: "terminal-ssh",
  flag: SSH_FLAG,
  start: { ip: "10.0.0.2", user: "hacker" },
  welcome: [
    "Laboratório: servidor da ACME (ambiente 100% simulado).",
    "Leia o arquivo missao.txt para começar. Digite help se precisar.",
  ],
  commands: ["help", "ls", "cd", "cat", "grep", "find", "nmap", "ssh", "exit", "whoami", "clear"],
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
                "ALVO: servidor da ACME em 10.0.0.5",
                "",
                "Plano de ataque:",
                "  1) Descubra quais serviços estão abertos (nmap).",
                "  2) O arquivo vazamento.txt veio de um vazamento de dados antigo.",
                "     Será que a senha do administrador está lá?",
                "  3) Entre no servidor e procure a FLAG.",
              ].join("\n")
            ),
            "vazamento.txt": file(
              [
                "joao:futebol10",
                "maria:qwerty123",
                "carlos:senha123",
                "ana:12345678",
                "pedro:abc12345",
                "admin:Acme@2024",
                "julia:iloveyou",
                "rafael:password1",
                "bia:mudar123",
                "lucas:corinthians",
              ].join("\n")
            ),
          }),
        }),
      }),
    },
    {
      hostname: "acme-srv",
      ip: "10.0.0.5",
      ports: [
        { port: 22, service: "ssh" },
        { port: 80, service: "http" },
      ],
      users: {
        admin: { home: "/home/admin", password: "Acme@2024" },
        root: { home: "/root", password: "R00t!Imp0ssivel#9" },
      },
      fs: dir({
        home: dir({
          admin: dir({
            "lembrete.txt": file(
              [
                "TODO do sysadmin:",
                "- trocar a senha do admin (ainda é a padrão!)",
                "- apagar os backups antigos de /var/backups",
              ].join("\n")
            ),
          }),
        }),
        var: dir({
          backups: dir({
            "db.sql.bak": file(
              [
                "-- Backup automático do banco da ACME",
                "INSERT INTO clientes VALUES (1, 'Helena Prado');",
                "INSERT INTO clientes VALUES (2, 'Marcos Lima');",
                `-- ${SSH_FLAG}`,
              ].join("\n")
            ),
          }),
          www: dir({ "index.html": file("<h1>ACME Ltda</h1>") }),
        }),
        etc: dir({ hostname: file("acme-srv") }),
        root: dir({ "segredos.txt": file("só o root lê isto"), }, ["root"]),
      }),
    },
  ],
};

export const SCENARIOS: Record<string, Scenario> = {
  "terminal-recon": RECON,
  "terminal-ssh": SSH,
  ...TERMINAL_MODULE_SCENARIOS,
  ...TERMINAL_PRESSURE_SCENARIOS,
  ...TERMINAL_NETWORKING_SCENARIOS,
  ...TERMINAL_AD_SCENARIOS,
  ...TERMINAL_PENTEST_SCENARIOS,
  ...TERMINAL_SIEM_SCENARIOS,
  ...TERMINAL_MALWARE_SCENARIOS,
};
