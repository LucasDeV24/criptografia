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

**Ferramenta nova neste episódio**
• **Arredondar um número:** \`Math.round(x)\` (JavaScript) e \`round(x)\` (Python) arredondam para o inteiro mais próximo. Por exemplo, 2,6 vira 3.

**Ferramentas novas neste episódio**
• **Percorrer uma lista direto:** no JavaScript, \`for (const item of lista) { ... }\` entrega cada item sem precisar de índice (é o mesmo que o \`for item in lista\` do Python). Para ter a posição junto com o item no Python, use \`for i, item in enumerate(lista):\`.
• **Juntar uma lista em um texto:** JavaScript \`lista.join(", ")\` (o método é da lista) e Python \`", ".join(lista)\` (o método é do separador). No Python, os itens precisam ser texto: use \`str()\` nos números.
• **Percorrer um objeto/dicionário:** JavaScript \`Object.keys(obj)\` devolve a lista das chaves e \`Object.entries(obj)\` os pares [chave, valor]. Python: \`obj.keys()\` e \`obj.items()\`, usados assim: \`for chave, valor in obj.items():\`.
  `,
};

const code11_1: CodeChallenge = {
  id: '11.1',
  type: 'code',
  episode: 11,
  room: '11.1',
  title: 'Analisando pacotes HTTP',
  description: 'Você capturou pacotes de rede. Escreva a função que identifica requisições suspeitas.',
  instructions: 'Complete detectarAmeacas(pacotes): para cada pacote, se info contém "shell.php" ou "cmd=", adicione um alerta de webshell; se contém "pass=" E o protocolo é HTTP, adicione um alerta de senha em texto plano. Junte os alertas (na ordem dos pacotes) com "\\n". Sem nenhum alerta, devolva "Nenhuma ameaça detectada."',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function detectarAmeacas(pacotes) {
  const alertas = [];
  // Percorra pacotes com índice (for clássico, i começando em 0)
  // Se p.info.includes("shell.php") || p.info.includes("cmd="):
  //   alertas.push("🚨 ALERTA: Possível webshell! (pacote " + (i + 1) + ")")
  // Se p.info.includes("pass=") && p.protocol === "HTTP":
  //   alertas.push("⚠️ ALERTA: Senha em texto plano (pacote " + (i + 1) + ")")
  // Devolva alertas.join("\\n"), ou "Nenhuma ameaça detectada." se a lista estiver vazia
}
`,
    python: `def detectar_ameacas(pacotes):
    alertas = []
    # Percorra pacotes com índice: for i, p in enumerate(pacotes)
    # Se "shell.php" in p["info"] or "cmd=" in p["info"]:
    #   alertas.append(f"🚨 ALERTA: Possível webshell! (pacote {i + 1})")
    # Se "pass=" in p["info"] and p["protocol"] == "HTTP":
    #   alertas.append(f"⚠️ ALERTA: Senha em texto plano (pacote {i + 1})")
    # Devolva "\\n".join(alertas), ou "Nenhuma ameaça detectada." se a lista estiver vazia
    pass
`,
  },
  tests: {
    fn: { javascript: 'detectarAmeacas', python: 'detectar_ameacas' },
    cases: [
      {
        name: 'senha em texto plano + webshell',
        args: [[
          { src: '192.168.1.100', dst: '8.8.8.8', protocol: 'DNS', info: 'Query google.com' },
          { src: '192.168.1.100', dst: '142.250.185.46', protocol: 'HTTP', info: 'GET / HTTP/1.1' },
          { src: '192.168.1.100', dst: '142.250.185.46', protocol: 'HTTP', info: 'POST /login user=admin&pass=123456' },
          { src: '192.168.1.50', dst: '45.33.32.156', protocol: 'HTTP', info: 'GET /shell.php?cmd=whoami' },
          { src: '45.33.32.156', dst: '192.168.1.50', protocol: 'HTTP', info: '200 OK - root' },
        ]],
        expected: '⚠️ ALERTA: Senha em texto plano (pacote 3)\n🚨 ALERTA: Possível webshell! (pacote 4)',
      },
      { name: 'nenhuma ameaça', args: [[{ src: 'a', dst: 'b', protocol: 'HTTP', info: 'GET / HTTP/1.1' }]], expected: 'Nenhuma ameaça detectada.' },
      { name: 'lista vazia', args: [[]], expected: 'Nenhuma ameaça detectada.', hidden: true },
    ],
  },
  solution: {
    javascript: `function detectarAmeacas(pacotes) {
  const alertas = [];
  for (let i = 0; i < pacotes.length; i++) {
    const p = pacotes[i];
    if (p.info.includes("shell.php") || p.info.includes("cmd=")) {
      alertas.push("🚨 ALERTA: Possível webshell! (pacote " + (i + 1) + ")");
    }
    if (p.info.includes("pass=") && p.protocol === "HTTP") {
      alertas.push("⚠️ ALERTA: Senha em texto plano (pacote " + (i + 1) + ")");
    }
  }
  return alertas.length ? alertas.join("\\n") : "Nenhuma ameaça detectada.";
}`,
    python: `def detectar_ameacas(pacotes):
    alertas = []
    for i, p in enumerate(pacotes):
        if "shell.php" in p["info"] or "cmd=" in p["info"]:
            alertas.append(f"🚨 ALERTA: Possível webshell! (pacote {i + 1})")
        if "pass=" in p["info"] and p["protocol"] == "HTTP":
            alertas.append(f"⚠️ ALERTA: Senha em texto plano (pacote {i + 1})")
    return "\\n".join(alertas) if alertas else "Nenhuma ameaça detectada."`,
  },
  explanation: `
**2 ameaças detectadas!**

**Pacote #3:** senha sendo enviada via HTTP (não criptografado) — qualquer um na rede pode interceptar.

**Pacote #4:** \`shell.php?cmd=whoami\` indica uma webshell (backdoor). O pacote #5, logo em seguida, é a RESPOSTA desse comando — não é detectado separadamente pelo seu código, mas o contexto (resposta "root") confirma que o atacante tinha controle total.

**No mundo real:**
SOC Analysts configuram regras (IDS/IPS) para alertar sobre padrões de ataque conhecidos, tráfego para IPs maliciosos e protocolos inesperados — exatamente o tipo de checagem que você acabou de automatizar.
  `,
  hints: [
    'Um for clássico (com índice i) permite montar "(pacote " + (i+1) + ")" facilmente',
    'As duas checagens (webshell e senha) são independentes — um mesmo pacote pode disparar as duas, ou nenhuma',
    'alertas.join("\\n") só no final; lista vazia cai no "Nenhuma ameaça detectada."',
  ],
  difficulty: 'medium',
};

const code11_2: CodeChallenge = {
  id: '11.2',
  type: 'code',
  episode: 11,
  room: '11.2',
  title: 'Detectando port scanning',
  description: 'Atacantes fazem port scan para descobrir serviços vulneráveis. Múltiplas conexões para portas diferentes, vindas do mesmo lugar, é suspeito!',
  instructions: 'Complete detectarPortScan(conexoes): agrupe as portas por par "src → dst". Para cada par com 3+ portas, monte um bloco de alerta (veja o formato exato nos testes) e junte os blocos com "\\n\\n". Sem nenhum, devolva "Nenhum port scan detectado."',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function detectarPortScan(conexoes) {
  const porOrigem = {};
  // Percorra conexoes; para cada c, a chave é c.src + " → " + c.dst
  // Se a chave ainda não existir em porOrigem, comece com um array vazio
  // Adicione c.port a porOrigem[chave]

  const blocos = [];
  // Percorra as chaves de porOrigem (for...in)
  // Se portas.length >= 3, monte o bloco:
  //   "🚨 PORT SCAN DETECTADO!\\n   Origem: " + chave +
  //   "\\n   Portas testadas: " + portas.join(", ") +
  //   "\\n   Total: " + portas.length + " portas"
  // e adicione a "blocos"
  // Devolva blocos.join("\\n\\n"), ou "Nenhum port scan detectado." se vazio
}
`,
    python: `def detectar_port_scan(conexoes):
    por_origem = {}
    # Percorra conexoes; para cada c, a chave é f"{c['src']} → {c['dst']}"
    # Se a chave ainda não existir em por_origem, comece com uma lista vazia
    # Adicione c["port"] a por_origem[chave]

    blocos = []
    # Percorra as chaves de por_origem
    # Se len(portas) >= 3, monte o bloco:
    #   "🚨 PORT SCAN DETECTADO!\\n   Origem: " + chave +
    #   "\\n   Portas testadas: " + ", ".join(map(str, portas)) +
    #   "\\n   Total: " + str(len(portas)) + " portas"
    # e adicione a "blocos"
    # Devolva "\\n\\n".join(blocos), ou "Nenhum port scan detectado." se vazio
    pass
`,
  },
  tests: {
    fn: { javascript: 'detectarPortScan', python: 'detectar_port_scan' },
    cases: [
      {
        name: 'scan de 5 portas',
        args: [[
          { src: '203.0.113.10', dst: '192.168.1.100', port: 22 },
          { src: '203.0.113.10', dst: '192.168.1.100', port: 80 },
          { src: '203.0.113.10', dst: '192.168.1.100', port: 443 },
          { src: '203.0.113.10', dst: '192.168.1.100', port: 3306 },
          { src: '203.0.113.10', dst: '192.168.1.100', port: 8080 },
          { src: '192.168.1.50', dst: '8.8.8.8', port: 53 },
        ]],
        expected: '🚨 PORT SCAN DETECTADO!\n   Origem: 203.0.113.10 → 192.168.1.100\n   Portas testadas: 22, 80, 443, 3306, 8080\n   Total: 5 portas',
      },
      { name: 'só 2 portas, não é scan', args: [[{ src: 'a', dst: 'b', port: 1 }, { src: 'a', dst: 'b', port: 2 }]], expected: 'Nenhum port scan detectado.' },
      { name: 'lista vazia', args: [[]], expected: 'Nenhum port scan detectado.', hidden: true },
    ],
  },
  solution: {
    javascript: `function detectarPortScan(conexoes) {
  const porOrigem = {};
  for (const c of conexoes) {
    const chave = c.src + " → " + c.dst;
    if (!porOrigem[chave]) {
      porOrigem[chave] = [];
    }
    porOrigem[chave].push(c.port);
  }

  const blocos = [];
  for (const chave in porOrigem) {
    const portas = porOrigem[chave];
    if (portas.length >= 3) {
      blocos.push("🚨 PORT SCAN DETECTADO!\\n   Origem: " + chave + "\\n   Portas testadas: " + portas.join(", ") + "\\n   Total: " + portas.length + " portas");
    }
  }
  return blocos.length ? blocos.join("\\n\\n") : "Nenhum port scan detectado.";
}`,
    python: `def detectar_port_scan(conexoes):
    por_origem = {}
    for c in conexoes:
        chave = f"{c['src']} → {c['dst']}"
        if chave not in por_origem:
            por_origem[chave] = []
        por_origem[chave].append(c["port"])

    blocos = []
    for chave in por_origem:
        portas = por_origem[chave]
        if len(portas) >= 3:
            blocos.append("🚨 PORT SCAN DETECTADO!\\n   Origem: " + chave + "\\n   Portas testadas: " + ", ".join(map(str, portas)) + "\\n   Total: " + str(len(portas)) + " portas")
    return "\\n\\n".join(blocos) if blocos else "Nenhum port scan detectado."`,
  },
  explanation: `
**Port scan detectado!**

IP 203.0.113.10 testou 5 portas diferentes do mesmo alvo — incluindo a 3306 (MySQL), um possível alvo valioso se estiver mal configurado.

**O que isso significa:**
Um atacante está mapeando o alvo, provavelmente com uma ferramenta automatizada, antes de decidir por onde atacar.

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
    'if (!porOrigem[chave]) porOrigem[chave] = []; (Python: if chave not in por_origem: por_origem[chave] = [])',
    'for...in percorre as chaves do objeto (Python: for chave in por_origem)',
    'Duas conexões (menos que 3) não contam como port scan pela regra do exercício',
  ],
  difficulty: 'medium',
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
  description: 'Analise os uploads diários de um usuário e identifique o primeiro dia MUITO fora do padrão dos outros dias.',
  instructions: 'Complete detectarExfiltracao(uploads): para cada dia, calcule a média dos OUTROS dias (sem contar o dia atual) e compare. Se o valor do dia for mais de 10x essa média, devolva o alerta (formato exato nos testes). Sem nenhuma anomalia, devolva "Nenhuma anomalia detectada."',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function detectarExfiltracao(uploads) {
  const total = uploads.reduce((a, b) => a + b, 0);
  // Para cada dia i:
  //   mediaOutros = (total - uploads[i]) / (uploads.length - 1)
  //   Se uploads[i] > mediaOutros * 10, devolva:
  //     "🚨 ALERTA: Dia " + (i+1) + " teve upload de " + uploads[i] + " MB!\\n" +
  //     "  Isso é " + Math.round(uploads[i] / mediaOutros) + "x a média dos outros dias!"
  // Se nenhum dia for anômalo, devolva "Nenhuma anomalia detectada."
}
`,
    python: `def detectar_exfiltracao(uploads):
    total = sum(uploads)
    # Para cada dia i:
    #   media_outros = (total - uploads[i]) / (len(uploads) - 1)
    #   Se uploads[i] > media_outros * 10, devolva:
    #     f"🚨 ALERTA: Dia {i+1} teve upload de {uploads[i]} MB!\\n" +
    #     f"  Isso é {round(uploads[i] / media_outros)}x a média dos outros dias!"
    # Se nenhum dia for anômalo, devolva "Nenhuma anomalia detectada."
    pass
`,
  },
  tests: {
    fn: { javascript: 'detectarExfiltracao', python: 'detectar_exfiltracao' },
    cases: [
      { name: 'pico no dia 5 (carlos)', args: [[3, 2, 4, 3, 520, 2, 3]], expected: '🚨 ALERTA: Dia 5 teve upload de 520 MB!\n  Isso é 184x a média dos outros dias!' },
      { name: 'sem anomalia (joão)', args: [[5, 4, 6, 5, 7, 5, 6]], expected: 'Nenhuma anomalia detectada.' },
      { name: 'sem anomalia (maria)', args: [[10, 12, 11, 9, 13, 10, 11]], expected: 'Nenhuma anomalia detectada.', hidden: true },
    ],
  },
  solution: {
    javascript: `function detectarExfiltracao(uploads) {
  const total = uploads.reduce((a, b) => a + b, 0);
  for (let i = 0; i < uploads.length; i++) {
    const mediaOutros = (total - uploads[i]) / (uploads.length - 1);
    if (uploads[i] > mediaOutros * 10) {
      return "🚨 ALERTA: Dia " + (i + 1) + " teve upload de " + uploads[i] + " MB!\\n  Isso é " + Math.round(uploads[i] / mediaOutros) + "x a média dos outros dias!";
    }
  }
  return "Nenhuma anomalia detectada.";
}`,
    python: `def detectar_exfiltracao(uploads):
    total = sum(uploads)
    for i in range(len(uploads)):
        media_outros = (total - uploads[i]) / (len(uploads) - 1)
        if uploads[i] > media_outros * 10:
            return f"🚨 ALERTA: Dia {i + 1} teve upload de {uploads[i]} MB!\\n  Isso é {round(uploads[i] / media_outros)}x a média dos outros dias!"
    return "Nenhuma anomalia detectada."`,
  },
  explanation: `
**Exfiltração detectada!**

O segredo é comparar cada dia com a média dos OUTROS dias, não com a média de todos os dias incluindo ele mesmo — senão o próprio pico "puxa a média para cima" e a anomalia se disfarça matematicamente. Carlos costuma enviar ~2,8MB/dia (média dos outros 6 dias); no dia 5, enviou 520MB — 184 vezes esse valor normal.

**Ações imediatas:**
1. Bloquear conta temporariamente
2. Investigar: o que foi enviado? Para onde?
3. Verificar logs de autenticação (conta comprometida?)
4. Análise forense do computador

**Caso real:**
2013 - Edward Snowden baixou 1,7 milhões de documentos da NSA. Sistemas da época não detectaram o volume anômalo a tempo.

**DLP moderna:**
Bloquearia o upload imediatamente ao detectar esse tipo de anomalia.
  `,
  hints: [
    '(total - uploads[i]) é a soma de todos os OUTROS dias; divida por (uploads.length - 1) para a média deles',
    'Compare uploads[i] > mediaOutros * 10 — não a média de TODOS os dias, que incluiria o próprio pico',
    'Se nenhum dia passar do limite, o loop termina e cai no "Nenhuma anomalia detectada."',
  ],
  difficulty: 'hard',
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
