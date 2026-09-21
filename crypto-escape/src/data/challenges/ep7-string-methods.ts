import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory7_0: TheoryChallenge = {
  id: 'strm.0',
  type: 'theory',
  episode: 7,
  room: '7.0',
  title: 'Episódio 7 — Métodos de String avançados',
  description: 'Neste episódio você vai aprender métodos que analistas de segurança usam DIARIAMENTE para detectar ataques.',
  content: `
**O que vamos aprender (JavaScript / Python)**
• **Contém algo?** \`texto.includes("x")\` / \`"x" in texto\` → devolve true/false (detectar XSS, SQL Injection)
• **Onde está?** \`texto.indexOf("x")\` / \`texto.index("x")\` → posição da primeira ocorrência (encontrar payloads)
• **Dividir:** \`texto.split(" ")\` (igual nas duas) → divide em partes (analisar logs)
• **Substituir:** \`texto.replace("a", "b")\` → troca partes do texto (sanitizar entradas)

**Detalhe do replace**
No JavaScript, \`replace\` troca só a **primeira** ocorrência; para trocar **todas**, use \`replaceAll\`. No Python, \`replace\` já troca todas.

**Você já conhece**
\`.toLowerCase()\` / \`.lower()\` para converter em minúsculas: útil para comparar sem se importar com maiúsculas.

**Por que isso é essencial?**
Quando um hacker tenta um ataque XSS, ele envia algo como:
\`<script>alert("hack")</script>\`

O sistema de segurança faz:
\`if (input.includes("<script>")) → BLOQUEAR\`

Ou, quando um analista lê logs:
\`"2024-01-15 10:30:00 LOGIN admin 192.168.1.1"\`
Ele usa \`.split(" ")\` para separar cada parte.

Vamos aprender cada método!

**Tirando espaços das pontas**
• **JavaScript:** \`texto.trim()\`  •  **Python:** \`texto.strip()\`
Removem os espaços (e quebras de linha) do **começo e do fim** do texto, sem mexer nos do meio. \`"  oi  "\` vira \`"oi"\`. É muito usado para limpar o que o usuário digitou.
  `,
};

const code7_1: CodeChallenge = {
  id: 'strm.1',
  type: 'code',
  episode: 7,
  room: '7.1',
  title: 'includes() — contém algo?',
  description: 'Verificar se um texto **contém** outro é uma das operações mais usadas em segurança (filtros, detecção de ataques, análise de logs).',
  instructions: 'Devolva true se o texto contiver a palavra, senão false. Exemplo: contemPalavra("senha admin", "admin") devolve true.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva true se "texto" contém "palavra"
function contemPalavra(texto, palavra) {
  // seu código aqui
}
`,
    python: `# Devolva True se "texto" contém "palavra"
def contem_palavra(texto, palavra):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'contemPalavra', python: 'contem_palavra' },
    cases: [
      { name: 'contém', args: ['senha admin', 'admin'], expected: true },
      { name: 'não contém', args: ['ola mundo', 'admin'], expected: false },
      { name: 'texto vazio', args: ['', 'a'], expected: false, hidden: true },
      { name: 'maiúsculas diferem', args: ['ADMIN', 'admin'], expected: false, hidden: true },
      { name: 'palavra no início', args: ['admin123', 'admin'], expected: true, hidden: true },
    ],
  },
  solution: {
    javascript: `function contemPalavra(texto, palavra) {
  return texto.includes(palavra);
}`,
    python: `def contem_palavra(texto, palavra):
    return palavra in texto`,
  },
  explanation: `
**Procurando dentro de textos**
JavaScript: texto.includes(palavra). Python: palavra in texto. Ambos devolvem verdadeiro ou falso.

**Atenção:** a busca diferencia maiúsculas: "ADMIN" não contém "admin". Filtros de segurança mal feitos falham exatamente por isso (veja a próxima sala).
  `,
  hints: [
    'JavaScript: texto.includes(palavra)',
    'Python: palavra in texto',
    'A ordem em Python é "palavra in texto"',
  ],
  difficulty: 'easy',
};

