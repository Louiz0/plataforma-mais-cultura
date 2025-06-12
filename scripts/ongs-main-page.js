window.onload = () => {
    const postForm = document.querySelector('.new-post-frame');
    const header = document.querySelector('header');
    const pageMain = document.querySelector('.page-main');

    window.showPostForm = function () {
        postForm.style.display = 'block';
        header.style.filter = 'blur(0.3rem)';
        pageMain.style.filter = 'blur(0.3rem)';
    }
}