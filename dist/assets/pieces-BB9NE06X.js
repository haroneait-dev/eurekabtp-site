import{s as i,P as r}from"./supabase-client-jymPkMbK.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";function o(t){return String(t??"").replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a])}function d(t){const a=[t.titre,t.description,t.tag,t.in_stock?"":"rupture stock indisponible",t.is_promo?"promo promotion soldes":""].filter(Boolean).join(" ").toLowerCase(),s=t.tag||"Pièce",e=!t.in_stock,c=e?'<span class="catalog-stock-badge catalog-stock-badge--out">Rupture de stock</span>':'<span class="catalog-stock-badge catalog-stock-badge--in">En stock</span>',n=t.is_promo?'<span class="catalog-promo-badge">Promo</span>':"";return`
    <div class="catalog-card${e?" is-out-of-stock":""}${t.is_promo?" is-promo":""}" data-search="${o(a)}" data-tag="${o(s)}" data-dynamic="1">
      <div class="catalog-img catalog-img--light">
        <img src="${o(t.image_url)}" alt="${o(t.titre)}" loading="lazy">
        ${n}
        ${c}
      </div>
      <div class="catalog-content">
        <span class="catalog-tag">${o(s)}</span>
        <h2>${o(t.titre)}</h2>
        <p>${o(t.description||"")}</p>
      </div>
    </div>
  `}(async()=>{const t=document.querySelector(".catalog-grid");if(!t)return;const{data:a,error:s}=await i.from(r).select("*").order("created_at",{ascending:!1});if(s||!a||a.length===0){document.dispatchEvent(new CustomEvent("pieces:loaded",{detail:{added:0}}));return}t.innerHTML=a.map(d).join(""),document.dispatchEvent(new CustomEvent("pieces:loaded",{detail:{added:a.length}}))})();
