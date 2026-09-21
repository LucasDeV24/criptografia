import { Fragment } from 'react';

/**
 * Renderiza o mini-markdown dos exercícios de forma SEGURA (sem dangerouslySetInnerHTML):
 * **negrito**, `código`, listas com "• " e blocos de código com ```.
 * Todo o texto vira nó de texto do React, então <script> ou <img onerror> aparecem
 * como texto e nunca são interpretados como HTML.
 */

function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
          return <code key={i}>{part.slice(1, -1)}</code>;
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

function Paragraph({ text }: { text: string }) {
  const lines = text.split('\n').filter((l) => l.trim() !== '');
  const isList = lines.length > 0 && lines.every((l) => l.trimStart().startsWith('• '));
  if (isList) {
    return (
      <ul>
        {lines.map((l, i) => (
          <li key={i}>
            <Inline text={l.trimStart().slice(2)} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p>
      {lines.map((l, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          <Inline text={l} />
        </Fragment>
      ))}
    </p>
  );
}

export default function RichText({ text }: { text: string }) {
  const segments = text.trim().split(/```[a-z]*\n?/i);
  return (
    <>
      {segments.map((segment, i) => {
        // Índices ímpares estão dentro de um bloco ``` ... ```
        if (i % 2 === 1) return <pre key={i}>{segment.replace(/\n$/, '')}</pre>;
        return segment
          .split(/\n\s*\n/)
          .filter((p) => p.trim() !== '')
          .map((p, j) => <Paragraph key={`${i}-${j}`} text={p} />);
      })}
    </>
  );
}
