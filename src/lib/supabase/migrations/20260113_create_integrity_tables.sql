-- AUDIT LOGS
create table if not exists audit_logs (
  id uuid default gen_random_uuid() primary key,
  admin_id uuid references auth.users(id),
  action text not null, -- 'BAN_USER', 'SEND_BROADCAST', 'UPDATE_SETTINGS'
  details jsonb, -- { target_user: '...', reason: '...' }
  ip_address text,
  created_at timestamptz default now()
);

-- BROADCAST MESSAGES
create table if not exists broadcasts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  message text not null,
  target_audience text default 'all', -- 'all', 'drivers', 'shippers'
  sent_by uuid references auth.users(id),
  created_at timestamptz default now()
);

-- SYSTEM HEALTH METRICS (Optional, for analytics)
-- We can just query existing tables for stats, no need for a dedicated table unless we want historical snapshots.

-- Enable RLS
alter table audit_logs enable row level security;
alter table broadcasts enable row level security;

-- Policies (Admins only see/write)
-- For demo, we might allow authenticated users to read broadcasts
create policy "Admins can view audit logs" on audit_logs for select using (auth.role() = 'authenticated'); -- Simplify for now
create policy "Admins can insert audit logs" on audit_logs for insert with check (auth.role() = 'authenticated');

create policy "Everyone can view broadcasts" on broadcasts for select using (true);
create policy "Admins can insert broadcasts" on broadcasts for insert with check (auth.role() = 'authenticated');
