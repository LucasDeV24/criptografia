/**
 * Sandbox para execução de Python no browser via Pyodide
 */

let pyodideInstance: Awaited<ReturnType<typeof import("pyodide")["loadPyodide"]>> | null = null;

export interface PythonExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number;
}

async function getPyodide() {
  if (pyodideInstance) return pyodideInstance;
  
  const { loadPyodide } = await import("pyodide");
  pyodideInstance = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
  });
  
  return pyodideInstance;
}

export async function runPython(code: string): Promise<PythonExecutionResult> {
  const startTime = performance.now();

  try {
    const pyodide = await getPyodide();

    // Usar base64 para evitar problemas de escape no código do usuário
    const base64Code = btoa(unescape(encodeURIComponent(code)));
    const wrappedCode = `
import sys
import base64
from io import StringIO
_buffer = StringIO()
_old_stdout, _old_stderr = sys.stdout, sys.stderr
sys.stdout = sys.stderr = _buffer
try:
    exec(base64.b64decode("${base64Code}").decode("utf-8"))
except Exception as e:
    _buffer.write(str(type(e).__name__) + ": " + str(e))
finally:
    sys.stdout, sys.stderr = _old_stdout, _old_stderr
__pyodide_capture__ = _buffer.getvalue()
`;

    await pyodide.runPythonAsync(wrappedCode);
    const output = (pyodide.globals.get("__pyodide_capture__") as string) ?? "";
    pyodide.globals.delete("__pyodide_capture__");

    const executionTime = performance.now() - startTime;

    return {
      success: true,
      output: output.trim(),
      executionTime,
    };
  } catch (err) {
    const executionTime = performance.now() - startTime;
    const errorMessage = err instanceof Error ? err.message : String(err);

    return {
      success: false,
      output: "",
      error: errorMessage,
      executionTime,
    };
  }
}

export async function runPythonWithSolution(code: string): Promise<{
  output: string;
  solution: unknown;
  error?: string;
  success: boolean;
}> {
  const wrappedCode = `
${code}
try:
    if 'solution' in dir():
        print("__SOLUTION__" + str(solution))
except:
    pass
`;

  const result = await runPython(wrappedCode);

  if (!result.success) {
    return {
      output: result.output,
      solution: undefined,
      error: result.error,
      success: false,
    };
  }

  const solutionMatch = result.output.match(/__SOLUTION__([\s\S]+)/);
  let solution: unknown = undefined;
  let output = result.output;

  if (solutionMatch) {
    try {
      solution = solutionMatch[1].trim();
      output = result.output.replace(/__SOLUTION__[\s\S]+/, "").trim();
    } catch {
      // Manter como string
      solution = solutionMatch[1].trim();
    }
  }

  return {
    output,
    solution,
    success: true,
  };
}
