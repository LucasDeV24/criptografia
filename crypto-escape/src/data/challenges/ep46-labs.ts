import type { Challenge, LabChallenge, TheoryChallenge } from '@/types/challenge';

const labs0: TheoryChallenge = {
  id: 'labs.0',
  type: 'theory',
  episode: 46,
  room: '46.0',
  title: 'Modo Hacker — Laboratórios práticos',
  description: 'Chegou a hora de sair do código isolado e praticar como um pentester de verdade: com terminal e sites vulneráveis.',
  content: `
**Como funciona**
Nestes laboratórios você usa um terminal e sites falsos que rodam dentro do seu navegador. Seu objetivo é capturar uma **FLAG** (um texto no formato FLAG{...}), como nos campeonatos de CTF.

**Tudo é simulado**
Nada aqui acessa a internet, ataca alguém ou executa código perigoso. Os "servidores" e "sites" são de mentira e existem só para você treinar.

**Ética e lei**
Invadir sistemas sem autorização é crime. No Brasil, a Lei 12.737/2012 (Lei Carolina Dieckmann) pune a invasão de dispositivos informáticos. Pratique apenas em ambientes que você tem permissão para testar: laboratórios como estes, ou plataformas feitas para isso.

**O que você vai treinar**
• Terminal: navegar, ler arquivos, achar arquivos ocultos, usar nmap e ssh
• SQL Injection: burlar um login vulnerável
• XSS: roubar o cookie de um administrador
• IDOR: acessar dados de outra pessoa mudando um número na URL
  `,
};

const labs1: LabChallenge = {
  id: 'labs.1',
  type: 'lab',
  episode: 46,
  room: '46.1',
  labId: 'terminal-recon',
  title: 'Lab 1 — Primeiros passos no terminal',
  description: 'Você está dentro de uma máquina Linux. A missão: encontrar a flag escondida.',
  instructions: 'Use o terminal para achar o arquivo flag.txt escondido e leia o conteúdo dele.',
  difficulty: 'easy',
  hints: [
    'Comece lendo o README.txt com o comando cat README.txt',
    'Arquivos e pastas que começam com ponto ficam ocultos. Tente ls -a',
    'Existe uma pasta oculta chamada .cofre. Entre nela com cd .cofre e leia o flag.txt',
  ],
  explanation: `
**Por que arquivos ocultos importam?**
No Linux, qualquer nome que começa com ponto fica escondido do \`ls\` comum. Configurações, chaves e históricos costumam ficar assim. Quem investiga um sistema sempre usa \`ls -a\`.

**Comandos que você usou**
\`ls\` lista, \`cd\` entra em pastas, \`cat\` mostra arquivos.
  `,
};

const labs2: LabChallenge = {
  id: 'labs.2',
  type: 'lab',
  episode: 46,
  room: '46.2',
  labId: 'terminal-ssh',
  title: 'Lab 2 — Invasão ao servidor da ACME',
  description: 'Um vazamento de dados antigo pode entregar a chave de um servidor. Descubra o alvo, ache a senha e entre.',
  instructions: 'Leia a missão, descubra as portas do alvo com nmap, encontre a senha do admin no vazamento, entre por ssh e procure a flag.',
  difficulty: 'medium',
  hints: [
    'Comece com cat missao.txt. O alvo é o 10.0.0.5',
    'nmap 10.0.0.5 mostra a porta 22 (ssh) aberta. Já dá para tentar entrar como admin',
    'A senha do admin está no vazamento: grep admin vazamento.txt. Depois use ssh admin@10.0.0.5',
    'Dentro do servidor, o lembrete.txt cita a pasta /var/backups. Use ls e cat lá dentro. Se quiser, find / -name "*.bak"',
  ],
  explanation: `
**O que aconteceu aqui?**
O admin **reutilizou uma senha** que já tinha vazado e nunca a trocou. Com ela, o atacante entrou por SSH e achou um backup esquecido com informações sensíveis.

**Como se defender**
• Nunca reutilizar senhas, e usar um gerenciador de senhas
• Ativar autenticação em dois fatores e chaves SSH em vez de senha
• Não deixar backups soltos no servidor
• Monitorar logins vindos de lugares estranhos
  `,
};

