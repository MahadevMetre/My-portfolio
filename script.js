const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

// remove menu mobile
const navLink = document.querySelectorAll(".nav-link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

// qualifi
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification-active");
    });
    target.classList.add("qualification-active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification-active");
    });

    tab.classList.add("qualification-active");
  });
});

// services box
const boxViews = document.querySelectorAll(".services-box"),
  boxBtns = document.querySelectorAll(".services-button"),
  boxCloses = document.querySelectorAll(".services-box-close"),
  servicesContainer = document.querySelector(".services-container");

boxBtns.forEach((boxBtn, i) => {
  boxBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default link behavior
    const content = boxBtn.closest(".services-content");
    const isActive = content.classList.contains("active") && boxViews[i].classList.contains("active-box");

    // Remove active classes from all cards and boxes
    boxViews.forEach((boxView) => boxView.classList.remove("active-box"));
    document.querySelectorAll(".services-content").forEach((content) => content.classList.remove("active"));

    // If the clicked card is not active, activate it; otherwise, keep it closed
    if (!isActive) {
      boxViews[i].classList.add("active-box");
      content.classList.add("active");
    }
  });
});

boxCloses.forEach((boxClose) => {
  boxClose.addEventListener("click", () => {
    boxViews.forEach((boxView) => boxView.classList.remove("active-box"));
    document.querySelectorAll(".services-content").forEach((content) => content.classList.remove("active"));
  });
});

// Close any open cards when the user stops hovering over the services container
if (servicesContainer) {
  servicesContainer.addEventListener("mouseleave", () => {
    boxViews.forEach((boxView) => boxView.classList.remove("active-box"));
    document.querySelectorAll(".services-content").forEach((content) => content.classList.remove("active"));
  });
}

//scroll section active link
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

// change bg header
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 200) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL TOP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

//dark light mode------------------
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "fa-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "fa-moon" : "fa-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "fa-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

//swiper
let swiperPortfolio = new Swiper(".portfolio-container", {
  cssMode: true,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

let swiperTestimonial = new Swiper(".testimonial-container", {
  cssMode: true,
  loop: true,
  spaceBetween: 48,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    568: {
      slidesPerView: 2,
    },
  },
});

// 🌌 3D Card Tilt
VanillaTilt.init(document.querySelectorAll(".portfolio-content, .services-content, .skills-name"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.2,
});

// 🌠 Vanta Background on Home
VANTA.HALO({
  el: "#home",
  mouseControls: true,
  touchControls: true,
  minHeight: 200.00,
  minWidth: 200.00,
  baseColor: 0x0f0f0f,
  backgroundColor: 0x121212
});

// 🔁 Add 3D tilt effect to service cards
VanillaTilt.init(document.querySelectorAll(".services-content"), {
  max: 10,
  speed: 300,
  glare: true,
  "max-glare": 0.2,
});

function scrollSkills(direction) {
  const container = document.getElementById('skillsScroll');
  const scrollAmount = 300;
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

window.addEventListener('scroll', function () {
  const scrollY = window.scrollY;
  document.querySelector('.layer-back').style.transform =
    `translateY(${scrollY * 0.2}px) scale(1.5)`;
  document.querySelector('.layer-mid').style.transform =
    `translateY(${scrollY * 0.4}px) scale(1.3)`;
  document.querySelector('.layer-front').style.transform =
    `translateY(${scrollY * 0.6}px) scale(1.1)`;
});