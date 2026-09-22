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

**Lembrete das ferramentas usadas**
Neste projeto você vai reusar o que viu antes: \`Object.keys\` / \`.items()\` para percorrer objetos, template strings e f-strings para montar mensagens, e \`join\` para juntar listas em texto.
  `,
};

const code12_1: CodeChallenge = {
  id: '12.1',
  type: 'code',
  episode: 12,
  room: '12.1',
  title: 'Fase 1: Análise de Logs de Autenticação',
  description: 'Analise os logs de login e escreva a função que identifica qual conta foi comprometida por força bruta.',
  instructions: 'Complete encontrarContaComprometida(logs): conte as falhas por IP. Quando um LOGIN SUCCESS vier de um IP que já tinha 3+ falhas registradas, devolva o usuário desse login. Se nenhum padrão assim existir, devolva null.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function encontrarContaComprometida(logs) {
  const falhasPorIp = {};
  // Percorra os logs. Para cada um, extraia o IP: log.split("IP: ")[1]
  // Se for LOGIN FAILED, incremente falhasPorIp[ip]
  // Se for LOGIN SUCCESS E falhasPorIp[ip] já for >= 3:
  //   extraia o usuário: log.split("user: ")[1].split(" -")[0]
  //   devolva esse usuário com return
  // Se terminar o loop sem achar, devolva null
}
`,
    python: `def encontrar_conta_comprometida(logs):
    falhas_por_ip = {}
    # Percorra os logs. Para cada um, extraia o IP: log.split("IP: ")[1]
    # Se for LOGIN FAILED, incremente falhas_por_ip[ip]
    # Se for LOGIN SUCCESS E falhas_por_ip.get(ip, 0) já for >= 3:
    #   extraia o usuário: log.split("user: ")[1].split(" -")[0]
    #   devolva esse usuário com return
    # Se terminar o loop sem achar, devolva None
    pass
`,
  },
  tests: {
    fn: { javascript: 'encontrarContaComprometida', python: 'encontrar_conta_comprometida' },
    cases: [
      {
        name: 'maria comprometida por força bruta',
        args: [[
          '14:15 - LOGIN SUCCESS - user: carlos - IP: 192.168.1.50',
          '14:20 - LOGIN FAILED - user: admin - IP: 203.0.113.45',
          '14:20 - LOGIN FAILED - user: admin - IP: 203.0.113.45',
          '14:21 - LOGIN FAILED - user: admin - IP: 203.0.113.45',
          '14:22 - LOGIN FAILED - user: root - IP: 203.0.113.45',
          '14:25 - LOGIN FAILED - user: maria - IP: 203.0.113.45',
          '14:26 - LOGIN FAILED - user: maria - IP: 203.0.113.45',
          '14:27 - LOGIN FAILED - user: maria - IP: 203.0.113.45',
          '14:28 - LOGIN FAILED - user: maria - IP: 203.0.113.45',
          '14:29 - LOGIN SUCCESS - user: maria - IP: 203.0.113.45',
          '14:35 - LOGIN SUCCESS - user: joao - IP: 192.168.1.60',
        ]],
        expected: 'maria',
      },
      { name: 'nenhum comprometimento', args: [['14:00 - LOGIN SUCCESS - user: joao - IP: 1.1.1.1']], expected: null, hidden: true },
    ],
  },
  solution: {
    javascript: `function encontrarContaComprometida(logs) {
  const falhasPorIp = {};
  for (const log of logs) {
    const ip = log.split("IP: ")[1];
    if (log.includes("LOGIN FAILED")) {
      falhasPorIp[ip] = (falhasPorIp[ip] || 0) + 1;
    }
    if (log.includes("LOGIN SUCCESS") && (falhasPorIp[ip] || 0) >= 3) {
      return log.split("user: ")[1].split(" -")[0];
    }
  }
  return null;
}`,
    python: `def encontrar_conta_comprometida(logs):
    falhas_por_ip = {}
    for log in logs:
        ip = log.split("IP: ")[1]
        if "LOGIN FAILED" in log:
            falhas_por_ip[ip] = falhas_por_ip.get(ip, 0) + 1
        if "LOGIN SUCCESS" in log and falhas_por_ip.get(ip, 0) >= 3:
            return log.split("user: ")[1].split(" -")[0]
    return None`,
  },
  explanation: `
**Primeira descoberta!**

O IP 203.0.113.45 tentou várias contas (admin, root) sem sucesso, até conseguir entrar como "maria" — um padrão clássico de força bruta que rotaciona alvos até achar uma senha fraca.

