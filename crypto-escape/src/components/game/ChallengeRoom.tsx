'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CodeChallenge from './CodeChallenge';
import type { Challenge, CodeChallenge as CodeChallengeType, TheoryChallenge } from '@/types/challenge';
import { BookOpen, Lightbulb, ArrowRight, Globe, Wrench, Book } from 'lucide-react';
import { getNextChallenge } from '@/data/challenges';
import { markRoomComplete } from '@/lib/progress';

type TabType = 'challenge' | 'theory' | 'real-world' | 'tools';

export default function ChallengeRoom({
  challenge,
  onComplete,
  episode,
  room,
}: {
  challenge: Challenge;
  onComplete?: () => void;
  episode?: number;
  room?: string;
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('challenge');
  const [showExplanation, setShowExplanation] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const isCodeChallenge = challenge.type === 'code';
  const isTheoryChallenge = challenge.type === 'theory';

  useEffect(() => {
    if (isTheoryChallenge) {
      markRoomComplete(challenge.id);
      onComplete?.();
    }
  }, [challenge.id, isTheoryChallenge, onComplete]);

  const handleTheoryContinue = () => {
    if (episode !== undefined && room) {
      const next = getNextChallenge(episode, room);
      if (next) {
        router.push(`/game/${next.episode}/${next.room}`);
      }
    }
  };

  // Conteúdo dinâmico baseado no episódio/sala
  const getRealWorldContent = () => {
    if (episode === 4) return `**Casos reais de XSS:**\n\n• **2018 - Twitter:** Vulnerabilidade permitia roubo de tokens\n• **2019 - Steam:** XSS em perfis de usuário\n• **Bug Bounty:** Pagamentos de $500 a $5.000 por XSS\n\n**Como empresas se protegem:**\n• Content Security Policy (CSP)\n• Sanitização de inputs\n• HttpOnly cookies`;
    if (episode === 5) return `**Casos reais de SQL Injection:**\n\n• **2017 - Equifax:** 147 milhões de dados vazados\n• **2015 - TalkTalk:** £400k de multa\n• **Estatística:** 65% das aplicações web são vulneráveis\n\n**Impacto financeiro:**\n• Custo médio de um breach: $4.24 milhões\n• LGPD: Multas de até 2% do faturamento`;
    if (episode === 6) return `**Dia a dia de um SOC Analyst:**\n\n• Monitoramento 24/7 de alertas\n• Investigação de incidentes\n• Criação de regras de detecção\n• Relatórios para gestão\n\n**Salário:**\n• Júnior: R$ 3.000 - R$ 6.000\n• Pleno: R$ 7.000 - R$ 12.000\n• Sênior: R$ 15.000+`;
    return `**Aplicações no mundo real:**\n\nEste conhecimento é usado por:\n• Analistas de Segurança\n• Pentesters\n• Bug Bounty Hunters\n• Desenvolvedores preocupados com segurança\n\n**Certificações relacionadas:**\n• CompTIA Security+\n• CEH (Certified Ethical Hacker)\n• OSCP (Offensive Security)`;
  };

  const getToolsContent = () => {
    if (episode === 4) return `**Ferramentas para XSS:**\n\n• **XSS Hunter:** Detecta blind XSS\n• **Burp Suite:** Scanner + Repeater\n• **OWASP ZAP:** Scanner automático\n• **BeEF:** Exploitation framework\n\n**Payloads úteis:**\n\`\`\`\n<script>alert(document.cookie)</script>\n<img src=x onerror=alert(1)>\n<svg onload=alert(1)>\n\`\`\``;
    if (episode === 5) return `**Ferramentas para SQLi:**\n\n• **sqlmap:** Automação completa\n• **Burp Suite:** Manual testing\n• **SQLNinja:** MS SQL específico\n\n**Comandos úteis:**\n\`\`\`bash\nsqlmap -u "http://site.com?id=1" --dbs\nsqlmap -u "..." -D database --tables\nsqlmap -u "..." -D db -T users --dump\n\`\`\``;
    if (episode === 11) return `**Ferramentas de Network Analysis:**\n\n• **Wireshark:** Análise de pacotes\n• **tcpdump:** Captura CLI\n• **Zeek:** IDS baseado em rede\n• **Suricata:** IPS de alta performance\n\n**Filtros Wireshark úteis:**\n\`\`\`\nhttp.request.method == "POST"\ntcp.port == 443\nip.addr == 192.168.1.1\n\`\`\``;
    return `**Ferramentas recomendadas:**\n\n• **CyberChef:** Encoding/decoding universal\n• **Burp Suite Community:** Proxy HTTP\n• **VS Code:** Editor com extensões de security\n• **Postman:** Testes de API\n\n**Como instalar:**\nVisite os sites oficiais de cada ferramenta para downloads seguros.`;
  };

  return (
    <div className="challenge-room">
      <div className="room-content">
        <h1 className="room-title">{challenge.title}</h1>
        
        {/* Tabs Navigation */}
        {!isTheoryChallenge && (
          <div className="challenge-tabs">
            <button
              className={`tab-button ${activeTab === 'challenge' ? 'active' : ''}`}
              onClick={() => setActiveTab('challenge')}
            >
              <Book className="w-4 h-4" />
              Desafio
            </button>
            <button
              className={`tab-button ${activeTab === 'theory' ? 'active' : ''}`}
              onClick={() => setActiveTab('theory')}
            >
              <BookOpen className="w-4 h-4" />
              Teoria
            </button>
            <button
              className={`tab-button ${activeTab === 'real-world' ? 'active' : ''}`}
              onClick={() => setActiveTab('real-world')}
            >
              <Globe className="w-4 h-4" />
              Mundo Real
            </button>
            <button
              className={`tab-button ${activeTab === 'tools' ? 'active' : ''}`}
              onClick={() => setActiveTab('tools')}
            >
              <Wrench className="w-4 h-4" />
              Ferramentas
            </button>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'theory' && !isTheoryChallenge && (
          <div className="tab-content theory-tab">
            <h2>📚 Conceitos Técnicos</h2>
            <div className="theory-content">
              {challenge.explanation ? (
                <>
                  {challenge.explanation.split('\n\n').map((para, i) => {
                    const formatted = para
                      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                      .replace(/`([^`]+)`/g, '<code>$1</code>');
                    return (
                      <p key={i} dangerouslySetInnerHTML={{ __html: formatted }} />
                    );
                  })}
                </>
              ) : (
                <p>Informações técnicas detalhadas sobre este desafio.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'real-world' && !isTheoryChallenge && (
          <div className="tab-content real-world-tab">
            <h2>🌍 Aplicações no Mundo Real</h2>
            <div className="theory-content">
              {getRealWorldContent().split('\n\n').map((para, i) => {
                const formatted = para
                  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                  .replace(/`([^`]+)`/g, '<code>$1</code>')
                  .replace(/^• /gm, '&bull; ');
                return (
                  <p key={i} dangerouslySetInnerHTML={{ __html: formatted }} />
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'tools' && !isTheoryChallenge && (
          <div className="tab-content tools-tab">
            <h2>🔧 Ferramentas Profissionais</h2>
            <div className="theory-content">
              {getToolsContent().split('\n\n').map((para, i) => {
                const formatted = para
                  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                  .replace(/`([^`]+)`/g, '<code>$1</code>')
                  .replace(/^• /gm, '&bull; ');
                return (
                  <p key={i} dangerouslySetInnerHTML={{ __html: formatted }} />
                );
              })}
            </div>
          </div>
        )}

        {/* Challenge Content (default tab) */}
        {(activeTab === 'challenge' || isTheoryChallenge) && (
          <>
            <div className="room-description">
              {challenge.description}
            </div>

        {isTheoryChallenge && (challenge as TheoryChallenge).content && (
          <div className="theory-content">
            {(challenge as TheoryChallenge).content
              .trim()
              .split(/\n\n+/)
              .map((para, i) => {
                const formatted = para
                  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                  .replace(/`([^`]+)`/g, '<code>$1</code>');
                return (
                  <p key={i} dangerouslySetInnerHTML={{ __html: formatted }} />
                );
              })}
          </div>
        )}

        {isTheoryChallenge && episode !== undefined && room && (
          <button
            type="button"
            className="continue-btn"
            onClick={handleTheoryContinue}
          >
            Continuar
            <ArrowRight className="w-5 h-5" />
          </button>
        )}

        {challenge.context && (
          <div className="context-box">
            <code>{challenge.context}</code>
          </div>
        )}

        {isCodeChallenge && (challenge as CodeChallengeType).instructions && (
          <div className="instructions-box">
            <strong>Objetivo:</strong> {(challenge as CodeChallengeType).instructions}
          </div>
        )}

        {challenge.explanation && (
          <div className="explanation-section">
            <button
              type="button"
              className="explanation-toggle"
              onClick={() => setShowExplanation(!showExplanation)}
            >
              <BookOpen className="icon" />
              {showExplanation ? 'Ocultar explicação' : 'Ver explicação'}
            </button>
            {showExplanation && (
              <div className="explanation-content">
                {challenge.explanation}
              </div>
            )}
          </div>
        )}

        {challenge.hints && challenge.hints.length > 0 && (
          <div className="hints-section">
            <button
              type="button"
              className="hint-toggle"
              onClick={() => setHintLevel(Math.min(hintLevel + 1, challenge.hints!.length))}
              disabled={hintLevel >= challenge.hints!.length}
            >
              <Lightbulb className="icon" />
              Dica {hintLevel > 0 ? `${hintLevel}/${challenge.hints!.length}` : ''}
            </button>
            {hintLevel > 0 && (
              <div className="hint-content">
                {challenge.hints[hintLevel - 1]}
              </div>
            )}
          </div>
        )}

        {isCodeChallenge && (
          <CodeChallenge
            challenge={challenge as CodeChallengeType}
            onComplete={onComplete}
          />
        )}
          </>
        )}
      </div>
    </div>
  );
}
