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
  `,
};

const code7_1: CodeChallenge = {
  id: '7.1',
  type: 'code',
  episode: 7,
  room: '7.1',
  title: 'Criando uma wordlist',
  description: 'Vamos criar uma mini wordlist com as 10 senhas mais comuns do mundo.',
  instructions: 'Execute e veja as senhas mais usadas',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Top 10 senhas mais usadas (dados reais de vazamentos)
const wordlist = [
  "123456",
  "password",
  "123456789",
  "12345678",
  "12345",
  "1234567",
  "admin",
  "123123",
  "qwerty",
  "abc123"
];

console.log("=== Wordlist carregada ===");
console.log("Total de senhas: " + wordlist.length);
console.log("\\nPrimeiras 5:");
for (let i = 0; i < 5; i++) {
  console.log((i + 1) + ". " + wordlist[i]);
}
`,
    python: `# Top 10 senhas mais usadas (dados reais de vazamentos)
wordlist = [
    "123456",
    "password",
    "123456789",
    "12345678",
    "12345",
    "1234567",
    "admin",
    "123123",
    "qwerty",
    "abc123"
]

print("=== Wordlist carregada ===")
print(f"Total de senhas: {len(wordlist)}")
print("\\nPrimeiras 5:")
for i in range(5):
    print(f"{i + 1}. {wordlist[i]}")
`,
  },
  expectedOutput: '=== Wordlist carregada ===\nTotal de senhas: 10\n\nPrimeiras 5:\n1. 123456\n2. password\n3. 123456789\n4. 12345678\n5. 12345',
  explanation: `
**Fato chocante:**
23% de TODAS as contas usam senhas dessa lista!

**Estudo real (2023):**
"123456" ainda é a senha mais usada no mundo.
Mais de 100 milhões de pessoas usam ela.

Por isso força bruta com wordlist funciona tão bem!
  `,
  hints: [
    'Estas são as 10 senhas mais comuns do mundo',
    'Dados de vazamentos reais (Have I Been Pwned)',
  ],
  difficulty: 'easy',
};

