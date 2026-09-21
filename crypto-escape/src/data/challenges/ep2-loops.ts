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
  description: 'Escreva uma função que **conta de 1 até n** e devolve os números em uma lista. Um loop repete a mesma ação várias vezes.',
  instructions: 'Devolva uma lista com os números de 1 até n. Exemplo: contarAte(3) devolve [1, 2, 3].',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva a lista [1, 2, ..., n]
function contarAte(n) {
  const numeros = [];
  // escreva um loop for que adiciona cada número em "numeros"
  return numeros;
}
`,
    python: `# Devolva a lista [1, 2, ..., n]
def contar_ate(n):
    numeros = []
    # escreva um loop for que adiciona cada número em "numeros"
    return numeros
`,
  },
  tests: {
    fn: { javascript: 'contarAte', python: 'contar_ate' },
    cases: [
      { name: 'até 3', args: [3], expected: [1, 2, 3] },
      { name: 'até 5', args: [5], expected: [1, 2, 3, 4, 5] },
      { name: 'só o 1', args: [1], expected: [1], hidden: true },
      { name: 'zero: lista vazia', args: [0], expected: [], hidden: true },
      { name: 'até 10', args: [10], expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], hidden: true },
    ],
  },
  solution: {
    javascript: `function contarAte(n) {
  const numeros = [];
  for (let i = 1; i <= n; i++) {
    numeros.push(i);
  }
  return numeros;
}`,
    python: `def contar_ate(n):
    numeros = []
    for i in range(1, n + 1):
        numeros.append(i)
    return numeros`,
  },
  explanation: `
**Como o loop funciona**
"Comece em 1, repita enquanto i <= n, e a cada volta some 1." Em Python, range(1, n + 1) vai de 1 até n (o último número do range NÃO entra).

