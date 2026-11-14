const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const page=(location.pathname.split('/').pop()||'index.html');
const nav=[['index.html','Home'],['products.html','Products'],['story.html','Our Story'],['contact.html','Contact']];
if($('hdr'))$('hdr').outerHTML='<header><h1 class="brand"></h1><nav>'+nav.map(n=>`<a href="${n[0]}" class="${n[0]===page?'on':''}">${n[1]}</a>`).join('')+'</nav></header>';
if($('ftr'))$('ftr').outerHTML='<footer class="foot"></footer>';
function linkify(v){v=esc(v);if(/^[^\s@]+@[^\s@]+$/.test(v))return `<a href="mailto:${v}">${v}</a>`;if(/^https?:\/\/\S+$/.test(v))return `<a href="${v}" target="_blank">${v}</a>`;return v}
function renderSite(s=SITE){
 const set=(id,t)=>{if($(id))$(id).textContent=t};
 const w=s.brand.split(' ');
 document.querySelectorAll('.brand').forEach(e=>e.innerHTML=esc(w[0])+(w.length>1?' <span>'+esc(w.slice(1).join(' '))+'</span>':''));
 document.querySelectorAll('.foot').forEach(e=>e.textContent=s.footer);
 set('h-title',s.heroTitle);set('h-sub',s.heroSub);set('h-btn',s.heroButton);set('why-title',s.whyTitle);
 set('p-title',s.productsTitle);set('p-note',s.productsNote);set('s-title',s.storyTitle);set('c-title',s.contactTitle);
 if($('hero'))$('hero').style.background=s.heroImage?`linear-gradient(rgba(0,0,0,.15),rgba(0,0,0,.5)),url("${s.heroImage}") center/cover no-repeat #1c2b3a`:'';
 if($('features'))$('features').innerHTML=s.features.map(f=>`<div class="feature"><h4>${esc(f.title)}</h4><p>${esc(f.text)}</p></div>`).join('');
 if($('product-list'))$('product-list').innerHTML=s.products.map(p=>`<div class="card"><div class="img">${p.image?`<img src="${p.image}" alt="${esc(p.name)}">`:'🏔️'}</div><div class="info"><h4>${esc(p.name)}</h4><div class="price">₹${esc(p.price)}</div><a class="btn" href="${esc(p.link||'#')}" target="_blank">Buy Now</a></div></div>`).join('');
 if($('story'))$('story').innerHTML=s.story.split(/\n\s*\n/).map(t=>`<p>${esc(t)}</p>`).join('');
 if($('contacts'))$('contacts').innerHTML=s.contacts.map(c=>`<p><strong>${esc(c.label)}:</strong> ${linkify(c.value)}</p>`).join('');
}
renderSite();