const code7_2: CodeChallenge = {
  id: '7.2',
  type: 'code',
  episode: 7,
  room: '7.2',
  title: 'Ataque automatizado',
  description: 'Agora automatize um ataque! Teste cada senha da wordlist contra um hash até encontrar a correta.',
  instructions: 'Execute o ataque de força bruta automatizado',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const wordlist = ["123456", "password", "123456789", "12345678", "qwerty"];

// Hash alvo (senha que queremos descobrir)
const hashAlvo = "e10adc3949ba59abbe56e057f20f883e";

// Função hash MD5 simplificada
function simpleHash(texto) {
  let hash = 0;
  for (let i = 0; i < texto.length; i++) {
    hash = ((hash << 5) - hash) + texto.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(32, '0');
}

console.log("🔍 Iniciando ataque de força bruta...");
console.log("Hash alvo: " + hashAlvo);
console.log("\\n");

// Crie variáveis: tentativas (0) e senhaEncontrada (false)
// Percorra a wordlist:
//   - Incremente tentativas
//   - Calcule o hash com simpleHash()
//   - Imprima: "Tentativa " + tentativas + ": testando '" + senha + "'..."
//   - Se hash === hashAlvo:
//     - Imprima: "\\n✅ SENHA ENCONTRADA: " + senha
//     - Imprima: "Total de tentativas: " + tentativas
//     - Marque como encontrada e use break
// Depois do loop, se não encontrou:
//   - Imprima: "\\n❌ Senha não encontrada na wordlist"
`,
    python: `wordlist = ["123456", "password", "123456789", "12345678", "qwerty"]

# Hash alvo (senha que queremos descobrir)
hash_alvo = "e10adc3949ba59abbe56e057f20f883e"

# Função hash MD5 simplificada
def simple_hash(texto):
    hash_val = 0
    for char in texto:
        hash_val = ((hash_val << 5) - hash_val) + ord(char)
        hash_val = hash_val & 0xFFFFFFFF
    return format(abs(hash_val), '032x')

print("🔍 Iniciando ataque de força bruta...")
print(f"Hash alvo: {hash_alvo}")
print("\\n")

# Crie variáveis: tentativas (0) e senha_encontrada (False)
# Percorra a wordlist:
#   - Incremente tentativas
#   - Calcule o hash com simple_hash()
#   - Imprima: f"Tentativa {tentativas}: testando '{senha}'..."
#   - Se hash == hash_alvo:
#     - Imprima: f"\\n✅ SENHA ENCONTRADA: {senha}"
#     - Imprima: f"Total de tentativas: {tentativas}"
#     - Marque como encontrada e use break
# Depois do loop, se não encontrou:
#   - Imprima: "\\n❌ Senha não encontrada na wordlist"
`,
  },
  expectedOutput: 'Tentativa 2: testando \'password\'...\n\n✅ SENHA ENCONTRADA: password\nTotal de tentativas: 2',
  explanation: `
**Ataque bem-sucedido!**

Encontramos a senha "password" em apenas 2 tentativas.

**No mundo real:**
• Hashcat testa 100 BILHÕES de senhas por segundo (com GPU)
• rockyou.txt tem 14 milhões de senhas
• Tempo médio: minutos a horas (dependendo da senha)

**Defesa:**
• Senhas longas (12+ caracteres)
• Caracteres especiais
• Não usar senhas comuns
• Hashing forte (bcrypt, Argon2)
  `,
  hints: [
    'O código está pronto - veja o ataque acontecendo',
    'A senha "password" será encontrada rapidamente',
  ],
  difficulty: 'easy',
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
  description: 'Pegue uma wordlist e aplique regras de mutação para gerar variações (password → p@ssw0rd, Password1, etc).',
  instructions: 'Execute e veja as mutações sendo geradas',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const palavrasBase = ["admin", "password"];

// Implemente a função gerarMutacoes que retorna um array com 5 variações:
// 1. A palavra original
// 2. Primeira letra maiúscula (charAt(0).toUpperCase() + slice(1))
// 3. Palavra + "123"
// 4. Palavra + "2024"
// 5. Leetspeak: a→@, o→0, i→1, e→3 (use .replace(/a/g, '@') etc.)
function gerarMutacoes(palavra) {
  const mutacoes = [];
  // Adicione as 5 variações aqui
  return mutacoes;
}

console.log("=== Gerando wordlist com mutações ===\\n");

// Percorra palavrasBase, gere mutações de cada uma
// Junte tudo em um array wordlistFinal usando .concat()
// Imprima "Total de senhas geradas: " + wordlistFinal.length
// Imprima "\\nExemplos:" e liste as 10 primeiras:
//   (i + 1) + ". " + wordlistFinal[i]
`,
    python: `palavras_base = ["admin", "password"]

# Implemente a função gerar_mutacoes que retorna uma lista com 5 variações:
# 1. A palavra original
# 2. Primeira letra maiúscula (.capitalize())
# 3. Palavra + "123"
# 4. Palavra + "2024"
# 5. Leetspeak: a→@, o→0, i→1, e→3 (use .replace())
def gerar_mutacoes(palavra):
    mutacoes = []
    # Adicione as 5 variações aqui
    return mutacoes

print("=== Gerando wordlist com mutações ===\\n")

# Percorra palavras_base, gere mutações de cada uma
# Junte tudo em uma lista wordlist_final usando .extend()
# Imprima f"Total de senhas geradas: {len(wordlist_final)}"
# Imprima "\\nExemplos:" e liste as 10 primeiras:
#   f"{i + 1}. {senha}"
`,
  },
  expectedOutput: 'Total de senhas geradas: 10\n\nExemplos:\n1. admin\n2. Admin\n3. admin123\n4. admin2024\n5. @dm1n',
  explanation: `
**De 2 palavras → 10 variações!**

**Técnicas aplicadas:**
• Capitalização (Password)
• Números comuns (123, 2024)
• Leetspeak (p@ssw0rd)

**No mundo real:**
Ferramentas como Hashcat usam arquivos de regras complexas:
• JohnTheRipper rules
• Best64.rule (64 regras otimizadas)
• OneRuleToRuleThemAll

Com regras profissionais: 1 senha → 1000+ variações!
  `,
  hints: [
    'Veja como 2 palavras viram 10 senhas diferentes',
    'Mutações aumentam drasticamente chances de sucesso',
  ],
  difficulty: 'easy',
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
