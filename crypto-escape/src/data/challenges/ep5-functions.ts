import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory5_0: TheoryChallenge = {
  id: 'func.0',
  type: 'theory',
  episode: 5,
  room: '5.0',
  title: 'Episódio 5 — Funções: indo mais fundo',
  description: 'Você escreve funções desde o Episódio 0. Agora vamos entendê-las a fundo e ver quando e por que usá-las.',
  content: `
**Recapitulando a anatomia**
\`\`\`
function dobro(numero) {      // JavaScript
  return numero * 2;
}
\`\`\`
\`\`\`
def dobro(numero):            # Python
    return numero * 2
\`\`\`
• O **nome** (\`dobro\`), os **parâmetros** entre parênteses (\`numero\`) e o **corpo**
• O \`return\` devolve o resultado para quem chamou a função
• No Python, o \`:\` no fim do \`def\` e o recuo do corpo são obrigatórios

**Por que usar funções?**
É como uma "receita" que você cria uma vez e usa quantas vezes quiser. Imagine verificar senhas em 10 lugares do sistema:
• Sem função: copiar e colar o mesmo código 10 vezes (e corrigir 10 vezes se houver um erro)
• Com função: criar uma vez e **chamar** 10 vezes

**Funções sem parâmetros**
Nem toda função recebe entradas. Ela pode devolver sempre o mesmo valor:
\`\`\`
function boasVindas() {
  return "Bem-vindo!";
}
\`\`\`
Para chamar, escreva o nome com parênteses **vazios**: \`boasVindas()\`. Os parênteses são obrigatórios, mesmo sem parâmetros.

**Definir × chamar**
Definir a função só a cria. O código dentro dela só roda quando você a **chama**. Nos desafios, o sistema faz as chamadas por você.

Nas próximas salas você vai praticar funções com nenhum, um e vários parâmetros.
  `,
};

const code5_1: CodeChallenge = {
  id: 'func.1',
  type: 'code',
  episode: 5,
  room: '5.1',
  title: 'Função sem parâmetros',
  description: 'Uma função pode não receber nada: ela só **devolve** um valor sempre que é chamada. Escreva uma que devolve a mensagem de boas-vindas do sistema.',
  instructions: 'Devolva o texto "Bem-vindo ao sistema!".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva o texto "Bem-vindo ao sistema!"
function boasVindas() {
  // seu código aqui
}
`,
    python: `# Devolva o texto "Bem-vindo ao sistema!"
def boas_vindas():
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'boasVindas', python: 'boas_vindas' },
    cases: [
      { name: 'mensagem de boas-vindas', args: [], expected: 'Bem-vindo ao sistema!' },
    ],
  },
  solution: {
    javascript: `function boasVindas() {
  return "Bem-vindo ao sistema!";
}`,
    python: `def boas_vindas():
    return "Bem-vindo ao sistema!"`,
  },
  explanation: `
**Chamando uma função**
Depois de definida, a função roda quando você a chama pelo nome com parênteses: boasVindas(). O valor do return é o resultado dessa chamada.

**Atenção ao texto:** ele precisa ser exatamente igual, incluindo o hífen, a exclamação e as maiúsculas.
  `,
  hints: [
    'Dentro da função, use return com o texto entre aspas',
    'return "Bem-vindo ao sistema!"',
    'Confira a pontuação: o texto deve ser idêntico',
  ],
  difficulty: 'easy',
};

const code5_2: CodeChallenge = {
  id: 'func.2',
  type: 'code',
  episode: 5,
  room: '5.2',
  title: 'Montando um alerta',
  description: 'Sistemas de segurança geram alertas padronizados. Crie uma função que recebe o motivo e devolve a mensagem de alerta.',
  instructions: 'Devolva "ALERTA: " seguido do motivo. Exemplo: alerta("Intruso detectado!") devolve "ALERTA: Intruso detectado!".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva "ALERTA: " + motivo
function alerta(motivo) {
  // seu código aqui
}
`,
    python: `# Devolva "ALERTA: " + motivo
def alerta(motivo):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'alerta', python: 'alerta' },
    cases: [
      { name: 'intruso', args: ['Intruso detectado!'], expected: 'ALERTA: Intruso detectado!' },
      { name: 'outro motivo', args: ['Porta aberta'], expected: 'ALERTA: Porta aberta' },
      { name: 'motivo vazio', args: [''], expected: 'ALERTA: ', hidden: true },
    ],
  },
  solution: {
    javascript: `function alerta(motivo) {
  return "ALERTA: " + motivo;
}`,
    python: `def alerta(motivo):
    return "ALERTA: " + motivo`,
  },
  explanation: `
**Parâmetros**
"motivo" é uma entrada: cada chamada pode usar um valor diferente. A função é reutilizável, e escrever uma vez e usar muitas é o objetivo das funções.

**Detalhe:** o espaço depois dos dois pontos faz parte do prefixo "ALERTA: ".
  `,
  hints: [
    'Junte o prefixo "ALERTA: " com o motivo usando +',
    'return "ALERTA: " + motivo',
    'Não esqueça do espaço depois dos dois pontos',
  ],
  difficulty: 'easy',
};

