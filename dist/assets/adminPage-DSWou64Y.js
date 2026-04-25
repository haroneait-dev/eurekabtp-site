import{s as l}from"./supabase-client-Dogz5OU6.js";/* empty css              */import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";const L="site-assets",B=document.getElementById("userLabel"),C=document.getElementById("logoutBtn"),P=document.getElementById("pageTitle"),M=document.getElementById("pageMeta"),A=document.getElementById("pageTitleHeader"),u=document.getElementById("sectionsList"),H=document.getElementById("btnAddSection"),h=document.getElementById("modalBackdrop"),k=document.getElementById("modalClose"),O=document.getElementById("modalCancel"),E=document.getElementById("modalSave"),q=document.getElementById("modalTitle"),_=document.getElementById("modalStatus"),c=document.getElementById("sectionType"),w=document.getElementById("sectionPublished"),r=document.getElementById("formContainer"),j=new URLSearchParams(window.location.search),b=j.get("slug");let m=null,o=null,f={};function p(e){return String(e??"").replace(/[&<>"']/g,i=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[i])}async function U(){const{data:e}=await l.auth.getSession();return e.session?(B.textContent=e.session.user.email,e.session):(window.location.replace("/login.html"),null)}C.addEventListener("click",async()=>{await l.auth.signOut(),window.location.replace("/login.html")});const $={hero:()=>`
      <div class="field">
        <label>Petit titre (eyebrow)</label>
        <input type="text" name="eyebrow" placeholder="Ex: Notre identité">
      </div>
      <div class="field">
        <label>Titre principal *</label>
        <input type="text" name="title" required>
      </div>
      <div class="field">
        <label>Sous-titre</label>
        <textarea name="subtitle" placeholder="Texte d'introduction sous le titre"></textarea>
      </div>
      <div class="field">
        <label>Image de fond</label>
        <small>L'image actuelle reste si tu n'en sélectionnes pas une nouvelle.</small>
        <input type="file" name="bg_image" accept="image/*" data-field="bg_image">
        <div class="image-preview-wrap" data-preview-for="bg_image"></div>
      </div>
    `,split:()=>`
      <div class="field">
        <label>Petit titre (eyebrow)</label>
        <input type="text" name="eyebrow" placeholder="Ex: Nos services">
      </div>
      <div class="field">
        <label>Titre *</label>
        <input type="text" name="title" required>
      </div>
      <div class="field">
        <label>Texte</label>
        <small>Tu peux mettre plusieurs paragraphes en sautant une ligne.</small>
        <textarea name="text" rows="6"></textarea>
      </div>
      <div class="field-row">
        <div class="field">
          <label>Style de fond</label>
          <select name="variant">
            <option value="light">Clair (fond blanc)</option>
            <option value="dark">Sombre (fond anthracite)</option>
          </select>
        </div>
        <div class="field">
          <label>Position de l'image</label>
          <select name="image_position">
            <option value="right">À droite</option>
            <option value="left">À gauche</option>
          </select>
        </div>
      </div>
      <div class="field">
        <label>Image</label>
        <input type="file" name="image" accept="image/*" data-field="image">
        <div class="image-preview-wrap" data-preview-for="image"></div>
      </div>
      <div class="field-row">
        <div class="field">
          <label>Texte du bouton</label>
          <input type="text" name="cta_label" placeholder="Ex: En savoir plus">
        </div>
        <div class="field">
          <label>Lien du bouton</label>
          <input type="text" name="cta_url" placeholder="Ex: contact.html">
        </div>
      </div>
    `,process_intro:()=>`
      <div class="field">
        <label>Petit titre (eyebrow)</label>
        <input type="text" name="eyebrow" placeholder="Ex: Comment ça se passe">
      </div>
      <div class="field">
        <label>Titre *</label>
        <input type="text" name="title" required>
      </div>
    `,cta:()=>`
      <div class="field">
        <label>Petit titre (eyebrow)</label>
        <input type="text" name="eyebrow" placeholder="Ex: Travaillons ensemble">
      </div>
      <div class="field">
        <label>Titre *</label>
        <input type="text" name="title" required>
      </div>
      <div class="field">
        <label>Texte</label>
        <textarea name="text"></textarea>
      </div>
      <div class="field-row">
        <div class="field">
          <label>Texte du bouton</label>
          <input type="text" name="cta_label" placeholder="Ex: Demander un devis">
        </div>
        <div class="field">
          <label>Lien du bouton</label>
          <input type="text" name="cta_url" placeholder="Ex: index.html#contact-strip">
        </div>
      </div>
    `};function S(e,i={}){f={},r.innerHTML=($[e]||$.split)(),Object.entries(i).forEach(([t,a])=>{const n=r.querySelector(`[name="${t}"]`);if(n)if(n.type==="file"){const s=r.querySelector(`[data-preview-for="${t}"]`);s&&a&&(s.innerHTML=`<img src="${p(a)}" class="image-preview"><div style="font-size:0.72rem;color:var(--gray);margin-top:0.3rem">Image actuelle</div>`)}else n.tagName==="SELECT"?n.value=a||n.options[0].value:n.value=a||""}),r.querySelectorAll('input[type="file"]').forEach(t=>{t.addEventListener("change",a=>{const n=a.target.files[0];if(!n)return;f[t.dataset.field]=n;const s=r.querySelector(`[data-preview-for="${t.dataset.field}"]`);if(s){const d=URL.createObjectURL(n);s.innerHTML=`<img src="${d}" class="image-preview"><div style="font-size:0.72rem;color:var(--gray);margin-top:0.3rem">Nouvelle image</div>`}})})}function N(){const e={};return r.querySelectorAll("input[name], textarea[name], select[name]").forEach(i=>{i.type!=="file"&&(e[i.name]=i.value.trim())}),e}async function R(e){const i=e.name.split(".").pop(),t=`${b}/${Date.now()}-${Math.random().toString(36).slice(2,8)}.${i}`,{error:a}=await l.storage.from(L).upload(t,e,{cacheControl:"3600",upsert:!1});if(a)throw a;const{data:n}=l.storage.from(L).getPublicUrl(t);return n.publicUrl}function y(e,i="info"){_.textContent=e,_.dataset.type=i}async function F(){if(!b){u.innerHTML='<div class="empty"><h3>Page introuvable</h3><p>Aucun slug fourni.</p></div>';return}const{data:e,error:i}=await l.from("pages").select("*").eq("slug",b).maybeSingle();if(i||!e){u.innerHTML=`<div class="empty"><h3>Page introuvable</h3><p>Le slug "${p(b)}" n'existe pas dans la base.</p></div>`;return}m=e,P.textContent=e.title,A.textContent=`Édition · ${e.title}`,M.textContent=`Slug : /${e.slug}`,await v()}async function v(){const{data:e,error:i}=await l.from("sections").select("*").eq("page_id",m.id).order("order_index");if(i){u.innerHTML=`<div class="empty"><h3>Erreur</h3><p>${p(i.message)}</p></div>`;return}if(!e||e.length===0){u.innerHTML=`
        <div class="empty">
          <h3>Aucune section pour le moment</h3>
          <p>Clique sur "➕ Ajouter une section" pour commencer.</p>
        </div>`;return}u.innerHTML=e.map((t,a)=>{var d,g,T;const n=((d=t.data)==null?void 0:d.title)||"(sans titre)",s=((g=t.data)==null?void 0:g.text)||((T=t.data)==null?void 0:T.subtitle)||"";return`
        <div class="section-card ${t.published?"":"is-unpublished"}" data-id="${t.id}">
          <div class="section-order">${a+1}</div>
          <div class="section-info">
            <span class="section-type-badge">${p(t.type)}</span>
            <div class="section-title-preview">${p(n)}</div>
            <div class="section-text-preview">${p(s).slice(0,120)}</div>
          </div>
          <div class="section-actions">
            <button data-action="up" ${a===0?"disabled":""}>↑</button>
            <button data-action="down" ${a===e.length-1?"disabled":""}>↓</button>
            <button data-action="toggle">${t.published?"Masquer":"Publier"}</button>
            <button class="btn-edit" data-action="edit">Éditer</button>
            <button class="btn-delete" data-action="delete">Supprimer</button>
          </div>
        </div>`}).join(""),u.querySelectorAll("[data-action]").forEach(t=>{t.addEventListener("click",()=>z(t))})}async function z(e){const t=e.closest(".section-card").dataset.id,a=e.dataset.action;if(a==="edit"){const{data:n}=await l.from("sections").select("*").eq("id",t).maybeSingle();n&&I(n);return}if(a==="delete"){if(!confirm("Supprimer définitivement cette section ?"))return;await l.from("sections").delete().eq("id",t),await v();return}if(a==="toggle"){const{data:n}=await l.from("sections").select("published").eq("id",t).maybeSingle();await l.from("sections").update({published:!n.published}).eq("id",t),await v();return}if(a==="up"||a==="down"){await D(t,a);return}}async function D(e,i){const{data:t}=await l.from("sections").select("id, order_index").eq("page_id",m.id).order("order_index"),a=t.findIndex(g=>g.id===e),n=i==="up"?a-1:a+1;if(n<0||n>=t.length)return;const s=t[a],d=t[n];await Promise.all([l.from("sections").update({order_index:d.order_index}).eq("id",s.id),l.from("sections").update({order_index:s.order_index}).eq("id",d.id)]),await v()}function I(e=null){o=e,e?(q.textContent="Éditer la section",c.value=e.type,c.disabled=!0,w.checked=!!e.published,S(e.type,e.data||{})):(q.textContent="Ajouter une section",c.disabled=!1,c.value="split",w.checked=!0,S("split",{})),y(""),h.classList.add("is-open")}function x(){h.classList.remove("is-open"),o=null,f={}}k.addEventListener("click",x);O.addEventListener("click",x);h.addEventListener("click",e=>{e.target===h&&x()});H.addEventListener("click",()=>I(null));c.addEventListener("change",()=>{S(c.value,{})});E.addEventListener("click",async()=>{y("Enregistrement…"),E.disabled=!0;try{const e=N();for(const[i,t]of Object.entries(f)){const a=await R(t);e[i]=a}if(o!=null&&o.data&&Object.keys(o.data).forEach(i=>{if(e[i]===void 0||e[i]===""){const t=r.querySelector(`[name="${i}"]`);(t==null?void 0:t.type)==="file"&&!f[i]&&(e[i]=o.data[i])}}),o){const{error:i}=await l.from("sections").update({data:e,published:w.checked}).eq("id",o.id);if(i)throw i}else{const{data:i}=await l.from("sections").select("order_index").eq("page_id",m.id).order("order_index",{ascending:!1}).limit(1),t=i&&i[0]?i[0].order_index+1:0,{error:a}=await l.from("sections").insert({page_id:m.id,type:c.value,order_index:t,data:e,published:w.checked});if(a)throw a}y("Enregistré ✓","success"),setTimeout(()=>{x(),v()},600)}catch(e){console.error(e),y("Erreur : "+e.message,"error")}finally{E.disabled=!1}});(async()=>await U()&&await F())();
