import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory4_0: TheoryChallenge = {
  id: 'str.0',
  type: 'theory',
  episode: 4,
  room: '4.0',
  title: 'Episódio 4 — Strings: manipulando textos',
  description: 'Neste episódio você vai aprender a manipular textos como um profissional. Criptografia é basicamente transformar textos!',
  content: `
**O que é uma string?**
String é qualquer texto entre aspas: "Olá", "senha123", "HACK"

**O que você já sabe:**
• Criar strings: \`const texto = "Olá"\`
• Juntar strings: \`"Olá" + " " + "mundo"\`
• Percorrer com loop: acessar cada letra

**O que vai aprender agora:**
• \`.length\` → quantas letras o texto tem
• \`.toUpperCase()\` → transformar em MAIÚSCULA
• \`.toLowerCase()\` → transformar em minúscula
• \`charCodeAt()\` → descobrir o número de cada letra
• \`String.fromCharCode()\` → converter número em letra

**Por que isso importa?**
A criptografia transforma letras em números, faz cálculos, e converte de volta em letras. Você precisa entender essas operações!
  `,
};

const code4_1: CodeChallenge = {
  id: 'str.1',
  type: 'code',
  episode: 4,
  room: '4.1',
  title: 'Tamanho de um texto',
  description: 'Use **.length** para saber quantas letras um texto tem. **Execute** o código pronto.',
  instructions: 'Execute e veja o tamanho do texto.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const senha = "admin123";

console.log(senha.length);
`,
    python: `senha = "admin123"

print(len(senha))
`,
  },
  expectedOutput: '8',
  hints: [
    'O código já está pronto! Execute.',
    '"admin123" tem 8 caracteres',
  ],
  difficulty: 'easy',
};

const code4_2: CodeChallenge = {
  id: 'str.2',
  type: 'code',
  episode: 4,
  room: '4.2',
  title: 'Maiúscula e minúscula',
  description: 'Transforme o texto em letras maiúsculas usando **.toUpperCase()** (JS) ou **.upper()** (Python). O código já está pronto!',
  instructions: 'Converta a mensagem para maiúsculas e imprima o resultado.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const mensagem = "hacker";

// Imprima a mensagem convertida para letras maiúsculas
// Use .toUpperCase() em JavaScript
`,
    python: `mensagem = "hacker"

# Imprima a mensagem convertida para letras maiúsculas
# Use .upper() em Python
`,
  },
  expectedOutput: 'HACKER',
  hints: [
    'Em JS: console.log(mensagem.toUpperCase())',
    'Em Python: print(mensagem.upper())',
    '.toUpperCase() / .upper() converte tudo para maiúsculas',
  ],
  difficulty: 'easy',
};

const theory4_3: TheoryChallenge = {
  id: 'str.3',
  type: 'theory',
  episode: 4,
  room: '4.3',
  title: 'Letras são números!',
  description: 'Este é o conceito mais importante para criptografia: cada letra tem um número associado.',
  content: `
**Tabela ASCII — cada letra é um número:**
• A = 65, B = 66, C = 67, ..., Z = 90
• a = 97, b = 98, c = 99, ..., z = 122
• 0 = 48, 1 = 49, ..., 9 = 57

**Por que isso importa?**
A Cifra de César funciona assim:
1. Pega a letra "A" (número 65)
2. Soma 3 → 68
3. Converte 68 de volta para letra → "D"

Resultado: "A" vira "D"!

**Comandos para converter:**
• **JS:** \`"A".charCodeAt(0)\` → 65
• **JS:** \`String.fromCharCode(65)\` → "A"
• **Python:** \`ord("A")\` → 65
• **Python:** \`chr(65)\` → "A"

Na próxima sala você vai fazer essa conversão!
  `,
};

const code4_4: CodeChallenge = {
  id: 'str.4',
  type: 'code',
  episode: 4,
  room: '4.4',
  title: 'Letra para número',
  description: 'Vamos descobrir o número da letra **"A"**. O código já está pronto — **execute** e veja!',
  instructions: 'Converta a letra "A" para seu código numérico e imprima.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const letra = "A";

// Converta a letra para seu código numérico e imprima
// Use .charCodeAt(0) para obter o número
`,
    python: `letra = "A"

# Converta a letra para seu código numérico e imprima
# Use ord() para obter o número
`,
  },
  expectedOutput: '65',
  hints: [
    'Em JS: console.log(letra.charCodeAt(0))',
    'Em Python: print(ord(letra))',
    'A letra "A" tem o código 65 na tabela ASCII',
  ],
  difficulty: 'easy',
};

const code4_5: CodeChallenge = {
  id: 'str.5',
  type: 'code',
  episode: 4,
  room: '4.5',
  title: 'Número para letra',
  description: 'Agora o contrário! Converta o número **72** de volta para uma letra. O código já está pronto — **execute**!',
  instructions: 'Converta o número 72 para uma letra e imprima.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const numero = 72;

// Converta o número para uma letra e imprima
// Use String.fromCharCode() em JavaScript
`,
    python: `numero = 72

# Converta o número para uma letra e imprima
# Use chr() em Python
`,
  },
  expectedOutput: 'H',
  hints: [
    'Em JS: console.log(String.fromCharCode(numero))',
    'Em Python: print(chr(numero))',
    'O número 72 corresponde à letra "H"',
  ],
  difficulty: 'easy',
};

