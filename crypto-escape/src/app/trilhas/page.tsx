import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Clock, Code2, ShieldCheck, Briefcase } from 'lucide-react';
import { challengesByEpisode } from '@/data/challenges';

export const metadata = {
  title: 'Trilhas de carreira — Crypto Escape',
  description: 'O que você precisa aprender para trabalhar como desenvolvedor ou como hacker ético, e o que já existe aqui.',
};

type Stage = {
  title: string;
  learn: string;
  /** Episódios do site que cobrem esta etapa (vazio = ainda não existe) */
  episodes: number[];
};

const DEV_TRACK: Stage[] = [
  { title: 'Lógica de programação', learn: 'Variáveis, condições, funções, repetição, listas, textos e objetos. Você escreve funções que são testadas com casos de borda ocultos.', episodes: [0, 1, 2, 3, 4, 5, 6, 7] },
  { title: 'Terminal e linha de comando', learn: 'Navegar, ler e organizar arquivos, buscar texto, combinar comandos com pipes, permissões, processos (ps/kill) e laboratórios cronometrados. É onde o dev roda e investiga tudo.', episodes: [47, 48] },
  { title: 'Redes (TCP/IP, DNS, HTTP)', learn: 'Como os dados viajam: IP, portas, ping, traceroute, DNS (dig, whois) e HTTP (curl, status, headers). Base para entender APIs, deploy e o próprio navegador.', episodes: [49] },
  { title: 'Algoritmos e estruturas', learn: 'Operadores lógicos, while, busca e ordenação, e como medir se uma solução é boa.', episodes: [20, 21, 22, 23] },
  { title: 'Código seguro', learn: 'Validar e sanitizar entradas, cabeçalhos de segurança, e não confiar no que vem do usuário.', episodes: [27, 28] },
  { title: 'Automação e regex', learn: 'Expressões regulares, scanners e scripts que automatizam tarefas.', episodes: [40, 41, 42] },
  { title: 'HTML, CSS e o navegador (DOM)', learn: 'Como uma página é montada e como o JavaScript interage com ela.', episodes: [] },
  { title: 'HTTP, APIs e JSON', learn: 'Como cliente e servidor conversam; consumir e criar APIs REST.', episodes: [] },
  { title: 'Bancos de dados e SQL', learn: 'Modelar dados, consultar com SELECT/JOIN e usar consultas parametrizadas.', episodes: [] },
  { title: 'Git e GitHub', learn: 'Versionar código, trabalhar em branches e abrir pull requests.', episodes: [] },
  { title: 'Testes e código limpo', learn: 'Escrever testes automatizados, revisar código e organizar projetos.', episodes: [] },
  { title: 'Projetos de portfólio', learn: 'Construir e publicar aplicações completas para mostrar em entrevistas.', episodes: [] },
];

