import type { Challenge, LabChallenge, TheoryChallenge } from '@/types/challenge';

/**
 * Módulo "Active Directory: fundamentos" (episódio 50).
 * Reaproveita comandos já ensinados (ssh, cat) e ensina só um comando novo: net.
 */

const t0: TheoryChallenge = {
  id: 'ad.0',
  type: 'theory',
  episode: 50,
  room: '50.0',
  title: 'O que é Active Directory',
  description: 'A maioria das empresas do mundo usa isso para organizar computadores e contas. É também um dos alvos favoritos em um pentest.',
  content: `
**O problema que o Active Directory resolve**
Imagine uma empresa com 2 mil funcionários e 500 computadores. Criar uma conta separada em cada computador para cada pessoa seria inviável. O **Active Directory** (AD), da Microsoft, resolve isso: um cadastro **central** de usuários, computadores e permissões, que todos os computadores da empresa consultam.

**As peças principais**
• **Domínio** → o "território" administrado (ex.: a empresa CORP)
• **Domain Controller (DC)** → o servidor que guarda o cadastro central e responde pelas permissões de todo o domínio
• **Usuário** → uma conta de pessoa ou de serviço
• **Grupo** → um conjunto de usuários, usado para dar permissão a todos de uma vez (mais fácil que configurar um por um)
• **OU (Unidade Organizacional)** → uma "pasta" para organizar usuários e computadores (não vamos usar isso na prática aqui, mas é bom saber que existe)

**Por que grupos importam tanto**
Em vez de dar uma permissão diretamente a 50 pessoas, um administrador cria um grupo, dá a permissão ao grupo, e coloca as 50 pessoas dentro dele. Prático — mas, como você vai ver, também uma fonte comum de erros de configuração.

**Por que isso é um alvo tão comum**
Se um atacante compromete o Domain Controller (ou uma conta com privilégios altos), ele controla, na prática, a rede inteira da empresa. Por isso o Active Directory é um dos focos centrais de pentests corporativos — e é o motivo de existir uma carreira inteira em volta de testá-lo com segurança.
  `,
};

const t1: TheoryChallenge = {
  id: 'ad.1',
  type: 'theory',
  episode: 50,
  room: '50.1',
  title: 'Enumerando o domínio: o comando net',
  description: 'Antes de explorar qualquer coisa, é preciso enxergar o que existe no domínio.',
  content: `
**net: consultando o domínio**
No terminal deste módulo, o comando \`net\` consulta o diretório do domínio (na vida real, ferramentas equivalentes em Linux incluem \`ldapsearch\`, \`rpcclient\` e \`crackmapexec\`/\`nxc\` — aqui usamos uma versão simplificada, no estilo do comando \`net\` do Windows, para focar no conceito).

**Listando usuários**
\`\`\`
net user
\`\`\`
Mostra os nomes de todas as contas do domínio.

**Detalhes de um usuário**
\`\`\`
net user mferreira
\`\`\`
Mostra o **nome**, a **descrição** e os **grupos** daquela conta.

**Atenção ao campo "descrição"**
Esse campo é texto livre — administradores o usam para anotar cargo, setor, observações. E, com uma frequência preocupante, **anotam senhas temporárias ali por engano**, esquecendo de apagar depois. É um erro real e documentado, e um dos primeiros lugares que quem faz pentest de AD olha.

**Listando e inspecionando grupos**
\`\`\`
net group
net group "Domain Admins"
\`\`\`
O segundo comando mostra os **membros** daquele grupo. Repare que um grupo pode ter tanto usuários quanto **outros grupos** como membros — vamos explorar por que isso importa na próxima sala.
  `,
};

const lab1: LabChallenge = {
  id: 'ad.2',
  type: 'lab',
  episode: 50,
  room: '50.2',
  labId: 'term-ad-enum',
  title: 'Lab 1 — Enumerando o domínio CORP',
  description: 'Você tem uma conexão de leitura ao domínio. Encontre a conta com informação sensível demais na descrição.',
  instructions: 'Liste os usuários, liste os grupos, e inspecione as contas até achar uma com senha vazada na descrição.',
  difficulty: 'easy',
  hints: [
    'net user lista todos os nomes de usuário do domínio',
    'net group lista todos os grupos',
    'Inspecione cada usuário com net user <nome> até achar um com senha na descrição',
  ],
  explanation: `
**O que você encontrou**
A conta mferreira tinha, no campo de descrição, uma senha temporária deixada ali por engano: "Backup temporário enquanto a TI não libera o acesso normal: Outono2024!".

**Por que isso é tão comum**
Descrições são só texto livre, sem nenhuma trava. Um administrador com pressa anota ali "pra lembrar depois" — e esquece de apagar. Ferramentas de enumeração de AD (como o BloodHound, no mundo real) frequentemente caçam justamente esse tipo de vazamento acidental em massa, revisando todas as contas de uma vez.
  `,
};

