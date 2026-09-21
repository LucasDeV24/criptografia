# Crypto Escape

Plataforma interativa para aprender **programação e cibersegurança** resolvendo desafios no navegador
(JavaScript e Python), com laboratórios práticos de "hacker do bem" 100% simulados.

- **Base de programação (episódios 0 a 7):** exercícios em que o aluno escreve funções, validadas por
  **testes visíveis e ocultos** (casos de borda).
- **Cibersegurança (episódios 8 a 45):** criptografia, vulnerabilidades web, blue team, OSINT, automação.
- **Modo Hacker (episódio 46):** terminal simulado e sites vulneráveis (SQL Injection, XSS, IDOR) com flags.
- **Trilhas de carreira (`/trilhas`):** o que aprender e como entrar na área, marcando o que ainda é "em breve".

## Como rodar

```bash
npm install
cp .env.example .env.local     # chaves do Supabase (só para login, progresso e ranking)
npm run dev                    # http://localhost:3000
```

Sem as chaves do Supabase o jogo funciona normalmente; só login, sincronização de progresso e ranking ficam desativados.

## Comandos úteis

| Comando | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build de produção |
| `npm run lint` | ESLint |
| `npm run verify:exercises` | verifica todos os exercícios com testes (veja abaixo) |
| `npm run audit:prereqs` | acha exercícios que usam algo que nenhuma teoria anterior ensinou |

## Como o código do aluno é executado

O código roda em **Web Workers** isolados (`public/workers/`), sem acesso à página, ao `localStorage` nem aos cookies.
Há tempo limite (5 s em JS e 10 s em Python): um loop infinito não trava a aba. O Python usa o Pyodide, carregado do CDN
na mesma versão do pacote npm (`package.json`). Se atualizar o `pyodide`, atualize também `PYODIDE_URL` em
`public/workers/py-worker.js`.

## Criar ou migrar exercícios

Leia [`docs/GUIA_DE_CONTEUDO.md`](docs/GUIA_DE_CONTEUDO.md). Depois de escrever ou editar exercícios com testes, rode:

```bash
npm run verify:exercises
```

O verificador (Node 22+) executa, em JavaScript e Python, a solução de referência de cada exercício contra os testes e
confere que: a solução passa em todos os testes, o código inicial não vem resolvido, há testes ocultos, e uma resposta
fixa (`return "resposta"`) não passa. Rode-o antes de cada commit que mexa em exercícios.

## Estrutura

```
src/app/            páginas (home, episódios, sala do jogo, ranking, trilhas, login)
src/components/     editor de código, sala, laboratórios (terminal e sites simulados), RichText seguro
src/data/           desafios por episódio (challenges/) e conteúdo das abas Mundo Real/Ferramentas
src/lib/sandbox/    execução em Web Workers, formatação de chamadas e resultados
src/lib/labs/       motor do terminal simulado e simuladores de SQLi, XSS e IDOR
public/workers/     workers de JavaScript e Python
scripts/            verificador de exercícios
supabase/           schema e migrações (ranking sem dados pessoais)
```

## Supabase (login, progresso e ranking)

1. Crie o projeto e rode `supabase/schema.sql` no SQL Editor (instalação nova).
2. **Projeto já existente?** Rode `supabase/migrations/002_privacidade_ranking.sql`. Ela troca a leitura pública das
   tabelas por uma view `ranking` (só nome, avatar e contagens), para que e-mails e códigos dos alunos não fiquem expostos.
3. Guias de configuração: `CONFIGURAR_SUPABASE.md`, `SUPABASE_SETUP.md`, `DEPLOY.md` e `CONFIGURAR_VERCEL.md`.

## Ao adicionar salas

Atualize `TOTAL_ROOMS` em `src/lib/progress.ts` (total de salas em `src/data/challenges`).
