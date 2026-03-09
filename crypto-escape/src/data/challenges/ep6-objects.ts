import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory6_0: TheoryChallenge = {
  id: 'obj.0',
  type: 'theory',
  episode: 6,
  room: '6.0',
  title: 'Episódio 6 — Objetos e JSON',
  description: 'Objetos são a forma como dados REAIS são organizados na internet. APIs, tokens e logs usam esse formato.',
  content: `
**O que é um objeto?**
Um objeto guarda dados organizados com **nome: valor** (chave-valor).

**Exemplo — dados de um usuário:**
\`\`\`
{
  nome: "Ana",
  idade: 25,
  admin: false
}
\`\`\`

**Comparação:**
• Variável: guarda UM valor → \`nome = "Ana"\`
• Array: guarda VÁRIOS valores sem nome → \`["Ana", 25, false]\`
• Objeto: guarda VÁRIOS valores COM nome → \`{ nome: "Ana", idade: 25 }\`

**Por que isso importa?**
Quando você faz login em um site, o servidor responde com algo assim:
\`\`\`
{ usuario: "ana", role: "admin", token: "abc123" }
\`\`\`

Tokens JWT, respostas de APIs, logs de segurança — tudo usa esse formato.
Na próxima sala vamos criar nosso primeiro objeto!
  `,
};

const code6_1: CodeChallenge = {
  id: 'obj.1',
  type: 'code',
  episode: 6,
  room: '6.1',
  title: 'Criando um objeto',
  description: 'O código cria um objeto **usuario** com nome e cargo. **Execute** para ver!',
  instructions: 'Execute e veja os dados do usuário.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const usuario = {
  nome: "Ana",
  cargo: "Analista de Segurança"
};

console.log(usuario.nome);
console.log(usuario.cargo);
`,
    python: `usuario = {
    "nome": "Ana",
    "cargo": "Analista de Segurança"
}

print(usuario["nome"])
print(usuario["cargo"])
`,
  },
  expectedOutput: 'Ana\nAnalista de Segurança',
  hints: [
    'O código já está pronto! Execute.',
    'usuario.nome acessa o valor da chave "nome"',
  ],
  difficulty: 'easy',
};

const code6_2: CodeChallenge = {
  id: 'obj.2',
  type: 'code',
  episode: 6,
  room: '6.2',
  title: 'Acessando propriedades',
  description: 'Mude o código para mostrar apenas o **email** do usuário.',
  instructions: 'Acesse e imprima a propriedade "email" do objeto usuario.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const usuario = {
  nome: "Carlos",
  email: "carlos@security.com",
  nivel: "Senior"
};

// Imprima o email do usuário
// Acesse a propriedade "email" do objeto
`,
    python: `usuario = {
    "nome": "Carlos",
    "email": "carlos@security.com",
    "nivel": "Senior"
}

# Imprima o email do usuário
# Acesse a chave "email" do dicionário
`,
  },
  expectedOutput: 'carlos@security.com',
  hints: [
    'Em JS: console.log(usuario.email)',
    'Em Python: print(usuario["email"])',
    'Objetos guardam dados com chave: valor',
  ],
  difficulty: 'easy',
};

const theory6_3: TheoryChallenge = {
  id: 'obj.3',
  type: 'theory',
  episode: 6,
  room: '6.3',
  title: 'JSON — a linguagem da internet',
  description: 'JSON (JavaScript Object Notation) é o formato que a internet inteira usa para trocar dados.',
  content: `
**JSON é basicamente um objeto em formato texto:**
\`\`\`
{
  "usuario": "admin",
  "role": "administrador",
  "ativo": true
}
\`\`\`

**Onde JSON aparece:**
• **APIs:** quando um app pede dados ao servidor
• **JWT Tokens:** o conteúdo de um token é JSON codificado
• **Logs:** muitos sistemas gravam logs em JSON
• **Configurações:** arquivos de config usam JSON

**Exemplo real — resposta de login:**
Quando você faz login, o servidor pode responder:
\`\`\`
{
  "sucesso": true,
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "permissoes": ["ler", "escrever"]
}
\`\`\`

Entender objetos/JSON é ESSENCIAL para os próximos episódios de segurança!
  `,
};

const code6_4: CodeChallenge = {
  id: 'obj.4',
  type: 'code',
  episode: 6,
  room: '6.4',
  title: 'Simulando resposta de API',
  description: 'O código simula a resposta de um servidor após login. **Execute** e veja os dados retornados!',
  instructions: 'Escreva um if/else que verifica se o login foi um sucesso e imprime o resultado.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const resposta = {
  sucesso: true,
  usuario: "admin",
  role: "administrador"
};

// Escreva um if/else:
// Se resposta.sucesso for true, imprima "Login OK: " + resposta.usuario
// Senão, imprima "Login falhou"
`,
    python: `resposta = {
    "sucesso": True,
    "usuario": "admin",
    "role": "administrador"
}

