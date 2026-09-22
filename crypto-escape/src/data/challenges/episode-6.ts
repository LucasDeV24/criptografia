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
  description: 'Você recebeu logs de um servidor. Escreva a função que conta quantas tentativas de login FALHARAM.',
  instructions: 'Complete contarFalhas(logs): devolva quantas linhas de logs contêm "LOGIN FAILED".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function contarFalhas(logs) {
  // Percorra logs e conte quantas linhas contêm "LOGIN FAILED"
  // Devolva o total com return
}
`,
    python: `def contar_falhas(logs):
    # Percorra logs e conte quantas linhas contêm "LOGIN FAILED"
    # Devolva o total com return
    pass
`,
  },
  tests: {
    fn: { javascript: 'contarFalhas', python: 'contar_falhas' },
    cases: [
      {
        name: '5 falhas em 8 logs',
        args: [[
          '2026-03-07 14:30:11 - LOGIN SUCCESS - user: john - IP: 192.168.1.50',
          '2026-03-07 14:31:05 - LOGIN FAILED - user: admin - IP: 192.168.1.100',
          '2026-03-07 14:31:08 - LOGIN FAILED - user: admin - IP: 192.168.1.100',
          '2026-03-07 14:31:12 - LOGIN FAILED - user: admin - IP: 192.168.1.100',
          '2026-03-07 14:32:00 - LOGIN SUCCESS - user: maria - IP: 192.168.1.60',
          '2026-03-07 14:33:15 - LOGIN FAILED - user: root - IP: 192.168.1.100',
          '2026-03-07 14:33:18 - LOGIN FAILED - user: root - IP: 192.168.1.100',
          '2026-03-07 14:34:22 - LOGIN SUCCESS - user: carlos - IP: 192.168.1.70',
        ]],
        expected: 5,
      },
      { name: 'lista vazia', args: [[]], expected: 0, hidden: true },
      { name: 'só sucessos', args: [['a LOGIN SUCCESS b', 'c LOGIN SUCCESS d']], expected: 0, hidden: true },
    ],
  },
  solution: {
    javascript: `function contarFalhas(logs) {
  let falhas = 0;
  for (const log of logs) {
    if (log.includes("LOGIN FAILED")) {
      falhas++;
    }
  }
  return falhas;
}`,
    python: `def contar_falhas(logs):
    falhas = 0
    for log in logs:
        if "LOGIN FAILED" in log:
            falhas += 1
    return falhas`,
  },
  explanation: `
**Análise:**
5 tentativas falhadas - ISSO É SUSPEITO!

Repare que todas vieram do mesmo IP: 192.168.1.100. Tentaram "admin" e "root" (usuários comuns de ataque).

