import type { Challenge, CodeChallenge, TheoryChallenge } from '@/types/challenge';

const theory0: TheoryChallenge = {
  id: 'asym.0', type: 'theory', episode: 31, room: '31.0',
  title: 'Episódio 31 — Chave Pública e Privada (RSA)',
  description: 'Duas chaves diferentes: uma para criptografar, outra para decriptografar. A revolução que permitiu o e-commerce.',
  content: `
**O problema da simétrica:**
Como enviar a chave secreta de forma segura? Se alguém interceptar, acabou.

**A solução — Criptografia Assimétrica:**
Duas chaves que funcionam em par:
• **Chave pública:** qualquer pessoa pode ter (como seu email)
• **Chave privada:** só você tem (como sua senha)

**Como funciona:**
1. Ana quer enviar mensagem para Bruno
2. Bruno compartilha sua chave PÚBLICA
3. Ana criptografa com a chave pública do Bruno
4. Só a chave PRIVADA do Bruno decriptografa

**Analogia:**
Chave pública = cadeado aberto (qualquer um pode trancar)
Chave privada = única chave que abre o cadeado

**Onde é usado:**
• HTTPS (o cadeado do navegador)
• Assinaturas digitais
• Bitcoin e criptomoedas
• SSH (acesso a servidores)
• PGP (emails criptografados)
  `,
};

const code1: CodeChallenge = {
  id: 'asym.1', type: 'code', episode: 31, room: '31.1',
  title: 'Simulando RSA simplificado',
  description: 'Simule o conceito de chave pública/privada com matemática simples. **Execute**!',
  instructions: 'Simule RSA: crie uma função que criptografa cada caractere usando (charCode * chave) % modulo. Use chave pública 7, privada 3, módulo 33.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const chavePublica = 7;\nconst chavePrivada = 3;\nconst modulo = 33;\n\n// Crie criptografar(msg, chave, mod):\n// - Para cada caractere: (charCode * chave) % mod\n// - Retorne array de numeros\n//\n// Criptografe "AB" com chavePublica e modulo\n// Imprima: "Mensagem: AB"\n// Imprima: "Cifrado: [" + resultado.join(", ") + "]"\n// Imprima: "Chave publica usada: 7"\n// Imprima: "So a chave privada (3) decriptografa"\n`,
    python: `chave_publica = 7\nchave_privada = 3\nmodulo = 33\n\n# Crie criptografar(msg, chave, mod):\n# - Para cada caractere: (ord(letra) * chave) % mod\n# - Retorne lista de numeros\n#\n# Criptografe "AB" com chave_publica e modulo\n# Imprima: "Mensagem: AB"\n# Imprima: "Cifrado: [" + ", ".join(str(n) for n in resultado) + "]"\n# Imprima: "Chave publica usada: 7"\n# Imprima: "So a chave privada (3) decriptografa"\n`,
  },
  expectedOutput: 'Mensagem: AB\nCifrado: [29, 27]\nChave publica usada: 7\nSo a chave privada (3) decriptografa',
  hints: ['Criptografa com chave pública, só decriptografa com chave privada.'],
  difficulty: 'medium',
};

const theory2: TheoryChallenge = {
  id: 'asym.2', type: 'theory', episode: 31, room: '31.2',
  title: 'Assinaturas Digitais',
  description: 'Assinaturas digitais provam que uma mensagem é autêntica e não foi alterada.',
  content: `
**Como funciona a assinatura digital:**
1. Ana escreve um documento
2. Ana "assina" com sua chave PRIVADA
3. Qualquer pessoa verifica com a chave PÚBLICA da Ana
4. Se a verificação passar → o documento é autêntico

**É o INVERSO da criptografia:**
• Criptografar: chave pública do destinatário
• Assinar: chave privada do remetente

**Onde é usado:**
• Certificados HTTPS (o site prova que é legítimo)
• Atualizações de software (prova que é do fabricante)
• Contratos digitais
• Transações de criptomoedas
  `,
};

const code3: CodeChallenge = {
  id: 'asym.3', type: 'code', episode: 31, room: '31.3',
  title: 'Verificando certificado digital',
  description: 'Simule a verificação de um certificado HTTPS. **Execute**!',
  instructions: 'Crie uma função que verifica certificados digitais: valide assinatura e emissor. Retorne "VALIDO" ou "INVALIDO" com o motivo.',
  languages: ['javascript', 'python'],
  starterCode: {
    javascript: `const certificado = {\n  dominio: "banco.com",\n  emissor: "CertAuthority",\n  validade: "2027-12-31",\n  assinaturaValida: true\n};\n\n// Crie verificarCertificado(cert):\n// - Se !assinaturaValida: retorne "INVALIDO: assinatura falsa"\n// - Se !emissor: retorne "INVALIDO: sem emissor"\n// - Senao: retorne "VALIDO: " + dominio + " por " + emissor\n\n\nconsole.log(verificarCertificado(certificado));\nconsole.log(verificarCertificado({ dominio: "falso.com", assinaturaValida: false, emissor: "Hacker" }));\n`,
    python: `certificado = {\n    "dominio": "banco.com",\n    "emissor": "CertAuthority",\n    "validade": "2027-12-31",\n    "assinaturaValida": True\n}\n\n# Crie verificar_certificado(cert):\n# - Se assinaturaValida == False: retorne "INVALIDO: assinatura falsa"\n# - Se emissor vazio: retorne "INVALIDO: sem emissor"\n# - Senao: retorne "VALIDO: " + dominio + " por " + emissor\n\n\nprint(verificar_certificado(certificado))\nprint(verificar_certificado({"dominio": "falso.com", "assinaturaValida": False, "emissor": "Hacker"}))\n`,
  },
  expectedOutput: 'VALIDO: banco.com por CertAuthority\nINVALIDO: assinatura falsa',
  hints: ['Certificado válido tem assinatura correta e emissor confiável.'],
  difficulty: 'easy',
};

const theory4: TheoryChallenge = {
  id: 'asym.4', type: 'theory', episode: 31, room: '31.4',
  title: 'RSA e Assimétrica — Resumo',
  description: 'Você entende como a internet inteira troca dados de forma segura.',
  content: `
**O que você aprendeu:**
• Chave pública: criptografa (qualquer um pode ter)
• Chave privada: decriptografa (só o dono tem)
• Assinaturas digitais: provam autenticidade
• Certificados HTTPS: identidade de sites

**Na prática — HTTPS:**
1. Navegador recebe chave pública do site
2. Gera chave simétrica (AES) aleatória
3. Criptografa a chave AES com a chave pública do site
4. Site decriptografa com chave privada
5. Ambos usam AES para o resto da conversa
→ Combina assimétrica + simétrica!
  `,
};

export const asymmetricCryptoChallenges: Challenge[] = [theory0, code1, theory2, code3, theory4];
