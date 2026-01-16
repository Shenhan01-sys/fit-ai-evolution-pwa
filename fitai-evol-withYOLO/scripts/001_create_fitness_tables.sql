-- Create users profile table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  fitness_goal TEXT,
  fitness_level TEXT,
  height_cm FLOAT,
  weight_kg FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create workouts table
CREATE TABLE IF NOT EXISTS public.workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  duration_minutes INT,
  difficulty_level TEXT,
  exercises JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create workout sessions table (track completed workouts)
CREATE TABLE IF NOT EXISTS public.workout_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workout_id UUID REFERENCES public.workouts(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  duration_minutes INT,
  completed_exercises JSONB,
  form_score FLOAT,
  calories_burned INT,
  notes TEXT,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create achievements table (NFT achievements)
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  nft_token_id TEXT,
  nft_contract_address TEXT,
  nft_chain TEXT,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Workouts policies
CREATE POLICY "workouts_select_own" ON public.workouts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "workouts_insert_own" ON public.workouts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "workouts_update_own" ON public.workouts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "workouts_delete_own" ON public.workouts FOR DELETE USING (auth.uid() = user_id);

-- Workout sessions policies
CREATE POLICY "sessions_select_own" ON public.workout_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "sessions_insert_own" ON public.workout_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "sessions_update_own" ON public.workout_sessions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "sessions_delete_own" ON public.workout_sessions FOR DELETE USING (auth.uid() = user_id);

-- Achievements policies
CREATE POLICY "achievements_select_own" ON public.achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "achievements_insert_own" ON public.achievements FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "achievements_delete_own" ON public.achievements FOR DELETE USING (auth.uid() = user_id);

-- Trigger untuk auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'first_name', 'User')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
