import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0: TheoryChallenge = {
  id: 'auto.0', type: 'theory', episode: 42, room: '42.0',
  title: 'Episódio 42 — Automação de Segurança',
  description: 'Automatizar tarefas repetitivas é o que separa um analista júnior de um sênior. Scripts economizam horas de trabalho.',
  content: `
**Por que automatizar?**
• Análise de 10.000 logs manualmente = dias
• Script que analisa 10.000 logs = segundos
• Menos erro humano, mais consistência

**O que automatizar:**
• Análise de logs (SIEM, firewall, IDS)
• Verificação de compliance (senhas, configs)
• Monitoramento contínuo (uptime, portas)
• Resposta a incidentes (bloqueio automático)
• Relatórios periódicos

**Padrão de automação:**
1. **Coletar** dados (logs, configs, tráfego)
2. **Processar** (filtrar, parsear, enriquecer)
3. **Analisar** (regras, thresholds, anomalias)
4. **Agir** (alertar, bloquear, documentar)
5. **Reportar** (dashboard, email, ticket)

**Linguagens mais usadas:**
• Python — scripts, automação, ferramentas
• Bash — automação de sistema Linux
• PowerShell — automação Windows
  `,
};

const code1: CodeChallenge = {
  id: 'auto.1', type: 'code', episode: 42, room: '42.1',
  title: 'Analisador de logs automatizado',
  description: 'Crie um script que processa logs automaticamente e gera alertas. **Execute**!',
  instructions: 'Parse logs automaticamente, conte niveis e detecte IPs suspeitos.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const logs = [
  "2024-01-15 14:00:01 INFO Login bem-sucedido user=admin ip=192.168.1.10",
  "2024-01-15 14:00:05 WARN Falha de login user=admin ip=10.0.0.99",
  "2024-01-15 14:00:06 WARN Falha de login user=admin ip=10.0.0.99",
  "2024-01-15 14:00:07 WARN Falha de login user=admin ip=10.0.0.99",
  "2024-01-15 14:00:08 WARN Falha de login user=admin ip=10.0.0.99",
  "2024-01-15 14:00:09 WARN Falha de login user=admin ip=10.0.0.99",
  "2024-01-15 14:01:00 ERROR Acesso negado path=/admin ip=45.33.32.1",
  "2024-01-15 14:02:00 INFO Login bem-sucedido user=joao ip=192.168.1.20"
];

// Parse cada log: nivel e o 3o campo, extraia IPs com regex /ip=(\\S+)/
// Conte niveis e IPs suspeitos (somente niveis != INFO)
// Imprima "=== RELATORIO AUTOMATICO ==="
// "INFO: N | WARN: N | ERROR: N"
// "\\nIPs suspeitos:"
// "  [ALERTA] IP - N eventos" para IPs com >=3 eventos
`,
    python: `logs = [
    "2024-01-15 14:00:01 INFO Login bem-sucedido user=admin ip=192.168.1.10",
    "2024-01-15 14:00:05 WARN Falha de login user=admin ip=10.0.0.99",
    "2024-01-15 14:00:06 WARN Falha de login user=admin ip=10.0.0.99",
    "2024-01-15 14:00:07 WARN Falha de login user=admin ip=10.0.0.99",
    "2024-01-15 14:00:08 WARN Falha de login user=admin ip=10.0.0.99",
    "2024-01-15 14:00:09 WARN Falha de login user=admin ip=10.0.0.99",
    "2024-01-15 14:01:00 ERROR Acesso negado path=/admin ip=45.33.32.1",
    "2024-01-15 14:02:00 INFO Login bem-sucedido user=joao ip=192.168.1.20"
]

import re

# Parse cada log: nivel e o 3o campo, extraia IPs com regex r"ip=(\\S+)"
# Conte niveis e IPs suspeitos (somente niveis != INFO)
# Imprima "=== RELATORIO AUTOMATICO ==="
# "INFO: N | WARN: N | ERROR: N"
# "\\nIPs suspeitos:"
# "  [ALERTA] IP - N eventos" para IPs com >=3 eventos
`,
  },
  expectedOutput: '=== RELATORIO AUTOMATICO ===\nINFO: 2 | WARN: 5 | ERROR: 1\n\nIPs suspeitos:\n  [ALERTA] 10.0.0.99 - 5 eventos',
  hints: ['IP 10.0.0.99 tem 5 falhas de login — claramente um brute force.'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'auto.2', type: 'code', episode: 42, room: '42.2',
  title: 'Compliance checker automatizado',
  description: 'Crie um verificador automático de compliance que audita configurações de segurança. **Execute**!',
  instructions: 'Verifique compliance de cada servidor contra os requisitos e gere relatorio.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const servidores = [
  {
    nome: "web-01",
    config: { https: true, senhaForte: true, firewall: true, backup: true, logs: true, mfa: false }
  },
  {
    nome: "db-01",
    config: { https: false, senhaForte: true, firewall: true, backup: false, logs: true, mfa: false }
  },
  {
    nome: "app-01",
    config: { https: true, senhaForte: false, firewall: false, backup: true, logs: false, mfa: false }
  }
];

const requisitos = ["https", "senhaForte", "firewall", "backup", "logs"];

// Imprima "=== COMPLIANCE CHECK ==="
// Para cada servidor: verifique % dos requisitos atendidos
// "\\nNOME: STATUS (PCT%)" onde STATUS:
//   100%="CONFORME", >=60%="PARCIAL", <60%="NAO-CONFORME"
// Se falhas: "  Falhas: falha1, falha2, ..."
`,
    python: `servidores = [
    {
        "nome": "web-01",
        "config": {"https": True, "senhaForte": True, "firewall": True, "backup": True, "logs": True, "mfa": False}
    },
    {
        "nome": "db-01",
        "config": {"https": False, "senhaForte": True, "firewall": True, "backup": False, "logs": True, "mfa": False}
    },
    {
        "nome": "app-01",
        "config": {"https": True, "senhaForte": False, "firewall": False, "backup": True, "logs": False, "mfa": False}
    }
]

requisitos = ["https", "senhaForte", "firewall", "backup", "logs"]

# Imprima "=== COMPLIANCE CHECK ==="
# Para cada servidor: verifique % dos requisitos atendidos
# "\\nNOME: STATUS (PCT%)" onde STATUS:
#   100%="CONFORME", >=60%="PARCIAL", <60%="NAO-CONFORME"
# Se falhas: "  Falhas: falha1, falha2, ..."
`,
  },
  expectedOutput: '=== COMPLIANCE CHECK ===\n\nweb-01: CONFORME (100%)\n\ndb-01: PARCIAL (60%)\n  Falhas: https, backup\n\napp-01: PARCIAL (60%)\n  Falhas: senhaForte, firewall, logs',
  hints: ['web-01 está 100% conforme. db-01 e app-01 têm falhas a corrigir.'],
  difficulty: 'medium',
};

const theory3: TheoryChallenge = {
  id: 'auto.3', type: 'theory', episode: 42, room: '42.3',
  title: 'Automação — Resumo',
  description: 'Automação é o superpoder que multiplica sua capacidade como profissional de segurança.',
  content: `
**O que você aprendeu:**
• Análise automatizada de logs
• Compliance checker automático
• Padrão: Coletar → Processar → Analisar → Agir → Reportar

**Ferramentas de automação em segurança:**
• Ansible — automação de configuração
• Terraform — infraestrutura como código
• SOAR — Security Orchestration, Automation and Response
• Cron jobs — agendamento de scripts
  `,
};

export const automationChallenges: Challenge[] = [theory0, code1, code2, theory3];