const theory5_3: TheoryChallenge = {
  id: 'func.3',
  type: 'theory',
  episode: 5,
  room: '5.3',
  title: 'Funções com parâmetros',
  description: 'Parâmetros são informações que você PASSA para a função. Como entregar ingredientes para uma receita.',
  content: `
**Parâmetro × argumento**
• **Parâmetro:** o nome que aparece na **definição** da função, como \`nome\` em \`function saudacao(nome)\`. É uma variável que só existe dentro da função.
• **Argumento:** o valor que você passa na **chamada**, como \`"Ana"\` em \`saudacao("Ana")\`.

**Exemplo (JavaScript)**
\`\`\`
function saudacao(nome) {
  return "Olá, " + nome + "!";
}
saudacao("Ana");      // devolve "Olá, Ana!"
saudacao("Carlos");   // devolve "Olá, Carlos!"
\`\`\`
O parâmetro \`nome\` muda a cada chamada: da primeira vez vale "Ana", da segunda "Carlos".

**Vários parâmetros**
Separe-os por vírgula: \`function identificar(nome, cargo)\`. A **ordem** importa: o primeiro argumento vai para o primeiro parâmetro, o segundo para o segundo. \`identificar("Ana", "Admin")\` e \`identificar("Admin", "Ana")\` dão resultados diferentes!

**Por que isso importa na segurança?**
Funções de verificação recebem dados como parâmetro:
• \`verificarSenha(senhaDigitada)\`
• \`analisarLog(linhaDeLog)\`
• \`detectarAtaque(requisicao)\`

Nas próximas salas você vai praticar!
  `,
};

const code5_4: CodeChallenge = {
  id: 'func.4',
  type: 'code',
  episode: 5,
  room: '5.4',
  title: 'Função com parâmetro',
  description: 'Crie uma função de saudação que recebe o nome de quem entrou no sistema.',
  instructions: 'Devolva "Olá, NOME!". Exemplo: saudacao("Hacker") devolve "Olá, Hacker!".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva "Olá, " + nome + "!"
function saudacao(nome) {
  // seu código aqui
}
`,
    python: `# Devolva "Olá, " + nome + "!"
def saudacao(nome):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'saudacao', python: 'saudacao' },
    cases: [
      { name: 'Hacker', args: ['Hacker'], expected: 'Olá, Hacker!' },
      { name: 'Admin', args: ['Admin'], expected: 'Olá, Admin!' },
      { name: 'nome vazio', args: [''], expected: 'Olá, !', hidden: true },
      { name: 'nome composto', args: ['Ana Maria'], expected: 'Olá, Ana Maria!', hidden: true },
    ],
  },
  solution: {
    javascript: `function saudacao(nome) {
  return "Olá, " + nome + "!";
}`,
    python: `def saudacao(nome):
    return "Olá, " + nome + "!"`,
  },
  explanation: `
**Juntando três partes**
"Olá, " + nome + "!" concatena o prefixo, o valor do parâmetro e o sufixo.

Uma mesma função atende qualquer nome: "Hacker", "Admin", "Ana Maria". É o poder de usar parâmetros.
  `,
  hints: [
    'Concatene: "Olá, " + nome + "!"',
    'Cuidado com a vírgula e o espaço depois dela',
    'return "Olá, " + nome + "!"',
  ],
  difficulty: 'easy',
};

