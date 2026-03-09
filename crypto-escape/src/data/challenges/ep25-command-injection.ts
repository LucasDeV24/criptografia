import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0: TheoryChallenge = {
  id: 'cmdi.0', type: 'theory', episode: 25, room: '25.0',
  title: 'Episódio 25 — Command Injection',
  description: 'Command Injection permite executar comandos do sistema operacional através de inputs não sanitizados.',
  content: `
**Como funciona?**
Um site permite fazer ping em um IP:
\`\`\`
Input do usuário: 8.8.8.8
Comando executado: ping 8.8.8.8
\`\`\`

**O ataque:**
\`\`\`
Input do usuário: 8.8.8.8; cat /etc/passwd
Comando executado: ping 8.8.8.8; cat /etc/passwd
\`\`\`

O ponto-e-vírgula (;) separa comandos no Linux!
O servidor executa o ping E depois mostra o arquivo de senhas.

**Operadores perigosos:**
• \`;\` → executa outro comando
• \`&&\` → executa se o primeiro der certo
• \`|\` → envia saída para outro comando
• \`\\$(comando)\` → substitui pelo resultado

**Gravidade: CRÍTICA** — o hacker controla o servidor inteiro!
  `,
};

const code1: CodeChallenge = {
  id: 'cmdi.1', type: 'code', episode: 25, room: '25.1',
  title: 'Simulando servidor vulnerável',
  description: 'Veja como um servidor processa o input do usuário sem proteção. **Execute**!',
  instructions: 'Crie uma função que recebe o input do usuário e monta o comando "ping " + input. Imprima o comando resultante.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Crie a funcao executarPing(inputUsuario):\n// - Monte o comando: "ping " + inputUsuario\n// - Imprima: "Comando: " + comando\n// - Retorne o comando\n\n\nexecutarPing("8.8.8.8");\n`,
    python: `# Crie a funcao executar_ping(input_usuario):\n# - Monte o comando: "ping " + input_usuario\n# - Imprima: "Comando: " + comando\n# - Retorne o comando\n\n\nexecutar_ping("8.8.8.8")\n`,
  },
  expectedOutput: 'Comando: ping 8.8.8.8',
  hints: ['Input normal → comando seguro.'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'cmdi.2', type: 'code', episode: 25, room: '25.2',
  title: 'Injetando comando!',
  description: 'Mude o input para **"8.8.8.8; cat /etc/passwd"** e veja o comando perigoso ser montado.',
  instructions: 'Crie a mesma função de ping, mas agora chame-a com input malicioso: "8.8.8.8; cat /etc/passwd".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Crie executarPing(inputUsuario) que monta e imprime "Comando: ping " + input\n// Depois chame com input malicioso: "8.8.8.8; cat /etc/passwd"\n`,
    python: `# Crie executar_ping(input_usuario) que monta e imprime "Comando: ping " + input\n# Depois chame com input malicioso: "8.8.8.8; cat /etc/passwd"\n`,
  },
  expectedOutput: 'Comando: ping 8.8.8.8; cat /etc/passwd',
  hints: ['Mude "8.8.8.8" para "8.8.8.8; cat /etc/passwd"'],
  difficulty: 'easy',
};

const code3: CodeChallenge = {
  id: 'cmdi.3', type: 'code', episode: 25, room: '25.3',
  title: 'Detectando Command Injection',
  description: 'Crie um detector que bloqueia inputs com caracteres perigosos. **Execute**!',
  instructions: 'Crie uma função que detecta command injection verificando caracteres perigosos (;, &&, |, $) no input.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: 'const perigosos = [";", "&&", "|", "$"];\n\n// Crie detectarInjection(input):\n// - Percorra a lista de caracteres perigosos\n// - Se input.includes(caractere), retorne:\n//   "BLOQUEADO: caractere \'X\' detectado"\n// - Se nenhum encontrado, retorne "SEGURO"\n\n\nconsole.log(detectarInjection("8.8.8.8"));\nconsole.log(detectarInjection("8.8.8.8; rm -rf /"));\nconsole.log(detectarInjection("google.com && whoami"));',
    python: 'perigosos = [";", "&&", "|", "$"]\n\n# Crie detectar_injection(inp):\n# - Percorra a lista de caracteres perigosos\n# - Se p in inp, retorne:\n#   "BLOQUEADO: caractere \'X\' detectado"\n# - Se nenhum encontrado, retorne "SEGURO"\n\n\nprint(detectar_injection("8.8.8.8"))\nprint(detectar_injection("8.8.8.8; rm -rf /"))\nprint(detectar_injection("google.com && whoami"))',
  },
  expectedOutput: 'SEGURO\nBLOQUEADO: caractere \';\' detectado\nBLOQUEADO: caractere \'&&\' detectado',
  hints: ['A função verifica se o input contém caracteres perigosos.'],
  difficulty: 'medium',
};

const theory4: TheoryChallenge = {
  id: 'cmdi.4', type: 'theory', episode: 25, room: '25.4',
  title: 'Command Injection — Resumo',
  description: 'Command Injection é gravidade CRÍTICA. Nunca confie em input do usuário!',
  content: `
**O que você aprendeu:**
• Como inputs viram comandos no servidor
• Caracteres perigosos: ; && | $ \\$()
• Como detectar e bloquear tentativas

**Defesas profissionais:**
• Whitelist: só permitir caracteres válidos (números e pontos para IP)
• Nunca concatenar input do usuário em comandos
• Usar APIs específicas em vez de shell commands
• Princípio do menor privilégio: servidor roda com permissões mínimas
  `,
};

export const commandInjectionChallenges: Challenge[] = [theory0, code1, code2, code3, theory4];
