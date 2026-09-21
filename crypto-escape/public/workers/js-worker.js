/* Executa o JavaScript do aluno isolado da página (sem DOM, localStorage ou cookies).
 * Cada execução usa um Worker novo; a página o encerra (terminate) se passar do tempo. */
'use strict';

function formatArg(a) {
  if (typeof a === 'object' && a !== null) {
    try { return JSON.stringify(a); } catch (_) { return String(a); }
  }
  return String(a);
}

function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b || a === null || b === null || typeof a !== 'object') return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  return ka.length === kb.length && ka.every((k) => deepEqual(a[k], b[k]));
}

function show(v) {
  let s;
  try { s = v === undefined ? 'undefined' : JSON.stringify(v); } catch (_) { s = String(v); }
  return s && s.length > 200 ? s.slice(0, 200) + '…' : s;
}

// "new Function" acrescenta 2 linhas de cabeçalho + 1 do "use strict" antes do código do aluno
const LINE_OFFSET = 3;
function errorLine(err) {
  const m = /<anonymous>:(\d+):\d+/.exec(String(err && err.stack)) || /Function:(\d+):\d+/.exec(String(err && err.stack));
  if (!m) return undefined;
  const line = Number(m[1]) - LINE_OFFSET;
  return line > 0 ? line : undefined;
}

self.onmessage = (event) => {
  const { id, code, tests } = event.data;
  const out = [];
  const capture = (...args) => out.push(args.map(formatArg).join(' '));
  console.log = console.info = console.warn = console.error = console.debug = capture;

  const reply = { id, stdout: '', error: undefined, errorLine: undefined, results: undefined };
  try {
    let suffix = '';
    if (tests) {
      if (!/^[A-Za-z_$][\w$]*$/.test(tests.fn)) throw new Error('Nome de função inválido no exercício.');
      suffix = `\n;return (typeof ${tests.fn} === 'function') ? ${tests.fn} : undefined;`;
    }
    const factory = new Function('"use strict";\n' + code + suffix);
    const fn = factory();

    if (tests) {
      if (typeof fn !== 'function') {
        reply.error = `Você precisa criar a função ${tests.fn}.`;
      } else {
        reply.results = tests.cases.map((c) => {
          try {
            const got = fn(...structuredClone(c.args));
            return { ok: deepEqual(got, c.expected), got: show(got) };
          } catch (err) {
            return { ok: false, error: String((err && err.message) || err), line: errorLine(err) };
          }
        });
      }
    }
  } catch (err) {
    reply.error = `${(err && err.name) || 'Error'}: ${(err && err.message) || err}`;
    reply.errorLine = errorLine(err);
  }
  reply.stdout = out.join('\n');
  self.postMessage(reply);
};
