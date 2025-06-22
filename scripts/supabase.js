const supabaseClient = supabase.createClient(
    window.appConfig.SUPABASE_URL,
    window.appConfig.SUPABASE_ANON_KEY
);