const code4_6: CodeChallenge = {
  id: 'str.6',
  type: 'code',
  episode: 4,
  room: '4.6',
  title: 'Deslocando uma letra',
  description: 'Este é o coração da criptografia! Pegamos a letra **"A"**, somamos **3**, e descobrimos a nova letra. **Execute**!',
  instructions: 'Converta "A" em número, some 3, converta de volta em letra e imprima.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const letraOriginal = "A";

// Passo 1: converta a letra em número usando .charCodeAt(0)
// Passo 2: some 3 ao número (deslocamento)
// Passo 3: converta de volta para letra usando String.fromCharCode()
// Imprima a nova letra
`,
    python: `letra_original = "A"

# Passo 1: converta a letra em número usando ord()
# Passo 2: some 3 ao número (deslocamento)
# Passo 3: converta de volta para letra usando chr()
# Imprima a nova letra
`,
  },
  expectedOutput: 'D',
  hints: [
    'Passo 1: const numero = letraOriginal.charCodeAt(0) / numero = ord(letra_original)',
    'Passo 2: const novoNumero = numero + 3 / novo_numero = numero + 3',
    'Passo 3: console.log(String.fromCharCode(novoNumero)) / print(chr(novo_numero))',
    'A = 65, somando 3 = 68, que é a letra "D"',
  ],
  difficulty: 'easy',
};

const code4_7: CodeChallenge = {
  id: 'str.7',
  type: 'code',
  episode: 4,
  room: '4.7',
  title: 'Sua vez — mude a letra',
  description: 'Mude a letraOriginal para **"H"** e veja qual letra resulta do deslocamento de 3.',
  instructions: 'Mude a letra para "H", converta em número, some 3, converta de volta e imprima.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Mude "A" para "H":
const letraOriginal = "A";

// Converta a letra em número, some 3, converta de volta para letra
// e imprima o resultado
`,
    python: `# Mude "A" para "H":
letra_original = "A"

# Converta a letra em número, some 3, converta de volta para letra
# e imprima o resultado
`,
  },
  expectedOutput: 'K',
  hints: [
    'Primeiro mude "A" para "H"',
    'Depois: numero = charCodeAt(0), novoNumero = numero + 3, fromCharCode(novoNumero)',
    'Em Python: numero = ord(letra_original), novo_numero = numero + 3, print(chr(novo_numero))',
    'H = 72, somando 3 = 75, que é "K"',
  ],
  difficulty: 'easy',
};

const theory4_8: TheoryChallenge = {
  id: 'str.8',
  type: 'theory',
  episode: 4,
  room: '4.8',
  title: 'Parabéns! Você está pronto para criptografia!',
  description: 'Agora você entende TUDO que precisa para fazer criptografia de verdade!',
  content: `
**O que você aprendeu:**
• \`.length\` / \`len()\` → tamanho do texto
• \`.toUpperCase()\` / \`.upper()\` → maiúsculas
• \`charCodeAt()\` / \`ord()\` → letra para número
• \`String.fromCharCode()\` / \`chr()\` → número para letra
• Deslocar letras somando números

**Resumo da jornada até aqui:**
• Ep 0: console.log, variáveis, concatenação
• Ep 1: if/else, comparações
• Ep 2: loops (for), percorrer textos
• Ep 3: arrays, busca em listas
• Ep 4: strings, charCode, deslocamento

**Próximo episódio — Cifra de César!**
Agora que você sabe tudo isso, vai finalmente decodificar mensagens secretas! Você vai combinar TUDO:
• **Loop** para percorrer cada letra
• **charCodeAt** para converter em número
• **Cálculo** para deslocar
• **fromCharCode** para converter de volta
• **if** para verificar se é letra maiúscula ou minúscula

Você está pronto!
  `,
};

export const stringsChallenges: Challenge[] = [
  theory4_0,
  code4_1,
  code4_2,
  theory4_3,
  code4_4,
  code4_5,
  code4_6,
  code4_7,
  theory4_8,
];
