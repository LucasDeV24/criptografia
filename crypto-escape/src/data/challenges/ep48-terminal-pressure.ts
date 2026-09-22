import type { Challenge, LabChallenge, TheoryChallenge } from '@/types/challenge';

/**
 * Módulo "Terminal: Ataque e Defesa" (episódio 48).
 * Continuação de "Terminal e Linux" (47): mesma regra — só terminal, nada de código de
 * programação — agora com processos (ps/kill) e, em alguns laboratórios, um cronômetro real.
 */

const t0: TheoryChallenge = {
  id: 'termp.0',
  type: 'theory',
  episode: 48,
  room: '48.0',
  title: 'Ataque e defesa sob pressão',
  description: 'Você já sabe se virar no terminal. Agora vem a parte que mais gera adrenalina: fazer isso com o relógio correndo.',
  content: `
**O que muda a partir daqui**
Você já sabe navegar, ler arquivos, buscar texto e organizar pastas. Neste módulo você vai:
• Aprender a ver e encerrar **processos** (\`ps\` e \`kill\`) — a ferramenta nº 1 para parar uma ameaça ativa
• Enfrentar laboratórios **cronometrados**: alguns simulam um ataque em andamento que você precisa **conter**, outros simulam uma invasão que você precisa **completar** antes de ser detectado

**Por que cronômetro?**
No mundo real, segurança tem prazo. Um time de resposta a incidentes (SOC/CSIRT) trabalha com janelas de contenção; um pentest tem escopo e tempo combinados. Praticar sob um pouco de pressão treina o que mais importa nessas horas: **ser metódico mesmo com pressa**, em vez de digitar comandos aleatórios.

**As regras aqui**
• O cronômetro é só deste laboratório específico — nem toda sala tem um
• Se o tempo acabar, nada de ruim acontece de verdade: você vê uma mensagem e pode clicar em **Reiniciar** para tentar de novo, quantas vezes quiser
• Não existe penalidade por errar. O objetivo é treinar, não decorar

**Uma dica que vale ouro**
Antes de digitar qualquer coisa, leia a missão até o fim. Depois pense no caminho antes de agir. Gente apressada demais costuma repetir comandos e perder tempo. Calma é mais rápida do que parece.
  `,
};

const t1: TheoryChallenge = {
  id: 'termp.1',
  type: 'theory',
  episode: 48,
  room: '48.1',
  title: 'Processos: ps e kill',
  description: 'Todo programa rodando no computador é um processo. Para deter uma ameaça ativa, primeiro você precisa enxergá-la.',
  content: `
**O que é um processo?**
É um programa em execução. Seu terminal é um processo, o navegador é outro, e um vírus ou backdoor rodando também é um processo — só que um que não deveria estar ali.

**ps: listar os processos**
\`ps\` (ou \`ps aux\`, do jeito clássico) mostra o que está rodando:
\`\`\`
USER       PID COMMAND
root         1 /sbin/init
aluno      842 -bash
aluno     1337 /tmp/.oculto/minerador.sh
\`\`\`
• **USER** → quem é o dono do processo
• **PID** → o **número de identificação** do processo (Process ID). É único: não existem dois processos com o mesmo PID ao mesmo tempo
• **COMMAND** → o programa que está rodando, com o caminho do arquivo

**O que chama atenção em um processo suspeito?**
• Um **caminho estranho**, como \`/tmp/.oculto/...\` (pastas ocultas, dentro de /tmp, que normalmente só guarda arquivos temporários)
• Um **nome que tenta se disfarçar** de algo do sistema (você vai ver um exemplo disso mais adiante)
• Um processo que você **não reconhece** e que ninguém deveria ter instalado

**kill: encerrar um processo**
\`kill <pid>\` encerra o processo com aquele número:
\`\`\`
kill 1337
\`\`\`
Sem PID certo não tem como encerrar: por isso o \`ps\` sempre vem antes do \`kill\`.

**Permissão**
Você só consegue encerrar processos **seus**, a não ser que esteja logado como **root** (o superusuário, que pode tudo). Em vários laboratórios daqui você vai estar logado como root, representando quem responde a um incidente com acesso total ao servidor.

**Cuidado ao mirar**
\`kill\` não pede confirmação. Errar o PID pode encerrar um processo legítimo sem querer — e isso tem consequência, como você vai ver em um laboratório mais à frente.
  `,
};

