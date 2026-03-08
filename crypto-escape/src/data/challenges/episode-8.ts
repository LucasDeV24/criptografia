import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory8_0: TheoryChallenge = {
  id: '8.0',
  type: 'theory',
  episode: 8,
  room: '8.0',
  title: 'Episódio 8 — APIs REST e Autenticação',
  description: 'Como aplicações modernas se comunicam e protegem dados. Fundamento essencial para cibersegurança.',
  content: `
**O que é uma API?**
API (Application Programming Interface) é como aplicações conversam entre si.

**Exemplo do dia a dia:**
Você abre um app de clima:
1. App pede dados ao servidor: GET /api/clima?cidade=Sao_Paulo
2. Servidor responde: {"temp": 25, "condicao": "ensolarado"}
3. App mostra na tela

**REST API:**
Padrão mais usado. Usa verbos HTTP:
• GET = buscar dados
• POST = criar/enviar dados
• PUT = atualizar
• DELETE = apagar

**Autenticação em APIs:**
Como o servidor sabe quem você é?
• API Keys (chave fixa)
• Tokens (chave temporária)
• OAuth (login com Google/Facebook)

**Segurança:**
APIs mal protegidas = portas abertas para hackers!

Vamos aprender a testar e explorar APIs!
  `,
};

const code8_1: CodeChallenge = {
  id: '8.1',
  type: 'code',
  episode: 8,
  room: '8.1',
  title: 'Simulando uma requisição API',
  description: 'Veja como um cliente faz uma requisição GET para buscar dados de um usuário.',
  instructions: 'Execute e veja a requisição simulada',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Simulação de API REST

// Cliente faz requisição GET
const requisicao = {
  metodo: "GET",
  url: "/api/usuarios/123",
  headers: {
    "Content-Type": "application/json"
  }
};

console.log("📡 Requisição:");
console.log(requisicao.metodo + " " + requisicao.url);

// Servidor responde
const resposta = {
  status: 200,
  body: {
    id: 123,
    nome: "João Silva",
    email: "joao@email.com",
    role: "user"
  }
};

console.log("\\n✅ Resposta (Status " + resposta.status + "):");
console.log(JSON.stringify(resposta.body, null, 2));
`,
    python: `# Simulação de API REST

# Cliente faz requisição GET
requisicao = {
    "metodo": "GET",
    "url": "/api/usuarios/123",
    "headers": {
        "Content-Type": "application/json"
    }
}

print("📡 Requisição:")
print(f"{requisicao['metodo']} {requisicao['url']}")

# Servidor responde
resposta = {
    "status": 200,
    "body": {
        "id": 123,
        "nome": "João Silva",
        "email": "joao@email.com",
        "role": "user"
    }
}

import json
print(f"\\n✅ Resposta (Status {resposta['status']}):")
print(json.dumps(resposta["body"], indent=2, ensure_ascii=False))
`,
  },
  expectedOutput: '📡 Requisição:\nGET /api/usuarios/123\n\n✅ Resposta (Status 200):',
  explanation: `
**Comunicação básica de API:**

Cliente pede: "Me dê dados do usuário 123"
Servidor responde: Aqui está (JSON com os dados)

**Status codes importantes:**
• 200 = OK (sucesso)
• 401 = Não autorizado (sem login)
• 403 = Proibido (sem permissão)
• 404 = Não encontrado
• 500 = Erro do servidor
  `,
  hints: [
    'Esta é uma requisição normal e autorizada',
    'Status 200 = tudo funcionou corretamente',
  ],
  difficulty: 'easy',
};

const code8_2: CodeChallenge = {
  id: '8.2',
  type: 'code',
  episode: 8,
  room: '8.2',
  title: 'API sem autenticação (vulnerável)',
  description: 'Esta API NÃO exige autenticação. Qualquer um pode acessar dados de qualquer usuário! Teste mudando o ID.',
  instructions: 'Mude o ID de 1 para 999 e veja dados de outro usuário',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// API VULNERÁVEL - sem autenticação

const bancoDeDados = [
  { id: 1, nome: "João", email: "joao@email.com", role: "user" },
  { id: 999, nome: "Admin", email: "admin@empresa.com", role: "admin", senha: "super_secret" }
];

// MUDE o ID aqui:
const usuarioId = 1;

// API busca sem verificar quem está pedindo (VULNERÁVEL!)
const usuario = bancoDeDados.find(u => u.id === usuarioId);

console.log("📡 GET /api/usuarios/" + usuarioId);
console.log("\\n✅ Resposta:");
console.log(JSON.stringify(usuario, null, 2));
`,
    python: `# API VULNERÁVEL - sem autenticação

banco_de_dados = [
    {"id": 1, "nome": "João", "email": "joao@email.com", "role": "user"},
    {"id": 999, "nome": "Admin", "email": "admin@empresa.com", "role": "admin", "senha": "super_secret"}
]

# MUDE o ID aqui:
usuario_id = 1

# API busca sem verificar quem está pedindo (VULNERÁVEL!)
usuario = next((u for u in banco_de_dados if u["id"] == usuario_id), None)

import json
print(f"📡 GET /api/usuarios/{usuario_id}")
print("\\n✅ Resposta:")
print(json.dumps(usuario, indent=2, ensure_ascii=False))
`,
  },
  expectedOutput: '{"id": 999, "nome": "Admin", "email": "admin@empresa.com", "role": "admin", "senha": "super_secret"}',
  explanation: `
**VULNERABILIDADE GRAVE!**

Você conseguiu acessar dados de ADMIN (incluindo senha!) apenas mudando o ID na URL.

**No mundo real:**
Isso se chama IDOR (Insecure Direct Object Reference).
Aconteceu com:
• Instagram (2019) - dados de celebridades expostos
• Facebook (2018) - 50 milhões de contas
• Várias empresas brasileiras

**Defesa:**
• Sempre verificar autenticação
• Validar que usuário tem permissão para acessar aquele ID
• Não confiar em parâmetros do cliente
  `,
  hints: [
    'Troque "1" por "999" na linha do usuarioId',
    'Você verá dados sensíveis do admin!',
  ],
  difficulty: 'easy',
};