**No mundo real:**
Um SOC Analyst vendo isso criaria um alerta: "Possível ataque de força bruta do IP 192.168.1.100" — exatamente o que você vai automatizar na próxima sala.
  `,
  hints: [
    'Um loop for...of (JS) ou for (Python) percorre cada linha',
    'log.includes("LOGIN FAILED") (Python: "LOGIN FAILED" in log)',
    'Lista vazia deve devolver 0',
  ],
  difficulty: 'easy',
};

const code6_2: CodeChallenge = {
  id: '6.2',
  type: 'code',
  episode: 6,
  room: '6.2',
  title: 'Identificando ataque de força bruta',
  description: 'Agora vamos detectar o IP atacante. Se um IP falhou 3+ vezes = ataque de força bruta!',
  instructions: 'Complete detectarForcaBruta(logs): conte as falhas por IP e devolva um alerta para cada IP com 3+ falhas (um por linha). Se nenhum IP chegar a 3, devolva "Nenhum ataque de força bruta detectado."',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function detectarForcaBruta(logs) {
  const falhasPorIP = {};
  // Percorra os logs:
  //   - Se contém "LOGIN FAILED":
  //     - Extraia o IP com: log.split("IP: ")[1]
  //     - Incremente falhasPorIP[ip] (comece de 0 se ainda não existir)

  // Depois, percorra as chaves de falhasPorIP (for...in):
  //   - Se falhasPorIP[ip] >= 3, monte a linha:
  //     "ALERTA: Ataque de força bruta detectado do IP " + ip
  // Junte as linhas de alerta com "\\n" e devolva com return
  // Se não houver nenhuma, devolva "Nenhum ataque de força bruta detectado."
}
`,
    python: `def detectar_forca_bruta(logs):
    falhas_por_ip = {}
    # Percorra os logs:
    #   - Se contém "LOGIN FAILED":
    #     - Extraia o IP com: log.split("IP: ")[1]
    #     - Incremente falhas_por_ip[ip] (comece de 0 se ainda não existir)

    # Depois, percorra as chaves de falhas_por_ip:
    #   - Se falhas_por_ip[ip] >= 3, monte a linha:
    #     f"ALERTA: Ataque de força bruta detectado do IP {ip}"
    # Junte as linhas de alerta com "\\n" e devolva com return
    # Se não houver nenhuma, devolva "Nenhum ataque de força bruta detectado."
    pass
`,
  },
  tests: {
    fn: { javascript: 'detectarForcaBruta', python: 'detectar_forca_bruta' },
    cases: [
      {
        name: 'um IP com 4 falhas',
        args: [[
          '2026-03-07 14:31:05 - LOGIN FAILED - user: admin - IP: 192.168.1.100',
          '2026-03-07 14:31:08 - LOGIN FAILED - user: admin - IP: 192.168.1.100',
          '2026-03-07 14:31:12 - LOGIN FAILED - user: admin - IP: 192.168.1.100',
          '2026-03-07 14:31:15 - LOGIN FAILED - user: root - IP: 192.168.1.100',
          '2026-03-07 14:32:00 - LOGIN SUCCESS - user: maria - IP: 192.168.1.60',
        ]],
        expected: 'ALERTA: Ataque de força bruta detectado do IP 192.168.1.100',
      },
      { name: 'só sucessos, nenhum ataque', args: [['x LOGIN SUCCESS IP: 1.1.1.1']], expected: 'Nenhum ataque de força bruta detectado.' },
      {
        name: 'dois IPs atacantes',
        args: [[
          't LOGIN FAILED user: a IP: 1.1.1.1', 't LOGIN FAILED user: a IP: 1.1.1.1', 't LOGIN FAILED user: a IP: 1.1.1.1',
          't LOGIN FAILED user: b IP: 2.2.2.2', 't LOGIN FAILED user: b IP: 2.2.2.2', 't LOGIN FAILED user: b IP: 2.2.2.2',
        ]],
        expected: 'ALERTA: Ataque de força bruta detectado do IP 1.1.1.1\nALERTA: Ataque de força bruta detectado do IP 2.2.2.2',
        hidden: true,
      },
      {
        name: 'abaixo do limite (2 falhas)',
        args: [['t LOGIN FAILED user: a IP: 1.1.1.1', 't LOGIN FAILED user: a IP: 1.1.1.1']],
        expected: 'Nenhum ataque de força bruta detectado.',
        hidden: true,
      },
    ],
  },
  solution: {
    javascript: `function detectarForcaBruta(logs) {
  const falhasPorIP = {};
  for (const log of logs) {
    if (log.includes("LOGIN FAILED")) {
      const ip = log.split("IP: ")[1];
      falhasPorIP[ip] = (falhasPorIP[ip] || 0) + 1;
    }
  }

  const alertas = [];
  for (const ip in falhasPorIP) {
    if (falhasPorIP[ip] >= 3) {
      alertas.push("ALERTA: Ataque de força bruta detectado do IP " + ip);
    }
  }
  return alertas.length ? alertas.join("\\n") : "Nenhum ataque de força bruta detectado.";
}`,
    python: `def detectar_forca_bruta(logs):
    falhas_por_ip = {}
    for log in logs:
        if "LOGIN FAILED" in log:
            ip = log.split("IP: ")[1]
            falhas_por_ip[ip] = falhas_por_ip.get(ip, 0) + 1

    alertas = []
    for ip in falhas_por_ip:
        if falhas_por_ip[ip] >= 3:
            alertas.append(f"ALERTA: Ataque de força bruta detectado do IP {ip}")
    return "\\n".join(alertas) if alertas else "Nenhum ataque de força bruta detectado."`,
  },
  explanation: `
**ATAQUE DETECTADO!**

IP 192.168.1.100 falhou 4 vezes. Tentou usuários privilegiados: admin, root.

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
    'falhasPorIP[ip] = (falhasPorIP[ip] || 0) + 1 (Python: falhas_por_ip.get(ip, 0) + 1)',
    'for...in percorre as chaves do objeto (Python: for ip in falhas_por_ip)',
    'alertas.join("\\n") (Python: "\\n".join(alertas)) — e se a lista de alertas estiver vazia, devolva a mensagem de "nenhum ataque"',
  ],
  difficulty: 'medium',
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
  instructions: 'Complete detectarSQLi(logs): para cada log, verifique se contém alguma das palavras-chave ["\'", "OR", "UNION", "SELECT", "--", ";"]. Junte "🚨 SUSPEITO: " + log dos suspeitos com "\\n". Se nenhum for suspeito, devolva "Nenhuma tentativa de SQL Injection detectada."',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function detectarSQLi(logs) {
  const palavrasChaveSQLi = ["'", "OR", "UNION", "SELECT", "--", ";"];
  // Para cada log, verifique se contém alguma palavra-chave de SQLi
  // Use dois loops: um para percorrer logs, outro para palavras-chave
  // Se o log contiver qualquer palavra-chave, junte "🚨 SUSPEITO: " + log numa lista
  // No final, devolva a lista juntada com "\\n" (ou a mensagem de "nenhuma", se vazia)
}
`,
    python: `def detectar_sqli(logs):
    palavras_chave_sqli = ["'", "OR", "UNION", "SELECT", "--", ";"]
    # Para cada log, verifique se contém alguma palavra-chave de SQLi
    # Use dois loops: um para percorrer logs, outro para palavras-chave
    # Se o log contiver qualquer palavra-chave, junte "🚨 SUSPEITO: " + log numa lista
    # No final, devolva a lista juntada com "\\n" (ou a mensagem de "nenhuma", se vazia)
    pass
`,
  },
  tests: {
    fn: { javascript: 'detectarSQLi', python: 'detectar_sqli' },
    cases: [
      {
        name: '2 tentativas de SQLi em 6 logs',
        args: [[
          'GET /produto?id=1 - 200 OK',
          'GET /produto?id=2 - 200 OK',
          "GET /produto?id=1' OR '1'='1 - 500 ERROR",
          'GET /busca?q=notebook - 200 OK',
          'GET /usuario?id=5 UNION SELECT * FROM senhas-- - 500 ERROR',
          'POST /login username=admin&password=123 - 401 DENIED',
        ]],
        expected: "🚨 SUSPEITO: GET /produto?id=1' OR '1'='1 - 500 ERROR\n🚨 SUSPEITO: GET /usuario?id=5 UNION SELECT * FROM senhas-- - 500 ERROR",
      },
      { name: 'nenhum log suspeito', args: [['GET /produto?id=2 - 200 OK']], expected: 'Nenhuma tentativa de SQL Injection detectada.' },
      { name: 'lista vazia', args: [[]], expected: 'Nenhuma tentativa de SQL Injection detectada.', hidden: true },
      { name: 'ponto e vírgula sozinho já basta', args: [['GET /x?id=1; DROP TABLE x -- 500 ERROR']], expected: '🚨 SUSPEITO: GET /x?id=1; DROP TABLE x -- 500 ERROR', hidden: true },
    ],
  },
  solution: {
    javascript: `function detectarSQLi(logs) {
  const palavrasChaveSQLi = ["'", "OR", "UNION", "SELECT", "--", ";"];
  const suspeitos = [];

  for (const log of logs) {
    let suspeito = false;
    for (const palavra of palavrasChaveSQLi) {
      if (log.includes(palavra)) {
        suspeito = true;
      }
    }
    if (suspeito) {
      suspeitos.push("🚨 SUSPEITO: " + log);
    }
  }
  return suspeitos.length ? suspeitos.join("\\n") : "Nenhuma tentativa de SQL Injection detectada.";
}`,
    python: `def detectar_sqli(logs):
    palavras_chave_sqli = ["'", "OR", "UNION", "SELECT", "--", ";"]
    suspeitos = []

    for log in logs:
        suspeito = False
        for palavra in palavras_chave_sqli:
            if palavra in log:
                suspeito = True
        if suspeito:
            suspeitos.append(f"🚨 SUSPEITO: {log}")
    return "\\n".join(suspeitos) if suspeitos else "Nenhuma tentativa de SQL Injection detectada."`,
  },
  explanation: `
**2 tentativas de SQL Injection detectadas!**

**Linha 3:** \`' OR '1'='1\` - Tentativa clássica de bypass
**Linha 5:** \`UNION SELECT\` - Tentativa de extrair dados

Ambas resultaram em 500 ERROR = sistema vulnerável mas query falhou.

**Cuidado com falsos positivos:** um detector ingênuo que procurasse só por "OR" pegaria até a palavra "AUTHORIZED" por engano (ela contém "OR" no meio!). Por isso a lista de palavras-chave de um detector real é bem mais cuidadosa do que parece à primeira vista.

**Ação imediata:**
1. Bloquear IP atacante
2. Revisar código da aplicação
3. Implementar prepared statements
4. Alertar time de desenvolvimento

**No mundo real:**
SIEM (Security Information and Event Management) faz isso automaticamente para milhões de logs por segundo!
  `,
  hints: [
    'Loop externo percorre logs; loop interno percorre palavrasChaveSQLi',
    'log.includes(palavra) (Python: palavra in log) — se achar qualquer uma, o log é suspeito',
    'Junte os suspeitos com "\\n" só no final; lista vazia de suspeitos cai na mensagem de "nenhuma"',
  ],
  difficulty: 'medium',
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
