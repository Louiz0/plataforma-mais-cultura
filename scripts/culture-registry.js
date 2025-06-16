const SUPABASE_URL = 'https://buwppzkjtkxhieggcwuv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1d3BwemtqdGt4aGllZ2djd3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNjgwNDksImV4cCI6MjA2MDg0NDA0OX0.gFVrzw-pJ4ogws8oDOJJ86DgWo5_MVgNYkbUPizVqug'
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('create-post-button')?.addEventListener('click', async () => {
    const getTitle = document.getElementById('new-post-frame-title').value;
    const getDescription = document.getElementById('new-post-frame-description-textarea').value;
    const getImage = document.getElementById('new-post-frame-image').files[0];

    const fileName = `${Date.now()}-${getImage.name}`;
    const { data: uploadData, error: uploadError } = await supabaseClient
        .storage
        .from('cultura-bucket')
        .upload(fileName, getImage)

        if (uploadError) {
            alert("Erro ao importar imagem" + uploadError.message);
        }

        const { data: urlData} = await supabaseClient
            .storage
            .from('cultura-bucket')
            .getPublicUrl(fileName);

        imageUrl = urlData.publicUrl;

    const { data: newPost, error } = await supabaseClient
        .from('posts')
        .insert({
            titulo: getTitle,
            descricao: getDescription,
            url_imagem: imageUrl
        })
        .select('*')
        .single();
    if (error) {
        alert('Erro' + error.message);
    } else {
        alert('Cadastrado com sucesso');
        loadPosts();
    }
});

async function loadPosts() {
    const { data: posts, error} = await supabaseClient
        .from('posts')
        .select('id, titulo, descricao, url_imagem')
    
    if (error) {
        alert('Erro ao carregas posts motivo: ' + error);
        return;
    }

    const pageMain = document.querySelector('.page-main');
    pageMain.innerHTML = '';

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'div-post';

        const imageHTML = post.url_imagem ? `<img src="${post.url_imagem}" alt="${post.titulo}"` : "";

        postDiv.innerHTML = `
            ${imageHTML}
            <h3><a href="post-detail.html?id=${post.id}">${post.titulo}</a></h3>
            <p>${post.descricao.substring(0, 30)}...</p>
        `;
        pageMain.appendChild(postDiv);
    });
}

window.addEventListener('DOMContentLoaded', loadPosts);