import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory2_0: TheoryChallenge = {
  id: 'loop.0',
  type: 'theory',
  episode: 2,
  room: '2.0',
  title: 'Episódio 2 — Loops: repetindo ações',
  description: 'Neste episódio você vai aprender a fazer o computador repetir ações. Isso é ESSENCIAL em cibersegurança!',
  content: `
**O que é um loop?**
Um loop (laço) faz o computador repetir uma ação várias vezes.

**Por que hackers usam loops?**
• Testar 10.000 senhas automaticamente (força bruta)
• Verificar cada arquivo em um sistema
• Analisar cada linha de um log de segurança

**Como funciona o FOR:**
É como dizer: "faça isso X vezes"

• **JavaScript:** \`for (let i = 1; i <= 5; i++) { ... }\`
• **Python:** \`for i in range(1, 6): ...\`

Tradução: "comece em 1, vá até 5, e a cada vez some 1"

Na próxima sala vamos ver um loop real!
  `,
};

const code2_1: CodeChallenge = {
  id: 'loop.1',
  type: 'code',
  episode: 2,
  room: '2.1',
  title: 'Seu primeiro loop',
  description: 'O código abaixo conta de 1 até 5. Está pronto — apenas **execute** para ver!',
  instructions: 'Execute o código e veja o loop contando.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Contando de 1 até 5:
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
`,
    python: `# Contando de 1 até 5:
for i in range(1, 6):
    print(i)
`,
  },
  expectedOutput: '1\n2\n3\n4\n5',
  hints: [
    'Clique em Executar — o código já está pronto!',
    'O loop começa em 1 e vai até 5',
  ],
  difficulty: 'easy',
};

const code2_2: CodeChallenge = {
  id: 'loop.2',
  type: 'code',
  episode: 2,
  room: '2.2',
  title: 'Mudando o loop',
  description: 'Agora mude o loop para contar apenas de **1 até 3**.',
  instructions: 'Escreva um loop for que conta de 1 até 3, imprimindo cada número.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Escreva um loop for que conta de 1 até 3
// A cada volta, imprima o valor de i
`,
    python: `# Escreva um loop for que conta de 1 até 3
# A cada volta, imprima o valor de i
`,
  },
  expectedOutput: '1\n2\n3',
  hints: [
    'Em JavaScript: for (let i = 1; i <= 3; i++) { console.log(i); }',
    'Em Python: for i in range(1, 4): print(i)',
    'Lembre: em Python, range(1, 4) vai de 1 até 3',
  ],
  difficulty: 'easy',
};

const theory2_3: TheoryChallenge = {
  id: 'loop.3',
  type: 'theory',
  episode: 2,
  room: '2.3',
  title: 'Loop com textos',
  description: 'Loops não servem só para números! Podemos percorrer cada letra de um texto.',
  content: `
**Percorrendo um texto letra por letra:**

Imagine o texto "OLA":
• Posição 0: "O"
• Posição 1: "L"
• Posição 2: "A"

Sim, em programação contamos a partir do **0**!

**Por que isso importa?**
Para criptografar uma mensagem, precisamos acessar **cada letra** separadamente e transformá-la. É exatamente isso que um loop faz!

**Exemplo:**
• **JavaScript:** \`texto[0]\` → primeira letra
• **Python:** \`texto[0]\` → primeira letra

Na próxima sala vamos percorrer um texto letra por letra!
  `,
};