const lab1: LabChallenge = {
  id: 'termp.2',
  type: 'lab',
  episode: 48,
  room: '48.2',
  labId: 'term-ps-kill',
  title: 'Lab 1 — O processo escondido',
  description: 'Seu computador está lento e o ventilador não para. Alguma coisa estranha está rodando. Sem pressa: este laboratório não tem cronômetro.',
  instructions: 'Liste os processos com ps, identifique o suspeito e encerre-o com kill.',
  difficulty: 'easy',
  hints: [
    'Use ps para ver a lista de processos',
    'Repare no caminho de cada COMMAND. Um deles está em uma pasta oculta dentro de /tmp',
    'Anote o PID dele e use kill <pid> para encerrar',
  ],
  explanation: `
**O que você fez**
ps revelou um processo chamado minerador.sh rodando de dentro de /tmp/.oculto — nada de legítimo se instala assim. kill encerrou pelo PID.

**Na prática:** "minerador" é uma referência a cryptojacking, quando um invasor instala um programa que usa sua CPU para minerar criptomoedas escondido, sem você perceber (só o computador ficando lento e quente).
  `,
};

const t2: TheoryChallenge = {
  id: 'termp.3',
  type: 'theory',
  episode: 48,
  room: '48.3',
  title: 'Resposta a incidentes: o relógio está correndo',
  description: 'A partir da próxima sala, alguns laboratórios têm um cronômetro de verdade. Veja como eles funcionam antes de começar.',
  content: `
**Como funciona o cronômetro**
Um contador regressivo aparece no topo do laboratório. Se as tarefas forem concluídas antes de chegar a zero, o laboratório é um sucesso. Se o tempo acabar antes, aparece uma mensagem explicando o que "aconteceu" na história — e um botão para **Reiniciar** e tentar de novo, com o cronômetro do zero.

**O método de um respondente de incidentes**
Times reais de segurança (SOC, CSIRT) seguem mais ou menos esta ordem, e você vai repeti-la:
1. **Identificar**: o que está acontecendo? Leia os alertas e logs
2. **Conter**: pare a ameaça (encerrar um processo, por exemplo)
3. **Erradicar**: remova o que permite ela voltar (um arquivo de persistência, por exemplo)
4. **Verificar**: confirme que a ameaça se foi

**Indo rápido sem quebrar nada**
• Leia a missão até o fim antes de digitar o primeiro comando
• Prefira comandos que já sabe de cor a "tentar e ver o que acontece"
• Se travar, use uma dica — elas existem para isso, cronômetro correndo não é hora de orgulho

Agora é sua vez: no próximo laboratório, um servidor está sob ataque **agora**.
  `,
};

const lab2: LabChallenge = {
  id: 'termp.4',
  type: 'lab',
  episode: 48,
  room: '48.4',
  labId: 'term-contain',
  title: 'Lab 2 — Contenha o ataque',
  description: 'CRONOMETRADO. Você é o administrador da loja-srv, logado como root. O monitoramento acabou de disparar um alerta.',
  instructions: 'Leia a missão, investigue o log, encontre e encerre o processo malicioso, depois encontre e remova o arquivo que o mantinha ativo — tudo antes do tempo acabar.',
  difficulty: 'medium',
  hints: [
    'Comece lendo cat missao.txt. Depois investigue: grep FALHA /var/log/auth.log',
    'Liste os processos com ps. Um caminho em /tmp/.svc/ não é normal',
    'Encerre com kill <pid>. Depois procure o arquivo de persistência: find /etc/cron.d -name atualizacao',
    'Remova com rm /etc/cron.d/atualizacao',
  ],
  explanation: `
**O que aconteceu**
O log mostrava várias tentativas de login falhas: sinal de força bruta. O invasor conseguiu entrar e deixou um processo rodando de /tmp/.svc/agent.sh. Encerrar o processo para a ameaça na hora, mas sozinho não basta: o arquivo em /etc/cron.d fazia o sistema **reiniciar o ataque automaticamente**. Por isso o último passo (remover a persistência) é tão importante quanto o kill.

**Persistência, o conceito**
"Persistência" é como um invasor garante que continua tendo acesso mesmo depois de reiniciar a máquina ou de você encerrar o processo uma vez. Tarefas agendadas (como cron), serviços e entradas de inicialização são os lugares mais comuns onde ela se esconde.
  `,
};

