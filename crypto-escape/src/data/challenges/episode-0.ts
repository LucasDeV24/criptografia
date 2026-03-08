import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0_1: TheoryChallenge = {
  id: '0.1',
  type: 'theory',
  episode: 0,
  room: '0.1',
  title: 'Bem-vindo ao Crypto Escape!',
  description: 'Você está prestes a aprender cibersegurança de um jeito diferente: resolvendo desafios e escrevendo código. Não se preocupe se nunca programou — vamos começar do zero.',
  content: `
**O que você vai fazer aqui:**
• Ler explicações curtas (como esta)
• Resolver desafios escrevendo código
• Escolher entre JavaScript ou Python
• Ir avançando no seu ritmo

**Não sabe programar?** Tudo bem! Nas próximas salas vamos te guiar passo a passo.

**Isso tem haver com cibersegurança?** Sim! Hackers do bem usam código para proteger sistemas, descobrir vulnerabilidades e decifrar mensagens.

Clique em **Continuar** para avançar.
  `,
};

const theory0_2: TheoryChallenge = {
  id: '0.2',
  type: 'theory',
  episode: 0,
  room: '0.2',
  title: 'O que é código?',
  description: 'Código é uma sequência de instruções que o computador entende e executa. É como uma receita: você escreve os passos, o computador segue.',
  content: `
**Exemplo simples:**
Se você escrever "mostre a mensagem Olá", o computador vai mostrar: Olá

Em programação usamos comandos específicos:
• **JavaScript:** \`console.log("Olá")\`
• **Python:** \`print("Olá")\`

Na próxima sala você vai ver o editor onde escrevemos esse código.
  `,
};

const theory0_3: TheoryChallenge = {
  id: '0.3',
  type: 'theory',
  episode: 0,
  room: '0.3',
  title: 'Conhecendo o editor',
  description: 'O editor é onde você escreve o código. Ele tem 3 partes importantes:',
  content: `
**1. Área do código** (a caixa escura)
É onde você digita. Pode usar JavaScript ou Python — escolha a linguagem no menu.

**2. Botão Executar**
Quando clicar, o computador vai rodar seu código e mostrar o resultado.

**3. Área de Output** (saída)
Aqui aparece o que seu código "imprimiu" — o resultado.

Na próxima sala, o código já vai estar pronto. Você só precisa clicar em **Executar** para ver a mágica acontecer!
  `,
};

const code0_4: CodeChallenge = {
  id: '0.4',
  type: 'code',
  episode: 0,
  room: '0.4',
  title: 'Sua primeira execução',
  description: 'O código já está pronto abaixo. Sua missão é simples: clique no botão **Executar** e veja o que acontece. Não precisa digitar nada ainda!',
  instructions: 'Clique em Executar. O código já está correto.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// O código já está pronto!
// Clique em EXECUTAR (o botão verde) →

console.log("Olá, Crypto Escape!");
`,
    python: `# O código já está pronto!
# Clique em EXECUTAR (o botão verde) →

print("Olá, Crypto Escape!")
`,
  },
  expectedOutput: 'Olá, Crypto Escape!',
  hints: [
    'Procure o botão verde "Executar" no canto superior direito',
    'Clique nele e aguarde o resultado aparecer na área Output',
  ],
  difficulty: 'easy',
};

const code0_5: CodeChallenge = {
  id: '0.5',
  type: 'code',
  episode: 0,
  room: '0.5',
  title: 'Agora é sua vez!',
  description: 'Você viu como funciona. Agora escreva você mesmo! Mude a mensagem entre aspas para: **Bem-vindo** e clique em Executar.',
  instructions: 'Altere a mensagem para exatamente: Bem-vindo',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Mude "sua mensagem" para: Bem-vindo
// (mantenha as aspas)

console.log("sua mensagem");
`,
    python: `# Mude "sua mensagem" para: Bem-vindo
# (mantenha as aspas)

print("sua mensagem")
`,
  },
  expectedOutput: 'Bem-vindo',
  hints: [
    'Substitua "sua mensagem" por "Bem-vindo"',
    'Em JavaScript: console.log("Bem-vindo")',
    'Em Python: print("Bem-vindo")',
  ],
  difficulty: 'easy',
};

const theory0_6: TheoryChallenge = {
  id: '0.6',
  type: 'theory',
  episode: 0,
  room: '0.6',
  title: 'Variáveis — guardando informações',
  description: 'Variáveis são como "caixas" onde guardamos informações para usar depois. Pense como um cofre com um nome.',
  content: `
**Exemplo:**
Guardar um nome em uma caixa chamada "usuario":

• **JavaScript:** \`const usuario = "Ana";\`
• **Python:** \`usuario = "Ana"\`

Depois você pode mostrar o que está dentro:

• **JavaScript:** \`console.log(usuario);\` → mostra: Ana
• **Python:** \`print(usuario)\` → mostra: Ana

Na próxima sala você vai criar sua primeira variável!
  `,
};

const code0_7: CodeChallenge = {
  id: '0.7',
  type: 'code',
  episode: 0,
  room: '0.7',
  title: 'Criando sua primeira variável',
  description: 'Vamos criar uma variável chamada `nome` e guardar seu nome nela. Depois, mostre o conteúdo usando print/console.log.',
  instructions: 'Crie uma variável "nome" com o valor "Ana" e imprima.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Complete o código abaixo:

const nome = "Ana";

// Agora mostre o que está dentro de "nome":
console.log(nome);
`,
    python: `# Complete o código abaixo:

nome = "Ana"

# Agora mostre o que está dentro de "nome":
print(nome)
`,
  },
  expectedOutput: 'Ana',
  hints: [
    'O código já está quase pronto, só execute!',
    'A variável guarda "Ana" e depois mostramos na tela',
  ],
  difficulty: 'easy',
};

const code0_8: CodeChallenge = {
  id: '0.8',
  type: 'code',
  episode: 0,
  room: '0.8',
  title: 'Juntando textos',
  description: 'Você pode juntar (concatenar) textos. Exemplo: "Olá" + " " + "mundo" = "Olá mundo". Vamos praticar!',
  instructions: 'Imprima: Olá Ana',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const saudacao = "Olá";
const nome = "Ana";

// Junte saudacao + " " + nome e imprima
// Use: console.log(saudacao + " " + nome);

console.log(saudacao + " " + nome);
`,
    python: `saudacao = "Olá"
nome = "Ana"

# Junte saudacao + " " + nome e imprima
# Use: print(saudacao + " " + nome)

print(saudacao + " " + nome)
`,
  },
  expectedOutput: 'Olá Ana',
  hints: [
    'O código já está pronto, só execute!',
    'Estamos juntando 3 partes: "Olá" + espaço + "Ana"',
  ],
  difficulty: 'easy',
};

export const episode0Challenges: Challenge[] = [
  theory0_1,
  theory0_2,
  theory0_3,
  code0_4,
  code0_5,
  theory0_6,
  code0_7,
  code0_8,
];
