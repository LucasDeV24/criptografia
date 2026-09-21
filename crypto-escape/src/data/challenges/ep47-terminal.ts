import type { Challenge, LabChallenge, TheoryChallenge } from '@/types/challenge';

/**
 * Módulo "Terminal e Linux" (episódio 47).
 * Regras: só terminal (nada de código de programação misturado) e nenhum comando
 * aparece em um laboratório antes de ser ensinado na teoria anterior.
 */

const t0: TheoryChallenge = {
  id: 'term.0',
  type: 'theory',
  episode: 47,
  room: '47.0',
  title: 'O que é o terminal e por que você precisa dele',
  description: 'Este módulo é separado da programação: aqui você só usa o terminal. Vamos começar entendendo o que ele é.',
  content: `
**O que é o terminal?**
O terminal (ou **linha de comando**) é um jeito de controlar o computador **escrevendo comandos** em vez de clicar em ícones. Você digita uma ordem, aperta Enter e o computador responde com texto.

**Por que aprender?**
• Quase todo servidor do mundo é controlado pelo terminal, sem janelas nem mouse
• Desenvolvedores o usam todo dia: rodar programas, ver logs, versionar código
• Em cibersegurança, praticamente todo ataque e toda defesa passam por ele: investigar um servidor, ler logs, achar arquivos suspeitos

Não há nada de mágico: são as mesmas pastas e arquivos que você já conhece, sem os ícones.

**Como ler o prompt**
\`\`\`
aluno@aluno-pc:~$
\`\`\`
• \`aluno\` → o **usuário** que está usando o terminal
• \`aluno-pc\` → o **nome da máquina**
• \`~\` → a **pasta atual** (o til é a sua pasta pessoal)
• \`$\` → "pronto para receber um comando" (um \`#\` no lugar indica o superusuário, o **root**)

**A anatomia de um comando**
\`\`\`
ls -l projetos
\`\`\`
• \`ls\` → o **comando** (o que fazer)
• \`-l\` → uma **opção** (flag), sempre começa com \`-\` e muda o comportamento
• \`projetos\` → o **argumento** (sobre o quê)
Os pedaços são separados por espaço. **Maiúsculas e minúsculas importam**: \`ls\` funciona, \`LS\` não.

**Dicas de sobrevivência**
• As setas ↑ e ↓ trazem os comandos anteriores de volta
• O terminal **não pede confirmação**: comandos como \`rm\` apagam de verdade, sem lixeira
• Dúvida? Digite \`help\` nos laboratórios daqui

**No seu computador de verdade**
• **Windows:** o PowerShell já vem instalado, mas vários comandos têm o mesmo nome e funcionam diferente. Para usar os mesmos comandos do Linux, instale o **WSL** (Ubuntu dentro do Windows)
• **macOS:** abra o app Terminal
• **Linux:** abra o terminal da sua distribuição

**Aqui você treina sem risco**
Os laboratórios usam um terminal **simulado**: nada que você fizer estraga alguma coisa, e o botão **Reiniciar** volta tudo ao começo.
  `,
};

const t1: TheoryChallenge = {
  id: 'term.1',
  type: 'theory',
  episode: 47,
  room: '47.1',
  title: 'Onde estou? pwd e ls',
  description: 'Os dois primeiros comandos que todo mundo aprende: saber onde você está e o que há por perto.',
  content: `
**pwd: em qual pasta estou?**
\`pwd\` (print working directory) mostra o caminho da pasta em que você está.
\`\`\`
aluno@aluno-pc:~$ pwd
/home/aluno
\`\`\`

**ls: o que há aqui?**
\`ls\` (list) lista os arquivos e pastas da pasta atual. As pastas aparecem com uma \`/\` no fim.
\`\`\`
aluno@aluno-pc:~$ ls
Documentos/  Downloads/  leiame.txt
\`\`\`

**Arquivos ocultos**
Nomes que começam com **ponto** (como \`.bashrc\`) ficam escondidos do \`ls\` comum. Para vê-los, use a opção \`-a\` (all):
\`\`\`
aluno@aluno-pc:~$ ls -a
.bashrc  .config/  Documentos/  Downloads/  leiame.txt
\`\`\`
Configurações, chaves e históricos costumam ficar em arquivos ocultos, por isso quem investiga um sistema **sempre** usa \`ls -a\`.

**O mapa do Linux (não precisa decorar)**
Tudo parte da **raiz**, escrita \`/\`:
• \`/home\` → as pastas pessoais dos usuários
• \`/etc\` → arquivos de configuração
• \`/var/log\` → os registros (logs) do sistema
  `,
};

