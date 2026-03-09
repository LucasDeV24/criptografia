import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory5_0: TheoryChallenge = {
  id: '5.0',
  type: 'theory',
  episode: 5,
  room: '5.0',
  title: 'Episódio 5 — SQL Injection',
  description: 'A vulnerabilidade que permite hackers acessarem TODO o banco de dados de um site. Extremamente perigosa.',
  content: `
**O que é SQL Injection?**
Bancos de dados usam SQL (Structured Query Language) para buscar informações.
Exemplo: \`SELECT * FROM users WHERE username = 'admin'\`

SQL Injection acontece quando você consegue modificar essa query.

**Exemplo real:**
Site de login pergunta: usuário e senha
Query: \`SELECT * FROM users WHERE user='X' AND pass='Y'\`

Se você digitar: \`admin' OR '1'='1\`
Query vira: \`SELECT * FROM users WHERE user='admin' OR '1'='1' AND pass='Y'\`

**'1'='1' é sempre verdadeiro** = você entra sem senha!

**Impacto:**
• Roubar TODOS os dados do banco
• Apagar tabelas inteiras
• Modificar informações
• Ganhar acesso admin

Vamos aprender a identificar e explorar!
  `,
};

const code5_1: CodeChallenge = {
  id: '5.1',
  type: 'code',
  episode: 5,
  room: '5.1',
  title: 'Simulando um login normal',
  description: 'Veja como um sistema de login funciona internamente. Este código simula uma query SQL.',
  instructions: 'Execute e veja o login normal funcionando',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Simulação de banco de dados
const usuarios = [
  { usuario: "admin", senha: "senha123" },
  { usuario: "user", senha: "123456" }
];

// Dados do formulário de login
const usuarioDigitado = "admin";
const senhaDigitada = "senha123";

// Simula query SQL:
// SELECT * FROM usuarios WHERE usuario='admin' AND senha='senha123'

const usuarioEncontrado = usuarios.find(u => 
  u.usuario === usuarioDigitado && u.senha === senhaDigitada
);

if (usuarioEncontrado) {
  console.log("Login bem-sucedido!");
} else {
  console.log("Usuário ou senha incorretos");
}
`,
    python: `# Simulação de banco de dados
usuarios = [
    {"usuario": "admin", "senha": "senha123"},
    {"usuario": "user", "senha": "123456"}
]

# Dados do formulário de login
usuario_digitado = "admin"
senha_digitada = "senha123"

# Simula query SQL:
# SELECT * FROM usuarios WHERE usuario='admin' AND senha='senha123'

usuario_encontrado = None
for u in usuarios:
    if u["usuario"] == usuario_digitado and u["senha"] == senha_digitada:
        usuario_encontrado = u
        break

if usuario_encontrado:
    print("Login bem-sucedido!")
else:
    print("Usuário ou senha incorretos")
`,
  },
  expectedOutput: 'Login bem-sucedido!',
  explanation: `
**Como funciona:**
1. Sistema busca no banco onde usuario='admin' E senha='senha123'
2. Encontrou? Login permitido
3. Não encontrou? Acesso negado

Na próxima sala vamos QUEBRAR essa lógica!
  `,
  hints: [
    'Este é um login normal e seguro',
    'Usuário e senha corretos = login bem-sucedido',
  ],
  difficulty: 'easy',
};

const code5_2: CodeChallenge = {
  id: '5.2',
  type: 'code',
  episode: 5,
  room: '5.2',
  title: 'Seu primeiro SQL Injection',
  description: 'Agora o sistema está VULNERÁVEL - ele monta a query concatenando strings. Mude o usuário para: admin\' OR \'1\'=\'1',
  instructions: 'Mude usuarioDigitado para: admin\' OR \'1\'=\'1',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Sistema VULNERÁVEL que concatena strings
const usuarios = [
  { usuario: "admin", senha: "senha123" },
  { usuario: "user", senha: "123456" }
];

// Modifique o usuário para fazer SQL Injection:
// Use: admin' OR '1'='1
const usuarioDigitado = "admin";
const senhaDigitada = "qualquer";

// Monte a query SQL concatenando as variáveis:
// "SELECT * FROM usuarios WHERE usuario='" + usuario + "' AND senha='" + senha + "'"
// Imprima "Query gerada:" e a query na próxima linha

// Verifique se a query contém "OR '1'='1'" (injection bem-sucedida)
// Se sim, imprima: "Login bem-sucedido!"
// Se não, imprima: "Usuário ou senha incorretos"
`,
    python: `# Sistema VULNERÁVEL que concatena strings
usuarios = [
    {"usuario": "admin", "senha": "senha123"},
    {"usuario": "user", "senha": "123456"}
]

# Modifique o usuário para fazer SQL Injection:
# Use: admin' OR '1'='1
usuario_digitado = "admin"
senha_digitada = "qualquer"

# Monte a query SQL usando f-string:
# f"SELECT * FROM usuarios WHERE usuario='{usuario}' AND senha='{senha}'"
# Imprima "Query gerada:" e a query na próxima linha

# Verifique se a query contém "OR '1'='1'" (injection bem-sucedida)
# Se sim, imprima: "Login bem-sucedido!"
# Se não, imprima: "Usuário ou senha incorretos"
`,
  },
  expectedOutput: 'Login bem-sucedido!',
  explanation: `
**VULNERABILIDADE EXPLORADA!**

Query gerada:
\`SELECT * FROM usuarios WHERE usuario='admin' OR '1'='1' AND senha='qualquer'\`

**Por que funcionou:**
• '1'='1' é SEMPRE verdadeiro
• O OR faz a query retornar TODOS os usuários
• Você entrou sem saber a senha!

**No mundo real:**
Hackers usam isso para:
• Fazer login como admin
• Extrair dados: \` ' UNION SELECT * FROM cartoes--\`
• Apagar tabelas: \` '; DROP TABLE usuarios;--\`

**Defesa:**
• Prepared Statements (queries parametrizadas)
• NUNCA concatenar strings em queries
• Validar e sanitizar inputs
  `,
  hints: [
    'Troque "admin" por "admin\' OR \'1\'=\'1"',
    'Coloque aspas simples e espaços exatamente como mostrado',
  ],
  difficulty: 'medium',
};

