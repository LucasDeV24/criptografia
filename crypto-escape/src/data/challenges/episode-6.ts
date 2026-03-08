import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory6_0: TheoryChallenge = {
  id: '6.0',
  type: 'theory',
  episode: 6,
  room: '6.0',
  title: 'Episódio 6 — Análise de Logs (SOC Analyst)',
  description: 'Bem-vindo ao trabalho de um SOC Analyst! Monitorar sistemas, identificar ataques em tempo real e responder a incidentes.',
  content: `
**O que é um SOC (Security Operations Center)?**
É o "centro de comando" de cibersegurança de uma empresa.
Analistas monitoram sistemas 24/7 procurando por:
• Tentativas de invasão
• Atividades suspeitas
• Malware
• Vazamento de dados

**O que são logs?**
Logs são registros de tudo que acontece em sistemas:
• Quem fez login, quando e de onde
• Tentativas de acesso negadas
• Erros e exceções
• Requisições web

**Exemplo de log:**
\`2026-03-07 14:32:11 - LOGIN FAILED - user: admin - IP: 192.168.1.100\`

**Seu trabalho:**
Analisar milhares de logs e identificar ataques.

Vamos aprender como um SOC Analyst trabalha!
  `,
};

const code6_1: CodeChallenge = {
  id: '6.1',
  type: 'code',
  episode: 6,
  room: '6.1',
  title: 'Analisando logs de login',
  description: 'Você recebeu logs de um servidor. Identifique quantas tentativas de login FALHARAM.',
  instructions: 'Execute e veja a análise dos logs',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Logs de servidor (últimas 10 linhas)
const logs = [
  "2026-03-07 14:30:11 - LOGIN SUCCESS - user: john - IP: 192.168.1.50",
  "2026-03-07 14:31:05 - LOGIN FAILED - user: admin - IP: 192.168.1.100",
  "2026-03-07 14:31:08 - LOGIN FAILED - user: admin - IP: 192.168.1.100",
  "2026-03-07 14:31:12 - LOGIN FAILED - user: admin - IP: 192.168.1.100",
  "2026-03-07 14:32:00 - LOGIN SUCCESS - user: maria - IP: 192.168.1.60",
  "2026-03-07 14:33:15 - LOGIN FAILED - user: root - IP: 192.168.1.100",
  "2026-03-07 14:33:18 - LOGIN FAILED - user: root - IP: 192.168.1.100",
  "2026-03-07 14:34:22 - LOGIN SUCCESS - user: carlos - IP: 192.168.1.70"
];

// Contar falhas
let falhas = 0;
for (let i = 0; i < logs.length; i++) {
  if (logs[i].includes("LOGIN FAILED")) {
    falhas++;
  }
}

console.log("Total de tentativas falhadas: " + falhas);
`,
    python: `# Logs de servidor (últimas 10 linhas)
logs = [
    "2026-03-07 14:30:11 - LOGIN SUCCESS - user: john - IP: 192.168.1.50",
    "2026-03-07 14:31:05 - LOGIN FAILED - user: admin - IP: 192.168.1.100",
    "2026-03-07 14:31:08 - LOGIN FAILED - user: admin - IP: 192.168.1.100",
    "2026-03-07 14:31:12 - LOGIN FAILED - user: admin - IP: 192.168.1.100",
    "2026-03-07 14:32:00 - LOGIN SUCCESS - user: maria - IP: 192.168.1.60",
    "2026-03-07 14:33:15 - LOGIN FAILED - user: root - IP: 192.168.1.100",
    "2026-03-07 14:33:18 - LOGIN FAILED - user: root - IP: 192.168.1.100",
    "2026-03-07 14:34:22 - LOGIN SUCCESS - user: carlos - IP: 192.168.1.70"
]

# Contar falhas
falhas = 0
for log in logs:
    if "LOGIN FAILED" in log:
        falhas += 1

print(f"Total de tentativas falhadas: {falhas}")
`,
  },
  expectedOutput: 'Total de tentativas falhadas: 5',
  explanation: `
**Análise:**
5 tentativas falhadas - ISSO É SUSPEITO!

Repare que todas vieram do mesmo IP: 192.168.1.100
Tentaram "admin" e "root" (usuários comuns de ataque)

**No mundo real:**
Um SOC Analyst vendo isso criaria um alerta:
"Possível ataque de força bruta do IP 192.168.1.100"
  `,
  hints: [
    'O código já está pronto - só execute',
    'Repare no padrão de tentativas do IP 192.168.1.100',
  ],
  difficulty: 'easy',
};

const code6_2: CodeChallenge = {
  id: '6.2',
  type: 'code',
  episode: 6,
  room: '6.2',
  title: 'Identificando ataque de força bruta',
  description: 'Agora vamos detectar o IP atacante. Se um IP falhou 3+ vezes em 1 minuto = ataque de força bruta!',
  instructions: 'Complete o código para identificar o IP suspeito',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const logs = [
  "2026-03-07 14:31:05 - LOGIN FAILED - user: admin - IP: 192.168.1.100",
  "2026-03-07 14:31:08 - LOGIN FAILED - user: admin - IP: 192.168.1.100",
  "2026-03-07 14:31:12 - LOGIN FAILED - user: admin - IP: 192.168.1.100",
  "2026-03-07 14:31:15 - LOGIN FAILED - user: root - IP: 192.168.1.100",
  "2026-03-07 14:32:00 - LOGIN SUCCESS - user: maria - IP: 192.168.1.60"
];

// Contar falhas por IP
const falhasPorIP = {};

for (let i = 0; i < logs.length; i++) {
  if (logs[i].includes("LOGIN FAILED")) {
    // Extrair IP (simplificado)
    const partes = logs[i].split("IP: ");
    const ip = partes[1];
    
    if (falhasPorIP[ip]) {
      falhasPorIP[ip]++;
    } else {
      falhasPorIP[ip] = 1;
    }
  }
}

// Detectar ataques (3+ falhas)
for (let ip in falhasPorIP) {
  if (falhasPorIP[ip] >= 3) {
    console.log("ALERTA: Ataque de força bruta detectado do IP " + ip);
  }
}
`,
    python: `logs = [
    "2026-03-07 14:31:05 - LOGIN FAILED - user: admin - IP: 192.168.1.100",
    "2026-03-07 14:31:08 - LOGIN FAILED - user: admin - IP: 192.168.1.100",
    "2026-03-07 14:31:12 - LOGIN FAILED - user: admin - IP: 192.168.1.100",
    "2026-03-07 14:31:15 - LOGIN FAILED - user: root - IP: 192.168.1.100",
    "2026-03-07 14:32:00 - LOGIN SUCCESS - user: maria - IP: 192.168.1.60"
]

# Contar falhas por IP
falhas_por_ip = {}

for log in logs:
    if "LOGIN FAILED" in log:
        # Extrair IP (simplificado)
        ip = log.split("IP: ")[1]
        
        if ip in falhas_por_ip:
            falhas_por_ip[ip] += 1
        else:
            falhas_por_ip[ip] = 1

# Detectar ataques (3+ falhas)
for ip, falhas in falhas_por_ip.items():
    if falhas >= 3:
        print(f"ALERTA: Ataque de força bruta detectado do IP {ip}")
`,
  },
  expectedOutput: 'ALERTA: Ataque de força bruta detectado do IP 192.168.1.100',
  explanation: `
**ATAQUE DETECTADO!**

IP 192.168.1.100 falhou 4 vezes em menos de 1 minuto.
Tentou usuários privilegiados: admin, root

**Ação recomendada:**
1. Bloquear IP temporariamente (firewall)
2. Notificar administrador
3. Verificar se houve sucesso em outras tentativas
4. Analisar logs completos desse IP

**Ferramentas profissionais:**
• Splunk (análise de logs)
• ELK Stack (Elasticsearch, Logstash, Kibana)
• Fail2ban (bloqueio automático)
  `,
  hints: [
    'O código está pronto - execute para ver a detecção',
    'Usamos um objeto/dicionário para contar falhas por IP',
  ],
  difficulty: 'easy',
};

