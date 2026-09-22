import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory10_0: TheoryChallenge = {
  id: '10.0',
  type: 'theory',
  episode: 10,
  room: '10.0',
  title: 'Episódio 10 — Esteganografia e Dados Ocultos',
  description: 'A arte de esconder informações em lugares inesperados. Hackers, espiões e pentesters usam isso o tempo todo.',
  content: `
**O que é Esteganografia?**
Esconder dados dentro de outros dados.
Diferente de criptografia (que embaralha), esteganografia ESCONDE.

**Exemplos clássicos:**
• Mensagem escondida em imagem (LSB - Least Significant Bit)
• Arquivo ZIP dentro de uma foto
• Texto oculto em espaços em branco
• Dados em metadata de arquivos

**Onde é usado:**

**Hackers do mal:**
• Exfiltração de dados (roubar sem ser detectado)
• C&C communications (malware se comunica)
• Esconder backdoors em imagens

**Hackers do bem:**
• CTF competitions (desafios de hacking)
• Watermarking (proteção de propriedade)
• Digital forensics (encontrar evidências)

**Casos reais:**
• 2001 - Al-Qaeda usou esteganografia
• Ransomware esconde chave em imagem

Vamos aprender técnicas práticas!

**Ferramenta nova neste episódio**
• **Tirar espaços das pontas:** \`texto.trim()\` (JavaScript) e \`texto.strip()\` (Python) removem espaços e quebras de linha do **começo e do fim** do texto, sem mexer nos do meio. Por exemplo, "  oi  " vira "oi".
  `,
};

const code10_1: CodeChallenge = {
  id: '10.1',
  type: 'code',
  episode: 10,
  room: '10.1',
  title: 'Mensagem oculta em texto',
  description: 'Um texto de várias linhas pode esconder uma palavra nas primeiras letras de cada linha — um acróstico. Escreva a função que extrai essa mensagem oculta.',
  instructions: 'Complete extrairAcrostico(mensagem): pegue a primeira letra de cada linha não-vazia (depois de tirar espaços das pontas) e junte tudo. Devolva a palavra oculta com return.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function extrairAcrostico(mensagem) {
  const linhas = mensagem.trim().split('\\n');
  let oculta = "";
  // Percorra "linhas": para cada uma, tire os espaços com .trim()
  // Se a linha (depois do trim) não estiver vazia, adicione a primeira letra a "oculta"
  // Devolva "oculta" com return
}
`,
    python: `def extrair_acrostico(mensagem):
    linhas = mensagem.strip().split('\\n')
    oculta = ""
    # Percorra "linhas": para cada uma, tire os espaços com .strip()
    # Se a linha (depois do strip) não estiver vazia, adicione a primeira letra a "oculta"
    # Devolva "oculta" com return
    pass
`,
  },
  tests: {
    fn: { javascript: 'extrairAcrostico', python: 'extrair_acrostico' },
    cases: [
      { name: 'acróstico SECRET', args: ['Seja\nEsperto\nCurioso\nResiliente\nEmpenhado\nTécnico'], expected: 'SECRET' },
      { name: 'acróstico HELLO', args: ['Hoje\nEu\nLembro\nLivre\nOnde'], expected: 'HELLO' },
      { name: 'texto vazio', args: [''], expected: '', hidden: true },
      { name: 'com linhas em branco no meio', args: ['Seja\n\nEsperto\n\nCurioso'], expected: 'SEC', hidden: true },
    ],
  },
  solution: {
    javascript: `function extrairAcrostico(mensagem) {
  const linhas = mensagem.trim().split('\\n');
  let oculta = "";
  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i].trim();
    if (linha.length > 0) {
      oculta += linha[0];
    }
  }
  return oculta;
}`,
    python: `def extrair_acrostico(mensagem):
    linhas = mensagem.strip().split('\\n')
    oculta = ""
    for linha in linhas:
        linha = linha.strip()
        if len(linha) > 0:
            oculta += linha[0]
    return oculta`,
  },
  explanation: `
**Técnica: Acróstico**

Cada linha esconde uma letra — junte as primeiras letras (ignorando linhas em branco) e a palavra aparece.

**No mundo real:**
Hackers usam variações dessa ideia para comunicação encoberta. Parece texto normal, mas carrega informação oculta.

