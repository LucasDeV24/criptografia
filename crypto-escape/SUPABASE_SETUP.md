# Configuração do Supabase (Login + Ranking)

## 1. Criar projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Clique em **New Project**
3. Preencha nome, senha do banco e região
4. Após criar, vá em **Settings > API** e copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 2. Criar arquivo .env.local

Na pasta `crypto-escape`, crie `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
```

## 3. Rodar o schema do banco

1. No Supabase Dashboard, vá em **SQL Editor**
2. Abra o arquivo `supabase/schema.sql`
3. Copie TODO o conteúdo e cole no SQL Editor
4. Clique em **Run**

## 4. Configurar Google OAuth

### No Google Cloud Console

1. Acesse [console.cloud.google.com](https://console.cloud.google.com)
2. Crie um projeto ou selecione um existente
3. Vá em **APIs & Services > Credentials**
4. Clique em **Create Credentials > OAuth client ID**
5. Tipo: **Web application**
6. Em **Authorized redirect URIs**, adicione:
   ```
   https://seu-projeto.supabase.co/auth/v1/callback
   ```
   (Substitua pelo seu Project URL do Supabase)
7. Copie o **Client ID** e **Client Secret**

### No Supabase

1. Vá em **Authentication > Providers**
2. Encontre **Google** e clique para editar
3. Ative o provider
4. Cole o **Client ID** e **Client Secret** do Google
5. Salve

## 5. URLs de redirecionamento (OBRIGATÓRIO para login funcionar)

No Supabase, vá em **Authentication > URL Configuration**:
- **Site URL**: para dev use `http://localhost:3000`, para produção use sua URL
- **Redirect URLs**: adicione (clique em "Add URL"):
  - `http://localhost:3000/auth/callback` (desenvolvimento local)
  - `https://seu-dominio.vercel.app/auth/callback` (produção, se fizer deploy)

Sem isso, após o login no Google o app não recebe a sessão e continua mostrando "Entrar com Google".

---

Pronto! Reinicie o `npm run dev` e teste o login com Google.
