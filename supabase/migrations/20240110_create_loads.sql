create table if not exists loads (
  id uuid default gen_random_uuid() primary key,
  owner_id uuid references auth.users(id) not null,
  origin text not null,
  destination text not null,
  weight int not null, -- in kg or tons, let's assume tons for display simplicity or just generic unit
  price decimal(10,2) not null,
  status text check (status in ('open', 'assigned', 'delivered')) default 'open',
  created_at timestamptz default now()
);

-- Enable RLS
alter table loads enable row level security;

-- Policies
create policy "Users can view their own loads" on loads
  for select using (auth.uid() = owner_id);

create policy "Users can insert their own loads" on loads
  for insert with check (auth.uid() = owner_id);

create policy "Users can update their own loads" on loads
  for update using (auth.uid() = owner_id);
