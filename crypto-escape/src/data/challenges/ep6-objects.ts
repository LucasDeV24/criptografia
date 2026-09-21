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
Um objeto guarda dados organizados com **nome: valor** (chave-valor). No Python, o nome é **dicionário**.

**Exemplo: dados de um usuário**
JavaScript:
\`\`\`
const usuario = {
  nome: "Ana",
  idade: 25,
  admin: false
};
\`\`\`
Python (as chaves vão entre aspas):
\`\`\`
usuario = {
  "nome": "Ana",
  "idade": 25,
  "admin": False
}
\`\`\`

**Lendo um valor pela chave**
• **JavaScript:** \`usuario.nome\` ou \`usuario["nome"]\` → "Ana"
• **Python:** \`usuario["nome"]\` → "Ana" (no Python só existe a forma com colchetes e aspas)

**Comparação**
• Variável: guarda UM valor → \`nome = "Ana"\`
• Array: guarda VÁRIOS valores sem nome → \`["Ana", 25, false]\`
• Objeto: guarda VÁRIOS valores COM nome → \`{ nome: "Ana", idade: 25 }\`

**Por que isso importa?**
Quando você faz login em um site, o servidor responde com algo assim:
\`\`\`
{ "usuario": "ana", "role": "admin", "token": "abc123" }
\`\`\`
Tokens JWT, respostas de APIs, logs de segurança: tudo usa esse formato.

**Nos exercícios**
Suas funções vão **receber** objetos como parâmetro e ler os valores pelas chaves.
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

const ex6_criar: CodeChallenge = {
  id: 'obj.10',
  type: 'code',
  episode: 6,
  room: '6.2',
  title: 'Criando um objeto',
  description: 'Até aqui você **leu** objetos. Agora **crie** um: uma função que monta e devolve os dados de um usuário novo.',
  instructions: 'Devolva um objeto com as chaves nome, email e ativo (sempre verdadeiro). Exemplo: criarUsuario("Ana", "ana@x.com") devolve {nome: "Ana", email: "ana@x.com", ativo: true}.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva { nome: ..., email: ..., ativo: true }
function criarUsuario(nome, email) {
  // seu código aqui
}
`,
    python: `# Devolva {"nome": ..., "email": ..., "ativo": True}
def criar_usuario(nome, email):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'criarUsuario', python: 'criar_usuario' },
    cases: [
      { name: 'Ana', args: ['Ana', 'ana@x.com'], expected: { nome: 'Ana', email: 'ana@x.com', ativo: true } },
      { name: 'Carlos', args: ['Carlos', 'carlos@site.com'], expected: { nome: 'Carlos', email: 'carlos@site.com', ativo: true } },
      { name: 'campos vazios', args: ['', ''], expected: { nome: '', email: '', ativo: true }, hidden: true },
      { name: 'sempre ativo', args: ['Bia', 'bia@y.com'], expected: { nome: 'Bia', email: 'bia@y.com', ativo: true }, hidden: true },
    ],
  },
  solution: {
    javascript: `function criarUsuario(nome, email) {
  return { nome: nome, email: email, ativo: true };
}`,
    python: `def criar_usuario(nome, email):
    return {"nome": nome, "email": email, "ativo": True}`,
  },
  explanation: `
**Montando um objeto**
Cada par chave: valor entra entre chaves. O valor de "nome" vem do parâmetro nome, e assim por diante. "ativo" é fixo: true (JavaScript) e True (Python).

