const SUPABASE_URL = 'https://buwppzkjtkxhieggcwuv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1d3BwemtqdGt4aGllZ2djd3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNjgwNDksImV4cCI6MjA2MDg0NDA0OX0.gFVrzw-pJ4ogws8oDOJJ86DgWo5_MVgNYkbUPizVqug';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Registro
    document.getElementById('register-button')?.addEventListener('click', async () => {
        const email = document.getElementById('user-email-register-input').value;
        const password = document.getElementById('user-password-register-input').value;
      
        const { data, error } = await supabaseClient.auth.signUp({ 
            email, 
            password 
        });
      
        if (error) {
            alert('Erro ao registrar: ' + error.message);
        } else {
            alert('Registrado com sucesso! Efetue novo login.');
            window.location.href = 'index.html';
        }
    });

    document.getElementById('login-button')?.addEventListener('click', async () => {
        const email = document.getElementById('user-email-input').value;
        const password = document.getElementById('user-password-input').value;
      
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });
      
        if (error) {
            alert('Erro ao fazer login: ' + error.message);
        } else {
            window.location.href = 'main-page.html';
        }
    });