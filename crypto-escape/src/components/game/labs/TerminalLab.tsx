'use client';

import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, Circle, Clock, Flag, RotateCcw } from 'lucide-react';
import { COMMAND_HELP, execute, initialState, promptOf, tasksDone } from '@/lib/labs/terminal-engine';
import type { Scenario } from '@/lib/labs/terminal-engine';

type Line = { kind: 'cmd' | 'out'; prompt?: string; text: string };

const welcomeLines = (scenario: Scenario): Line[] =>
  scenario.welcome.map((text) => ({ kind: 'out', text }));

const formatTime = (totalSeconds: number): string => {
  const s = Math.max(0, totalSeconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

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

  // Cronômetro (só existe se o laboratório definir timeLimitSeconds)
  const hasTimer = scenario.timeLimitSeconds !== undefined;
  const deadlineRef = useRef(0);
  const [remaining, setRemaining] = useState(scenario.timeLimitSeconds ?? 0);
  // "Falhou" é derivado (não é estado próprio): fica true assim que o tempo chega a 0 sem ter concluído
  const failed = hasTimer && remaining <= 0 && !done;

  // Define o horário-limite fora do render (Date.now() não pode ser chamado durante o render)
  useEffect(() => {
    if (hasTimer) deadlineRef.current = Date.now() + (scenario.timeLimitSeconds ?? 0) * 1000;
  }, [hasTimer, scenario.timeLimitSeconds]);

  useEffect(() => {
    const el = screenRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  // Recalcula o tempo restante a partir de um horário-limite real (evita atrasos do setInterval)
  useEffect(() => {
    if (!hasTimer) return;
    const id = setInterval(() => {
      setRemaining(Math.max(0, Math.ceil((deadlineRef.current - Date.now()) / 1000)));
    }, 250);
    return () => clearInterval(id);
  }, [hasTimer]);

  const masked = state.pending !== null;
  const tasks = scenario.tasks ?? [];
  const taskFlags = tasksDone(scenario, state);
  const tasksLeft = taskFlags.filter((d) => !d).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (failed) return;
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

    const flagFound = !!scenario.flag && result.lines.some((l) => l.includes(scenario.flag as string));
    const allTasksDone = tasks.length > 0 && tasksDone(scenario, result.state).every(Boolean);
    if (!done && (flagFound || allTasksDone)) {
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
    setDone(false);
    if (hasTimer) {
      deadlineRef.current = Date.now() + (scenario.timeLimitSeconds ?? 0) * 1000;
      setRemaining(scenario.timeLimitSeconds ?? 0);
    }
    inputRef.current?.focus();
  };

  return (
    <div className="lab lab-terminal-wrap">
      <div className="lab-toolbar">
        <span className="lab-badge">SIMULADO · nada aqui sai do seu navegador</span>
        {hasTimer && !done && !failed && (
          <span className={`lab-timer ${remaining <= 30 ? 'lab-timer-urgent' : ''}`} role="timer" aria-live="off">
            <Clock className="icon" /> {formatTime(remaining)}
          </span>
        )}
        <button type="button" className="lab-btn" onClick={reset}>
          <RotateCcw className="icon" /> Reiniciar
        </button>
      </div>

      {tasks.length > 0 && (
        <div className="lab-tasks" aria-label="Tarefas do laboratório">
          <div className="lab-tasks-title">
            Tarefas ({tasks.length - tasksLeft}/{tasks.length})
          </div>
          <ul>
            {tasks.map((t, i) => (
              <li key={t.label} className={taskFlags[i] ? 'lab-task-done' : ''}>
                {taskFlags[i] ? <CheckCircle2 className="icon" /> : <Circle className="icon" />}
                <span>{t.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

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
            className={`lab-line ${line.kind === 'cmd' ? 'lab-cmd' : ''} ${scenario.flag && line.text.includes('FLAG{') ? 'lab-flag-line' : ''}`}
          >
            {line.kind === 'cmd' && <span className="lab-prompt">{line.prompt} </span>}
            {line.text}
          </div>
        ))}

        {!failed && (
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
        )}
      </div>

      {failed && (
        <div className="lab-fail" role="alert">
          <AlertTriangle className="icon" />
          <div>
            <strong>Tempo esgotado!</strong>
            <p>{scenario.timeoutMessage ?? 'Você não concluiu a tempo. Clique em Reiniciar para tentar de novo.'}</p>
          </div>
        </div>
      )}

      {done && (
        <div className="lab-success" role="status">
          <Flag className="icon" />
          <div>
            <strong>{scenario.flag ? 'Flag capturada!' : 'Missão cumprida! Todas as tarefas foram concluídas.'}</strong>
            {scenario.flag && <div className="lab-flag-code">{scenario.flag}</div>}
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