**Na prática:** APIs e bancos de dados criam objetos assim ao cadastrar um usuário novo.
  `,
  hints: [
    'JavaScript: return { nome: nome, email: email, ativo: true };',
    'Python: return {"nome": nome, "email": email, "ativo": True}',
    'No Python as chaves vão entre aspas, e o verdadeiro se escreve True',
  ],
  difficulty: 'easy',
};

const code6_2: CodeChallenge = {
  id: 'obj.2',
  type: 'code',
  episode: 6,
  room: '6.3',
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
  room: '6.4',
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

**O valor "nada": null e None**
Quando uma busca não encontra nada, é comum devolver um valor especial que significa "nada aqui": \`null\` no JavaScript e \`None\` no Python. No JSON também aparece como \`null\`.

**Objetos podem guardar listas**
O valor de uma chave pode ser uma lista: \`{ "nome": "Ana", "permissoes": ["ler", "escrever"] }\`. Para chegar nela, leia a chave e depois percorra a lista como sempre.
  `,
};

const code6_4: CodeChallenge = {
  id: 'obj.4',
  type: 'code',
  episode: 6,
  room: '6.5',
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
  room: '6.6',
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
  room: '6.7',
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

const ex6_buscar: CodeChallenge = {
  id: 'obj.11',
  type: 'code',
  episode: 6,
  room: '6.8',
  title: 'Buscando um usuário pelo ID',
  description: 'Em uma lista de objetos, encontre o usuário com um certo `id` e **devolva o objeto inteiro**. Se ninguém tiver esse id, devolva "nada": `null` (JavaScript) ou `None` (Python).',
  instructions: 'Devolva o primeiro usuário cujo id seja igual ao pedido, ou null/None. Exemplo: buscarUsuario([{id: 1, nome: "Ana"}, {id: 2, nome: "Bia"}], 2) devolve {id: 2, nome: "Bia"}.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva o objeto do usuário com esse id, ou null se não achar
function buscarUsuario(usuarios, id) {
  // seu código aqui
}
`,
    python: `# Devolva o dicionário do usuário com esse id, ou None se não achar
def buscar_usuario(usuarios, id):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'buscarUsuario', python: 'buscar_usuario' },
    cases: [
      { name: 'acha o usuário 2', args: [[{ id: 1, nome: 'Ana' }, { id: 2, nome: 'Bia' }], 2], expected: { id: 2, nome: 'Bia' } },
      { name: 'id que não existe', args: [[{ id: 1, nome: 'Ana' }], 9], expected: null },
      { name: 'lista vazia', args: [[], 1], expected: null, hidden: true },
      { name: 'primeiro da lista', args: [[{ id: 5, nome: 'X' }, { id: 6, nome: 'Y' }], 5], expected: { id: 5, nome: 'X' }, hidden: true },
      { name: 'devolve o primeiro quando repete', args: [[{ id: 1, nome: 'A' }, { id: 1, nome: 'B' }], 1], expected: { id: 1, nome: 'A' }, hidden: true },
    ],
  },
  solution: {
    javascript: `function buscarUsuario(usuarios, id) {
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id === id) {
      return usuarios[i];
    }
  }
  return null;
}`,
    python: `def buscar_usuario(usuarios, id):
    for usuario in usuarios:
        if usuario["id"] == id:
            return usuario
    return None`,
  },
  explanation: `
**Busca em lista de objetos**
Mesmo padrão da busca em listas: percorrer, comparar e devolver ao achar. A diferença é que você compara uma CHAVE do objeto (usuario.id) e devolve o objeto inteiro.

**null / None:** é a forma clara de dizer "não achei". Quem chama a função deve verificar isso antes de usar o resultado.

**Na segurança:** esta busca por id é exatamente o que uma API vulnerável a IDOR faz sem checar se quem pediu tem permissão para ver aquele usuário.
  `,
  hints: [
    'Percorra a lista e compare usuario.id com o id pedido',
    'Ao achar, devolva o objeto inteiro (não só o id)',
    'Depois do loop, devolva null (Python: None)',
  ],
  difficulty: 'medium',
};

