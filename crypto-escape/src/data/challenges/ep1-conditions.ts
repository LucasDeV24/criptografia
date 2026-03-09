import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory1_0: TheoryChallenge = {
  id: 'cond.0',
  type: 'theory',
  episode: 1,
  room: '1.0',
  title: 'Episódio 1 — Comparações e Decisões',
  description: 'Neste episódio você vai aprender a fazer o computador tomar decisões. Isso é essencial em cibersegurança!',
  content: `
**Por que comparações importam?**
Todo sistema de segurança precisa tomar decisões:
• A senha está correta? → Permite acesso
• A senha está errada? → Bloqueia acesso

Para o computador fazer isso, usamos **comparações**:
• \`==\` → "é igual a?"
• \`!=\` → "é diferente de?"
• \`>\` → "é maior que?"
• \`<\` → "é menor que?"

**Exemplo do dia a dia:**
Quando você digita sua senha no celular, o sistema **compara** o que você digitou com a senha salva. Se for igual → desbloqueia.

Vamos aprender isso passo a passo!
  `,
};

const code1_1: CodeChallenge = {
  id: 'cond.1',
  type: 'code',
  episode: 1,
  room: '1.1',
  title: 'Comparando valores',
  description: 'Comparações retornam **true** (verdadeiro) ou **false** (falso). O código abaixo já está pronto — apenas **execute** para ver o resultado.',
  instructions: 'Execute o código e veja o resultado da comparação.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// O computador vai comparar 10 com 10
// e dizer se são iguais

const resultado = (10 == 10);
console.log(resultado);
`,
    python: `# O computador vai comparar 10 com 10
# e dizer se são iguais

resultado = (10 == 10)
print(resultado)
`,
  },
  expectedOutput: 'true',
  hints: [
    'Clique em Executar — o código já está pronto!',
    '10 é igual a 10, então o resultado é true (verdadeiro)',
  ],
  difficulty: 'easy',
};

const code1_2: CodeChallenge = {
  id: 'cond.2',
  type: 'code',
  episode: 1,
  room: '1.2',
  title: 'Sua vez — mude a comparação',
  description: 'Agora mude o segundo número para **5** e veja o que acontece. Se 10 não é igual a 5, o resultado muda!',
  instructions: 'Escreva a comparação entre 10 e 5 usando == e guarde na variável "resultado".',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `// Compare 10 com 5 usando == e guarde na variável "resultado"
// Escreva aqui a comparação:

console.log(resultado);
`,
    python: `# Compare 10 com 5 usando == e guarde na variável "resultado"
# Escreva aqui a comparação:

print(resultado)
`,
  },
  expectedOutput: ['false', 'False'],
  hints: [
    'Escreva: const resultado = (10 == 5); em JavaScript',
    'Em Python: resultado = (10 == 5)',
    '10 não é igual a 5, então o resultado é false',
  ],
  difficulty: 'easy',
};

const theory1_3: TheoryChallenge = {
  id: 'cond.3',
  type: 'theory',
  episode: 1,
  room: '1.3',
  title: 'O que é if/else?',
  description: 'Agora que sabemos comparar, podemos fazer o computador DECIDIR o que fazer baseado na comparação.',
  content: `
**if** = "se"
**else** = "senão"

**Como funciona:**
\`\`\`
se (condição for verdadeira) {
    faça isso
} senão {
    faça aquilo
}
\`\`\`

**Exemplo real em segurança:**
\`\`\`
se (senha digitada == senha salva) {
    mostrar "Acesso permitido"
} senão {
    mostrar "Acesso negado"
}
\`\`\`

**Em código real:**
• **JavaScript:** \`if (senha == "1234") { ... } else { ... }\`
• **Python:** \`if senha == "1234": ... else: ...\`

Na próxima sala você vai ver isso funcionando!
  `,
};

