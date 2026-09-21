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
  title: 'Lendo um objeto',
  description: 'Um **objeto** (JS) / **dicionário** (Python) guarda dados com nome: chave e valor. Escreva uma função que descreve um usuário a partir dos dados dele.',
  instructions: 'Devolva "NOME - CARGO" a partir do usuário. Exemplo: descrever({nome: "Ana", cargo: "Analista"}) devolve "Ana - Analista".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// O usuário tem as propriedades "nome" e "cargo".
// Acesse com usuario.nome e usuario.cargo
function descrever(usuario) {
  // seu código aqui
}
`,
    python: `# O usuário é um dicionário com as chaves "nome" e "cargo".
# Acesse com usuario["nome"] e usuario["cargo"]
def descrever(usuario):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'descrever', python: 'descrever' },
    cases: [
      { name: 'Ana', args: [{ nome: 'Ana', cargo: 'Analista' }], expected: 'Ana - Analista' },
      { name: 'Carlos', args: [{ nome: 'Carlos', cargo: 'Pentester' }], expected: 'Carlos - Pentester' },
      { name: 'campos vazios', args: [{ nome: '', cargo: '' }], expected: ' - ', hidden: true },
      { name: 'ordem das chaves não importa', args: [{ cargo: 'Dev', nome: 'Bia' }], expected: 'Bia - Dev', hidden: true },
    ],
  },
  solution: {
    javascript: `function descrever(usuario) {
  return usuario.nome + " - " + usuario.cargo;
}`,
    python: `def descrever(usuario):
    return usuario["nome"] + " - " + usuario["cargo"]`,
  },
  explanation: `
**Chave e valor**
Em vez de posições numéricas (como nas listas), você acessa os dados pelo NOME: usuario.nome (JS) ou usuario["nome"] (Python).

**Por que importa:** a internet troca dados em formato JSON, que é exatamente isto. Toda resposta de API que você vai analisar é um objeto.
  `,
  hints: [
    'JavaScript: usuario.nome e usuario.cargo',
    'Python: usuario["nome"] e usuario["cargo"]',
    'Junte com " - " no meio',
  ],
  difficulty: 'easy',
};

const code6_2: CodeChallenge = {
  id: 'obj.2',
  type: 'code',
  episode: 6,
  room: '6.2',
  title: 'Acessando propriedades',
  description: 'Extraia um dado específico de dentro de um objeto: o e-mail do usuário.',
  instructions: 'Devolva o e-mail do usuário. Exemplo: pegarEmail({nome: "Carlos", email: "carlos@security.com"}) devolve "carlos@security.com".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva a propriedade "email" do usuário
function pegarEmail(usuario) {
  // seu código aqui
}
`,
    python: `# Devolva a chave "email" do usuário
def pegar_email(usuario):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'pegarEmail', python: 'pegar_email' },
    cases: [
      { name: 'Carlos', args: [{ nome: 'Carlos', email: 'carlos@security.com' }], expected: 'carlos@security.com' },
      { name: 'Ana', args: [{ nome: 'Ana', email: 'ana@site.com' }], expected: 'ana@site.com' },
      { name: 'email é a primeira chave', args: [{ email: 'x@y.com', nome: 'X' }], expected: 'x@y.com', hidden: true },
      { name: 'com mais campos', args: [{ id: 1, nome: 'Bia', email: 'bia@ex.com', role: 'admin' }], expected: 'bia@ex.com', hidden: true },
    ],
  },
  solution: {
    javascript: `function pegarEmail(usuario) {
  return usuario.email;
}`,
    python: `def pegar_email(usuario):
    return usuario["email"]`,
  },
  explanation: `
**Acesso direto**
Você pega só o campo que precisa. A posição das chaves dentro do objeto não importa, só o nome.

**Na segurança:** ao analisar respostas de API, você procura campos sensíveis (e-mail, token, senha). Saber acessá-los é o primeiro passo.
  `,
  hints: [
    'JavaScript: usuario.email',
    'Python: usuario["email"]',
    'return usuario.email',
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
  title: 'Interpretando uma resposta de API',
  description: 'Quando você faz login em um site, o servidor responde com um objeto JSON. Interprete essa resposta.',
  instructions: 'Se o "status" for "sucesso", devolva "Login OK: " + usuario. Senão devolva "Login falhou".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// resposta = { status: "sucesso" ou "erro", usuario: "nome" }
function interpretarLogin(resposta) {
  // seu código aqui
}
`,
    python: `# resposta = { "status": "sucesso" ou "erro", "usuario": "nome" }
def interpretar_login(resposta):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'interpretarLogin', python: 'interpretar_login' },
    cases: [
      { name: 'login com sucesso', args: [{ status: 'sucesso', usuario: 'admin' }], expected: 'Login OK: admin' },
      { name: 'login com erro', args: [{ status: 'erro', usuario: 'admin' }], expected: 'Login falhou' },
      { name: 'outro usuário', args: [{ status: 'sucesso', usuario: 'ana' }], expected: 'Login OK: ana', hidden: true },
      { name: 'qualquer status diferente de sucesso', args: [{ status: 'bloqueado', usuario: 'x' }], expected: 'Login falhou', hidden: true },
      { name: 'status com maiúscula não é sucesso', args: [{ status: 'SUCESSO', usuario: 'x' }], expected: 'Login falhou', hidden: true },
    ],
  },
  solution: {
    javascript: `function interpretarLogin(resposta) {
  if (resposta.status === "sucesso") {
    return "Login OK: " + resposta.usuario;
  }
  return "Login falhou";
}`,
    python: `def interpretar_login(resposta):
    if resposta["status"] == "sucesso":
        return "Login OK: " + resposta["usuario"]
    return "Login falhou"`,
  },
  explanation: `
**Objeto + condição**
Ler um campo do objeto e decidir com if é a rotina de quem analisa APIs.

**Segurança:** o servidor decide o status; o cliente só interpreta. Um site que confia em um campo controlado pelo usuário (como "status") tem uma falha grave.
  `,
  hints: [
    'Compare resposta.status com "sucesso" (Python: resposta["status"])',
    'Se for sucesso: return "Login OK: " + resposta.usuario',
    'Qualquer outra coisa: return "Login falhou"',
  ],
  difficulty: 'medium',
};

