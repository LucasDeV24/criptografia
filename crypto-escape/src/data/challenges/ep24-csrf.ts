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
  instructions: 'Compare o token CSRF da requisição com o do servidor. Se forem iguais, aprove a transferência; senão, bloqueie.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const requisicao = {\n  url: "/transferir",\n  cookie: "sessao=abc123",\n  corpo: { para: "amigo", valor: 100 },\n  csrfToken: "token_secreto_xyz"\n};\n\nconst tokenServidor = "token_secreto_xyz";\n\n// Compare requisicao.csrfToken com tokenServidor:\n// Se iguais: console.log("Transferencia aprovada: R$" + requisicao.corpo.valor)\n// Senao: console.log("CSRF detectado! Bloqueado.")\n`,
    python: `requisicao = {\n    "url": "/transferir",\n    "cookie": "sessao=abc123",\n    "corpo": {"para": "amigo", "valor": 100},\n    "csrfToken": "token_secreto_xyz"\n}\n\ntoken_servidor = "token_secreto_xyz"\n\n# Compare requisicao["csrfToken"] com token_servidor:\n# Se iguais: print("Transferencia aprovada: R$" + str(requisicao["corpo"]["valor"]))\n# Senao: print("CSRF detectado! Bloqueado.")\n`,
  },
  expectedOutput: 'Transferencia aprovada: R$100',
  hints: ['O token CSRF bate → requisição legítima.'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'csrf.2', type: 'code', episode: 24, room: '24.2',
  title: 'Simulando ataque CSRF',
  description: 'Agora simule o ataque: remova o csrfToken (mude para **""**) e veja ser bloqueado.',
  instructions: 'Simule um ataque CSRF: mude o csrfToken para "" e escreva a validação que detecta e bloqueia o ataque.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const requisicao = {\n  url: "/transferir",\n  cookie: "sessao=abc123",\n  corpo: { para: "hacker", valor: 5000 },\n  csrfToken: "token_secreto_xyz"\n};\n\nconst tokenServidor = "token_secreto_xyz";\n\n// 1. Mude csrfToken acima para "" (simula ataque CSRF)\n// 2. Escreva a validacao:\n//    Se tokens iguais: "Transferencia aprovada: R$" + valor\n//    Senao: "CSRF detectado! Bloqueado."\n`,
    python: `requisicao = {\n    "url": "/transferir",\n    "cookie": "sessao=abc123",\n    "corpo": {"para": "hacker", "valor": 5000},\n    "csrfToken": "token_secreto_xyz"\n}\n\ntoken_servidor = "token_secreto_xyz"\n\n# 1. Mude csrfToken acima para "" (simula ataque CSRF)\n# 2. Escreva a validacao:\n#    Se tokens iguais: "Transferencia aprovada: R$" + str(valor)\n#    Senao: "CSRF detectado! Bloqueado."\n`,
  },
  expectedOutput: 'CSRF detectado! Bloqueado.',
  hints: ['Mude csrfToken: "token_secreto_xyz" para csrfToken: ""', 'Sem o token correto, o servidor bloqueia.'],
  difficulty: 'easy',
};

const code3: CodeChallenge = {
  id: 'csrf.3', type: 'code', episode: 24, room: '24.3',
  title: 'Criando um validador CSRF',
  description: 'Crie uma função que valida tokens CSRF. O código já está pronto! **Execute**.',
  instructions: 'Crie uma função validarCSRF que recebe a requisição e o token do servidor. Retorne "PERMITIDO" ou "BLOQUEADO" conforme a validação.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Crie a funcao validarCSRF(requisicao, tokenServidor):\n// - Se requisicao.csrfToken nao existe OU != tokenServidor:\n//   retorne "BLOQUEADO: Token CSRF invalido"\n// - Senao: retorne "PERMITIDO: Token valido"\n\n\nconsole.log(validarCSRF({ csrfToken: "abc123" }, "abc123"));\nconsole.log(validarCSRF({ csrfToken: "errado" }, "abc123"));\nconsole.log(validarCSRF({}, "abc123"));\n`,
    python: `# Crie a funcao validar_csrf(requisicao, token_servidor):\n# - Use requisicao.get("csrfToken", "") para pegar o token\n# - Se token vazio OU != token_servidor:\n#   retorne "BLOQUEADO: Token CSRF invalido"\n# - Senao: retorne "PERMITIDO: Token valido"\n\n\nprint(validar_csrf({"csrfToken": "abc123"}, "abc123"))\nprint(validar_csrf({"csrfToken": "errado"}, "abc123"))\nprint(validar_csrf({}, "abc123"))\n`,
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
