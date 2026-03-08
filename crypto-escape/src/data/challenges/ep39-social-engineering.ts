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
  instructions: 'Execute e veja a análise dos emails.',
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

function analisarEmail(email) {
  let pontos = 0;
  const alertas = [];

  if (email.assunto.includes("!!!") || email.assunto.includes("urgente")) {
    pontos += 2;
    alertas.push("Urgencia excessiva");
  }
  if (email.corpo.includes(".xyz") || email.corpo.includes(".tk")) {
    pontos += 3;
    alertas.push("Dominio suspeito");
  }
  if (email.remetente.includes("gmail.com") && email.remetente.includes("netflix")) {
    pontos += 3;
    alertas.push("Empresa usando Gmail");
  }
  if (email.corpo.includes("Clique aqui") || email.corpo.includes("Confirme")) {
    pontos += 1;
    alertas.push("Call-to-action suspeito");
  }

  let veredicto = "SEGURO";
  if (pontos >= 4) veredicto = "PHISHING";
  else if (pontos >= 2) veredicto = "SUSPEITO";

  return veredicto + " (" + alertas.join(", ") + ")";
}

for (let i = 0; i < emails.length; i++) {
  console.log(emails[i].remetente + ": " + analisarEmail(emails[i]));
}
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

def analisar_email(email):
    pontos = 0
    alertas = []

    if "!!!" in email["assunto"] or "urgente" in email["assunto"]:
        pontos += 2
        alertas.append("Urgencia excessiva")
    if ".xyz" in email["corpo"] or ".tk" in email["corpo"]:
        pontos += 3
        alertas.append("Dominio suspeito")
    if "gmail.com" in email["remetente"] and "netflix" in email["remetente"]:
        pontos += 3
        alertas.append("Empresa usando Gmail")
    if "Clique aqui" in email["corpo"] or "Confirme" in email["corpo"]:
        pontos += 1
        alertas.append("Call-to-action suspeito")

    veredicto = "SEGURO"
    if pontos >= 4: veredicto = "PHISHING"
    elif pontos >= 2: veredicto = "SUSPEITO"

    return veredicto + " (" + ", ".join(alertas) + ")"

for email in emails:
    print(email["remetente"] + ": " + analisar_email(email))
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
  instructions: 'Execute e veja a análise de cada cenário.',
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

for (let i = 0; i < cenarios.length; i++) {
  const c = cenarios[i];
  console.log("Cenario " + (i + 1) + ": \\"" + c.frase.substring(0, 50) + "...\\"");
  console.log("  Tecnicas: " + c.tecnicas.join(", "));
  console.log("  Risco: " + (c.tecnicas.length >= 3 ? "ALTO" : c.tecnicas.length >= 2 ? "MEDIO" : "BAIXO"));
}
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

for i in range(len(cenarios)):
    c = cenarios[i]
    print("Cenario " + str(i + 1) + ": \\"" + c["frase"][:50] + "...\\"")
    print("  Tecnicas: " + ", ".join(c["tecnicas"]))
    risco = "ALTO" if len(c["tecnicas"]) >= 3 else "MEDIO" if len(c["tecnicas"]) >= 2 else "BAIXO"
    print("  Risco: " + risco)
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
