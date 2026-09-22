import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory7_0: TheoryChallenge = {
  id: '7.0',
  type: 'theory',
  episode: 7,
  room: '7.0',
  title: 'Episódio 7 — Força Bruta Avançada e Wordlists',
  description: 'Como pentesters profissionais automatizam ataques de senha e por que wordlists são poderosas.',
  content: `
**Revisão:**
No Episódio 2 você fez força bruta manualmente com 5 senhas.
Mas hackers testam MILHÕES de senhas!

**Wordlists:**
São arquivos com milhões de senhas já vazadas ou comuns.
Exemplos famosos:
• rockyou.txt (14 milhões de senhas)
• SecLists (coleção de wordlists)
• Leaked password databases

**Como funciona:**
1. Pentester carrega wordlist
2. Testa cada senha contra o alvo
3. Registra sucessos
4. Usa técnicas de otimização (rainbow tables)

**Ataques híbridos:**
Combinam wordlist + regras:
• password → p@ssw0rd, Password123, password!
• admin → @dmin, Admin2024, 4dm1n

**No mundo real:**
Ferramentas como Hydra, Medusa, Hashcat fazem isso automaticamente.

Vamos criar nosso próprio script de força bruta!

**Lembrete**
A função de hash "MD5 simplificado" dos exercícios é a mesma caixa-preta do episódio de Hash e Senhas: uma função pronta que transforma um texto em um código fixo. Não é o MD5 real, e você só precisa **chamá-la**.

**Ferramenta nova**
• **\`Math.min()\` (JavaScript) e \`min()\` (Python):** devolvem o MENOR entre dois ou mais números. \`Math.min(3, 7)\` vale 3. Serve, por exemplo, para nunca pedir mais itens de uma lista do que ela realmente tem.
  `,
};

const code7_1: CodeChallenge = {
  id: '7.1',
  type: 'code',
  episode: 7,
  room: '7.1',
  title: 'Resumindo uma wordlist',
  description: 'Vamos criar uma função que resume qualquer wordlist: quantas senhas tem, e mostra as N primeiras.',
  instructions: 'Complete resumirWordlist(wordlist, quantas): monte um resumo com o total de senhas e as "quantas" primeiras (ou menos, se a lista for menor). Veja o formato exato nos testes visíveis.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function resumirWordlist(wordlist, quantas) {
  // n = o menor entre "quantas" e wordlist.length (Math.min)
  // Monte as linhas "1. senha", "2. senha"... para as n primeiras
  // Devolva: "=== Wordlist carregada ===\\nTotal de senhas: " + wordlist.length +
  //          "\\n\\nPrimeiras " + n + ":\\n" + linhas juntadas com "\\n"
}
`,
    python: `def resumir_wordlist(wordlist, quantas):
    # n = o menor entre "quantas" e len(wordlist) (min())
    # Monte as linhas "1. senha", "2. senha"... para as n primeiras
    # Devolva: "=== Wordlist carregada ===\\nTotal de senhas: " + str(len(wordlist)) +
    #          "\\n\\nPrimeiras " + str(n) + ":\\n" + linhas juntadas com "\\n"
    pass
`,
  },
  tests: {
    fn: { javascript: 'resumirWordlist', python: 'resumir_wordlist' },
    cases: [
      {
        name: 'top 10, mostrando 5',
        args: [['123456', 'password', '123456789', '12345678', '12345', '1234567', 'admin', '123123', 'qwerty', 'abc123'], 5],
        expected: '=== Wordlist carregada ===\nTotal de senhas: 10\n\nPrimeiras 5:\n1. 123456\n2. password\n3. 123456789\n4. 12345678\n5. 12345',
      },
      {
        name: 'lista menor que "quantas" pedido',
        args: [['abc', 'def'], 5],
        expected: '=== Wordlist carregada ===\nTotal de senhas: 2\n\nPrimeiras 2:\n1. abc\n2. def',
        hidden: true,
      },
      { name: 'lista vazia', args: [[], 5], expected: '=== Wordlist carregada ===\nTotal de senhas: 0\n\nPrimeiras 0:\n', hidden: true },
    ],
  },
  solution: {
    javascript: `function resumirWordlist(wordlist, quantas) {
  const n = Math.min(quantas, wordlist.length);
  const linhas = [];
  for (let i = 0; i < n; i++) {
    linhas.push((i + 1) + ". " + wordlist[i]);
  }
  return "=== Wordlist carregada ===\\nTotal de senhas: " + wordlist.length + "\\n\\nPrimeiras " + n + ":\\n" + linhas.join("\\n");
}`,
    python: `def resumir_wordlist(wordlist, quantas):
    n = min(quantas, len(wordlist))
    linhas = []
    for i in range(n):
        linhas.append(f"{i + 1}. {wordlist[i]}")
    return "=== Wordlist carregada ===\\nTotal de senhas: " + str(len(wordlist)) + "\\n\\nPrimeiras " + str(n) + ":\\n" + "\\n".join(linhas)`,
  },
  explanation: `
