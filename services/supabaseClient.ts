
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

/**
 * SETUP INSTRUCTIONS:
 * 1. Create a project at supabase.com
 * 2. Go to Project Settings -> API
 * 3. Replace the strings below with your actual 'Project URL' and 'anon/public' Key.
 */
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseAnonKey = 'your-anon-public-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
