import type { Challenge, LabChallenge, TheoryChallenge } from '@/types/challenge';

/**
 * Módulo "Log e SIEM: investigação sob pressão" (episódio 52).
 * Sem comandos novos: o próprio terminal (cat, grep, cut, sort, uniq) já é o "SIEM" aqui —
 * a habilidade nova é CRUZAR várias fontes para contar uma história completa.
 */

const t0: TheoryChallenge = {
  id: 'siem.0',
  type: 'theory',
  episode: 52,
  room: '52.0',
  title: 'O que é um SIEM (e por que um log sozinho não conta a história)',
  description: 'Um analista de segurança raramente olha só um log. A verdade está em cruzar vários ao mesmo tempo.',
  content: `
**O que é um SIEM**
SIEM significa "Security Information and Event Management" — um sistema que **junta logs de fontes diferentes** (servidores web, autenticação, firewall, antivírus...) num só lugar, para que um analista consiga ver o quadro completo. Empresas usam ferramentas como Splunk, Elastic (ELK) ou Microsoft Sentinel para isso.

**Por que um log sozinho engana**
• O log do **firewall** mostra que um IP se conectou na porta 22 (SSH). Isso, sozinho, não é suspeito — conexões SSH acontecem o tempo todo.
• O log de **autenticação** mostra duas tentativas falhas e depois um sucesso. Sozinho, pode ser só alguém que errou a senha duas vezes.
• O log do **site** mostra um acesso a uma área administrativa. Sozinho, pode ser um administrador de verdade.

**Juntos, esses três eventos, na mesma janela de tempo, vindos do mesmo IP** contam uma história bem diferente: alguém tentou senhas até acertar, e depois foi direto para uma área sensível.

**A habilidade central deste módulo**
Você já sabe usar \`grep\`, \`cut\`, \`sort\` e \`uniq\` desde os módulos anteriores. Aqui, a novidade não é uma ferramenta nova — é usar essas mesmas ferramentas em **várias fontes ao mesmo tempo**, procurando o mesmo IP, usuário ou horário em cada uma, até a história se completar.
  `,
};

const t1: TheoryChallenge = {
  id: 'siem.1',
  type: 'theory',
  episode: 52,
  room: '52.1',
  title: 'Cruzando fontes: o mesmo grep, vários arquivos',
  description: 'A técnica é simples: repetir a mesma busca em cada fonte de log e comparar os resultados.',
  content: `
**grep em vários arquivos de uma vez**
Você já sabe que \`grep\` aceita mais de um arquivo:
\`\`\`
grep 198.51.100.9 web.log auth.log firewall.log
\`\`\`
Quando há mais de um arquivo, o \`grep\` coloca o **nome do arquivo** antes de cada linha encontrada, para você saber de onde veio cada uma.

**Ou uma fonte de cada vez**
Às vezes é mais claro investigar fonte por fonte:
\`\`\`
grep 198.51.100.9 web.log
grep 198.51.100.9 auth.log
grep 198.51.100.9 firewall.log
\`\`\`
Comparando os horários de cada resultado, dá para montar a sequência de eventos (a **timeline**) de um possível incidente.

**O método**
1. Ache um indício em UMA fonte (um IP estranho, um usuário fora do horário comum)
2. Procure esse MESMO indício em TODAS as outras fontes
3. Ordene os resultados por horário
4. Pergunte: essa sequência faz sentido para um uso normal, ou parece um ataque?
  `,
};

const lab1: LabChallenge = {
  id: 'siem.2',
  type: 'lab',
  episode: 52,
  room: '52.2',
  labId: 'term-siem-correlate',
  title: 'Lab 1 — Cruzando três fontes',
  description: 'Três logs do mesmo período. Um IP aparece nos três — isso não costuma ser coincidência.',
  instructions: 'Leia a missão e procure o IP suspeito nos três logs: web, autenticação e firewall.',
  difficulty: 'easy',
  hints: [
    'cat missao.txt para o contexto',
    'Repare que 198.51.100.9 aparece em vários eventos estranhos no log web',
    'Procure esse mesmo IP em auth.log e depois em firewall.log',
  ],
  explanation: `
**O que você encontrou**
O IP 198.51.100.9 aparece nos três logs, na mesma janela de tempo: tentativas de login web, tentativas e sucesso de SSH, e conexões no firewall. Isoladamente, cada evento parece pouco. Juntos, formam um padrão.

**Por que isso importa:** analistas de SOC fazem exatamente esse exercício, várias vezes por dia, com volumes de log muito maiores que este. A técnica (grep pelo mesmo indício em cada fonte) é a mesma, só muda a escala.
  `,
};

