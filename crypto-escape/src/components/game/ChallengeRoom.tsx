'use client';

import { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import LabChallenge from './labs/LabChallenge';
import type { Challenge, CodeChallenge as CodeChallengeType, LabChallenge as LabChallengeType, TheoryChallenge } from '@/types/challenge';
import { BookOpen, Lightbulb, ArrowRight, Globe, Wrench, Book } from 'lucide-react';
import { getNextChallenge } from '@/data/challenges';
import { markRoomComplete, isRoomComplete } from '@/lib/progress';
import RichText from '@/components/ui/RichText';
import { getContext } from '@/data/context';

const noopSubscribe = () => () => {};

// O editor depende do navegador (linguagem preferida salva, Monaco): renderizar só no cliente
// evita diferença entre o HTML do servidor e o do navegador (erro de hidratação).
const CodeChallenge = dynamic(() => import('./CodeChallenge'), {
  ssr: false,
  loading: () => <div className="code-challenge-loading">Carregando editor…</div>,
});

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
  const isLabChallenge = challenge.type === 'lab';

  // Em exercícios com testes, a explicação (que pode entregar a resposta) só aparece depois de resolver
  const completedBefore = useSyncExternalStore(
    noopSubscribe,
    () => isRoomComplete(challenge.id),
    () => false
  );
  const [solvedNow, setSolvedNow] = useState(false);
  const explanationLocked =
    isCodeChallenge && !!(challenge as CodeChallengeType).tests && !completedBefore && !solvedNow;

  const handleCodeComplete = () => {
    setSolvedNow(true);
    onComplete?.();
  };

  // Guarda a versão mais recente do callback sem reexecutar o efeito a cada renderização
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  // Salas de teoria contam como concluídas ao serem abertas
  useEffect(() => {
    if (isTheoryChallenge) {
      markRoomComplete(challenge.id);
      onCompleteRef.current?.();
    }
  }, [challenge.id, isTheoryChallenge]);

  const handleTheoryContinue = () => {
    if (episode !== undefined && room) {
      const next = getNextChallenge(episode, room);
      if (next) {
        router.push(`/game/${next.episode}/${next.room}`);
      }
    }
  };

  const context = getContext(episode);

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
              {explanationLocked ? (
                <p>🔒 A explicação completa é liberada depois que você resolver o desafio. Tente primeiro: é assim que se aprende de verdade!</p>
              ) : challenge.explanation ? (
                <RichText text={challenge.explanation} />
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
              <RichText text={context.realWorld} />
            </div>
          </div>
        )}

        {activeTab === 'tools' && !isTheoryChallenge && (
          <div className="tab-content tools-tab">
            <h2>🔧 Ferramentas Profissionais</h2>
            <div className="theory-content">
              <RichText text={context.tools} />
            </div>
          </div>
        )}

        {/* Challenge Content (default tab) */}
        {(activeTab === 'challenge' || isTheoryChallenge) && (
          <>
            <div className="room-description">
              <RichText text={challenge.description} />
            </div>

        {isTheoryChallenge && (challenge as TheoryChallenge).content && (
          <div className="theory-content">
            <RichText text={(challenge as TheoryChallenge).content} />
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

        {(isCodeChallenge || isLabChallenge) && (challenge as CodeChallengeType | LabChallengeType).instructions && (
          <div className="instructions-box">
            <strong>Objetivo:</strong> <RichText text={(challenge as CodeChallengeType | LabChallengeType).instructions} />
          </div>
        )}

        {challenge.explanation && !explanationLocked && (
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
                <RichText text={challenge.explanation} />
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
            key={challenge.id}
            challenge={challenge as CodeChallengeType}
            onComplete={handleCodeComplete}
          />
        )}

        {isLabChallenge && (
          <LabChallenge
            key={challenge.id}
            challenge={challenge as LabChallengeType}
            onComplete={onComplete}
          />
        )}
          </>
        )}
      </div>
    </div>
  );
}
