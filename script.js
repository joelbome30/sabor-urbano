const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
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
document.querySelectorAll('.add-btn').forEach(button => button.addEventListener('click', () => {
  clearTimeout(toastTimer); toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}));

// Easter egg: Alt + Ctrl + Shift + S, seguido de un clic en Instagram.
const instagramLink = document.querySelector('#instagram-link');
const auraMode = document.querySelector('#aura-mode');
const auraClose = auraMode.querySelector('.aura-close');
const yaraAudio = document.querySelector('#yara-audio');
const particleField = auraMode.querySelector('.aura-particles');
let auraArmed = false;

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
  auraMode.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  yaraAudio.currentTime = 0;
  yaraAudio.volume = .8;
  yaraAudio.play().catch(() => notifyAura('Activa el sonido del navegador para escuchar Yara Yara.'));
}

function closeAura() {
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