const lab1: LabChallenge = {
  id: 'term.2',
  type: 'lab',
  episode: 47,
  room: '47.2',
  labId: 'term-nav',
  title: 'Lab 1 — Onde estou?',
  description: 'Primeiro contato com o terminal: descubra onde você está e o que existe na sua pasta.',
  instructions: 'Complete as três tarefas da lista: pwd, ls e ls -a.',
  difficulty: 'easy',
  hints: [
    'Digite pwd e aperte Enter',
    'Depois digite ls. Repare que os arquivos ocultos não aparecem',
    'Para ver os ocultos, use ls -a (com um espaço antes do -a)',
  ],
  explanation: `
**O que você fez**
\`pwd\` disse onde você estava, \`ls\` listou o conteúdo e \`ls -a\` revelou os arquivos ocultos (.bashrc e a pasta .config), que o ls comum esconde.

**Na prática:** ao investigar qualquer computador, essa é a primeira rotina: onde estou, o que há aqui e o que está escondido.
  `,
};

const t2: TheoryChallenge = {
  id: 'term.3',
  type: 'theory',
  episode: 47,
  room: '47.3',
  title: 'Navegando: cd e caminhos',
  description: 'Como se mover entre as pastas e o que são caminhos absolutos e relativos.',
  content: `
**cd: entrar em uma pasta**
\`cd\` (change directory) muda a pasta em que você está.
\`\`\`
aluno@aluno-pc:~$ cd projetos
aluno@aluno-pc:~/projetos$
\`\`\`
O prompt muda para mostrar a nova pasta.

**Caminho absoluto × relativo**
• **Absoluto:** começa com \`/\` e mostra o caminho completo a partir da raiz. Funciona de **qualquer lugar**: \`cd /etc\`
• **Relativo:** parte da pasta **em que você está**: se estiver em home, \`cd projetos\` entra em projetos, e depois \`cd site\` entra em site

Você pode encadear níveis: \`cd projetos/site/imagens\`.

**Atalhos importantes**
• \`..\` → a pasta **de cima**: \`cd ..\` sobe um nível
• \`.\` → a pasta **atual**
• \`~\` → a **sua pasta pessoal**: \`cd ~\` volta para ela de qualquer lugar (só \`cd\`, sem nada, também funciona)
• \`/\` → a **raiz** do sistema

**Método para não se perder**
1. \`pwd\` para saber onde você está
2. \`ls\` para ver as pastas disponíveis
3. \`cd\` para entrar

Se errar o nome, o terminal avisa: "Arquivo ou diretório inexistente". É só conferir com \`ls\` e tentar de novo.
  `,
};

const lab2: LabChallenge = {
  id: 'term.4',
  type: 'lab',
  episode: 47,
  room: '47.4',
  labId: 'term-paths',
  title: 'Lab 2 — Navegando pelas pastas',
  description: 'Entre em pastas com caminhos relativos e absolutos e volte para casa.',
  instructions: 'Complete as quatro tarefas: entrar em projetos/site, depois em imagens, ir para /etc e voltar com cd ~.',
  difficulty: 'easy',
  hints: [
    'Você começa na pasta pessoal. Use ls para ver que existe a pasta projetos e entre com cd projetos',
    'Dentro de projetos há a pasta site. Depois, dentro de site, há a pasta imagens',
    '/etc é um caminho absoluto: cd /etc funciona de qualquer lugar. Para voltar: cd ~',
  ],
  explanation: `
**O que você fez**
Caminhos relativos (cd projetos, cd site, cd imagens) partem de onde você está. O caminho absoluto (cd /etc) parte da raiz e funciona de qualquer lugar. O cd ~ trouxe você de volta para casa.

**Na prática:** em servidores reais você vai ir de /var/log a /etc a /home o tempo todo. Saber os dois tipos de caminho evita se perder.
  `,
};

