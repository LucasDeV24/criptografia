import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0: TheoryChallenge = {
  id: 'csrf.0', type: 'theory', episode: 24, room: '24.0',
  title: 'Episódio 24 — CSRF: Cross-Site Request Forgery',
  description: 'CSRF força o navegador do usuário a fazer ações que ele NÃO autorizou. Um dos ataques web mais perigosos.',
  content: `
**Como funciona o CSRF?**
1. Você está logado no seu banco (site-banco.com)
2. Você visita um site malicioso
3. O site malicioso envia uma requisição PARA O BANCO usando SEU navegador
4. O banco acha que foi VOCÊ que pediu → transfere dinheiro

**Por que funciona?**
O navegador envia cookies automaticamente. Se você está logado, o cookie de sessão vai junto.

**Exemplo de ataque:**
\`\`\`
<img src="https://banco.com/transferir?para=hacker&valor=1000">
\`\`\`
O navegador tenta carregar a "imagem" e faz a requisição!

**Defesa — Token CSRF:**
O servidor gera um token secreto para cada formulário.
Se a requisição não tem o token → é CSRF → bloqueia.
  `,
};

const code1: CodeChallenge = {
  id: 'csrf.1', type: 'code', episode: 24, room: '24.1',
  title: 'Simulando requisição legítima',
  description: 'Veja como uma requisição normal tem todos os dados necessários. **Execute**!',
  instructions: 'Execute e veja a requisição legítima.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const requisicao = {\n  url: "/transferir",\n  cookie: "sessao=abc123",\n  corpo: { para: "amigo", valor: 100 },\n  csrfToken: "token_secreto_xyz"\n};\n\nconst tokenServidor = "token_secreto_xyz";\n\nif (requisicao.csrfToken == tokenServidor) {\n  console.log("Transferencia aprovada: R$" + requisicao.corpo.valor);\n} else {\n  console.log("CSRF detectado! Bloqueado.");\n}\n`,
    python: `requisicao = {\n    "url": "/transferir",\n    "cookie": "sessao=abc123",\n    "corpo": {"para": "amigo", "valor": 100},\n    "csrfToken": "token_secreto_xyz"\n}\n\ntoken_servidor = "token_secreto_xyz"\n\nif requisicao["csrfToken"] == token_servidor:\n    print("Transferencia aprovada: R$" + str(requisicao["corpo"]["valor"]))\nelse:\n    print("CSRF detectado! Bloqueado.")\n`,
  },
  expectedOutput: 'Transferencia aprovada: R$100',
  hints: ['O token CSRF bate → requisição legítima.'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'csrf.2', type: 'code', episode: 24, room: '24.2',
  title: 'Simulando ataque CSRF',
  description: 'Agora simule o ataque: remova o csrfToken (mude para **""**) e veja ser bloqueado.',
  instructions: 'Mude o csrfToken para "" (vazio).',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const requisicao = {\n  url: "/transferir",\n  cookie: "sessao=abc123",\n  corpo: { para: "hacker", valor: 5000 },\n  csrfToken: "token_secreto_xyz"\n};\n\nconst tokenServidor = "token_secreto_xyz";\n\nif (requisicao.csrfToken == tokenServidor) {\n  console.log("Transferencia aprovada: R$" + requisicao.corpo.valor);\n} else {\n  console.log("CSRF detectado! Bloqueado.");\n}\n`,
    python: `requisicao = {\n    "url": "/transferir",\n    "cookie": "sessao=abc123",\n    "corpo": {"para": "hacker", "valor": 5000},\n    "csrfToken": "token_secreto_xyz"\n}\n\ntoken_servidor = "token_secreto_xyz"\n\nif requisicao["csrfToken"] == token_servidor:\n    print("Transferencia aprovada: R$" + str(requisicao["corpo"]["valor"]))\nelse:\n    print("CSRF detectado! Bloqueado.")\n`,
  },
  expectedOutput: 'CSRF detectado! Bloqueado.',
  hints: ['Mude csrfToken: "token_secreto_xyz" para csrfToken: ""', 'Sem o token correto, o servidor bloqueia.'],
  difficulty: 'easy',
};

const code3: CodeChallenge = {
  id: 'csrf.3', type: 'code', episode: 24, room: '24.3',
  title: 'Criando um validador CSRF',
  description: 'Crie uma função que valida tokens CSRF. O código já está pronto! **Execute**.',
  instructions: 'Execute e veja o validador.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function validarCSRF(requisicao, tokenServidor) {\n  if (!requisicao.csrfToken || requisicao.csrfToken != tokenServidor) {\n    return "BLOQUEADO: Token CSRF invalido";\n  }\n  return "PERMITIDO: Token valido";\n}\n\nconsole.log(validarCSRF({ csrfToken: "abc123" }, "abc123"));\nconsole.log(validarCSRF({ csrfToken: "errado" }, "abc123"));\nconsole.log(validarCSRF({}, "abc123"));\n`,
    python: `def validar_csrf(requisicao, token_servidor):\n    token = requisicao.get("csrfToken", "")\n    if not token or token != token_servidor:\n        return "BLOQUEADO: Token CSRF invalido"\n    return "PERMITIDO: Token valido"\n\nprint(validar_csrf({"csrfToken": "abc123"}, "abc123"))\nprint(validar_csrf({"csrfToken": "errado"}, "abc123"))\nprint(validar_csrf({}, "abc123"))\n`,
  },
  expectedOutput: 'PERMITIDO: Token valido\nBLOQUEADO: Token CSRF invalido\nBLOQUEADO: Token CSRF invalido',
  hints: ['A função verifica se o token existe e se bate com o do servidor.'],
  difficulty: 'medium',
};

const theory4: TheoryChallenge = {
  id: 'csrf.4', type: 'theory', episode: 24, room: '24.4',
  title: 'CSRF — Resumo',
  description: 'Agora você sabe como CSRF funciona e como se defender!',
  content: `
**O que você aprendeu:**
• CSRF força ações usando a sessão do usuário
• Tokens CSRF previnem o ataque
• Sempre validar tokens em requisições sensíveis

**Defesas adicionais:**
• SameSite cookies: impede envio de cookies cross-site
• Verificar header Origin/Referer
• Re-autenticação para ações críticas (confirmar senha)
  `,
};

export const csrfChallenges: Challenge[] = [theory0, code1, code2, code3, theory4];