const t2: TheoryChallenge = {
  id: 'siem.3',
  type: 'theory',
  episode: 52,
  room: '52.3',
  title: 'Construindo uma timeline de incidente',
  description: 'Depois de achar os eventos, o próximo passo é ordená-los e contar a história completa.',
  content: `
**Por que uma timeline importa**
Um relatório de incidente não é só "achamos algo suspeito". É: **o que aconteceu, em que ordem, e o que foi afetado**. Isso é o que permite:
• Saber exatamente o que precisa ser corrigido
• Avisar corretamente quem foi impactado (por exemplo, se dados de clientes foram expostos, existem obrigações legais de notificação — a LGPD, no Brasil, exige isso)
• Aprender com o incidente para evitar que se repita

**Uma timeline típica**
\`\`\`
10:01:12  Tentativa de SSH (falha)     — auth.log
10:01:19  SSH bem-sucedido             — auth.log
10:01:25  Acesso à área administrativa — web.log
10:01:40  Exportação de dados          — web.log
10:02:03  Conexão de saída incomum     — firewall.log
\`\`\`
Cada linha vem de uma fonte diferente, mas juntas formam uma sequência clara: acesso indevido → ação no sistema → possível saída de dados.

**No próximo laboratório**
Você vai reconstruir uma timeline assim, sob pressão de tempo — como aconteceria numa investigação real, onde cada minuto sem resposta é um minuto a mais de exposição.
  `,
};

const lab2: LabChallenge = {
  id: 'siem.4',
  type: 'lab',
  episode: 52,
  room: '52.4',
  labId: 'term-siem-timeline',
  title: 'Lab 2 — Reconstruindo a timeline',
  description: 'CRONOMETRADO. Um incidente aconteceu. Cruze os três logs e descubra o que foi exportado.',
  instructions: 'Siga a sequência descrita na missão pelos três logs e confirme o que foi exportado.',
  difficulty: 'medium',
  hints: [
    'Comece pelo auth.log: veja as tentativas e o sucesso do SSH',
    'Depois veja o mesmo IP no web.log: o que ele acessou depois de entrar?',
    'Por fim, veja o firewall.log: para onde foi a conexão de saída?',
    'O log web tem os detalhes completos do que foi exportado',
  ],
  explanation: `
**A timeline reconstruída**
1. auth.log: duas falhas de SSH, depois sucesso — indício de senha adivinhada ou reaproveitada
2. web.log: logo depois, acesso à área administrativa e exportação de uma tabela
3. firewall.log: uma conexão de saída para um IP e porta fora do padrão (a mesma porta suspeita que você viu no módulo de Ataque e Defesa)

**A lição principal**
Nenhuma fonte sozinha provava um ataque. Juntas, e na ordem certa, contam a história inteira — e é exatamente essa reconstrução que um analista de SOC precisa fazer rápido, quando cada minuto conta.
  `,
};

const tEnd: TheoryChallenge = {
  id: 'siem.5',
  type: 'theory',
  episode: 52,
  room: '52.5',
  title: 'Parabéns! Você já investiga como um analista de SOC',
  description: 'Cruzar fontes de log sob pressão é uma das habilidades mais usadas no dia a dia de segurança.',
  content: `
**O que você aprendeu**
• O que é um SIEM e por que ele existe
• Cruzar várias fontes de log procurando o mesmo indício (IP, usuário, horário)
• Construir uma timeline de incidente, na ordem certa
• Por que documentar corretamente o que aconteceu tem consequências reais (LGPD, confiança do cliente)

**Ferramentas reais equivalentes**
No trabalho, você usaria Splunk, Elastic/Kibana ou Microsoft Sentinel para fazer isso em escala — mas a lógica por trás é a mesma que você acabou de praticar com grep.

**Onde continuar**
TryHackMe tem salas específicas de "SOC Level 1" e análise de log com ferramentas reais de SIEM, o próximo passo natural depois deste módulo.
  `,
};

export const logSiemChallenges: Challenge[] = [t0, t1, lab1, t2, lab2, tEnd];
