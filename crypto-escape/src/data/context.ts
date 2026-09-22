/**
 * Conteúdo das abas "Mundo Real" e "Ferramentas" por episódio.
 * As chaves são os números de episódio de challengesByEpisode (não os nomes dos arquivos).
 * Mantenha os fatos verificáveis: só cite incidentes, ferramentas e leis que existem.
 */

type Context = { realWorld: string; tools: string };

const PROGRAMMING: Context = {
  realWorld: `**Onde isso aparece no trabalho:**

• Todo desenvolvedor usa condições, loops, listas e funções todos os dias
• Analistas de segurança escrevem pequenos scripts para automatizar tarefas repetitivas
• Testes automatizados usam exatamente esse formato: chamar uma função com entradas e conferir a saída

**Hábito de profissional:**
Pense nos casos de borda (zero, vazio, limites, maiúsculas) antes de dizer que algo está pronto.`,
  tools: `**Ferramentas para praticar e crescer:**

• **VS Code:** editor gratuito, o mais usado por desenvolvedores
• **Git e GitHub:** guardar o histórico do código e montar seu portfólio
• **Node.js e Python:** rodar JavaScript e Python no seu computador
• **MDN Web Docs e docs.python.org:** documentação oficial, a melhor fonte de consulta`,
};

const CRYPTO: Context = {
  realWorld: `**Onde isso aparece:**

• Senhas nunca devem ser guardadas em texto puro: guarda-se um hash
• HTTPS, mensagens de aplicativos e VPNs dependem de criptografia moderna
• Cifras antigas, como a de César, são fáceis de quebrar e servem para entender os conceitos

**Regra de ouro:** nunca invente sua própria criptografia em produção. Use bibliotecas e algoritmos consagrados.`,
  tools: `**Ferramentas:**

• **CyberChef:** "canivete suíço" para codificar, decodificar e analisar dados
• **hashcat e John the Ripper:** testam senhas contra hashes (só em ambientes autorizados)
• **OpenSSL:** gerar chaves e testar criptografia no terminal
• **jwt.io:** inspecionar tokens JWT`,
};

const XSS: Context = {
  realWorld: `**Casos reais de XSS:**

• **2005 - Samy (MySpace):** um worm de XSS armazenado se espalhou por mais de um milhão de perfis em cerca de 20 horas
• XSS aparece há anos na lista OWASP Top 10, hoje dentro da categoria "Injection"

**Como empresas se protegem:**
• Escapar a saída (transformar < em &lt;)
• Content Security Policy (CSP)
• Cookies de sessão com HttpOnly`,
  tools: `**Ferramentas para testar XSS (em ambientes autorizados):**

• **Burp Suite:** proxy que intercepta e modifica requisições
• **OWASP ZAP:** scanner gratuito de segurança web
• **BeEF:** framework de exploração pelo navegador

**Exemplos de payloads usados em testes (só para estudo):**
\`\`\`
<script>alert(document.cookie)</script>
<img src=x onerror=alert(1)>
<svg onload=alert(1)>
\`\`\``,
};

const SQLI: Context = {
  realWorld: `**Casos reais de SQL Injection:**

• **2008 - Heartland Payment Systems:** invasão ligada a SQL Injection que, segundo os relatos da época, expôs mais de 100 milhões de cartões
• **2015 - TalkTalk (Reino Unido):** SQL Injection em um site levou a vazamento de dados e multa de 400 mil libras pela autoridade de proteção de dados

**Como empresas se protegem:**
• Consultas parametrizadas (prepared statements)
• Menor privilégio no usuário do banco
• Firewall de aplicação web (WAF) como camada extra`,
  tools: `**Ferramentas (em ambientes autorizados):**

• **sqlmap:** automatiza a detecção e a exploração de SQL Injection
• **Burp Suite:** testes manuais de requisições
• **OWASP Juice Shop e DVWA:** aplicações vulneráveis feitas para treinar legalmente

**Exemplo de uso do sqlmap (apenas em alvo autorizado):**
\`\`\`
sqlmap -u "http://alvo-autorizado/pagina?id=1" --dbs
\`\`\``,
};

const WEB: Context = {
  realWorld: `**Onde isso aparece:**

• Falhas web estão no OWASP Top 10, a referência mais usada do setor
• Programas de bug bounty (como HackerOne e Bugcrowd) pagam por falhas encontradas dentro das regras
• Em desenvolvimento, validar entradas e checar permissões no servidor evita a maioria delas

**Regra de ouro:** nunca confie em dados que vêm do cliente.`,
  tools: `**Ferramentas:**

• **Burp Suite Community:** proxy HTTP para interceptar e testar
• **OWASP ZAP:** scanner gratuito
• **Postman:** testar APIs
• **DevTools do navegador (F12):** ver requisições, cookies e o DOM`,
};

const BLUE: Context = {
  realWorld: `**Dia a dia de um analista de SOC:**

• Monitorar alertas e investigar incidentes
• Criar e ajustar regras de detecção
• Registrar o que aconteceu e recomendar correções

**Modelos de referência:** o ciclo de resposta a incidentes do NIST (preparação, detecção, contenção, erradicação, recuperação e lições aprendidas).`,
  tools: `**Ferramentas:**

• **Wireshark e tcpdump:** análise e captura de tráfego de rede
• **Zeek e Suricata:** monitoramento e detecção de intrusão
• **Splunk e Elastic (ELK):** análise de logs em escala (SIEM)
• **Nmap:** descobrir portas e serviços abertos

**Filtros úteis no Wireshark:**
\`\`\`
http.request.method == "POST"
tcp.port == 443
ip.addr == 192.168.1.1
\`\`\``,
};

