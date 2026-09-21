'use client';

import { useEffect, useRef, useState } from 'react';
import { Flag, RotateCcw } from 'lucide-react';
import { COMMAND_HELP, execute, initialState, promptOf } from '@/lib/labs/terminal-engine';
import type { Scenario } from '@/lib/labs/terminal-engine';

type Line = { kind: 'cmd' | 'out'; prompt?: string; text: string };

const welcomeLines = (scenario: Scenario): Line[] =>
  scenario.welcome.map((text) => ({ kind: 'out', text }));

export default function TerminalLab({
  scenario,
  onComplete,
}: {
  scenario: Scenario;
  onComplete?: () => void;
}) {
  const [state, setState] = useState(() => initialState(scenario));
  const [lines, setLines] = useState<Line[]>(() => welcomeLines(scenario));
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = screenRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const masked = state.pending !== null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input;
    const echo: Line = { kind: 'cmd', prompt: promptOf(scenario, state), text: masked ? '' : raw };
    if (!masked && raw.trim()) setHistory((h) => [...h, raw]);
    setHistoryIdx(-1);
    setInput('');

    const result = execute(scenario, state, raw);
    setState(result.state);
    setLines((prev) => [
      ...(result.clear ? [] : [...prev, echo]),
      ...result.lines.map((text): Line => ({ kind: 'out', text })),
    ]);

    if (!done && result.lines.some((l) => l.includes(scenario.flag))) {
      setDone(true);
      onComplete?.();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (masked || !history.length) return;
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(next);
      setInput(history[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === -1) return;
      const next = historyIdx + 1;
      if (next >= history.length) {
        setHistoryIdx(-1);
        setInput('');
      } else {
        setHistoryIdx(next);
        setInput(history[next]);
      }
    }
  };

  const reset = () => {
    setState(initialState(scenario));
    setLines(welcomeLines(scenario));
    setInput('');
    setHistoryIdx(-1);
    inputRef.current?.focus();
  };

  return (
    <div className="lab lab-terminal-wrap">
      <div className="lab-toolbar">
        <span className="lab-badge">SIMULADO · nada aqui sai do seu navegador</span>
        <button type="button" className="lab-btn" onClick={reset}>
          <RotateCcw className="icon" /> Reiniciar
        </button>
      </div>

      <div
        className="lab-terminal"
        ref={screenRef}
        role="log"
        aria-live="polite"
        aria-label="Terminal simulado"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={`lab-line ${line.kind === 'cmd' ? 'lab-cmd' : ''} ${line.text.includes('FLAG{') ? 'lab-flag-line' : ''}`}
          >
            {line.kind === 'cmd' && <span className="lab-prompt">{line.prompt} </span>}
            {line.text}
          </div>
        ))}

        <form className="lab-input-row" onSubmit={handleSubmit}>
          <span className="lab-prompt">{promptOf(scenario, state)}</span>
          <input
            ref={inputRef}
            className="lab-input"
            type={masked ? 'password' : 'text'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Digite um comando"
          />
        </form>
      </div>

      {done && (
        <div className="lab-success" role="status">
          <Flag className="icon" />
          <div>
            <strong>Flag capturada!</strong>
            <div className="lab-flag-code">{scenario.flag}</div>
          </div>
        </div>
      )}

      <details className="lab-cheatsheet">
        <summary>Comandos úteis</summary>
        <ul>
          {scenario.commands.map((c) => (
            <li key={c}>
              <code>{c}</code> — {COMMAND_HELP[c]}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
