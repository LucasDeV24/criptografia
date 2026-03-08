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

console.log("=== INVESTIGAÇÃO: Requisições Web ===\\n");

let idor = false;
let escalacao = false;

for (let i = 0; i < requisicoes.length; i++) {
  const req = requisicoes[i];
  console.log(req);
  
  // Detectar IDOR
  if (req.includes("/api/usuarios/999") && req.includes("200 OK")) {
    idor = true;
  }
  
  // Detectar escalação de privilégio
  if (req.includes("/api/admin/") && req.includes("200 OK")) {
    escalacao = true;
  }
}

console.log("\\n🚨 DESCOBERTAS:");
if (idor) {
  console.log("✓ IDOR explorado - acessou dados do Admin (id=999)");
}
if (escalacao) {
  console.log("✓ Escalação de privilégio - acessou endpoint /admin/");
  console.log("✓ Iniciou backup não autorizado");
}
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

print("=== INVESTIGAÇÃO: Requisições Web ===\\n")

idor = False
escalacao = False

for req in requisicoes:
    print(req)
    
    # Detectar IDOR
    if "/api/usuarios/999" in req and "200 OK" in req:
        idor = True
    
    # Detectar escalação de privilégio
    if "/api/admin/" in req and "200 OK" in req:
        escalacao = True

print("\\n🚨 DESCOBERTAS:")
if idor:
    print("✓ IDOR explorado - acessou dados do Admin (id=999)")
if escalacao:
    print("✓ Escalação de privilégio - acessou endpoint /admin/")
    print("✓ Iniciou backup não autorizado")
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
    'IDOR = acessar dados de outros usuários mudando ID',
    'Usuário comum não deveria acessar /admin/',
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

console.log("=== INVESTIGAÇÃO: Exfiltração de Dados ===\\n");

let totalBytes = 0;

