/* Physician Academy & Library — aplicação: roteamento, cabeçalho/rodapé, eventos e inicialização. */

const app = document.getElementById('app');
const $ = (id)=>document.getElementById(id);

/* Rotas que podem ser vistas sem login (todo o resto exige conta). */
const PUBLIC_ROUTES = ['terms','privacy'];

/* ============================================================
   UTILITÁRIOS DE INTERFACE
   ============================================================ */
let toastTimer = null;
function toast(msg){
  const el = $('toast');
  el.innerHTML = `${icon('checkCircle',18)} <span>${msg}</span>`;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>el.classList.remove('show'), 2600);
}
const modalBackdrop = $('modalBackdrop');
const modalBox = $('modalBox');
function openModal(html, wide){
  modalBox.className = 'modal-box' + (wide ? ' wide' : '');
  modalBox.innerHTML = `<button class="modal-close" id="modalCloseBtn" aria-label="Fechar">${icon('x',18)}</button>${html}`;
  modalBackdrop.classList.add('open');
  $('modalCloseBtn').addEventListener('click', closeModal);
}
function closeModal(){ modalBackdrop.classList.remove('open'); modalBox.innerHTML=''; }
modalBackdrop.addEventListener('click', (e)=>{ if(e.target===modalBackdrop) closeModal(); });
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape'){ closeModal(); closeDropdowns(); } });

function setMeta(title, desc){
  $('pageTitle').textContent = title + ' — Physician Academy & Library';
  if(desc){ $('metaDesc').setAttribute('content', desc); $('ogDesc').setAttribute('content', desc); }
  $('ogTitle').setAttribute('content', title);
}

/* ============================================================
   CABEÇALHO / RODAPÉ
   ============================================================ */
function renderUserDropdownContent(){
  const user = DB.currentUser();
  if(!user) return '';
  return `<div class="ud-section"><div class="ud-hello">${personAvatar(user.name,42,user.photo)}<div><b>${esc(user.name)}</b>${esc(user.username?'@'+user.username:user.email)}</div></div></div>
    <div class="ud-section ud-links">
      <a href="#/my-courses">${icon('graduation',18)} ${T('ud_my_courses')}</a>
      ${user.isAdmin ? `<a href="#/admin">${icon('settings',18)} ${T('ud_admin')}</a>` : ''}
      <a href="#/contact">${icon('mail',18)} ${T('nav_contact')}</a>
      <button id="btnLogout">${icon('logout',18)} ${T('ud_logout')}</button>
    </div>
    <div class="ud-section"><h5>${T('ud_lang_label')}</h5><div class="ud-lang-list" id="langSwitch">
      ${[['pt','Português'],['en','English'],['es','Español'],['fr','Français']].map(([k,n])=>`<button data-lang="${k}" class="${LANG===k?'active':''}"><span>${n}</span><span class="check">${icon('check',15)}</span></button>`).join('')}
    </div></div>`;
}
function renderBellContent(){
  const recent = allTopics().slice(0,4);
  return `<div class="ud-section"><h5>${T('notif_h')}</h5>
    ${recent.map(t=>`<a class="notif-item" href="#/library/${t.slug}"><b>${esc(L(t,'title'))}</b><span>${esc(t.author)} · ${esc(t.when)}</span></a>`).join('')}
  </div>`;
}
function refreshCartBadge(){
  const n = DB.cart().length;
  const el = $('cartCount');
  el.textContent = n; el.hidden = n===0;
}
function refreshAvatar(){
  const user = DB.currentUser();
  const btn = $('avatarBtn');
  if(!user){ btn.className='login-btn'; btn.innerHTML = `${icon('user',18)} ${T('ud_tab_login')}`; return; }
  btn.className = 'login-btn is-avatar';
  btn.innerHTML = user.photo ? `<img src="${user.photo}" alt="${esc(user.name)}">` : initials(user.name);
  btn.setAttribute('aria-label', user.name);
}
function applyChrome(){
  const user = DB.currentUser();
  document.body.classList.toggle('auth-mode', !user);
  document.documentElement.lang = LANG==='pt' ? 'pt-BR' : LANG;
  const txt = {navHome:'nav_home', navLibrary:'nav_library', navAcademy:'nav_academy', navFree:'nav_free',
    footAbout:'foot_about', footTerms:'foot_terms', footPrivacy:'foot_privacy', footLib:'foot_lib', footForum:'foot_forum', footResources:'foot_resources',
    footAca:'foot_aca', footCourses:'foot_courses', footCerts:'foot_certs', footContact:'foot_contact', footRights:'foot_rights',
    cookieText:'cookie_text', cookieAccept:'cookie_accept', cookieReject:'cookie_reject'};
  Object.entries(txt).forEach(([id,key])=>{ const el=$(id); if(el) el.textContent = T(key); });
  $('searchInput').placeholder = T('search_ph');
  $('searchIco').innerHTML = icon('search',19);
  $('cartIco').innerHTML = icon('cart',20);
  $('bellIco').innerHTML = icon('bell',20);
  $('bellDot').hidden = !user || localStorage.getItem('pa_bell_seen')===String(allTopics().length);
  $('navToggle').innerHTML = icon('menu',21);
  $('socialRow').innerHTML = `
    <a href="${CONTACT.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon('instagram',24)}</a>
    <a href="${CONTACT.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icon('facebook',24)}</a>
    <a href="mailto:${CONTACT.email}" aria-label="E-mail">${icon('mail',24)}</a>`;
  $('userDropdown').innerHTML = renderUserDropdownContent();
  $('bellDropdown').innerHTML = user ? renderBellContent() : '';
  bindDropdownHandlers();
  refreshAvatar();
  refreshCartBadge();
}