const t3: TheoryChallenge = {
  id: 'termp.5',
  type: 'theory',
  episode: 48,
  room: '48.5',
  title: 'Reconhecimento rápido: indo direto ao ponto',
  description: 'No próximo laboratório os papéis se invertem: você ataca, contra o relógio. Relembre o essencial antes de começar.',
  content: `
**O que você já sabe (e vai usar de novo)**
• \`grep palavra arquivo\` acha rápido o que interessa, sem precisar ler tudo com \`cat\`
• \`ssh usuario@ip\` entra em outra máquina, se você tiver usuário e senha
• Depois de entrar por ssh, um segundo \`ssh\` pode levar a uma **outra** máquina ainda mais adiante (um "salto duplo"), e \`exit\` volta um passo

**Eficiência sob pressão**
Quando o tempo é curto, cada comando conta. Antes de digitar, pergunte-se: "o que eu realmente preciso saber agora?" Se você só precisa de uma senha dentro de um arquivo com várias linhas, \`grep\` é mais rápido do que \`cat\` e ler tudo.

**Reaproveitamento de senha: uma falha real e comum**
É muito comum uma pessoa usar a **mesma senha em mais de um lugar** por comodidade. Quando um invasor descobre a senha de um sistema, a primeira coisa que tenta é a mesma senha em outros sistemas. É exatamente isso que você vai explorar a seguir — e é exatamente por isso que reaproveitar senha é uma prática perigosa.
  `,
};

const lab3: LabChallenge = {
  id: 'termp.6',
  type: 'lab',
  episode: 48,
  room: '48.6',
  labId: 'term-twohop',
  title: 'Lab 3 — Dois saltos contra o relógio',
  description: 'CRONOMETRADO. Você é o hacker. O alvo final não é acessível diretamente: primeiro é preciso passar por um gateway.',
  instructions: 'Leia missao.txt, encontre a senha certa no arquivo de credenciais vazadas, entre no gateway, encontre a pista para o servidor interno e chegue até o arquivo com a flag.',
  difficulty: 'hard',
  hints: [
    'Não leia creds.txt inteiro: grep ops creds.txt já mostra a senha do gateway',
    'Entre no gateway: ssh ops@10.0.0.10, com a senha encontrada',
    'Dentro do gateway, leia notas.txt: o administrador reaproveitou a senha em outro servidor',
    'Entre no servidor interno com a senha encontrada e leia o arquivo de backup',
  ],
  explanation: `
**O caminho**
1. \`grep ops creds.txt\` achou a senha do gateway sem precisar ler as outras
2. \`ssh ops@10.0.0.10\` entrou no gateway
3. \`cat notas.txt\` revelou que a senha foi **reaproveitada** no servidor interno
4. \`ssh dbadmin@10.0.0.11\` entrou no servidor final, onde estava a flag

**Por que isso é realista**
Ataques em cadeia (um sistema comprometido levando a outro) são comuns quando existe reaproveitamento de senha ou confiança entre máquinas. É por isso que cada sistema deveria ter credenciais próprias, e por isso pentests testam justamente esse tipo de movimento lateral.
  `,
};

const t4: TheoryChallenge = {
  id: 'termp.7',
  type: 'theory',
  episode: 48,
  room: '48.7',
  title: 'Nem tudo que é estranho é a ameaça',
  description: 'No último laboratório deste módulo, existe mais de um processo fora do padrão. Só um é a ameaça real.',
  content: `
**O problema de matar tudo que parece estranho**
Em um servidor de verdade, processos com nomes ou caminhos incomuns às vezes são legítimos: backups, tarefas agendadas, ferramentas internas. Encerrar o processo errado por pressa pode **derrubar um serviço de verdade** e causar mais dano do que o próprio ataque.

**Como diferenciar sem chutar**
Não decida só pelo nome. Cruze evidências:
• O que a **missão** (ou um bilhete/aviso) já disse que é normal?
• Existe um **log de conexões** ou de rede mostrando para onde cada processo está se conectando?
• Um endereço de IP ou porta **fora do padrão** é uma pista mais forte do que um nome estranho

**Uma pista clássica: nomes de kernel falsos**
Processos genuínos do kernel do Linux aparecem no \`ps\` com nomes entre colchetes, como \`[kworker/0:2]\`, e não têm um arquivo de programa associado (rodam dentro do próprio kernel). Alguns malwares **copiam esse nome** de propósito para se camuflar na lista de processos. O nome sozinho não prova nada, mas combinado com outras evidências (como uma conexão de rede estranha) é um forte indício.

No próximo laboratório, use as pistas do log antes de decidir o que encerrar.
  `,
};

