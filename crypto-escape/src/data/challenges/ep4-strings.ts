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
  description: 'Use **.length** (JavaScript) ou **len()** (Python) para saber quantas letras um texto tem.',
  instructions: 'Devolva a quantidade de caracteres do texto. Exemplo: tamanho("hacker") devolve 6.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva quantos caracteres o texto tem
function tamanho(texto) {
  // seu código aqui
}
`,
    python: `# Devolva quantos caracteres o texto tem
def tamanho(texto):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'tamanho', python: 'tamanho' },
    cases: [
      { name: 'hacker', args: ['hacker'], expected: 6 },
      { name: 'com espaço', args: ['a b'], expected: 3 },
      { name: 'vazio', args: [''], expected: 0, hidden: true },
      { name: 'só números', args: ['12345'], expected: 5, hidden: true },
    ],
  },
  solution: {
    javascript: `function tamanho(texto) {
  return texto.length;
}`,
    python: `def tamanho(texto):
    return len(texto)`,
  },
  explanation: `
**Tamanho de um texto**
JavaScript: texto.length (sem parênteses, é uma propriedade). Python: len(texto) (uma função).

**Espaços contam!** "a b" tem 3 caracteres. Em segurança, o tamanho de uma senha é um dos primeiros critérios de força.
  `,
  hints: [
    'JavaScript: texto.length',
    'Python: len(texto)',
    'Lembre de usar return',
  ],
  difficulty: 'easy',
};

const code4_2: CodeChallenge = {
  id: 'str.2',
  type: 'code',
  episode: 4,
  room: '4.2',
  title: 'Maiúscula e minúscula',
  description: 'Transforme o texto em letras maiúsculas com **.toUpperCase()** (JS) ou **.upper()** (Python).',
  instructions: 'Devolva o texto todo em maiúsculas. Exemplo: paraMaiusculo("hacker") devolve "HACKER".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva o texto em MAIÚSCULAS
function paraMaiusculo(texto) {
  // seu código aqui
}
`,
    python: `# Devolva o texto em MAIÚSCULAS
def para_maiusculo(texto):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'paraMaiusculo', python: 'para_maiusculo' },
    cases: [
      { name: 'hacker', args: ['hacker'], expected: 'HACKER' },
      { name: 'com espaço', args: ['Ola Mundo'], expected: 'OLA MUNDO' },
      { name: 'vazio', args: [''], expected: '', hidden: true },
      { name: 'números e maiúsculas ficam iguais', args: ['ABC123'], expected: 'ABC123', hidden: true },
    ],
  },
  solution: {
    javascript: `function paraMaiusculo(texto) {
  return texto.toUpperCase();
}`,
    python: `def para_maiusculo(texto):
    return texto.upper()`,
  },
  explanation: `
**Métodos de texto**
toUpperCase() / upper() devolvem um texto NOVO; o original não muda (textos são imutáveis).

**Por que importa:** ao comparar dados do usuário (nome, e-mail, comando), é comum normalizar para maiúscula ou minúscula antes, para não deixar passar variações como "ADMIN" e "Admin".
  `,
  hints: [
    'JavaScript: texto.toUpperCase()',
    'Python: texto.upper()',
    'Devolva o resultado com return',
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
  description: 'Todo caractere tem um número (código ASCII/Unicode). Descubra o número de uma letra com **charCodeAt(0)** (JS) ou **ord()** (Python).',
  instructions: 'Devolva o código numérico da letra. Exemplo: letraParaNumero("A") devolve 65.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva o código numérico da letra (A = 65)
function letraParaNumero(letra) {
  // seu código aqui
}
`,
    python: `# Devolva o código numérico da letra (A = 65)
def letra_para_numero(letra):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'letraParaNumero', python: 'letra_para_numero' },
    cases: [
      { name: 'A', args: ['A'], expected: 65 },
      { name: 'a minúscula', args: ['a'], expected: 97 },
      { name: 'Z', args: ['Z'], expected: 90, hidden: true },
      { name: 'o dígito 0', args: ['0'], expected: 48, hidden: true },
    ],
  },
  solution: {
    javascript: `function letraParaNumero(letra) {
  return letra.charCodeAt(0);
}`,
    python: `def letra_para_numero(letra):
    return ord(letra)`,
  },
  explanation: `
**Letras são números**
O computador só guarda números. Cada letra tem um código: A = 65, B = 66... Z = 90; a = 97, b = 98... z = 122. Maiúscula e minúscula têm códigos diferentes.

**Por que isso é a base da criptografia:** para mudar uma letra, você a converte em número, faz uma conta e converte de volta.
  `,
  hints: [
    'JavaScript: letra.charCodeAt(0)',
    'Python: ord(letra)',
    'Maiúscula e minúscula têm códigos diferentes: A = 65 e a = 97',
  ],
  difficulty: 'easy',
};

