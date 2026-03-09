'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getChallenge, getNextChallenge, getPreviousChallenge } from '@/data/challenges';
import ChallengeRoom from '@/components/game/ChallengeRoom';
import { ArrowLeft, ArrowRight, Lock, Home } from 'lucide-react';
import { markRoomComplete, updateCurrentPosition, isRoomComplete } from '@/lib/progress';

export default function GameRoomPage() {
  const params = useParams();
  const router = useRouter();
  const episode = Number(params.episode);
  const room = String(params.room);

  const [challengeCompleted, setChallengeCompleted] = useState(false);

  const challenge = getChallenge(episode, room);
  const next = getNextChallenge(episode, room);
  const prev = getPreviousChallenge(episode, room);

  useEffect(() => {
    const alreadyDone = isRoomComplete(room);
    setChallengeCompleted(alreadyDone);
    updateCurrentPosition(episode, room);
  }, [episode, room]);

  if (!challenge) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-2xl text-[var(--error-red)] mb-4">Sala não encontrada</h1>
        <Link href="/" className="text-[var(--matrix-green)] hover:underline">
          Voltar ao início
        </Link>
      </div>
    );
  }

  const handleComplete = () => {
    setChallengeCompleted(true);
    markRoomComplete(challenge.id);
  };

  const handleNextRoom = () => {
    if (canNavigate && next) {
      router.push(`/game/${next.episode}/${next.room}`);
    }
  };

  const isCodeChallenge = challenge.type === 'code';
  const canNavigate = !isCodeChallenge || challengeCompleted;

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--border-subtle)] bg-[var(--deep-space)]/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-[var(--muted-gray)] hover:text-[var(--matrix-green)] transition-colors"
              title="Página inicial"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            {prev && (
              <Link
                href={`/game/${prev.episode}/${prev.room}`}
                className="flex items-center gap-1.5 text-[var(--muted-gray)] hover:text-[var(--matrix-green)] transition-colors"
                title="Sala anterior"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Voltar</span>
              </Link>
            )}
          </div>
          <span className="text-sm text-[var(--muted-gray)]">
            Episódio {episode} · Sala {room}
          </span>
          {next ? (
            <button
              type="button"
              onClick={handleNextRoom}
              disabled={!canNavigate}
              className={`flex items-center gap-2 transition-all ${
                canNavigate
                  ? 'text-[var(--matrix-green)] hover:underline cursor-pointer'
                  : 'text-[var(--muted-gray)] cursor-not-allowed opacity-60'
              }`}
            >
              {!canNavigate && <Lock className="w-4 h-4" />}
              Próxima
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            canNavigate ? (
              <Link
                href="/"
                className="flex items-center gap-2 text-[var(--matrix-green)] hover:underline"
              >
                Concluir
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <span className="flex items-center gap-2 text-[var(--muted-gray)] opacity-60 cursor-not-allowed">
                <Lock className="w-4 h-4" />
                Concluir
              </span>
            )
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <ChallengeRoom challenge={challenge} onComplete={handleComplete} episode={episode} room={room} />
      </main>
    </div>
  );
}