const code6_5: CodeChallenge = {
  id: 'obj.5',
  type: 'code',
  episode: 6,
  room: '6.5',
  title: 'Verificando permissões',
  description: 'Sistemas guardam o **papel** (role) de cada usuário. Decida o nível de acesso pelo role.',
  instructions: 'Devolva "Acesso total" para role "admin", "Acesso limitado" para "usuario" e "Sem acesso" para qualquer outro.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// admin -> "Acesso total" | usuario -> "Acesso limitado" | outro -> "Sem acesso"
function verificarPermissao(usuario) {
  // seu código aqui
}
`,
    python: `# admin -> "Acesso total" | usuario -> "Acesso limitado" | outro -> "Sem acesso"
def verificar_permissao(usuario):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'verificarPermissao', python: 'verificar_permissao' },
    cases: [
      { name: 'admin', args: [{ nome: 'Ana', role: 'admin' }], expected: 'Acesso total' },
      { name: 'usuário comum', args: [{ nome: 'Carlos', role: 'usuario' }], expected: 'Acesso limitado' },
      { name: 'visitante', args: [{ nome: 'X', role: 'visitante' }], expected: 'Sem acesso', hidden: true },
      { name: 'role vazio', args: [{ nome: 'Y', role: '' }], expected: 'Sem acesso', hidden: true },
      { name: 'ADMIN em maiúsculas não é admin', args: [{ nome: 'Z', role: 'ADMIN' }], expected: 'Sem acesso', hidden: true },
    ],
  },
  solution: {
    javascript: `function verificarPermissao(usuario) {
  if (usuario.role === "admin") {
    return "Acesso total";
  } else if (usuario.role === "usuario") {
    return "Acesso limitado";
  }
  return "Sem acesso";
}`,
    python: `def verificar_permissao(usuario):
    if usuario["role"] == "admin":
        return "Acesso total"
    elif usuario["role"] == "usuario":
        return "Acesso limitado"
    return "Sem acesso"`,
  },
  explanation: `
**Princípio do menor privilégio**
O padrão (o "senão" final) deve ser NEGAR o acesso. Se um role desconhecido ganhasse acesso por padrão, qualquer valor inesperado abriria a porta.

**Detalhe:** "ADMIN" ≠ "admin". Comparações de texto diferenciam maiúsculas, e isso protege ou quebra o sistema conforme a regra.
  `,
  hints: [
    'Use if / else if (Python: elif) para os dois roles conhecidos',
    'O caso final (nenhum dos dois) devolve "Sem acesso"',
    'Compare o texto exatamente: "admin" e "usuario"',
  ],
  difficulty: 'medium',
};

