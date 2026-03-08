import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0: TheoryChallenge = {
  id: 'xor.0', type: 'theory', episode: 29, room: '29.0',
  title: 'Episódio 29 — XOR e Operações Binárias',
  description: 'XOR é a base de TODA criptografia moderna. Simples, mas incrivelmente poderoso.',
  content: `
**O que é XOR?**
XOR (exclusive or) compara bits e retorna 1 se forem DIFERENTES:
• 0 XOR 0 = 0
• 0 XOR 1 = 1
• 1 XOR 0 = 1
• 1 XOR 1 = 0

**A mágica do XOR:**
Se você fizer XOR duas vezes com a mesma chave, volta ao original!
• Dado: 42
• Chave: 7
• 42 XOR 7 = 45 (criptografado)
• 45 XOR 7 = 42 (decriptografado!)

**Por que XOR importa?**
• AES usa XOR internamente
• Stream ciphers são baseados em XOR
• Wi-Fi (WPA2) usa XOR
• VPNs usam XOR

**Em JS:** \`a ^ b\`  |  **Em Python:** \`a ^ b\`
  `,
};

const code1: CodeChallenge = {
  id: 'xor.1', type: 'code', episode: 29, room: '29.1',
  title: 'XOR básico',
  description: 'Veja o XOR em ação com números. **Execute**!',
  instructions: 'Execute e veja o XOR.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const a = 42;\nconst chave = 7;\n\nconst criptografado = a ^ chave;\nconsole.log("Original: " + a);\nconsole.log("Criptografado: " + criptografado);\n\nconst decriptografado = criptografado ^ chave;\nconsole.log("Decriptografado: " + decriptografado);\n`,
    python: `a = 42\nchave = 7\n\ncriptografado = a ^ chave\nprint("Original: " + str(a))\nprint("Criptografado: " + str(criptografado))\n\ndecriptografado = criptografado ^ chave\nprint("Decriptografado: " + str(decriptografado))\n`,
  },
  expectedOutput: 'Original: 42\nCriptografado: 45\nDecriptografado: 42',
  hints: ['XOR com a mesma chave duas vezes restaura o original!'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'xor.2', type: 'code', episode: 29, room: '29.2',
  title: 'Criptografando texto com XOR',
  description: 'Use XOR para criptografar cada letra de uma mensagem! **Execute**!',
  instructions: 'Execute e veja a mensagem sendo criptografada e decriptografada.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function xorCripto(texto, chave) {\n  let resultado = "";\n  for (let i = 0; i < texto.length; i++) {\n    const charCripto = texto.charCodeAt(i) ^ chave;\n    resultado += String.fromCharCode(charCripto);\n  }\n  return resultado;\n}\n\nconst mensagem = "HACK";\nconst chave = 42;\n\nconst cripto = xorCripto(mensagem, chave);\nconst decripto = xorCripto(cripto, chave);\n\nconsole.log("Original: " + mensagem);\nconsole.log("Decriptografado: " + decripto);\n`,
    python: `def xor_cripto(texto, chave):\n    resultado = ""\n    for letra in texto:\n        char_cripto = ord(letra) ^ chave\n        resultado += chr(char_cripto)\n    return resultado\n\nmensagem = "HACK"\nchave = 42\n\ncripto = xor_cripto(mensagem, chave)\ndecripto = xor_cripto(cripto, chave)\n\nprint("Original: " + mensagem)\nprint("Decriptografado: " + decripto)\n`,
  },
  expectedOutput: 'Original: HACK\nDecriptografado: HACK',
  hints: ['XOR cada letra com a chave → criptografa. XOR de novo → decriptografa.'],
  difficulty: 'medium',
};

const theory3: TheoryChallenge = {
  id: 'xor.3', type: 'theory', episode: 29, room: '29.3',
  title: 'XOR na criptografia profissional',
  description: 'Entenda como XOR é usado nos algoritmos reais.',
  content: `
**XOR simples é frágil — por quê?**
Se a chave se repete, padrões aparecem. Quebrável com análise de frequência.

**Como AES resolve isso:**
1. Expande a chave em várias "subchaves"
2. Faz XOR + substituições + permutações
3. Repete 10-14 rodadas
4. Resultado: impossível de quebrar sem a chave

**One-Time Pad:**
Se a chave for do mesmo tamanho da mensagem e totalmente aleatória:
→ Matematicamente IMPOSSÍVEL de quebrar!
→ Usado em comunicações ultra-secretas

XOR parece simples, mas é o alicerce de toda a criptografia que protege o mundo.
  `,
};

const theory4: TheoryChallenge = {
  id: 'xor.4', type: 'theory', episode: 29, room: '29.4',
  title: 'XOR e Binário — Resumo',
  description: 'Você agora entende a operação mais fundamental da criptografia moderna.',
  content: `
**O que você aprendeu:**
• XOR: retorna 1 se bits são diferentes
• XOR duas vezes com a mesma chave = restaura original
• Criptografia de texto com XOR
• Por que XOR simples é frágil e como AES resolve

**Fato:** Toda vez que você usa WhatsApp, faz uma compra online ou acessa um site com HTTPS, XOR está trabalhando nos bastidores!
  `,
};

export const xorBinaryChallenges: Challenge[] = [theory0, code1, code2, theory3, theory4];
