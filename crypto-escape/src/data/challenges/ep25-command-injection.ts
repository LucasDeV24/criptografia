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
  instructions: 'Execute e veja o comando sendo construído.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function executarPing(inputUsuario) {\n  const comando = "ping " + inputUsuario;\n  console.log("Comando: " + comando);\n  return comando;\n}\n\nexecutarPing("8.8.8.8");\n`,
    python: `def executar_ping(input_usuario):\n    comando = "ping " + input_usuario\n    print("Comando: " + comando)\n    return comando\n\nexecutar_ping("8.8.8.8")\n`,
  },
  expectedOutput: 'Comando: ping 8.8.8.8',
  hints: ['Input normal → comando seguro.'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'cmdi.2', type: 'code', episode: 25, room: '25.2',
  title: 'Injetando comando!',
  description: 'Mude o input para **"8.8.8.8; cat /etc/passwd"** e veja o comando perigoso ser montado.',
  instructions: 'Mude o input para incluir "; cat /etc/passwd".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function executarPing(inputUsuario) {\n  const comando = "ping " + inputUsuario;\n  console.log("Comando: " + comando);\n  return comando;\n}\n\n// Mude o input para: "8.8.8.8; cat /etc/passwd"\nexecutarPing("8.8.8.8");\n`,
    python: `def executar_ping(input_usuario):\n    comando = "ping " + input_usuario\n    print("Comando: " + comando)\n    return comando\n\n# Mude o input para: "8.8.8.8; cat /etc/passwd"\nexecutar_ping("8.8.8.8")\n`,
  },
  expectedOutput: 'Comando: ping 8.8.8.8; cat /etc/passwd',
  hints: ['Mude "8.8.8.8" para "8.8.8.8; cat /etc/passwd"'],
  difficulty: 'easy',
};

const code3: CodeChallenge = {
  id: 'cmdi.3', type: 'code', episode: 25, room: '25.3',
  title: 'Detectando Command Injection',
  description: 'Crie um detector que bloqueia inputs com caracteres perigosos. **Execute**!',
  instructions: 'Execute e veja a detecção.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: 'function detectarInjection(input) {\n  const perigosos = [";", "&&", "|", "$"];\n  for (let i = 0; i < perigosos.length; i++) {\n    if (input.includes(perigosos[i])) {\n      return "BLOQUEADO: caractere \'" + perigosos[i] + "\' detectado";\n    }\n  }\n  return "SEGURO";\n}\n\nconsole.log(detectarInjection("8.8.8.8"));\nconsole.log(detectarInjection("8.8.8.8; rm -rf /"));\nconsole.log(detectarInjection("google.com && whoami"));',
    python: 'def detectar_injection(inp):\n    perigosos = [";", "&&", "|", "$"]\n    for p in perigosos:\n        if p in inp:\n            return "BLOQUEADO: caractere \'" + p + "\' detectado"\n    return "SEGURO"\n\nprint(detectar_injection("8.8.8.8"))\nprint(detectar_injection("8.8.8.8; rm -rf /"))\nprint(detectar_injection("google.com && whoami"))',
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
