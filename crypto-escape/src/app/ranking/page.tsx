'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { Trophy, Medal, ArrowLeft, User } from 'lucide-react';

type RankRow = {
  rank: number;
  full_name: string | null;
  avatar_url: string | null;
  completed: number;
  total_attempts: number;
};

export default function RankingPage() {
  const [rows, setRows] = useState<RankRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchRanking() {
      if (!isSupabaseConfigured()) {
        setLoading(false);
        return;
      }
      try {
        const supabase = createClient();
        const { data: progressData, error: progressError } = await supabase
          .from('progress')
          .select('user_id, completed_rooms, total_attempts');

        if (cancelled) return;
        if (progressError) {
          setError('Não foi possível carregar o ranking. Tente novamente.');
          setLoading(false);
          return;
        }
        if (!progressData) {
          setLoading(false);
          return;
        }

        const userIds = [...new Set(progressData.map((p) => p.user_id))];
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url')
          .in('id', userIds);

        const profileMap = new Map(
          (profilesData || []).map((p) => [p.id, { full_name: p.full_name, avatar_url: p.avatar_url }])
        );

        const ranked = progressData
          .map((p) => ({
            user_id: p.user_id,
            full_name: profileMap.get(p.user_id)?.full_name ?? 'Anônimo',
            avatar_url: profileMap.get(p.user_id)?.avatar_url ?? null,
            completed: Array.isArray(p.completed_rooms) ? p.completed_rooms.length : 0,
            total_attempts: p.total_attempts ?? 0,
          }))
          .sort((a, b) => {
            if (b.completed !== a.completed) return b.completed - a.completed;
            return a.total_attempts - b.total_attempts;
          })
          .slice(0, 50)
          .map((r, i) => ({
            rank: i + 1,
            full_name: r.full_name,
            avatar_url: r.avatar_url,
            completed: r.completed,
            total_attempts: r.total_attempts,
          }));

        if (!cancelled) setRows(ranked);
      } catch {
        if (!cancelled) setError('Erro ao carregar o ranking.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRanking();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--muted-gray)] hover:text-[var(--matrix-green)] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <Trophy className="w-10 h-10 text-[var(--warning-amber)]" />
          <div>
            <h1 className="text-2xl font-bold text-[var(--ghost-white)]">Ranking</h1>
            <p className="text-sm text-[var(--muted-gray)]">Top jogadores por salas completadas</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-pulse text-[var(--muted-gray)]">Carregando...</div>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-[var(--error-red)]">
            <p>{error}</p>
            <Link href="/" className="mt-4 inline-block text-[var(--matrix-green)] hover:underline">
              Voltar ao início
            </Link>
          </div>
        ) : rows.length === 0 ? (
          <div className="text-center py-16 text-[var(--muted-gray)]">
            <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Nenhum jogador no ranking ainda.</p>
            <p className="text-sm mt-2">Cadastre-se e complete desafios para aparecer aqui!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {rows.map((r) => (
              <div
                key={r.rank}
                className="flex items-center gap-4 p-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--deep-space)]/50 hover:border-[var(--matrix-green)]/30 transition-colors"
              >
                <span className="w-8 text-center font-bold text-[var(--muted-gray)]">
                  {r.rank === 1 ? <Medal className="w-6 h-6 text-[var(--warning-amber)] mx-auto" /> : r.rank}
                </span>
                {r.avatar_url ? (
                  <img src={r.avatar_url} alt="" className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[var(--border-subtle)] flex items-center justify-center">
                    <User className="w-5 h-5 text-[var(--muted-gray)]" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[var(--ghost-white)] truncate">
                    {r.full_name || 'Anônimo'}
                  </p>
                  <p className="text-xs text-[var(--muted-gray)]">
                    {r.completed} salas · {r.total_attempts} tentativas
                  </p>
                </div>
                <span className="text-[var(--matrix-green)] font-mono font-semibold">{r.completed}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