const code7_2: CodeChallenge = {
  id: 'strm.2',
  type: 'code',
  episode: 7,
  room: '7.2',
  title: 'Detectando ataque simples',
  description: 'Crie um filtro básico contra XSS: procure a tag `<script>` na entrada do usuário. Um atacante pode variar as maiúsculas, então **normalize** o texto antes de comparar.',
  instructions: 'Devolva "ALERTA: XSS detectado!" se a entrada contiver <script> (em qualquer combinação de maiúsculas/minúsculas), senão "Input seguro".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Detecte "<script>" em qualquer combinação de maiúsculas/minúsculas
function detectarXss(entrada) {
  // seu código aqui
}
`,
    python: `# Detecte "<script>" em qualquer combinação de maiúsculas/minúsculas
def detectar_xss(entrada):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'detectarXss', python: 'detectar_xss' },
    cases: [
      { name: 'ataque clássico', args: ['<script>alert(1)</script>'], expected: 'ALERTA: XSS detectado!' },
      { name: 'texto normal', args: ['Olá, mundo!'], expected: 'Input seguro' },
      { name: 'maiúsculas misturadas', args: ['<ScRiPt>x</ScRiPt>'], expected: 'ALERTA: XSS detectado!', hidden: true },
      { name: 'a palavra script sem tag', args: ['script sem tags'], expected: 'Input seguro', hidden: true },
      { name: 'entrada vazia', args: [''], expected: 'Input seguro', hidden: true },
      { name: 'tag no meio do texto', args: ['oi <SCRIPT>bad()</SCRIPT> tchau'], expected: 'ALERTA: XSS detectado!', hidden: true },
    ],
  },
  solution: {
    javascript: `function detectarXss(entrada) {
  if (entrada.toLowerCase().includes("<script>")) {
    return "ALERTA: XSS detectado!";
  }
  return "Input seguro";
}`,
    python: `def detectar_xss(entrada):
    if "<script>" in entrada.lower():
        return "ALERTA: XSS detectado!"
    return "Input seguro"`,
  },
  explanation: `
**Normalizar antes de comparar**
Atacantes escrevem <SCRIPT> ou <ScRiPt> para driblar filtros que só procuram "<script>". Converter tudo para minúscula (toLowerCase / lower) antes da busca fecha essa brecha simples.

**Aviso realista:** filtros por lista de palavras são frágeis. A defesa correta contra XSS é escapar a saída (você viu isso no Modo Hacker). Aqui você treina detecção, que é útil para alertas e logs.
  `,
  hints: [
    'Converta a entrada para minúscula antes de procurar: entrada.toLowerCase() / entrada.lower()',
    'Depois procure "<script>" com includes / in',
    'Se achar: "ALERTA: XSS detectado!", senão "Input seguro"',
  ],
  difficulty: 'medium',
};

const code7_3: CodeChallenge = {
  id: 'strm.3',
  type: 'code',
  episode: 7,
  room: '7.3',
  title: 'Sua vez — classificando ataques',
  description: 'Agora vá além de um padrão: classifique a entrada pelo **tipo de ataque** que ela parece ser.',
  instructions: 'Devolva "XSS" se contiver "<script", "SQL Injection" se contiver " or ", "Directory Traversal" se contiver "../", senão "Seguro". Ignore maiúsculas/minúsculas e use essa ordem de prioridade.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Ordem: "<script" -> XSS | " or " -> SQL Injection | "../" -> Directory Traversal | senão "Seguro"
function classificarEntrada(entrada) {
  // seu código aqui
}
`,
    python: `# Ordem: "<script" -> XSS | " or " -> SQL Injection | "../" -> Directory Traversal | senão "Seguro"
def classificar_entrada(entrada):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'classificarEntrada', python: 'classificar_entrada' },
    cases: [
      { name: 'XSS', args: ['<script>alert(1)</script>'], expected: 'XSS' },
      { name: 'SQL Injection', args: ["' OR 1=1--"], expected: 'SQL Injection' },
      { name: 'Directory Traversal', args: ['../../etc/passwd'], expected: 'Directory Traversal' },
      { name: 'entrada normal', args: ['João Silva'], expected: 'Seguro' },
      { name: 'OR em maiúscula', args: ["x' OR '1'='1"], expected: 'SQL Injection', hidden: true },
      { name: 'XSS tem prioridade sobre os outros', args: ['<script> or ../'], expected: 'XSS', hidden: true },
      { name: 'vazio', args: [''], expected: 'Seguro', hidden: true },
      { name: 'palavra "for" não é " or "', args: ['formulario'], expected: 'Seguro', hidden: true },
    ],
  },
  solution: {
    javascript: `function classificarEntrada(entrada) {
  const texto = entrada.toLowerCase();
  if (texto.includes("<script")) {
    return "XSS";
  } else if (texto.includes(" or ")) {
    return "SQL Injection";
  } else if (texto.includes("../")) {
    return "Directory Traversal";
  }
  return "Seguro";
}`,
    python: `def classificar_entrada(entrada):
    texto = entrada.lower()
    if "<script" in texto:
        return "XSS"
    elif " or " in texto:
        return "SQL Injection"
    elif "../" in texto:
        return "Directory Traversal"
    return "Seguro"`,
  },
  explanation: `
**Uma cadeia de decisões**
O primeiro padrão que combina decide o resultado (por isso a ordem de prioridade importa).

**Realidade:** é assim que WAFs simples e sistemas de detecção começam: por assinaturas de texto. Eles geram falsos positivos (um texto legítimo com " or ") e falsos negativos (variações de ataque). Você vai estudar isso em IDS/IPS.
  `,
  hints: [
    'Comece guardando a entrada em minúsculo: const texto = entrada.toLowerCase()',
    'Use if / else if / else if com includes (Python: elif e "x" in texto)',
    'Respeite a ordem: XSS, depois SQL Injection, depois Directory Traversal',
  ],
  difficulty: 'medium',
};

