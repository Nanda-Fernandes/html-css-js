// Menu Toggle (Hambúrguer)
const menuToggle = document.getElementById("menuToggle")
const mainNav = document.getElementById("mainNav")
const navLinks = document.querySelectorAll(".nav-link")

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active")
  mainNav.classList.toggle("active")
})

// Fechar menu ao clicar em um link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active")
    mainNav.classList.remove("active")
  })
})

// Smooth Scrolling para links de navegação
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const headerHeight = document.querySelector(".header").offsetHeight
      const targetPosition = targetSection.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Calculadora de IMC
const imcForm = document.getElementById("imcForm")
const resultadoDiv = document.getElementById("resultado")
const valorIMCSpan = document.getElementById("valorIMC")
const classificacaoDiv = document.getElementById("classificacao")

imcForm.addEventListener("submit", (e) => {
  e.preventDefault()
  calcularIMC()
})

function calcularIMC() {
  // Obter valores dos inputs
  const peso = Number.parseFloat(document.getElementById("peso").value)
  const altura = Number.parseFloat(document.getElementById("altura").value)

  // Validação
  if (!peso || !altura || peso <= 0 || altura <= 0) {
    alert("Por favor, insira valores válidos para peso e altura.")
    return
  }

  if (altura > 3) {
    alert("A altura deve ser em metros (ex: 1.75).")
    return
  }

  // Calcular IMC
  const imc = peso / (altura * altura)
  const imcFormatado = imc.toFixed(1)

  // Classificar IMC
  let classificacao = ""
  let corFundo = ""

  if (imc < 18.5) {
    classificacao = "Abaixo do peso"
    corFundo = "#dbeafe" // blue-100
  } else if (imc >= 18.5 && imc < 25) {
    classificacao = "Peso normal"
    corFundo = "#d1fae5" // green-100
  } else if (imc >= 25 && imc < 30) {
    classificacao = "Sobrepeso"
    corFundo = "#fef3c7" // yellow-100
  } else if (imc >= 30 && imc < 35) {
    classificacao = "Obesidade Grau I"
    corFundo = "#fed7aa" // orange-100
  } else if (imc >= 35 && imc < 40) {
    classificacao = "Obesidade Grau II"
    corFundo = "#fecaca" // red-100
  } else {
    classificacao = "Obesidade Grau III"
    corFundo = "#fca5a5" // red-200
  }

  // Exibir resultado
  valorIMCSpan.textContent = imcFormatado
  classificacaoDiv.textContent = classificacao
  classificacaoDiv.style.backgroundColor = corFundo

  resultadoDiv.classList.remove("hidden")

  // Scroll suave até o resultado
  setTimeout(() => {
    resultadoDiv.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }, 100)
}

// Animação ao rolar a página (fade-in elements)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Aplicar animação aos cards
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".content-card, .food-card, .exercise-card, .stat-card")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Destacar link ativo no menu ao rolar
window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll(".section, .hero")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    const headerHeight = document.querySelector(".header").offsetHeight

    if (window.pageYOffset >= sectionTop - headerHeight - 100) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})
