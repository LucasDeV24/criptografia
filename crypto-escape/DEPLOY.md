# Deploy para produção (Vercel)

## Opção A: Deploy pelo site da Vercel (mais fácil)

1. Acesse **https://vercel.com** e faça login (ou crie conta com GitHub)
2. Clique em **Add New** → **Project**
3. Importe o repositório do GitHub (ou faça upload da pasta `crypto-escape`)
4. **Antes de fazer Deploy**, clique em **Environment Variables** e adicione:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://vszqojtywnoyjypoamyh.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = sua chave (a mesma do .env.local)
5. Clique em **Deploy**
6. Aguarde e copie a URL gerada (ex: `https://crypto-escape-xxx.vercel.app`)

## Opção B: Deploy pelo terminal

1. Instale e faça login:
   ```
   npm i -g vercel
   vercel login
   ```

2. Na pasta crypto-escape, rode:
   ```
   vercel --prod
   ```

3. Siga as perguntas (projeto novo, etc.)
4. Depois do deploy, vá em **vercel.com** → seu projeto → **Settings** → **Environment Variables** e adicione as variáveis acima

## Configurar Supabase para produção

No **Supabase Dashboard** → **Authentication** → **URL Configuration**:

- **Site URL**: cole a URL do Vercel (ex: `https://crypto-escape-xxx.vercel.app`)
- **Redirect URLs**: adicione `https://*.vercel.app/**` (permite qualquer subdomínio Vercel)

## Checklist pós-deploy

- [ ] Cadastro funciona
- [ ] Login funciona
- [ ] Progresso sincroniza
- [ ] Ranking carrega
