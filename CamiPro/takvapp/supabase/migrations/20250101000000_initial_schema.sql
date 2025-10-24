-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Prayer Times Preferences
create table if not exists public.prayer_preferences (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  city text not null,
  country text not null,
  calculation_method int default 2,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Chat History
create table if not exists public.chat_messages (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamp with time zone default now()
);

-- Quran Bookmarks
create table if not exists public.quran_bookmarks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  surah_number int not null check (surah_number between 1 and 114),
  ayah_number int not null check (ayah_number > 0),
  created_at timestamp with time zone default now(),
  unique(user_id, surah_number, ayah_number)
);

-- Tasbih History
create table if not exists public.tasbih_history (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  count int not null check (count > 0),
  created_at timestamp with time zone default now()
);

-- Contact Messages
create table if not exists public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.prayer_preferences enable row level security;
alter table public.chat_messages enable row level security;
alter table public.quran_bookmarks enable row level security;
alter table public.tasbih_history enable row level security;

-- RLS Policies for prayer_preferences
create policy "Users can view own preferences"
  on public.prayer_preferences for select
  using (auth.uid() = user_id);

create policy "Users can insert own preferences"
  on public.prayer_preferences for insert
  with check (auth.uid() = user_id);

create policy "Users can update own preferences"
  on public.prayer_preferences for update
  using (auth.uid() = user_id);

create policy "Users can delete own preferences"
  on public.prayer_preferences for delete
  using (auth.uid() = user_id);

-- RLS Policies for chat_messages
create policy "Users can view own messages"
  on public.chat_messages for select
  using (auth.uid() = user_id);

create policy "Users can insert own messages"
  on public.chat_messages for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own messages"
  on public.chat_messages for delete
  using (auth.uid() = user_id);

-- RLS Policies for quran_bookmarks
create policy "Users can view own bookmarks"
  on public.quran_bookmarks for select
  using (auth.uid() = user_id);

create policy "Users can insert own bookmarks"
  on public.quran_bookmarks for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own bookmarks"
  on public.quran_bookmarks for delete
  using (auth.uid() = user_id);

-- RLS Policies for tasbih_history
create policy "Users can view own history"
  on public.tasbih_history for select
  using (auth.uid() = user_id);

create policy "Users can insert own history"
  on public.tasbih_history for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own history"
  on public.tasbih_history for delete
  using (auth.uid() = user_id);

-- Contact messages are public (no auth required)
create policy "Anyone can insert contact messages"
  on public.contact_messages for insert
  with check (true);

-- Create indexes for better performance
create index if not exists idx_prayer_preferences_user_id on public.prayer_preferences(user_id);
create index if not exists idx_chat_messages_user_id on public.chat_messages(user_id);
create index if not exists idx_chat_messages_created_at on public.chat_messages(created_at desc);
create index if not exists idx_quran_bookmarks_user_id on public.quran_bookmarks(user_id);
create index if not exists idx_tasbih_history_user_id on public.tasbih_history(user_id);
create index if not exists idx_tasbih_history_created_at on public.tasbih_history(created_at desc);
create index if not exists idx_contact_messages_created_at on public.contact_messages(created_at desc);

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger for prayer_preferences
create trigger handle_prayer_preferences_updated_at
  before update on public.prayer_preferences
  for each row
  execute function public.handle_updated_at();

