import { supabase, PIECES_TABLE, PIECES_BUCKET } from './supabase-client.js';

const form = document.getElementById('pieceForm');
const idInput = document.getElementById('pieceId');
const titreInput = document.getElementById('pieceTitre');
const tagInput = document.getElementById('pieceTag');
const descInput = document.getElementById('pieceDescription');
const fileInput = document.getElementById('pieceImage');
const stockInput = document.getElementById('pieceInStock');
const promoInput = document.getElementById('pieceIsPromo');
const submitBtn = document.getElementById('pieceSubmit');
const cancelBtn = document.getElementById('pieceCancel');
const statusBox = document.getElementById('pieceStatus');
const listBox = document.getElementById('pieceList');
const logoutBtn = document.getElementById('logoutBtn');
const userLabel = document.getElementById('userLabel');
const formTitle = document.getElementById('formTitle');
const formHint = document.getElementById('formHint');
const imageHint = document.getElementById('imageHint');

let mode = 'create';
let editingPiece = null;

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

function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

function enterCreateMode() {
  mode = 'create';
  editingPiece = null;
  document.body.dataset.formMode = 'create';
  idInput.value = '';
  form.reset();
  stockInput.checked = true;
  promoInput.checked = false;
  fileInput.setAttribute('required', '');
  imageHint.textContent = '(requise)';
  formTitle.textContent = 'Ajouter une pièce';
  formHint.textContent = 'Remplissez les champs pour créer une nouvelle pièce.';
  submitBtn.textContent = 'Ajouter la pièce';
  document.querySelectorAll('.admin-piece-row.is-editing').forEach(r => r.classList.remove('is-editing'));
}

