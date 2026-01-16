-- Create workout stats view for quick aggregation
CREATE TABLE IF NOT EXISTS workout_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_workouts INT DEFAULT 0,
  total_minutes INT DEFAULT 0,
  total_calories INT DEFAULT 0,
  perfect_form_count INT DEFAULT 0,
  current_streak INT DEFAULT 0,
  last_workout_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE workout_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own stats"
  ON workout_stats FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats"
  ON workout_stats FOR UPDATE
  USING (auth.uid() = user_id);

-- Create trigger to update stats when workout session is created
CREATE OR REPLACE FUNCTION update_workout_stats()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO workout_stats (user_id, total_workouts, total_minutes, total_calories, perfect_form_count, last_workout_date)
  VALUES (
    NEW.user_id,
    1,
    NEW.duration_minutes,
    COALESCE(NEW.calories_burned, 0),
    CASE WHEN NEW.form_score >= 0.9 THEN 1 ELSE 0 END,
    NEW.completed_at
  )
  ON CONFLICT (user_id) DO UPDATE SET
    total_workouts = workout_stats.total_workouts + 1,
    total_minutes = workout_stats.total_minutes + EXCLUDED.total_minutes,
    total_calories = workout_stats.total_calories + EXCLUDED.total_calories,
    perfect_form_count = CASE 
      WHEN NEW.form_score >= 0.9 THEN workout_stats.perfect_form_count + 1 
      ELSE workout_stats.perfect_form_count 
    END,
    last_workout_date = NEW.completed_at,
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_workout_session_created
  AFTER INSERT ON workout_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_workout_stats();
