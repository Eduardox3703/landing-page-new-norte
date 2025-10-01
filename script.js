// Smooth scrolling para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerOffset = 80
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Cerrar menú móvil si está abierto
      const nav = document.getElementById("nav")
      const mobileMenuBtn = document.getElementById("mobileMenuBtn")
      if (nav.classList.contains("active")) {
        nav.classList.remove("active")
        mobileMenuBtn.classList.remove("active")
      }
    }
  })
})

// Header scroll effect
const header = document.getElementById("header")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const nav = document.getElementById("nav")

mobileMenuBtn.addEventListener("click", () => {
  mobileMenuBtn.classList.toggle("active")
  nav.classList.toggle("active")
})

// Cerrar menú móvil al hacer clic fuera
document.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    nav.classList.remove("active")
    mobileMenuBtn.classList.remove("active")
  }
})

// Form submission
const contactForm = document.getElementById("contactForm")
const successMessage = document.getElementById("successMessage")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Aquí normalmente enviarías los datos a un servidor
  // Por ahora solo mostramos el mensaje de éxito

  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")

  console.log("[v0] Form submitted:", { name, email })

  // Mostrar mensaje de éxito
  successMessage.classList.add("show")
  contactForm.reset()

  // Ocultar mensaje después de 5 segundos
  setTimeout(() => {
    successMessage.classList.remove("show")
  }, 5000)
})

// Intersection Observer para animaciones al hacer scroll
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

// Observar elementos para animaciones
document.querySelectorAll(".music-card, .video-card, .date-item").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out"
  observer.observe(el)
})

// Parallax effect para el hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  if (hero) {
    hero.style.backgroundPositionY = scrolled * 0.5 + "px"
  }
})