const theory7_4: TheoryChallenge = {
  id: 'strm.4',
  type: 'theory',
  episode: 7,
  room: '7.4',
  title: 'split() — dividindo textos',
  description: 'O método split() divide um texto em partes, criando um array. ESSENCIAL para analisar logs.',
  content: `
**Como funciona:**
\`"Ana-Carlos-Maria".split("-")\` → \`["Ana", "Carlos", "Maria"]\`

O texto é dividido onde encontrar o separador ("-").

**Exemplo com logs de segurança:**
\`\`\`
"2024-01-15 FALHA admin 192.168.1.1"
\`\`\`

Usando \`.split(" ")\`:
\`\`\`
["2024-01-15", "FALHA", "admin", "192.168.1.1"]
\`\`\`

Agora você pode acessar cada parte:
• Posição 0: data
• Posição 1: tipo do evento (FALHA)
• Posição 2: usuário (admin)
• Posição 3: IP

Isso é EXATAMENTE o que analistas SOC fazem todos os dias!
  `,
};

const code7_5: CodeChallenge = {
  id: 'strm.5',
  type: 'code',
  episode: 7,
  room: '7.5',
  title: 'split() na prática',
  description: 'Logs são textos com campos separados por espaço. Use **split** para transformar uma linha de log em um objeto organizado.',
  instructions: 'Dada uma linha "DATA EVENTO USUARIO IP", devolva um objeto com as chaves data, evento, usuario e ip.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Linha de log: "2024-01-15 FALHA admin 192.168.1.1"
// Dica: log.split(" ") devolve uma lista com as 4 partes
function interpretarLog(log) {
  // seu código aqui
}
`,
    python: `# Linha de log: "2024-01-15 FALHA admin 192.168.1.1"
# Dica: log.split(" ") devolve uma lista com as 4 partes
def interpretar_log(log):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'interpretarLog', python: 'interpretar_log' },
    cases: [
      {
        name: 'falha de admin',
        args: ['2024-01-15 FALHA admin 192.168.1.1'],
        expected: { data: '2024-01-15', evento: 'FALHA', usuario: 'admin', ip: '192.168.1.1' },
      },
      {
        name: 'sucesso de outro usuário',
        args: ['2024-02-01 SUCESSO ana 10.0.0.9'],
        expected: { data: '2024-02-01', evento: 'SUCESSO', usuario: 'ana', ip: '10.0.0.9' },
      },
      {
        name: 'outra data e IP',
        args: ['2023-12-31 FALHA root 8.8.8.8'],
        expected: { data: '2023-12-31', evento: 'FALHA', usuario: 'root', ip: '8.8.8.8' },
        hidden: true,
      },
    ],
  },
  solution: {
    javascript: `function interpretarLog(log) {
  const partes = log.split(" ");
  return {
    data: partes[0],
    evento: partes[1],
    usuario: partes[2],
    ip: partes[3],
  };
}`,
    python: `def interpretar_log(log):
    partes = log.split(" ")
    return {
        "data": partes[0],
        "evento": partes[1],
        "usuario": partes[2],
        "ip": partes[3],
    }`,
  },
  explanation: `
**split**
split(" ") quebra o texto em pedaços a cada espaço e devolve uma lista. Cada pedaço fica numa posição (0, 1, 2, 3), e você monta um objeto com nomes claros.

**Na prática:** analistas de SOC transformam milhares de linhas de log em objetos para filtrar, contar e correlacionar eventos.
  `,
  hints: [
    'const partes = log.split(" ")  (Python: partes = log.split(" "))',
    'partes[0] é a data, partes[1] o evento, partes[2] o usuário, partes[3] o IP',
    'Devolva um objeto com as 4 chaves: data, evento, usuario, ip',
  ],
  difficulty: 'medium',
};

