import { supabase } from './supabase-client.js';

function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

function safeUrl(url) {
  if (!url) return '';
  // Encode spaces and other unsafe chars in URL paths
  return escapeHtml(String(url).replace(/ /g, '%20'));
}

function paragraphs(text) {
  if (!text) return '';
  return String(text)
    .split(/\n\s*\n/)
    .map(p => `<p>${escapeHtml(p.trim()).replace(/\n/g, '<br>')}</p>`)
    .join('');
}

function renderHero(s) {
  const d = s.data || {};
  const bg = d.bg_image ? `style="background:url('${safeUrl(d.bg_image)}') center/cover no-repeat;"` : '';
  return `
    <section class="cms-hero service-hero" ${bg}>
      <div class="service-hero-overlay"></div>
      <div class="service-hero-content">
        ${d.eyebrow ? `<p class="section-eyebrow">${escapeHtml(d.eyebrow)}</p>` : ''}
        ${d.title ? `<h1>${escapeHtml(d.title)}</h1>` : ''}
        ${d.subtitle ? `<p>${escapeHtml(d.subtitle)}</p>` : ''}
      </div>
    </section>`;
}

function renderSplit(s) {
  const d = s.data || {};
  const variant = d.variant === 'dark' ? 'dark-bg' : 'light-bg';
  const isReverse = (d.image_position || 'right') === 'left';
  const reverseClass = isReverse ? 'reverse' : '';
  const watermark = d.variant === 'dark' ? '<div class="eureka-blueprint-watermark"></div>' : '';

  const ctaStyle = variant === 'light-bg'
    ? 'border-color: var(--anthracite); color: var(--anthracite);'
    : '';

  return `
    <section class="cms-split" style="padding:0; max-width:100%;">
      <div class="eureka-split ${reverseClass}">
        <div class="eureka-split-content ${variant}">
          ${watermark}
          ${d.eyebrow ? `<span class="eureka-split-tag">${escapeHtml(d.eyebrow)}</span>` : ''}
          ${d.title ? `<h3 class="eureka-split-title">${escapeHtml(d.title).replace(/\n/g, '<br>')}</h3>` : ''}
          ${d.text ? `<div class="eureka-split-desc">${paragraphs(d.text)}</div>` : ''}
          ${d.logo_image ? `<img src="${safeUrl(d.logo_image)}" alt="" style="height:90px; width:auto; max-width:240px; object-fit:contain; display:block; margin:0 0 2rem;">` : ''}
          ${d.cta_label && d.cta_url ? `<a href="${escapeHtml(d.cta_url)}" class="split-btn" style="${ctaStyle}">${escapeHtml(d.cta_label)}</a>` : ''}
        </div>
        ${d.image ? `<div class="eureka-split-image"><img src="${safeUrl(d.image)}" alt=""></div>` : ''}
      </div>
    </section>`;
}

function renderProcessIntro(s) {
  const d = s.data || {};
  return `
    <section class="cms-process-intro" style="background:#fff; padding:6rem 2rem 3rem; text-align:center;">
      <div style="max-width:720px; margin:0 auto;">
        ${d.eyebrow ? `<p class="section-eyebrow">${escapeHtml(d.eyebrow)}</p>` : ''}
        ${d.title ? `<h2 style="color:var(--anthracite);">${escapeHtml(d.title)}</h2>` : ''}
      </div>
    </section>`;
}

function renderCta(s) {
  const d = s.data || {};
  return `
    <section class="cms-cta" style="background:var(--dark); padding:6rem 2rem; text-align:center;">
      <div style="max-width:640px; margin:0 auto;">
        ${d.eyebrow ? `<p class="section-eyebrow" style="color:#fff;">${escapeHtml(d.eyebrow)}</p>` : ''}
        ${d.title ? `<h2 style="color:#fff; margin-bottom:1rem;">${escapeHtml(d.title)}</h2>` : ''}
        ${d.text ? `<p style="color:rgba(255,255,255,0.65); font-size:1rem; line-height:1.75; margin-bottom:2.5rem;">${escapeHtml(d.text)}</p>` : ''}
        ${d.cta_label && d.cta_url ? `<a href="${escapeHtml(d.cta_url)}" class="btn-primary">${escapeHtml(d.cta_label)}</a>` : ''}
      </div>
    </section>`;
}

const RENDERERS = {
  hero: renderHero,
  split: renderSplit,
  process_intro: renderProcessIntro,
  cta: renderCta,
};

export async function renderPage(slug, mountId = 'cms-content', options = {}) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  const skipTypes = new Set(options.skipTypes || []);

  const { data: page, error: pErr } = await supabase
    .from('pages').select('id').eq('slug', slug).maybeSingle();
  if (pErr || !page) {
    console.warn('CMS: page not found for slug', slug);
    return; // keeps static HTML fallback
  }

  const { data: sections, error: sErr } = await supabase
    .from('sections').select('*')
    .eq('page_id', page.id).eq('published', true)
    .order('order_index');

  if (sErr) {
    console.error('CMS: error loading sections', sErr);
    return; // keeps static HTML fallback
  }

  const filtered = (sections || []).filter(s => !skipTypes.has(s.type));
  if (filtered.length === 0) return; // keeps static HTML fallback

  mount.innerHTML = filtered.map(s => {
    const fn = RENDERERS[s.type];
    return fn ? fn(s) : '';
  }).join('');

  // Forcer la visibilité des éléments existants dont les triggers GSAP
  // sont devenus stales à cause du changement de layout, et rafraîchir
  // les positions des ScrollTrigger restants.
  requestAnimationFrame(() => {
    if (window.gsap) {
      document.querySelectorAll('[data-animate]').forEach(el => {
        window.gsap.set(el, { opacity: 1, y: 0, clearProps: 'opacity,transform' });
      });
    }
    if (window.ScrollTrigger?.refresh) {
      window.ScrollTrigger.refresh();
    }
  });
}
