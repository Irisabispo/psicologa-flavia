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


//Footer
const anoAtual = document.getElementById("anoAtual");

if (anoAtual) {
  anoAtual.textContent = new Date().getFullYear();
}



document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // anima só uma vez
      }
    });
  }, {
    threshold: 0.15, // dispara quando 15% do elemento aparece
    rootMargin: '0px 0px -50px 0px' // antecipa um pouco antes de chegar no fim da tela
  });

  revealElements.forEach((el) => observer.observe(el));
});


// FAQ - ACCORDION

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            // Fecha todos os itens
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Se não estava ativo, abre
            if (!isActive) {
                item.classList.add('active');
                item.querySelector('.faq-question').setAttribute('aria-expanded', 'true');
            }
        });
    });
});