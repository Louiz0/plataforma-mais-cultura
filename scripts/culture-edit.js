document.getElementById('edit-post-button')?.addEventListener('click', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    const getTitle = document.getElementById('edit-post-frame-title').value;
    const getDescription = document.getElementById('edit-post-frame-description-textarea').value;
    const getCity = document.getElementById('edit-post-frame-city').value;
    const getDate = document.getElementById('edit-post-frame-date').value;
    const ongId = localStorage.getItem('ong_id');

    if (!getTitle || !getDescription || !getCity || !getDate) {
        notifications.show("Por favor, preencha todos os campos obrigatórios!", "warning");
        return;
    }

    if (!ongId) {
        notifications.show("ONG não identificada, visitantes não podem criar posts!", "warning");
        return;
    }

    const dateToday = new Date();
    const day = String(dateToday.getDate()).padStart(2, '0');
    const month = String(dateToday.getMonth() + 1).padStart(2, '0');
    const year = dateToday.getFullYear();
    const formatado = `${year}-${month}-${day}`;

    if (formatado > getDate) {
        notifications.show("A data não pode ser passada.");
        return;
    }

    const { error } = await supabaseClient
        .from('posts')
        .update({
            titulo: getTitle,
            descricao: getDescription,
            cidade: getCity,
            data: getDate
        })
        .eq('id', postId);
    if (error) {
        notifications.show('Erro ao editar a postagem, motivo: ' + error.message, 'error');
    } else {
        notifications.show('Postagem editada com sucesso!', 'success');
        window.location.reload();
    }
});

document.getElementById('edit-post-frame-delete-button')?.addEventListener('click', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    const { error } = await supabaseClient
        .from('posts')
        .delete()
        .eq('id', postId);

    if (error) {
        notifications.show('Erro ao excluir postagem, motivo: ' + error.message, 'error');
    } else {
        notifications.show('Postagem excluida com sucesso!', 'success');
        window.location.href = 'ongs-main-page.html';
    }
});

function editPost(postId) {
    editPostFrame.style.display = 'block';
    header.style.filter = 'blur(0.3rem)';
    pageMain.style.filter = 'blur(0.3rem)';

    document.getElementById('edit-post-frame-title').value = currentPost.titulo;
    document.getElementById('edit-post-frame-description-textarea').value = currentPost.descricao;
    document.getElementById('edit-post-frame-city').value = currentPost.cidade;

    const dateObj = new Date(currentPost.data);
    const formattedDate = dateObj.toISOString().split('T')[0];
    document.getElementById('edit-post-frame-date').value = formattedDate;
}