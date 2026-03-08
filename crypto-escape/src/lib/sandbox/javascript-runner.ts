/**
 * Sandbox para execução de JavaScript no browser
 * Captura console.log e aplica timeout
 */

const TIMEOUT_MS = 5000;

export interface JSExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number;
}

export async function runJavaScript(code: string): Promise<JSExecutionResult> {
  const startTime = performance.now();
  const outputs: string[] = [];

  try {
    // Capturar console.log, console.warn, console.error
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    const capture = (...args: unknown[]) => {
      const str = args.map((a) => 
        typeof a === "object" ? JSON.stringify(a) : String(a)
      ).join(" ");
      outputs.push(str);
    };

    console.log = capture;
    console.warn = capture;
    console.error = capture;

    // Criar função com código - sem acesso a closure perigoso
    // Passamos apenas objetos seguros
    const wrappedCode = `
      "use strict";
      ${code}
    `;

    const fn = new Function(wrappedCode);
    
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Timeout: código excedeu 5 segundos")), TIMEOUT_MS);
    });

    await Promise.race([
      Promise.resolve(fn()),
      timeoutPromise,
    ]);

    const output = outputs.join("\n").trim();
    const executionTime = performance.now() - startTime;

    // Restaurar console
    console.log = originalLog;
    console.warn = originalWarn;
    console.error = originalError;

    return {
      success: true,
      output,
      executionTime,
    };
  } catch (err) {
    const executionTime = performance.now() - startTime;
    const errorMessage = err instanceof Error ? err.message : String(err);
    const output = outputs.join("\n").trim();

    return {
      success: false,
      output,
      error: errorMessage,
      executionTime,
    };
  }
}

/**
 * Para desafios que usam variável 'solution'
 */
export async function runJavaScriptWithSolution(code: string): Promise<{
  output: string;
  solution: unknown;
  error?: string;
  success: boolean;
}> {
  const result = await runJavaScript(`
    ${code}
    if (typeof solution !== 'undefined') {
      console.log(JSON.stringify(solution));
    }
  `);

  if (!result.success) {
    return {
      output: result.output,
      solution: undefined,
      error: result.error,
      success: false,
    };
  }

  try {
    const lines = result.output.trim().split("\n");
    const lastLine = lines[lines.length - 1];
    const solution = lastLine ? JSON.parse(lastLine) : undefined;
    const output = lines.slice(0, -1).join("\n");
    return {
      output,
      solution,
      success: true,
    };
  } catch {
    return {
      output: result.output,
      solution: undefined,
      success: true,
    };
  }
}
