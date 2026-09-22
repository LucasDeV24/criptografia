import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory1_0: TheoryChallenge = {
  id: '1.0',
  type: 'theory',
  episode: 1,
  room: '1.0',
  title: 'Episódio 1 — Cifras e segredos',
  description: 'Bem-vindo ao Episódio 1! Agora vamos aprender sobre mensagens secretas e como a criptografia protege informações.',
  content: `
**O que é criptografia?**
Criptografia é a arte de esconder mensagens. Hackers do bem usam isso para:
• Proteger senhas (você não quer que alguém veja sua senha, certo?)
• Proteger mensagens no WhatsApp
• Proteger dados de cartão de crédito

**Cifra de César:**
É uma das cifras mais antigas. Cada letra é trocada por outra.
Exemplo: A vira D, B vira E, C vira F...
Se alguém escrever "KHOOR" na verdade é "HELLO" (deslocamento 3).

**Por que isso importa?**
Entender como cifras funcionam te ajuda a proteger e descobrir informações. É o básico de cibersegurança!
  `,
};

const code1_1: CodeChallenge = {
  id: '1.1',
  type: 'code',
  episode: 1,
  room: '1.1',
  title: 'Desvendando uma mensagem secreta',
  description: 'Alguém te enviou uma mensagem codificada: **Khoor**. Você sabe que é Cifra de César com deslocamento 3. O loop que percorre a mensagem já está pronto — falta só devolver o resultado.',
  instructions: 'Complete a função decodificarCesar(mensagem): ela deve desfazer a Cifra de César com deslocamento fixo de 3 e devolver (return) o texto decodificado.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function decodificarCesar(mensagem) {
  let resultado = "";
  for (let i = 0; i < mensagem.length; i++) {
    const letra = mensagem[i];
    const codigo = letra.charCodeAt(0);

    if (codigo >= 65 && codigo <= 90) {
      resultado += String.fromCharCode(((codigo - 65 - 3 + 26) % 26) + 65);
    } else if (codigo >= 97 && codigo <= 122) {
      resultado += String.fromCharCode(((codigo - 97 - 3 + 26) % 26) + 97);
    } else {
      resultado += letra;
    }
  }
  // troque esta linha pelo seu return
}
`,
    python: `def decodificar_cesar(mensagem):
    resultado = ""
    for letra in mensagem:
        codigo = ord(letra)

        if 65 <= codigo <= 90:
            resultado += chr(((codigo - 65 - 3 + 26) % 26) + 65)
        elif 97 <= codigo <= 122:
            resultado += chr(((codigo - 97 - 3 + 26) % 26) + 97)
        else:
            resultado += letra

    # troque esta linha (e o pass) pelo seu return
    pass
`,
  },
  tests: {
    fn: { javascript: 'decodificarCesar', python: 'decodificar_cesar' },
    cases: [
      { name: '"Khoor"', args: ['Khoor'], expected: 'Hello' },
      { name: '"Jrrg"', args: ['Jrrg'], expected: 'Good' },
      { name: 'texto vazio', args: [''], expected: '', hidden: true },
      { name: 'com pontuação', args: ['Kdssb!'], expected: 'Happy!', hidden: true },
    ],
  },
  solution: {
    javascript: `function decodificarCesar(mensagem) {
  let resultado = "";
  for (let i = 0; i < mensagem.length; i++) {
    const letra = mensagem[i];
    const codigo = letra.charCodeAt(0);

    if (codigo >= 65 && codigo <= 90) {
      resultado += String.fromCharCode(((codigo - 65 - 3 + 26) % 26) + 65);
    } else if (codigo >= 97 && codigo <= 122) {
      resultado += String.fromCharCode(((codigo - 97 - 3 + 26) % 26) + 97);
    } else {
      resultado += letra;
    }
  }
  return resultado;
}`,
    python: `def decodificar_cesar(mensagem):
    resultado = ""
    for letra in mensagem:
        codigo = ord(letra)

        if 65 <= codigo <= 90:
            resultado += chr(((codigo - 65 - 3 + 26) % 26) + 65)
        elif 97 <= codigo <= 122:
            resultado += chr(((codigo - 97 - 3 + 26) % 26) + 97)
        else:
            resultado += letra

    return resultado`,
  },
  explanation: `
**O que essa função faz?**
1. Pega cada letra da mensagem secreta
2. Descobre o "código" da letra (A=65, B=66, etc)
3. Volta 3 posições (K volta para H)
4. Devolve a mensagem real com **return** — sem isso, quem chama a função não recebe nada de volta