/* ---- dropdowns (usuário e notificações) ---- */
function closeDropdowns(except){
  [['userDropdown','avatarBtn'],['bellDropdown','bellBtn']].forEach(([d,b])=>{
    if(d===except) return;
    $(d).classList.remove('open'); $(b).setAttribute('aria-expanded','false');
  });
  closeSearchResults();
}
function toggleDropdown(dropId, btnId){
  const dd = $(dropId);
  const open = !dd.classList.contains('open');
  closeDropdowns(dropId);
  dd.classList.toggle('open', open);
  $(btnId).setAttribute('aria-expanded', open?'true':'false');
}
$('avatarBtn').addEventListener('click', (e)=>{ e.stopPropagation(); toggleDropdown('userDropdown','avatarBtn'); });
$('bellBtn').addEventListener('click', (e)=>{ e.stopPropagation(); toggleDropdown('bellDropdown','bellBtn'); localStorage.setItem('pa_bell_seen', String(allTopics().length)); $('bellDot').hidden = true; });
$('userDropdown').addEventListener('click', e=>e.stopPropagation());
$('bellDropdown').addEventListener('click', e=>{ if(!e.target.closest('a')) e.stopPropagation(); });
document.addEventListener('click', ()=>closeDropdowns());
$('navToggle').addEventListener('click', (e)=>{
  e.stopPropagation();
  const nav = $('mainNav'); const open = nav.classList.toggle('open');
  $('searchWrap').classList.toggle('mobile-open', open);
  $('navToggle').setAttribute('aria-expanded', open?'true':'false');
  $('navToggle').innerHTML = icon(open?'x':'menu',21);
});
$('cartBtn').addEventListener('click', (e)=>{ e.stopPropagation(); openCartModal(); });

function bindDropdownHandlers(){
  const logoutBtn = $('btnLogout');
  if(logoutBtn) logoutBtn.addEventListener('click',()=>{ DB.setSession(null); closeDropdowns(); location.hash = '#/'; applyChrome(); route(); });
  document.querySelectorAll('#langSwitch button').forEach(b=>b.addEventListener('click',()=>{
    LANG = b.getAttribute('data-lang'); localStorage.setItem('pa_lang',LANG);
    closeDropdowns(); applyChrome(); route();
  }));
}

