'use client';

import { useMemo, useSyncExternalStore } from 'react';
import { getProgressSnapshot, parseProgress, subscribeProgress } from '@/lib/progress';
import type { PlayerProgress } from '@/lib/progress';

/** Progresso do aluno, sempre atualizado (mesma aba ou outra) e seguro para renderização no servidor */
export function useProgress(): PlayerProgress {
  const raw = useSyncExternalStore(subscribeProgress, getProgressSnapshot, () => '');
  return useMemo(() => parseProgress(raw), [raw]);
}
