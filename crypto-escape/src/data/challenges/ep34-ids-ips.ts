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
  instructions: 'Execute e veja a detecção.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const assinaturas = [\n  { padrao: "<script>", tipo: "XSS" },\n  { padrao: "UNION SELECT", tipo: "SQLi" },\n  { padrao: "../../", tipo: "Directory Traversal" },\n  { padrao: "; rm -rf", tipo: "Command Injection" }\n];\n\nfunction analisar(trafego) {\n  for (let i = 0; i < assinaturas.length; i++) {\n    if (trafego.includes(assinaturas[i].padrao)) {\n      return "ALERTA: " + assinaturas[i].tipo + " detectado!";\n    }\n  }\n  return "OK: trafego normal";\n}\n\nconsole.log(analisar("GET /pagina HTTP/1.1"));\nconsole.log(analisar("GET /search?q=<script>alert(1)</script>"));\nconsole.log(analisar("POST /login UNION SELECT * FROM users"));\n`,
    python: `assinaturas = [\n    {"padrao": "<script>", "tipo": "XSS"},\n    {"padrao": "UNION SELECT", "tipo": "SQLi"},\n    {"padrao": "../../", "tipo": "Directory Traversal"},\n    {"padrao": "; rm -rf", "tipo": "Command Injection"}\n]\n\ndef analisar(trafego):\n    for assinatura in assinaturas:\n        if assinatura["padrao"] in trafego:\n            return "ALERTA: " + assinatura["tipo"] + " detectado!"\n    return "OK: trafego normal"\n\nprint(analisar("GET /pagina HTTP/1.1"))\nprint(analisar("GET /search?q=<script>alert(1)</script>"))\nprint(analisar("POST /login UNION SELECT * FROM users"))\n`,
  },
  expectedOutput: 'OK: trafego normal\nALERTA: XSS detectado!\nALERTA: SQLi detectado!',
  hints: ['O IDS compara cada requisição com assinaturas de ataques conhecidos.'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'ids.2', type: 'code', episode: 34, room: '34.2',
  title: 'Detecção por anomalia — taxa de requisições',
  description: 'Detecte força bruta: muitas requisições do mesmo IP em pouco tempo. **Execute**!',
  instructions: 'Execute e veja a detecção de anomalia.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const logs = [\n  { ip: "192.168.1.1", path: "/login" },\n  { ip: "10.0.0.5", path: "/login" },\n  { ip: "10.0.0.5", path: "/login" },\n  { ip: "10.0.0.5", path: "/login" },\n  { ip: "10.0.0.5", path: "/login" },\n  { ip: "10.0.0.5", path: "/login" },\n  { ip: "192.168.1.2", path: "/home" }\n];\n\nconst contagem = {};\nconst LIMITE = 4;\n\nfor (let i = 0; i < logs.length; i++) {\n  const ip = logs[i].ip;\n  if (!contagem[ip]) contagem[ip] = 0;\n  contagem[ip]++;\n}\n\nfor (const ip in contagem) {\n  if (contagem[ip] >= LIMITE) {\n    console.log("ALERTA: " + ip + " - " + contagem[ip] + " requisicoes (possivel brute force)");\n  }\n}\n`,
    python: `logs = [\n    {"ip": "192.168.1.1", "path": "/login"},\n    {"ip": "10.0.0.5", "path": "/login"},\n    {"ip": "10.0.0.5", "path": "/login"},\n    {"ip": "10.0.0.5", "path": "/login"},\n    {"ip": "10.0.0.5", "path": "/login"},\n    {"ip": "10.0.0.5", "path": "/login"},\n    {"ip": "192.168.1.2", "path": "/home"}\n]\n\ncontagem = {}\nLIMITE = 4\n\nfor log in logs:\n    ip = log["ip"]\n    contagem[ip] = contagem.get(ip, 0) + 1\n\nfor ip in contagem:\n    if contagem[ip] >= LIMITE:\n        print("ALERTA: " + ip + " - " + str(contagem[ip]) + " requisicoes (possivel brute force)")\n`,
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
