# CRYPTO ESCAPE — Planejamento Completo
## Jogo de Cibersegurança: Do Zero ao Profissional

---

# PARTE 1: VISÃO E IDENTIDADE

## 1.1 Conceito Central
**"Aprenda a pensar como um hacker ético. Escape das salas. Conquiste sua carreira."**

Um jogo imersivo que combina:
- Escape room com enigmas criptográficos
- Editor de código integrado (Python)
- Narrativa de hacker do bem
- Progressão do tutorial ao nível profissional
- Design imersivo e cinematográfico

## 1.2 Diferenciais Inovadores
- **Código como arma**: Resolva com ferramentas OU escrevendo scripts
- **Narrativa episódica**: Cada fase = episódio de uma série
- **Sistema de reputação**: Suas escolhas afetam o enredo
- **Modo coop**: Duas pessoas resolvem juntas em tempo real
- **Certificado verificável**: NFT ou blockchain para prova de conclusão
- **Adaptativo**: IA ajusta dificuldade baseado no desempenho

---

# PARTE 2: DESIGN SYSTEM

## 2.1 Paleta de Cores — "Terminal Noir"

| Nome | Hex | Uso |
|------|-----|-----|
| **Void Black** | `#0a0a0f` | Background principal |
| **Deep Space** | `#12121a` | Cards, painéis |
| **Matrix Green** | `#00ff88` | Acentos, sucesso, código |
| **Cyber Cyan** | `#00d4ff` | Links, highlights, info |
| **Warning Amber** | `#ffb800` | Alertas, atenção |
| **Error Red** | `#ff3366` | Erros, perigo |
| **Ghost White** | `#e8e8ed` | Texto principal |
| **Muted Gray** | `#6b6b7b` | Texto secundário |

**Gradientes:**
- Hero: `linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)`
- Glow: `linear-gradient(90deg, #00ff88, #00d4ff)`
- Card hover: `linear-gradient(180deg, rgba(0,255,136,0.05), transparent)`

## 2.2 Tipografia

| Uso | Fonte | Fallback | Peso |
|-----|-------|----------|------|
| **Headings** | JetBrains Mono / Fira Code | monospace | 600-700 |
| **Body** | Inter / DM Sans | sans-serif | 400 |
| **Code** | JetBrains Mono | monospace | 400 |
| **Display** | Orbitron / Exo 2 | sans-serif | 700 |

**Hierarquia:** 48px → 32px → 24px → 18px → 14px → 12px

## 2.3 Estética Visual

### Elementos de UI
- **Bordas**: 1px sólido `rgba(0,255,136,0.2)` com glow em hover
- **Sombras**: `0 0 20px rgba(0,255,136,0.1)` — efeito de brilho sutil
- **Scrollbars**: Estilo terminal, verde neon
- **Cursor**: Linha piscando estilo terminal no editor

### Efeitos
- **Scanlines**: Overlay sutil (opacity 2%) para textura CRT
- **Noise**: Grão cinematográfico leve
- **Glitch**: Em transições de fase ou conquistas
- **Typing effect**: Textos de narrativa aparecem caractere por caractere
- **Matrix rain**: Background animado opcional (toggle)

### Ícones
- Estilo: Outline, 2px stroke
- Tema: Terminal, hexágonos, cadeados, chaves
- Biblioteca sugerida: Lucide Icons / Phosphor Icons

## 2.4 Componentes Visuais

```
┌─────────────────────────────────────────────────────────┐
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│  ▓  SALA 3.2 — Múltiplas Camadas              [—][□][×] ▓
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│  ┌─────────────────────────────────────────────────┐   │
│  │ > Mensagem interceptada: NDY0eDZ5NnA3cTh4OXo=   │   │
│  │ > Analise e decodifique para prosseguir.        │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─ EDITOR ───────────────────────────────────────┐   │
│  │ 1 │ import base64                               │   │
│  │ 2 │ # Sua solução aqui                          │   │
│  │ 3 │                                             │   │
│  └─────────────────────────────────────────────────┘   │
│  [▶ EXECUTAR]  [💡 DICA]  [📖 EXPLICAR]  [⏭ PULAR]     │
└─────────────────────────────────────────────────────────┘
```

---

# PARTE 3: ESTRUTURA COMPLETA DE FASES

