# 🚀 Passo a passo completo — Crypto Escape + Supabase

---

## ✅ PASSO 1: Verificar o .env.local (já feito)

O arquivo `.env.local` na pasta `crypto-escape` já deve ter:

```
NEXT_PUBLIC_SUPABASE_URL=https://tjbsazplwphsqzwafmyq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_KlxotvOwDE68BNEBV3uq2Q_7OaF1j2P
```

**Se a chave estiver incompleta:** vá em **Settings** → **API Keys** no Supabase, copie a **Publishable key** completa e cole no `.env.local`.

---

## ✅ PASSO 2: Rodar o SQL (criar tabelas)

1. **Abra este link:**  
   https://supabase.com/dashboard/project/tjbsazplwphsqzwafmyq/sql/new

2. **Abra o arquivo** `supabase/schema.sql` no seu projeto.

3. **Selecione tudo** (Ctrl+A) e **copie** (Ctrl+C).

4. **Cole** no editor SQL do Supabase (Ctrl+V).

5. **Clique em RUN** (botão verde, canto inferior direito).

6. Se aparecer "Success" ou algo como "0 rows" → deu certo.

---

## ✅ PASSO 3: Configurar Login com Google (opcional)

O app funciona sem isso. Para ativar o login com Google:

### 3.1 — No Google Cloud Console

1. Acesse: https://console.cloud.google.com  
2. Crie um projeto ou selecione um existente.  
3. Vá em **APIs e serviços** → **Credenciais**.  
4. Clique em **Criar credenciais** → **ID do cliente OAuth**.  
5. Se pedir, configure a **tela de consentimento** (nome do app, seu email).  
6. Tipo: **Aplicativo da Web**.  
7. Em **URIs de redirecionamento autorizados**, adicione **exatamente**:
   ```
   https://tjbsazplwphsqzwafmyq.supabase.co/auth/v1/callback
   ```
8. Clique em **Criar**.  
9. Copie o **ID do cliente** e o **Segredo do cliente**.

### 3.2 — No Supabase

1. Acesse: https://supabase.com/dashboard/project/tjbsazplwphsqzwafmyq/auth/providers  
2. Clique em **Google**.  
3. Ative o toggle **Enable Sign in with Google**.  
4. Cole o **Client ID** e o **Client Secret** do Google.  
5. Clique em **Salvar**.

---

## ✅ PASSO 4: Testar

1. Abra o terminal na pasta do projeto.

2. Rode:
   ```bash
   npm run dev
   ```

3. Abra no navegador: http://localhost:3000

4. Deve aparecer o botão **Entrar com Google**.

5. Clique, faça login e complete um desafio.

6. Acesse **Ranking** e confira se seu progresso apareceu.

---

## ❌ Se der erro

- **"Invalid API key"** → Conferir se a **Publishable key** no `.env.local` está completa e igual à do Supabase.  
- **"relation does not exist"** → Rodar o SQL do Passo 2 de novo.  
- **"Redirect URI mismatch"** (Google) → Conferir se a URI de redirecionamento no Google Cloud está **exatamente** igual à do Passo 3.1.

---

## Resumo rápido

| Passo | O que fazer |
|-------|-------------|
| 1 | Conferir `.env.local` |
| 2 | Rodar `supabase/schema.sql` no SQL Editor |
| 3 | Configurar Google OAuth (opcional) |
| 4 | Rodar `npm run dev` e testar |