function enterEditMode(piece) {
  mode = 'edit';
  editingPiece = piece;
  document.body.dataset.formMode = 'edit';
  idInput.value = piece.id;
  titreInput.value = piece.titre || '';
  tagInput.value = piece.tag || '';
  descInput.value = piece.description || '';
  stockInput.checked = !!piece.in_stock;
  promoInput.checked = !!piece.is_promo;
  fileInput.value = '';
  fileInput.removeAttribute('required');
  imageHint.textContent = '(laisser vide pour conserver l\'image actuelle)';
  formTitle.textContent = 'Modifier la pièce';
  formHint.textContent = `Édition : « ${piece.titre} »`;
  submitBtn.textContent = 'Enregistrer les modifications';
  document.querySelectorAll('.admin-piece-row').forEach(r => {
    r.classList.toggle('is-editing', r.dataset.id === piece.id);
  });
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function loadPieces() {
  const { data, error } = await supabase
    .from(PIECES_TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    listBox.innerHTML = `<p class="admin-empty">Erreur de chargement : ${escapeHtml(error.message)}</p>`;
    return;
  }
  if (!data || data.length === 0) {
    listBox.innerHTML = `<p class="admin-empty">Aucune pièce pour le moment.</p>`;
    return;
  }

  listBox.innerHTML = data.map(p => `
    <article class="admin-piece-row ${p.in_stock ? '' : 'out-of-stock'}" data-id="${p.id}">
      <img src="${escapeHtml(p.image_url)}" alt="${escapeHtml(p.titre)}">
      <div class="admin-piece-info">
        <div class="admin-piece-meta">
          <span class="admin-piece-tag">${escapeHtml(p.tag || 'Pièce')}</span>
          <button type="button" class="admin-piece-stock" data-in-stock="${p.in_stock}" data-action="toggle-stock" data-id="${p.id}">
            ${p.in_stock ? 'En stock' : 'Rupture'}
          </button>
          <button type="button" class="admin-piece-promo" data-is-promo="${!!p.is_promo}" data-action="toggle-promo" data-id="${p.id}">
            ${p.is_promo ? 'Promo' : 'Pas en promo'}
          </button>
        </div>
        <h3>${escapeHtml(p.titre)}</h3>
        <p>${escapeHtml(p.description || '')}</p>
      </div>
      <div class="admin-piece-actions">
        <button type="button" class="admin-piece-btn" data-action="edit" data-id="${p.id}">Modifier</button>
        <button type="button" class="admin-piece-btn danger" data-action="delete" data-id="${p.id}" data-path="${escapeHtml(p.image_path || '')}">Supprimer</button>
      </div>
    </article>
  `).join('');

  listBox.querySelectorAll('[data-action]').forEach(btn => {
    const action = btn.dataset.action;
    const id = btn.dataset.id;
    if (action === 'delete') {
      btn.addEventListener('click', () => deletePiece(id, btn.dataset.path));
    } else if (action === 'edit') {
      btn.addEventListener('click', () => {
        const piece = data.find(x => x.id === id);
        if (piece) enterEditMode(piece);
      });
    } else if (action === 'toggle-stock') {
      btn.addEventListener('click', () => {
        const piece = data.find(x => x.id === id);
        if (piece) toggleStock(piece);
      });
    } else if (action === 'toggle-promo') {
      btn.addEventListener('click', () => {
        const piece = data.find(x => x.id === id);
        if (piece) togglePromo(piece);
      });
    }
  });
}

async function togglePromo(piece) {
  const newVal = !piece.is_promo;
  const { error } = await supabase
    .from(PIECES_TABLE)
    .update({ is_promo: newVal })
    .eq('id', piece.id);
  if (error) return setStatus(`Erreur : ${error.message}`, 'error');
  setStatus(newVal ? 'Pièce marquée en promo.' : 'Promo retirée.', 'success');
  loadPieces();
}

async function toggleStock(piece) {
  const newVal = !piece.in_stock;
  const { error } = await supabase
    .from(PIECES_TABLE)
    .update({ in_stock: newVal })
    .eq('id', piece.id);
  if (error) return setStatus(`Erreur : ${error.message}`, 'error');
  setStatus(newVal ? 'Pièce marquée en stock.' : 'Pièce marquée en rupture.', 'success');
  loadPieces();
}

async function deletePiece(id, path) {
  if (!confirm('Supprimer définitivement cette pièce ?')) return;
  if (path) await supabase.storage.from(PIECES_BUCKET).remove([path]);
  const { error } = await supabase.from(PIECES_TABLE).delete().eq('id', id);
  if (error) return setStatus(`Erreur suppression : ${error.message}`, 'error');
  setStatus('Pièce supprimée.', 'success');
  if (mode === 'edit' && editingPiece?.id === id) enterCreateMode();
  loadPieces();
}

async function uploadImage(file) {
  const ext = file.name.split('.').pop().toLowerCase();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage
    .from(PIECES_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false });
  if (error) throw error;
  const { data: pub } = supabase.storage.from(PIECES_BUCKET).getPublicUrl(path);
  return { path, url: pub.publicUrl };
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  setStatus('');

  const file = fileInput.files[0];
  if (mode === 'create' && !file) return setStatus('Veuillez choisir une image.', 'error');

  submitBtn.disabled = true;
  submitBtn.textContent = mode === 'edit' ? 'Enregistrement…' : 'Envoi en cours…';

  try {
    const payload = {
      titre: titreInput.value.trim(),
      description: descInput.value.trim() || null,
      tag: tagInput.value.trim() || null,
      in_stock: stockInput.checked,
      is_promo: promoInput.checked
    };

    if (file) {
      const uploaded = await uploadImage(file);
      payload.image_url = uploaded.url;
      payload.image_path = uploaded.path;

      if (mode === 'edit' && editingPiece?.image_path) {
        await supabase.storage.from(PIECES_BUCKET).remove([editingPiece.image_path]);
      }
    }

    if (mode === 'edit') {
      const { error } = await supabase.from(PIECES_TABLE).update(payload).eq('id', editingPiece.id);
      if (error) throw error;
      setStatus('Modifications enregistrées.', 'success');
    } else {
      const { error } = await supabase.from(PIECES_TABLE).insert(payload);
      if (error) throw error;
      setStatus('Pièce ajoutée avec succès.', 'success');
    }

    enterCreateMode();
    loadPieces();
  } catch (err) {
    setStatus(`Erreur : ${err.message}`, 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = mode === 'edit' ? 'Enregistrer les modifications' : 'Ajouter la pièce';
  }
});

cancelBtn.addEventListener('click', () => {
  enterCreateMode();
  setStatus('');
});

logoutBtn.addEventListener('click', async () => {
  await supabase.auth.signOut();
  window.location.replace('/index.html');
});

(async () => {
  const session = await requireAuth();
  if (session) loadPieces();
})();
