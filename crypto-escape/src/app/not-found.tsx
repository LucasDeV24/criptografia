import Link from 'next/link';
import { Terminal, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <Terminal className="w-16 h-16 text-[var(--matrix-green)] mb-6" />
      <h1 className="text-6xl font-bold text-[var(--matrix-green)] mb-2">404</h1>
      <p className="text-xl text-[var(--ghost-white)] mb-2">Acesso Negado</p>
      <p className="text-[var(--muted-gray)] mb-8 max-w-md">
        Esta sala não existe ou você ainda não tem permissão para acessá-la.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--matrix-green)] text-[var(--void-black)] font-semibold hover:shadow-[0_0_20px_var(--glow-green)] transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar ao início
      </Link>
    </div>
  );
}