**Fato chocante:**
23% de TODAS as contas usam senhas de uma lista como essa!

**Estudo real:**
"123456" ainda é uma das senhas mais usadas no mundo. Por isso força bruta com wordlist funciona tão bem — não é preciso adivinhar, só testar o que MILHÕES de pessoas já usam.

**Sobre o Math.min/min():** ele evita um erro comum — pedir "as 5 primeiras" de uma lista que só tem 2 itens. Sem esse cuidado, seu código tentaria acessar posições que não existem.
  `,
  hints: [
    'Math.min(quantas, wordlist.length) (Python: min(quantas, len(wordlist)))',
    'Um for de 0 até n (exclusive) monta cada linha "i+1. senha"',
    'Junte as linhas com "\\n" só na hora de devolver, não uma a uma',
  ],
  difficulty: 'easy',
};

const code7_2: CodeChallenge = {
  id: '7.2',
  type: 'code',
  episode: 7,
  room: '7.2',
  title: 'Ataque automatizado',
  description: 'Agora automatize um ataque! Teste cada senha da wordlist contra um hash, uma por vez, até encontrar a correta (ou esgotar a lista).',
  instructions: 'Complete atacarHash(wordlist, hashAlvo): teste cada senha com simpleHash(), registrando cada tentativa. Pare assim que encontrar. Veja o formato exato da narração nos testes.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function simpleHash(texto) {
  let hash = 7;
  for (let i = 0; i < texto.length; i++) {
    hash = (hash * 31 + texto.charCodeAt(i)) % 1000000007;
  }
  return hash.toString(16);
}

function atacarHash(wordlist, hashAlvo) {
  // Percorra a wordlist com um contador "tentativas" começando em 0
  // Para cada senha: incremente tentativas, monte a linha
  //   "Tentativa " + tentativas + ": testando '" + senha + "'..."
  // Se simpleHash(senha) === hashAlvo:
  //   adicione "\\n✅ SENHA ENCONTRADA: " + senha e "Total de tentativas: " + tentativas
  //   pare o loop (a senha já foi achada)
  // Se o loop terminar sem achar, adicione "\\n❌ Senha não encontrada na wordlist"
  // Devolva tudo junto com "\\n"
}
`,
    python: `def simple_hash(texto):
    hash_val = 7
    for char in texto:
        hash_val = (hash_val * 31 + ord(char)) % 1000000007
    return format(hash_val, "x")

def atacar_hash(wordlist, hash_alvo):
    # Percorra a wordlist com um contador "tentativas" começando em 0
    # Para cada senha: incremente tentativas, monte a linha
    #   f"Tentativa {tentativas}: testando '{senha}'..."
    # Se simple_hash(senha) == hash_alvo:
    #   adicione f"\\n✅ SENHA ENCONTRADA: {senha}" e f"Total de tentativas: {tentativas}"
    #   pare o loop (a senha já foi achada)
    # Se o loop terminar sem achar, adicione "\\n❌ Senha não encontrada na wordlist"
    # Devolva tudo junto com "\\n"
    pass
`,
  },
  tests: {
    fn: { javascript: 'atacarHash', python: 'atacar_hash' },
    cases: [
      {
        name: 'acha "password" na 2ª tentativa',
        args: [['123456', 'password', '123456789', '12345678', 'qwerty'], '858f7af'],
        expected: "Tentativa 1: testando '123456'...\nTentativa 2: testando 'password'...\n\n✅ SENHA ENCONTRADA: password\nTotal de tentativas: 2",
      },
      {
        name: 'esgota a wordlist sem achar',
        args: [['123456', 'password', '123456789', '12345678', 'qwerty'], 'nao-existe-esse-hash'],
        expected: "Tentativa 1: testando '123456'...\nTentativa 2: testando 'password'...\nTentativa 3: testando '123456789'...\nTentativa 4: testando '12345678'...\nTentativa 5: testando 'qwerty'...\n\n❌ Senha não encontrada na wordlist",
        hidden: true,
      },
    ],
  },
  solution: {
    javascript: `function simpleHash(texto) {
  let hash = 7;
  for (let i = 0; i < texto.length; i++) {
    hash = (hash * 31 + texto.charCodeAt(i)) % 1000000007;
  }
  return hash.toString(16);
}

function atacarHash(wordlist, hashAlvo) {
  const linhas = [];
  let tentativas = 0;
  let encontrada = false;

  for (const senha of wordlist) {
    tentativas++;
    linhas.push("Tentativa " + tentativas + ": testando '" + senha + "'...");
    if (simpleHash(senha) === hashAlvo) {
      linhas.push("\\n✅ SENHA ENCONTRADA: " + senha);
      linhas.push("Total de tentativas: " + tentativas);
      encontrada = true;
      break;
    }
  }
  if (!encontrada) {
    linhas.push("\\n❌ Senha não encontrada na wordlist");
  }
  return linhas.join("\\n");
}`,
    python: `def simple_hash(texto):
    hash_val = 7
    for char in texto:
        hash_val = (hash_val * 31 + ord(char)) % 1000000007
    return format(hash_val, "x")

def atacar_hash(wordlist, hash_alvo):
    linhas = []
    tentativas = 0
    encontrada = False

    for senha in wordlist:
        tentativas += 1
        linhas.append(f"Tentativa {tentativas}: testando '{senha}'...")
        if simple_hash(senha) == hash_alvo:
            linhas.append(f"\\n✅ SENHA ENCONTRADA: {senha}")
            linhas.append(f"Total de tentativas: {tentativas}")
            encontrada = True
            break
    if not encontrada:
        linhas.append("\\n❌ Senha não encontrada na wordlist")
    return "\\n".join(linhas)`,
  },
  explanation: `
**Ataque bem-sucedido!**

Encontramos a senha "password" em apenas 2 tentativas — e o loop **parou na hora**, sem testar as 3 senhas restantes da lista. Isso é o \`break\`: por que gastar tempo testando o resto se você já achou?

**No mundo real:**
• Hashcat testa bilhões de senhas por segundo (com GPU)
• rockyou.txt tem 14 milhões de senhas
• Tempo médio: minutos a horas (dependendo da senha)

**Defesa:**
• Senhas longas (12+ caracteres)
• Caracteres especiais
• Não usar senhas comuns
• Hashing forte (bcrypt, Argon2)
  `,
  hints: [
    'Contador tentativas começa em 0, incrementa a cada senha testada',
    'break (JS) / break (Python) some do loop assim que simpleHash(senha) bate',
    'Se o hash não bater com NENHUMA senha, o loop termina sozinho e você cai no caso "não encontrada"',
  ],
  difficulty: 'medium',
};

