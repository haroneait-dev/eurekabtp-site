/* ═══════════════════════════════════════════════
   EUREKA BTP — JavaScript v2 (GSAP + ScrollTrigger)
═══════════════════════════════════════════════ */

/* ─── GSAP init ─── */
gsap.registerPlugin(ScrollTrigger);

/* ─── NAVBAR SCROLL ─── */
const navbar    = document.getElementById('navbar');
const navBurger = document.getElementById('navBurger');
const navMobile = document.getElementById('navMobile');

const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

navBurger.addEventListener('click', () => {
  const open = navMobile.classList.toggle('open');
  navBurger.classList.toggle('open', open);
});
navMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navMobile.classList.remove('open');
  navBurger.classList.remove('open');
}));

/* ─── HERO CAROUSEL ─── */
const slides  = Array.from(document.querySelectorAll('.hero-slide'));
const dotsWrap = document.getElementById('heroDots');
const prevBtn  = document.getElementById('heroPrev');
const nextBtn  = document.getElementById('heroNext');
let current = 0, autoplay;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', `Slide ${i + 1}`);
  dot.addEventListener('click', () => goTo(i));
  dotsWrap.appendChild(dot);
});

function goTo(idx) {
  slides[current].classList.remove('active');
  dotsWrap.children[current].classList.remove('active');
  current = (idx + slides.length) % slides.length;
  slides[current].classList.add('active');
  dotsWrap.children[current].classList.add('active');
}
function startAutoplay() {
  clearInterval(autoplay);
  autoplay = setInterval(() => goTo(current + 1), 5500);
}
prevBtn.addEventListener('click', () => { goTo(current - 1); startAutoplay(); });
nextBtn.addEventListener('click', () => { goTo(current + 1); startAutoplay(); });
startAutoplay();

/* ─── SMOOTH ANCHOR SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const selector = anchor.getAttribute('href');
    if (selector === '#') return;
    const target = document.querySelector(selector);
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 12;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
  });
});

/* ─── GSAP : STATS — entrée depuis 3 directions + float ─── */
const statCards = document.querySelectorAll('[data-gsap-stat]');
statCards.forEach(card => {
  const dir = card.dataset.gsapStat;
  const from = dir === 'left'   ? { x: -80, opacity: 0 }
             : dir === 'right'  ? { x: 80,  opacity: 0 }
             :                    { y: 60,   opacity: 0 };

  gsap.from(card, {
    ...from,
    duration: 0.85,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#stats',
      start: 'top 75%',
    },
    delay: dir === 'left' ? 0 : dir === 'right' ? 0.2 : 0.1,
  });
  gsap.to(card, { opacity: 1, duration: 0.01, scrollTrigger: { trigger: '#stats', start: 'top 76%' } });
});

/* ─── GSAP : COMPTEURS ANIMÉS ─── */
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const numEl  = entry.target.querySelector('.stat-v2-num');
    if (!numEl) return;
    const target = parseInt(numEl.dataset.target, 10);
    gsap.to({ val: 0 }, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate() { numEl.textContent = Math.round(this.targets()[0].val).toLocaleString('fr-FR'); },
      onComplete() { numEl.textContent = target.toLocaleString('fr-FR'); }
    });
    counterObs.unobserve(entry.target);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-v2').forEach(c => counterObs.observe(c));

/* ─── GSAP : SCROLL ANIMATIONS génériques (data-animate) ─── */
document.querySelectorAll('[data-animate]').forEach(el => {
  gsap.from(el, {
    y: 30, opacity: 0,
    duration: 0.75,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
    }
  });
});

/* ─── GSAP : SERVICE ROWS — Z-pattern reveal ─── */
document.querySelectorAll('.service-row').forEach((row, i) => {
  const isReverse = row.classList.contains('reverse');
  const img   = row.querySelector('.service-image');
  const text  = row.querySelector('.service-content');
  if (!img || !text) return;

  gsap.from(img, {
    x: isReverse ? 60 : -60, opacity: 0, duration: 0.9, ease: 'power3.out',
    scrollTrigger: { trigger: row, start: 'top 78%' }
  });
  gsap.from(text, {
    x: isReverse ? -60 : 60, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.15,
    scrollTrigger: { trigger: row, start: 'top 78%' }
  });
});

/* ─── GSAP : SECTION PARLONS — déclenche les animations SVG ─── */
ScrollTrigger.create({
  trigger: '#parlons',
  start: 'top 65%',
  once: true,
  onEnter: () => {
    document.querySelector('.parlons-visual')?.classList.add('parlons-ready');
  }
});

/* ─── GSAP : VÉHICULES — entrée en cascade ─── */
const vehicleCards = document.querySelectorAll('.vehicle-card');
if (vehicleCards.length) {
  gsap.from(vehicleCards, {
    y: 40, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power2.out',
    scrollTrigger: { trigger: '.vehicles-gallery', start: 'top 80%' }
  });
}

/* ─── GSAP : PIÈCES PHOTO CARDS ─── */
const piecesCards = document.querySelectorAll('.pieces-photo-card');
if (piecesCards.length) {
  gsap.from(piecesCards, {
    y: 40, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out',
    scrollTrigger: { trigger: '.pieces-photo-grid', start: 'top 80%' }
  });
}

/* ─── FORM SUBMISSION ─── */
const form      = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    submitBtn.textContent = 'Envoi en cours...';
    submitBtn.disabled = true;
    setTimeout(() => {
      submitBtn.textContent = 'Message envoyé ✓';
      submitBtn.style.background = '#22c55e';
      setTimeout(() => {
        submitBtn.textContent = 'Envoyer ma demande';
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        form.reset();
      }, 3500);
    }, 1200);
  });
}
