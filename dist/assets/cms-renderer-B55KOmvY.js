import{s as m}from"./supabase-client-BPmHix10.js";function r(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function d(t){return t?r(String(t).replace(/ /g,"%20")):""}function f(t){return t?String(t).split(/\n\s*\n/).map(e=>`<p>${r(e.trim()).replace(/\n/g,"<br>")}</p>`).join(""):""}function b(t){const e=t.data||{};return`
    <section class="cms-hero service-hero" ${e.bg_image?`style="background:url('${d(e.bg_image)}') center/cover no-repeat;"`:""}>
      <div class="service-hero-overlay"></div>
      <div class="service-hero-content">
        ${e.eyebrow?`<p class="section-eyebrow">${r(e.eyebrow)}</p>`:""}
        ${e.title?`<h1>${r(e.title)}</h1>`:""}
        ${e.subtitle?`<p>${r(e.subtitle)}</p>`:""}
      </div>
    </section>`}function $(t){const e=t.data||{},i=e.variant==="dark"?"dark-bg":"light-bg",c=(e.image_position||"right")==="left"?"reverse":"",s=e.variant==="dark"?'<div class="eureka-blueprint-watermark"></div>':"",l=i==="light-bg"?"border-color: var(--anthracite); color: var(--anthracite);":"";return`
    <section class="cms-split" style="padding:0; max-width:100%;">
      <div class="eureka-split ${c}">
        <div class="eureka-split-content ${i}">
          ${s}
          ${e.eyebrow?`<span class="eureka-split-tag">${r(e.eyebrow)}</span>`:""}
          ${e.title?`<h3 class="eureka-split-title">${r(e.title).replace(/\n/g,"<br>")}</h3>`:""}
          ${e.text?`<div class="eureka-split-desc">${f(e.text)}</div>`:""}
          ${e.logo_image?`<img src="${d(e.logo_image)}" alt="" style="height:90px; width:auto; max-width:240px; object-fit:contain; display:block; margin:0 0 2rem;">`:""}
          ${e.cta_label&&e.cta_url?`<a href="${r(e.cta_url)}" class="split-btn" style="${l}">${r(e.cta_label)}</a>`:""}
        </div>
        ${e.image?`<div class="eureka-split-image"><img src="${d(e.image)}" alt=""></div>`:""}
      </div>
    </section>`}function y(t){const e=t.data||{};return`
    <section class="cms-process-intro" style="background:#fff; padding:6rem 2rem 3rem; text-align:center;">
      <div style="max-width:720px; margin:0 auto;">
        ${e.eyebrow?`<p class="section-eyebrow">${r(e.eyebrow)}</p>`:""}
        ${e.title?`<h2 style="color:var(--anthracite);">${r(e.title)}</h2>`:""}
      </div>
    </section>`}function h(t){const e=t.data||{};return`
    <section class="cms-cta" style="background:var(--dark); padding:6rem 2rem; text-align:center;">
      <div style="max-width:640px; margin:0 auto;">
        ${e.eyebrow?`<p class="section-eyebrow" style="color:#fff;">${r(e.eyebrow)}</p>`:""}
        ${e.title?`<h2 style="color:#fff; margin-bottom:1rem;">${r(e.title)}</h2>`:""}
        ${e.text?`<p style="color:rgba(255,255,255,0.65); font-size:1rem; line-height:1.75; margin-bottom:2.5rem;">${r(e.text)}</p>`:""}
        ${e.cta_label&&e.cta_url?`<a href="${r(e.cta_url)}" class="btn-primary">${r(e.cta_label)}</a>`:""}
      </div>
    </section>`}const v={hero:b,split:$,process_intro:y,cta:h};async function k(t,e="cms-content",i={}){const o=document.getElementById(e);if(!o)return;const c=new Set(i.skipTypes||[]),{data:s,error:l}=await m.from("pages").select("id").eq("slug",t).maybeSingle();if(l||!s){console.warn("CMS: page not found for slug",t);return}const{data:u,error:p}=await m.from("sections").select("*").eq("page_id",s.id).eq("published",!0).order("order_index");if(p){console.error("CMS: error loading sections",p);return}const g=(u||[]).filter(a=>!c.has(a.type));g.length!==0&&(o.innerHTML=g.map(a=>{const n=v[a.type];return n?n(a):""}).join(""),requestAnimationFrame(()=>{var a;window.gsap&&document.querySelectorAll("[data-animate]").forEach(n=>{window.gsap.set(n,{opacity:1,y:0,clearProps:"opacity,transform"})}),(a=window.ScrollTrigger)!=null&&a.refresh&&window.ScrollTrigger.refresh()}))}export{k as r};
