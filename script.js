const progress=document.querySelector('.progress');
window.addEventListener('scroll',()=>{if(!progress)return;const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(h>0?(scrollY/h)*100:0)+'%';},{passive:true});

// Fallback stylesheet loaders keep GitHub Pages cache/MIME edge cases harmless.
Promise.all(['style-v2.css?cache=20260908','premium.css?cache=20260908','executive-v5.css?cache=20260914'].map(u=>fetch(u,{cache:'no-store'}).then(r=>r.text()).catch(()=>''))).then(cssList=>cssList.forEach((css,i)=>{if(!css)return;const ids=['site-css-fallback','premium-css-fallback','executive-css-fallback'];const id=ids[i];if(!document.getElementById(id)){const s=document.createElement('style');s.id=id;s.textContent=css;document.head.appendChild(s);}}));

// Technical SEO metadata + JSON-LD. Runs on every page so page titles, canonical URLs,
// social previews and structured data stay consistent across the static GitHub Pages site.
(function(){const s=document.createElement('script');s.src='seo.js?cache=20260914';s.defer=true;document.head.appendChild(s);})();

// Resume routing.
(function(){const resume=document.querySelector('.resume');if(resume){resume.href='documents/Abhinav_Bajpai_Resume_Password_Protected.pdf';resume.target='_blank';resume.rel='noopener';}})();

// Shared premium navigation.
(function(){const nav=document.querySelector('.nav nav');if(!nav)return;const path=location.pathname.split('/').pop()||'index.html';const items=[['index.html','Home'],['profile.html','Profile'],['experience.html','Experience'],['projects.html','Projects'],['awards.html','Awards'],['contact.html','Contact']];nav.innerHTML=items.map(([href,label])=>`<a href="${href}" class="${path===href?'active':''}">${label}</a>`).join('');const header=document.querySelector('.nav');if(header&&!header.querySelector('.nav-tools')){const tools=document.createElement('div');tools.className='nav-tools';tools.innerHTML='<button class="theme-toggle" type="button" aria-label="Toggle theme">◐</button><button class="menu-toggle" type="button" aria-label="Open menu">☰</button>';header.appendChild(tools);const menu=tools.querySelector('.menu-toggle');menu.addEventListener('click',()=>{nav.classList.toggle('mobile-open');menu.textContent=nav.classList.contains('mobile-open')?'×':'☰';});tools.querySelector('.theme-toggle').addEventListener('click',()=>{document.documentElement.classList.toggle('dark');localStorage.setItem('ab-theme',document.documentElement.classList.contains('dark')?'dark':'light');});}if(localStorage.getItem('ab-theme')==='dark')document.documentElement.classList.add('dark');nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('mobile-open')));})();

// Scroll reveal using IntersectionObserver — lightweight, no libraries.
(function(){const els=document.querySelectorAll('section,.brand-card,.sector-grid article,.expertise-grid article,.project-grid article,.metrics>div,.impact-grid>div,.contact-cards>a,.career-timeline article,.feature-panel,.process-strip>div,.award-card,.award-stat,.scope-card');if(!('IntersectionObserver'in window)){els.forEach(e=>e.classList.add('is-visible'));return;}els.forEach((e,i)=>{e.classList.add('reveal');e.style.setProperty('--delay',`${Math.min(i%6,5)*55}ms`);});const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}}),{threshold:.12,rootMargin:'0px 0px -40px'});els.forEach(e=>io.observe(e));})();

// Animated counters for elements explicitly marked with data-count.
(function(){document.querySelectorAll('[data-count]').forEach(el=>{const target=Number(el.dataset.count),suffix=el.dataset.suffix||'';let started=false;const run=()=>{if(started)return;started=true;const t0=performance.now(),dur=1100;const tick=now=>{const p=Math.min((now-t0)/dur,1),v=Math.round(target*(1-Math.pow(1-p,3)));el.textContent=v.toLocaleString('en-IN')+suffix;if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)};new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&run()),{threshold:.7}).observe(el);});})();

// Projects page filters.
(function(){const buttons=document.querySelectorAll('.filter');const cards=document.querySelectorAll('.project-grid-wide article[data-category]');if(!buttons.length)return;buttons.forEach(btn=>btn.addEventListener('click',()=>{buttons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;cards.forEach(c=>c.classList.toggle('filtered-out',!(f==='all'||c.dataset.category===f)));}));})();

// Employer identity enhancement on the home profile card.
(function(){const logos=document.querySelector('.profile-card .career-logos');if(!logos)return;logos.innerHTML='<div class="career-logo awl-career-logo">AWL <span>Agri business</span></div><div class="career-former"><span>Formerly Adani Wilmar Ltd.</span></div>';logos.setAttribute('aria-label','AWL Agri Business, formerly Adani Wilmar Limited');})();

/* Optional private owner counter.
   When a GoatCounter site is configured, add a meta tag named analytics-goatcounter
   with the site's /count endpoint. The owner-only panel remains invisible until
   Alt+Shift+A is pressed. No tracking service is contacted unless configured.
*/
(function(){
  const endpointMeta=document.querySelector('meta[name="analytics-goatcounter"]');
  if(!endpointMeta||!endpointMeta.content)return;
  const endpoint=endpointMeta.content.replace(/\/$/,'');
  const panel=document.createElement('aside');panel.id='owner-stats';panel.setAttribute('aria-label','Private site analytics');
  panel.innerHTML='<span>PRIVATE SITE STATS</span><b id="owner-visits">—</b><small>visits on this page</small>';
  Object.assign(panel.style,{position:'fixed',right:'16px',bottom:'16px',zIndex:'9999',display:'none',padding:'12px 14px',border:'1px solid rgba(120,130,150,.25)',borderRadius:'12px',background:'rgba(12,18,32,.94)',color:'#fff',font:'12px/1.3 Arial,sans-serif',boxShadow:'0 12px 35px rgba(0,0,0,.22)',textAlign:'right'});
  document.body.appendChild(panel);
  let loaded=false;
  async function loadCount(){if(loaded)return;loaded=true;try{const path=encodeURIComponent(location.pathname);const r=await fetch(endpoint+'/counter/'+path+'.json',{cache:'no-store'});if(!r.ok)throw new Error('counter');const d=await r.json();document.querySelector('#owner-visits').textContent=d.count||'0';}catch(e){document.querySelector('#owner-visits').textContent='—';}}
  window.addEventListener('keydown',e=>{if(e.altKey&&e.shiftKey&&e.key.toLowerCase()==='a'){panel.style.display=panel.style.display==='none'?'block':'none';if(panel.style.display==='block')loadCount();}});
})();