/* ---- busca no cabeçalho ---- */
const searchInput = $('searchInput');
const searchResults = $('searchResults');
function closeSearchResults(){ searchResults.classList.remove('open'); }
function renderSearchDropdown(){
  const q = searchInput.value.trim();
  if(q.length < 2){ closeSearchResults(); return; }
  const {topics, courses} = searchAll(q);
  const items = [
    ...courses.slice(0,3).map(c=>`<a class="sr-item" href="#/academy/${c.slug}"><span class="sr-ico">${icon('graduation',18)}</span><span><b>${esc(L(c,'title'))}</b><span>${T('search_courses')} · ${c.price}</span></span></a>`),
    ...topics.slice(0,4).map(t=>`<a class="sr-item" href="#/library/${t.slug}"><span class="sr-ico">${icon('message',18)}</span><span><b>${esc(L(t,'title'))}</b><span>${T('search_topics')} · ${esc(t.author)}</span></span></a>`),
  ];
  searchResults.innerHTML = items.length
    ? items.join('') + `<a class="sr-more" href="#/search/${encodeURIComponent(q)}">${T('search_more')} →</a>`
    : `<div class="sr-empty">${T('search_empty')}</div>`;
  searchResults.classList.add('open');
}
searchInput.addEventListener('input', renderSearchDropdown);
searchInput.addEventListener('focus', renderSearchDropdown);
searchInput.addEventListener('click', e=>e.stopPropagation());
searchInput.addEventListener('keydown', (e)=>{
  if(e.key==='Enter' && searchInput.value.trim()){ location.hash = '#/search/' + encodeURIComponent(searchInput.value.trim()); searchInput.blur(); }
});
searchResults.addEventListener('click', ()=>{ closeSearchResults(); searchInput.value=''; });

/* ============================================================
   CARRINHO E CHECKOUT (demonstração — sem pagamento real)
   ============================================================ */
function addToCart(slug){
  DB.addToCart(slug); refreshCartBadge();
  toast(T('cart_added'));
}
function openCartModal(){
  const items = DB.cart().map(courseBySlug).filter(Boolean);
  const total = items.reduce((a,c)=>a+(c.priceNum||0),0);
  openModal(`<h3>${T('cart_title')}</h3>
    ${items.length ? `
      <div style="margin-top:14px;">${items.map(c=>`<div class="cart-item">
        <img src="${c.img||'assets/img/course-medicina-esporte.jpg'}" alt="">
        <div class="ci-info"><b>${esc(L(c,'title'))}</b><span class="muted">${INSTRUCTOR.name}</span></div>
        <span class="ci-price">${c.price}</span>
        <button data-rmcart="${c.slug}" aria-label="${T('admin_remove')}">${icon('trash',18)}</button>
      </div>`).join('')}</div>
      <div class="cart-total"><span>${T('cart_total')}</span><span>${formatBRL(total)}</span></div>
      <button class="btn btn-success btn-block btn-lg" id="cartCheckout">${T('cart_checkout')}</button>`
    : `<p class="modal-sub" style="margin-top:10px;">${T('cart_empty')}</p><a href="#/academy" class="btn btn-primary btn-block" id="cartBrowse">${T('btn_view_courses')}</a>`}`);
  modalBox.querySelectorAll('[data-rmcart]').forEach(b=>b.addEventListener('click',()=>{ DB.removeFromCart(b.getAttribute('data-rmcart')); refreshCartBadge(); openCartModal(); rerender(); }));
  const co = $('cartCheckout'); if(co) co.addEventListener('click',()=>openCheckoutModal(items.map(c=>c.slug)));
  const br = $('cartBrowse'); if(br) br.addEventListener('click', closeModal);
}
function formatBRL(n){ return 'R$ ' + n.toFixed(2).replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g,'.'); }
function openCheckoutModal(slugs){
  const courses = slugs.map(courseBySlug).filter(Boolean);
  const total = courses.reduce((a,c)=>a+(c.priceNum||0),0);
  openModal(`
    <h3>${T('checkout_title')}</h3>
    <p class="modal-sub">${courses.map(c=>esc(L(c,'title'))).join(' + ')} — <b>${formatBRL(total)}</b></p>
    <div class="demo-banner">${T('checkout_sub')}</div>
    <form id="checkoutForm" novalidate>
      <div class="field"><label for="ckName">${T('checkout_card_name')}</label><input id="ckName" autocomplete="cc-name"></div>
      <div class="field"><label for="ckNumber">${T('checkout_card_number')}</label><input id="ckNumber" inputmode="numeric" placeholder="4242 4242 4242 4242" maxlength="19" autocomplete="cc-number"></div>
      <div class="field-row">
        <div class="field"><label for="ckExp">${T('checkout_card_exp')}</label><input id="ckExp" placeholder="MM/AA" maxlength="5" autocomplete="cc-exp"></div>
        <div class="field"><label for="ckCvv">${T('checkout_card_cvv')}</label><input id="ckCvv" placeholder="123" maxlength="4" inputmode="numeric" autocomplete="cc-csc"></div>
      </div>
      <div id="ckMsg"></div>
      <button class="btn btn-success btn-block btn-lg" type="submit">${T('checkout_confirm')}</button>
    </form>
    <p class="hint">${T('payment_note')}</p>`);
  $('ckNumber').addEventListener('input', e=>{ e.target.value = e.target.value.replace(/\D/g,'').slice(0,16).replace(/(\d{4})(?=\d)/g,'$1 '); });
  $('checkoutForm').addEventListener('submit', (e)=>{
    e.preventDefault();
    const ok = $('ckName').value.trim() && $('ckNumber').value.replace(/\s/g,'').length>=13 && /^\d{2}\/\d{2}$/.test($('ckExp').value) && $('ckCvv').value.length>=3;
    if(!ok){ $('ckMsg').innerHTML = `<p class="form-msg">${T('err_card')}</p>`; return; }
    const user = DB.currentUser();
    courses.forEach(c=>{ DB.enroll(DB.key(user), c.slug); DB.removeFromCart(c.slug); });
    closeModal(); refreshCartBadge();
    toast(T('checkout_success'));
    if(courses.length===1) location.hash = '#/academy/' + courses[0].slug;
    rerender();
  });
}