**Próximas etapas:**
Investigar o que o atacante FEZ depois de obter acesso.
  `,
  hints: [
    'log.split("IP: ")[1] extrai o IP do final da linha, em qualquer log',
    'falhasPorIp[ip] = (falhasPorIp[ip] || 0) + 1 (Python: falhas_por_ip.get(ip, 0) + 1)',
    'O return acontece assim que o padrão é confirmado — não precisa esperar o loop terminar',
  ],
  difficulty: 'medium',
};

const code12_2: CodeChallenge = {
  id: '12.2',
  type: 'code',
  episode: 12,
  room: '12.2',
  title: 'Fase 2: Análise de Tráfego Web',
  description: 'Após obter acesso, o que o atacante fez? Escreva a função que detecta dois tipos de ataque nas requisições HTTP.',
  instructions: 'Complete detectarAtaquesWeb(requisicoes): se alguma requisição contém "/api/usuarios/999" E "200 OK", é IDOR. Se alguma contém "/api/admin/" E "200 OK", é escalação de privilégio. Junte as descobertas com "\\n" (veja o texto exato nos testes). Sem nenhuma, devolva "Nenhum ataque detectado."',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function detectarAtaquesWeb(requisicoes) {
  let idor = false;
  let escalacao = false;
  // Percorra requisicoes:
  //   Se r.includes("/api/usuarios/999") && r.includes("200 OK"): idor = true
  //   Se r.includes("/api/admin/") && r.includes("200 OK"): escalacao = true

  const achados = [];
  // Se idor, achados.push("✓ IDOR explorado - acessou dados do Admin (id=999)")
  // Se escalacao, achados.push("✓ Escalação de privilégio - acessou endpoint /admin/")
  // Devolva achados.join("\\n"), ou "Nenhum ataque detectado." se achados estiver vazio
}
`,
    python: `def detectar_ataques_web(requisicoes):
    idor = False
    escalacao = False
    # Percorra requisicoes:
    #   Se "/api/usuarios/999" in r and "200 OK" in r: idor = True
    #   Se "/api/admin/" in r and "200 OK" in r: escalacao = True

    achados = []
    # Se idor, achados.append("✓ IDOR explorado - acessou dados do Admin (id=999)")
    # Se escalacao, achados.append("✓ Escalação de privilégio - acessou endpoint /admin/")
    # Devolva "\\n".join(achados), ou "Nenhum ataque detectado." se achados estiver vazio
    pass
`,
  },
  tests: {
    fn: { javascript: 'detectarAtaquesWeb', python: 'detectar_ataques_web' },
    cases: [
      {
        name: 'IDOR + escalação de privilégio',
        args: [[
          '14:30 - GET /dashboard - 200 OK',
          '14:31 - GET /perfil - 200 OK',
          '14:32 - GET /api/usuarios - 403 FORBIDDEN',
          '14:33 - GET /api/usuarios/1 - 200 OK',
          '14:34 - GET /api/usuarios/2 - 200 OK',
          '14:35 - GET /api/usuarios/999 - 200 OK',
          '14:36 - POST /api/admin/backup - 200 OK',
        ]],
        expected: '✓ IDOR explorado - acessou dados do Admin (id=999)\n✓ Escalação de privilégio - acessou endpoint /admin/',
      },
      { name: 'navegação normal, nenhum ataque', args: [['14:30 - GET /dashboard - 200 OK']], expected: 'Nenhum ataque detectado.', hidden: true },
    ],
  },
  solution: {
    javascript: `function detectarAtaquesWeb(requisicoes) {
  let idor = false;
  let escalacao = false;
  for (const r of requisicoes) {
    if (r.includes("/api/usuarios/999") && r.includes("200 OK")) {
      idor = true;
    }
    if (r.includes("/api/admin/") && r.includes("200 OK")) {
      escalacao = true;
    }
  }

  const achados = [];
  if (idor) achados.push("✓ IDOR explorado - acessou dados do Admin (id=999)");
  if (escalacao) achados.push("✓ Escalação de privilégio - acessou endpoint /admin/");
  return achados.length ? achados.join("\\n") : "Nenhum ataque detectado.";
}`,
    python: `def detectar_ataques_web(requisicoes):
    idor = False
    escalacao = False
    for r in requisicoes:
        if "/api/usuarios/999" in r and "200 OK" in r:
            idor = True
        if "/api/admin/" in r and "200 OK" in r:
            escalacao = True

    achados = []
    if idor:
        achados.append("✓ IDOR explorado - acessou dados do Admin (id=999)")
    if escalacao:
        achados.append("✓ Escalação de privilégio - acessou endpoint /admin/")
    return "\\n".join(achados) if achados else "Nenhum ataque detectado."`,
  },
  explanation: `
**Vulnerabilidades exploradas:**

**1. IDOR:** o atacante testou os IDs 1, 2 e 999 em sequência — a API não validou se "maria" tinha permissão para ver o ID 999 (o Admin) e devolveu os dados de qualquer jeito.

**2. Escalação de privilégio:** "maria" é uma conta comum, mas conseguiu acessar \`/api/admin/backup\` — o sistema não checou o role antes de executar a ação.

**Gravidade:** CRÍTICA — o atacante iniciou um backup não autorizado, o que sugere que ele estava se preparando para roubar dados.
  `,
  hints: [
    'idor e escalacao começam como false/False, e só viram true/True se a condição bater em algum momento do loop',
    'As duas condições usam .includes() (Python: "in") em cima do mesmo texto da requisição',
    'A ordem dos achados no array/lista importa: IDOR primeiro, depois escalação',
  ],
  difficulty: 'medium',
};

