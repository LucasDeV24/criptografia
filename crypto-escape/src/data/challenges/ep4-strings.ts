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
  instructions: 'Execute e veja o texto em maiúsculas.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const mensagem = "hacker";

console.log(mensagem.toUpperCase());
`,
    python: `mensagem = "hacker"

print(mensagem.upper())
`,
  },
  expectedOutput: 'HACKER',
  hints: [
    'O código já está pronto! Execute.',
    '.toUpperCase() converte tudo para maiúsculas',
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
  instructions: 'Execute e veja o código numérico da letra A.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const letra = "A";
const numero = letra.charCodeAt(0);

console.log(numero);
`,
    python: `letra = "A"
numero = ord(letra)

print(numero)
`,
  },
  expectedOutput: '65',
  hints: [
    'O código já está pronto! Execute.',
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
  instructions: 'Execute e descubra qual letra é o número 72.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const numero = 72;
const letra = String.fromCharCode(numero);

console.log(letra);
`,
    python: `numero = 72
letra = chr(numero)

print(letra)
`,
  },
  expectedOutput: 'H',
  hints: [
    'O código já está pronto! Execute.',
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
  instructions: 'Execute e veja o resultado do deslocamento.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const letraOriginal = "A";

// Passo 1: converter letra em número
const numero = letraOriginal.charCodeAt(0);

// Passo 2: somar 3 (deslocamento)
const novoNumero = numero + 3;

// Passo 3: converter de volta para letra
const novaLetra = String.fromCharCode(novoNumero);

console.log(novaLetra);
`,
    python: `letra_original = "A"

# Passo 1: converter letra em número
numero = ord(letra_original)

# Passo 2: somar 3 (deslocamento)
novo_numero = numero + 3

# Passo 3: converter de volta para letra
nova_letra = chr(novo_numero)

print(nova_letra)
`,
  },
  expectedOutput: 'D',
  hints: [
    'O código já está pronto! Execute.',
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
  instructions: 'Troque "A" por "H" e execute.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Mude "A" para "H":
const letraOriginal = "A";

const numero = letraOriginal.charCodeAt(0);
const novoNumero = numero + 3;
const novaLetra = String.fromCharCode(novoNumero);

console.log(novaLetra);
`,
    python: `# Mude "A" para "H":
letra_original = "A"

numero = ord(letra_original)
novo_numero = numero + 3
nova_letra = chr(novo_numero)

print(nova_letra)
`,
  },
  expectedOutput: 'K',
  hints: [
    'Mude "A" para "H" na primeira linha de código',
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
