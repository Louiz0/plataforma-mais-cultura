window.appConfig = { 
  SUPABASE_URL: 'SUA_URL_AQUI',
  SUPABASE_ANON_KEY: 'SUA_ANON_KEY_AQUI'
};

const supabaseClient = supabase.createClient(
  window.appConfig.SUPABASE_URL,
  window.appConfig.SUPABASE_ANON_KEY
);