const code4_5: CodeChallenge = {
  id: 'str.5',
  type: 'code',
  episode: 4,
  room: '4.5',
  title: 'Número para letra',
  description: 'Agora o caminho inverso: transforme um código numérico de volta em letra com **String.fromCharCode()** (JS) ou **chr()** (Python).',
  instructions: 'Devolva a letra que corresponde ao número. Exemplo: numeroParaLetra(72) devolve "H".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva a letra do código (72 = "H")
function numeroParaLetra(numero) {
  // seu código aqui
}
`,
    python: `# Devolva a letra do código (72 = "H")
def numero_para_letra(numero):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'numeroParaLetra', python: 'numero_para_letra' },
    cases: [
      { name: '72 é H', args: [72], expected: 'H' },
      { name: '65 é A', args: [65], expected: 'A' },
      { name: '97 é a minúsculo', args: [97], expected: 'a', hidden: true },
      { name: '122 é z', args: [122], expected: 'z', hidden: true },
    ],
  },
  solution: {
    javascript: `function numeroParaLetra(numero) {
  return String.fromCharCode(numero);
}`,
    python: `def numero_para_letra(numero):
    return chr(numero)`,
  },
  explanation: `
**Ida e volta**
chr / String.fromCharCode fazem o inverso de ord / charCodeAt. Juntas, elas permitem transformar textos letra por letra.

Na próxima sala você vai combinar as duas: converter, somar e converter de volta.
  `,
  hints: [
    'JavaScript: String.fromCharCode(numero)',
    'Python: chr(numero)',
    'É o inverso do exercício anterior',
  ],
  difficulty: 'easy',
};

const code4_6: CodeChallenge = {
  id: 'str.6',
  type: 'code',
  episode: 4,
  room: '4.6',
  title: 'Deslocando uma letra',
  description: 'Este é o coração da criptografia! Pegue uma letra, **some um deslocamento** ao código dela e volte para letra: "A" deslocado 3 vira "D".',
  instructions: 'Devolva a letra deslocada. Aqui as letras não passam do Z. Exemplo: deslocarLetra("A", 3) devolve "D".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Converta a letra em número, some o deslocamento e converta de volta
function deslocarLetra(letra, deslocamento) {
  // seu código aqui
}
`,
    python: `# Converta a letra em número, some o deslocamento e converta de volta
def deslocar_letra(letra, deslocamento):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'deslocarLetra', python: 'deslocar_letra' },
    cases: [
      { name: 'A + 3', args: ['A', 3], expected: 'D' },
      { name: 'H + 3', args: ['H', 3], expected: 'K' },
      { name: 'deslocamento zero', args: ['B', 0], expected: 'B', hidden: true },
      { name: 'M + 10', args: ['M', 10], expected: 'W', hidden: true },
      { name: 'minúscula também desloca', args: ['a', 1], expected: 'b', hidden: true },
    ],
  },
  solution: {
    javascript: `function deslocarLetra(letra, deslocamento) {
  const codigo = letra.charCodeAt(0);
  return String.fromCharCode(codigo + deslocamento);
}`,
    python: `def deslocar_letra(letra, deslocamento):
    codigo = ord(letra)
    return chr(codigo + deslocamento)`,
  },
  explanation: `
**Três passos**
1) letra → número (ord / charCodeAt)  2) somar o deslocamento  3) número → letra (chr / fromCharCode).

**Isso é uma cifra!** Deslocar cada letra 3 posições é a Cifra de César. Falta um detalhe: o que acontece depois do Z? Você resolve isso na próxima sala.
  `,
  hints: [
    'Passo 1: const codigo = letra.charCodeAt(0)  (Python: ord(letra))',
    'Passo 2: some o deslocamento ao código',
    'Passo 3: converta de volta com String.fromCharCode(...) / chr(...)',
  ],
  difficulty: 'medium',
};

