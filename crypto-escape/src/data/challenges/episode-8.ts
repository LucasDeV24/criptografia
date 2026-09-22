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

**Ferramentas novas neste episódio**
• **\`import json\` (Python):** o módulo \`json\` converte entre objetos e texto JSON. \`json.dumps(objeto)\` transforma um dicionário em texto JSON; \`json.loads(texto)\` faz o caminho inverso. Como todo módulo do Python, ele precisa ser importado no topo do código.
• **No JavaScript**, \`JSON.stringify(objeto)\` e \`JSON.parse(texto)\` fazem o mesmo, sem precisar de import.
• **\`.find()\` e a seta \`=>\` (JavaScript):** \`lista.find(item => item.id === 2)\` devolve o primeiro item que passa no teste. A seta \`item => ...\` é uma função curta: \`item\` é cada elemento da lista e o que vem depois é o teste. No Python, use um \`for\` com \`if\`.
  `,
};

const code8_1: CodeChallenge = {
  id: '8.1',
  type: 'code',
  episode: 8,
  room: '8.1',
  title: 'Traduzindo status codes',
  description: 'Toda resposta de API vem com um status code — um número que diz o que aconteceu. Escreva a função que traduz esses números.',
  instructions: 'Complete classificarStatus(status): devolva a descrição certa para 200, 401, 403, 404 e 500. Para qualquer outro número, devolva "Código desconhecido".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function classificarStatus(status) {
  // Use if/else (ou um objeto de consulta) para mapear:
  // 200 -> "OK (sucesso)"
  // 401 -> "Não autorizado (sem login)"
  // 403 -> "Proibido (sem permissão)"
  // 404 -> "Não encontrado"
  // 500 -> "Erro do servidor"
  // qualquer outro -> "Código desconhecido"
}
`,
    python: `def classificar_status(status):
    # Use if/elif/else (ou um dicionário de consulta) para mapear:
    # 200 -> "OK (sucesso)"
    # 401 -> "Não autorizado (sem login)"
    # 403 -> "Proibido (sem permissão)"
    # 404 -> "Não encontrado"
    # 500 -> "Erro do servidor"
    # qualquer outro -> "Código desconhecido"
    pass
`,
  },
  tests: {
    fn: { javascript: 'classificarStatus', python: 'classificar_status' },
    cases: [
      { name: '200', args: [200], expected: 'OK (sucesso)' },
      { name: '401', args: [401], expected: 'Não autorizado (sem login)' },
      { name: '404', args: [404], expected: 'Não encontrado', hidden: true },
      { name: 'código não mapeado', args: [999], expected: 'Código desconhecido', hidden: true },
    ],
  },
  solution: {
    javascript: `function classificarStatus(status) {
  if (status === 200) return "OK (sucesso)";
  if (status === 401) return "Não autorizado (sem login)";
  if (status === 403) return "Proibido (sem permissão)";
  if (status === 404) return "Não encontrado";
  if (status === 500) return "Erro do servidor";
  return "Código desconhecido";
}`,
    python: `def classificar_status(status):
    if status == 200:
        return "OK (sucesso)"
    if status == 401:
        return "Não autorizado (sem login)"
    if status == 403:
        return "Proibido (sem permissão)"
    if status == 404:
        return "Não encontrado"
    if status == 500:
        return "Erro do servidor"
    return "Código desconhecido"`,
  },
  explanation: `
**Comunicação básica de API:**
Cliente pede dados, servidor responde com um corpo (geralmente JSON) E um status code — o número que diz, de forma padronizada, o que aconteceu.

