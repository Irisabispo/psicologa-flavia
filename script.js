// essas são as configurações gerais
const CONFIG = {
  whatsapp: "5567999682209",
  email: "flavia_custodia@hotmail.com",
  instagram: "psicologa_flavia_custodio",
};

// navbar
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Menu mobile
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.setAttribute("aria-expanded", "false");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    const expanded = navMenu.classList.contains("active");
    menuToggle.setAttribute("aria-expanded", expanded);
  })

// Fechar menu com ESC e também para melhorar a acessibilidade, permitindo que o usuário feche o menu usando a tecla ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        navMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  // esse fecha o menu quando o usuário clica em um link, melhora a experiência em dispositivos móveis
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});
}

// Botões da hero
const btnAgendar = document.getElementById("btnAgendar");

if (btnAgendar) {
  //também acrescentei essa verificação para evitar erros caso o elemento não exista
  btnAgendar.addEventListener("click", () => {
    document.getElementById("contato").scrollIntoView({ behavior: "smooth" });
  });
}

const btnSaberMais = document.getElementById("btnSaberMais");
if (btnSaberMais) {
  // e acrescentei essa verificação para evitar erros caso o elemento não exista
  btnSaberMais.addEventListener("click", () => {
    const mensagem = encodeURIComponent(
      "Olá Flávia! Vim pelo seu site e gostaria de saber mais sobre os atendimentos. 💜",
    );
    window.open(
      `https://wa.me/${CONFIG.whatsapp}?text=${mensagem}`,
      "_blank",
      "noopener,noreferrer",
    );
  });
}

// Formulário
const form = document.getElementById("formAgendamento");
const formFeedback = document.getElementById("formFeedback");
if (form) {
  // e mais essa verificação para evitar erros caso o elemento não exista
  form.addEventListener("submit", (e) => {
    e.preventDefault();
// Honeypot para evitar spam, um muro baixo
const website = document.getElementById("website");
// Se o campo "website" tiver algum valor, é provável que seja um bot, então não processamos o formulário
if (website && website.value.trim() !== "") {
  return;
}
//até aqui o honeypot
// Coletando os dados do formulário
    const dados = {
      nome: document.getElementById("nome").value.trim(),
      email: document.getElementById("email").value.trim(),
      telefone: document.getElementById("telefone").value.trim(),
      modalidade: document.getElementById("modalidade").value,
      mensagem: document.getElementById("mensagem").value.trim(),
    };
// Validação básica dos campos 
    if (!dados.nome || !dados.email || !dados.telefone || !dados.modalidade) {
      showFeedback(
        "Por favor, preencha todos os campos obrigatórios.",
        "error",
      );
      return;
    }
// Validação de e-mail e telefone mais robusta, para garantir que os dados sejam válidos antes de enviar para o WhatsApp
if (!validarEmail(dados.email)) {
  showFeedback("Por favor, insira um e-mail válido.", "error");
  return;
}
if (!validarNome(dados.nome)) {
  showFeedback(
    "Informe nome e sobrenome usando apenas letras.",
    "error"
  );
  return;
}

if (!validarTelefone(dados.telefone)) {
  showFeedback(
    "Informe um celular válido com DDD.",
    "error"
  );
  return;
}

enviarViaWhatsApp(dados);
showFeedback(
      "Solicitação enviada! Em breve entraremos em contato.",
      "success",
    );
    form.reset();
  });
} //fechando o if do (form)

function enviarViaWhatsApp(dados) {
  const texto = encodeURIComponent(
    `*Nova solicitação de agendamento*\n\n` +
      `👤 *Nome:* ${dados.nome}\n` +
      `📧 *E-mail:* ${dados.email}\n` +
      `📱 *Telefone:* ${dados.telefone}\n` +
      `💻 *Modalidade:* ${dados.modalidade}\n` +
      (dados.mensagem ? `📝 *Mensagem:* ${dados.mensagem}\n` : ""),
  );
  window.open(
    `https://wa.me/${CONFIG.whatsapp}?text=${texto}`,
    "_blank",
    "noopener,noreferrer",
  );
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarNome(nome) {
  const nomeLimpo = nome.trim();
  const palavras = nomeLimpo.split(/\s+/);

if (palavras.length < 2) {
  return false;
}
//para garantir que tenha nome e sobrenome, e que tenha apenas letras, acentos e espaços
//o regex permite letras maiúsculas e minúsculas, nomes com hífen ou apóstrofo
  const regex = /^[A-Za-zÀ-ÿ]+(?:[ '-][A-Za-zÀ-ÿ]+)*$/;

  return regex.test(nomeLimpo);
}

function validarTelefone(telefone) {
  const numeros = telefone.replace(/\D/g, "");

  // celular brasileiro: 11 dígitos
  if (numeros.length !== 11) {
    return false;
  }

  // DDD + 9 + 8 dígitos
  const regex = /^[1-9]{2}9\d{8}$/;

  return regex.test(numeros);
}



function showFeedback(mensagem, tipo) {
  formFeedback.textContent = mensagem;
  formFeedback.className = `form-feedback ${tipo}`;

  setTimeout(() => {
    formFeedback.className = "form-feedback";
    formFeedback.textContent = "";
  }, 5000);
}

//Footer
const anoAtual = document.getElementById("anoAtual");

if (anoAtual) {
  anoAtual.textContent = new Date().getFullYear();
}

//Máscara de telefone,
const telefoneInput = document.getElementById("telefone");

if (telefoneInput) {
  telefoneInput.addEventListener("input", (e) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 10) {
      v = v.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (v.length > 6) {
      v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else if (v.length > 2) {
      v = v.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    }
    e.target.value = v;
  });
}
