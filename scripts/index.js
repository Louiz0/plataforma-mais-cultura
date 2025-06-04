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

    window.showInitialOptions = function () {
        initialOptions.style.display = 'block';
        registerForm.style.display = 'none';
        loginForm.style.display = 'none';
    }
};

const logos = document.querySelectorAll('#moving-logo');

logos.forEach(logo => {
    animateLogo(logo);
});

function animateLogo(logo) {
    const speed = 5000 + Math.random() * 10000; // 4 a 8 seg
    const maxX = window.innerWidth;
    const maxY = window.innerHeight;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    logo.style.transition = `transform ${speed}ms linear`;
    logo.style.transform = `translate(${newX}px, ${newY}px)`;

    setTimeout(() => animateLogo(logo), speed);
}

window.addEventListener('resize', () => {
    logos.forEach(logo => animateLogo(logo));
});
