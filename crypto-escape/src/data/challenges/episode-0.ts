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
  title: 'Variáveis e funções — seus primeiros blocos',
  description: 'Variáveis são "caixas" onde guardamos informações. Funções são blocos de código com nome, que recebem entradas e devolvem um resultado.',
  content: `
**Variáveis**
Guardar um nome em uma caixa chamada "usuario":

• **JavaScript:** \`const usuario = "Ana";\`
• **Python:** \`usuario = "Ana"\`

Depois você usa o que está dentro pelo nome da caixa.

**Funções (uma prévia)**
Uma função **recebe entradas** e **devolve uma saída** com \`return\`:

• **JavaScript:** \`function dobro(n) { return n * 2; }\`
• **Python:** \`def dobro(n): return n * 2\`

A partir das próximas salas, você vai **escrever funções**. O sistema chama a sua função com vários valores e confere se o resultado está certo, inclusive em **testes ocultos**.

**Importante:** a função precisa **devolver** o valor com \`return\`. Só imprimir na tela (\`console.log\`/\`print\`) não conta.
  `,
};

const code0_7: CodeChallenge = {
  id: '0.7',
  type: 'code',
  episode: 0,
  room: '0.7',
  title: 'Criando sua primeira variável',
  description: 'Escreva uma função que calcula o total de uma compra. Guarde o resultado em uma **variável** chamada `total` e devolva com return.',
  instructions: 'Complete a função: total = preço × quantidade, e devolva o total.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Guarde preco * quantidade em uma variável "total" e devolva.
function calcularTotal(preco, quantidade) {
  // seu código aqui
}
`,
    python: `# Guarde preco * quantidade em uma variável "total" e devolva.
def calcular_total(preco, quantidade):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'calcularTotal', python: 'calcular_total' },
    cases: [
      { name: '3 itens de 10', args: [10, 3], expected: 30 },
      { name: '2 itens de 5', args: [5, 2], expected: 10 },
      { name: 'preço zero', args: [0, 5], expected: 0, hidden: true },
      { name: 'preço com decimal', args: [2.5, 4], expected: 10, hidden: true },
      { name: 'quantidade zero', args: [100, 0], expected: 0, hidden: true },
    ],
  },
  solution: {
    javascript: `function calcularTotal(preco, quantidade) {
  const total = preco * quantidade;
  return total;
}`,
    python: `def calcular_total(preco, quantidade):
    total = preco * quantidade
    return total`,
  },
  explanation: `
**O que aconteceu aqui?**
Você guardou o resultado de uma conta em uma variável e devolveu esse valor com return. A variável dá um nome ao valor, o que deixa o código mais fácil de ler.

**Erro comum:** esquecer o return. Sem ele, a função devolve "nada" (undefined / None) e o teste mostra "recebido undefined".
  `,
  hints: [
    'Crie a variável: const total = preco * quantidade;  (Python: total = preco * quantidade)',
    'Depois devolva o valor: return total;',
    'Se aparecer "recebido undefined" (ou None), falta o return',
  ],
  difficulty: 'easy',
};

const code0_8: CodeChallenge = {
  id: '0.8',
  type: 'code',
  episode: 0,
  room: '0.8',
  title: 'Juntando textos',
  description: 'Você pode juntar (concatenar) textos com **+**: "Olá" + " " + "mundo" vira "Olá mundo". Escreva uma função que monta uma saudação.',
  instructions: 'Devolva "Olá " seguido do nome. Exemplo: saudar("Ana") devolve "Olá Ana".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Devolva "Olá " + nome
function saudar(nome) {
  // seu código aqui
}
`,
    python: `# Devolva "Olá " + nome
def saudar(nome):
    # seu código aqui
    pass
`,
  },
  tests: {
    fn: { javascript: 'saudar', python: 'saudar' },
    cases: [
      { name: 'nome simples', args: ['Ana'], expected: 'Olá Ana' },
      { name: 'outro nome', args: ['Hacker'], expected: 'Olá Hacker' },
      { name: 'nome vazio', args: [''], expected: 'Olá ', hidden: true },
      { name: 'nome composto', args: ['Maria Clara'], expected: 'Olá Maria Clara', hidden: true },
    ],
  },
  solution: {
    javascript: `function saudar(nome) {
  return "Olá " + nome;
}`,
    python: `def saudar(nome):
    return "Olá " + nome`,
  },
  explanation: `
**Concatenação**
O sinal + junta textos. O espaço faz parte do texto: "Olá " (com espaço) + nome. Sem ele, você teria "OláAna".

**Detalhe:** com nome vazio, o resultado é "Olá " (com o espaço no final). Os testes ocultos conferem exatamente isso.
  `,
  hints: [
    'Some o texto "Olá " com o nome: "Olá " + nome',
    'Não esqueça do espaço depois de "Olá"',
    'return "Olá " + nome',
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
