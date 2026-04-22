import { supabase, PIECES_TABLE, PIECES_BUCKET } from './supabase-client.js';

const form = document.getElementById('pieceForm');
const titreInput = document.getElementById('pieceTitre');
const tagInput = document.getElementById('pieceTag');
const descInput = document.getElementById('pieceDescription');
const fileInput = document.getElementById('pieceImage');
const submitBtn = document.getElementById('pieceSubmit');
const statusBox = document.getElementById('pieceStatus');
const listBox = document.getElementById('pieceList');
const logoutBtn = document.getElementById('logoutBtn');
const userLabel = document.getElementById('userLabel');

async function requireAuth() {
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    window.location.replace('/index.html');
    return null;
  }
  userLabel.textContent = data.session.user.email;
  return data.session;
}

function setStatus(msg, type = 'info') {
  statusBox.textContent = msg;
  statusBox.dataset.type = type;
}

async function loadPieces() {
  const { data, error } = await supabase
    .from(PIECES_TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    listBox.innerHTML = `<p class="admin-empty">Erreur de chargement : ${error.message}</p>`;
    return;
  }
  if (!data || data.length === 0) {
    listBox.innerHTML = `<p class="admin-empty">Aucune pièce pour le moment.</p>`;
    return;
  }

  listBox.innerHTML = data.map(p => `
    <article class="admin-piece-row" data-id="${p.id}">
      <img src="${p.image_url}" alt="${escapeHtml(p.titre)}">
      <div class="admin-piece-info">
        <span class="admin-piece-tag">${escapeHtml(p.tag || 'Pièce')}</span>
        <h3>${escapeHtml(p.titre)}</h3>
        <p>${escapeHtml(p.description || '')}</p>
      </div>
      <button class="admin-piece-delete" data-id="${p.id}" data-path="${p.image_path || ''}">Supprimer</button>
    </article>
  `).join('');

  listBox.querySelectorAll('.admin-piece-delete').forEach(btn => {
    btn.addEventListener('click', () => deletePiece(btn.dataset.id, btn.dataset.path));
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

async function deletePiece(id, path) {
  if (!confirm('Supprimer définitivement cette pièce ?')) return;
  if (path) await supabase.storage.from(PIECES_BUCKET).remove([path]);
  const { error } = await supabase.from(PIECES_TABLE).delete().eq('id', id);
  if (error) return setStatus(`Erreur suppression : ${error.message}`, 'error');
  setStatus('Pièce supprimée.', 'success');
  loadPieces();
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  setStatus('');
  const file = fileInput.files[0];
  if (!file) return setStatus('Veuillez choisir une image.', 'error');

  submitBtn.disabled = true;
  submitBtn.textContent = 'Envoi en cours…';

  const ext = file.name.split('.').pop().toLowerCase();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error: upErr } = await supabase.storage
    .from(PIECES_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false });

  if (upErr) {
    setStatus(`Erreur upload : ${upErr.message}`, 'error');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Ajouter la pièce';
    return;
  }

  const { data: pub } = supabase.storage.from(PIECES_BUCKET).getPublicUrl(path);

  const { error: insErr } = await supabase.from(PIECES_TABLE).insert({
    titre: titreInput.value.trim(),
    description: descInput.value.trim(),
    tag: tagInput.value.trim() || null,
    image_url: pub.publicUrl,
    image_path: path
  });

  submitBtn.disabled = false;
  submitBtn.textContent = 'Ajouter la pièce';

  if (insErr) return setStatus(`Erreur enregistrement : ${insErr.message}`, 'error');

  setStatus('Pièce ajoutée avec succès.', 'success');
  form.reset();
  loadPieces();
});

logoutBtn.addEventListener('click', async () => {
  await supabase.auth.signOut();
  window.location.replace('/index.html');
});

(async () => {
  const session = await requireAuth();
  if (session) loadPieces();
})();
