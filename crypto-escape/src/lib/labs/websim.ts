/**
 * Simuladores dos sites vulneráveis (modo hacker).
 * Nada aqui executa código do usuário nem faz requisições: cada função só
 * INTERPRETA o texto digitado e devolve o que aconteceria no site fictício.
 */

// ======================= SQL Injection =======================

export interface SqlUser {
  id: number;
  username: string;
  password: string;
  role: "admin" | "user";
}

export const SQLI_FLAG = "FLAG{sqli_burlou_o_login}";

export const SQL_USERS: SqlUser[] = [
  { id: 1, username: "admin", password: "Sup3rS3nh4!Imp0ssivel", role: "admin" },
  { id: 2, username: "maria", password: "123456", role: "user" },
  { id: 3, username: "joao", password: "qwerty", role: "user" },
];

/** Partes da query, para mostrar o que o usuário digitou destacado */
export function queryParts(username: string, password: string): string[] {
  return ["SELECT * FROM users WHERE username = '", username, "' AND password = '", password, "'"];
}

export function buildLoginQuery(username: string, password: string): string {
  return queryParts(username, password).join("");
}

type Token =
  | { t: "str"; v: string; pos: number }
  | { t: "num"; v: number; pos: number }
  | { t: "id"; v: string; pos: number }
  | { t: "kw"; v: "AND" | "OR" | "NOT"; pos: number }
  | { t: "op"; v: string; pos: number };

class SqlSyntaxError extends Error {
  constructor(public near: string) {
    super(near);
  }
}

class SqlColumnError extends Error {
  constructor(public column: string) {
    super(column);
  }
}

function tokenize(src: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) {
      i++;
    } else if (src.startsWith("--", i) || c === "#") {
      break; // comentário até o fim da linha
    } else if (src.startsWith("/*", i)) {
      const end = src.indexOf("*/", i + 2);
      if (end === -1) break;
      i = end + 2;
    } else if (c === "'") {
      let value = "";
      let j = i + 1;
      let closed = false;
      while (j < src.length) {
        if (src[j] === "'" && src[j + 1] === "'") {
          value += "'";
          j += 2;
        } else if (src[j] === "'") {
          closed = true;
          j++;
          break;
        } else {
          value += src[j++];
        }
      }
      if (!closed) throw new SqlSyntaxError(src.slice(i));
      tokens.push({ t: "str", v: value, pos: i });
      i = j;
    } else if (/\d/.test(c)) {
      const m = /^\d+(\.\d+)?/.exec(src.slice(i))!;
      tokens.push({ t: "num", v: Number(m[0]), pos: i });
      i += m[0].length;
    } else if (/[A-Za-z_]/.test(c)) {
      const m = /^[A-Za-z_]\w*/.exec(src.slice(i))!;
      const upper = m[0].toUpperCase();
      if (upper === "AND" || upper === "OR" || upper === "NOT") tokens.push({ t: "kw", v: upper, pos: i });
      else tokens.push({ t: "id", v: m[0].toLowerCase(), pos: i });
      i += m[0].length;
    } else {
      const m = /^(<=|>=|<>|!=|=|<|>|\(|\))/.exec(src.slice(i));
      if (!m) throw new SqlSyntaxError(src.slice(i));
      tokens.push({ t: "op", v: m[0], pos: i });
      i += m[0].length;
    }
  }
  return tokens;
}

type Value = string | number | boolean;
type Node = (row: SqlUser) => Value;

function truthy(v: Value): boolean {
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  const n = Number(v);
  return !Number.isNaN(n) && n !== 0; // como no MySQL: 'abc' vale 0
}

function compare(a: Value, b: Value, op: string): boolean {
  const numeric = typeof a === "number" || typeof b === "number";
  const x: string | number = numeric ? Number(a) : String(a);
  const y: string | number = numeric ? Number(b) : String(b);
  switch (op) {
    case "=":
      return x === y;
    case "!=":
    case "<>":
      return x !== y;
    case "<":
      return x < y;
    case ">":
      return x > y;
    case "<=":
      return x <= y;
    default:
      return x >= y;
  }
}

