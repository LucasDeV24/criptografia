/* Executa o Python do aluno (Pyodide) isolado da página.
 * O Worker é reaproveitado entre execuções (carregar o Pyodide é pesado);
 * a página o encerra (terminate) se o código passar do tempo. */
'use strict';

// Deve ser a mesma versão do pacote npm "pyodide" (package.json)
const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v0.29.3/full/';
importScripts(PYODIDE_URL + 'pyodide.js');

const HARNESS = `
import sys, io, json, copy

def __cs_eq(a, b):
    if isinstance(a, bool) or isinstance(b, bool):
        return type(a) is type(b) and a == b
    if isinstance(a, (int, float)) and isinstance(b, (int, float)):
        return a == b
    if type(a) is not type(b):
        return False
    if isinstance(a, list):
        return len(a) == len(b) and all(__cs_eq(x, y) for x, y in zip(a, b))
    if isinstance(a, dict):
        return a.keys() == b.keys() and all(__cs_eq(a[k], b[k]) for k in a)
    return a == b

def __cs_where(e):
    line = None
    tb = e.__traceback__
    while tb is not None:
        if tb.tb_frame.f_code.co_filename == "<seu_codigo>":
            line = tb.tb_lineno
        tb = tb.tb_next
    if isinstance(e, SyntaxError) and e.filename == "<seu_codigo>":
        line = e.lineno
    text = e.msg if isinstance(e, SyntaxError) else str(e)
    return type(e).__name__ + ": " + text, line

def __cs_show(v):
    s = json.dumps(v, ensure_ascii=False)
    return s if len(s) <= 200 else s[:200] + "…"

def __cs_run(code, fn_name, cases_json):
    buf = io.StringIO()
    old_out, old_err = sys.stdout, sys.stderr
    sys.stdout = sys.stderr = buf
    reply = {"error": None, "errorLine": None, "results": None}
    try:
        ns = {"__name__": "__main__"}
        exec(compile(code, "<seu_codigo>", "exec"), ns)
        if fn_name:
            fn = ns.get(fn_name)
            if not callable(fn):
                reply["error"] = "Você precisa criar a função " + fn_name + "."
            else:
                results = []
                for case in json.loads(cases_json):
                    try:
                        got = fn(*copy.deepcopy(case["args"]))
                        norm = json.loads(json.dumps(got))
                        results.append({"ok": __cs_eq(norm, case["expected"]), "got": __cs_show(norm)})
                    except TypeError as e:
                        if "JSON serializable" in str(e):
                            results.append({"ok": False, "error": "O retorno precisa ser texto, número, booleano, lista ou dicionário."})
                        else:
                            msg, line = __cs_where(e)
                            results.append({"ok": False, "error": msg, "line": line})
                    except Exception as e:
                        msg, line = __cs_where(e)
                        results.append({"ok": False, "error": msg, "line": line})
                reply["results"] = results
    except BaseException as e:
        reply["error"], reply["errorLine"] = __cs_where(e)
    finally:
        sys.stdout, sys.stderr = old_out, old_err
    reply["stdout"] = buf.getvalue()
    return json.dumps(reply)
`;

const ready = loadPyodide({ indexURL: PYODIDE_URL }).then((py) => {
  py.runPython(HARNESS);
  self.postMessage({ type: 'ready' });
  return py;
});

self.onmessage = async (event) => {
  const { id, code, tests } = event.data;
  try {
    const py = await ready;
    const run = py.globals.get('__cs_run');
    const raw = run(code, tests ? tests.fn : null, tests ? JSON.stringify(tests.cases) : null);
    run.destroy();
    self.postMessage({ id, ...JSON.parse(raw) });
  } catch (err) {
    self.postMessage({ id, stdout: '', error: 'Falha ao executar Python: ' + ((err && err.message) || err), internal: true });
  }
};

ready.catch((err) => {
  self.postMessage({ type: 'load-error', message: String((err && err.message) || err) });
});
