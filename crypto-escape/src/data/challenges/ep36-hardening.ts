import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0: TheoryChallenge = {
  id: 'hard.0', type: 'theory', episode: 36, room: '36.0',
  title: 'Episódio 36 — Hardening: Blindando Sistemas',
  description: 'Hardening é o processo de tornar um sistema o mais seguro possível. É como blindar um carro.',
  content: `
**O que é Hardening?**
Reduzir a superfície de ataque removendo tudo que não é necessário.

**Princípios:**
• **Menor privilégio:** dar apenas as permissões necessárias
• **Defesa em profundidade:** múltiplas camadas de segurança
• **Minimizar superfície:** desabilitar serviços desnecessários
• **Atualizar tudo:** patches de segurança são críticos

**Checklist de Hardening:**
1. Fechar portas desnecessárias
2. Remover contas padrão (admin/admin)
3. Forçar senhas fortes
4. Habilitar logs e monitoramento
5. Atualizar software
6. Configurar firewall
7. Desabilitar protocolos antigos
8. Criptografar dados sensíveis
  `,
};

const code1: CodeChallenge = {
  id: 'hard.1', type: 'code', episode: 36, room: '36.1',
  title: 'Auditoria de segurança',
  description: 'Crie um auditor que verifica a segurança de um servidor e dá uma nota. **Execute**!',
  instructions: 'Audite o servidor verificando 7 criterios de seguranca e dando uma nota.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const servidor = {\n  firewallAtivo: true,\n  senhaPadrao: false,\n  portasAbertas: [80, 443],\n  httpsAtivo: true,\n  logsAtivos: true,\n  atualizacoes: false,\n  backupAutomatico: false\n};\n\n// Verifique 7 criterios: firewallAtivo, !senhaPadrao, portasAbertas<=3,\n// httpsAtivo, logsAtivos, atualizacoes, backupAutomatico\n// Imprima "Seguranca: PONTOS/7"\n// Se >=6: "BOM", >=4: "REGULAR", <4: "CRITICO"\n`,
    python: `servidor = {\n    "firewallAtivo": True,\n    "senhaPadrao": False,\n    "portasAbertas": [80, 443],\n    "httpsAtivo": True,\n    "logsAtivos": True,\n    "atualizacoes": False,\n    "backupAutomatico": False\n}\n\n# Verifique 7 criterios: firewallAtivo, !senhaPadrao, portasAbertas<=3,\n# httpsAtivo, logsAtivos, atualizacoes, backupAutomatico\n# Imprima "Seguranca: PONTOS/7"\n# Se >=6: "BOM", >=4: "REGULAR", <4: "CRITICO"\n`,
  },
  expectedOutput: 'Seguranca: 5/7\nREGULAR',
  hints: ['5 de 7 critérios atendidos: faltam atualizações e backup.'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'hard.2', type: 'code', episode: 36, room: '36.2',
  title: 'Verificador de senhas fortes',
  description: 'Crie uma política de senhas que verifica se a senha atende requisitos mínimos. **Execute**!',
  instructions: 'Crie verificarSenha(senha) que valida requisitos minimos de seguranca.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Crie verificarSenha(senha) que retorna "FORTE" ou\n// "FRACA: " + problemas separados por ", "\n// Problemas: "minimo 8 caracteres", "precisa de maiuscula",\n//   "precisa de minuscula", "precisa de numero"\n// Teste com: "abc" e "Seguranca1"\n`,
    python: `# Crie verificar_senha(senha) que retorna "FORTE" ou\n# "FRACA: " + problemas separados por ", "\n# Problemas: "minimo 8 caracteres", "precisa de maiuscula",\n#   "precisa de minuscula", "precisa de numero"\n# Teste com: "abc" e "Seguranca1"\n`,
  },
  expectedOutput: 'FRACA: minimo 8 caracteres, precisa de maiuscula, precisa de numero\nFORTE',
  hints: ['"abc" falha em 3 critérios. "Seguranca1" passa em todos.'],
  difficulty: 'medium',
};

const theory3: TheoryChallenge = {
  id: 'hard.3', type: 'theory', episode: 36, room: '36.3',
  title: 'Módulo 6 completo! Blue Team dominado!',
  description: 'Você agora conhece o lado defensivo da cibersegurança — onde estão a maioria dos empregos.',
  content: `
**Resumo do Módulo 6 — Blue Team:**
• Ep 33: Firewall — regras de bloqueio/permissão
• Ep 34: IDS/IPS — detecção de intrusão
• Ep 35: Resposta a Incidentes — as 6 fases do NIST
• Ep 36: Hardening — blindar sistemas

**Carreiras Blue Team:**
• SOC Analyst (L1, L2, L3)
• Incident Responder
• Security Engineer
• Security Architect
• GRC (Governance, Risk, Compliance)

**Próximo módulo: OSINT e Engenharia Social!**
Investigação e manipulação — o lado mais fascinante da segurança.
  `,
};

export const hardeningChallenges: Challenge[] = [theory0, code1, code2, theory3];
