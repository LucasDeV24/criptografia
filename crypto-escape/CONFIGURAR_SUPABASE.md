# Configurar Supabase — Passo a passo

Siga estes passos para o cadastro e ranking funcionarem.

---

## 1. Criar conta e projeto no Supabase

1. Acesse **https://supabase.com**
2. Clique em **Start your project** (ou faça login)
3. Clique em **New Project**
4. Escolha um **nome** (ex: crypto-escape)
5. Crie uma **senha forte** para o banco (guarde ela!)
6. Escolha a **região** mais próxima (ex: South America)
7. Clique em **Create new project** e aguarde ~2 min

---

## 2. Copiar as chaves da API

1. No menu lateral, vá em **Project Settings** (ícone de engrenagem)
2. Clique em **API** no menu
3. Copie estes dois valores:
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon public** (a chave longa em "Project API keys")

---

## 3. Criar o arquivo .env.local

1. Na pasta **crypto-escape**, crie um arquivo chamado `.env.local`
2. Cole este conteúdo (substitua pelos seus valores):

```
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...sua-chave-aqui
```

3. Salve o arquivo

---

## 4. Rodar o schema no banco

1. No Supabase, vá em **SQL Editor** (menu lateral)
2. Clique em **New query**
3. Abra o arquivo `supabase/schema.sql` do projeto
4. Copie **todo** o conteúdo
5. Cole no SQL Editor do Supabase
6. Clique em **Run** (ou Ctrl+Enter)
7. Deve aparecer "Success. No rows returned"

---

## 5. (Opcional) Desativar confirmação de email

Por padrão o Supabase exige que o usuário confirme o email. Para permitir login imediato após cadastro:

1. Vá em **Authentication** → **Providers**
2. Clique em **Email**
3. Desative **Confirm email**
4. Salve

---

## 6. (Opcional) Aumentar limite de cadastro/login

Se aparecer "Muitas tentativas" ou "email rate limit exceeded":

1. No Supabase, vá em **Authentication** → **Rate Limits**
2. Aumente os valores de `Email` (ex: de 4 para 30 por hora)
3. Salve

Ou aguarde 1 hora para o limite resetar.

---

## Pronto!

Reinicie o projeto (`npm run dev`) e teste:

1. Acesse **Cadastrar**
2. Crie uma conta
3. Faça **Entrar**
4. Jogue um pouco e veja seu nome no **Ranking**
