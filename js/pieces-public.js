import { supabase, PIECES_TABLE } from './supabase-client.js';

function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

function buildCard(p) {
  const searchTokens = [
    p.titre, p.description, p.tag,
    p.in_stock ? '' : 'rupture stock indisponible',
    p.is_promo ? 'promo promotion soldes' : ''
  ].filter(Boolean).join(' ').toLowerCase();
  const tag = p.tag || 'Pièce';
  const outOfStock = !p.in_stock;
  const stockBadge = outOfStock
    ? '<span class="catalog-stock-badge catalog-stock-badge--out">Rupture de stock</span>'
    : '<span class="catalog-stock-badge catalog-stock-badge--in">En stock</span>';
  const promoBadge = p.is_promo ? '<span class="catalog-promo-badge">Promo</span>' : '';
  return `
    <div class="catalog-card${outOfStock ? ' is-out-of-stock' : ''}${p.is_promo ? ' is-promo' : ''}" data-search="${escapeHtml(searchTokens)}" data-tag="${escapeHtml(tag)}" data-dynamic="1">
      <div class="catalog-img catalog-img--light">
        <img src="${escapeHtml(p.image_url)}" alt="${escapeHtml(p.titre)}" loading="lazy">
        ${promoBadge}
        ${stockBadge}
      </div>
      <div class="catalog-content">
        <span class="catalog-tag">${escapeHtml(tag)}</span>
        <h2>${escapeHtml(p.titre)}</h2>
        <p>${escapeHtml(p.description || '')}</p>
      </div>
    </div>
  `;
}

(async () => {
  const grid = document.querySelector('.catalog-grid');
  if (!grid) return;

  const { data, error } = await supabase
    .from(PIECES_TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data || data.length === 0) {
    document.dispatchEvent(new CustomEvent('pieces:loaded', { detail: { added: 0 } }));
    return;
  }

  grid.innerHTML = data.map(buildCard).join('');
  document.dispatchEvent(new CustomEvent('pieces:loaded', { detail: { added: data.length } }));
})();
