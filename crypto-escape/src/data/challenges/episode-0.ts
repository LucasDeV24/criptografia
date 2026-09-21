import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0_1: TheoryChallenge = {
  id: '0.1',
  type: 'theory',
  episode: 0,
  room: '0.1',
  title: 'Bem-vindo ao Crypto Escape!',
  description: 'Você está prestes a aprender cibersegurança de um jeito diferente: resolvendo desafios e escrevendo código. Não se preocupe se nunca programou — vamos começar do zero.',
  content: `
**O que você vai fazer aqui:**
• Ler explicações curtas (como esta)
• Resolver desafios escrevendo código
• Escolher entre JavaScript ou Python
• Ir avançando no seu ritmo

**Não sabe programar?** Tudo bem! Nas próximas salas vamos te guiar passo a passo. **Nenhum conceito aparece em um desafio sem antes ter sido explicado.** Se algo parecer novo, releia a sala de teoria anterior.

**Isso tem a ver com cibersegurança?** Sim! Hackers do bem usam código para proteger sistemas, descobrir vulnerabilidades e decifrar mensagens.

Clique em **Continuar** para avançar.
  `,
};

const theory0_2: TheoryChallenge = {
  id: '0.2',
  type: 'theory',
  episode: 0,
  room: '0.2',
  title: 'O que é código?',
  description: 'Código é uma sequência de instruções que o computador entende e executa. É como uma receita: você escreve os passos, o computador segue.',
  content: `
**Exemplo simples:**
Se você escrever "mostre a mensagem Olá", o computador vai mostrar: Olá

Em programação usamos comandos específicos:
• **JavaScript:** \`console.log("Olá")\`
• **Python:** \`print("Olá")\`

Na próxima sala você vai ver o editor onde escrevemos esse código.
  `,
};

const theory0_3: TheoryChallenge = {
  id: '0.3',
  type: 'theory',
  episode: 0,
  room: '0.3',
  title: 'Conhecendo o editor',
  description: 'O editor é onde você escreve o código. Ele tem 3 partes importantes:',
  content: `
**1. Área do código** (a caixa escura)
É onde você digita. Pode usar JavaScript ou Python — escolha a linguagem no menu.

**2. Botão Executar**
Quando clicar, o computador vai rodar seu código e mostrar o resultado.

**3. Área de Output** (saída)
Aqui aparece o que seu código "imprimiu" — o resultado.

Na próxima sala, o código já vai estar pronto. Você só precisa clicar em **Executar** para ver a mágica acontecer!
  `,
};

const code0_4: CodeChallenge = {
  id: '0.4',
  type: 'code',
  episode: 0,
  room: '0.4',
  title: 'Sua primeira execução',
  description: 'O código já está pronto abaixo. Sua missão é simples: clique no botão **Executar** e veja o que acontece. Não precisa digitar nada ainda!',
  instructions: 'Clique em Executar. O código já está correto.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// O código já está pronto!
// Clique em EXECUTAR (o botão verde) →

console.log("Olá, Crypto Escape!");
`,
    python: `# O código já está pronto!
# Clique em EXECUTAR (o botão verde) →

print("Olá, Crypto Escape!")
`,
  },
  expectedOutput: 'Olá, Crypto Escape!',
  hints: [
    'Procure o botão verde "Executar" no canto superior direito',
    'Clique nele e aguarde o resultado aparecer na área Output',
  ],
  difficulty: 'easy',
};

const code0_5: CodeChallenge = {
  id: '0.5',
  type: 'code',
  episode: 0,
  room: '0.5',
  title: 'Agora é sua vez!',
  description: 'Você viu como funciona. Agora escreva você mesmo! Mude a mensagem entre aspas para: **Bem-vindo** e clique em Executar.',
  instructions: 'Altere a mensagem para exatamente: Bem-vindo',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Mude "sua mensagem" para: Bem-vindo
// (mantenha as aspas)

console.log("sua mensagem");
`,
    python: `# Mude "sua mensagem" para: Bem-vindo
# (mantenha as aspas)

print("sua mensagem")
`,
  },
  expectedOutput: 'Bem-vindo',
  hints: [
    'Substitua "sua mensagem" por "Bem-vindo"',
    'Em JavaScript: console.log("Bem-vindo")',
    'Em Python: print("Bem-vindo")',
  ],
  difficulty: 'easy',
};

