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
  instructions: 'Execute e veja a auditoria.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const servidor = {\n  firewallAtivo: true,\n  senhaPadrao: false,\n  portasAbertas: [80, 443],\n  httpsAtivo: true,\n  logsAtivos: true,\n  atualizacoes: false,\n  backupAutomatico: false\n};\n\nlet pontos = 0;\nlet total = 7;\n\nif (servidor.firewallAtivo) pontos++;\nif (!servidor.senhaPadrao) pontos++;\nif (servidor.portasAbertas.length <= 3) pontos++;\nif (servidor.httpsAtivo) pontos++;\nif (servidor.logsAtivos) pontos++;\nif (servidor.atualizacoes) pontos++;\nif (servidor.backupAutomatico) pontos++;\n\nconsole.log("Seguranca: " + pontos + "/" + total);\nif (pontos >= 6) console.log("BOM");\nelse if (pontos >= 4) console.log("REGULAR");\nelse console.log("CRITICO");\n`,
    python: `servidor = {\n    "firewallAtivo": True,\n    "senhaPadrao": False,\n    "portasAbertas": [80, 443],\n    "httpsAtivo": True,\n    "logsAtivos": True,\n    "atualizacoes": False,\n    "backupAutomatico": False\n}\n\npontos = 0\ntotal = 7\n\nif servidor["firewallAtivo"]: pontos += 1\nif not servidor["senhaPadrao"]: pontos += 1\nif len(servidor["portasAbertas"]) <= 3: pontos += 1\nif servidor["httpsAtivo"]: pontos += 1\nif servidor["logsAtivos"]: pontos += 1\nif servidor["atualizacoes"]: pontos += 1\nif servidor["backupAutomatico"]: pontos += 1\n\nprint("Seguranca: " + str(pontos) + "/" + str(total))\nif pontos >= 6: print("BOM")\nelif pontos >= 4: print("REGULAR")\nelse: print("CRITICO")\n`,
  },
  expectedOutput: 'Seguranca: 5/7\nREGULAR',
  hints: ['5 de 7 critérios atendidos: faltam atualizações e backup.'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'hard.2', type: 'code', episode: 36, room: '36.2',
  title: 'Verificador de senhas fortes',
  description: 'Crie uma política de senhas que verifica se a senha atende requisitos mínimos. **Execute**!',
  instructions: 'Execute e veja a verificação.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `function verificarSenha(senha) {\n  const problemas = [];\n  \n  if (senha.length < 8) problemas.push("minimo 8 caracteres");\n  if (senha == senha.toLowerCase()) problemas.push("precisa de maiuscula");\n  if (senha == senha.toUpperCase()) problemas.push("precisa de minuscula");\n  \n  let temNumero = false;\n  for (let i = 0; i < senha.length; i++) {\n    if (senha[i] >= "0" && senha[i] <= "9") temNumero = true;\n  }\n  if (!temNumero) problemas.push("precisa de numero");\n  \n  if (problemas.length == 0) return "FORTE";\n  return "FRACA: " + problemas.join(", ");\n}\n\nconsole.log(verificarSenha("abc"));\nconsole.log(verificarSenha("Seguranca1"));\n`,
    python: `def verificar_senha(senha):\n    problemas = []\n    \n    if len(senha) < 8: problemas.append("minimo 8 caracteres")\n    if senha == senha.lower(): problemas.append("precisa de maiuscula")\n    if senha == senha.upper(): problemas.append("precisa de minuscula")\n    if not any(c.isdigit() for c in senha): problemas.append("precisa de numero")\n    \n    if not problemas: return "FORTE"\n    return "FRACA: " + ", ".join(problemas)\n\nprint(verificar_senha("abc"))\nprint(verificar_senha("Seguranca1"))\n`,
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