const ex7_dominio: CodeChallenge = {
  id: 'strm.11',
  type: 'code',
  episode: 7,
  room: '7.6',
  title: 'Extraindo o domínio de um e-mail',
  description: 'Use `split` para separar um e-mail no `@` e pegar só a parte do **domínio**. Analistas de segurança fazem isso para ver de quais sites vêm os e-mails suspeitos.',
  instructions: 'Devolva o que vem depois do @. Exemplo: extrairDominio("ana@site.com") devolve "site.com". Os e-mails têm sempre um único @.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Divida no "@" e devolva a segunda parte (posição 1)
function extrairDominio(email) {
  // seu código aqui
}
`,
    python: `# Divida no "@" e devolva a segunda parte (posição 1)
def extrair_dominio(email):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'extrairDominio', python: 'extrair_dominio' },
    cases: [
      { name: 'e-mail comum', args: ['ana@site.com'], expected: 'site.com' },
      { name: 'domínio com subdomínio', args: ['bob@mail.empresa.com.br'], expected: 'mail.empresa.com.br' },
      { name: 'usuário com ponto', args: ['a.b@x.org'], expected: 'x.org', hidden: true },
      { name: 'usuário de uma letra', args: ['a@b.com'], expected: 'b.com', hidden: true },
      { name: 'usuário com números', args: ['user123@teste.net'], expected: 'teste.net', hidden: true },
    ],
  },
  solution: {
    javascript: `function extrairDominio(email) {
  const partes = email.split("@");
  return partes[1];
}`,
    python: `def extrair_dominio(email):
    partes = email.split("@")
    return partes[1]`,
  },
  explanation: `
**split e a posição**
"ana@site.com".split("@") vira ["ana", "site.com"]. A posição 0 é o usuário e a posição 1 é o domínio.

**Na segurança:** ver o domínio de e-mails de phishing (como paypa1.com no lugar de paypal.com) é um passo comum de investigação.
  `,
  hints: [
    'Divida o e-mail no @: email.split("@")',
    'O resultado é uma lista de 2 itens: usuário e domínio',
    'Devolva o item da posição 1',
  ],
  difficulty: 'easy',
};

const ex7_email: CodeChallenge = {
  id: 'strm.12',
  type: 'code',
  episode: 7,
  room: '7.7',
  title: 'Validando um e-mail',
  description: 'Combine `split`, tamanho de lista e `includes`. Um e-mail **simples** é válido quando: tem **exatamente um @**, tem algo **antes** do @ e o **domínio** (depois do @) contém um ponto.',
  instructions: 'Devolva true se o e-mail seguir as três regras, senão false. Exemplo: validarEmail("ana@site.com") devolve true.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// 1) exatamente um "@"  (o split dá 2 partes)
// 2) parte antes do "@" não vazia
// 3) domínio (depois do "@") contém "."
function validarEmail(email) {
  // seu código aqui
}
`,
    python: `# 1) exatamente um "@"  (o split dá 2 partes)
# 2) parte antes do "@" não vazia
# 3) domínio (depois do "@") contém "."
def validar_email(email):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'validarEmail', python: 'validar_email' },
    cases: [
      { name: 'e-mail válido', args: ['ana@site.com'], expected: true },
      { name: 'sem arroba', args: ['ana.site.com'], expected: false },
      { name: 'domínio sem ponto', args: ['ana@site'], expected: false },
      { name: 'nada antes do arroba', args: ['@site.com'], expected: false, hidden: true },
      { name: 'dois arrobas', args: ['a@b@c.com'], expected: false, hidden: true },
      { name: 'ponto só antes do arroba não vale', args: ['a.b@site'], expected: false, hidden: true },
      { name: 'texto vazio', args: [''], expected: false, hidden: true },
      { name: 'domínio com subdomínio', args: ['x@mail.empresa.com'], expected: true, hidden: true },
    ],
  },
  solution: {
    javascript: `function validarEmail(email) {
  const partes = email.split("@");
  if (partes.length !== 2) {
    return false;
  }
  if (partes[0] === "") {
    return false;
  }
  return partes[1].includes(".");
}`,
    python: `def validar_email(email):
    partes = email.split("@")
    if len(partes) != 2:
        return False
    if partes[0] == "":
        return False
    return "." in partes[1]`,
  },
  explanation: `
**Validar em etapas**
Cada regra vira um teste que devolve false cedo. Só quem passa por todas chega ao return final, que confere o ponto no domínio.

**Cuidado com o ponto:** em "a.b@site" o ponto está ANTES do arroba, então não conta: o domínio ("site") não tem ponto. Por isso olhamos só a parte depois do @.

**Realidade:** validar e-mail de verdade é bem mais complexo (existem regras e exceções na especificação). Para segurança, a validação real acontece confirmando o endereço por um link enviado ao usuário.
  `,
  hints: [
    'Divida no @ e confira o tamanho da lista: precisa ter exatamente 2 partes',
    'A primeira parte (posição 0) não pode ser vazia',
    'O domínio (posição 1) precisa conter um ponto: partes[1].includes(".")  (Python: "." in partes[1])',
  ],
  difficulty: 'medium',
};

