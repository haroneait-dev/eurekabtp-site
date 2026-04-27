import{s as m}from"./supabase-client-jymPkMbK.js";function r(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function l(t){return t?r(String(t).replace(/ /g,"%20")):""}function f(t){return t?String(t).split(/\n\s*\n/).map(e=>`<p>${r(e.trim()).replace(/\n/g,"<br>")}</p>`).join(""):""}function b(t){const e=t.data||{};return`
    <section class="cms-hero service-hero" ${e.bg_image?`style="background:url('${l(e.bg_image)}') center/cover no-repeat;"`:""}>
      <div class="service-hero-overlay"></div>
      <div class="service-hero-content">
        ${e.eyebrow?`<p class="section-eyebrow">${r(e.eyebrow)}</p>`:""}
        ${e.title?`<h1>${r(e.title)}</h1>`:""}
        ${e.subtitle?`<p>${r(e.subtitle)}</p>`:""}
      </div>
    </section>`}function $(t){const e=t.data||{},i=e.variant==="dark"?"dark-bg":"light-bg",o=(e.image_position||"right")==="left"?"reverse":"",s=e.variant==="dark"?'<div class="eureka-blueprint-watermark"></div>':"",c=i==="light-bg"?"border-color: var(--anthracite); color: var(--anthracite);":"";return`
    <section class="cms-split" style="padding:0; max-width:100%;">
      <div class="eureka-split ${o}" data-animate>
        <div class="eureka-split-content ${i}">
          ${s}
          ${e.eyebrow?`<span class="eureka-split-tag">${r(e.eyebrow)}</span>`:""}
          ${e.title?`<h3 class="eureka-split-title">${r(e.title).replace(/\n/g,"<br>")}</h3>`:""}
          ${e.text?`<div class="eureka-split-desc">${f(e.text)}</div>`:""}
          ${e.logo_image?`<img src="${l(e.logo_image)}" alt="" style="height:90px; width:auto; max-width:240px; object-fit:contain; display:block; margin:0 0 2rem;">`:""}
          ${e.cta_label&&e.cta_url?`<a href="${r(e.cta_url)}" class="split-btn" style="${c}">${r(e.cta_label)}</a>`:""}
        </div>
        ${e.image?`<div class="eureka-split-image"><img src="${l(e.image)}" alt=""></div>`:""}
      </div>
    </section>`}function y(t){const e=t.data||{};return`
    <section class="cms-process-intro" style="background:#fff; padding:6rem 2rem 3rem; text-align:center;">
      <div style="max-width:720px; margin:0 auto;" data-animate>
        ${e.eyebrow?`<p class="section-eyebrow">${r(e.eyebrow)}</p>`:""}
        ${e.title?`<h2 style="color:var(--anthracite);">${r(e.title)}</h2>`:""}
      </div>
    </section>`}function h(t){const e=t.data||{};return`
    <section class="cms-cta" style="background:var(--dark); padding:6rem 2rem; text-align:center;">
      <div style="max-width:640px; margin:0 auto;" data-animate>
        ${e.eyebrow?`<p class="section-eyebrow" style="color:#fff;">${r(e.eyebrow)}</p>`:""}
        ${e.title?`<h2 style="color:#fff; margin-bottom:1rem;">${r(e.title)}</h2>`:""}
        ${e.text?`<p style="color:rgba(255,255,255,0.65); font-size:1rem; line-height:1.75; margin-bottom:2.5rem;">${r(e.text)}</p>`:""}
        ${e.cta_label&&e.cta_url?`<a href="${r(e.cta_url)}" class="btn-primary">${r(e.cta_label)}</a>`:""}
      </div>
    </section>`}const v={hero:b,split:$,process_intro:y,cta:h};async function k(t,e="cms-content",i={}){const n=document.getElementById(e);if(!n)return;const o=new Set(i.skipTypes||[]),{data:s,error:c}=await m.from("pages").select("id").eq("slug",t).maybeSingle();if(c||!s){console.warn("CMS: page not found for slug",t);return}const{data:u,error:d}=await m.from("sections").select("*").eq("page_id",s.id).eq("published",!0).order("order_index");if(d){console.error("CMS: error loading sections",d);return}const p=(u||[]).filter(a=>!o.has(a.type));p.length!==0&&(n.innerHTML=p.map(a=>{const g=v[a.type];return g?g(a):""}).join(""),requestAnimationFrame(()=>{!window.gsap||!window.ScrollTrigger||(window.ScrollTrigger.getAll().forEach(a=>a.kill()),document.querySelectorAll("[data-animate]").forEach(a=>{window.gsap.set(a,{clearProps:"all"})}),document.querySelectorAll("[data-animate]").forEach(a=>{window.gsap.from(a,{y:30,opacity:0,duration:.75,ease:"power2.out",scrollTrigger:{trigger:a,start:"top 85%"}})}))}))}export{k as r};
