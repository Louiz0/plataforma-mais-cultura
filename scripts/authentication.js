const SUPABASE_URL = 'https://buwppzkjtkxhieggcwuv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1d3BwemtqdGt4aGllZ2djd3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNjgwNDksImV4cCI6MjA2MDg0NDA0OX0.gFVrzw-pJ4ogws8oDOJJ86DgWo5_MVgNYkbUPizVqug'
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function cnpjValidation(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)){
        return false;
    }

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;

        if (pos < 2) {
            pos = 9;
        }
    }
    
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) {
        return false;
    }

    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    if (resultado != digitos.charAt(1)) {
        return false;
    }

    return true;
}

document.getElementById('register-button')?.addEventListener('click', async () => {
    const getName = document.getElementById('user-name-register-input').value;
    const getEmail = document.getElementById('user-email-register-input').value;
    const getPassword = document.getElementById('user-password-register-input').value;
    const getCnpj = document.getElementById('user-cnpj-register-input').value

    if (!cnpjValidation(getCnpj)) {
        notifications.show("CNPJ digitado não é valido!", "warning");
        return;
    }    

    const { data: userAlreadyExists } = await supabaseClient
    .from('ongs')
    .select('email, cnpj')
    .or(`email.eq.${getEmail}, cnpj.eq.${getCnpj}`)
    .maybeSingle();

    if (userAlreadyExists) {
        if (userAlreadyExists.email === getEmail) {
            notifications.show("O e-mail inserido já está cadastrado.", "warning");
        } else {
            notifications.show("O CNPJ inserido já está cadastrado", "warning");
        }

        return
    }

    const { error } = await supabaseClient
        .from('ongs')
        .insert({ name: getName, email: getEmail, password: getPassword, cnpj: getCnpj });

    if (error) {
        notifications.show("Erro ao realizar o cadastro, motivo: " + error.message, "error");
    } else {
        notifications.show("ONG registrada com sucesso. Favor realizar o login!", "success");
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
        notifications.show("Login realizado com sucesso", "success");
        localStorage.setItem('ong_id', data.id);
        window.location.href = 'ongs-main-page.html';
    } else {
        notifications.show('Erro ao realizar o login: usuário ou senha incorretos.', "error");
    }
});