import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0: TheoryChallenge = {
  id: 'meta.0', type: 'theory', episode: 38, room: '38.0',
  title: 'Episódio 38 — Análise de Metadados',
  description: 'Metadados são dados sobre dados. Fotos, PDFs e documentos carregam informações ocultas que revelam muito sobre quem os criou.',
  content: `
**O que são Metadados?**
Informações embutidas em arquivos que o usuário não vê diretamente.

**Exemplos de metadados:**
• **Fotos (EXIF):** GPS, modelo da câmera, data/hora, software
• **PDFs:** autor, software usado, data de criação/modificação
• **Documentos:** autor, empresa, revisões, comentários ocultos
• **Emails:** cabeçalhos, IP de origem, rota dos servidores

**Por que importa para segurança?**
• Fotos no Instagram podem revelar sua localização exata
• PDFs corporativos vazam nomes de funcionários e software
• Emails revelam infraestrutura interna da empresa

**Ferramentas reais:**
• ExifTool — extrai metadados de qualquer arquivo
• FOCA — extrai metadados em massa de sites
• Metagoofil — coleta metadados via Google
  `,
};

const code1: CodeChallenge = {
  id: 'meta.1', type: 'code', episode: 38, room: '38.1',
  title: 'Extrator de metadados EXIF',
  description: 'Simule a extração de metadados EXIF de fotos para investigação. **Execute**!',
  instructions: 'Extraia e imprima metadados EXIF de cada foto, destacando GPS exposto.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const fotos = [
  {
    nome: "foto_ferias.jpg",
    exif: { camera: "iPhone 15", gps: "-23.5505,-46.6333", data: "2024-01-15", software: "iOS 17" }
  },
  {
    nome: "documento_secreto.png",
    exif: { camera: "Screenshot", gps: null, data: "2024-03-01", software: "Windows Snipping Tool" }
  },
  {
    nome: "selfie_empresa.jpg",
    exif: { camera: "Samsung S24", gps: "-22.9068,-43.1729", data: "2024-02-20", software: "OneUI 6" }
  }
];

// Imprima "=== ANALISE DE METADADOS ==="
// Para cada foto: "\\nArquivo: NOME", "  Camera: X", "  Data: X", "  Software: X"
// Se GPS existe: "  GPS: COORDS [LOCALIZACAO EXPOSTA!]"
// Se nao: "  GPS: sem dados"
`,
    python: `fotos = [
    {
        "nome": "foto_ferias.jpg",
        "exif": {"camera": "iPhone 15", "gps": "-23.5505,-46.6333", "data": "2024-01-15", "software": "iOS 17"}
    },
    {
        "nome": "documento_secreto.png",
        "exif": {"camera": "Screenshot", "gps": None, "data": "2024-03-01", "software": "Windows Snipping Tool"}
    },
    {
        "nome": "selfie_empresa.jpg",
        "exif": {"camera": "Samsung S24", "gps": "-22.9068,-43.1729", "data": "2024-02-20", "software": "OneUI 6"}
    }
]