const theory0_6: TheoryChallenge = {
  id: '0.6',
  type: 'theory',
  episode: 0,
  room: '0.6',
  title: 'Variáveis e juntando textos',
  description: 'Variáveis são "caixas com nome" onde o programa guarda informações. Vamos ver como criar e usar uma, e como juntar textos.',
  content: `
**O que é uma variável?**
Uma variável guarda uma informação para você usar depois. Pense em uma caixa com uma etiqueta: a etiqueta é o **nome**, e o que está dentro é o **valor**.

• **JavaScript:** \`const usuario = "Ana";\`
• **Python:** \`usuario = "Ana"\`

**Lendo a linha do JavaScript, peça por peça**
• \`const\` → "vou criar uma variável" (existe também \`let\`, que deixa trocar o valor depois)
• \`usuario\` → o nome que você escolhe para a caixa
• \`=\` → "guarde aqui" (não é o "igual" da matemática!)
• \`"Ana"\` → o valor guardado; um texto sempre vai **entre aspas**
• \`;\` → marca o fim da instrução (no Python não se usa)

No Python não existe a palavra \`const\`: basta o nome, o \`=\` e o valor.

**Regras para nomes**
Sem espaços, sem começar com número. Use nomes que expliquem o conteúdo: \`nome\`, \`senha\`, \`total\`.

**Usando a variável**
Escreva o nome da caixa, **sem aspas**, para usar o que está dentro:
• **JavaScript:** \`console.log(usuario);\` → mostra Ana
• **Python:** \`print(usuario)\` → mostra Ana

Com aspas, \`console.log("usuario")\` mostraria a palavra usuario, e não o conteúdo!

**Tipos de valor**
• **Texto** (string): entre aspas, como "Ana"
• **Número:** sem aspas, como 25 ou 2.5
• **Verdadeiro/falso** (booleano): \`true\` / \`false\` no JavaScript, \`True\` / \`False\` no Python

**Juntando textos (concatenação)**
O sinal **+** junta textos: \`"Olá" + " " + "Ana"\` vira \`"Olá Ana"\`. O espaço também é um texto: sem o \`" "\` do meio o resultado seria "OláAna".

Também funciona com variáveis: \`saudacao + " " + nome\`.

**Juntando texto com número (conversão de tipo)**
• **JavaScript:** o \`+\` converte o número sozinho: \`"Idade: " + 25\` dá "Idade: 25".
• **Python:** misturar texto e número com \`+\` dá **erro**. Converta o número em texto com \`str()\`: \`"Idade: " + str(25)\` dá "Idade: 25".

Também existe o caminho inverso, converter texto em número: \`int("25")\` (Python) e \`parseInt("25")\` (JavaScript) devolvem o número 25.
  `,
};

const code0_7: CodeChallenge = {
  id: '0.7',
  type: 'code',
  episode: 0,
  room: '0.7',
  title: 'Criando sua primeira variável',
  description: 'Hora de praticar! Crie uma **variável** chamada `nome` com o valor "Ana" e mostre o conteúdo dela na tela.',
  instructions: 'Crie a variável nome com o texto Ana e imprima o conteúdo dela (sem aspas em volta de nome).',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// 1) Crie uma variável chamada nome com o valor "Ana"
// 2) Mostre o conteúdo dela com console.log


`,
    python: `# 1) Crie uma variável chamada nome com o valor "Ana"
# 2) Mostre o conteúdo dela com print


`,
  },
  expectedOutput: 'Ana',
  explanation: `
**O que aconteceu?**
Você guardou um texto em uma variável e depois usou o NOME da variável (sem aspas) para mostrar o conteúdo. Com aspas, apareceria a palavra "nome".
  `,
  hints: [
    'Passo 1: const nome = "Ana";   (Python: nome = "Ana")',
    'Passo 2: console.log(nome);   (Python: print(nome))',
    'Não coloque aspas em volta de nome no console.log/print, senão aparece a palavra nome',
  ],
  difficulty: 'easy',
};

const code0_8: CodeChallenge = {
  id: '0.8',
  type: 'code',
  episode: 0,
  room: '0.8',
  title: 'Juntando textos',
  description: 'Você pode juntar (concatenar) textos com **+**. As variáveis já estão criadas: falta juntar `saudacao`, um espaço e `nome`, e mostrar o resultado.',
  instructions: 'Imprima: Olá Ana (juntando a variável saudacao, um espaço e a variável nome).',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const saudacao = "Olá";
const nome = "Ana";

// Junte saudacao + " " + nome e mostre com console.log

`,
    python: `saudacao = "Olá"
nome = "Ana"

# Junte saudacao + " " + nome e mostre com print

`,
  },
  expectedOutput: 'Olá Ana',
  explanation: `
**Concatenação**
O + junta os três pedaços: o conteúdo de saudacao, um texto com um espaço, e o conteúdo de nome. Sem o espaço no meio o resultado seria "OláAna".
  `,
  hints: [
    'Use o sinal + entre as três partes',
    'JavaScript: console.log(saudacao + " " + nome);',
    'Python: print(saudacao + " " + nome)',
  ],
  difficulty: 'easy',
};

