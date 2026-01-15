-- Update vehicles table with advanced features
ALTER TABLE vehicles 
ADD COLUMN IF NOT EXISTS length_cm INTEGER,
ADD COLUMN IF NOT EXISTS width_cm INTEGER,
ADD COLUMN IF NOT EXISTS height_cm INTEGER,
ADD COLUMN IF NOT EXISTS volume_m3 NUMERIC(5,2),
ADD COLUMN IF NOT EXISTS features TEXT[], -- Array of strings e.g. ['Lift', 'ADR', 'Kayar Çatı']
ADD COLUMN IF NOT EXISTS insurance_expiry DATE,
ADD COLUMN IF NOT EXISTS inspection_expiry DATE;

-- Comment on columns for clarity
COMMENT ON COLUMN vehicles.length_cm IS 'Vehicle length in centimeters';
COMMENT ON COLUMN vehicles.width_cm IS 'Vehicle width in centimeters';
COMMENT ON COLUMN vehicles.height_cm IS 'Vehicle height in centimeters';
COMMENT ON COLUMN vehicles.volume_m3 IS 'Vehicle volume capacity in cubic meters';
COMMENT ON COLUMN vehicles.features IS 'List of special vehicle features';