const theory5_3: TheoryChallenge = {
  id: '5.3',
  type: 'theory',
  episode: 5,
  room: '5.3',
  title: 'Técnicas avançadas de SQLi',
  description: 'SQL Injection pode fazer muito mais que bypass de login.',
  content: `
**1. UNION-based SQLi:**
Combina resultados de múltiplas queries.
\`' UNION SELECT username, password FROM users--\`
Retorna TODOS os usuários e senhas!

**2. Blind SQLi:**
Site não mostra erros, mas você pode testar condições.
\`' AND 1=1--\` (página normal)
\`' AND 1=2--\` (página diferente)
Assim você extrai dados 1 bit por vez.

**3. Time-based Blind:**
\`' AND SLEEP(5)--\`
Se a página demorar 5 segundos = vulnerável!

**4. Error-based:**
Forçar erros SQL que revelam estrutura do banco:
\`' AND 1=CONVERT(int, (SELECT @@version))--\`

**Ferramentas profissionais:**
• sqlmap (automatiza exploração)
• Burp Suite + SQL injection extensions
• Havij

**Próxima sala:** Extração de dados com UNION.
  `,
};

const code5_4: CodeChallenge = {
  id: '5.4',
  type: 'code',
  episode: 5,
  room: '5.4',
  title: 'Extraindo dados com UNION',
  description: 'Use UNION para combinar a query legítima com uma maliciosa e extrair dados de outra tabela.',
  instructions: 'Veja como UNION extrai dados sensíveis',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Banco de dados com múltiplas tabelas
const produtos = [
  { id: 1, nome: "Notebook" },
  { id: 2, nome: "Mouse" }
];

const senhas = [
  { usuario: "admin", senha: "super_secret_123" },
  { usuario: "user", senha: "password" }
];

// Crie o payload UNION para extrair dados da tabela de senhas
// O payload deve ser: "1 UNION SELECT usuario, senha FROM senhas--"
// Imprima "Payload injetado:" e o payload na próxima linha

// Simule a extração: imprima "\\nDados extraídos:"
// Percorra o array 'senhas' e para cada entrada imprima:
// usuario + " | " + senha
`,
    python: `# Banco de dados com múltiplas tabelas
produtos = [
    {"id": 1, "nome": "Notebook"},
    {"id": 2, "nome": "Mouse"}
]

senhas = [
    {"usuario": "admin", "senha": "super_secret_123"},
    {"usuario": "user", "senha": "password"}
]

# Crie o payload UNION para extrair dados da tabela de senhas
# O payload deve ser: "1 UNION SELECT usuario, senha FROM senhas--"
# Imprima "Payload injetado:" e o payload na próxima linha

# Simule a extração: imprima "\\nDados extraídos:"
# Percorra a lista 'senhas' e para cada entrada imprima:
# usuario + " | " + senha
`,
  },
  expectedOutput: 'Dados extraídos:\nadmin | super_secret_123\nuser | password',
  explanation: `
**O que aconteceu:**
Você estava buscando um produto (id=1).
Mas injetou: \`UNION SELECT usuario, senha FROM senhas\`

**Resultado:**
A query retorna os produtos E as senhas!

**No mundo real:**
Assim hackers roubam:
• Números de cartão de crédito
• CPFs, emails, endereços
• Senhas de administradores
• Dados confidenciais

**Caso real:**
2017 - Equifax (agência de crédito) teve 147 MILHÕES de dados roubados via SQL Injection.

**Carreira:**
Pentesters são pagos para encontrar isso ANTES dos hackers do mal!
  `,
  hints: [
    'O código já está pronto - mostra como UNION funciona',
    'Veja como combinar dados de tabelas diferentes',
  ],
  difficulty: 'easy',
};

const theory5_5: TheoryChallenge = {
  id: '5.5',
  type: 'theory',
  episode: 5,
  room: '5.5',
  title: 'Episódio 5 completo!',
  description: 'Você domina uma das vulnerabilidades mais críticas da web.',
  content: `
**Habilidades desbloqueadas:**
✅ SQL Injection básico (bypass de autenticação)
✅ UNION-based SQLi (extração de dados)
✅ Entendimento de queries SQL
✅ Técnicas de exploração

**Aplicações profissionais:**
• **Pentester:** Testa bancos de dados
• **Bug Bounty:** Encontra SQLi = $$$
• **Security Engineer:** Implementa proteções

**OWASP Top 10:**
SQL Injection está no TOP 3 vulnerabilidades mais perigosas!

**Ferramentas para praticar:**
• WebGoat (treino de SQLi)
• DVWA (Damn Vulnerable Web App)
• PortSwigger Academy (labs grátis)

**Próximo episódio:**
Análise de logs e detecção de ataques - o trabalho de um SOC Analyst!

Você está ficando perigoso! 🔥
  `,
};

export const episode5Challenges: Challenge[] = [
  theory5_0,
  code5_1,
  code5_2,
  theory5_3,
  code5_4,
  theory5_5,
];