const theory8_3: TheoryChallenge = {
  id: '8.3',
  type: 'theory',
  episode: 8,
  room: '8.3',
  title: 'Tokens de autenticação',
  description: 'Como APIs modernas protegem endpoints usando tokens.',
  content: `
**Como funciona token auth:**

**1. Login:**
Cliente: POST /api/login {email, senha}
Servidor: {token: "abc123xyz789..."}

**2. Requisições seguintes:**
Cliente envia token no header:
GET /api/dados
Authorization: Bearer abc123xyz789...

**3. Servidor valida:**
Token válido? → Retorna dados
Token inválido/expirado? → 401 Unauthorized

**Tipos de token:**
• **Session tokens:** Guardados no servidor
• **JWT:** Auto-contidos (explicamos no Episódio 9)
• **API Keys:** Fixas, para integrações

**Ataques comuns:**
• Token theft (roubo via XSS)
• Token replay (reusar token roubado)
• Weak token generation (tokens previsíveis)

**Próxima sala:** Explorar API com token fraco!
  `,
};

const code8_4: CodeChallenge = {
  id: '8.4',
  type: 'code',
  episode: 8,
  room: '8.4',
  title: 'Descobrindo token fraco',
  description: 'Esta API usa tokens... mas eles são PREVISÍVEIS! Tokens são apenas números sequenciais. Descubra o padrão e acesse dados de outro usuário.',
  instructions: 'Execute e veja o padrão dos tokens',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Sistema com tokens fracos (VULNERÁVEL)

const sessoes = [
  { userId: 1, token: "TOKEN_1001", nome: "João" },
  { userId: 2, token: "TOKEN_1002", nome: "Maria" },
  { userId: 3, token: "TOKEN_1003", nome: "Admin" }
];

// Seu token (usuário João, id=1)
const meuToken = "TOKEN_1001";

console.log("🔐 Meu token: " + meuToken);
console.log("📊 Meus dados:");
let minhaSessao = sessoes.find(s => s.token === meuToken);
console.log(minhaSessao);

// ATAQUE: tokens são previsíveis!
console.log("\\n🚨 Testando token do Admin...");
const tokenAdivinhado = "TOKEN_1003";

let sessaoAdmin = sessoes.find(s => s.token === tokenAdivinhado);
console.log("✅ Acessei dados do: " + sessaoAdmin.nome);
`,
    python: `# Sistema com tokens fracos (VULNERÁVEL)

sessoes = [
    {"userId": 1, "token": "TOKEN_1001", "nome": "João"},
    {"userId": 2, "token": "TOKEN_1002", "nome": "Maria"},
    {"userId": 3, "token": "TOKEN_1003", "nome": "Admin"}
]

# Seu token (usuário João, id=1)
meu_token = "TOKEN_1001"

print(f"🔐 Meu token: {meu_token}")
print("📊 Meus dados:")
minha_sessao = next(s for s in sessoes if s["token"] == meu_token)
print(minha_sessao)

# ATAQUE: tokens são previsíveis!
print("\\n🚨 Testando token do Admin...")
token_adivinhado = "TOKEN_1003"

sessao_admin = next(s for s in sessoes if s["token"] == token_adivinhado)
print(f"✅ Acessei dados do: {sessao_admin['nome']}")
`,
  },
  expectedOutput: '✅ Acessei dados do: Admin',
  explanation: `
**FALHA DE SEGURANÇA!**

Tokens previsíveis permitem:
1. Descobrir o padrão (TOKEN_1001, 1002, 1003...)
2. Gerar tokens de outros usuários
3. Sequestrar sessões

**Tokens seguros devem ser:**
• Aleatórios (UUID, random bytes)
• Longos (128+ bits)
• Únicos
• Imprevisíveis

**Exemplo de token seguro:**
\`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIx...\`

**Ferramentas de teste:**
• Burp Suite Sequencer (testa aleatoriedade)
• Postman (testar APIs)
  `,
  hints: [
    'O código já mostra o ataque - tokens são sequenciais',
    'TOKEN_1001, 1002, 1003... muito fácil de adivinhar!',
  ],
  difficulty: 'easy',
};

