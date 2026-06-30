create extension if not exists "pgcrypto";

create table if not exists public.squads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  weekly_xp integer not null default 0,
  streak integer not null default 0,
  invite_code text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  username text not null unique,
  avatar_url text,
  level integer not null default 1,
  xp integer not null default 0,
  streak integer not null default 0,
  completed_quests integer not null default 0,
  squad_id uuid references public.squads(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.quests (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text not null check (category in ('body', 'focus', 'social', 'order', 'work', 'mind')),
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  xp_reward integer not null,
  duration_minutes integer not null,
  proof_type text not null check (proof_type in ('photo', 'video', 'text', 'timer')),
  is_daily boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.squad_members (
  squad_id uuid not null references public.squads(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  primary key (squad_id, user_id)
);

create table if not exists public.proofs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  quest_id uuid not null references public.quests(id) on delete cascade,
  file_url text,
  text text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.quest_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  quest_id uuid not null references public.quests(id) on delete cascade,
  proof_id uuid references public.proofs(id) on delete set null,
  xp_awarded integer not null default 0,
  completed_at timestamptz not null default now(),
  unique (user_id, quest_id, completed_at)
);

alter table public.users enable row level security;
alter table public.quests enable row level security;
alter table public.proofs enable row level security;
alter table public.squads enable row level security;
alter table public.squad_members enable row level security;
alter table public.quest_completions enable row level security;

create policy "users can read own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "users can update own profile"
  on public.users for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "users can read public quests"
  on public.quests for select
  using (true);

create policy "users can create own proofs"
  on public.proofs for insert
  with check (auth.uid() = user_id);

create policy "users can read own proofs"
  on public.proofs for select
  using (auth.uid() = user_id);

create policy "squad members can read their squads"
  on public.squads for select
  using (
    exists (
      select 1
      from public.squad_members sm
      where sm.squad_id = squads.id
        and sm.user_id = auth.uid()
    )
  );

create policy "squad members can read membership"
  on public.squad_members for select
  using (
    user_id = auth.uid()
    or exists (
      select 1
      from public.squad_members viewer
      where viewer.squad_id = squad_members.squad_id
        and viewer.user_id = auth.uid()
    )
  );

create policy "users can read own completions"
  on public.quest_completions for select
  using (auth.uid() = user_id);

create policy "users can create own completions"
  on public.quest_completions for insert
  with check (auth.uid() = user_id);