const code2_4: CodeChallenge = {
  id: 'loop.4',
  type: 'code',
  episode: 2,
  room: '2.4',
  title: 'Percorrendo um texto',
  description: 'O código abaixo mostra cada letra de "OLA" separadamente. **Execute** para ver!',
  instructions: 'Escreva um loop que percorre o texto "OLA" e imprime cada letra.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const texto = "OLA";

// Escreva um loop for que percorre cada letra do texto
// A cada volta, imprima a letra atual
`,
    python: `texto = "OLA"

# Escreva um loop for que percorre cada letra do texto
# A cada volta, imprima a letra atual
`,
  },
  expectedOutput: 'O\nL\nA',
  hints: [
    'Em JS: for (let i = 0; i < texto.length; i++) { console.log(texto[i]); }',
    'Em Python: for letra in texto: print(letra)',
    'texto[0] = "O", texto[1] = "L", texto[2] = "A"',
  ],
  difficulty: 'easy',
};

const code2_5: CodeChallenge = {
  id: 'loop.5',
  type: 'code',
  episode: 2,
  room: '2.5',
  title: 'Sua vez — mude o texto',
  description: 'Mude o texto para **"SEC"** (de segurança) e veja as letras.',
  instructions: 'Mude o texto para "SEC" e escreva um loop para imprimir cada letra.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Mude "OLA" para "SEC":
const texto = "OLA";

// Escreva um loop for que percorre cada letra do texto
// A cada volta, imprima a letra atual
`,
    python: `# Mude "OLA" para "SEC":
texto = "OLA"

# Escreva um loop for que percorre cada letra do texto
# A cada volta, imprima a letra atual
`,
  },
  expectedOutput: 'S\nE\nC',
  hints: [
    'Primeiro mude "OLA" para "SEC" na variável texto',
    'Depois escreva o loop: for (let i = 0; i < texto.length; i++) em JS',
    'Em Python: for letra in texto: print(letra)',
  ],
  difficulty: 'easy',
};

const code2_6: CodeChallenge = {
  id: 'loop.6',
  type: 'code',
  episode: 2,
  room: '2.6',
  title: 'Juntando texto com loop',
  description: 'Agora vamos juntar letras com um loop! O código constrói uma palavra letra por letra. **Execute** para ver.',
  instructions: 'Escreva um loop que percorre "HACK" e junta cada letra na variável resultado.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const letras = "HACK";
let resultado = "";

// Escreva um loop for que percorre cada letra de "letras"
// A cada volta, adicione a letra ao resultado: resultado = resultado + letra

console.log(resultado);
`,
    python: `letras = "HACK"
resultado = ""

# Escreva um loop for que percorre cada letra de "letras"
# A cada volta, adicione a letra ao resultado: resultado = resultado + letra

print(resultado)
`,
  },
  expectedOutput: 'HACK',
  hints: [
    'Em JS: for (let i = 0; i < letras.length; i++) { resultado = resultado + letras[i]; }',
    'Em Python: for letra in letras: resultado = resultado + letra',
    'resultado = "" → "H" → "HA" → "HAC" → "HACK"',
  ],
  difficulty: 'easy',
};

const theory2_7: TheoryChallenge = {
  id: 'loop.7',
  type: 'theory',
  episode: 2,
  room: '2.7',
  title: 'Parabéns! Você domina loops!',
  description: 'Agora você sabe fazer o computador repetir ações — uma habilidade essencial para cibersegurança.',
  content: `
**O que você aprendeu:**
• for loop: repetir ações várias vezes
• Percorrer textos letra por letra
• Construir palavras com loops (concatenação)

**Como hackers usam loops:**
• **Força bruta:** testar senhas automaticamente (você vai fazer isso!)
• **Escaneamento de rede:** verificar cada porta de um servidor
• **Análise de logs:** ler cada linha de um arquivo de log

**Conceito importante:**
O que você fez agora (percorrer texto e juntar letras) é EXATAMENTE como a Cifra de César funciona! Em breve você vai decodificar mensagens secretas.

**Próximo episódio:**
Vamos aprender **arrays** (listas) — como guardar vários dados de uma vez. Hackers usam listas de senhas para ataques!
  `,
};

export const loopsChallenges: Challenge[] = [
  theory2_0,
  code2_1,
  code2_2,
  theory2_3,
  code2_4,
  code2_5,
  code2_6,
  theory2_7,
];
