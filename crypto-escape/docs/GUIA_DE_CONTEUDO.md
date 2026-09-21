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

## 6. Estado atual e próximos passos

**Feito**
- Motor de execução isolado (Web Workers), com timeout, erros com linha e testes ocultos.
- Episódio 1 (Condições) no formato novo, como modelo.
- Modo Hacker: 5 laboratórios simulados (terminal, SQLi, XSS, IDOR) + teoria.
- Página de trilhas de carreira (`/trilhas`).

**Próximos (por prioridade)**
1. Migrar os episódios 0, 2, 3, 4, 5, 6, 7 (base de programação) para testes de função.
2. Migrar os desafios de segurança (20–45) que hoje são só saída.
3. Novas trilhas do desenvolvedor: HTML/CSS/DOM, HTTP e APIs, SQL, Git/GitHub, testes.
4. Mais laboratórios: escalada de privilégios no Linux, JWT, command injection, quebra de hash, análise de tráfego.
5. Mini-projetos de portfólio com testes (ex.: verificador de senhas, scanner de portas).
6. Revisão do conteúdo por um profissional de segurança (fatos, fontes, exemplos reais).
7. Base técnica: testes automatizados da validação, ranking com integridade no servidor, correção de exposição de e-mails no Supabase.

**Como acompanhar no site:** a página `/trilhas` marca cada etapa como *Disponível* ou *Em breve*.
Ao criar conteúdo novo, atualize a lista de episódios da etapa correspondente.
