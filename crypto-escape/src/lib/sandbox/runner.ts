/**
 * Executa o código do aluno em Web Workers (isolado da página).
 * - JavaScript: um Worker novo por execução, encerrado ao passar do tempo.
 * - Python (Pyodide): um Worker reaproveitado; se estourar o tempo, é recriado.
 * Funciona também com testes de função (ver TestCase em types/challenge).
 */
import type { Language } from '@/types/challenge';

export interface RunTests {
  fn: string;
  cases: { args: unknown[]; expected: unknown }[];
}

export interface CaseResult {
  ok: boolean;
  /** Valor retornado (texto JSON), quando não deu erro */
  got?: string;
  error?: string;
  line?: number;
}

export interface RunOutcome {
  stdout: string;
  error?: string;
  errorLine?: number;
  /** O código passou do tempo limite (provável loop infinito) */
  timedOut?: boolean;
  results?: CaseResult[];
  executionTime: number;
}

const JS_TIMEOUT_MS = 5000;
const PY_TIMEOUT_MS = 10000;
const PY_LOAD_TIMEOUT_MS = 90000;

let nextId = 1;

function timeoutMessage(seconds: number) {
  return `Tempo esgotado: o código passou de ${seconds}s. Existe um loop infinito?`;
}

function runJavaScriptWorker(code: string, tests?: RunTests): Promise<RunOutcome> {
  return new Promise((resolve) => {
    const start = performance.now();
    const id = nextId++;
    const worker = new Worker('/workers/js-worker.js');
    const finish = (outcome: Omit<RunOutcome, 'executionTime'>) => {
      clearTimeout(timer);
      worker.terminate();
      resolve({ ...outcome, executionTime: performance.now() - start });
    };
    const timer = setTimeout(
      () => finish({ stdout: '', error: timeoutMessage(JS_TIMEOUT_MS / 1000), timedOut: true }),
      JS_TIMEOUT_MS
    );
    worker.onmessage = (e: MessageEvent) => {
      if (e.data?.id === id) finish(e.data);
    };
    worker.onerror = (e) => finish({ stdout: '', error: e.message || 'Erro ao executar o código.' });
    worker.postMessage({ id, code, tests });
  });
}

// ---- Python ----

let pyWorker: Worker | null = null;
let pyReady: Promise<void> | null = null;

function resetPython() {
  pyWorker?.terminate();
  pyWorker = null;
  pyReady = null;
}

function ensurePython(): Promise<void> {
  if (pyReady) return pyReady;
  const worker = new Worker('/workers/py-worker.js');
  pyWorker = worker;
  pyReady = new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('O Python demorou demais para carregar. Verifique sua conexão.'));
    }, PY_LOAD_TIMEOUT_MS);
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type === 'ready') {
        clearTimeout(timer);
        worker.removeEventListener('message', onMessage);
        resolve();
      } else if (e.data?.type === 'load-error') {
        clearTimeout(timer);
        reject(new Error(`Não foi possível carregar o Python (${e.data.message}).`));
      }
    };
    worker.addEventListener('message', onMessage);
    worker.addEventListener('error', () => {
      clearTimeout(timer);
      reject(new Error('Não foi possível iniciar o Python.'));
    });
  });
  pyReady.catch(resetPython);
  return pyReady;
}

/** Começa a carregar o Python em segundo plano (chame ao abrir um exercício Python) */
export function preloadPython(): void {
  if (typeof window === 'undefined') return;
  ensurePython().catch(() => {});
}

async function runPythonWorker(code: string, tests?: RunTests, onLoading?: () => void): Promise<RunOutcome> {
  const start = performance.now();
  const fail = (error: string): RunOutcome => ({ stdout: '', error, executionTime: performance.now() - start });

  if (!pyReady) onLoading?.();
  try {
    await ensurePython();
  } catch (err) {
    return fail(err instanceof Error ? err.message : 'Não foi possível carregar o Python.');
  }

  const worker = pyWorker!;
  const id = nextId++;
  const execStart = performance.now();
  return new Promise<RunOutcome>((resolve) => {
    const finish = (outcome: Omit<RunOutcome, 'executionTime'>) => {
      clearTimeout(timer);
      worker.removeEventListener('message', onMessage);
      resolve({ ...outcome, executionTime: performance.now() - execStart });
    };
    const timer = setTimeout(() => {
      resetPython(); // o próximo run cria um Python novo
      finish({ stdout: '', error: timeoutMessage(PY_TIMEOUT_MS / 1000), timedOut: true });
    }, PY_TIMEOUT_MS);
    const onMessage = (e: MessageEvent) => {
      if (e.data?.id === id) finish(e.data);
    };
    worker.addEventListener('message', onMessage);
    worker.postMessage({ id, code, tests });
  });
}

export function runCode(
  language: Language,
  code: string,
  options: { tests?: RunTests; onLoading?: () => void } = {}
): Promise<RunOutcome> {
  return language === 'javascript'
    ? runJavaScriptWorker(code, options.tests)
    : runPythonWorker(code, options.tests, options.onLoading);
}