## EPISÓDIO 0: O DESPERTAR (Tutorial)
*"Bem-vindo à Rede. Você tem o que precisa?"*

| # | Nome | Conteúdo | Tempo |
|---|------|----------|-------|
| 0.1 | Primeiro Contato | O que é criptografia, por que existe | 5 min |
| 0.2 | Alfabeto Digital | Letras = números (ASCII, conceito de encoding) | 8 min |
| 0.3 | Chave e Algoritmo | Conceitos fundamentais com animação | 10 min |
| 0.4 | Seu Primeiro Decode | César com chave dada — ferramenta guiada | 12 min |
| 0.5 | O Editor | Introdução ao editor de código, "Hello World" | 15 min |

**Checkpoint:** Badge "Iniciado"

---

## EPISÓDIO 1: CIFRAS CLÁSSICAS (Fundamentos I)
*"Os antigos já escondiam segredos. Aprenda seus métodos."*

| # | Nome | Conteúdo | Ferramenta | Código |
|---|------|----------|------------|--------|
| 1.1 | César — Conhecido | Decodificar com chave dada | Sim | Opcional |
| 1.2 | César — Força Bruta | Testar 26 possibilidades | Sim | Sim |
| 1.3 | César — Frequência PT | Análise de frequência em português | Parcial | Sim |
| 1.4 | César — Frequência EN | Mesmo conceito, inglês | Parcial | Sim |
| 1.5 | Substituição Simples | Cifra de substituição | Parcial | Sim |
| 1.6 | Vigenère — Chave Dada | Decodificar polialfabética | Sim | Opcional |
| 1.7 | Vigenère — Kasiski | Descobrir período da chave | — | Sim |
| 1.8 | Vigenère — Quebra Completa | Análise de frequência por posição | — | Sim |

**Checkpoint:** Badge "Criptógrafo Clássico"

---

## EPISÓDIO 2: ENCODING E CAMADAS (Fundamentos II)
*"Dados viajam disfarçados. Aprenda a reconhecê-los."*

| # | Nome | Conteúdo | Ferramenta | Código |
|---|------|----------|------------|--------|
| 2.1 | Base64 | Codificação binária em texto | Sim | Sim |
| 2.2 | Hexadecimal | Base 16, bytes visíveis | Sim | Sim |
| 2.3 | Binário | Bits e bytes | Sim | Sim |
| 2.4 | Camada Dupla | Base64 → Hex ou vice-versa | Parcial | Sim |
| 2.5 | Camada Tripla | Múltiplas codificações encadeadas | — | Sim |
| 2.6 | Reconhecimento | Identificar tipo de encoding | Quiz | — |
| 2.7 | URL Encoding | %20, caracteres especiais | Sim | Sim |
| 2.8 | ROT13 e Variantes | ROT47, ROT8000 | Sim | Sim |

**Checkpoint:** Badge "Decodificador"

---

## EPISÓDIO 3: HASH E INTEGRIDADE (Intermediário I)
*"Uma mudança, um resultado diferente. A matemática da verificação."*

| # | Nome | Conteúdo | Ferramenta | Código |
|---|------|----------|------------|--------|
| 3.1 | O que é Hash | Função unidirecional, fingerprint | Teoria | — |
| 3.2 | MD5 e SHA-1 | Calcular, comparar | Sim | Sim |
| 3.3 | SHA-256 | Padrão atual | Sim | Sim |
| 3.4 | Verificação de Arquivo | "Este arquivo foi alterado?" | Sim | Sim |
| 3.5 | Colisões | Por que MD5 é inseguro | Teoria | Demo |
| 3.6 | Salt e Pepper | Proteção de senhas | Teoria | Sim |
| 3.7 | Rainbow Tables | Conceito e defesa | Teoria | — |
| 3.8 | HMAC | Hash com chave | Teoria | Sim |

**Checkpoint:** Badge "Guardião da Integridade"

---

## EPISÓDIO 4: CRIPTOGRAFIA ASSIMÉTRICA (Intermediário II)
*"Duas chaves. Um segredo. A revolução da privacidade."*

