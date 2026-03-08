import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0: TheoryChallenge = {
  id: 'logic.0', type: 'theory', episode: 20, room: '20.0',
  title: 'Episódio 20 — Operadores Lógicos',
  description: 'Aprenda a combinar condições com AND, OR e NOT — essencial para regras de segurança.',
  content: `
**Por que combinar condições?**
Na vida real, decisões de segurança raramente são simples:
• "Se o IP é suspeito **E** a senha está errada → bloquear"
• "Se o usuário é admin **OU** é moderador → permitir acesso"
• "Se **NÃO** está autenticado → redirecionar para login"

**Os 3 operadores lógicos:**
| Operador | JS | Python | Significado |
|----------|-----|--------|-------------|
| E | \`&&\` | \`and\` | Ambos precisam ser verdadeiros |
| OU | \`\\|\\|\` | \`or\` | Pelo menos um precisa ser verdadeiro |
| NÃO | \`!\` | \`not\` | Inverte o valor |

**Tabela verdade do AND (&&):**
• true && true → true
• true && false → false
• false && true → false
• false && false → false

Na próxima sala vamos praticar!
  `,
};

const code1: CodeChallenge = {
  id: 'logic.1', type: 'code', episode: 20, room: '20.1',
  title: 'AND — ambas condições',
  description: 'O operador AND (&&) só retorna true se AMBAS as condições forem verdadeiras. **Execute**!',
  instructions: 'Execute e veja o AND funcionando.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const idade = 25;\nconst temCarteira = true;\n\nif (idade >= 18 && temCarteira) {\n  console.log("Pode dirigir");\n} else {\n  console.log("Nao pode dirigir");\n}\n`,
    python: `idade = 25\ntem_carteira = True\n\nif idade >= 18 and tem_carteira:\n    print("Pode dirigir")\nelse:\n    print("Nao pode dirigir")\n`,
  },
  expectedOutput: 'Pode dirigir',
  hints: ['O código já está pronto! Execute.', 'Ambas condições são true, então entra no if.'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'logic.2', type: 'code', episode: 20, room: '20.2',
  title: 'Quebrando o AND',
  description: 'Mude **temCarteira** para **false** e veja o AND falhar — uma condição false já é suficiente.',
  instructions: 'Mude temCarteira para false.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const idade = 25;\n// Mude para false:\nconst temCarteira = true;\n\nif (idade >= 18 && temCarteira) {\n  console.log("Pode dirigir");\n} else {\n  console.log("Nao pode dirigir");\n}\n`,
    python: `idade = 25\n# Mude para False:\ntem_carteira = True\n\nif idade >= 18 and tem_carteira:\n    print("Pode dirigir")\nelse:\n    print("Nao pode dirigir")\n`,
  },
  expectedOutput: 'Nao pode dirigir',
  hints: ['Mude true para false na variável temCarteira.'],
  difficulty: 'easy',
};

const code3: CodeChallenge = {
  id: 'logic.3', type: 'code', episode: 20, room: '20.3',
  title: 'OR — pelo menos uma condição',
  description: 'O operador OR (||) retorna true se PELO MENOS UMA condição for verdadeira. **Execute**!',
  instructions: 'Execute e veja o OR funcionando.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const role = "moderador";\n\nif (role == "admin" || role == "moderador") {\n  console.log("Acesso permitido");\n} else {\n  console.log("Acesso negado");\n}\n`,
    python: `role = "moderador"\n\nif role == "admin" or role == "moderador":\n    print("Acesso permitido")\nelse:\n    print("Acesso negado")\n`,
  },
  expectedOutput: 'Acesso permitido',
  hints: ['Mesmo role não sendo "admin", é "moderador" — uma condição true basta no OR.'],
  difficulty: 'easy',
};

const code4: CodeChallenge = {
  id: 'logic.4', type: 'code', episode: 20, room: '20.4',
  title: 'NOT — invertendo lógica',
  description: 'O NOT (!) inverte: true vira false, false vira true. Muito usado em segurança! **Execute**.',
  instructions: 'Execute e veja o NOT funcionando.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const autenticado = false;\n\nif (!autenticado) {\n  console.log("Faca login primeiro");\n} else {\n  console.log("Bem-vindo");\n}\n`,
    python: `autenticado = False\n\nif not autenticado:\n    print("Faca login primeiro")\nelse:\n    print("Bem-vindo")\n`,
  },
  expectedOutput: 'Faca login primeiro',
  hints: ['!false vira true, então entra no if.'],
  difficulty: 'easy',
};

const code5: CodeChallenge = {
  id: 'logic.5', type: 'code', episode: 20, room: '20.5',
  title: 'Regra de firewall simulada',
  description: 'Combine tudo! Simule uma regra: bloqueia se IP é suspeito **E** tentativas > 3, **OU** se está na blacklist.',
  instructions: 'Execute e veja a regra de firewall.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const ipSuspeito = true;\nconst tentativas = 5;\nconst naBlacklist = false;\n\nif ((ipSuspeito && tentativas > 3) || naBlacklist) {\n  console.log("BLOQUEADO");\n} else {\n  console.log("PERMITIDO");\n}\n`,
    python: `ip_suspeito = True\ntentativas = 5\nna_blacklist = False\n\nif (ip_suspeito and tentativas > 3) or na_blacklist:\n    print("BLOQUEADO")\nelse:\n    print("PERMITIDO")\n`,
  },
  expectedOutput: 'BLOQUEADO',
  hints: ['ipSuspeito é true E tentativas (5) > 3 → true. Não precisa checar blacklist.'],
  difficulty: 'easy',
};

const theory6: TheoryChallenge = {
  id: 'logic.6', type: 'theory', episode: 20, room: '20.6',
  title: 'Parabéns! Você domina lógica!',
  description: 'Operadores lógicos são a base de firewalls, IDS e toda tomada de decisão em segurança.',
  content: `
**O que você aprendeu:**
• AND (&&/and): ambos precisam ser true
• OR (||/or): pelo menos um precisa ser true
• NOT (!/not): inverte o valor
• Combinar operadores em regras complexas

**Onde isso é usado:**
• Firewalls: "se porta == 22 AND origem != rede_interna → BLOQUEAR"
• IDS: "se tentativas > 5 OR payload.includes('exploit') → ALERTAR"
• Autenticação: "se NOT autenticado → redirecionar"
  `,
};

export const logicOperatorsChallenges: Challenge[] = [theory0, code1, code2, code3, code4, code5, theory6];
