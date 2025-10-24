function parseQuery(hash){
  const q = {}; const i = hash.indexOf('?');
  if(i === -1) return q;
  const s = hash.slice(i+1);
  s.split('&').forEach(p=>{
    const [k,v] = p.split('=');
    q[decodeURIComponent(k)] = decodeURIComponent(v || '');
  });
  return q;
}

function setActiveLink(route){
  document.querySelectorAll('[data-link]').forEach(a=>{
    a.classList.toggle('active', (a.getAttribute('href')||'').includes(route));
  });
}

function router(){
  const hash = location.hash || '#/home';
  const [path] = hash.replace('#/','').split('?');
  setActiveLink(path || 'home');
  const params = parseQuery(hash);

  let html = '';
  if(path === '' || path === 'home'){
    html = Templates.home();
  } else if(path === 'projetos'){
    html = Templates.projetos({ projetos: Store.projetos });
  } else if(path === 'cadastro'){
    const id = Number(params.projeto);
    const projetoSelecionado = Store.projetos.find(p=>p.id===id);
    html = Templates.cadastro({ projetoSelecionado });
  } else {
    html = Templates.notFound();
  }

  document.getElementById('app').innerHTML = html;

  if(path === 'cadastro'){
    const form = document.getElementById('form-cadastro');
    form?.addEventListener('submit', (e)=>{
      e.preventDefault();
      if(!form.checkValidity()){ form.reportValidity(); return; }
      const data = Object.fromEntries(new FormData(form).entries());
      alert('Cadastro enviado!\n' + JSON.stringify(data, null, 2));
      location.hash = '#/home';
    });
  }
}