const theory0_9: TheoryChallenge = {
  id: '0.9',
  type: 'theory',
  episode: 0,
  room: '0.9',
  title: 'Funções: a receita do programador',
  description: 'A partir da próxima sala você vai escrever funções. Aqui está tudo o que precisa saber, linha por linha.',
  content: `
**Por que funções?**
Até aqui você escreveu instruções soltas. Uma **função** é um bloco de código com um **nome**, que você escreve uma vez e usa quantas vezes quiser. Pense em uma máquina de suco: você coloca laranjas (entrada), ela trabalha e devolve suco (saída).

**entrada → função faz o trabalho → saída**

**A anatomia de uma função (JavaScript)**
\`\`\`
function dobro(numero) {
  return numero * 2;
}
\`\`\`
• \`function\` → a palavra que significa "vou criar uma função"
• \`dobro\` → o **nome** da função (você escolhe; deve dizer o que ela faz)
• \`(numero)\` → o **parâmetro**: o nome que a entrada recebe DENTRO da função. Pode haver vários, separados por vírgula: \`(preco, quantidade)\`
• \`{ ... }\` → as chaves cercam o **corpo**: as instruções que a função executa
• \`return numero * 2;\` → **devolve** o resultado para quem chamou a função e encerra a função

**A anatomia de uma função (Python)**
\`\`\`
def dobro(numero):
    return numero * 2
\`\`\`
• \`def\` → vem de "define" (definir): a palavra que cria uma função
• \`dobro\` → o nome; \`(numero)\` → o parâmetro
• \`:\` (dois pontos) → obrigatório no fim da linha: quer dizer "o corpo vem a seguir"
• **Indentação** → em Python NÃO existem chaves. As linhas do corpo ficam **recuadas** (4 espaços) e esse recuo é o que diz "isto pertence à função". Sem o recuo, dá erro!

**Definir é diferente de chamar**
Escrever a função só a ENSINA ao computador; nada acontece ainda. Para usá-la, você a **chama** pelo nome, com os valores entre parênteses:
\`\`\`
dobro(5)     // resultado: 10
dobro(21)    // resultado: 42
\`\`\`
Passo a passo do \`dobro(5)\`:
1. O valor 5 vai para o parâmetro \`numero\` (agora numero vale 5)
2. O corpo roda: \`numero * 2\` dá 10
3. O \`return\` devolve o 10 para quem chamou

Nos desafios, **o sistema chama a sua função** por você, várias vezes, com valores diferentes.

**return × print (muito importante!)**
• \`print\` / \`console.log\` **mostra** algo na tela para uma pessoa ler. Depois disso, o valor "some".
• \`return\` **devolve** o valor para o programa, que pode guardá-lo ou usá-lo em outra conta.

Se você só imprimir, o resultado da função será \`undefined\` (JavaScript) ou \`None\` (Python). Os dois querem dizer "nada foi devolvido".

**O esqueleto que vem nos exercícios**
\`\`\`
function saudar(nome) {
  // seu código aqui
}
\`\`\`
\`\`\`
def saudar(nome):
    # seu código aqui
    pass
\`\`\`
Você troca o comentário pelo seu código. Em Python, o \`pass\` significa "não faz nada" e só segura o lugar: **apague-o** quando escrever sua linha.

**Nomes exatos**
O desafio diz qual nome usar. Escreva exatamente igual. No JavaScript costuma-se usar \`camelCase\` (\`calcularTotal\`) e no Python \`snake_case\` (\`calcular_total\`).
  `,
};

