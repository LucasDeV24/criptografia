'use client';

import { useState } from 'react';
import { AlertTriangle, Flag, ShieldCheck, ShieldOff } from 'lucide-react';
import {
  IDOR_HOME,
  SQLI_FLAG,
  escapeHtml,
  idorRequest,
  queryParts,
  runLogin,
  simulateXss,
} from '@/lib/labs/websim';
import type { IdorResponse, LoginResult, XssResult } from '@/lib/labs/websim';

/** Moldura de navegador falso. O conteúdo do site fica dentro. */
function FakeBrowser({ url, children, urlSlot }: { url?: string; children: React.ReactNode; urlSlot?: React.ReactNode }) {
  return (
    <div className="lab-browser">
      <div className="lab-browser-bar">
        <span className="lab-dots" aria-hidden="true">
          <i /> <i /> <i />
        </span>
        {urlSlot ?? <span className="lab-url">{url}</span>}
      </div>
      <div className="lab-browser-body">{children}</div>
    </div>
  );
}

function FlagBanner({ flag }: { flag: string }) {
  return (
    <div className="lab-success" role="status">
      <Flag className="icon" />
      <div>
        <strong>Flag capturada!</strong>
        <div className="lab-flag-code">{flag}</div>
      </div>
    </div>
  );
}

const SimBadge = () => <span className="lab-badge">SIMULADO · site fictício, nada sai do seu navegador</span>;

// ======================= SQL Injection =======================

export function SqliLab({ onComplete }: { onComplete?: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState<LoginResult | null>(null);
  const [done, setDone] = useState(false);

  const parts = queryParts(username, password);
  const loggedIn = result && !result.error ? result.rows[0] : undefined;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = runLogin(username, password);
    setResult(r);
    if (!done && r.rows[0]?.role === 'admin') {
      setDone(true);
      onComplete?.();
    }
  };

  return (
    <div className="lab">
      <div className="lab-toolbar"><SimBadge /></div>

      <FakeBrowser url="https://banco-acme.local/login">
        <h3 className="lab-site-title">🏦 Banco ACME — Área restrita</h3>
        {loggedIn ? (
          <div className={`lab-panel ${loggedIn.role === 'admin' ? 'lab-panel-ok' : ''}`}>
            {loggedIn.role === 'admin' ? (
              <>
                <strong>Painel administrativo</strong>
                <p>Bem-vindo, {loggedIn.username}. Chave do cofre:</p>
                <div className="lab-flag-code">{SQLI_FLAG}</div>
              </>
            ) : (
              <>
                <strong>Olá, {loggedIn.username}!</strong>
                <p>Você entrou como usuário comum, sem acesso ao painel administrativo. Tente entrar como <em>admin</em>.</p>
              </>
            )}
            <button type="button" className="lab-btn" onClick={() => setResult(null)}>Sair</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="lab-form">
            <label>
              Usuário
              <input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="off" spellCheck={false} />
            </label>
            <label>
              Senha
              <input value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" spellCheck={false} />
            </label>
            <button type="submit" className="lab-btn lab-btn-primary">Entrar</button>
          </form>
        )}
        {result?.error && <div className="lab-panel lab-panel-err">{result.error}</div>}
        {result && !result.error && result.rows.length === 0 && (
          <div className="lab-panel lab-panel-err">Usuário ou senha inválidos.</div>
        )}
      </FakeBrowser>

      <div className="lab-query" aria-label="Consulta SQL montada pelo servidor">
        <div className="lab-query-title">Consulta SQL que o servidor monta (veja o que você digita virar código):</div>
        <code>
          {parts.map((p, i) =>
            i % 2 === 1 ? (
              <span key={i} className="lab-query-input">{p}</span>
            ) : (
              <span key={i}>{p}</span>
            )
          )}
        </code>
        {result && !result.error && <div className="lab-query-rows">→ o banco devolveu {result.rows.length} linha(s)</div>}
      </div>

      {done && <FlagBanner flag={SQLI_FLAG} />}
    </div>
  );
}

// ======================= XSS =======================

interface Comment {
  id: number;
  raw: string;
  /** Texto como foi parar no HTML da página */
  html: string;
  protectedAtPost: boolean;
  sim: XssResult;
}

const SEED_COMMENTS: Comment[] = [
  { id: 1, raw: 'Ótimo atendimento!', html: 'Ótimo atendimento!', protectedAtPost: false, sim: { executed: false, alerts: [], cookieLeak: false, scripts: [] } },
  { id: 2, raw: 'Recomendo a loja 👏', html: 'Recomendo a loja 👏', protectedAtPost: false, sim: { executed: false, alerts: [], cookieLeak: false, scripts: [] } },
];

