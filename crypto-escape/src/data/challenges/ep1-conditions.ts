import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory1_0: TheoryChallenge = {
  id: 'cond.0',
  type: 'theory',
  episode: 1,
  room: '1.0',
  title: 'Episódio 1 — Comparações e Decisões',
  description: 'Neste episódio você vai fazer o computador tomar decisões. Também vai aprender a escrever funções, que é como programadores organizam o código de verdade.',
  content: `
**Por que decisões importam?**
Todo sistema de segurança precisa decidir:
• A senha está correta? → Permite acesso
• A senha está errada? → Bloqueia acesso

**Comparações**
Uma comparação devolve **verdadeiro** (true / True) ou **falso** (false / False):
• \`==\` → "é igual a?"   (no JavaScript, prefira \`===\`, que também compara o tipo)
• \`!=\` → "é diferente de?"
• \`>\` e \`<\` → maior e menor
• \`>=\` e \`<=\` → maior ou igual, menor ou igual

**Funções: como você vai resolver os desafios**
Uma função é um bloco de código com nome. Ela **recebe entradas** (parâmetros) e **devolve uma saída** com \`return\`.

• **JavaScript:** \`function dobro(n) { return n * 2; }\`
• **Python:** \`def dobro(n): return n * 2\`

Nos desafios, você escreve a função e o sistema a testa com vários casos, inclusive **casos ocultos**. Assim você aprende a pensar em todas as situações, como um dev de verdade.

**Atenção:** a função precisa **devolver** o resultado com \`return\`. Só imprimir na tela (\`console.log\`/\`print\`) não conta.
  `,
};

const code1_1: CodeChallenge = {
  id: 'cond.1',
  type: 'code',
  episode: 1,
  room: '1.1',
  title: 'Comparando valores',
  description: 'Escreva sua primeira função. Ela recebe dois valores e diz se são **iguais**. O resultado de uma comparação já é true/false, então basta devolvê-lo.',
  instructions: 'Complete a função para devolver true se a e b forem iguais e false se forem diferentes.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva true se a e b forem iguais, senão false.
function saoIguais(a, b) {
  // seu código aqui
}
`,
    python: `# Devolva True se a e b forem iguais, senão False.
def sao_iguais(a, b):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'saoIguais', python: 'sao_iguais' },
    cases: [
      { name: 'números iguais', args: [10, 10], expected: true },
      { name: 'números diferentes', args: [10, 5], expected: false },
      { name: 'textos iguais', args: ['abc', 'abc'], expected: true },
      { name: 'textos diferentes', args: ['abc', 'abd'], expected: false },
      { name: 'zero', args: [0, 0], expected: true, hidden: true },
      { name: 'textos vazios', args: ['', ''], expected: true, hidden: true },
      { name: 'maiúscula é diferente de minúscula', args: ['A', 'a'], expected: false, hidden: true },
    ],
  },
  solution: {
    javascript: `function saoIguais(a, b) {
  return a === b;
}`,
    python: `def sao_iguais(a, b):
    return a == b`,
  },
  explanation: `
**O que aconteceu aqui?**
Uma comparação (a === b / a == b) já é uma expressão que vale true ou false. Por isso você pode devolvê-la direto com return, sem precisar de if.

**Detalhe importante:** "A" e "a" são diferentes. Comparações de texto diferenciam maiúsculas de minúsculas. Em segurança isso importa: senhas são sensíveis a maiúsculas.

**Erro comum:** usar console.log/print em vez de return. A função precisa devolver o valor para quem a chamou.
  `,
  hints: [
    'Dentro da função, use return para devolver o resultado da comparação',
    'JavaScript: return a === b;   Python: return a == b',
    'Se aparecer "recebido undefined" (ou None), você esqueceu o return',
  ],
  difficulty: 'easy',
};

