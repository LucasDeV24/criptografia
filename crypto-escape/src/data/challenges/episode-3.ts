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
  `,
};

const code3_1: CodeChallenge = {
  id: '3.1',
  type: 'code',
  episode: 3,
  room: '3.1',
  title: 'Decodificando Base64',
  description: 'Você interceptou uma mensagem codificada em Base64. O código para decodificar já está pronto - execute e veja a mensagem real.',
  instructions: 'Execute o código e veja a mensagem decodificada',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Mensagem interceptada em Base64:
const mensagemBase64 = "SGFja2VyIGRvIGJlbQ==";

// Decodificar (atob = ASCII to Binary)
const mensagemReal = atob(mensagemBase64);

console.log(mensagemReal);
`,
    python: `import base64

# Mensagem interceptada em Base64:
mensagem_base64 = "SGFja2VyIGRvIGJlbQ=="

# Decodificar
mensagem_real = base64.b64decode(mensagem_base64).decode('utf-8')

print(mensagem_real)
`,
  },
  expectedOutput: 'Hacker do bem',
  explanation: `
**Funções importantes:**
• JavaScript: \`atob()\` = ASCII to Binary (decodifica)
• JavaScript: \`btoa()\` = Binary to ASCII (codifica)
• Python: \`base64.b64decode()\` (decodifica)
• Python: \`base64.b64encode()\` (codifica)

Base64 NÃO é criptografia - é só encoding. Qualquer um pode decodificar!
  `,
  hints: [
    'O código já está pronto - só execute!',
    'atob() é a função de decodificação do JavaScript',
  ],
  difficulty: 'easy',
};

const code3_2: CodeChallenge = {
  id: '3.2',
  type: 'code',
  episode: 3,
  room: '3.2',
  title: 'Codificando mensagens',
  description: 'Agora vamos fazer o contrário - codificar uma mensagem em Base64. Troque a mensagem para seu nome.',
  instructions: 'Mude "teste" para seu nome e execute',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// MUDE a mensagem abaixo:
const mensagem = "teste";

// Codificar em Base64
const mensagemCodificada = btoa(mensagem);

console.log(mensagemCodificada);
`,
    python: `import base64

# MUDE a mensagem abaixo:
mensagem = "teste"

# Codificar em Base64
mensagem_codificada = base64.b64encode(mensagem.encode('utf-8')).decode('utf-8')

print(mensagem_codificada)
`,
  },
  expectedOutput: 'dGVzdGU=',
  hints: [
    'Pode colocar qualquer texto no lugar de "teste"',
    'btoa() codifica em Base64',
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
  description: 'Você encontrou este código em um site: eval(atob("Y29uc29sZS5sb2coIkNvZGlnbyBtYWxpY2lvc28hIik=")). O que ele faz? Decodifique para descobrir!',
  instructions: 'Decodifique a string Base64 e mostre o código oculto',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// String suspeita encontrada:
const codigoSuspeito = "Y29uc29sZS5sb2coIkNvZGlnbyBtYWxpY2lvc28hIik=";

// Decodifique para ver o que está escondido:
const codigoReal = atob(codigoSuspeito);

console.log(codigoReal);
`,
    python: `import base64

# String suspeita encontrada:
codigo_suspeito = "Y29uc29sZS5sb2coIkNvZGlnbyBtYWxpY2lvc28hIik="

# Decodifique para ver o que está escondido:
codigo_real = base64.b64decode(codigo_suspeito).decode('utf-8')

print(codigo_real)
`,
  },
  expectedOutput: 'console.log("Codigo malicioso!")',
  explanation: `
**O que você descobriu:**
O código escondido era: \`console.log("Codigo malicioso!")\`

**No mundo real:**
Analistas de malware fazem isso o tempo todo:
1. Encontram código ofuscado/escondido
2. Decodificam (Base64, hex, etc)
3. Analisam o que o código realmente faz
4. Criam assinaturas para detectar ataques similares

**Ferramentas profissionais:**
• CyberChef (decodifica tudo)
• VirusTotal (analisa arquivos suspeitos)
• IDA Pro / Ghidra (engenharia reversa)
  `,
  hints: [
    'O código já está pronto - só execute',
    'Você vai ver o código JavaScript que estava escondido',
  ],
  difficulty: 'easy',
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