const t3: TheoryChallenge = {
  id: 'term.5',
  type: 'theory',
  episode: 47,
  room: '47.5',
  title: 'Lendo arquivos: cat, head, tail e wc',
  description: 'Como ler o conteúdo de arquivos, inclusive os enormes, como logs.',
  content: `
**cat: mostrar o arquivo**
\`cat arquivo\` imprime o conteúdo inteiro na tela. (O nome vem de "concatenar".)
\`\`\`
aluno@aluno-pc:~$ cat README.txt
Este é o servidor de estudos.
\`\`\`

**Arquivos grandes: só um pedaço**
Um log pode ter milhares de linhas. Não faz sentido despejar tudo na tela:
• \`head arquivo\` mostra o **começo** (as 10 primeiras linhas)
• \`tail arquivo\` mostra o **fim** (as 10 últimas)
• Com \`-n\` você escolhe quantas: \`head -n 3 arquivo\` mostra só 3

Em logs, as linhas **mais recentes ficam no fim**. Por isso \`tail\` é tão usado para ver "o que aconteceu agora".

**wc: contar**
\`wc\` (word count) conta coisas. A opção \`-l\` conta **linhas**:
\`\`\`
aluno@aluno-pc:~$ wc -l acesso.log
12 acesso.log
\`\`\`
Outras opções: \`-w\` conta palavras e \`-c\` conta caracteres.

**Logs: cada linha é um evento**
Em um log de acesso, cada linha registra uma coisa que aconteceu: quem, quando, se deu certo. Contar linhas ou ler o começo e o fim já dá uma visão rápida do arquivo.
  `,
};

const lab3: LabChallenge = {
  id: 'term.6',
  type: 'lab',
  episode: 47,
  room: '47.6',
  labId: 'term-read',
  title: 'Lab 3 — Lendo arquivos e logs',
  description: 'Leia um README e explore um log de acessos sem despejar tudo na tela.',
  instructions: 'Complete as quatro tarefas: ler o README, contar as linhas do log e ver o começo e o fim dele.',
  difficulty: 'easy',
  hints: [
    'Use ls para ver os arquivos. O README chama-se README.txt (com letras maiúsculas)',
    'Contar linhas: wc -l acesso.log',
    'Começo e fim do log: head -n 3 acesso.log e tail -n 3 acesso.log',
  ],
  explanation: `
**O que você fez**
cat leu o arquivo curto por inteiro. Para o log, wc -l contou as linhas e head e tail mostraram só as pontas.

**Na prática:** ninguém lê um log inteiro. O analista usa essas quatro ferramentas para ter rapidamente uma visão geral e ver os eventos mais recentes.
  `,
};

const t4: TheoryChallenge = {
  id: 'term.7',
  type: 'theory',
  episode: 47,
  room: '47.7',
  title: 'Criando e organizando: mkdir, touch, echo, cp, mv e rm',
  description: 'Como criar pastas e arquivos, copiar, mover, renomear e apagar, com muito cuidado.',
  content: `
**Criar pastas e arquivos**
• \`mkdir nome\` cria uma **pasta**. Com \`-p\` cria vários níveis de uma vez: \`mkdir -p a/b/c\`
• \`touch arquivo\` cria um **arquivo vazio**

**Escrever em um arquivo: echo e o símbolo >**
\`echo "texto"\` apenas imprime o texto na tela. Com o símbolo \`>\` o texto vai para dentro de um arquivo em vez de aparecer:
\`\`\`
aluno@aluno-pc:~$ echo "aprender terminal" > notas.txt
\`\`\`
Atenção: o \`>\` **cria** o arquivo, ou **sobrescreve** tudo o que havia nele. Para **acrescentar** ao fim, use \`>>\`.

**Copiar, mover e renomear**
• \`cp origem destino\` **copia**: \`cp notas.txt copia.txt\` (para pastas, use \`cp -r\`)
• \`mv origem destino\` **move ou renomeia**:
  - \`mv velho.txt novo.txt\` renomeia
  - \`mv notas.txt projeto/\` move para dentro da pasta projeto

**Apagar: rm (com muito cuidado!)**
• \`rm arquivo\` apaga um arquivo
• \`rm -r pasta\` apaga uma pasta e tudo o que há nela

**O terminal não tem lixeira e não pede confirmação.** O que for apagado com \`rm\` se foi. Regras de ouro:
1. Confira o que vai apagar com \`ls\` antes
2. Leia o comando duas vezes antes de apertar Enter
3. Desconfie de qualquer comando com \`rm -r\` copiado da internet

Depois de mexer, use \`ls\` para conferir o resultado.
  `,
};

