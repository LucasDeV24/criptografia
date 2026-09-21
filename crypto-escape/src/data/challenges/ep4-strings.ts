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

const ex4_ultima: CodeChallenge = {
  id: 'str.10',
  type: 'code',
  episode: 4,
  room: '4.2',
  title: 'A última letra',
  description: 'Você já sabe que a **última posição** de um texto é o tamanho menos 1. Use isso para pegar a última letra.',
  instructions: 'Devolva a última letra do texto (o texto nunca vem vazio). Exemplo: ultimaLetra("hacker") devolve "r".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// A última posição de um texto é o tamanho - 1
function ultimaLetra(texto) {
  // seu código aqui
}
`,
    python: `# A última posição de um texto é o tamanho - 1
def ultima_letra(texto):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'ultimaLetra', python: 'ultima_letra' },
    cases: [
      { name: 'hacker', args: ['hacker'], expected: 'r' },
      { name: 'uma letra só', args: ['a'], expected: 'a' },
      { name: 'termina em espaço', args: ['abc '], expected: ' ', hidden: true },
      { name: 'termina em número', args: ['A1'], expected: '1', hidden: true },
      { name: 'texto longo', args: ['criptografia'], expected: 'a', hidden: true },
    ],
  },
  solution: {
    javascript: `function ultimaLetra(texto) {
  return texto[texto.length - 1];
}`,
    python: `def ultima_letra(texto):
    return texto[len(texto) - 1]`,
  },
  explanation: `
**Última posição = tamanho − 1**
Um texto de 6 letras usa as posições de 0 a 5. Por isso a última é texto[6 - 1].

**Curiosidade:** o Python também aceita texto[-1] para a última letra, mas aqui usamos a conta explícita, que funciona nas duas linguagens.
  `,
  hints: [
    'Ache o tamanho: texto.length (Python: len(texto))',
    'A última posição é o tamanho menos 1',
    'return texto[texto.length - 1]',
  ],
  difficulty: 'easy',
};

const code4_2: CodeChallenge = {
  id: 'str.2',
  type: 'code',
  episode: 4,
  room: '4.3',
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
  room: '4.4',
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
  room: '4.5',
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
  room: '4.6',
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

const ex4_maiuscula: CodeChallenge = {
  id: 'str.11',
  type: 'code',
  episode: 4,
  room: '4.7',
  title: 'É uma letra maiúscula?',
  description: 'As letras maiúsculas ocupam uma **faixa de códigos**: de A = 65 até Z = 90. Descubra se um caractere está nessa faixa usando o código dele e **duas comparações combinadas**.',
  instructions: 'Devolva true se o caractere for uma letra maiúscula de A a Z, senão false. Exemplo: ehMaiuscula("G") devolve true.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Maiúscula: código entre 65 (A) e 90 (Z), inclusive
function ehMaiuscula(letra) {
  // seu código aqui
}
`,
    python: `# Maiúscula: código entre 65 (A) e 90 (Z), inclusive
def eh_maiuscula(letra):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'ehMaiuscula', python: 'eh_maiuscula' },
    cases: [
      { name: 'maiúscula', args: ['G'], expected: true },
      { name: 'minúscula', args: ['g'], expected: false },
      { name: 'primeira da faixa (A)', args: ['A'], expected: true, hidden: true },
      { name: 'última da faixa (Z)', args: ['Z'], expected: true, hidden: true },
      { name: 'logo antes do A (@)', args: ['@'], expected: false, hidden: true },
      { name: 'logo depois do Z ([)', args: ['['], expected: false, hidden: true },
      { name: 'dígito', args: ['5'], expected: false, hidden: true },
    ],
  },
  solution: {
    javascript: `function ehMaiuscula(letra) {
  const codigo = letra.charCodeAt(0);
  return codigo >= 65 && codigo <= 90;
}`,
    python: `def eh_maiuscula(letra):
    codigo = ord(letra)
    return codigo >= 65 and codigo <= 90`,
  },
  explanation: `
**Uma faixa com dois limites**
O caractere precisa ser >= 65 E <= 90. As duas condições ligadas por E (&& / and) definem a faixa.

**Limites:** o "@" (64) e o "[" (91) ficam logo fora da faixa. Os testes ocultos conferem cada borda.
  `,
  hints: [
    'Pegue o código da letra: charCodeAt(0) (Python: ord(letra))',
    'Compare com os dois limites: codigo >= 65 e codigo <= 90',
    'Ligue as duas comparações com && (JavaScript) ou and (Python)',
  ],
  difficulty: 'medium',
};