const t2: TheoryChallenge = {
  id: 'ad.3',
  type: 'theory',
  episode: 50,
  room: '50.3',
  title: 'Grupos aninhados: o perigo de heranças de permissão',
  description: 'Um grupo "inofensivo" pode, sem ninguém perceber, dar acesso de administrador.',
  content: `
**O que é um grupo aninhado**
É quando um grupo é **membro de outro grupo**. Quem está no grupo de dentro herda automaticamente as permissões do grupo de fora — mesmo sem saber.

**Um exemplo comum (e perigoso)**
Um administrador cria o grupo "Contas de Backup" para automatizar rotinas de cópia de segurança. Meses depois, alguém precisa que esse processo também acesse um sistema restrito, e a forma mais rápida é colocar "Contas de Backup" dentro do grupo "Domain Admins" — "só por enquanto". Isso nunca é revertido.

Resultado: **qualquer conta** adicionada depois a "Contas de Backup" (mesmo uma conta temporária, criada só para testes) ganha, sem ninguém perceber, os mesmos privilégios de um administrador de domínio.

**Por que isso passa despercebido**
Olhando só a lista de membros de "Domain Admins", ninguém vê o nome da pessoa — vê só o nome de um grupo. É preciso verificar **também** quem está dentro desse grupo para enxergar a cadeia completa. Auditorias que checam só "quem está direto no grupo de admins" deixam passar esse tipo de escalonamento.

**Como isso é abusado**
Quem faz pentest de AD mapeia essas cadeias de grupos (o BloodHound, mencionado antes, existe basicamente para automatizar essa busca) e frequentemente encontra caminhos assim: uma conta comum, sem nada de especial, que por uma cadeia de 2 ou 3 grupos chega a ter controle total do domínio.

No próximo laboratório, você vai seguir exatamente esse caminho.
  `,
};

const lab2: LabChallenge = {
  id: 'ad.4',
  type: 'lab',
  episode: 50,
  room: '50.4',
  labId: 'term-ad-escalate',
  title: 'Lab 2 — O grupo aninhado',
  description: 'Você já tem a credencial vazada. Descubra até onde ela realmente leva.',
  instructions: 'Entre na estação com a credencial encontrada, investigue os grupos dela e siga o caminho até o controlador de domínio.',
  difficulty: 'hard',
  hints: [
    'Entre na estação: ssh mferreira@10.0.0.40, com a senha Outono2024!',
    'Veja o grupo dela: net group "Contas de Backup". Depois veja net group "Domain Admins"',
    'Repare: "Contas de Backup" é, ela mesma, membro de "Domain Admins" — um grupo aninhado',
    'Leia leia-se.txt e entre no controlador de domínio com a MESMA credencial: ssh mferreira@10.0.0.30',
  ],
  explanation: `
**A cadeia completa**
1. mferreira parecia uma conta comum, só membro de "Contas de Backup"
2. "Contas de Backup" é, por sua vez, membro de "Domain Admins"
3. Ou seja: mferreira tem, na prática, privilégios de administrador de domínio — sem que o nome dela apareça em nenhum lugar óbvio
4. Isso bastou para acessar o controlador de domínio diretamente

**A lição principal**
Uma conta "não importante" pode ser, na prática, uma conta crítica, por causa de uma cadeia de grupos que ninguém revisou. Auditorias de segurança de AD precisam olhar a cadeia completa de heranças, não só quem está listado diretamente em um grupo sensível.
  `,
};

const tEnd: TheoryChallenge = {
  id: 'ad.5',
  type: 'theory',
  episode: 50,
  room: '50.5',
  title: 'Parabéns! Você entende o básico de Active Directory',
  description: 'Você viu, na prática, por que o AD é um dos alvos favoritos em pentests corporativos.',
  content: `
**O que você aprendeu**
• O que é um domínio, um Domain Controller, usuários e grupos
• Enumerar um domínio com \`net user\` e \`net group\`
• Por que o campo de descrição é um vazamento clássico de credenciais
• Como grupos aninhados escondem privilégios administrativos em contas aparentemente comuns

**O que fica para depois**
Este módulo cobriu só os fundamentos. Um pentest de AD de verdade envolve técnicas bem mais avançadas: Kerberoasting (extrair e quebrar hashes de contas de serviço), ataques de delegação, Golden/Silver Ticket, e ferramentas como BloodHound e Mimikatz. São assuntos avançados demais para simular aqui com responsabilidade — a base que você aprendeu é o que permite entender esse próximo nível quando chegar a hora.

**Onde praticar de verdade**
Hack The Box e TryHackMe têm trilhas inteiras dedicadas a AD, com ambientes reais (Windows Server de verdade) para praticar essas técnicas mais avançadas com segurança e legalidade.

**Próximo módulo**
De volta à trilha principal de Cibersegurança, agora com uma base de redes e AD que vai te ajudar a entender o resto do curso.
  `,
};

export const activeDirectoryChallenges: Challenge[] = [t0, t1, lab1, t2, lab2, tEnd];