const code12_3: CodeChallenge = {
  id: '12.3',
  type: 'code',
  episode: 12,
  room: '12.3',
  title: 'Fase 3: Análise de Tráfego de Rede',
  description: 'O backup foi enviado para onde? Escreva a função que soma o tráfego de saída para um IP e decide se é exfiltração.',
  instructions: 'Complete detectarExfiltracaoDeRede(conexoes, ipAtacante): some os bytes de TODAS as conexões cujo destino é ipAtacante, converta para MB (arredondado) e, se passar de 10 MB, devolva a confirmação. Senão, devolva "Não há indícios de exfiltração."',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function detectarExfiltracaoDeRede(conexoes, ipAtacante) {
  let totalBytes = 0;
  // Percorra conexoes; se c.dst === ipAtacante, some c.bytes a totalBytes
  // totalMb = Math.round(totalBytes / 1024 / 1024)
  // Se totalMb > 10, devolva:
  //   "✓ EXFILTRAÇÃO DE DADOS CONFIRMADA: " + totalMb + " MB enviados para " + ipAtacante
  // Senão, devolva "Não há indícios de exfiltração."
}
`,
    python: `def detectar_exfiltracao_de_rede(conexoes, ip_atacante):
    total_bytes = 0
    # Percorra conexoes; se c["dst"] == ip_atacante, some c["bytes"] a total_bytes
    # total_mb = round(total_bytes / 1024 / 1024)
    # Se total_mb > 10, devolva:
    #   f"✓ EXFILTRAÇÃO DE DADOS CONFIRMADA: {total_mb} MB enviados para {ip_atacante}"
    # Senão, devolva "Não há indícios de exfiltração."
    pass
`,
  },
  tests: {
    fn: { javascript: 'detectarExfiltracaoDeRede', python: 'detectar_exfiltracao_de_rede' },
    cases: [
      {
        name: '50 MB enviados para o atacante',
        args: [[
          { time: '14:36', src: '192.168.1.100', dst: '203.0.113.45', bytes: 1024 },
          { time: '14:37', src: '192.168.1.100', dst: '203.0.113.45', bytes: 52428800 },
          { time: '14:38', src: '192.168.1.100', dst: '203.0.113.45', bytes: 1024 },
        ], '203.0.113.45'],
        expected: '✓ EXFILTRAÇÃO DE DADOS CONFIRMADA: 50 MB enviados para 203.0.113.45',
      },
      { name: 'tráfego normal, sem exfiltração', args: [[{ time: 'x', src: 'a', dst: 'b', bytes: 1024 }], 'b'], expected: 'Não há indícios de exfiltração.', hidden: true },
    ],
  },
  solution: {
    javascript: `function detectarExfiltracaoDeRede(conexoes, ipAtacante) {
  let totalBytes = 0;
  for (const c of conexoes) {
    if (c.dst === ipAtacante) {
      totalBytes += c.bytes;
    }
  }
  const totalMb = Math.round(totalBytes / 1024 / 1024);
  if (totalMb > 10) {
    return "✓ EXFILTRAÇÃO DE DADOS CONFIRMADA: " + totalMb + " MB enviados para " + ipAtacante;
  }
  return "Não há indícios de exfiltração.";
}`,
    python: `def detectar_exfiltracao_de_rede(conexoes, ip_atacante):
    total_bytes = 0
    for c in conexoes:
        if c["dst"] == ip_atacante:
            total_bytes += c["bytes"]
    total_mb = round(total_bytes / 1024 / 1024)
    if total_mb > 10:
        return f"✓ EXFILTRAÇÃO DE DADOS CONFIRMADA: {total_mb} MB enviados para {ip_atacante}"
    return "Não há indícios de exfiltração."`,
  },
  explanation: `
**DATA BREACH!**

50 MB de dados foram enviados para o mesmo IP que já tinha feito o ataque de força bruta — a mesma origem em toda a cadeia do incidente.

**Timeline completo do ataque:**
14:20-14:28 — Força bruta em múltiplas contas
14:29 — Conta "maria" comprometida
14:35 — IDOR para obter dados do admin
14:36 — Escalação → backup não autorizado
14:37 — Exfiltração → 50 MB enviados para fora

**Gravidade:** CRÍTICA — Data Breach confirmado.
  `,
  hints: [
    'Some bytes só das conexões cujo dst bate com ipAtacante — as outras não contam',
    'Math.round(totalBytes / 1024 / 1024) (Python: round(total_bytes / 1024 / 1024)) arredonda para um número limpo de MB',
    '52428800 bytes ÷ 1024 ÷ 1024 = 50 MB — bem acima do limite de 10',
  ],
  difficulty: 'medium',
};

const code12_4: CodeChallenge = {
  id: '12.4',
  type: 'code',
  episode: 12,
  room: '12.4',
  title: 'Fase 4: Relatório de Incidente',
  description: 'Compile todas as descobertas das fases anteriores num relatório profissional. Repare que as chaves do objeto "incidente" usam snake_case — o mesmo estilo funciona nos dois idiomas.',
  instructions: 'Complete gerarRelatorio(incidente): monte o relatório seguindo exatamente o formato mostrado nos testes, usando os campos de "incidente". Devolva o texto completo com return.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function gerarRelatorio(incidente) {
  const linhas = [];
  linhas.push("=== RELATÓRIO DE INCIDENTE ===");
  linhas.push("Data: " + incidente.data + " | Hora: " + incidente.hora_deteccao + " | Gravidade: CRÍTICA");
  linhas.push("");
  linhas.push("TIMELINE:");
  // Percorra incidente.timeline e adicione cada evento a "linhas"

  linhas.push("");
  linhas.push("IOCs:");
  linhas.push("IP atacante: " + incidente.ip_atacante);
  linhas.push("Conta comprometida: " + incidente.conta_comprometida);
  linhas.push("Vulnerabilidades exploradas:");
  // Percorra incidente.vulnerabilidades e adicione "- " + v a "linhas"

  linhas.push("");
  linhas.push("Dados roubados: " + incidente.dados_roubados);
  linhas.push("");
  linhas.push("Relatório gerado com sucesso!");
  // Junte "linhas" com "\\n" e devolva com return
}
`,
    python: `def gerar_relatorio(incidente):
    linhas = []
    linhas.append("=== RELATÓRIO DE INCIDENTE ===")
    linhas.append("Data: " + incidente["data"] + " | Hora: " + incidente["hora_deteccao"] + " | Gravidade: CRÍTICA")
    linhas.append("")
    linhas.append("TIMELINE:")
    # Percorra incidente["timeline"] e adicione cada evento a "linhas"

    linhas.append("")
    linhas.append("IOCs:")
    linhas.append("IP atacante: " + incidente["ip_atacante"])
    linhas.append("Conta comprometida: " + incidente["conta_comprometida"])
    linhas.append("Vulnerabilidades exploradas:")
    # Percorra incidente["vulnerabilidades"] e adicione "- " + v a "linhas"

    linhas.append("")
    linhas.append("Dados roubados: " + incidente["dados_roubados"])
    linhas.append("")
    linhas.append("Relatório gerado com sucesso!")
    # Junte "linhas" com "\\n" e devolva com return
    pass
`,
  },
  tests: {
    fn: { javascript: 'gerarRelatorio', python: 'gerar_relatorio' },
    cases: [
      {
        name: 'relatório completo do incidente',
        args: [{
          data: '2026-03-07',
          hora_deteccao: '14:30',
          ip_atacante: '203.0.113.45',
          conta_comprometida: 'maria',
          vulnerabilidades: ['IDOR em /api/usuarios/', 'Falta de validação de role'],
          dados_roubados: '50 MB',
          timeline: ['14:29 | Compromisso da conta maria', '14:37 | Exfiltração de 50 MB'],
        }],
        expected: '=== RELATÓRIO DE INCIDENTE ===\nData: 2026-03-07 | Hora: 14:30 | Gravidade: CRÍTICA\n\nTIMELINE:\n14:29 | Compromisso da conta maria\n14:37 | Exfiltração de 50 MB\n\nIOCs:\nIP atacante: 203.0.113.45\nConta comprometida: maria\nVulnerabilidades exploradas:\n- IDOR em /api/usuarios/\n- Falta de validação de role\n\nDados roubados: 50 MB\n\nRelatório gerado com sucesso!',
      },
      {
        name: 'incidente diferente, uma vulnerabilidade só',
        args: [{
          data: '2026-04-01',
          hora_deteccao: '09:00',
          ip_atacante: '198.51.100.7',
          conta_comprometida: 'carlos',
          vulnerabilidades: ['Senha fraca'],
          dados_roubados: '2 MB',
          timeline: ['09:00 | Login suspeito'],
        }],
        expected: '=== RELATÓRIO DE INCIDENTE ===\nData: 2026-04-01 | Hora: 09:00 | Gravidade: CRÍTICA\n\nTIMELINE:\n09:00 | Login suspeito\n\nIOCs:\nIP atacante: 198.51.100.7\nConta comprometida: carlos\nVulnerabilidades exploradas:\n- Senha fraca\n\nDados roubados: 2 MB\n\nRelatório gerado com sucesso!',
        hidden: true,
      },
    ],
  },
  solution: {
    javascript: `function gerarRelatorio(incidente) {
  const linhas = [];
  linhas.push("=== RELATÓRIO DE INCIDENTE ===");
  linhas.push("Data: " + incidente.data + " | Hora: " + incidente.hora_deteccao + " | Gravidade: CRÍTICA");
  linhas.push("");
  linhas.push("TIMELINE:");
  for (const evento of incidente.timeline) {
    linhas.push(evento);
  }
  linhas.push("");
  linhas.push("IOCs:");
  linhas.push("IP atacante: " + incidente.ip_atacante);
  linhas.push("Conta comprometida: " + incidente.conta_comprometida);
  linhas.push("Vulnerabilidades exploradas:");
  for (const v of incidente.vulnerabilidades) {
    linhas.push("- " + v);
  }
  linhas.push("");
  linhas.push("Dados roubados: " + incidente.dados_roubados);
  linhas.push("");
  linhas.push("Relatório gerado com sucesso!");
  return linhas.join("\\n");
}`,
    python: `def gerar_relatorio(incidente):
    linhas = []
    linhas.append("=== RELATÓRIO DE INCIDENTE ===")
    linhas.append("Data: " + incidente["data"] + " | Hora: " + incidente["hora_deteccao"] + " | Gravidade: CRÍTICA")
    linhas.append("")
    linhas.append("TIMELINE:")
    for evento in incidente["timeline"]:
        linhas.append(evento)
    linhas.append("")
    linhas.append("IOCs:")
    linhas.append("IP atacante: " + incidente["ip_atacante"])
    linhas.append("Conta comprometida: " + incidente["conta_comprometida"])
    linhas.append("Vulnerabilidades exploradas:")
    for v in incidente["vulnerabilidades"]:
        linhas.append("- " + v)
    linhas.append("")
    linhas.append("Dados roubados: " + incidente["dados_roubados"])
    linhas.append("")
    linhas.append("Relatório gerado com sucesso!")
    return "\\n".join(linhas)`,
  },
  explanation: `
**Relatório profissional criado!**

Você acabou de fazer o que SOC Analysts fazem ao final de toda investigação:
1. Detectar anomalias (fase 1)
2. Investigar o incidente (fases 2 e 3)
3. Identificar IOCs (indicadores de comprometimento)
4. Documentar tudo de forma clara e reproduzível

**No mundo real:**
Este relatório seria enviado para o CISO (Chief Information Security Officer), o time de desenvolvimento, o jurídico (LGPD/GDPR) e, dependendo da gravidade, para autoridades.
  `,
  hints: [
    'for (const evento of incidente.timeline) linhas.push(evento); — sem transformar nada, só copiar cada linha',
    'for (const v of incidente.vulnerabilidades) linhas.push("- " + v); — adiciona um marcador antes de cada uma',
    'linhas.join("\\n") no final junta tudo com quebras de linha, exatamente como foi construído',
  ],
  difficulty: 'medium',
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