const code1_4: CodeChallenge = {
  id: 'cond.4',
  type: 'code',
  episode: 1,
  room: '1.4',
  title: 'Seu primeiro if/else',
  description: 'O código abaixo simula uma verificação de senha. A senha correta é **"1234"**. O código já está pronto — **execute** para ver!',
  instructions: 'Escreva um if/else que compara senhaDigitada com senhaCorreta e imprime o resultado.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const senhaCorreta = "1234";
const senhaDigitada = "1234";

// Escreva um if/else:
// Se senhaDigitada for igual a senhaCorreta, imprima "Acesso permitido"
// Senão, imprima "Acesso negado"
`,
    python: `senha_correta = "1234"
senha_digitada = "1234"

# Escreva um if/else:
# Se senha_digitada for igual a senha_correta, imprima "Acesso permitido"
# Senão, imprima "Acesso negado"
`,
  },
  expectedOutput: 'Acesso permitido',
  hints: [
    'Use if (senhaDigitada == senhaCorreta) em JavaScript',
    'Use if senha_digitada == senha_correta: em Python',
    'Dentro do if: console.log("Acesso permitido") / print("Acesso permitido")',
  ],
  difficulty: 'easy',
};

const code1_5: CodeChallenge = {
  id: 'cond.5',
  type: 'code',
  episode: 1,
  room: '1.5',
  title: 'Senha errada!',
  description: 'Agora simule alguém digitando a senha **errada**. Mude a senhaDigitada para **"0000"** e veja o que acontece.',
  instructions: 'Mude a senha digitada para "0000" e escreva o if/else para verificar.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const senhaCorreta = "1234";
// Mude a senha digitada para "0000":
const senhaDigitada = "1234";

// Escreva um if/else:
// Se senhaDigitada for igual a senhaCorreta, imprima "Acesso permitido"
// Senão, imprima "Acesso negado"
`,
    python: `senha_correta = "1234"
# Mude a senha digitada para "0000":
senha_digitada = "1234"

# Escreva um if/else:
# Se senha_digitada for igual a senha_correta, imprima "Acesso permitido"
# Senão, imprima "Acesso negado"
`,
  },
  expectedOutput: 'Acesso negado',
  hints: [
    'Primeiro, mude "1234" para "0000" na variável senhaDigitada',
    'Depois escreva: if (senhaDigitada == senhaCorreta) { ... } else { ... }',
    'Como "0000" não é igual a "1234", deve imprimir "Acesso negado"',
  ],
  difficulty: 'easy',
};

const code1_6: CodeChallenge = {
  id: 'cond.6',
  type: 'code',
  episode: 1,
  room: '1.6',
  title: 'Verificação de idade',
  description: 'Agora vamos usar comparação com números! Complete o código: se a idade for **maior ou igual a 18**, imprima **"Maior de idade"**.',
  instructions: 'Escreva um if/else verificando se idade é maior ou igual a 18.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const idade = 20;

// Escreva um if/else:
// Se idade >= 18, imprima "Maior de idade"
// Senão, imprima "Menor de idade"
`,
    python: `idade = 20

# Escreva um if/else:
# Se idade >= 18, imprima "Maior de idade"
# Senão, imprima "Menor de idade"
`,
  },
  expectedOutput: 'Maior de idade',
  hints: [
    'Use if (idade >= 18) em JavaScript',
    'Use if idade >= 18: em Python',
    '20 é maior que 18, então entra no if → "Maior de idade"',
  ],
  difficulty: 'easy',
};

const theory1_7: TheoryChallenge = {
  id: 'cond.7',
  type: 'theory',
  episode: 1,
  room: '1.7',
  title: 'Parabéns! Você aprendeu a tomar decisões',
  description: 'Agora você sabe como computadores tomam decisões. Isso é a BASE de toda a cibersegurança.',
  content: `
**O que você aprendeu:**
• Comparações: \`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`
• if/else: tomar decisões no código
• Verificação de senha: o conceito básico de autenticação

**Como isso se aplica na cibersegurança:**
• Firewalls usam if/else: "se o tráfego é suspeito → bloqueia"
• Login: "se a senha está correta → permite acesso"
• Antivírus: "se o arquivo parece malware → alerta o usuário"

**Próximo episódio:**
Vamos aprender **loops** — como repetir ações. Hackers usam loops para testar milhares de senhas automaticamente!
  `,
};

export const conditionsChallenges: Challenge[] = [
  theory1_0,
  code1_1,
  code1_2,
  theory1_3,
  code1_4,
  code1_5,
  code1_6,
  theory1_7,
];
