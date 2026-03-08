import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory1_0: TheoryChallenge = {
  id: '1.0',
  type: 'theory',
  episode: 1,
  room: '1.0',
  title: 'Episódio 1 — Cifras e segredos',
  description: 'Bem-vindo ao Episódio 1! Agora vamos aprender sobre mensagens secretas e como a criptografia protege informações.',
  content: `
**O que é criptografia?**
Criptografia é a arte de esconder mensagens. Hackers do bem usam isso para:
• Proteger senhas (você não quer que alguém veja sua senha, certo?)
• Proteger mensagens no WhatsApp
• Proteger dados de cartão de crédito

**Cifra de César:**
É uma das cifras mais antigas. Cada letra é trocada por outra.
Exemplo: A vira D, B vira E, C vira F...
Se alguém escrever "KHOOR" na verdade é "HELLO" (deslocamento 3).

**Por que isso importa?**
Entender como cifras funcionam te ajuda a proteger e descobrir informações. É o básico de cibersegurança!
  `,
};

const code1_1: CodeChallenge = {
  id: '1.1',
  type: 'code',
  episode: 1,
  room: '1.1',
  title: 'Desvendando uma mensagem secreta',
  description: 'Alguém te enviou uma mensagem codificada: **Khoor**. Você sabe que é Cifra de César com deslocamento 3. O código para decodificar JÁ ESTÁ PRONTO. Execute e veja a mensagem real!',
  instructions: 'Execute o código e veja a mensagem decodificada.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Mensagem secreta que alguém te enviou:
const mensagemSecreta = "Khoor";

// Código para decodificar (já pronto!)
let resultado = "";
for (let i = 0; i < mensagemSecreta.length; i++) {
  const letra = mensagemSecreta[i];
  const codigo = letra.charCodeAt(0);
  
  // Verifica se é letra maiúscula
  if (codigo >= 65 && codigo <= 90) {
    const novoCaractere = String.fromCharCode(((codigo - 65 - 3 + 26) % 26) + 65);
    resultado += novoCaractere;
  } else if (codigo >= 97 && codigo <= 122) {
    const novoCaractere = String.fromCharCode(((codigo - 97 - 3 + 26) % 26) + 97);
    resultado += novoCaractere;
  } else {
    resultado += letra;
  }
}

console.log(resultado);
`,
    python: `# Mensagem secreta que alguém te enviou:
mensagem_secreta = "Khoor"

# Código para decodificar (já pronto!)
resultado = ""
for letra in mensagem_secreta:
    codigo = ord(letra)
    
    # Verifica se é letra maiúscula
    if 65 <= codigo <= 90:
        novo_caractere = chr(((codigo - 65 - 3 + 26) % 26) + 65)
        resultado += novo_caractere
    elif 97 <= codigo <= 122:
        novo_caractere = chr(((codigo - 97 - 3 + 26) % 26) + 97)
        resultado += novo_caractere
    else:
        resultado += letra

print(resultado)
`,
  },
  expectedOutput: 'Hello',
  explanation: `
**O que esse código faz?**
1. Pega cada letra da mensagem secreta
2. Descobre o "código" da letra (A=65, B=66, etc)
3. Volta 3 posições (K volta para H)
4. Mostra a mensagem real

**Por que isso importa em cibersegurança?**
Hackers do bem precisam entender como mensagens são codificadas para protegê-las melhor. César é simples, mas o conceito é o mesmo usado no WhatsApp (só que MUITO mais complexo)!
  `,
  hints: [
    'O código já está pronto! Só clique em Executar',
    '"Khoor" se transforma em "Hello" quando voltamos 3 letras',
  ],
  difficulty: 'easy',
};

const code1_2: CodeChallenge = {
  id: '1.2',
  type: 'code',
  episode: 1,
  room: '1.2',
  title: 'Sua vez — mude a mensagem',
  description: 'Agora você recebeu outra mensagem secreta: **"Rrod"**. Mude APENAS a primeira linha do código para decodificar essa nova mensagem.',
  instructions: 'Troque "Khoor" por "Rrod" e execute',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Mude APENAS esta linha:
const mensagemSecreta = "Khoor";

// O resto do código fica igual:
let resultado = "";
for (let i = 0; i < mensagemSecreta.length; i++) {
  const letra = mensagemSecreta[i];
  const codigo = letra.charCodeAt(0);
  
  if (codigo >= 65 && codigo <= 90) {
    const novoCaractere = String.fromCharCode(((codigo - 65 - 3 + 26) % 26) + 65);
    resultado += novoCaractere;
  } else if (codigo >= 97 && codigo <= 122) {
    const novoCaractere = String.fromCharCode(((codigo - 97 - 3 + 26) % 26) + 97);
    resultado += novoCaractere;
  } else {
    resultado += letra;
  }
}

console.log(resultado);
`,
    python: `# Mude APENAS esta linha:
mensagem_secreta = "Khoor"

# O resto do código fica igual:
resultado = ""
for letra in mensagem_secreta:
    codigo = ord(letra)
    
    if 65 <= codigo <= 90:
        novo_caractere = chr(((codigo - 65 - 3 + 26) % 26) + 65)
        resultado += novo_caractere
    elif 97 <= codigo <= 122:
        novo_caractere = chr(((codigo - 97 - 3 + 26) % 26) + 97)
        resultado += novo_caractere
    else:
        resultado += letra

print(resultado)
`,
  },
  expectedOutput: 'Good',
  hints: [
    'Troque "Khoor" por "Rrod" na primeira linha',
    'Mantenha as aspas!',
    'O resultado é "Good"',
  ],
  difficulty: 'easy',
};

const theory1_3: TheoryChallenge = {
  id: '1.3',
  type: 'theory',
  episode: 1,
  room: '1.3',
  title: 'Parabéns! Você é um decodificador',
  description: 'Você acabou de fazer o que hackers do bem fazem: analisar e decodificar mensagens. Viu? Não é sobre "hackear contas", é sobre PROTEGER informações.',
  content: `
**O que você aprendeu:**
• Mensagens podem ser codificadas (criptografadas)
• Com o código certo, você pode decodificar
• Isso é usado para proteger senhas, mensagens e dados

**Próximos episódios:**
• Base64 (usado em sites)
• Hash (proteção de senhas)
• RSA (criptografia forte do WhatsApp)

**Carreira:**
Analistas de segurança fazem exatamente isso: analisam código, descobrem como sistemas funcionam e os protegem. Você está no caminho certo!

Parabéns por completar o Episódio 1! 🎉
  `,
};

export const episode1Challenges: Challenge[] = [
  theory1_0,
  code1_1,
  code1_2,
  theory1_3,
];
