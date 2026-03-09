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
  instructions: 'Crie uma função de criptografia simétrica que aplica XOR entre cada caractere do texto e da chave (ciclando a chave). Criptografe e decriptografe.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Crie criptografar(texto, chave):\n// - Para cada caractere do texto:\n//   XOR entre texto.charCodeAt(i) e chave.charCodeAt(i % chave.length)\n//   Converta resultado com String.fromCharCode()\n// - Retorne a string resultado\n//\n// Use com mensagem "Dados secretos" e chave "MinhaChaveAES"\n// Criptografe e decriptografe (mesma funcao, mesma chave)\n// Imprima: "Original: " + mensagem\n// Imprima: "Decifrado: " + resultado\n`,
    python: `# Crie criptografar(texto, chave):\n# - Para cada caractere do texto:\n#   XOR entre ord(texto[i]) e ord(chave[i % len(chave)])\n#   Converta resultado com chr()\n# - Retorne a string resultado\n#\n# Use com mensagem "Dados secretos" e chave "MinhaChaveAES"\n# Criptografe e decriptografe (mesma funcao, mesma chave)\n# Imprima: "Original: " + mensagem\n# Imprima: "Decifrado: " + resultado\n`,
  },
  expectedOutput: 'Original: Dados secretos\nDecifrado: Dados secretos',
  hints: ['Mesma função e mesma chave para criptografar e decriptografar!'],
  difficulty: 'medium',
};

const code2: CodeChallenge = {
  id: 'sym.2', type: 'code', episode: 30, room: '30.2',
  title: 'Chave errada = lixo',
  description: 'Tente decriptografar com a chave **ERRADA** e veja que o resultado é inútil. Mude a chave de decriptação para **"ChaveErrada!!"**.',
  instructions: 'Implemente a mesma função de criptografia simétrica. Criptografe "Segredo" com "ChaveCorreta!" e decriptografe com a mesma chave.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Crie criptografar(texto, chave) usando XOR caractere a caractere\n// (mesma logica do desafio anterior)\n//\n// 1. Criptografe "Segredo" com chave "ChaveCorreta!"\n// 2. Decriptografe com a mesma chave\n// 3. Imprima: "Resultado: " + decifrado\n`,
    python: `# Crie criptografar(texto, chave) usando XOR caractere a caractere\n# (mesma logica do desafio anterior)\n#\n# 1. Criptografe "Segredo" com chave "ChaveCorreta!"\n# 2. Decriptografe com a mesma chave\n# 3. Imprima: "Resultado: " + decifrado\n`,
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
