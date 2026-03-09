import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0: TheoryChallenge = {
  id: 'sort.0', type: 'theory', episode: 23, room: '23.0',
  title: 'Episódio 23 — Ordenação e Complexidade',
  description: 'Ordenar dados é fundamental. Logs por data, IPs por frequência, vulnerabilidades por gravidade.',
  content: `
**Por que ordenar importa?**
• Logs precisam estar em ordem cronológica
• Busca binária só funciona com dados ordenados
• Relatórios mostram vulnerabilidades da mais grave à menos grave

**Bubble Sort — o algoritmo mais simples:**
Compara pares vizinhos e troca se estiverem na ordem errada.
Repete até não haver mais trocas.

**Exemplo:** [5, 3, 1] → [3, 5, 1] → [3, 1, 5] → [1, 3, 5]

**Complexidade — O(n²) vs O(n log n):**
• Bubble sort: O(n²) — lento para listas grandes
• Algoritmos profissionais (merge sort, quick sort): O(n log n) — muito mais rápidos
  `,
};

const code1: CodeChallenge = {
  id: 'sort.1', type: 'code', episode: 23, room: '23.1',
  title: 'Bubble Sort',
  description: 'O Bubble Sort compara vizinhos e troca se necessário. **Execute** e veja a lista ser ordenada!',
  instructions: 'Implemente o Bubble Sort: compare pares vizinhos, troque se necessário, repita até ordenar. Imprima o resultado.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const numeros = [64, 25, 12, 22, 11];\n\n// Implemente Bubble Sort:\n// - Use dois loops aninhados (for dentro de for)\n// - Compare numeros[j] com numeros[j+1]\n// - Se o da esquerda for maior, troque os dois\n// - No final: console.log(numeros.join(", "))\n`,
    python: `numeros = [64, 25, 12, 22, 11]\n\n# Implemente Bubble Sort:\n# - Use dois loops aninhados (for dentro de for)\n# - Compare numeros[j] com numeros[j+1]\n# - Se o da esquerda for maior, troque os dois\n# - No final: print(", ".join(str(n) for n in numeros))\n`,
  },
  expectedOutput: '11, 12, 22, 25, 64',
  hints: ['O código já está pronto! Execute.'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'sort.2', type: 'code', episode: 23, room: '23.2',
  title: 'Ordenação embutida',
  description: 'Na prática, usamos .sort() que é muito mais rápido. **Execute**!',
  instructions: 'Use o método .sort() nativo para ordenar a lista de tentativas e imprima o resultado.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const tentativas = [15, 3, 42, 8, 1, 23];\n\n// Ordene usando .sort() e imprima:\n// - Em JS, sort numerico precisa de funcao: .sort(function(a,b){return a-b})\n// - Imprima: "Ordenado: " + tentativas.join(", ")\n`,
    python: `tentativas = [15, 3, 42, 8, 1, 23]\n\n# Ordene usando .sort() e imprima:\n# - tentativas.sort() ordena a lista\n# - Imprima: "Ordenado: " + ", ".join(str(t) for t in tentativas)\n`,
  },
  expectedOutput: 'Ordenado: 1, 3, 8, 15, 23, 42',
  hints: ['O código já está pronto! .sort() faz tudo automaticamente.'],
  difficulty: 'easy',
};

const code3: CodeChallenge = {
  id: 'sort.3', type: 'code', episode: 23, room: '23.3',
  title: 'Caso real — ranking de ameaças',
  description: 'Ordene vulnerabilidades por gravidade (maior primeiro) para priorizar correções. **Execute**!',
  instructions: 'Ordene as ameaças por gravidade decrescente (maior primeiro) e imprima cada uma no formato "gravidade - nome".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const ameacas = [\n  { nome: "XSS", gravidade: 6 },\n  { nome: "SQLi", gravidade: 9 },\n  { nome: "CSRF", gravidade: 5 },\n  { nome: "RCE", gravidade: 10 }\n];\n\n// 1. Ordene ameacas por gravidade DECRESCENTE\n//    Dica: .sort(function(a,b){ return b.gravidade - a.gravidade })\n// 2. Percorra e imprima cada: gravidade + " - " + nome\n`,
    python: `ameacas = [\n    {"nome": "XSS", "gravidade": 6},\n    {"nome": "SQLi", "gravidade": 9},\n    {"nome": "CSRF", "gravidade": 5},\n    {"nome": "RCE", "gravidade": 10}\n]\n\n# 1. Ordene ameacas por gravidade DECRESCENTE\n#    Dica: .sort(key=lambda a: a["gravidade"], reverse=True)\n# 2. Percorra e imprima cada: str(gravidade) + " - " + nome\n`,
  },
  expectedOutput: '10 - RCE\n9 - SQLi\n6 - XSS\n5 - CSRF',
  hints: ['Ordenamos por gravidade decrescente (maior → menor).'],
  difficulty: 'medium',
};

const theory4: TheoryChallenge = {
  id: 'sort.4', type: 'theory', episode: 23, room: '23.4',
  title: 'Parabéns! Módulo de Algoritmos completo!',
  description: 'Agora você pensa como um desenvolvedor profissional — analisando eficiência e escolhendo os melhores algoritmos.',
  content: `
**Resumo do Módulo 3 — Lógica e Algoritmos:**
• Ep 20: Operadores lógicos (AND, OR, NOT)
• Ep 21: While loops, break, continue
• Ep 22: Busca linear vs binária
• Ep 23: Ordenação e complexidade

**Por que isso importa:**
Desenvolvedores top sabem COMO resolver problemas, não apenas copiar código.
Analistas de segurança precisam processar dados rapidamente.
Entrevistas de emprego testam exatamente esses conceitos!

**Próximo módulo: Segurança Web Avançada!**
CSRF, Command Injection, Directory Traversal e mais.
  `,
};

export const sortingChallenges: Challenge[] = [theory0, code1, code2, code3, theory4];
