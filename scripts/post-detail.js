const SUPABASE_URL = 'https://buwppzkjtkxhieggcwuv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1d3BwemtqdGt4aGllZ2djd3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNjgwNDksImV4cCI6MjA2MDg0NDA0OX0.gFVrzw-pJ4ogws8oDOJJ86DgWo5_MVgNYkbUPizVqug'
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentPost = null;
const editPostFrame = document.querySelector('.new-post-frame');
const eventContainer = document.querySelector('#event-container');
const postContainerRight = document.querySelector('#post-container-right');
const postForm = document.querySelector('.new-post-frame');
const header = document.querySelector('.page-header');
const pageMain = document.querySelector('.post-container');

document.addEventListener('DOMContentLoaded', async () => {
    await loadPostData();
    loadInfo();
});

async function loadPostData() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    const { data: post, error } = await supabaseClient
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single();

    if (post) {
        currentPost = post;
        document.getElementById('post-title').textContent = post.titulo;
        document.getElementById('post-description').textContent = post.descricao;
        if (post.url_imagem) {
            document.getElementById('post-image').src = post.url_imagem;
        }

        const currentOngId = localStorage.getItem('ong_id');
        if (currentOngId && post.ong_id == currentOngId) {
            addEditButton(post.id);
        }
    }
}

function addEditButton(postId) {
    const postContainerRight = document.querySelector('#post-container-right');
    
    const editButton = document.createElement('button');
    editButton.textContent = 'EDITAR';
    editButton.className = 'edit-button';
    editButton.onclick = () => editPost(postId);
    
    const firstButton = postContainerRight.querySelector('button');
    if (firstButton) {
        postContainerRight.insertBefore(editButton, firstButton);
    } else {
        postContainerRight.appendChild(editButton);
    }
}

function editPost(postId) {
    editPostFrame.style.display = 'block';
    header.style.filter = 'blur(0.3rem)';
    pageMain.style.filter = 'blur(0.3rem)';
}

async function loadInfo() {
    if (!currentPost) return;
    
    const upperContainer = document.querySelector('#upper-container');

    const postDiv = document.createElement('div');
    postDiv.className = 'div-post';
    postDiv.innerHTML = `
        <h4>Cidade</h4> 
        <p>${currentPost.cidade}</p>
        <h4>Data</h4> 
        <p>${currentPost.data}</p>
    `;
    upperContainer.appendChild(postDiv);
}

window.onload = () => {
    window.showEventContainer = function () {
        eventContainer.style.display = 'flex';
        postContainerRight.style.display = 'none';
    }

    window.closeEventContainer = function () {
        eventContainer.style.display = 'none';
        postContainerRight.style.display = 'flex';
    }

    window.photoPageRedirect = function () {
        window.location.href = 'photos.html';
    }

    window.closePostForm = function () {
        postForm.style.display = 'none';
        header.style.filter = 'blur(0)';
        pageMain.style.filter = 'blur(0)';
    }
}