const theory0_10: TheoryChallenge = {
  id: '0.10',
  type: 'theory',
  episode: 0,
  room: '0.10',
  title: 'Como o sistema confere o seu código',
  description: 'Os próximos desafios são corrigidos por testes automáticos. Entenda como ler os resultados.',
  content: `
**Como funciona a correção**
Ao clicar em **Executar testes**, o sistema chama a SUA função várias vezes, cada vez com valores diferentes, e compara o valor devolvido com o esperado.

**Exemplos e testes ocultos**
• No topo do exercício aparecem **exemplos**. \`saudar("Ana") → "Olá Ana"\` quer dizer: "chamando a função com "Ana", espero receber "Olá Ana"".
• Existem também **testes ocultos**: casos que você não vê (texto vazio, número zero, limites). Servem para conferir se a sua lógica funciona em TODAS as situações, e não só nos exemplos.
• Cada teste mostra ✓ (passou) ou ✗ (falhou). Nos testes visíveis que falham, você vê o que era esperado e o que a sua função devolveu.

**Lendo os resultados**
• \`recebido undefined\` (ou \`None\`) → você esqueceu o \`return\`
• \`deu erro: ... (linha 3)\` → há um erro no código, e a linha aponta onde
• Um teste oculto falhou → pense nos limites: e se for vazio? zero? maiúscula? um espaço sobrando?

**Ajudas que você tem**
• As **dicas** aparecem uma de cada vez, da mais leve para a mais completa
• Depois de 3 tentativas erradas, você pode ver a **solução de referência**
• Ao acertar, a **explicação** é liberada
• Errar faz parte: ler o erro e corrigir é como programadores trabalham todos os dias

**Antes de clicar em Executar testes, confira:**
1. O nome da função está exatamente como o desafio pediu?
2. Você usou \`return\` (e não só print)?
3. No Python, o corpo está recuado e a linha do \`def\` termina com \`:\`?
  `,
};

