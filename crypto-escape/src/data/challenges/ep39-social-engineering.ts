import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0: TheoryChallenge = {
  id: 'soceng.0', type: 'theory', episode: 39, room: '39.0',
  title: 'Episódio 39 — Engenharia Social',
  description: 'O elo mais fraco da segurança não é o software — são as pessoas. Engenharia social explora a psicologia humana.',
  content: `
**O que é Engenharia Social?**
Manipulação psicológica para obter informações ou acesso sem usar vulnerabilidades técnicas.

**Tipos de ataque:**
• **Phishing:** emails falsos imitando empresas legítimas
• **Spear Phishing:** phishing direcionado a uma pessoa específica
• **Vishing:** phishing por telefone (voice phishing)
• **Pretexting:** criar uma história falsa para obter informações
• **Baiting:** deixar USB infectado em local público
• **Tailgating:** entrar em área restrita seguindo alguém

**Princípios de persuasão (Cialdini):**
1. **Autoridade:** "Sou do TI, preciso da sua senha"
2. **Urgência:** "Sua conta será bloqueada em 5 minutos"
3. **Reciprocidade:** "Te ajudei ontem, agora preciso de um favor"
4. **Escassez:** "Últimas vagas para o treinamento"
5. **Prova social:** "Todos do departamento já atualizaram"
6. **Afinidade:** "Também sou fã do Corinthians!"
  `,
};

const code1: CodeChallenge = {
  id: 'soceng.1', type: 'code', episode: 39, room: '39.1',
  title: 'Detector de phishing',
  description: 'Crie um analisador que detecta indicadores de phishing em emails. **Execute**!',
  instructions: 'Crie analisarEmail(email) que pontua indicadores de phishing e retorna o veredicto.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const emails = [
  {
    remetente: "suporte@banco-seguro.com.br",
    assunto: "Atualize seus dados urgente!!!",
    corpo: "Clique aqui: http://banc0-segur0.xyz/login",
    temAnexo: false
  },
  {
    remetente: "maria@empresa.com",
    assunto: "Reuniao amanha as 10h",
    corpo: "Oi equipe, reuniao confirmada na sala 3.",
    temAnexo: false
  },
  {
    remetente: "netflix-suporte@gmail.com",
    assunto: "Sua conta sera suspensa!!!",
    corpo: "Confirme pagamento: http://netflix-verify.tk/pay",
    temAnexo: true
  }
];

// Crie analisarEmail(email) que pontua indicadores:
// +2 se "!!!" ou "urgente" no assunto -> "Urgencia excessiva"
// +3 se ".xyz" ou ".tk" no corpo -> "Dominio suspeito"
// +3 se "gmail.com" + "netflix" no remetente -> "Empresa usando Gmail"
// +1 se "Clique aqui" ou "Confirme" no corpo -> "Call-to-action suspeito"
// >=4: "PHISHING", >=2: "SUSPEITO", senao: "SEGURO"
// Retorne "VEREDICTO (alerta1, alerta2, ...)"
// Imprima "REMETENTE: RESULTADO" para cada email
`,
    python: `emails = [
    {
        "remetente": "suporte@banco-seguro.com.br",
        "assunto": "Atualize seus dados urgente!!!",
        "corpo": "Clique aqui: http://banc0-segur0.xyz/login",
        "temAnexo": False
    },
    {
        "remetente": "maria@empresa.com",
        "assunto": "Reuniao amanha as 10h",
        "corpo": "Oi equipe, reuniao confirmada na sala 3.",
        "temAnexo": False
    },
    {
        "remetente": "netflix-suporte@gmail.com",
        "assunto": "Sua conta sera suspensa!!!",
        "corpo": "Confirme pagamento: http://netflix-verify.tk/pay",
        "temAnexo": True
    }
]

