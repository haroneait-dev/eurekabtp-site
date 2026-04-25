import{s as g}from"./supabase-client-Dogz5OU6.js";function t(r){return String(r??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function u(r){return r?String(r).split(/\n\s*\n/).map(e=>`<p>${t(e.trim()).replace(/\n/g,"<br>")}</p>`).join(""):""}function b(r){const e=r.data||{};return`
    <section class="cms-hero service-hero" ${e.bg_image?`style="background:url('${t(e.bg_image)}') center/cover no-repeat;"`:""}>
      <div class="service-hero-overlay"></div>
      <div class="service-hero-content">
        ${e.eyebrow?`<p class="section-eyebrow">${t(e.eyebrow)}</p>`:""}
        ${e.title?`<h1>${t(e.title)}</h1>`:""}
        ${e.subtitle?`<p>${t(e.subtitle)}</p>`:""}
      </div>
    </section>`}function $(r){const e=r.data||{},i=e.variant==="dark"?"dark-bg":"light-bg",o=(e.image_position||"right")==="left"?"reverse":"",s=e.variant==="dark"?'<div class="eureka-blueprint-watermark"></div>':"",c=i==="light-bg"?"border-color: var(--anthracite); color: var(--anthracite);":"";return`
    <section class="cms-split" style="padding:0; max-width:100%;">
      <div class="eureka-split ${o}" data-animate>
        <div class="eureka-split-content ${i}">
          ${s}
          ${e.eyebrow?`<span class="eureka-split-tag">${t(e.eyebrow)}</span>`:""}
          ${e.title?`<h3 class="eureka-split-title">${t(e.title).replace(/\n/g,"<br>")}</h3>`:""}
          ${e.text?`<div class="eureka-split-desc">${u(e.text)}</div>`:""}
          ${e.logo_image?`<img src="${t(e.logo_image)}" alt="" style="height:90px; width:auto; max-width:240px; object-fit:contain; display:block; margin:0 0 2rem;">`:""}
          ${e.cta_label&&e.cta_url?`<a href="${t(e.cta_url)}" class="split-btn" style="${c}">${t(e.cta_label)}</a>`:""}
        </div>
        ${e.image?`<div class="eureka-split-image"><img src="${t(e.image)}" alt=""></div>`:""}
      </div>
    </section>`}function f(r){const e=r.data||{};return`
    <section class="cms-process-intro" style="background:#fff; padding:6rem 2rem 3rem; text-align:center;">
      <div style="max-width:720px; margin:0 auto;" data-animate>
        ${e.eyebrow?`<p class="section-eyebrow">${t(e.eyebrow)}</p>`:""}
        ${e.title?`<h2 style="color:var(--anthracite);">${t(e.title)}</h2>`:""}
      </div>
    </section>`}function y(r){const e=r.data||{};return`
    <section class="cms-cta" style="background:var(--dark); padding:6rem 2rem; text-align:center;">
      <div style="max-width:640px; margin:0 auto;" data-animate>
        ${e.eyebrow?`<p class="section-eyebrow" style="color:#fff;">${t(e.eyebrow)}</p>`:""}
        ${e.title?`<h2 style="color:#fff; margin-bottom:1rem;">${t(e.title)}</h2>`:""}
        ${e.text?`<p style="color:rgba(255,255,255,0.65); font-size:1rem; line-height:1.75; margin-bottom:2.5rem;">${t(e.text)}</p>`:""}
        ${e.cta_label&&e.cta_url?`<a href="${t(e.cta_url)}" class="btn-primary">${t(e.cta_label)}</a>`:""}
      </div>
    </section>`}const h={hero:b,split:$,process_intro:f,cta:y};async function w(r,e="cms-content",i={}){const n=document.getElementById(e);if(!n)return;const o=new Set(i.skipTypes||[]),{data:s,error:c}=await g.from("pages").select("id").eq("slug",r).maybeSingle();if(c||!s){console.warn("CMS: page not found for slug",r);return}const{data:m,error:l}=await g.from("sections").select("*").eq("page_id",s.id).eq("published",!0).order("order_index");if(l){console.error("CMS: error loading sections",l);return}const d=(m||[]).filter(a=>!o.has(a.type));d.length!==0&&(n.innerHTML=d.map(a=>{const p=h[a.type];return p?p(a):""}).join(""),window.gsap&&window.ScrollTrigger&&document.querySelectorAll("[data-animate]:not([data-animated])").forEach(a=>{a.setAttribute("data-animated","true"),window.gsap.from(a,{y:30,opacity:0,duration:.75,ease:"power2.out",scrollTrigger:{trigger:a,start:"top 85%"}})}))}export{w as r};
