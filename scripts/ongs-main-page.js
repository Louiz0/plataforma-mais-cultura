window.onload = () => {
    const postForm = document.querySelector('.new-post-frame');
    const header = document.querySelector('header');
    const pageMain = document.querySelector('.page-main');
    const postButton = document.querySelector('#new-ong-post-button');

    const urlParams = new URLSearchParams(window.location.search);
    const userType = urlParams.get('user');

    if (userType === 'guest') {
        postButton.style.display = 'none';
    }

    window.showPostForm = function () {
        postForm.style.display = 'block';
        header.style.filter = 'blur(0.3rem)';
        pageMain.style.filter = 'blur(0.3rem)';
    }

}