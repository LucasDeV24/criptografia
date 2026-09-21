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
Uma variável guarda UM valor. Um array guarda VÁRIOS valores de uma vez. No JavaScript se chama **array**; no Python, **lista**.

**Exemplo:**
• Variável: \`senha = "1234"\` → guarda 1 senha
• Array: \`senhas = ["1234", "admin", "qwerty"]\` → guarda 3 senhas (entre colchetes, separadas por vírgula)

**Como acessar os itens (pela posição):**
• \`senhas[0]\` → "1234" (primeiro item)
• \`senhas[1]\` → "admin" (segundo item)
• \`senhas[2]\` → "qwerty" (terceiro item)

Lembre: sempre começa no **0**!

**Criando uma lista vazia e adicionando itens**
• **JavaScript:** \`const senhas = [];\` e depois \`senhas.push("abc");\`
• **Python:** \`senhas = []\` e depois \`senhas.append("abc")\`

\`push\` (JS) e \`append\` (Python) colocam o item **no fim** da lista. Depois de adicionar "a" e depois "b", a lista fica \`["a", "b"]\`.

**Por que isso importa em cibersegurança?**
Hackers usam listas de senhas comuns (chamadas **wordlists**) para tentar invadir sistemas. Você vai aprender a usar e se defender contra isso!
  `,
};

const code3_1: CodeChallenge = {
  id: 'arr.1',
  type: 'code',
  episode: 3,
  room: '3.1',
  title: 'Acessando o primeiro item',
  description: 'Uma lista guarda vários valores em ordem. Cada item tem uma **posição**, e a contagem começa no **0**. Escreva uma função que devolve o primeiro item.',
  instructions: 'Devolva o item da posição 0 da lista. Exemplo: primeiroItem(["maçã", "uva"]) devolve "maçã".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva o primeiro item da lista (posição 0)
function primeiroItem(lista) {
  // seu código aqui
}
`,
    python: `# Devolva o primeiro item da lista (posição 0)
def primeiro_item(lista):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'primeiroItem', python: 'primeiro_item' },
    cases: [
      { name: 'lista de frutas', args: [['maçã', 'banana', 'uva']], expected: 'maçã' },
      { name: 'lista de números', args: [[7, 8, 9]], expected: 7 },
      { name: 'lista com um item', args: [['x']], expected: 'x', hidden: true },
      { name: 'lista de booleanos', args: [[true, false]], expected: true, hidden: true },
    ],
  },
  solution: {
    javascript: `function primeiroItem(lista) {
  return lista[0];
}`,
    python: `def primeiro_item(lista):
    return lista[0]`,
  },
  explanation: `
**Posições começam em 0**
lista[0] é o primeiro item, lista[1] o segundo, e assim por diante. Todo programador erra isso no começo: o "primeiro" está na posição zero.

**Por que importa?** Quase todo ataque de força bruta usa listas de senhas (wordlists). Acessar itens pela posição é a base para percorrê-las.
  `,
  hints: [
    'Use colchetes com o número da posição: lista[0]',
    'Lembre: a contagem começa em 0, não em 1',
    'return lista[0]',
  ],
  difficulty: 'easy',
};

