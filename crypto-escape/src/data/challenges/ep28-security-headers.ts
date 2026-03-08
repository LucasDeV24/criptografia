import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0: TheoryChallenge = {
  id: 'headers.0', type: 'theory', episode: 28, room: '28.0',
  title: 'Episódio 28 — CORS e Security Headers',
  description: 'Headers HTTP são a armadura invisível de um site. Configurá-los corretamente previne ataques automaticamente.',
  content: `
**O que são Security Headers?**
São instruções que o servidor envia ao navegador:
"Ei navegador, siga estas regras de segurança!"

**Headers mais importantes:**
| Header | Protege contra |
|--------|---------------|
| Content-Security-Policy | XSS |
| X-Frame-Options | Clickjacking |
| X-Content-Type-Options | MIME sniffing |
| Strict-Transport-Security | Downgrade HTTPS→HTTP |
| Access-Control-Allow-Origin | CORS (acesso cross-site) |

**CORS — Cross-Origin Resource Sharing:**
Controla quais sites podem acessar sua API.
• \`Access-Control-Allow-Origin: *\` → qualquer site (PERIGOSO!)
• \`Access-Control-Allow-Origin: https://meusite.com\` → só seu site (SEGURO)
  `,
};

const code1: CodeChallenge = {
  id: 'headers.1', type: 'code', episode: 28, room: '28.1',
  title: 'Analisando headers',
  description: 'Analise os headers de um servidor e identifique problemas de segurança. **Execute**!',
  instructions: 'Execute e veja a análise.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const headers = {\n  "Content-Type": "text/html",\n  "X-Frame-Options": "DENY",\n  "Access-Control-Allow-Origin": "*"\n};\n\nconst headersRecomendados = [\n  "Content-Security-Policy",\n  "X-Frame-Options",\n  "X-Content-Type-Options",\n  "Strict-Transport-Security"\n];\n\nfor (let i = 0; i < headersRecomendados.length; i++) {\n  const h = headersRecomendados[i];\n  if (headers[h]) {\n    console.log("OK: " + h);\n  } else {\n    console.log("FALTANDO: " + h);\n  }\n}\n`,
    python: `headers = {\n    "Content-Type": "text/html",\n    "X-Frame-Options": "DENY",\n    "Access-Control-Allow-Origin": "*"\n}\n\nheaders_recomendados = [\n    "Content-Security-Policy",\n    "X-Frame-Options",\n    "X-Content-Type-Options",\n    "Strict-Transport-Security"\n]\n\nfor h in headers_recomendados:\n    if h in headers:\n        print("OK: " + h)\n    else:\n        print("FALTANDO: " + h)\n`,
  },
  expectedOutput: 'FALTANDO: Content-Security-Policy\nOK: X-Frame-Options\nFALTANDO: X-Content-Type-Options\nFALTANDO: Strict-Transport-Security',
  hints: ['O código verifica quais headers de segurança estão presentes.'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'headers.2', type: 'code', episode: 28, room: '28.2',
  title: 'Verificando CORS perigoso',
  description: 'Detecte se o CORS está configurado de forma perigosa (Allow-Origin: *). **Execute**!',
  instructions: 'Execute e veja a verificação CORS.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function verificarCORS(headers) {\n  const cors = headers["Access-Control-Allow-Origin"];\n  \n  if (!cors) {\n    return "SEM CORS: API nao acessivel externamente";\n  }\n  if (cors == "*") {\n    return "PERIGO: qualquer site pode acessar sua API!";\n  }\n  return "SEGURO: acesso restrito a " + cors;\n}\n\nconsole.log(verificarCORS({"Access-Control-Allow-Origin": "*"}));\nconsole.log(verificarCORS({"Access-Control-Allow-Origin": "https://meusite.com"}));\nconsole.log(verificarCORS({}));\n`,
    python: `def verificar_cors(headers):\n    cors = headers.get("Access-Control-Allow-Origin", "")\n    \n    if not cors:\n        return "SEM CORS: API nao acessivel externamente"\n    if cors == "*":\n        return "PERIGO: qualquer site pode acessar sua API!"\n    return "SEGURO: acesso restrito a " + cors\n\nprint(verificar_cors({"Access-Control-Allow-Origin": "*"}))\nprint(verificar_cors({"Access-Control-Allow-Origin": "https://meusite.com"}))\nprint(verificar_cors({}))\n`,
  },
  expectedOutput: 'PERIGO: qualquer site pode acessar sua API!\nSEGURO: acesso restrito a https://meusite.com\nSEM CORS: API nao acessivel externamente',
  hints: ['Origin: * é perigoso, qualquer site acessa.'],
  difficulty: 'easy',
};

