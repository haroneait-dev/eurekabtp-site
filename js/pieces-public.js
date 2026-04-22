import { supabase, PIECES_TABLE } from './supabase-client.js';

function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

function buildCard(p) {
  const searchTokens = [p.titre, p.description, p.tag].filter(Boolean).join(' ').toLowerCase();
  const tag = p.tag || 'Pièce';
  return `
    <div class="catalog-card" data-search="${escapeHtml(searchTokens)}" data-tag="${escapeHtml(tag)}" data-dynamic="1">
      <div class="catalog-img catalog-img--light">
        <img src="${escapeHtml(p.image_url)}" alt="${escapeHtml(p.titre)}" loading="lazy">
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

  const html = data.map(buildCard).join('');
  grid.insertAdjacentHTML('afterbegin', html);
  document.dispatchEvent(new CustomEvent('pieces:loaded', { detail: { added: data.length } }));
})();
