# Guia de conteúdo — como criar exercícios profissionais

Este guia explica como escrever exercícios no formato novo (testes de função) e qual é o plano para
levar o resto do curso a esse padrão.

## 1. Por que testes de função?

O formato antigo comparava só o texto impresso (`expectedOutput`). Isso permite "resolver" com
`console.log("Acesso permitido")` sem programar nada, e o aluno não pratica casos de borda.

No formato novo o aluno escreve uma **função**. O sistema a chama com vários casos (visíveis e
**ocultos**) e compara o **valor retornado**. O aluno só passa se a lógica estiver certa.

## 2. Anatomia de um exercício

```ts
const code: CodeChallenge = {
  id: 'cond.4',                 // NÃO mude ids existentes: o progresso do aluno usa o id
  type: 'code',
  episode: 1,
  room: '1.4',
  title: 'Verificando uma senha',
  description: 'Contexto do problema…',
  instructions: 'O que a função deve devolver.',
  languages: ['javascript', 'python'],
  starterCode: { javascript: '…', python: '…' },   // esqueleto da função
  tests: {
    fn: { javascript: 'verificarSenha', python: 'verificar_senha' },
    cases: [
      { name: 'senha certa', args: ['1234', '1234'], expected: 'Acesso permitido' },
      { name: 'espaço sobrando', args: ['1234 ', '1234'], expected: 'Acesso negado', hidden: true },
    ],
  },
  solution: { javascript: '…', python: '…' },     // liberada após acertar ou 3 erros
  explanation: '…',              // só aparece DEPOIS de resolver
  hints: ['dica 1 (leve)', 'dica 2', 'dica 3 (quase a resposta)'],
  difficulty: 'easy',
};
```

## 3. Regras para escrever bons testes

1. **`args` e `expected` precisam ser JSON**: texto, número, booleano, lista, objeto ou `null`.
2. **O mesmo `expected` vale para JavaScript e Python.** Evite casos em que as linguagens divergem:
   - `"10" == 10` (JS é `true`, Python é `False`)
   - `.length` de texto com acento/emoji (JS conta UTF-16, Python conta caracteres). Use ASCII para tamanhos.
   - Ordem de chaves e `undefined`/`None`.
3. **Nomes de função:** camelCase no JavaScript, snake_case no Python (`fn` tem os dois).
4. **Casos visíveis (2 a 4):** mostram o formato e são o "enunciado por exemplos".
5. **Casos ocultos (3 a 6):** limites (`>=` vs `>`), vazio, zero, maiúsculas/minúsculas, espaços, ordem das regras.
   São o coração pedagógico: ensinam a pensar em casos de borda.
6. **Bloqueie respostas fixas:** inclua casos suficientes para que `return "resposta"` não passe.
7. **Não revele o oculto:** o aluno só vê "falhou" nos ocultos, sem entrada nem valor esperado.
8. **Sempre escreva `solution` e `explanation`.** A explicação deve dizer *por quê*, o erro comum e a ligação com segurança.
9. **Dicas em degraus:** da mais leve (o conceito) à quase resposta. Nunca a resposta pronta na primeira.

## 4. Onde os testes rodam

- Em um **Web Worker** (`public/workers/js-worker.js` e `py-worker.js`), isolado da página: o código do aluno
  não acessa `document`, `localStorage` nem cookies.
- **Tempo limite:** 5 s (JS) e 10 s (Python). Loops infinitos encerram o worker e a página continua respondendo.
- Erros mostram **número da linha** e mensagem clara. Testes com erro mostram qual chamada falhou.

## 5. Migrando um exercício antigo

1. Crie a função-alvo (nome em JS e Python) e o esqueleto em `starterCode`.
2. Converta a saída esperada em `cases`, adicionando ocultos de borda.
3. Escreva `solution`, `explanation` e dicas.
4. Remova `expectedOutput`. **Mantenha `id` e `room`.**
5. Rode no navegador com uma solução certa, uma errada sutil (ex.: `>` no lugar de `>=`) e uma resposta fixa.

O código salvo do aluno só é reaproveitado se ainda contiver o nome da função nova, para não carregar
respostas do formato antigo.

## Regra de ouro: nada aparece antes de ser ensinado

Um exercício **só pode usar** o que uma sala de teoria anterior **explicou** (ou o que ele mesmo explica).
Isso vale para sintaxe (`def`, `:`, indentação), funções (`len`, `range`), métodos (`push`, `.get`),
operadores (`%`, `=>`) e módulos (`import`). Se um conceito novo aparece, escreva **antes**:

1. uma sala de teoria curta (ou um bloco "Ferramentas novas neste episódio" na teoria de abertura);
2. mostrando o código nas duas linguagens, com cada parte explicada ("peça por peça");
3. e só então o exercício que o usa.

Código que o aluno recebe pronto e não precisa entender (por exemplo, o "hash simulado") deve ser avisado como
**caixa-preta**: "você só precisa chamar esta função".

Rode `npm run audit:prereqs` depois de mexer em conteúdo. Ele percorre o curso na ordem e lista os exercícios que
usam um conceito que nenhuma teoria anterior explicou. É uma heurística por texto: se aparecer um conceito novo,
inclua a regra dele em `scripts/audit-prerequisites.mjs`.

## 6. Verificação automática

Depois de criar ou migrar exercícios, rode `npm run verify:exercises`. Para cada exercício com `tests`, em JavaScript
e em Python, ele confere que: (1) a `solution` passa em todos os testes; (2) o `starterCode` não passa sozinho;
(3) há `solution`, `explanation`, `hints` e testes ocultos (quando a função recebe argumentos); (4) uma resposta
fixa não passa em todos os testes. Ele usa os mesmos workers do site, então o resultado é fiel.