const theory7_3: TheoryChallenge = {
  id: '7.3',
  type: 'theory',
  episode: 7,
  room: '7.3',
  title: 'Técnicas avançadas de cracking',
  description: 'Como pentesters profissionais otimizam ataques de senha.',
  content: `
**1. Rainbow Tables:**
Hashes pré-computados para acelerar cracking.
Em vez de calcular hash toda vez, consulta tabela.
Defesa: Salt (adicionar dados aleatórios antes de hashear)

**2. Mask Attack:**
Sabe o padrão da senha? Use máscaras!
Exemplo: Empresa exige "Letra maiúscula + 6 números"
Máscara: \`?u?d?d?d?d?d?d\` (u=upper, d=digit)

**3. Hybrid Attack:**
Wordlist + regras de mutação
password → p@ssw0rd, Password1!, passworD123

**4. GPU Cracking:**
GPUs são 100x mais rápidas que CPUs
Uma RTX 4090 = 200 bilhões de MD5/segundo

**5. Distributed Cracking:**
Múltiplas máquinas trabalhando juntas
Cloud computing (AWS, Azure)

**Ferramentas:**
• Hashcat (mais popular)
• John the Ripper
• Ophcrack (rainbow tables)

**Próxima sala:** Criando regras de mutação!
  `,
};

