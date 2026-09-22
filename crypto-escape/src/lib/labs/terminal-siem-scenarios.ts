import { dir, file, ran } from "./terminal-engine";
import type { Scenario } from "./terminal-engine";

/**
 * Laboratórios do módulo "Log e SIEM: investigação sob pressão" (episódio 52).
 * Sem comandos novos: reaproveita cat, grep, cut, sort, uniq, wc — o próprio "SIEM" é
 * o terminal, cruzando várias fontes de log ao mesmo tempo (cat aceita vários arquivos).
 */

const start = { ip: "10.0.0.2", user: "root" };
const soc = { hostname: "soc-analista", ip: "10.0.0.2", ports: [], users: { root: { home: "/root" } } };

const WEB_LOG = [
  "09:58:01 GET /login 200 10.0.0.7",
  "09:58:04 GET /produtos 200 10.0.0.7",
  "10:01:12 GET /login 200 198.51.100.9",
  "10:01:15 POST /login 401 198.51.100.9",
  "10:01:16 POST /login 401 198.51.100.9",
  "10:01:20 POST /login 200 198.51.100.9",
  "10:01:25 GET /admin 200 198.51.100.9",
  "10:01:40 GET /admin/exportar?tabela=clientes 200 198.51.100.9 sessao=FLAG{correlacionar_logs_conta_a_historia}",
  "10:05:02 GET /produtos 200 10.0.0.8",
].join("\n");

const AUTH_LOG = [
  "10:01:12 SSH_FALHA usuario=admin origem=198.51.100.9",
  "10:01:14 SSH_FALHA usuario=admin origem=198.51.100.9",
  "10:01:19 SSH_SUCESSO usuario=admin origem=198.51.100.9",
  "10:04:50 SSH_SUCESSO usuario=carla origem=10.0.0.15",
].join("\n");

const FIREWALL_LOG = [
  "09:00:00 PERMIT 10.0.0.7:51322 -> 10.0.0.9:443",
  "10:01:12 PERMIT 198.51.100.9:40211 -> 10.0.0.9:22",
  "10:01:19 PERMIT 198.51.100.9:40211 -> 10.0.0.9:22",
  "10:01:41 PERMIT 198.51.100.9:40501 -> 10.0.0.9:443",
  "10:02:03 PERMIT 198.51.100.9:40502 -> 203.0.113.44:4444",
].join("\n");

// ======================= Lab 1: cruzando fontes (sem cronômetro) =======================

export const TERM_SIEM_CORRELATE: Scenario = {
  id: "term-siem-correlate",
  start,
  welcome: ["Terminal do laboratório (simulado).", "Três fontes de log. Um IP aparece nas três — encontre-o."],
  commands: ["help", "cat", "grep", "cut", "sort", "uniq", "wc", "clear"],
  machines: [
    {
      ...soc,
      fs: dir({
        root: dir({
          "web.log": file(WEB_LOG),
          "auth.log": file(AUTH_LOG),
          "firewall.log": file(FIREWALL_LOG),
          "missao.txt": file(
            [
              "Três logs do mesmo período: web.log, auth.log, firewall.log.",
              "",
              "Encontre o IP que aparece nos três — provavelmente não é coincidência.",
              "Dica: grep funciona em vários arquivos de uma vez (grep termo arquivo1 arquivo2 arquivo3).",
            ].join("\n")
          ),
        }),
      }),
    },
  ],
  tasks: [
    { label: "Ler a missão (cat missao.txt)", done: (st) => ran(st, /^cat\b.*missao\.txt/) },
    { label: "Procurar o IP suspeito no log web (grep)", done: (st) => ran(st, /^grep\s+198\.51\.100\.9\s+web\.log/) },
    { label: "Procurar o mesmo IP no log de autenticação", done: (st) => ran(st, /^grep\s+198\.51\.100\.9\s+auth\.log/) },
    { label: "Procurar o mesmo IP no log de firewall", done: (st) => ran(st, /^grep\s+198\.51\.100\.9\s+firewall\.log/) },
  ],
  solution: ["cat missao.txt", "grep 198.51.100.9 web.log", "grep 198.51.100.9 auth.log", "grep 198.51.100.9 firewall.log"],
};

// ======================= Lab 2: reconstruindo a timeline (CRONOMETRADO) =======================

const FLAG_SIEM = "FLAG{correlacionar_logs_conta_a_historia}";

export const TERM_SIEM_TIMELINE: Scenario = {
  id: "term-siem-timeline",
  start,
  flag: FLAG_SIEM,
  welcome: ["⏱ CRONÔMETRO ATIVO — laboratório simulado.", "Um incidente aconteceu. Reconstrua a timeline e ache o que foi exfiltrado."],
  commands: ["help", "cat", "grep", "cut", "sort", "uniq", "wc", "clear"],
  timeLimitSeconds: 240,
  timeoutMessage: "Tempo esgotado! Sem a timeline reconstruída a tempo, o time de resposta não sabe o que foi comprometido nem quando conter. Tente de novo.",
  machines: [
    {
      ...soc,
      fs: dir({
        root: dir({
          "web.log": file(WEB_LOG),
          "auth.log": file(AUTH_LOG),
          "firewall.log": file(FIREWALL_LOG),
          "missao.txt": file(
            [
              "Um IP externo:",
              "  1) tentou (e conseguiu) autenticar por SSH",
              "  2) logo depois acessou uma área administrativa pelo site",
              "  3) exportou uma tabela",
              "  4) abriu uma conexão de saída para fora do padrão",
              "",
              "Reconstrua essa sequência nos três logs e confirme o que foi exportado.",
            ].join("\n")
          ),
        }),
      }),
    },
  ],
  solution: [
    "cat missao.txt",
    "grep 198.51.100.9 auth.log",
    "grep 198.51.100.9 web.log",
    "grep 198.51.100.9 firewall.log",
    "cat web.log",
  ],
};

export const TERMINAL_SIEM_SCENARIOS: Record<string, Scenario> = {
  "term-siem-correlate": TERM_SIEM_CORRELATE,
  "term-siem-timeline": TERM_SIEM_TIMELINE,
};
