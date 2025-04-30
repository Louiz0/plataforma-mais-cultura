const SUPABASE_URL = 'https://buwppzkjtkxhieggcwuv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1d3BwemtqdGt4aGllZ2djd3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNjgwNDksImV4cCI6MjA2MDg0NDA0OX0.gFVrzw-pJ4ogws8oDOJJ86DgWo5_MVgNYkbUPizVqug';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('register-button')?.addEventListener('click', async () => {
    const getName = document.getElementById('user-name-register-input').value;
    const getEmail = document.getElementById('user-email-register-input').value;
    const getPassword = document.getElementById('user-password-register-input').value;

    const { error } = await supabaseClient
        .from('ongs')
        .insert({ name: getName, email: getEmail, password: getPassword });

    if (error) {
        alert('Erro ao registrar: ' + error.message);
    } else {
        alert('Registrado com sucesso! Efetue novo login.');
        window.location.href = 'index.html';
    }
});

document.getElementById('login-button').addEventListener('click', async () => {
    const getEmail = document.getElementById('user-email-input').value;
    const getPassword = document.getElementById('user-password-input').value;

    const { data, error } = await supabaseClient
    .from('ongs')
    .select('*')
    .eq('email', getEmail)
    .eq('password', getPassword)
    .single();

    if (data) {
        alert("Login realizado com sucesso");
        window.location.href = 'main-page.html';
    } else {
        alert('Erro ao realizar o login: ' + (error ? error.message : 'Usuário ou senha incorretos.'));
}
});