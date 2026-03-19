import { createClient, isSupabaseConfigured } from './client';
import type { PlayerProgress } from '@/lib/progress';

let currentUserId: string | null = null;

export function setProgressUserId(userId: string | null) {
  currentUserId = userId;
}

export function getProgressUserId() {
  return currentUserId;
}

export async function fetchProgressFromSupabase(userId: string): Promise<PlayerProgress | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = createClient();
  const { data, error } = await supabase
    .from('progress')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error || !data) return null;

  return {
    completedRooms: (data.completed_rooms as string[]) || [],
    currentEpisode: data.current_episode ?? 0,
    currentRoom: data.current_room ?? '0.1',
    startedAt: data.updated_at ?? new Date().toISOString(),
    lastPlayedAt: data.updated_at ?? new Date().toISOString(),
    totalTimeSeconds: data.total_time_seconds ?? 0,
    favoriteLanguage: { javascript: 0, python: 0 },
    firstTrySuccesses: data.first_try_successes ?? 0,
    totalAttempts: data.total_attempts ?? 0,
  };
}

export async function saveProgressToSupabase(userId: string, progress: PlayerProgress, userCodes: Record<string, string>) {
  if (!isSupabaseConfigured()) return;
  const supabase = createClient();
  await supabase
    .from('progress')
    .upsert(
      {
        user_id: userId,
        completed_rooms: progress.completedRooms,
        current_episode: progress.currentEpisode,
        current_room: progress.currentRoom,
        total_time_seconds: progress.totalTimeSeconds,
        first_try_successes: progress.firstTrySuccesses,
        total_attempts: progress.totalAttempts,
        user_codes: userCodes,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    );
}

export async function getAllUserCodesFromStorage(): Promise<Record<string, string>> {
  if (typeof window === 'undefined') return {};
  const codes: Record<string, string> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith('crypto-escape-code-')) {
      const val = localStorage.getItem(key);
      if (val) {
        const rest = key.replace('crypto-escape-code-', '');
        const match = rest.match(/^(.+)-(javascript|python)$/);
        if (match) {
          const challengeId = match[1];
          const lang = match[2];
          codes[`${challengeId}::${lang}`] = val;
        }
      }
    }
  }
  return codes;
}

export function loadUserCodesIntoStorage(codes: Record<string, string>) {
  if (typeof window === 'undefined') return;
  for (const [key, value] of Object.entries(codes)) {
    const sep = key.includes('::') ? '::' : '_';
    const parts = key.split(sep);
    const lang = parts.pop();
    const challengeId = parts.join(sep);
    if (challengeId && (lang === 'javascript' || lang === 'python')) {
      localStorage.setItem(`crypto-escape-code-${challengeId}-${lang}`, value);
    }
  }
}
