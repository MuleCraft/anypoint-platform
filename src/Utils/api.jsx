
import { createClient } from '@supabase/supabase-js'
const service_role_key = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
const supabase_url = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabase_url, service_role_key, supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

const adminAuthClient = supabase.auth.admin

export default adminAuthClient