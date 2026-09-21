export type Language = "javascript" | "python";

export interface BaseChallenge {
  id: string;
  episode: number;
  room: string;
  title: string;
  description: string;
  hints?: string[];
  explanation?: string;
  context?: string;
}

/** Um caso de teste de função. `args` e `expected` precisam ser JSON (texto, número, booleano, lista, objeto, null). */
export interface TestCase {
  /** Rótulo mostrado ao aluno (ex.: "senha certa") */
  name?: string;
  args: unknown[];
  expected: unknown;
  /** Teste oculto: o aluno só vê "falhou", sem entrada nem resposta esperada (casos de borda) */
  hidden?: boolean;
}

/** Validação por testes: o aluno escreve uma função e nós a chamamos com vários casos */
export interface FunctionTests {
  /** Nome da função em cada linguagem (camelCase no JS, snake_case no Python) */
  fn: Record<Language, string>;
  cases: TestCase[];
}

export interface CodeChallenge extends BaseChallenge {
  type: "code";
  instructions: string;
  languages: Language[];
  starterCode: Partial<Record<Language, string>>;
  /**
   * Validação por saída (exercícios antigos): string exata ou array de respostas válidas.
   * Exercícios novos devem usar `tests`.
   */
  expectedOutput?: string | string[];
  /** Validação por testes de função (recomendado): impede "resolver" só imprimindo a resposta */
  tests?: FunctionTests;
  /** Solução de referência, liberada depois de acertar ou de 3 tentativas erradas */
  solution?: Partial<Record<Language, string>>;
  validateByOutput?: boolean;
  expectedRegex?: RegExp;
  difficulty: "easy" | "medium" | "hard";
}

export interface TheoryChallenge extends BaseChallenge {
  type: "theory";
  content: string;
}

/** Laboratório prático: terminal ou site vulnerável, tudo simulado no navegador */
export type LabId =
  | "terminal-recon"
  | "terminal-ssh"
  | "term-nav"
  | "term-paths"
  | "term-read"
  | "term-files"
  | "term-search"
  | "term-pipes"
  | "term-perm"
  | "web-sqli"
  | "web-xss"
  | "web-idor";

export interface LabChallenge extends BaseChallenge {
  type: "lab";
  instructions: string;
  labId: LabId;
  difficulty: "easy" | "medium" | "hard";
}

export type Challenge = CodeChallenge | TheoryChallenge | LabChallenge;

export interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime?: number;
}

export interface ValidationResult {
  passed: boolean;
  message: string;
  expected?: string;
  received?: string;
}