const code3_2: CodeChallenge = {
  id: 'arr.2',
  type: 'code',
  episode: 3,
  room: '3.2',
  title: 'Acessando qualquer posição',
  description: 'Agora a posição vem como **parâmetro**. Escreva uma função que devolve o item de uma posição qualquer da lista.',
  instructions: 'Devolva o item que está na posição indicada. Exemplo: itemNaPosicao(["maçã", "banana", "uva"], 2) devolve "uva".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva o item que está na posição "posicao"
function itemNaPosicao(lista, posicao) {
  // seu código aqui
}
`,
    python: `# Devolva o item que está na posição "posicao"
def item_na_posicao(lista, posicao):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'itemNaPosicao', python: 'item_na_posicao' },
    cases: [
      { name: 'posição 2', args: [['maçã', 'banana', 'uva'], 2], expected: 'uva' },
      { name: 'posição 1', args: [['a', 'b', 'c'], 1], expected: 'b' },
      { name: 'posição 0', args: [['a', 'b', 'c'], 0], expected: 'a', hidden: true },
      { name: 'última posição', args: [[1, 2, 3, 4], 3], expected: 4, hidden: true },
      { name: 'lista de um item', args: [[5], 0], expected: 5, hidden: true },
    ],
  },
  solution: {
    javascript: `function itemNaPosicao(lista, posicao) {
  return lista[posicao];
}`,
    python: `def item_na_posicao(lista, posicao):
    return lista[posicao]`,
  },
  explanation: `
**Posição como variável**
Dentro dos colchetes cabe qualquer valor, inclusive uma variável: lista[posicao].

**A última posição**
Uma lista de 4 itens vai da posição 0 até a 3. A posição 4 não existe. Esse "erro por um" (off-by-one) é uma das causas mais comuns de bugs e de falhas de segurança (como leitura fora dos limites de memória).
  `,
  hints: [
    'A posição é um parâmetro: use lista[posicao]',
    'return lista[posicao]',
    'Numa lista de 4 itens, a última posição é a 3',
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
**Quantos itens tem a lista?**
• **JavaScript:** \`senhas.length\` (sem parênteses)
• **Python:** \`len(senhas)\`

Para \`["a", "b", "c"]\` o tamanho é 3. Uma lista vazia \`[]\` tem tamanho 0. A última posição é sempre o tamanho menos 1.

**Percorrendo uma lista**
JavaScript:
\`\`\`
for (let i = 0; i < senhas.length; i++) {
  const senha = senhas[i];
}
\`\`\`
Python:
\`\`\`
for senha in senhas:
    ...
\`\`\`
Se você precisar da **posição** no Python, use \`for i in range(len(senhas)):\` e depois \`senhas[i]\`.

**Três padrões que você vai usar sempre**
• **Buscar:** percorra e, ao achar o item, devolva com \`return\` (o return interrompe a função)
• **Contar:** um acumulador que soma 1 quando um item passa em um teste (\`if\`)
• **Filtrar:** guardar em outra lista só os itens que interessam (\`push\` / \`append\`)

**Isso é exatamente um ataque de força bruta!**
O hacker tem uma lista de senhas comuns e testa cada uma:
1. Tenta "admin" → Errada
2. Tenta "1234" → Errada
3. Tenta "password" → ENCONTRADA!

**Na defesa:**
Analistas de segurança também usam isso para:
• Verificar se seus usuários usam senhas fracas
• Testar a segurança do próprio sistema

Nas próximas salas você vai fazer exatamente isso!
  `,
};