# Crie analisar_email(email) que pontua indicadores:
# +2 se "!!!" ou "urgente" no assunto -> "Urgencia excessiva"
# +3 se ".xyz" ou ".tk" no corpo -> "Dominio suspeito"
# +3 se "gmail.com" + "netflix" no remetente -> "Empresa usando Gmail"
# +1 se "Clique aqui" ou "Confirme" no corpo -> "Call-to-action suspeito"
# >=4: "PHISHING", >=2: "SUSPEITO", senao: "SEGURO"
# Retorne "VEREDICTO (alerta1, alerta2, ...)"
# Imprima "REMETENTE: RESULTADO" para cada email
`,
  },
  expectedOutput: 'suporte@banco-seguro.com.br: PHISHING (Urgencia excessiva, Dominio suspeito, Call-to-action suspeito)\nmaria@empresa.com: SEGURO ()\nnetflix-suporte@gmail.com: PHISHING (Urgencia excessiva, Dominio suspeito, Empresa usando Gmail, Call-to-action suspeito)',
  hints: ['Phishing combina urgência, domínios falsos e remetentes suspeitos.'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'soceng.2', type: 'code', episode: 39, room: '39.2',
  title: 'Simulador de pretexting',
  description: 'Analise cenários de pretexting e identifique as técnicas de manipulação usadas. **Execute**!',
  instructions: 'Analise cenarios de pretexting, liste tecnicas e classifique o risco.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const cenarios = [
  {
    frase: "Oi, sou o novo gerente de TI. Preciso da senha do servidor urgente pra resolver um problema critico.",
    tecnicas: ["autoridade", "urgencia"]
  },
  {
    frase: "Lembra que te ajudei com aquele relatorio? Agora preciso que me passe o acesso ao sistema financeiro.",
    tecnicas: ["reciprocidade", "afinidade"]
  },
  {
    frase: "Todos os funcionarios ja atualizaram a senha no link. Voce e o unico que falta. So restam 10 minutos.",
    tecnicas: ["prova_social", "urgencia", "escassez"]
  }
];

// Para cada cenario imprima:
// "Cenario N: \"PRIMEIROS_50_CHARS...\""
// "  Tecnicas: tecnica1, tecnica2, ..."
// "  Risco: ALTO (>=3 tecnicas), MEDIO (>=2) ou BAIXO"
`,
    python: `cenarios = [
    {
        "frase": "Oi, sou o novo gerente de TI. Preciso da senha do servidor urgente pra resolver um problema critico.",
        "tecnicas": ["autoridade", "urgencia"]
    },
    {
        "frase": "Lembra que te ajudei com aquele relatorio? Agora preciso que me passe o acesso ao sistema financeiro.",
        "tecnicas": ["reciprocidade", "afinidade"]
    },
    {
        "frase": "Todos os funcionarios ja atualizaram a senha no link. Voce e o unico que falta. So restam 10 minutos.",
        "tecnicas": ["prova_social", "urgencia", "escassez"]
    }
]

# Para cada cenario imprima:
# "Cenario N: \"PRIMEIROS_50_CHARS...\""
# "  Tecnicas: tecnica1, tecnica2, ..."
# "  Risco: ALTO (>=3 tecnicas), MEDIO (>=2) ou BAIXO"
`,
  },
  expectedOutput: 'Cenario 1: "Oi, sou o novo gerente de TI. Preciso da senh..."\n  Tecnicas: autoridade, urgencia\n  Risco: MEDIO\nCenario 2: "Lembra que te ajudei com aquele relatorio? Agora ..."\n  Tecnicas: reciprocidade, afinidade\n  Risco: MEDIO\nCenario 3: "Todos os funcionarios ja atualizaram a senha no li..."\n  Tecnicas: prova_social, urgencia, escassez\n  Risco: ALTO',
  hints: ['Quanto mais técnicas combinadas, mais perigoso o ataque de engenharia social.'],
  difficulty: 'medium',
};

const theory3: TheoryChallenge = {
  id: 'soceng.3', type: 'theory', episode: 39, room: '39.3',
  title: 'Módulo 7 completo! OSINT dominado!',
  description: 'Você agora conhece as técnicas de reconhecimento e investigação usadas por profissionais.',
  content: `
**Resumo do Módulo 7 — OSINT:**
• Ep 37: Google Dorks — buscas avançadas e exposição
• Ep 38: Metadados — EXIF, documentos e perfilamento
• Ep 39: Engenharia Social — phishing, pretexting

**Carreiras relacionadas:**
• OSINT Analyst
• Threat Intelligence Analyst
• Social Engineering Tester
• Red Team Operator

**Próximo módulo: Regex e Automação!**
Ferramentas avançadas para automação de análise de segurança.
  `,
};

export const socialEngineeringChallenges: Challenge[] = [theory0, code1, code2, theory3];
