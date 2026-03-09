import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0: TheoryChallenge = {
  id: 'dirtr.0', type: 'theory', episode: 26, room: '26.0',
  title: 'Episódio 26 — Directory Traversal',
  description: 'Acesse arquivos que não deveria usando "../" para navegar entre pastas do servidor.',
  content: `
**Como funciona?**
Um site mostra imagens assim:
\`\`\`
site.com/ver?arquivo=foto.jpg
\`\`\`

O servidor busca: \`/imagens/foto.jpg\`

**O ataque:**
\`\`\`
site.com/ver?arquivo=../../../etc/passwd
\`\`\`

O servidor busca: \`/imagens/../../../etc/passwd\`
Que resolve para: \`/etc/passwd\` — arquivo de senhas do Linux!

**O que é "../"?**
Cada \`../\` sobe um nível de pasta:
• \`/imagens/../\` = raiz
• \`/imagens/../../\` = acima da raiz
• Com ../ suficientes, chega a qualquer arquivo!

**Gravidade: ALTA** — o hacker lê arquivos sensíveis do servidor.
  `,
};

const code1: CodeChallenge = {
  id: 'dirtr.1', type: 'code', episode: 26, room: '26.1',
  title: 'Servidor vulnerável',
  description: 'Veja como um servidor monta o caminho do arquivo sem proteção. **Execute**!',
  instructions: 'Crie uma função que monta o caminho completo do arquivo concatenando o diretório base com o nome recebido.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Crie buscarArquivo(nomeArquivo):\n// - Monte o caminho: "/var/www/imagens/" + nomeArquivo\n// - Imprima: "Buscando: " + caminho\n// - Retorne o caminho\n\n\nbuscarArquivo("foto.jpg");\n`,
    python: `# Crie buscar_arquivo(nome_arquivo):\n# - Monte o caminho: "/var/www/imagens/" + nome_arquivo\n# - Imprima: "Buscando: " + caminho\n# - Retorne o caminho\n\n\nbuscar_arquivo("foto.jpg")\n`,
  },
  expectedOutput: 'Buscando: /var/www/imagens/foto.jpg',
  hints: ['Input normal → caminho seguro.'],
  difficulty: 'easy',
};

const code2: CodeChallenge = {
  id: 'dirtr.2', type: 'code', episode: 26, room: '26.2',
  title: 'Ataque de traversal!',
  description: 'Mude o nome do arquivo para **"../../../../etc/passwd"** e veja o ataque.',
  instructions: 'Crie a mesma função de busca de arquivo, mas chame-a com um payload de directory traversal: "../../../../etc/passwd".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Crie buscarArquivo(nomeArquivo) que monta e imprime\n// "Buscando: /var/www/imagens/" + nomeArquivo\n// Chame com: "../../../../etc/passwd"\n`,
    python: `# Crie buscar_arquivo(nome_arquivo) que monta e imprime\n# "Buscando: /var/www/imagens/" + nome_arquivo\n# Chame com: "../../../../etc/passwd"\n`,
  },
  expectedOutput: 'Buscando: /var/www/imagens/../../../../etc/passwd',
  hints: ['Mude "foto.jpg" para "../../../../etc/passwd"'],
  difficulty: 'easy',
};

const code3: CodeChallenge = {
  id: 'dirtr.3', type: 'code', episode: 26, room: '26.3',
  title: 'Bloqueando traversal',
  description: 'Crie uma defesa que detecta e bloqueia tentativas de directory traversal. **Execute**!',
  instructions: 'Crie uma função buscarSeguro que bloqueia directory traversal verificando "..", "/etc/" e "\\\\" no nome do arquivo.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Crie buscarSeguro(nomeArquivo):\n// - Se contem "..": retorne "BLOQUEADO: Directory traversal detectado!"\n// - Se contem "/etc/" ou "\\\\": retorne "BLOQUEADO: Caminho proibido!"\n// - Senao: retorne "OK: /var/www/imagens/" + nomeArquivo\n\n\nconsole.log(buscarSeguro("foto.jpg"));\nconsole.log(buscarSeguro("../../../etc/passwd"));\nconsole.log(buscarSeguro("....//config"));\n`,
    python: `# Crie buscar_seguro(nome_arquivo):\n# - Se contem "..": retorne "BLOQUEADO: Directory traversal detectado!"\n# - Se contem "/etc/" ou "\\\\": retorne "BLOQUEADO: Caminho proibido!"\n# - Senao: retorne "OK: /var/www/imagens/" + nome_arquivo\n\n\nprint(buscar_seguro("foto.jpg"))\nprint(buscar_seguro("../../../etc/passwd"))\nprint(buscar_seguro("....//config"))\n`,
  },
  expectedOutput: 'OK: /var/www/imagens/foto.jpg\nBLOQUEADO: Directory traversal detectado!\nBLOQUEADO: Directory traversal detectado!',
  hints: ['A função bloqueia qualquer input com ".." ou caminhos proibidos.'],
  difficulty: 'medium',
};

const theory4: TheoryChallenge = {
  id: 'dirtr.4', type: 'theory', episode: 26, room: '26.4',
  title: 'Directory Traversal — Resumo',
  description: 'Nunca permita que o usuário controle caminhos de arquivos diretamente!',
  content: `
**O que você aprendeu:**
• "../" sobe níveis de diretório
• Hackers acessam /etc/passwd, .env, config.php
• Como detectar e bloquear tentativas

**Defesas profissionais:**
• Whitelist de arquivos permitidos
• Remover "../" e "..\\" do input
• Usar IDs em vez de nomes de arquivo
• Chroot/sandbox: limitar acesso do servidor a uma pasta
  `,
};

export const directoryTraversalChallenges: Challenge[] = [theory0, code1, code2, code3, theory4];