const code4_7: CodeChallenge = {
  id: 'str.7',
  type: 'code',
  episode: 4,
  room: '4.7',
  title: 'Sua vez — a Cifra de César completa',
  description: 'Agora criptografe um texto inteiro! Desloque cada letra **A–Z** e volte para o início depois do Z (X + 3 vira A). Espaços ficam como estão.',
  instructions: 'Cifre o texto (letras MAIÚSCULAS A–Z e espaços). Exemplo: cifraDeCesar("HELLO", 3) devolve "KHOOR".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Desloque cada letra A-Z (volte ao A depois do Z). Espaços ficam iguais.
// Dica: (codigo - 65 + deslocamento) % 26 + 65
function cifraDeCesar(texto, deslocamento) {
  let resultado = "";
  // percorra cada caractere do texto
  return resultado;
}
`,
    python: `# Desloque cada letra A-Z (volte ao A depois do Z). Espaços ficam iguais.
# Dica: (codigo - 65 + deslocamento) % 26 + 65
def cifra_de_cesar(texto, deslocamento):
    resultado = ""
    # percorra cada caractere do texto
    return resultado
`,
  },
  tests: {
    fn: { javascript: 'cifraDeCesar', python: 'cifra_de_cesar' },
    cases: [
      { name: 'HELLO com 3', args: ['HELLO', 3], expected: 'KHOOR' },
      { name: 'passa do Z e volta ao A', args: ['XYZ', 3], expected: 'ABC' },
      { name: 'texto vazio', args: ['', 3], expected: '', hidden: true },
      { name: 'espaço é preservado', args: ['A B', 1], expected: 'B C', hidden: true },
      { name: 'deslocamento 26 dá a volta completa', args: ['ABC', 26], expected: 'ABC', hidden: true },
      { name: 'deslocamento zero', args: ['SEGREDO', 0], expected: 'SEGREDO', hidden: true },
    ],
  },
  solution: {
    javascript: `function cifraDeCesar(texto, deslocamento) {
  let resultado = "";
  for (let i = 0; i < texto.length; i++) {
    const letra = texto[i];
    if (letra === " ") {
      resultado = resultado + letra;
    } else {
      const codigo = letra.charCodeAt(0) - 65;
      const novo = (codigo + deslocamento) % 26;
      resultado = resultado + String.fromCharCode(novo + 65);
    }
  }
  return resultado;
}`,
    python: `def cifra_de_cesar(texto, deslocamento):
    resultado = ""
    for letra in texto:
        if letra == " ":
            resultado = resultado + letra
        else:
            codigo = ord(letra) - 65
            novo = (codigo + deslocamento) % 26
            resultado = resultado + chr(novo + 65)
    return resultado`,
  },
  explanation: `
**Dando a volta no alfabeto**
Subtrair 65 leva a letra para a faixa 0–25 (A = 0, Z = 25). Somar o deslocamento e aplicar % 26 (resto da divisão por 26) faz o valor "dar a volta". Depois somamos 65 de novo para voltar ao código da letra.

**Você acabou de criar uma cifra!** É a Cifra de César, usada por Júlio César há mais de 2.000 anos. É fácil de quebrar: existem só 26 deslocamentos possíveis. No próximo módulo você vai quebrar mensagens assim.
  `,
  hints: [
    'Percorra cada caractere; se for espaço, apenas junte ao resultado',
    'Para as letras: codigo = ord(letra) - 65, depois (codigo + deslocamento) % 26',
    'Volte para letra somando 65 novamente e usando chr / String.fromCharCode',
  ],
  difficulty: 'hard',
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