const ex4_soma: CodeChallenge = {
  id: 'str.12',
  type: 'code',
  episode: 4,
  room: '4.8',
  title: 'Somando os códigos das letras',
  description: 'Combine tudo: percorra um texto **letra por letra**, converta cada uma em código e **some** os códigos. Esse tipo de soma é a ideia por trás dos "checksums" (somas de verificação).',
  instructions: 'Devolva a soma dos códigos de todas as letras. Exemplo: somaDosCodigos("AB") devolve 131 (65 + 66).',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Some o código (charCodeAt) de cada letra do texto
function somaDosCodigos(texto) {
  let soma = 0;
  // percorra o texto letra por letra
  return soma;
}
`,
    python: `# Some o código (ord) de cada letra do texto
def soma_dos_codigos(texto):
    soma = 0
    # percorra o texto letra por letra
    return soma
`,
  },
  tests: {
    fn: { javascript: 'somaDosCodigos', python: 'soma_dos_codigos' },
    cases: [
      { name: 'AB', args: ['AB'], expected: 131 },
      { name: 'abc', args: ['abc'], expected: 294 },
      { name: 'texto vazio', args: [''], expected: 0, hidden: true },
      { name: 'uma letra', args: ['a'], expected: 97, hidden: true },
      { name: 'Hi', args: ['Hi'], expected: 177, hidden: true },
    ],
  },
  solution: {
    javascript: `function somaDosCodigos(texto) {
  let soma = 0;
  for (let i = 0; i < texto.length; i++) {
    soma = soma + texto[i].charCodeAt(0);
  }
  return soma;
}`,
    python: `def soma_dos_codigos(texto):
    soma = 0
    for letra in texto:
        soma = soma + ord(letra)
    return soma`,
  },
  explanation: `
**Loop + conversão + acumulador**
Cada letra vira número (charCodeAt / ord) e é somada ao acumulador. Um texto vazio soma 0.

**Na segurança:** somar (ou combinar) os códigos de um arquivo produz um "checksum": se um único caractere mudar, o resultado muda, e isso detecta alterações. Hashes de verdade são versões bem mais sofisticadas dessa ideia.
  `,
  hints: [
    'Percorra o texto e converta cada letra em código',
    'JavaScript: texto[i].charCodeAt(0)   Python: ord(letra)',
    'Some cada código na variável soma e devolva no final',
  ],
  difficulty: 'medium',
};

const code4_6: CodeChallenge = {
  id: 'str.6',
  type: 'code',
  episode: 4,
  room: '4.9',
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

const theory4_mod: TheoryChallenge = {
  id: 'str.9',
  type: 'theory',
  episode: 4,
  room: '4.10',
  title: 'Dando a volta no alfabeto: o resto da divisão (%)',
  description: 'Na Cifra de César, o Z deslocado volta para o A. Para isso você precisa de uma nova ferramenta: o operador %.',
  content: `
**O problema**
Se você deslocar o "Z" (posição 25 do alfabeto) em 3, chega na posição 28. Mas o alfabeto acaba na 25! Precisamos "dar a volta" e voltar ao "A".

**O resto da divisão: %**
O operador \`%\` (igual no JavaScript e no Python) devolve o **resto** de uma divisão:
• \`7 % 3\` → 1 (7 dividido por 3 dá 2, e sobra 1)
• \`10 % 5\` → 0 (divisão exata, não sobra nada)
• \`28 % 26\` → 2

Na prática: \`numero % 26\` sempre dá um resultado entre 0 e 25. Perfeito para o alfabeto!

**A conta da Cifra de César, passo a passo**
Vamos deslocar "X" em 3:
1. Letra → número: \`ord("X")\` (Python) ou \`"X".charCodeAt(0)\` (JS) = 88
2. Leve para a faixa 0–25 subtraindo 65 (o código do "A"): 88 − 65 = 23
3. Some o deslocamento e dê a volta: (23 + 3) % 26 = 0
4. Volte ao código real somando 65: 0 + 65 = 65, que é o "A"

Resultado: "X" deslocado em 3 vira "A".

**A fórmula completa**
\`(codigo - 65 + deslocamento) % 26 + 65\`

**E os espaços?**
Só as letras A–Z devem ser deslocadas. Um espaço tem que ficar como está, então teste \`letra === " "\` (Python: \`letra == " "\`) antes de aplicar a conta.
  `,
};

