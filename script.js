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

const navLink = document.querySelectorAll(".nav-link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

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

const boxViews = document.querySelectorAll(".services-box"),
  boxBtns = document.querySelectorAll(".services-button"),
  boxCloses = document.querySelectorAll(".services-box-close");

let box = function (boxClick) {
  boxViews[boxClick].classList.add("active-box");
};

boxBtns.forEach((boxBtn, i) => {
  boxBtn.addEventListener("click", () => {
    box(i);
  });
});

boxCloses.forEach((boxClose) => {
  boxClose.addEventListener("click", () => {
    boxViews.forEach((boxView) => {
      boxView.classList.remove("active-box");
    });
  });
});

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".nav-menu a[href*=" + sectionId + "]").classList.add("active-link");
    } else {
      document.querySelector(".nav-menu a[href*=" + sectionId + "]").classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

function scrollHeader() {
  const nav = document.getElementById("header");
  if (this.scrollY >= 200) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "fa-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? "fa-moon" : "fa-sun";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
  themeButton.classList[selectedIcon === "fa-moon" ? "add" : "remove"](iconTheme);
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

let swiperPortfolio = new Swiper(".portfolio-container", {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  loop: true,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  }
});

VanillaTilt.init(document.querySelectorAll(".services-content, .portfolio-content, .home-blob, .about-img"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.5
});

const skills = [
  'Python', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana', 'Trivy',
  'AWS CodePipeline', 'SonarQube', 'Helm', 'Argo CD', 'Terraform', 'Linux',
  'Bash Scripting', 'Nginx', 'Ansible', 'Git', 'Jenkins', 'CloudFormation',
  'Groovy', 'DockerHub', 'Amazon ECR', 'AWS CloudWatch', 'YAML', 'AWS WAF',
  'IAM', 'Secrets Management', 'RDS/DynamoDB', 'Route 53', 'CircleCI', 'GitHub Actions'
];

TagCloud('.skills-cloud', skills, {
  radius: 250,
  maxSpeed: 'normal',
  initSpeed: 'fast',
  direction: 135,
  keep: true
});

const animation = lottie.loadAnimation({
  container: document.getElementById('pipeline-animation'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'https://assets.lottiefiles.com/packages/lf20_5k8fk5.json'
});

const terminal = new Typed('#terminal-animation', {
  strings: ['kubectl apply -f portfolio.yaml', 'aws configure --profile mahadev', 'terraform apply'],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('hero-background'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x845ef7 });
const spheres = [];

for (let i = 0; i < 50; i++) {
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50);
  scene.add(sphere);
  spheres.push(sphere);
}

camera.position.z = 50;

function animate() {
  requestAnimationFrame(animate);
  spheres.forEach(sphere => {
    sphere.position.x += 0.01;
    if (sphere.position.x > 50) sphere.position.x = -50;
  });
  renderer.render(scene, camera);
}
animate();
