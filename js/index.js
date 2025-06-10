const cursor = document.querySelector(".cursor");
let mouseX = 0,
  mouseY = 0;
let currentX = 0,
  currentY = 0;
const speed = 0.5;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  currentX += (mouseX - currentX) * speed;
  currentY += (mouseY - currentY) * speed;

  cursor.style.top = `${currentY}px`;
  cursor.style.left = `${currentX}px`;

  requestAnimationFrame(animate);
}

animate();

// Highlight nav + fade sections
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".side-nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop <= 50) {
      current = section.getAttribute("id");
    }

    if (scrollY + window.innerHeight >= section.offsetTop + 100) {
      section.classList.add("visible");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });

  const scrollToTop = document.getElementById("scrollToTop");
  scrollToTop.style.display = window.scrollY > 300 ? "flex" : "none";
});

// Cursor scale on nav hover
navLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1.3)";
    cursor.style.boxShadow = "0 0 12px rgba(255, 255, 255, 0.6)";
  });

  link.addEventListener("mouseleave", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
    cursor.style.boxShadow = "0 0 8px rgba(255, 255, 255, 0.3)";
  });
});

// Hero text typing animation
// const heroText = document.getElementById("hero-text");
// const phrases = [
//   "Hello, I am Faiz Leman.",
//   "Hai, saya Faiz Leman.",
//   "你好，我是 Faiz Leman。",
//   "வணக்கம், நான் Faiz Leman.",
// ];

// let phraseIndex = 0;
// let charIndex = 0;
// let isDeleting = false;
// let typingSpeed = 100;
// let pauseTime = 2000;

// function type() {
//   const currentPhrase = phrases[phraseIndex];
//   if (isDeleting) {
//     charIndex--;
//   } else {
//     charIndex++;
//   }

//   heroText.textContent = currentPhrase.substring(0, charIndex);

//   if (!isDeleting && charIndex === currentPhrase.length) {
//     setTimeout(() => {
//       isDeleting = true;
//       type();
//     }, pauseTime);
//     return;
//   } else if (isDeleting && charIndex === 0) {
//     isDeleting = false;
//     phraseIndex = (phraseIndex + 1) % phrases.length;
//   }

//   const delay = isDeleting ? typingSpeed / 2 : typingSpeed;
//   setTimeout(type, delay);
// }

// type();

// Scroll to top button
const scrollToTopBtn = document.getElementById("scrollToTop");
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Theme toggle switch
const themeToggle = document.getElementById("themeToggle");
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");
const logoImg = document.getElementById("logo-img");

// Function to update logo based on theme
function updateLogo() {
  if (!logoImg) return;
  if (document.body.classList.contains("light")) {
    logoImg.src = "assets/img/logo-small-dark.png";
  } else {
    logoImg.src = "assets/img/logo-small-light.png";
  }
}

// Set initial state based on body class
if (document.body.classList.contains("light")) {
  themeToggle.checked = true;
  updateLogo();
} else {
  themeToggle.checked = false;
  updateLogo();
}

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("light");
  updateLogo();
});

// Mobile scrollspy update
const mobileScrollSpy = document.getElementById("mobile-scrollspy");
const mobileLogoImg = document.getElementById("mobile-logo-img");
const mobileThemeToggle = document.getElementById("mobileThemeToggle");
const mobileSunIcon = document.getElementById("mobileSunIcon");
const mobileMoonIcon = document.getElementById("mobileMoonIcon");

function updateMobileScrollSpy(current) {
  if (!mobileScrollSpy) return;
  if (current === "about") mobileScrollSpy.textContent = "About";
  else if (current === "experience") mobileScrollSpy.textContent = "Experience";
  else if (current === "project") mobileScrollSpy.textContent = "Project";
  else mobileScrollSpy.textContent = "";
}

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop <= 50) {
      current = section.getAttribute("id");
    }

    if (scrollY + window.innerHeight >= section.offsetTop + 100) {
      section.classList.add("visible");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });

  updateMobileScrollSpy(current);

  const scrollToTop = document.getElementById("scrollToTop");
  scrollToTop.style.display = window.scrollY > 300 ? "flex" : "none";
});

// Mobile theme toggle logic
function updateMobileLogo() {
  if (!mobileLogoImg) return;
  if (document.body.classList.contains("light")) {
    mobileLogoImg.src = "assets/img/logo-small-dark.png";
  } else {
    mobileLogoImg.src = "assets/img/logo-small-light.png";
  }
}

if (document.body.classList.contains("light")) {
  if (mobileThemeToggle) mobileThemeToggle.checked = true;
  updateMobileLogo();
} else {
  if (mobileThemeToggle) mobileThemeToggle.checked = false;
  updateMobileLogo();
}

if (mobileThemeToggle) {
  mobileThemeToggle.addEventListener("change", () => {
    document.body.classList.toggle("light");
    updateLogo();
    updateMobileLogo();
  });
}