const code5_5: CodeChallenge = {
  id: 'func.5',
  type: 'code',
  episode: 5,
  room: '5.5',
  title: 'Dois parâmetros',
  description: 'Funções podem receber **vários** parâmetros. Monte uma identificação com o nome e o cargo.',
  instructions: 'Devolva "NOME (CARGO)". Exemplo: identificar("Ana", "Admin") devolve "Ana (Admin)".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva nome + " (" + cargo + ")"
function identificar(nome, cargo) {
  // seu código aqui
}
`,
    python: `# Devolva nome + " (" + cargo + ")"
def identificar(nome, cargo):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'identificar', python: 'identificar' },
    cases: [
      { name: 'Ana Admin', args: ['Ana', 'Admin'], expected: 'Ana (Admin)' },
      { name: 'Carlos Analista', args: ['Carlos', 'Analista'], expected: 'Carlos (Analista)' },
      { name: 'cargo vazio', args: ['Bia', ''], expected: 'Bia ()', hidden: true },
      { name: 'ordem dos parâmetros importa', args: ['Admin', 'Ana'], expected: 'Admin (Ana)', hidden: true },
    ],
  },
  solution: {
    javascript: `function identificar(nome, cargo) {
  return nome + " (" + cargo + ")";
}`,
    python: `def identificar(nome, cargo):
    return nome + " (" + cargo + ")"`,
  },
  explanation: `
**Vários parâmetros**
Os parâmetros são separados por vírgula e a ORDEM importa: o primeiro valor da chamada vai para o primeiro parâmetro.

**Erro comum:** trocar a ordem ao chamar. identificar("Admin", "Ana") produz "Admin (Ana)", que está "certo" para o código, mas errado para o significado.
  `,
  hints: [
    'Junte com +: nome, um espaço, abre parênteses, cargo, fecha parênteses',
    'return nome + " (" + cargo + ")"',
    'Note o espaço antes do parêntese de abertura',
  ],
  difficulty: 'easy',
};

const theory5_6: TheoryChallenge = {
  id: 'func.6',
  type: 'theory',
  episode: 5,
  room: '5.6',
  title: 'Funções que retornam valores',
  description: 'O return é o coração de uma função: é ele que entrega o resultado para quem chamou.',
  content: `
**Função que só FAZ algo × função que DEVOLVE algo**
• Uma função que só **imprime** mostra o resultado na tela para uma pessoa, e o valor some.
• Uma função que usa **return** **devolve** o valor, e o programa pode guardá-lo e usá-lo depois.

\`\`\`
function dobro(numero) {
  return numero * 2;
}
const resultado = dobro(5);     // resultado guarda 10
const outro = dobro(resultado); // usa o resultado em outra conta: 20
\`\`\`

**O return encerra a função**
Assim que o \`return\` roda, a função termina. Qualquer código escrito depois dele, dentro da função, **não é executado**. Isso é útil para buscas: ao achar o item, você devolve na hora.

**E sem return?**
A função devolve "nada": \`undefined\` no JavaScript e \`None\` no Python. Quando um teste mostra "recebido undefined", quase sempre faltou o \`return\`.

**Por que return é importante?**
Em segurança, funções retornam resultados:
• \`verificarSenha("1234")\` → devolve **true** ou **false**
• \`decodificar("Khoor")\` → devolve **"Hello"**
• \`contarTentativas(logs)\` → devolve **um número**

O **return** permite guardar o resultado e usar depois!
  `,
};

const code5_7: CodeChallenge = {
  id: 'func.7',
  type: 'code',
  episode: 5,
  room: '5.7',
  title: 'Função com return',
  description: 'Funções podem fazer contas e **devolver** o resultado para quem chamou. Crie a função `dobro`.',
  instructions: 'Devolva o dobro do número. Exemplo: dobro(5) devolve 10.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva o dobro de n
function dobro(n) {
  // seu código aqui
}
`,
    python: `# Devolva o dobro de n
def dobro(n):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'dobro', python: 'dobro' },
    cases: [
      { name: 'dobro de 5', args: [5], expected: 10 },
      { name: 'dobro de 21', args: [21], expected: 42 },
      { name: 'zero', args: [0], expected: 0, hidden: true },
      { name: 'número negativo', args: [-3], expected: -6, hidden: true },
      { name: 'número decimal', args: [2.5], expected: 5, hidden: true },
    ],
  },
  solution: {
    javascript: `function dobro(n) {
  return n * 2;
}`,
    python: `def dobro(n):
    return n * 2`,
  },
  explanation: `
**return devolve o valor**
O valor devolvido pode ser guardado numa variável ou usado em outra conta: const resultado = dobro(5) guarda 10.

**Casos de borda:** zero, negativos e decimais também precisam funcionar. Uma boa função funciona para TODOS os valores válidos, não só para o exemplo.
  `,
  hints: [
    'Multiplique por 2: n * 2',
    'return n * 2',
    'Se aparecer "recebido undefined" (None), falta o return',
  ],
  difficulty: 'easy',
};

