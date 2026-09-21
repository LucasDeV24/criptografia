/**
 * Execução simples de Python (só a saída) via Pyodide, em um Web Worker isolado,
 * com tempo limite; veja runner.ts para testes de função.
 */
import { runCode } from './runner';

export interface PythonExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number;
}

export async function runPython(code: string): Promise<PythonExecutionResult> {
  const r = await runCode('python', code);
  return {
    success: !r.error,
    output: r.stdout.trim(),
    error: r.error && r.errorLine ? `${r.error} (linha ${r.errorLine})` : r.error,
    executionTime: r.executionTime,
  };
}
