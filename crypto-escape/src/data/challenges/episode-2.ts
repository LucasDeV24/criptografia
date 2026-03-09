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
Exemplo: "senha123" → "482c811da5d5b4bc6d497ffa98491e38"

**Por que isso importa?**
Sites NÃO guardam sua senha real. Eles guardam o HASH.
Quando você faz login, o site compara o hash que você enviou com o hash guardado.

**Hackers do mal:**
Tentam "quebrar" hashes para descobrir senhas. Isso se chama "cracking".

**Hackers do bem:**
Entendem isso para criar sistemas mais seguros e testar vulnerabilidades.

Vamos aprender como funciona!
  `,
};

const code2_1: CodeChallenge = {
  id: '2.1',
  type: 'code',
  episode: 2,
  room: '2.1',
  title: 'Comparando senhas com hash',
  description: 'Você tem o hash de uma senha guardada no sistema. Um usuário está tentando fazer login. O código compara os hashes para verificar se a senha está correta.',
  instructions: 'Execute o código e veja como a validação funciona',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Sistema simples de validação de senha

// Hash da senha guardada no banco de dados
const hashArmazenado = "5f4dcc3b5aa765d61d8327deb882cf99";

// Usuário tentando fazer login com esta senha:
const senhaDigitada = "password";

// Função simples para simular hash (MD5 simplificado)
function simpleHash(texto) {
  let hash = 0;
  for (let i = 0; i < texto.length; i++) {
    hash = ((hash << 5) - hash) + texto.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}

const hashDigitado = simpleHash(senhaDigitada);

if (hashDigitado === hashArmazenado) {
  console.log("Login bem-sucedido!");
} else {
  console.log("Senha incorreta");
}
`,
    python: `# Sistema simples de validação de senha

# Hash da senha guardada no banco de dados
hash_armazenado = "5f4dcc3b5aa765d61d8327deb882cf99"

# Usuário tentando fazer login com esta senha:
senha_digitada = "password"

# Função simples para simular hash
def simple_hash(texto):
    hash_val = 0
    for char in texto:
        hash_val = ((hash_val << 5) - hash_val) + ord(char)
        hash_val = hash_val & 0xFFFFFFFF  # 32bit
    return format(abs(hash_val), 'x')

hash_digitado = simple_hash(senha_digitada)

if hash_digitado == hash_armazenado:
    print("Login bem-sucedido!")
else:
    print("Senha incorreta")
`,
  },
  expectedOutput: 'Senha incorreta',
  explanation: `
**O que aconteceu?**
O sistema não compara senhas diretamente. Ele compara HASHES.
Se os hashes são iguais = senha correta
Se diferentes = senha errada

**No mundo real:**
Sites como Instagram, Gmail usam isso. Eles NUNCA veem sua senha real!
  `,
  hints: [
    'O código já está pronto, só execute',
    'A senha "password" não corresponde ao hash armazenado',
  ],
  difficulty: 'easy',
};

const code2_2: CodeChallenge = {
  id: '2.2',
  type: 'code',
  episode: 2,
  room: '2.2',
  title: 'Testando diferentes senhas',
  description: 'Agora tente trocar a senha digitada para "admin" e veja se o login funciona.',
  instructions: 'Use a função simpleHash() para calcular o hash da senha "admin" e compare com o hash armazenado. Imprima se o login foi bem-sucedido ou não.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Senha que o usuário está tentando:
const senhaDigitada = "admin";

// Hash armazenado no banco de dados:
const hashArmazenado = "5f4dcc3b5aa765d61d8327deb882cf99";

function simpleHash(texto) {
  let hash = 0;
  for (let i = 0; i < texto.length; i++) {
    hash = ((hash << 5) - hash) + texto.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

// Calcule o hash da senhaDigitada usando simpleHash()
// Compare o hash calculado com hashArmazenado
// Se forem iguais, imprima: "Login bem-sucedido!"
// Se forem diferentes, imprima: "Senha incorreta"
`,
    python: `# Senha que o usuário está tentando:
senha_digitada = "admin"

# Hash armazenado no banco de dados:
hash_armazenado = "5f4dcc3b5aa765d61d8327deb882cf99"

def simple_hash(texto):
    hash_val = 0
    for char in texto:
        hash_val = ((hash_val << 5) - hash_val) + ord(char)
        hash_val = hash_val & 0xFFFFFFFF
    return format(abs(hash_val), 'x')

# Calcule o hash da senha_digitada usando simple_hash()
# Compare o hash calculado com hash_armazenado
# Se forem iguais, imprima: "Login bem-sucedido!"
# Se forem diferentes, imprima: "Senha incorreta"
`,
  },
  expectedOutput: 'Senha incorreta',
  hints: [
    'Chame simpleHash(senhaDigitada) e guarde o resultado em uma variável',
    'Use if/else para comparar o hash calculado com hashArmazenado',
    'Nenhuma das senhas testadas corresponde ao hash - o resultado é "Senha incorreta"',
  ],
  difficulty: 'easy',
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
1. Hacker tem o hash: "5f4dcc3b5aa765d61d8327deb882cf99"
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
  description: 'Você tem um hash. Teste senhas comuns até encontrar a correta. O código já tem uma lista de senhas - você só precisa completar o loop.',
  instructions: 'Escreva um loop que teste cada senha da wordlist contra o hash alvo. Para cada senha, calcule o hash e compare. Quando encontrar, imprima a senha.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const hashAlvo = "21232f297a57a5a743894a0e4a801fc3";

// Lista de senhas comuns (wordlist)
const senhasComuns = ["123456", "password", "admin", "qwerty", "letmein"];

function simpleHash(texto) {
  let hash = 0;
  for (let i = 0; i < texto.length; i++) {
    hash = ((hash << 5) - hash) + texto.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

// Percorra a lista senhasComuns com um loop
// Para cada senha, calcule o hash com simpleHash()
// Compare o hash calculado com hashAlvo
// Se encontrar, imprima: "Senha encontrada: " + a senha
// Use break para parar quando encontrar
`,
    python: `hash_alvo = "21232f297a57a5a743894a0e4a801fc3"

# Lista de senhas comuns (wordlist)
senhas_comuns = ["123456", "password", "admin", "qwerty", "letmein"]

def simple_hash(texto):
    hash_val = 0
    for char in texto:
        hash_val = ((hash_val << 5) - hash_val) + ord(char)
        hash_val = hash_val & 0xFFFFFFFF
    return format(abs(hash_val), 'x')

# Percorra a lista senhas_comuns com um loop
# Para cada senha, calcule o hash com simple_hash()
# Compare o hash calculado com hash_alvo
# Se encontrar, imprima: "Senha encontrada: " + a senha
# Use break para parar quando encontrar
`,
  },
  expectedOutput: 'Senha encontrada: admin',
  explanation: `
**Parabéns! Você fez um ataque de força bruta.**

**No mundo real:**
• Analistas de segurança fazem isso para testar sistemas
• Hackers do mal fazem isso para invadir contas
• Ferramentas profissionais: Hashcat, John the Ripper

**Carreira:**
Pentesters (testadores de invasão) são pagos para fazer exatamente isso - tentar quebrar sistemas para encontrar vulnerabilidades ANTES dos hackers do mal.
  `,
  hints: [
    'Use for (let i = 0; i < senhasComuns.length; i++) ou for...of',
    'Dentro do loop: const hash = simpleHash(senhasComuns[i])',
    'Compare: if (hash === hashAlvo) e imprima a senha encontrada',
    'A senha correta é "admin"',
  ],
  difficulty: 'easy',
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