const ex5_par: CodeChallenge = {
  id: 'func.10',
  type: 'code',
  episode: 5,
  room: '5.8',
  title: 'Par ou ímpar?',
  description: 'O operador **%** (resto da divisão) revela se um número é par: **um número par dividido por 2 não deixa resto**. Devolva um valor verdadeiro/falso.',
  instructions: 'Devolva true se o número for par e false se for ímpar. Exemplo: ehPar(4) devolve true.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Um número é par quando n % 2 é igual a 0
function ehPar(n) {
  // seu código aqui
}
`,
    python: `# Um número é par quando n % 2 é igual a 0
def eh_par(n):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'ehPar', python: 'eh_par' },
    cases: [
      { name: 'par', args: [4], expected: true },
      { name: 'ímpar', args: [7], expected: false },
      { name: 'zero é par', args: [0], expected: true, hidden: true },
      { name: 'par negativo', args: [-4], expected: true, hidden: true },
      { name: 'ímpar negativo', args: [-3], expected: false, hidden: true },
      { name: 'um', args: [1], expected: false, hidden: true },
    ],
  },
  solution: {
    javascript: `function ehPar(n) {
  return n % 2 === 0;
}`,
    python: `def eh_par(n):
    return n % 2 == 0`,
  },
  explanation: `
**Resto da divisão**
n % 2 dá 0 para números pares e 1 (ou -1 no JavaScript, para negativos) para ímpares. Por isso comparamos com 0, e não com 1: assim funciona para negativos nas duas linguagens.

**Uma comparação já é um valor true/false**, então o return pode devolvê-la direto, sem if.
  `,
  hints: [
    'Calcule o resto da divisão por 2: n % 2',
    'Compare o resultado com 0',
    'return n % 2 === 0   (Python: return n % 2 == 0)',
  ],
  difficulty: 'easy',
};

const ex5_desconto: CodeChallenge = {
  id: 'func.11',
  type: 'code',
  episode: 5,
  room: '5.9',
  title: 'Calculando um desconto',
  description: 'Funções com **vários parâmetros** e uma conta. Um desconto de 20% em um preço de 50 é 50 × 20 / 100 = 10, e o preço final é 50 − 10 = 40.',
  instructions: 'Devolva o preço depois do desconto percentual. Exemplo: calcularDesconto(200, 10) devolve 180.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// preço final = preco - (preco * percentual / 100)
function calcularDesconto(preco, percentual) {
  // seu código aqui
}
`,
    python: `# preço final = preco - (preco * percentual / 100)
def calcular_desconto(preco, percentual):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'calcularDesconto', python: 'calcular_desconto' },
    cases: [
      { name: '10% de 200', args: [200, 10], expected: 180 },
      { name: '50% de 50', args: [50, 50], expected: 25 },
      { name: 'sem desconto', args: [100, 0], expected: 100, hidden: true },
      { name: 'desconto de 25%', args: [80, 25], expected: 60, hidden: true },
      { name: 'desconto total', args: [100, 100], expected: 0, hidden: true },
      { name: 'preço zero', args: [0, 10], expected: 0, hidden: true },
    ],
  },
  solution: {
    javascript: `function calcularDesconto(preco, percentual) {
  const desconto = preco * percentual / 100;
  return preco - desconto;
}`,
    python: `def calcular_desconto(preco, percentual):
    desconto = preco * percentual / 100
    return preco - desconto`,
  },
  explanation: `
**Passo a passo com variáveis**
Primeiro calcule o valor do desconto, depois subtraia do preço. Separar em passos deixa a conta mais fácil de ler e de conferir.

**A ordem dos parâmetros importa:** calcularDesconto(200, 10) e calcularDesconto(10, 200) dão resultados bem diferentes.
  `,
  hints: [
    'O desconto em dinheiro é preco * percentual / 100',
    'Guarde em uma variável e depois subtraia do preço',
    'return preco - desconto',
  ],
  difficulty: 'easy',
};