**Variações reais:**
• Última letra de cada palavra, em vez da primeira
• Caracteres invisíveis (zero-width characters)
• Padrões de espaços em branco (parecido com código Morse)
  `,
  hints: [
    'linha.trim() (Python: linha.strip()) tira espaços das pontas antes de checar se está vazia',
    'linha[0] pega o primeiro caractere de uma string, em qualquer um dos dois idiomas',
    'Linhas em branco (depois do trim) não contribuem nenhuma letra — só pule elas',
  ],
  difficulty: 'medium',
};

const code10_2: CodeChallenge = {
  id: '10.2',
  type: 'code',
  episode: 10,
  room: '10.2',
  title: 'Dados em hexadecimal',
  description: 'Você encontrou código suspeito em um arquivo, algo como "48656c6c6f". Parece hexadecimal. Escreva a função que decodifica.',
  instructions: 'Complete hexParaTexto(hexData): percorra de 2 em 2 caracteres, converta cada par para número (base 16) e depois para caractere. Junte tudo e devolva com return.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function hexParaTexto(hexData) {
  let resultado = "";
  // Percorra hexData de 2 em 2 caracteres (i += 2)
  // Para cada par: hexData.substr(i, 2)
  // Converta para decimal: parseInt(par, 16)
  // Converta para caractere: String.fromCharCode(...)
  // Junte tudo em "resultado" e devolva com return
}
`,
    python: `def hex_para_texto(hex_data):
    resultado = ""
    # Percorra hex_data de 2 em 2 caracteres
    # Para cada par: hex_data[i:i+2]
    # Converta para decimal: int(par, 16)
    # Converta para caractere: chr(...)
    # Junte tudo em "resultado" e devolva com return
    pass
`,
  },
  tests: {
    fn: { javascript: 'hexParaTexto', python: 'hex_para_texto' },
    cases: [
      { name: '"Hello"', args: ['48656c6c6f'], expected: 'Hello' },
      { name: 'com espaço no meio', args: ['48656c6c6f20776f726c64'], expected: 'Hello world', hidden: true },
      { name: 'texto vazio', args: [''], expected: '', hidden: true },
    ],
  },
  solution: {
    javascript: `function hexParaTexto(hexData) {
  let resultado = "";
  for (let i = 0; i < hexData.length; i += 2) {
    const par = hexData.substr(i, 2);
    resultado += String.fromCharCode(parseInt(par, 16));
  }
  return resultado;
}`,
    python: `def hex_para_texto(hex_data):
    resultado = ""
    for i in range(0, len(hex_data), 2):
        par = hex_data[i:i + 2]
        resultado += chr(int(par, 16))
    return resultado`,
  },
  explanation: `
**Hex to ASCII conversion**

48656c6c6f → Hello

**Como funciona:**
• 48 (hex) = 72 (decimal) = 'H' (ASCII)
• 65 (hex) = 101 = 'e'
• 6c (hex) = 108 = 'l'
• ...

**Uso comum:**
• Malware esconde strings em hex para evitar detecção por antivírus
• Ofuscar código

**Ferramentas:**
• CyberChef (converte tudo)
• xxd (Linux hex dump)
  `,
  hints: [
    'range(0, len(hex_data), 2) (JS: for com i += 2) percorre de 2 em 2',
    'parseInt(par, 16) (Python: int(par, 16)) converte o par hex para um número decimal',
    'String.fromCharCode(...) (Python: chr(...)) converte o número no caractere correspondente',
  ],
  difficulty: 'medium',
};

const theory10_3: TheoryChallenge = {
  id: '10.3',
  type: 'theory',
  episode: 10,
  room: '10.3',
  title: 'LSB Steganography em imagens',
  description: 'Como esconder arquivos inteiros dentro de imagens sem alterar a aparência visível.',
  content: `
**Técnica LSB (Least Significant Bit):**

**Como funciona:**

Imagem é feita de pixels. Cada pixel tem RGB (Red, Green, Blue).
Cada cor vai de 0-255 (8 bits).

**Exemplo de 1 pixel:**
R: 11010110
G: 10110101
B: 01101011

**LSB** é o último bit (menos significativo).
Mudar LSB quase não altera a cor visualmente:
11010110 → 11010111 (mudança imperceptível)

**Escondendo dados:**
1. Pegue mensagem: "Hi" = 01001000 01101001
2. Substitua LSB de cada canal RGB:
   R: 1101011**0** (LSB = 0)
   G: 1011010**1** (LSB = 1)
   B: 0110101**0** (LSB = 0)
   ...

**Resultado:**
Imagem parece idêntica ao olho humano, mas carrega dados!

**Ferramentas profissionais:**
• steghide
• stegsolve
• zsteg

**Próxima sala:** Simulação simplificada de LSB!
  `,
};

