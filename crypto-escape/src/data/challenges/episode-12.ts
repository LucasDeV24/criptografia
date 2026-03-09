import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory12_0: TheoryChallenge = {
  id: '12.0',
  type: 'theory',
  episode: 12,
  room: '12.0',
  title: 'Episódio 12 — PROJETO FINAL: SOC Analyst Challenge',
  description: 'Bem-vindo ao desafio final! Você vai investigar um incidente real de segurança usando todas as habilidades aprendidas.',
  content: `
**CENÁRIO:**

Você é um SOC Analyst da empresa TechCorp.
Às 14:30 de hoje, o sistema de alerta detectou atividade suspeita.

**Alertas recebidos:**
🚨 Múltiplas tentativas de login falhadas
🚨 Tráfego HTTP suspeito detectado
🚨 Upload anômalo de dados
🚨 Conexão com IP em blacklist

**Sua missão:**
Analisar logs, tráfego de rede e identificar:
1. Qual usuário foi comprometido?
2. Que tipo de ataque foi usado?
3. O atacante conseguiu roubar dados?
4. Quais ações devem ser tomadas?

**Habilidades necessárias:**
✅ Análise de logs (Episódio 6)
✅ Detecção de vulnerabilidades (Episódios 4, 5)
✅ Network analysis (Episódio 11)
✅ Pensamento crítico

**Você tem 6 salas para completar a investigação.**

Boa sorte, Analista! 🔍
  `,
};

