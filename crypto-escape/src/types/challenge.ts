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

export interface CodeChallenge extends BaseChallenge {
  type: "code";
  instructions: string;
  languages: Language[];
  starterCode: Partial<Record<Language, string>>;
  /** Resposta esperada - pode ser string exata ou array de respostas válidas */
  expectedOutput: string | string[];
  validateByOutput?: boolean;
  expectedRegex?: RegExp;
  difficulty: "easy" | "medium" | "hard";
}

export interface TheoryChallenge extends BaseChallenge {
  type: "theory";
  content: string;
}

export type Challenge = CodeChallenge | TheoryChallenge;

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