| # | Nome | Conteúdo | Ferramenta | Código |
|---|------|----------|------------|--------|
| 4.1 | Pública e Privada | Conceito RSA simplificado | Animação | — |
| 4.2 | Cifrar com RSA | Usar chave pública | Sim | Sim |
| 4.3 | Decifrar com RSA | Usar chave privada | Sim | Sim |
| 4.4 | Assinaturas Digitais | Verificar autenticidade | Sim | Sim |
| 4.5 | Certificados | PKI, cadeia de confiança | Teoria | — |
| 4.6 | HTTPS | O que acontece na conexão | Animação | — |
| 4.7 | Man-in-the-Middle | Conceito e detecção | Cenário | — |
| 4.8 | Certificado Inválido | Reconhecer alertas | Quiz | — |

**Checkpoint:** Badge "Mestre das Chaves"

---

## EPISÓDIO 5: ESTEGANOGRAFIA (Intermediário III)
*"O segredo está na imagem. Ou no áudio. Ou em qualquer lugar."*

| # | Nome | Conteúdo | Ferramenta | Código |
|---|------|----------|------------|--------|
| 5.1 | Ocultar em Imagens | Conceito LSB | Teoria | — |
| 5.2 | LSB em PNG | Extrair mensagem de pixels | Sim | Sim |
| 5.3 | Metadados | EXIF, comentários | Sim | Sim |
| 5.4 | Áudio | Esteganografia em WAV | Sim | Sim |
| 5.5 | Combinação | Imagem + metadados + LSB | — | Sim |
| 5.6 | Detecção | Ferramentas de análise | Sim | — |
| 5.7 | Forense Básica | Reconstruir evidências | Cenário | Sim |
| 5.8 | Desafio Livre | Criar sua própria mensagem oculta | — | Sim |

**Checkpoint:** Badge "Caçador de Segredos"

---

## EPISÓDIO 6: SENHAS E AUTENTICAÇÃO (Avançado I)
*"A porta entre você e o atacante. Fortaleça-a."*

| # | Nome | Conteúdo | Ferramenta | Código |
|---|------|----------|------------|--------|
| 6.1 | Força Bruta | Tempo vs complexidade | Simulador | Sim |
| 6.2 | Dicionário | Ataques com wordlists | — | Sim |
| 6.3 | Hash de Senhas | bcrypt, Argon2 | Teoria | Sim |
| 6.4 | 2FA | TOTP, como funciona | Teoria | — |
| 6.5 | Política de Senha | O que torna uma senha forte | Quiz | — |
| 6.6 | Credential Stuffing | Conceito e defesa | Teoria | — |
| 6.7 | Simulador de Crack | Tempo para quebrar sua senha | Interativo | — |
| 6.8 | Auditoria | Avaliar políticas de uma empresa | Cenário | Sim |

**Checkpoint:** Badge "Guardião de Portas"

---

## EPISÓDIO 7: REDE E TRÁFEGO (Avançado II)
*"Os pacotes não mentem. Aprenda a lê-los."*

| # | Nome | Conteúdo | Ferramenta | Código |
|---|------|----------|------------|--------|
| 7.1 | Logs de Conexão | Ler e interpretar | Simulador | — |
| 7.2 | Anomalias | O que é comportamento estranho | Cenário | — |
| 7.3 | Tráfego Cifrado | O que vemos vs o que não vemos | Teoria | — |
| 7.4 | DNS e Vazamentos | Informação que escapa | Teoria | — |
| 7.5 | Certificado Inválido | Detectar MITM em logs | Cenário | Sim |
| 7.6 | Timeline de Ataque | Ordenar eventos | Puzzle | — |
| 7.7 | IOC — Indicadores | O que procurar em um comprometimento | Teoria | — |
| 7.8 | Correlação | Conectar os pontos | Cenário | Sim |

**Checkpoint:** Badge "Vigia da Rede"

---

## EPISÓDIO 8: MALWARE E FORENSE (Avançado III)
*"O código malicioso esconde-se. Desnude-o."*

| # | Nome | Conteúdo | Ferramenta | Código |
|---|------|----------|------------|--------|
| 8.1 | Strings em Binário | Encontrar texto em executável | Sim | Sim |
| 8.2 | Payload Ofuscado | Base64, Hex em malware | — | Sim |
| 8.3 | XOR | Ofuscação comum | — | Sim |
| 8.4 | Ransomware | Como a cifra funciona | Teoria | — |
| 8.5 | Timeline de Incidente | Reconstruir o ataque | Cenário | — |
| 8.6 | Artefatos | O que deixam para trás | Teoria | — |
| 8.7 | Análise Estática | Sem executar, o que dá para ver | Cenário | Sim |
| 8.8 | Relatório | Documentar achados | Template | — |