# Imprima "=== ANALISE DE METADADOS ==="
# Para cada foto: "\\nArquivo: NOME", "  Camera: X", "  Data: X", "  Software: X"
# Se GPS existe: "  GPS: COORDS [LOCALIZACAO EXPOSTA!]"
# Se nao: "  GPS: sem dados"
`,
  },
  expectedOutput: '=== ANALISE DE METADADOS ===\n\nArquivo: foto_ferias.jpg\n  Camera: iPhone 15\n  Data: 2024-01-15\n  Software: iOS 17\n  GPS: -23.5505,-46.6333 [LOCALIZACAO EXPOSTA!]\n\nArquivo: documento_secreto.png\n  Camera: Screenshot\n  Data: 2024-03-01\n  Software: Windows Snipping Tool\n  GPS: sem dados\n\nArquivo: selfie_empresa.jpg\n  Camera: Samsung S24\n  Data: 2024-02-20\n  Software: OneUI 6\n  GPS: -22.9068,-43.1729 [LOCALIZACAO EXPOSTA!]',
  hints: ['Fotos com GPS revelam a localização exata onde foram tiradas.'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'meta.2', type: 'code', episode: 38, room: '38.2',
  title: 'Perfilamento por metadados',
  description: 'Analise metadados de documentos de uma empresa para montar um perfil de infraestrutura. **Execute**!',
  instructions: 'Analise metadados de documentos e monte um perfil da infraestrutura da empresa.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const documentos = [
  { nome: "relatorio.pdf", autor: "joao.silva", software: "Microsoft Word 2019", so: "Windows 10" },
  { nome: "planilha.xlsx", autor: "maria.santos", software: "LibreOffice 7.5", so: "Ubuntu 22.04" },
  { nome: "apresentacao.pptx", autor: "joao.silva", software: "Microsoft PowerPoint 2019", so: "Windows 10" },
  { nome: "contrato.pdf", autor: "ana.costa", software: "Adobe Acrobat DC", so: "macOS Ventura" },
  { nome: "orcamento.xlsx", autor: "maria.santos", software: "LibreOffice 7.5", so: "Ubuntu 22.04" }
];

// Conte documentos por autor, software e SO
// Imprima "=== PERFIL DA EMPRESA ==="
// "\\nFuncionarios encontrados:" com "  AUTOR (N docs)"
// "\\nSoftwares usados:" com "  SOFTWARE"
// "\\nSistemas operacionais:" com "  SO (N maquinas)"
`,
    python: `documentos = [
    {"nome": "relatorio.pdf", "autor": "joao.silva", "software": "Microsoft Word 2019", "so": "Windows 10"},
    {"nome": "planilha.xlsx", "autor": "maria.santos", "software": "LibreOffice 7.5", "so": "Ubuntu 22.04"},
    {"nome": "apresentacao.pptx", "autor": "joao.silva", "software": "Microsoft PowerPoint 2019", "so": "Windows 10"},
    {"nome": "contrato.pdf", "autor": "ana.costa", "software": "Adobe Acrobat DC", "so": "macOS Ventura"},
    {"nome": "orcamento.xlsx", "autor": "maria.santos", "software": "LibreOffice 7.5", "so": "Ubuntu 22.04"}
]

# Conte documentos por autor, software e SO
# Imprima "=== PERFIL DA EMPRESA ==="
# "\\nFuncionarios encontrados:" com "  AUTOR (N docs)"
# "\\nSoftwares usados:" com "  SOFTWARE"
# "\\nSistemas operacionais:" com "  SO (N maquinas)"
`,
  },
  expectedOutput: '=== PERFIL DA EMPRESA ===\n\nFuncionarios encontrados:\n  joao.silva (2 docs)\n  maria.santos (2 docs)\n  ana.costa (1 docs)\n\nSoftwares usados:\n  Microsoft Word 2019\n  LibreOffice 7.5\n  Microsoft PowerPoint 2019\n  Adobe Acrobat DC\n\nSistemas operacionais:\n  Windows 10 (2 maquinas)\n  Ubuntu 22.04 (2 maquinas)\n  macOS Ventura (1 maquinas)',
  hints: ['Metadados de documentos públicos revelam nomes, software e sistemas internos.'],
  difficulty: 'medium',
};

const theory3: TheoryChallenge = {
  id: 'meta.3', type: 'theory', episode: 38, room: '38.3',
  title: 'Metadados — Resumo',
  description: 'Metadados são uma mina de ouro para investigação e um risco enorme para privacidade.',
  content: `
**O que você aprendeu:**
• EXIF em fotos: câmera, GPS, data, software
• Metadados em documentos: autor, SO, software
• Perfilamento de infraestrutura corporativa

**Como se proteger:**
• Remover EXIF antes de postar fotos online
• Limpar metadados de documentos públicos
• Usar ferramentas como mat2 para sanitização em massa

**Na prática profissional:**
Análise de metadados é uma fase crucial de reconhecimento em pentests.
  `,
};

export const metadataAnalysisChallenges: Challenge[] = [theory0, code1, code2, theory3];