export function XssLab({ onComplete, flag }: { onComplete?: () => void; flag: string }) {
  const [comments, setComments] = useState<Comment[]>(SEED_COMMENTS);
  const [text, setText] = useState('');
  const [protection, setProtection] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const html = protection ? escapeHtml(text) : text;
    const sim = simulateXss(html);
    setComments((prev) => [...prev, { id: prev.length + 1, raw: text, html, protectedAtPost: protection, sim }]);
    setText('');
    if (!done && sim.cookieLeak) {
      setDone(true);
      onComplete?.();
    }
  };

  return (
    <div className="lab">
      <div className="lab-toolbar">
        <SimBadge />
        <label className="lab-toggle">
          <input type="checkbox" checked={protection} onChange={(e) => setProtection(e.target.checked)} />
          {protection ? <ShieldCheck className="icon" /> : <ShieldOff className="icon" />}
          Proteção (escape de HTML) {protection ? 'LIGADA' : 'desligada'}
        </label>
      </div>

      <FakeBrowser url="https://loja-demo.local/livro-de-visitas">
        <h3 className="lab-site-title">🛒 Loja Demo — Livro de visitas</h3>
        <p className="lab-muted">
          O administrador (logado, com um cookie de sessão) revisa estes comentários. Tudo que você postar
          será exibido na página dele.
        </p>

        <ul className="lab-comments">
          {comments.map((c) => (
            <li key={c.id} className="lab-comment">
              <div className="lab-comment-html">
                <span className="lab-muted">HTML da página:</span> <code>{c.html}</code>
              </div>
              {c.sim.executed && (
                <div className="lab-panel lab-panel-err">
                  <AlertTriangle className="icon" /> <strong>JavaScript executado no navegador do admin</strong>
                  {c.sim.alerts.map((a, i) => (
                    <div key={i} className="lab-fake-alert">
                      <span>loja-demo.local diz</span>
                      <code>{a}</code>
                    </div>
                  ))}
                  {c.sim.cookieLeak && (
                    <div className="lab-leak">🍪 O script acessou <code>document.cookie</code> — o cookie do admin foi exposto.</div>
                  )}
                </div>
              )}
              {c.protectedAtPost && (
                <div className="lab-muted">Com a proteção ligada o texto aparece na tela, mas não roda como código.</div>
              )}
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit} className="lab-form">
          <label>
            Seu comentário
            <input value={text} onChange={(e) => setText(e.target.value)} autoComplete="off" spellCheck={false} placeholder="Escreva algo…" />
          </label>
          <button type="submit" className="lab-btn lab-btn-primary">Publicar</button>
        </form>
      </FakeBrowser>

      {done && <FlagBanner flag={flag} />}
    </div>
  );
}

// ======================= IDOR =======================

function IdorPage({ response }: { response: IdorResponse }) {
  if (response.status !== 'ok') {
    return <div className="lab-panel lab-panel-err">{response.message}</div>;
  }
  const { account, id } = response;
  return (
    <div className="lab-statement">
      <h3 className="lab-site-title">Extrato da conta #{id}</h3>
      <p><strong>Titular:</strong> {account.titular}</p>
      <p><strong>Saldo:</strong> {account.saldo}</p>
      <ul className="lab-tx">
        {account.transacoes.map(([desc, val], i) => (
          <li key={i}><span>{desc}</span><span>{val}</span></li>
        ))}
      </ul>
      {account.observacao && <div className="lab-panel lab-panel-ok">{account.observacao}</div>}
    </div>
  );
}

export function IdorLab({ onComplete, flag }: { onComplete?: () => void; flag: string }) {
  const [address, setAddress] = useState(IDOR_HOME);
  const [response, setResponse] = useState<IdorResponse>(() => idorRequest(IDOR_HOME));
  const [done, setDone] = useState(false);

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    const r = idorRequest(address);
    setResponse(r);
    if (!done && r.status === 'ok' && r.account.observacao?.includes(flag)) {
      setDone(true);
      onComplete?.();
    }
  };

  return (
    <div className="lab">
      <div className="lab-toolbar"><SimBadge /></div>

      <FakeBrowser
        urlSlot={
          <form onSubmit={go} className="lab-urlform">
            <input
              className="lab-url-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              spellCheck={false}
              aria-label="Barra de endereço"
            />
            <button type="submit" className="lab-btn">Ir</button>
          </form>
        }
      >
        <p className="lab-muted">Você está logado como <strong>cliente demo (conta 1042)</strong>. Edite a barra de endereço e clique em Ir.</p>
        <IdorPage response={response} />
      </FakeBrowser>

      {done && <FlagBanner flag={flag} />}
    </div>
  );
}