const theory8_5: TheoryChallenge = {
  id: '8.5',
  type: 'theory',
  episode: 8,
  room: '8.5',
  title: 'Episódio 8 completo!',
  description: 'Você entende como APIs modernas funcionam e seus pontos fracos!',
  content: `
**Habilidades desbloqueadas:**
✅ APIs REST (GET, POST, PUT, DELETE)
✅ IDOR (Insecure Direct Object Reference)
✅ Autenticação com tokens
✅ Identificação de tokens fracos

**Vulnerabilidades de API (OWASP API Top 10):**
1. Broken Object Level Authorization (IDOR)
2. Broken Authentication
3. Excessive Data Exposure
4. Lack of Resources & Rate Limiting
5. Broken Function Level Authorization

**Carreira:**
• **API Security Specialist:** Foco em proteger APIs
• **Pentester API:** Testa vulnerabilidades
• **DevSecOps:** Integra segurança no desenvolvimento

**Ferramentas:**
• Postman (testar APIs)
• Burp Suite (interceptar)
• OWASP ZAP (scanner)

**Próximo episódio:**
JWT Tokens - como funcionam, como quebrar e como sequestrar sessões!

APIs são o futuro - dominar isso = mercado garantido! 🚀
  `,
};

export const episode8Challenges: Challenge[] = [
  theory8_0,
  code8_1,
  code8_2,
  theory8_3,
  code8_4,
  theory8_5,
];
