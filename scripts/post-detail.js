const SUPABASE_URL = 'https://buwppzkjtkxhieggcwuv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1d3BwemtqdGt4aGllZ2djd3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNjgwNDksImV4cCI6MjA2MDg0NDA0OX0.gFVrzw-pJ4ogws8oDOJJ86DgWo5_MVgNYkbUPizVqug'
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    const { data: post, error } = await supabaseClient
    .from('posts')
    .select('*')
    .eq('id', postId)
    .single();

    if (post) {
        document.getElementById('post-title').textContent = post.titulo;
        document.getElementById('post-description').textContent = post.descricao;
        if (post.url_imagem) {
            document.getElementById('post-image').src = post.url_imagem;
        }
    }
});