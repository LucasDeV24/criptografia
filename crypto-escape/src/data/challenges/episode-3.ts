import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory3_0: TheoryChallenge = {
  id: '3.0',
  type: 'theory',
  episode: 3,
  room: '3.0',
  title: 'Episódio 3 — Base64 e encoding',
  description: 'Como dados viajam pela internet? Como imagens aparecem em emails? A resposta: Base64.',
  content: `
**O que é Base64?**
Base64 é uma forma de converter QUALQUER dado (texto, imagem, arquivo) em texto puro.
Exemplo: "Olá" vira "T2zDoQ=="

**Por que isso existe?**
Emails e URLs só aceitam caracteres simples (a-z, 0-9).
Base64 permite enviar QUALQUER coisa usando só esses caracteres.

**Onde você vê isso:**
• Imagens em emails (aquele código gigante no HTML)
• URLs com dados complexos
• Tokens de autenticação

**Hackers:**
• Do mal: escondem código malicioso em Base64
• Do bem: decodificam para analisar ameaças

Vamos aprender a decodificar!

**Ferramentas novas neste episódio**
• **\`import\` no Python:** o Python traz muitos **módulos** (bibliotecas) prontos, mas para usar um deles você o **importa** no topo do código. Aqui usaremos o módulo \`base64\`: escreva \`import base64\` e depois chame as funções dele com o nome do módulo na frente, como \`base64.b64decode(...)\` e \`base64.b64encode(...)\`.
• **No JavaScript** as funções \`atob()\` (decodifica Base64) e \`btoa()\` (codifica) já vêm prontas, sem precisar de import.
  `,
};

const code3_1: CodeChallenge = {
  id: '3.1',
  type: 'code',
  episode: 3,
  room: '3.1',
  title: 'Decodificando Base64',
  description: 'Você interceptou mensagens codificadas em Base64. Escreva a função que decodifica qualquer uma delas.',
  instructions: 'Complete decodificarBase64(mensagemBase64): decodifique com atob() (JS) ou base64.b64decode() (Python) e devolva o texto real com return.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function decodificarBase64(mensagemBase64) {
  // Decodifique com atob() (ASCII to Binary) e devolva com return
}
`,
    python: `import base64

def decodificar_base64(mensagem_base64):
    # Decodifique com base64.b64decode(...).decode('utf-8') e devolva com return
    pass
`,
  },
  tests: {
    fn: { javascript: 'decodificarBase64', python: 'decodificar_base64' },
    cases: [
      { name: '"Hacker do bem"', args: ['SGFja2VyIGRvIGJlbQ=='], expected: 'Hacker do bem' },
      { name: '"teste"', args: ['dGVzdGU='], expected: 'teste' },
      { name: 'texto vazio', args: [''], expected: '', hidden: true },
      { name: 'com números', args: ['YWJjMTIz'], expected: 'abc123', hidden: true },
    ],
  },
  solution: {
    javascript: `function decodificarBase64(mensagemBase64) {
  return atob(mensagemBase64);
}`,
    python: `import base64

def decodificar_base64(mensagem_base64):
    return base64.b64decode(mensagem_base64).decode('utf-8')`,
  },
  explanation: `
**Funções importantes:**
• JavaScript: \`atob()\` = ASCII to Binary (decodifica)
• JavaScript: \`btoa()\` = Binary to ASCII (codifica)
• Python: \`base64.b64decode()\` (decodifica)
• Python: \`base64.b64encode()\` (codifica)

Base64 NÃO é criptografia - é só encoding. Qualquer um pode decodificar, sem precisar de senha ou chave nenhuma!
  `,
  hints: [
    'JavaScript: return atob(mensagemBase64);',
    'Python: return base64.b64decode(mensagem_base64).decode("utf-8")',
    'Texto vazio decodifica para texto vazio — não precisa tratar como caso especial',
  ],
  difficulty: 'easy',
};

