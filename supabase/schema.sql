-- =========================
-- 1) Core Tables (Safe Create)
-- =========================
-- Profiles: Stores the anonymous identity
DO $$
BEGIN
  IF to_regclass('public.profiles') IS NULL THEN
    CREATE TABLE public.profiles (
      id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
      anonymous_name TEXT UNIQUE,
      avatar_url TEXT,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
    );
  ELSE
    -- Add column if it doesn't exist (for existing tables)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='anonymous_name') THEN
        ALTER TABLE public.profiles ADD COLUMN anonymous_name TEXT UNIQUE;
    END IF;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.reflections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  mood TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.journal_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  mood TEXT NOT NULL,
  visibility TEXT DEFAULT 'private',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.bookmarks (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  reflection_id UUID REFERENCES public.reflections(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (user_id, reflection_id)
);

CREATE TABLE IF NOT EXISTS public.mood_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  mood TEXT NOT NULL,
  intensity INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================
-- 2) Anonymous Identity Generator
-- =========================
CREATE OR REPLACE FUNCTION public.generate_anonymous_name()
RETURNS TEXT AS $$
DECLARE
  adjectives TEXT[] := ARRAY['Silent', 'Quiet', 'Soft', 'Bright', 'Calm', 'Brave', 'Golden', 'Deep', 'Kind', 'Wild'];
  nouns TEXT[] := ARRAY['Willow', 'River', 'Lantern', 'Meadow', 'Peak', 'Forest', 'Ocean', 'Star', 'Cloud', 'Mountain'];
  adj TEXT;
  noun TEXT;
  num TEXT;
BEGIN
  adj := adjectives[floor(random() * array_length(adjectives, 1) + 1)];
  noun := nouns[floor(random() * array_length(nouns, 1) + 1)];
  num := floor(random() * 90 + 10)::TEXT;
  RETURN adj || noun || num;
END;
$$ LANGUAGE plpgsql;

-- =========================
-- 3) Auth Trigger (with .edu check)
-- =========================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- FOR TESTING: Relaxed .edu restriction
  -- IF NOT (new.email LIKE '%.edu') THEN
  --   RAISE EXCEPTION 'Only .edu email addresses are allowed.';
  -- END IF;

  INSERT INTO public.profiles (id, anonymous_name)
  VALUES (new.id, public.generate_anonymous_name());
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =========================
-- 4) RLS & Idempotent Policies
-- =========================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reflections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_logs ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  -- Profiles
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public profiles viewable' AND tablename = 'profiles') THEN
    CREATE POLICY "Public profiles viewable" ON public.profiles FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users manage own profile' AND tablename = 'profiles') THEN
    CREATE POLICY "Users manage own profile" ON public.profiles FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
  END IF;

  -- Reflections
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated view reflections' AND tablename = 'reflections') THEN
    CREATE POLICY "Authenticated view reflections" ON public.reflections FOR SELECT USING (auth.uid() IS NOT NULL AND is_deleted = FALSE);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users manage own reflections' AND tablename = 'reflections') THEN
    CREATE POLICY "Users manage own reflections" ON public.reflections FOR ALL USING (auth.uid() = author_id) WITH CHECK (auth.uid() = author_id);
  END IF;

  -- Private Tables (Journal, Bookmarks, Mood Logs)
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users manage own journal' AND tablename = 'journal_entries') THEN
    CREATE POLICY "Users manage own journal" ON public.journal_entries FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users manage own bookmarks' AND tablename = 'bookmarks') THEN
    CREATE POLICY "Users manage own bookmarks" ON public.bookmarks FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users manage own mood logs' AND tablename = 'mood_logs') THEN
    CREATE POLICY "Users manage own mood logs" ON public.mood_logs FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;
-- =========================
-- 5) Storage Buckets & Policies (Safe Create)
-- =========================
DO $$
BEGIN
  -- Create buckets if they don't exist
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('resources', 'resources', true),
         ('avatars', 'avatars', true)
  ON CONFLICT (id) DO NOTHING;

  -- Resources: Public Read
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Access to Resources' AND tablename = 'objects' AND schemaname = 'storage') THEN
    CREATE POLICY "Public Access to Resources" ON storage.objects FOR SELECT USING (bucket_id = 'resources');
  END IF;

  -- Avatars: Public Read, Owner Manage
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Access to Avatars' AND tablename = 'objects' AND schemaname = 'storage') THEN
    CREATE POLICY "Public Access to Avatars" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users manage own avatars' AND tablename = 'objects' AND schemaname = 'storage') THEN
    CREATE POLICY "Users manage own avatars" ON storage.objects FOR ALL USING (
      bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
    );
  END IF;
END $$;

-- =========================
-- 6) Resource Library
-- =========================
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL, -- 'audio' or 'pdf'
  duration TEXT, -- For audio
  storage_path TEXT NOT NULL, -- Path in 'resources' bucket
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated view resources' AND tablename = 'resources') THEN
    CREATE POLICY "Authenticated view resources" ON public.resources FOR SELECT USING (auth.uid() IS NOT NULL);
  END IF;
END $$;

-- =========================
-- 7) Moderation & Safety
-- =========================
-- Add soft delete to reflections
ALTER TABLE public.reflections ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT FALSE;

-- Reports table for community moderation
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reflection_id UUID REFERENCES public.reflections(id) ON DELETE CASCADE,
  reporter_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can report' AND tablename = 'reports') THEN
    CREATE POLICY "Authenticated users can report" ON public.reports FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
  END IF;
END $$;
