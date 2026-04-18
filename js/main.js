/* ═══════════════════════════════════════════════
   EUREKA BTP — JavaScript v2 (GSAP + ScrollTrigger)
═══════════════════════════════════════════════ */

/* ─── GSAP init ─── */
gsap.registerPlugin(ScrollTrigger);

/* ─── PRELOADER ─── */
(function () {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  document.body.style.overflow = 'hidden';

  const tl = gsap.timeline({
    onComplete() {
      preloader.remove();
      document.body.style.overflow = '';
    }
  });

  tl.from(['#loader-eureka', '#loader-btp'], {
    y: 40, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out'
  })
  .to('#loader-eureka', { x: '-100vw', duration: 0.65, ease: 'power3.in' }, '+=0.35')
  .to('#loader-btp',    { x:  '100vw', duration: 0.65, ease: 'power3.in' }, '<')
  .to('#door-left',     { x: '-100%',  duration: 0.7,  ease: 'power3.inOut' }, '-=0.1')
  .to('#door-right',    { x:  '100%',  duration: 0.7,  ease: 'power3.inOut' }, '<');
})();


/* ─── ACTIVITÉS : SERPENT ANIMÉ ─── */
(function () {
  const snakePath = document.getElementById('actSnakePath');
  if (!snakePath) return;

  const len = snakePath.getTotalLength();
  gsap.set(snakePath, { strokeDasharray: len, strokeDashoffset: len });

  const thresholds = [0, 0.32, 0.64, 0.96];
  const nodes  = [0, 1, 2, 3].map(i => document.getElementById(`actNode${i}`));
  const texts  = [1, 2, 3].map(i => document.getElementById(`actNodeText${i}`));
  const steps  = Array.from(document.querySelectorAll('.act-step'));

  gsap.to(snakePath, {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '#actTimeline',
      start: 'top 65%',
      end:   'bottom 70%',
      scrub: 1.5,
      onUpdate(self) {
        const p = self.progress;
        nodes.forEach((node, i) => {
          const lit = p >= thresholds[i];
          node.setAttribute('fill', lit ? '#f4650a' : '#e5e7eb');
          if (i > 0) {
            texts[i - 1].setAttribute('fill', lit ? '#fff' : '#9ca3af');
          }
          if (steps[i]) steps[i].classList.toggle('is-lit', lit);
        });
      }
    }
  });
})();

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

/* ─── GSAP: SERVICES DOTTED PATH REVEAL ─── */
const pathOverlay = document.querySelector('.services-path-overlay');
if (pathOverlay) {
  gsap.fromTo(pathOverlay, 
    { clipPath: "inset(0 0 100% 0)" }, 
    {
      clipPath: "inset(0 0 0% 0)",
      ease: "none",
      scrollTrigger: {
        trigger: "#services",
        start: "top 40%",
        end: "bottom 80%",
        scrub: 1
      }
    }
  );
}

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


/* ─── GSAP : VÉHICULES (TIER CARDS) ─── */
const vehicleCards = document.querySelectorAll('.tier-card');
if (vehicleCards.length) {
  gsap.from(vehicleCards, {
    y: 40, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: '.vehicles-gallery-v2', start: 'top 85%' }
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

/* ─── 3D PRODUCT CAROUSEL (PIÈCES DÉTACHÉES) ─── */
(function () {
  const track = document.getElementById('pcTrack');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.pc-card'));
  const dots  = Array.from(document.querySelectorAll('.pc-dot'));
  const total = cards.length;
  let current  = 0;
  let animating = false;

  const POS = {
    active: { x: 0,    rotateY: 0,   scale: 1,    opacity: 1,    zIndex: 5 },
    right:  { x: 360,  rotateY: -44, scale: 0.73, opacity: 0.42, zIndex: 3 },
    left:   { x: -360, rotateY:  44, scale: 0.73, opacity: 0.42, zIndex: 3 },
    hidden: { x: 0,    rotateY: 0,   scale: 0.5,  opacity: 0,    zIndex: 1 },
  };

  function posKey(idx) {
    const offset = ((idx - current) % total + total) % total;
    if (offset === 0)         return 'active';
    if (offset === 1)         return 'right';
    if (offset === total - 1) return 'left';
    return 'hidden';
  }

  function refresh() {
    cards.forEach((card, i) => card.classList.toggle('is-active', i === current));
    dots.forEach((dot, i)   => dot.classList.toggle('is-active', i === current));
  }

  function goTo(idx) {
    if (animating) return;
    animating = true;
    current = ((idx % total) + total) % total;
    const tl = gsap.timeline({ onComplete: () => { animating = false; } });
    cards.forEach((card, i) => {
      tl.to(card, { ...POS[posKey(i)], duration: 0.72, ease: 'power3.inOut' }, 0);
    });
    refresh();
  }

  /* init — set positions instantly */
  cards.forEach((card, i) => gsap.set(card, POS[posKey(i)]));
  refresh();

  document.querySelector('.pc-prev')?.addEventListener('click', () => goTo(current - 1));
  document.querySelector('.pc-next')?.addEventListener('click', () => goTo(current + 1));
  dots.forEach(dot => dot.addEventListener('click', () => goTo(+dot.dataset.goto)));

  /* click on side cards to navigate */
  cards.forEach((card, i) => {
    card.addEventListener('click', () => {
      const k = posKey(i);
      if (k === 'right') goTo(current + 1);
      else if (k === 'left')  goTo(current - 1);
    });
  });

  /* autoplay */
  const carousel = document.getElementById('piecesCarousel');
  let timer = setInterval(() => goTo(current + 1), 5000);
  carousel?.addEventListener('mouseenter', () => clearInterval(timer));
  carousel?.addEventListener('mouseleave', () => { timer = setInterval(() => goTo(current + 1), 5000); });
})();
