import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory7_0: TheoryChallenge = {
  id: 'strm.0',
  type: 'theory',
  episode: 7,
  room: '7.0',
  title: 'Episódio 7 — Métodos de String avançados',
  description: 'Neste episódio você vai aprender métodos que analistas de segurança usam DIARIAMENTE para detectar ataques.',
  content: `
**O que vamos aprender:**
• \`.includes()\` → texto contém algo? (detectar XSS, SQL Injection)
• \`.indexOf()\` → onde está algo no texto? (encontrar payloads)
• \`.split()\` → dividir texto em partes (analisar logs)
• \`.replace()\` → substituir partes do texto (sanitizar input)

**Por que isso é essencial?**
Quando um hacker tenta um ataque XSS, ele envia algo como:
\`<script>alert("hack")</script>\`

O sistema de segurança faz:
\`if (input.includes("<script>")) → BLOQUEAR\`

Ou quando um analista lê logs:
\`"2024-01-15 10:30:00 LOGIN admin 192.168.1.1"\`
Ele usa \`.split(" ")\` para separar cada parte.

Vamos aprender cada método!
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

const code7_6: CodeChallenge = {
  id: 'strm.6',
  type: 'code',
  episode: 7,
  room: '7.6',
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

const code7_7: CodeChallenge = {
  id: 'strm.7',
  type: 'code',
  episode: 7,
  room: '7.7',
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
  room: '7.8',
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

const theory7_9: TheoryChallenge = {
  id: 'strm.9',
  type: 'theory',
  episode: 7,
  room: '7.9',
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
  code7_6,
  code7_7,
  code7_8,
  theory7_9,
];