const code12_1: CodeChallenge = {
  id: '12.1',
  type: 'code',
  episode: 12,
  room: '12.1',
  title: 'Fase 1: Análise de Logs de Autenticação',
  description: 'Analise os logs de login e identifique qual conta foi comprometida.',
  instructions: 'Execute e encontre a conta comprometida',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Logs de autenticação das últimas 2 horas
const logs = [
  "14:15 - LOGIN SUCCESS - user: carlos - IP: 192.168.1.50",
  "14:20 - LOGIN FAILED - user: admin - IP: 203.0.113.45",
  "14:20 - LOGIN FAILED - user: admin - IP: 203.0.113.45",
  "14:21 - LOGIN FAILED - user: admin - IP: 203.0.113.45",
  "14:22 - LOGIN FAILED - user: root - IP: 203.0.113.45",
  "14:25 - LOGIN FAILED - user: maria - IP: 203.0.113.45",
  "14:26 - LOGIN FAILED - user: maria - IP: 203.0.113.45",
  "14:27 - LOGIN FAILED - user: maria - IP: 203.0.113.45",
  "14:28 - LOGIN FAILED - user: maria - IP: 203.0.113.45",
  "14:29 - LOGIN SUCCESS - user: maria - IP: 203.0.113.45",
  "14:35 - LOGIN SUCCESS - user: joao - IP: 192.168.1.60"
];

console.log("=== INVESTIGAÇÃO: Análise de Logs ===\\n");

// Analisar padrões
const falhasPorUsuario = {};
let loginSuspeito = null;

for (let i = 0; i < logs.length; i++) {
  const log = logs[i];
  
  if (log.includes("LOGIN FAILED")) {
    const user = log.split("user: ")[1].split(" -")[0];
    falhasPorUsuario[user] = (falhasPorUsuario[user] || 0) + 1;
  }
  
  // Login bem-sucedido após múltiplas falhas = suspeito
  if (log.includes("LOGIN SUCCESS") && log.includes("203.0.113.45")) {
    loginSuspeito = log;
  }
}

console.log("Falhas por usuário:");
for (let user in falhasPorUsuario) {
  console.log(\`  \${user}: \${falhasPorUsuario[user]} tentativas falhadas\`);
}

console.log("\\n🚨 DESCOBERTA:");
if (loginSuspeito) {
  console.log("Conta comprometida: maria");
  console.log("IP atacante: 203.0.113.45");
  console.log("Método: Força bruta (4 falhas → sucesso)");
  console.log("Hora do comprometimento: 14:29");
}
`,
    python: `# Logs de autenticação das últimas 2 horas
logs = [
    "14:15 - LOGIN SUCCESS - user: carlos - IP: 192.168.1.50",
    "14:20 - LOGIN FAILED - user: admin - IP: 203.0.113.45",
    "14:20 - LOGIN FAILED - user: admin - IP: 203.0.113.45",
    "14:21 - LOGIN FAILED - user: admin - IP: 203.0.113.45",
    "14:22 - LOGIN FAILED - user: root - IP: 203.0.113.45",
    "14:25 - LOGIN FAILED - user: maria - IP: 203.0.113.45",
    "14:26 - LOGIN FAILED - user: maria - IP: 203.0.113.45",
    "14:27 - LOGIN FAILED - user: maria - IP: 203.0.113.45",
    "14:28 - LOGIN FAILED - user: maria - IP: 203.0.113.45",
    "14:29 - LOGIN SUCCESS - user: maria - IP: 203.0.113.45",
    "14:35 - LOGIN SUCCESS - user: joao - IP: 192.168.1.60"
]

print("=== INVESTIGAÇÃO: Análise de Logs ===\\n")

# Analisar padrões
falhas_por_usuario = {}
login_suspeito = None

for log in logs:
    if "LOGIN FAILED" in log:
        user = log.split("user: ")[1].split(" -")[0]
        falhas_por_usuario[user] = falhas_por_usuario.get(user, 0) + 1
    
    # Login bem-sucedido após múltiplas falhas = suspeito
    if "LOGIN SUCCESS" in log and "203.0.113.45" in log:
        login_suspeito = log

print("Falhas por usuário:")
for user, falhas in falhas_por_usuario.items():
    print(f"  {user}: {falhas} tentativas falhadas")

print("\\n🚨 DESCOBERTA:")
if login_suspeito:
    print("Conta comprometida: maria")
    print("IP atacante: 203.0.113.45")
    print("Método: Força bruta (4 falhas → sucesso)")
    print("Hora do comprometimento: 14:29")
`,
  },
  expectedOutput: 'Conta comprometida: maria',
  explanation: `
**Primeira descoberta!**

**Conclusão:**
• Atacante fez força bruta de múltiplas contas
• Conseguiu acessar conta da usuária "maria" às 14:29
• IP atacante: 203.0.113.45

**Próximas etapas:**
Investigar o que o atacante FEZ após obter acesso.
  `,
  hints: [
    'Procure login bem-sucedido do IP suspeito',
    'maria teve 4 falhas seguidas de 1 sucesso',
  ],
  difficulty: 'medium',
};

const code12_2: CodeChallenge = {
  id: '12.2',
  type: 'code',
  episode: 12,
  room: '12.2',
  title: 'Fase 2: Análise de Tráfego Web',
  description: 'Após obter acesso, o que o atacante fez? Analise requisições HTTP da conta comprometida.',
  instructions: 'Execute e identifique o ataque',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Requisições web da conta "maria" após 14:29
const requisicoes = [
  "14:30 - GET /dashboard - 200 OK",
  "14:31 - GET /perfil - 200 OK",
  "14:32 - GET /api/usuarios - 403 FORBIDDEN",
  "14:33 - GET /api/usuarios/1 - 200 OK - {id:1, nome:'Carlos', role:'user'}",
  "14:34 - GET /api/usuarios/2 - 200 OK - {id:2, nome:'Maria', role:'user'}",
  "14:35 - GET /api/usuarios/999 - 200 OK - {id:999, nome:'Admin', senha:'***'}",
  "14:36 - POST /api/admin/backup - 200 OK"
];

// Analise as requisições e detecte dois tipos de ataque:
// 1. IDOR: acesso a /api/usuarios/999 com 200 OK (dados de outro usuário)
// 2. Escalação de privilégio: acesso a /api/admin/ com 200 OK
//
// Percorra as requisições e use variáveis boolean para rastrear:
//   - Se alguma req contém "/api/usuarios/999" e "200 OK" → IDOR
//   - Se alguma req contém "/api/admin/" e "200 OK" → Escalação
//
// No final, imprima as descobertas:
//   Se IDOR: "✓ IDOR explorado - acessou dados do Admin (id=999)"
//   Se Escalação: "✓ Escalação de privilégio - acessou endpoint /admin/"
`,
    python: `# Requisições web da conta "maria" após 14:29
requisicoes = [
    "14:30 - GET /dashboard - 200 OK",
    "14:31 - GET /perfil - 200 OK",
    "14:32 - GET /api/usuarios - 403 FORBIDDEN",
    "14:33 - GET /api/usuarios/1 - 200 OK - {id:1, nome:'Carlos', role:'user'}",
    "14:34 - GET /api/usuarios/2 - 200 OK - {id:2, nome:'Maria', role:'user'}",
    "14:35 - GET /api/usuarios/999 - 200 OK - {id:999, nome:'Admin', senha:'***'}",
    "14:36 - POST /api/admin/backup - 200 OK"
]

# Analise as requisições e detecte dois tipos de ataque:
# 1. IDOR: acesso a /api/usuarios/999 com 200 OK (dados de outro usuário)
# 2. Escalação de privilégio: acesso a /api/admin/ com 200 OK
#
# Percorra as requisições e use variáveis boolean para rastrear:
#   - Se alguma req contém "/api/usuarios/999" e "200 OK" → IDOR
#   - Se alguma req contém "/api/admin/" e "200 OK" → Escalação
#
# No final, imprima as descobertas:
#   Se IDOR: "✓ IDOR explorado - acessou dados do Admin (id=999)"
#   Se Escalação: "✓ Escalação de privilégio - acessou endpoint /admin/"
`,
  },
  expectedOutput: '✓ IDOR explorado\n✓ Escalação de privilégio',
  explanation: `
**Vulnerabilidades exploradas:**

**1. IDOR (Insecure Direct Object Reference):**
Atacante testou IDs: 1, 2, 999
API não validou permissões → retornou dados do Admin!

**2. Escalação de privilégio:**
Conta "maria" é usuário comum, mas conseguiu acessar /api/admin/backup
Sistema não validou role!

**Gravidade:** CRÍTICA
O atacante iniciou um backup não autorizado.
  `,
  hints: [
    'Crie let idor = false e let escalacao = false antes do loop',
    'Use .includes() para verificar strings dentro de cada requisição',
    'IDOR: req contém "/api/usuarios/999" E "200 OK"',
    'Escalação: req contém "/api/admin/" E "200 OK"',
  ],
  difficulty: 'medium',
};

const code12_3: CodeChallenge = {
  id: '12.3',
  type: 'code',
  episode: 12,
  room: '12.3',
  title: 'Fase 3: Análise de Tráfego de Rede',
  description: 'O backup foi enviado para onde? Analise tráfego de saída.',
  instructions: 'Execute e descubra o destino dos dados',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Tráfego de rede após 14:36
const conexoes = [
  { time: "14:36", src: "192.168.1.100", dst: "203.0.113.45", bytes: 1024, protocol: "HTTPS" },
  { time: "14:37", src: "192.168.1.100", dst: "203.0.113.45", bytes: 52428800, protocol: "HTTPS" },
  { time: "14:38", src: "192.168.1.100", dst: "203.0.113.45", bytes: 1024, protocol: "HTTPS" }
];

// Analise o tráfego de rede e detecte exfiltração de dados:
// 1. Percorra as conexões e some o total de bytes transferidos
// 2. Converta bytes para MB: bytes / 1024 / 1024
// 3. Se o total for > 10 MB, é exfiltração!
// 4. Verifique se o destino (dst) é o IP do atacante (203.0.113.45)
//
// Imprima as descobertas:
//   "✓ EXFILTRAÇÃO DE DADOS CONFIRMADA"
//   Inclua o total de MB e o IP de destino
`,
    python: `# Tráfego de rede após 14:36
conexoes = [
    {"time": "14:36", "src": "192.168.1.100", "dst": "203.0.113.45", "bytes": 1024, "protocol": "HTTPS"},
    {"time": "14:37", "src": "192.168.1.100", "dst": "203.0.113.45", "bytes": 52428800, "protocol": "HTTPS"},
    {"time": "14:38", "src": "192.168.1.100", "dst": "203.0.113.45", "bytes": 1024, "protocol": "HTTPS"}
]

# Analise o tráfego de rede e detecte exfiltração de dados:
# 1. Percorra as conexões e some o total de bytes transferidos
# 2. Converta bytes para MB: bytes / 1024 / 1024
# 3. Se o total for > 10 MB, é exfiltração!
# 4. Verifique se o destino (dst) é o IP do atacante (203.0.113.45)
#
# Imprima as descobertas:
#   "✓ EXFILTRAÇÃO DE DADOS CONFIRMADA"
#   Inclua o total de MB e o IP de destino
`,
  },
  expectedOutput: 'EXFILTRAÇÃO DE DADOS CONFIRMADA',
  explanation: `
**DATA BREACH!**

50 MB de dados foram roubados!

**Timeline completo:**
14:29 - Conta comprometida (força bruta)
14:35 - IDOR para obter credenciais admin
14:36 - Escalação → backup não autorizado
14:37 - Exfiltração → 50 MB enviados para atacante

**Dados roubados podem conter:**
• Informações de clientes
• CPFs, emails, senhas
• Dados financeiros

**Gravidade:** CRÍTICA - Data Breach confirmado
  `,
  hints: [
    'Inicialize totalBytes = 0 e some c.bytes de cada conexão',
    '52428800 bytes ÷ 1024 ÷ 1024 = 50 MB - isso é muito!',
    'O destino 203.0.113.45 é o mesmo IP que fez o ataque de força bruta',
    'Imprima "✓ EXFILTRAÇÃO DE DADOS CONFIRMADA" na conclusão',
  ],
  difficulty: 'medium',
};

