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