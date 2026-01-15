-- Vehicles Update
alter table vehicles add column if not exists insurance_expiry date;
alter table vehicles add column if not exists kasko_expiry date;
alter table vehicles add column if not exists last_maintenance_km int default 0;

-- Drivers Table
create table if not exists drivers (
    id uuid default gen_random_uuid() primary key,
    owner_id uuid references auth.users(id) not null,
    full_name text not null,
    license_type text not null,
    status text default 'active' check (status in ('active', 'leave', 'terminated')),
    current_vehicle_id uuid references vehicles(id),
    created_at timestamptz default now()
);

-- Expenses Table
create table if not exists expenses (
    id uuid default gen_random_uuid() primary key,
    owner_id uuid references auth.users(id) not null,
    vehicle_id uuid references vehicles(id),
    driver_id uuid references drivers(id),
    amount decimal(10,2) not null,
    date date not null default CURRENT_DATE,
    category text not null check (category in ('tire', 'maintenance', 'insurance', 'food', 'fuel', 'other')),
    metadata jsonb default '{}'::jsonb, 
    -- Metadata examples:
    -- Fuel: { "liters_per_100km": 30, "station": "Shell" }
    -- Tire: { "brand": "Lassa", "serial": "X123" }
    created_at timestamptz default now()
);

-- Enable RLS
alter table drivers enable row level security;
alter table expenses enable row level security;

-- Policies for Drivers
create policy "Users can view their own drivers" on drivers for select using (auth.uid() = owner_id);
create policy "Users can insert their own drivers" on drivers for insert with check (auth.uid() = owner_id);
create policy "Users can update their own drivers" on drivers for update using (auth.uid() = owner_id);

-- Policies for Expenses
create policy "Users can view their own expenses" on expenses for select using (auth.uid() = owner_id);
create policy "Users can insert their own expenses" on expenses for insert with check (auth.uid() = owner_id);
create policy "Users can update their own expenses" on expenses for update using (auth.uid() = owner_id);
