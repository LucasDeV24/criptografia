'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-md text-center">
        <AlertCircle className="w-16 h-16 text-[var(--error-red)] mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-[var(--ghost-white)] mb-2">
          Algo deu errado
        </h1>
        <p className="text-[var(--muted-gray)] mb-8">
          Ocorreu um erro inesperado. Tente novamente.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--matrix-green)] text-[var(--void-black)] font-semibold hover:shadow-[0_0_20px_var(--glow-green)] transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Tentar novamente
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border-subtle)] text-[var(--ghost-white)] font-semibold hover:border-[var(--matrix-green)] transition-all"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
