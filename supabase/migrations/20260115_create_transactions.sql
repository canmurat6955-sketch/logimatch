CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID, -- In real app, references auth.users(id)
    amount DECIMAL(10, 2) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('deposit', 'commission', 'withdrawal', 'invoice')),
    description TEXT,
    status VARCHAR(20) DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add some index for performance
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at);
