import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory7_0: TheoryChallenge = {
  id: 'strm.0',
  type: 'theory',
  episode: 7,
  room: '7.0',
  title: 'Episódio 7 — Métodos de String avançados',
  description: 'Neste episódio você vai aprender métodos que analistas de segurança usam DIARIAMENTE para detectar ataques.',
  content: `
**O que vamos aprender:**
• \`.includes()\` → texto contém algo? (detectar XSS, SQL Injection)
• \`.indexOf()\` → onde está algo no texto? (encontrar payloads)
• \`.split()\` → dividir texto em partes (analisar logs)
• \`.replace()\` → substituir partes do texto (sanitizar input)

**Por que isso é essencial?**
Quando um hacker tenta um ataque XSS, ele envia algo como:
\`<script>alert("hack")</script>\`

O sistema de segurança faz:
\`if (input.includes("<script>")) → BLOQUEAR\`

Ou quando um analista lê logs:
\`"2024-01-15 10:30:00 LOGIN admin 192.168.1.1"\`
Ele usa \`.split(" ")\` para separar cada parte.

Vamos aprender cada método!
  `,
};

const code7_1: CodeChallenge = {
  id: 'strm.1',
  type: 'code',
  episode: 7,
  room: '7.1',
  title: 'includes() — contém algo?',
  description: 'O método **.includes()** verifica se um texto contém outro texto. Retorna **true** ou **false**. **Execute**!',
  instructions: 'Execute e veja o includes() funcionando.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const email = "ana@empresa.com";

console.log(email.includes("@"));
console.log(email.includes("hacker"));
`,
    python: `email = "ana@empresa.com"

print("@" in email)
print("hacker" in email)
`,
  },
  expectedOutput: 'true\nfalse',
  hints: [
    'O código já está pronto! Execute.',
    '"ana@empresa.com" contém "@" → true',
    '"ana@empresa.com" NÃO contém "hacker" → false',
  ],
  difficulty: 'easy',
};

const code7_2: CodeChallenge = {
  id: 'strm.2',
  type: 'code',
  episode: 7,
  room: '7.2',
  title: 'Detectando ataque simples',
  description: 'Use **.includes()** para detectar se um input contém **"<script>"** — um sinal de ataque XSS! O código já está pronto.',
  instructions: 'Execute e veja a detecção de XSS.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const input = '<script>alert("hack")</script>';

if (input.includes("<script>")) {
  console.log("ALERTA: XSS detectado!");
} else {
  console.log("Input seguro");
}
`,
    python: `input_usuario = '<script>alert("hack")</script>'

if "<script>" in input_usuario:
    print("ALERTA: XSS detectado!")
else:
    print("Input seguro")
`,
  },
  expectedOutput: 'ALERTA: XSS detectado!',
  hints: [
    'O código já está pronto! Execute.',
    'O input contém "<script>", então é XSS',
  ],
  difficulty: 'easy',
};

const code7_3: CodeChallenge = {
  id: 'strm.3',
  type: 'code',
  episode: 7,
  room: '7.3',
  title: 'Sua vez — input seguro',
  description: 'Mude o input para **"Olá, mundo!"** (sem script) e veja que o sistema aceita.',
  instructions: 'Troque o input para "Olá, mundo!" e execute.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Mude o input para: "Olá, mundo!"
const input = '<script>alert("hack")</script>';

if (input.includes("<script>")) {
  console.log("ALERTA: XSS detectado!");
} else {
  console.log("Input seguro");
}
`,
    python: `# Mude o input para: "Olá, mundo!"
input_usuario = '<script>alert("hack")</script>'

if "<script>" in input_usuario:
    print("ALERTA: XSS detectado!")
else:
    print("Input seguro")
`,
  },
  expectedOutput: 'Input seguro',
  hints: [
    'Mude o valor do input para "Olá, mundo!"',
    'Como não contém "<script>", entra no else',
  ],
  difficulty: 'easy',
};

const theory7_4: TheoryChallenge = {
  id: 'strm.4',
  type: 'theory',
  episode: 7,
  room: '7.4',
  title: 'split() — dividindo textos',
  description: 'O método split() divide um texto em partes, criando um array. ESSENCIAL para analisar logs.',
  content: `
**Como funciona:**
\`"Ana-Carlos-Maria".split("-")\` → \`["Ana", "Carlos", "Maria"]\`

O texto é dividido onde encontrar o separador ("-").

**Exemplo com logs de segurança:**
\`\`\`
"2024-01-15 FALHA admin 192.168.1.1"
\`\`\`

Usando \`.split(" ")\`:
\`\`\`
["2024-01-15", "FALHA", "admin", "192.168.1.1"]
\`\`\`

Agora você pode acessar cada parte:
• Posição 0: data
• Posição 1: tipo do evento (FALHA)
• Posição 2: usuário (admin)
• Posição 3: IP

Isso é EXATAMENTE o que analistas SOC fazem todos os dias!
  `,
};

