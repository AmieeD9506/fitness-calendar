import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nneyyaoadlqmldkhdayc.supabase.co';
const supabaseAnonKey = 'sb_publishable_WTwodik7ZGRCaysu6WBnxw_xiPYgGhv';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);