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
    case 'term-ps-kill':
    case 'term-contain':
    case 'term-twohop':
    case 'term-two-threats':
    case 'term-net-ping':
    case 'term-net-dns':
    case 'term-net-http':
    case 'term-ad-enum':
    case 'term-ad-escalate':
    case 'term-web-gobuster':
    case 'term-web-sqlmap':
    case 'term-web-pentest':
    case 'term-siem-correlate':
    case 'term-siem-timeline':
    case 'term-malware-triage':
    case 'term-malware-hunt':
    case 'term-cloud-bucket':
    case 'term-cloud-hunt':
    case 'term-firewall-contain':
    case 'term-firewall-live':
      return <TerminalLab scenario={SCENARIOS[challenge.labId]} onComplete={onComplete} />;
    case 'web-sqli':
      return <SqliLab onComplete={onComplete} />;
    case 'web-xss':
      return <XssLab flag={XSS_FLAG} onComplete={onComplete} />;
    case 'web-idor':
      return <IdorLab flag={IDOR_FLAG} onComplete={onComplete} />;
  }
}