const ex6_saldos: CodeChallenge = {
  id: 'obj.12',
  type: 'code',
  episode: 6,
  room: '6.9',
  title: 'Somando saldos de contas',
  description: 'Percorra uma lista de contas (objetos) e some o campo `saldo` de todas. Junta **lista de objetos** com o **acumulador**.',
  instructions: 'Devolva a soma dos saldos. Exemplo: somarSaldos([{titular: "A", saldo: 100}, {titular: "B", saldo: 50}]) devolve 150.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Some o campo "saldo" de cada conta
function somarSaldos(contas) {
  let total = 0;
  // percorra as contas
  return total;
}
`,
    python: `# Some a chave "saldo" de cada conta
def somar_saldos(contas):
    total = 0
    # percorra as contas
    return total
`,
  },
  tests: {
    fn: { javascript: 'somarSaldos', python: 'somar_saldos' },
    cases: [
      { name: 'duas contas', args: [[{ titular: 'A', saldo: 100 }, { titular: 'B', saldo: 50 }]], expected: 150 },
      { name: 'uma conta', args: [[{ titular: 'A', saldo: 30 }]], expected: 30 },
      { name: 'lista vazia', args: [[]], expected: 0, hidden: true },
      { name: 'saldo negativo compensa', args: [[{ titular: 'A', saldo: -20 }, { titular: 'B', saldo: 20 }]], expected: 0, hidden: true },
      { name: 'três contas', args: [[{ titular: 'A', saldo: 1 }, { titular: 'B', saldo: 2 }, { titular: 'C', saldo: 3 }]], expected: 6, hidden: true },
    ],
  },
  solution: {
    javascript: `function somarSaldos(contas) {
  let total = 0;
  for (let i = 0; i < contas.length; i++) {
    total = total + contas[i].saldo;
  }
  return total;
}`,
    python: `def somar_saldos(contas):
    total = 0
    for conta in contas:
        total = total + conta["saldo"]
    return total`,
  },
  explanation: `
**Loop + acessar chave + acumulador**
A cada conta, leia o campo saldo e some ao total. É o mesmo que somar uma lista de números, só que o número está dentro de cada objeto.

**Na prática:** relatórios financeiros e de auditoria são feitos assim, agregando campos de milhares de registros.
  `,
  hints: [
    'Percorra a lista de contas',
    'JavaScript: contas[i].saldo   Python: conta["saldo"]',
    'Some cada saldo em total e devolva no final',
  ],
  difficulty: 'easy',
};

const theory6_cont: TheoryChallenge = {
  id: 'obj.9',
  type: 'theory',
  episode: 6,
  room: '6.10',
  title: 'Objetos como contadores',
  description: 'Um objeto também serve para contar quantas vezes algo aparece: a chave é o item e o valor é a contagem.',
  content: `
**Criando e atualizando chaves**
Você pode começar com um objeto vazio e criar ou trocar chaves quando quiser:
• **JavaScript:** \`const contagem = {};\` e depois \`contagem["maçã"] = 1;\`
• **Python:** \`contagem = {}\` e depois \`contagem["maçã"] = 1\`

Atribuir a uma chave que já existe **troca** o valor; atribuir a uma nova **cria** a chave.

**O problema: a chave pode não existir ainda**
Na primeira vez que você vê um item, ele ainda não está no objeto. Ler uma chave que não existe:
• No **JavaScript** devolve \`undefined\`
• No **Python** dá um erro (\`KeyError\`)

**Duas formas seguras de lidar com isso**
• **JavaScript:** \`(contagem[fruta] || 0) + 1\`. O \`||\` usa o 0 quando o valor é \`undefined\`.
• **Python:** \`contagem.get(fruta, 0) + 1\`. O \`.get(chave, padrao)\` devolve o valor padrão (0) se a chave não existir.

**O padrão de contagem completo**
Contando quantas vezes cada fruta aparece em uma lista:
\`\`\`
const contagem = {};
for (let i = 0; i < frutas.length; i++) {
  const fruta = frutas[i];
  contagem[fruta] = (contagem[fruta] || 0) + 1;
}
\`\`\`
Python:
\`\`\`
contagem = {}
for fruta in frutas:
    contagem[fruta] = contagem.get(fruta, 0) + 1
\`\`\`
Para \`["maçã", "uva", "maçã"]\` o resultado é \`{"maçã": 2, "uva": 1}\`.

**Na segurança**
Contar quantas vezes cada IP ou usuário aparece em um log revela ataques: um IP com milhares de tentativas de login é força bruta.
  `,
};