**Checkpoint:** Badge "Investigador Digital"

---

## EPISÓDIO 9: SIMULAÇÕES SOC (Profissional I)
*"O SOC ligou. Há um incidente. Você está pronto?"*

| # | Nome | Cenário | Habilidades |
|---|------|---------|-------------|
| 9.1 | Credenciais Vazadas | Dump de senhas em fórum | Análise, políticas |
| 9.2 | Phishing com Anexo | Arquivo malicioso em email | Esteganografia, análise |
| 9.3 | Tráfego Suspeito | Logs de firewall anômalos | Correlação, IOC |
| 9.4 | Ransomware na Rede | Propagação lateral | Timeline, contenção |
| 9.5 | Insider Threat | Comportamento de funcionário | Análise de logs |
| 9.6 | Relatório Executivo | Sintetizar tudo para C-level | Comunicação |

**Checkpoint:** Badge "Analista SOC"

---

## EPISÓDIO 10: PENTEST SIMULADO (Profissional II)
*"A empresa contratou você. Encontre as falhas antes do atacante."*

| # | Nome | Cenário | Habilidades |
|---|------|---------|-------------|
| 10.1 | Reconhecimento | Coletar informações públicas | OSINT básico |
| 10.2 | Senhas Fracas | Testar política da empresa | Cracking, auditoria |
| 10.3 | Criptografia Fraca | Sistema usando algoritmo antigo | Identificar, explorar |
| 10.4 | Certificado Mal Configurado | HTTPS com problema | Análise PKI |
| 10.5 | Relatório de Pentest | Documentar vulnerabilidades | Template profissional |

**Checkpoint:** Badge "Pentester Júnior"

---

## EPISÓDIO 11: CAPSTONE (Profissional III)
*"O desafio final. Tudo que você aprendeu em uma missão."*

| # | Nome | Descrição |
|---|------|-----------|
| 11.1 | Missão Integrada | Cenário complexo: phishing → esteganografia → credenciais → rede → relatório |
| 11.2 | Decisões | Escolhas que afetam o resultado |
| 11.3 | Certificado Final | Emissão do certificado verificável |

**Checkpoint:** Certificado "Crypto Escape — Cibersegurança Básica a Profissional"

---

# PARTE 4: CONTAGEM TOTAL

| Episódio | Salas | Tempo Est. | Badge |
|----------|-------|------------|-------|
| 0 | 5 | 50 min | Iniciado |
| 1 | 8 | 2-3 h | Criptógrafo Clássico |
| 2 | 8 | 2-3 h | Decodificador |
| 3 | 8 | 2-3 h | Guardião da Integridade |
| 4 | 8 | 2-3 h | Mestre das Chaves |
| 5 | 8 | 2-3 h | Caçador de Segredos |
| 6 | 8 | 2-3 h | Guardião de Portas |
| 7 | 8 | 2-3 h | Vigia da Rede |
| 8 | 8 | 2-3 h | Investigador Digital |
| 9 | 6 | 3-4 h | Analista SOC |
| 10 | 5 | 2-3 h | Pentester Júnior |
| 11 | 3 | 2-3 h | Certificado Final |
| **TOTAL** | **87 salas** | **~30-40 h** | **12 badges** |

---

# PARTE 5: ELEMENTOS INOVADORES

## 5.1 Narrativa Interativa
- **Personagem**: Alex, estagiário em cibersegurança
- **Mentor**: Maya, hacker ética sênior
- **Antagonista**: ShadowNet, grupo de black hats
- **Escolhas**: Respostas em diálogos afetam pequenos detalhes do enredo
- **Cutscenes**: Entre episódios, estilo série

## 5.2 Sistema de Dicas Adaptativo
- **Nível 1**: Explicação completa do conceito
- **Nível 2**: Dica sobre abordagem
- **Nível 3**: Pista direta
- **Nível 4**: Solução (com penalidade de pontos)
- IA analisa onde o jogador trava e sugere conteúdo de reforço

