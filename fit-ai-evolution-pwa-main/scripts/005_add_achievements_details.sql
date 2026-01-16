-- Add more detailed achievement types and conditions
INSERT INTO achievements (user_id, achievement_type, title, description) VALUES
-- Achievement types will be managed by the app
-- Just ensure the table structure is complete

-- Create achievement definitions table
CREATE TABLE IF NOT EXISTS achievement_definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR UNIQUE NOT NULL,
  title VARCHAR NOT NULL,
  description TEXT,
  icon_emoji VARCHAR(10),
  color_class VARCHAR(50),
  requirement_type VARCHAR(50), -- 'form_score', 'workout_count', 'streak', 'calories'
  requirement_value INT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert achievement definitions
INSERT INTO achievement_definitions (type, title, description, icon_emoji, color_class, requirement_type, requirement_value)
VALUES
  ('first_workout', 'First Step', 'Complete your first workout', '🎯', 'from-[#80EE98] to-[#46DFB1]', 'workout_count', 1),
  ('week_warrior', 'Week Warrior', 'Complete 7 workouts in a week', '⚡', 'from-[#46DFB1] to-[#09D1C7]', 'workout_count', 7),
  ('perfect_form', 'Perfect Form Master', 'Achieve 90%+ form score', '✨', 'from-[#09D1C7] to-[#15919B]', 'form_score', 90),
  ('month_milestone', 'Month Milestone', 'Complete 30 workouts', '🔥', 'from-[#15919B] to-[#0C6478]', 'workout_count', 30),
  ('century_hero', 'Century Hero', 'Complete 100 workouts', '👑', 'from-[#0C6478] to-[#213A58]', 'workout_count', 100),
  ('calorie_crusher', 'Calorie Crusher', 'Burn 10,000 total calories', '🔥', 'from-[#80EE98] to-[#09D1C7]', 'calories', 10000),
  ('consistency_king', 'Consistency King', 'Maintain 7-day workout streak', '👑', 'from-[#46DFB1] to-[#80EE98]', 'streak', 7);
