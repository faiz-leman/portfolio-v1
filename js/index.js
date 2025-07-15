const cursor = document.querySelector(".cursor");
let mouseX = 0,
  mouseY = 0;
let currentX = 0,
  currentY = 0;
const speed = 0.2;

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

const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".side-nav a, .social-links-row a");

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

const scrollToTopBtn = document.getElementById("scrollToTop");
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const themeToggle = document.getElementById("themeToggle");
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");
const logoImg = document.getElementById("logo-img");

function updateLogo() {
  if (!logoImg) return;
  if (document.body.classList.contains("light")) {
    logoImg.src = "assets/img/logo-small-dark.png";
  } else {
    logoImg.src = "assets/img/logo-small-light.png";
  }
}

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
