# CRYPTO ESCAPE — Passo a Passo de Implementação

Guia prático para construir o jogo na ordem correta.

---

## PRÉ-REQUISITOS

- [ ] Node.js 18+ instalado
- [ ] Git instalado
- [ ] Conta GitHub (para versionamento)
- [ ] Editor: VS Code recomendado

---

## ETAPA 1: FUNDAÇÃO (Semana 1-2)

### 1.1 Inicializar projeto
```bash
npx create-next-app@latest crypto-escape --typescript --tailwind --eslint
cd crypto-escape
```

### 1.2 Instalar dependências
```bash
npm install @monaco-editor/react pyodide zustand framer-motion lucide-react
npm install -D @types/node
```

### 1.3 Estrutura de pastas
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx            # Home
│   ├── game/
│   │   └── [episode]/[room]/page.tsx
│   └── globals.css
├── components/
│   ├── ui/                 # Botões, cards, inputs
│   ├── game/               # Sala, editor, ferramentas
│   ├── layout/             # Header, sidebar, footer
│   └── effects/            # Scanlines, glow, etc.
├── lib/
│   ├── crypto/             # César, Vigenère, Base64...
│   ├── sandbox/            # Execução Python (Pyodide)
│   └── validation/         # Verificação de respostas
├── store/                  # Estado global (Zustand)
├── data/                   # Conteúdo das salas (JSON)
└── types/                  # TypeScript interfaces
```

### 1.4 Design tokens (globals.css)
```css
:root {
  --void-black: #0a0a0f;
  --deep-space: #12121a;
  --matrix-green: #00ff88;
  --cyber-cyan: #00d4ff;
  --warning-amber: #ffb800;
  --error-red: #ff3366;
  --ghost-white: #e8e8ed;
  --muted-gray: #6b6b7b;
}
```

---

## ETAPA 2: DESIGN SYSTEM (Semana 2-3)

### 2.1 Componentes base
- [ ] `Button` — primário, secundário, ghost
- [ ] `Card` — com borda glow
- [ ] `Input` — estilo terminal
- [ ] `Modal` — para dicas e explicações
- [ ] `Badge` — para conquistas

### 2.2 Layout principal
- [ ] `GameLayout` — sidebar + área de conteúdo
- [ ] `Sidebar` — episódios, progresso, badges
- [ ] `Header` — logo, menu, perfil

### 2.3 Efeitos visuais
- [ ] Overlay de scanlines (opacity 2%)
- [ ] Glow em hover nos cards
- [ ] Typing effect para narrativa
- [ ] Transições suaves (Framer Motion)

---

## ETAPA 3: EDITOR DE CÓDIGO (Semana 3-4)

### 3.1 Integrar Monaco Editor
- [ ] Componente `CodeEditor` com syntax highlight Python
- [ ] Tema escuro customizado (cores do design system)
- [ ] Linha de números, minimap opcional

### 3.2 Integrar Pyodide
- [ ] Carregar Pyodide (lazy load)
- [ ] Executar código com timeout 5s
- [ ] Capturar stdout/stderr
- [ ] Sandbox: bloquear os, subprocess, socket, etc.

### 3.3 Validação de código
- [ ] Comparar output com resposta esperada
- [ ] Suporte a múltiplas respostas válidas
- [ ] Feedback visual: ✓ correto / ✗ incorreto

---

## ETAPA 4: FERRAMENTAS CRIPTOGRÁFICAS (Semana 4-5)

### 4.1 Implementar em lib/crypto/
- [ ] `caesar.ts` — encode/decode César
- [ ] `vigenere.ts` — encode/decode Vigenère
- [ ] `base64.ts` — encode/decode Base64
- [ ] `hex.ts` — encode/decode Hex
- [ ] `hash.ts` — MD5, SHA-1, SHA-256
- [ ] `frequency.ts` — análise de frequência

### 4.2 Componentes de ferramentas
- [ ] `CaesarTool` — input, chave, botão decodificar
- [ ] `Base64Tool` — input, botão encode/decode
- [ ] `HashTool` — input, seleção de algoritmo
- [ ] `FrequencyChart` — gráfico de barras

---

## ETAPA 5: SISTEMA DE SALAS (Semana 5-6)

### 5.1 Estrutura de dados (data/rooms/)
```json
{
  "episode": 0,
  "room": "0.1",
  "title": "Primeiro Contato",
  "content": "...",
  "type": "theory|practice|code|quiz",
  "tools": ["caesar"],
  "codeRequired": false,
  "expectedOutput": null,
  "hints": ["...", "..."]
}
```

### 5.2 Componente Room
- [ ] Renderizar conteúdo (Markdown ou HTML)
- [ ] Mostrar ferramentas conforme tipo da sala
- [ ] Mostrar editor quando codeRequired
- [ ] Botões: Executar, Dica, Próxima

### 5.3 Navegação
- [ ] Bloquear salas não desbloqueadas
- [ ] Salvar progresso (localStorage ou API)
- [ ] Indicador visual de conclusão

---

## ETAPA 6: EPISÓDIO 0 — TUTORIAL (Semana 6-7)

### 6.1 Salas 0.1 a 0.5
- [ ] 0.1: Tela de teoria + quiz
- [ ] 0.2: Animação ASCII interativa
- [ ] 0.3: Animação chave/algoritmo
- [ ] 0.4: CaesarTool com chave dada
- [ ] 0.5: CodeEditor com "print('Hello')" → validar output

### 6.2 Conteúdo escrito
- [ ] Textos de cada sala revisados
- [ ] Imagens/ilustrações (se necessário)
- [ ] Narração (opcional)

---

## ETAPA 7: EPISÓDIO 1 — CIFRAS CLÁSSICAS (Semana 7-9)

### 7.1 Salas 1.1 a 1.8
- [ ] Criar dados de cada sala
- [ ] Implementar validação específica
- [ ] Dicas progressivas
- [ ] Badge "Criptógrafo Clássico" ao completar

### 7.2 Desafios de código
- [ ] 1.2: Força bruta César
- [ ] 1.3 e 1.4: Análise de frequência
- [ ] 1.7: Kasiski
- [ ] 1.8: Quebra completa Vigenère

---

## ETAPA 8: EPISÓDIOS 2-5 (Semana 9-14)

### Ordem sugerida
1. **Episódio 2** — Encoding (Base64, Hex, camadas)
2. **Episódio 3** — Hash e integridade
3. **Episódio 4** — RSA e certificados (simplificado)
4. **Episódio 5** — Esteganografia (LSB, metadados)

### Para cada episódio
- [ ] Ferramentas necessárias
- [ ] Dados das salas
- [ ] Validações
- [ ] Badge

---

## ETAPA 9: NARRATIVA E POLISH (Semana 14-16)

### 9.1 Cutscenes entre episódios
- [ ] Componente Cutscene (imagens + texto)
- [ ] Transições estilo série
- [ ] Personagens: Alex, Maya

### 9.2 Sistema de dicas
- [ ] 4 níveis de dica
- [ ] Penalidade opcional (pontos)
- [ ] Botão "Explicar conceito"

### 9.3 Sons e feedback
- [ ] Som de tecla (opcional)
- [ ] Som de conquista
- [ ] Animação ao completar sala

---

## ETAPA 10: EPISÓDIOS 6-11 (Semana 16-24)

### Prioridade
1. Episódios 6, 7, 8 (Avançado)
2. Episódios 9, 10 (Profissional)
3. Episódio 11 (Capstone)
4. Certificado verificável

---

## ETAPA 11: LANÇAMENTO (Semana 24-26)

### 11.1 Testes
- [ ] Testar todas as salas
- [ ] Testar em diferentes navegadores
- [ ] Testar responsividade
- [ ] Beta com 5-10 usuários

### 11.2 Deploy
- [ ] Vercel (frontend)
- [ ] Backend se necessário (Railway/Render)
- [ ] Domínio
- [ ] HTTPS

### 11.3 Divulgação
- [ ] LinkedIn
- [ ] Comunidades de cybersecurity (Reddit, Discord)
- [ ] GitHub (código aberto ou não)

---

## CHECKLIST RÁPIDO POR SEMANA

| Semana | Foco | Entregável |
|--------|------|------------|
| 1-2 | Fundação | Projeto rodando, estrutura |
| 2-3 | Design | Componentes, layout |
| 3-4 | Editor | Código executa, valida |
| 4-5 | Ferramentas | César, Base64, Hash |
| 5-6 | Salas | Sistema genérico |
| 6-7 | Ep 0 | Tutorial completo |
| 7-9 | Ep 1 | 8 salas César/Vigenère |
| 9-14 | Ep 2-5 | 32 salas |
| 14-16 | Polish | Narrativa, dicas |
| 16-24 | Ep 6-11 | Restante |
| 24-26 | Launch | Online |

---

*Use este documento como checklist. Marque cada item ao completar.*