/** Interpreta a condição WHERE (AND, OR, NOT, comparações, parênteses) */
function parseWhere(src: string): Node {
  const tokens = tokenize(src);
  let p = 0;
  const near = () => (tokens[p] ? src.slice(tokens[p].pos) : "");
  const fail = (): never => {
    throw new SqlSyntaxError(near());
  };

  const operand = (): Node => {
    const tok = tokens[p];
    if (!tok) return fail();
    if (tok.t === "str" || tok.t === "num") {
      p++;
      return () => tok.v;
    }
    if (tok.t === "id") {
      p++;
      const column = tok.v as keyof SqlUser;
      if (!["id", "username", "password", "role"].includes(column)) throw new SqlColumnError(tok.v);
      return (row) => row[column];
    }
    return fail();
  };

  const primary = (): Node => {
    const tok = tokens[p];
    if (tok?.t === "op" && tok.v === "(") {
      p++;
      const inner = or();
      const close = tokens[p];
      if (!(close?.t === "op" && close.v === ")")) fail();
      p++;
      return inner;
    }
    const left = operand();
    const opTok = tokens[p];
    if (opTok?.t === "op" && opTok.v !== "(" && opTok.v !== ")") {
      p++;
      const right = operand();
      return (row) => compare(left(row), right(row), opTok.v);
    }
    return left;
  };

  const not = (): Node => {
    const tok = tokens[p];
    if (tok?.t === "kw" && tok.v === "NOT") {
      p++;
      const inner = not();
      return (row) => !truthy(inner(row));
    }
    return primary();
  };

  const and = (): Node => {
    let left = not();
    while (tokens[p]?.t === "kw" && (tokens[p] as { v: string }).v === "AND") {
      p++;
      const l = left;
      const r = not();
      left = (row) => truthy(l(row)) && truthy(r(row));
    }
    return left;
  };

  const or = (): Node => {
    let left = and();
    while (tokens[p]?.t === "kw" && (tokens[p] as { v: string }).v === "OR") {
      p++;
      const l = left;
      const r = and();
      left = (row) => truthy(l(row)) || truthy(r(row));
    }
    return left;
  };

  const root = or();
  if (p < tokens.length) fail(); // sobrou algo que não faz sentido
  return root;
}

export interface LoginResult {
  query: string;
  rows: SqlUser[];
  error?: string;
}

/** Executa o login vulnerável (a query é montada por concatenação de texto) */
export function runLogin(username: string, password: string): LoginResult {
  const query = buildLoginQuery(username, password);
  try {
    const where = `username = '${username}' AND password = '${password}'`;
    const cond = parseWhere(where);
    const rows = SQL_USERS.filter((row) => truthy(cond(row)));
    return { query, rows };
  } catch (err) {
    if (err instanceof SqlSyntaxError) {
      const near = err.near.length > 40 ? err.near.slice(0, 40) + "…" : err.near;
      return {
        query,
        rows: [],
        error: `ERROR 1064 (42000): You have an error in your SQL syntax; verifique perto de '${near}'`,
      };
    }
    if (err instanceof SqlColumnError) {
      return {
        query,
        rows: [],
        error: `ERROR 1054 (42S22): Unknown column '${err.column}' in 'where clause'`,
      };
    }
    throw err;
  }
}

// ======================= XSS =======================

export const XSS_FLAG = "FLAG{xss_roubou_o_cookie_do_admin}";
export const ADMIN_COOKIE = `session=${XSS_FLAG}`;

