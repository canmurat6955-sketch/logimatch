-- DANGER: This script will delete all existing data in these tables!
-- Use this to reset the database and fix schema mismatch errors.

-- 1. CLEANUP (Drop tables in reverse order of dependencies)
DROP TABLE IF EXISTS loads CASCADE;
DROP TABLE IF EXISTS vehicles CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- 2. SCHEMA CREATION

-- Enable UUID extension (still useful for other things even if we use text IDs)
create extension if not exists "uuid-ossp";

-- Profiles (Drivers & Users)
-- Using TEXT for ID to support demo IDs. In production, use UUID and link to auth.users
create table profiles (
  id text primary key, 
  full_name text,
  role text default 'load_owner', -- 'load_owner', 'vehicle_owner', 'enterprise'
  phone text,
  avatar_url text,
  rating numeric default 5.0,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Vehicles
create table vehicles (
  id text primary key, -- Changed to TEXT
  plate_number text not null,
  type text default 'Tenteli Tır',
  capacity_ton numeric default 24.0,
  owner_id text references profiles(id), -- Changed reference type
  status text default 'available',
  current_lat numeric,
  current_lng numeric,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Loads (Shipments)
create table loads (
  id text primary key, -- Changed to TEXT (supports 'L-8821' etc.)
  origin text not null,
  destination text not null,
  price numeric,
  currency text default 'EUR',
  vehicle_id text references vehicles(id), -- Changed reference type
  status text default 'pending',
  eta text,
  cargo_description text,
  weight_kg numeric,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table profiles enable row level security;
alter table vehicles enable row level security;
alter table loads enable row level security;

-- Open Access Policies (For Demo/Dev)
create policy "Public profiles" on profiles for select using (true);
create policy "Public vehicles" on vehicles for select using (true);
create policy "Public loads" on loads for select using (true);


-- 3. SEED DATA

-- Profiles
INSERT INTO profiles (id, full_name, role, phone, rating, avatar_url)
VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Ahmet Yılmaz', 'vehicle_owner', '+90 532 123 45 67', 4.8, 'https://i.pravatar.cc/150?u=a0eebc99'),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Mehmet Demir', 'vehicle_owner', '+90 533 987 65 43', 4.9, 'https://i.pravatar.cc/150?u=b0eebc99'),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Ali Kaya', 'vehicle_owner', '+90 555 111 22 33', 4.7, 'https://i.pravatar.cc/150?u=c0eebc99');

-- Vehicles
INSERT INTO vehicles (id, plate_number, type, capacity_ton, owner_id, status, current_lat, current_lng)
VALUES
  ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', '34 AB 123', 'Tenteli Tır', 24.5, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'in_transit', 48.1351, 11.5820),
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', '16 CD 456', 'Komple Tır', 22.0, 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'resting', 48.8566, 2.3522),
  ('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', '35 EF 789', 'Tenteli Tır', 24.0, 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'in_transit', 45.4642, 9.1900);

-- Loads
INSERT INTO loads (id, origin, destination, price, currency, vehicle_id, status, eta, cargo_description, weight_kg)
VALUES
  ('L-8821', 'Istanbul, TR', 'Munich, DE', 3450, 'EUR', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'in_transit', '2d 4h', 'Tekstil Hammaddesi', 21400),
  ('L-9932', 'Bursa, TR', 'London, UK', 4200, 'EUR', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'pending', '3d 12h', 'Otomotiv Yedek Parça', 16200),
  ('L-7741', 'Izmir, TR', 'Milan, IT', 2800, 'EUR', 'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'in_transit', '5h 30m', 'Kuru Gıda (İncir)', 23000);