const code3_2: CodeChallenge = {
  id: '3.2',
  type: 'code',
  episode: 3,
  room: '3.2',
  title: 'Codificando mensagens',
  description: 'Agora o caminho inverso: transformar um texto qualquer em Base64.',
  instructions: 'Complete codificarBase64(mensagem): codifique com btoa() (JS) ou base64.b64encode() (Python) e devolva o resultado com return.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function codificarBase64(mensagem) {
  // Codifique com btoa() e devolva com return
}
`,
    python: `import base64

def codificar_base64(mensagem):
    # Codifique com base64.b64encode(...).decode('utf-8') e devolva com return
    # Lembre-se: mensagem.encode('utf-8') antes de codificar
    pass
`,
  },
  tests: {
    fn: { javascript: 'codificarBase64', python: 'codificar_base64' },
    cases: [
      { name: '"teste"', args: ['teste'], expected: 'dGVzdGU=' },
      { name: '"meu nome"', args: ['meu nome'], expected: 'bWV1IG5vbWU=' },
      { name: 'texto vazio', args: [''], expected: '', hidden: true },
      { name: 'com números', args: ['abc123'], expected: 'YWJjMTIz', hidden: true },
    ],
  },
  solution: {
    javascript: `function codificarBase64(mensagem) {
  return btoa(mensagem);
}`,
    python: `import base64

def codificar_base64(mensagem):
    return base64.b64encode(mensagem.encode('utf-8')).decode('utf-8')`,
  },
  explanation: `
**Codificar é o caminho inverso de decodificar**
btoa (Binary to ASCII) transforma texto comum num texto só com caracteres seguros para email, URL ou JSON. Repare que codificar e decodificar são operações **inversas**: \`decodificarBase64(codificarBase64(x))\` sempre devolve \`x\` de volta.
  `,
  hints: [
    'JavaScript: return btoa(mensagem);',
    'Python: mensagem.encode("utf-8") primeiro, depois base64.b64encode(...), depois .decode("utf-8")',
    '"teste" codificado é "dGVzdGU="',
  ],
  difficulty: 'easy',
};

const theory3_3: TheoryChallenge = {
  id: '3.3',
  type: 'theory',
  episode: 3,
  room: '3.3',
  title: 'Malware escondido em Base64',
  description: 'Hackers do mal usam Base64 para esconder código malicioso. Vamos aprender a identificar isso.',
  content: `
**Técnica comum de ataque:**
1. Hacker codifica código malicioso em Base64
2. Parece texto inocente: "ZXZhbChhdG9iKC..."
3. No navegador, decodifica e executa o código

**Exemplo real:**
\`\`\`javascript
eval(atob("YWxlcnQoJ0hhY2tlZCEnKQ=="));
\`\`\`

Se você decodificar "YWxlcnQoJ0hhY2tlZCEnKQ==" vira: \`alert('Hacked!')\`
O \`eval()\` executa esse código!

**Como analistas detectam:**
• Procuram por \`atob()\` ou \`base64.decode()\` em código suspeito
• Decodificam para ver o que está escondido
• Usam ferramentas de análise de malware

**Próxima sala:** Você vai decodificar um script suspeito!
  `,
};

const code3_4: CodeChallenge = {
  id: '3.4',
  type: 'code',
  episode: 3,
  room: '3.4',
  title: 'Analisando código suspeito',
  description: 'Alguns códigos maliciosos escondem um `eval()` ANINHADO dentro do texto decodificado — um Base64 que, ao ser revelado, contém outro comando para executar código. Escreva uma função que decodifica e avisa quando isso acontece.',
  instructions: 'Complete decodificarEAlertar(base64Str): decodifique a string. Se o resultado contiver "eval(", devolva "ALERTA: contém eval() aninhado!". Senão, devolva o texto decodificado normalmente.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function decodificarEAlertar(base64Str) {
  const decodificado = atob(base64Str);

  // Se "decodificado" contiver a substring "eval(", devolva o alerta
  // Senão, devolva "decodificado"
}
`,
    python: `import base64