const code0_11: CodeChallenge = {
  id: '0.11',
  type: 'code',
  episode: 0,
  room: '0.11',
  title: 'Sua primeira função',
  description: 'Ela recebe um `nome` e devolve uma saudação. Use o `dobro` da sala anterior como modelo: o esqueleto já está pronto, você só escreve a linha do `return`.',
  instructions: 'Devolva "Olá " seguido do nome. Exemplo: saudar("Ana") devolve "Olá Ana".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Modelo da sala anterior:
//   function dobro(numero) { return numero * 2; }
//
// Agora a sua: devolva "Olá " + nome
function saudar(nome) {
  // troque esta linha pelo seu return
}
`,
    python: `# Modelo da sala anterior:
#   def dobro(numero):
#       return numero * 2
#
# Agora a sua: devolva "Olá " + nome
def saudar(nome):
    # troque esta linha (e o pass) pelo seu return
    pass
`,
  },
  tests: {
    fn: { javascript: 'saudar', python: 'saudar' },
    cases: [
      { name: 'nome simples', args: ['Ana'], expected: 'Olá Ana' },
      { name: 'outro nome', args: ['Hacker'], expected: 'Olá Hacker' },
      { name: 'nome vazio', args: [''], expected: 'Olá ', hidden: true },
      { name: 'nome composto', args: ['Maria Clara'], expected: 'Olá Maria Clara', hidden: true },
    ],
  },
  solution: {
    javascript: `function saudar(nome) {
  return "Olá " + nome;
}`,
    python: `def saudar(nome):
    return "Olá " + nome`,
  },
  explanation: `
**O que você fez**
Definiu uma função com um parâmetro (nome) e devolveu um texto montado com ele. Quando o sistema chama saudar("Ana"), o valor "Ana" entra no parâmetro nome, o corpo roda e o return devolve "Olá Ana".

**Detalhe:** com nome vazio, o resultado é "Olá " (com o espaço no fim). Os testes ocultos conferem exatamente isso.
  `,
  hints: [
    'O corpo da função tem uma única linha: return seguido do texto "Olá " juntado com o nome',
    'JavaScript: return "Olá " + nome;    Python: return "Olá " + nome',
    'No Python, a linha do return precisa estar recuada (4 espaços) e você deve apagar o pass',
  ],
  difficulty: 'easy',
};

const code0_12: CodeChallenge = {
  id: '0.12',
  type: 'code',
  episode: 0,
  room: '0.12',
  title: 'Função com dois parâmetros',
  description: 'Funções podem receber **vários** parâmetros, separados por vírgula. A **ordem** importa: o primeiro valor da chamada vai para o primeiro parâmetro. Calcule o total de uma compra guardando o resultado em uma variável.',
  instructions: 'Devolva o total: preço × quantidade. Exemplo: calcularTotal(10, 3) devolve 30.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Guarde preco * quantidade em uma variável "total" e devolva com return.
function calcularTotal(preco, quantidade) {
  // seu código aqui
}
`,
    python: `# Guarde preco * quantidade em uma variável "total" e devolva com return.
def calcular_total(preco, quantidade):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'calcularTotal', python: 'calcular_total' },
    cases: [
      { name: '3 itens de 10', args: [10, 3], expected: 30 },
      { name: '2 itens de 5', args: [5, 2], expected: 10 },
      { name: 'preço zero', args: [0, 5], expected: 0, hidden: true },
      { name: 'preço com decimal', args: [2.5, 4], expected: 10, hidden: true },
      { name: 'quantidade zero', args: [100, 0], expected: 0, hidden: true },
    ],
  },
  solution: {
    javascript: `function calcularTotal(preco, quantidade) {
  const total = preco * quantidade;
  return total;
}`,
    python: `def calcular_total(preco, quantidade):
    total = preco * quantidade
    return total`,
  },
  explanation: `
**O que aconteceu aqui?**
Você guardou o resultado de uma conta em uma variável e devolveu esse valor com return. A variável dá um nome ao valor, o que deixa o código mais fácil de ler.

**Erro comum:** esquecer o return. Sem ele, a função devolve "nada" (undefined / None) e o teste mostra "recebido undefined".
  `,
  hints: [
    'Crie a variável: const total = preco * quantidade;   (Python: total = preco * quantidade)',
    'Depois devolva o valor: return total;',
    'Se aparecer "recebido undefined" (ou None), falta o return',
  ],
  difficulty: 'easy',
};

const code0_13: CodeChallenge = {
  id: '0.13',
  type: 'code',
  episode: 0,
  room: '0.13',
  title: 'Área de um retângulo',
  description: 'Mais uma função com dois parâmetros. A área de um retângulo é a **largura vezes a altura**. Use o sinal `*` para multiplicar.',
  instructions: 'Devolva a área do retângulo. Exemplo: areaRetangulo(3, 4) devolve 12.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva largura * altura
function areaRetangulo(largura, altura) {
  // seu código aqui
}
`,
    python: `# Devolva largura * altura
def area_retangulo(largura, altura):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'areaRetangulo', python: 'area_retangulo' },
    cases: [
      { name: '3 por 4', args: [3, 4], expected: 12 },
      { name: '10 por 2', args: [10, 2], expected: 20 },
      { name: 'largura zero', args: [0, 5], expected: 0, hidden: true },
      { name: 'com decimal', args: [2.5, 4], expected: 10, hidden: true },
      { name: 'quadrado 1 por 1', args: [1, 1], expected: 1, hidden: true },
    ],
  },
  solution: {
    javascript: `function areaRetangulo(largura, altura) {
  return largura * altura;
}`,
    python: `def area_retangulo(largura, altura):
    return largura * altura`,
  },
  explanation: `
**Operações com números**
Os sinais são + (somar), - (subtrair), * (multiplicar) e / (dividir). Aqui o return já devolve a conta pronta, sem precisar de variável.

**Atenção:** não use x para multiplicar. O sinal é o asterisco (*).
  `,
  hints: [
    'A conta é largura * altura',
    'return largura * altura',
    'No Python, lembre do recuo (4 espaços) e de apagar o pass',
  ],
  difficulty: 'easy',
};

const code0_14: CodeChallenge = {
  id: '0.14',
  type: 'code',
  episode: 0,
  room: '0.14',
  title: 'Juntando texto e número',
  description: 'Lembra da conversão de tipo? No Python, para juntar um texto com um número é preciso usar `str()`. No JavaScript o `+` converte sozinho. Monte uma frase de apresentação.',
  instructions: 'Devolva "NOME tem IDADE anos". Exemplo: apresentar("Ana", 20) devolve "Ana tem 20 anos".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva nome + " tem " + idade + " anos"
function apresentar(nome, idade) {
  // seu código aqui
}
`,
    python: `# Devolva nome + " tem " + str(idade) + " anos"
def apresentar(nome, idade):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'apresentar', python: 'apresentar' },
    cases: [
      { name: 'Ana com 20 anos', args: ['Ana', 20], expected: 'Ana tem 20 anos' },
      { name: 'Carlos com 35 anos', args: ['Carlos', 35], expected: 'Carlos tem 35 anos' },
      { name: 'idade zero', args: ['Bebê', 0], expected: 'Bebê tem 0 anos', hidden: true },
      { name: 'nome vazio', args: ['', 5], expected: ' tem 5 anos', hidden: true },
    ],
  },
  solution: {
    javascript: `function apresentar(nome, idade) {
  return nome + " tem " + idade + " anos";
}`,
    python: `def apresentar(nome, idade):
    return nome + " tem " + str(idade) + " anos"`,
  },
  explanation: `
**Texto + número**
No JavaScript, o + junta o texto com o número e converte sozinho. No Python isso dá erro (TypeError), então converta o número com str(idade).

**Os espaços fazem parte do texto:** " tem " e " anos" têm espaço dos dois lados; sem eles ficaria "Anatem20anos".
  `,
  hints: [
    'Junte os pedaços com +: o nome, " tem ", a idade, " anos"',
    'JavaScript: return nome + " tem " + idade + " anos";',
    'Python: use str(idade) para converter o número em texto',
  ],
  difficulty: 'easy',
};

const code0_15: CodeChallenge = {
  id: '0.15',
  type: 'code',
  episode: 0,
  room: '0.15',
  title: 'Convertendo temperatura',
  description: 'Para converter Celsius em Fahrenheit: multiplique por 9, divida por 5 e some 32. Use uma **variável** para deixar a conta em passos.',
  instructions: 'Devolva a temperatura em Fahrenheit. Exemplo: celsiusParaFahrenheit(100) devolve 212.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Fahrenheit = celsius * 9 / 5 + 32
function celsiusParaFahrenheit(celsius) {
  // seu código aqui
}
`,
    python: `# Fahrenheit = celsius * 9 / 5 + 32
def celsius_para_fahrenheit(celsius):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'celsiusParaFahrenheit', python: 'celsius_para_fahrenheit' },
    cases: [
      { name: 'ponto de ebulição', args: [100], expected: 212 },
      { name: 'ponto de congelamento', args: [0], expected: 32 },
      { name: 'temperatura negativa', args: [-40], expected: -40, hidden: true },
      { name: '10 graus', args: [10], expected: 50, hidden: true },
      { name: '20 graus', args: [20], expected: 68, hidden: true },
    ],
  },
  solution: {
    javascript: `function celsiusParaFahrenheit(celsius) {
  const fahrenheit = celsius * 9 / 5 + 32;
  return fahrenheit;
}`,
    python: `def celsius_para_fahrenheit(celsius):
    fahrenheit = celsius * 9 / 5 + 32
    return fahrenheit`,
  },
  explanation: `
**Ordem das contas**
Multiplicação e divisão acontecem antes da soma, como na matemática. Para mudar a ordem, use parênteses.

**Um valor curioso:** -40 é o único ponto em que Celsius e Fahrenheit coincidem. Os testes ocultos incluem esse caso.
  `,
  hints: [
    'A conta completa é celsius * 9 / 5 + 32',
    'Guarde em uma variável (fahrenheit) e devolva com return',
    'Teste na cabeça: 100 * 9 / 5 + 32 dá 212',
  ],
  difficulty: 'easy',
};

export const episode0Challenges: Challenge[] = [
  theory0_1,
  theory0_2,
  theory0_3,
  code0_4,
  code0_5,
  theory0_6,
  code0_7,
  code0_8,
  theory0_9,
  theory0_10,
  code0_11,
  code0_12,
  code0_13,
  code0_14,
  code0_15,
];
