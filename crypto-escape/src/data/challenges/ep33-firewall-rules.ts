import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0: TheoryChallenge = {
  id: 'fw.0', type: 'theory', episode: 33, room: '33.0',
  title: 'Episódio 33 — Regras de Firewall',
  description: 'Firewalls são a primeira linha de defesa. Aprenda a criar regras que bloqueiam tráfego malicioso.',
  content: `
**O que é um Firewall?**
Um "porteiro digital" que decide o que entra e sai da rede.

**Regras básicas:**
Cada regra tem: AÇÃO + PROTOCOLO + ORIGEM + DESTINO + PORTA

Exemplo:
• PERMITIR TCP de 192.168.1.0/24 para QUALQUER porta 443 → Permite HTTPS da rede interna
• BLOQUEAR TCP de QUALQUER para SERVIDOR porta 22 → Bloqueia SSH externo
• PERMITIR UDP de QUALQUER para DNS porta 53 → Permite consultas DNS

**Políticas:**
• **Whitelist (allow list):** bloqueia tudo, permite apenas o especificado
• **Blacklist (deny list):** permite tudo, bloqueia apenas o especificado
• Whitelist é MAIS seguro!

**Ordem importa:**
Regras são avaliadas de cima para baixo. A primeira que combina é aplicada.
  `,
};

const code1: CodeChallenge = {
  id: 'fw.1', type: 'code', episode: 33, room: '33.1',
  title: 'Criando regras de firewall',
  description: 'Simule um firewall que avalia regras para decidir se permite ou bloqueia tráfego. **Execute**!',
  instructions: 'Crie a funcao avaliar(porta) que verifica regras e retorna a acao correspondente.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const regras = [\n  { acao: "PERMITIR", porta: 443, descricao: "HTTPS" },\n  { acao: "PERMITIR", porta: 80, descricao: "HTTP" },\n  { acao: "BLOQUEAR", porta: 22, descricao: "SSH" },\n  { acao: "BLOQUEAR", porta: 23, descricao: "Telnet" }\n];\n\n// Crie avaliar(porta) que busca na lista e retorna:\n// "ACAO: porta PORTA (DESCRICAO)"\n// Se nao encontrar: "BLOQUEAR: porta PORTA (padrao)"\n// Teste com: 443, 22, 3306\n`,
    python: `regras = [\n    {"acao": "PERMITIR", "porta": 443, "descricao": "HTTPS"},\n    {"acao": "PERMITIR", "porta": 80, "descricao": "HTTP"},\n    {"acao": "BLOQUEAR", "porta": 22, "descricao": "SSH"},\n    {"acao": "BLOQUEAR", "porta": 23, "descricao": "Telnet"}\n]\n\n# Crie avaliar(porta) que busca na lista e retorna:\n# "ACAO: porta PORTA (DESCRICAO)"\n# Se nao encontrar: "BLOQUEAR: porta PORTA (padrao)"\n# Teste com: 443, 22, 3306\n`,
  },
  expectedOutput: 'PERMITIR: porta 443 (HTTPS)\nBLOQUEAR: porta 22 (SSH)\nBLOQUEAR: porta 3306 (padrao)',
  hints: ['Porta 443 = HTTPS (permitido), 22 = SSH (bloqueado), 3306 = não na lista (bloqueado por padrão).'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'fw.2', type: 'code', episode: 33, room: '33.2',
  title: 'Firewall com IP filtering',
  description: 'Agora o firewall verifica o IP de origem também. **Execute**!',
  instructions: 'Crie a funcao verificarIP(ip) que verifica se o IP esta na blacklist.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const blacklist = ["10.0.0.99", "45.33.32.1", "192.168.1.666"];\n\n// Crie verificarIP(ip) que retorna:\n// "BLOQUEADO: IP esta na blacklist" ou "PERMITIDO: IP"\n// Teste com: "192.168.1.1", "45.33.32.1", "8.8.8.8"\n`,
    python: `blacklist = ["10.0.0.99", "45.33.32.1", "192.168.1.666"]\n\n# Crie verificar_ip(ip) que retorna:\n# "BLOQUEADO: IP esta na blacklist" ou "PERMITIDO: IP"\n# Teste com: "192.168.1.1", "45.33.32.1", "8.8.8.8"\n`,
  },
  expectedOutput: 'PERMITIDO: 192.168.1.1\nBLOQUEADO: 45.33.32.1 esta na blacklist\nPERMITIDO: 8.8.8.8',
  hints: ['O firewall verifica cada IP contra a blacklist.'],
  difficulty: 'easy',
};

const theory3: TheoryChallenge = {
  id: 'fw.3', type: 'theory', episode: 33, room: '33.3',
  title: 'Firewalls — Resumo',
  description: 'Você agora sabe criar regras de firewall como um administrador de rede.',
  content: `
**O que você aprendeu:**
• Regras: AÇÃO + PORTA + IP
• Política padrão: bloquear tudo (whitelist)
• Blacklist de IPs maliciosos
• Ordem das regras importa

**Firewalls reais:**
• iptables (Linux)
• Windows Firewall
• pfSense (open source)
• AWS Security Groups (cloud)
  `,
};

export const firewallRulesChallenges: Challenge[] = [theory0, code1, code2, theory3];
