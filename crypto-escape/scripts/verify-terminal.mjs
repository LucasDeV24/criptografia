/**
 * Verifica os módulos de terminal ("Terminal e Linux" + "Terminal: Ataque e Defesa";
 * rode: npm run verify:terminal).
 *  1) Para cada laboratório: nenhuma tarefa (ou a flag) pode vir cumprida, e a `solution`
 *     precisa cumprir TODAS as tarefas (ou revelar a flag, em labs só de flag).
 *  2) Cada comando e opção usados na solução precisam ter sido ensinados em uma sala de
 *     teoria ANTERIOR (contando as duas salas de terminal juntas, na ordem do curso).
 *  3) Testes do motor: pipes, redirecionamento, permissões, cópia/movimentação, processos.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const labsDir = path.join(root, 'src/lib/labs');

// Copia os arquivos do motor para uma pasta temporária, ajustando os imports para o Node
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cs-verify-'));
for (const f of fs.readdirSync(labsDir).filter((x) => x.endsWith('.ts'))) {
  const text = fs.readFileSync(path.join(labsDir, f), 'utf8').replace(/from "(\.\/[\w-]+)"/g, 'from "$1.ts"');
  fs.writeFileSync(path.join(tmp, f), text);
}
fs.writeFileSync(path.join(tmp, 'package.json'), '{"type":"module"}');
const load = (f) => import(pathToFileURL(path.join(tmp, f)).href);
const engine = await load('terminal-engine.ts');
const { SCENARIOS } = await load('terminal-scenarios.ts');

// Os módulos de terminal, na ordem em que o aluno os percorre (ver src/data/course-order.ts).
// Importa os arquivos de conteúdo diretamente (não via index.ts: seus imports relativos sem
// extensão não resolvem no carregador nativo de TypeScript do Node).
const { COURSE_ORDER } = await import(pathToFileURL(path.join(root, 'src/data/course-order.ts')).href);
const byEpisode = {
  47: (await import(pathToFileURL(path.join(root, 'src/data/challenges/ep47-terminal.ts')).href)).terminalChallenges,
  48: (await import(pathToFileURL(path.join(root, 'src/data/challenges/ep48-terminal-pressure.ts')).href)).terminalPressureChallenges,
  49: (await import(pathToFileURL(path.join(root, 'src/data/challenges/ep49-networking.ts')).href)).networkingChallenges,
  50: (await import(pathToFileURL(path.join(root, 'src/data/challenges/ep50-active-directory.ts')).href)).activeDirectoryChallenges,
};
const terminalChallenges = COURSE_ORDER.filter((ep) => byEpisode[ep]).flatMap((ep) => byEpisode[ep]);

let problems = 0;
const fail = (msg) => {
  problems++;
  console.log('  ✗ ' + msg);
};

const runAll = (scn, cmds) => {
  let st = engine.initialState(scn);
  const outputs = [];
  for (const c of cmds) {
    const r = engine.execute(scn, st, c);
    st = r.state;
    outputs.push(r.lines);
  }
  return { st, outputs };
};

// ---------- 1 e 2: laboratórios ----------
let labs = 0;
terminalChallenges.forEach((c, index) => {
  if (c.type !== 'lab' || !String(c.labId).startsWith('term-')) return;
  labs++;
  const scn = SCENARIOS[c.labId];
  if (!scn) return fail(`[${c.id}] cenário ${c.labId} não existe`);
  if (!scn.tasks?.length && !scn.flag) return fail(`[${c.id}] sem tarefas nem flag`);
  if (!scn.solution?.length) return fail(`[${c.id}] sem solution`);
  if (!c.hints?.length || !c.explanation) fail(`[${c.id}] faltam dicas ou explicação`);

  if (scn.tasks?.length) {
    const start = engine.initialState(scn);
    scn.tasks.forEach((t) => {
      if (t.done(start)) fail(`[${c.id}] a tarefa já vem cumprida: "${t.label}"`);
    });
  }

  const { st, outputs } = runAll(scn, scn.solution);
  if (scn.tasks?.length) {
    scn.tasks.forEach((t) => {
      if (!t.done(st)) fail(`[${c.id}] a solução não cumpre a tarefa: "${t.label}"`);
    });
  } else if (scn.flag) {
    if (!outputs.flat().some((l) => l.includes(scn.flag))) fail(`[${c.id}] a solução não revela a flag`);
  }
  outputs.forEach((lines, i) => {
    if (lines.some((l) => l.includes('comando não encontrado'))) fail(`[${c.id}] "${scn.solution[i]}" não é um comando conhecido (pode ser uma senha — confira a ordem da solution)`);
  });

  // Tudo o que a solução usa precisa estar na teoria anterior (contando os dois módulos)
  const theory = terminalChallenges
    .slice(0, index)
    .filter((x) => x.type === 'theory')
    .map((x) => x.content)
    .join('\n');
  for (const line of scn.solution) {
    const cmd = line.trim().split(/\s+/)[0];
    const isCommand = /^[a-z.][a-z0-9_./-]*$/i.test(cmd); // pula linhas que são só uma senha (ex.: no lab de dois saltos)
    if (isCommand && !cmd.startsWith('./') && !new RegExp('`' + cmd.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[` ]').test(theory)) {
      fail(`[${c.id}] o comando "${cmd}" é usado mas não foi ensinado antes`);
    }
    for (const m of line.matchAll(/(?:^|\s)(-[a-zA-Z])(?=[\s'"a-zA-Z0-9]|$)/g)) {
      if (!theory.includes(m[1])) fail(`[${c.id}] a opção "${m[1]}" (em "${line}") não foi ensinada antes`);
    }
    if (line.includes('|') && !/pipe/i.test(theory)) fail(`[${c.id}] usa pipe sem tê-lo ensinado`);
    if (/\s>>?\s/.test(line) && !theory.includes('`>`')) fail(`[${c.id}] usa redirecionamento sem tê-lo ensinado`);
    if (line.includes('chmod +x') && !theory.includes('chmod +x')) fail(`[${c.id}] usa "chmod +x" sem tê-lo ensinado`);
  }

  // Cronômetro: se existir, precisa de uma mensagem de tempo esgotado e um limite razoável
  if (scn.timeLimitSeconds !== undefined) {
    if (!scn.timeoutMessage) fail(`[${c.id}] tem cronômetro mas não define timeoutMessage`);
    if (scn.timeLimitSeconds < 60) fail(`[${c.id}] cronômetro curto demais (${scn.timeLimitSeconds}s) para ser jogável`);
  }
});

// ---------- 3: testes do motor ----------
const perm = SCENARIOS['term-perm'];
const pipes = SCENARIOS['term-pipes'];
const files = SCENARIOS['term-files'];
const check = (name, cond, got) => {
  if (!cond) fail(`motor: ${name}${got !== undefined ? ` (recebido: ${JSON.stringify(got)})` : ''}`);
};

{
  const { outputs } = runAll(pipes, ['grep FALHA acesso.log | wc -l']);
  check('grep | wc -l conta 7 falhas', outputs[0][0] === '7', outputs[0]);
}
{
  const { outputs } = runAll(pipes, ['grep FALHA acesso.log > falhas.txt', "cut -d' ' -f4 falhas.txt | sort | uniq -c"]);
  check('redirecionamento não imprime nada', outputs[0].length === 0, outputs[0]);
  check('uniq -c conta 5 falhas do 203.0.113.5', outputs[1].some((l) => /^\s*5 203\.0\.113\.5$/.test(l)), outputs[1]);
  check('uniq -c conta 2 falhas do 198.51.100.9', outputs[1].some((l) => /^\s*2 198\.51\.100\.9$/.test(l)), outputs[1]);
}
{
  const { outputs } = runAll(pipes, ['sort acesso.log | head -n 1', 'tail -n 1 acesso.log']);
  check('sort | head devolve 1 linha', outputs[0].length === 1, outputs[0]);
  check('tail -n 1 devolve a última linha', outputs[1][0].endsWith('admin') && outputs[1].length === 1, outputs[1]);
}
{
  const { outputs } = runAll(perm, ['ls -l', './backup.sh', 'chmod +x backup.sh', 'ls -l', './backup.sh', 'chmod 600 backup.sh', 'ls -l']);
  check('ls -l mostra -rw-r--r-- antes', outputs[0].some((l) => l.startsWith('-rw-r--r--') && l.includes('backup.sh')), outputs[0]);
  check('executar sem permissão dá "Permissão negada"', outputs[1].some((l) => l.includes('Permissão negada')), outputs[1]);
  check('chmod +x vira -rwxr-xr-x', outputs[3].some((l) => l.startsWith('-rwxr-xr-x') && l.includes('backup.sh')), outputs[3]);
  check('script executável imprime a saída', outputs[4].includes('Backup concluído com sucesso!'), outputs[4]);
  check('chmod 600 vira -rw-------', outputs[6].some((l) => l.startsWith('-rw-------') && l.includes('backup.sh')), outputs[6]);
}
{
  const { st, outputs } = runAll(files, ['mkdir a/b', 'mkdir -p a/b', 'touch a/b/x.txt', 'rm a', 'rm -r a', 'ls', 'rm -r /', 'cp nao-existe.txt y.txt', 'mv ideias.txt renomeado.txt', 'ls']);
  check('mkdir sem -p falha em pasta inexistente', outputs[0].some((l) => l.includes('use -p')), outputs[0]);
  check('rm em pasta sem -r é recusado', outputs[3].some((l) => l.includes('use -r')), outputs[3]);
  check('rm -r apaga a pasta', engine.pathExists(st, '/home/aluno/a') === null);
  check('rm -r / é recusado', outputs[6].some((l) => l.includes('perigoso')), outputs[6]);
  check('cp de arquivo inexistente falha', outputs[7].some((l) => l.includes('inexistente')), outputs[7]);
  check('mv renomeia', engine.pathExists(st, '/home/aluno/renomeado.txt') === 'file' && engine.pathExists(st, '/home/aluno/ideias.txt') === null);
}
{
  const { st } = runAll(files, ['echo um > x.txt', 'echo dois >> x.txt']);
  check('>> acrescenta ao arquivo', engine.readFile(st, '/home/aluno/x.txt') === 'um\ndois', engine.readFile(st, '/home/aluno/x.txt'));
}
{
  const { outputs } = runAll(pipes, ['cat naoexiste', 'foo', 'cd /etc', 'pwd', 'cd ..', 'pwd']);
  check('cat inexistente avisa', outputs[0][0].includes('inexistente'), outputs[0]);
  check('comando desconhecido avisa', outputs[1][0].includes('não encontrado'), outputs[1]);
  check('cd /etc e pwd', outputs[3][0] === '/etc', outputs[3]);
  check('cd .. sobe', outputs[5][0] === '/', outputs[5]);
}

{
  // erro no primeiro comando não pode virar dado do pipe, e a tarefa não conta um comando que falhou
  const { st, outputs } = runAll(pipes, ["cut -d' ' -f4 falhas.txt | sort | uniq -c"]);
  check('erro do primeiro comando aparece e o pipe não roda', outputs[0].length === 1 && outputs[0][0].includes('inexistente'), outputs[0]);
  const task3 = pipes.tasks[2];
  check('tarefa não é cumprida por um comando que falhou', task3.done(st) === false);
  const okRun = runAll(pipes, ['grep FALHA acesso.log > falhas.txt', "cut -d' ' -f4 falhas.txt | sort | uniq -c"]);
  check('a tarefa é cumprida quando o comando funciona', task3.done(okRun.st) === true);
}
{
  const { st } = runAll(perm, ['./backup.sh']);
  check('tentativa falha mas conta como tentativa (laboratório de permissões)', perm.tasks[1].done(st) === true);
  check('mas não conta como execução com sucesso', perm.tasks[3].done(st) === false);
}

// ---------- 4: processos (ps/kill), específico dos laboratórios com cronômetro ----------
{
  const contain = SCENARIOS['term-contain'];
  const { st, outputs } = runAll(contain, ['ps', 'kill 1319', 'ps']);
  check('ps lista o processo malicioso antes', outputs[0].some((l) => l.includes('1319') && l.includes('agent.sh')), outputs[0]);
  check('kill remove o processo', !engine.processExists(st, 1319, '10.0.0.9'));
  check('ps não lista mais o processo depois', !outputs[2].some((l) => l.includes('1319')), outputs[2]);
}
{
  const twoThreats = SCENARIOS['term-two-threats'];
  const { st } = runAll(twoThreats, ['kill 305']);
  check('matar o processo legítimo mostra o aviso (mas não impede continuar)', engine.processExists(st, 305, '10.0.0.12') === false);
  check('a ameaça real continua de pé (o alvo era outro PID)', engine.processExists(st, 1210, '10.0.0.12') === true);
  const r = runAll(twoThreats, ['kill 305']).outputs[0];
  check('mensagem de aviso ao matar o processo errado', r.some((l) => l.includes('legítimo')), r);
}
{
  const psKill = SCENARIOS['term-ps-kill'];
  const r = runAll(psKill, ['kill 99999']).outputs[0];
  check('matar PID inexistente dá erro claro', r.some((l) => l.includes('Nenhum processo')), r);
}

// Nota: o cronômetro em si (contagem regressiva, falha ao chegar a 0) é decidido pela interface
// (TerminalLab.tsx), não pelo motor — o motor não tem noção de tempo. Esse comportamento é
// verificado com um teste de navegador (ver a suíte de UI), não aqui.

fs.rmSync(tmp, { recursive: true, force: true });
console.log(`\n${labs} laboratórios de terminal verificados, ${problems} problema(s).`);
process.exit(problems ? 1 : 0);
