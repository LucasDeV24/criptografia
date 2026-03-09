import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0: TheoryChallenge = {
  id: 'ir.0', type: 'theory', episode: 35, room: '35.0',
  title: 'Episódio 35 — Resposta a Incidentes',
  description: 'Quando um ataque acontece, como responder profissionalmente? Aprenda o processo de incident response.',
  content: `
**As 6 fases da Resposta a Incidentes (NIST):**

1. **Preparação:** ter planos, ferramentas e equipe prontos
2. **Identificação:** detectar que um incidente aconteceu
3. **Contenção:** limitar o dano (isolar sistemas afetados)
4. **Erradicação:** remover a causa raiz
5. **Recuperação:** restaurar sistemas ao normal
6. **Lições aprendidas:** documentar e melhorar

**Classificação de severidade:**
• **Crítico:** dados vazados, sistema comprometido
• **Alto:** ataque em andamento, vulnerabilidade explorada
• **Médio:** tentativa de ataque detectada
• **Baixo:** atividade suspeita, scan de portas
  `,
};

const code1: CodeChallenge = {
  id: 'ir.1', type: 'code', episode: 35, room: '35.1',
  title: 'Classificando incidentes',
  description: 'Crie um classificador de severidade de incidentes. **Execute**!',
  instructions: 'Crie a funcao classificar(incidente) que retorna a severidade baseada nos campos do objeto.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Crie classificar(incidente) que retorna:\n// "CRITICO" se dadosVazados ou sistemaComprometido\n// "ALTO" se ataqueAtivo\n// "MEDIO" se tentativaDetectada\n// "BAIXO" caso contrario\n// Teste com:\n// { dadosVazados: true, ataqueAtivo: true }\n// { ataqueAtivo: true }\n// { tentativaDetectada: true }\n// { scanPortas: true }\n`,
    python: `# Crie classificar(incidente) que retorna:\n# "CRITICO" se dadosVazados ou sistemaComprometido\n# "ALTO" se ataqueAtivo\n# "MEDIO" se tentativaDetectada\n# "BAIXO" caso contrario\n# Teste com:\n# {"dadosVazados": True, "ataqueAtivo": True}\n# {"ataqueAtivo": True}\n# {"tentativaDetectada": True}\n# {"scanPortas": True}\n`,
  },
  expectedOutput: 'CRITICO\nALTO\nMEDIO\nBAIXO',
  hints: ['A classificação segue a hierarquia: dados vazados > ataque ativo > tentativa > scan.'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'ir.2', type: 'code', episode: 35, room: '35.2',
  title: 'Timeline de ataque',
  description: 'Analise uma timeline de eventos e identifique as fases de um ataque real. **Execute**!',
  instructions: 'Analise a timeline e imprima cada evento com o prefixo correto baseado no tipo.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const eventos = [\n  { hora: "14:00", tipo: "scan", desc: "Port scan de 45.33.32.1" },\n  { hora: "14:15", tipo: "ataque", desc: "SQLi em /login" },\n  { hora: "14:16", tipo: "sucesso", desc: "Login como admin" },\n  { hora: "14:20", tipo: "exfiltracao", desc: "Download de banco de dados" },\n  { hora: "14:25", tipo: "persistencia", desc: "Backdoor instalado" }\n];\n\n// Imprima "=== TIMELINE DO INCIDENTE ==="\n// Para cada evento: "PREFIXO HORA [TIPO] DESC"\n// Prefixo: "!!!" se exfiltracao ou persistencia, ">>" caso contrario\n`,
    python: `eventos = [\n    {"hora": "14:00", "tipo": "scan", "desc": "Port scan de 45.33.32.1"},\n    {"hora": "14:15", "tipo": "ataque", "desc": "SQLi em /login"},\n    {"hora": "14:16", "tipo": "sucesso", "desc": "Login como admin"},\n    {"hora": "14:20", "tipo": "exfiltracao", "desc": "Download de banco de dados"},\n    {"hora": "14:25", "tipo": "persistencia", "desc": "Backdoor instalado"}\n]\n\n# Imprima "=== TIMELINE DO INCIDENTE ==="\n# Para cada evento: "PREFIXO HORA [TIPO] DESC"\n# Prefixo: "!!!" se exfiltracao ou persistencia, ">>" caso contrario\n`,
  },
  expectedOutput: '=== TIMELINE DO INCIDENTE ===\n>> 14:00 [SCAN] Port scan de 45.33.32.1\n>> 14:15 [ATAQUE] SQLi em /login\n>> 14:16 [SUCESSO] Login como admin\n!!! 14:20 [EXFILTRACAO] Download de banco de dados\n!!! 14:25 [PERSISTENCIA] Backdoor instalado',
  hints: ['A timeline mostra a progressão típica de um ataque real.'],
  difficulty: 'medium',
};

const theory3: TheoryChallenge = {
  id: 'ir.3', type: 'theory', episode: 35, room: '35.3',
  title: 'Resposta a Incidentes — Resumo',
  description: 'Saber responder a incidentes é uma das habilidades mais valorizadas no mercado.',
  content: `
**O que você aprendeu:**
• 6 fases do NIST: Preparação → Lições aprendidas
• Classificação de severidade
• Análise de timeline de ataque

**Carreira:**
Incident Responder é um dos cargos mais bem pagos em segurança.
Requer calma, método e conhecimento técnico profundo.
  `,
};

export const incidentResponseChallenges: Challenge[] = [theory0, code1, code2, theory3];