const code12_4: CodeChallenge = {
  id: '12.4',
  type: 'code',
  episode: 12,
  room: '12.4',
  title: 'Fase 4: Relatório de Incidente',
  description: 'Compile todas as descobertas em um relatório profissional.',
  instructions: 'Execute para gerar o relatório final',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Dados da investigação que você descobriu nas fases anteriores:
const incidente = {
  data: "2026-03-07",
  horaDeteccao: "14:30",
  ipAtacante: "203.0.113.45",
  contaComprometida: "maria",
  metodoInicial: "Força bruta",
  vulnerabilidades: ["IDOR em /api/usuarios/", "Falta de validação de role", "Sem rate limiting", "Sem DLP"],
  dadosRoubados: "50 MB",
  timeline: [
    "14:20-14:28 | Força bruta em múltiplas contas",
    "14:29      | Compromisso da conta 'maria'",
    "14:35      | IDOR → Dados de admin obtidos",
    "14:36      | Escalação → Backup não autorizado",
    "14:37      | Exfiltração de 50 MB de dados"
  ]
};

// Monte um relatório profissional de incidente de segurança!
// Use os dados do objeto 'incidente' para preencher cada seção.
//
// Seções obrigatórias:
// 1. Cabeçalho com data, hora e gravidade
// 2. Timeline do ataque (percorra incidente.timeline)
// 3. IOCs: IP atacante, conta comprometida, vulnerabilidades exploradas
//    (percorra incidente.vulnerabilidades com um loop)
// 4. Pelo menos 3 ações recomendadas
// 5. No final, imprima: "Relatório gerado com sucesso!"
`,
    python: `# Dados da investigação que você descobriu nas fases anteriores:
incidente = {
    "data": "2026-03-07",
    "hora_deteccao": "14:30",
    "ip_atacante": "203.0.113.45",
    "conta_comprometida": "maria",
    "metodo_inicial": "Força bruta",
    "vulnerabilidades": ["IDOR em /api/usuarios/", "Falta de validação de role", "Sem rate limiting", "Sem DLP"],
    "dados_roubados": "50 MB",
    "timeline": [
        "14:20-14:28 | Força bruta em múltiplas contas",
        "14:29      | Compromisso da conta 'maria'",
        "14:35      | IDOR → Dados de admin obtidos",
        "14:36      | Escalação → Backup não autorizado",
        "14:37      | Exfiltração de 50 MB de dados"
    ]
}

# Monte um relatório profissional de incidente de segurança!
# Use os dados do dicionário 'incidente' para preencher cada seção.
#
# Seções obrigatórias:
# 1. Cabeçalho com data, hora e gravidade
# 2. Timeline do ataque (percorra incidente["timeline"])
# 3. IOCs: IP atacante, conta comprometida, vulnerabilidades exploradas
#    (percorra incidente["vulnerabilidades"] com um loop)
# 4. Pelo menos 3 ações recomendadas
# 5. No final, imprima: "Relatório gerado com sucesso!"
`,
  },
  expectedOutput: 'Relatório gerado com sucesso!',
  explanation: `
**Relatório profissional criado!**

Você acabou de fazer o que SOC Analysts fazem diariamente:
1. Detectar anomalias
2. Investigar incidentes
3. Identificar IOCs
4. Recomendar ações
5. Documentar tudo

**No mundo real:**
Este relatório seria enviado para:
• CISO (Chief Information Security Officer)
• Time de desenvolvimento
• Jurídico (LGPD/GDPR)
• Eventualmente autoridades
  `,
  hints: [
    'Use console.log/print para cada seção do relatório',
    'Percorra incidente.timeline com um loop para imprimir cada evento',
    'Percorra incidente.vulnerabilidades com um loop para listar cada uma',
    'Termine com: "Relatório gerado com sucesso!"',
  ],
  difficulty: 'easy',
};

const theory12_5: TheoryChallenge = {
  id: '12.5',
  type: 'theory',
  episode: 12,
  room: '12.5',
  title: '🎓 PARABÉNS - VOCÊ COMPLETOU O CRYPTO ESCAPE!',
  description: 'Você não é mais um iniciante. Você agora tem conhecimento intermediário de cibersegurança!',
  content: `
**🏆 CONQUISTAS DESBLOQUEADAS:**

✅ Programação (JavaScript/Python básico)
✅ Criptografia (Caesar, Hash, Base64)
✅ Vulnerabilidades Web (XSS, SQLi, IDOR)
✅ Análise de Logs e SIEM
✅ Força Bruta e Wordlists
✅ APIs e Autenticação (JWT)
✅ Session Hijacking
✅ Esteganografia
✅ Network Analysis
✅ Incident Response

**💼 VOCÊ ESTÁ PRONTO PARA:**

**Vagas de entrada:**
• SOC Analyst Jr (R$ 3.000 - R$ 6.000)
• Security Analyst Jr
• IT Security Support

**Com estudo adicional:**
• Pentester Jr
• Bug Bounty Hunter
• DevSecOps Jr

**📜 CERTIFICAÇÕES RECOMENDADAS:**

**Nível entry:**
• CompTIA Security+ ($392)
• Certified Ethical Hacker (CEH) v12 ($1,199)
• Google Cybersecurity Professional Certificate (Coursera)

**Próximo nível:**
• eJPT (eLearnSecurity Junior Penetration Tester)
• OSCP (Offensive Security Certified Professional)

**🚀 PRÓXIMOS PASSOS:**

1. **Praticar:**
   • HackTheBox (plataforma de labs)
   • TryHackMe (guiado para iniciantes)
   • OverTheWire (desafios)
   • PentesterLab

2. **Aprofundar:**
   • Wireshark
   • Burp Suite
   • Metasploit
   • Python para hacking

3. **Comunidade:**
   • Reddit: r/cybersecurity, r/netsec
   • Discord: servidores de CTF
   • Twitter: siga profissionais da área

4. **Bug Bounty:**
   • HackerOne
   • Bugcrowd
   • Intigriti
   Ganhe dinheiro encontrando bugs!

**💰 MERCADO:**

Cibersegurança é uma das áreas com MAIS vagas e MENOS profissionais.

Demanda global: 3.5 MILHÕES de vagas não preenchidas!

No Brasil: crescimento de 30% ao ano.

**📢 MENSAGEM FINAL:**

Você começou sem saber nada de programação ou segurança.
Agora você entende conceitos que 90% das pessoas não entendem.

Continue estudando, praticando e hackeando (eticamente)!

O mundo precisa de hackers do bem como você! 🔐

**Obrigado por jogar Crypto Escape!**
Desenvolvido por Lucas com IA (Claude Sonnet 4.5) 🤖
  `,
};

export const episode12Challenges: Challenge[] = [
  theory12_0,
  code12_1,
  code12_2,
  code12_3,
  code12_4,
  theory12_5,
];
