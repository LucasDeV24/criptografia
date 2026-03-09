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
  instructions: 'Use includes() para verificar se o input contém "<script>" e imprima o alerta adequado.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const input = '<script>alert("hack")</script>';

// Escreva um if/else:
// Se input contiver "<script>" (use .includes()), imprima "ALERTA: XSS detectado!"
// Senão, imprima "Input seguro"
`,
    python: `input_usuario = '<script>alert("hack")</script>'

# Escreva um if/else:
# Se input_usuario contiver "<script>" (use "in"), imprima "ALERTA: XSS detectado!"
# Senão, imprima "Input seguro"
`,
  },
  expectedOutput: 'ALERTA: XSS detectado!',
  hints: [
    'Em JS: if (input.includes("<script>")) { console.log("ALERTA: XSS detectado!"); }',
    'Em Python: if "<script>" in input_usuario: print("ALERTA: XSS detectado!")',
    'Não esqueça o else com "Input seguro"',
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
  instructions: 'Mude o input para "Olá, mundo!" e escreva a verificação de XSS.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Mude o input para: "Olá, mundo!"
const input = '<script>alert("hack")</script>';

// Escreva um if/else:
// Se input contiver "<script>" (use .includes()), imprima "ALERTA: XSS detectado!"
// Senão, imprima "Input seguro"
`,
    python: `# Mude o input para: "Olá, mundo!"
input_usuario = '<script>alert("hack")</script>'

# Escreva um if/else:
# Se input_usuario contiver "<script>" (use "in"), imprima "ALERTA: XSS detectado!"
# Senão, imprima "Input seguro"
`,
  },
  expectedOutput: 'Input seguro',
  hints: [
    'Primeiro mude o input para "Olá, mundo!"',
    'Depois escreva: if (input.includes("<script>")) { ... } else { ... }',
    'Como "Olá, mundo!" não contém "<script>", deve imprimir "Input seguro"',
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
  instructions: 'Use split(" ") para dividir o log e imprima cada parte (Data, Evento, Usuario, IP).',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const log = "2024-01-15 FALHA admin 192.168.1.1";

// Use .split(" ") para dividir o log em partes
// Depois imprima cada parte no formato:
// "Data: " + partes[0]
// "Evento: " + partes[1]
// "Usuario: " + partes[2]
// "IP: " + partes[3]
`,
    python: `log = "2024-01-15 FALHA admin 192.168.1.1"

# Use .split(" ") para dividir o log em partes
# Depois imprima cada parte no formato:
# "Data: " + partes[0]
# "Evento: " + partes[1]
# "Usuario: " + partes[2]
# "IP: " + partes[3]
`,
  },
  expectedOutput: 'Data: 2024-01-15\nEvento: FALHA\nUsuario: admin\nIP: 192.168.1.1',
  hints: [
    'Primeiro: const partes = log.split(" ") / partes = log.split(" ")',
    'Depois: console.log("Data: " + partes[0]) para cada campo',
    'split(" ") divide o texto nos espaços, criando um array',
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
  instructions: 'Use replace() para remover "<script>" e "</script>" do texto e imprima o resultado.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const inputPerigoso = "Olá <script>alert(1)</script>";

// Use .replace() para remover "<script>" e "</script>" do texto
// Imprima o resultado limpo
`,
    python: `input_perigoso = "Olá <script>alert(1)</script>"

# Use .replace() para remover "<script>" e "</script>" do texto
# Imprima o resultado limpo
`,
  },
  expectedOutput: 'Olá alert(1)',
  hints: [
    'Use .replace("<script>", "") para remover a tag de abertura',
    'Encadeie outro .replace("</script>", "") para remover a de fechamento',
    'Em JS: console.log(inputPerigoso.replace("<script>", "").replace("</script>", ""))',
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
  instructions: 'Use indexOf/index para encontrar ":" e extraia o usuário e senha do texto.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const texto = "admin:password123";

// Use .indexOf(":") para encontrar a posição dos dois pontos
// Imprima: "Os dois pontos estão na posição: " + posição
// Use .substring(0, posição) para extrair o usuário e imprima: "Usuário: " + ...
// Use .substring(posição + 1) para extrair a senha e imprima: "Senha: " + ...
`,
    python: `texto = "admin:password123"

# Use .index(":") para encontrar a posição dos dois pontos
# Imprima: "Os dois pontos estão na posição: " + str(posição)
# Use texto[:posição] para extrair o usuário e imprima: "Usuário: " + ...
# Use texto[posição + 1:] para extrair a senha e imprima: "Senha: " + ...
`,
  },
  expectedOutput: 'Os dois pontos estão na posição: 5\nUsuário: admin\nSenha: password123',
  hints: [
    'Em JS: const posicao = texto.indexOf(":") / Em Python: posicao = texto.index(":")',
    'O ":" está na posição 5 (contando do 0)',
    'Em JS: texto.substring(0, posicao) pega "admin" / Em Python: texto[:posicao]',
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
  instructions: 'Divida o log com split, verifique se é FALHA, e imprima os detalhes do alerta.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const log = "2024-03-15 FALHA root 10.0.0.5";

// Divida o log com .split(" ") para obter: data, evento, usuario, ip
// Se o evento contiver "FALHA" (use .includes()):
//   Imprima "ALERTA de seguranca!"
//   Imprima "Quem: " + usuario
//   Imprima "De onde: " + ip
`,
    python: `log = "2024-03-15 FALHA root 10.0.0.5"

# Divida o log com .split(" ") para obter: data, evento, usuario, ip
# Se o evento contiver "FALHA" (use "in"):
#   Imprima "ALERTA de seguranca!"
#   Imprima "Quem: " + usuario
#   Imprima "De onde: " + ip
`,
  },
  expectedOutput: 'ALERTA de seguranca!\nQuem: root\nDe onde: 10.0.0.5',
  hints: [
    'Primeiro: const partes = log.split(" ") e acesse partes[0], partes[1], etc.',
    'Em JS: if (evento.includes("FALHA")) { ... }',
    'Em Python: if "FALHA" in evento: ...',
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
