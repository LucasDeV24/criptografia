/**
 * Verifica o módulo "Terminal e Linux" (rode: npm run verify:terminal).
 *  1) Para cada laboratório com tarefas: nenhuma tarefa pode vir cumprida, e a `solution`
 *     precisa cumprir TODAS.
 *  2) Cada comando e opção usados na solução precisam ter sido ensinados em uma sala de
 *     teoria ANTERIOR do módulo (aparecem como código na teoria).
 *  3) Testes do motor: pipes, redirecionamento, permissões, cópia/movimentação.
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
const { terminalChallenges } = await import(pathToFileURL(path.join(root, 'src/data/challenges/ep47-terminal.ts')).href);

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
  if (!scn.tasks?.length) return fail(`[${c.id}] sem tarefas`);
  if (!scn.solution?.length) return fail(`[${c.id}] sem solution`);
  if (!c.hints?.length || !c.explanation) fail(`[${c.id}] faltam dicas ou explicação`);

  const start = engine.initialState(scn);
  scn.tasks.forEach((t) => {
    if (t.done(start)) fail(`[${c.id}] a tarefa já vem cumprida: "${t.label}"`);
  });

  const { st, outputs } = runAll(scn, scn.solution);
  scn.tasks.forEach((t) => {
    if (!t.done(st)) fail(`[${c.id}] a solução não cumpre a tarefa: "${t.label}"`);
  });
  outputs.forEach((lines, i) => {
    if (lines.some((l) => l.includes('comando não encontrado'))) fail(`[${c.id}] "${scn.solution[i]}" não é um comando conhecido`);
  });

  // Tudo o que a solução usa precisa estar na teoria anterior
  const theory = terminalChallenges
    .slice(0, index)
    .filter((x) => x.type === 'theory')
    .map((x) => x.content)
    .join('\n');
  for (const line of scn.solution) {
    const cmd = line.trim().split(/\s+/)[0];
    if (!cmd.startsWith('./') && !new RegExp('`' + cmd.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[` ]').test(theory)) {
      fail(`[${c.id}] o comando "${cmd}" é usado mas não foi ensinado antes`);
    }
    for (const m of line.matchAll(/(?:^|\s)(-[a-zA-Z])(?=[\s'"a-zA-Z0-9]|$)/g)) {
      if (!theory.includes(m[1])) fail(`[${c.id}] a opção "${m[1]}" (em "${line}") não foi ensinada antes`);
    }
    if (line.includes('|') && !/pipe/i.test(theory)) fail(`[${c.id}] usa pipe sem tê-lo ensinado`);
    if (/\s>>?\s/.test(line) && !theory.includes('`>`')) fail(`[${c.id}] usa redirecionamento sem tê-lo ensinado`);
    if (line.includes('chmod +x') && !theory.includes('chmod +x')) fail(`[${c.id}] usa "chmod +x" sem tê-lo ensinado`);
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

fs.rmSync(tmp, { recursive: true, force: true });
console.log(`\n${labs} laboratórios de terminal verificados, ${problems} problema(s).`);
process.exit(problems ? 1 : 0);
