import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory11_0: TheoryChallenge = {
  id: '11.0',
  type: 'theory',
  episode: 11,
  room: '11.0',
  title: 'Episódio 11 — Network Analysis e Packet Inspection',
  description: 'Como analistas de segurança monitoram tráfego de rede para detectar ataques e investigar incidentes.',
  content: `
**O que é Network Analysis?**
Capturar e analisar pacotes de rede para entender comunicações.

**Por que isso importa:**
TUDO na internet são pacotes:
• Você acessa site → milhares de pacotes
• App envia mensagem → pacotes
• Malware se comunica → pacotes

**O que você pode ver:**
• IPs de origem e destino
• Portas usadas (80=HTTP, 443=HTTPS, 22=SSH)
• Protocolos (TCP, UDP, ICMP)
• Conteúdo dos dados (se não criptografado)

**Uso profissional:**

**SOC Analyst:**
• Detecta tráfego anômalo
• Identifica C&C de malware
• Investiga data exfiltration

**Network Engineer:**
• Troubleshooting de problemas
• Otimização de performance

**Pentester:**
• Man-in-the-Middle attacks
• Sniffing de credenciais

**Ferramenta #1:** Wireshark
Captura e analisa pacotes em tempo real.

Vamos simular análise de pacotes!
  `,
};

