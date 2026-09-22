import { dir, file, ran } from "./terminal-engine";
import type { AdGroup, AdUser, Scenario } from "./terminal-engine";

/**
 * Laboratórios do módulo "Active Directory: fundamentos" (episódio 50).
 * Reaproveita comandos já ensinados (ssh, cat, net) — só o `net` é novo, ensinado na teoria.
 */

const FLAG_AD = "FLAG{grupo_aninhado_vira_admin}";

// O domínio é o mesmo em toda a história: representa um único diretório corporativo (CORP)
const AD_USERS: AdUser[] = [
  { name: "aoliveira", description: "Analista financeiro", groups: ["Domain Users"] },
  { name: "rsantos", description: "RH - novo colaborador", groups: ["Domain Users"] },
  { name: "mferreira", description: "Backup temporário enquanto a TI não libera o acesso normal: Outono2024!", groups: ["Domain Users", "Contas de Backup"] },
  { name: "jcosta", description: "Suporte N1", groups: ["Domain Users"] },
];
const AD_GROUPS: AdGroup[] = [
  { name: "Domain Users", members: ["aoliveira", "rsantos", "mferreira", "jcosta"] },
  { name: "Contas de Backup", members: ["mferreira"] },
  { name: "Domain Admins", members: ["adm_corp", "Contas de Backup"] },
];
const AD = { domain: "CORP", users: AD_USERS, groups: AD_GROUPS };

// ======================= Lab 1: enumerando o domínio (sem cronômetro) =======================

export const TERM_AD_ENUM: Scenario = {
  id: "term-ad-enum",
  start: { ip: "10.0.0.2", user: "hacker" },
  welcome: ["Terminal do laboratório (simulado).", "Você tem acesso de leitura ao domínio CORP. Enumere com cuidado."],
  commands: ["help", "cat", "net", "clear"],
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
                "Você conseguiu uma conexão de leitura ao domínio CORP.",
                "",
                "Enumere os usuários e os grupos. Alguma conta tem informação",
                "sensível demais no campo de descrição.",
              ].join("\n")
            ),
          }),
        }),
      }),
      ad: AD,
    },
  ],
  tasks: [
    { label: "Listar os usuários do domínio (net user)", done: (st) => ran(st, /^net\s+user\s*$/) },
    { label: "Listar os grupos do domínio (net group)", done: (st) => ran(st, /^net\s+group\s*$/) },
    { label: "Encontrar a conta com senha vazada na descrição (net user <nome>)", done: (st) => ran(st, /^net\s+user\s+mferreira/i) },
  ],
  solution: ["cat missao.txt", "net user", "net group", "net user mferreira"],
};

// ======================= Lab 2: o grupo aninhado (sem cronômetro) =======================

export const TERM_AD_ESCALATE: Scenario = {
  id: "term-ad-escalate",
  start: { ip: "10.0.0.2", user: "hacker" },
  flag: FLAG_AD,
  welcome: [
    "Terminal do laboratório (simulado).",
    "Você já tem uma credencial de domínio. Ela não parece ser de admin... será?",
  ],
  commands: ["help", "cat", "ssh", "exit", "net", "clear"],
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
                "Credencial encontrada no laboratório anterior:",
                "  usuário: mferreira",
                "  senha:   Outono2024!",
                "",
                "Ela pertence a um grupo chamado 'Contas de Backup', que parece",
                "inofensivo. Entre na estação corp-ws07 (10.0.0.40) e investigue",
                "a quais grupos esse grupo, por sua vez, pertence.",
              ].join("\n")
            ),
          }),
        }),
      }),
    },
    {
      hostname: "corp-ws07",
      ip: "10.0.0.40",
      ports: [{ port: 22, service: "ssh" }],
      users: { mferreira: { home: "/home/mferreira", password: "Outono2024!" } },
      fs: dir({
        home: dir({
          mferreira: dir({
            "leia-se.txt": file(
              "Lembrete: contas do grupo 'Contas de Backup' também têm acesso à corp-dc01 (10.0.0.30) para as rotinas automáticas."
            ),
          }),
        }),
      }),
      ad: AD,
    },
    {
      hostname: "corp-dc01",
      ip: "10.0.0.30",
      ports: [{ port: 22, service: "ssh" }],
      users: { mferreira: { home: "/home/mferreira", password: "Outono2024!" } },
      fs: dir({
        home: dir({
          mferreira: dir({
            "auditoria.txt": file(
              ["Este é o controlador de domínio (DC) da CORP.", "Qualquer conta que consiga logar aqui já tem acesso demais.", "", `-- ${FLAG_AD}`].join("\n")
            ),
          }),
        }),
      }),
    },
  ],
  solution: [
    "cat missao.txt",
    "ssh mferreira@10.0.0.40",
    "Outono2024!",
    'net group "Contas de Backup"',
    'net group "Domain Admins"',
    "cat leia-se.txt",
    "ssh mferreira@10.0.0.30",
    "Outono2024!",
    "cat auditoria.txt",
  ],
};

export const TERMINAL_AD_SCENARIOS: Record<string, Scenario> = {
  "term-ad-enum": TERM_AD_ENUM,
  "term-ad-escalate": TERM_AD_ESCALATE,
};
