import { dir, file, ran } from "./terminal-engine";
import type { Scenario } from "./terminal-engine";

/**
 * Laboratórios do módulo "Redes: como a internet funciona" (episódio 49).
 * Continuação do terminal: ping, traceroute, dig, whois e curl.
 */

const FLAG_DNS = "FLAG{dns_txt_esconde_segredos}";
const FLAG_HTTP = "FLAG{robots_txt_nao_e_seguranca}";

const start = { ip: "10.0.0.2", user: "aluno" };
const alunoPc = {
  hostname: "aluno-pc",
  ip: "10.0.0.2",
  ports: [],
  users: { aluno: { home: "/home/aluno" } },
};

// ======================= Lab 1: quem está no ar? (ping/traceroute) =======================

export const TERM_NET_PING: Scenario = {
  id: "term-net-ping",
  start,
  welcome: ["Terminal do laboratório (simulado).", "Leia missao.txt e confira se os servidores estão respondendo."],
  commands: ["help", "cat", "ping", "traceroute", "clear"],
  machines: [
    {
      ...alunoPc,
      fs: dir({
        home: dir({
          aluno: dir({
            "missao.txt": file(
              [
                "Confira estes 3 servidores:",
                "  10.0.0.9   (servidor-web)",
                "  10.0.0.15  (servidor-backup)",
                "  10.0.0.99  (servidor-antigo, deveria ter sido desligado)",
                "",
                "Um deles não responde por causa de um firewall (mas está ligado).",
                "Outro realmente não existe mais.",
              ].join("\n")
            ),
          }),
        }),
      }),
    },
    { hostname: "servidor-web", ip: "10.0.0.9", ports: [{ port: 80, service: "http" }], users: {}, fs: dir({}) },
    { hostname: "servidor-backup", ip: "10.0.0.15", ports: [{ port: 22, service: "ssh" }], users: {}, fs: dir({}), pingBlocked: true },
  ],
  tasks: [
    { label: "Ler a missão (cat missao.txt)", done: (st) => ran(st, /^cat\b.*missao\.txt/) },
    { label: "Testar o servidor principal (ping 10.0.0.9)", done: (st) => ran(st, /^ping\s+10\.0\.0\.9\b/) },
    { label: "Testar o servidor de backup (ping 10.0.0.15)", done: (st) => ran(st, /^ping\s+10\.0\.0\.15\b/) },
    { label: "Testar o servidor antigo (ping 10.0.0.99)", done: (st) => ran(st, /^ping\s+10\.0\.0\.99\b/) },
    { label: "Ver o caminho até o servidor principal (traceroute)", done: (st) => ran(st, /^traceroute\s+10\.0\.0\.9\b/) },
  ],
  solution: ["cat missao.txt", "ping 10.0.0.9", "ping 10.0.0.15", "ping 10.0.0.99", "traceroute 10.0.0.9"],
};

// ======================= Lab 2: o que o DNS esconde =======================

export const TERM_NET_DNS: Scenario = {
  id: "term-net-dns",
  start,
  flag: FLAG_DNS,
  welcome: ["Terminal do laboratório (simulado).", "Leia missao.txt: existe um domínio suspeito para investigar."],
  commands: ["help", "cat", "dig", "whois", "clear"],
  dns: {
    "mensageria-loja.com.br": [
      { type: "A", value: "10.0.0.9" },
      { type: "NS", value: "ns1.registrodominio.br" },
      { type: "TXT", value: "v=spf1 -all" },
      { type: "TXT", value: `debug=true chave_temp=${FLAG_DNS} remover_antes_de_produzir` },
    ],
  },
  whois: {
    "mensageria-loja.com.br": ["Domain Name: MENSAGERIA-LOJA.COM.BR", "Registrant: Loja Online Ltda", "Criado em: 2019-03-14"],
  },
  machines: [
    {
      ...alunoPc,
      fs: dir({
        home: dir({
          aluno: dir({
            "missao.txt": file(
              [
                "Um domínio suspeito apareceu num relatório de phishing: mensageria-loja.com.br",
                "",
                "Descubra para onde ele aponta e investigue os registros DNS com cuidado.",
                "Às vezes sobra informação onde não deveria.",
              ].join("\n")
            ),
          }),
        }),
      }),
    },
  ],
  solution: ["cat missao.txt", "dig mensageria-loja.com.br"],
};

// ======================= Lab 3: o que o servidor revela sem querer =======================

export const TERM_NET_HTTP: Scenario = {
  id: "term-net-http",
  start,
  flag: FLAG_HTTP,
  welcome: ["Terminal do laboratório (simulado).", "O servidor 10.0.0.9 está no ar. Explore o que ele expõe."],
  commands: ["help", "cat", "curl", "clear"],
  machines: [
    {
      ...alunoPc,
      fs: dir({
        home: dir({
          aluno: dir({
            "missao.txt": file(
              [
                "Investigue o servidor 10.0.0.9 (porta 80).",
                "",
                "Dica: todo site deveria ter um robots.txt. E lembre-se:",
                '"Disallow" é um pedido para buscadores, não uma trava de segurança.',
              ].join("\n")
            ),
          }),
        }),
      }),
    },
    {
      hostname: "loja-web",
      ip: "10.0.0.9",
      ports: [{ port: 80, service: "http" }],
      users: {},
      fs: dir({}),
      http: {
        "/": { status: 200, headers: { Server: "Apache/2.4.41", "X-Powered-By": "PHP/7.2.3" }, body: "<h1>Loja Online</h1><p>Bem-vindo!</p>" },
        "/robots.txt": { status: 200, body: ["User-agent: *", "Disallow: /painel-interno", "Disallow: /backup-antigo"].join("\n") },
        "/painel-interno": {
          status: 200,
          headers: { "X-Internal-Token": FLAG_HTTP },
          body: "Painel interno — área restrita (ambiente de teste, sem login de verdade aqui)",
        },
      },
    },
  ],
  solution: ["cat missao.txt", "curl -i http://10.0.0.9/", "curl http://10.0.0.9/robots.txt", "curl -i http://10.0.0.9/painel-interno"],
};

export const TERMINAL_NETWORKING_SCENARIOS: Record<string, Scenario> = {
  "term-net-ping": TERM_NET_PING,
  "term-net-dns": TERM_NET_DNS,
  "term-net-http": TERM_NET_HTTP,
};