const labs3: LabChallenge = {
  id: 'labs.3',
  type: 'lab',
  episode: 46,
  room: '46.3',
  labId: 'web-sqli',
  title: 'Lab 3 — SQL Injection no login',
  description: 'O Banco ACME monta a consulta do login juntando texto. Entre como administrador sem saber a senha.',
  instructions: 'Faça login como admin sem conhecer a senha. Observe a consulta SQL mudando enquanto você digita.',
  difficulty: 'medium',
  hints: [
    'Olhe a consulta SQL abaixo do formulário. Seu texto vai direto para dentro dela',
    'Uma aspa simples (\') fecha o texto que o servidor esperava. O que vem depois vira código SQL',
    'Em SQL, -- transforma o resto da linha em comentário. Isso descarta a checagem de senha',
    'Tente o usuário admin\'-- (com qualquer senha). Outra ideia: \' OR 1=1--',
  ],
  explanation: `
**Por que funciona?**
O servidor monta a consulta por concatenação de texto. O que você digita deixa de ser dado e vira parte do comando SQL.

**Como consertar**
Use **consultas parametrizadas** (prepared statements): a consulta e os valores vão separados, então o banco nunca trata a entrada como código. Também: guardar senhas com hash (bcrypt/argon2), dar poucas permissões ao usuário do banco e validar a entrada.
  `,
};

const labs4: LabChallenge = {
  id: 'labs.4',
  type: 'lab',
  episode: 46,
  room: '46.4',
  labId: 'web-xss',
  title: 'Lab 4 — XSS: roubando um cookie',
  description: 'Um livro de visitas exibe comentários sem filtrar nada. O administrador (logado) vai ler o que você postar.',
  instructions: 'Poste um comentário que faça o navegador do admin revelar o cookie de sessão dele.',
  difficulty: 'medium',
  hints: [
    'O site coloca o seu texto no HTML sem escapar. Então tags HTML funcionam',
    'Tags <script> executam JavaScript quando a página carrega',
    'O cookie de sessão fica em document.cookie',
    'Tente: <script>alert(document.cookie)</script>. Depois, ligue a Proteção e veja o que muda',
  ],
  explanation: `
**O que é XSS armazenado?**
O texto malicioso fica salvo no site e roda no navegador de **todo mundo** que abrir a página, inclusive o do administrador. Com o cookie de sessão, o atacante pode se passar por ele.

**Como consertar**
• Escapar a saída (transformar < em &lt;), que é o que o botão de Proteção faz
• Usar Content Security Policy (CSP)
• Marcar cookies de sessão como HttpOnly (o JavaScript não consegue lê-los)
  `,
};

const labs5: LabChallenge = {
  id: 'labs.5',
  type: 'lab',
  episode: 46,
  room: '46.5',
  labId: 'web-idor',
  title: 'Lab 5 — IDOR: a conta dos outros',
  description: 'Você vê o extrato da sua conta pela URL. O site confere se essa conta é mesmo sua?',
  instructions: 'Acesse o extrato de outra pessoa (a diretora financeira, conta 1001) mudando a URL e encontre a flag.',
  difficulty: 'easy',
  hints: [
    'Olhe a URL: termina em ?id=1042, o número da SUA conta',
    'O que acontece se você trocar o número na barra de endereço?',
    'A conta da diretora é a 1001. Troque o id e clique em Ir',
  ],
  explanation: `
**O que é IDOR?**
*Insecure Direct Object Reference*: o site confia no número da URL e não verifica se você tem permissão de ver aquele dado. É uma das falhas mais comuns em APIs.

**Como consertar**
• Sempre checar no servidor se o usuário logado é dono do recurso
• Usar identificadores difíceis de adivinhar (UUID), sem depender só disso
• Registrar tentativas de acesso a dados de terceiros
  `,
};

const labs6: TheoryChallenge = {
  id: 'labs.6',
  type: 'theory',
  episode: 46,
  room: '46.6',
  title: 'Missão cumprida — e agora?',
  description: 'Você praticou terminal, SQL Injection, XSS e IDOR. Veja onde continuar treinando de forma legal.',
  content: `
**O que você aprendeu**
• Explorar um sistema pelo terminal (ls, cat, grep, nmap, ssh)
• Que dados de entrada nunca podem virar código (SQLi e XSS)
• Que o servidor sempre precisa checar permissões (IDOR)

**Onde treinar de verdade (legal e gratuito)**
• TryHackMe e Hack The Box: laboratórios guiados
• OWASP Juice Shop e DVWA: sites vulneráveis que você roda no seu computador
• PortSwigger Web Security Academy: excelente para falhas web

**Lembre-se**
Só teste sistemas com autorização por escrito. O caminho profissional é o de pentester e de bug bounty (programas que autorizam e pagam por falhas encontradas).
  `,
};

export const labChallenges: Challenge[] = [labs0, labs1, labs2, labs3, labs4, labs5, labs6];
