/**
 * Sistema de XP, nível e conquistas.
 * Tudo é DERIVADO do progresso que já existe (completedRooms, favoriteLanguage,
 * firstTrySuccesses, totalTimeSeconds) e do catálogo estático de desafios —
 * nenhum dado novo precisa ser gravado no Supabase para isso funcionar.
 */
import { challengesByEpisode } from '@/data/challenges';
import { SCENARIOS } from '@/lib/labs/terminal-scenarios';
import { TOTAL_ROOMS, type PlayerProgress } from '@/lib/progress';
import type { Challenge } from '@/types/challenge';

// ---------------------------------------------------------------- índice do catálogo

interface IndexedChallenge {
  episode: number;
  type: Challenge['type'];
  difficulty?: 'easy' | 'medium' | 'hard';
  labId?: string;
}

let cachedIndex: Map<string, IndexedChallenge> | null = null;

/** Mapa id da sala -> metadados (construído uma vez, a partir do catálogo estático) */
function catalogIndex(): Map<string, IndexedChallenge> {
  if (cachedIndex) return cachedIndex;
  const index = new Map<string, IndexedChallenge>();
  for (const [episodeStr, challenges] of Object.entries(challengesByEpisode)) {
    const episode = Number(episodeStr);
    for (const c of challenges) {
      index.set(c.id, {
        episode,
        type: c.type,
        difficulty: c.type === 'code' || c.type === 'lab' ? c.difficulty : undefined,
        labId: c.type === 'lab' ? c.labId : undefined,
      });
    }
  }
  cachedIndex = index;
  return index;
}

// ---------------------------------------------------------------- XP

const XP_THEORY = 5;
const XP_CODE = { easy: 15, medium: 25, hard: 40 } as const;
const XP_LAB = { easy: 20, medium: 35, hard: 50 } as const;

function xpFor(meta: IndexedChallenge): number {
  if (meta.type === 'theory') return XP_THEORY;
  if (meta.type === 'code') return XP_CODE[meta.difficulty ?? 'easy'];
  if (meta.type === 'lab') return XP_LAB[meta.difficulty ?? 'easy'];
  return 0;
}

let cachedMaxXp: number | null = null;

/** XP máximo possível, completando as 382 salas de hoje (referência para a barra de nível) */
export function computeMaxXp(): number {
  if (cachedMaxXp !== null) return cachedMaxXp;
  const index = catalogIndex();
  let total = 0;
  for (const meta of index.values()) total += xpFor(meta);
  cachedMaxXp = total;
  return total;
}

/** Soma o XP de todas as salas já completadas */
export function computeXp(completedRooms: string[]): number {
  const index = catalogIndex();
  let total = 0;
  for (const roomId of completedRooms) {
    const meta = index.get(roomId);
    if (meta) total += xpFor(meta);
  }
  return total;
}

// ---------------------------------------------------------------- nível

/** Curva de nível: nível N exige K*N*(N-1) de XP acumulado. Calibrada para ~19-20 no máximo de hoje. */
const LEVEL_K = 15;

function xpForLevel(level: number): number {
  return LEVEL_K * level * (level - 1);
}

function levelForXp(xp: number): number {
  let level = 1;
  while (xpForLevel(level + 1) <= xp) level++;
  return level;
}

const LEVEL_TITLES: { min: number; title: string }[] = [
  { min: 1, title: 'Script Kiddie' },
  { min: 3, title: 'Aprendiz de Hacker' },
  { min: 6, title: 'Hacker Júnior' },
  { min: 10, title: 'Hacker' },
  { min: 14, title: 'Hacker Sênior' },
  { min: 18, title: 'Elite Hacker' },
  { min: 21, title: 'Lenda do Crypto Escape' },
];

export function titleForLevel(level: number): string {
  let title = LEVEL_TITLES[0].title;
  for (const t of LEVEL_TITLES) {
    if (level >= t.min) title = t.title;
  }
  return title;
}

export interface LevelInfo {
  xp: number;
  level: number;
  title: string;
  /** XP já acumulado dentro do nível atual */
  xpIntoLevel: number;
  /** XP necessário para completar o nível atual (0 se for o último nível calibrado) */
  xpForNextLevel: number;
  /** 0-100, para a barra de progresso */
  percentToNextLevel: number;
}

/**
 * Estimativa de nível a partir só da CONTAGEM de salas completadas (sem saber quais, exatamente) —
 * usada no ranking, onde só temos `completed_count` de outros jogadores (por privacidade, ver
 * supabase/migrations/002_privacidade_ranking.sql). Usa o XP médio por sala do curso hoje.
 */
export function estimateLevelFromCount(completedCount: number): LevelInfo {
  const avgXpPerRoom = computeMaxXp() / TOTAL_ROOMS;
  return getLevelInfo(Math.round(completedCount * avgXpPerRoom));
}

