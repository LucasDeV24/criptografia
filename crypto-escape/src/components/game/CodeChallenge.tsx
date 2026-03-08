'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { runJavaScript } from '@/lib/sandbox/javascript-runner';
import { runPython } from '@/lib/sandbox/python-runner';
import type { CodeChallenge as CodeChallengeType } from '@/types/challenge';
import { Play, Loader2, CheckCircle, XCircle, ChevronDown, AlertCircle } from 'lucide-react';
import { trackLanguageUse, trackAttempt } from '@/lib/progress';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const LANGUAGE_TEMPLATES = {
  javascript: `// Escreva seu código aqui
// Use console.log() para imprimir o resultado

`,
  python: `# Escreva seu código aqui
# Use print() para imprimir o resultado

`,
};

export default function CodeChallenge({
  challenge,
  onComplete,
}: {
  challenge: CodeChallengeType;
  onComplete?: () => void;
}) {
  const defaultLang = challenge.languages[0] ?? 'javascript';
  const [code, setCode] = useState(
    challenge.starterCode[defaultLang] ?? LANGUAGE_TEMPLATES[defaultLang]
  );
  const [language, setLanguage] = useState<'javascript' | 'python'>(defaultLang);
  const [output, setOutput] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string>('');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [mismatch, setMismatch] = useState<{ expected: string; got: string } | null>(null);
  const [attempts, setAttempts] = useState(0);

  const handleRun = useCallback(async () => {
    setStatus('running');
    setOutput('');
    setError('');
    setMismatch(null);

    trackLanguageUse(language);

    try {
      let result;

      if (language === 'javascript') {
        result = await runJavaScript(code);
      } else {
        result = await runPython(code);
      }

      setOutput(result.output);

      if (result.error) {
        setStatus('error');
        setError(result.error);
        return;
      }

      const expected = challenge.expectedOutput;
      const normalizedOutput = result.output.trim();
      const normalizedExpected = typeof expected === 'string' ? expected.trim() : expected;

      const isValid =
        Array.isArray(normalizedExpected)
          ? normalizedExpected.some((exp) => exp.trim() === normalizedOutput)
          : normalizedOutput.includes(normalizedExpected as string) || normalizedExpected === normalizedOutput;

      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (isValid) {
        setStatus('success');
        trackAttempt(newAttempts === 1);
        onComplete?.();
      } else {
        setStatus('error');
        const expectedStr = Array.isArray(normalizedExpected) ? normalizedExpected[0] : (normalizedExpected as string);
        setMismatch({
          expected: expectedStr.length > 80 ? expectedStr.substring(0, 80) + '...' : expectedStr,
          got: normalizedOutput.length > 80 ? normalizedOutput.substring(0, 80) + '...' : normalizedOutput || '(vazio)',
        });
      }
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    }
  }, [code, language, challenge.expectedOutput, onComplete, attempts]);

  const handleLanguageChange = (lang: 'javascript' | 'python') => {
    if (!challenge.languages.includes(lang)) return;
    setLanguage(lang);
    setCode(challenge.starterCode[lang] ?? LANGUAGE_TEMPLATES[lang]);
    setShowLanguageDropdown(false);
    setOutput('');
    setStatus('idle');
  };

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
          Executar
        </button>
      </div>

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
        <div className="output-header">Output</div>
        {status === 'running' && (
          <div className="output-loading">
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p className="loading-text">Executando código...</p>
          </div>
        )}
        {status !== 'running' && (
          <pre className={`output-content ${status}`}>
            {output || '(vazio)'}
          </pre>
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
        {status === 'error' && !mismatch && (
          <div className="result-feedback error-animation">
            <XCircle className="icon" />
            <span>Erro! Verifique seu código e tente novamente.</span>
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
    </div>
  );
}