const code3_4: CodeChallenge = {
  id: 'arr.4',
  type: 'code',
  episode: 3,
  room: '3.4',
  title: 'Buscando na lista',
  description: 'Percorra uma lista de senhas e diga se o alvo está nela. É assim que funciona um ataque de dicionário.',
  instructions: 'Devolva "Senha encontrada: X" (com a senha) se estiver na lista, senão "Senha não encontrada".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Percorra a lista procurando o alvo.
// Achou: "Senha encontrada: " + senha   |   Não achou: "Senha não encontrada"
function buscarSenha(lista, alvo) {
  // seu código aqui
}
`,
    python: `# Percorra a lista procurando o alvo.
# Achou: "Senha encontrada: " + senha   |   Não achou: "Senha não encontrada"
def buscar_senha(lista, alvo):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'buscarSenha', python: 'buscar_senha' },
    cases: [
      { name: 'está na lista', args: [['123456', 'admin', 'qwerty'], 'admin'], expected: 'Senha encontrada: admin' },
      { name: 'não está na lista', args: [['123456', 'qwerty'], 'admin'], expected: 'Senha não encontrada' },
      { name: 'lista vazia', args: [[], 'x'], expected: 'Senha não encontrada', hidden: true },
      { name: 'diferencia maiúsculas', args: [['a', 'A'], 'A'], expected: 'Senha encontrada: A', hidden: true },
      { name: 'último item da lista', args: [['a', 'b', 'c'], 'c'], expected: 'Senha encontrada: c', hidden: true },
      { name: 'só maiúscula na lista', args: [['ADMIN'], 'admin'], expected: 'Senha não encontrada', hidden: true },
    ],
  },
  solution: {
    javascript: `function buscarSenha(lista, alvo) {
  for (let i = 0; i < lista.length; i++) {
    if (lista[i] === alvo) {
      return "Senha encontrada: " + lista[i];
    }
  }
  return "Senha não encontrada";
}`,
    python: `def buscar_senha(lista, alvo):
    for senha in lista:
        if senha == alvo:
            return "Senha encontrada: " + senha
    return "Senha não encontrada"`,
  },
  explanation: `
**Busca linear**
Compare o alvo com cada item, do primeiro ao último. Ao achar, devolva na hora (return interrompe a função). Só depois do loop, quando nada foi achado, devolva "não encontrada".

**Erro comum:** colocar o "não encontrada" DENTRO do loop, que responderia "não" já no primeiro item diferente.

**Na segurança:** um ataque de dicionário faz exatamente isto com milhões de senhas.
  `,
  hints: [
    'Percorra a lista com um loop e compare cada item com o alvo',
    'Ao achar, faça return "Senha encontrada: " + senha',
    'O return "Senha não encontrada" fica DEPOIS do loop',
  ],
  difficulty: 'medium',
};

const code3_5: CodeChallenge = {
  id: 'arr.5',
  type: 'code',
  episode: 3,
  room: '3.5',
  title: 'Em qual posição está?',
  description: 'Agora devolva a **posição** em que o alvo aparece na lista, ou -1 se ele não estiver lá.',
  instructions: 'Devolva o índice da primeira ocorrência do alvo, ou -1. Exemplo: posicaoDaSenha(["123456","admin","qwerty"], "qwerty") devolve 2.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva a posição do alvo na lista, ou -1 se não estiver
function posicaoDaSenha(lista, alvo) {
  // seu código aqui
}
`,
    python: `# Devolva a posição do alvo na lista, ou -1 se não estiver
def posicao_da_senha(lista, alvo):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'posicaoDaSenha', python: 'posicao_da_senha' },
    cases: [
      { name: 'no fim', args: [['123456', 'admin', 'qwerty'], 'qwerty'], expected: 2 },
      { name: 'no meio', args: [['123456', 'admin', 'qwerty'], 'admin'], expected: 1 },
      { name: 'não existe', args: [['a', 'b'], 'z'], expected: -1 },
      { name: 'primeira posição', args: [['x', 'y'], 'x'], expected: 0, hidden: true },
      { name: 'lista vazia', args: [[], 'a'], expected: -1, hidden: true },
      { name: 'repetido: vale a primeira', args: [['a', 'b', 'a'], 'a'], expected: 0, hidden: true },
    ],
  },
  solution: {
    javascript: `function posicaoDaSenha(lista, alvo) {
  for (let i = 0; i < lista.length; i++) {
    if (lista[i] === alvo) {
      return i;
    }
  }
  return -1;
}`,
    python: `def posicao_da_senha(lista, alvo):
    for i in range(len(lista)):
        if lista[i] == alvo:
            return i
    return -1`,
  },
  explanation: `
**Usando o índice**
Em vez de olhar só o item, o loop agora precisa da posição i. Ao achar, devolva i. Como o return sai da função na hora, a PRIMEIRA ocorrência é a que vale.

**O valor -1**
É uma convenção: "não encontrado". Como posições válidas começam em 0, o -1 nunca é confundido com uma posição real.
  `,
  hints: [
    'Percorra com o índice: for (let i = 0; i < lista.length; i++)  /  for i in range(len(lista))',
    'Se lista[i] for igual ao alvo, devolva i',
    'Depois do loop, devolva -1',
  ],
  difficulty: 'medium',
};

