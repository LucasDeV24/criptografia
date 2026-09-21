'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { runCode, preloadPython } from '@/lib/sandbox/runner';
import { formatCall, formatGot, formatValue } from '@/lib/sandbox/format';
import type { RunOutcome } from '@/lib/sandbox/runner';
import type { CodeChallenge as CodeChallengeType, Language } from '@/types/challenge';
import { Play, Loader2, CheckCircle, XCircle, ChevronDown, AlertCircle, EyeOff, Lightbulb } from 'lucide-react';
import {
  trackLanguageUse,
  trackAttempt,
  saveUserCode,
  getUserCode,
  getPreferredLanguage,
  setPreferredLanguage,
} from '@/lib/progress';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

/** Depois de quantas tentativas erradas a solução de referência é liberada */
const ATTEMPTS_TO_UNLOCK_SOLUTION = 3;

const LANGUAGE_TEMPLATES = {
  javascript: `// Escreva seu código aqui
// Use console.log() para imprimir o resultado

`,
  python: `# Escreva seu código aqui
# Use print() para imprimir o resultado

`,
};

/** Código salvo só serve se ainda for compatível com o exercício (a função existe) */
function usableSavedCode(challenge: CodeChallengeType, language: Language): string | null {
  const saved = getUserCode(challenge.id, language);
  if (saved === null) return null;
  const fn = challenge.tests?.fn[language];
  return fn && !saved.includes(fn) ? null : saved;
}

function initialCode(challenge: CodeChallengeType, language: Language): string {
  return usableSavedCode(challenge, language) ?? challenge.starterCode[language] ?? LANGUAGE_TEMPLATES[language];
}