const code6_6: CodeChallenge = {
  id: 'obj.6',
  type: 'code',
  episode: 6,
  room: '6.6',
  title: 'Lista de objetos — quem é admin?',
  description: 'Bancos de dados devolvem **listas de objetos**. Percorra a lista de usuários e encontre os administradores.',
  instructions: 'Devolva uma lista com os NOMES dos usuários cujo role é "admin", na ordem em que aparecem.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// usuarios = [{ nome: "Ana", role: "admin" }, ...]
// Devolva uma lista só com os nomes dos admins
function listarAdmins(usuarios) {
  const nomes = [];
  // seu código aqui
  return nomes;
}
`,
    python: `# usuarios = [{"nome": "Ana", "role": "admin"}, ...]
# Devolva uma lista só com os nomes dos admins
def listar_admins(usuarios):
    nomes = []
    # seu código aqui
    return nomes
`,
  },
  tests: {
    fn: { javascript: 'listarAdmins', python: 'listar_admins' },
    cases: [
      {
        name: 'dois admins',
        args: [[{ nome: 'Ana', role: 'admin' }, { nome: 'Bia', role: 'usuario' }, { nome: 'Maria', role: 'admin' }]],
        expected: ['Ana', 'Maria'],
      },
      { name: 'nenhum admin', args: [[{ nome: 'Bia', role: 'usuario' }]], expected: [] },
      { name: 'lista vazia', args: [[]], expected: [], hidden: true },
      { name: 'todos admins', args: [[{ nome: 'A', role: 'admin' }, { nome: 'B', role: 'admin' }]], expected: ['A', 'B'], hidden: true },
      { name: 'ordem preservada', args: [[{ nome: 'Z', role: 'admin' }, { nome: 'A', role: 'admin' }]], expected: ['Z', 'A'], hidden: true },
    ],
  },
  solution: {
    javascript: `function listarAdmins(usuarios) {
  const nomes = [];
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].role === "admin") {
      nomes.push(usuarios[i].nome);
    }
  }
  return nomes;
}`,
    python: `def listar_admins(usuarios):
    nomes = []
    for usuario in usuarios:
        if usuario["role"] == "admin":
            nomes.append(usuario["nome"])
    return nomes`,
  },
  explanation: `
**Filtrando**
Percorra a lista, teste uma propriedade de cada objeto e guarde só o que interessa. É o padrão "filtrar": muito comum ao analisar dados de usuários e logs.

**Na segurança:** listar quem tem privilégios altos é uma tarefa clássica de auditoria (menos admins = menos risco).
  `,
  hints: [
    'Percorra cada usuário e teste se usuario.role é "admin"',
    'Para cada admin, adicione o NOME à lista: nomes.push(...) / nomes.append(...)',
    'Devolva a lista no final, mesmo se estiver vazia',
  ],
  difficulty: 'medium',
};

const code6_7: CodeChallenge = {
  id: 'obj.7',
  type: 'code',
  episode: 6,
  room: '6.7',
  title: 'Contando papéis — relatório de acesso',
  description: 'Um relatório de acesso conta quantos usuários existem em cada papel. Construa um **objeto** com essas contagens.',
  instructions: 'Devolva um objeto/dicionário no formato {role: quantidade}. Exemplo: para 1 admin e 2 usuarios devolve {"admin": 1, "usuario": 2}.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva { admin: 1, usuario: 2 }, contando os roles
function contarPapeis(usuarios) {
  const contagem = {};
  // seu código aqui
  return contagem;
}
`,
    python: `# Devolva {"admin": 1, "usuario": 2}, contando os roles
def contar_papeis(usuarios):
    contagem = {}
    # seu código aqui
    return contagem
`,
  },
  tests: {
    fn: { javascript: 'contarPapeis', python: 'contar_papeis' },
    cases: [
      {
        name: '1 admin e 2 usuários',
        args: [[{ nome: 'Ana', role: 'admin' }, { nome: 'Bia', role: 'usuario' }, { nome: 'Carlos', role: 'usuario' }]],
        expected: { admin: 1, usuario: 2 },
      },
      { name: 'um só papel', args: [[{ nome: 'A', role: 'admin' }, { nome: 'B', role: 'admin' }]], expected: { admin: 2 } },
      { name: 'lista vazia', args: [[]], expected: {}, hidden: true },
      { name: 'um usuário', args: [[{ nome: 'X', role: 'visitante' }]], expected: { visitante: 1 }, hidden: true },
      {
        name: 'três papéis',
        args: [[{ nome: 'a', role: 'admin' }, { nome: 'b', role: 'usuario' }, { nome: 'c', role: 'visitante' }, { nome: 'd', role: 'usuario' }]],
        expected: { admin: 1, usuario: 2, visitante: 1 },
        hidden: true,
      },
    ],
  },
  solution: {
    javascript: `function contarPapeis(usuarios) {
  const contagem = {};
  for (let i = 0; i < usuarios.length; i++) {
    const role = usuarios[i].role;
    if (contagem[role] === undefined) {
      contagem[role] = 0;
    }
    contagem[role] = contagem[role] + 1;
  }
  return contagem;
}`,
    python: `def contar_papeis(usuarios):
    contagem = {}
    for usuario in usuarios:
        role = usuario["role"]
        contagem[role] = contagem.get(role, 0) + 1
    return contagem`,
  },
  explanation: `
**Objeto como contador**
A chave é o role; o valor é a contagem. Na primeira vez que um role aparece, ele ainda não existe no objeto, então começamos em 0 (em Python, .get(role, 0) já faz isso).

**Isso é o coração de muita análise de logs:** contar quantas vezes cada IP, usuário ou erro aparece revela ataques (um IP com milhares de tentativas de login é força bruta).
  `,
  hints: [
    'Percorra os usuários e pegue o role de cada um',
    'JavaScript: contagem[role] = (contagem[role] || 0) + 1',
    'Python: contagem[role] = contagem.get(role, 0) + 1',
  ],
  difficulty: 'hard',
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
