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
  instructions: 'Execute e veja o relatório gerado.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const achados = [
  { titulo: "SQL Injection em /login", cvss: 9.8, tipo: "SQLi", correcao: "Usar prepared statements" },
  { titulo: "XSS Stored em comentarios", cvss: 6.1, tipo: "XSS", correcao: "Sanitizar output com encoding" },
  { titulo: "Senha padrao no admin", cvss: 9.1, tipo: "Auth", correcao: "Forcar troca de senha no primeiro login" },
  { titulo: "Versao do servidor exposta", cvss: 2.0, tipo: "Info", correcao: "Remover header Server" },
  { titulo: "CSRF em /transfer", cvss: 5.5, tipo: "CSRF", correcao: "Implementar token anti-CSRF" }
];

function severidade(cvss) {
  if (cvss >= 9) return "CRITICO";
  if (cvss >= 7) return "ALTO";
  if (cvss >= 4) return "MEDIO";
  if (cvss > 0) return "BAIXO";
  return "INFO";
}

achados.sort(function(a, b) { return b.cvss - a.cvss; });

console.log("=== RELATORIO DE PENTEST ===");
console.log("Data: 2024-03-15");
console.log("Alvo: app.empresa.com");
console.log("Achados: " + achados.length + " vulnerabilidades\\n");

for (let i = 0; i < achados.length; i++) {
  const a = achados[i];
  console.log((i + 1) + ". [" + severidade(a.cvss) + " - CVSS " + a.cvss + "] " + a.titulo);
  console.log("   Correcao: " + a.correcao);
}
`,
    python: `achados = [
    {"titulo": "SQL Injection em /login", "cvss": 9.8, "tipo": "SQLi", "correcao": "Usar prepared statements"},
    {"titulo": "XSS Stored em comentarios", "cvss": 6.1, "tipo": "XSS", "correcao": "Sanitizar output com encoding"},
    {"titulo": "Senha padrao no admin", "cvss": 9.1, "tipo": "Auth", "correcao": "Forcar troca de senha no primeiro login"},
    {"titulo": "Versao do servidor exposta", "cvss": 2.0, "tipo": "Info", "correcao": "Remover header Server"},
    {"titulo": "CSRF em /transfer", "cvss": 5.5, "tipo": "CSRF", "correcao": "Implementar token anti-CSRF"}
]

def severidade(cvss):
    if cvss >= 9: return "CRITICO"
    if cvss >= 7: return "ALTO"
    if cvss >= 4: return "MEDIO"
    if cvss > 0: return "BAIXO"
    return "INFO"

achados.sort(key=lambda a: a["cvss"], reverse=True)

print("=== RELATORIO DE PENTEST ===")
print("Data: 2024-03-15")
print("Alvo: app.empresa.com")
print("Achados: " + str(len(achados)) + " vulnerabilidades\\n")

for i in range(len(achados)):
    a = achados[i]
    print(str(i + 1) + ". [" + severidade(a["cvss"]) + " - CVSS " + str(a["cvss"]) + "] " + a["titulo"])
    print("   Correcao: " + a["correcao"])
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
  instructions: 'Execute e veja o dashboard.',
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
let totalVulns = 0;
let pontuacao = 0;

console.log("=== DASHBOARD DE RISCO ===\\n");
for (let i = 0; i < vulns.length; i++) {
  const v = vulns[i];
  totalVulns += v.qtd;
  pontuacao += v.qtd * pesos[v.sev];
  const barra = "#".repeat(v.qtd);
  console.log("  " + v.sev.padEnd(8) + " | " + barra + " (" + v.qtd + ")");
}

const maxPontos = totalVulns * 10;
const risco = Math.round((pontuacao / maxPontos) * 100);

console.log("\\nTotal: " + totalVulns + " vulnerabilidades");
console.log("Pontuacao de risco: " + pontuacao + "/" + maxPontos + " (" + risco + "%)");
if (risco >= 60) console.log("Status: RISCO ALTO - acao imediata necessaria");
else if (risco >= 30) console.log("Status: RISCO MEDIO - planejar correcoes");
else console.log("Status: RISCO BAIXO - monitorar");
`,
    python: `vulns = [
    {"sev": "CRITICO", "qtd": 2},
    {"sev": "ALTO", "qtd": 1},
    {"sev": "MEDIO", "qtd": 4},
    {"sev": "BAIXO", "qtd": 3},
    {"sev": "INFO", "qtd": 5}
]

pesos = {"CRITICO": 10, "ALTO": 7, "MEDIO": 4, "BAIXO": 1, "INFO": 0}
total_vulns = 0
pontuacao = 0

print("=== DASHBOARD DE RISCO ===\\n")
for v in vulns:
    total_vulns += v["qtd"]
    pontuacao += v["qtd"] * pesos[v["sev"]]
    barra = "#" * v["qtd"]
    print("  " + v["sev"].ljust(8) + " | " + barra + " (" + str(v["qtd"]) + ")")

max_pontos = total_vulns * 10
risco = round((pontuacao / max_pontos) * 100)

print("\\nTotal: " + str(total_vulns) + " vulnerabilidades")
print("Pontuacao de risco: " + str(pontuacao) + "/" + str(max_pontos) + " (" + str(risco) + "%)")
if risco >= 60: print("Status: RISCO ALTO - acao imediata necessaria")
elif risco >= 30: print("Status: RISCO MEDIO - planejar correcoes")
else: print("Status: RISCO BAIXO - monitorar")
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