const code6_7: CodeChallenge = {
  id: 'obj.7',
  type: 'code',
  episode: 6,
  room: '6.11',
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

const ex6_perm: CodeChallenge = {
  id: 'obj.13',
  type: 'code',
  episode: 6,
  room: '6.12',
  title: 'O usuário tem essa permissão?',
  description: 'Cada usuário tem uma **lista de permissões** dentro do objeto. Verifique se ele tem uma permissão específica: leia a lista e **procure** nela.',
  instructions: 'Devolva true se a permissão estiver na lista de permissões do usuário, senão false. Exemplo: temPermissao({nome: "Ana", permissoes: ["ler", "escrever"]}, "ler") devolve true.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// usuario = { nome: "...", permissoes: ["ler", "escrever"] }
function temPermissao(usuario, permissao) {
  // percorra usuario.permissoes procurando a permissão
}
`,
    python: `# usuario = {"nome": "...", "permissoes": ["ler", "escrever"]}
def tem_permissao(usuario, permissao):
    # percorra usuario["permissoes"] procurando a permissão
    pass
`,
  },
  tests: {
    fn: { javascript: 'temPermissao', python: 'tem_permissao' },
    cases: [
      { name: 'tem a permissão', args: [{ nome: 'Ana', permissoes: ['ler', 'escrever'] }, 'ler'], expected: true },
      { name: 'não tem', args: [{ nome: 'Ana', permissoes: ['ler', 'escrever'] }, 'apagar'], expected: false },
      { name: 'lista vazia', args: [{ nome: 'Bia', permissoes: [] }, 'ler'], expected: false, hidden: true },
      { name: 'maiúscula é diferente', args: [{ nome: 'Ana', permissoes: ['ler'] }, 'LER'], expected: false, hidden: true },
      { name: 'última da lista', args: [{ nome: 'C', permissoes: ['ler', 'escrever', 'apagar'] }, 'apagar'], expected: true, hidden: true },
      { name: 'só uma permissão', args: [{ nome: 'D', permissoes: ['admin'] }, 'admin'], expected: true, hidden: true },
    ],
  },
  solution: {
    javascript: `function temPermissao(usuario, permissao) {
  for (let i = 0; i < usuario.permissoes.length; i++) {
    if (usuario.permissoes[i] === permissao) {
      return true;
    }
  }
  return false;
}`,
    python: `def tem_permissao(usuario, permissao):
    for p in usuario["permissoes"]:
        if p == permissao:
            return True
    return False`,
  },
  explanation: `
**Objeto que contém uma lista**
Primeiro leia a chave (usuario.permissoes) e depois percorra a lista, com o padrão de busca que você já conhece: return true ao achar, return false no fim.

**Na segurança:** controle de acesso baseado em permissões funciona assim. A regra de ouro é negar por padrão: se a permissão não está na lista, a resposta é false.
  `,
  hints: [
    'Percorra a lista usuario.permissoes (Python: usuario["permissoes"])',
    'Se um item for igual à permissão pedida, devolva true na hora',
    'Depois do loop, devolva false',
  ],
  difficulty: 'medium',
};

const theory6_8: TheoryChallenge = {
  id: 'obj.8',
  type: 'theory',
  episode: 6,
  room: '6.13',
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
  ex6_criar,
  code6_2,
  theory6_3,
  code6_4,
  code6_5,
  code6_6,
  ex6_buscar,
  ex6_saldos,
  theory6_cont,
  code6_7,
  ex6_perm,
  theory6_8,
];
