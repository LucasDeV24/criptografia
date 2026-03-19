'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function CadastroPage() {
  const { signUp, user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (user) {
    router.replace('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signUp(email.trim(), password, name.trim());
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    setSuccess(true);
  };

  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--muted-gray)] hover:text-[var(--matrix-green)] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <UserPlus className="w-10 h-10 text-[var(--matrix-green)]" />
          <div>
            <h1 className="text-2xl font-bold text-[var(--ghost-white)]">Criar conta</h1>
            <p className="text-sm text-[var(--muted-gray)]">Cadastre-se para aparecer no ranking</p>
          </div>
        </div>

        {success ? (
          <div className="p-6 rounded-lg border border-[var(--matrix-green)]/50 bg-[var(--deep-space)]">
            <p className="text-[var(--matrix-green)] font-medium">Conta criada com sucesso!</p>
            <p className="text-sm text-[var(--muted-gray)] mt-2">
              Faça login na página de entrada para acessar. Se o Supabase exigir confirmação, verifique seu email antes.
            </p>
            <Link
              href="/entrar"
              className="mt-4 inline-block text-[var(--matrix-green)] hover:underline"
            >
              Ir para login →
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-[var(--muted-gray)] mb-1">Nome (aparece no ranking)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome ou apelido"
                className="w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--deep-space)] text-[var(--ghost-white)] placeholder-[var(--muted-gray)]/50 focus:border-[var(--matrix-green)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--muted-gray)] mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--deep-space)] text-[var(--ghost-white)] placeholder-[var(--muted-gray)]/50 focus:border-[var(--matrix-green)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--muted-gray)] mb-1">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--deep-space)] text-[var(--ghost-white)] placeholder-[var(--muted-gray)]/50 focus:border-[var(--matrix-green)] focus:outline-none"
              />
            </div>
            {error && (
              <p className="text-sm text-[var(--error-red)]">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-[var(--matrix-green)] text-[var(--void-black)] font-semibold hover:shadow-[0_0_20px_var(--glow-green)] transition-all disabled:opacity-50"
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
            <p className="text-center text-sm text-[var(--muted-gray)]">
              Já tem conta?{' '}
              <Link href="/entrar" className="text-[var(--matrix-green)] hover:underline">
                Entrar
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