**Casos de borda**
Com n = 0 o loop nem roda e a lista fica vazia. Com n = 1, roda uma vez. Por isso existem testes ocultos para esses casos.
  `,
  hints: [
    'JavaScript: for (let i = 1; i <= n; i++) { numeros.push(i); }',
    'Python: for i in range(1, n + 1): numeros.append(i)',
    'Em Python, range(1, 4) dá 1, 2, 3, então use n + 1 para incluir o n',
  ],
  difficulty: 'easy',
};

const code2_2: CodeChallenge = {
  id: 'loop.2',
  type: 'code',
  episode: 2,
  room: '2.2',
  title: 'Acumulando com um loop',
  description: 'Loops também **acumulam** resultados. Some todos os números de 1 até n usando uma variável que vai crescendo a cada volta.',
  instructions: 'Devolva a soma de 1 até n. Exemplo: somarAte(4) devolve 10 (1+2+3+4).',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva 1 + 2 + ... + n
function somarAte(n) {
  let soma = 0;
  // escreva um loop que soma cada número em "soma"
  return soma;
}
`,
    python: `# Devolva 1 + 2 + ... + n
def somar_ate(n):
    soma = 0
    # escreva um loop que soma cada número em "soma"
    return soma
`,
  },
  tests: {
    fn: { javascript: 'somarAte', python: 'somar_ate' },
    cases: [
      { name: 'até 4', args: [4], expected: 10 },
      { name: 'até 5', args: [5], expected: 15 },
      { name: 'só o 1', args: [1], expected: 1, hidden: true },
      { name: 'zero', args: [0], expected: 0, hidden: true },
      { name: 'até 100', args: [100], expected: 5050, hidden: true },
    ],
  },
  solution: {
    javascript: `function somarAte(n) {
  let soma = 0;
  for (let i = 1; i <= n; i++) {
    soma = soma + i;
  }
  return soma;
}`,
    python: `def somar_ate(n):
    soma = 0
    for i in range(1, n + 1):
        soma = soma + i
    return soma`,
  },
  explanation: `
**O padrão acumulador**
Comece com uma variável em 0 e, a cada volta, some algo nela. É um dos padrões mais usados em programação: somar, contar, juntar textos.

**Curiosidade:** existe uma fórmula direta (n * (n + 1) / 2), mas aqui você treina o loop. Com n = 100 o resultado é 5050.
  `,
  hints: [
    'Comece com soma = 0 e, dentro do loop, faça soma = soma + i',
    'O loop vai de 1 até n (inclusive)',
    'Devolva a soma depois do loop, não dentro dele',
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
  description: 'Percorra um texto **letra por letra** e conte quantas vogais (a, e, i, o, u) ele tem, sem diferenciar maiúsculas de minúsculas.',
  instructions: 'Devolva o número de vogais do texto. Exemplo: contarVogais("Ola Mundo") devolve 4.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Conte as vogais (a, e, i, o, u), maiúsculas ou minúsculas
function contarVogais(texto) {
  let total = 0;
  // percorra cada letra do texto
  return total;
}
`,
    python: `# Conte as vogais (a, e, i, o, u), maiúsculas ou minúsculas
def contar_vogais(texto):
    total = 0
    # percorra cada letra do texto
    return total
`,
  },
  tests: {
    fn: { javascript: 'contarVogais', python: 'contar_vogais' },
    cases: [
      { name: 'texto comum', args: ['Ola Mundo'], expected: 4 },
      { name: 'só vogais', args: ['AEIOU'], expected: 5 },
      { name: 'sem vogais', args: ['xyz'], expected: 0, hidden: true },
      { name: 'texto vazio', args: [''], expected: 0, hidden: true },
      { name: 'maiúsculas e minúsculas misturadas', args: ['aEiOu'], expected: 5, hidden: true },
    ],
  },
  solution: {
    javascript: `function contarVogais(texto) {
  let total = 0;
  const vogais = "aeiou";
  for (let i = 0; i < texto.length; i++) {
    if (vogais.includes(texto[i].toLowerCase())) {
      total = total + 1;
    }
  }
  return total;
}`,
    python: `def contar_vogais(texto):
    total = 0
    vogais = "aeiou"
    for letra in texto:
        if letra.lower() in vogais:
            total = total + 1
    return total`,
  },
  explanation: `
**Percorrendo letras**
Um texto é uma sequência de letras. O loop visita uma por vez (posição 0, 1, 2...). Em Python, "for letra in texto" faz isso direto.

**Normalizando**
Converter para minúscula (toLowerCase / lower) antes de comparar evita esquecer as maiúsculas. Na segurança, esse cuidado (normalizar antes de comparar) evita muitos filtros burláveis.
  `,
  hints: [
    'JavaScript: for (let i = 0; i < texto.length; i++) { const letra = texto[i]; ... }',
    'Python: for letra in texto:',
    'Compare a letra em minúscula com "aeiou": letra.lower() in "aeiou"',
  ],
  difficulty: 'easy',
};

const code2_5: CodeChallenge = {
  id: 'loop.5',
  type: 'code',
  episode: 2,
  room: '2.5',
  title: 'Invertendo um texto',
  description: 'Construir um texto letra por letra é a base da criptografia. Inverta um texto: "HACK" vira "KCAH".',
  instructions: 'Devolva o texto de trás para frente. Exemplo: inverter("HACK") devolve "KCAH".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva o texto invertido, montando o resultado letra por letra
function inverter(texto) {
  let resultado = "";
  // percorra as letras e vá montando o resultado
  return resultado;
}
`,
    python: `# Devolva o texto invertido, montando o resultado letra por letra
def inverter(texto):
    resultado = ""
    # percorra as letras e vá montando o resultado
    return resultado
`,
  },
  tests: {
    fn: { javascript: 'inverter', python: 'inverter' },
    cases: [
      { name: 'HACK', args: ['HACK'], expected: 'KCAH' },
      { name: 'texto curto', args: ['abc'], expected: 'cba' },
      { name: 'vazio', args: [''], expected: '', hidden: true },
      { name: 'uma letra', args: ['a'], expected: 'a', hidden: true },
      { name: 'com espaço', args: ['ab c'], expected: 'c ba', hidden: true },
    ],
  },
  solution: {
    javascript: `function inverter(texto) {
  let resultado = "";
  for (let i = 0; i < texto.length; i++) {
    resultado = texto[i] + resultado;
  }
  return resultado;
}`,
    python: `def inverter(texto):
    resultado = ""
    for letra in texto:
        resultado = letra + resultado
    return resultado`,
  },
  explanation: `
**A ideia**
A cada letra, coloque-a na FRENTE do que já foi montado: "" → "H" → "AH"... no fim "KCAH". Trocar a ordem (resultado + letra por letra + resultado) muda o efeito.

**Conexão com criptografia**
Montar um texto novo a partir das letras de outro é exatamente o que uma cifra faz. Na Cifra de César você troca cada letra por outra.
  `,
  hints: [
    'Comece com resultado = "" e, em cada volta, junte a letra atual',
    'Para inverter, coloque a letra ANTES do resultado: resultado = letra + resultado',
    'Casos de borda: texto vazio e texto com espaços também precisam funcionar',
  ],
  difficulty: 'medium',
};