const ex5_quadruplo: CodeChallenge = {
  id: 'func.12',
  type: 'code',
  episode: 5,
  room: '5.10',
  title: 'Funções chamando funções',
  description: 'Uma função pode **chamar outra função**. A função `dobro` já está pronta no esqueleto. Crie `quadruplo` **usando** o `dobro`: o quádruplo é o dobro do dobro.',
  instructions: 'Devolva o quádruplo do número, chamando a função dobro duas vezes. Exemplo: quadruplo(3) devolve 12.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Esta função já está pronta:
function dobro(n) {
  return n * 2;
}

// Agora crie quadruplo USANDO dobro (o dobro do dobro)
function quadruplo(n) {
  // seu código aqui
}
`,
    python: `# Esta função já está pronta:
def dobro(n):
    return n * 2

# Agora crie quadruplo USANDO dobro (o dobro do dobro)
def quadruplo(n):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'quadruplo', python: 'quadruplo' },
    cases: [
      { name: 'quádruplo de 3', args: [3], expected: 12 },
      { name: 'quádruplo de 10', args: [10], expected: 40 },
      { name: 'zero', args: [0], expected: 0, hidden: true },
      { name: 'negativo', args: [-2], expected: -8, hidden: true },
      { name: 'decimal', args: [2.5], expected: 10, hidden: true },
    ],
  },
  solution: {
    javascript: `function dobro(n) {
  return n * 2;
}

function quadruplo(n) {
  return dobro(dobro(n));
}`,
    python: `def dobro(n):
    return n * 2

def quadruplo(n):
    return dobro(dobro(n))`,
  },
  explanation: `
**Compondo funções**
dobro(dobro(3)): primeiro roda o de dentro, dobro(3) = 6, e depois o de fora, dobro(6) = 12. Funções pequenas que se combinam são a base de programas grandes e fáceis de manter.

**Na segurança:** validadores reais são montados assim: uma função para o tamanho, outra para caracteres proibidos, e uma que chama as duas.
  `,
  hints: [
    'Chame a função dobro dentro de quadruplo',
    'O de dentro roda primeiro: dobro(n). Depois aplique dobro no resultado',
    'return dobro(dobro(n))',
  ],
  difficulty: 'medium',
};

const code5_8: CodeChallenge = {
  id: 'func.8',
  type: 'code',
  episode: 5,
  room: '5.11',
  title: 'Função de segurança — avaliar senha',
  description: 'Uma política de senhas exige **8 ou mais caracteres**. Crie uma função que avalia a senha e devolve o veredito.',
  instructions: 'Devolva "Senha forte" se tiver 8 ou mais caracteres, senão "Senha fraca".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// 8 ou mais caracteres -> "Senha forte"; senão "Senha fraca"
function avaliarSenha(senha) {
  // seu código aqui
}
`,
    python: `# 8 ou mais caracteres -> "Senha forte"; senão "Senha fraca"
def avaliar_senha(senha):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'avaliarSenha', python: 'avaliar_senha' },
    cases: [
      { name: 'senha curta', args: ['abc'], expected: 'Senha fraca' },
      { name: 'senha longa', args: ['senhaforte'], expected: 'Senha forte' },
      { name: '7 caracteres (limite)', args: ['1234567'], expected: 'Senha fraca', hidden: true },
      { name: '8 caracteres (limite)', args: ['12345678'], expected: 'Senha forte', hidden: true },
      { name: 'senha vazia', args: [''], expected: 'Senha fraca', hidden: true },
    ],
  },
  solution: {
    javascript: `function avaliarSenha(senha) {
  if (senha.length >= 8) {
    return "Senha forte";
  }
  return "Senha fraca";
}`,
    python: `def avaliar_senha(senha):
    if len(senha) >= 8:
        return "Senha forte"
    return "Senha fraca"`,
  },
  explanation: `
**Função + condição**
Combinar funções com if é o dia a dia de qualquer programador. A função esconde a regra de negócio e quem a usa só chama avaliarSenha(...).

**O limite:** exatamente 8 caracteres já é forte (>= 8). Uma regra de segurança errada por 1 (usar > em vez de >=) deixa passar senhas que deviam ser bloqueadas, ou o contrário.
  `,
  hints: [
    'Tamanho: senha.length (Python: len(senha))',
    'Use if com >= 8 para o caso forte',
    'Depois do if, devolva "Senha fraca"',
  ],
  difficulty: 'medium',
};

