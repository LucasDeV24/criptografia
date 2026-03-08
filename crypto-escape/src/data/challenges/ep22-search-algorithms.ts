import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0: TheoryChallenge = {
  id: 'search.0', type: 'theory', episode: 22, room: '22.0',
  title: 'Episódio 22 — Algoritmos de Busca',
  description: 'Como encontrar dados rapidamente? Busca linear e busca binária — dois algoritmos fundamentais.',
  content: `
**O problema:** Você tem uma lista com 1 milhão de IPs bloqueados. Precisa verificar se um IP específico está na lista.

**Busca Linear:**
Verifica um por um, do início ao fim.
• Lista de 1.000.000 → até 1.000.000 comparações
• Simples, mas LENTO para listas grandes

**Busca Binária:**
Divide a lista ao meio a cada passo (lista precisa estar ordenada).
• Lista de 1.000.000 → no máximo ~20 comparações!
• Muito mais rápido, mas exige lista ordenada

**Analogia:**
• Linear: procurar um nome no dicionário página por página
• Binária: abrir no meio, ver se é antes ou depois, dividir de novo
  `,
};

const code1: CodeChallenge = {
  id: 'search.1', type: 'code', episode: 22, room: '22.1',
  title: 'Busca Linear',
  description: 'Procure o IP **"45.33.32.1"** em uma lista, verificando um por um. **Execute**!',
  instructions: 'Execute e veja a busca linear.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const ips = ["10.0.0.1", "172.16.0.1", "45.33.32.1", "8.8.8.8", "1.1.1.1"];\nconst alvo = "45.33.32.1";\n\nfor (let i = 0; i < ips.length; i++) {\n  if (ips[i] == alvo) {\n    console.log("Encontrado na posicao " + i);\n    break;\n  }\n}\n`,
    python: `ips = ["10.0.0.1", "172.16.0.1", "45.33.32.1", "8.8.8.8", "1.1.1.1"]\nalvo = "45.33.32.1"\n\nfor i in range(len(ips)):\n    if ips[i] == alvo:\n        print("Encontrado na posicao " + str(i))\n        break\n`,
  },
  expectedOutput: 'Encontrado na posicao 2',
  hints: ['O código já está pronto! Execute.'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'search.2', type: 'code', episode: 22, room: '22.2',
  title: 'Busca Linear — contando passos',
  description: 'Agora contamos quantas comparações foram necessárias. **Execute**!',
  instructions: 'Execute e veja quantos passos foram necessários.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const numeros = [2, 5, 8, 12, 16, 23, 38, 42, 55, 67];\nconst alvo = 42;\nlet passos = 0;\n\nfor (let i = 0; i < numeros.length; i++) {\n  passos++;\n  if (numeros[i] == alvo) {\n    console.log("Encontrado em " + passos + " passos");\n    break;\n  }\n}\n`,
    python: `numeros = [2, 5, 8, 12, 16, 23, 38, 42, 55, 67]\nalvo = 42\npassos = 0\n\nfor i in range(len(numeros)):\n    passos += 1\n    if numeros[i] == alvo:\n        print("Encontrado em " + str(passos) + " passos")\n        break\n`,
  },
  expectedOutput: 'Encontrado em 8 passos',
  hints: ['42 está na posição 7 (índice 7), então 8 comparações.'],
  difficulty: 'easy',
};

const theory3: TheoryChallenge = {
  id: 'search.3', type: 'theory', episode: 22, room: '22.3',
  title: 'Como funciona a Busca Binária',
  description: 'A busca binária divide a lista ao meio repetidamente. É absurdamente mais rápida!',
  content: `
**Passo a passo com [2, 5, 8, 12, 16, 23, 38, 42] buscando 38:**

1. Meio = 12. 38 > 12 → descarta metade esquerda
2. Meio = 23. 38 > 23 → descarta esquerda
3. Meio = 38. **ENCONTRADO!** → 3 passos

Busca linear precisaria de 7 passos!

**Performance:**
| Tamanho da lista | Linear (pior caso) | Binária (pior caso) |
|---|---|---|
| 100 | 100 passos | 7 passos |
| 10.000 | 10.000 passos | 14 passos |
| 1.000.000 | 1.000.000 passos | 20 passos |

**Requisito:** a lista PRECISA estar ordenada para busca binária funcionar.
  `,
};

const code4: CodeChallenge = {
  id: 'search.4', type: 'code', episode: 22, room: '22.4',
  title: 'Busca Binária na prática',
  description: 'Implemente busca binária! A lista está ordenada. Buscamos o número **38**. **Execute**!',
  instructions: 'Execute e veja a busca binária.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const numeros = [2, 5, 8, 12, 16, 23, 38, 42, 55, 67];\nconst alvo = 38;\nlet inicio = 0;\nlet fim = numeros.length - 1;\nlet passos = 0;\n\nwhile (inicio <= fim) {\n  passos++;\n  const meio = Math.floor((inicio + fim) / 2);\n  \n  if (numeros[meio] == alvo) {\n    console.log("Encontrado em " + passos + " passos");\n    break;\n  } else if (numeros[meio] < alvo) {\n    inicio = meio + 1;\n  } else {\n    fim = meio - 1;\n  }\n}\n`,
    python: `numeros = [2, 5, 8, 12, 16, 23, 38, 42, 55, 67]\nalvo = 38\ninicio = 0\nfim = len(numeros) - 1\npassos = 0\n\nwhile inicio <= fim:\n    passos += 1\n    meio = (inicio + fim) // 2\n    \n    if numeros[meio] == alvo:\n        print("Encontrado em " + str(passos) + " passos")\n        break\n    elif numeros[meio] < alvo:\n        inicio = meio + 1\n    else:\n        fim = meio - 1\n`,
  },
  expectedOutput: 'Encontrado em 3 passos',
  hints: ['Busca binária encontra 38 em apenas 3 passos (vs 7 na linear)!'],
  difficulty: 'medium',
};

const theory5: TheoryChallenge = {
  id: 'search.5', type: 'theory', episode: 22, room: '22.5',
  title: 'Parabéns! Algoritmos de busca dominados!',
  description: 'Saber escolher o algoritmo certo diferencia um programador comum de um profissional.',
  content: `
**O que você aprendeu:**
• Busca linear: simples, funciona em qualquer lista
• Busca binária: muito rápida, precisa de lista ordenada
• Contar passos: medir eficiência de algoritmos

**Na cibersegurança:**
• Firewalls usam busca binária em listas de IPs bloqueados
• Antivírus buscam assinaturas de malware em bases enormes
• WAFs buscam padrões de ataque em listas de regras
  `,
};

export const searchAlgorithmsChallenges: Challenge[] = [theory0, code1, code2, theory3, code4, theory5];
