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
  instructions: 'Execute e veja os metadados extraídos.',
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

console.log("=== ANALISE DE METADADOS ===");
for (let i = 0; i < fotos.length; i++) {
  const f = fotos[i];
  console.log("\\nArquivo: " + f.nome);
  console.log("  Camera: " + f.exif.camera);
  console.log("  Data: " + f.exif.data);
  console.log("  Software: " + f.exif.software);
  if (f.exif.gps) {
    console.log("  GPS: " + f.exif.gps + " [LOCALIZACAO EXPOSTA!]");
  } else {
    console.log("  GPS: sem dados");
  }
}
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

print("=== ANALISE DE METADADOS ===")
for f in fotos:
    print("\\nArquivo: " + f["nome"])
    print("  Camera: " + f["exif"]["camera"])
    print("  Data: " + f["exif"]["data"])
    print("  Software: " + f["exif"]["software"])
    if f["exif"]["gps"]:
        print("  GPS: " + f["exif"]["gps"] + " [LOCALIZACAO EXPOSTA!]")
    else:
        print("  GPS: sem dados")
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
  instructions: 'Execute e veja o perfil montado.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const documentos = [
  { nome: "relatorio.pdf", autor: "joao.silva", software: "Microsoft Word 2019", so: "Windows 10" },
  { nome: "planilha.xlsx", autor: "maria.santos", software: "LibreOffice 7.5", so: "Ubuntu 22.04" },
  { nome: "apresentacao.pptx", autor: "joao.silva", software: "Microsoft PowerPoint 2019", so: "Windows 10" },
  { nome: "contrato.pdf", autor: "ana.costa", software: "Adobe Acrobat DC", so: "macOS Ventura" },
  { nome: "orcamento.xlsx", autor: "maria.santos", software: "LibreOffice 7.5", so: "Ubuntu 22.04" }
];

const usuarios = {};
const softwares = {};
const sistemas = {};

for (let i = 0; i < documentos.length; i++) {
  const d = documentos[i];
  usuarios[d.autor] = (usuarios[d.autor] || 0) + 1;
  softwares[d.software] = (softwares[d.software] || 0) + 1;
  sistemas[d.so] = (sistemas[d.so] || 0) + 1;
}

console.log("=== PERFIL DA EMPRESA ===");
console.log("\\nFuncionarios encontrados:");
for (const u in usuarios) console.log("  " + u + " (" + usuarios[u] + " docs)");
console.log("\\nSoftwares usados:");
for (const s in softwares) console.log("  " + s);
console.log("\\nSistemas operacionais:");
for (const so in sistemas) console.log("  " + so + " (" + sistemas[so] + " maquinas)");
`,
    python: `documentos = [
    {"nome": "relatorio.pdf", "autor": "joao.silva", "software": "Microsoft Word 2019", "so": "Windows 10"},
    {"nome": "planilha.xlsx", "autor": "maria.santos", "software": "LibreOffice 7.5", "so": "Ubuntu 22.04"},
    {"nome": "apresentacao.pptx", "autor": "joao.silva", "software": "Microsoft PowerPoint 2019", "so": "Windows 10"},
    {"nome": "contrato.pdf", "autor": "ana.costa", "software": "Adobe Acrobat DC", "so": "macOS Ventura"},
    {"nome": "orcamento.xlsx", "autor": "maria.santos", "software": "LibreOffice 7.5", "so": "Ubuntu 22.04"}
]

usuarios = {}
softwares = {}
sistemas = {}

for d in documentos:
    usuarios[d["autor"]] = usuarios.get(d["autor"], 0) + 1
    softwares[d["software"]] = softwares.get(d["software"], 0) + 1
    sistemas[d["so"]] = sistemas.get(d["so"], 0) + 1

print("=== PERFIL DA EMPRESA ===")
print("\\nFuncionarios encontrados:")
for u in usuarios: print("  " + u + " (" + str(usuarios[u]) + " docs)")
print("\\nSoftwares usados:")
for s in softwares: print("  " + s)
print("\\nSistemas operacionais:")
for so in sistemas: print("  " + so + " (" + str(sistemas[so]) + " maquinas)")
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
