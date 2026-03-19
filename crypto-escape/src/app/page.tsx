'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Terminal, Code, Shield, Book, Trophy, LogIn, UserPlus, LogOut } from 'lucide-react';
import { getProgress, TOTAL_ROOMS } from '@/lib/progress';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { user, loading: authLoading, signingOut, signOut } = useAuth();
  const [completed, setCompleted] = useState(0);
  const [currentEp, setCurrentEp] = useState(0);
  const [currentRoom, setCurrentRoom] = useState('0.1');

  useEffect(() => {
    const p = getProgress();
    setCompleted(p.completedRooms.length);
    setCurrentEp(p.currentEpisode);
    setCurrentRoom(p.currentRoom);
  }, []);

  const hasProgress = completed > 0;
  const percentage = Math.round((completed / TOTAL_ROOMS) * 100);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--void-black)] via-[#0d0d14] to-[var(--void-black)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,136,0.03)_0%,transparent_70%)]" />

      <main className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--deep-space)]">
            <Terminal className="w-4 h-4 text-[var(--matrix-green)]" />
            <span className="text-sm text-[var(--muted-gray)]">Terminal Noir v1.0</span>
          </div>
          {authLoading ? (
            <div className="h-10 w-48 rounded-full bg-[var(--deep-space)] animate-pulse border border-[var(--border-subtle)]" />
          ) : (
            <>
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[var(--muted-gray)] truncate max-w-[160px]">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                  <button
                    type="button"
                    onClick={() => signOut()}
                    disabled={signingOut}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--muted-gray)] hover:text-[var(--error-red)] hover:border-[var(--error-red)]/50 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <LogOut className="w-4 h-4" />
                    {signingOut ? 'Saindo...' : 'Sair'}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/entrar"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--deep-space)] text-[var(--muted-gray)] hover:text-[var(--matrix-green)] hover:border-[var(--matrix-green)]/50 transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    Entrar
                  </Link>
                  <Link
                    href="/cadastro"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--matrix-green)]/20 border border-[var(--matrix-green)]/50 text-[var(--matrix-green)] hover:bg-[var(--matrix-green)]/30 transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    Cadastrar
                  </Link>
                </div>
              )}
            </>
          )}
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          <span className="text-[var(--ghost-white)]">CRYPTO</span>
          <span className="text-[var(--matrix-green)]"> ESCAPE</span>
        </h1>

        <p className="text-xl text-[var(--muted-gray)] mb-8 max-w-lg mx-auto leading-relaxed">
          Aprenda cibersegurança do zero ao profissional. Resolva enigmas, escreva código em{' '}
          <span className="text-[var(--cyber-cyan)]">JavaScript</span> ou{' '}
          <span className="text-[var(--matrix-green)]">Python</span>.
        </p>

        {hasProgress && (
          <div className="mb-10 max-w-md mx-auto">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-[var(--muted-gray)]">Progresso</span>
              <span className="text-[var(--matrix-green)] font-medium">{completed}/{TOTAL_ROOMS} salas ({percentage}%)</span>
            </div>
            <div className="w-full h-2 bg-[var(--deep-space)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
              <div
                className="h-full bg-[var(--matrix-green)] rounded-full transition-all duration-700"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center mb-16">
          {hasProgress ? (
            <Link
              href={`/game/${currentEp}/${currentRoom}`}
              className="px-8 py-4 rounded-lg bg-[var(--matrix-green)] text-[var(--void-black)] font-semibold hover:shadow-[0_0_30px_var(--glow-green)] transition-all flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Continuar
            </Link>
          ) : (
            <Link
              href="/game/0/0.1"
              className="px-8 py-4 rounded-lg bg-[var(--matrix-green)] text-[var(--void-black)] font-semibold hover:shadow-[0_0_30px_var(--glow-green)] transition-all flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Começar
            </Link>
          )}
          <Link
            href="/episodes"
            className="px-8 py-4 rounded-lg border border-[var(--border-subtle)] text-[var(--ghost-white)] font-semibold hover:bg-[var(--deep-space)] hover:border-[var(--matrix-green)] transition-all"
          >
            Episódios
          </Link>
          <Link
            href="/reference"
            className="px-8 py-4 rounded-lg border border-[var(--border-subtle)] text-[var(--ghost-white)] font-semibold hover:bg-[var(--deep-space)] hover:border-[var(--border-subtle)] transition-all flex items-center gap-2"
          >
            <Book className="w-5 h-5" />
            Referência
          </Link>
          <Link
            href="/ranking"
            className="px-8 py-4 rounded-lg border border-[var(--border-subtle)] text-[var(--ghost-white)] font-semibold hover:bg-[var(--deep-space)] hover:border-[var(--matrix-green)] transition-all flex items-center gap-2"
          >
            <Trophy className="w-5 h-5" />
            Ranking
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-lg border border-[var(--border-subtle)] bg-[var(--deep-space)]/50 hover:border-[var(--matrix-green)]/30 transition-colors">
            <Code className="w-8 h-8 text-[var(--matrix-green)] mb-3" />
            <h3 className="font-semibold text-[var(--ghost-white)] mb-2">JavaScript & Python</h3>
            <p className="text-sm text-[var(--muted-gray)]">
              Escolha sua linguagem favorita para resolver cada desafio.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-[var(--border-subtle)] bg-[var(--deep-space)]/50 hover:border-[var(--matrix-green)]/30 transition-colors">
            <Terminal className="w-8 h-8 text-[var(--cyber-cyan)] mb-3" />
            <h3 className="font-semibold text-[var(--ghost-white)] mb-2">46 Episódios</h3>
            <p className="text-sm text-[var(--muted-gray)]">
              Do tutorial ao nível profissional em cibersegurança.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-[var(--border-subtle)] bg-[var(--deep-space)]/50 hover:border-[var(--matrix-green)]/30 transition-colors">
            <Shield className="w-8 h-8 text-[var(--warning-amber)] mb-3" />
            <h3 className="font-semibold text-[var(--ghost-white)] mb-2">Hacker do Bem</h3>
            <p className="text-sm text-[var(--muted-gray)]">
              Aprenda habilidades reais para carreira em segurança.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function Play({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
