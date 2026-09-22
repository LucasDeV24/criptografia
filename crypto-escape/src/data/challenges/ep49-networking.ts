import type { Challenge, LabChallenge, TheoryChallenge } from '@/types/challenge';

/**
 * Módulo "Redes: como a internet funciona" (episódio 49).
 * Continuação do terminal: ping, traceroute, dig, whois, curl. Preenche uma base que os
 * episódios de Cibersegurança (APIs, JWT, análise de rede) já pressupõem.
 */

const t0: TheoryChallenge = {
  id: 'net.0',
  type: 'theory',
  episode: 49,
  room: '49.0',
  title: 'Como os dados viajam: IP, portas e pacotes',
  description: 'Antes de atacar ou defender uma rede, é preciso entender como ela funciona. Comece pelo básico: como duas máquinas conversam.',
  content: `
**Endereço IP: o "endereço de casa" de um computador**
Todo computador em uma rede tem um endereço, como \`10.0.0.9\`. É por ele que os dados sabem para onde ir. Você já usou IPs desde o primeiro laboratório de terminal (\`ssh admin@10.0.0.5\`, \`nmap 10.0.0.5\`) — agora vamos entender o que tem por trás.

**Porta: o "apartamento" dentro do endereço**
Um computador pode rodar vários serviços ao mesmo tempo (um site, um servidor SSH, um banco de dados). A **porta** diz qual serviço você quer:
• Porta **80** → sites (HTTP)
• Porta **443** → sites com criptografia (HTTPS)
• Porta **22** → acesso remoto (SSH)

O \`nmap\` que você já usou mostra exatamente isso: quais portas estão abertas em um IP.

**Cliente e servidor**
Quando você abre um site, seu computador (**cliente**) pede algo, e o computador do site (**servidor**) responde. Praticamente toda a internet funciona nesse padrão de pergunta e resposta.

**Pacotes**
Os dados não viajam de uma vez: são divididos em pedaços pequenos, chamados **pacotes**, que podem até seguir caminhos diferentes até se juntarem de novo no destino. É por isso que existe o comando \`traceroute\`, que você vai conhecer na próxima sala: ele mostra o caminho (os "saltos") que os pacotes percorrem.
  `,
};

const t1: TheoryChallenge = {
  id: 'net.1',
  type: 'theory',
  episode: 49,
  room: '49.1',
  title: 'ping e traceroute: batendo na porta',
  description: 'Os dois comandos mais básicos para saber se alguém está do outro lado.',
  content: `
**ping: "tem alguém aí?"**
\`ping <host>\` envia um sinal simples para o destino e espera a resposta:
\`\`\`
ping 10.0.0.9
\`\`\`
Se responder, você vê o tempo de ida e volta (em milissegundos) de cada tentativa. Se não, ele mostra "Tempo esgotado" e, no fim, a porcentagem de perda.

**Cuidado: "não responde" não é sempre "está desligado"**
Muitos servidores são configurados para **ignorar o ping de propósito** (um firewall bloqueia esse tipo de sinal, chamado ICMP), mesmo estando ligados e funcionando normalmente em outras portas. Ping é só um indício, não uma prova. Um servidor pode não responder ao ping e mesmo assim responder perfeitamente por HTTP ou SSH.

**traceroute: o caminho até lá**
\`traceroute <host>\` mostra cada "salto" (roteador) que os pacotes atravessam até chegar ao destino:
\`\`\`
traceroute 10.0.0.9
\`\`\`
Cada linha numerada é um salto, com o tempo até ele. Quando um salto não responde, aparece \`* * *\`.

**Onde isso importa na segurança**
Antes de atacar ou defender, você precisa saber o que está no ar. \`ping\` e \`traceroute\` são os primeiros passos de qualquer reconhecimento de rede — mas, como você viu, não confie só neles.
  `,
};

