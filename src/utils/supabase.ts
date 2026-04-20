import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nneyyaoadlqmldkhdayc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uZXl5YW9hZGxxbWxka2hkYXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxMjAzNzEsImV4cCI6MjA5MDY5NjM3MX0.KhcgqcTRSli-EuhNwBqe_UG1I9-sQXIlCUVH5vT2Cxc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);