import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0: TheoryChallenge = {
  id: 'gdork.0', type: 'theory', episode: 37, room: '37.0',
  title: 'Episódio 37 — Google Dorks: Buscas Avançadas',
  description: 'Google Dorks são operadores especiais de busca que permitem encontrar informações sensíveis expostas na internet.',
  content: `
**O que são Google Dorks?**
Operadores avançados do Google que filtram resultados com precisão cirúrgica.

**Operadores principais:**
• **site:** busca apenas em um domínio (site:example.com)
• **filetype:** busca por tipo de arquivo (filetype:pdf)
• **intitle:** busca no título da página (intitle:"index of")
• **inurl:** busca na URL (inurl:admin)
• **intext:** busca no corpo da página (intext:"password")
• **cache:** versão em cache de um site
• **-** (menos): exclui termos (-login)

**Combinações perigosas (para defesa!):**
• \`site:example.com filetype:sql\` → bancos expostos
• \`intitle:"index of" passwords\` → diretórios abertos
• \`filetype:env "DB_PASSWORD"\` → credenciais vazadas
• \`inurl:"/wp-admin" site:example.com\` → painéis admin

**GHDB (Google Hacking Database):**
Repositório com milhares de dorks categorizados — usado em pentest profissional.
  `,
};

const code1: CodeChallenge = {
  id: 'gdork.1', type: 'code', episode: 37, room: '37.1',
  title: 'Simulador de Google Dorks',
  description: 'Crie um parser que interpreta operadores de busca avançada e filtra resultados. **Execute**!',
  instructions: 'Crie a funcao buscar(dork) que interpreta operadores de busca e filtra resultados.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const paginas = [
  { url: "example.com/admin", titulo: "Admin Panel", tipo: "html", corpo: "Login admin" },
  { url: "example.com/dados.sql", titulo: "Backup DB", tipo: "sql", corpo: "CREATE TABLE users" },
  { url: "outro.com/index.html", titulo: "Index of /files", tipo: "html", corpo: "passwords.txt" },
  { url: "example.com/config.env", titulo: "Config", tipo: "env", corpo: "DB_PASSWORD=123" },
  { url: "example.com/sobre", titulo: "Sobre nos", tipo: "html", corpo: "Empresa X" }
];

// Crie buscar(dork) que interpreta operadores:
// "site:X" filtra url por prefixo, "filetype:X" filtra tipo,
// "inurl:X" filtra url por conteudo, "intext:X" filtra corpo
// Imprima "Dork N: X resultado(s)" e "  -> URL" para cada
// Teste: buscar("site:example.com filetype:sql") e buscar("intext:DB_PASSWORD")
`,
    python: `paginas = [
    {"url": "example.com/admin", "titulo": "Admin Panel", "tipo": "html", "corpo": "Login admin"},
    {"url": "example.com/dados.sql", "titulo": "Backup DB", "tipo": "sql", "corpo": "CREATE TABLE users"},
    {"url": "outro.com/index.html", "titulo": "Index of /files", "tipo": "html", "corpo": "passwords.txt"},
    {"url": "example.com/config.env", "titulo": "Config", "tipo": "env", "corpo": "DB_PASSWORD=123"},
    {"url": "example.com/sobre", "titulo": "Sobre nos", "tipo": "html", "corpo": "Empresa X"}
]

# Crie buscar(dork) que interpreta operadores:
# "site:X" filtra url por prefixo, "filetype:X" filtra tipo,
# "inurl:X" filtra url por conteudo, "intext:X" filtra corpo
# Imprima "Dork N: X resultado(s)" e "  -> URL" para cada
# Teste: buscar("site:example.com filetype:sql") e buscar("intext:DB_PASSWORD")
`,
  },
  expectedOutput: 'Dork 1: 1 resultado(s)\n  -> example.com/dados.sql\nDork 2: 1 resultado(s)\n  -> example.com/config.env',
  hints: ['site: filtra pelo domínio, filetype: pelo tipo, intext: pelo conteúdo.'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'gdork.2', type: 'code', episode: 37, room: '37.2',
  title: 'Detector de exposição',
  description: 'Crie um scanner que verifica se um domínio tem dados sensíveis expostos. **Execute**!',
  instructions: 'Filtre arquivos expostos por risco e gere um relatorio de exposicao.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const arquivosExpostos = [
  { path: "/backup.sql", risco: "CRITICO", desc: "Banco de dados exposto" },
  { path: "/.env", risco: "CRITICO", desc: "Variaveis de ambiente com senhas" },
  { path: "/robots.txt", risco: "INFO", desc: "Robots.txt (normal)" },
  { path: "/admin/login", risco: "MEDIO", desc: "Painel admin acessivel" },
  { path: "/.git/config", risco: "ALTO", desc: "Repositorio git exposto" },
  { path: "/sitemap.xml", risco: "INFO", desc: "Sitemap (normal)" }
];

// Imprima "=== SCAN DE EXPOSICAO ==="
// Filtre apenas CRITICO e ALTO, imprima: "[RISCO] PATH - DESC"
// Conte criticos e altos: "Criticos: N | Altos: N"
// Se criticos > 0: "ACAO IMEDIATA NECESSARIA!"
`,
    python: `arquivos_expostos = [
    {"path": "/backup.sql", "risco": "CRITICO", "desc": "Banco de dados exposto"},
    {"path": "/.env", "risco": "CRITICO", "desc": "Variaveis de ambiente com senhas"},
    {"path": "/robots.txt", "risco": "INFO", "desc": "Robots.txt (normal)"},
    {"path": "/admin/login", "risco": "MEDIO", "desc": "Painel admin acessivel"},
    {"path": "/.git/config", "risco": "ALTO", "desc": "Repositorio git exposto"},
    {"path": "/sitemap.xml", "risco": "INFO", "desc": "Sitemap (normal)"}
]

# Imprima "=== SCAN DE EXPOSICAO ==="
# Filtre apenas CRITICO e ALTO, imprima: "[RISCO] PATH - DESC"
# Conte criticos e altos: "Criticos: N | Altos: N"
# Se criticos > 0: "ACAO IMEDIATA NECESSARIA!"
`,
  },
  expectedOutput: '=== SCAN DE EXPOSICAO ===\n[CRITICO] /backup.sql - Banco de dados exposto\n[CRITICO] /.env - Variaveis de ambiente com senhas\n[ALTO] /.git/config - Repositorio git exposto\nCriticos: 2 | Altos: 1\nACAO IMEDIATA NECESSARIA!',
  hints: ['Filtra apenas riscos CRITICO e ALTO, ignorando INFO e MEDIO neste relatório.'],
  difficulty: 'medium',
};

const theory3: TheoryChallenge = {
  id: 'gdork.3', type: 'theory', episode: 37, room: '37.3',
  title: 'Google Dorks — Resumo',
  description: 'Você domina buscas avançadas — a primeira etapa de qualquer reconhecimento profissional.',
  content: `
**O que você aprendeu:**
• Operadores: site:, filetype:, intitle:, inurl:, intext:
• Como combinar operadores para buscas precisas
• Scanner de exposição de dados

**Ferramentas reais:**
• Google Hacking Database (GHDB) — exploit-db.com/google-hacking-database
• Shodan — buscador de dispositivos IoT e servidores
• theHarvester — coleta de emails e subdomínios

**Ética:** Sempre tenha autorização antes de escanear qualquer alvo!
  `,
};

export const googleDorksChallenges: Challenge[] = [theory0, code1, code2, theory3];
