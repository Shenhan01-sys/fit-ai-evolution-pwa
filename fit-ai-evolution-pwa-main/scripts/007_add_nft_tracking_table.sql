-- Create NFT minting tracking table
CREATE TABLE IF NOT EXISTS nft_mints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_type VARCHAR NOT NULL,
  transaction_hash VARCHAR UNIQUE,
  token_id BIGINT,
  contract_address VARCHAR,
  network VARCHAR DEFAULT 'base',
  status VARCHAR DEFAULT 'pending', -- 'pending', 'minting', 'confirmed', 'failed'
  mint_url VARCHAR,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE nft_mints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own NFTs"
  ON nft_mints FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own NFTs"
  ON nft_mints FOR INSERT
  WITH CHECK (auth.uid() = user_id);
