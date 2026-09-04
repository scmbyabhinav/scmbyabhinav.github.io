const progress=document.querySelector('.progress');window.addEventListener('scroll',()=>{if(!progress)return;const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(h>0?(scrollY/h)*100:0)+'%';},{passive:true});

// Fallback stylesheet loader: applies the site's CSS even if GitHub Pages/browser
// serves the CSS asset with a non-standard MIME type or stale stylesheet cache.
fetch('style-v2.css?cache=20260904',{cache:'no-store'})
  .then(response=>response.text())
  .then(css=>{
    if(!document.getElementById('site-css-fallback')){
      const style=document.createElement('style');
      style.id='site-css-fallback';
      style.textContent=css;
      document.head.appendChild(style);
    }
  })
  .catch(()=>{});

// Profile-card employer identity: current AWL identity with the former
// Adani Wilmar identity shown as a clear historical company name/logo.
(function(){
  const logos=document.querySelector('.profile-card .career-logos');
  if(!logos)return;
  logos.innerHTML=`
    <div class="career-logo awl-career-logo" title="AWL Agri Business">AWL <span>Agri business</span></div>
    <div class="career-former">
      <img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Adani_Wilmar.svg" alt="Adani Wilmar logo" loading="lazy">
      <span>Formerly Adani Wilmar Ltd.</span>
    </div>`;
  logos.setAttribute('aria-label','AWL Agri Business, formerly Adani Wilmar Limited');

  if(!document.getElementById('profile-employer-style')){
    const style=document.createElement('style');
    style.id='profile-employer-style';
    style.textContent=`
      .profile-card .career-logos{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
      .profile-card .career-former{display:flex;align-items:center;gap:7px;padding:5px 8px;border:1px solid #e1e6ee;border-radius:7px;background:#fff;box-shadow:0 3px 10px #0717350b;min-height:38px}
      .profile-card .career-former img{display:block;width:78px;height:30px;object-fit:contain;object-position:center}
      .profile-card .career-former span{font-size:7px;font-weight:700;line-height:1.25;color:#5d6a7e;max-width:105px}
      @media(max-width:600px){.profile-card .career-former img{width:68px}.profile-card .career-former span{max-width:90px}}
    `;
    document.head.appendChild(style);
  }
})();

// Resume protection: always route the website's Resume button to the
// password-encrypted PDF stored under /documents, never the legacy public PDF.
(function(){
  const resume=document.querySelector('.resume');
  if(resume){
    resume.href='documents/Abhinav_Bajpai_Resume_Password_Protected.pdf';
    resume.target='_blank';
    resume.rel='noopener';
  }
})();