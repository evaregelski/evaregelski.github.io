(function(){
  var links=[].slice.call(document.querySelectorAll('.toc a'));
  var secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))}).filter(Boolean);
  if(!('IntersectionObserver' in window)||!secs.length)return;
  new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;
    links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})})},
    {rootMargin:'-20% 0px -70% 0px'}).observe&&secs.forEach(function(s){
      new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;
        links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})})},
        {rootMargin:'-20% 0px -70% 0px'}).observe(s)});
})();

(function(){
  var lb=document.querySelector('[data-lb]'); if(!lb) return;
  var img=lb.querySelector('[data-lb-img]'), stage=lb.querySelector('[data-lb-stage]'),
      cap=lb.querySelector('[data-lb-caption]'), count=lb.querySelector('[data-lb-count]');
  var items=[], idx=0, opener=null;

  function show(i){
    idx=(i+items.length)%items.length;
    var el=items[idx], isVid=el.tagName==='VIDEO';
    var vid=stage.querySelector('[data-lb-vid]');
    if(!vid){ vid=document.createElement('video');
      vid.setAttribute('data-lb-vid',''); vid.controls=true; vid.loop=true;
      vid.playsInline=true; vid.muted=true; stage.appendChild(vid); }
    img.hidden=isVid; vid.hidden=!isVid;
    if(isVid){ img.removeAttribute('src');
      vid.src=el.currentSrc||el.getAttribute('src')||'';
      vid.poster=el.getAttribute('poster')||'';
      var pl=vid.play(); if(pl&&pl.catch) pl.catch(function(){});
    } else { vid.pause(); vid.removeAttribute('src');
      img.src=el.currentSrc||el.src; img.alt=el.alt||''; }
    cap.textContent=el.dataset.caption||el.getAttribute('aria-label')||el.alt||'';
    count.textContent=items.length>1?(idx+1)+' / '+items.length:'';
    stage.dataset.zoom='false'; stage.scrollTop=0; stage.scrollLeft=0;
  }
  function open(el){
    opener=el;
    var g=el.dataset.group;
    items=g?[].slice.call(document.querySelectorAll('.zoomable[data-group="'+g+'"]')):[el];
    show(items.indexOf(el));
    lb.dataset.open='true'; lb.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    lb.querySelector('[data-lb-close]').focus();
  }
  function close(){
    lb.dataset.open='false'; lb.setAttribute('aria-hidden','true');
    document.body.style.overflow=''; img.removeAttribute('src');
    var v=stage.querySelector('[data-lb-vid]'); if(v){ v.pause(); v.removeAttribute('src'); }
    if(opener) opener.focus();
  }

  document.addEventListener('click',function(e){
    var t=e.target.closest('.zoomable');
    if(t){ e.preventDefault(); open(t); }
  });
  lb.querySelector('[data-lb-close]').addEventListener('click',close);
  lb.querySelector('[data-lb-prev]').addEventListener('click',function(){show(idx-1)});
  lb.querySelector('[data-lb-next]').addEventListener('click',function(){show(idx+1)});
  lb.addEventListener('click',function(e){ if(e.target===lb||e.target===stage) close(); });
  stage.addEventListener('click',function(e){ if(e.target.tagName==='VIDEO') e.stopPropagation(); });
  img.addEventListener('click',function(){ stage.dataset.zoom = stage.dataset.zoom==='true'?'false':'true'; });
  document.addEventListener('keydown',function(e){
    if(lb.dataset.open!=='true') return;
    if(e.key==='Escape') close();
    if(e.key==='ArrowLeft') show(idx-1);
    if(e.key==='ArrowRight') show(idx+1);
  });
  [].forEach.call(document.querySelectorAll('.zoomable'),function(el){
    el.setAttribute('tabindex','0'); el.setAttribute('role','button');
    el.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){e.preventDefault();open(el);} });
  });
})();

(function(){
  document.querySelectorAll('[data-compare]').forEach(function(box){
    var tabs=box.querySelectorAll('.compare__tabs button');
    tabs.forEach(function(btn){
      btn.addEventListener('click',function(){
        var want=btn.dataset.pane;
        tabs.forEach(function(b){b.setAttribute('aria-selected', String(b===btn))});
        box.querySelectorAll('figure[data-pane]').forEach(function(f){
          f.dataset.on = String(f.dataset.pane===want);
        });
      });
    });
  });
})();


/* header scroll state + mobile nav */
(function(){
  var bar=document.querySelector('.site-bar');
  var toggle=document.querySelector('.navtoggle');
  var nav=document.getElementById('sitenav');
  if(bar){
    var onScroll=function(){ bar.dataset.scrolled = window.scrollY>8 ? 'true':'false'; };
    onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
  }
  if(!toggle||!nav) return;
  var setOpen=function(open){ toggle.setAttribute('aria-expanded',String(open)); nav.dataset.open=String(open); };
  toggle.addEventListener('click',function(){ setOpen(toggle.getAttribute('aria-expanded')!=='true'); });
  nav.addEventListener('click',function(e){ if(e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){ setOpen(false); toggle.focus(); }
  });
})();

/* a card that opens an image in the lightbox (personas, etc.) */
(function(){
  function fire(card){
    var img=document.querySelector(card.getAttribute('data-opens'));
    if(img){ img.click(); return true; }
    return false;
  }
  document.addEventListener('click',function(e){
    var card=e.target.closest&&e.target.closest('[data-opens]');
    if(!card||e.target.closest('.zoomable')) return;
    if(fire(card)) e.preventDefault();
  });
  document.addEventListener('keydown',function(e){
    if(e.key!=='Enter'&&e.key!==' ') return;
    var card=e.target.closest&&e.target.closest('[data-opens]');
    if(!card) return;
    if(fire(card)) e.preventDefault();
  });
})();

/* persona modals */
(function(){
  var open=null, lastFocus=null;
  function show(sel){
    var m=document.querySelector(sel); if(!m) return false;
    lastFocus=document.activeElement;
    m.dataset.open='true'; open=m;
    document.body.style.overflow='hidden';
    var x=m.querySelector('[data-modal-close]'); if(x) x.focus();
    return true;
  }
  function hide(){
    if(!open) return;
    open.dataset.open='false'; open=null;
    document.body.style.overflow='';
    if(lastFocus&&lastFocus.focus) lastFocus.focus();
  }
  document.addEventListener('click',function(e){
    var t=e.target.closest&&e.target.closest('[data-modal]');
    if(t){ if(show(t.getAttribute('data-modal'))) e.preventDefault(); return; }
    if(e.target.closest&&e.target.closest('[data-modal-close]')){ e.preventDefault(); hide(); return; }
    if(open&&e.target===open) hide();
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&open){ hide(); return; }
    if(e.key!=='Enter'&&e.key!==' ') return;
    var t=e.target.closest&&e.target.closest('[data-modal]');
    if(t&&show(t.getAttribute('data-modal'))) e.preventDefault();
  });
})();