const ex7_normalizar: CodeChallenge = {
  id: 'strm.13',
  type: 'code',
  episode: 7,
  room: '7.8',
  title: 'Normalizando um nome de usuário',
  description: 'Usuários digitam de tudo: espaços sobrando, maiúsculas. **Normalizar** é deixar o texto no formato padrão antes de comparar. Aqui: sem espaços nas pontas e tudo em minúsculo.',
  instructions: 'Devolva o texto sem espaços no começo e no fim, em letras minúsculas. Exemplo: normalizarUsuario("  ANA  ") devolve "ana".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Tire os espaços das pontas (trim) e converta para minúsculas
function normalizarUsuario(texto) {
  // seu código aqui
}
`,
    python: `# Tire os espaços das pontas (strip) e converta para minúsculas
def normalizar_usuario(texto):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'normalizarUsuario', python: 'normalizar_usuario' },
    cases: [
      { name: 'espaços e maiúsculas', args: ['  ANA  '], expected: 'ana' },
      { name: 'já normalizado', args: ['bob'], expected: 'bob' },
      { name: 'texto vazio', args: [''], expected: '', hidden: true },
      { name: 'só espaços', args: ['   '], expected: '', hidden: true },
      { name: 'espaço no meio é mantido', args: [' Ana Maria '], expected: 'ana maria', hidden: true },
      { name: 'maiúsculas misturadas', args: ['ReD TeaM'], expected: 'red team', hidden: true },
    ],
  },
  solution: {
    javascript: `function normalizarUsuario(texto) {
  return texto.trim().toLowerCase();
}`,
    python: `def normalizar_usuario(texto):
    return texto.strip().lower()`,
  },
  explanation: `
**Encadeando métodos**
texto.trim() devolve um texto novo, e nele aplicamos .toLowerCase(). Chamar um método em cima do resultado do outro é comum e deixa o código curto.

**Na segurança:** falhas clássicas nascem de comparar sem normalizar. Um sistema que trata "Admin" e "admin " como usuários diferentes pode permitir contas duplicadas ou contornar bloqueios.
  `,
  hints: [
    'Primeiro tire os espaços das pontas: texto.trim()  (Python: texto.strip())',
    'Depois converta para minúsculas: .toLowerCase()  (Python: .lower())',
    'Encadeie os dois: texto.trim().toLowerCase()',
  ],
  difficulty: 'easy',
};

const code7_6: CodeChallenge = {
  id: 'strm.6',
  type: 'code',
  episode: 7,
  room: '7.9',
  title: 'replace() — substituindo texto',
  description: 'Sanitizar é remover ou trocar partes perigosas. Remova **todas** as tags `<script>` e `</script>` do texto.',
  instructions: 'Devolva o texto sem nenhuma ocorrência de "<script>" nem de "</script>". Exemplo: limparScript("Olá <script>alert(1)</script>") devolve "Olá alert(1)".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Remova TODAS as ocorrências de "<script>" e "</script>"
// Cuidado: replace() troca só a PRIMEIRA ocorrência; use replaceAll()
function limparScript(texto) {
  // seu código aqui
}
`,
    python: `# Remova TODAS as ocorrências de "<script>" e "</script>"
def limpar_script(texto):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'limparScript', python: 'limpar_script' },
    cases: [
      { name: 'uma tag', args: ['Olá <script>alert(1)</script>'], expected: 'Olá alert(1)' },
      { name: 'sem tags', args: ['texto normal'], expected: 'texto normal' },
      { name: 'duas ocorrências', args: ['<script>a</script><script>b</script>'], expected: 'ab', hidden: true },
      { name: 'só a tag de fechamento', args: ['</script>x'], expected: 'x', hidden: true },
      { name: 'texto vazio', args: [''], expected: '', hidden: true },
    ],
  },
  solution: {
    javascript: `function limparScript(texto) {
  return texto.replaceAll("<script>", "").replaceAll("</script>", "");
}`,
    python: `def limpar_script(texto):
    return texto.replace("<script>", "").replace("</script>", "")`,
  },
  explanation: `
**replace vs replaceAll**
No JavaScript, replace troca só a primeira ocorrência; replaceAll troca todas. No Python, replace já troca todas. Esquecer isso deixa passar a segunda tag.

**Um aviso importante de segurança:** remover "<script>" uma vez é burlável. O atacante escreve "<scr<script>ipt>", e depois da remoção sobra "<script>" de novo! Por isso a defesa certa é escapar a saída (transformar < em &lt;) em vez de tentar "apagar o perigoso".
  `,
  hints: [
    'Use replace duas vezes: uma para "<script>" e outra para "</script>", trocando por ""',
    'JavaScript: replaceAll (o replace comum só troca a primeira ocorrência)',
    'Python: texto.replace("<script>", "").replace("</script>", "")',
  ],
  difficulty: 'medium',
};