const code10_4: CodeChallenge = {
  id: '10.4',
  type: 'code',
  episode: 10,
  room: '10.4',
  title: 'Extraindo dados de "imagem" (simulado)',
  description: 'Você tem uma sequência de números que representam pixels reconstruídos de uma imagem (já extraídos dos bits menos significativos). Eles formam uma mensagem!',
  instructions: 'Complete extrairMensagemDePixels(pixels): converta cada número em caractere e junte tudo numa string. Devolva com return.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function extrairMensagemDePixels(pixels) {
  // Cada número em "pixels" é, na verdade, um código ASCII
  // Converta cada um para caractere com String.fromCharCode() e junte tudo
  // Dica: .map() + .join("") resolve em uma linha
}
`,
    python: `def extrair_mensagem_de_pixels(pixels):
    # Cada número em "pixels" é, na verdade, um código ASCII
    # Converta cada um para caractere com chr() e junte tudo
    # Dica: uma list comprehension + "".join(...) resolve em uma linha
    pass
`,
  },
  tests: {
    fn: { javascript: 'extrairMensagemDePixels', python: 'extrair_mensagem_de_pixels' },
    cases: [
      { name: '"Hello"', args: [[72, 101, 108, 108, 111]], expected: 'Hello' },
      { name: '"World"', args: [[87, 111, 114, 108, 100]], expected: 'World' },
      { name: 'lista vazia', args: [[]], expected: '', hidden: true },
    ],
  },
  solution: {
    javascript: `function extrairMensagemDePixels(pixels) {
  return pixels.map(p => String.fromCharCode(p)).join("");
}`,
    python: `def extrair_mensagem_de_pixels(pixels):
    return "".join(chr(p) for p in pixels)`,
  },
  explanation: `
**Neste exemplo simplificado, os "pixels" já são valores ASCII prontos.**

No mundo real:
• Uma imagem tem milhões de pixels
• Você extrai os LSBs (bits menos significativos) de cada um
• 8 desses bits, juntos, reconstroem 1 byte — e é esse byte que vira um número como os que você recebeu aqui

**Capacidade:**
Uma imagem 1920x1080 tem cerca de 2 milhões de pixels — o suficiente para esconder até ~250KB de dados sem alteração visível.

**Detecção:**
• Análise estatística
• Comparação de histogramas
• Chi-square test
  `,
  hints: [
    'pixels.map(p => String.fromCharCode(p)) transforma cada número em caractere',
    '.join("") junta tudo numa string só, sem separador',
    'Python: "".join(chr(p) for p in pixels) faz tudo numa linha',
  ],
  difficulty: 'easy',
};

const theory10_5: TheoryChallenge = {
  id: '10.5',
  type: 'theory',
  episode: 10,
  room: '10.5',
  title: 'Episódio 10 completo!',
  description: 'Você domina técnicas de esteganografia!',
  content: `
**Habilidades desbloqueadas:**
✅ Esteganografia (conceito e aplicações)
✅ Acrósticos e mensagens ocultas
✅ Hex to ASCII conversion
✅ LSB Steganography em imagens

**Aplicações profissionais:**
• **Digital Forensics:** Encontrar evidências ocultas
• **CTF Competitor:** Desafios de stego são comuns
• **Incident Response:** Detectar data exfiltration

**CTF (Capture The Flag):**
Competições de hacking onde esteganografia é categoria popular.
Prêmios: $10k - $100k+
Empresas recrutam vencedores!

**Ferramentas para dominar:**
• steghide (esconde/extrai dados)
• exiftool (metadata)
• binwalk (encontra arquivos embutidos)
• stegsolve (análise visual)

**Desafios online:**
• HackTheBox (CTF platform)
• OverTheWire (desafios stego)

**Próximo episódio:**
Network Analysis - interceptar e analisar tráfego de rede!

Você está em nível avançado! 🎯
  `,
};

export const episode10Challenges: Challenge[] = [
  theory10_0,
  code10_1,
  code10_2,
  theory10_3,
  code10_4,
  theory10_5,
];
