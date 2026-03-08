import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0: TheoryChallenge = {
  id: 'cert.0', type: 'theory', episode: 45, room: '45.0',
  title: 'Episódio 45 — Certificação: Próximos Passos',
  description: 'Parabéns! Você completou toda a jornada do Crypto Escape. Agora é hora de transformar esse conhecimento em carreira.',
  content: `
**O que você domina agora:**

**Programação (Módulo 1):**
• Variáveis, condições, loops, arrays, funções, objetos
• Manipulação de strings e algoritmos

**Cibersegurança (Módulo 2):**
• Cifras, hash, encoding, XSS, SQLi
• SOC Analyst, APIs, JWT, esteganografia

**Lógica e Algoritmos (Módulo 3):**
• Operadores lógicos, busca, ordenação

**Segurança Web Avançada (Módulo 4):**
• CSRF, Command Injection, Directory Traversal
• Validação, CORS, Security Headers

**Criptografia Moderna (Módulo 5):**
• XOR, AES, RSA, Hashing avançado

**Blue Team (Módulo 6):**
• Firewall, IDS/IPS, Incident Response, Hardening

**OSINT (Módulo 7):**
• Google Dorks, Metadados, Engenharia Social

**Automação (Módulo 8):**
• Regex, Scanners, Automação, Relatórios

**Pentest (Módulo 9):**
• Pentest completo do reconhecimento ao relatório
  `,
};

const code1: CodeChallenge = {
  id: 'cert.1', type: 'code', episode: 45, room: '45.1',
  title: 'Seu perfil de habilidades',
  description: 'Gere seu perfil completo de habilidades adquiridas no Crypto Escape. **Execute**!',
  instructions: 'Execute e veja seu perfil.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const modulos = [
  { nome: "Programacao", nivel: 100, episodios: 8 },
  { nome: "Ciberseguranca", nivel: 100, episodios: 12 },
  { nome: "Logica e Algoritmos", nivel: 100, episodios: 4 },
  { nome: "Seguranca Web", nivel: 100, episodios: 5 },
  { nome: "Criptografia", nivel: 100, episodios: 4 },
  { nome: "Blue Team", nivel: 100, episodios: 4 },
  { nome: "OSINT", nivel: 100, episodios: 3 },
  { nome: "Automacao", nivel: 100, episodios: 4 },
  { nome: "Pentest", nivel: 100, episodios: 2 }
];

console.log("=== PERFIL DO HACKER ===");
console.log("Status: FORMADO NO CRYPTO ESCAPE\\n");

let totalEps = 0;
for (let i = 0; i < modulos.length; i++) {
  const m = modulos[i];
  totalEps += m.episodios;
  const barra = "=".repeat(Math.floor(m.nivel / 5));
  console.log("  " + m.nome.padEnd(18) + " [" + barra + "] " + m.nivel + "%");
}

console.log("\\nTotal: " + totalEps + " episodios completados");
console.log("Modulos: " + modulos.length + "/9");
console.log("\\nPronto para: eJPT, CompTIA Security+, CEH");
`,
    python: `modulos = [
    {"nome": "Programacao", "nivel": 100, "episodios": 8},
    {"nome": "Ciberseguranca", "nivel": 100, "episodios": 12},
    {"nome": "Logica e Algoritmos", "nivel": 100, "episodios": 4},
    {"nome": "Seguranca Web", "nivel": 100, "episodios": 5},
    {"nome": "Criptografia", "nivel": 100, "episodios": 4},
    {"nome": "Blue Team", "nivel": 100, "episodios": 4},
    {"nome": "OSINT", "nivel": 100, "episodios": 3},
    {"nome": "Automacao", "nivel": 100, "episodios": 4},
    {"nome": "Pentest", "nivel": 100, "episodios": 2}
]

print("=== PERFIL DO HACKER ===")
print("Status: FORMADO NO CRYPTO ESCAPE\\n")

total_eps = 0
for m in modulos:
    total_eps += m["episodios"]
    barra = "=" * (m["nivel"] // 5)
    print("  " + m["nome"].ljust(18) + " [" + barra + "] " + str(m["nivel"]) + "%")

print("\\nTotal: " + str(total_eps) + " episodios completados")
print("Modulos: " + str(len(modulos)) + "/9")
print("\\nPronto para: eJPT, CompTIA Security+, CEH")
`,
  },
  expectedOutput: '=== PERFIL DO HACKER ===\nStatus: FORMADO NO CRYPTO ESCAPE\n\n  Programacao        [====================] 100%\n  Ciberseguranca     [====================] 100%\n  Logica e Algoritmos [====================] 100%\n  Seguranca Web      [====================] 100%\n  Criptografia       [====================] 100%\n  Blue Team          [====================] 100%\n  OSINT              [====================] 100%\n  Automacao          [====================] 100%\n  Pentest            [====================] 100%\n\nTotal: 46 episodios completados\nModulos: 9/9\n\nPronto para: eJPT, CompTIA Security+, CEH',
  hints: ['Seu perfil mostra todas as habilidades adquiridas ao longo da jornada.'],
  difficulty: 'easy',
};

const theory2: TheoryChallenge = {
  id: 'cert.2', type: 'theory', episode: 45, room: '45.2',
  title: 'Roadmap de certificações',
  description: 'Agora que você tem a base, conheça as certificações que vão alavancar sua carreira.',
  content: `
**Certificações recomendadas (em ordem):**

**Nível Iniciante:**
• **CompTIA Security+** — base sólida, reconhecida mundialmente
• **eJPT** (eLearnSecurity) — pentest prático para iniciantes
• **CC** (ISC²) — certificação gratuita de fundamentos

**Nível Intermediário:**
• **CompTIA CySA+** — análise de segurança (Blue Team)
• **CompTIA PenTest+** — pentest e vulnerabilidades
• **CEH** (EC-Council) — Certified Ethical Hacker

**Nível Avançado:**
• **OSCP** — a mais respeitada em pentest (prática pura)
• **CISSP** — gestão de segurança (carreira sênior)
• **OSWE** — web application security expert
• **CRTP** — Active Directory attacks

**Plataformas para praticar:**
• HackTheBox — labs e máquinas para hackear
• TryHackMe — aprendizado guiado
• PortSwigger Academy — web security (gratuito)
• PicoCTF — competições de CTF para iniciantes
  `,
};

const theory3: TheoryChallenge = {
  id: 'cert.3', type: 'theory', episode: 45, room: '45.3',
  title: 'CRYPTO ESCAPE — COMPLETO!',
  description: 'Você é oficialmente um formado do Crypto Escape. A jornada termina aqui, mas a aventura está apenas começando.',
  content: `
**PARABENS! VOCE COMPLETOU O CRYPTO ESCAPE!**

De zero absoluto até pentest profissional.
De "o que é uma variável?" até explorar vulnerabilidades reais.

**Sua jornada:**
• 46 episódios
• 9 módulos
• Centenas de linhas de código
• Dezenas de conceitos de segurança

**O que fazer agora:**
1. Monte um lab em casa (VMs, Kali Linux)
2. Pratique em plataformas como HackTheBox
3. Estude para sua primeira certificação
4. Participe de CTFs (Capture The Flag)
5. Contribua para projetos open source de segurança
6. Nunca pare de aprender!

**Lembre-se:**
"Hackers são criadores, não destruidores.
Usamos nosso conhecimento para proteger."

**Boa sorte na sua carreira em cibersegurança!**
— Equipe Crypto Escape
  `,
};

export const certificationChallenges: Challenge[] = [theory0, code1, theory2, theory3];