**Por que "Código desconhecido" importa:** APIs reais usam dezenas de status codes (201, 204, 429, 503...). Uma função que só soubesse os 5 mais comuns e quebrasse com qualquer outro seria frágil — o caso padrão evita isso.
  `,
  hints: [
    'Uma sequência de if (sem else) com return dentro de cada um já resolve, sem precisar de elif/else if',
    'O return final, fora de qualquer if, cobre todos os códigos que não bateram em nenhuma comparação',
    '999 não está na lista — deve cair no "Código desconhecido"',
  ],
  difficulty: 'easy',
};

const code8_2: CodeChallenge = {
  id: '8.2',
  type: 'code',
  episode: 8,
  room: '8.2',
  title: 'API sem autenticação (vulnerável)',
  description: 'Esta API NÃO exige autenticação: qualquer ID retorna os dados daquele usuário, sem checar quem está pedindo.',
  instructions: 'Complete buscarUsuarioPorId(bancoDeDados, id): devolva o usuário com esse id, ou null se não existir. Não faça NENHUMA checagem de permissão — é exatamente esse o ponto da vulnerabilidade.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function buscarUsuarioPorId(bancoDeDados, id) {
  // Use bancoDeDados.find() para buscar o usuário com esse id
  // Se não encontrar, devolva null
}
`,
    python: `def buscar_usuario_por_id(banco_de_dados, id):
    # Percorra banco_de_dados com um for e compare o id de cada item
    # Se encontrar, devolva o usuário
    # Se terminar o loop sem achar, devolva None
    pass
`,
  },
  tests: {
    fn: { javascript: 'buscarUsuarioPorId', python: 'buscar_usuario_por_id' },
    cases: [
      {
        name: 'acessa o Admin sem estar logado como ele',
        args: [[
          { id: 1, nome: 'João', email: 'joao@email.com', role: 'user' },
          { id: 999, nome: 'Admin', email: 'admin@empresa.com', role: 'admin', senha: 'super_secret' },
        ], 999],
        expected: { id: 999, nome: 'Admin', email: 'admin@empresa.com', role: 'admin', senha: 'super_secret' },
      },
      {
        name: 'acessa o usuário comum',
        args: [[
          { id: 1, nome: 'João', email: 'joao@email.com', role: 'user' },
          { id: 999, nome: 'Admin', email: 'admin@empresa.com', role: 'admin', senha: 'super_secret' },
        ], 1],
        expected: { id: 1, nome: 'João', email: 'joao@email.com', role: 'user' },
      },
      { name: 'id que não existe', args: [[{ id: 1, nome: 'João' }], 42], expected: null, hidden: true },
      { name: 'banco vazio', args: [[], 1], expected: null, hidden: true },
    ],
  },
  solution: {
    javascript: `function buscarUsuarioPorId(bancoDeDados, id) {
  return bancoDeDados.find(u => u.id === id) ?? null;
}`,
    python: `def buscar_usuario_por_id(banco_de_dados, id):
    for u in banco_de_dados:
        if u["id"] == id:
            return u
    return None`,
  },
  explanation: `
**VULNERABILIDADE GRAVE!**

A função conseguiu acessar dados de ADMIN (incluindo senha!) apenas trocando o id — sem NENHUMA verificação de quem está pedindo.

**No mundo real:**
Isso se chama IDOR (Insecure Direct Object Reference). Já aconteceu com Instagram (2019, dados de celebridades expostos) e Facebook (2018, 50 milhões de contas), entre várias outras empresas.

**Defesa:**
• Sempre verificar autenticação
• Validar que o usuário logado tem permissão para acessar aquele ID específico
• Nunca confiar em parâmetros vindos do cliente
  `,
  hints: [
    'JavaScript: bancoDeDados.find(u => u.id === id) ?? null',
    'Python: um for comparando u["id"] == id, com return None depois do loop',
    'A função em si não julga se o pedido é "certo" — isso é exatamente o problema que a IDOR explora',
  ],
  difficulty: 'medium',
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
  title: 'Explorando um token fraco',
  description: 'Esta API usa tokens... mas eles são PREVISÍVEIS! Em vez de testar um token de cada vez na mão, escreva uma função que PREVÊ o token de qualquer usuário a partir do padrão e o usa.',
  instructions: 'Complete explorarTokenFraco(sessoes, userIdAlvo): monte o token previsto como "TOKEN_" + (1000 + userIdAlvo), procure uma sessão com esse token, e devolva "✅ Acessei dados do: " + nome. Se não achar, devolva "Token não encontrado".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function explorarTokenFraco(sessoes, userIdAlvo) {
  // Monte o token previsto: "TOKEN_" + (1000 + userIdAlvo)
  // Use sessoes.find() para procurar uma sessão com esse token
  // Se achou, devolva "✅ Acessei dados do: " + o nome dela
  // Se não achou, devolva "Token não encontrado"
}
`,
    python: `def explorar_token_fraco(sessoes, user_id_alvo):
    # Monte o token previsto: "TOKEN_" + str(1000 + user_id_alvo)
    # Percorra sessoes procurando uma com esse token
    # Se achou, devolva "✅ Acessei dados do: " + o nome dela
    # Se não achou, devolva "Token não encontrado"
    pass
