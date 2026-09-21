'use client';

import type { LabChallenge as LabChallengeType } from '@/types/challenge';
import { SCENARIOS } from '@/lib/labs/terminal-scenarios';
import { IDOR_FLAG, XSS_FLAG } from '@/lib/labs/websim';
import TerminalLab from './TerminalLab';
import { IdorLab, SqliLab, XssLab } from './WebLabs';

export default function LabChallenge({
  challenge,
  onComplete,
}: {
  challenge: LabChallengeType;
  onComplete?: () => void;
}) {
  switch (challenge.labId) {
    case 'terminal-recon':
    case 'terminal-ssh':
    case 'term-nav':
    case 'term-paths':
    case 'term-read':
    case 'term-files':
    case 'term-search':
    case 'term-pipes':
    case 'term-perm':
      return <TerminalLab scenario={SCENARIOS[challenge.labId]} onComplete={onComplete} />;
    case 'web-sqli':
      return <SqliLab onComplete={onComplete} />;
    case 'web-xss':
      return <XssLab flag={XSS_FLAG} onComplete={onComplete} />;
    case 'web-idor':
      return <IdorLab flag={IDOR_FLAG} onComplete={onComplete} />;
  }
}