# Escreva um if/else:
# Se resposta["sucesso"] for True, imprima "Login OK: " + resposta["usuario"]
# Senão, imprima "Login falhou"
`,
  },
  expectedOutput: 'Login OK: admin',
  hints: [
    'Em JS: if (resposta.sucesso) { console.log("Login OK: " + resposta.usuario); }',
    'Em Python: if resposta["sucesso"]: print("Login OK: " + resposta["usuario"])',
    'Não esqueça o else com "Login falhou"',
  ],
  difficulty: 'easy',
};

const code6_5: CodeChallenge = {
  id: 'obj.5',
  type: 'code',
  episode: 6,
  room: '6.5',
  title: 'Verificando permissões',
  description: 'O código verifica se o usuário é admin. Mude o **role** para **"usuario"** e veja o resultado mudar.',
  instructions: 'Mude o role para "usuario" e escreva o if/else para verificar permissões.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const usuario = {
  nome: "Carlos",
  // Mude o role para "usuario":
  role: "admin"
};

// Escreva um if/else:
// Se usuario.role for "admin", imprima "Acesso total"
// Senão, imprima "Acesso limitado"
`,
    python: `usuario = {
    "nome": "Carlos",
    # Mude o role para "usuario":
    "role": "admin"
}

# Escreva um if/else:
# Se usuario["role"] for "admin", imprima "Acesso total"
# Senão, imprima "Acesso limitado"
`,
  },
  expectedOutput: 'Acesso limitado',
  hints: [
    'Primeiro mude role: "admin" para role: "usuario"',
    'Depois: if (usuario.role == "admin") em JS',
    'Como "usuario" não é "admin", deve entrar no else → "Acesso limitado"',
  ],
  difficulty: 'easy',
};

const code6_6: CodeChallenge = {
  id: 'obj.6',
  type: 'code',
  episode: 6,
  room: '6.6',
  title: 'Array de objetos — lista de usuários',
  description: 'Na vida real, sistemas guardam VÁRIOS usuários. Combinamos array + objetos! **Execute** e veja.',
  instructions: 'Percorra o array de usuários e imprima o nome dos que são "admin".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const usuarios = [
  { nome: "Ana", role: "admin" },
  { nome: "Carlos", role: "usuario" },
  { nome: "Maria", role: "admin" }
];

// Percorra o array usuarios com um loop for
// Se o role do usuário for "admin", imprima: nome + " é admin"
`,
    python: `usuarios = [
    {"nome": "Ana", "role": "admin"},
    {"nome": "Carlos", "role": "usuario"},
    {"nome": "Maria", "role": "admin"}
]

# Percorra a lista usuarios com um loop for
# Se o role do usuário for "admin", imprima: nome + " é admin"
`,
  },
  expectedOutput: 'Ana é admin\nMaria é admin',
  hints: [
    'Em JS: for (let i = 0; i < usuarios.length; i++) { if (usuarios[i].role == "admin") { ... } }',
    'Em Python: for u in usuarios: if u["role"] == "admin": print(u["nome"] + " é admin")',
    'Só Ana e Maria são admin',
  ],
  difficulty: 'easy',
};

const code6_7: CodeChallenge = {
  id: 'obj.7',
  type: 'code',
  episode: 6,
  room: '6.7',
  title: 'Função + Objeto — verificação real',
  description: 'Vamos combinar tudo! Uma função que recebe um usuário e verifica suas permissões. **Execute**!',
  instructions: 'Crie uma função que recebe um usuario e retorna "Permitido" se for admin, "Negado" se não for.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Crie uma função "verificarAcesso" que recebe um usuario
// Se usuario.role for "admin", retorne "Permitido"
// Senão, retorne "Negado"

const ana = { nome: "Ana", role: "admin" };
const carlos = { nome: "Carlos", role: "usuario" };

console.log(ana.nome + ": " + verificarAcesso(ana));
console.log(carlos.nome + ": " + verificarAcesso(carlos));
`,
    python: `# Crie uma função "verificar_acesso" que recebe um usuario
# Se usuario["role"] for "admin", retorne "Permitido"
# Senão, retorne "Negado"

ana = {"nome": "Ana", "role": "admin"}
carlos = {"nome": "Carlos", "role": "usuario"}

print(ana["nome"] + ": " + verificar_acesso(ana))
print(carlos["nome"] + ": " + verificar_acesso(carlos))
`,
  },
  expectedOutput: 'Ana: Permitido\nCarlos: Negado',
  hints: [
    'Em JS: function verificarAcesso(usuario) { if (usuario.role == "admin") { return "Permitido"; } ... }',
    'Em Python: def verificar_acesso(usuario): if usuario["role"] == "admin": return "Permitido"',
    'Ana é admin → "Permitido", Carlos é usuario → "Negado"',
  ],
  difficulty: 'easy',
};

const theory6_8: TheoryChallenge = {
  id: 'obj.8',
  type: 'theory',
  episode: 6,
  room: '6.8',
  title: 'Parabéns! Você domina objetos e JSON!',
  description: 'Agora você entende como dados são organizados na internet. Isso é a base de APIs, JWT e muito mais.',
  content: `
**O que você aprendeu:**
• Criar objetos com chave-valor
• Acessar propriedades (.nome ou ["nome"])
• Objetos em condições (verificar role/permissão)
• Array de objetos (lista de usuários)
• Função que recebe objeto como parâmetro

**Onde você vai usar isso:**
• **APIs REST:** respostas são objetos JSON
• **JWT Tokens:** o payload é um objeto codificado
• **Logs de segurança:** cada evento é um objeto
• **Configurações:** permissões são objetos

**Próximo episódio:**
Vamos aprender **métodos avançados de string** — includes, split, replace. Essas são as ferramentas que analistas de segurança usam para detectar ataques em textos!
  `,
};

export const objectsChallenges: Challenge[] = [
  theory6_0,
  code6_1,
  code6_2,
  theory6_3,
  code6_4,
  code6_5,
  code6_6,
  code6_7,
  theory6_8,
];
