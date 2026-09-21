import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory5_0: TheoryChallenge = {
  id: 'func.0',
  type: 'theory',
  episode: 5,
  room: '5.0',
  title: 'Episódio 5 — Funções: organizando seu código',
  description: 'Funções são blocos de código reutilizáveis. Em vez de repetir o mesmo código, você cria uma função e chama quando precisar!',
  content: `
**O que é uma função?**
É como uma "receita" que você cria uma vez e usa quantas vezes quiser.

**Exemplo do dia a dia:**
Imagine que você precisa verificar senhas em 10 lugares diferentes do sistema.
Sem função: copiar e colar o mesmo código 10 vezes.
Com função: criar uma vez e chamar 10 vezes.

**Como criar uma função:**
• **JavaScript:**
\`\`\`
function saudacao() {
  console.log("Olá!");
}
\`\`\`

• **Python:**
\`\`\`
def saudacao():
    print("Olá!")
\`\`\`

**Como chamar (usar) uma função:**
Basta escrever o nome com parênteses: \`saudacao()\`

Na próxima sala vamos ver isso na prática!
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
**Sem parâmetro:**
\`\`\`
function saudacao() {
  console.log("Olá!");
}
saudacao(); // sempre mostra "Olá!"
\`\`\`

**Com parâmetro:**
\`\`\`
function saudacao(nome) {
  console.log("Olá, " + nome + "!");
}
saudacao("Ana");  // mostra "Olá, Ana!"
saudacao("Carlos"); // mostra "Olá, Carlos!"
\`\`\`

O **parâmetro** \`nome\` é como uma variável que muda a cada chamada.

**Por que isso importa na segurança?**
Funções de verificação recebem dados como parâmetro:
• \`verificarSenha(senhaDigitada)\`
• \`analisarLog(linhaDeLog)\`
• \`detectarAtaque(requisicao)\`

Na próxima sala vamos praticar!
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
  description: 'Funções podem devolver (retornar) um resultado usando **return**.',
  content: `
**Sem return** — a função só FAZ algo (imprime):
\`\`\`
function saudacao() {
  console.log("Olá!");
}
\`\`\`

**Com return** — a função DEVOLVE um valor:
\`\`\`
function dobro(numero) {
  return numero * 2;
}
const resultado = dobro(5); // resultado = 10
\`\`\`

**Por que return é importante?**
Em segurança, funções retornam resultados:
• \`verificarSenha("1234")\` → retorna **true** ou **false**
• \`decodificar("Khoor")\` → retorna **"Hello"**
• \`contarTentativas(logs)\` → retorna **um número**

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

const code5_8: CodeChallenge = {
  id: 'func.8',
  type: 'code',
  episode: 5,
  room: '5.8',
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

const theory5_9: TheoryChallenge = {
  id: 'func.9',
  type: 'theory',
  episode: 5,
  room: '5.9',
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
  code5_8,
  theory5_9,
];
