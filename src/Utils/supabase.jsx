import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lbtsbocemahbdavnlodi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxidHNib2NlbWFoYmRhdm5sb2RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4MzM3NzYsImV4cCI6MjAxMjQwOTc3Nn0.E6DkrTeqEvJdZf-LJN9OzuQ2RfEiPGvU-73BydwQZJM";
const db_schema = "mc_dev";
const supabase = createClient(supabaseUrl, supabaseKey, db_schema);

export const auth = supabase.auth;
