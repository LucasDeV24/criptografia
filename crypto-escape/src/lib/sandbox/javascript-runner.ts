/**
 * Execução simples de JavaScript (só a saída). Roda em um Web Worker isolado,
 * com tempo limite; veja runner.ts para testes de função.
 */
import { runCode } from './runner';

export interface JSExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number;
}

export async function runJavaScript(code: string): Promise<JSExecutionResult> {
  const r = await runCode('javascript', code);
  return {
    success: !r.error,
    output: r.stdout.trim(),
    error: r.error && r.errorLine ? `${r.error} (linha ${r.errorLine})` : r.error,
    executionTime: r.executionTime,
  };
}
