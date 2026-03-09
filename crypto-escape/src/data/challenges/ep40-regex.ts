import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0: TheoryChallenge = {
  id: 'regex.0', type: 'theory', episode: 40, room: '40.0',
  title: 'Episódio 40 — Regex: Expressões Regulares',
  description: 'Regex é a linguagem universal para buscar padrões em texto. Essencial para análise de logs, validação e automação.',
  content: `
**O que é Regex?**
Uma mini-linguagem para descrever padrões de texto.

**Sintaxe básica:**
• \\d — qualquer dígito (0-9)
• \\w — qualquer letra, dígito ou _
• \\s — espaço, tab, newline
• . — qualquer caractere
• + — 1 ou mais vezes
• * — 0 ou mais vezes
• ? — 0 ou 1 vez
• {n} — exatamente n vezes
• [abc] — qualquer um dos caracteres
• [a-z] — range de caracteres
• ^ — início da string
• $ — fim da string
• | — OU lógico
• () — grupo de captura

**Exemplos práticos:**
• IP: \\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}
• Email: \\w+@\\w+\\.\\w+
• Telefone BR: \\(\\d{2}\\)\\s?\\d{4,5}-\\d{4}
  `,
};

const code1: CodeChallenge = {
  id: 'regex.1', type: 'code', episode: 40, room: '40.1',
  title: 'Extrator de padrões com regex',
  description: 'Use regex para extrair IPs, emails e telefones de um texto. **Execute**!',
  instructions: 'Use regex para extrair IPs e emails do texto de log.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const texto = \`
Log do servidor:
Acesso de 192.168.1.100 as 14:00
Email de contato: admin@empresa.com
Falha de login de 10.0.0.55
Suporte: suporte@empresa.com
IP bloqueado: 45.33.32.156
\`;

// Use regex para extrair IPs e emails do texto
// IP: /\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}/g
// Email: /\\w+@\\w+\\.\\w+/g
// Imprima "IPs encontrados:" com "  IP" para cada
// Imprima "Emails encontrados:" com "  EMAIL" para cada
// Imprima "Total: N IPs, N emails"
`,
    python: `import re

texto = """
Log do servidor:
Acesso de 192.168.1.100 as 14:00
Email de contato: admin@empresa.com
Falha de login de 10.0.0.55
Suporte: suporte@empresa.com
IP bloqueado: 45.33.32.156
"""

# Use regex para extrair IPs e emails do texto
# IP: r"\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}"
# Email: r"\\w+@\\w+\\.\\w+"
# Imprima "IPs encontrados:" com "  IP" para cada
# Imprima "Emails encontrados:" com "  EMAIL" para cada
# Imprima "Total: N IPs, N emails"
`,
  },
  expectedOutput: 'IPs encontrados:\n  192.168.1.100\n  10.0.0.55\n  45.33.32.156\nEmails encontrados:\n  admin@empresa.com\n  suporte@empresa.com\nTotal: 3 IPs, 2 emails',
  hints: ['\\d{1,3} captura 1 a 3 dígitos, \\. captura o ponto literal.'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'regex.2', type: 'code', episode: 40, room: '40.2',
  title: 'Validador de inputs com regex',
  description: 'Crie validações de segurança usando regex para detectar entradas maliciosas. **Execute**!',
  instructions: 'Crie validar(input, tipo) com regex para validar emails/IPs e detectar SQLi/XSS.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Crie validar(input, tipo) com regex para:
// "email": validar formato, "ip": validar formato
// "sqli": detectar ('|--|;|UNION|SELECT|DROP|INSERT)
// "xss": detectar (<script|onerror|onload|javascript:)
// email/ip -> "VALIDO"/"INVALIDO", sqli/xss -> "BLOQUEADO"/"OK"
// Teste: "admin@site.com"(email), "nao-email"(email),
//   "192.168.1.1"(ip), "' OR 1=1--"(sqli),
//   "<script>alert(1)"(xss), "texto normal"(xss)
// Formato saida: "INPUT: RESULTADO"
`,
    python: `import re

# Crie validar(inp, tipo) com regex para:
# "email": validar formato, "ip": validar formato
# "sqli": detectar ('|--|;|UNION|SELECT|DROP|INSERT)
# "xss": detectar (<script|onerror|onload|javascript:)
# email/ip -> "VALIDO"/"INVALIDO", sqli/xss -> "BLOQUEADO"/"OK"
# Teste: "admin@site.com"(email), "nao-email"(email),
#   "192.168.1.1"(ip), "' OR 1=1--"(sqli),
#   "<script>alert(1)"(xss), "texto normal"(xss)
# Formato saida: "INPUT: RESULTADO"
`,
  },
  expectedOutput: "admin@site.com: VALIDO\nnao-email: INVALIDO\n192.168.1.1: VALIDO\n' OR 1=1--: BLOQUEADO\n<script>: BLOQUEADO\ntexto normal: OK",
  hints: ['Regex de ataque detecta padrões conhecidos como UNION SELECT e <script>.'],
  difficulty: 'medium',
};

const theory3: TheoryChallenge = {
  id: 'regex.3', type: 'theory', episode: 40, room: '40.3',
  title: 'Regex — Resumo',
  description: 'Regex é uma ferramenta indispensável para qualquer profissional de segurança.',
  content: `
**O que você aprendeu:**
• Sintaxe básica de regex: \\d, \\w, +, *, [], etc
• Extração de IPs e emails de logs
• Validação de inputs e detecção de ataques

**Onde regex é usado em segurança:**
• SIEM — regras de correlação de logs
• WAF — regras de bloqueio de ataques
• IDS/IPS — assinaturas de detecção
• Forense — busca de evidências em dumps
  `,
};

export const regexChallenges: Challenge[] = [theory0, code1, code2, theory3];
