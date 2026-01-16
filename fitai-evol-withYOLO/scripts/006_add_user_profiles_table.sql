-- Create user profiles table for extended user info
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name VARCHAR,
  last_name VARCHAR,
  bio TEXT,
  avatar_url VARCHAR,
  date_of_birth DATE,
  gender VARCHAR,
  location VARCHAR,
  phone_number VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Create user settings table
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  theme_mode VARCHAR DEFAULT 'dark', -- 'light', 'dark', 'auto'
  notifications_enabled BOOLEAN DEFAULT TRUE,
  push_notifications_enabled BOOLEAN DEFAULT TRUE,
  email_notifications_enabled BOOLEAN DEFAULT TRUE,
  language VARCHAR DEFAULT 'en',
  units_system VARCHAR DEFAULT 'metric', -- 'metric' or 'imperial'
  measurement_unit VARCHAR DEFAULT 'kg', -- weight unit
  display_achievements BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own settings"
  ON user_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings"
  ON user_settings FOR UPDATE
  USING (auth.uid() = user_id);

-- Create trigger to auto-create profile and settings
CREATE OR REPLACE FUNCTION create_user_profile_and_settings()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (user_id, first_name)
  VALUES (NEW.id, NEW.user_metadata->>'first_name')
  ON CONFLICT DO NOTHING;

  INSERT INTO user_settings (user_id)
  VALUES (NEW.id)
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_profile_and_settings();
