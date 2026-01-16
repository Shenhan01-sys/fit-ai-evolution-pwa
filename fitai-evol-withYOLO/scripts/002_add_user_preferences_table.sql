-- Create user_preferences table for onboarding data
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  fitness_goal TEXT NOT NULL,
  fitness_level TEXT NOT NULL,
  focus_area TEXT DEFAULT 'full-body',
  workout_days_per_week INT DEFAULT 3,
  equipment_available TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only read/write their own preferences
CREATE POLICY "Users can manage their own preferences"
  ON user_preferences
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);
