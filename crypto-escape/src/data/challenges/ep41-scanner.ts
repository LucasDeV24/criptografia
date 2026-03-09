import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0: TheoryChallenge = {
  id: 'scan.0', type: 'theory', episode: 41, room: '41.0',
  title: 'Episódio 41 — Scanner de Vulnerabilidades',
  description: 'Scanners automatizam a busca por falhas em sistemas. São a base de qualquer pentest profissional.',
  content: `
**O que é um Scanner de Vulnerabilidades?**
Software que testa automaticamente um alvo em busca de falhas conhecidas.

**Tipos de scan:**
• **Port scan:** descobre portas abertas (Nmap)
• **Vulnerability scan:** testa vulnerabilidades conhecidas (Nessus, OpenVAS)
• **Web scan:** testa falhas web como XSS, SQLi (Burp Suite, OWASP ZAP)
• **Network scan:** mapeia toda a rede (Nmap, Masscan)

**Fases de um scan:**
1. **Descoberta:** encontrar hosts ativos
2. **Enumeração:** identificar serviços e versões
3. **Detecção:** comparar com banco de vulnerabilidades (CVE)
4. **Classificação:** priorizar por severidade (CVSS)
5. **Relatório:** documentar achados

**Ferramentas profissionais:**
• Nmap — scanner de rede/portas mais famoso
• Nessus — scanner de vulnerabilidades enterprise
• Burp Suite — proxy e scanner web
• Nuclei — scanner moderno baseado em templates
  `,
};

const code1: CodeChallenge = {
  id: 'scan.1', type: 'code', episode: 41, room: '41.1',
  title: 'Port scanner simulado',
  description: 'Simule um port scanner que verifica portas comuns e identifica serviços. **Execute**!',
  instructions: 'Simule um port scanner que verifica portas e identifica servicos abertos.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const servicos = {
  21: "FTP",
  22: "SSH",
  23: "Telnet",
  25: "SMTP",
  53: "DNS",
  80: "HTTP",
  443: "HTTPS",
  3306: "MySQL",
  3389: "RDP",
  8080: "HTTP-Proxy"
};

const portasAbertas = [22, 80, 443, 3306, 8080];
const portasScan = [21, 22, 23, 25, 53, 80, 443, 3306, 3389, 8080];

// Imprima "=== PORT SCAN - alvo: 192.168.1.50 ==="
// Para cada porta em portasScan que esteja em portasAbertas:
//   "  PORTA/tcp  OPEN   SERVICO"
// "\\nN portas abertas de M escaneadas"
// Se 23 aberta: "ALERTA: Telnet aberto (inseguro!)"
// Se 3306 aberta: "ALERTA: MySQL exposto externamente!"
`,
    python: `servicos = {
    21: "FTP",
    22: "SSH",
    23: "Telnet",
    25: "SMTP",
    53: "DNS",
    80: "HTTP",
    443: "HTTPS",
    3306: "MySQL",
    3389: "RDP",
    8080: "HTTP-Proxy"
}

portas_abertas = [22, 80, 443, 3306, 8080]
portas_scan = [21, 22, 23, 25, 53, 80, 443, 3306, 3389, 8080]