const ex3_contar: CodeChallenge = {
  id: 'arr.8',
  type: 'code',
  episode: 3,
  room: '3.6',
  title: 'Contando ocorrências',
  description: 'Quantas vezes um item aparece na lista? É o padrão **contar**: um acumulador que sobe 1 sempre que o item passa em um teste.',
  instructions: 'Devolva quantas vezes o alvo aparece na lista. Exemplo: contarOcorrencias([1, 2, 1, 3, 1], 1) devolve 3.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Conte quantas vezes "alvo" aparece em "lista"
function contarOcorrencias(lista, alvo) {
  let total = 0;
  // percorra a lista e some 1 quando o item for igual ao alvo
  return total;
}
`,
    python: `# Conte quantas vezes "alvo" aparece em "lista"
def contar_ocorrencias(lista, alvo):
    total = 0
    # percorra a lista e some 1 quando o item for igual ao alvo
    return total
`,
  },
  tests: {
    fn: { javascript: 'contarOcorrencias', python: 'contar_ocorrencias' },
    cases: [
      { name: 'números repetidos', args: [[1, 2, 1, 3, 1], 1], expected: 3 },
      { name: 'textos', args: [['a', 'b', 'a'], 'a'], expected: 2 },
      { name: 'lista vazia', args: [[], 5], expected: 0, hidden: true },
      { name: 'item que não existe', args: [[1, 2, 3], 9], expected: 0, hidden: true },
      { name: 'todos iguais', args: [[5, 5, 5, 5], 5], expected: 4, hidden: true },
      { name: 'um item só', args: [['x'], 'x'], expected: 1, hidden: true },
    ],
  },
  solution: {
    javascript: `function contarOcorrencias(lista, alvo) {
  let total = 0;
  for (let i = 0; i < lista.length; i++) {
    if (lista[i] === alvo) {
      total = total + 1;
    }
  }
  return total;
}`,
    python: `def contar_ocorrencias(lista, alvo):
    total = 0
    for item in lista:
        if item == alvo:
            total = total + 1
    return total`,
  },
  explanation: `
**Loop + if + acumulador**
O mesmo padrão que você usou para contar letras em um texto agora funciona em listas. Quase todo problema de "quantos...?" se resolve assim.

**Na segurança:** contar quantas vezes cada IP aparece em um log revela ataques de força bruta.
  `,
  hints: [
    'Percorra a lista com um loop',
    'Se o item for igual ao alvo, faça total = total + 1',
    'Devolva o total depois do loop',
  ],
  difficulty: 'easy',
};

const ex3_somar: CodeChallenge = {
  id: 'arr.9',
  type: 'code',
  episode: 3,
  room: '3.7',
  title: 'Somando uma lista',
  description: 'Some **todos os números** de uma lista. Comece um acumulador em 0 e adicione cada item.',
  instructions: 'Devolva a soma de todos os itens. Exemplo: somarLista([1, 2, 3]) devolve 6.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva a soma de todos os números da lista
function somarLista(numeros) {
  let soma = 0;
  // percorra a lista somando cada número
  return soma;
}
`,
    python: `# Devolva a soma de todos os números da lista
def somar_lista(numeros):
    soma = 0
    # percorra a lista somando cada número
    return soma
`,
  },
  tests: {
    fn: { javascript: 'somarLista', python: 'somar_lista' },
    cases: [
      { name: 'três números', args: [[1, 2, 3]], expected: 6 },
      { name: 'dezenas', args: [[10, 20]], expected: 30 },
      { name: 'lista vazia', args: [[]], expected: 0, hidden: true },
      { name: 'números negativos', args: [[-1, 1]], expected: 0, hidden: true },
      { name: 'um só número', args: [[5]], expected: 5, hidden: true },
      { name: 'decimais', args: [[0.5, 0.5]], expected: 1, hidden: true },
    ],
  },
  solution: {
    javascript: `function somarLista(numeros) {
  let soma = 0;
  for (let i = 0; i < numeros.length; i++) {
    soma = soma + numeros[i];
  }
  return soma;
}`,
    python: `def somar_lista(numeros):
    soma = 0
    for numero in numeros:
        soma = soma + numero
    return soma`,
  },
  explanation: `
**Acumulador em listas**
Exatamente o que você fez com os números de 1 a n, só que agora os valores vêm de uma lista. Uma lista vazia dá soma 0: o loop nem roda.

**Na prática:** somar valores de uma lista é a base de relatórios, como o total de tentativas de login falhas em um dia.
  `,
  hints: [
    'Percorra a lista e faça soma = soma + o item atual',
    'JavaScript: soma = soma + numeros[i]   Python: soma = soma + numero',
    'Devolva a soma depois do loop',
  ],
  difficulty: 'easy',
};

