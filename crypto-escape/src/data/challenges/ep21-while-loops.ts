import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0: TheoryChallenge = {
  id: 'while.0', type: 'theory', episode: 21, room: '21.0',
  title: 'Episódio 21 — While e Controle de Fluxo',
  description: 'O while loop repete enquanto a condição for verdadeira. Hackers usam para tentativas infinitas de login.',
  content: `
**for vs while:**
• \`for\`: quando você sabe quantas vezes repetir
• \`while\`: quando NÃO sabe — repete até uma condição mudar

**Exemplo real:**
\`\`\`
enquanto (senha errada) {
    tentar próxima senha
}
\`\`\`

**Controle de fluxo:**
• \`break\` → sai do loop imediatamente
• \`continue\` → pula para a próxima volta

**JavaScript:** \`while (condicao) { ... }\`
**Python:** \`while condicao: ...\`
  `,
};

const code1: CodeChallenge = {
  id: 'while.1', type: 'code', episode: 21, room: '21.1',
  title: 'Seu primeiro while',
  description: 'O while conta de 1 até 5 — similar ao for, mas controlamos manualmente. **Execute**!',
  instructions: 'Escreva um while loop que imprima os números de 1 a 5. Use a variável i como contador.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `let i = 1;\n\n// Escreva um while que conta de 1 até 5:\n// - Condição: i <= 5\n// - Imprima i com console.log(i)\n// - Incremente i a cada volta\n`,
    python: `i = 1\n\n# Escreva um while que conta de 1 até 5:\n# - Condição: i <= 5\n# - Imprima i com print(i)\n# - Incremente i a cada volta\n`,
  },
  expectedOutput: '1\n2\n3\n4\n5',
  hints: ['O código já está pronto! Execute.'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'while.2', type: 'code', episode: 21, room: '21.2',
  title: 'Break — saindo do loop',
  description: 'O **break** para o loop imediatamente quando encontramos o que queremos. **Execute**!',
  instructions: 'Use while para buscar "admin" na lista de senhas. Quando encontrar, imprima a tentativa e use break para parar.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const senhas = ["abc", "123", "admin", "root", "test"];\nconst alvo = "admin";\n\n// Use while para buscar o alvo na lista:\n// - Percorra o array senhas com um indice\n// - Quando encontrar o alvo, imprima:\n//   "Encontrada na tentativa " + (indice + 1)\n// - Use break para parar o loop\n`,
    python: `senhas = ["abc", "123", "admin", "root", "test"]\nalvo = "admin"\n\n# Use while para buscar o alvo na lista:\n# - Percorra a lista senhas com um indice\n# - Quando encontrar o alvo, imprima:\n#   "Encontrada na tentativa " + str(indice + 1)\n# - Use break para parar o loop\n`,
  },
  expectedOutput: 'Encontrada na tentativa 3',
  hints: ['O loop para quando encontra "admin" na posição 2 (tentativa 3).'],
  difficulty: 'easy',
};

const code3: CodeChallenge = {
  id: 'while.3', type: 'code', episode: 21, room: '21.3',
  title: 'Simulando tentativas de login',
  description: 'Simule um sistema que permite no máximo **3 tentativas** de login. **Execute**!',
  instructions: 'Simule um sistema de login com máximo de 3 tentativas. Imprima se cada tentativa falhou ou se o login foi bem sucedido.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const senhaCorreta = "s3cur3";\nconst tentativas = ["admin", "1234", "s3cur3"];\n\n// Simule login com max 3 tentativas usando while:\n// - Percorra tentativas\n// - Se acertou: "Login OK na tentativa " + (i + 1) e break\n// - Se errou: "Tentativa " + (i + 1) + ": falhou"\n`,
    python: `senha_correta = "s3cur3"\ntentativas = ["admin", "1234", "s3cur3"]\n\n# Simule login com max 3 tentativas usando while:\n# - Percorra tentativas\n# - Se acertou: "Login OK na tentativa " + str(i + 1) e break\n# - Se errou: "Tentativa " + str(i + 1) + ": falhou"\n`,
  },
  expectedOutput: 'Tentativa 1: falhou\nTentativa 2: falhou\nLogin OK na tentativa 3',
  hints: ['O código já está pronto! Execute.'],
  difficulty: 'easy',
};

const code4: CodeChallenge = {
  id: 'while.4', type: 'code', episode: 21, room: '21.4',
  title: 'Continue — pulando iterações',
  description: 'O **continue** pula itens que não interessam. Aqui pulamos IPs internos. **Execute**!',
  instructions: 'Percorra a lista de IPs e use continue para pular IPs internos (contendo "192.168"). Imprima apenas os externos.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const ips = ["192.168.1.1", "10.0.0.5", "45.33.32.1", "192.168.1.2", "8.8.8.8"];\n\n// Percorra os IPs e filtre usando continue:\n// - Se o IP contém "192.168", pule com continue\n// - Senao, imprima: "IP externo: " + ip\n`,
    python: `ips = ["192.168.1.1", "10.0.0.5", "45.33.32.1", "192.168.1.2", "8.8.8.8"]\n\n# Percorra os IPs e filtre usando continue:\n# - Se o IP contem "192.168", pule com continue\n# - Senao, imprima: "IP externo: " + ip\n`,
  },
  expectedOutput: 'IP externo: 10.0.0.5\nIP externo: 45.33.32.1\nIP externo: 8.8.8.8',
  hints: ['continue pula IPs que contêm "192.168" e mostra só os externos.'],
  difficulty: 'easy',
};

const theory5: TheoryChallenge = {
  id: 'while.5', type: 'theory', episode: 21, room: '21.5',
  title: 'Parabéns! While e controle de fluxo dominados!',
  description: 'Agora você sabe controlar loops com precisão — exatamente como ferramentas de segurança fazem.',
  content: `
**O que você aprendeu:**
• while: repetir enquanto condição for true
• break: parar o loop quando encontrar o que quer
• continue: pular itens irrelevantes
• Simulação de tentativas de login

**Na cibersegurança:**
• Força bruta usa while: "enquanto não acertou, tenta próxima senha"
• Scanners usam break: "parou ao encontrar a vulnerabilidade"
• Filtros usam continue: "pula tráfego interno, analisa só externo"
  `,
};

export const whileLoopsChallenges: Challenge[] = [theory0, code1, code2, code3, code4, theory5];
