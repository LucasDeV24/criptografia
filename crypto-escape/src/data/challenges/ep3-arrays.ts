import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory3_0: TheoryChallenge = {
  id: 'arr.0',
  type: 'theory',
  episode: 3,
  room: '3.0',
  title: 'Episódio 3 — Arrays: listas de dados',
  description: 'Neste episódio você vai aprender a guardar VÁRIOS dados de uma vez. Hackers usam listas o tempo todo!',
  content: `
**O que é um array (lista)?**
Uma variável guarda UM valor. Um array guarda VÁRIOS valores de uma vez.

**Exemplo:**
• Variável: \`senha = "1234"\` → guarda 1 senha
• Array: \`senhas = ["1234", "admin", "qwerty"]\` → guarda 3 senhas

**Como acessar os itens:**
• \`senhas[0]\` → "1234" (primeiro item)
• \`senhas[1]\` → "admin" (segundo item)
• \`senhas[2]\` → "qwerty" (terceiro item)

Lembre: sempre começa no **0**!

**Por que isso importa em cibersegurança?**
Hackers usam listas de senhas comuns (chamadas **wordlists**) para tentar invadir sistemas. Você vai aprender a usar e se defender contra isso!
  `,
};

const code3_1: CodeChallenge = {
  id: 'arr.1',
  type: 'code',
  episode: 3,
  room: '3.1',
  title: 'Criando sua primeira lista',
  description: 'O código cria uma lista de frutas e mostra a primeira. **Execute** para ver!',
  instructions: 'Execute o código e veja o resultado.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const frutas = ["maçã", "banana", "uva"];

// Mostrando o primeiro item (posição 0):
console.log(frutas[0]);
`,
    python: `frutas = ["maçã", "banana", "uva"]

# Mostrando o primeiro item (posição 0):
print(frutas[0])
`,
  },
  expectedOutput: 'maçã',
  hints: [
    'O código já está pronto! Execute.',
    'frutas[0] acessa o primeiro item: "maçã"',
  ],
  difficulty: 'easy',
};

const code3_2: CodeChallenge = {
  id: 'arr.2',
  type: 'code',
  episode: 3,
  room: '3.2',
  title: 'Acessando outro item',
  description: 'Mude o código para mostrar **"uva"** em vez de "maçã". Dica: uva está na posição **2**.',
  instructions: 'Mude [0] para [2] e execute.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const frutas = ["maçã", "banana", "uva"];

// Mude [0] para [2]:
console.log(frutas[0]);
`,
    python: `frutas = ["maçã", "banana", "uva"]

# Mude [0] para [2]:
print(frutas[0])
`,
  },
  expectedOutput: 'uva',
  hints: [
    'Troque frutas[0] por frutas[2]',
    'Posição 0 = maçã, 1 = banana, 2 = uva',
  ],
  difficulty: 'easy',
};

const theory3_3: TheoryChallenge = {
  id: 'arr.3',
  type: 'theory',
  episode: 3,
  room: '3.3',
  title: 'Loop + Array = poder!',
  description: 'Quando combinamos loops com arrays, podemos percorrer TODOS os itens da lista automaticamente.',
  content: `
**Combinando o que aprendemos:**
Com um loop, podemos verificar cada item de uma lista:

\`\`\`
para cada senha na lista:
    se senha == "1234":
        mostrar "Senha encontrada!"
\`\`\`

**Isso é exatamente um ataque de força bruta!**
O hacker tem uma lista de senhas comuns e testa cada uma:
1. Tenta "admin" → Errada
2. Tenta "1234" → Errada
3. Tenta "password" → ENCONTRADA!

**Na defesa:**
Analistas de segurança também usam isso para:
• Verificar se seus usuários usam senhas fracas
• Testar a segurança do próprio sistema

Na próxima sala você vai fazer exatamente isso!
  `,
};