const ex3_maior: CodeChallenge = {
  id: 'arr.10',
  type: 'code',
  episode: 3,
  room: '3.8',
  title: 'O maior número da lista',
  description: 'Descubra o **maior** valor de uma lista. Comece assumindo que o primeiro item é o maior e vá **comparando** com os demais. A lista nunca vem vazia.',
  instructions: 'Devolva o maior número da lista. Exemplo: maiorNumero([3, 9, 2]) devolve 9.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Comece com o primeiro item como "maior" e compare com os outros
function maiorNumero(numeros) {
  let maior = numeros[0];
  // percorra a lista; se um item for maior que "maior", atualize
  return maior;
}
`,
    python: `# Comece com o primeiro item como "maior" e compare com os outros
def maior_numero(numeros):
    maior = numeros[0]
    # percorra a lista; se um item for maior que "maior", atualize
    return maior
`,
  },
  tests: {
    fn: { javascript: 'maiorNumero', python: 'maior_numero' },
    cases: [
      { name: 'maior no meio', args: [[3, 9, 2]], expected: 9 },
      { name: 'ordem crescente', args: [[1, 2, 3]], expected: 3 },
      { name: 'só números negativos', args: [[-5, -2, -9]], expected: -2, hidden: true },
      { name: 'um só número', args: [[7]], expected: 7, hidden: true },
      { name: 'todos iguais', args: [[4, 4, 4]], expected: 4, hidden: true },
      { name: 'maior no começo', args: [[9, 1, 1]], expected: 9, hidden: true },
    ],
  },
  solution: {
    javascript: `function maiorNumero(numeros) {
  let maior = numeros[0];
  for (let i = 1; i < numeros.length; i++) {
    if (numeros[i] > maior) {
      maior = numeros[i];
    }
  }
  return maior;
}`,
    python: `def maior_numero(numeros):
    maior = numeros[0]
    for numero in numeros:
        if numero > maior:
            maior = numero
    return maior`,
  },
  explanation: `
**Guardar o "campeão até agora"**
A variável maior guarda o maior valor visto até o momento. A cada item, se ele for maior, ele assume o posto. No fim, ela tem o maior de todos.

**Por que começar no primeiro item e não em 0?** Se todos os números forem negativos, começar em 0 devolveria 0, que nem está na lista. Os testes ocultos conferem isso.
  `,
  hints: [
    'Compare cada item com a variável maior',
    'Se o item for maior, atualize: maior = item',
    'Comece em numeros[0] (já está no esqueleto), não em 0, por causa dos números negativos',
  ],
  difficulty: 'medium',
};

const code3_6: CodeChallenge = {
  id: 'arr.6',
  type: 'code',
  episode: 3,
  room: '3.9',
  title: 'Contando senhas fracas',
  description: 'Uma auditoria de segurança precisa saber quantas senhas de uma lista são **fracas** (menos de 8 caracteres). Percorra a lista e conte.',
  instructions: 'Devolva quantas senhas têm menos de 8 caracteres. Exemplo: contarFracas(["123", "password", "abc"]) devolve 2.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Conte as senhas com menos de 8 caracteres
function contarFracas(senhas) {
  let total = 0;
  // percorra a lista e some 1 para cada senha fraca
  return total;
}
`,
    python: `# Conte as senhas com menos de 8 caracteres
def contar_fracas(senhas):
    total = 0
    # percorra a lista e some 1 para cada senha fraca
    return total
`,
  },
  tests: {
    fn: { javascript: 'contarFracas', python: 'contar_fracas' },
    cases: [
      { name: 'mistura', args: [['123', 'password', 'abc', 'longsenha1']], expected: 2 },
      { name: 'todas fracas', args: [['a', 'bb', 'ccc']], expected: 3 },
      { name: 'lista vazia', args: [[]], expected: 0, hidden: true },
      { name: '8 caracteres não é fraca', args: [['12345678']], expected: 0, hidden: true },
      { name: '7 caracteres é fraca', args: [['1234567']], expected: 1, hidden: true },
      { name: 'senha vazia é fraca', args: [['', 'abcdefgh']], expected: 1, hidden: true },
    ],
  },
  solution: {
    javascript: `function contarFracas(senhas) {
  let total = 0;
  for (let i = 0; i < senhas.length; i++) {
    if (senhas[i].length < 8) {
      total = total + 1;
    }
  }
  return total;
}`,
    python: `def contar_fracas(senhas):
    total = 0
    for senha in senhas:
        if len(senha) < 8:
            total = total + 1
    return total`,
  },
  explanation: `
**Loop + condição + acumulador**
Este padrão aparece o tempo todo: percorrer, testar cada item e acumular um contador.

**Limites:** 8 caracteres NÃO é fraca (< 8), 7 é. Repare como o valor exato do limite decide o resultado.

**Na vida real:** ferramentas de auditoria fazem isto com milhares de contas para achar as senhas mais arriscadas.
  `,
  hints: [
    'Use um loop para visitar cada senha da lista',
    'Dentro do loop, teste o tamanho: senha.length < 8 (Python: len(senha) < 8)',
    'Se for fraca, some 1 em total; devolva total no final',
  ],
  difficulty: 'medium',
};