const theory7_pos: TheoryChallenge = {
  id: 'strm.10',
  type: 'theory',
  episode: 7,
  room: '7.10',
  title: 'Posição e fatias de texto',
  description: 'Para separar partes de um texto você precisa saber ONDE algo está e pegar só o pedaço que interessa.',
  content: `
**Onde está? indexOf e index**
• **JavaScript:** \`texto.indexOf(":")\`
• **Python:** \`texto.index(":")\`

Devolvem a **posição** (começando em 0) da **primeira** ocorrência. Em \`"admin:123"\`, o ":" está na posição 5.

Se o texto não existir: o JavaScript devolve **-1**; o Python **dá erro** (\`ValueError\`). Por isso, quando não tiver certeza, confira antes com \`includes\` / \`in\`.

**Fatias: pegando um pedaço**
• **JavaScript:** \`texto.slice(inicio, fim)\`
• **Python:** \`texto[inicio:fim]\`

O **início entra** e o **fim NÃO entra**. Em \`"admin:123"\`:
• \`slice(0, 5)\` / \`texto[0:5]\` → "admin"
• Sem o fim, vai até o final: \`slice(6)\` / \`texto[6:]\` → "123"
• No Python, sem o início, começa do zero: \`texto[:5]\` → "admin"

**Separando usuário e senha**
1. Ache a posição do ":" → 5
2. O usuário é do 0 até essa posição (sem incluí-la): \`slice(0, 5)\`
3. A senha começa **depois** do ":", ou seja, na posição 5 + 1 = 6, e vai até o final: \`slice(6)\`

Repare que tudo isso depende de contar posições a partir do 0.
  `,
};

const code7_7: CodeChallenge = {
  id: 'strm.7',
  type: 'code',
  episode: 7,
  room: '7.11',
  title: 'indexOf() — encontrando posição',
  description: 'Dados chegam como "usuario:senha". Encontre o **primeiro** ":" e separe as duas partes, mesmo se a senha também tiver ":".',
  instructions: 'Devolva um objeto {usuario, senha}, separando no PRIMEIRO ":". Exemplo: extrairCredenciais("admin:password123") devolve {usuario: "admin", senha: "password123"}.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Separe no PRIMEIRO ":" (a senha pode conter ":" também)
// Dica: texto.indexOf(":") e texto.slice(inicio, fim)
function extrairCredenciais(texto) {
  // seu código aqui
}
`,
    python: `# Separe no PRIMEIRO ":" (a senha pode conter ":" também)
# Dica: texto.index(":") e texto[inicio:fim]
def extrair_credenciais(texto):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'extrairCredenciais', python: 'extrair_credenciais' },
    cases: [
      { name: 'caso simples', args: ['admin:password123'], expected: { usuario: 'admin', senha: 'password123' } },
      { name: 'outro usuário', args: ['ana:1234'], expected: { usuario: 'ana', senha: '1234' } },
      { name: 'senha com dois pontos', args: ['root:pa:ss'], expected: { usuario: 'root', senha: 'pa:ss' }, hidden: true },
      { name: 'senha vazia', args: ['bob:'], expected: { usuario: 'bob', senha: '' }, hidden: true },
      { name: 'usuário de uma letra', args: ['a:b'], expected: { usuario: 'a', senha: 'b' }, hidden: true },
    ],
  },
  solution: {
    javascript: `function extrairCredenciais(texto) {
  const pos = texto.indexOf(":");
  return {
    usuario: texto.slice(0, pos),
    senha: texto.slice(pos + 1),
  };
}`,
    python: `def extrair_credenciais(texto):
    pos = texto.index(":")
    return {
        "usuario": texto[:pos],
        "senha": texto[pos + 1:],
    }`,
  },
  explanation: `
**Posição + fatia**
indexOf (JS) / index (Python) devolve a posição do primeiro ":". Com ela você fatia o texto: tudo ANTES é o usuário; tudo DEPOIS (pos + 1) é a senha.

**Por que "primeiro" e não split(":")?** Se a senha tem ":", o split cortaria em mais partes e você perderia parte da senha. Tratar dados com formatos ambíguos é uma fonte clássica de bugs e de falhas de segurança.
  `,
  hints: [
    'Ache a posição: const pos = texto.indexOf(":")  (Python: texto.index(":"))',
    'Usuário: texto.slice(0, pos)  /  texto[:pos]',
    'Senha: tudo depois do ":", ou seja, a partir de pos + 1',
  ],
  difficulty: 'hard',
};

