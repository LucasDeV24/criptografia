import type { Challenge, LabChallenge, TheoryChallenge } from '@/types/challenge';

/**
 * Módulo "Cloud: erros de configuração" (episódio 54).
 * Comando novo: aws s3 ls / aws s3 cp — nunca "invade" nada; só lê o que já está
 * exposto por má configuração. O erro é sempre de configuração, nunca uma falha do provedor.
 */

const t0: TheoryChallenge = {
  id: 'cloud.0',
  type: 'theory',
  episode: 54,
  room: '54.0',
  title: 'O modelo de responsabilidade compartilhada',
  description: 'Na nuvem, o provedor protege a infraestrutura. Configurar corretamente é sempre problema de quem usa.',
  content: `
**O erro mais comum em segurança na nuvem não é uma falha técnica**
É configuração. Provedores como AWS, Azure e Google Cloud seguem o chamado **modelo de responsabilidade compartilhada**: o provedor garante que os servidores físicos, a rede e o hardware são seguros; quem usa o serviço é responsável por configurar corretamente cada recurso que cria — quem pode acessar, o que fica público, o que fica privado.

**Um exemplo real e repetido**
Um dos erros mais documentados na história da segurança em nuvem é o **bucket S3 público por engano**: alguém cria um espaço de armazenamento na AWS (um "bucket") para guardar arquivos e, sem perceber, deixa a opção de acesso público ativada. Isso já vazou dados de empresas grandes e pequenas — o mecanismo é sempre o mesmo: o provedor funcionou exatamente como configurado, só que a configuração estava errada.

**Neste módulo**
Você vai praticar o lado do pentester: encontrar e confirmar esse tipo de erro usando os mesmos comandos de linha de comando que uma equipe de nuvem usaria no dia a dia.
  `,
};

const t1: TheoryChallenge = {
  id: 'cloud.1',
  type: 'theory',
  episode: 54,
  room: '54.1',
  title: 'aws s3 ls: listando o conteúdo de um bucket',
  description: 'O comando oficial da AWS para inspecionar armazenamento em nuvem, direto do terminal.',
  content: `
**O que é um bucket**
Um "bucket" é um espaço de armazenamento de arquivos na nuvem (o equivalente, na AWS, a uma pasta gigante acessível pela internet). Cada bucket tem um nome único, no mundo inteiro, e pode ser **público** (qualquer pessoa acessa) ou **privado** (só quem tem permissão).

**O comando aws s3 ls**
\`aws s3 ls s3://<bucket>\` lista os arquivos dentro de um bucket:
\`\`\`
aws s3 ls s3://nimbus-contabilidade-backups
\`\`\`
Se o bucket for público, você vê a lista de arquivos sem precisar de nenhuma credencial — é exatamente esse comportamento que expõe dados por engano.

**Se o nome do bucket estiver errado**
A AWS responde com um erro claro (\`NoSuchBucket\`, "o bucket especificado não existe"). É diferente de "privado" — significa que esse nome simplesmente não existe.
  `,
};

const t2: TheoryChallenge = {
  id: 'cloud.2',
  type: 'theory',
  episode: 54,
  room: '54.2',
  title: 'aws s3 cp: baixando o que está exposto',
  description: 'E o que acontece quando o bucket existe, mas está corretamente protegido.',
  content: `
**O comando aws s3 cp**
Depois de listar o conteúdo de um bucket público, \`aws s3 cp\` baixa um arquivo específico. Usando \`-\` como destino, o conteúdo aparece direto na tela, em vez de salvar em disco:
\`\`\`
aws s3 cp s3://nimbus-contabilidade-backups/clientes_completo.csv -
\`\`\`

**Quando o bucket está protegido**
Se o bucket existir mas NÃO for público, a AWS responde \`AccessDenied\` ("acesso negado"). Isso não é um erro seu — é o resultado correto e esperado de tentar acessar algo que está configurado do jeito certo. É uma informação tão útil quanto encontrar um bucket exposto: confirma que, nesse caso específico, a configuração está certa.

**Resumindo os três resultados possíveis**
| Resposta | O que significa |
|---|---|
| Lista de arquivos | Bucket existe e está público — vazamento confirmado |
| AccessDenied | Bucket existe e está protegido — configuração correta |
| NoSuchBucket | Esse nome de bucket não existe |
  `,
};