const code7_4: CodeChallenge = {
  id: '7.4',
  type: 'code',
  episode: 7,
  room: '7.4',
  title: 'Ataque híbrido com mutações',
  description: 'Pegue uma palavra-base e aplique regras de mutação para gerar variações realistas (password → p@ssw0rd, Password123, etc). É assim que uma wordlist pequena vira uma bem maior.',
  instructions: 'Complete gerarMutacoes(palavra): devolva um array com 5 variações, NESTA ordem: a palavra original, com a primeira letra maiúscula, +"123", +"2024", e em leetspeak (a→@, o→0, i→1, e→3).',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function gerarMutacoes(palavra) {
  // 1. palavra original
  // 2. primeira letra maiúscula: palavra.charAt(0).toUpperCase() + palavra.slice(1)
  // 3. palavra + "123"
  // 4. palavra + "2024"
  // 5. leetspeak: palavra.replace(/a/g,'@').replace(/o/g,'0').replace(/i/g,'1').replace(/e/g,'3')
  // Devolva um array com as 5, nessa ordem
}
`,
    python: `def gerar_mutacoes(palavra):
    # 1. palavra original
    # 2. primeira letra maiúscula: palavra[:1].upper() + palavra[1:]
    # 3. palavra + "123"
    # 4. palavra + "2024"
    # 5. leetspeak: troque a→@, o→0, i→1, e→3 (uma chamada .replace() para cada)
    # Devolva uma lista com as 5, nessa ordem
    pass
`,
  },
  tests: {
    fn: { javascript: 'gerarMutacoes', python: 'gerar_mutacoes' },
    cases: [
      { name: '"admin"', args: ['admin'], expected: ['admin', 'Admin', 'admin123', 'admin2024', '@dm1n'] },
      { name: '"password"', args: ['password'], expected: ['password', 'Password', 'password123', 'password2024', 'p@ssw0rd'] },
      { name: '"teste"', args: ['teste'], expected: ['teste', 'Teste', 'teste123', 'teste2024', 't3st3'], hidden: true },
      { name: 'palavra vazia', args: [''], expected: ['', '', '123', '2024', ''], hidden: true },
    ],
  },
  solution: {
    javascript: `function gerarMutacoes(palavra) {
  const maiuscula = palavra.length ? palavra.charAt(0).toUpperCase() + palavra.slice(1) : "";
  const leet = palavra.replace(/a/g, '@').replace(/o/g, '0').replace(/i/g, '1').replace(/e/g, '3');
  return [palavra, maiuscula, palavra + "123", palavra + "2024", leet];
}`,
    python: `def gerar_mutacoes(palavra):
    maiuscula = palavra[:1].upper() + palavra[1:] if palavra else ""
    leet = palavra.replace('a', '@').replace('o', '0').replace('i', '1').replace('e', '3')
    return [palavra, maiuscula, palavra + "123", palavra + "2024", leet]`,
  },
  explanation: `
**De 1 palavra → 5 variações!**

**Técnicas aplicadas:**
• Capitalização (Password)
• Números comuns (123, 2024)
• Leetspeak (p@ssw0rd)

Repare: para 2 palavras-base (admin, password), isso já geraria 10 senhas testáveis — sem precisar digitar cada uma na mão.

**No mundo real:**
Ferramentas como Hashcat usam arquivos de regras muito mais complexos que isso:
• JohnTheRipper rules
• Best64.rule (64 regras otimizadas)
• OneRuleToRuleThemAll

Com regras profissionais: 1 senha-base → 1000+ variações!
  `,
  hints: [
    'A ordem do array importa: original, capitalizada, +123, +2024, leetspeak',
    '.replace(/a/g, "@") troca TODAS as ocorrências (o /g é "global"); em Python, .replace() já troca todas por padrão',
    'Palavra vazia: capitalizar e aplicar leetspeak numa string vazia ainda dá string vazia',
  ],
  difficulty: 'medium',
};

const theory7_5: TheoryChallenge = {
  id: '7.5',
  type: 'theory',
  episode: 7,
  room: '7.5',
  title: 'Episódio 7 completo!',
  description: 'Você domina técnicas avançadas de cracking de senhas!',
  content: `
**Habilidades desbloqueadas:**
✅ Wordlists e força bruta automatizada
✅ Ataques híbridos (wordlist + regras)
✅ Mutações e leetspeak
✅ Conceitos de rainbow tables e GPU cracking

**Aplicações profissionais:**
• **Pentester:** Testa força de senhas
• **Password Auditor:** Avalia políticas de senha
• **Red Team:** Simula ataques reais

**Estatística impressionante:**
80% das brechas de segurança envolvem senhas fracas ou vazadas.

**Prática responsável:**
• Use apenas em ambientes autorizados
• Ajude empresas a melhorar segurança
• Nunca ataque sem permissão escrita

**Próximo episódio:**
APIs REST e autenticação - como aplicações modernas se protegem!

Você está se tornando um expert! 🔐
  `,
};

export const episode7Challenges: Challenge[] = [
  theory7_0,
  code7_1,
  code7_2,
  theory7_3,
  code7_4,
  theory7_5,
];
