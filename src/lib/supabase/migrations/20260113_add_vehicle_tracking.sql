-- Add coordinates and tracking info to vehicles
ALTER TABLE vehicles 
ADD COLUMN IF NOT EXISTS last_location_lat float8,
ADD COLUMN IF NOT EXISTS last_location_lng float8,
ADD COLUMN IF NOT EXISTS last_location_updated_at timestamptz DEFAULT now(),
ADD COLUMN IF NOT EXISTS current_status text DEFAULT 'parked'; -- moving, parked, offline

-- Enable Realtime for vehicles table if not already enabled
alter publication supabase_realtime add table vehicles;
