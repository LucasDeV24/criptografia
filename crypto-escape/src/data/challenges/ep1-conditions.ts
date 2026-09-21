import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory1_0: TheoryChallenge = {
  id: 'cond.0',
  type: 'theory',
  episode: 1,
  room: '1.0',
  title: 'Episódio 1 — Comparações e Decisões',
  description: 'Neste episódio você vai fazer o computador tomar decisões: comparar valores e escolher o que fazer.',
  content: `
**Por que decisões importam?**
Todo sistema de segurança precisa decidir:
• A senha está correta? → Permite acesso
• A senha está errada? → Bloqueia acesso

**Comparações**
Uma comparação devolve **verdadeiro** (\`true\` / \`True\`) ou **falso** (\`false\` / \`False\`):
• \`==\` → "é igual a?"   (no JavaScript, prefira \`===\`, que também compara o tipo)
• \`!=\` → "é diferente de?"
• \`>\` e \`<\` → maior e menor
• \`>=\` e \`<=\` → maior ou igual, menor ou igual

Cuidado: um \`=\` sozinho **guarda** um valor em uma variável. Para **comparar**, use dois (\`==\`) ou três (\`===\`).

**Lembrete: os desafios são funções**
Como você viu no Episódio 0, cada desafio pede que você complete uma **função**: um bloco com nome (\`function\` no JavaScript, \`def\` no Python), que recebe **parâmetros** e devolve um resultado com \`return\`. O sistema chama a sua função com vários valores, inclusive **casos ocultos**.

Se precisar rever a anatomia de uma função, volte à sala **0.9 — Funções: a receita do programador**.

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

const ex1_sinal: CodeChallenge = {
  id: 'cond.9',
  type: 'code',
  episode: 1,
  room: '1.5',
  title: 'Positivo, negativo ou zero',
  description: 'Com **if / else if / else** você pode escolher entre **três** caminhos. Classifique um número.',
  instructions: 'Devolva "positivo", "negativo" ou "zero". Exemplo: sinalDoNumero(-3) devolve "negativo".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva "positivo", "negativo" ou "zero"
function sinalDoNumero(n) {
  // seu código aqui
}
`,
    python: `# Devolva "positivo", "negativo" ou "zero"
def sinal_do_numero(n):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'sinalDoNumero', python: 'sinal_do_numero' },
    cases: [
      { name: 'positivo', args: [7], expected: 'positivo' },
      { name: 'negativo', args: [-3], expected: 'negativo' },
      { name: 'zero', args: [0], expected: 'zero', hidden: true },
      { name: 'positivo pequeno', args: [1], expected: 'positivo', hidden: true },
      { name: 'negativo pequeno', args: [-1], expected: 'negativo', hidden: true },
      { name: 'decimal positivo', args: [0.5], expected: 'positivo', hidden: true },
    ],
  },
  solution: {
    javascript: `function sinalDoNumero(n) {
  if (n > 0) {
    return "positivo";
  } else if (n < 0) {
    return "negativo";
  } else {
    return "zero";
  }
}`,
    python: `def sinal_do_numero(n):
    if n > 0:
        return "positivo"
    elif n < 0:
        return "negativo"
    else:
        return "zero"`,
  },
  explanation: `
**Três caminhos**
O primeiro if trata o positivo, o else if trata o negativo e o else fica com o que sobrou: só pode ser zero.

**Cuidado com o zero:** ele não é positivo nem negativo. Um teste com >= 0 no lugar de > 0 o classificaria errado.
  `,
  hints: [
    'Use if para n > 0, else if para n < 0 e else para o resto',
    'Cada caminho tem o seu return',
    'No Python: if, elif e else, todos terminando com dois pontos',
  ],
  difficulty: 'easy',
};

const ex1_nota: CodeChallenge = {
  id: 'cond.10',
  type: 'code',
  episode: 1,
  room: '1.6',
  title: 'Classificando notas',
  description: 'Uma escala de notas tem **vários limites**. A **ordem** dos testes importa: o computador para no primeiro que for verdadeiro.',
  instructions: 'Devolva "A" (90 ou mais), "B" (80 a 89), "C" (70 a 79), "D" (60 a 69) ou "F" (menos de 60).',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// A: >= 90 | B: >= 80 | C: >= 70 | D: >= 60 | F: abaixo de 60
function classificarNota(nota) {
  // seu código aqui
}
`,
    python: `# A: >= 90 | B: >= 80 | C: >= 70 | D: >= 60 | F: abaixo de 60
def classificar_nota(nota):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'classificarNota', python: 'classificar_nota' },
    cases: [
      { name: 'nota alta', args: [95], expected: 'A' },
      { name: 'nota média', args: [75], expected: 'C' },
      { name: 'nota baixa', args: [30], expected: 'F' },
      { name: 'limite do A', args: [90], expected: 'A', hidden: true },
      { name: 'logo abaixo do A', args: [89], expected: 'B', hidden: true },
      { name: 'limite do D', args: [60], expected: 'D', hidden: true },
      { name: 'logo abaixo do D', args: [59], expected: 'F', hidden: true },
      { name: 'zero', args: [0], expected: 'F', hidden: true },
      { name: 'cem', args: [100], expected: 'A', hidden: true },
    ],
  },
  solution: {
    javascript: `function classificarNota(nota) {
  if (nota >= 90) {
    return "A";
  } else if (nota >= 80) {
    return "B";
  } else if (nota >= 70) {
    return "C";
  } else if (nota >= 60) {
    return "D";
  }
  return "F";
}`,
    python: `def classificar_nota(nota):
    if nota >= 90:
        return "A"
    elif nota >= 80:
        return "B"
    elif nota >= 70:
        return "C"
    elif nota >= 60:
        return "D"
    return "F"`,
  },
  explanation: `
**Do maior para o menor**
Se você começasse por nota >= 60, um 95 cairia no "D" e nunca chegaria ao "A". Testando do maior limite para o menor, cada teste só precisa do limite de baixo.

**Limites de novo:** 90 já é "A" (>=) e 89 é "B". Os testes ocultos conferem cada fronteira.
  `,
  hints: [
    'Comece pelo teste mais alto: nota >= 90',
    'Depois use else if para 80, 70 e 60, nessa ordem',
    'O return "F" fica no fim, para tudo que sobrou',
  ],
  difficulty: 'medium',
};

const ex1_entrar: CodeChallenge = {
  id: 'cond.11',
  type: 'code',
  episode: 1,
  room: '1.7',
  title: 'Controle de acesso: idade e convite',
  description: 'Combine **duas condições**. Uma casa noturna só deixa entrar quem tem 18 anos ou mais **e** tem convite. O segundo parâmetro é um valor verdadeiro/falso (`true`/`false` no JS, `True`/`False` no Python).',
  instructions: 'Devolva "Entrada liberada" (maior de idade E com convite), "Precisa de convite" (maior de idade sem convite) ou "Menor de idade".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// idade >= 18 E temConvite   -> "Entrada liberada"
// idade >= 18 mas sem convite -> "Precisa de convite"
// menor de 18                 -> "Menor de idade"
function podeEntrar(idade, temConvite) {
  // seu código aqui
}
`,
    python: `# idade >= 18 E tem_convite   -> "Entrada liberada"
# idade >= 18 mas sem convite -> "Precisa de convite"
# menor de 18                 -> "Menor de idade"
def pode_entrar(idade, tem_convite):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'podeEntrar', python: 'pode_entrar' },
    cases: [
      { name: 'maior com convite', args: [20, true], expected: 'Entrada liberada' },
      { name: 'maior sem convite', args: [25, false], expected: 'Precisa de convite' },
      { name: 'menor de idade', args: [15, true], expected: 'Menor de idade' },
      { name: 'exatamente 18 com convite', args: [18, true], expected: 'Entrada liberada', hidden: true },
      { name: '17 com convite continua barrado', args: [17, true], expected: 'Menor de idade', hidden: true },
      { name: 'menor sem convite', args: [10, false], expected: 'Menor de idade', hidden: true },
    ],
  },
  solution: {
    javascript: `function podeEntrar(idade, temConvite) {
  if (idade < 18) {
    return "Menor de idade";
  }
  if (temConvite) {
    return "Entrada liberada";
  }
  return "Precisa de convite";
}`,
    python: `def pode_entrar(idade, tem_convite):
    if idade < 18:
        return "Menor de idade"
    if tem_convite:
        return "Entrada liberada"
    return "Precisa de convite"`,
  },
  explanation: `
**Tratar o caso mais forte primeiro**
Se a pessoa é menor de idade, nada mais importa: o convite não a deixa entrar. Por isso esse teste vem antes. Depois, só sobra decidir pelo convite.

**Valores verdadeiro/falso podem ser usados direto no if:** if (temConvite) já significa "se tem convite". Também dava para escrever tudo com && (E) e ! (NÃO).
  `,
  hints: [
    'Comece pelo caso "Menor de idade": se idade < 18, devolva já',
    'Depois use if (temConvite) (Python: if tem_convite:)',
    'O que sobrar é "Precisa de convite"',
  ],
  difficulty: 'medium',
};

const theory1_len: TheoryChallenge = {
  id: 'cond.8',
  type: 'theory',
  episode: 1,
  room: '1.8',
  title: 'Medindo o tamanho de um texto',
  description: 'Muitas regras de segurança dependem do tamanho de uma senha. Veja como descobrir quantos caracteres um texto tem.',
  content: `
**Tamanho de um texto**
Para saber quantos caracteres um texto tem:
• **JavaScript:** \`senha.length\` (sem parênteses, é uma propriedade do texto)
• **Python:** \`len(senha)\` (aqui é uma função, com parênteses)

**Exemplos**
• "abc" tem tamanho 3
• "" (texto vazio) tem tamanho 0
• Espaços contam: "a b" tem tamanho 3

**Usando o tamanho em uma decisão**
JavaScript:
\`\`\`
if (senha.length < 6) {
  return "curta";
}
\`\`\`
Python:
\`\`\`
if len(senha) < 6:
    return "curta"
\`\`\`

**Atenção aos limites!**
"Menos de 6" (\`< 6\`) e "6 ou menos" (\`<= 6\`) dão resultados diferentes quando a senha tem exatamente 6 caracteres. Os testes ocultos do próximo desafio conferem isso.
  `,
};

