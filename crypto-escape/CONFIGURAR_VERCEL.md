# ⚠️ Cadastro dando "Sistema indisponível"? Configure as variáveis!

O erro acontece porque as **variáveis de ambiente** não estão configuradas na Vercel.

## Passo a passo (2 minutos)

1. Acesse **https://vercel.com** e abra seu projeto **crypto-escape**
2. Vá em **Settings** (menu superior)
3. No menu lateral, clique em **Environment Variables**
4. Adicione estas duas variáveis:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://vszqojtywnoyjypoamyh.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_bRVa8IxQougAOXSVQKhxyg_upkEasJ8` |

5. Marque **Production**, **Preview** e **Development**
6. Clique em **Save**
7. **Importante:** vá em **Deployments** → clique nos 3 pontinhos do último deploy → **Redeploy**

Sem o redeploy, as variáveis não entram em vigor no site atual.

---

Depois disso, o cadastro e login devem funcionar.
