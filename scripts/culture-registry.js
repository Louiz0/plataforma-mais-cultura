const SUPABASE_URL = 'https://buwppzkjtkxhieggcwuv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1d3BwemtqdGt4aGllZ2djd3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNjgwNDksImV4cCI6MjA2MDg0NDA0OX0.gFVrzw-pJ4ogws8oDOJJ86DgWo5_MVgNYkbUPizVqug'
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('create-post-button')?.addEventListener('click', async () => {
    const getTitle = document.getElementById('new-post-frame-title').value;
    const getDescription = document.getElementById('new-post-frame-description-textarea').value;
    const getImage = document.getElementById('new-post-frame-image').files[0];
    const getCity = document.getElementById('new-post-frame-city').value;
    const getDate = document.getElementById('new-post-frame-date').value;
    const ongId = localStorage.getItem('ong_id');

    if (!getTitle || !getDescription || !getImage || !getCity || !getDate) {
        notifications.show("Por favor, preencha todos os campos obrigatórios!", "warning");
        return;
    }

    if (!ongId) {
        notifications.show("ONG não identificada, visitantes não podem criar posts!", "warning");
        return;
    }

    const MAX_FILE_SIZE = 4 * 1024 * 1024;
    if (getImage.size > MAX_FILE_SIZE) {
        notifications.show("O tamanho da imagem não pode exceder 4MB!", "error");
        return;
    }

    const originalFileName = getImage.name;
    const validFileNameRegex = /^[a-zA-Z0-9_.-]+$/;
    
    if (!validFileNameRegex.test(originalFileName)) {
        notifications.show("O nome do arquivo não pode conter espaços ou caracteres especiais!", "error");
        return;
    }

    const fileName = `${Date.now()}-${getImage.name}`;
    const { data: uploadData, error: uploadError } = await supabaseClient
        .storage
        .from('cultura-bucket')
        .upload(fileName, getImage)

        if (uploadError) {
            notifications.show("Erro ao importar imagem, motivo: " + uploadError.message, "error");
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
            url_imagem: imageUrl,
            cidade: getCity,
            data: getDate,
            ong_id: ongId
        })
        .select('*')
        .single();
    if (error) {
        notifications.show("Erro ao criar posts, motivo: " + error.message, "error");
    } else {
        notifications.show("Post criado com sucesso!", "success");
        closePostForm();
        loadPosts();
    }
});

async function loadPosts() {
    const { data: posts, error} = await supabaseClient
        .from('posts')
        .select('id, titulo, descricao, url_imagem')
    
    if (error) {
        notifications.show('Erro ao carregar posts, motivo: ' + error, "error");
        return;
    }

    const pageMain = document.querySelector('.page-main');
    pageMain.innerHTML = '';

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'div-post';

        const imageHTML = post.url_imagem ? `<img src="${post.url_imagem}" alt="${post.titulo}"` : "";

        postDiv.innerHTML = ` <a href="post-detail.html?id=${post.id}">
            ${imageHTML}
            <h3>${post.titulo}</h3>
            <p>${post.descricao.substring(0, 25)}...</p> </a>
        `;
        pageMain.appendChild(postDiv);
    });
}

window.addEventListener('DOMContentLoaded', loadPosts);