const code11_1: CodeChallenge = {
  id: '11.1',
  type: 'code',
  episode: 11,
  room: '11.1',
  title: 'Analisando pacotes HTTP',
  description: 'Você capturou pacotes de rede. Analise-os para identificar requisições suspeitas.',
  instructions: 'Execute e veja a análise dos pacotes',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Pacotes capturados da rede
const pacotes = [
  { src: "192.168.1.100", dst: "8.8.8.8", protocol: "DNS", info: "Query google.com" },
  { src: "192.168.1.100", dst: "142.250.185.46", protocol: "HTTP", info: "GET / HTTP/1.1" },
  { src: "192.168.1.100", dst: "142.250.185.46", protocol: "HTTP", info: "POST /login user=admin&pass=123456" },
  { src: "192.168.1.50", dst: "45.33.32.156", protocol: "HTTP", info: "GET /shell.php?cmd=whoami" },
  { src: "45.33.32.156", dst: "192.168.1.50", protocol: "HTTP", info: "200 OK - root" }
];

console.log("=== Análise de Tráfego de Rede ===\\n");

for (let i = 0; i < pacotes.length; i++) {
  const p = pacotes[i];
  console.log(\`[\${i + 1}] \${p.src} → \${p.dst} | \${p.protocol}\`);
  console.log(\`    \${p.info}\`);
  
  // Detectar padrões suspeitos
  if (p.info.includes("shell.php") || p.info.includes("cmd=")) {
    console.log("    🚨 ALERTA: Possível webshell!");
  }
  if (p.info.includes("pass=") && p.protocol === "HTTP") {
    console.log("    ⚠️ ALERTA: Senha em texto plano (HTTP não criptografado)!");
  }
  console.log("");
}
`,
    python: `# Pacotes capturados da rede
pacotes = [
    {"src": "192.168.1.100", "dst": "8.8.8.8", "protocol": "DNS", "info": "Query google.com"},
    {"src": "192.168.1.100", "dst": "142.250.185.46", "protocol": "HTTP", "info": "GET / HTTP/1.1"},
    {"src": "192.168.1.100", "dst": "142.250.185.46", "protocol": "HTTP", "info": "POST /login user=admin&pass=123456"},
    {"src": "192.168.1.50", "dst": "45.33.32.156", "protocol": "HTTP", "info": "GET /shell.php?cmd=whoami"},
    {"src": "45.33.32.156", "dst": "192.168.1.50", "protocol": "HTTP", "info": "200 OK - root"}
]

print("=== Análise de Tráfego de Rede ===\\n")

for i, p in enumerate(pacotes, 1):
    print(f"[{i}] {p['src']} → {p['dst']} | {p['protocol']}")
    print(f"    {p['info']}")
    
    # Detectar padrões suspeitos
    if "shell.php" in p["info"] or "cmd=" in p["info"]:
        print("    🚨 ALERTA: Possível webshell!")
    if "pass=" in p["info"] and p["protocol"] == "HTTP":
        print("    ⚠️ ALERTA: Senha em texto plano (HTTP não criptografado)!")
    print("")
`,
  },
  expectedOutput: '🚨 ALERTA: Possível webshell!\n⚠️ ALERTA: Senha em texto plano',
  explanation: `
**2 Ameaças detectadas!**

**Pacote #3:** Senha sendo enviada via HTTP (não criptografado)
Qualquer um na rede pode interceptar!

**Pacotes #4-5:** Webshell sendo executado!
\`shell.php?cmd=whoami\` indica backdoor.
Resposta "root" = atacante tem controle total!

**No mundo real:**
SOC Analysts configuram regras (IDS/IPS) para alertar sobre:
• Padrões de ataque conhecidos
• Tráfego para IPs maliciosos
• Protocolos inesperados
  `,
  hints: [
    'Procure por palavras-chave suspeitas: shell, cmd, pass',
    'HTTP não criptografa - HTTPS sim',
  ],
  difficulty: 'easy',
};

const code11_2: CodeChallenge = {
  id: '11.2',
  type: 'code',
  episode: 11,
  room: '11.2',
  title: 'Detectando port scanning',
  description: 'Atacantes fazem port scan para descobrir serviços vulneráveis. Múltiplas conexões para portas diferentes = suspeito!',
  instructions: 'Execute e detecte o scan',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Pacotes capturados
const conexoes = [
  { src: "203.0.113.10", dst: "192.168.1.100", port: 22, status: "CLOSED" },
  { src: "203.0.113.10", dst: "192.168.1.100", port: 80, status: "OPEN" },
  { src: "203.0.113.10", dst: "192.168.1.100", port: 443, status: "OPEN" },
  { src: "203.0.113.10", dst: "192.168.1.100", port: 3306, status: "OPEN" },
  { src: "203.0.113.10", dst: "192.168.1.100", port: 8080, status: "CLOSED" },
  { src: "192.168.1.50", dst: "8.8.8.8", port: 53, status: "OPEN" }
];

console.log("=== Detectando Port Scanning ===\\n");

// Contar tentativas por IP de origem
const tentativasPorIP = {};

for (let i = 0; i < conexoes.length; i++) {
  const c = conexoes[i];
  const key = c.src + " → " + c.dst;
  
  if (!tentativasPorIP[key]) {
    tentativasPorIP[key] = [];
  }
  tentativasPorIP[key].push(c.port);
}

// Alertar se múltiplas portas foram testadas
for (let key in tentativasPorIP) {
  const portas = tentativasPorIP[key];
  if (portas.length >= 3) {
    console.log("🚨 PORT SCAN DETECTADO!");
    console.log("   Origem: " + key);
    console.log("   Portas testadas: " + portas.join(", "));
    console.log("   Total: " + portas.length + " portas\\n");
  }
}
`,
    python: `# Pacotes capturados
conexoes = [
    {"src": "203.0.113.10", "dst": "192.168.1.100", "port": 22, "status": "CLOSED"},
    {"src": "203.0.113.10", "dst": "192.168.1.100", "port": 80, "status": "OPEN"},
    {"src": "203.0.113.10", "dst": "192.168.1.100", "port": 443, "status": "OPEN"},
    {"src": "203.0.113.10", "dst": "192.168.1.100", "port": 3306, "status": "OPEN"},
    {"src": "203.0.113.10", "dst": "192.168.1.100", "port": 8080, "status": "CLOSED"},
    {"src": "192.168.1.50", "dst": "8.8.8.8", "port": 53, "status": "OPEN"}
]

print("=== Detectando Port Scanning ===\\n")

# Contar tentativas por IP de origem
tentativas_por_ip = {}

for c in conexoes:
    key = f"{c['src']} → {c['dst']}"
    
    if key not in tentativas_por_ip:
        tentativas_por_ip[key] = []
    tentativas_por_ip[key].append(c['port'])

# Alertar se múltiplas portas foram testadas
for key, portas in tentativas_por_ip.items():
    if len(portas) >= 3:
        print("🚨 PORT SCAN DETECTADO!")
        print(f"   Origem: {key}")
        print(f"   Portas testadas: {', '.join(map(str, portas))}")
        print(f"   Total: {len(portas)} portas\\n")
`,
  },
  expectedOutput: '🚨 PORT SCAN DETECTADO!\n   Origem: 203.0.113.10 → 192.168.1.100\n   Portas testadas: 22, 80, 443, 3306, 8080\n   Total: 5 portas',
  explanation: `
**Port scan detectado!**

IP 203.0.113.10 testou 5 portas diferentes:
• 22 (SSH) - CLOSED
• 80 (HTTP) - OPEN
• 443 (HTTPS) - OPEN
• 3306 (MySQL) - OPEN ⚠️
• 8080 (Alt HTTP) - CLOSED

**O que isso significa:**
Atacante está mapeando o alvo.
MySQL aberto (3306) = possível alvo de ataque!

**Ferramentas de scan:**
• nmap (scanner profissional)
• masscan (ultra rápido)
• zmap (scan de internet inteira)

**Defesa:**
• Firewall com rate limiting
• IDS/IPS (Snort, Suricata)
• Fechar portas desnecessárias
  `,
  hints: [
    'Port scan = múltiplas portas testadas pelo mesmo IP',
    'Threshold comum: 3+ portas = suspeito',
  ],
  difficulty: 'easy',
};

const theory11_3: TheoryChallenge = {
  id: '11.3',
  type: 'theory',
  episode: 11,
  room: '11.3',
  title: 'Data Exfiltration Detection',
  description: 'Como detectar quando atacantes estão roubando dados da sua rede.',
  content: `
**O que é Data Exfiltration?**
Roubo de dados através da rede de forma furtiva.

**Técnicas comuns:**

**1. DNS Tunneling:**
Esconde dados em queries DNS (porta 53 sempre liberada).
Exemplo: \`d4t4.exfil.attacker.com\`
O "d4t4" são seus dados sendo roubados!

**2. ICMP Tunneling:**
Esconde dados em pings (ICMP packets).

**3. Slow and Low:**
Rouba pouco por vez para não chamar atenção.
10MB por dia durante 100 dias = 1GB roubado.

**4. Encrypted channels:**
Usa HTTPS/SSH para mascarar tráfego malicioso.

**5. Steganography:**
Esconde dados em imagens enviadas para fora.

**Como detectar:**

**Volume anômalo:**
Usuário normalmente envia 5MB/dia
De repente envia 500MB = investigar!

**Horários suspeitos:**
Upload grande às 3 AM = suspeito

**Destinos estranhos:**
Enviando dados para país desconhecido

**Ferramentas:**
• SIEM (Splunk, QRadar)
• DLP (Data Loss Prevention)
• Network flow analysis
  `,
};

const code11_4: CodeChallenge = {
  id: '11.4',
  type: 'code',
  episode: 11,
  room: '11.4',
  title: 'Detectando exfiltração anômala',
  description: 'Analise padrões de upload dos usuários e identifique comportamento anômalo.',
  instructions: 'Execute e encontre o usuário suspeito',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Dados de upload dos últimos 7 dias (MB por dia)
const usuarios = {
  "joao": [5, 4, 6, 5, 7, 5, 6],
  "maria": [10, 12, 11, 9, 13, 10, 11],
  "carlos": [3, 2, 4, 3, 520, 2, 3]  // 👀
};

console.log("=== Análise de Data Exfiltration ===\\n");

for (let user in usuarios) {
  const uploads = usuarios[user];
  
  // Calcular média
  let soma = 0;
  for (let i = 0; i < uploads.length; i++) {
    soma += uploads[i];
  }
  const media = soma / uploads.length;
  
  console.log(\`Usuário: \${user}\`);
  console.log(\`  Uploads: \${uploads.join(", ")} MB\`);
  console.log(\`  Média: \${media.toFixed(1)} MB/dia\`);
  
  // Detectar picos anômalos
  for (let i = 0; i < uploads.length; i++) {
    if (uploads[i] > media * 10) {
      console.log(\`  🚨 ALERTA: Dia \${i + 1} teve upload de \${uploads[i]} MB!\`);
      console.log(\`  Isso é \${(uploads[i] / media).toFixed(0)}x a média!\`);
    }
  }
  console.log("");
}
`,
    python: `# Dados de upload dos últimos 7 dias (MB por dia)
usuarios = {
    "joao": [5, 4, 6, 5, 7, 5, 6],
    "maria": [10, 12, 11, 9, 13, 10, 11],
    "carlos": [3, 2, 4, 3, 520, 2, 3]  # 👀
}

print("=== Análise de Data Exfiltration ===\\n")

for user, uploads in usuarios.items():
    # Calcular média
    media = sum(uploads) / len(uploads)
    
    print(f"Usuário: {user}")
    print(f"  Uploads: {', '.join(map(str, uploads))} MB")
    print(f"  Média: {media:.1f} MB/dia")
    
    # Detectar picos anômalos
    for i, upload in enumerate(uploads, 1):
        if upload > media * 10:
            print(f"  🚨 ALERTA: Dia {i} teve upload de {upload} MB!")
            print(f"  Isso é {upload / media:.0f}x a média!")
    print("")
`,
  },
  expectedOutput: '🚨 ALERTA: Dia 5 teve upload de 520 MB!\n  Isso é 70x a média!',
  explanation: `
**Exfiltração detectada!**

Usuário "carlos" normalmente envia ~3MB/dia.
No dia 5, enviou 520MB = 70x acima do normal!

**Ações imediatas:**
1. Bloquear conta temporariamente
2. Investigar: O que foi enviado? Para onde?
3. Verificar logs de autenticação (conta comprometida?)
4. Análise forense do computador

**Caso real:**
2013 - Edward Snowden baixou 1.7 milhões de documentos da NSA.
Sistemas não detectaram o volume anômalo.

**Moderna DLP:**
Bloquearia upload imediatamente ao detectar anomalia.
  `,
  hints: [
    'Procure por valores MUITO acima da média',
    'Carlos teve um dia com 520MB (normal é 3MB)',
  ],
  difficulty: 'easy',
};

const theory11_5: TheoryChallenge = {
  id: '11.5',
  type: 'theory',
  episode: 11,
  room: '11.5',
  title: 'Episódio 11 completo!',
  description: 'Você domina análise de tráfego de rede!',
  content: `
**Habilidades desbloqueadas:**
✅ Network packet analysis
✅ Port scan detection
✅ Data exfiltration detection
✅ Padrões de ataque em tráfego

**Conhecimento de nível avançado:**
Você agora entende como:
• Analistas monitoram redes 24/7
• Ataques são detectados em tempo real
• Investigar incidentes de segurança

**Carreira - Network Security:**
• **SOC Analyst L2/L3:** R$ 8k - R$ 15k+
• **Network Security Engineer:** R$ 12k - R$ 20k+
• **Threat Hunter:** R$ 15k - R$ 25k+

**Certificações valiosas:**
• Wireshark Certified Network Analyst (WCNA)
• GCIA (GIAC Certified Intrusion Analyst)
• CCNA Security

**Ferramentas para dominar:**
• Wireshark (análise de pacotes)
• tcpdump (captura em linha de comando)
• Zeek (IDS baseado em rede)
• Suricata / Snort (IPS)

**Próximo episódio:**
PROJETO FINAL - SOC Analyst Challenge!
Você vai resolver um incidente real simulado usando TUDO que aprendeu!

Prepare-se para o desafio final! 🔥
  `,
};

export const episode11Challenges: Challenge[] = [
  theory11_0,
  code11_1,
  code11_2,
  theory11_3,
  code11_4,
  theory11_5,
];