const code3: CodeChallenge = {
  id: 'headers.3', type: 'code', episode: 28, room: '28.3',
  title: 'Auditoria completa de headers',
  description: 'Gere um relatório de segurança dos headers de um servidor. **Execute**!',
  instructions: 'Execute e veja o relatório.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const servidor = {\n  "Content-Security-Policy": "default-src 'self'",\n  "X-Frame-Options": "DENY",\n  "X-Content-Type-Options": "nosniff",\n  "Access-Control-Allow-Origin": "https://app.com"\n};\n\nconst regras = [\n  { header: "Content-Security-Policy", peso: 3 },\n  { header: "X-Frame-Options", peso: 2 },\n  { header: "X-Content-Type-Options", peso: 1 },\n  { header: "Strict-Transport-Security", peso: 3 },\n  { header: "Access-Control-Allow-Origin", peso: 2 }\n];\n\nlet pontos = 0;\nlet total = 0;\n\nfor (let i = 0; i < regras.length; i++) {\n  total += regras[i].peso;\n  if (servidor[regras[i].header]) {\n    pontos += regras[i].peso;\n  }\n}\n\nconsole.log("Seguranca: " + pontos + "/" + total + " pontos");\n`,
    python: `servidor = {\n    "Content-Security-Policy": "default-src 'self'",\n    "X-Frame-Options": "DENY",\n    "X-Content-Type-Options": "nosniff",\n    "Access-Control-Allow-Origin": "https://app.com"\n}\n\nregras = [\n    {"header": "Content-Security-Policy", "peso": 3},\n    {"header": "X-Frame-Options", "peso": 2},\n    {"header": "X-Content-Type-Options", "peso": 1},\n    {"header": "Strict-Transport-Security", "peso": 3},\n    {"header": "Access-Control-Allow-Origin", "peso": 2}\n]\n\npontos = 0\ntotal = 0\n\nfor regra in regras:\n    total += regra["peso"]\n    if regra["header"] in servidor:\n        pontos += regra["peso"]\n\nprint("Seguranca: " + str(pontos) + "/" + str(total) + " pontos")\n`,
  },
  expectedOutput: 'Seguranca: 8/11 pontos',
  hints: ['4 de 5 headers estão presentes, falta Strict-Transport-Security (3 pontos).'],
  difficulty: 'medium',
};

const theory4: TheoryChallenge = {
  id: 'headers.4', type: 'theory', episode: 28, room: '28.4',
  title: 'Módulo 4 completo! Segurança Web Avançada dominada!',
  description: 'Você agora conhece os ataques web mais importantes E sabe como se defender.',
  content: `
**Resumo do Módulo 4:**
• Ep 24: CSRF — tokens de proteção
• Ep 25: Command Injection — sanitizar inputs
• Ep 26: Directory Traversal — bloquear ../
• Ep 27: Validação e Sanitização — defesa universal
• Ep 28: CORS e Security Headers — armadura HTTP

**Você agora conhece os ataques do OWASP Top 10!**
É a lista das 10 vulnerabilidades web mais comuns.
Profissionais de segurança são avaliados por esse conhecimento.

**Próximo módulo: Criptografia Moderna!**
Saia da Cifra de César e entre no mundo do XOR, AES e RSA.
  `,
};

export const securityHeadersChallenges: Challenge[] = [theory0, code1, code2, code3, theory4];
