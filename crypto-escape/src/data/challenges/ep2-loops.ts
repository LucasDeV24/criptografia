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

**O laço for, peça por peça**
JavaScript:
\`\`\`
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
\`\`\`
• \`let i = 1\` → cria o **contador** i começando em 1 (roda uma vez, no início)
• \`i <= 5\` → a **condição**: enquanto for verdadeira, o loop continua
• \`i++\` → depois de cada volta, soma 1 ao contador
• \`{ ... }\` → o **corpo**, que se repete a cada volta

Python:
\`\`\`
for i in range(1, 6):
    print(i)
\`\`\`
• \`range(1, 6)\` gera os números de 1 até 5. **O 6 não entra**: o fim é sempre excluído!
• \`i\` recebe um número por volta
• O corpo fica **recuado** (indentação) e a linha do \`for\` termina com \`:\`

Tradução: "comece em 1, vá até 5, e a cada vez some 1".

**O padrão acumulador**
Muitas vezes queremos juntar um resultado ao longo das voltas. Criamos uma variável **antes** do loop, atualizamos **dentro** dele e usamos **depois**:
\`\`\`
let soma = 0;
for (let i = 1; i <= 3; i++) {
  soma = soma + i;
}
// soma vale 6 (0+1, depois +2, depois +3)
\`\`\`
Em Python: \`soma = 0\`, \`for i in range(1, 4):\` e \`soma = soma + i\` dentro do loop.

Use **0** como começo quando for **somar**, e **1** quando for **multiplicar** (senão tudo vira zero).
  `,
};

const code2_1: CodeChallenge = {
  id: 'loop.1',
  type: 'code',
  episode: 2,
  room: '2.1',
  title: 'Seu primeiro loop: somando números',
  description: 'Use um loop para **somar** os números de 1 até n, guardando o total em uma variável (o acumulador).',
  instructions: 'Devolva a soma de 1 até n. Exemplo: somarAte(4) devolve 10 (1+2+3+4).',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva 1 + 2 + ... + n
function somarAte(n) {
  let soma = 0;
  // escreva um loop for que soma cada número em "soma"
  return soma;
}
`,
    python: `# Devolva 1 + 2 + ... + n
def somar_ate(n):
    soma = 0
    # escreva um loop for que soma cada número em "soma"
    return soma
`,
  },
  tests: {
    fn: { javascript: 'somarAte', python: 'somar_ate' },
    cases: [
      { name: 'até 4', args: [4], expected: 10 },
      { name: 'até 5', args: [5], expected: 15 },
      { name: 'só o 1', args: [1], expected: 1, hidden: true },
      { name: 'zero: nada para somar', args: [0], expected: 0, hidden: true },
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
A variável soma começa em 0 e, a cada volta, recebe o valor anterior mais i. Ela é criada ANTES do loop, atualizada DENTRO e devolvida DEPOIS.

**Limites**
Em Python, range(1, n + 1) inclui o n (o fim do range nunca entra, por isso o + 1). Com n = 0, o loop não roda nenhuma vez e a soma continua 0.

**Curiosidade:** existe uma fórmula direta (n * (n + 1) / 2), mas aqui você treina o loop. Com n = 100 o resultado é 5050.
  `,
  hints: [
    'Dentro do loop, faça soma = soma + i',
    'JavaScript: for (let i = 1; i <= n; i++)     Python: for i in range(1, n + 1):',
    'Devolva a soma depois do loop, fora dele (no Python, com o mesmo recuo do for)',
  ],
  difficulty: 'easy',
};

const code2_2: CodeChallenge = {
  id: 'loop.2',
  type: 'code',
  episode: 2,
  room: '2.2',
  title: 'Acumulando com multiplicação',
  description: 'O **fatorial** de n (escrito n!) é 1 × 2 × ... × n. Por exemplo, 4! = 1×2×3×4 = 24. Por definição, 0! = 1. Use o padrão acumulador, mas multiplicando.',
  instructions: 'Devolva o fatorial de n. Exemplo: fatorial(4) devolve 24.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva 1 * 2 * ... * n   (e 1 quando n for 0)
function fatorial(n) {
  let resultado = 1;
  // escreva um loop que multiplica cada número em "resultado"
  return resultado;
}
`,
    python: `# Devolva 1 * 2 * ... * n   (e 1 quando n for 0)
def fatorial(n):
    resultado = 1
    # escreva um loop que multiplica cada número em "resultado"
    return resultado
`,
  },
  tests: {
    fn: { javascript: 'fatorial', python: 'fatorial' },
    cases: [
      { name: '4!', args: [4], expected: 24 },
      { name: '5!', args: [5], expected: 120 },
      { name: '0! vale 1', args: [0], expected: 1, hidden: true },
      { name: '1!', args: [1], expected: 1, hidden: true },
      { name: '10!', args: [10], expected: 3628800, hidden: true },
    ],
  },
  solution: {
    javascript: `function fatorial(n) {
  let resultado = 1;
  for (let i = 1; i <= n; i++) {
    resultado = resultado * i;
  }
  return resultado;
}`,
    python: `def fatorial(n):
    resultado = 1
    for i in range(1, n + 1):
        resultado = resultado * i
    return resultado`,
  },
  explanation: `
**Multiplicar começa em 1**
Ao somar, o acumulador começa em 0. Ao multiplicar, começa em 1: se começasse em 0, tudo viraria 0. É o "elemento neutro" de cada operação.

**Caso de borda**
Com n = 0 o loop não roda e o resultado continua 1, exatamente o valor definido para 0!.
  `,
  hints: [
    'Comece com resultado = 1 (já está no esqueleto)',
    'Dentro do loop: resultado = resultado * i',
    'O loop vai de 1 até n, como no exercício anterior',
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
**Um texto é uma sequência de letras**
Cada letra tem uma **posição** (também chamada de índice), e a contagem começa no **0**. No texto "OLA":
• Posição 0: "O"
• Posição 1: "L"
• Posição 2: "A"

Para pegar uma letra pela posição, use colchetes: \`texto[0]\` → "O". Funciona igual no JavaScript e no Python.

**Quantas letras? .length e len()**
• **JavaScript:** \`texto.length\` (sem parênteses) → 3
• **Python:** \`len(texto)\` → 3

A última posição é sempre o tamanho menos 1.

**Percorrendo letra por letra**
JavaScript:
\`\`\`
for (let i = 0; i < texto.length; i++) {
  const letra = texto[i];
}
\`\`\`
• Começa em 0 e continua enquanto \`i < texto.length\`. Repare no \`<\`: a posição igual ao tamanho **não existe**.

Python:
\`\`\`
for letra in texto:
    ...
\`\`\`
• O Python entrega uma letra por volta direto na variável \`letra\`.

**Comparando letras**
\`letra === "a"\` (JavaScript) ou \`letra == "a"\` (Python). Maiúscula e minúscula são letras diferentes: "A" não é igual a "a".

**Construindo um texto novo**
Comece com um texto vazio (\`resultado = ""\`) e vá juntando: \`resultado = resultado + letra\`. Você usou o padrão acumulador, só que com texto.

**Por que isso importa?**
Para criptografar uma mensagem, precisamos acessar **cada letra** separadamente e transformá-la. É exatamente isso que um loop faz!
  `,
};

