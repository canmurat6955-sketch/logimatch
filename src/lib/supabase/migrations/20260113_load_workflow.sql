-- Add document tracking to loads
ALTER TABLE loads 
ADD COLUMN IF NOT EXISTS documents jsonb DEFAULT '{"waybill": false, "pod": false, "invoice": false}',
ADD COLUMN IF NOT EXISTS last_activity_at timestamptz DEFAULT now(),
ADD COLUMN IF NOT EXISTS customer_phone text; -- for SMS notifications

-- Create Activity Feed (or use Audit Logs, but maybe separate 'load_events' is better)
create table if not exists load_events (
  id uuid default gen_random_uuid() primary key,
  load_id uuid references loads(id),
  event_type text not null, -- 'PICKUP', 'DELIVERED', 'DOC_MISSING', 'DOC_UPLOADED'
  description text,
  created_at timestamptz default now()
);

-- Enable Realtime
alter publication supabase_realtime add table load_events;
alter publication supabase_realtime add table loads;
