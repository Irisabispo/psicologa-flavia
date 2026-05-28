// essas são as configurações gerais
const CONFIG = {
    whatsapp: '5567999682209',
    email:    'flavia_custodia@hotmail.com',
    instagram:'psicologa_flavia_custodio'
};

// NAVBAR
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Menu mobile
const menuToggle = document.getElementById('menuToggle');
const navMenu    = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
});

// BOTÕES HERO 
const btnAgendar = document.getElementById('btnAgendar');
btnAgendar.addEventListener('click', () => {
    document.getElementById('contato').scrollIntoView({ behavior: 'smooth' });
});

const btnSaberMais = document.getElementById('btnSaberMais');
btnSaberMais.addEventListener('click', () => {
    const mensagem = encodeURIComponent(
        'Olá Flávia! Vim pelo seu site e gostaria de saber mais sobre os atendimentos. 💜'
    );
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${mensagem}`, '_blank');
});

// FORMULÁRIO
const form        = document.getElementById('formAgendamento');
const formFeedback = document.getElementById('formFeedback');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const dados = {
        nome:       document.getElementById('nome').value.trim(),
        email:      document.getElementById('email').value.trim(),
        telefone:   document.getElementById('telefone').value.trim(),
        modalidade: document.getElementById('modalidade').value,
        mensagem:   document.getElementById('mensagem').value.trim(),
    };

    if (!dados.nome || !dados.email || !dados.telefone || !dados.modalidade) {
        showFeedback('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }

    if (!validarEmail(dados.email)) {
        showFeedback('Por favor, insira um e-mail válido.', 'error');
        return;
    }

    enviarViaWhatsApp(dados);
    showFeedback('Solicitação enviada! Em breve entraremos em contato. 💜', 'success');
    form.reset();
});

function enviarViaWhatsApp(dados) {
    const texto = encodeURIComponent(
        `*Nova solicitação de agendamento*\n\n` +
        `👤 *Nome:* ${dados.nome}\n` +
        `📧 *E-mail:* ${dados.email}\n` +
        `📱 *Telefone:* ${dados.telefone}\n` +
        `💻 *Modalidade:* ${dados.modalidade}\n` +
        (dados.mensagem ? `📝 *Mensagem:* ${dados.mensagem}\n` : '')
    );
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${texto}`, '_blank');
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showFeedback(mensagem, tipo) {
    formFeedback.textContent = mensagem;
    formFeedback.className = `form-feedback ${tipo}`;

    setTimeout(() => {
        formFeedback.className = 'form-feedback';
        formFeedback.textContent = '';
    }, 5000);
}

//FOOTER
document.getElementById('anoAtual').textContent = new Date().getFullYear();

//MÁSCARA DE TELEFONE 
const telefoneInput = document.getElementById('telefone');
telefoneInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 10) {
        v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (v.length > 6) {
        v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (v.length > 2) {
        v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    }
    e.target.value = v;
});