const code7_5: CodeChallenge = {
  id: 'strm.5',
  type: 'code',
  episode: 7,
  room: '7.5',
  title: 'split() na prática',
  description: 'O código divide uma linha de log em partes e mostra o usuário. **Execute**!',
  instructions: 'Execute e veja o log sendo analisado.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const log = "2024-01-15 FALHA admin 192.168.1.1";

const partes = log.split(" ");

console.log("Data: " + partes[0]);
console.log("Evento: " + partes[1]);
console.log("Usuario: " + partes[2]);
console.log("IP: " + partes[3]);
`,
    python: `log = "2024-01-15 FALHA admin 192.168.1.1"

partes = log.split(" ")

print("Data: " + partes[0])
print("Evento: " + partes[1])
print("Usuario: " + partes[2])
print("IP: " + partes[3])
`,
  },
  expectedOutput: 'Data: 2024-01-15\nEvento: FALHA\nUsuario: admin\nIP: 192.168.1.1',
  hints: [
    'O código já está pronto! Execute.',
    'split(" ") divide o texto nos espaços',
  ],
  difficulty: 'easy',
};

const code7_6: CodeChallenge = {
  id: 'strm.6',
  type: 'code',
  episode: 7,
  room: '7.6',
  title: 'replace() — substituindo texto',
  description: 'O método **.replace()** substitui uma parte do texto por outra. Útil para sanitizar inputs! **Execute**.',
  instructions: 'Execute e veja o texto sendo sanitizado.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const inputPerigoso = "Olá <script>alert(1)</script>";

const inputSeguro = inputPerigoso.replace("<script>", "").replace("</script>", "");

console.log(inputSeguro);
`,
    python: `input_perigoso = "Olá <script>alert(1)</script>"

input_seguro = input_perigoso.replace("<script>", "").replace("</script>", "")

print(input_seguro)
`,
  },
  expectedOutput: 'Olá alert(1)',
  hints: [
    'O código já está pronto! Execute.',
    'replace() remove as tags perigosas do input',
  ],
  difficulty: 'easy',
};

const code7_7: CodeChallenge = {
  id: 'strm.7',
  type: 'code',
  episode: 7,
  room: '7.7',
  title: 'indexOf() — encontrando posição',
  description: '**.indexOf()** retorna a POSIÇÃO onde algo aparece no texto. Se não encontrar, retorna **-1**. **Execute**!',
  instructions: 'Execute e veja as posições encontradas.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const texto = "admin:password123";

const posicao = texto.indexOf(":");

console.log("Os dois pontos estão na posição: " + posicao);
console.log("Usuário: " + texto.substring(0, posicao));
console.log("Senha: " + texto.substring(posicao + 1));
`,
    python: `texto = "admin:password123"

posicao = texto.index(":")

print("Os dois pontos estão na posição: " + str(posicao))
print("Usuário: " + texto[:posicao])
print("Senha: " + texto[posicao + 1:])
`,
  },
  expectedOutput: 'Os dois pontos estão na posição: 5\nUsuário: admin\nSenha: password123',
  hints: [
    'O código já está pronto! Execute.',
    'O ":" está na posição 5 (contando do 0)',
    'substring/fatias dividem o texto na posição encontrada',
  ],
  difficulty: 'easy',
};

const code7_8: CodeChallenge = {
  id: 'strm.8',
  type: 'code',
  episode: 7,
  room: '7.8',
  title: 'Desafio — analisar log completo',
  description: 'Combine TUDO! Analise um log: divida com split, verifique se é FALHA com includes, e mostre os detalhes. O código está pronto!',
  instructions: 'Execute e veja a análise completa.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const log = "2024-03-15 FALHA root 10.0.0.5";
const partes = log.split(" ");

const data = partes[0];
const evento = partes[1];
const usuario = partes[2];
const ip = partes[3];

if (evento.includes("FALHA")) {
  console.log("ALERTA de seguranca!");
  console.log("Quem: " + usuario);
  console.log("De onde: " + ip);
}
`,
    python: `log = "2024-03-15 FALHA root 10.0.0.5"
partes = log.split(" ")

data = partes[0]
evento = partes[1]
usuario = partes[2]
ip = partes[3]

if "FALHA" in evento:
    print("ALERTA de seguranca!")
    print("Quem: " + usuario)
    print("De onde: " + ip)
`,
  },
  expectedOutput: 'ALERTA de seguranca!\nQuem: root\nDe onde: 10.0.0.5',
  hints: [
    'O código já está pronto! Execute.',
    'Combina split + includes + if — tudo que você aprendeu!',
  ],
  difficulty: 'easy',
};

const theory7_9: TheoryChallenge = {
  id: 'strm.9',
  type: 'theory',
  episode: 7,
  room: '7.9',
  title: 'Parabéns! Você está PRONTO para cibersegurança!',
  description: 'Com métodos de string, você tem TODAS as ferramentas que um analista de segurança usa para detectar ataques.',
  content: `
**O que você aprendeu:**
• \`.includes()\` / \`in\` → verificar se contém (detectar ataques)
• \`.split()\` → dividir texto (analisar logs)
• \`.replace()\` → substituir texto (sanitizar inputs)
• \`.indexOf()\` / \`.index()\` → encontrar posição

**Resumo da sua jornada de programação:**
• Ep 0: console.log, variáveis
• Ep 1: if/else, comparações
• Ep 2: loops (for)
• Ep 3: arrays e listas
• Ep 4: strings e ASCII (charCodeAt)
• Ep 5: funções (function/def)
• Ep 6: objetos e JSON
• Ep 7: métodos de string (includes, split, replace)

**Você agora sabe:**
✓ Tomar decisões (if/else)
✓ Repetir ações (for)
✓ Trabalhar com listas (arrays)
✓ Manipular textos (strings)
✓ Criar código reutilizável (funções)
✓ Organizar dados (objetos/JSON)
✓ Analisar e detectar padrões (métodos de string)

**PRÓXIMO: Cibersegurança de verdade!**
A partir do próximo episódio, você começa a aplicar TUDO isso em cenários reais de segurança. Primeiro desafio: decodificar mensagens com a Cifra de César!
  `,
};

export const stringMethodsChallenges: Challenge[] = [
  theory7_0,
  code7_1,
  code7_2,
  code7_3,
  theory7_4,
  code7_5,
  code7_6,
  code7_7,
  code7_8,
  theory7_9,
];