export function getLevelInfo(xp: number): LevelInfo {
  const level = levelForXp(xp);
  const base = xpForLevel(level);
  const next = xpForLevel(level + 1);
  const span = next - base;
  const xpIntoLevel = xp - base;
  return {
    xp,
    level,
    title: titleForLevel(level),
    xpIntoLevel,
    xpForNextLevel: span,
    percentToNextLevel: span > 0 ? Math.min(100, Math.round((xpIntoLevel / span) * 100)) : 100,
  };
}

// ---------------------------------------------------------------- conquistas

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface AchievementCheck extends Achievement {
  isUnlocked: (ctx: {
    progress: PlayerProgress;
    completedSet: Set<string>;
    index: Map<string, IndexedChallenge>;
  }) => boolean;
}

function episodeFullyComplete(episode: number, completedSet: Set<string>): boolean {
  const rooms = challengesByEpisode[episode];
  if (!rooms?.length) return false;
  return rooms.every((c) => completedSet.has(c.id));
}

const ACHIEVEMENT_CHECKS: AchievementCheck[] = [
  {
    id: 'primeiro-acesso',
    icon: '🎬',
    title: 'Primeiro Acesso',
    description: 'Complete sua primeira sala.',
    isUnlocked: ({ progress }) => progress.completedRooms.length >= 1,
  },
  {
    id: 'primeiro-exploit',
    icon: '🔓',
    title: 'Primeiro Exploit',
    description: 'Complete seu primeiro laboratório prático.',
    isUnlocked: ({ completedSet, index }) =>
      [...completedSet].some((id) => index.get(id)?.type === 'lab'),
  },
  {
    id: 'sem-medo-do-terminal',
    icon: '🖥️',
    title: 'Sem Medo do Terminal',
    description: 'Complete um laboratório de terminal.',
    isUnlocked: ({ completedSet, index }) =>
      [...completedSet].some((id) => {
        const labId = index.get(id)?.labId;
        return !!labId && (labId.startsWith('term-') || labId.startsWith('terminal-'));
      }),
  },
  {
    id: 'contra-o-relogio',
    icon: '⏱️',
    title: 'Contra o Relógio',
    description: 'Complete um laboratório cronometrado.',
    isUnlocked: ({ completedSet, index }) =>
      [...completedSet].some((id) => {
        const labId = index.get(id)?.labId;
        return !!labId && !!SCENARIOS[labId]?.timeLimitSeconds;
      }),
  },
  {
    id: 'poliglota',
    icon: '🌐',
    title: 'Poliglota',
    description: 'Execute código em JavaScript e em Python.',
    isUnlocked: ({ progress }) =>
      progress.favoriteLanguage.javascript >= 1 && progress.favoriteLanguage.python >= 1,
  },
  {
    id: 'pythonista',
    icon: '🐍',
    title: 'Pythonista',
    description: 'Execute código em Python pelo menos 10 vezes.',
    isUnlocked: ({ progress }) => progress.favoriteLanguage.python >= 10,
  },
  {
    id: 'zero-erros',
    icon: '🎯',
    title: 'Zero Erros',
    description: 'Acerte de primeira pelo menos 10 vezes.',
    isUnlocked: ({ progress }) => progress.firstTrySuccesses >= 10,
  },
  {
    id: 'modulo-completo',
    icon: '📗',
    title: 'Módulo Completo',
    description: 'Termine todas as salas de pelo menos um episódio.',
    isUnlocked: ({ completedSet }) =>
      Object.keys(challengesByEpisode)
        .map(Number)
        .some((ep) => episodeFullyComplete(ep, completedSet)),
  },
  {
    id: 'maratonista',
    icon: '🏃',
    title: 'Maratonista',
    description: 'Complete 50 salas.',
    isUnlocked: ({ progress }) => progress.completedRooms.length >= 50,
  },
  {
    id: 'meio-caminho',
    icon: '🧗',
    title: 'Meio Caminho Andado',
    description: `Complete metade das ${TOTAL_ROOMS} salas do curso.`,
    isUnlocked: ({ progress }) => progress.completedRooms.length >= Math.ceil(TOTAL_ROOMS / 2),
  },
  {
    id: 'maratona-de-estudo',
    icon: '📚',
    title: 'Maratona de Estudo',
    description: 'Acumule 5 horas de estudo na plataforma.',
    isUnlocked: ({ progress }) => progress.totalTimeSeconds >= 5 * 3600,
  },
  {
    id: 'formado',
    icon: '🎓',
    title: 'Formado no Crypto Escape',
    description: 'Complete todas as salas do curso.',
    isUnlocked: ({ progress }) => progress.completedRooms.length >= TOTAL_ROOMS,
  },
];

function toPublicAchievement(a: AchievementCheck): Achievement {
  return { id: a.id, icon: a.icon, title: a.title, description: a.description };
}

export const ALL_ACHIEVEMENTS: Achievement[] = ACHIEVEMENT_CHECKS.map(toPublicAchievement);

export function getUnlockedAchievements(progress: PlayerProgress): Achievement[] {
  const completedSet = new Set(progress.completedRooms);
  const index = catalogIndex();
  return ACHIEVEMENT_CHECKS.filter((a) => a.isUnlocked({ progress, completedSet, index })).map(
    toPublicAchievement
  );
}