const code3_4: CodeChallenge = {
  id: 'arr.4',
  type: 'code',
  episode: 3,
  room: '3.4',
  title: 'Buscando na lista',
  description: 'O código percorre uma lista de senhas e verifica se alguma é igual a "admin". **Execute** para ver!',
  instructions: 'Execute e veja o resultado da busca.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const senhas = ["1234", "admin", "qwerty"];
const alvo = "admin";

for (let i = 0; i < senhas.length; i++) {
  if (senhas[i] == alvo) {
    console.log("Senha encontrada: " + senhas[i]);
  }
}
`,
    python: `senhas = ["1234", "admin", "qwerty"]
alvo = "admin"

for senha in senhas:
    if senha == alvo:
        print("Senha encontrada: " + senha)
`,
  },
  expectedOutput: 'Senha encontrada: admin',
  hints: [
    'O código já está pronto! Execute.',
    'O loop testa cada senha da lista contra o alvo "admin"',
  ],
  difficulty: 'easy',
};

const code3_5: CodeChallenge = {
  id: 'arr.5',
  type: 'code',
  episode: 3,
  room: '3.5',
  title: 'Sua vez — mude o alvo',
  description: 'Mude a variável **alvo** para **"qwerty"** e encontre essa senha na lista.',
  instructions: 'Troque "admin" por "qwerty" na variável alvo.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const senhas = ["1234", "admin", "qwerty"];
const alvo = "admin";

for (let i = 0; i < senhas.length; i++) {
  if (senhas[i] == alvo) {
    console.log("Senha encontrada: " + senhas[i]);
  }
}
`,
    python: `senhas = ["1234", "admin", "qwerty"]
alvo = "admin"

for senha in senhas:
    if senha == alvo:
        print("Senha encontrada: " + senha)
`,
  },
  expectedOutput: 'Senha encontrada: qwerty',
  hints: [
    'Mude const alvo = "admin" para const alvo = "qwerty"',
    'Em Python: mude alvo = "admin" para alvo = "qwerty"',
  ],
  difficulty: 'easy',
};

const code3_6: CodeChallenge = {
  id: 'arr.6',
  type: 'code',
  episode: 3,
  room: '3.6',
  title: 'Contando itens da lista',
  description: 'Use **.length** (JS) ou **len()** (Python) para contar quantos itens uma lista tem. **Execute** o código pronto.',
  instructions: 'Execute e veja quantas senhas a lista tem.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const senhasComuns = ["123456", "password", "admin", "qwerty", "letmein"];

console.log("Total de senhas: " + senhasComuns.length);
`,
    python: `senhas_comuns = ["123456", "password", "admin", "qwerty", "letmein"]

print("Total de senhas: " + str(len(senhas_comuns)))
`,
  },
  expectedOutput: 'Total de senhas: 5',
  hints: [
    'O código já está pronto! Execute.',
    '.length em JS e len() em Python retornam a quantidade de itens',
  ],
  difficulty: 'easy',
};

const theory3_7: TheoryChallenge = {
  id: 'arr.7',
  type: 'theory',
  episode: 3,
  room: '3.7',
  title: 'Parabéns! Você entende listas!',
  description: 'Arrays são uma das estruturas mais importantes da programação. Você vai usá-los em TODOS os episódios de segurança.',
  content: `
**O que você aprendeu:**
• Criar arrays (listas) com vários itens
• Acessar itens por posição (começa no 0)
• Percorrer uma lista com loop
• Buscar um item específico na lista
• Contar itens com length / len()

**Como isso é usado em cibersegurança:**
• **Wordlists:** listas com milhões de senhas comuns
• **Logs:** cada linha de log é um item na lista
• **IPs bloqueados:** firewalls guardam listas de IPs perigosos
• **Vulnerabilidades:** scanners guardam listas de falhas encontradas

**Próximo episódio:**
Vamos aprender a manipular **strings** (textos) — como transformar letras, acessar caracteres e converter entre letras e números. Isso é o passo final antes de fazer criptografia de verdade!
  `,
};

export const arraysChallenges: Challenge[] = [
  theory3_0,
  code3_1,
  code3_2,
  theory3_3,
  code3_4,
  code3_5,
  code3_6,
  theory3_7,
];