for (let i = 0; i < conexoes.length; i++) {
  const c = conexoes[i];
  totalBytes += c.bytes;
  
  const mb = (c.bytes / 1024 / 1024).toFixed(2);
  console.log(\`\${c.time} - \${c.src} → \${c.dst} | \${mb} MB via \${c.protocol}\`);
}

const totalMB = (totalBytes / 1024 / 1024).toFixed(2);

console.log(\`\\nTotal transferido: \${totalMB} MB\`);
console.log("\\n🚨 DESCOBERTAS:");
console.log("✓ 50 MB de dados enviados para IP atacante");
console.log("✓ Destino: 203.0.113.45 (mesmo IP do login suspeito)");
console.log("✓ EXFILTRAÇÃO DE DADOS CONFIRMADA");
console.log("✓ Backup contém dados sensíveis de clientes!");
`,
    python: `# Tráfego de rede após 14:36
conexoes = [
    {"time": "14:36", "src": "192.168.1.100", "dst": "203.0.113.45", "bytes": 1024, "protocol": "HTTPS"},
    {"time": "14:37", "src": "192.168.1.100", "dst": "203.0.113.45", "bytes": 52428800, "protocol": "HTTPS"},
    {"time": "14:38", "src": "192.168.1.100", "dst": "203.0.113.45", "bytes": 1024, "protocol": "HTTPS"}
]

print("=== INVESTIGAÇÃO: Exfiltração de Dados ===\\n")

total_bytes = 0

for c in conexoes:
    total_bytes += c["bytes"]
    
    mb = c["bytes"] / 1024 / 1024
    print(f"{c['time']} - {c['src']} → {c['dst']} | {mb:.2f} MB via {c['protocol']}")

total_mb = total_bytes / 1024 / 1024

print(f"\\nTotal transferido: {total_mb:.2f} MB")
print("\\n🚨 DESCOBERTAS:")
print("✓ 50 MB de dados enviados para IP atacante")
print("✓ Destino: 203.0.113.45 (mesmo IP do login suspeito)")
print("✓ EXFILTRAÇÃO DE DADOS CONFIRMADA")
print("✓ Backup contém dados sensíveis de clientes!")
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
    'Procure transferência grande (MB)',
    'O destino é o mesmo IP do atacante',
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
    javascript: `console.log("╔════════════════════════════════════════════════╗");
console.log("║     RELATÓRIO DE INCIDENTE DE SEGURANÇA      ║");
console.log("║           TechCorp Security Operations        ║");
console.log("╚════════════════════════════════════════════════╝\\n");

console.log("📅 DATA: 2026-03-07");
console.log("🕐 DETECÇÃO: 14:30");
console.log("👤 ANALISTA: Você\\n");

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("🚨 RESUMO EXECUTIVO");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n");

console.log("Gravidade: 🔴 CRÍTICA");
console.log("Tipo: Data Breach + Escalação de Privilégio");
console.log("Status: CONFIRMADO\\n");

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("🔍 TIMELINE DO ATAQUE");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n");

console.log("14:20-14:28 | Força bruta em múltiplas contas");
console.log("14:29      | Compromisso da conta 'maria'");
console.log("14:30-14:34 | Reconhecimento interno");
console.log("14:35      | IDOR → Dados de admin obtidos");
console.log("14:36      | Escalação → Backup não autorizado");
console.log("14:37      | Exfiltração de 50 MB de dados\\n");

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("🎯 INDICADORES DE COMPROMETIMENTO (IOCs)");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n");

console.log("IP Atacante: 203.0.113.45");
console.log("Conta comprometida: maria");
console.log("Vulnerabilidades exploradas:");
console.log("  • Ausência de rate limiting (força bruta)");
console.log("  • IDOR em /api/usuarios/");
console.log("  • Falta de validação de role em /api/admin/");
console.log("  • Sem DLP para bloquear exfiltração\\n");

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("✅ AÇÕES RECOMENDADAS (IMEDIATAS)");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n");

console.log("1. 🚫 Bloquear IP 203.0.113.45 no firewall");
console.log("2. 🔒 Desativar conta 'maria' e resetar senha");
console.log("3. 🔍 Revisar acessos de todas as contas nas últimas 24h");
console.log("4. 🛠️ Aplicar correções:");
console.log("   • Implementar rate limiting");
console.log("   • Corrigir IDOR (validação de permissões)");
console.log("   • Adicionar role-based access control");
console.log("5. 📢 Notificar clientes afetados (LGPD)");
console.log("6. 📊 Análise forense completa do servidor\\n");

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("Relatório gerado com sucesso!");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
`,
    python: `print("╔════════════════════════════════════════════════╗")
print("║     RELATÓRIO DE INCIDENTE DE SEGURANÇA      ║")
print("║           TechCorp Security Operations        ║")
print("╚════════════════════════════════════════════════╝\\n")

print("📅 DATA: 2026-03-07")
print("🕐 DETECÇÃO: 14:30")
print("👤 ANALISTA: Você\\n")

print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
print("🚨 RESUMO EXECUTIVO")
print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n")

print("Gravidade: 🔴 CRÍTICA")
print("Tipo: Data Breach + Escalação de Privilégio")
print("Status: CONFIRMADO\\n")

print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
print("🔍 TIMELINE DO ATAQUE")
print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n")

print("14:20-14:28 | Força bruta em múltiplas contas")
print("14:29      | Compromisso da conta 'maria'")
print("14:30-14:34 | Reconhecimento interno")
print("14:35      | IDOR → Dados de admin obtidos")
print("14:36      | Escalação → Backup não autorizado")
print("14:37      | Exfiltração de 50 MB de dados\\n")

print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
print("🎯 INDICADORES DE COMPROMETIMENTO (IOCs)")
print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n")

print("IP Atacante: 203.0.113.45")
print("Conta comprometida: maria")
print("Vulnerabilidades exploradas:")
print("  • Ausência de rate limiting (força bruta)")
print("  • IDOR em /api/usuarios/")
print("  • Falta de validação de role em /api/admin/")
print("  • Sem DLP para bloquear exfiltração\\n")

print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
print("✅ AÇÕES RECOMENDADAS (IMEDIATAS)")
print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n")

print("1. 🚫 Bloquear IP 203.0.113.45 no firewall")
print("2. 🔒 Desativar conta 'maria' e resetar senha")
print("3. 🔍 Revisar acessos de todas as contas nas últimas 24h")
print("4. 🛠️ Aplicar correções:")
print("   • Implementar rate limiting")
print("   • Corrigir IDOR (validação de permissões)")
print("   • Adicionar role-based access control")
print("5. 📢 Notificar clientes afetados (LGPD)")
print("6. 📊 Análise forense completa do servidor\\n")

print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
print("Relatório gerado com sucesso!")
print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
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
    'Este é um relatório profissional completo',
    'Documenta todo o incidente do início ao fim',
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