export default function CodeChallenge({
  challenge,
  onComplete,
}: {
  challenge: CodeChallengeType;
  onComplete?: () => void;
}) {
  // Usa a linguagem escolhida pelo usuário; se o desafio não a suporta, cai na primeira disponível
  const preferredLang = getPreferredLanguage();
  const defaultLang: Language =
    preferredLang && challenge.languages.includes(preferredLang)
      ? preferredLang
      : challenge.languages[0] ?? 'javascript';
  const [code, setCode] = useState(() => initialCode(challenge, defaultLang));
  const [language, setLanguage] = useState<Language>(defaultLang);
  const [output, setOutput] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string>('');
  const [loadingPython, setLoadingPython] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [mismatch, setMismatch] = useState<{ expected: string; got: string } | null>(null);
  const [results, setResults] = useState<RunOutcome['results'] | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const tests = challenge.tests;

  // Carrega o Python em segundo plano para a primeira execução não demorar
  useEffect(() => {
    if (language === 'python') preloadPython();
  }, [language]);

  const handleRun = async () => {
    setStatus('running');
    setOutput('');
    setError('');
    setMismatch(null);
    setResults(null);

    trackLanguageUse(language);

    try {
      const outcome = await runCode(language, code, {
        tests: tests
          ? { fn: tests.fn[language], cases: tests.cases.map(({ args, expected }) => ({ args, expected })) }
          : undefined,
        onLoading: () => setLoadingPython(true),
      });
      setLoadingPython(false);
      setOutput(outcome.stdout.trim());

      if (outcome.error) {
        setStatus('error');
        setError(outcome.errorLine ? `${outcome.error} (linha ${outcome.errorLine})` : outcome.error);
        return;
      }

      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      let isValid: boolean;
      if (tests) {
        setResults(outcome.results ?? []);
        isValid = !!outcome.results && outcome.results.length === tests.cases.length && outcome.results.every((r) => r.ok);
      } else {
        const expected = challenge.expectedOutput ?? '';
        const normalizedOutput = outcome.stdout.trim();
        const normalizedExpected = typeof expected === 'string' ? expected.trim() : expected;
        isValid = Array.isArray(normalizedExpected)
          ? normalizedExpected.some((exp) => exp.trim() === normalizedOutput)
          : normalizedOutput.includes(normalizedExpected) || normalizedExpected === normalizedOutput;

        if (!isValid) {
          const expectedStr = Array.isArray(normalizedExpected) ? normalizedExpected[0] : normalizedExpected;
          setMismatch({
            expected: expectedStr.length > 80 ? expectedStr.substring(0, 80) + '...' : expectedStr,
            got: normalizedOutput.length > 80 ? normalizedOutput.substring(0, 80) + '...' : normalizedOutput || '(vazio)',
          });
        }
      }

      if (isValid) {
        setStatus('success');
        trackAttempt(newAttempts === 1);
        saveUserCode(challenge.id, language, code);
        onComplete?.();
      } else {
        setStatus('error');
        setFailedAttempts((n) => n + 1);
      }
    } catch (err) {
      setLoadingPython(false);
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    }
  };

  const handleLanguageChange = (lang: Language) => {
    if (!challenge.languages.includes(lang)) return;
    setLanguage(lang);
    setPreferredLanguage(lang);
    setCode(initialCode(challenge, lang));
    setShowLanguageDropdown(false);
    setOutput('');
    setError('');
    setResults(null);
    setMismatch(null);
    setStatus('idle');
  };

  const visibleCases = tests?.cases.filter((c) => !c.hidden) ?? [];
  const hiddenCount = (tests?.cases.length ?? 0) - visibleCases.length;
  const solution = challenge.solution?.[language];
  const canSeeSolution = !!solution && (status === 'success' || failedAttempts >= ATTEMPTS_TO_UNLOCK_SOLUTION);
  const passedCount = results?.filter((r) => r.ok).length ?? 0;

  return (
    <div className="code-challenge">
      <div className="challenge-header">
        {challenge.languages.length > 1 && (
          <div className="language-selector">
            <button
              type="button"
              className="language-btn"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              {language === 'javascript' ? 'JavaScript' : 'Python'}
              <ChevronDown className={`icon ${showLanguageDropdown ? 'open' : ''}`} />
            </button>
            {showLanguageDropdown && (
              <div className="language-dropdown">
                {challenge.languages.includes('javascript') && (
                  <button type="button" onClick={() => handleLanguageChange('javascript')}>
                    JavaScript
                  </button>
                )}
                {challenge.languages.includes('python') && (
                  <button type="button" onClick={() => handleLanguageChange('python')}>
                    Python
                  </button>
                )}
              </div>
            )}
          </div>
        )}
        <button
          type="button"
          className="run-btn"
          onClick={handleRun}
          disabled={status === 'running'}
        >
          {status === 'running' ? (
            <Loader2 className="icon spin" />
          ) : (
            <Play className="icon" />
          )}
          {tests ? 'Executar testes' : 'Executar'}
        </button>
      </div>

      {tests && (
        <div className="examples-box">
          <div className="examples-title">Exemplos — sua função será chamada assim:</div>
          <ul>
            {visibleCases.map((c, i) => (
              <li key={i}>
                <code>{formatCall(language, tests.fn[language], c.args)}</code>
                <span className="examples-arrow">→</span>
                <code>{formatValue(language, c.expected)}</code>
              </li>
            ))}
          </ul>
          {hiddenCount > 0 && (
            <div className="examples-hidden">
              <EyeOff className="icon" /> + {hiddenCount} testes ocultos (casos de borda). Pense em todos os cenários!
            </div>
          )}
        </div>
      )}

      <div className="editor-container">
        <MonacoEditor
          height="300px"
          language={language}
          value={code}
          onChange={(value) => setCode(value ?? '')}
          theme="crypto-escape"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'JetBrains Mono, Fira Code, monospace',
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            padding: { top: 16 },
            automaticLayout: true,
          }}
          beforeMount={(monaco) => {
            monaco.editor.defineTheme('crypto-escape', {
              base: 'vs-dark',
              inherit: true,
              rules: [
                { token: 'comment', foreground: '6b6b7b' },
                { token: 'keyword', foreground: '00d4ff' },
                { token: 'string', foreground: '00ff88' },
              ],
              colors: {
                'editor.background': '#12121a',
                'editor.foreground': '#e8e8ed',
              },
            });
          }}
        />
      </div>

      <div className={`output-container output-status-${status}`}>
        <div className="output-header">{tests ? 'Testes' : 'Output'}</div>
        {status === 'running' && (
          <div className="output-loading">
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p className="loading-text">
              {loadingPython ? 'Carregando o Python (só na primeira vez)...' : 'Executando código...'}
            </p>
          </div>
        )}

        {status !== 'running' && results && tests && (
          <div className="tests-panel">
            <div className="tests-summary">
              {passedCount}/{tests.cases.length} testes passaram
            </div>
            <ul className="tests-list">
              {tests.cases.map((c, i) => {
                const r = results[i];
                if (!r) return null;
                return (
                  <li key={i} className={`test-row ${r.ok ? 'test-ok' : 'test-fail'}`}>
                    <span className="test-icon">{r.ok ? '✓' : '✗'}</span>
                    <div className="test-body">
                      <div className="test-name">{c.name ?? `Caso ${i + 1}`}{c.hidden ? ' (oculto)' : ''}</div>
                      {!r.ok && c.hidden && !r.error && (
                        <div className="test-detail">Este teste oculto falhou. Pense em casos de borda (limites, vazio, maiúsculas…).</div>
                      )}
                      {!r.ok && !c.hidden && (
                        <div className="test-detail">
                          <code>{formatCall(language, tests.fn[language], c.args)}</code>
                          {r.error ? (
                            <span className="test-error"> deu erro: {r.error}{r.line ? ` (linha ${r.line})` : ''}</span>
                          ) : (
                            <>
                              {' '}esperado <code className="mismatch-value expected">{formatValue(language, c.expected)}</code>{' '}
                              recebido <code className="mismatch-value got">{formatGot(language, r.got)}</code>
                            </>
                          )}
                        </div>
                      )}
                      {!r.ok && c.hidden && r.error && (
                        <div className="test-detail test-error">Erro em um teste oculto: {r.error}{r.line ? ` (linha ${r.line})` : ''}</div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {status !== 'running' && (output || !tests) && (
          <>
            {tests && <div className="output-header output-subheader">O que seu código imprimiu</div>}
            <pre className={`output-content ${status}`}>{output || '(vazio)'}</pre>
          </>
        )}
        {error && status === 'error' && (
          <pre className="output-error">{error}</pre>
        )}
        {status === 'success' && (
          <div className="result-feedback success-animation">
            <CheckCircle className="icon" />
            <span>Correto! Você desbloqueou a próxima sala.</span>
          </div>
        )}
        {status === 'error' && !mismatch && !results && (
          <div className="result-feedback error-animation">
            <XCircle className="icon" />
            <span>Erro! Verifique seu código e tente novamente.</span>
          </div>
        )}
        {status === 'error' && results && !error && (
          <div className="result-feedback error-animation">
            <XCircle className="icon" />
            <span>Alguns testes falharam. Leia os detalhes acima e ajuste sua função.</span>
          </div>
        )}
        {mismatch && status === 'error' && (
          <div className="result-feedback error-animation">
            <AlertCircle className="icon" />
            <div className="mismatch-details">
              <span>Output incorreto</span>
              <div className="mismatch-compare">
                <div className="mismatch-row">
                  <span className="mismatch-label">Esperado:</span>
                  <code className="mismatch-value expected">{mismatch.expected}</code>
                </div>
                <div className="mismatch-row">
                  <span className="mismatch-label">Recebido:</span>
                  <code className="mismatch-value got">{mismatch.got}</code>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {canSeeSolution && (
        <details className="solution-box">
          <summary>
            <Lightbulb className="icon" />
            {status === 'success' ? 'Ver a solução de referência' : 'Travou? Ver a solução de referência'}
          </summary>
          <pre>{solution}</pre>
          <p className="solution-note">Compare com o seu código: existem várias formas corretas de resolver.</p>
        </details>
      )}
    </div>
  );
}
