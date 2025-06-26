let currentPost = null;
const editPostFrame = document.querySelector('.edit-post-frame');
const eventContainer = document.querySelector('#event-container');
const postContainerRight = document.querySelector('#post-container-right');
const header = document.querySelector('.page-header');
const pageMain = document.querySelector('.post-container');
const contactContainer = document.querySelector('#contact-container');

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
        const formattedDescription = post.descricao.replace(/\n/g, '<br>');
        document.getElementById('post-description').innerHTML = formattedDescription;
        
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

    const { data: ong } = await supabaseClient
    .from('ongs')
    .select('name, email')
    .eq('id', currentPost.ong_id)
    .single();

    const contactUpperContainer = document.querySelector('#contact-upper-container');

    const postContactDiv = document.createElement('contact-div');
    postContactDiv.classname = 'contact-div-post';
    postContactDiv.innerHTML = `
        <h4>ONG:</h4>
        <p>${ong.name}</p>
        <h4>E-mail</h4>
        <p>${ong.email}</p>
    `;
    contactUpperContainer.appendChild(postContactDiv);
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

    window.showContactContainer = function () {
        contactContainer.style.display = 'flex';
        postContainerRight.style.display = 'none';
    }

    window.closeContactContainer = function () {
        contactContainer.style.display = 'none';
        postContainerRight.style.display = 'flex';
    }

    window.photoPageRedirect = function () {
        window.location.href = 'photos.html';
    }

    window.closePostFrame = function () {
        editPostFrame.style.display = 'none';
        header.style.filter = 'blur(0)';
        pageMain.style.filter = 'blur(0)';
    }
}