## 5.3 Modo Coop
- Duas pessoas na mesma sala
- Um pode codar, outro usar ferramentas
- Chat integrado (criptografado como easter egg)
- Progressão compartilhada

## 5.4 Sandbox de Código
- **Linguagens**: JavaScript e Python (escolha no próprio desafio)
- **JavaScript**: Execução no browser, captura de console.log, timeout 5s
- **Python**: Pyodide (WebAssembly), execução no browser, timeout 5s
- Bibliotecas Python permitidas: base64, hashlib, re, collections, itertools, string, math
- Output capturado e comparado com resposta esperada
- Múltiplas respostas válidas quando aplicável

## 5.5 Certificado Verificável
- Ao completar Episódio 11: certificado com nome, data, badges
- Hash do certificado em blockchain ou servidor público
- Link de verificação: cryptoescape.com/verify/[hash]
- Exportável para LinkedIn, PDF

## 5.6 Modo Replay
- Rejogar qualquer sala
- Modo "speedrun" (tempo cronometrado)
- Desafios extras em salas já completadas
- Leaderboard por sala (opcional)

---

# PARTE 6: STACK TECNOLÓGICA SUGERIDA

## Frontend
- **Framework**: React + TypeScript ou Next.js
- **Editor**: Monaco Editor (VS Code)
- **Python no browser**: Pyodide
- **Estilização**: Tailwind CSS + CSS variables (design tokens)
- **Animações**: Framer Motion
- **Estado**: Zustand ou Jotai

## Backend (se necessário)
- **Runtime**: Node.js ou Python (FastAPI)
- **Execução de código**: Docker sandbox ou Pyodide (client-side)
- **Auth**: NextAuth ou similar
- **DB**: PostgreSQL (progresso, usuários)

## Infra
- **Hosting**: Vercel (frontend) + Railway/Render (backend)
- **CDN**: Para assets estáticos

---

# PARTE 7: ROADMAP DE DESENVOLVIMENTO

## Fase 1: MVP (2-3 meses)
- [ ] Design system implementado
- [ ] Episódio 0 completo (tutorial)
- [ ] Episódio 1 completo (César, Vigenère)
- [ ] Editor de código funcional (Pyodide)
- [ ] Sistema de progressão básico
- [ ] 15-20 salas jogáveis

## Fase 2: Conteúdo (2-3 meses)
- [ ] Episódios 2, 3, 4, 5
- [ ] Todas as ferramentas implementadas
- [ ] Sistema de dicas
- [ ] Narrativa Episódios 0-5
- [ ] 50+ salas

## Fase 3: Avançado (2-3 meses)
- [ ] Episódios 6, 7, 8
- [ ] Cenários complexos
- [ ] Modo coop (se viável)
- [ ] Certificado básico

## Fase 4: Profissional (2 meses)
- [ ] Episódios 9, 10, 11
- [ ] Simulações SOC e Pentest
- [ ] Certificado verificável
- [ ] Polish e QA

## Fase 5: Lançamento (1 mês)
- [ ] Beta com usuários
- [ ] Ajustes
- [ ] Lançamento público
- [ ] Marketing (comunidades de segurança, educação)

**Total estimado: 9-12 meses** para versão completa

---

# PARTE 8: CHECKLIST DE QUALIDADE

## Design
- [ ] Paleta consistente em todas as telas
- [ ] Tipografia hierárquica clara
- [ ] Animações suaves (60fps)
- [ ] Responsivo (desktop prioritário, tablet funcional)
- [ ] Acessibilidade: contraste, fontes, navegação por teclado

## Conteúdo
- [ ] Cada sala tem explicação para iniciantes
- [ ] Textos revisados (português correto)
- [ ] Exemplos claros em cada conceito
- [ ] Nenhuma sala "quebra" sem explicação prévia

## Código
- [ ] Sandbox seguro (sem escape)
- [ ] Múltiplas soluções aceitas quando possível
- [ ] Feedback claro em erros de execução
- [ ] Timeout e limites funcionando

## Experiência
- [ ] Progressão salva (localStorage ou conta)
- [ ] Tutorial pode ser pulado (para quem já sabe)
- [ ] Modo escuro (padrão) + modo claro (opcional)
- [ ] Som opcional (teclas, conquistas)

---

*Documento criado para o projeto Crypto Escape. Versão 1.0.*
