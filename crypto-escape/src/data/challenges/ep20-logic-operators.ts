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
  instructions: 'Use o operador AND (&&/and) para verificar se a pessoa pode dirigir: idade >= 18 E temCarteira true.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const idade = 25;\nconst temCarteira = true;\n\n// Use o operador AND (&&) para verificar:\n// - idade >= 18 E temCarteira\n// Se ambas true: console.log("Pode dirigir")\n// Senao: console.log("Nao pode dirigir")\n`,
    python: `idade = 25\ntem_carteira = True\n\n# Use o operador AND (and) para verificar:\n# - idade >= 18 E tem_carteira\n# Se ambas true: print("Pode dirigir")\n# Senao: print("Nao pode dirigir")\n`,
  },
  expectedOutput: 'Pode dirigir',
  hints: ['O código já está pronto! Execute.', 'Ambas condições são true, então entra no if.'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'logic.2', type: 'code', episode: 20, room: '20.2',
  title: 'Quebrando o AND',
  description: 'Mude **temCarteira** para **false** e veja o AND falhar — uma condição false já é suficiente.',
  instructions: 'Mude temCarteira para false e escreva a lógica com AND para verificar se pode dirigir.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const idade = 25;\nconst temCarteira = true;\n\n// 1. Mude temCarteira para false acima\n// 2. Escreva um if/else com AND (&&):\n//    idade >= 18 && temCarteira\n// Se true: console.log("Pode dirigir")\n// Se false: console.log("Nao pode dirigir")\n`,
    python: `idade = 25\ntem_carteira = True\n\n# 1. Mude tem_carteira para False acima\n# 2. Escreva um if/else com AND (and):\n#    idade >= 18 and tem_carteira\n# Se true: print("Pode dirigir")\n# Se false: print("Nao pode dirigir")\n`,
  },
  expectedOutput: 'Nao pode dirigir',
  hints: ['Mude true para false na variável temCarteira.'],
  difficulty: 'easy',
};

const code3: CodeChallenge = {
  id: 'logic.3', type: 'code', episode: 20, room: '20.3',
  title: 'OR — pelo menos uma condição',
  description: 'O operador OR (||) retorna true se PELO MENOS UMA condição for verdadeira. **Execute**!',
  instructions: 'Use o operador OR (||/or) para verificar se o role é "admin" ou "moderador" e imprima o resultado.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const role = "moderador";\n\n// Use OR (||) para verificar:\n// - role == "admin" OU role == "moderador"\n// Se true: console.log("Acesso permitido")\n// Senao: console.log("Acesso negado")\n`,
    python: `role = "moderador"\n\n# Use OR (or) para verificar:\n# - role == "admin" OU role == "moderador"\n# Se true: print("Acesso permitido")\n# Senao: print("Acesso negado")\n`,
  },
  expectedOutput: 'Acesso permitido',
  hints: ['Mesmo role não sendo "admin", é "moderador" — uma condição true basta no OR.'],
  difficulty: 'easy',
};

const code4: CodeChallenge = {
  id: 'logic.4', type: 'code', episode: 20, room: '20.4',
  title: 'NOT — invertendo lógica',
  description: 'O NOT (!) inverte: true vira false, false vira true. Muito usado em segurança! **Execute**.',
  instructions: 'Use o operador NOT (!/not) para verificar se o usuário NÃO está autenticado e imprima a mensagem correta.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const autenticado = false;\n\n// Use NOT (!) para verificar:\n// - Se NAO autenticado: console.log("Faca login primeiro")\n// - Senao: console.log("Bem-vindo")\n`,
    python: `autenticado = False\n\n# Use NOT (not) para verificar:\n# - Se NAO autenticado: print("Faca login primeiro")\n# - Senao: print("Bem-vindo")\n`,
  },
  expectedOutput: 'Faca login primeiro',
  hints: ['!false vira true, então entra no if.'],
  difficulty: 'easy',
};

const code5: CodeChallenge = {
  id: 'logic.5', type: 'code', episode: 20, room: '20.5',
  title: 'Regra de firewall simulada',
  description: 'Combine tudo! Simule uma regra: bloqueia se IP é suspeito **E** tentativas > 3, **OU** se está na blacklist.',
  instructions: 'Combine AND, OR para criar uma regra de firewall: bloqueia se (IP suspeito E tentativas > 3) OU está na blacklist.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const ipSuspeito = true;\nconst tentativas = 5;\nconst naBlacklist = false;\n\n// Crie a regra de firewall combinando AND (&&) e OR (||):\n// Bloqueia se: (ipSuspeito E tentativas > 3) OU naBlacklist\n// Se bloqueado: console.log("BLOQUEADO")\n// Senao: console.log("PERMITIDO")\n`,
    python: `ip_suspeito = True\ntentativas = 5\nna_blacklist = False\n\n# Crie a regra de firewall combinando and e or:\n# Bloqueia se: (ip_suspeito e tentativas > 3) ou na_blacklist\n# Se bloqueado: print("BLOQUEADO")\n# Senao: print("PERMITIDO")\n`,
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
