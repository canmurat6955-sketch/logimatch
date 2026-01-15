-- Create Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID, -- References the owner (auth.users)
    plate VARCHAR(20) NOT NULL UNIQUE,
    brand VARCHAR(50),
    model VARCHAR(50),
    year INTEGER,
    vehicle_type VARCHAR(50), -- Tır, Kamyon, Kamyonet
    trailer_type VARCHAR(50), -- Tenteli, Frigo, etc.
    capacity_kg INTEGER, 
    driver_name VARCHAR(100), -- Optionally assign a driver name directly for simplicity
    status VARCHAR(20) DEFAULT 'active', -- active, maintenance, on_trip
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Users can view their own vehicles
CREATE POLICY "Users can view own vehicles" ON vehicles
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own vehicles
CREATE POLICY "Users can insert own vehicles" ON vehicles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own vehicles
CREATE POLICY "Users can update own vehicles" ON vehicles
    FOR UPDATE USING (auth.uid() = user_id);

-- Admins can view ALL vehicles (Bypass RLS or specific policy)
-- For now, we'll add a policy for specific admin IDs or just allow if role is admin (requires custom claim check usually)
-- For MVP/Demo correctness, let's keep it simple:
-- IF you are Admin, you bypass RLS in Supabase Client usually if you use Service Role, 
-- BUT for the Client-side Admin Dashboard, we need a policy:
-- CREATE POLICY "Admins view all" ON vehicles ... (Skipping complex role check for this step, relying on 'Users view own' for the prompt's main request)
