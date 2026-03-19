'use client';

import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { setProgressUserId, saveProgressToSupabase, getAllUserCodesFromStorage, fetchProgressFromSupabase, loadUserCodesIntoStorage } from '@/lib/supabase/progress-sync';
import { getProgress, saveProgress, setProgressSyncCallback } from '@/lib/progress';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signingOut: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const router = useRouter();
  const supabase = useMemo(() => (isSupabaseConfigured() ? createClient() : null), []);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    const timeoutId = setTimeout(() => {
      if (!cancelled) {
        setLoading(false);
      }
    }, 3000);

    supabase.auth.getSession()
      .then(async ({ data: { session } }) => {
        if (cancelled) return;
        const u = session?.user ?? null;
        setUser(u);
        setLoading(false);
        if (u) {
          setProgressUserId(u.id);
          try {
            const remote = await fetchProgressFromSupabase(u.id);
            if (remote) {
              const local = getProgress();
              const merged = {
                ...local,
                completedRooms: [...new Set([...local.completedRooms, ...remote.completedRooms])],
                currentEpisode: Math.max(local.currentEpisode, remote.currentEpisode),
                currentRoom: local.completedRooms.length >= remote.completedRooms.length ? local.currentRoom : remote.currentRoom,
                totalTimeSeconds: local.totalTimeSeconds + remote.totalTimeSeconds,
                firstTrySuccesses: local.firstTrySuccesses + remote.firstTrySuccesses,
                totalAttempts: local.totalAttempts + remote.totalAttempts,
              };
              saveProgress(merged);
              const { data } = await supabase.from('progress').select('user_codes').eq('user_id', u.id).single();
              if (data?.user_codes && typeof data.user_codes === 'object') {
                loadUserCodesIntoStorage(data.user_codes as Record<string, string>);
              }
            }
          } catch {
            // progress sync em background - não bloqueia a UI
          }
        } else {
          setProgressUserId(null);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      })
      .finally(() => clearTimeout(timeoutId));

    const {
      data: { subscription },
    } = supabase!.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        setProgressUserId(u.id);
        const remote = await fetchProgressFromSupabase(u.id);
        if (remote) {
          const local = getProgress();
          const merged = {
            ...local,
            completedRooms: [...new Set([...local.completedRooms, ...remote.completedRooms])],
            currentEpisode: Math.max(local.currentEpisode, remote.currentEpisode),
            currentRoom: local.currentRoom,
            totalTimeSeconds: local.totalTimeSeconds + remote.totalTimeSeconds,
            firstTrySuccesses: local.firstTrySuccesses + remote.firstTrySuccesses,
            totalAttempts: local.totalAttempts + remote.totalAttempts,
          };
          saveProgress(merged);
        }
      } else {
        setProgressUserId(null);
      }
    });

    const handleStorage = () => {
      if (cancelled) return;
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!cancelled) {
          const u = session?.user ?? null;
          setUser(u);
          if (u) setProgressUserId(u.id);
          else setProgressUserId(null);
        }
      });
    };
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && !cancelled) {
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (!cancelled) {
            const u = session?.user ?? null;
            setUser(u);
            if (u) setProgressUserId(u.id);
            else setProgressUserId(null);
          }
        });
      }
    };
    window.addEventListener('storage', handleStorage);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelled = true;
      subscription.unsubscribe();
      setProgressSyncCallback(null);
      window.removeEventListener('storage', handleStorage);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [supabase]);

  useEffect(() => {
    if (!user) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    const debouncedSync = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        const progress = getProgress();
        const userCodes = await getAllUserCodesFromStorage();
        await saveProgressToSupabase(user.id, progress, userCodes);
      }, 2000);
    };

    setProgressSyncCallback(debouncedSync);
    return () => {
      clearTimeout(timeoutId);
      setProgressSyncCallback(null);
    };
  }, [user]);

  const signUp = async (email: string, password: string, name: string) => {
    if (!supabase) return { error: 'Sistema indisponível' };
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name.trim() || undefined } },
    });
    if (error) return { error: error.message };
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    if (!supabase) return { error: 'Sistema indisponível' };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  };

  const signOut = async () => {
    if (!supabase) return;
    setSigningOut(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProgressUserId(null);
      router.refresh();
    } catch (err) {
      console.error('Erro ao sair:', err);
      setUser(null);
      setProgressUserId(null);
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signingOut, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
