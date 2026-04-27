import{s as n}from"./supabase-client-jymPkMbK.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";const l=document.getElementById("userLabel"),d=document.getElementById("logoutBtn"),i=document.getElementById("pagesContainer");async function u(){const{data:t}=await n.auth.getSession();return t.session?(l.textContent=t.session.user.email,t.session):(window.location.replace("/login.html"),null)}d.addEventListener("click",async()=>{await n.auth.signOut(),window.location.replace("/login.html")});function o(t){return String(t??"").replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a])}async function g(){if(!await u())return;const{data:a,error:c}=await n.from("pages").select("id, slug, title, description").order("title");if(c){i.innerHTML=`
        <div class="admin-empty">
          <h3>Schéma non initialisé</h3>
          <p>Exécute le script SQL <code>supabase/migrations/001_cms_schema.sql</code> dans Supabase → SQL Editor pour créer les tables.</p>
          <p style="margin-top:1rem; font-size:0.8rem; color:#c83b3b;">${o(c.message)}</p>
        </div>`;return}if(!a||a.length===0){i.innerHTML=`<div class="admin-empty"><h3>Aucune page</h3><p>Le seed des pages n'a pas été exécuté.</p></div>`;return}const{data:r}=await n.from("sections").select("page_id",{count:"exact",head:!1}),s={};(r||[]).forEach(e=>{s[e.page_id]=(s[e.page_id]||0)+1}),i.innerHTML=a.map(e=>`
      <div class="page-card">
        <div>
          <div class="page-card-title">${o(e.title)}</div>
          <div class="page-card-meta">/${o(e.slug)} · ${s[e.id]||0} section${(s[e.id]||0)>1?"s":""}</div>
        </div>
        <div class="page-card-actions">
          <a href="page.html?slug=${encodeURIComponent(e.slug)}" class="page-card-btn">Modifier</a>
          <a href="/${e.slug==="accueil"?"index":e.slug}.html" target="_blank" class="page-card-btn page-card-btn--ghost">Aperçu</a>
        </div>
      </div>
    `).join("")}g();