/* ---- certificado em PDF (jsPDF) ---- */
function issueCertificate(slug){
  const c = courseBySlug(slug); const user = DB.currentUser();
  if(!window.jspdf){ toast(T('pdf_loading')); return; }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({orientation:'landscape', unit:'pt', format:'a4'});
  const w = doc.internal.pageSize.getWidth(), h = doc.internal.pageSize.getHeight();
  doc.setDrawColor(31,99,224); doc.setLineWidth(3); doc.rect(28,28,w-56,h-56);
  doc.setDrawColor(18,62,134); doc.setLineWidth(1); doc.rect(38,38,w-76,h-76);
  doc.setTextColor(18,62,134);
  doc.setFont('helvetica','bold'); doc.setFontSize(28); doc.text('Certificado de Conclusão', w/2, 130, {align:'center'});
  doc.setFont('helvetica','normal'); doc.setFontSize(13); doc.text('Physician Academy & Library', w/2, 156, {align:'center'});
  doc.setTextColor(23,32,51);
  doc.setFontSize(16); doc.text('Certificamos que', w/2, 212, {align:'center'});
  doc.setFont('helvetica','bold'); doc.setFontSize(24); doc.text(user.name, w/2, 244, {align:'center'});
  doc.setFont('helvetica','normal'); doc.setFontSize(14);
  doc.text(`concluiu o curso "${L(c,'title')}"`, w/2, 276, {align:'center'});
  doc.text(`ministrado por ${INSTRUCTOR.name}, com carga horária de ${c.hours} horas.`, w/2, 298, {align:'center'});
  doc.setFontSize(10); doc.text(`Emitido em ${new Date().toLocaleDateString('pt-BR')} · Código: ${slug.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`, w/2, h-56, {align:'center'});
  doc.save(`certificado-${slug}.pdf`);
}

/* ---- aula gratuita (modal com vídeo) ---- */
function openFreeLesson(i){
  const f = FREE[i]; const c = courseBySlug(f.course) || COURSES[0];
  openModal(`<div class="modal-video">
    <video controls autoplay playsinline src="${getVideoSrc(c)}" poster="${f.img}"></video>
    <div class="mv-body">
      <span class="tag">${T('free_tag')}</span>
      <h3 style="margin-top:8px;">${esc(L(f,'title'))}</h3>
      <p class="modal-sub">${esc(L(f,'desc'))}</p>
      <a href="#/academy/${f.course}" class="btn btn-primary" id="freeToCourse">${T('see_full_course')} ${icon('arrowRight',16)}</a>
    </div></div>`, true);
  $('freeToCourse').addEventListener('click', closeModal);
}