const OSINT: Context = {
  realWorld: `**Onde isso aparece:**

• Pentesters e times de segurança começam pelo levantamento de informações públicas (OSINT)
• Engenharia social (como o phishing) explora pessoas, não sistemas: é uma das formas mais comuns de invasão
• Metadados de arquivos e fotos podem revelar autor, software e até localização

**Defesa:** treinamento de pessoas, autenticação em dois fatores e cuidado com o que é publicado.`,
  tools: `**Ferramentas:**

• **Google (operadores avançados):** buscas refinadas, os chamados dorks
• **ExifTool:** ler metadados de arquivos
• **Maltego e theHarvester:** levantamento de informações de fontes públicas
• **Have I Been Pwned:** conferir se um e-mail apareceu em vazamentos`,
};

const AUTOMATION: Context = {
  realWorld: `**Onde isso aparece:**

• Expressões regulares (regex) filtram logs, validam dados e detectam padrões
• Scripts automatizam varreduras, relatórios e verificações de conformidade
• Um bom relatório de segurança é tão importante quanto a descoberta em si`,
  tools: `**Ferramentas:**

• **regex101.com:** testar e entender expressões regulares
• **Nmap:** varredura de portas e serviços
• **Python e Bash:** as linguagens mais usadas para automação
• **Markdown e modelos de relatório:** documentar achados de forma clara`,
};

const FINAL: Context = {
  realWorld: `**O fluxo de um pentest:**

• Escopo e autorização por escrito
• Reconhecimento, análise de vulnerabilidades e exploração controlada
• Relatório com evidências, risco e como corrigir

**Carreira:** pentester, analista de SOC, engenheiro de segurança e desenvolvedor com foco em segurança são caminhos comuns. Certificações de entrada, como CompTIA Security+ e eJPT, ajudam a estruturar o estudo.`,
  tools: `**Para continuar treinando de forma legal:**

• **TryHackMe e Hack The Box:** laboratórios guiados
• **PortSwigger Web Security Academy:** falhas web, gratuito
• **OWASP Juice Shop:** aplicação vulnerável para rodar no seu computador
• **CTFs:** campeonatos de segurança (Capture The Flag)`,
};

const LABS: Context = {
  realWorld: `**Onde os laboratórios aparecem no mundo real:**

• CTFs usam flags como estas para medir habilidades
• Plataformas como TryHackMe e Hack The Box usam o mesmo formato
• Empresas contratam pentesters para testar seus sistemas com autorização

**Lembrete:** pratique só em ambientes que você tem permissão para testar.`,
  tools: `**Ferramentas reais equivalentes:**

• **Terminal Linux:** ls, cat, grep, find, ssh
• **Nmap:** descobrir portas abertas
• **Burp Suite e o DevTools:** analisar e alterar requisições web
• **OWASP Juice Shop e DVWA:** sites vulneráveis para treinar legalmente`,
};

const TERMINAL: Context = {
  realWorld: `**Onde o terminal aparece no trabalho:**

• Servidores e nuvem quase sempre são administrados pelo terminal, sem interface gráfica
• Desenvolvedores usam o terminal para rodar programas, testes e Git
• Analistas de segurança investigam incidentes lendo logs com \`grep\`, \`sort\` e \`uniq\`
• Pentesters usam o terminal para ferramentas como nmap e ssh

**Hábito de profissional:** conferir com \`ls\` e \`pwd\` antes de mexer, e nunca copiar um comando com \`rm -r\` sem entender o que ele faz.`,
  tools: `**Onde praticar no seu computador:**

• **Windows:** WSL (Ubuntu dentro do Windows) e o Windows Terminal
• **macOS:** o app Terminal (ou o iTerm2)
• **Linux:** o terminal da sua distribuição
• **VS Code:** tem um terminal integrado no próprio editor
• **explainshell.com:** você cola um comando e ele explica cada parte`,
};

const SPECIFIC: Record<number, Context> = {
  47: TERMINAL,
  48: TERMINAL,
  49: TERMINAL,
  50: TERMINAL,
  51: TERMINAL,
  52: TERMINAL,
  53: TERMINAL,
  54: TERMINAL,
  55: TERMINAL,
  11: XSS,
  12: SQLI,
  46: LABS,
};

function categoryOf(episode: number): Context {
  if ((episode >= 0 && episode <= 7) || (episode >= 20 && episode <= 23)) return PROGRAMMING;
  if ([8, 9, 10, 14].includes(episode) || (episode >= 29 && episode <= 32)) return CRYPTO;
  if ([11, 12, 15, 16].includes(episode) || (episode >= 24 && episode <= 28)) return WEB;
  if ([13, 18, 19].includes(episode) || (episode >= 33 && episode <= 36)) return BLUE;
  if (episode === 17 || (episode >= 37 && episode <= 39)) return OSINT;
  if (episode >= 40 && episode <= 43) return AUTOMATION;
  if (episode === 44 || episode === 45) return FINAL;
  return PROGRAMMING;
}

export function getContext(episode: number | undefined): Context {
  if (episode === undefined) return PROGRAMMING;
  return SPECIFIC[episode] ?? categoryOf(episode);
}