const code7_8: CodeChallenge = {
  id: 'strm.8',
  type: 'code',
  episode: 7,
  room: '7.12',
  title: 'Desafio — analisar log completo',
  description: 'Junte tudo: divida a linha do log, verifique se o evento foi uma **FALHA** e monte o alerta de segurança.',
  instructions: 'Para "DATA EVENTO USUARIO IP": se o evento for "FALHA", devolva {alerta: true, usuario, ip}; senão, {alerta: false}.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Linha: "2024-01-15 FALHA root 10.0.0.5"
// FALHA   -> { alerta: true, usuario: "root", ip: "10.0.0.5" }
// outro   -> { alerta: false }
function analisarLog(log) {
  // seu código aqui
}
`,
    python: `# Linha: "2024-01-15 FALHA root 10.0.0.5"
# FALHA   -> {"alerta": True, "usuario": "root", "ip": "10.0.0.5"}
# outro   -> {"alerta": False}
def analisar_log(log):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'analisarLog', python: 'analisar_log' },
    cases: [
      { name: 'falha de login', args: ['2024-01-15 FALHA root 10.0.0.5'], expected: { alerta: true, usuario: 'root', ip: '10.0.0.5' } },
      { name: 'sucesso não gera alerta', args: ['2024-01-15 SUCESSO ana 10.0.0.9'], expected: { alerta: false } },
      { name: 'outra falha', args: ['2024-03-02 FALHA admin 192.168.0.7'], expected: { alerta: true, usuario: 'admin', ip: '192.168.0.7' }, hidden: true },
      { name: 'evento em minúsculas não é FALHA', args: ['2024-01-15 falha bob 1.1.1.1'], expected: { alerta: false }, hidden: true },
      { name: 'outro tipo de evento', args: ['2024-01-15 LOGOUT bob 1.1.1.1'], expected: { alerta: false }, hidden: true },
    ],
  },
  solution: {
    javascript: `function analisarLog(log) {
  const partes = log.split(" ");
  if (partes[1] === "FALHA") {
    return { alerta: true, usuario: partes[2], ip: partes[3] };
  }
  return { alerta: false };
}`,
    python: `def analisar_log(log):
    partes = log.split(" ")
    if partes[1] == "FALHA":
        return {"alerta": True, "usuario": partes[2], "ip": partes[3]}
    return {"alerta": False}`,
  },
  explanation: `
**O que você construiu**
Um mini detector de eventos suspeitos: quebra o log, testa o campo de evento e devolve um resultado estruturado. É o esqueleto de qualquer sistema de monitoramento (SIEM).

**Próximos passos:** trocar uma única linha por milhares e contar falhas por IP. Isso vira detecção de força bruta, exatamente o que você vai treinar no módulo de Blue Team.
  `,
  hints: [
    'Divida com split(" ") e olhe partes[1] (o evento)',
    'Se partes[1] for exatamente "FALHA", devolva o objeto com alerta true, usuário e IP',
    'Em qualquer outro caso, devolva { alerta: false }',
  ],
  difficulty: 'hard',
};