const code1_5: CodeChallenge = {
  id: 'cond.5',
  type: 'code',
  episode: 1,
  room: '1.9',
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

const ex1_pin: CodeChallenge = {
  id: 'cond.12',
  type: 'code',
  episode: 1,
  room: '1.10',
  title: 'Validando um PIN',
  description: 'Um sistema aceita apenas PINs de **exatamente 4 caracteres**, mas recusa os PINs mais óbvios ("0000" e "1234"). A ordem das verificações importa.',
  instructions: 'Devolva "PIN inválido" (tamanho diferente de 4), "PIN fraco" ("0000" ou "1234") ou "PIN válido".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// tamanho diferente de 4 -> "PIN inválido"
// "0000" ou "1234"        -> "PIN fraco"
// caso contrário          -> "PIN válido"
function validarPin(pin) {
  // seu código aqui
}
`,
    python: `# tamanho diferente de 4 -> "PIN inválido"
# "0000" ou "1234"        -> "PIN fraco"
# caso contrário          -> "PIN válido"
def validar_pin(pin):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'validarPin', python: 'validar_pin' },
    cases: [
      { name: 'PIN bom', args: ['4821'], expected: 'PIN válido' },
      { name: 'PIN fraco 1234', args: ['1234'], expected: 'PIN fraco' },
      { name: 'PIN curto', args: ['123'], expected: 'PIN inválido' },
      { name: 'PIN fraco 0000', args: ['0000'], expected: 'PIN fraco', hidden: true },
      { name: 'PIN longo', args: ['12345'], expected: 'PIN inválido', hidden: true },
      { name: 'PIN vazio', args: [''], expected: 'PIN inválido', hidden: true },
      { name: 'outro PIN bom', args: ['9999'], expected: 'PIN válido', hidden: true },
    ],
  },
  solution: {
    javascript: `function validarPin(pin) {
  if (pin.length !== 4) {
    return "PIN inválido";
  }
  if (pin === "0000" || pin === "1234") {
    return "PIN fraco";
  }
  return "PIN válido";
}`,
    python: `def validar_pin(pin):
    if len(pin) != 4:
        return "PIN inválido"
    if pin == "0000" or pin == "1234":
        return "PIN fraco"
    return "PIN válido"`,
  },
  explanation: `
**Validar em camadas**
Primeiro o formato (tamanho), depois o conteúdo (PINs óbvios). Quem valida na ordem certa evita analisar dados que já são inválidos.

**OU (||, or):** basta uma das duas comparações ser verdadeira para o PIN ser fraco.

**Na segurança:** listas de PINs e senhas óbvias fazem parte de políticas reais de segurança.
  `,
  hints: [
    'Primeiro confira o tamanho: pin.length !== 4  (Python: len(pin) != 4)',
    'Depois use OU para os dois PINs fracos: pin === "0000" || pin === "1234"',
    'No Python, o OU é a palavra or',
  ],
  difficulty: 'medium',
};

const code1_6: CodeChallenge = {
  id: 'cond.6',
  type: 'code',
  episode: 1,
  room: '1.11',
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
  room: '1.12',
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
  ex1_sinal,
  ex1_nota,
  ex1_entrar,
  theory1_len,
  code1_5,
  ex1_pin,
  code1_6,
  theory1_7,
];
