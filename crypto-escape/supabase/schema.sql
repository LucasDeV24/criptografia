-- Crypto Escape: profiles + progress + ranking
-- Rode este SQL no Supabase SQL Editor (Dashboard > SQL Editor)

-- Tabela de perfis (vinculada ao auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Tabela de progresso
create table if not exists public.progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null unique,
  completed_rooms jsonb default '[]'::jsonb,
  current_episode int default 0,
  current_room text default '0.1',
  total_time_seconds int default 0,
  first_try_successes int default 0,
  total_attempts int default 0,
  user_codes jsonb default '{}'::jsonb,
  updated_at timestamptz default now()
);

-- Índice para ranking (ordenar por salas completadas)
create index if not exists progress_completed_count on public.progress (
  jsonb_array_length(completed_rooms) desc,
  total_attempts asc
);

-- RLS: usuários só acessam seus próprios dados
alter table public.profiles enable row level security;
alter table public.progress enable row level security;

create policy "Profiles são públicos para leitura" on public.profiles
  for select using (true);

create policy "Usuário pode atualizar próprio perfil" on public.profiles
  for update using (auth.uid() = id);

create policy "Usuário pode inserir próprio perfil" on public.profiles
  for insert with check (auth.uid() = id);

create policy "Progresso: todos podem ler (ranking)" on public.progress
  for select using (true);

create policy "Progresso: usuário atualiza só o seu" on public.progress
  for update using (auth.uid() = user_id);

create policy "Progresso: usuário insere só o seu" on public.progress
  for insert with check (auth.uid() = user_id);

-- Trigger: criar perfil automaticamente ao se cadastrar
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $func$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'email', new.email),
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture')
  );
  insert into public.progress (user_id)
  values (new.id);
  return new;
end;
$func$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