const ex7_ip: CodeChallenge = {
  id: 'strm.14',
  type: 'code',
  episode: 7,
  room: '7.13',
  title: 'Validando um endereço IPv4',
  description: 'Desafio final do episódio: um IPv4 válido tem **4 partes separadas por ponto**, e cada parte é um número **de 0 a 255**. Combine `split`, conversão de texto em número, loop e comparações. As partes sempre têm só dígitos (ou um sinal de menos).',
  instructions: 'Devolva true se o texto for um IPv4 válido, senão false. Exemplo: ipValido("192.168.0.1") devolve true.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// 1) split(".") precisa dar exatamente 4 partes
// 2) cada parte, convertida em número (parseInt), fica entre 0 e 255
function ipValido(ip) {
  // seu código aqui
}
`,
    python: `# 1) split(".") precisa dar exatamente 4 partes
# 2) cada parte, convertida em número (int), fica entre 0 e 255
def ip_valido(ip):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'ipValido', python: 'ip_valido' },
    cases: [
      { name: 'IP comum', args: ['192.168.0.1'], expected: true },
      { name: 'número acima de 255', args: ['256.1.1.1'], expected: false },
      { name: 'partes a menos', args: ['1.1.1'], expected: false },
      { name: 'tudo zero', args: ['0.0.0.0'], expected: true, hidden: true },
      { name: 'máximo permitido', args: ['255.255.255.255'], expected: true, hidden: true },
      { name: 'partes a mais', args: ['1.1.1.1.1'], expected: false, hidden: true },
      { name: 'último número alto', args: ['192.168.1.300'], expected: false, hidden: true },
      { name: 'número negativo', args: ['-1.1.1.1'], expected: false, hidden: true },
      { name: '255 ainda é válido', args: ['10.0.0.255'], expected: true, hidden: true },
    ],
  },
  solution: {
    javascript: `function ipValido(ip) {
  const partes = ip.split(".");
  if (partes.length !== 4) {
    return false;
  }
  for (let i = 0; i < partes.length; i++) {
    const numero = parseInt(partes[i]);
    if (numero < 0 || numero > 255) {
      return false;
    }
  }
  return true;
}`,
    python: `def ip_valido(ip):
    partes = ip.split(".")
    if len(partes) != 4:
        return False
    for parte in partes:
        numero = int(parte)
        if numero < 0 or numero > 255:
            return False
    return True`,
  },
  explanation: `
**Validação em duas camadas**
Primeiro a estrutura (quantidade de partes). Depois o conteúdo de cada parte, com um loop e um return false ao primeiro problema. Só quem passa por tudo chega ao return true.

**Um byte vai de 0 a 255:** cada parte de um IPv4 ocupa 1 byte (8 bits), por isso o limite é 255. Aparece em firewalls, scanners e análise de logs.

**Na segurança:** validar IPs é a base de firewalls, listas de bloqueio e ferramentas como o nmap. Um validador com um erro por 1 (por exemplo, > 256) deixa passar entradas inválidas.
  `,
  hints: [
    'Divida no ponto e confira que existem exatamente 4 partes',
    'Percorra as partes e converta cada uma em número: parseInt(parte) (Python: int(parte))',
    'Se algum número for menor que 0 ou maior que 255, devolva false. Depois do loop, devolva true',
  ],
  difficulty: 'hard',
};

const theory7_9: TheoryChallenge = {
  id: 'strm.9',
  type: 'theory',
  episode: 7,
  room: '7.14',
  title: 'Parabéns! Você está PRONTO para cibersegurança!',
  description: 'Com métodos de string, você tem TODAS as ferramentas que um analista de segurança usa para detectar ataques.',
  content: `
**O que você aprendeu:**
• \`.includes()\` / \`in\` → verificar se contém (detectar ataques)
• \`.split()\` → dividir texto (analisar logs)
• \`.replace()\` → substituir texto (sanitizar inputs)
• \`.indexOf()\` / \`.index()\` → encontrar posição

**Resumo da sua jornada de programação:**
• Ep 0: console.log, variáveis
• Ep 1: if/else, comparações
• Ep 2: loops (for)
• Ep 3: arrays e listas
• Ep 4: strings e ASCII (charCodeAt)
• Ep 5: funções (function/def)
• Ep 6: objetos e JSON
• Ep 7: métodos de string (includes, split, replace)

**Você agora sabe:**
✓ Tomar decisões (if/else)
✓ Repetir ações (for)
✓ Trabalhar com listas (arrays)
✓ Manipular textos (strings)
✓ Criar código reutilizável (funções)
✓ Organizar dados (objetos/JSON)
✓ Analisar e detectar padrões (métodos de string)

**PRÓXIMO: Cibersegurança de verdade!**
A partir do próximo episódio, você começa a aplicar TUDO isso em cenários reais de segurança. Primeiro desafio: decodificar mensagens com a Cifra de César!
  `,
};

export const stringMethodsChallenges: Challenge[] = [
  theory7_0,
  code7_1,
  code7_2,
  code7_3,
  theory7_4,
  code7_5,
  ex7_dominio,
  ex7_email,
  ex7_normalizar,
  code7_6,
  theory7_pos,
  code7_7,
  code7_8,
  ex7_ip,
  theory7_9,
];
