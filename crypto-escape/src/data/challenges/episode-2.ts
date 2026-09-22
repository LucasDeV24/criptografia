import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory2_0: TheoryChallenge = {
  id: '2.0',
  type: 'theory',
  episode: 2,
  room: '2.0',
  title: 'Episódio 2 — Hash e proteção de senhas',
  description: 'Como sites protegem suas senhas? Eles usam HASH. Vamos entender como funciona e por que é importante.',
  content: `
**O que é Hash?**
Hash é como uma "impressão digital" de um texto. Você coloca uma senha, sai um código único.

**Por que isso importa?**
Sites NÃO guardam sua senha real. Eles guardam o HASH.
Quando você faz login, o site compara o hash que você enviou com o hash guardado.

**Hackers do mal:**
Tentam "quebrar" hashes para descobrir senhas. Isso se chama "cracking".

**Hackers do bem:**
Entendem isso para criar sistemas mais seguros e testar vulnerabilidades.

Vamos aprender como funciona!

**Ferramentas novas neste episódio**
• **Hash simulado (uma "caixa-preta"):** nos exercícios você recebe pronta uma função \`simpleHash\`, criada só para estudo. Ela NÃO é um hash de verdade, como MD5 ou SHA-256. Você não precisa entender a conta por dentro: o que importa é o que ela faz. Ela transforma qualquer texto em um código de tamanho fixo, sempre o mesmo para a mesma entrada, e não dá para "desfazer" a conta.
• **\`% (resto da divisão)\` e \`.toString(16)\`:** aparecem dentro dessa função pronta. \`%\` garante que o número fique sempre dentro de um limite fixo, e \`.toString(16)\` escreve o número em hexadecimal (como um hash de verdade aparece). Você só precisa **chamar** a função, nunca editá-la.
• **\`break\` e \`continue\` em loops:** dentro de um loop, \`break\` **encerra** o loop na hora — útil quando você já achou o que procurava, como a senha certa. \`continue\` **pula** o resto da volta atual e segue para a próxima.
• **\`for...of\` (JavaScript):** além do \`for\` com contador que você já conhece, existe \`for (const item of lista)\` — percorre a lista direto, item por item, sem precisar de índice. No **Python**, \`for item in lista\` já faz exatamente isso.
  `,
};

const SIMPLE_HASH_JS = `function simpleHash(texto) {
  let hash = 7;
  for (let i = 0; i < texto.length; i++) {
    hash = (hash * 31 + texto.charCodeAt(i)) % 1000000007;
  }
  return hash.toString(16);
}`;

const SIMPLE_HASH_PY = `def simple_hash(texto):
    hash_val = 7
    for char in texto:
        hash_val = (hash_val * 31 + ord(char)) % 1000000007
    return format(hash_val, "x")`;

