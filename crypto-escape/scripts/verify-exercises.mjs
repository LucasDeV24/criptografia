/**
 * Verifica os exercícios com testes de função (rode: npm run verify:exercises).
 * Para cada exercício com `tests`, em JavaScript e em Python:
 *  1) a solução de referência precisa passar em TODOS os testes;
 *  2) o código inicial NÃO pode passar sozinho (senão o exercício já vem resolvido).
 * Usa o mesmo código dos Web Workers (public/workers), então o resultado é fiel ao site.
 * Requer Node 22+ (lê os arquivos .ts dos desafios direto).
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadPyodide } from 'pyodide';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const challengesDir = path.join(root, 'src/data/challenges');

// ---------- JavaScript: carrega o worker num contexto isolado ----------
const jsWorkerSrc = fs.readFileSync(path.join(root, 'public/workers/js-worker.js'), 'utf8');
function runJs(code, tests) {
  return new Promise((resolve) => {
    const sandbox = { structuredClone, console: { log() {} } };
    // atob/btoa são globais de verdade em Workers de navegador (produção funciona sem isso);
    // só precisam de polyfill aqui porque o teste roda numa VM do Node, não num navegador.
    sandbox.atob = (b64) => Buffer.from(b64, 'base64').toString('latin1');
    sandbox.btoa = (str) => Buffer.from(str, 'latin1').toString('base64');
    sandbox.self = { postMessage: resolve };
    vm.createContext(sandbox);
    vm.runInContext(jsWorkerSrc, sandbox);
    sandbox.self.onmessage({ data: { id: 1, code, tests } });
  });
}

// ---------- Python: usa o mesmo HARNESS do py-worker ----------
const pySrc = fs.readFileSync(path.join(root, 'public/workers/py-worker.js'), 'utf8');
const harness = /const HARNESS = `([\s\S]*?)`;/.exec(pySrc)?.[1];
if (!harness) throw new Error('HARNESS não encontrado em py-worker.js');
const py = await loadPyodide({ indexURL: path.join(root, 'node_modules', 'pyodide') });
py.runPython(harness);
const pyRun = py.globals.get('__cs_run');
async function runPy(code, tests) {
  return JSON.parse(pyRun(code, tests.fn, JSON.stringify(tests.cases)));
}

// ---------- Coleta os desafios ----------
const challenges = [];
for (const file of fs.readdirSync(challengesDir).filter((f) => f.endsWith('.ts') && f !== 'index.ts')) {
  const mod = await import(pathToFileURL(path.join(challengesDir, file)).href);
  for (const value of Object.values(mod)) {
    if (Array.isArray(value)) for (const c of value) if (c?.type === 'code' && c.tests) challenges.push({ ...c, file });
  }
}

// TOTAL_ROOMS (src/lib/progress.ts) precisa bater com o número real de salas
let allRooms = 0;
for (const file of fs.readdirSync(challengesDir).filter((f) => f.endsWith('.ts') && f !== 'index.ts')) {
  const mod = await import(pathToFileURL(path.join(challengesDir, file)).href);
  for (const value of Object.values(mod)) if (Array.isArray(value)) allRooms += value.filter((c) => c && c.room !== undefined).length;
}
const declared = Number(/export const TOTAL_ROOMS = (\d+)/.exec(fs.readFileSync(path.join(root, 'src/lib/progress.ts'), 'utf8'))?.[1]);
let failures = 0;
if (declared !== allRooms) {
  failures++;
  console.log(String.fromCharCode(10007) + ' TOTAL_ROOMS em src/lib/progress.ts vale ' + declared + ', mas existem ' + allRooms + ' salas. Atualize a constante (e o texto do layout.tsx).');
}
const fail = (c, lang, msg) => {
  failures++;
  console.log(`  ✗ [${c.id}] ${lang}: ${msg}`);
};

for (const c of challenges.sort((a, b) => a.episode - b.episode || String(a.room).localeCompare(String(b.room), undefined, { numeric: true }))) {
  const problems = [];
  if (!c.solution?.javascript || !c.solution?.python) problems.push('falta solution nos dois idiomas');
  if (!c.explanation) problems.push('falta explanation');
  if (!c.hints?.length) problems.push('faltam hints');
  // Função sem parâmetros não tem casos de borda para esconder
  const takesArgs = c.tests.cases.some((t) => t.args.length > 0);
  if (takesArgs && !c.tests.cases.some((t) => t.hidden)) problems.push('sem testes ocultos');
  if (!c.tests.cases.some((t) => !t.hidden)) problems.push('sem testes visíveis');
  for (const p of problems) fail(c, '-', p);

  // Resistência a trapaça: devolver sempre o mesmo valor não pode passar em tudo
  if (c.tests.cases.length > 1) {
    const jsTests = { fn: c.tests.fn.javascript, cases: c.tests.cases.map(({ args, expected }) => ({ args, expected })) };
    for (const candidate of c.tests.cases) {
      const cheat = `function ${jsTests.fn}() { return ${JSON.stringify(candidate.expected)}; }`;
      const r = await runJs(cheat, jsTests);
      if (r.results?.every((x) => x.ok)) {
        fail(c, 'javascript', `uma resposta fixa (${JSON.stringify(candidate.expected)}) passa em todos os testes`);
        break;
      }
    }
  }

  for (const lang of ['javascript', 'python']) {
    const tests = { fn: c.tests.fn[lang], cases: c.tests.cases.map(({ args, expected }) => ({ args, expected })) };
    const run = lang === 'javascript' ? runJs : runPy;

    if (c.solution?.[lang]) {
      const r = await run(c.solution[lang], tests);
      const bad = r.results?.map((x, i) => (x.ok ? null : `caso ${i + 1} (${c.tests.cases[i].name ?? ''}) recebeu ${x.got ?? x.error}`)).filter(Boolean);
      if (r.error) fail(c, lang, `solução deu erro: ${r.error}`);
      else if (bad?.length) fail(c, lang, `solução reprovou: ${bad.join('; ')}`);
    }
    if (c.starterCode?.[lang]) {
      const r = await run(c.starterCode[lang], tests);
      if (!r.error && r.results?.every((x) => x.ok)) fail(c, lang, 'o código inicial já passa em todos os testes');
    }
  }
}

console.log(`\n${challenges.length} exercícios com testes verificados, ${failures} problema(s).`);
process.exit(failures ? 1 : 0);