const theory6_3: TheoryChallenge = {
  id: '6.3',
  type: 'theory',
  episode: 6,
  room: '6.3',
  title: 'Padrões de ataque em logs',
  description: 'SOC Analysts procuram por padrões específicos que indicam ataques.',
  content: `
**Padrões comuns em logs:**

**1. Força bruta:**
Múltiplas tentativas de login falhadas do mesmo IP

**2. SQL Injection:**
Logs com caracteres especiais: ', --, UNION, SELECT
Exemplo: \`GET /user?id=1' OR '1'='1\`

**3. XSS:**
Logs com <script>, alert(, document.cookie
Exemplo: \`POST /comment body: <script>...</script>\`

**4. Port scanning:**
Múltiplas conexões para portas diferentes em sequência

**5. Privilege escalation:**
Usuário comum tentando acessar recursos admin

**6. Data exfiltration:**
Download de grandes volumes de dados fora do horário normal

**Próxima sala:** Você vai analisar logs reais de um ataque SQLi!
  `,
};

const code6_4: CodeChallenge = {
  id: '6.4',
  type: 'code',
  episode: 6,
  room: '6.4',
  title: 'Detectando SQL Injection em logs',
  description: 'Analise logs de um servidor web e identifique requisições suspeitas que indicam tentativa de SQL Injection.',
  instructions: 'Execute e veja a detecção de SQLi',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Logs de servidor web
const logs = [
  "GET /produto?id=1 - 200 OK",
  "GET /produto?id=2 - 200 OK",
  "GET /produto?id=1' OR '1'='1 - 500 ERROR",
  "GET /busca?q=notebook - 200 OK",
  "GET /usuario?id=5 UNION SELECT * FROM senhas-- - 500 ERROR",
  "POST /login username=admin&password=123 - 401 UNAUTHORIZED"
];

// Palavras-chave de SQL Injection
const palavrasChaveSQLi = ["'", "OR", "UNION", "SELECT", "--", ";"];

console.log("Análise de segurança:");
console.log("===================\\n");

for (let i = 0; i < logs.length; i++) {
  let suspeito = false;
  
  for (let j = 0; j < palavrasChaveSQLi.length; j++) {
    if (logs[i].includes(palavrasChaveSQLi[j])) {
      suspeito = true;
      break;
    }
  }
  
  if (suspeito) {
    console.log("🚨 SUSPEITO: " + logs[i]);
  }
}
`,
    python: `# Logs de servidor web
logs = [
    "GET /produto?id=1 - 200 OK",
    "GET /produto?id=2 - 200 OK",
    "GET /produto?id=1' OR '1'='1 - 500 ERROR",
    "GET /busca?q=notebook - 200 OK",
    "GET /usuario?id=5 UNION SELECT * FROM senhas-- - 500 ERROR",
    "POST /login username=admin&password=123 - 401 UNAUTHORIZED"
]

# Palavras-chave de SQL Injection
palavras_chave_sqli = ["'", "OR", "UNION", "SELECT", "--", ";"]

print("Análise de segurança:")
print("===================\\n")

for log in logs:
    suspeito = False
    
    for palavra in palavras_chave_sqli:
        if palavra in log:
            suspeito = True
            break
    
    if suspeito:
        print(f"🚨 SUSPEITO: {log}")
`,
  },
  expectedOutput: '🚨 SUSPEITO: GET /produto?id=1\' OR \'1\'=\'1 - 500 ERROR\n🚨 SUSPEITO: GET /usuario?id=5 UNION SELECT * FROM senhas-- - 500 ERROR',
  explanation: `
**2 tentativas de SQL Injection detectadas!**

**Linha 3:** \`' OR '1'='1\` - Tentativa clássica de bypass
**Linha 5:** \`UNION SELECT\` - Tentativa de extrair dados

Ambas resultaram em 500 ERROR = sistema vulnerável mas query falhou.

**Ação imediata:**
1. Bloquear IP atacante
2. Revisar código da aplicação
3. Implementar prepared statements
4. Alertar time de desenvolvimento

**No mundo real:**
SIEM (Security Information and Event Management) faz isso automaticamente para milhões de logs por segundo!
  `,
  hints: [
    'O código está pronto - veja como detectamos SQLi',
    'Procuramos por palavras-chave suspeitas nos logs',
  ],
  difficulty: 'easy',
};

const theory6_5: TheoryChallenge = {
  id: '6.5',
  type: 'theory',
  episode: 6,
  room: '6.5',
  title: 'Episódio 6 completo!',
  description: 'Você agora pensa como um SOC Analyst!',
  content: `
**Habilidades desbloqueadas:**
✅ Análise de logs
✅ Detecção de força bruta
✅ Identificação de SQL Injection em logs
✅ Resposta a incidentes básica

**Carreira de SOC Analyst:**
• Salário inicial: R$ 3.000 - R$ 6.000
• Pleno: R$ 7.000 - R$ 12.000
• Sênior: R$ 15.000+
• Trabalho remoto muito comum!

**Certificações valiosas:**
• CompTIA Security+
• Certified SOC Analyst (CSA)
• Splunk Certified User

**Ferramentas para dominar:**
• Splunk / ELK
• Wireshark
• SIEM platforms

**Próximo episódio:**
Força bruta avançada e wordlists - automatizando ataques!

Você está no caminho certo! 🎯
  `,
};

export const episode6Challenges: Challenge[] = [
  theory6_0,
  code6_1,
  code6_2,
  theory6_3,
  code6_4,
  theory6_5,
];