/* ============================================================
   ROTEAMENTO
   ============================================================ */
function currentParts(){ return (decodeURIComponent(location.hash.replace(/^#/,'')) || '/').split('/').filter(Boolean); }
function route(){
  const parts = currentParts();
  const user = DB.currentUser();
  let html = '';
  if(!user && !PUBLIC_ROUTES.includes(parts[0])){
    html = renderLogin(); setMeta(T('ud_tab_login'), T('hero_lede'));
  }
  else if(parts.length===0){ html = renderHome(); setMeta('Home', T('hero_lede')); }
  else if(parts[0]==='library' && parts[1]){ const t=topicBySlug(parts[1]); html = renderTopic(parts[1]); setMeta(t?L(t,'title'):T('not_found_h'), t?L(t,'excerpt'):''); }
  else if(parts[0]==='library'){ html = renderLibrary(); setMeta(T('crumb_library'), T('library_sub')); }
  else if(parts[0]==='academy' && parts[1]){
    if(parts[1]!==lastCourseSlug){ openModules={0:true}; currentLessonKey="0-0"; courseTab='content'; playerStarted=false; }
    lastCourseSlug=parts[1];
    const c=courseBySlug(parts[1]); html = renderCourse(parts[1]); setMeta(c?L(c,'title'):T('not_found_h'), c?L(c,'short'):'');
  }
  else if(parts[0]==='academy'){ html = renderAcademy(); setMeta(T('crumb_academy'), T('academy_sub')); }
  else if(parts[0]==='free'){ html = renderFree(); setMeta(T('crumb_free'), T('free_sub')); }
  else if(parts[0]==='about'){ html = renderAbout(); setMeta(T('crumb_about'), T('about_sub')); }
  else if(parts[0]==='contact'){ html = renderContact(); setMeta(T('crumb_contact'), T('contact_sub')); }
  else if(parts[0]==='my-courses'){ html = renderMyCourses(); setMeta(T('crumb_my'), T('my_courses_sub')); }
  else if(parts[0]==='admin'){ html = renderAdmin(); setMeta(T('crumb_admin'), T('admin_sub')); }
  else if(parts[0]==='search'){ html = renderSearch(parts.slice(1).join('/')); setMeta(T('crumb_search'), ''); }
  else if(parts[0]==='terms'){ html = legalDoc('terms'); setMeta(T('terms_title'), ''); }
  else if(parts[0]==='privacy'){ html = legalDoc('privacy'); setMeta(T('privacy_title'), ''); }
  else { html = render404(); setMeta(T('not_found_h'), ''); }
  document.body.classList.toggle('auth-mode', !user);
  app.innerHTML = html;
  updateNavActive(parts);
  bindDynamicHandlers();
  closeDropdowns();
}
/* Re-renderiza a página atual sem voltar ao topo (curtidas, filtros, carrinho…). */
function rerender(){ const y = window.scrollY; route(); window.scrollTo(0,y); }
function navigate(){ route(); window.scrollTo(0,0); }

function updateNavActive(parts){
  document.querySelectorAll('nav.mainnav a').forEach(a=>{
    const r = a.getAttribute('data-route'); const current = '/'+(parts[0]||'');
    a.classList.toggle('active', r===current);
  });
  $('mainNav').classList.remove('open');
  $('searchWrap').classList.remove('mobile-open');
  $('navToggle').innerHTML = icon('menu',21);
}

/* ============================================================
   EVENTOS DAS PÁGINAS
   ============================================================ */
function on(sel, ev, fn){ document.querySelectorAll(sel).forEach(el=>el.addEventListener(ev, e=>fn(el,e))); }
function bindDynamicHandlers(){
  const user = DB.currentUser(); const ukey = DB.key(user);

  /* --- login / cadastro --- */
  on('[data-authtab]','click',(el)=>{
    document.querySelectorAll('[data-authtab]').forEach(x=>x.classList.toggle('active', x===el));
    $('authPane').innerHTML = el.getAttribute('data-authtab')==='login' ? authPaneLogin() : authPaneSignup();
    bindDynamicHandlers();
  });
  const loginForm = $('loginForm');
  if(loginForm) loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const u = DB.findByLogin($('loginId').value);
    const pass = $('loginPassword').value;
    if(!u || (!u.noPassword && u.password!==pass)){ $('loginMsg').innerHTML = `<p class="form-msg">${T('err_invalid_login')}</p>`; return; }
    DB.setSession(DB.key(u)); applyChrome(); navigate();
  });
  const signupForm = $('signupForm');
  if(signupForm) signupForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const name=$('suName').value.trim(), username=$('suUser').value.trim().toLowerCase(), email=$('suEmail').value.trim(), pass=$('suPassword').value;
    const msg = (k)=>{ $('suMsg').innerHTML = `<p class="form-msg">${T(k)}</p>`; };
    if(!name||!username||!email||!pass) return msg('err_fill_fields');
    if(!/^[a-z0-9._-]{3,30}$/.test(username)) return msg('err_username_invalid');
    if(!/^\S+@\S+\.\S+$/.test(email)) return msg('err_email_invalid');
    if(pass.length<6) return msg('err_password_short');
    if(DB.findByLogin(username)) return msg('err_username_exists');
    if(DB.findByLogin(email)) return msg('err_email_exists');
    const users = DB.users();
    users.push({name, username, email, password:pass, isAdmin:false, photo:null});
    DB.saveUsers(users); DB.setSession(username);
    applyChrome(); navigate(); toast(T('welcome_toast'));
  });

  /* --- rolagem suave para âncoras internas --- */
  on('[data-scroll]','click',(el,e)=>{ e.preventDefault(); const t=$(el.getAttribute('data-scroll')); if(t){ t.scrollIntoView({behavior:'smooth', block:'start'}); const ta=t.querySelector('textarea'); if(ta) setTimeout(()=>ta.focus(),400); } });

  /* --- fórum: lista --- */
  on('.cat-item','click',(el)=>{ activeCat = el.getAttribute('data-cat'); rerender(); });
  on('[data-libtab]','click',(el)=>{ libTab = el.getAttribute('data-libtab'); rerender(); });
  const btnNewTopic = $('btnNewTopic');
  if(btnNewTopic) btnNewTopic.addEventListener('click',()=>{
    const panel = $('newTopicPanel');
    panel.innerHTML = panel.innerHTML ? '' : renderNewTopicForm();
    if(!panel.innerHTML) return;
    panel.scrollIntoView({behavior:'smooth', block:'center'});
    $('ntSubmit').addEventListener('click',()=>{
      const titleV = $('ntTitle').value.trim(), bodyV = $('ntBody').value.trim(), catV = $('ntCat').value;
      if(!titleV || !bodyV){ $('ntMsg').innerHTML = `<p class="form-msg">${T('err_fill_fields')}</p>`; return; }
      DB.addCustomTopic({slug:slugify(titleV), cat:catV, tags:[T('cat_'+catV)], author:user.name, role:'', title:titleV,
        excerpt:bodyV.slice(0,160), body:`<p>${esc(bodyV).replace(/\n/g,'<br>')}</p>`, replies:0, views:'0', when:T('now_word'), replies_data:[], related:[], custom:true});
      activeCat = catV; libTab='all';
      toast(T('topic_published')); applyChrome(); rerender();
    });
  });

  /* --- fórum: tópico --- */
  on('[data-like]','click',(el)=>{ DB.toggleLike(ukey, el.getAttribute('data-like')); rerender(); });
  on('[data-replyto]','click',(el)=>{ const ta=$('replyText'); if(!ta) return; ta.value = '@'+el.getAttribute('data-replyto')+' '; $('replyForm').scrollIntoView({behavior:'smooth', block:'center'}); setTimeout(()=>ta.focus(),350); });
  const replySortSel = $('replySort'); if(replySortSel) replySortSel.addEventListener('change',()=>{ replySort = replySortSel.value; rerender(); });
  const btnBookmark = $('btnBookmark'); if(btnBookmark) btnBookmark.addEventListener('click',()=>{ const on=DB.toggleBookmark(ukey, btnBookmark.getAttribute('data-slug')); toast(T(on?'bookmark_on':'bookmark_off')); rerender(); });
  const btnShare = $('btnShare'); if(btnShare) btnShare.addEventListener('click', async ()=>{
    const url = location.href;
    try{ if(navigator.share){ await navigator.share({title:document.title, url}); return; } await navigator.clipboard.writeText(url); toast(T('link_copied')); }
    catch(_){ /* usuário cancelou o compartilhamento */ }
  });
  const submitReply = $('btnSubmitReply');
  if(submitReply) submitReply.addEventListener('click',()=>{
    const text = $('replyText').value.trim(); if(!text) return;
    DB.addForumPost(submitReply.getAttribute('data-slug'), {who:user.name, role:'', when:T('now_word'), text});
    replySort='recent'; rerender(); toast(T('reply_published'));
  });

  /* --- catálogo --- */
  const fSpec=$('fSpec'), fLevel=$('fLevel'), fPrice=$('fPrice'), fSort=$('fSort');
  if(fSpec) fSpec.addEventListener('change',()=>{ specFilter=fSpec.value; rerender(); });
  if(fLevel) fLevel.addEventListener('change',()=>{ levelFilter=fLevel.value; rerender(); });
  if(fPrice) fPrice.addEventListener('change',()=>{ priceFilter=fPrice.value; rerender(); });
  if(fSort) fSort.addEventListener('change',()=>{ courseSort=fSort.value; rerender(); });
  on('[data-clear]','click',(el)=>{ const k=el.getAttribute('data-clear'); if(k==='spec')specFilter=''; if(k==='level')levelFilter=''; if(k==='price')priceFilter=''; rerender(); });
  on('#clearAllFilters, #clearAllFilters2','click',()=>{ specFilter=''; levelFilter=''; priceFilter=''; rerender(); });
  on('[data-addcart]','click',(el)=>{ const s=el.getAttribute('data-addcart'); if(DB.cart().includes(s)){ openCartModal(); return; } addToCart(s); rerender(); });

  /* --- página do curso --- */
  on('[data-ctab]','click',(el)=>{ courseTab = el.getAttribute('data-ctab'); rerender(); });
  on('.mod-head','click',(el)=>{ const i=el.getAttribute('data-mod'); openModules[i]=!openModules[i]; rerender(); });
  const course = lastCourseSlug && courseBySlug(lastCourseSlug);
  const access = course && DB.hasAccess(user, course.slug);
  const startPlayer = ()=>{
    if(!access){ toast(T('locked_msg')); const b=$('btnBuyCourse'); if(b) b.focus(); return; }
    playerStarted = true; rerender();
    const v = $('coursePlayer'); if(v){ v.play().catch(()=>{}); $('lessons').scrollIntoView({behavior:'smooth', block:'center'}); }
  };
  const poster = $('videoPoster'); if(poster) poster.addEventListener('click', startPlayer);
  const btnContinue = $('btnContinue'); if(btnContinue) btnContinue.addEventListener('click', startPlayer);
  on('.lesson-line','click',(el,e)=>{
    if(e.target.matches('input[type=checkbox]')) return;
    currentLessonKey = el.getAttribute('data-lesson');
    startPlayer();
  });
  on('[data-progress]','change',(el)=>{ DB.toggleLesson(ukey, lastCourseSlug, el.getAttribute('data-progress')); rerender(); });
  const buyBtn = $('btnBuyCourse'); if(buyBtn) buyBtn.addEventListener('click',()=>openCheckoutModal([buyBtn.getAttribute('data-slug')]));
  const certBtn = $('btnCertificate'); if(certBtn) certBtn.addEventListener('click',()=>issueCertificate(certBtn.getAttribute('data-slug')));
  on('[data-carousel]','click',(el)=>{ const c=el.closest('div').parentElement.parentElement.querySelector('.carousel'); if(c) c.scrollBy({left:Number(el.getAttribute('data-carousel'))*220, behavior:'smooth'}); });

  /* --- conteúdo gratuito --- */
  on('[data-free]','click',(el)=>openFreeLesson(Number(el.getAttribute('data-free'))));

  /* --- contato (abre o app de e-mail com a mensagem pronta) --- */
  const contactForm = $('contactForm');
  if(contactForm) contactForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const name=$('ctName').value.trim(), email=$('ctEmail').value.trim(), msg=$('ctMsg').value.trim();
    if(!name||!email||!msg){ $('ctFeedback').innerHTML = `<p class="form-msg">${T('err_fill_fields')}</p>`; return; }
    const subject = encodeURIComponent('Contato pelo site — ' + name);
    const body = encodeURIComponent(msg + '\n\n— ' + name + ' <' + email + '>');
    location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    $('ctFeedback').innerHTML = `<p class="form-ok">${icon('checkCircle',16)} ${T('contact_opened')}</p>`;
  });

  /* --- admin --- */
  on('[data-grant]','change',(el)=>{
    const k=el.getAttribute('data-grant'), s=el.getAttribute('data-course');
    if(el.checked) DB.enroll(k,s); else DB.unenroll(k,s);
    toast(T(el.checked?'admin_granted':'admin_revoked'));
  });
  const acSubmit = $('acSubmit');
  if(acSubmit) acSubmit.addEventListener('click',()=>{
    const title=$('acTitle').value.trim(), tag=$('acTag').value.trim(), price=$('acPrice').value.trim(), short=$('acShort').value.trim();
    if(!title || !short){ $('acMsg').innerHTML = `<p class="form-msg">${T('err_fill_fields')}</p>`; return; }
    const priceNum = parseFloat((price.match(/[\d.,]+/)||['0'])[0].replace(/\./g,'').replace(',','.')) || 0;
    DB.addCustomCourse({slug:slugify(title), tag, title, short, price:price||'R$ 0,00', priceNum, level:'iniciante', hours:'—', lessons:'0', students:'0', rating:'5,0', ratingCount:'0', video:COURSES[0].video, img:COURSES[0].img, modules:[]});
    toast(T('admin_saved')); rerender();
  });
  on('[data-rm-course]','click',(el)=>{ DB.removeCustomCourse(el.getAttribute('data-rm-course')); rerender(); });
  const atSubmit = $('atSubmit');
  if(atSubmit) atSubmit.addEventListener('click',()=>{
    const title=$('atTitle').value.trim(), bodyV=$('atBody').value.trim(), cat=$('atCat').value;
    if(!title || !bodyV){ $('atMsg').innerHTML = `<p class="form-msg">${T('err_fill_fields')}</p>`; return; }
    DB.addCustomTopic({slug:slugify(title), cat, tags:[T('cat_'+cat)], author:user.name, role:'Admin', title,
      excerpt:bodyV.slice(0,160), body:`<p>${esc(bodyV)}</p>`, replies:0, views:'0', when:T('now_word'), replies_data:[], related:[], custom:true});
    toast(T('admin_saved')); rerender();
  });
  on('[data-rm-topic]','click',(el)=>{ DB.removeCustomTopic(el.getAttribute('data-rm-topic')); rerender(); });
}

/* ============================================================
   COOKIES + INICIALIZAÇÃO
   ============================================================ */
function initCookieBar(){
  const bar = $('cookieBar');
  if(!localStorage.getItem('pa_cookie_consent')) bar.classList.add('show');
  $('cookieAccept').addEventListener('click',()=>{ localStorage.setItem('pa_cookie_consent','accepted'); bar.classList.remove('show'); loadAnalyticsIfConsented(); });
  $('cookieReject').addEventListener('click',()=>{ localStorage.setItem('pa_cookie_consent','rejected'); bar.classList.remove('show'); });
}

window.addEventListener('hashchange', ()=>{ if(location.hash.startsWith('#/') || location.hash==='' ) navigate(); });
window.addEventListener('storage', (e)=>{ if(e.key==='pa_session'){ applyChrome(); route(); } }); // login/logout em outra aba
applyChrome();
route();
initCookieBar();
loadAnalyticsIfConsented();
