import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0: TheoryChallenge = {
  id: 'ids.0', type: 'theory', episode: 34, room: '34.0',
  title: 'Episódio 34 — IDS/IPS: Detecção de Intrusão',
  description: 'IDS detecta ataques. IPS detecta E bloqueia. São os "alarmes" da rede.',
  content: `
**IDS vs IPS:**
• **IDS** (Intrusion Detection System): detecta e ALERTA
• **IPS** (Intrusion Prevention System): detecta e BLOQUEIA

**Como funciona:**
Analisa tráfego de rede procurando padrões suspeitos:
• Muitas tentativas de login → possível força bruta
• Payload com "<script>" → possível XSS
• Requisição com "UNION SELECT" → possível SQLi
• Scan de várias portas → reconhecimento

**Tipos de detecção:**
• **Assinatura:** compara com padrões conhecidos (como antivírus)
• **Anomalia:** detecta comportamento diferente do normal
• **Híbrida:** combina ambos
  `,
};

const code1: CodeChallenge = {
  id: 'ids.1', type: 'code', episode: 34, room: '34.1',
  title: 'IDS baseado em assinaturas',
  description: 'Crie um IDS que detecta padrões de ataque conhecidos no tráfego. **Execute**!',
  instructions: 'Crie a funcao analisar(trafego) que compara com assinaturas de ataques conhecidos.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const assinaturas = [\n  { padrao: "<script>", tipo: "XSS" },\n  { padrao: "UNION SELECT", tipo: "SQLi" },\n  { padrao: "../../", tipo: "Directory Traversal" },\n  { padrao: "; rm -rf", tipo: "Command Injection" }\n];\n\n// Crie analisar(trafego) que verifica se contem algum padrao:\n// "ALERTA: TIPO detectado!" ou "OK: trafego normal"\n// Teste com: "GET /pagina HTTP/1.1",\n//   "GET /search?q=<script>alert(1)</script>",\n//   "POST /login UNION SELECT * FROM users"\n`,
    python: `assinaturas = [\n    {"padrao": "<script>", "tipo": "XSS"},\n    {"padrao": "UNION SELECT", "tipo": "SQLi"},\n    {"padrao": "../../", "tipo": "Directory Traversal"},\n    {"padrao": "; rm -rf", "tipo": "Command Injection"}\n]\n\n# Crie analisar(trafego) que verifica se contem algum padrao:\n# "ALERTA: TIPO detectado!" ou "OK: trafego normal"\n# Teste com: "GET /pagina HTTP/1.1",\n#   "GET /search?q=<script>alert(1)</script>",\n#   "POST /login UNION SELECT * FROM users"\n`,
  },
  expectedOutput: 'OK: trafego normal\nALERTA: XSS detectado!\nALERTA: SQLi detectado!',
  hints: ['O IDS compara cada requisição com assinaturas de ataques conhecidos.'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'ids.2', type: 'code', episode: 34, room: '34.2',
  title: 'Detecção por anomalia — taxa de requisições',
  description: 'Detecte força bruta: muitas requisições do mesmo IP em pouco tempo. **Execute**!',
  instructions: 'Conte requisicoes por IP e alerte quando ultrapassar o limite.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const logs = [\n  { ip: "192.168.1.1", path: "/login" },\n  { ip: "10.0.0.5", path: "/login" },\n  { ip: "10.0.0.5", path: "/login" },\n  { ip: "10.0.0.5", path: "/login" },\n  { ip: "10.0.0.5", path: "/login" },\n  { ip: "10.0.0.5", path: "/login" },\n  { ip: "192.168.1.2", path: "/home" }\n];\n\n// Conte requisicoes por IP (limite = 4)\n// Imprima "ALERTA: IP - N requisicoes (possivel brute force)"\n// para IPs com 4+ requisicoes\n`,
    python: `logs = [\n    {"ip": "192.168.1.1", "path": "/login"},\n    {"ip": "10.0.0.5", "path": "/login"},\n    {"ip": "10.0.0.5", "path": "/login"},\n    {"ip": "10.0.0.5", "path": "/login"},\n    {"ip": "10.0.0.5", "path": "/login"},\n    {"ip": "10.0.0.5", "path": "/login"},\n    {"ip": "192.168.1.2", "path": "/home"}\n]\n\n# Conte requisicoes por IP (limite = 4)\n# Imprima "ALERTA: IP - N requisicoes (possivel brute force)"\n# para IPs com 4+ requisicoes\n`,
  },
  expectedOutput: 'ALERTA: 10.0.0.5 - 5 requisicoes (possivel brute force)',
  hints: ['IP 10.0.0.5 fez 5 requisições (acima do limite de 4).'],
  difficulty: 'medium',
};

const theory3: TheoryChallenge = {
  id: 'ids.3', type: 'theory', episode: 34, room: '34.3',
  title: 'IDS/IPS — Resumo',
  description: 'Você sabe criar sistemas de detecção de intrusão!',
  content: `
**O que você aprendeu:**
• IDS por assinatura: compara padrões conhecidos
• IDS por anomalia: detecta comportamento anormal
• Diferença entre IDS (alerta) e IPS (bloqueia)

**Ferramentas reais:**
• Snort: IDS open source mais famoso
• Suricata: alternativa moderna ao Snort
• OSSEC: IDS baseado em host
• Wazuh: SIEM + IDS (muito usado no mercado)
  `,
};

export const idsIpsChallenges: Challenge[] = [theory0, code1, code2, theory3];