const lab1: LabChallenge = {
  id: 'net.2',
  type: 'lab',
  episode: 49,
  room: '49.2',
  labId: 'term-net-ping',
  title: 'Lab 1 — Quem está no ar?',
  description: 'Três servidores para checar. Um está atrás de um firewall, outro realmente não existe mais.',
  instructions: 'Leia a missão e teste os três servidores com ping. Depois veja o caminho até o principal com traceroute.',
  difficulty: 'easy',
  hints: [
    'Comece com cat missao.txt',
    'Teste cada IP com ping <ip>. Repare nas diferenças entre as respostas',
    'O servidor de backup não responde ao ping, mas isso não quer dizer que está desligado',
    'Termine com traceroute 10.0.0.9',
  ],
  explanation: `
**O que cada resultado significa**
• \`10.0.0.9\` respondeu normalmente: está ligado e não bloqueia ping
• \`10.0.0.15\` não respondeu, mas existe (um firewall bloqueia o ping ali — na vida real, você confirmaria testando outras portas, como fizemos no laboratório de curl)
• \`10.0.0.99\` não existe: a saída é a mesma "sem resposta", e é por isso que ping sozinho nunca prova que algo está desligado

**Lição principal:** ping é um primeiro indício, não uma conclusão. Reconhecimento de rede de verdade combina várias ferramentas (você vai usar mais no restante deste módulo).
  `,
};

const t2: TheoryChallenge = {
  id: 'net.3',
  type: 'theory',
  episode: 49,
  room: '49.3',
  title: 'DNS: a agenda de contatos da internet',
  description: 'Ninguém decora números de IP. O DNS existe para transformar nomes em endereços.',
  content: `
**O problema que o DNS resolve**
Digitar \`10.0.0.9\` toda vez seria péssimo. O **DNS** (Domain Name System) traduz nomes fáceis de lembrar, como \`loja.com.br\`, para o IP de verdade por trás deles.

**Tipos de registro mais comuns**
• **A** → o endereço IP do domínio
• **MX** → para qual servidor vão os e-mails desse domínio
• **NS** → quais servidores respondem pelo DNS desse domínio
• **TXT** → texto livre. Serve para várias coisas (verificações, configurações de e-mail) — e, como você vai ver, às vezes guarda informação que não deveria estar pública

**dig: consultando o DNS**
\`dig <domínio>\` consulta os registros de um domínio:
\`\`\`
dig loja.com.br
\`\`\`
Mostra todos os registros do domínio de uma vez, na "ANSWER SECTION". Para ver só um tipo:
\`\`\`
dig loja.com.br TXT
\`\`\`

**whois: quem é o dono?**
\`whois <domínio>\` mostra dados do registro do domínio: quem é o responsável, quando foi criado.
\`\`\`
whois loja.com.br
\`\`\`

**Por que isso importa em segurança**
Consultar o DNS de um alvo (sem invadir nada, só olhando informação pública) é um dos primeiros passos de reconhecimento. Registros TXT, em especial, às vezes vazam informação que a empresa esqueceu de remover.
  `,
};

const lab2: LabChallenge = {
  id: 'net.4',
  type: 'lab',
  episode: 49,
  room: '49.4',
  labId: 'term-net-dns',
  title: 'Lab 2 — O que o DNS esconde',
  description: 'Um domínio suspeito apareceu em um relatório de phishing. Investigue os registros DNS dele.',
  instructions: 'Leia a missão e consulte o DNS do domínio com dig. Preste atenção em TODOS os registros, não só no óbvio.',
  difficulty: 'medium',
  hints: [
    'cat missao.txt tem o nome do domínio suspeito',
    'dig mensageria-loja.com.br mostra todos os registros de uma vez',
    'Repare: existe mais de um registro do tipo TXT. Leia todos com atenção',
    'Se quiser ver só os TXT: dig mensageria-loja.com.br TXT',
  ],
  explanation: `
**O que aconteceu**
O domínio tinha DOIS registros TXT. O primeiro parecia uma configuração normal de e-mail (SPF). O segundo era uma anotação de "debug" esquecida, com uma chave dentro — provavelmente um teste que alguém esqueceu de apagar antes de colocar no ar.

**Isso acontece na vida real?** Sim, com frequência. Registros TXT são texto livre, então times de desenvolvimento os usam para todo tipo de anotação temporária, e às vezes esquecem de removê-los. Ferramentas de reconhecimento (como \`dig\`, ou serviços como o crt.sh para certificados) são usadas exatamente para caçar esse tipo de vazamento acidental.
  `,
};

