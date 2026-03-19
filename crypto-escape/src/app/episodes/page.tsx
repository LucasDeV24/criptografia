'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Lock, CheckCircle, Shield, Code2, Database, Terminal, Key, Trophy,
  Globe, Search, Network, Wifi, FileCode, AlertTriangle,
  GitBranch, Repeat, List, Type, Braces, TextCursorInput, Puzzle,
  Filter, RefreshCw, ArrowUpDown, FolderOpen, Binary, KeyRound, Hash, ShieldAlert, Activity,
  Eye, FileSearch, Users, Regex, Radar, Zap, ClipboardList, Crosshair, Award,
} from 'lucide-react';
import { getProgress, TOTAL_ROOMS } from '@/lib/progress';
import { challengesByEpisode } from '@/data/challenges';

const EPISODE_META = [
  // Módulo 1: Programação (0-7)
  { title: 'Fundamentos', desc: 'Código, variáveis e primeiros passos', icon: Code2, color: 'var(--matrix-green)' },
  { title: 'Condições', desc: 'Comparações, if/else e decisões', icon: GitBranch, color: 'var(--matrix-green)' },
  { title: 'Loops', desc: 'Repetição, for e percorrer textos', icon: Repeat, color: 'var(--matrix-green)' },
  { title: 'Arrays', desc: 'Listas, wordlists e busca', icon: List, color: 'var(--matrix-green)' },
  { title: 'Strings', desc: 'Manipulação de textos e ASCII', icon: Type, color: 'var(--matrix-green)' },
  { title: 'Funções', desc: 'Criar, chamar e retornar valores', icon: Puzzle, color: 'var(--matrix-green)' },
  { title: 'Objetos e JSON', desc: 'Chave-valor, APIs e dados estruturados', icon: Braces, color: 'var(--matrix-green)' },
  { title: 'Métodos de String', desc: 'includes, split, replace e indexOf', icon: TextCursorInput, color: 'var(--matrix-green)' },
  // Módulo 2: Cibersegurança (8-19)
  { title: 'Cifra de César', desc: 'Criptografia clássica e decodificação', icon: Key, color: 'var(--cyber-cyan)' },
  { title: 'Hash e Senhas', desc: 'Proteção de senhas e força bruta', icon: Lock, color: 'var(--cyber-cyan)' },
  { title: 'Base64 e Encoding', desc: 'Codificação e análise de malware', icon: FileCode, color: 'var(--cyber-cyan)' },
  { title: 'XSS', desc: 'Cross-Site Scripting e payloads', icon: Code2, color: 'var(--warning-amber)' },
  { title: 'SQL Injection', desc: 'Manipulação de bancos de dados', icon: Database, color: 'var(--warning-amber)' },
  { title: 'SOC Analyst', desc: 'Análise de logs e detecção', icon: Terminal, color: 'var(--error-red)' },
  { title: 'Força Bruta', desc: 'Wordlists e ataques automatizados', icon: Key, color: 'var(--error-red)' },
  { title: 'APIs REST', desc: 'Autenticação e IDOR', icon: Globe, color: '#a855f7' },
  { title: 'JWT Tokens', desc: 'Session hijacking e exploração', icon: Shield, color: '#a855f7' },
  { title: 'Esteganografia', desc: 'Dados ocultos em arquivos', icon: Search, color: '#ec4899' },
  { title: 'Network Analysis', desc: 'Tráfego de rede e exfiltração', icon: Wifi, color: '#ec4899' },
  { title: 'Projeto Final', desc: 'SOC Analyst Challenge completo', icon: AlertTriangle, color: '#f59e0b' },
  // Módulo 3: Lógica e Algoritmos (20-23)
  { title: 'Operadores Lógicos', desc: 'AND, OR, NOT e regras de firewall', icon: Filter, color: 'var(--matrix-green)' },
  { title: 'While e Controle', desc: 'break, continue, tentativas de login', icon: RefreshCw, color: 'var(--matrix-green)' },
  { title: 'Algoritmos de Busca', desc: 'Busca linear vs binária', icon: Search, color: 'var(--matrix-green)' },
  { title: 'Ordenação', desc: 'Bubble sort e complexidade', icon: ArrowUpDown, color: 'var(--matrix-green)' },
  // Módulo 4: Segurança Web Avançada (24-28)
  { title: 'CSRF', desc: 'Cross-Site Request Forgery e tokens', icon: Shield, color: 'var(--warning-amber)' },
  { title: 'Command Injection', desc: 'Execução de comandos no servidor', icon: Terminal, color: 'var(--warning-amber)' },
  { title: 'Directory Traversal', desc: 'Acesso a arquivos proibidos', icon: FolderOpen, color: 'var(--warning-amber)' },
  { title: 'Validação e Sanitização', desc: 'Defesa contra ataques web', icon: CheckCircle, color: 'var(--warning-amber)' },
  { title: 'CORS e Security Headers', desc: 'Cabeçalhos HTTP de segurança', icon: Globe, color: 'var(--warning-amber)' },
  // Módulo 5: Criptografia Moderna (29-32)
  { title: 'XOR e Binário', desc: 'Base da criptografia moderna', icon: Binary, color: 'var(--cyber-cyan)' },
  { title: 'Criptografia Simétrica', desc: 'AES e uma chave', icon: Key, color: 'var(--cyber-cyan)' },
  { title: 'Chave Pública e RSA', desc: 'Assinaturas digitais', icon: KeyRound, color: 'var(--cyber-cyan)' },
  { title: 'Hashing Avançado', desc: 'Salt, pepper, rainbow tables', icon: Hash, color: 'var(--cyber-cyan)' },
  // Módulo 6: Blue Team (33-36)
  { title: 'Regras de Firewall', desc: 'Whitelist, blacklist, portas', icon: ShieldAlert, color: 'var(--error-red)' },
  { title: 'IDS/IPS', desc: 'Detecção de intrusão', icon: Activity, color: 'var(--error-red)' },
  { title: 'Resposta a Incidentes', desc: 'NIST, timeline, severidade', icon: AlertTriangle, color: 'var(--error-red)' },
  { title: 'Hardening', desc: 'Blindar sistemas', icon: Lock, color: 'var(--error-red)' },
  // Módulo 7: OSINT (37-39)
  { title: 'Google Dorks', desc: 'Buscas avançadas e exposição', icon: Eye, color: '#a855f7' },
  { title: 'Análise de Metadados', desc: 'EXIF, documentos e perfilamento', icon: FileSearch, color: '#a855f7' },
  { title: 'Engenharia Social', desc: 'Phishing, pretexting e manipulação', icon: Users, color: '#a855f7' },
  // Módulo 8: Regex e Automação (40-43)
  { title: 'Regex', desc: 'Expressões regulares e padrões', icon: Regex, color: 'var(--cyber-cyan)' },
  { title: 'Scanner', desc: 'Port scan e vulnerability scan', icon: Radar, color: 'var(--cyber-cyan)' },
  { title: 'Automação', desc: 'Logs e compliance automáticos', icon: Zap, color: 'var(--cyber-cyan)' },
  { title: 'Relatórios', desc: 'Pentest reports e dashboards', icon: ClipboardList, color: 'var(--cyber-cyan)' },
  // Módulo 9: Missão Final (44-45)
  { title: 'Pentest Final', desc: 'Missão completa do zero', icon: Crosshair, color: '#f59e0b' },
  { title: 'Certificação', desc: 'Próximos passos e carreira', icon: Award, color: '#f59e0b' },
];

