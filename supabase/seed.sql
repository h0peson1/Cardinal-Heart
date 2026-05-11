-- NOTE: This seed script assumes you have at least one user in auth.users.
-- You can run this AFTER signing up for the first time.
-- Replace 'YOUR_USER_ID' with your actual UUID from the profiles table.

/*
INSERT INTO public.reflections (author_id, content, category, mood, is_anonymous)
VALUES 
  ('YOUR_USER_ID', 'Found peace in the redwoods today. Nature is the best medicine.', 'Mindfulness', 'Calm', true),
  ('YOUR_USER_ID', 'Grateful for the support system at Stanford. You are never alone.', 'Support', 'Grateful', true),
  ('YOUR_USER_ID', 'Academic stress is real, but taking it one breath at a time.', 'Mindfulness', 'Anxious', true);
*/

-- Example data that doesn't require a valid author_id for initial UI testing (if RLS allows)
-- But since we have RLS, it's better to sign up and then insert.