const code1_2: CodeChallenge = {
  id: 'cond.2',
  type: 'code',
  episode: 1,
  room: '1.2',
  title: 'Maior ou igual: os limites',
  description: 'Comparar números tem uma armadilha clássica: o **limite**. Quem tem exatamente 18 anos já é maior de idade?',
  instructions: 'Devolva true se a idade for 18 ou mais, e false se for menor.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva true se idade for 18 ou mais, senão false.
function ehMaiorDeIdade(idade) {
  // seu código aqui
}
`,
    python: `# Devolva True se idade for 18 ou mais, senão False.
def eh_maior_de_idade(idade):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'ehMaiorDeIdade', python: 'eh_maior_de_idade' },
    cases: [
      { name: 'adulto', args: [20], expected: true },
      { name: 'criança', args: [10], expected: false },
      { name: 'exatamente 18 (limite)', args: [18], expected: true, hidden: true },
      { name: '17 (logo abaixo do limite)', args: [17], expected: false, hidden: true },
      { name: 'zero', args: [0], expected: false, hidden: true },
      { name: 'idade alta', args: [100], expected: true, hidden: true },
    ],
  },
  solution: {
    javascript: `function ehMaiorDeIdade(idade) {
  return idade >= 18;
}`,
    python: `def eh_maior_de_idade(idade):
    return idade >= 18`,
  },
  explanation: `
**A armadilha do limite**
Usar > 18 faria quem tem exatamente 18 anos ser tratado como menor. Esse tipo de erro ("off-by-one") é uma das causas mais comuns de bugs e de falhas de segurança: uma regra de acesso que erra por um número.

**Regra de ouro:** sempre teste o valor do limite e os vizinhos (17, 18, 19). É por isso que existem testes ocultos aqui.
  `,
  hints: [
    'Use >= (maior ou igual) em vez de >',
    'return idade >= 18',
    'Quem tem exatamente 18 anos precisa dar true',
  ],
  difficulty: 'easy',
};

const theory1_3: TheoryChallenge = {
  id: 'cond.3',
  type: 'theory',
  episode: 1,
  room: '1.3',
  title: 'if, else e combinando condições',
  description: 'Agora que sabemos comparar, vamos fazer o código escolher entre caminhos diferentes.',
  content: `
**if / else if / else**
• **if** = "se" → roda se a condição for verdadeira
• **else if** (Python: **elif**) = "senão, se" → testa outra condição
• **else** = "senão" → roda quando nenhuma condição anterior foi verdadeira

**JavaScript**
\`\`\`
if (nota >= 7) {
  return "Aprovado";
} else if (nota >= 5) {
  return "Recuperação";
} else {
  return "Reprovado";
}
\`\`\`

**Python**
\`\`\`
if nota >= 7:
    return "Aprovado"
elif nota >= 5:
    return "Recuperação"
else:
    return "Reprovado"
\`\`\`

**A ordem importa!** O computador testa de cima para baixo e para no primeiro caminho verdadeiro.

**Combinando condições**
• **E:** \`&&\` (JavaScript) / \`and\` (Python): as duas precisam ser verdadeiras
• **OU:** \`||\` (JavaScript) / \`or\` (Python): basta uma ser verdadeira
• **NÃO:** \`!\` (JavaScript) / \`not\` (Python): inverte

**Exemplo em segurança:** um login só deve entrar se o usuário **E** a senha estiverem certos.
  `,
};

const code1_4: CodeChallenge = {
  id: 'cond.4',
  type: 'code',
  episode: 1,
  room: '1.4',
  title: 'Verificando uma senha',
  description: 'A base de todo login: comparar o que a pessoa digitou com a senha correta e decidir se libera o acesso.',
  instructions: 'Devolva "Acesso permitido" se as senhas forem idênticas, senão "Acesso negado".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva "Acesso permitido" ou "Acesso negado".
function verificarSenha(senhaDigitada, senhaCorreta) {
  // seu código aqui
}
`,
    python: `# Devolva "Acesso permitido" ou "Acesso negado".
def verificar_senha(senha_digitada, senha_correta):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'verificarSenha', python: 'verificar_senha' },
    cases: [
      { name: 'senha certa', args: ['1234', '1234'], expected: 'Acesso permitido' },
      { name: 'senha errada', args: ['0000', '1234'], expected: 'Acesso negado' },
      { name: 'senha vazia', args: ['', '1234'], expected: 'Acesso negado', hidden: true },
      { name: 'espaço sobrando no fim', args: ['1234 ', '1234'], expected: 'Acesso negado', hidden: true },
      { name: 'maiúsculas diferentes', args: ['ABC', 'abc'], expected: 'Acesso negado', hidden: true },
      { name: 'outra senha certa', args: ['s3nh4', 's3nh4'], expected: 'Acesso permitido', hidden: true },
    ],
  },
  solution: {
    javascript: `function verificarSenha(senhaDigitada, senhaCorreta) {
  if (senhaDigitada === senhaCorreta) {
    return "Acesso permitido";
  } else {
    return "Acesso negado";
  }
}`,
    python: `def verificar_senha(senha_digitada, senha_correta):
    if senha_digitada == senha_correta:
        return "Acesso permitido"
    else:
        return "Acesso negado"`,
  },
  explanation: `
**Como funciona**
A função compara as duas senhas. Se forem idênticas → permitido. Em qualquer outro caso → negado.

**Detalhes de segurança**
• Um espaço sobrando ("1234 ") é uma senha diferente. Comparações de texto são exatas.
• Senhas diferenciam maiúsculas e minúsculas.
• Em sistemas reais, a senha nunca é guardada em texto puro: guarda-se um hash (você verá isso mais adiante no curso).
  `,
  hints: [
    'Compare senhaDigitada com senhaCorreta dentro de um if',
    'if (senhaDigitada === senhaCorreta) { return "Acesso permitido"; } else { ... }',
    'Python: if senha_digitada == senha_correta:  (não esqueça os dois pontos e a indentação)',
  ],
  difficulty: 'easy',
};

