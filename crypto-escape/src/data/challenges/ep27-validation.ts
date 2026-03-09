import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0: TheoryChallenge = {
  id: 'valid.0', type: 'theory', episode: 27, room: '27.0',
  title: 'Episódio 27 — Validação e Sanitização',
  description: 'A DEFESA definitiva: como proteger CONTRA todos os ataques que você aprendeu.',
  content: `
**Validação vs Sanitização:**
• **Validação:** verificar se o dado está no formato correto → rejeitar se não
• **Sanitização:** limpar o dado removendo partes perigosas → aceitar limpo

**Exemplo — campo de email:**
• Validação: tem @ e .com? Se não → rejeitar
• Sanitização: remover <script> tags do input

**Regra de ouro: NUNCA confie no input do usuário!**
Todo dado que vem do usuário pode ser malicioso:
• Campos de formulário
• URLs e parâmetros
• Headers HTTP
• Cookies
• Upload de arquivos
  `,
};

const code1: CodeChallenge = {
  id: 'valid.1', type: 'code', episode: 27, room: '27.1',
  title: 'Validando email',
  description: 'Crie um validador de email simples. **Execute**!',
  instructions: 'Crie uma função validarEmail que verifica 3 regras: tem @, tem ponto, e não tem espaços. Retorne "VALIDO" ou "INVALIDO: motivo".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Crie validarEmail(email) que verifica:\n// - Se nao tem "@": retorne "INVALIDO: falta @"\n// - Se nao tem ".": retorne "INVALIDO: falta dominio"\n// - Se tem espaco: retorne "INVALIDO: espacos"\n// - Senao: retorne "VALIDO"\n\n\nconsole.log(validarEmail("ana@empresa.com"));\nconsole.log(validarEmail("hackermalicioso"));\nconsole.log(validarEmail("teste @evil.com"));\n`,
    python: `# Crie validar_email(email) que verifica:\n# - Se nao tem "@": retorne "INVALIDO: falta @"\n# - Se nao tem ".": retorne "INVALIDO: falta dominio"\n# - Se tem espaco: retorne "INVALIDO: espacos"\n# - Senao: retorne "VALIDO"\n\n\nprint(validar_email("ana@empresa.com"))\nprint(validar_email("hackermalicioso"))\nprint(validar_email("teste @evil.com"))\n`,
  },
  expectedOutput: 'VALIDO\nINVALIDO: falta @\nINVALIDO: espacos',
  hints: ['A função verifica 3 regras: tem @, tem ., não tem espaços.'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'valid.2', type: 'code', episode: 27, room: '27.2',
  title: 'Sanitizando contra XSS',
  description: 'Remova tags HTML perigosas do input do usuário. **Execute**!',
  instructions: 'Crie uma função sanitizarHTML que substitui <, > e " por entidades HTML seguras (&lt; &gt; &quot;).',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Crie sanitizarHTML(input):\n// - Substitua "<" por "&lt;"\n// - Substitua ">" por "&gt;"\n// - Substitua \'"\' por "&quot;"\n// - Retorne o texto limpo\n// Dica JS: use .replace(/</g, "&lt;") para substituir todos\n\nconst perigoso = '<script>alert("hack")</script>';\nconsole.log("Original: " + perigoso);\nconsole.log("Sanitizado: " + sanitizarHTML(perigoso));\n`,
    python: `# Crie sanitizar_html(inp):\n# - Substitua "<" por "&lt;"\n# - Substitua ">" por "&gt;"\n# - Substitua \'"\' por "&quot;"\n# - Retorne o texto limpo\n# Dica: use .replace("<", "&lt;") etc.\n\nperigoso = '<script>alert("hack")</script>'\nprint("Original: " + perigoso)\nprint("Sanitizado: " + sanitizar_html(perigoso))\n`,
  },
  expectedOutput: 'Original: <script>alert("hack")</script>\nSanitizado: &lt;script&gt;alert(&quot;hack&quot;)&lt;/script&gt;',
  hints: ['Substitui < > " por entidades HTML seguras.'],
  difficulty: 'medium',
};

const code3: CodeChallenge = {
  id: 'valid.3', type: 'code', episode: 27, room: '27.3',
  title: 'Validador completo de input',
  description: 'Combine tudo num validador que detecta XSS, SQLi e Command Injection! **Execute**!',
  instructions: 'Crie um validador completo que detecta XSS, SQL Injection, Command Injection e Directory Traversal num único input.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const ataques = [\n  { padrao: "<script", tipo: "XSS" },\n  { padrao: "' OR", tipo: "SQL Injection" },\n  { padrao: "1=1", tipo: "SQL Injection" },\n  { padrao: ";", tipo: "Command Injection" },\n  { padrao: "../", tipo: "Directory Traversal" }\n];\n\n// Crie validarInput(input):\n// - Percorra a lista de ataques\n// - Se input (lowercase) contem o padrao (lowercase):\n//   retorne "BLOQUEADO: " + tipo + " detectado"\n// - Se nenhum match: retorne "SEGURO"\n\n\nconsole.log(validarInput("João Silva"));\nconsole.log(validarInput("<script>alert(1)</script>"));\nconsole.log(validarInput("' OR 1=1--"));\nconsole.log(validarInput("../../etc/passwd"));\n`,
    python: `ataques = [\n    {"padrao": "<script", "tipo": "XSS"},\n    {"padrao": "' OR", "tipo": "SQL Injection"},\n    {"padrao": "1=1", "tipo": "SQL Injection"},\n    {"padrao": ";", "tipo": "Command Injection"},\n    {"padrao": "../", "tipo": "Directory Traversal"}\n]\n\n# Crie validar_input(inp):\n# - Percorra a lista de ataques\n# - Se padrao (lowercase) esta em inp (lowercase):\n#   retorne "BLOQUEADO: " + tipo + " detectado"\n# - Se nenhum match: retorne "SEGURO"\n\n\nprint(validar_input("João Silva"))\nprint(validar_input("<script>alert(1)</script>"))\nprint(validar_input("' OR 1=1--"))\nprint(validar_input("../../etc/passwd"))\n`,
  },
  expectedOutput: 'SEGURO\nBLOQUEADO: XSS detectado\nBLOQUEADO: SQL Injection detectado\nBLOQUEADO: Directory Traversal detectado',
  hints: ['O validador verifica padrões de vários tipos de ataque.'],
  difficulty: 'medium',
};

const theory4: TheoryChallenge = {
  id: 'valid.4', type: 'theory', episode: 27, room: '27.4',
  title: 'Validação e Sanitização — Resumo',
  description: 'Você agora sabe DEFENDER sistemas contra os ataques mais comuns!',
  content: `
**O que você aprendeu:**
• Validação: rejeitar dados inválidos
• Sanitização: limpar dados perigosos
• Detector multi-ataque (XSS, SQLi, CMDi, Dir Traversal)

**Princípios profissionais:**
• Input validation é a PRIMEIRA linha de defesa
• Defense in depth: múltiplas camadas de proteção
• Whitelist > Blacklist: listar o que é PERMITIDO é melhor que listar o proibido
  `,
};

export const validationChallenges: Challenge[] = [theory0, code1, code2, code3, theory4];
