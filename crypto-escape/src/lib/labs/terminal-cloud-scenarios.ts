import { dir, file, ran } from "./terminal-engine";
import type { Scenario } from "./terminal-engine";

/**
 * Laboratórios do módulo "Cloud: erros de configuração" (episódio 54).
 * Comando novo: aws s3 ls / aws s3 cp — leem Scenario.s3Buckets (bucket público
 * ou privado; NoSuchBucket/NoSuchKey são erro, AccessDenied é resultado informativo,
 * como o "não injetável" do sqlmap).
 */

const analista = {
  hostname: "estacao-pentest",
  ip: "10.0.0.23",
  ports: [],
  users: { analista: { home: "/home/analista" } },
};

// ======================= Lab 1: bucket exposto (sem cronômetro) =======================

const CLIENTES_CSV = [
  "nome,cpf,saldo",
  "João Silva,111.111.111-11,15000",
  "Maria Souza,222.222.222-22,8700",
  "Carlos Prado,333.333.333-33,42300",
].join("\n");

export const TERM_CLOUD_BUCKET: Scenario = {
  id: "term-cloud-bucket",
  start: { ip: "10.0.0.23", user: "analista" },
  welcome: [
    "Terminal do laboratório (simulado).",
    "Um cliente encontrou dados da Nimbus Contabilidade indexados no Google. Investigue.",
  ],
  commands: ["help", "cat", "aws"],
  machines: [
    {
      ...analista,
      fs: dir({
        home: dir({
          analista: dir({
            "missao.txt": file(
              [
                "A Nimbus Contabilidade foi citada num fórum: alguém encontrou um arquivo",
                "com dados de clientes indexado pelo Google, vindo de um bucket S3.",
                "",
                "Um levantamento anterior (OSINT) sugere dois nomes de bucket candidatos:",
                "  - nimbus-contabilidade-backups (da própria Nimbus)",
                "  - protegido-corp-backups (de um concorrente, achado na mesma busca)",
                "",
                "Teste os dois com 'aws s3 ls s3://<bucket>'. Se algum estiver público,",
                "baixe o conteúdo com 'aws s3 cp s3://<bucket>/<chave> -'.",
              ].join("\n")
            ),
          }),
        }),
      }),
    },
  ],
  s3Buckets: {
    "nimbus-contabilidade-backups": {
      public: true,
      objects: { "clientes_completo.csv": CLIENTES_CSV },
    },
    "protegido-corp-backups": {
      public: false,
      objects: {},
    },
  },
  tasks: [
    { label: "Ler a missão (cat missao.txt)", done: (st) => ran(st, /^cat\b.*missao\.txt/) },
    { label: "Testar o bucket da Nimbus (aws s3 ls)", done: (st) => ran(st, /^aws s3 ls s3:\/\/nimbus-contabilidade-backups/) },
    { label: "Baixar o arquivo exposto (aws s3 cp ... -)", done: (st) => ran(st, /^aws s3 cp s3:\/\/nimbus-contabilidade-backups\/clientes_completo\.csv -/) },
    { label: "Testar o bucket do concorrente, por comparação", done: (st) => ran(st, /^aws s3 ls s3:\/\/protegido-corp-backups/) },
  ],
  solution: [
    "cat missao.txt",
    "aws s3 ls s3://nimbus-contabilidade-backups",
    "aws s3 cp s3://nimbus-contabilidade-backups/clientes_completo.csv -",
    "aws s3 ls s3://protegido-corp-backups",
  ],
};

// ======================= Lab 2: adivinhando nomes de bucket (CRONOMETRADO) =======================

const CONFIG_ENV = [
  "DB_HOST=interno.vetra-logistica.local",
  "DB_USER=app_prod",
  "DB_PASSWORD=Vetra@2024",
  "AWS_SECRET_ACCESS_KEY=fake0000000000000000000000000000000000",
  "# FLAG{buckets_com_nome_previsivel_vazam_segredos}",
].join("\n");

export const TERM_CLOUD_HUNT: Scenario = {
  id: "term-cloud-hunt",
  start: { ip: "10.0.0.23", user: "analista" },
  flag: "FLAG{buckets_com_nome_previsivel_vazam_segredos}",
  welcome: [
    "⏱ CRONÔMETRO ATIVO — laboratório simulado.",
    "A Vetra Logística contratou o pentest. Ache o bucket mal configurado.",
  ],
  commands: ["help", "cat", "aws"],
  timeLimitSeconds: 200,
  timeoutMessage: "Tempo esgotado! Enquanto você testava os nomes, o segredo exposto continuava público para qualquer pessoa na internet. Tente de novo.",
  machines: [
    {
      ...analista,
      fs: dir({
        home: dir({
          analista: dir({
            "missao.txt": file(
              [
                "Pentest autorizado na Vetra Logística. O reconhecimento (OSINT) já",
                "levantou 3 nomes de bucket prováveis, seguindo o padrão de nomenclatura",
                "que a empresa usa em outros serviços públicos:",
                "",
                "  - vetra-logistica-assets",
                "  - vetra-logistica-prod",
                "  - vetra-logistica-dev-backup",
                "",
                "Teste os três com 'aws s3 ls'. Um pode nem existir, outro pode estar",
                "protegido, e outro pode estar público. Ache o que está exposto e",
                "veja o que ele revela.",
              ].join("\n")
            ),
          }),
        }),
      }),
    },
  ],
  s3Buckets: {
    "vetra-logistica-prod": { public: false, objects: {} },
    "vetra-logistica-dev-backup": {
      public: true,
      objects: { "config.env": CONFIG_ENV },
    },
  },
  solution: [
    "cat missao.txt",
    "aws s3 ls s3://vetra-logistica-assets",
    "aws s3 ls s3://vetra-logistica-prod",
    "aws s3 ls s3://vetra-logistica-dev-backup",
    "aws s3 cp s3://vetra-logistica-dev-backup/config.env -",
  ],
};

export const TERMINAL_CLOUD_SCENARIOS: Record<string, Scenario> = {
  "term-cloud-bucket": TERM_CLOUD_BUCKET,
  "term-cloud-hunt": TERM_CLOUD_HUNT,
};
