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

**Ferramentas novas neste episódio**
• **Buscar em uma lista com \`.find()\` (JavaScript):** \`usuarios.find(u => u.usuario === "admin")\` devolve o **primeiro** item da lista que passa no teste, ou \`undefined\` se nenhum passar.
• **A seta \`=>\` (função curta):** \`u => u.usuario === "admin"\` é uma função sem nome. \`u\` é o parâmetro (cada item da lista, um de cada vez) e o que vem depois da seta é o que ela devolve. É o mesmo que \`function (u) { return u.usuario === "admin"; }\`.
• **No Python** você percorre a lista com \`for\` e testa cada item com \`if\`, como já fez nos episódios anteriores.
• **Montando textos com valores (template string e f-string):** em vez de juntar pedaços com \`+\`, você pode escrever o texto já com os valores dentro. No **JavaScript** use crases e \`\${valor}\`; no **Python** use um \`f\` antes das aspas e \`{valor}\`. Os dois dão "Olá, Ana!" quando nome vale "Ana":
\`\`\`
const nome = "Ana";
console.log(\`Olá, \${nome}!\`);    // JavaScript (crases)
\`\`\`
\`\`\`
nome = "Ana"
print(f"Olá, {nome}!")           # Python (f antes das aspas)
\`\`\`
  `,
};

const code5_1: CodeChallenge = {
  id: '5.1',
  type: 'code',
  episode: 5,
  room: '5.1',
  title: 'Simulando um login normal',
  description: 'Veja como um sistema de login funciona internamente. Esta função simula uma consulta SQL de verdade: buscar um usuário cujo par usuário+senha bata exatamente.',
  instructions: 'Complete fazerLogin(usuarios, usuarioDigitado, senhaDigitada): procure na lista usuarios um item cujo usuario e senha batam com os digitados. Devolva "Login bem-sucedido!" ou "Usuário ou senha incorretos".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function fazerLogin(usuarios, usuarioDigitado, senhaDigitada) {
  // Use usuarios.find(u => ...) para procurar o usuário com usuario E senha batendo
  // Se encontrou, devolva "Login bem-sucedido!"
  // Se não, devolva "Usuário ou senha incorretos"
}
`,
    python: `def fazer_login(usuarios, usuario_digitado, senha_digitada):
    # Percorra "usuarios" com um for e compare usuario e senha de cada item
    # Se encontrar um que bate, devolva "Login bem-sucedido!"
    # Se terminar o loop sem achar, devolva "Usuário ou senha incorretos"
    pass
`,
  },
  tests: {
    fn: { javascript: 'fazerLogin', python: 'fazer_login' },
    cases: [
      {
        name: 'usuário e senha certos',
        args: [[{ usuario: 'admin', senha: 'senha123' }, { usuario: 'user', senha: '123456' }], 'admin', 'senha123'],
        expected: 'Login bem-sucedido!',
      },
      {
        name: 'senha errada',
        args: [[{ usuario: 'admin', senha: 'senha123' }, { usuario: 'user', senha: '123456' }], 'admin', 'errada'],
        expected: 'Usuário ou senha incorretos',
      },
      {
        name: 'outro usuário certo',
        args: [[{ usuario: 'admin', senha: 'senha123' }, { usuario: 'user', senha: '123456' }], 'user', '123456'],
        expected: 'Login bem-sucedido!',
        hidden: true,
      },
      { name: 'banco de dados vazio', args: [[], 'admin', 'senha123'], expected: 'Usuário ou senha incorretos', hidden: true },
    ],
  },
  solution: {
    javascript: `function fazerLogin(usuarios, usuarioDigitado, senhaDigitada) {
  const usuarioEncontrado = usuarios.find(u =>
    u.usuario === usuarioDigitado && u.senha === senhaDigitada
  );

  if (usuarioEncontrado) {
    return "Login bem-sucedido!";
  }
  return "Usuário ou senha incorretos";
}`,
    python: `def fazer_login(usuarios, usuario_digitado, senha_digitada):
    for u in usuarios:
        if u["usuario"] == usuario_digitado and u["senha"] == senha_digitada:
            return "Login bem-sucedido!"
    return "Usuário ou senha incorretos"`,
  },
  explanation: `
**Como funciona:**
1. Sistema busca no banco onde usuario E senha batem exatamente
2. Encontrou? Login permitido
3. Não encontrou (mesmo com lista vazia)? Acesso negado

