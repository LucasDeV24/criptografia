import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0: TheoryChallenge = {
  id: 'advhash.0', type: 'theory', episode: 32, room: '32.0',
  title: 'Episódio 32 — Hashing Avançado',
  description: 'SHA-256, salt, pepper, rainbow tables — como senhas são protegidas (e atacadas) profissionalmente.',
  content: `
**Hash simples NÃO é suficiente!**
Problema: se duas pessoas usam a mesma senha, o hash é igual.
Um hacker com uma tabela de hashes pré-calculados (rainbow table) quebra tudo.

**Solução 1 — Salt:**
Adiciona texto aleatório ANTES de fazer o hash:
• Senha: "1234" + Salt: "x9f2" → Hash de "1234x9f2"
• Mesmo "1234" com salt diferente → hash diferente!

**Solução 2 — Pepper:**
Um segredo GLOBAL adicionado a todas as senhas:
• Senha: "1234" + Salt: "x9f2" + Pepper: "SECRETO"
• Hash de "1234x9f2SECRETO"

**Solução 3 — Hashing lento (bcrypt):**
Propositalmente LENTO para dificultar força bruta.
MD5: 1 bilhão de tentativas/segundo
bcrypt: ~1.000 tentativas/segundo
  `,
};

const code1: CodeChallenge = {
  id: 'advhash.1', type: 'code', episode: 32, room: '32.1',
  title: 'Hash com salt',
  description: 'Veja como o salt torna hashes únicos mesmo para senhas iguais. **Execute**!',
  instructions: 'Execute e veja a diferença.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function hashSimples(texto) {\n  let hash = 0;\n  for (let i = 0; i < texto.length; i++) {\n    hash = ((hash << 5) - hash) + texto.charCodeAt(i);\n    hash = hash & hash;\n  }\n  return Math.abs(hash).toString(16);\n}\n\nconst senha = "password123";\nconst salt1 = "a3f8";\nconst salt2 = "z7k2";\n\nconsole.log("Sem salt: " + hashSimples(senha));\nconsole.log("Salt 1:   " + hashSimples(senha + salt1));\nconsole.log("Salt 2:   " + hashSimples(senha + salt2));\n`,
    python: `def hash_simples(texto):\n    h = 0\n    for c in texto:\n        h = ((h * 31) + ord(c)) & 0xFFFFFFFF\n    return hex(h)[2:]\n\nsenha = "password123"\nsalt1 = "a3f8"\nsalt2 = "z7k2"\n\nprint("Sem salt: " + hash_simples(senha))\nprint("Salt 1:   " + hash_simples(senha + salt1))\nprint("Salt 2:   " + hash_simples(senha + salt2))\n`,
  },
  expectedOutput: ['Sem salt: ', 'Salt 1:   ', 'Salt 2:   '],
  hints: ['Mesma senha com salts diferentes gera hashes totalmente diferentes!'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'advhash.2', type: 'code', episode: 32, room: '32.2',
  title: 'Rainbow table simulada',
  description: 'Veja como um atacante usa uma tabela pré-calculada para quebrar senhas sem salt. **Execute**!',
  instructions: 'Execute e veja o ataque.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function hashSimples(texto) {\n  let hash = 0;\n  for (let i = 0; i < texto.length; i++) {\n    hash = ((hash << 5) - hash) + texto.charCodeAt(i);\n    hash = hash & hash;\n  }\n  return Math.abs(hash).toString(16);\n}\n\nconst rainbowTable = {};\nconst senhasComuns = ["123456", "password", "admin", "qwerty", "letmein"];\n\nfor (let i = 0; i < senhasComuns.length; i++) {\n  rainbowTable[hashSimples(senhasComuns[i])] = senhasComuns[i];\n}\n\nconst hashRoubado = hashSimples("admin");\n\nif (rainbowTable[hashRoubado]) {\n  console.log("Senha quebrada: " + rainbowTable[hashRoubado]);\n} else {\n  console.log("Senha nao encontrada na rainbow table");\n}\n`,
    python: `def hash_simples(texto):\n    h = 0\n    for c in texto:\n        h = ((h * 31) + ord(c)) & 0xFFFFFFFF\n    return hex(h)[2:]\n\nrainbow_table = {}\nsenhas_comuns = ["123456", "password", "admin", "qwerty", "letmein"]\n\nfor senha in senhas_comuns:\n    rainbow_table[hash_simples(senha)] = senha\n\nhash_roubado = hash_simples("admin")\n\nif hash_roubado in rainbow_table:\n    print("Senha quebrada: " + rainbow_table[hash_roubado])\nelse:\n    print("Senha nao encontrada na rainbow table")\n`,
  },
  expectedOutput: 'Senha quebrada: admin',
  hints: ['A rainbow table mapeia hash→senha. Sem salt, é trivial.'],
  difficulty: 'medium',
};

const theory3: TheoryChallenge = {
  id: 'advhash.3', type: 'theory', episode: 32, room: '32.3',
  title: 'Módulo 5 completo! Criptografia Moderna dominada!',
  description: 'Você agora entende como o mundo digital é protegido.',
  content: `
**Resumo do Módulo 5 — Criptografia Moderna:**
• Ep 29: XOR — base de toda criptografia
• Ep 30: Simétrica (AES) — uma chave, rápida
• Ep 31: Assimétrica (RSA) — duas chaves, segura
• Ep 32: Hashing avançado — salt, pepper, rainbow tables

**Hierarquia de proteção de senhas:**
1. MD5 sem salt → PÉSSIMO (quebrável em segundos)
2. SHA-256 sem salt → RUIM (rainbow tables)
3. SHA-256 com salt → BOM
4. bcrypt com salt → ÓTIMO (lento de propósito)
5. Argon2 com salt → MELHOR (padrão atual)

**Próximo módulo: Blue Team e Defesa!**
Aprenda o lado defensivo: firewalls, IDS, resposta a incidentes.
  `,
};

export const advancedHashingChallenges: Challenge[] = [theory0, code1, code2, theory3];
