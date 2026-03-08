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
  title: 'Chamando uma função',
  description: 'A função **saudacao** já está criada. Você só precisa **executar** para vê-la em ação.',
  instructions: 'Execute o código para ver a função funcionando.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function saudacao() {
  console.log("Bem-vindo ao sistema!");
}

// Chamando a função:
saudacao();
`,
    python: `def saudacao():
    print("Bem-vindo ao sistema!")

# Chamando a função:
saudacao()
`,
  },
  expectedOutput: 'Bem-vindo ao sistema!',
  hints: [
    'O código já está pronto! Execute.',
    'A função é criada nas primeiras linhas e chamada na última',
  ],
  difficulty: 'easy',
};

const code5_2: CodeChallenge = {
  id: 'func.2',
  type: 'code',
  episode: 5,
  room: '5.2',
  title: 'Criando sua função',
  description: 'Crie uma função chamada **alerta** que imprime **"Intruso detectado!"**. Depois chame ela. O código já está quase pronto!',
  instructions: 'Complete a mensagem da função com "Intruso detectado!"',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Complete a função:
function alerta() {
  console.log("Intruso detectado!");
}

// Chame a função:
alerta();
`,
    python: `# Complete a função:
def alerta():
    print("Intruso detectado!")

# Chame a função:
alerta()
`,
  },
  expectedOutput: 'Intruso detectado!',
  hints: [
    'O código já está completo — execute!',
    'A função "alerta" imprime a mensagem quando é chamada',
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
  description: 'A função **saudacao** recebe um **nome** e imprime uma mensagem personalizada. **Execute** para ver!',
  instructions: 'Execute e veja a saudação personalizada.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function saudacao(nome) {
  console.log("Olá, " + nome + "!");
}

saudacao("Hacker");
`,
    python: `def saudacao(nome):
    print("Olá, " + nome + "!")

saudacao("Hacker")
`,
  },
  expectedOutput: 'Olá, Hacker!',
  hints: [
    'O código já está pronto! Execute.',
    'O parâmetro "nome" recebe o valor "Hacker"',
  ],
  difficulty: 'easy',
};

const code5_5: CodeChallenge = {
  id: 'func.5',
  type: 'code',
  episode: 5,
  room: '5.5',
  title: 'Sua vez — mude o parâmetro',
  description: 'Mude a chamada da função para passar o nome **"Admin"** em vez de "Hacker".',
  instructions: 'Troque "Hacker" por "Admin" na chamada da função.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function saudacao(nome) {
  console.log("Olá, " + nome + "!");
}

// Mude "Hacker" para "Admin":
saudacao("Hacker");
`,
    python: `def saudacao(nome):
    print("Olá, " + nome + "!")

# Mude "Hacker" para "Admin":
saudacao("Hacker")
`,
  },
  expectedOutput: 'Olá, Admin!',
  hints: [
    'Mude saudacao("Hacker") para saudacao("Admin")',
    'Mantenha as aspas!',
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
  description: 'A função **dobro** retorna o dobro de um número. O resultado é guardado em uma variável. **Execute**!',
  instructions: 'Execute e veja o return funcionando.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function dobro(numero) {
  return numero * 2;
}

const resultado = dobro(5);
console.log(resultado);
`,
    python: `def dobro(numero):
    return numero * 2

resultado = dobro(5)
print(resultado)
`,
  },
  expectedOutput: '10',
  hints: [
    'O código já está pronto! Execute.',
    'dobro(5) retorna 5 * 2 = 10',
  ],
  difficulty: 'easy',
};

const code5_8: CodeChallenge = {
  id: 'func.8',
  type: 'code',
  episode: 5,
  room: '5.8',
  title: 'Função de segurança — verificar senha',
  description: 'Agora vamos criar algo REAL! Uma função que verifica se a senha é forte (8+ caracteres). **Execute** para ver!',
  instructions: 'Execute e veja a verificação de senha.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function senhaForte(senha) {
  if (senha.length >= 8) {
    return "Senha forte";
  } else {
    return "Senha fraca";
  }
}

console.log(senhaForte("admin"));
console.log(senhaForte("s3nh4segur4"));
`,
    python: `def senha_forte(senha):
    if len(senha) >= 8:
        return "Senha forte"
    else:
        return "Senha fraca"

print(senha_forte("admin"))
print(senha_forte("s3nh4segur4"))
`,
  },
  expectedOutput: 'Senha fraca\nSenha forte',
  hints: [
    'O código já está pronto! Execute.',
    '"admin" tem 5 letras → fraca. "s3nh4segur4" tem 11 → forte',
  ],
  difficulty: 'easy',
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
