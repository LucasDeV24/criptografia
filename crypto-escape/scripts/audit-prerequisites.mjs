/**
 * Auditoria de pré-requisitos (rode: npm run audit:prereqs [-- --episodes 0-7]).
 * Percorre o curso NA ORDEM (episódios 0..46) e aponta conceitos que um exercício usa
 * (no código inicial, na solução, nas dicas ou no enunciado) ANTES de uma sala de teoria
 * tê-los ENSINADO. É uma heurística por texto: serve para achar buracos, não para provar que não há.
 *
 * Um conceito conta como "ensinado" quando uma sala de teoria anterior casa TODAS as regex de `teach`
 * (por isso, só citar a palavra não basta: a sala precisa explicar). Uma sala pode também declarar
 * `teaches: ['id']` explicitamente.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'src/data/challenges');

// id, rótulo, uso no código/enunciado (use) e o que a teoria precisa conter para ensinar (teach: todas as regex)
const CONCEPTS = [
  { id: 'funcoes', label: 'funções (def/function)', use: /\bfunction\s+\w+\s*\(|\bdef\s+\w+\s*\(/, teach: [/par[aâ]metros?/i, /\breturn\b/, /\b(def|function)\b/, /indenta[cç][aã]o|recuo/i] },
  { id: 'return', label: 'return', use: /\breturn\b/, teach: [/\breturn\b/] },
  { id: 'if', label: 'if/else', use: /\bif\s*\(|\bif\s+\S+.*:|\belse\b|\belif\b/, teach: [/\bif\b/, /\belse\b|senão/i] },
  { id: 'for', label: 'loop for', use: /\bfor\s*\(|\bfor\s+\w+\s+in\b/, teach: [/\bfor\b/, /loop|laço/i] },
  { id: 'while', label: 'loop while', use: /\bwhile\b/, teach: [/\bwhile\b/] },
  { id: 'range', label: 'range()', use: /\brange\s*\(/, teach: [/\brange\b/, /exclu|não entra/i] },
  { id: 'lista', label: 'listas/arrays', use: /\.(push|append)\(|=\s*\[\s*\]|\[\s*["'\d]/, teach: [/\blistas?\b/i, /\barrays?\b/i] },
  { id: 'push', label: 'push/append', use: /\.(push|append)\(/, teach: [/\bpush\b/, /\bappend\b/] },
  { id: 'tamanho', label: '.length / len()', use: /\.length\b|\blen\s*\(/, teach: [/\.length/, /\blen\s*\(/] },
  { id: 'indice', label: 'acesso por posição [i]', use: /\w\[\s*(\d+|[a-z_]\w*|[a-z_]\w*\s*[-+]\s*\d+)\s*\]/i, teach: [/posi[cç][aã]o|índice|indice/i, /\[\s*0\s*\]/] },
  { id: 'objeto', label: 'objetos/dicionários', use: /\{\s*["']?\w+["']?\s*:\s*/, teach: [/\bobjetos?\b/i, /dicion[aá]rios?/i] },
  { id: 'dictget', label: 'dict.get(chave, padrão)', use: /\.get\s*\(/, teach: [/\.get\(/] },
  { id: 'modulo', label: 'resto da divisão (%)', use: /\s%\s|%\s*\d/, teach: [/resto da divis/i, /%/] },
  { id: 'ordchr', label: 'ord/chr/charCodeAt', use: /\bord\s*\(|\bchr\s*\(|charCodeAt|fromCharCode/, teach: [/ord\s*\(|charCodeAt/, /chr\s*\(|fromCharCode/] },
  { id: 'minmai', label: 'lower/upper', use: /toLowerCase|toUpperCase|\.lower\(|\.upper\(/, teach: [/toLowerCase|\.lower/, /toUpperCase|\.upper/] },
  { id: 'includes', label: 'includes / in', strip: /\bfor\s+\w+(\s*,\s*\w+)?\s+in\b/g, use: /\.includes\(|\bin\s+[a-z"'(]|\bnot\s+in\b/i, teach: [/includes/, /\bin\b/] },
  { id: 'split', label: 'split', use: /\.split\(/, teach: [/\bsplit\b/] },
  { id: 'replace', label: 'replace', use: /\.replace(All)?\(/, teach: [/\breplace\b/] },
  { id: 'slice', label: 'slice / fatiar', use: /\.slice\(|\[\s*\w*\s*:\s*\w*\s*\]/, teach: [/\bslice\b/, /\[\s*\w*\s*:/] },
  { id: 'indexof', label: 'indexOf / index', use: /indexOf|\.index\(/, teach: [/indexOf/, /\.index\(/] },
  { id: 'e_ou', label: '&& / || / and / or', use: /&&|\|\||\band\b|\bor\b/, teach: [/&&/, /\band\b/] },
  { id: 'concat', label: 'juntar textos com +', use: /["']\s*\+\s*\w|\w\s*\+\s*["']/, teach: [/concatena|juntar textos|junta textos/i, /\+/] },
  { id: 'const', label: 'variáveis (const/let)', use: /\b(const|let)\s+\w+\s*=/, teach: [/vari[aá]veis?/i, /\bconst\b/] },
  { id: 'trycatch', label: 'try/catch', use: /\btry\b|\bcatch\b|\bexcept\b/, teach: [/\btry\b/, /\bcatch\b|\bexcept\b/] },
  { id: 'import', label: 'import / módulos', use: /^\s*(import|from)\s+\w+/m, teach: [/\bimport\b/, /módulo|biblioteca/i] },
  { id: 'regex', label: 'expressões regulares', use: /\bre\.|new RegExp|\/[^/\n]+\/[gimsu]*\.test|\.match\(/, teach: [/regex|express[oõ]es regulares/i] },
  { id: 'seta', label: 'função curta (=> / lambda)', use: /=>|\blambda\b/, teach: [/=>|lambda/, /função curta|função sem nome/i] },
  { id: 'mapfilter', label: 'map / filter / reduce', use: /\.(map|filter|reduce)\(/, teach: [/\bmap\b|\bfilter\b/] },
  { id: 'json', label: 'JSON', use: /JSON\.|json\./, teach: [/\bjson\b/i] },
  { id: 'conv', label: 'conversão de tipo (str/int/parseInt)', use: /\bint\s*\(|\bstr\s*\(|parseInt|Number\s*\(|parseFloat|String\s*\(/, teach: [/\bstr\s*\(/, /converter|convers[aã]o/i] },
  { id: 'base64', label: 'Base64 (atob/btoa/base64)', use: /\batob\b|\bbtoa\b|base64\./, teach: [/base64/i, /codific/i] },
  { id: 'hash', label: 'hash (crypto/hashlib)', use: /hashlib|createHash|crypto\.subtle|\bmd5\b|sha-?256/i, teach: [/\bhash\b/i, /sha|md5/i] },
  { id: 'sort', label: 'ordenação (sort/sorted)', use: /\.sort\(|\bsorted\(/, teach: [/\bsort\b|ordena/i] },
  { id: 'math', label: 'Math / math', use: /\bMath\.|\bmath\./, teach: [/\bMath\b|módulo math/i] },
  { id: 'join', label: 'join / juntar lista em texto', use: /\.join\(/, teach: [/\bjoin\b/] },
  { id: 'trim', label: 'trim / strip', use: /\.trim\(|\.strip\(/, teach: [/\btrim\b/, /\bstrip\b/] },
  { id: 'startswith', label: 'startsWith / endsWith', use: /startsWith|endsWith|startswith|endswith/, teach: [/startsWith/, /startswith/i] },
  { id: 'keys', label: 'Object.keys / .items() / .keys()', use: /Object\.(keys|values|entries)|\.items\(|\.keys\(|\.values\(/, teach: [/Object\.keys|\.keys\(/, /\.items\(|\.values\(|entries/] },
  { id: 'template', label: 'template string / f-string', use: /\$\{|\bf"|\bf'/, teach: [/template|f-string|\$\{/i] },
  { id: 'forof', label: 'for...of / enumerate', use: /for\s*\(\s*(const|let)\s+\w+\s+of\b|\benumerate\(/, teach: [/\bfor\b.*\bof\b|enumerate/] },
  { id: 'breakcont', label: 'break / continue', use: /\bbreak\b|\bcontinue\b/, teach: [/\bbreak\b/, /\bcontinue\b/] },
  { id: 'classe', label: 'classes', use: /^\s*class\s+\w+/m, teach: [/\bclasse\b/i] },
];

const teaches = (k, text) => [].concat(k.teach).every((re) => re.test(text));

// A ordem do curso vem de src/data/challenges/index.ts (chave = episódio)
const indexSrc = fs.readFileSync(path.join(dir, 'index.ts'), 'utf8');
const imports = new Map([...indexSrc.matchAll(/import \{ (\w+) \} from '\.\/([\w-]+)'/g)].map((m) => [m[1], m[2]]));
const byEpisode = new Map();
for (const m of indexSrc.matchAll(/^\s+(\d+):\s*(\w+),/gm)) {
  const file = imports.get(m[2]);
  if (!file) continue;
  const mod = await import(pathToFileURL(path.join(dir, `${file}.ts`)).href);
  byEpisode.set(Number(m[1]), mod[m[2]]);
}

const arg = process.argv.indexOf('--episodes');
const only = arg >= 0 ? process.argv[arg + 1].split('-').map(Number) : null;
const taught = new Set();
const rows = [];

const { COURSE_ORDER } = await import(pathToFileURL(path.join(root, 'src/data/course-order.ts')).href);
for (const ep of COURSE_ORDER.filter((e) => byEpisode.has(e))) {
  for (const c of byEpisode.get(ep)) {
    if (c.type === 'theory') {
      for (const k of CONCEPTS) if (teaches(k, `${c.title}\n${c.description}\n${c.content}`)) taught.add(k.id);
      for (const id of c.teaches ?? []) taught.add(id);
      continue;
    }
    if (c.type !== 'code') continue;
    const text = [
      c.description, c.instructions,
      c.starterCode?.javascript, c.starterCode?.python,
      c.solution?.javascript, c.solution?.python,
      ...(c.hints ?? []),
    ].filter(Boolean).join('\n');
    const missing = CONCEPTS.filter((k) => k.use.test(k.strip ? text.replace(k.strip, '') : text) && !taught.has(k.id)).map((k) => k.label);
    if (missing.length && (!only || (ep >= only[0] && ep <= only[1]))) {
      rows.push({ ep, room: c.room, id: c.id, title: c.title, missing });
    }
    // depois de resolvido, a explicação pode ensinar o conceito para as salas seguintes
    for (const k of CONCEPTS) if (k.use.test(k.strip ? text.replace(k.strip, '') : text) && c.explanation && teaches(k, c.explanation)) taught.add(k.id);
  }
}

for (const r of rows) console.log(`Ep ${String(r.ep).padStart(2)} sala ${String(r.room).padEnd(5)} [${r.id}] ${r.title}\n     usa antes de ensinar: ${r.missing.join(', ')}`);
console.log(`\n${rows.length} exercício(s) usam conceitos ainda não ensinados${only ? ` (episódios ${only[0]}-${only[1]})` : ''}.`);
process.exit(rows.length ? 1 : 0);
