const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const hero = document.querySelector('.hero');

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 36);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const auraLayer = document.createElement('div');
auraLayer.className = 'hero-aura-layer';
auraLayer.setAttribute('aria-hidden', 'true');
for (let i = 0; i < 12; i += 1) {
  const spark = document.createElement('i');
  spark.style.setProperty('--x', `${5 + Math.random() * 90}%`);
  spark.style.setProperty('--delay', `${Math.random() * -7}s`);
  spark.style.setProperty('--duration', `${4 + Math.random() * 5}s`);
  spark.style.setProperty('--size', `${3 + Math.random() * 7}px`);
  auraLayer.appendChild(spark);
}
hero.appendChild(auraLayer);

let pointerFrame;
document.addEventListener('pointermove', event => {
  cancelAnimationFrame(pointerFrame);
  pointerFrame = requestAnimationFrame(() => {
    document.documentElement.style.setProperty('--aura-x', `${event.clientX}px`);
    document.documentElement.style.setProperty('--aura-y', `${event.clientY}px`);
  });
}, { passive: true });
menuToggle.addEventListener('click', () => {
  const open = header.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
  menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});
document.querySelectorAll('.desktop-nav a').forEach(link => link.addEventListener('click', () => {
  header.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const filterButtons = document.querySelectorAll('.filters button');
const cards = document.querySelectorAll('.dish-card');
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
  cards.forEach(card => card.classList.toggle('hidden', button.dataset.filter !== 'todos' && card.dataset.category !== button.dataset.filter));
}));

const toast = document.querySelector('.toast');
let toastTimer;

// Easter egg: Alt + Ctrl + Shift + S, seguido de un clic en Instagram.
const instagramLink = document.querySelector('#instagram-link');
const auraMode = document.querySelector('#aura-mode');
const auraClose = auraMode.querySelector('.aura-close');
const yaraAudio = document.querySelector('#yara-audio');
const particleField = auraMode.querySelector('.aura-particles');
let auraArmed = false;
let auraBeatTimer;
let auraStageTimer;
let auraStage = 0;

for (let i = 0; i < 42; i += 1) {
  const particle = document.createElement('i');
  particle.className = 'aura-particle';
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.animationDelay = `${Math.random() * -2}s`;
  particle.style.animationDuration = `${.8 + Math.random() * 1.5}s`;
  particle.style.color = ['#d7ff00', '#00f7ff', '#ff2b9c'][i % 3];
  particleField.appendChild(particle);
}

function notifyAura(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show', 'shortcut-toast');
  toastTimer = setTimeout(() => toast.classList.remove('show', 'shortcut-toast'), 3300);
}

function openAura() {
  auraMode.querySelectorAll('img[data-src]').forEach(image => {
    image.src = image.dataset.src;
    image.removeAttribute('data-src');
  });
  auraMode.classList.add('active');
  auraMode.classList.add('stage-0');
  auraMode.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  yaraAudio.currentTime = 0;
  yaraAudio.volume = .8;
  yaraAudio.play().catch(() => notifyAura('Activa el sonido del navegador para escuchar Yara Yara.'));
  auraBeatTimer = setInterval(() => {
    auraMode.classList.remove('aura-beat');
    void auraMode.offsetWidth;
    auraMode.classList.add('aura-beat');
  }, 430);
  auraStageTimer = setInterval(() => {
    auraMode.classList.remove(`stage-${auraStage}`);
    auraStage = (auraStage + 1) % 3;
    auraMode.classList.add(`stage-${auraStage}`);
  }, 1450);
}

function closeAura() {
  clearInterval(auraBeatTimer);
  clearInterval(auraStageTimer);
  auraMode.classList.remove('aura-beat', 'stage-0', 'stage-1', 'stage-2');
  auraStage = 0;
  auraMode.classList.remove('active');
  auraMode.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  yaraAudio.pause();
  yaraAudio.currentTime = 0;
}

document.addEventListener('keydown', event => {
  if (event.altKey && event.ctrlKey && event.shiftKey && event.code === 'KeyS') {
    event.preventDefault();
    auraArmed = true;
    notifyAura('✦ Código aceptado. Ahora haz clic en Instagram ✦');
  }
  if (event.key === 'Escape' && auraMode.classList.contains('active')) closeAura();
});

instagramLink.addEventListener('click', event => {
  if (!auraArmed) return;
  event.preventDefault();
  auraArmed = false;
  openAura();
});

auraClose.addEventListener('click', closeAura);
