// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nvekxdkdndvxmjatjwqg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52ZWt4ZGtkbmR2eG1qYXRqd3FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4ODg0NjUsImV4cCI6MjA1OTQ2NDQ2NX0.6HmGNx0PwpSIxgdvwJsUluT6dC8_Sy6NyaFltzLs-6Q";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);