const code2_6: CodeChallenge = {
  id: 'loop.6',
  type: 'code',
  episode: 2,
  room: '2.6',
  title: 'Simulando força bruta',
  description: 'Um atacante tenta todos os PINs numéricos em ordem (0, 1, 2...), mas desiste depois de `maximo` tentativas. Simule esse ataque com um loop.',
  instructions: 'Devolva em qual tentativa o PIN foi descoberto (a primeira tentativa é o 0), ou -1 se o atacante desistir antes. Ele tenta os valores de 0 até maximo-1.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Tentativa 1 testa o 0, tentativa 2 testa o 1, e assim por diante.
// O atacante só faz "maximo" tentativas (valores de 0 até maximo - 1).
// Devolva o número da tentativa em que acertou, ou -1 se não achou.
function tentativasParaQuebrar(pin, maximo) {
  // seu código aqui
}
`,
    python: `# Tentativa 1 testa o 0, tentativa 2 testa o 1, e assim por diante.
# O atacante só faz "maximo" tentativas (valores de 0 até maximo - 1).
# Devolva o número da tentativa em que acertou, ou -1 se não achou.
def tentativas_para_quebrar(pin, maximo):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'tentativasParaQuebrar', python: 'tentativas_para_quebrar' },
    cases: [
      { name: 'PIN 3 com limite 10', args: [3, 10], expected: 4 },
      { name: 'PIN 0 (primeira tentativa)', args: [0, 10], expected: 1 },
      { name: 'PIN fora do limite', args: [9, 5], expected: -1 },
      { name: 'último valor permitido', args: [9, 10], expected: 10, hidden: true },
      { name: 'PIN igual ao limite (não é tentado)', args: [10, 10], expected: -1, hidden: true },
      { name: 'limite 1', args: [0, 1], expected: 1, hidden: true },
      { name: 'limite zero: nenhuma tentativa', args: [0, 0], expected: -1, hidden: true },
    ],
  },
  solution: {
    javascript: `function tentativasParaQuebrar(pin, maximo) {
  for (let i = 0; i < maximo; i++) {
    if (i === pin) {
      return i + 1;
    }
  }
  return -1;
}`,
    python: `def tentativas_para_quebrar(pin, maximo):
    for i in range(maximo):
        if i == pin:
            return i + 1
    return -1`,
  },
  explanation: `
**Força bruta na prática**
O loop testa cada palpite em ordem. Quando acerta, devolve o número da tentativa. Se o loop termina sem achar, devolve -1.

**Limites de novo!**
O último valor tentado é maximo - 1. Um PIN igual a maximo NÃO é testado: é um erro clássico de "off-by-one".

**Como se defender**
Um PIN de 4 dígitos tem só 10.000 combinações. Por isso sistemas reais bloqueiam a conta após poucas tentativas (você viu isso no Episódio 1) e usam senhas mais longas.
  `,
  hints: [
    'Use um loop de 0 até maximo - 1 (Python: range(maximo))',
    'Dentro do loop, se o valor for igual ao pin, devolva o número da tentativa (i + 1)',
    'Só depois do loop, devolva -1: significa que o atacante desistiu',
  ],
  difficulty: 'medium',
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