**Por que isso importa em cibersegurança?**
Hackers do bem precisam entender como mensagens são codificadas para protegê-las melhor. César é simples, mas o conceito é o mesmo usado no WhatsApp (só que MUITO mais complexo)!
  `,
  hints: [
    'O loop que decodifica já está pronto — falta só o return no final',
    'JavaScript: return resultado;    Python: return resultado (apague o pass)',
    '"Khoor" decodificado vira "Hello"',
  ],
  difficulty: 'easy',
};

const code1_2: CodeChallenge = {
  id: '1.2',
  type: 'code',
  episode: 1,
  room: '1.2',
  title: 'Sua vez — qualquer deslocamento',
  description: 'Na sala anterior o deslocamento era sempre 3. Agora escreva a versão geral: uma função que decodifica com **qualquer** deslocamento, recebido como parâmetro.',
  instructions: 'Escreva decodificarCesarGenerico(mensagem, deslocamento): desfaça a Cifra de César usando o deslocamento recebido (não fixe em 3) e devolva o resultado com return.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function decodificarCesarGenerico(mensagem, deslocamento) {
  // Para cada caractere da mensagem:
  //   - Descubra o código ASCII com charCodeAt(0)
  //   - Se for letra maiúscula (65-90): volte "deslocamento" posições
  //   - Se for letra minúscula (97-122): volte "deslocamento" posições
  //   - Fórmula: (((codigo - base - deslocamento) % 26) + 26) % 26 + base
  //     (base = 65 para maiúsculas, 97 para minúsculas)
  //   - Senão, mantenha o caractere original
  // Junte tudo em uma variável resultado e devolva com return
}
`,
    python: `def decodificar_cesar_generico(mensagem, deslocamento):
    # Para cada caractere da mensagem:
    #   - Descubra o código ASCII com ord()
    #   - Se for letra maiúscula (65-90): volte "deslocamento" posições
    #   - Se for letra minúscula (97-122): volte "deslocamento" posições
    #   - Fórmula: (((codigo - base - deslocamento) % 26) + 26) % 26 + base
    #     (base = 65 para maiúsculas, 97 para minúsculas)
    #   - Senão, mantenha o caractere original
    # Junte tudo em uma variável resultado e devolva com return
    pass
`,
  },
  tests: {
    fn: { javascript: 'decodificarCesarGenerico', python: 'decodificar_cesar_generico' },
    cases: [
      { name: 'deslocamento 3', args: ['Khoor', 3], expected: 'Hello' },
      { name: 'deslocamento 1', args: ['Ifmmp', 1], expected: 'Hello' },
      { name: 'deslocamento 0', args: ['Abc', 0], expected: 'Abc', hidden: true },
      { name: 'texto vazio', args: ['', 5], expected: '', hidden: true },
    ],
  },
  solution: {
    javascript: `function decodificarCesarGenerico(mensagem, deslocamento) {
  let resultado = "";
  for (let i = 0; i < mensagem.length; i++) {
    const letra = mensagem[i];
    const codigo = letra.charCodeAt(0);

    if (codigo >= 65 && codigo <= 90) {
      resultado += String.fromCharCode((((codigo - 65 - deslocamento) % 26) + 26) % 26 + 65);
    } else if (codigo >= 97 && codigo <= 122) {
      resultado += String.fromCharCode((((codigo - 97 - deslocamento) % 26) + 26) % 26 + 97);
    } else {
      resultado += letra;
    }
  }
  return resultado;
}`,
    python: `def decodificar_cesar_generico(mensagem, deslocamento):
    resultado = ""
    for letra in mensagem:
        codigo = ord(letra)

        if 65 <= codigo <= 90:
            resultado += chr((((codigo - 65 - deslocamento) % 26) + 26) % 26 + 65)
        elif 97 <= codigo <= 122:
            resultado += chr((((codigo - 97 - deslocamento) % 26) + 26) % 26 + 97)
        else:
            resultado += letra

    return resultado`,
  },
  explanation: `
**A generalização**
Em vez de sempre voltar 3 posições, a função agora recebe o deslocamento como parâmetro — a mesma lógica serve para decodificar QUALQUER Cifra de César, não só a do exemplo. É assim que se transforma um caso específico numa ferramenta reutilizável.

**Detalhe da fórmula:** o \`+ 26) % 26\` extra existe porque, em JavaScript, o resto de uma divisão por número negativo pode dar negativo — esse ajuste garante que o resultado sempre fique entre 0 e 25.
  `,
  hints: [
    'Copie a estrutura do loop da sala anterior, mas troque o 3 fixo pelo parâmetro deslocamento',
    'A fórmula muda para: (((codigo - base - deslocamento) % 26) + 26) % 26 + base',
    'Com deslocamento 0, a mensagem não muda nada — bom caso para testar seu raciocínio',
  ],
  difficulty: 'medium',
};

const theory1_3: TheoryChallenge = {
  id: '1.3',
  type: 'theory',
  episode: 1,
  room: '1.3',
  title: 'Parabéns! Você é um decodificador',
  description: 'Você acabou de fazer o que hackers do bem fazem: analisar e decodificar mensagens. Viu? Não é sobre "hackear contas", é sobre PROTEGER informações.',
  content: `
**O que você aprendeu:**
• Mensagens podem ser codificadas (criptografadas)
• Com o código certo, você pode decodificar
• Isso é usado para proteger senhas, mensagens e dados

**Próximos episódios:**
• Base64 (usado em sites)
• Hash (proteção de senhas)
• RSA (criptografia forte do WhatsApp)

**Carreira:**
Analistas de segurança fazem exatamente isso: analisam código, descobrem como sistemas funcionam e os protegem. Você está no caminho certo!

Parabéns por completar o Episódio 1! 🎉
  `,
};

export const episode1Challenges: Challenge[] = [
  theory1_0,
  code1_1,
  code1_2,
  theory1_3,
];
