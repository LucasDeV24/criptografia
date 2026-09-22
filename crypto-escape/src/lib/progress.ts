const STORAGE_KEY = 'crypto-escape-progress';

// Total de salas em src/data/challenges (contagem de campos "room"). Atualize ao adicionar salas.
export const TOTAL_ROOMS = 354;

export type ProgressSyncCallback = () => void;
let progressSyncCallback: ProgressSyncCallback | null = null;

export function setProgressSyncCallback(cb: ProgressSyncCallback | null) {
  progressSyncCallback = cb;
}

function triggerSync() {
  progressSyncCallback?.();
}

export interface PlayerProgress {
  completedRooms: string[];
  currentEpisode: number;
  currentRoom: string;
  startedAt: string;
  lastPlayedAt: string;
  totalTimeSeconds: number;
  favoriteLanguage: { javascript: number; python: number };
  firstTrySuccesses: number;
  totalAttempts: number;
}

function getDefaultProgress(): PlayerProgress {
  return {
    completedRooms: [],
    currentEpisode: 0,
    currentRoom: '0.1',
    startedAt: new Date().toISOString(),
    lastPlayedAt: new Date().toISOString(),
    totalTimeSeconds: 0,
    favoriteLanguage: { javascript: 0, python: 0 },
    firstTrySuccesses: 0,
    totalAttempts: 0,
  };
}

export function parseProgress(raw: string | null): PlayerProgress {
  if (!raw) return getDefaultProgress();
  try {
    return { ...getDefaultProgress(), ...JSON.parse(raw) };
  } catch {
    return getDefaultProgress();
  }
}

export function getProgress(): PlayerProgress {
  if (typeof window === 'undefined') return getDefaultProgress();
  try {
    return parseProgress(localStorage.getItem(STORAGE_KEY));
  } catch {
    return getDefaultProgress();
  }
}

// --- Assinatura para o hook useProgress (useSyncExternalStore) ---
const PROGRESS_EVENT = 'crypto-escape-progress-changed';

export function subscribeProgress(callback: () => void): () => void {
  window.addEventListener('storage', callback);
  window.addEventListener(PROGRESS_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(PROGRESS_EVENT, callback);
  };
}

/** Texto salvo do progresso (estável enquanto nada muda, exigido pelo useSyncExternalStore) */
export function getProgressSnapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
}

export function saveProgress(progress: PlayerProgress): void {
  if (typeof window === 'undefined') return;
  try {
    progress.lastPlayedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    window.dispatchEvent(new Event(PROGRESS_EVENT));
    triggerSync();
  } catch {
    // storage full or blocked
  }
}

export function markRoomComplete(roomId: string): void {
  const progress = getProgress();
  if (progress.completedRooms.includes(roomId)) return; // já concluída: não regrava (evita re-renderizações e sincronizações à toa)
  progress.completedRooms.push(roomId);
  saveProgress(progress);
}

/** Soma segundos de estudo ao tempo total (chamado a cada 30 s com a página visível) */
export function addPlayTime(seconds: number): void {
  const progress = getProgress();
  progress.totalTimeSeconds += seconds;
  saveProgress(progress);
}

export function isRoomComplete(roomId: string): boolean {
  return getProgress().completedRooms.includes(roomId);
}

export function getCompletionStats() {
  const progress = getProgress();
  const completed = progress.completedRooms.length;
  const percentage = Math.round((completed / TOTAL_ROOMS) * 100);
  return { total: TOTAL_ROOMS, completed, percentage };
}

export function trackLanguageUse(lang: 'javascript' | 'python'): void {
  const progress = getProgress();
  progress.favoriteLanguage[lang]++;
  saveProgress(progress);
}

const PREFERRED_LANGUAGE_KEY = 'crypto-escape-preferred-language';

export function getPreferredLanguage(): 'javascript' | 'python' | null {
  if (typeof window === 'undefined') return null;
  try {
    const lang = localStorage.getItem(PREFERRED_LANGUAGE_KEY);
    return lang === 'javascript' || lang === 'python' ? lang : null;
  } catch {
    return null;
  }
}

export function setPreferredLanguage(lang: 'javascript' | 'python'): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PREFERRED_LANGUAGE_KEY, lang);
  } catch {
    // storage full or blocked
  }
}

export function trackAttempt(firstTry: boolean): void {
  const progress = getProgress();
  progress.totalAttempts++;
  if (firstTry) progress.firstTrySuccesses++;
  saveProgress(progress);
}

export function updateCurrentPosition(episode: number, room: string): void {
  const progress = getProgress();
  progress.currentEpisode = episode;
  progress.currentRoom = room;
  saveProgress(progress);
}

export function saveUserCode(challengeId: string, language: string, code: string): void {
  if (typeof window === 'undefined') return;
  try {
    const key = `crypto-escape-code-${challengeId}-${language}`;
    localStorage.setItem(key, code);
    triggerSync();
  } catch {
    // storage full or blocked
  }
}

export function getUserCode(challengeId: string, language: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(`crypto-escape-code-${challengeId}-${language}`);
  } catch {
    return null;
  }
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
