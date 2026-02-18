
(function(){
  const toast = document.getElementById('toast');
  function show(msg){
    if(!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(window.__t);
    window.__t = setTimeout(()=>toast.classList.remove('show'), 3200);
  }

  document.querySelectorAll('a[data-scroll]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href');
      if(id && id.startsWith('#')){
        e.preventDefault();
        document.querySelector(id)?.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  const y = document.getElementById('y');
  if(y) y.textContent = new Date().getFullYear();

  // Member gate (basic client-side). Not secure; use for convenience only.
  const gate = document.getElementById('memberGate');
  const content = document.getElementById('memberContent');
  const btn = document.getElementById('memberUnlock');
  const input = document.getElementById('memberCode');

  // Change this code anytime
  const CODE = "TZ2026";
  const CODE_NORM = CODE.replace(/\s+/g, "").toUpperCase();

  function unlock(code){
    const norm = String(code||"").replace(/\s+/g, "").toUpperCase();
    if(norm === CODE_NORM){
      gate?.classList.add('hidden');
      content?.classList.remove('hidden');
      show('Freigeschaltet ✅');
      try{ localStorage.setItem('tz_member', '1'); }catch(e){}
    }else{
      show('Code falsch ❌');
    }
  }

  if(btn && input){
    btn.addEventListener('click', ()=> unlock(String(input.value||'').trim()));
    input.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ e.preventDefault(); unlock(String(input.value||'').trim()); }});
  }

  try{
    if(localStorage.getItem('tz_member') === '1'){
      gate?.classList.add('hidden');
      content?.classList.remove('hidden');
    }
  }catch(e){}

  // Lead form toast
  const form = document.getElementById('leadForm');
  if(form){ form.addEventListener('submit', ()=> show('Wird gesendet…')); }
})();