## 7. Módulos de terminal (episódios 47, 48, 49 e 50)

- **Separados da programação:** as salas têm só terminal (nada de editor de código) e as de programação não têm terminal. Isso evita misturar dois modos de pensar.
- **Ordem do curso:** fica em `src/data/course-order.ts`. Hoje: programação 0-7 → terminal 47, 48, 49 → Cibersegurança 8-19 → ... → Blue Team 33-36 → Active Directory 50 → OSINT 37 em diante. As chaves dos episódios não mudam; só a navegação. Ao inserir um módulo no meio da lista, os rótulos "Módulo N" da página `/episodes` (só os `<h2>`, não a lógica) precisam ser renumerados manualmente.
- **Formato:** teoria curta, depois um laboratório. Um comando só aparece em um laboratório se foi ensinado em uma teoria anterior — contando **todos** os módulos de terminal juntos, na ordem do curso (o verificador confere isso automaticamente).
- **Um comando só conta como "ensinado" se aparecer entre uma única crase** (`` `dig` ``), não só dentro de um bloco de código de três crases. É a forma como o verificador detecta a menção — um comando citado só dentro de \`\`\`...\`\`\` não é reconhecido.
- **Laboratórios**: cada um tem `tasks` (lista que o aluno vê e que o sistema confere) e/ou uma `flag`, além de `solution` (comandos que resolvem, usados pelo verificador). Nunca combine `tasks` parciais com `flag` no mesmo laboratório: se as tasks puderem ficar todas concluídas sem o aluno ter chegado à flag, o laboratório "termina" cedo demais.
- **Tarefas contam só comandos que funcionaram** (`ran`). Para tarefas que aceitam uma tentativa que falha de propósito, use `attempted`.
- **Sistema de arquivos** editável: mkdir, touch, echo >, cp, mv, rm, chmod. **Depois de um pipe** funcionam grep, wc, sort, uniq, head, tail e cut. Erros do primeiro comando aparecem na tela e não entram no pipe.
- **Processos** (episódio 48): `Machine.processes` lista `{ pid, user, cmd, warnOnKill? }`. `ps` lista, `kill <pid>` encerra (só o dono ou `root`). `warnOnKill` mostra um aviso extra sem impedir o kill — útil para ensinar consequência sem travar o jogo.
- **Cronômetro real** (episódio 48): `Scenario.timeLimitSeconds` + `timeoutMessage`. É só da interface (`TerminalLab.tsx`, baseada em `Date.now()`); o motor não tem noção de tempo.
- **Rede** (episódio 49): `Scenario.dns` (zona fictícia: domínio → registros A/MX/TXT/NS) e `Scenario.whois`; `Machine.http` (rotas por caminho, para `curl`) e `Machine.pingBlocked` (a máquina existe mas não responde a `ping`/`traceroute` — ensina que "não respondeu" não é prova de "está desligado").
- **Active Directory** (episódio 50): `Machine.ad` = `{ domain, users, groups }`. `net user`/`net user <nome>`/`net group`/`net group "<nome>"` consultam esses dados. O mesmo objeto `ad` pode ser reaproveitado em várias máquinas do cenário (representa um único diretório compartilhado pelo domínio).
- Rode `npm run verify:terminal` depois de mexer em qualquer um dos quatro módulos.

## 8. Estado atual e próximos passos

**Feito**
- Motor de execução isolado (Web Workers), com timeout, erros com linha e testes ocultos.
- Auditoria de pré-requisitos (`npm run audit:prereqs`): o curso todo passa com 0 conceitos usados antes de ensinados.
- Programação (episódios 0 a 7): 75 exercícios com testes visíveis e ocultos, em escada de dificuldade, com as funções ensinadas a fundo no Episódio 0.
- Módulo Terminal e Linux (episódio 47): 9 salas de teoria e 7 laboratórios com tarefas conferidas.
- Módulo Terminal: Ataque e Defesa (episódio 48): processos (ps/kill), 4 laboratórios (1 livre, 3 com
  cronômetro real) intercalando ataque e defesa, e correlação de evidências (log + ps) para não agir no alvo errado.
- Módulo Redes (episódio 49): ping, traceroute, dig, whois, curl — 3 laboratórios (conectividade, DNS, HTTP).
- Módulo Active Directory (episódio 50): domínio, usuários, grupos aninhados — 2 laboratórios (enumeração e
  escalonamento de privilégio por herança de grupo).
- Modo Hacker: 5 laboratórios simulados (terminal, SQLi, XSS, IDOR) + teoria.
- Página de trilhas de carreira (`/trilhas`) e abas "Mundo Real"/"Ferramentas" por episódio.
- Ranking sem exposição de dados pessoais (migração `supabase/migrations/002_privacidade_ranking.sql`).

**Próximos (por prioridade)**
1. Migrar os episódios 20 a 45 (lógica, web, cripto, blue team, OSINT, automação) para testes de função.
   Os episódios 8 a 19 (Cibersegurança) também ainda validam só a saída.
2. Novas trilhas do desenvolvedor: HTML/CSS/DOM, HTTP e APIs, SQL, Git/GitHub, testes.
3. Mais laboratórios: escalada de privilégios no Linux, JWT, command injection, quebra de hash, análise de tráfego.
4. Mini-projetos de portfólio com testes (ex.: verificador de senhas, scanner de portas).
5. Revisão do conteúdo por um profissional de segurança (fatos, fontes, exemplos reais).
6. Ranking com integridade no servidor (hoje o cliente grava o próprio progresso).

**Como acompanhar no site:** a página `/trilhas` marca cada etapa como *Disponível* ou *Em breve*.
Ao criar conteúdo novo, atualize a lista de episódios da etapa correspondente.