const SEC_TRACK: Stage[] = [
  { title: 'Terminal e Linux (base)', learn: 'Pré-requisito da segurança: pwd, ls, cd, cat, grep, find, pipes, permissões, processos (ps/kill) e laboratórios cronometrados de ataque e defesa. Todo incidente real passa por aqui.', episodes: [47, 48] },
  { title: 'Redes (TCP/IP, DNS, HTTP)', learn: 'IP, portas, ping, traceroute, DNS (dig, whois) e HTTP (curl). Reconhecimento de rede começa aqui — inclusive o cuidado de nunca confiar só no ping.', episodes: [49] },
  { title: 'Fundamentos de segurança', learn: 'Criptografia clássica, hash e senhas, Base64 e o básico de força bruta.', episodes: [8, 9, 10, 14] },
  { title: 'Vulnerabilidades web (OWASP)', learn: 'XSS, SQL Injection, CSRF, injeção de comandos, directory traversal, IDOR e JWT.', episodes: [11, 12, 15, 16, 24, 25, 26] },
  { title: 'Modo Hacker: prática no terminal e em sites', learn: 'Terminal, nmap, ssh e laboratórios de SQLi, XSS e IDOR com flags.', episodes: [46] },
  { title: 'Criptografia moderna', learn: 'XOR, criptografia simétrica e assimétrica, hashing avançado com salt.', episodes: [29, 30, 31, 32] },
  { title: 'Defesa (Blue Team)', learn: 'Firewall, IDS/IPS, resposta a incidentes, hardening e análise de logs (SOC).', episodes: [13, 18, 19, 33, 34, 35, 36] },
  { title: 'OSINT, dados ocultos e engenharia social', learn: 'Google dorks, metadados, esteganografia, phishing e como as pessoas são o elo mais fraco.', episodes: [17, 37, 38, 39] },
  { title: 'Relatórios e missão final', learn: 'Documentar achados, medir risco e conduzir um pentest do início ao fim.', episodes: [43, 44, 45] },
  { title: 'Active Directory', learn: 'Domínios, usuários, grupos e por que grupos aninhados escondem privilégios de administrador sem ninguém perceber. Um dos alvos mais comuns em pentest corporativo.', episodes: [50] },
  { title: 'Ferramentas de Pentest', learn: 'gobuster (descoberta de conteúdo) e sqlmap (SQL Injection automatizado): as mesmas ferramentas usadas no Kali Linux, automatizando o que você já fez na mão.', episodes: [51] },
  { title: 'Linux avançado e escalada de privilégios', learn: 'Serviços, sudo, processos e como um atacante sobe de nível numa máquina (depois do módulo Terminal e Linux, que já cobre o básico).', episodes: [] },
  { title: 'Forense e análise de malware', learn: 'Investigar evidências, memória, arquivos e comportamento de programas suspeitos.', episodes: [] },
  { title: 'Segurança em nuvem e DevSecOps', learn: 'Configurações seguras em cloud, contêineres e segurança no pipeline.', episodes: [] },
];

const ENTRY_STEPS = [
  {
    title: 'Monte seu portfólio',
    text: 'Publique no GitHub seus projetos e, para segurança, relatórios escritos dos labs que você resolveu (o que achou, como explorou, como corrigir). Recrutadores valorizam prova de trabalho.',
  },
  {
    title: 'Pratique em ambientes legais',
    text: 'Depois dos labs simulados daqui, continue em plataformas feitas para treino: TryHackMe, Hack The Box, PortSwigger Web Security Academy e OWASP Juice Shop (rodando no seu computador).',
  },
  {
    title: 'Considere certificações de entrada',
    text: 'Como referência de mercado: CompTIA Security+ (fundamentos de segurança) e eJPT (pentest júnior). Certificações mais avançadas, como a OSCP, exigem bastante prática antes.',
  },
  {
    title: 'Conheça a lei e a ética',
    text: 'Só teste sistemas com autorização por escrito. No Brasil, a Lei 12.737/2012 pune a invasão de dispositivos e a LGPD (Lei 13.709/2018) regula dados pessoais. Programas de bug bounty (como HackerOne e Bugcrowd) autorizam e pagam por falhas encontradas dentro das regras.',
  },
  {
    title: 'Participe de comunidades e CTFs',
    text: 'Campeonatos de CTF, grupos locais e eventos de segurança aceleram o aprendizado e criam contatos profissionais.',
  },
];