const lab4: LabChallenge = {
  id: 'termp.8',
  type: 'lab',
  episode: 48,
  room: '48.8',
  labId: 'term-two-threats',
  title: 'Lab 4 — Duas ameaças, uma real',
  description: 'CRONOMETRADO. Você está logado como root no financeiro-srv. O IDS disparou um alerta, mas existe mais de um processo fora do padrão.',
  instructions: 'Leia o alerta, examine o log de conexões para achar qual processo está se conectando para fora do padrão, confirme com ps e encerre SOMENTE a ameaça real.',
  difficulty: 'hard',
  hints: [
    'Comece lendo cat missao.txt: ele avisa qual processo NÃO mexer',
    'Examine as conexões: grep "fora do padrao" /var/log/conexoes.log',
    'O log mostra o PID da conexão suspeita. Confirme com ps o que é esse PID',
    'Encerre só o PID confirmado como ameaça: kill <pid>',
  ],
  explanation: `
**A investigação**
A missão já avisava: o backup-nightly.sh é legítimo. O log de conexões mostrava dois PIDs se conectando para fora: um para um IP interno na porta 443 (padrão, normal) e outro para um IP externo estranho, na porta 4444 (fora do padrão). A porta 4444 é famosa: é a porta padrão usada por ferramentas de teste de invasão para "shells reversos", então uma conexão saindo por ela é um forte sinal de comprometimento.

**Se você encerrou o processo errado**
Sem problema: o laboratório avisou a consequência (o backup ficou incompleto) e deixou a ameaça real continuar ativa, exatamente como aconteceria de verdade. É uma lição melhor aprendida assim do que só sendo dita.

**A lição**
Responder a incidentes exige **evidência**, não só instinto. Correlacionar um log de conexões com a lista de processos é uma técnica real usada por analistas de segurança todos os dias.
  `,
};

const tEnd: TheoryChallenge = {
  id: 'termp.9',
  type: 'theory',
  episode: 48,
  room: '48.9',
  title: 'Parabéns! Você já ataca e defende sob pressão',
  description: 'Você juntou terminal, investigação e tomada de decisão rápida. Isso é o dia a dia de quem trabalha com segurança de verdade.',
  content: `
**O que você aprendeu**
• Ver e encerrar processos: \`ps\` e \`kill\`
• O ciclo de resposta a incidentes: identificar, conter, erradicar, verificar
• Persistência: por que só encerrar um processo às vezes não é suficiente
• Reconhecimento eficiente sob pressão, com \`grep\` no lugar de ler tudo
• Movimento lateral por reaproveitamento de senha (dois saltos com ssh)
• Correlacionar evidências (log de conexões + processos) antes de agir

**Onde isso te leva**
No **Modo Hacker**, mais à frente no curso, você vai juntar tudo isso com SQL Injection, XSS e IDOR em um site simulado. E fora daqui, plataformas como **TryHackMe** (salas de "Incident Response" e "Blue Team") e **Hack The Box** têm exercícios de resposta a incidentes parecidos com estes, só que ainda mais completos.

**Um lembrete final**
Terminal com cronômetro é ótimo para treinar reação rápida, mas na vida real **calma e método** vencem pressa. O objetivo de praticar sob pressão é justamente treinar para ficar calmo quando ela existir de verdade.
  `,
};

export const terminalPressureChallenges: Challenge[] = [t0, t1, lab1, t2, lab2, t3, lab3, t4, lab4, tEnd];