const code2_4: CodeChallenge = {
  id: 'loop.4',
  type: 'code',
  episode: 2,
  room: '2.4',
  title: 'Percorrendo um texto: contando letras',
  description: 'Percorra um texto **letra por letra** e conte quantas vezes uma letra específica aparece. Maiúscula e minúscula são diferentes.',
  instructions: 'Devolva quantas vezes a letra aparece no texto. Exemplo: contarLetra("banana", "a") devolve 3.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Conte quantas vezes "letra" aparece em "texto"
function contarLetra(texto, letra) {
  let total = 0;
  // percorra cada caractere do texto e some 1 quando for igual a "letra"
  return total;
}
`,
    python: `# Conte quantas vezes "letra" aparece em "texto"
def contar_letra(texto, letra):
    total = 0
    # percorra cada caractere do texto e some 1 quando for igual a "letra"
    return total
`,
  },
  tests: {
    fn: { javascript: 'contarLetra', python: 'contar_letra' },
    cases: [
      { name: 'banana tem 3 a', args: ['banana', 'a'], expected: 3 },
      { name: 'letra que não aparece', args: ['hacker', 'z'], expected: 0 },
      { name: 'texto vazio', args: ['', 'a'], expected: 0, hidden: true },
      { name: 'maiúscula é diferente de minúscula', args: ['HACK', 'a'], expected: 0, hidden: true },
      { name: 'texto de uma letra só', args: ['aaaa', 'a'], expected: 4, hidden: true },
      { name: 'letra repetida com outras no meio', args: ['abcabc', 'b'], expected: 2, hidden: true },
    ],
  },
  solution: {
    javascript: `function contarLetra(texto, letra) {
  let total = 0;
  for (let i = 0; i < texto.length; i++) {
    if (texto[i] === letra) {
      total = total + 1;
    }
  }
  return total;
}`,
    python: `def contar_letra(texto, letra):
    total = 0
    for caractere in texto:
        if caractere == letra:
            total = total + 1
    return total`,
  },
  explanation: `
**Loop + decisão + acumulador**
Este é um dos padrões mais usados: percorrer, testar cada item com um if e acumular um contador. Você já usou as três peças separadamente; agora as combinou.

**Na segurança:** contar quantas vezes algo aparece (uma letra, um IP, um erro) é a base da análise de logs e da detecção de ataques.
  `,
  hints: [
    'Percorra cada caractere do texto com um loop (veja a sala de teoria anterior)',
    'Dentro do loop, use if: se o caractere for igual à letra, some 1 em total',
    'JavaScript: if (texto[i] === letra) { ... }    Python: if caractere == letra:',
  ],
  difficulty: 'medium',
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
• for loop: repetir ações várias vezes (e o \`range\` do Python, que exclui o fim)
• O padrão acumulador: somar, multiplicar e contar ao longo das voltas
• Percorrer textos letra por letra, com \`.length\` / \`len()\` e a posição \`texto[i]\`
• Construir textos novos com loops (concatenação)

**Como hackers usam loops:**
• **Força bruta:** testar senhas automaticamente (você simulou isso!)
• **Escaneamento de rede:** verificar cada porta de um servidor
• **Análise de logs:** ler cada linha de um arquivo de log

**Conceito importante:**
O que você fez agora (percorrer texto e montar outro) é EXATAMENTE como a Cifra de César funciona! Em breve você vai decodificar mensagens secretas.

**Próximo episódio:**
Vamos aprender **arrays** (listas): como guardar vários dados de uma vez. Hackers usam listas de senhas para ataques!
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
