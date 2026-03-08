import { episode0Challenges } from './episode-0';
import { conditionsChallenges } from './ep1-conditions';
import { loopsChallenges } from './ep2-loops';
import { arraysChallenges } from './ep3-arrays';
import { stringsChallenges } from './ep4-strings';
import { functionsChallenges } from './ep5-functions';
import { objectsChallenges } from './ep6-objects';
import { stringMethodsChallenges } from './ep7-string-methods';
import { episode1Challenges } from './episode-1';
import { episode2Challenges } from './episode-2';
import { episode3Challenges } from './episode-3';
import { episode4Challenges } from './episode-4';
import { episode5Challenges } from './episode-5';
import { episode6Challenges } from './episode-6';
import { episode7Challenges } from './episode-7';
import { episode8Challenges } from './episode-8';
import { episode9Challenges } from './episode-9';
import { episode10Challenges } from './episode-10';
import { episode11Challenges } from './episode-11';
import { episode12Challenges } from './episode-12';
import { logicOperatorsChallenges } from './ep20-logic-operators';
import { whileLoopsChallenges } from './ep21-while-loops';
import { searchAlgorithmsChallenges } from './ep22-search-algorithms';
import { sortingChallenges } from './ep23-sorting';
import { csrfChallenges } from './ep24-csrf';
import { commandInjectionChallenges } from './ep25-command-injection';
import { directoryTraversalChallenges } from './ep26-directory-traversal';
import { validationChallenges } from './ep27-validation';
import { securityHeadersChallenges } from './ep28-security-headers';
import { xorBinaryChallenges } from './ep29-xor-binary';
import { symmetricCryptoChallenges } from './ep30-symmetric-crypto';
import { asymmetricCryptoChallenges } from './ep31-asymmetric-crypto';
import { advancedHashingChallenges } from './ep32-advanced-hashing';
import { firewallRulesChallenges } from './ep33-firewall-rules';
import { idsIpsChallenges } from './ep34-ids-ips';
import { incidentResponseChallenges } from './ep35-incident-response';
import { hardeningChallenges } from './ep36-hardening';
import { googleDorksChallenges } from './ep37-google-dorks';
import { metadataAnalysisChallenges } from './ep38-metadata-analysis';
import { socialEngineeringChallenges } from './ep39-social-engineering';
import { regexChallenges } from './ep40-regex';
import { scannerChallenges } from './ep41-scanner';
import { automationChallenges } from './ep42-automation';
import { reportChallenges } from './ep43-report';
import { pentestFinalChallenges } from './ep44-pentest-final';
import { certificationChallenges } from './ep45-certification';
import type { Challenge } from '@/types/challenge';

export const challengesByEpisode: Record<number, Challenge[]> = {
  // Módulo 1: Programação
  0: episode0Challenges,
  1: conditionsChallenges,
  2: loopsChallenges,
  3: arraysChallenges,
  4: stringsChallenges,
  5: functionsChallenges,
  6: objectsChallenges,
  7: stringMethodsChallenges,
  // Módulo 2: Cibersegurança
  8: episode1Challenges,
  9: episode2Challenges,
  10: episode3Challenges,
  11: episode4Challenges,
  12: episode5Challenges,
  13: episode6Challenges,
  14: episode7Challenges,
  15: episode8Challenges,
  16: episode9Challenges,
  17: episode10Challenges,
  18: episode11Challenges,
  19: episode12Challenges,
  // Módulo 3: Lógica e Algoritmos
  20: logicOperatorsChallenges,
  21: whileLoopsChallenges,
  22: searchAlgorithmsChallenges,
  23: sortingChallenges,
  // Módulo 4: Segurança Web Avançada
  24: csrfChallenges,
  25: commandInjectionChallenges,
  26: directoryTraversalChallenges,
  27: validationChallenges,
  28: securityHeadersChallenges,
  // Módulo 5: Criptografia Moderna
  29: xorBinaryChallenges,
  30: symmetricCryptoChallenges,
  31: asymmetricCryptoChallenges,
  32: advancedHashingChallenges,
  // Módulo 6: Blue Team
  33: firewallRulesChallenges,
  34: idsIpsChallenges,
  35: incidentResponseChallenges,
  36: hardeningChallenges,
  // Módulo 7: OSINT
  37: googleDorksChallenges,
  38: metadataAnalysisChallenges,
  39: socialEngineeringChallenges,
  // Módulo 8: Regex e Automação
  40: regexChallenges,
  41: scannerChallenges,
  42: automationChallenges,
  43: reportChallenges,
  // Módulo 9: Missão Final
  44: pentestFinalChallenges,
  45: certificationChallenges,
};

export function getChallenge(episode: number, room: string): Challenge | undefined {
  const episodeChallenges = challengesByEpisode[episode];
  if (!episodeChallenges) return undefined;
  return episodeChallenges.find((c) => c.room === room);
}

export function getNextChallenge(episode: number, room: string): { episode: number; room: string } | null {
  const episodeChallenges = challengesByEpisode[episode];
  if (!episodeChallenges) return null;

  const currentIndex = episodeChallenges.findIndex((c) => c.room === room);
  if (currentIndex === -1) return null;

  if (currentIndex < episodeChallenges.length - 1) {
    const next = episodeChallenges[currentIndex + 1];
    return { episode, room: next.room };
  }

  const nextEpisode = challengesByEpisode[episode + 1];
  if (nextEpisode?.length) {
    return { episode: episode + 1, room: nextEpisode[0].room };
  }

  return null;
}
