-- Crypto Escape: privacidade do ranking
-- Rode este SQL no Supabase (Dashboard > SQL Editor). É seguro rodar mais de uma vez.
--
-- PROBLEMA: as políticas antigas deixavam QUALQUER pessoa (com a chave anon, que fica no
-- navegador) ler todos os e-mails (profiles) e todo o código dos alunos (progress.user_codes).
-- CORREÇÃO: o ranking passa a ler uma view com apenas nome, avatar e contagens, e as
-- tabelas base só podem ser lidas pelo próprio dono.

-- 1) View pública com o mínimo necessário para o ranking
create or replace view public.ranking as
select
  p.user_id,
  coalesce(pr.full_name, 'Anônimo') as full_name,
  pr.avatar_url,
  jsonb_array_length(p.completed_rooms) as completed_count,
  p.total_attempts
from public.progress p
join public.profiles pr on pr.id = p.user_id;

grant select on public.ranking to anon, authenticated;

-- 2) Tabelas base: cada usuário lê só o que é seu
drop policy if exists "Profiles são públicos para leitura" on public.profiles;
drop policy if exists "Usuário lê o próprio perfil" on public.profiles;
create policy "Usuário lê o próprio perfil" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "Progresso: todos podem ler (ranking)" on public.progress;
drop policy if exists "Progresso: usuário lê o seu" on public.progress;
create policy "Progresso: usuário lê o seu" on public.progress
  for select using (auth.uid() = user_id);