Na próxima sala vamos QUEBRAR essa lógica!
  `,
  hints: [
    'JavaScript: usuarios.find(u => u.usuario === usuarioDigitado && u.senha === senhaDigitada)',
    'Python: um for percorrendo usuarios, comparando u["usuario"] e u["senha"]',
    'Lista vazia nunca encontra ninguém — deve cair direto no "incorretos"',
  ],
  difficulty: 'easy',
};

const code5_2: CodeChallenge = {
  id: '5.2',
  type: 'code',
  episode: 5,
  room: '5.2',
  title: 'Seu primeiro SQL Injection',
  description: 'Agora simule um sistema VULNERÁVEL, que monta a query SQL concatenando strings direto do que o usuário digitou — sem nenhuma proteção.',
  instructions: 'Complete tentarLoginVulneravel(usuarioDigitado, senhaDigitada): monte a query concatenando as strings, e devolva "Login bem-sucedido!" se ela contiver "OR \'1\'=\'1\'" (a injeção clássica). Senão, devolva "Usuário ou senha incorretos".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function tentarLoginVulneravel(usuarioDigitado, senhaDigitada) {
  // Monte a query concatenando:
  // "SELECT * FROM usuarios WHERE usuario='" + usuarioDigitado + "' AND senha='" + senhaDigitada + "'"
  // Se a query contiver "OR '1'='1'", devolva "Login bem-sucedido!"
  // Senão, devolva "Usuário ou senha incorretos"
}
`,
    python: `def tentar_login_vulneravel(usuario_digitado, senha_digitada):
    # Monte a query com f-string:
    # f"SELECT * FROM usuarios WHERE usuario='{usuario_digitado}' AND senha='{senha_digitada}'"
    # Se a query contiver "OR '1'='1'", devolva "Login bem-sucedido!"
    # Senão, devolva "Usuário ou senha incorretos"
    pass
`,
  },
  tests: {
    fn: { javascript: 'tentarLoginVulneravel', python: 'tentar_login_vulneravel' },
    cases: [
      { name: 'usuário normal, sem injeção', args: ['admin', 'qualquer'], expected: 'Usuário ou senha incorretos' },
      { name: 'payload de injeção clássico', args: ["admin' OR '1'='1", 'qualquer'], expected: 'Login bem-sucedido!' },
      { name: 'outro usuário normal', args: ['user', '123456'], expected: 'Usuário ou senha incorretos', hidden: true },
      { name: 'injeção sem nome de usuário', args: ["' OR '1'='1", 'x'], expected: 'Login bem-sucedido!', hidden: true },
    ],
  },
  solution: {
    javascript: `function tentarLoginVulneravel(usuarioDigitado, senhaDigitada) {
  const query = "SELECT * FROM usuarios WHERE usuario='" + usuarioDigitado + "' AND senha='" + senhaDigitada + "'";

  if (query.includes("OR '1'='1'")) {
    return "Login bem-sucedido!";
  }
  return "Usuário ou senha incorretos";
}`,
    python: `def tentar_login_vulneravel(usuario_digitado, senha_digitada):
    query = f"SELECT * FROM usuarios WHERE usuario='{usuario_digitado}' AND senha='{senha_digitada}'"

    if "OR '1'='1'" in query:
        return "Login bem-sucedido!"
    return "Usuário ou senha incorretos"`,
  },
  explanation: `
**VULNERABILIDADE EXPLORADA!**

Com \`usuarioDigitado = "admin' OR '1'='1"\`, a query concatenada vira:
\`SELECT * FROM usuarios WHERE usuario='admin' OR '1'='1' AND senha='qualquer'\`

**Por que funcionou:**
• '1'='1' é SEMPRE verdadeiro
• O OR faz a condição inteira virar verdadeira, não importa a senha
• Repare que nem precisa do "admin" — só a injeção sozinha já basta (último teste oculto)

**No mundo real:**
Hackers usam a mesma ideia para:
• Fazer login como admin
• Extrair dados: \` ' UNION SELECT * FROM cartoes--\`
• Apagar tabelas: \` '; DROP TABLE usuarios;--\`

**Defesa:**
• Prepared Statements (queries parametrizadas)
• NUNCA concatenar strings em queries
• Validar e sanitizar inputs
  `,
  hints: [
    'Monte a query igual ao template dado, só trocando os valores',
    '.includes("OR \'1\'=\'1\'") em JS, ou "OR \'1\'=\'1\'" in query em Python',
    'O usuário não precisa ser "admin" para a injeção funcionar — o ataque não depende do nome',
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

**Ferramentas novas para o próximo laboratório**
• **\`.map()\` (JavaScript):** transforma cada item de uma lista em outra coisa, devolvendo uma lista nova do mesmo tamanho. \`[1,2,3].map(x => x * 2)\` vira \`[2,4,6]\`. Em **Python**, o equivalente mais comum é uma list comprehension: \`[x * 2 for x in lista]\`.
• **\`.join()\` (JavaScript) e \`"separador".join(...)\` (Python):** junta os itens de uma lista numa única string, com um separador entre eles. \`["a","b","c"].join("-")\` vira \`"a-b-c"\`. Em Python é \`"-".join(["a","b","c"])\` — repare que o separador vem ANTES do \`.join\`, ao contrário do JavaScript.

**Próxima sala:** Extração de dados com UNION.
  `,
};