const ex5_fizz: CodeChallenge = {
  id: 'func.13',
  type: 'code',
  episode: 5,
  room: '5.12',
  title: 'FizzBuzz: um clássico das entrevistas',
  description: 'O FizzBuzz é um exercício famoso em entrevistas de emprego. Combina **decisões**, **resto da divisão** e **a ordem dos testes**.',
  instructions: 'Devolva "FizzBuzz" se n for múltiplo de 3 E de 5, "Fizz" se for múltiplo só de 3, "Buzz" se for múltiplo só de 5, e o próprio número nos outros casos.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// múltiplo de 15  -> "FizzBuzz"
// múltiplo de 3   -> "Fizz"
// múltiplo de 5   -> "Buzz"
// outros          -> o próprio número n
function fizzBuzz(n) {
  // seu código aqui
}
`,
    python: `# múltiplo de 15  -> "FizzBuzz"
# múltiplo de 3   -> "Fizz"
# múltiplo de 5   -> "Buzz"
# outros          -> o próprio número n
def fizz_buzz(n):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'fizzBuzz', python: 'fizz_buzz' },
    cases: [
      { name: 'múltiplo de 3', args: [9], expected: 'Fizz' },
      { name: 'múltiplo de 5', args: [10], expected: 'Buzz' },
      { name: 'múltiplo de 3 e 5', args: [15], expected: 'FizzBuzz' },
      { name: 'nenhum dos dois', args: [7], expected: 7 },
      { name: 'número 1', args: [1], expected: 1, hidden: true },
      { name: 'trinta', args: [30], expected: 'FizzBuzz', hidden: true },
      { name: 'múltiplo de 3 pequeno', args: [3], expected: 'Fizz', hidden: true },
      { name: 'múltiplo de 5 pequeno', args: [5], expected: 'Buzz', hidden: true },
      { name: 'zero é múltiplo de todos', args: [0], expected: 'FizzBuzz', hidden: true },
    ],
  },
  solution: {
    javascript: `function fizzBuzz(n) {
  if (n % 15 === 0) {
    return "FizzBuzz";
  } else if (n % 3 === 0) {
    return "Fizz";
  } else if (n % 5 === 0) {
    return "Buzz";
  }
  return n;
}`,
    python: `def fizz_buzz(n):
    if n % 15 == 0:
        return "FizzBuzz"
    elif n % 3 == 0:
        return "Fizz"
    elif n % 5 == 0:
        return "Buzz"
    return n`,
  },
  explanation: `
**A ordem é tudo**
Se você testasse "múltiplo de 3" primeiro, o 15 responderia "Fizz" e nunca chegaria ao "FizzBuzz". O caso mais específico (múltiplo de 15) precisa vir primeiro.

**Múltiplo de 3 e de 5 = múltiplo de 15.** Também dava para testar as duas condições com E (&& / and).
  `,
  hints: [
    'Comece pelo caso mais específico: n % 15 === 0',
    'Depois use else if para n % 3 e n % 5',
    'No fim, devolva o próprio n',
  ],
  difficulty: 'medium',
};

const theory5_9: TheoryChallenge = {
  id: 'func.9',
  type: 'theory',
  episode: 5,
  room: '5.13',
  title: 'Parabéns! Você domina funções!',
  description: 'Agora você sabe criar blocos de código reutilizáveis — uma habilidade profissional.',
  content: `
**O que você aprendeu:**
• Criar funções (function / def)
• Chamar funções
• Passar parâmetros
• Retornar valores com return
• Função real de verificação de senha

**Como funções são usadas em cibersegurança:**
• \`function decodificarCesar(texto, deslocamento)\` → decodifica mensagens
• \`function verificarHash(senha, hash)\` → confere se a senha bate
• \`function detectarXSS(input)\` → verifica se há ataque
• \`function analisarLog(linha)\` → extrai informações de segurança

A partir de agora, TODO código de cibersegurança vai usar funções.

**Próximo episódio:**
Vamos aprender **objetos e JSON** — a forma como dados são organizados na internet. APIs, tokens JWT e logs usam esse formato!
  `,
};

export const functionsChallenges: Challenge[] = [
  theory5_0,
  code5_1,
  code5_2,
  theory5_3,
  code5_4,
  code5_5,
  theory5_6,
  code5_7,
  ex5_par,
  ex5_desconto,
  ex5_quadruplo,
  code5_8,
  ex5_fizz,
  theory5_9,
];