const code2_1: CodeChallenge = {
  id: '2.1',
  type: 'code',
  episode: 2,
  room: '2.1',
  title: 'Comparando senhas com hash',
  description: 'Um sistema de login não guarda a senha real — só o hash dela. Escreva a função que confirma se uma tentativa de login está correta, comparando hashes.',
  instructions: 'Complete verificarLogin(senhaDigitada, hashArmazenado): calcule o hash da senha digitada com simpleHash() e compare com hashArmazenado. Devolva "Login bem-sucedido!" ou "Senha incorreta".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `${SIMPLE_HASH_JS}

function verificarLogin(senhaDigitada, hashArmazenado) {
  // Calcule o hash de senhaDigitada com simpleHash()
  // Compare com hashArmazenado
  // return "Login bem-sucedido!" se forem iguais, senão return "Senha incorreta"
}
`,
    python: `${SIMPLE_HASH_PY}

def verificar_login(senha_digitada, hash_armazenado):
    # Calcule o hash de senha_digitada com simple_hash()
    # Compare com hash_armazenado
    # return "Login bem-sucedido!" se forem iguais, senão return "Senha incorreta"
    pass
`,
  },
  tests: {
    fn: { javascript: 'verificarLogin', python: 'verificar_login' },
    cases: [
      { name: 'senha certa', args: ['password', '858f7af'], expected: 'Login bem-sucedido!' },
      { name: 'senha errada', args: ['admin', '858f7af'], expected: 'Senha incorreta' },
      { name: 'maiúscula/minúscula importa', args: ['Admin', '1177efa8'], expected: 'Senha incorreta', hidden: true },
      { name: 'senha vazia com hash vazio', args: ['', '7'], expected: 'Login bem-sucedido!', hidden: true },
    ],
  },
  solution: {
    javascript: `${SIMPLE_HASH_JS}

function verificarLogin(senhaDigitada, hashArmazenado) {
  const hash = simpleHash(senhaDigitada);
  if (hash === hashArmazenado) {
    return "Login bem-sucedido!";
  }
  return "Senha incorreta";
}`,
    python: `${SIMPLE_HASH_PY}

def verificar_login(senha_digitada, hash_armazenado):
    hash_val = simple_hash(senha_digitada)
    if hash_val == hash_armazenado:
        return "Login bem-sucedido!"
    return "Senha incorreta"`,
  },
  explanation: `
**O que aconteceu?**
O sistema não compara senhas diretamente. Ele compara HASHES.
Se os hashes são iguais = senha correta. Se diferentes = senha errada.

**Repare no caso "Admin" vs "admin":** hash é sensível a maiúsculas e minúsculas — um caractere diferente já muda o hash inteiro.

**No mundo real:**
Sites como Instagram e Gmail usam essa mesma ideia. Eles NUNCA guardam sua senha real, só o hash dela.
  `,
  hints: [
    'const hash = simpleHash(senhaDigitada); (ou hash_val = simple_hash(...) em Python)',
    'Compare hash === hashArmazenado (Python: hash_val == hash_armazenado)',
    'Não esqueça o return nos dois casos do if/else',
  ],
  difficulty: 'easy',
};

const code2_2: CodeChallenge = {
  id: '2.2',
  type: 'code',
  episode: 2,
  room: '2.2',
  title: 'Auditando várias tentativas de login',
  description: 'Um log de acesso tem várias tentativas de login, cada uma com a senha digitada e o hash que estava armazenado naquela conta. Conte quantas tentativas realmente bateram.',
  instructions: 'Escreva contarLoginsValidos(tentativas): tentativas é uma lista de pares [senha, hashArmazenado]. Devolva quantos pares têm simpleHash(senha) igual a hashArmazenado.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `${SIMPLE_HASH_JS}

function contarLoginsValidos(tentativas) {
  // Percorra "tentativas" (cada item é [senha, hashArmazenado])
  // Para cada uma, compare simpleHash(senha) com hashArmazenado
  // Conte quantas batem e devolva o total com return
}
`,
    python: `${SIMPLE_HASH_PY}

def contar_logins_validos(tentativas):
    # Percorra "tentativas" (cada item é [senha, hash_armazenado])
    # Para cada uma, compare simple_hash(senha) com hash_armazenado
    # Conte quantas batem e devolva o total com return
    pass
`,
  },
  tests: {
    fn: { javascript: 'contarLoginsValidos', python: 'contar_logins_validos' },
    cases: [
      { name: 'uma bate, uma não', args: [[['password', '858f7af'], ['admin', '858f7af']]], expected: 1 },
      { name: 'duas batem, uma não', args: [[['admin', '1177efa8'], ['password', '858f7af'], ['qwerty', '858f7af']]], expected: 2 },
      { name: 'lista vazia', args: [[]], expected: 0, hidden: true },
      { name: 'uma tentativa, bate', args: [[['letmein', '1a44c57c']]], expected: 1, hidden: true },
    ],
  },
  solution: {
    javascript: `${SIMPLE_HASH_JS}

function contarLoginsValidos(tentativas) {
  let total = 0;
  for (const [senha, hashArmazenado] of tentativas) {
    if (simpleHash(senha) === hashArmazenado) {
      total++;
    }
  }
  return total;
}`,
    python: `${SIMPLE_HASH_PY}

def contar_logins_validos(tentativas):
    total = 0
    for senha, hash_armazenado in tentativas:
        if simple_hash(senha) == hash_armazenado:
            total += 1
    return total`,
  },
  explanation: `
**O que você fez**
Percorreu uma lista de tentativas, aplicando a mesma verificação da sala anterior em cada uma, e somando quantas passaram. Isso é literalmente o que um sistema de auditoria de segurança faz ao revisar um log de tentativas de login.

**Por que auditar isso importa:** muitas tentativas de login que "batem" vindas de lugares estranhos são um sinal de conta comprometida.
  `,
  hints: [
    'Um loop for...of (JS) ou for (Python) percorre cada [senha, hash] da lista',
    'Use um contador que começa em 0 e soma 1 a cada acerto',
    'Lista vazia deve devolver 0 — o loop simplesmente não executa nenhuma vez',
  ],
  difficulty: 'medium',
};

const theory2_3: TheoryChallenge = {
  id: '2.3',
  type: 'theory',
  episode: 2,
  room: '2.3',
  title: 'Ataques de força bruta',
  description: 'Hackers tentam adivinhar senhas testando milhares de combinações. Isso se chama "força bruta" ou "brute force".',
  content: `
**Como funciona um ataque de força bruta:**
1. Hacker tem o hash de uma senha
2. Ele testa: "123456", "password", "admin", "letmein"...
3. Para cada uma, calcula o hash e compara
4. Se encontrar = descobriu a senha!

**Lista de senhas comuns:**
Hackers usam "wordlists" - arquivos com milhões de senhas comuns.
Exemplos: password, 123456, qwerty, admin, letmein

**Defesa:**
• Senhas longas e complexas
• Limite de tentativas (3 erros = bloqueio temporário)
• Captcha
• Two-factor authentication (2FA)

Na próxima sala você vai fazer um mini ataque de força bruta!
  `,
};

const code2_4: CodeChallenge = {
  id: '2.4',
  type: 'code',
  episode: 2,
  room: '2.4',
  title: 'Seu primeiro ataque de força bruta',
  description: 'Você tem o hash de uma senha e uma wordlist de senhas comuns. Teste cada uma até encontrar a que corresponde ao hash — ou concluir que nenhuma bate.',
  instructions: 'Escreva quebrarSenha(hashAlvo, wordlist): teste cada senha da wordlist com simpleHash(). Devolva a primeira que bater com hashAlvo, ou null (None em Python) se nenhuma bater.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `${SIMPLE_HASH_JS}

function quebrarSenha(hashAlvo, wordlist) {
  // Percorra a wordlist com um loop
  // Para cada senha, calcule o hash com simpleHash()
  // Se bater com hashAlvo, devolva essa senha com return (use break-por-return: sair na hora)
  // Se terminar o loop sem achar, devolva null
}
`,
    python: `${SIMPLE_HASH_PY}

def quebrar_senha(hash_alvo, wordlist):
    # Percorra a wordlist com um loop
    # Para cada senha, calcule o hash com simple_hash()
    # Se bater com hash_alvo, devolva essa senha com return (retornar já "quebra" o loop)
    # Se terminar o loop sem achar, devolva None
    pass
`,
  },
  tests: {
    fn: { javascript: 'quebrarSenha', python: 'quebrar_senha' },
    cases: [
      { name: 'acha "admin"', args: ['1177efa8', ['123456', 'password', 'admin', 'qwerty', 'letmein']], expected: 'admin' },
      { name: 'acha "letmein" (última da lista)', args: ['1a44c57c', ['123456', 'password', 'admin', 'qwerty', 'letmein']], expected: 'letmein' },
      { name: 'nenhuma senha bate', args: ['ffffffff', ['123456', 'password']], expected: null, hidden: true },
      { name: 'wordlist com uma senha só', args: ['27861ef9', ['123456']], expected: '123456', hidden: true },
    ],
  },
  solution: {
    javascript: `${SIMPLE_HASH_JS}

function quebrarSenha(hashAlvo, wordlist) {
  for (const senha of wordlist) {
    if (simpleHash(senha) === hashAlvo) {
      return senha;
    }
  }
  return null;
}`,
    python: `${SIMPLE_HASH_PY}

def quebrar_senha(hash_alvo, wordlist):
    for senha in wordlist:
        if simple_hash(senha) == hash_alvo:
            return senha
    return None`,
  },
  explanation: `
**Parabéns! Você fez um ataque de força bruta.**

Repare no caso em que nenhuma senha bate: o loop termina normalmente e a função devolve null/None — um resultado tão válido quanto encontrar a senha, e que seu código precisa saber tratar.

**No mundo real:**
• Analistas de segurança fazem isso para testar sistemas
• Hackers do mal fazem isso para invadir contas
• Ferramentas profissionais: Hashcat, John the Ripper

**Carreira:**
Pentesters (testadores de invasão) são pagos para fazer exatamente isso - tentar quebrar sistemas para encontrar vulnerabilidades ANTES dos hackers do mal.
  `,
  hints: [
    'return dentro do loop já interrompe a busca na hora que encontra — não precisa de break separado',
    'Se o loop terminar sem nenhum return ter acontecido, o código cai no return null (ou None) do final',
    '"admin" é a 3ª da lista, "letmein" é a última — confira se seu loop percorre a lista inteira',
  ],
  difficulty: 'medium',
};

const theory2_5: TheoryChallenge = {
  id: '2.5',
  type: 'theory',
  episode: 2,
  room: '2.5',
  title: 'Parabéns - Episódio 2 completo!',
  description: 'Você aprendeu conceitos fundamentais de segurança de senhas.',
  content: `
**O que você domina agora:**
✅ Hash - como senhas são protegidas
✅ Validação - comparação de hashes
✅ Força bruta - testando senhas até encontrar
✅ Wordlists - listas de senhas comuns

**Aplicações no mundo real:**
• **Pentester:** Testa segurança de sistemas
• **Security Analyst:** Monitora tentativas de força bruta
• **DevSecOps:** Implementa proteção contra ataques

**Próximo episódio:**
Base64, encoding e como dados são transmitidos pela internet.

Continue assim - você está no caminho para se tornar um profissional de cibersegurança! 🔐
  `,
};

export const episode2Challenges: Challenge[] = [
  theory2_0,
  code2_1,
  code2_2,
  theory2_3,
  code2_4,
  theory2_5,
];
