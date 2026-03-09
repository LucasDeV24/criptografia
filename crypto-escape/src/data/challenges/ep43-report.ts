import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0: TheoryChallenge = {
  id: 'rep.0', type: 'theory', episode: 43, room: '43.0',
  title: 'Episódio 43 — Relatórios de Segurança',
  description: 'Um pentest sem relatório é só hacking. O relatório é o que transforma achados técnicos em ações de negócio.',
  content: `
**Estrutura de um Relatório de Pentest:**

1. **Sumário Executivo** — para gestores (sem jargão técnico)
2. **Escopo** — o que foi testado e como
3. **Metodologia** — OWASP, PTES, NIST
4. **Achados** — vulnerabilidades com severidade
5. **Evidências** — screenshots, logs, payloads
6. **Recomendações** — como corrigir cada falha
7. **Classificação de Risco** — CVSS score

**Severidade (CVSS):**
• **Crítico (9.0-10.0):** RCE, bypass de autenticação
• **Alto (7.0-8.9):** SQLi, privilege escalation
• **Médio (4.0-6.9):** XSS stored, CSRF
• **Baixo (0.1-3.9):** information disclosure
• **Info (0.0):** boas práticas não seguidas

**Dica profissional:**
O relatório é seu produto final. Pentesters são julgados pela qualidade do relatório tanto quanto pela qualidade dos achados.
  `,
};

const code1: CodeChallenge = {
  id: 'rep.1', type: 'code', episode: 43, room: '43.1',
  title: 'Gerador de relatório de pentest',
  description: 'Crie um gerador automático de relatórios de pentest com classificação CVSS. **Execute**!',
  instructions: 'Gere um relatorio de pentest ordenando achados por CVSS e classificando severidade.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const achados = [
  { titulo: "SQL Injection em /login", cvss: 9.8, tipo: "SQLi", correcao: "Usar prepared statements" },
  { titulo: "XSS Stored em comentarios", cvss: 6.1, tipo: "XSS", correcao: "Sanitizar output com encoding" },
  { titulo: "Senha padrao no admin", cvss: 9.1, tipo: "Auth", correcao: "Forcar troca de senha no primeiro login" },
  { titulo: "Versao do servidor exposta", cvss: 2.0, tipo: "Info", correcao: "Remover header Server" },
  { titulo: "CSRF em /transfer", cvss: 5.5, tipo: "CSRF", correcao: "Implementar token anti-CSRF" }
];

// Crie severidade(cvss): >=9 "CRITICO", >=7 "ALTO", >=4 "MEDIO", >0 "BAIXO", else "INFO"
// Ordene achados por cvss decrescente
// Imprima "=== RELATORIO DE PENTEST ==="
// "Data: 2024-03-15", "Alvo: app.empresa.com"
// "Achados: N vulnerabilidades\\n"
// "N. [SEV - CVSS X] TITULO\\n   Correcao: CORRECAO"
`,
    python: `achados = [
    {"titulo": "SQL Injection em /login", "cvss": 9.8, "tipo": "SQLi", "correcao": "Usar prepared statements"},
    {"titulo": "XSS Stored em comentarios", "cvss": 6.1, "tipo": "XSS", "correcao": "Sanitizar output com encoding"},
    {"titulo": "Senha padrao no admin", "cvss": 9.1, "tipo": "Auth", "correcao": "Forcar troca de senha no primeiro login"},
    {"titulo": "Versao do servidor exposta", "cvss": 2.0, "tipo": "Info", "correcao": "Remover header Server"},
    {"titulo": "CSRF em /transfer", "cvss": 5.5, "tipo": "CSRF", "correcao": "Implementar token anti-CSRF"}
]