export interface XssResult {
  executed: boolean;
  /** Mensagens que apareceriam em janelas alert() */
  alerts: string[];
  cookieLeak: boolean;
  /** Trechos de código JavaScript que rodariam na vítima */
  scripts: string[];
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Descobre se o HTML digitado executaria JavaScript no navegador de quem
 * abrir a página (<script>, atributos on..., javascript:). O código NUNCA é
 * executado de verdade: só analisamos o texto.
 */
export function simulateXss(html: string): XssResult {
  const scripts: string[] = [];

  for (const m of html.matchAll(/<script\b[^>]*>([\s\S]*?)(?:<\/script\s*>|$)/gi)) scripts.push(m[1]);

  for (const m of html.matchAll(/<\w+\b[^>]*?\son\w+\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi)) {
    scripts.push(m[1] ?? m[2] ?? m[3] ?? "");
  }

  for (const m of html.matchAll(
    /\b(?:href|src)\s*=\s*(?:"\s*javascript:([^"]*)"|'\s*javascript:([^']*)'|\s*javascript:([^\s>]+))/gi
  )) {
    scripts.push(m[1] ?? m[2] ?? m[3] ?? "");
  }

  const alerts: string[] = [];
  let cookieLeak = false;
  for (const code of scripts) {
    if (/document\s*\.\s*cookie/i.test(code)) cookieLeak = true;
    for (const a of code.matchAll(/\balert\s*\(([^)]*)\)/gi)) {
      const arg = a[1].trim();
      if (/document\s*\.\s*cookie/i.test(arg)) alerts.push(ADMIN_COOKIE);
      else if (/^(["'`])([\s\S]*)\1$/.test(arg)) alerts.push(arg.slice(1, -1));
      else alerts.push(arg || "undefined");
    }
  }

  return { executed: scripts.length > 0, alerts, cookieLeak, scripts };
}

// ======================= IDOR =======================

export const IDOR_FLAG = "FLAG{idor_id_sequencial_sem_checagem}";
export const IDOR_HOME = "https://meubanco.local/extrato?id=1042";

export interface IdorAccount {
  titular: string;
  saldo: string;
  transacoes: [string, string][];
  observacao?: string;
}

const IDOR_ACCOUNTS: Record<string, IdorAccount> = {
  "1042": {
    titular: "Você (cliente demo)",
    saldo: "R$ 1.250,00",
    transacoes: [
      ["Mercado Central", "-R$ 89,90"],
      ["Salário", "+R$ 2.400,00"],
      ["Streaming", "-R$ 39,90"],
    ],
  },
  "1001": {
    titular: "Helena Prado (Diretora Financeira)",
    saldo: "R$ 892.340,10",
    transacoes: [
      ["Transferência para fornecedor", "-R$ 45.000,00"],
      ["Bônus anual", "+R$ 120.000,00"],
    ],
    observacao: `Nota interna do banco: ${IDOR_FLAG}`,
  },
  "1002": {
    titular: "Marcos Lima",
    saldo: "R$ 15.420,00",
    transacoes: [["Aluguel", "-R$ 2.800,00"]],
  },
  "1043": {
    titular: "Ana Beatriz Souza",
    saldo: "R$ 3.310,55",
    transacoes: [["Farmácia", "-R$ 62,10"]],
  },
};

export type IdorResponse =
  | { status: "ok"; id: string; account: IdorAccount }
  | { status: "notfound"; message: string }
  | { status: "error"; message: string };

/** Simula o servidor: devolve a conta do `id` pedido SEM checar quem está logado (a falha) */
export function idorRequest(input: string): IdorResponse {
  const raw = input.trim();
  let url: URL;
  try {
    url = new URL(/^[a-z]+:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return { status: "error", message: "Endereço inválido." };
  }
  if (url.hostname !== "meubanco.local") {
    return { status: "error", message: `Não foi possível acessar ${url.hostname}. Neste laboratório só existe meubanco.local.` };
  }
  if (url.pathname !== "/extrato") {
    return { status: "notfound", message: "404 — página não encontrada." };
  }
  const id = url.searchParams.get("id") ?? "";
  const account = IDOR_ACCOUNTS[id];
  if (!account) return { status: "notfound", message: `Conta ${id || "(vazia)"} não encontrada.` };
  return { status: "ok", id, account };
}