const code4_7: CodeChallenge = {
  id: 'str.7',
  type: 'code',
  episode: 4,
  room: '4.11',
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

const ex4_decifrar: CodeChallenge = {
  id: 'str.13',
  type: 'code',
  episode: 4,
  room: '4.12',
  title: 'Decifrando a Cifra de César',
  description: 'Agora o caminho **inverso**: quem recebe a mensagem cifrada precisa **voltar** cada letra pelo mesmo deslocamento. Para não ficar com número negativo, some 26 antes do resto da divisão.',
  instructions: 'Decifre um texto de letras MAIÚSCULAS A–Z e espaços (o deslocamento vai de 0 a 26). Exemplo: decifrarCesar("KHOOR", 3) devolve "HELLO".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Volte cada letra "deslocamento" posições. Espaços ficam iguais.
// Fórmula: (codigo - 65 - deslocamento + 26) % 26 + 65
function decifrarCesar(texto, deslocamento) {
  let resultado = "";
  // percorra cada caractere do texto
  return resultado;
}
`,
    python: `# Volte cada letra "deslocamento" posições. Espaços ficam iguais.
# Fórmula: (codigo - 65 - deslocamento + 26) % 26 + 65
def decifrar_cesar(texto, deslocamento):
    resultado = ""
    # percorra cada caractere do texto
    return resultado
`,
  },
  tests: {
    fn: { javascript: 'decifrarCesar', python: 'decifrar_cesar' },
    cases: [
      { name: 'KHOOR com 3', args: ['KHOOR', 3], expected: 'HELLO' },
      { name: 'volta para o fim do alfabeto', args: ['ABC', 3], expected: 'XYZ' },
      { name: 'texto vazio', args: ['', 3], expected: '', hidden: true },
      { name: 'espaço é preservado', args: ['A B', 1], expected: 'Z A', hidden: true },
      { name: 'deslocamento zero', args: ['SEGREDO', 0], expected: 'SEGREDO', hidden: true },
      { name: 'deslocamento 26 dá a volta completa', args: ['ABC', 26], expected: 'ABC', hidden: true },
    ],
  },
  solution: {
    javascript: `function decifrarCesar(texto, deslocamento) {
  let resultado = "";
  for (let i = 0; i < texto.length; i++) {
    const letra = texto[i];
    if (letra === " ") {
      resultado = resultado + letra;
    } else {
      const codigo = letra.charCodeAt(0) - 65;
      const novo = (codigo - deslocamento + 26) % 26;
      resultado = resultado + String.fromCharCode(novo + 65);
    }
  }
  return resultado;
}`,
    python: `def decifrar_cesar(texto, deslocamento):
    resultado = ""
    for letra in texto:
        if letra == " ":
            resultado = resultado + letra
        else:
            codigo = ord(letra) - 65
            novo = (codigo - deslocamento + 26) % 26
            resultado = resultado + chr(novo + 65)
    return resultado`,
  },
  explanation: `
**Cifrar e decifrar são inversos**
Para cifrar, você somava o deslocamento. Para decifrar, subtrai. Como (0 − 3) daria -3, somamos 26 antes do %, o que mantém o resultado entre 0 e 25.

**Quebrando a cifra:** como só existem 26 deslocamentos possíveis, um atacante pode simplesmente testar todos (força bruta). É por isso que a Cifra de César é só didática.
  `,
  hints: [
    'É o mesmo esqueleto da cifra: percorra o texto, preserve os espaços, converta cada letra',
    'A diferença: em vez de somar o deslocamento, subtraia e some 26: (codigo - deslocamento + 26) % 26',
    'Depois volte para o código real somando 65 e converta para letra',
  ],
  difficulty: 'hard',
};

const theory4_8: TheoryChallenge = {
  id: 'str.8',
  type: 'theory',
  episode: 4,
  room: '4.13',
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
  ex4_ultima,
  code4_2,
  theory4_3,
  code4_4,
  code4_5,
  ex4_maiuscula,
  ex4_soma,
  code4_6,
  theory4_mod,
  code4_7,
  ex4_decifrar,
  theory4_8,
];
