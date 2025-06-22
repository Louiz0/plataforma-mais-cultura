window.appConfig = {
    SUPABASE_URL: 'https://buwppzkjtkxhieggcwuv.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1d3BwemtqdGt4aGllZ2djd3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNjgwNDksImV4cCI6MjA2MDg0NDA0OX0.gFVrzw-pJ4ogws8oDOJJ86DgWo5_MVgNYkbUPizVqug'
};

const supabaseurl = window.appConfig.SUPABASE_URL;
const supabaseanonkey = window.appConfig.SUPABASE_ANON_KEY;

const supabaseClient = supabase.createClient(supabaseurl, supabaseanonkey);