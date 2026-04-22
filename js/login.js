import { supabase } from './supabase-client.js';

const form = document.getElementById('loginForm');
const emailInput = document.getElementById('loginEmail');
const pwdInput = document.getElementById('loginPassword');
const errorBox = document.getElementById('loginError');
const submitBtn = document.getElementById('loginSubmit');

(async () => {
  const { data } = await supabase.auth.getSession();
  if (data.session) window.location.replace('/admin/pieces.html');
})();

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorBox.textContent = '';
  submitBtn.disabled = true;
  submitBtn.textContent = 'Connexion…';

  const { error } = await supabase.auth.signInWithPassword({
    email: emailInput.value.trim(),
    password: pwdInput.value
  });

  if (error) {
    errorBox.textContent = 'Identifiants invalides. Vérifiez votre email et mot de passe.';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Se connecter';
    return;
  }

  window.location.replace('/admin/pieces.html');
});