const code5_4: CodeChallenge = {
  id: '5.4',
  type: 'code',
  episode: 5,
  room: '5.4',
  title: 'Extraindo dados com UNION',
  description: 'UNION combina o resultado de duas consultas SQL diferentes numa só. Um atacante usa isso para "colar" dados de uma tabela sensível junto com o resultado de uma busca inofensiva.',
  instructions: 'Complete extrairComUniao(query, senhas): se a query (sem diferenciar maiúsculas/minúsculas) contiver "UNION SELECT", devolva "Dados extraídos:\\n" seguido de cada entrada de senhas no formato "usuario | senha", uma por linha. Senão, devolva "Nenhum dado extra retornado."',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function extrairComUniao(query, senhas) {
  // Se query.toUpperCase() contiver "UNION SELECT":
  //   monte "Dados extraídos:\\n" + uma linha "usuario | senha" por item de senhas,
  //   juntando as linhas com "\\n" (dica: .map() e .join("\\n"))
  // Senão, devolva "Nenhum dado extra retornado."
}
`,
    python: `def extrair_com_uniao(query, senhas):
    # Se query.upper() contiver "UNION SELECT":
    #   monte "Dados extraídos:\\n" + uma linha "usuario | senha" por item de senhas,
    #   juntando as linhas com "\\n" (dica: uma list comprehension e "\\n".join(...))
    # Senão, devolva "Nenhum dado extra retornado."
    pass
`,
  },
  tests: {
    fn: { javascript: 'extrairComUniao', python: 'extrair_com_uniao' },
    cases: [
      {
        name: 'payload UNION SELECT',
        args: ['1 UNION SELECT usuario, senha FROM senhas--', [{ usuario: 'admin', senha: 'super_secret_123' }, { usuario: 'user', senha: 'password' }]],
        expected: 'Dados extraídos:\nadmin | super_secret_123\nuser | password',
      },
      {
        name: 'consulta normal, sem UNION',
        args: ['1', [{ usuario: 'admin', senha: 'super_secret_123' }]],
        expected: 'Nenhum dado extra retornado.',
      },
      {
        name: 'UNION em minúsculas (mesmo assim funciona)',
        args: ['1 union select x from y--', [{ usuario: 'admin', senha: 'super_secret_123' }]],
        expected: 'Dados extraídos:\nadmin | super_secret_123',
        hidden: true,
      },
      {
        name: 'UNION mas tabela de senhas vazia',
        args: ['1 UNION SELECT usuario, senha FROM senhas--', []],
        expected: 'Dados extraídos:\n',
        hidden: true,
      },
    ],
  },
  solution: {
    javascript: `function extrairComUniao(query, senhas) {
  if (query.toUpperCase().includes("UNION SELECT")) {
    return "Dados extraídos:\\n" + senhas.map(s => s.usuario + " | " + s.senha).join("\\n");
  }
  return "Nenhum dado extra retornado.";
}`,
    python: `def extrair_com_uniao(query, senhas):
    if "UNION SELECT" in query.upper():
        linhas = [s["usuario"] + " | " + s["senha"] for s in senhas]
        return "Dados extraídos:\\n" + "\\n".join(linhas)
    return "Nenhum dado extra retornado."`,
  },
  explanation: `
**O que aconteceu:**
A consulta original buscava um produto (id=1). O payload injeta \`UNION SELECT usuario, senha FROM senhas\`, e o banco devolve os dois resultados **combinados** — produtos E senhas, numa resposta só.

**No mundo real:**
Assim hackers roubam:
• Números de cartão de crédito
• CPFs, emails, endereços
• Senhas de administradores

**Caso real:**
2017 - Equifax (agência de crédito) teve 147 MILHÕES de dados roubados via SQL Injection.

**Carreira:**
Pentesters são pagos para encontrar isso ANTES dos hackers do mal!
  `,
  hints: [
    'query.toUpperCase().includes("UNION SELECT") detecta o payload mesmo em minúsculas',
    '.map(s => s.usuario + " | " + s.senha).join("\\n") monta as linhas (Python: list comprehension + "\\n".join(...))',
    'Lista de senhas vazia ainda deve devolver "Dados extraídos:\\n" (só sem nenhuma linha depois)',
  ],
  difficulty: 'medium',
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