# Crie severidade(cvss): >=9 "CRITICO", >=7 "ALTO", >=4 "MEDIO", >0 "BAIXO", else "INFO"
# Ordene achados por cvss decrescente
# Imprima "=== RELATORIO DE PENTEST ==="
# "Data: 2024-03-15", "Alvo: app.empresa.com"
# "Achados: N vulnerabilidades\\n"
# "N. [SEV - CVSS X] TITULO\\n   Correcao: CORRECAO"
`,
  },
  expectedOutput: '=== RELATORIO DE PENTEST ===\nData: 2024-03-15\nAlvo: app.empresa.com\nAchados: 5 vulnerabilidades\n\n1. [CRITICO - CVSS 9.8] SQL Injection em /login\n   Correcao: Usar prepared statements\n2. [CRITICO - CVSS 9.1] Senha padrao no admin\n   Correcao: Forcar troca de senha no primeiro login\n3. [MEDIO - CVSS 6.1] XSS Stored em comentarios\n   Correcao: Sanitizar output com encoding\n4. [MEDIO - CVSS 5.5] CSRF em /transfer\n   Correcao: Implementar token anti-CSRF\n5. [BAIXO - CVSS 2.0] Versao do servidor exposta\n   Correcao: Remover header Server',
  hints: ['Achados são ordenados por CVSS decrescente — críticos primeiro.'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'rep.2', type: 'code', episode: 43, room: '43.2',
  title: 'Dashboard de risco',
  description: 'Gere um sumário executivo com métricas de risco para apresentar à diretoria. **Execute**!',
  instructions: 'Gere um dashboard de risco com barras visuais e pontuacao ponderada.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const vulns = [
  { sev: "CRITICO", qtd: 2 },
  { sev: "ALTO", qtd: 1 },
  { sev: "MEDIO", qtd: 4 },
  { sev: "BAIXO", qtd: 3 },
  { sev: "INFO", qtd: 5 }
];

const pesos = { CRITICO: 10, ALTO: 7, MEDIO: 4, BAIXO: 1, INFO: 0 };

// Imprima "=== DASHBOARD DE RISCO ===\\n"
// Para cada: "  SEV(padEnd 8) | ###(repeat qtd) (QTD)"
// Calcule pontuacao = sum(qtd * peso), maxPontos = totalVulns * 10
// "\\nTotal: N vulnerabilidades"
// "Pontuacao de risco: P/MAX (PCT%)"
// >=60%: "Status: RISCO ALTO - acao imediata necessaria"
// >=30%: "Status: RISCO MEDIO - planejar correcoes"
// else: "Status: RISCO BAIXO - monitorar"
`,
    python: `vulns = [
    {"sev": "CRITICO", "qtd": 2},
    {"sev": "ALTO", "qtd": 1},
    {"sev": "MEDIO", "qtd": 4},
    {"sev": "BAIXO", "qtd": 3},
    {"sev": "INFO", "qtd": 5}
]

pesos = {"CRITICO": 10, "ALTO": 7, "MEDIO": 4, "BAIXO": 1, "INFO": 0}

# Imprima "=== DASHBOARD DE RISCO ===\\n"
# Para cada: "  SEV(ljust 8) | ###(repeat qtd) (QTD)"
# Calcule pontuacao = sum(qtd * peso), max_pontos = total_vulns * 10
# "\\nTotal: N vulnerabilidades"
# "Pontuacao de risco: P/MAX (PCT%)"
# >=60%: "Status: RISCO ALTO - acao imediata necessaria"
# >=30%: "Status: RISCO MEDIO - planejar correcoes"
# else: "Status: RISCO BAIXO - monitorar"
`,
  },
  expectedOutput: '=== DASHBOARD DE RISCO ===\n\n  CRITICO  | ## (2)\n  ALTO     | # (1)\n  MEDIO    | #### (4)\n  BAIXO    | ### (3)\n  INFO     | ##### (5)\n\nTotal: 15 vulnerabilidades\nPontuacao de risco: 46/150 (31%)\nStatus: RISCO MEDIO - planejar correcoes',
  hints: ['A pontuação pondera severidade: críticos valem 10x mais que baixos.'],
  difficulty: 'medium',
};

const theory3: TheoryChallenge = {
  id: 'rep.3', type: 'theory', episode: 43, room: '43.3',
  title: 'Módulo 8 completo! Automação dominada!',
  description: 'Você agora sabe automatizar análises e gerar relatórios profissionais.',
  content: `
**Resumo do Módulo 8 — Regex e Automação:**
• Ep 40: Regex — padrões, extração e validação
• Ep 41: Scanner — port scan e vulnerability scan
• Ep 42: Automação — logs e compliance automáticos
• Ep 43: Relatórios — pentest reports e dashboards

**Certificações relacionadas:**
• CompTIA PenTest+ — foco em pentest e relatórios
• OSCP — Offensive Security Certified Professional
• eJPT — eLearnSecurity Junior Penetration Tester

**Próximo módulo: Missão Final!**
Tudo se junta em um pentest completo.
  `,
};

export const reportChallenges: Challenge[] = [theory0, code1, code2, theory3];