const lab1: LabChallenge = {
  id: 'cloud.3',
  type: 'lab',
  episode: 54,
  room: '54.3',
  labId: 'term-cloud-bucket',
  title: 'Lab 1 — Bucket exposto',
  description: 'Um cliente encontrou dados da Nimbus Contabilidade indexados no Google. Investigue.',
  instructions: 'Teste os dois nomes de bucket candidatos e baixe o que estiver exposto.',
  difficulty: 'easy',
  hints: [
    'cat missao.txt para o contexto',
    'aws s3 ls s3://nimbus-contabilidade-backups',
    'Se listar arquivos, baixe um com aws s3 cp s3://<bucket>/<arquivo> -',
    'Teste também o outro bucket, para comparar um resultado protegido com um exposto',
  ],
  explanation: `
**O que você encontrou**
O bucket "nimbus-contabilidade-backups" está público: qualquer pessoa lista e baixa o arquivo de clientes, com nome, CPF e saldo — exatamente o tipo de vazamento que motores de busca chegam a indexar. Já o bucket do concorrente respondeu AccessDenied: existe, mas está corretamente protegido.

**Por que isso importa:** o contraste entre os dois resultados é a prova de que o problema não é o serviço de nuvem em si — é a configuração de cada bucket, individualmente.
  `,
};

const t3: TheoryChallenge = {
  id: 'cloud.4',
  type: 'theory',
  episode: 54,
  room: '54.4',
  title: 'Nomes de bucket são adivinháveis',
  description: 'Como um pentester encontra buckets sem saber os nomes de antemão.',
  content: `
**O problema de adivinhar nomes**
Nomes de bucket costumam seguir um padrão previsível: \`<empresa>-<ambiente>\`, como \`empresa-prod\`, \`empresa-dev\`, \`empresa-backup\`, \`empresa-assets\`. Um pentester (ou um atacante) frequentemente nem precisa "descobrir" o nome — só testar as variações mais comuns para o nome da empresa. Ferramentas reais de reconhecimento em nuvem automatizam exatamente essa lista de tentativas.

**O que esperar ao testar vários nomes**
Numa checagem real, é normal bater em uma mistura dos três resultados da sala anterior: nomes que não existem, buckets que existem mas estão protegidos, e — se a empresa cometeu o erro comum — algum que está exposto.

**No próximo laboratório**
Você vai repetir esse processo, testando uma lista curta de nomes prováveis, contra o relógio.
  `,
};

const lab2: LabChallenge = {
  id: 'cloud.5',
  type: 'lab',
  episode: 54,
  room: '54.5',
  labId: 'term-cloud-hunt',
  title: 'Lab 2 — Adivinhando o bucket certo',
  description: 'CRONOMETRADO. A Vetra Logística contratou o pentest. Ache o bucket mal configurado.',
  instructions: 'Teste os três nomes candidatos com aws s3 ls e baixe o que estiver exposto.',
  difficulty: 'medium',
  hints: [
    'Teste os três nomes, um por um, com aws s3 ls s3://<nome>',
    'Um vai dar NoSuchBucket (não existe), outro AccessDenied (protegido)',
    'O que sobrar deve listar um arquivo — baixe com aws s3 cp ... -',
  ],
  explanation: `
**O bucket era "vetra-logistica-dev-backup"**
O ambiente de "assets" nem existia com esse nome, o de produção estava protegido, mas o backup de desenvolvimento estava público — e continha um arquivo de configuração com senha de banco de dados e uma credencial de nuvem em texto puro.

**A lição principal**
Ambientes de desenvolvimento e backup são, na prática, os mais esquecidos na hora de revisar permissões — e são exatamente os que mais aparecem expostos em incidentes reais.
  `,
};

const tEnd: TheoryChallenge = {
  id: 'cloud.6',
  type: 'theory',
  episode: 54,
  room: '54.6',
  title: 'Parabéns! Você já audita configurações de nuvem como um pentester',
  description: 'O modelo de responsabilidade compartilhada explica por trás de boa parte dos vazamentos de dados hoje.',
  content: `
**O que você aprendeu**
• O que é o modelo de responsabilidade compartilhada na nuvem
• Listar e baixar o conteúdo de um bucket S3 (aws s3 ls, aws s3 cp)
• Diferenciar bucket exposto, protegido e inexistente
• Por que nomes de bucket previsíveis são um vetor real de reconhecimento

**Ferramentas reais equivalentes**
No trabalho, você usaria o AWS CLI de verdade (o mesmo comando que praticou aqui), além de ferramentas de auditoria como o AWS Trusted Advisor, o S3 Inspector ou scanners de bucket público de terceiros — e o mesmo raciocínio se aplica a erros equivalentes no Azure (Blob Storage) e no Google Cloud (Cloud Storage).

**Onde continuar**
TryHackMe tem salas dedicadas a "AWS" e a fundamentos de segurança em nuvem para quem quiser se aprofundar além do simulado.
  `,
};

export const cloudChallenges: Challenge[] = [t0, t1, t2, lab1, t3, lab2, tEnd];