const ex3_filtrar: CodeChallenge = {
  id: 'arr.11',
  type: 'code',
  episode: 3,
  room: '3.10',
  title: 'Filtrando uma lista',
  description: 'Filtrar é montar uma **lista nova** só com os itens que interessam. Crie uma lista vazia e use `push` (JS) ou `append` (Python) para adicionar.',
  instructions: 'Devolva uma nova lista só com os números MAIORES que o limite, na mesma ordem. Exemplo: filtrarMaioresQue([1, 5, 10, 15], 5) devolve [10, 15].',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva só os números maiores que "limite"
function filtrarMaioresQue(numeros, limite) {
  const resultado = [];
  // percorra a lista e adicione (push) os que passam no teste
  return resultado;
}
`,
    python: `# Devolva só os números maiores que "limite"
def filtrar_maiores_que(numeros, limite):
    resultado = []
    # percorra a lista e adicione (append) os que passam no teste
    return resultado
`,
  },
  tests: {
    fn: { javascript: 'filtrarMaioresQue', python: 'filtrar_maiores_que' },
    cases: [
      { name: 'mistura', args: [[1, 5, 10, 15], 5], expected: [10, 15] },
      { name: 'nenhum passa', args: [[3, 4], 10], expected: [] },
      { name: 'lista vazia', args: [[], 0], expected: [], hidden: true },
      { name: 'igual ao limite não entra', args: [[5, 5, 6], 5], expected: [6], hidden: true },
      { name: 'limite negativo', args: [[-1, 0, 1], -1], expected: [0, 1], hidden: true },
      { name: 'todos passam', args: [[10, 20], 1], expected: [10, 20], hidden: true },
    ],
  },
  solution: {
    javascript: `function filtrarMaioresQue(numeros, limite) {
  const resultado = [];
  for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] > limite) {
      resultado.push(numeros[i]);
    }
  }
  return resultado;
}`,
    python: `def filtrar_maiores_que(numeros, limite):
    resultado = []
    for numero in numeros:
        if numero > limite:
            resultado.append(numero)
    return resultado`,
  },
  explanation: `
