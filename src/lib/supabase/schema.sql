-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Drivers & Users)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  role text default 'load_owner', -- 'load_owner', 'vehicle_owner', 'enterprise'
  phone text,
  avatar_url text,
  rating numeric default 5.0,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. VEHICLES
create table if not exists vehicles (
  id uuid default uuid_generate_v4() primary key,
  plate_number text not null,
  type text default 'Tenteli Tır', -- 'Tenteli Tır', 'Kamyon', etc.
  capacity_ton numeric default 24.0,
  owner_id uuid references profiles(id),
  status text default 'available', -- 'available', 'in_transit', 'maintenance'
  current_lat numeric,
  current_lng numeric,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. LOADS (Shipments)
create table if not exists loads (
  id uuid default uuid_generate_v4() primary key,
  origin text not null,
  destination text not null,
  price numeric,
  currency text default 'EUR',
  vehicle_id uuid references vehicles(id),
  status text default 'pending', -- 'pending', 'in_transit', 'delivered'
  eta text,
  cargo_description text,
  weight_kg numeric,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS POLICIES (Simple for Demo)
alter table profiles enable row level security;
alter table vehicles enable row level security;
alter table loads enable row level security;

create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Public vehicles are viewable by everyone" on vehicles for select using (true);
create policy "Public loads are viewable by everyone" on loads for select using (true);
