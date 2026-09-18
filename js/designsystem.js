(function(){
  "use strict";
  var toast=document.getElementById('toast'), toastMsg=document.getElementById('toastMsg'), tTimer;
  function showToast(m){ toastMsg.textContent=m; toast.classList.add('is-on'); clearTimeout(tTimer); tTimer=setTimeout(function(){toast.classList.remove('is-on');},1600); }

  var ba=document.getElementById('ovBa');
  var mB=document.getElementById('ovBefore'), mA=document.getElementById('ovAfter');
  function setMode(mode){
    ba.classList.remove('mode-before','mode-after'); ba.classList.add('mode-'+mode);
    ba.style.setProperty('--pos', mode==='before' ? 100 : 0);
    mB.classList.toggle('is-on',mode==='before'); mA.classList.toggle('is-on',mode==='after');
    mB.setAttribute('aria-selected', String(mode==='before')); mA.setAttribute('aria-selected', String(mode==='after'));
  }
  mB.addEventListener('click',function(){setMode('before');});
  mA.addEventListener('click',function(){setMode('after');});

  var TOKENS=[
    {name:'Brand Purple',hex:'#534AB7',role:'Primary · call-to-action',flag:'Brand',why:'Research with customers, prospects, and sales found that purple reads as neutral in government and military contexts — free of service-branch and partisan association. It became the primary brand color and the color of every call to action.'},
    {name:'Purple Accent',hex:'#8B53E7',role:'Accent · eyebrows & marks',flag:'Brand',why:'A lighter purple for overlines, section eyebrows, and the waiver icon — a single accent that keeps the identity coherent without competing with CTAs.'},
    {name:'Purple Deep',hex:'#3C3489',role:'Interactive · hover state',flag:'',why:'The pressed/hover step for purple actions and links. Tokenizing default and hover as a pair keeps every interactive element behaving the same way.'},
    {name:'Chrome Navy',hex:'#26215C',role:'Structure · sidebar',flag:'',why:'A deep purple-navy carries the sidebar and app chrome — authoritative and secure while staying in the purple family.'},
    {name:'Deep Navy',hex:'#211A4A',role:'Structure · CUI banners',flag:'',why:'The deepest tone anchors the Controlled Unclassified Information banners pinned top and bottom — a fixed, unmistakable frame required in this domain.'},
    {name:'Tint',hex:'#F3F1FE',role:'Surface · info callouts',flag:'',why:'A soft purple wash for in-context policy callouts and selected states — quiet enough to hold guidance text without shouting.'},
    {name:'Compliant',hex:'#21720C',role:'Status · positive',flag:'',why:'Green means compliant — but never alone. Every status pairs color with an icon and a word, so meaning survives for color-blind users and grayscale printouts.'},
    {name:'Non-compliant',hex:'#7E1616',role:'Status · negative',flag:'',why:'Red flags non-compliance. Backed by a cancel icon and label, it reads instantly without relying on hue.'},
    {name:'In progress',hex:'#A66900',role:'Status · in progress',flag:'',why:'Amber marks a qualification clock that is still running — one of three states that count inside the compliant band per policy.'},
    {name:'Active waiver',hex:'#26215C',role:'Status · policy waiver',flag:'Policy',why:'The purple waiver family signals a policy exception. Referenced through a waiver token alias rather than the raw purple ramp — so brand purple and policy purple can diverge without a rewrite.'}
  ];
  var swatches=document.getElementById('swatches'), tokRole=document.getElementById('tokRole'), tokName=document.getElementById('tokName'), tokHex=document.getElementById('tokHex'), tokWhy=document.getElementById('tokWhy'), copyBtn=document.getElementById('copyBtn'), activeHex=TOKENS[0].hex;
  function selectToken(t,el){ tokRole.textContent=t.role; tokName.textContent=t.name; tokHex.textContent=t.hex; tokWhy.textContent=t.why; activeHex=t.hex; var a=swatches.querySelectorAll('.sw'); for(var i=0;i<a.length;i++)a[i].classList.remove('is-active'); if(el)el.classList.add('is-active'); }
  function copyHex(hex){ if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(hex).then(function(){showToast(hex+' copied');},function(){showToast(hex);}); } else { var ta=document.createElement('textarea'); ta.value=hex; document.body.appendChild(ta); ta.select(); try{document.execCommand('copy');showToast(hex+' copied');}catch(e){showToast(hex);} document.body.removeChild(ta); } }
  TOKENS.forEach(function(t,idx){ var b=document.createElement('button'); b.className='sw'+(idx===0?' is-active':''); b.type='button'; b.innerHTML='<div class="sw__chip" style="background:'+t.hex+'"></div><div class="sw__meta"><div class="sw__name">'+t.name+'</div><div class="sw__hex">'+t.hex+'</div>'+(t.flag?'<div class="sw__flag">'+t.flag+'</div>':'')+'</div>'; b.addEventListener('click',function(){selectToken(t,b);copyHex(t.hex);}); swatches.appendChild(b); });
  copyBtn.addEventListener('click',function(){copyHex(activeHex);});

  var tabOld=document.getElementById('tabOld'), tabNew=document.getElementById('tabNew'), stageOld=document.getElementById('stageOld'), stageNew=document.getElementById('stageNew'), cmpLabel=document.getElementById('cmpLabel');
  function setEra(isNew){ tabOld.classList.toggle('is-on',!isNew); tabNew.classList.toggle('is-on',isNew); stageOld.classList.toggle('is-hidden',isNew); stageNew.classList.toggle('is-hidden',!isNew); cmpLabel.textContent=isNew?'One tokenized set — pill shapes, purple actions, soft elevation':'One-off styles, 4px corners, navy actions'; }
  tabOld.addEventListener('click',function(){setEra(false);}); tabNew.addEventListener('click',function(){setEra(true);});

  var TIPS={
    foundational:{t:'Foundational requirement',b:'Baseline training every assigned person must hold — like Cyber Awareness. Due within 9 months of a work-role assignment.',c:'DoDM 8140.03 §4.3 · 9-month window'},
    ojt:{t:'Residential — OJT',b:'On-the-job residential training. Due within 12 months of assignment. Shown in its own reserved hue so a requirement type never reads as a status.',c:'12-month window'},
    env:{t:'Residential — Environment',b:'Environment-specific residential training, due within 12 months. Part of the residential requirement family alongside OJT.',c:'12-month window'},
    role:{t:'New role assigned',b:'A work role was just assigned to you, which brings its own required qualifications. The clock on each starts from the assignment date.',c:''},
    new:{t:'New requirement',b:'Added to your list but not yet started. It counts against your compliance until completed and verified.',c:''},
    window:{t:'The 9- and 12-month windows',b:'Foundational requirements are due within 9 months of a work-role assignment; residential within 12. The rule is written into the dashboard so managers never look it up.',c:'Reflects DoDM 8140.03 §4.3'},
    compliant:{t:'Compliant',b:'Meets every active qualification requirement for the assigned work roles. Recalculated nightly — the dashboard shows the latest evaluation, not last login.',c:''},
    progress:{t:'Qualification in progress',b:'A qualification clock is still running, and this counts inside the compliant band — the person is on track within their window. Surfacing that stops managers over-reporting risk.',c:'Counts toward Compliant'},
    waiver:{t:'Active waiver',b:'A documented policy exception is in force, so the requirement is temporarily satisfied. Shown in the purple waiver family — never green or red — so it is never mistaken for compliance or failure.',c:'Waiver token family'},
    noncompliant:{t:'Non-compliant',b:'One or more required qualifications are past due or unmet. These are the people the Action-needed card pulls to the top so follow-up is the first thing you see.',c:''},
    selfnc:{t:'Your own status',b:'The chrome carries the signed-in manager\u2019s personal status at all times, so they are never surprised by their own compliance.',c:''}
  };
  var tt=document.getElementById('tt'), ttBody=document.getElementById('ttBody'), current=null;
  function show(el){ var d=TIPS[el.getAttribute('data-tip-key')]; if(!d)return; ttBody.innerHTML='<b>'+d.t+'</b>'+d.b+(d.c?'<cite>'+d.c+'</cite>':''); tt.classList.add('is-on'); var r=el.getBoundingClientRect(), tr=tt.getBoundingClientRect(), vw=innerWidth; var below=r.bottom+10+tr.height<innerHeight; var top=below?r.bottom+10:r.top-10-tr.height; var left=Math.max(12,Math.min(r.left+r.width/2-tr.width/2, vw-tr.width-12)); tt.style.left=left+'px'; tt.style.top=top+'px'; current=el; }
  function hide(){ tt.classList.remove('is-on'); current=null; }
  var tips=document.querySelectorAll('[data-tip-key]');
  for(var i=0;i<tips.length;i++){(function(el){ el.setAttribute('tabindex','0'); el.addEventListener('mouseenter',function(){show(el);}); el.addEventListener('mouseleave',hide); el.addEventListener('focus',function(){show(el);}); el.addEventListener('blur',hide); el.addEventListener('click',function(e){e.stopPropagation(); current===el?hide():show(el);}); })(tips[i]);}
  document.addEventListener('click',hide);
  addEventListener('scroll',function(){ if(current) show(current); },true);
  addEventListener('resize',hide);
})();