**Padrão filtrar**
Percorra, teste cada item e só adicione à lista nova o que passa. A lista original não muda.

**Limites:** "maiores que" significa estritamente maior (>). Um item igual ao limite não entra: foi o que o teste oculto conferiu.
  `,
  hints: [
    'Percorra a lista e teste: numeros[i] > limite',
    'Se passar, adicione: resultado.push(item)  (Python: resultado.append(item))',
    'Devolva a lista resultado no final',
  ],
  difficulty: 'medium',
};

const ex3_fortes: CodeChallenge = {
  id: 'arr.12',
  type: 'code',
  episode: 3,
  room: '3.11',
  title: 'Selecionando senhas fortes',
  description: 'Use o padrão filtrar para uma auditoria de segurança: da lista de senhas, devolva só as **fortes** (8 ou mais caracteres), mantendo a ordem.',
  instructions: 'Devolva uma lista com as senhas que têm 8 caracteres ou mais. Exemplo: senhasFortes(["abc", "password", "x"]) devolve ["password"].',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva só as senhas com 8 ou mais caracteres
function senhasFortes(senhas) {
  const fortes = [];
  // percorra e adicione as que passam no teste de tamanho
  return fortes;
}
`,
    python: `# Devolva só as senhas com 8 ou mais caracteres
def senhas_fortes(senhas):
    fortes = []
    # percorra e adicione as que passam no teste de tamanho
    return fortes
`,
  },
  tests: {
    fn: { javascript: 'senhasFortes', python: 'senhas_fortes' },
    cases: [
      { name: 'mistura', args: [['abc', 'password', '12345678', 'x']], expected: ['password', '12345678'] },
      { name: 'todas fracas', args: [['a', 'bb']], expected: [] },
      { name: 'lista vazia', args: [[]], expected: [], hidden: true },
      { name: '7 caracteres é fraca', args: [['1234567']], expected: [], hidden: true },
      { name: '8 caracteres é forte', args: [['12345678']], expected: ['12345678'], hidden: true },
      { name: 'mantém a ordem', args: [['zzzzzzzz', 'aaaaaaaa']], expected: ['zzzzzzzz', 'aaaaaaaa'], hidden: true },
    ],
  },
  solution: {
    javascript: `function senhasFortes(senhas) {
  const fortes = [];
  for (let i = 0; i < senhas.length; i++) {
    if (senhas[i].length >= 8) {
      fortes.push(senhas[i]);
    }
  }
  return fortes;
}`,
    python: `def senhas_fortes(senhas):
    fortes = []
    for senha in senhas:
        if len(senha) >= 8:
            fortes.append(senha)
    return fortes`,
  },
  explanation: `
**Filtrar por uma propriedade do item**
Aqui o teste usa o tamanho de cada senha (.length / len). O padrão é o mesmo: percorrer, testar, adicionar.

**Na prática:** auditorias de segurança fazem isso com milhares de contas para achar as senhas mais arriscadas.
  `,
  hints: [
    'Teste o tamanho de cada senha: senhas[i].length >= 8  (Python: len(senha) >= 8)',
    'Se passar, adicione à lista fortes com push / append',
    'Devolva a lista fortes no final',
  ],
  difficulty: 'medium',
};

const theory3_7: TheoryChallenge = {
  id: 'arr.7',
  type: 'theory',
  episode: 3,
  room: '3.12',
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
  ex3_contar,
  ex3_somar,
  ex3_maior,
  code3_6,
  ex3_filtrar,
  ex3_fortes,
  theory3_7,
];
