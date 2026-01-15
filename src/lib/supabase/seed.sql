-- 1. SEED PROFILES
-- We'll use static UUIDs so we can reference them easily
INSERT INTO profiles (id, full_name, role, phone, rating, avatar_url)
VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Ahmet Yılmaz', 'vehicle_owner', '+90 532 123 45 67', 4.8, 'https://i.pravatar.cc/150?u=a0eebc99'),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Mehmet Demir', 'vehicle_owner', '+90 533 987 65 43', 4.9, 'https://i.pravatar.cc/150?u=b0eebc99'),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Ali Kaya', 'vehicle_owner', '+90 555 111 22 33', 4.7, 'https://i.pravatar.cc/150?u=c0eebc99');

-- 2. SEED VEHICLES
INSERT INTO vehicles (id, plate_number, type, capacity_ton, owner_id, status, current_lat, current_lng)
VALUES
  ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', '34 AB 123', 'Tenteli Tır', 24.5, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'in_transit', 48.1351, 11.5820),
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', '16 CD 456', 'Komple Tır', 22.0, 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'resting', 48.8566, 2.3522),
  ('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', '35 EF 789', 'Tenteli Tır', 24.0, 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'in_transit', 45.4642, 9.1900);

-- 3. SEED LOADS
INSERT INTO loads (id, origin, destination, price, currency, vehicle_id, status, eta, cargo_description, weight_kg)
VALUES
  ('L-8821', 'Istanbul, TR', 'Munich, DE', 3450, 'EUR', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'in_transit', '2d 4h', 'Tekstil Hammaddesi', 21400),
  ('L-9932', 'Bursa, TR', 'London, UK', 4200, 'EUR', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'pending', '3d 12h', 'Otomotiv Yedek Parça', 16200),
  ('L-7741', 'Izmir, TR', 'Milan, IT', 2800, 'EUR', 'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'in_transit', '5h 30m', 'Kuru Gıda (İncir)', 23000);
