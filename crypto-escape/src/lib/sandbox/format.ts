import type { Language } from '@/types/challenge';

/** Valor JSON escrito como literal da linguagem (Python usa True/False/None) */
export function formatValue(language: Language, v: unknown): string {
  if (language === 'javascript') return JSON.stringify(v) ?? 'undefined';
  if (v === null) return 'None';
  if (v === true) return 'True';
  if (v === false) return 'False';
  if (Array.isArray(v)) return `[${v.map((x) => formatValue(language, x)).join(', ')}]`;
  if (typeof v === 'object' && v !== null) {
    return `{${Object.entries(v).map(([k, x]) => `${JSON.stringify(k)}: ${formatValue(language, x)}`).join(', ')}}`;
  }
  return JSON.stringify(v) ?? 'None';
}

export function formatCall(language: Language, fn: string, args: unknown[]): string {
  return `${fn}(${args.map((a) => formatValue(language, a)).join(', ')})`;
}

/** O worker devolve o retorno como texto JSON; converte para o literal da linguagem */
export function formatGot(language: Language, got: string | undefined): string {
  if (got === undefined) return '';
  try {
    return formatValue(language, JSON.parse(got));
  } catch {
    return got;
  }
}
