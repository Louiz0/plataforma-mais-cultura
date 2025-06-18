const SUPABASE_URL = 'https://buwppzkjtkxhieggcwuv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1d3BwemtqdGt4aGllZ2djd3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNjgwNDksImV4cCI6MjA2MDg0NDA0OX0.gFVrzw-pJ4ogws8oDOJJ86DgWo5_MVgNYkbUPizVqug';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', async function() {
    const ongId = localStorage.getItem('ong_id');
    if (!ongId) {
        notifications.show("Você precisa estar logado para acessar esta página", "error");
        setTimeout(() => window.location.href = 'index.html', 2000);
        return;
    }

    await loadCurrentONGData();

    const form = document.querySelector('.login-form');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        await updateONGProfile();
    });

    const logoffBtn = document.querySelector('.logoff-btn');
    logoffBtn.addEventListener('click', performLogoff);
});

async function loadCurrentONGData() {
    const ongId = localStorage.getItem('ong_id');
    
    try {
        const { data: ongData, error } = await supabaseClient
            .from('ongs')
            .select('name, email, cnpj')
            .eq('id', ongId)
            .single();

        if (error) throw error;

        if (ongData) {
            document.getElementById('nome').value = ongData.name;
            document.getElementById('email').value = ongData.email;
        }
    } catch (error) {
        notifications.show("Erro ao carregar dados da ONG: " + error.message, "error");
        console.error("Error loading ONG data:", error);
    }
}

async function updateONGProfile() {
    const ongId = localStorage.getItem('ong_id');
    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;
    const email = document.getElementById('email').value;

    if (!nome || !email) {
        notifications.show("Por favor, preencha todos os campos obrigatórios", "error");
        return;
    }

    if (!validateEmail(email)) {
        notifications.show("Por favor, insira um e-mail válido", "error");
        return;
    }

    const updateData = {
        name: nome,
        email: email
    };

    if (senha) {
        updateData.password = senha;
    }

    try {
        if (email !== document.getElementById('email').defaultValue) {
            const { data: emailExists, error: emailError } = await supabaseClient
                .from('ongs')
                .select('id')
                .eq('email', email)
                .neq('id', ongId)
                .maybeSingle();

            if (emailError) throw emailError;
            if (emailExists) {
                notifications.show("Este e-mail já está em uso por outra ONG", "warning");
                return;
            }
        }

        const { error } = await supabaseClient
            .from('ongs')
            .update(updateData)
            .eq('id', ongId);

        if (error) throw error;

        notifications.show("Perfil atualizado com sucesso!", "success");

        document.getElementById('senha').value = '';
        
        document.getElementById('email').defaultValue = email;

    } catch (error) {
        notifications.show("Erro ao atualizar perfil: " + error.message, "error");
        console.error("Error updating ONG profile:", error);
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function performLogoff() {
    localStorage.removeItem('ong_id');

    notifications.show("Você foi desconectado com sucesso", "success");
    setTimeout(() => window.location.href = 'index.html', 1500);
}
