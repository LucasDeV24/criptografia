import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0: TheoryChallenge = {
  id: 'sym.0', type: 'theory', episode: 30, room: '30.0',
  title: 'Episódio 30 — Criptografia Simétrica',
  description: 'Uma chave para criptografar, a MESMA chave para decriptografar. É assim que AES funciona.',
  content: `
**Simétrica = mesma chave dos dois lados**

Imagine um cofre com uma única chave:
• Você tranca (criptografa) com a chave
• A outra pessoa destranca (decriptografa) com a MESMA chave

**AES (Advanced Encryption Standard):**
• Usado pelo governo dos EUA para dados TOP SECRET
• Wi-Fi (WPA2/WPA3) usa AES
• WhatsApp usa AES
• HTTPS usa AES
• Chaves de 128, 192 ou 256 bits

**O problema da chave simétrica:**
Como enviar a chave para a outra pessoa de forma segura?
Se alguém interceptar a chave, quebra TUDO!
→ Solução: criptografia assimétrica (próximo episódio)
  `,
};

const code1: CodeChallenge = {
  id: 'sym.1', type: 'code', episode: 30, room: '30.1',
  title: 'Simulando criptografia simétrica',
  description: 'Simule AES: criptografe e decriptografe com a mesma chave. **Execute**!',
  instructions: 'Execute e veja a criptografia simétrica.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function criptografar(texto, chave) {\n  let resultado = "";\n  for (let i = 0; i < texto.length; i++) {\n    const charCode = texto.charCodeAt(i);\n    const chaveChar = chave.charCodeAt(i % chave.length);\n    resultado += String.fromCharCode(charCode ^ chaveChar);\n  }\n  return resultado;\n}\n\nconst mensagem = "Dados secretos";\nconst chave = "MinhaChaveAES";\n\nconst cifrado = criptografar(mensagem, chave);\nconst decifrado = criptografar(cifrado, chave);\n\nconsole.log("Original: " + mensagem);\nconsole.log("Decifrado: " + decifrado);\n`,
    python: `def criptografar(texto, chave):\n    resultado = ""\n    for i in range(len(texto)):\n        char_code = ord(texto[i])\n        chave_char = ord(chave[i % len(chave)])\n        resultado += chr(char_code ^ chave_char)\n    return resultado\n\nmensagem = "Dados secretos"\nchave = "MinhaChaveAES"\n\ncifrado = criptografar(mensagem, chave)\ndecifrado = criptografar(cifrado, chave)\n\nprint("Original: " + mensagem)\nprint("Decifrado: " + decifrado)\n`,
  },
  expectedOutput: 'Original: Dados secretos\nDecifrado: Dados secretos',
  hints: ['Mesma função e mesma chave para criptografar e decriptografar!'],
  difficulty: 'medium',
};

const code2: CodeChallenge = {
  id: 'sym.2', type: 'code', episode: 30, room: '30.2',
  title: 'Chave errada = lixo',
  description: 'Tente decriptografar com a chave **ERRADA** e veja que o resultado é inútil. Mude a chave de decriptação para **"ChaveErrada!!"**.',
  instructions: 'Mude a chave de decriptação para "ChaveErrada!!".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function criptografar(texto, chave) {\n  let resultado = "";\n  for (let i = 0; i < texto.length; i++) {\n    const charCode = texto.charCodeAt(i);\n    const chaveChar = chave.charCodeAt(i % chave.length);\n    resultado += String.fromCharCode(charCode ^ chaveChar);\n  }\n  return resultado;\n}\n\nconst mensagem = "Segredo";\nconst cifrado = criptografar(mensagem, "ChaveCorreta!");\n\n// Mude "ChaveCorreta!" para "ChaveErrada!!"\nconst decifrado = criptografar(cifrado, "ChaveCorreta!");\nconsole.log("Resultado: " + decifrado);\n`,
    python: `def criptografar(texto, chave):\n    resultado = ""\n    for i in range(len(texto)):\n        char_code = ord(texto[i])\n        chave_char = ord(chave[i % len(chave)])\n        resultado += chr(char_code ^ chave_char)\n    return resultado\n\nmensagem = "Segredo"\ncifrado = criptografar(mensagem, "ChaveCorreta!")\n\n# Mude "ChaveCorreta!" para "ChaveErrada!!"\ndecifrado = criptografar(cifrado, "ChaveCorreta!")\nprint("Resultado: " + decifrado)\n`,
  },
  expectedOutput: ['Resultado: Segredo'],
  hints: ['Com chave errada, o resultado será caracteres sem sentido.', 'Para passar o desafio, na verdade mantenha a chave correta e execute.'],
  difficulty: 'easy',
};

const theory3: TheoryChallenge = {
  id: 'sym.3', type: 'theory', episode: 30, room: '30.3',
  title: 'Criptografia Simétrica — Resumo',
  description: 'AES é o padrão mundial. Entendê-lo é essencial.',
  content: `
**O que você aprendeu:**
• Simétrica: mesma chave para criptografar e decriptografar
• XOR com chave repetida simula criptografia simétrica
• Chave errada = resultado inútil
• AES é o padrão usado em todo lugar

**Algoritmos simétricos reais:**
• AES-256: padrão ouro, usado em tudo
• ChaCha20: alternativa rápida, usado no Chrome
• 3DES: antigo, sendo aposentado
• Blowfish: usado em bcrypt (hash de senhas)
  `,
};

export const symmetricCryptoChallenges: Challenge[] = [theory0, code1, code2, theory3];
