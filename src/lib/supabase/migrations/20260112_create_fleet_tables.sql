-- Fleet Management Tables

-- 1. Insurance Policies
create table if not exists insurance_policies (
  id uuid default uuid_generate_v4() primary key,
  vehicle_plate text not null,
  type text not null, -- 'Traffic Insurance', 'Kasko', 'Other'
  provider text,
  policy_number text,
  start_date date,
  end_date date,
  premium numeric,
  coverage text,
  status text default 'active', -- 'active', 'expired', 'expiring_soon'
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Tire Records
create table if not exists tire_records (
  id uuid default uuid_generate_v4() primary key,
  vehicle_plate text not null,
  brand text,
  model text,
  size text,
  purchase_date date,
  purchase_price numeric,
  supplier text,
  install_km numeric,
  current_km numeric,
  estimated_life_km numeric,
  position text, -- 'Front-Left', etc.
  health text, -- 'Good', 'Warning', 'Critical'
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Fuel Records
create table if not exists fuel_records (
  id uuid default uuid_generate_v4() primary key,
  vehicle_plate text not null,
  date timestamp with time zone,
  amount numeric, -- Liters
  cost numeric, -- TL
  odometer numeric, -- KM
  location text,
  full_tank boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- enable RLS
alter table insurance_policies enable row level security;
alter table tire_records enable row level security;
alter table fuel_records enable row level security;

create policy "Enable all access for now" on insurance_policies for all using (true);
create policy "Enable all access for now" on tire_records for all using (true);
create policy "Enable all access for now" on fuel_records for all using (true);