function StageCard({ stage, index }: { stage: Stage; index: number }) {
  const available = stage.episodes.length > 0;
  const rooms = stage.episodes.reduce((n, ep) => n + (challengesByEpisode[ep]?.length ?? 0), 0);
  return (
    <li className={`p-4 rounded-xl border ${available ? 'border-[var(--border-subtle)] bg-[var(--deep-space)]/50' : 'border-dashed border-[var(--border-subtle)] opacity-80'}`}>
      <div className="flex items-start gap-3">
        <span className="text-xs font-mono text-[var(--muted-gray)] mt-1">{String(index + 1).padStart(2, '0')}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-[var(--ghost-white)]">{stage.title}</h3>
            {available ? (
              <span className="inline-flex items-center gap-1 text-xs text-[var(--matrix-green)]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Disponível · {rooms} salas
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs text-[var(--warning-amber)]">
                <Clock className="w-3.5 h-3.5" /> Em breve
              </span>
            )}
          </div>
          <p className="text-sm text-[var(--muted-gray)] mt-1">{stage.learn}</p>
          {available && (
            <div className="flex flex-wrap gap-2 mt-2">
              {stage.episodes.map((ep) => {
                const first = challengesByEpisode[ep]?.[0];
                return first ? (
                  <Link
                    key={ep}
                    href={`/game/${ep}/${first.room}`}
                    className="text-xs px-2 py-0.5 rounded border border-[var(--border-subtle)] text-[var(--cyber-cyan)] hover:border-[var(--cyber-cyan)] transition-colors"
                  >
                    Episódio {ep}
                  </Link>
                ) : null;
              })}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

function Track({ title, subtitle, icon, stages, accent }: { title: string; subtitle: string; icon: React.ReactNode; stages: Stage[]; accent: string }) {
  const done = stages.filter((s) => s.episodes.length > 0).length;
  return (
    <section className="mb-14">
      <div className="flex items-center gap-3 mb-1" style={{ color: accent }}>
        {icon}
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <p className="text-[var(--muted-gray)] mb-2">{subtitle}</p>
      <p className="text-sm text-[var(--ghost-white)] mb-5">
        {done} de {stages.length} etapas já disponíveis
      </p>
      <ol className="grid gap-3">
        {stages.map((s, i) => (
          <StageCard key={s.title} stage={s} index={i} />
        ))}
      </ol>
    </section>
  );
}

export default function TrilhasPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[var(--muted-gray)] hover:text-[var(--matrix-green)] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>

        <h1 className="text-4xl font-bold text-[var(--ghost-white)] mb-3">Trilhas de carreira</h1>
        <p className="text-[var(--muted-gray)] text-lg mb-4">
          O que você precisa aprender para trabalhar como desenvolvedor ou como hacker ético, e o que já existe aqui.
        </p>
        <div className="p-4 rounded-xl border border-[var(--warning-amber)]/40 bg-[var(--warning-amber)]/5 text-sm text-[var(--ghost-white)] mb-12">
          <strong>Seja realista:</strong> nenhum curso sozinho forma um profissional. Este site dá a base e o hábito de praticar,
          mas você só vira dev ou pentester construindo projetos, resolvendo laboratórios reais e estudando por anos.
          Marcamos com <em>Em breve</em> o que ainda está sendo construído, sem prometer o que não existe.
        </div>

        <Track
          title="Desenvolvedor"
          subtitle="Do zero até conseguir construir e publicar aplicações."
          icon={<Code2 className="w-6 h-6" />}
          stages={DEV_TRACK}
          accent="var(--matrix-green)"
        />
        <Track
          title="Hacker do bem (Segurança)"
          subtitle="Atacar para entender, defender para proteger, sempre com autorização."
          icon={<ShieldCheck className="w-6 h-6" />}
          stages={SEC_TRACK}
          accent="var(--cyber-cyan)"
        />

        <section>
          <div className="flex items-center gap-3 mb-4 text-[#f59e0b]">
            <Briefcase className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Como entrar na área</h2>
          </div>
          <ol className="grid gap-3">
            {ENTRY_STEPS.map((s, i) => (
              <li key={s.title} className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--deep-space)]/50">
                <h3 className="font-semibold text-[var(--ghost-white)]">
                  <span className="text-[var(--muted-gray)] font-mono mr-2">{i + 1}.</span>
                  {s.title}
                </h3>
                <p className="text-sm text-[var(--muted-gray)] mt-1">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