export default function EpisodesPage() {
  const [completedRooms, setCompletedRooms] = useState<string[]>([]);

  useEffect(() => {
    setCompletedRooms(getProgress().completedRooms);
  }, []);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-[var(--muted-gray)] hover:text-[var(--matrix-green)] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Link>
            <Link href="/ranking" className="inline-flex items-center gap-2 text-[var(--muted-gray)] hover:text-[var(--matrix-green)] transition-colors">
              <Trophy className="w-4 h-4" />
              Ranking
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-[var(--ghost-white)] mb-4">Episódios</h1>
          <p className="text-[var(--muted-gray)] text-lg">
            {completedRooms.length} de {TOTAL_ROOMS} salas completas
          </p>
          <div className="mt-4 w-full h-2 bg-[var(--deep-space)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
            <div
              className="h-full bg-[var(--matrix-green)] rounded-full transition-all duration-500"
              style={{ width: `${Math.round((completedRooms.length / TOTAL_ROOMS) * 100)}%` }}
            />
          </div>
        </header>

        <section className="mb-12">
          <h2 className="text-sm font-medium text-[var(--matrix-green)] uppercase tracking-wider mb-1">Módulo 1</h2>
          <p className="text-lg text-[var(--ghost-white)] font-semibold mb-6">Programação</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {EPISODE_META.slice(0, 8).map((ep, idx) => (
              <EpisodeCard key={idx} ep={ep} idx={idx} completedRooms={completedRooms} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-medium text-[var(--cyber-cyan)] uppercase tracking-wider mb-1">Módulo 2</h2>
          <p className="text-lg text-[var(--ghost-white)] font-semibold mb-6">Cibersegurança</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {EPISODE_META.slice(8, 20).map((ep, idx) => (
              <EpisodeCard key={idx + 8} ep={ep} idx={idx + 8} completedRooms={completedRooms} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-medium text-[var(--matrix-green)] uppercase tracking-wider mb-1">Módulo 3</h2>
          <p className="text-lg text-[var(--ghost-white)] font-semibold mb-6">Lógica e Algoritmos</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {EPISODE_META.slice(20, 24).map((ep, idx) => (
              <EpisodeCard key={idx + 20} ep={ep} idx={idx + 20} completedRooms={completedRooms} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-medium text-[var(--warning-amber)] uppercase tracking-wider mb-1">Módulo 4</h2>
          <p className="text-lg text-[var(--ghost-white)] font-semibold mb-6">Segurança Web Avançada</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {EPISODE_META.slice(24, 29).map((ep, idx) => (
              <EpisodeCard key={idx + 24} ep={ep} idx={idx + 24} completedRooms={completedRooms} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-medium text-[var(--cyber-cyan)] uppercase tracking-wider mb-1">Módulo 5</h2>
          <p className="text-lg text-[var(--ghost-white)] font-semibold mb-6">Criptografia Moderna</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {EPISODE_META.slice(29, 33).map((ep, idx) => (
              <EpisodeCard key={idx + 29} ep={ep} idx={idx + 29} completedRooms={completedRooms} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-medium text-[var(--error-red)] uppercase tracking-wider mb-1">Módulo 6</h2>
          <p className="text-lg text-[var(--ghost-white)] font-semibold mb-6">Blue Team e Defesa</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {EPISODE_META.slice(33, 37).map((ep, idx) => (
              <EpisodeCard key={idx + 33} ep={ep} idx={idx + 33} completedRooms={completedRooms} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-medium text-[#a855f7] uppercase tracking-wider mb-1">Módulo 7</h2>
          <p className="text-lg text-[var(--ghost-white)] font-semibold mb-6">OSINT e Engenharia Social</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {EPISODE_META.slice(37, 40).map((ep, idx) => (
              <EpisodeCard key={idx + 37} ep={ep} idx={idx + 37} completedRooms={completedRooms} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-medium text-[var(--cyber-cyan)] uppercase tracking-wider mb-1">Módulo 8</h2>
          <p className="text-lg text-[var(--ghost-white)] font-semibold mb-6">Regex e Automação</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {EPISODE_META.slice(40, 44).map((ep, idx) => (
              <EpisodeCard key={idx + 40} ep={ep} idx={idx + 40} completedRooms={completedRooms} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-medium text-[#f59e0b] uppercase tracking-wider mb-1">Módulo 9</h2>
          <p className="text-lg text-[var(--ghost-white)] font-semibold mb-6">Missão Final</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {EPISODE_META.slice(44, 46).map((ep, idx) => (
              <EpisodeCard key={idx + 44} ep={ep} idx={idx + 44} completedRooms={completedRooms} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function EpisodeCard({ ep, idx, completedRooms }: { ep: (typeof EPISODE_META)[number]; idx: number; completedRooms: string[] }) {
  const Icon = ep.icon;
  const episodeChallenges = challengesByEpisode[idx] || [];
  const totalRooms = episodeChallenges.length;
  const completedInEp = episodeChallenges.filter(c => completedRooms.includes(c.id)).length;
  const isComplete = completedInEp === totalRooms && totalRooms > 0;
  const isStarted = completedInEp > 0;
  const firstRoom = episodeChallenges[0];

  return (
    <Link
      href={firstRoom ? `/game/${idx}/${firstRoom.room}` : '/'}
      className={`group relative p-5 rounded-xl border transition-all duration-300 hover:translate-y-[-4px] ${
        isComplete
          ? 'border-[var(--matrix-green)]/40 bg-[var(--matrix-green)]/5'
          : 'border-[var(--border-subtle)] bg-[var(--deep-space)]/50 hover:border-[var(--matrix-green)]/30'
      }`}
    >
      {isComplete && (
        <div className="absolute top-3 right-3">
          <CheckCircle className="w-5 h-5 text-[var(--matrix-green)]" />
        </div>
      )}
      <div className="flex items-start gap-3">
        <div
          className="p-2.5 rounded-lg border border-[var(--border-subtle)] group-hover:border-current transition-colors"
          style={{ color: ep.color }}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[var(--muted-gray)] mb-0.5">Ep {idx}</p>
          <h3 className="text-base font-semibold text-[var(--ghost-white)] mb-0.5 leading-tight">{ep.title}</h3>
          <p className="text-xs text-[var(--muted-gray)] mb-3 leading-relaxed">{ep.desc}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--muted-gray)]">
              {completedInEp}/{totalRooms} salas
            </span>
            {isComplete ? (
              <span className="text-xs text-[var(--matrix-green)] font-medium">Completo</span>
            ) : isStarted ? (
              <span className="text-xs text-[var(--cyber-cyan)] font-medium">Em andamento</span>
            ) : (
              <span className="text-xs text-[var(--muted-gray)]">Não iniciado</span>
            )}
          </div>
          <div className="mt-2 w-full h-1.5 bg-[var(--deep-space)] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: totalRooms > 0 ? `${(completedInEp / totalRooms) * 100}%` : '0%',
                backgroundColor: ep.color,
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