const lab4: LabChallenge = {
  id: 'term.8',
  type: 'lab',
  episode: 47,
  room: '47.8',
  labId: 'term-files',
  title: 'Lab 4 — Organizando um projeto',
  description: 'Crie uma pasta, escreva em um arquivo, copie, mova e apague. Aqui você pode errar sem medo.',
  instructions: 'Complete as cinco tarefas da lista. Dica: use ls para conferir cada passo.',
  difficulty: 'medium',
  hints: [
    'Crie a pasta com mkdir projeto. Depois grave o texto: echo "aprender terminal" > projeto/notas.txt',
    'Copie com cp projeto/notas.txt projeto/notas-backup.txt e mova com mv ideias.txt projeto/',
    'Para apagar o rascunho: rm rascunho.txt. Se errar algo, use o botão Reiniciar',
  ],
  explanation: `
**O que você fez**
mkdir criou a pasta, echo com > escreveu em um arquivo, cp fez uma cópia de segurança, mv trouxe o arquivo ideias para dentro da pasta e rm apagou o que não servia mais.

**Na prática:** desenvolvedores organizam projetos assim todos os dias, e a mesma rotina (copiar antes de mexer) protege contra acidentes.

**Segurança:** rm apaga sem volta. Ataques de "wiper" fazem exatamente isso em escala; por isso existem backups e permissões restritas.
  `,
};

const t5: TheoryChallenge = {
  id: 'term.9',
  type: 'theory',
  episode: 47,
  room: '47.9',
  title: 'Procurando: find e grep',
  description: 'As duas ferramentas de busca mais importantes: achar arquivos e achar texto dentro de arquivos.',
  content: `
**find: procurar arquivos pelo nome**
\`\`\`
find / -name banco.conf
\`\`\`
• \`/\` → onde começar a procurar (aqui, no computador inteiro)
• \`-name\` → procurar pelo nome
• \`banco.conf\` → o nome do arquivo

Você pode usar o curinga \`*\`: \`find / -name "*.conf"\` acha todos os arquivos terminados em .conf.

**grep: procurar texto dentro de arquivos**
\`grep palavra arquivo\` mostra só as **linhas que contêm** a palavra:
\`\`\`
aluno@aluno-pc:~$ grep ERRO sistema.log
10:02 ERRO falha ao conectar no banco
10:09 ERRO tempo esgotado
\`\`\`

**Opções do grep que você vai usar sempre**
• \`-i\` → **ignora** maiúsculas e minúsculas (acha "ERRO", "Erro" e "erro")
• \`-n\` → mostra o **número da linha**
• \`-c\` → só **conta** quantas linhas combinam
• \`-v\` → **inverte**: mostra as linhas que NÃO contêm a palavra
• \`-r\` → procura **dentro de uma pasta inteira**

**Por que é a ferramenta número 1 do analista**
Em segurança você procura: senhas esquecidas em arquivos de configuração, IPs suspeitos em logs, mensagens de erro de um ataque. Um \`grep\` bem escolhido acha em segundos o que levaria horas de leitura.
  `,
};

const lab5: LabChallenge = {
  id: 'term.10',
  type: 'lab',
  episode: 47,
  room: '47.10',
  labId: 'term-search',
  title: 'Lab 5 — Caçando informações',
  description: 'Ache um arquivo de configuração pelo computador e investigue os erros de um log.',
  instructions: 'Complete as cinco tarefas: achar o banco.conf, ver a porta dele e investigar o log do sistema com grep.',
  difficulty: 'medium',
  hints: [
    'Leia a missão com cat missao.txt. Para achar o arquivo: find / -name banco.conf',
    'O find mostra o caminho completo. Use esse caminho no grep: grep porta /caminho/do/banco.conf',
    'O log fica em /var/log/sistema.log. Tente grep ERRO, depois grep -n ERRO e por fim grep -i erro (repare que o -i acha uma linha a mais)',
  ],
  explanation: `
**O que você fez**
find localizou o arquivo, grep extraiu a linha da porta sem você precisar abrir o arquivo todo, e as opções -n e -i deram o número das linhas e ignoraram a diferença entre maiúsculas e minúsculas.

**Repare no -i:** o log tinha "ERRO" e também "Erro". Sem -i, uma das linhas ficava de fora. Em uma investigação, perder uma linha assim pode esconder a pista.
  `,
};

