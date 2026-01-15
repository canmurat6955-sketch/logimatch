CREATE TABLE IF NOT EXISTS payment_methods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID, -- In real app, references auth.users(id)
    last4 VARCHAR(4) NOT NULL,
    brand VARCHAR(20) NOT NULL,
    expiry VARCHAR(5) NOT NULL, -- MM/YY
    token VARCHAR(255) NOT NULL, -- Payment provider token (e.g. iyzico token)
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payment_methods_user_id ON payment_methods(user_id);