const code1_5: CodeChallenge = {
  id: 'cond.5',
  type: 'code',
  episode: 1,
  room: '1.5',
  title: 'Força da senha',
  description: 'Sites avaliam a força da sua senha. Vamos fazer o mesmo, pelo tamanho: menos de 6 caracteres é **Fraca**, de 6 a 9 é **Média**, 10 ou mais é **Forte**.',
  instructions: 'Devolva "Fraca", "Média" ou "Forte" conforme o tamanho da senha. Cuidado com os limites!',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Use senha.length para o tamanho do texto.
// Devolva "Fraca", "Média" ou "Forte".
function classificarSenha(senha) {
  // seu código aqui
}
`,
    python: `# Use len(senha) para o tamanho do texto.
# Devolva "Fraca", "Média" ou "Forte".
def classificar_senha(senha):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'classificarSenha', python: 'classificar_senha' },
    cases: [
      { name: 'senha curta', args: ['abc'], expected: 'Fraca' },
      { name: 'senha média', args: ['segredo'], expected: 'Média' },
      { name: 'senha longa', args: ['senha12345'], expected: 'Forte' },
      { name: 'vazia', args: [''], expected: 'Fraca', hidden: true },
      { name: '5 caracteres (limite da fraca)', args: ['12345'], expected: 'Fraca', hidden: true },
      { name: '6 caracteres (início da média)', args: ['123456'], expected: 'Média', hidden: true },
      { name: '9 caracteres (fim da média)', args: ['123456789'], expected: 'Média', hidden: true },
      { name: '10 caracteres (início da forte)', args: ['1234567890'], expected: 'Forte', hidden: true },
    ],
  },
  solution: {
    javascript: `function classificarSenha(senha) {
  if (senha.length < 6) {
    return "Fraca";
  } else if (senha.length < 10) {
    return "Média";
  } else {
    return "Forte";
  }
}`,
    python: `def classificar_senha(senha):
    if len(senha) < 6:
        return "Fraca"
    elif len(senha) < 10:
        return "Média"
    else:
        return "Forte"`,
  },
  explanation: `
**Encadeando decisões**
Usamos if / else if / else (Python: if / elif / else). O computador testa de cima para baixo e para no primeiro caminho verdadeiro. Por isso a ordem dos testes importa.

**Limites de novo**
Os testes ocultos verificam 5, 6, 9 e 10 caracteres, exatamente onde a categoria muda. Sempre teste os limites!

**Na vida real**
Tamanho é só um critério. Um verificador profissional também considera se a senha aparece em listas de senhas vazadas, o que na prática importa mais do que exigir símbolos.
  `,
  hints: [
    'Tamanho do texto: senha.length (JavaScript) ou len(senha) (Python)',
    'Primeiro teste se é menor que 6, depois se é menor que 10, senão é Forte',
    'Como o primeiro teste já eliminou os menores que 6, o segundo só precisa checar < 10',
  ],
  difficulty: 'medium',
};