def decodificar_e_alertar(base64_str):
    decodificado = base64.b64decode(base64_str).decode('utf-8')

    # Se "decodificado" contiver a substring "eval(", devolva o alerta
    # Senão, devolva "decodificado"
    pass
`,
  },
  tests: {
    fn: { javascript: 'decodificarEAlertar', python: 'decodificar_e_alertar' },
    cases: [
      { name: 'código inofensivo', args: ['Y29uc29sZS5sb2coJ29pJyk='], expected: "console.log('oi')" },
      { name: 'eval aninhado', args: ['ZXZhbChhdG9iKCd4Jykp'], expected: 'ALERTA: contém eval() aninhado!' },
      { name: 'exemplo original do site', args: ['Y29uc29sZS5sb2coIkNvZGlnbyBtYWxpY2lvc28hIik='], expected: 'console.log("Codigo malicioso!")', hidden: true },
      { name: 'outro eval aninhado', args: ['ZXZhbCh4KQ=='], expected: 'ALERTA: contém eval() aninhado!', hidden: true },
    ],
  },
  solution: {
    javascript: `function decodificarEAlertar(base64Str) {
  const decodificado = atob(base64Str);

  if (decodificado.includes("eval(")) {
    return "ALERTA: contém eval() aninhado!";
  }
  return decodificado;
}`,
    python: `import base64

def decodificar_e_alertar(base64_str):
    decodificado = base64.b64decode(base64_str).decode('utf-8')

    if "eval(" in decodificado:
        return "ALERTA: contém eval() aninhado!"
    return decodificado`,
  },
  explanation: `
**O que você automatizou**
Isso é um mini-detector: decodifica primeiro, e só DEPOIS de ver o conteúdo real decide se é perigoso. É exatamente essa a diferença entre confiar num texto cifrado às cegas e analisá-lo.

**No mundo real:**
Analistas de malware fazem isso o tempo todo, em escala muito maior:
1. Encontram código ofuscado/escondido (às vezes em várias camadas de Base64)
2. Decodificam (Base64, hex, etc.)
3. Procuram por padrões perigosos (\`eval\`, \`exec\`, downloads escondidos)
4. Criam assinaturas para detectar ataques similares automaticamente

**Ferramentas profissionais:**
• CyberChef (decodifica tudo)
• VirusTotal (analisa arquivos suspeitos)
• IDA Pro / Ghidra (engenharia reversa)
  `,
  hints: [
    '.includes("eval(") (JS) ou "eval(" in decodificado (Python) verifica se a substring existe',
    'Decodifique primeiro (isso já está pronto), depois só falta o if/else',
    'Sem eval( dentro do texto, devolva o texto decodificado sem alterar nada',
  ],
  difficulty: 'medium',
};

const theory3_5: TheoryChallenge = {
  id: '3.5',
  type: 'theory',
  episode: 3,
  room: '3.5',
  title: 'Episódio 3 completo!',
  description: 'Você aprendeu como dados são codificados e como malware é escondido.',
  content: `
**Habilidades desbloqueadas:**
✅ Base64 encoding/decoding
✅ Identificar código ofuscado
✅ Análise básica de malware
✅ Deobfuscation (revelar código escondido)

**Aplicações profissionais:**
• **Malware Analyst:** Decodifica ameaças
• **SOC Analyst:** Identifica ataques em logs
• **Incident Response:** Investiga invasões

**Próximo episódio:**
XSS (Cross-Site Scripting) - uma das vulnerabilidades mais comuns da web.

Você está evoluindo rápido! 🚀
  `,
};

export const episode3Challenges: Challenge[] = [
  theory3_0,
  code3_1,
  code3_2,
  theory3_3,
  code3_4,
  theory3_5,
];
