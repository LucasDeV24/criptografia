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
  instructions: 'Execute e veja o parser de dorks em ação.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const paginas = [
  { url: "example.com/admin", titulo: "Admin Panel", tipo: "html", corpo: "Login admin" },
  { url: "example.com/dados.sql", titulo: "Backup DB", tipo: "sql", corpo: "CREATE TABLE users" },
  { url: "outro.com/index.html", titulo: "Index of /files", tipo: "html", corpo: "passwords.txt" },
  { url: "example.com/config.env", titulo: "Config", tipo: "env", corpo: "DB_PASSWORD=123" },
  { url: "example.com/sobre", titulo: "Sobre nos", tipo: "html", corpo: "Empresa X" }
];

function buscar(dork) {
  let resultados = paginas.slice();
  const partes = dork.split(" ");

  for (let i = 0; i < partes.length; i++) {
    const p = partes[i];
    if (p.startsWith("site:")) {
      const site = p.slice(5);
      resultados = resultados.filter(r => r.url.startsWith(site));
    } else if (p.startsWith("filetype:")) {
      const tipo = p.slice(9);
      resultados = resultados.filter(r => r.tipo === tipo);
    } else if (p.startsWith("inurl:")) {
      const termo = p.slice(6);
      resultados = resultados.filter(r => r.url.includes(termo));
    } else if (p.startsWith("intext:")) {
      const termo = p.slice(7).replace(/"/g, "");
      resultados = resultados.filter(r => r.corpo.includes(termo));
    }
  }
  return resultados;
}

let r1 = buscar("site:example.com filetype:sql");
console.log("Dork 1: " + r1.length + " resultado(s)");
for (let i = 0; i < r1.length; i++) console.log("  -> " + r1[i].url);

let r2 = buscar("intext:DB_PASSWORD");
console.log("Dork 2: " + r2.length + " resultado(s)");
for (let i = 0; i < r2.length; i++) console.log("  -> " + r2[i].url);
`,
    python: `paginas = [
    {"url": "example.com/admin", "titulo": "Admin Panel", "tipo": "html", "corpo": "Login admin"},
    {"url": "example.com/dados.sql", "titulo": "Backup DB", "tipo": "sql", "corpo": "CREATE TABLE users"},
    {"url": "outro.com/index.html", "titulo": "Index of /files", "tipo": "html", "corpo": "passwords.txt"},
    {"url": "example.com/config.env", "titulo": "Config", "tipo": "env", "corpo": "DB_PASSWORD=123"},
    {"url": "example.com/sobre", "titulo": "Sobre nos", "tipo": "html", "corpo": "Empresa X"}
]

def buscar(dork):
    resultados = paginas[:]
    partes = dork.split(" ")

    for p in partes:
        if p.startswith("site:"):
            site = p[5:]
            resultados = [r for r in resultados if r["url"].startswith(site)]
        elif p.startswith("filetype:"):
            tipo = p[9:]
            resultados = [r for r in resultados if r["tipo"] == tipo]
        elif p.startswith("inurl:"):
            termo = p[6:]
            resultados = [r for r in resultados if termo in r["url"]]
        elif p.startswith("intext:"):
            termo = p[7:].replace('"', "")
            resultados = [r for r in resultados if termo in r["corpo"]]
    return resultados

r1 = buscar("site:example.com filetype:sql")
print("Dork 1: " + str(len(r1)) + " resultado(s)")
for r in r1: print("  -> " + r["url"])

r2 = buscar("intext:DB_PASSWORD")
print("Dork 2: " + str(len(r2)) + " resultado(s)")
for r in r2: print("  -> " + r["url"])
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
  instructions: 'Execute e veja o relatório de exposição.',
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

console.log("=== SCAN DE EXPOSICAO ===");
let criticos = 0;
let altos = 0;

for (let i = 0; i < arquivosExpostos.length; i++) {
  const a = arquivosExpostos[i];
  if (a.risco === "CRITICO" || a.risco === "ALTO") {
    console.log("[" + a.risco + "] " + a.path + " - " + a.desc);
    if (a.risco === "CRITICO") criticos++;
    if (a.risco === "ALTO") altos++;
  }
}

console.log("Criticos: " + criticos + " | Altos: " + altos);
if (criticos > 0) console.log("ACAO IMEDIATA NECESSARIA!");
`,
    python: `arquivos_expostos = [
    {"path": "/backup.sql", "risco": "CRITICO", "desc": "Banco de dados exposto"},
    {"path": "/.env", "risco": "CRITICO", "desc": "Variaveis de ambiente com senhas"},
    {"path": "/robots.txt", "risco": "INFO", "desc": "Robots.txt (normal)"},
    {"path": "/admin/login", "risco": "MEDIO", "desc": "Painel admin acessivel"},
    {"path": "/.git/config", "risco": "ALTO", "desc": "Repositorio git exposto"},
    {"path": "/sitemap.xml", "risco": "INFO", "desc": "Sitemap (normal)"}
]

print("=== SCAN DE EXPOSICAO ===")
criticos = 0
altos = 0

for a in arquivos_expostos:
    if a["risco"] in ["CRITICO", "ALTO"]:
        print("[" + a["risco"] + "] " + a["path"] + " - " + a["desc"])
        if a["risco"] == "CRITICO": criticos += 1
        if a["risco"] == "ALTO": altos += 1

print("Criticos: " + str(criticos) + " | Altos: " + str(altos))
if criticos > 0: print("ACAO IMEDIATA NECESSARIA!")
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