const t6: TheoryChallenge = {
  id: 'term.11',
  type: 'theory',
  episode: 47,
  room: '47.11',
  title: 'Combinando comandos: pipes e redirecionamento',
  description: 'O superpoder do terminal: ligar comandos pequenos para fazer análises grandes.',
  content: `
**O pipe: |**
O símbolo \`|\` (pipe) pega a **saída** de um comando e a entrega como **entrada** do próximo:
\`\`\`
grep FALHA acesso.log | wc -l
\`\`\`
Lendo da esquerda para a direita: o \`grep\` acha as linhas com FALHA e o \`wc -l\` conta quantas são. Resultado: o número de falhas.

**Ferramentas para combinar**
• \`sort\` → **ordena** as linhas (\`-r\` inverte, \`-n\` ordena como números)
• \`uniq\` → junta linhas **iguais que estão vizinhas** (\`-c\` mostra quantas vezes cada uma apareceu). Por isso o \`sort\` vem **antes** do \`uniq\`: ele deixa as iguais lado a lado
• \`cut\` → **recorta uma coluna**: \`cut -d' ' -f4\` significa "separe por espaço (\`-d\`) e me dê a coluna 4 (\`-f\`)"
• \`wc -l\` → conta linhas

**Redirecionamento: > e >>**
Em vez de mostrar o resultado na tela, você o **grava em um arquivo**:
• \`>\` cria o arquivo (ou sobrescreve)
• \`>>\` acrescenta ao fim
\`\`\`
grep FALHA acesso.log > falhas.txt
\`\`\`

**Exemplo completo: quais IPs mais erraram?**
\`\`\`
cut -d' ' -f4 falhas.txt | sort | uniq -c
\`\`\`
1. \`cut\` extrai só a coluna dos IPs
2. \`sort\` coloca os IPs iguais lado a lado
3. \`uniq -c\` conta cada um

Um IP com muitas falhas de login é sinal clássico de **ataque de força bruta**.

**A filosofia**
Cada comando faz uma coisa pequena. Combinados, resolvem problemas grandes. Nos laboratórios daqui, depois de um pipe funcionam grep, wc, sort, uniq, head, tail e cut.
  `,
};

const lab6: LabChallenge = {
  id: 'term.12',
  type: 'lab',
  episode: 47,
  room: '47.12',
  labId: 'term-pipes',
  title: 'Lab 6 — Analisando um log de ataques',
  description: 'Descubra quantas tentativas de login falharam e de quais IPs elas vieram.',
  instructions: 'Complete as três tarefas: contar as falhas com um pipe, salvar as falhas em falhas.txt e contar quantas falhas cada IP teve.',
  difficulty: 'medium',
  hints: [
    'Cada linha do log é: data hora STATUS ip usuario. Para contar: grep FALHA acesso.log | wc -l',
    'Para salvar: grep FALHA acesso.log > falhas.txt',
    'Os IPs estão na coluna 4: cut -d\' \' -f4 falhas.txt | sort | uniq -c',
  ],
  explanation: `
**O que você descobriu**
O IP 203.0.113.5 falhou muito mais vezes que os outros, tentando usuários como admin e root. É a assinatura de um **ataque de força bruta**.

**Na prática:** essa análise de três comandos é feita todos os dias por analistas de SOC. A resposta seria bloquear o IP no firewall e ativar limite de tentativas.
  `,
};