const t3: TheoryChallenge = {
  id: 'net.5',
  type: 'theory',
  episode: 49,
  room: '49.5',
  title: 'HTTP: como o navegador conversa com o servidor',
  description: 'Todo site que você visita usa este protocolo. Entendê-lo é essencial para tudo que vem depois no curso.',
  content: `
**O que é HTTP**
É o idioma que navegadores e servidores usam para conversar. Cada visita a um site é uma **requisição** (o que você pede) seguida de uma **resposta** (o que o servidor devolve).

**Códigos de status: a resposta em um número**
• **200** → deu certo
• **404** → não encontrado
• **403** → encontrado, mas sem permissão
• **500** → erro no servidor

**Cabeçalhos (headers): informação extra**
Além do conteúdo da página, a resposta traz cabeçalhos com metadados. Alguns são inofensivos, outros revelam mais do que deveriam — por exemplo, qual tecnologia o servidor usa por baixo dos panos, o que ajuda um atacante a procurar falhas conhecidas daquela versão.

**curl: fazendo a requisição pelo terminal**
\`curl <url>\` faz a requisição e mostra a resposta:
\`\`\`
curl http://10.0.0.9/
\`\`\`
Mostra só o conteúdo da resposta. Para ver também o status e os cabeçalhos, use \`-i\`:
\`\`\`
curl -i http://10.0.0.9/
\`\`\`

**robots.txt: um mal-entendido comum**
Muitos sites têm um arquivo \`/robots.txt\` dizendo a buscadores (como o Google) quais páginas **não indexar**:
\`\`\`
User-agent: *
Disallow: /painel-interno
\`\`\`
**Isso NÃO é proteção nenhuma.** É só um pedido educado para buscadores. Qualquer pessoa (ou ferramenta) pode acessar \`/painel-interno\` diretamente, ignorando o robots.txt completamente. Na prática, esse arquivo às vezes **entrega de bandeja** os caminhos mais sensíveis de um site para quem está procurando.
  `,
};

const lab3: LabChallenge = {
  id: 'net.6',
  type: 'lab',
  episode: 49,
  room: '49.6',
  labId: 'term-net-http',
  title: 'Lab 3 — O que o servidor revela sem querer',
  description: 'O servidor 10.0.0.9 está no ar. Veja o que ele expõe através de cabeçalhos e do robots.txt.',
  instructions: 'Use curl para explorar o servidor: comece pela página inicial com -i, depois veja o robots.txt, e tire suas conclusões.',
  difficulty: 'medium',
  hints: [
    'curl -i http://10.0.0.9/ mostra os cabeçalhos, que revelam a tecnologia do servidor',
    'Todo site deveria ter um robots.txt: curl http://10.0.0.9/robots.txt',
    '"Disallow" não é uma trava. Tente acessar o caminho listado, com -i: curl -i http://10.0.0.9/painel-interno',
  ],
  explanation: `
**O caminho até a flag**
1. Os cabeçalhos da home revelaram Apache e PHP com versões específicas (informação que ajudaria a procurar falhas conhecidas dessas versões)
2. O robots.txt "avisou" sobre /painel-interno, tentando esconder o caminho de buscadores
3. Acessar /painel-interno diretamente funcionou — nada impedia, porque o robots.txt não é segurança

**A lição principal:** segurança por obscuridade ("ninguém vai adivinhar esse caminho") não é segurança de verdade. Se um recurso precisa de proteção, ela tem que ser real — autenticação, autorização — não só "escondida".
  `,
};

const tEnd: TheoryChallenge = {
  id: 'net.7',
  type: 'theory',
  episode: 49,
  room: '49.7',
  title: 'Parabéns! Agora você entende como a internet funciona',
  description: 'Você aprendeu o básico de redes que sustenta praticamente todo o resto do curso.',
  content: `
**O que você aprendeu**
• IP, portas, pacotes: como duas máquinas se encontram e conversam
• \`ping\` e \`traceroute\`: testar conectividade, e por que "não respondeu" não é prova de nada
• DNS e \`dig\`/\`whois\`: como nomes viram endereços, e como registros TXT às vezes vazam informação
• HTTP e \`curl\`: requisição, resposta, status, cabeçalhos, e por que robots.txt não é segurança

**Onde isso vai te ajudar no curso**
Os próximos módulos de cibersegurança pressupõem esse conhecimento: analisar tráfego de rede, testar APIs, entender tokens JWT — tudo isso conversa por HTTP, sobre TCP/IP. E no **Modo Hacker**, mais à frente, você vai usar \`nmap\` e reconhecimento de rede de novo, agora contra um alvo completo.

**Próximo módulo**
Active Directory: como redes corporativas Windows organizam usuários e permissões — e por que elas são um dos alvos favoritos de quem faz pentest.
  `,
};

export const networkingChallenges: Challenge[] = [t0, t1, lab1, t2, lab2, t3, lab3, tEnd];
