/* SEO foundation for abhinavbajpai.in
   Adds page-specific metadata and JSON-LD while keeping the visible site clean.
*/
(function(){
  const base='https://abhinavbajpai.in';
  const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const pages={
    'index.html':{
      title:'Abhinav Bajpai | Supply Chain & Commercial Leader | Adani Wilmar, AWL',
      description:'Abhinav Bajpai is a Commercial & Supply Chain Leader with 15+ years across Adani Wilmar, AWL Agribusiness, Mundra port operations, procurement, dispatch, warehouse, imports, exports, GST, customs and commercial automation.',
      keywords:'Abhinav Bajpai, Abhinav Bachpay, supply chain professional, commercial professional, Adani Wilmar, AWL Agribusiness, Wilmar Singapore, Mundra, Kutch, Mundra Port, port operations, commercial dispatch, warehouse, stores, RM store, chemical store, packing store, procurement, GST, taxation, invoice, e-way bill, export, import, logistics, supply chain India, Roca, Parryware, Action Construction Equipment'
    },
    'profile.html':{
      title:'Abhinav Bajpai | Supply Chain, Commercial & Procurement Professional',
      description:'Executive profile of Abhinav Bajpai covering commercial leadership, supply chain, procurement, exports, finance, warehouse, dispatch, logistics, GST, customs, stores and data-driven operations.',
      keywords:'Abhinav Bajpai profile, supply chain professional India, commercial manager, procurement, warehouse, dispatch, stores, GST, customs, exports, imports, logistics'
    },
    'experience.html':{
      title:'Abhinav Bajpai | 15+ Years Commercial & Supply Chain Experience',
      description:'Career experience across AWL Agribusiness and former Adani Wilmar, including Mundra port, exports, finance, warehouse, procurement, logistics, GST and Customs, dispatch and plant commercial operations.',
      keywords:'Abhinav Bajpai experience, Adani Wilmar experience, AWL Agribusiness, Mundra, Kutch, port, exports, finance, warehouse, procurement, logistics, GST, Customs, dispatch, commercial'
    },
    'projects.html':{
      title:'Abhinav Bajpai | GST, E-Way Bill, Dispatch, Export & Supply Chain Projects',
      description:'Selected projects by Abhinav Bajpai across GST analysis, invoices, E-Way Bills, dispatch control, logistics freight, inventory, exports, global trade, procurement and Excel automation.',
      keywords:'GST analysis, GST taxation, invoice analysis, cancelled invoices, E-Way Bill, dispatch, logistics freight, inventory, FIFO LIFO, export sales, import, supply chain projects, Excel automation, Adani Wilmar'
    },
    'awards.html':{
      title:'Abhinav Bajpai | Awards, Promotions & Supply Chain Recognition',
      description:'Awards and professional recognition for Abhinav Bajpai, including AWL promotions, Employee of the Month, Silver Medal Long Service Award, MIT MicroMasters scholarship and measurable commercial impact.',
      keywords:'Abhinav Bajpai awards, AWL awards, Employee of the Month, long service award, MIT MicroMasters, commercial leadership, supply chain recognition'
    },
    'contact.html':{
      title:'Contact Abhinav Bajpai | Commercial & Supply Chain Leadership',
      description:'Contact Abhinav Bajpai for commercial leadership, supply chain, procurement, operations excellence, global trade and transformation opportunities.',
      keywords:'contact Abhinav Bajpai, commercial leader, supply chain leader, procurement, operations, logistics, supply chain India'
    }
  };
  const p=pages[file]||pages['index.html'];
  const canonical=base+(file==='index.html'?'':('/'+file));
  document.title=p.title;
  const set=(name,content)=>{let el=document.querySelector('meta[name="'+name+'"]');if(!el){el=document.createElement('meta');el.name=name;document.head.appendChild(el)}el.content=content};
  set('description',p.description); set('keywords',p.keywords); set('robots','index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  let link=document.querySelector('link[rel="canonical"]');if(!link){link=document.createElement('link');link.rel='canonical';document.head.appendChild(link)}link.href=canonical;
  const og={
    'og:type':'website','og:url':canonical,'og:title':p.title,'og:description':p.description,'og:site_name':'Abhinav Bajpai','og:locale':'en_IN','og:image':base+'/assets/abhinav-bajpai-professional.png',
    'twitter:card':'summary_large_image','twitter:title':p.title,'twitter:description':p.description,'twitter:image':base+'/assets/abhinav-bajpai-professional.png'
  };
  Object.entries(og).forEach(([name,content])=>{let el=document.querySelector('meta[property="'+name+'"],meta[name="'+name+'"]');if(!el){el=document.createElement('meta');if(name.startsWith('twitter:'))el.name=name;else el.setAttribute('property',name);document.head.appendChild(el)}el.content=content});
  const person={
    '@type':'Person','@id':base+'/#person','name':'Abhinav Bajpai','url':base+'/','image':base+'/assets/abhinav-bajpai-professional.png','jobTitle':'Associate Manager — Commercial & Supply Chain','description':'Commercial and Supply Chain professional with 15+ years of experience across procurement, logistics, imports, exports, finance, warehouse, dispatch, GST, Customs and process automation.','sameAs':['https://www.linkedin.com/in/abhinavbajpai'],'worksFor':{'@type':'Organization','name':'AWL Agri Business Limited','url':'https://www.awl.in/'},'knowsAbout':['Supply Chain Management','Commercial Operations','Procurement','Warehouse Operations','Dispatch','Logistics','Imports','Exports','GST','Customs','E-Way Bills','Invoice Controls','Excel Automation','MIS','Mundra Port Operations','Liquid Cargo','Stores Management']
  };
  const graph=[person,{'@type':'WebSite','@id':base+'/#website','url':base+'/','name':'Abhinav Bajpai — Commercial & Supply Chain Leader','publisher':{'@id':base+'/#person'}},{'@type':'WebPage','@id':canonical+'#webpage','url':canonical,'name':p.title,'description':p.description,'isPartOf':{'@id':base+'/#website'},'about':{'@id':base+'/#person'},'inLanguage':'en-IN','keywords':p.keywords}];
  let ld=document.getElementById('abhinav-seo-jsonld');if(!ld){ld=document.createElement('script');ld.id='abhinav-seo-jsonld';ld.type='application/ld+json';document.head.appendChild(ld)}ld.textContent=JSON.stringify({'@context':'https://schema.org','@graph':graph});
})();
