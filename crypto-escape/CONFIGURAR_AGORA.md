# ✅ Próximos passos - falta pouco!

O arquivo `.env.local` já foi criado com sua URL. Agora você precisa de **2 coisas**:

---

## 1. Pegar a Anon Key (2 minutos)

1. **Abra este link** (seu projeto):  
   https://supabase.com/dashboard/project/tjbsazplwphsqzwafmyq/settings/api

2. Na página, procure **Project API keys**

3. Copie a chave **anon** **public** (a chave longa que começa com `eyJ...`)

4. Abra o arquivo `.env.local` na pasta `crypto-escape`

5. Substitua `COLE_SUA_ANON_KEY_AQUI` pela chave que você copiou

6. Salve o arquivo (Ctrl+S)

---

## 2. Rodar o SQL do banco (1 minuto)

1. **Abra este link**:  
   https://supabase.com/dashboard/project/tjbsazplwphsqzwafmyq/sql/new

2. Abra o arquivo `supabase/schema.sql` do seu projeto

3. Selecione TUDO (Ctrl+A), copie (Ctrl+C)

4. Cole no editor SQL do Supabase (Ctrl+V)

5. Clique em **Run** (canto inferior direito)

---

## 3. Login com Google (opcional por enquanto)

O app já funciona sem o Google! Você pode testar primeiro.

Quando quiser ativar o login:
- Siga o passo 5 e 6 do arquivo `SUPABASE_SETUP.md`

---

## 4. Testar

```bash
npm run dev
```

Acesse http://localhost:3000

Se a anon key estiver correta no `.env.local`, o botão "Entrar com Google" vai aparecer.