# Imprima "=== PORT SCAN - alvo: 192.168.1.50 ==="
# Para cada porta em portas_scan que esteja em portas_abertas:
#   "  PORTA/tcp  OPEN   SERVICO"
# "\\nN portas abertas de M escaneadas"
# Se 23 aberta: "ALERTA: Telnet aberto (inseguro!)"
# Se 3306 aberta: "ALERTA: MySQL exposto externamente!"
`,
  },
  expectedOutput: '=== PORT SCAN - alvo: 192.168.1.50 ===\n  22/tcp  OPEN   SSH\n  80/tcp  OPEN   HTTP\n  443/tcp  OPEN   HTTPS\n  3306/tcp  OPEN   MySQL\n  8080/tcp  OPEN   HTTP-Proxy\n\n5 portas abertas de 10 escaneadas\nALERTA: MySQL exposto externamente!',
  hints: ['5 portas estão abertas. MySQL exposto é um risco de segurança.'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'scan.2', type: 'code', episode: 41, room: '41.2',
  title: 'Vulnerability scanner',
  description: 'Crie um scanner que verifica vulnerabilidades conhecidas em serviços detectados. **Execute**!',
  instructions: 'Compare servicos do alvo com CVEs conhecidas e gere relatorio de vulnerabilidades.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const vulns = [
  { servico: "Apache 2.4.49", cve: "CVE-2021-41773", severidade: "CRITICO", desc: "Path Traversal + RCE" },
  { servico: "OpenSSH 7.6", cve: "CVE-2018-15473", severidade: "MEDIO", desc: "Username Enumeration" },
  { servico: "MySQL 5.7.0", cve: "CVE-2016-6662", severidade: "CRITICO", desc: "Remote Root Code Execution" },
  { servico: "nginx 1.16.0", cve: "CVE-2019-9511", severidade: "ALTO", desc: "HTTP/2 DoS" }
];

const alvo = ["Apache 2.4.49", "OpenSSH 8.9", "MySQL 5.7.0", "nginx 1.24.0"];

// Imprima "=== VULNERABILITY SCAN ==="
// Para cada servico do alvo, verifique se ha vuln conhecida:
// Se sim: "[SEVERIDADE] CVE\n  Servico: NOME\n  DESC"
// Se nao: "[OK] SERVICO - sem vulns conhecidas"
// "\\nTotal: N vulnerabilidade(s) encontrada(s)"
`,
    python: `vulns = [
    {"servico": "Apache 2.4.49", "cve": "CVE-2021-41773", "severidade": "CRITICO", "desc": "Path Traversal + RCE"},
    {"servico": "OpenSSH 7.6", "cve": "CVE-2018-15473", "severidade": "MEDIO", "desc": "Username Enumeration"},
    {"servico": "MySQL 5.7.0", "cve": "CVE-2016-6662", "severidade": "CRITICO", "desc": "Remote Root Code Execution"},
    {"servico": "nginx 1.16.0", "cve": "CVE-2019-9511", "severidade": "ALTO", "desc": "HTTP/2 DoS"}
]

alvo = ["Apache 2.4.49", "OpenSSH 8.9", "MySQL 5.7.0", "nginx 1.24.0"]

# Imprima "=== VULNERABILITY SCAN ==="
# Para cada servico do alvo, verifique se ha vuln conhecida:
# Se sim: "[SEVERIDADE] CVE\n  Servico: NOME\n  DESC"
# Se nao: "[OK] SERVICO - sem vulns conhecidas"
# "\\nTotal: N vulnerabilidade(s) encontrada(s)"
`,
  },
  expectedOutput: '=== VULNERABILITY SCAN ===\n[CRITICO] CVE-2021-41773\n  Servico: Apache 2.4.49\n  Path Traversal + RCE\n[OK] OpenSSH 8.9 - sem vulns conhecidas\n[CRITICO] CVE-2016-6662\n  Servico: MySQL 5.7.0\n  Remote Root Code Execution\n[OK] nginx 1.24.0 - sem vulns conhecidas\n\nTotal: 2 vulnerabilidade(s) encontrada(s)',
  hints: ['Apache 2.4.49 e MySQL 5.7.0 têm CVEs críticas. As versões mais novas estão seguras.'],
  difficulty: 'medium',
};

const theory3: TheoryChallenge = {
  id: 'scan.3', type: 'theory', episode: 41, room: '41.3',
  title: 'Scanner — Resumo',
  description: 'Scanners são ferramentas essenciais no arsenal de qualquer pentester.',
  content: `
**O que você aprendeu:**
• Port scanning — descobrir serviços ativos
• Vulnerability scanning — comparar com CVEs
• Classificação de severidade CVSS

**Ferramentas para praticar:**
• Nmap: nmap -sV -sC alvo (scan de versão + scripts)
• Nuclei: scanner moderno com templates YAML
• Nikto: scanner web simples e eficaz
• Masscan: scan ultra-rápido de portas
  `,
};

export const scannerChallenges: Challenge[] = [theory0, code1, code2, theory3];