const t7: TheoryChallenge = {
  id: 'term.13',
  type: 'theory',
  episode: 47,
  room: '47.13',
  title: 'Permissões: ls -l, rwx e chmod',
  description: 'Todo arquivo tem dono e permissões. Entenda como ler e mudar isso.',
  content: `
**Dono e permissões**
Cada arquivo tem um **dono** e três permissões possíveis:
• **r** (read) → ler
• **w** (write) → escrever/alterar
• **x** (execute) → executar (rodar como programa)

**Lendo o ls -l**
\`ls -l\` (formato longo) mostra as permissões:
\`\`\`
-rw-r--r-- aluno   120 notas.txt
drwxr-xr-x aluno  4096 projetos/
\`\`\`
• O **primeiro caractere** é o tipo: \`-\` arquivo, \`d\` pasta
• Depois vêm **três trios**: o do **dono**, o do **grupo** e o dos **outros**
• \`rw-r--r--\` → o dono lê e escreve; grupo e outros só leem

**Executando um script**
Um script é um arquivo com comandos. Para rodá-lo: \`./backup.sh\` (o \`./\` quer dizer "o arquivo desta pasta"). Sem a permissão **x** aparece "Permissão negada".

**chmod: mudar as permissões**
• \`chmod +x arquivo\` dá permissão de **execução**
• \`chmod -x arquivo\` tira
• Também dá para usar **números**: 4 = ler, 2 = escrever, 1 = executar, somados. \`chmod 644 arquivo\` = dono lê e escreve (6), os demais só leem (4). \`chmod 755\` = rwxr-xr-x. \`chmod 600\` = só o dono.

**Por que isso importa em segurança**
• **Menor privilégio:** cada arquivo deve ter só a permissão de que precisa
• Dar permissão total a todo mundo (\`chmod 777\`) é uma falha comum e perigosa
• Chaves privadas (como as do SSH) precisam ser \`600\`, ou o sistema as recusa
• O usuário **root** ignora as permissões: por isso comandos de administrador exigem cuidado
  `,
};

const lab7: LabChallenge = {
  id: 'term.14',
  type: 'lab',
  episode: 47,
  room: '47.14',
  labId: 'term-perm',
  title: 'Lab 7 — O script que não roda',
  description: 'Existe um script de backup, mas ele se recusa a rodar. Descubra o motivo e conserte.',
  instructions: 'Complete as quatro tarefas: ver as permissões, tentar rodar o script, dar permissão de execução e rodar com sucesso.',
  difficulty: 'medium',
  hints: [
    'Veja as permissões com ls -l. O backup.sh está como -rw-r--r--: falta o x',
    'Tente rodar com ./backup.sh e leia a mensagem de erro',
    'Dê a permissão com chmod +x backup.sh e rode de novo: ./backup.sh',
  ],
  explanation: `
**O que aconteceu**
O arquivo tinha permissão de ler e escrever (rw-), mas não de executar. Por isso o sistema recusou. O chmod +x acrescentou o x e o script pôde rodar.

**A moral de segurança:** o sistema só executa o que tem permissão x, o que impede que qualquer arquivo baixado rode sozinho. Atacantes tentam justamente dar permissão de execução ao que baixam; defensores monitoram isso.
  `,
};

const tEnd: TheoryChallenge = {
  id: 'term.15',
  type: 'theory',
  episode: 47,
  room: '47.15',
  title: 'Parabéns! Você já sabe usar o terminal',
  description: 'Você aprendeu o essencial para trabalhar com servidores e investigar sistemas.',
  content: `
**O que você aprendeu**
• Onde você está e o que há por perto: \`pwd\`, \`ls\`, \`ls -a\`
• Navegar com \`cd\`, caminhos absolutos e relativos, \`..\` e \`~\`
• Ler arquivos e logs: \`cat\`, \`head\`, \`tail\`, \`wc\`
• Criar e organizar: \`mkdir\`, \`echo >\`, \`cp\`, \`mv\`, \`rm\`
• Procurar: \`find\` e \`grep\` (com \`-i\`, \`-n\`, \`-c\`, \`-v\`, \`-r\`)
• Combinar comandos: pipes \`|\`, \`sort\`, \`uniq\`, \`cut\` e redirecionamento \`>\`
• Permissões: \`ls -l\`, \`rwx\` e \`chmod\`

**Como isso se conecta ao resto do curso**
Nos módulos de cibersegurança você vai analisar logs, procurar credenciais expostas e entender ataques a sistemas: tudo com o que você acabou de aprender. No **Modo Hacker**, no final do curso, você usará o terminal junto com \`nmap\` e \`ssh\` para invadir um servidor de treino.

**Para continuar aprendendo**
• Instale o terminal no seu computador (WSL, no Windows) e refaça estes comandos de verdade
• Próximos assuntos: **Git** (versionar código), **SSH** e redes, e **scripts em shell**. Eles ainda estão em construção neste curso e aparecem como "Em breve" na página de trilhas.

Agora volte à trilha: o próximo módulo é o de **Cibersegurança**.
  `,
};

export const terminalChallenges: Challenge[] = [t0, t1, lab1, t2, lab2, t3, lab3, t4, lab4, t5, lab5, t6, lab6, t7, lab7, tEnd];
