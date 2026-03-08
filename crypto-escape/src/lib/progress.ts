const STORAGE_KEY = 'crypto-escape-progress';

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

export function getProgress(): PlayerProgress {
  if (typeof window === 'undefined') return getDefaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProgress();
    return { ...getDefaultProgress(), ...JSON.parse(raw) };
  } catch {
    return getDefaultProgress();
  }
}

export function saveProgress(progress: PlayerProgress): void {
  if (typeof window === 'undefined') return;
  try {
    progress.lastPlayedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // storage full or blocked
  }
}

export function markRoomComplete(roomId: string): void {
  const progress = getProgress();
  if (!progress.completedRooms.includes(roomId)) {
    progress.completedRooms.push(roomId);
  }
  saveProgress(progress);
}

export function isRoomComplete(roomId: string): boolean {
  return getProgress().completedRooms.includes(roomId);
}

export function getCompletionStats() {
  const progress = getProgress();
  const total = 74;
  const completed = progress.completedRooms.length;
  const percentage = Math.round((completed / total) * 100);
  return { total, completed, percentage };
}

export function trackLanguageUse(lang: 'javascript' | 'python'): void {
  const progress = getProgress();
  progress.favoriteLanguage[lang]++;
  saveProgress(progress);
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

export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
