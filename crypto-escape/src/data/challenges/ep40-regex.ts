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
  instructions: 'Execute e veja os padrões extraídos.',
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

const ips = texto.match(/\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}/g) || [];
const emailsFound = texto.match(/\\w+@\\w+\\.\\w+/g) || [];

console.log("IPs encontrados:");
for (let i = 0; i < ips.length; i++) console.log("  " + ips[i]);

console.log("Emails encontrados:");
for (let i = 0; i < emailsFound.length; i++) console.log("  " + emailsFound[i]);

console.log("Total: " + ips.length + " IPs, " + emailsFound.length + " emails");
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

ips = re.findall(r"\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}", texto)
emails_found = re.findall(r"\\w+@\\w+\\.\\w+", texto)

print("IPs encontrados:")
for ip in ips: print("  " + ip)

print("Emails encontrados:")
for email in emails_found: print("  " + email)

print("Total: " + str(len(ips)) + " IPs, " + str(len(emails_found)) + " emails")
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
  instructions: 'Execute e veja a validação.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function validar(input, tipo) {
  const regras = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/,
    ip: /^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$/,
    sqli: /('|--|;|UNION|SELECT|DROP|INSERT)/i,
    xss: /(<script|onerror|onload|javascript:)/i
  };

  if (tipo === "sqli" || tipo === "xss") {
    return regras[tipo].test(input) ? "BLOQUEADO" : "OK";
  }
  return regras[tipo].test(input) ? "VALIDO" : "INVALIDO";
}

console.log("admin@site.com: " + validar("admin@site.com", "email"));
console.log("nao-email: " + validar("nao-email", "email"));
console.log("192.168.1.1: " + validar("192.168.1.1", "ip"));
console.log("' OR 1=1--: " + validar("' OR 1=1--", "sqli"));
console.log("<script>: " + validar("<script>alert(1)", "xss"));
console.log("texto normal: " + validar("texto normal", "xss"));
`,
    python: `import re

def validar(inp, tipo):
    regras = {
        "email": r"^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$",
        "ip": r"^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$",
        "sqli": r"('|--|;|UNION|SELECT|DROP|INSERT)",
        "xss": r"(<script|onerror|onload|javascript:)"
    }

    match = re.search(regras[tipo], inp, re.IGNORECASE)
    if tipo in ["sqli", "xss"]:
        return "BLOQUEADO" if match else "OK"
    return "VALIDO" if match else "INVALIDO"

print("admin@site.com: " + validar("admin@site.com", "email"))
print("nao-email: " + validar("nao-email", "email"))
print("192.168.1.1: " + validar("192.168.1.1", "ip"))
print("' OR 1=1--: " + validar("' OR 1=1--", "sqli"))
print("<script>: " + validar("<script>alert(1)", "xss"))
print("texto normal: " + validar("texto normal", "xss"))
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