`,
  },
  tests: {
    fn: { javascript: 'explorarTokenFraco', python: 'explorar_token_fraco' },
    cases: [
      {
        name: 'acessa o Admin (userId 3)',
        args: [[
          { userId: 1, token: 'TOKEN_1001', nome: 'João' },
          { userId: 2, token: 'TOKEN_1002', nome: 'Maria' },
          { userId: 3, token: 'TOKEN_1003', nome: 'Admin' },
        ], 3],
        expected: '✅ Acessei dados do: Admin',
      },
      {
        name: 'acessa outro usuário (userId 2)',
        args: [[
          { userId: 1, token: 'TOKEN_1001', nome: 'João' },
          { userId: 2, token: 'TOKEN_1002', nome: 'Maria' },
          { userId: 3, token: 'TOKEN_1003', nome: 'Admin' },
        ], 2],
        expected: '✅ Acessei dados do: Maria',
      },
      {
        name: 'userId sem sessão correspondente',
        args: [[{ userId: 1, token: 'TOKEN_1001', nome: 'João' }], 99],
        expected: 'Token não encontrado',
        hidden: true,
      },
    ],
  },
  solution: {
    javascript: `function explorarTokenFraco(sessoes, userIdAlvo) {
  const token = "TOKEN_" + (1000 + userIdAlvo);
  const sessao = sessoes.find(s => s.token === token);
  return sessao ? "✅ Acessei dados do: " + sessao.nome : "Token não encontrado";
}`,
    python: `def explorar_token_fraco(sessoes, user_id_alvo):
    token = "TOKEN_" + str(1000 + user_id_alvo)
    for s in sessoes:
        if s["token"] == token:
            return f"✅ Acessei dados do: {s['nome']}"
    return "Token não encontrado"`,
  },
  explanation: `
**FALHA DE SEGURANÇA!**

Como os tokens seguem um padrão sequencial (TOKEN_1001, 1002, 1003...), sua função não precisou "adivinhar" nada na mão — ela CALCULA o token de qualquer userId e testa. É exatamente assim que um script de ataque automatizaria isso contra milhares de contas.

**Tokens seguros devem ser:**
• Aleatórios (UUID, random bytes)
• Longos (128+ bits)
• Únicos e imprevisíveis

**Exemplo de token seguro:**
\`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIx...\`

**Ferramentas de teste:**
• Burp Suite Sequencer (testa aleatoriedade de tokens)
• Postman (testar APIs manualmente)
  `,
  hints: [
    '"TOKEN_" + (1000 + userIdAlvo) monta o token previsto (Python: "TOKEN_" + str(1000 + user_id_alvo))',
    'sessoes.find(s => s.token === token) (Python: for comparando s["token"] == token)',
    'Se nenhuma sessão tiver esse token, devolva "Token não encontrado" em vez de quebrar',
  ],
  difficulty: 'medium',
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