const code1_6: CodeChallenge = {
  id: 'cond.6',
  type: 'code',
  episode: 1,
  room: '1.6',
  title: 'Login com bloqueio de conta',
  description: 'Desafio final do episódio! Um login de verdade combina **usuário E senha** e ainda **bloqueia a conta** depois de muitas tentativas erradas, defesa clássica contra ataques de força bruta.',
  instructions: 'Regras: com 3 ou mais tentativas → "Conta bloqueada". Senão, usuário "admin" E senha "S3nh4!" → "Acesso permitido". Qualquer outro caso → "Acesso negado".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Regras (nesta ordem de prioridade):
// 1) tentativas >= 3                          -> "Conta bloqueada"
// 2) usuario === "admin" E senha === "S3nh4!" -> "Acesso permitido"
// 3) qualquer outro caso                      -> "Acesso negado"
function autenticar(usuario, senha, tentativas) {
  // seu código aqui
}
`,
    python: `# Regras (nesta ordem de prioridade):
# 1) tentativas >= 3                          -> "Conta bloqueada"
# 2) usuario == "admin" E senha == "S3nh4!"   -> "Acesso permitido"
# 3) qualquer outro caso                      -> "Acesso negado"
def autenticar(usuario, senha, tentativas):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'autenticar', python: 'autenticar' },
    cases: [
      { name: 'login correto', args: ['admin', 'S3nh4!', 0], expected: 'Acesso permitido' },
      { name: 'senha errada', args: ['admin', 'errada', 1], expected: 'Acesso negado' },
      { name: 'conta bloqueada', args: ['admin', 'S3nh4!', 3], expected: 'Conta bloqueada' },
      { name: 'usuário errado', args: ['root', 'S3nh4!', 0], expected: 'Acesso negado', hidden: true },
      { name: 'senha com maiúscula diferente', args: ['admin', 's3nh4!', 0], expected: 'Acesso negado', hidden: true },
      { name: 'ainda dentro do limite (2 tentativas)', args: ['admin', 'S3nh4!', 2], expected: 'Acesso permitido', hidden: true },
      { name: 'bloqueia até com dados errados', args: ['hacker', 'x', 5], expected: 'Conta bloqueada', hidden: true },
      { name: 'bloqueio vale mesmo com a senha certa', args: ['admin', 'S3nh4!', 10], expected: 'Conta bloqueada', hidden: true },
    ],
  },
  solution: {
    javascript: `function autenticar(usuario, senha, tentativas) {
  if (tentativas >= 3) {
    return "Conta bloqueada";
  }
  if (usuario === "admin" && senha === "S3nh4!") {
    return "Acesso permitido";
  }
  return "Acesso negado";
}`,
    python: `def autenticar(usuario, senha, tentativas):
    if tentativas >= 3:
        return "Conta bloqueada"
    if usuario == "admin" and senha == "S3nh4!":
        return "Acesso permitido"
    return "Acesso negado"`,
  },
  explanation: `
**A ordem das regras é a lógica de segurança**
O bloqueio precisa ser testado ANTES da senha. Se você conferisse a senha primeiro, um atacante que acertasse na décima tentativa entraria, e o bloqueio não serviria para nada.

**Combinando condições**
usuario === "admin" && senha === "S3nh4!" só é verdadeiro quando as duas partes forem verdadeiras.

**Na vida real**
Bloqueio de conta e limite de tentativas (rate limiting) são defesas básicas contra força bruta. Você vai atacar e defender esse tipo de sistema nos próximos episódios.
  `,
  hints: [
    'Comece pelo bloqueio: if (tentativas >= 3) { return "Conta bloqueada"; }',
    'Depois use E: if (usuario === "admin" && senha === "S3nh4!")  (Python: and)',
    'O que sobrar é "Acesso negado". A ordem das regras muda o resultado!',
  ],
  difficulty: 'medium',
};

const theory1_7: TheoryChallenge = {
  id: 'cond.7',
  type: 'theory',
  episode: 1,
  room: '1.7',
  title: 'Parabéns! Você domina decisões',
  description: 'Você escreveu funções, tratou casos de borda e montou a lógica de um login seguro.',
  content: `
**O que você aprendeu**
• Comparações: \`==\`/\`===\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`
• Funções com parâmetros e \`return\`
• if / else if / else, e combinar condições com E, OU, NÃO
• Casos de borda: limites, vazio, maiúsculas e a ordem das regras

**Como isso aparece na segurança**
• Firewalls: "se o tráfego é suspeito → bloqueia"
• Login: usuário E senha, com bloqueio após tentativas erradas
• Muitas vulnerabilidades nascem de uma condição errada por um único valor (>= virando >)

**Hábito de profissional**
Antes de dizer "está pronto", pergunte: e se for zero? vazio? o valor exato do limite? Foi o que os testes ocultos treinaram.

**Próximo episódio**
Loops: como repetir ações. É assim que um atacante testa milhares de senhas e que um defensor analisa milhares de logs.
  `,
};

export const conditionsChallenges: Challenge[] = [
  theory1_0,
  code1_1,
  code1_2,
  theory1_3,
  code1_4,
  code1_5,
  code1_6,
  theory1_7,
];
