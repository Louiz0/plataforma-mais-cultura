window.onload = () => {
    const initialOptions = document.querySelector('.initial-options');
    const loginForm = document.querySelector('.mainframe');
    const registerForm = document.querySelector('.register-frame');

    loginForm.style.display = 'none';
    registerForm.style.display = 'none';

    window.showLogin = function () {
        initialOptions.style.display = 'none';
        loginForm.style.display = 'block';
    }

    window.showRegister = function () {
        initialOptions.style.display = 'none';
        registerForm.style.display = 'block';
    }
};
