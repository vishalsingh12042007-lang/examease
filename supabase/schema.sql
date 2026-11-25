-- ========================================================
-- ExamEase PostgreSQL / Supabase Production Database Schema
-- Complete tables, indexes, and Row-Level Security (RLS) rules
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Linked with Supabase Auth auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin', 'counselor')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. StudentProfiles Table
CREATE TABLE IF NOT EXISTS public.student_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    semester TEXT,
    exam_start_date DATE,
    exam_name TEXT,
    xp INTEGER DEFAULT 100,
    streak_days INTEGER DEFAULT 1,
    level INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Surveys Table (Baseline & Exam Week Survey Submissions)
CREATE TABLE IF NOT EXISTS public.surveys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    sleep_hours NUMERIC(3, 1) NOT NULL,
    bedtime TIME NOT NULL,
    wake_up_feeling TEXT NOT NULL,
    meals_count INTEGER NOT NULL,
    skips_breakfast TEXT NOT NULL,
    study_hours NUMERIC(3, 1) NOT NULL,
    break_frequency TEXT NOT NULL,
    stress_level INTEGER NOT NULL CHECK (stress_level BETWEEN 1 AND 10),
    stress_triggers TEXT[] DEFAULT '{}',
    routine_barriers TEXT,
    routine_breakdown TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. SleepRecords Table
CREATE TABLE IF NOT EXISTS public.sleep_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    bedtime TIME NOT NULL,
    wake_time TIME NOT NULL,
    duration NUMERIC(3, 1) NOT NULL,
    quality INTEGER CHECK (quality BETWEEN 1 AND 5),
    consistency TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. MealRecords Table
CREATE TABLE IF NOT EXISTS public.meal_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    breakfast BOOLEAN DEFAULT FALSE,
    lunch BOOLEAN DEFAULT FALSE,
    dinner BOOLEAN DEFAULT FALSE,
    snack BOOLEAN DEFAULT FALSE,
    missed_count INTEGER DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. MoodRecords Table
CREATE TABLE IF NOT EXISTS public.mood_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    mood TEXT NOT NULL,
    stress_level INTEGER NOT NULL CHECK (stress_level BETWEEN 1 AND 10),
    energy INTEGER CHECK (energy BETWEEN 1 AND 10),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. StudyTasks Table
CREATE TABLE IF NOT EXISTS public.study_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    subject TEXT NOT NULL,
    title TEXT NOT NULL,
    est_minutes INTEGER NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. WellnessChallenges Table
CREATE TABLE IF NOT EXISTS public.wellness_challenges (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    xp INTEGER DEFAULT 40,
    icon TEXT NOT NULL
);

-- 9. WellnessProgress Table (Daily Gamification Track)
CREATE TABLE IF NOT EXISTS public.wellness_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    wellness_score INTEGER NOT NULL,
    completed_challenges TEXT[] DEFAULT '{}',
    unlocked_badges TEXT[] DEFAULT '{}',
    exam_mode_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for Fast Query Performance
CREATE INDEX IF NOT EXISTS idx_sleep_user_date ON public.sleep_records(user_id, date);
CREATE INDEX IF NOT EXISTS idx_meal_user_date ON public.meal_records(user_id, date);
CREATE INDEX IF NOT EXISTS idx_mood_user_date ON public.mood_records(user_id, date);
CREATE INDEX IF NOT EXISTS idx_study_user_date ON public.study_tasks(user_id, date);
CREATE INDEX IF NOT EXISTS idx_surveys_user ON public.surveys(user_id);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.surveys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sleep_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wellness_progress ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.users
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. StudentProfiles Policy: Students can view and update only their own profile. Admins can view all.
CREATE POLICY "Students manage own profile"
    ON public.student_profiles
    FOR ALL
    USING (auth.uid() = user_id OR public.is_admin());

-- 2. SleepRecords Policy
CREATE POLICY "Students manage own sleep records"
    ON public.sleep_records
    FOR ALL
    USING (auth.uid() = user_id OR public.is_admin());

-- 3. MealRecords Policy
CREATE POLICY "Students manage own meal records"
    ON public.meal_records
    FOR ALL
    USING (auth.uid() = user_id OR public.is_admin());

-- 4. MoodRecords Policy
CREATE POLICY "Students manage own mood records"
    ON public.mood_records
    FOR ALL
    USING (auth.uid() = user_id OR public.is_admin());

-- 5. StudyTasks Policy
CREATE POLICY "Students manage own study tasks"
    ON public.study_tasks
    FOR ALL
    USING (auth.uid() = user_id OR public.is_admin());

-- 6. Surveys Policy: Students insert and view their own survey. Admins can query aggregate rows.
CREATE POLICY "Students access own survey"
    ON public.surveys
    FOR ALL
    USING (auth.uid() = user_id OR public.is_admin());
