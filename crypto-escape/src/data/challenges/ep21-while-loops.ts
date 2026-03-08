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
  instructions: 'Execute e veja o while contando.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `let i = 1;\n\nwhile (i <= 5) {\n  console.log(i);\n  i++;\n}\n`,
    python: `i = 1\n\nwhile i <= 5:\n    print(i)\n    i += 1\n`,
  },
  expectedOutput: '1\n2\n3\n4\n5',
  hints: ['O código já está pronto! Execute.'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'while.2', type: 'code', episode: 21, room: '21.2',
  title: 'Break — saindo do loop',
  description: 'O **break** para o loop imediatamente quando encontramos o que queremos. **Execute**!',
  instructions: 'Execute e veja o break funcionando.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const senhas = ["abc", "123", "admin", "root", "test"];\nconst alvo = "admin";\nlet i = 0;\n\nwhile (i < senhas.length) {\n  if (senhas[i] == alvo) {\n    console.log("Encontrada na tentativa " + (i + 1));\n    break;\n  }\n  i++;\n}\n`,
    python: `senhas = ["abc", "123", "admin", "root", "test"]\nalvo = "admin"\ni = 0\n\nwhile i < len(senhas):\n    if senhas[i] == alvo:\n        print("Encontrada na tentativa " + str(i + 1))\n        break\n    i += 1\n`,
  },
  expectedOutput: 'Encontrada na tentativa 3',
  hints: ['O loop para quando encontra "admin" na posição 2 (tentativa 3).'],
  difficulty: 'easy',
};

const code3: CodeChallenge = {
  id: 'while.3', type: 'code', episode: 21, room: '21.3',
  title: 'Simulando tentativas de login',
  description: 'Simule um sistema que permite no máximo **3 tentativas** de login. **Execute**!',
  instructions: 'Execute e veja o sistema de tentativas.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const senhaCorreta = "s3cur3";\nconst tentativas = ["admin", "1234", "s3cur3"];\nlet i = 0;\nlet maxTentativas = 3;\n\nwhile (i < maxTentativas) {\n  if (tentativas[i] == senhaCorreta) {\n    console.log("Login OK na tentativa " + (i + 1));\n    break;\n  } else {\n    console.log("Tentativa " + (i + 1) + ": falhou");\n  }\n  i++;\n}\n`,
    python: `senha_correta = "s3cur3"\ntentativas = ["admin", "1234", "s3cur3"]\ni = 0\nmax_tentativas = 3\n\nwhile i < max_tentativas:\n    if tentativas[i] == senha_correta:\n        print("Login OK na tentativa " + str(i + 1))\n        break\n    else:\n        print("Tentativa " + str(i + 1) + ": falhou")\n    i += 1\n`,
  },
  expectedOutput: 'Tentativa 1: falhou\nTentativa 2: falhou\nLogin OK na tentativa 3',
  hints: ['O código já está pronto! Execute.'],
  difficulty: 'easy',
};

const code4: CodeChallenge = {
  id: 'while.4', type: 'code', episode: 21, room: '21.4',
  title: 'Continue — pulando iterações',
  description: 'O **continue** pula itens que não interessam. Aqui pulamos IPs internos. **Execute**!',
  instructions: 'Execute e veja o continue filtrando.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const ips = ["192.168.1.1", "10.0.0.5", "45.33.32.1", "192.168.1.2", "8.8.8.8"];\n\nfor (let i = 0; i < ips.length; i++) {\n  if (ips[i].includes("192.168")) {\n    continue;\n  }\n  console.log("IP externo: " + ips[i]);\n}\n`,
    python: `ips = ["192.168.1.1", "10.0.0.5", "45.33.32.1", "192.168.1.2", "8.8.8.8"]\n\nfor ip in ips:\n    if "192.168" in ip:\n        continue\n    print("IP externo: " + ip)\n`,
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
