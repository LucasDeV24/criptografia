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
  `,
};

const code10_1: CodeChallenge = {
  id: '10.1',
  type: 'code',
  episode: 10,
  room: '10.1',
  title: 'Mensagem oculta em texto',
  description: 'Esta mensagem parece normal... mas há algo escondido nas primeiras letras de cada palavra!',
  instructions: 'Execute e descubra a mensagem oculta',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Mensagem aparentemente normal
const mensagem = \`
Sempre esteja
Curioso e
Resiliente para
Evoluir constantemente em
Todos os aspectos
\`;

// Extrair primeira letra de cada linha
const linhas = mensagem.trim().split('\\n');
let mensagemOculta = "";

for (let i = 0; i < linhas.length; i++) {
  const linha = linhas[i].trim();
  if (linha.length > 0) {
    mensagemOculta += linha[0];
  }
}

console.log("📝 Mensagem visível:");
console.log(mensagem);
console.log("\\n🔍 Mensagem OCULTA:");
console.log(mensagemOculta);
`,
    python: `# Mensagem aparentemente normal
mensagem = """
Sempre esteja
Curioso e
Resiliente para
Evoluir constantemente em
Todos os aspectos
"""

# Extrair primeira letra de cada linha
linhas = mensagem.strip().split('\\n')
mensagem_oculta = ""

for linha in linhas:
    linha = linha.strip()
    if len(linha) > 0:
        mensagem_oculta += linha[0]

print("📝 Mensagem visível:")
print(mensagem)
print("\\n🔍 Mensagem OCULTA:")
print(mensagem_oculta)
`,
  },
  expectedOutput: '🔍 Mensagem OCULTA:\nSCRET',
  explanation: `
**Técnica: Acróstico**

Mensagem oculta: **SECRET**

Primeiras letras de cada linha formam a palavra secreta!

**No mundo real:**
Hackers usam isso para comunicação encoberta.
Parece texto normal, mas carrega informação oculta.

**Variações:**
• Última letra de cada palavra
• Caracteres invisíveis (zero-width)
• Espaços em branco (Morse code)
  `,
  hints: [
    'Olhe a primeira letra de cada linha',
    'S-C-R-E-T → SECRET',
  ],
  difficulty: 'easy',
};

const code10_2: CodeChallenge = {
  id: '10.2',
  type: 'code',
  episode: 10,
  room: '10.2',
  title: 'Dados em hexadecimal',
  description: 'Você encontrou este código suspeito em um arquivo: 48656c6c6f. Parece hexadecimal. Decodifique!',
  instructions: 'Execute e veja o texto escondido',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Dados em hexadecimal encontrados em um arquivo suspeito
const hexData = "48656c6c6f";

// Converta o hexadecimal para texto ASCII:
// 1. Percorra hexData de 2 em 2 caracteres (i += 2)
// 2. Extraia cada par de hex com hexData.substr(i, 2)
// 3. Converta para número decimal com parseInt(hex, 16)
// 4. Converta para caractere com String.fromCharCode()
// 5. Junte tudo em uma string resultado
// 6. Imprima: "📝 Texto decodificado: " + resultado
`,
    python: `# Dados em hexadecimal encontrados em um arquivo suspeito
hex_data = "48656c6c6f"

# Converta o hexadecimal para texto ASCII:
# 1. Use bytes.fromhex(hex_data) para converter hex em bytes
# 2. Use .decode('utf-8') para converter bytes em texto
# 3. Imprima: f"📝 Texto decodificado: {texto}"
`,
  },
  expectedOutput: '📝 Texto decodificado: Hello',
  explanation: `
**Hex to ASCII conversion**

48656c6c6f → Hello

**Como funciona:**
• 48 (hex) = 72 (decimal) = 'H' (ASCII)
• 65 (hex) = 101 = 'e'
• 6c (hex) = 108 = 'l'
• ...

**Uso comum:**
• Malware esconde strings em hex
• Evitar detecção por antivírus
• Ofuscar código

**Ferramentas:**
• CyberChef (converte tudo)
• xxd (Linux hex dump)
  `,
  hints: [
    'Hexadecimal é base 16 (0-9, A-F). Cada 2 dígitos = 1 caractere',
    'JS: parseInt("48", 16) retorna 72. String.fromCharCode(72) retorna "H"',
    'Python: bytes.fromhex("48656c6c6f").decode("utf-8") retorna "Hello"',
    'O texto escondido é "Hello"',
  ],
  difficulty: 'easy',
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
  description: 'Você tem uma sequência de números que representam pixels de uma imagem. Os bits menos significativos formam uma mensagem!',
  instructions: 'Execute e extraia a mensagem escondida',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// "Pixels" da imagem (valores RGB simplificados)
const pixels = [72, 101, 108, 108, 111];

// Os valores dos pixels são na verdade códigos ASCII!
// 1. Percorra o array pixels
// 2. Converta cada número para caractere com String.fromCharCode()
// 3. Junte todos os caracteres em uma string
// 4. Imprima: "📝 Mensagem escondida: " + a mensagem
`,
    python: `# "Pixels" da imagem (valores RGB simplificados)
pixels = [72, 101, 108, 108, 111]

# Os valores dos pixels são na verdade códigos ASCII!
# 1. Percorra a lista pixels
# 2. Converta cada número para caractere com chr()
# 3. Junte todos os caracteres em uma string
# 4. Imprima: f"📝 Mensagem escondida: {mensagem}"
`,
  },
  expectedOutput: '📝 Mensagem escondida: Hello',
  explanation: `
**Mensagem escondida: Hello**

Neste exemplo simplificado, os "pixels" são na verdade valores ASCII.
No mundo real:
• Imagem tem milhões de pixels
• Você usa LSBs para reconstruir bytes
• 1 byte = 8 pixels (1 bit por pixel)

**Capacidade:**
Imagem 1920x1080 = 2 milhões de pixels
Pode esconder: ~250KB de dados!

**Detecção:**
• Análise estatística
• Comparação de histogramas
• Chi-square test
  `,
  hints: [
    '72 = "H", 101 = "e", 108 = "l"... são valores ASCII',
    'JS: String.fromCharCode(72) retorna "H"',
    'Python: chr(72) retorna "H"',
    'Percorra com loop e concatene os caracteres em uma string',
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
