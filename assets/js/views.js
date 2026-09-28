/* Physician Academy & Library — telas (funções que devolvem HTML).
   Cada render*() corresponde a uma rota; o roteamento e os eventos ficam em app.js. */

/* ---------- helpers ---------- */
function topicBySlug(s){ return allTopics().find(t=>t.slug===s); }
function courseBySlug(s){ return allCourses().find(c=>c.slug===s); }
function initials(name){ return String(name||'?').split(' ').filter(Boolean).map(w=>w[0]).slice(0,2).join('').toUpperCase(); }
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function num(s){ const t=String(s||'0').trim().toLowerCase(); if(t.endsWith('k')) return parseFloat(t)*1000; return parseFloat(t.replace(/\./g,'').replace(',','.'))||0; }
function crumbs(items){
  return `<nav class="crumbs" aria-label="breadcrumb">${items.map((it,i)=>{
    const last = i===items.length-1;
    const sep = i ? icon('chevronRight',15) : '';
    return sep + (last || !it[1] ? `<span class="current">${it[0]}</span>` : `<a href="${it[1]}">${it[0]}</a>`);
  }).join('')}</nav>`;
}
function personAvatar(name, size, photo){
  const s = size||32;
  const src = photo || (name===INSTRUCTOR.name ? INSTRUCTOR.photo : null);
  return `<span class="avatar" style="width:${s}px;height:${s}px;font-size:${Math.round(s*.36)}px;">${src?`<img src="${src}" alt="">`:initials(name)}</span>`;
}
function totalLessonsOf(c){ return (c.modules||[]).reduce((a,m)=>a+m.lessons.length,0); }
function doneLessonsOf(user,c){
  let d=0; if(!user) return 0;
  (c.modules||[]).forEach((m,i)=>m.lessons.forEach((l,j)=>{ if(DB.isLessonDone(DB.key(user),c.slug,i+'-'+j)) d++; }));
  return d;
}
function coursePct(user,c){ const t=totalLessonsOf(c); return t ? Math.round(doneLessonsOf(user,c)/t*100) : 0; }

/* ==========================================================================
   LOGIN — primeira tela do site
   ========================================================================== */
function renderLogin(){
  return `<div class="auth-page">
    <div class="auth-art" style="background-image:url('assets/img/hero-home.jpg')">
      <div>
        <h1>${T('hero_title')}</h1>
        <p>${T('hero_lede')}</p>
        <ul class="auth-perks">
          <li>${icon('message',20)} ${T('auth_perk1')}</li>
          <li>${icon('graduation',20)} ${T('auth_perk2')}</li>
          <li>${icon('certificate',20)} ${T('auth_perk3')}</li>
        </ul>
      </div>
    </div>
    <div class="auth-panel">
      <div class="auth-card card">
        <div class="brand"><span class="brand-text"><b>Physician</b><span>Academy &amp; Library</span></span></div>
        <h2>${T('auth_welcome')}</h2>
        <p>${T('auth_sub')}</p>
        <div class="ud-tabs" role="tablist">
          <button class="active" data-authtab="login">${T('ud_tab_login')}</button>
          <button data-authtab="signup">${T('ud_tab_signup')}</button>
        </div>
        <div id="authPane">${authPaneLogin()}</div>
        <p class="auth-legal"><a href="#/terms">${T('terms_title')}</a> · <a href="#/privacy">${T('privacy_title')}</a></p>
      </div>
    </div>
  </div>`;
}
function authPaneLogin(){
  return `<form id="loginForm" novalidate>
    <div class="field"><label for="loginId">${T('auth_identifier')}</label><input id="loginId" autocomplete="username" autocapitalize="off"></div>
    <div class="field"><label for="loginPassword">${T('ud_password')}</label><input id="loginPassword" type="password" autocomplete="current-password"></div>
    <div id="loginMsg"></div>
    <button class="btn btn-primary btn-block btn-lg" type="submit">${T('ud_login_btn')}</button>
  </form>`;
}
function authPaneSignup(){
  return `<form id="signupForm" novalidate>
    <div class="field"><label for="suName">${T('ud_name')}</label><input id="suName" autocomplete="name"></div>
    <div class="field"><label for="suUser">${T('auth_username')}</label><input id="suUser" autocomplete="username" autocapitalize="off" placeholder="ex.: drsilva"></div>
    <div class="field"><label for="suEmail">${T('ud_email')}</label><input id="suEmail" type="email" autocomplete="email"></div>
    <div class="field"><label for="suPassword">${T('ud_password')}</label><input id="suPassword" type="password" autocomplete="new-password"></div>
    <div id="suMsg"></div>
    <button class="btn btn-primary btn-block btn-lg" type="submit">${T('ud_signup_btn')}</button>
  </form>`;
}

/* ==========================================================================
   HOME
   ========================================================================== */
function renderHome(){
  return `
  <section class="hero home-hero" style="background-image:url('assets/img/hero-home.jpg')">
    <div class="container"><div class="hero-copy">
      <h1>${T('hero_title')}</h1>
      <p class="lede">${T('hero_lede')}</p>
      <div class="btnrow">
        <a href="#/library" class="btn btn-primary btn-lg">${T('btn_forum_free')}</a>
        <a href="#/academy" class="btn btn-white btn-lg">${T('btn_view_courses')}</a>
      </div>
    </div></div>
  </section>
  <section class="features"><div class="container">
    <div class="feature-grid">
      <div class="feature"><div class="feature-art">${ILLUSTRATIONS.library}</div>
        <div><h2>Physician Library</h2><p>${T('feat_lib_desc')}</p><a href="#/library" class="btn btn-primary">${T('btn_explore_forum')}</a></div></div>
      <div class="feature"><div class="feature-art">${ILLUSTRATIONS.academy}</div>
        <div><h2>Physician Academy</h2><p>${T('feat_aca_desc')}</p><a href="#/academy" class="btn btn-primary">${T('btn_view_catalog')}</a></div></div>
    </div>
  </div></section>
  <div class="stats-band"><div class="container"><div class="stats-grid">
    <div class="stat-card"><div class="stat-art">${ILLUSTRATIONS.members}</div><div><b>${T('stat_members_h')}</b><span>${T('stat_members_p')}</span></div></div>
    <div class="stat-card"><div class="stat-art">${ILLUSTRATIONS.calendar}</div><div><b>${T('stat_daily_h')}</b><span>${T('stat_daily_p')}</span></div></div>
    <div class="stat-card"><div class="stat-art">${ILLUSTRATIONS.shieldBooks}</div><div><b>${T('stat_courses_h')}</b><span>${T('stat_courses_p')}</span></div></div>
  </div></div></div>`;
}

/* ==========================================================================
   PHYSICIAN LIBRARY — lista de tópicos
   ========================================================================== */
let activeCat = 'esportiva';
let libTab = 'all';
function topicsForList(){
  let list = allTopics().filter(t=>t.cat===activeCat);
  if(libTab==='recent') list = list.filter(t=>t.custom).concat(list.filter(t=>!t.custom)); // mais novos primeiro
  if(libTab==='popular') list = list.slice().sort((a,b)=>num(b.views)-num(a.views));
  return list;
}
function topicRowHTML(t){
  const tags = L(t,'tags')||[];
  return `<a class="topic-row" href="#/library/${t.slug}">
    <h3>${esc(L(t,'title'))}</h3>
    <div class="author">${personAvatar(t.author,24)} ${esc(t.author)}</div>
    <p>${esc(L(t,'excerpt'))}</p>
    <div class="topic-meta">
      ${tags.map((tg,i)=>`<span class="pill ${i%2?'pill-green':''}">${esc(tg)}</span>`).join('')}
      <span class="m">${icon('message',17)} ${t.replies} ${T('replies_cap')}</span><span class="dot">•</span>
      <span class="m">${t.views} ${T('views_cap')}</span><span class="dot">•</span>
      <span class="m">${esc(t.when)}</span>
    </div>
    ${t.body && /formula-box|<table/.test(t.body) ? `<span class="clip">${icon('paperclip',20)}</span>` : ''}
  </a>`;
}
function renderLibrary(){
  const cat = CATEGORIES.find(c=>c.id===activeCat) || CATEGORIES[0];
  const list = topicsForList();
  return `<div class="lib-page"><div class="container"><div class="lib-layout">
    <aside>
      <div class="card cat-card">
        <h2>${T('lib_categories')}</h2>
        ${CATEGORIES.map(c=>`<button class="cat-item ${c.id===activeCat?'active':''}" data-cat="${c.id}">
          <span class="cat-ico cat-${c.id}">${icon(c.icon,22)}</span>
          <span><b>${T(c.key)}</b><span class="count">${allTopics().filter(t=>t.cat===c.id).length} ${T('topics_active')}</span></span>
        </button>`).join('')}
        <button class="btn btn-primary" id="btnNewTopic">${icon('plus',18)} ${T('btn_create_topic')}</button>
      </div>
    </aside>
    <div>
      ${crumbs([[T('crumb_home'),'#/'],[T('crumb_library'),'#/library'],[T(cat.key)]])}
      <h1 class="page-title">${T(cat.key)}</h1>
      <div class="tabs" role="tablist">
        <button class="${libTab==='all'?'active':''}" data-libtab="all">${T('tab_all')}</button>
        <button class="${libTab==='recent'?'active':''}" data-libtab="recent">${T('tab_recent')}</button>
        <button class="${libTab==='popular'?'active':''}" data-libtab="popular">${T('tab_popular')}</button>
      </div>
      <div id="newTopicPanel"></div>
      ${list.length ? `<div class="card topic-list">${list.map(topicRowHTML).join('')}</div>`
        : `<div class="empty-state"><h3>${T('no_topics_h')}</h3><p>${T('no_topics_p')}</p></div>`}
    </div>
    <aside class="lib-aside-right">
      <div class="card promo-learn" style="background-image:url('assets/img/promo-aprenda-mais.jpg')">
        <h3>${T('learn_more_h')}</h3><p>${T('learn_more_p')}</p>
        <a href="#/academy" class="btn btn-primary">${T('btn_view_courses')}</a>
      </div>
    </aside>
  </div></div></div>`;
}
function renderNewTopicForm(){
  return `<div class="card card-pad new-topic-panel">
    <h3 class="card-title">${T('new_topic_title')}</h3>
    <div class="field"><label for="ntCat">${T('new_topic_cat')}</label><select id="ntCat">${CATEGORIES.map(c=>`<option value="${c.id}" ${c.id===activeCat?'selected':''}>${T(c.key)}</option>`).join('')}</select></div>
    <div class="field"><label for="ntTitle">${T('new_topic_titlef')}</label><input id="ntTitle"></div>
    <div class="field"><label for="ntBody">${T('new_topic_body')}</label><textarea id="ntBody" rows="4"></textarea></div>
    <div id="ntMsg"></div>
    <button class="btn btn-primary" id="ntSubmit">${T('new_topic_submit')}</button>
  </div>`;
}

/* ==========================================================================
   TÓPICO DO FÓRUM
   ========================================================================== */
let replySort = 'recent';
function topicThreads(t){
  // agrupa cada resposta com as respostas aninhadas que vêm logo depois dela
  const groups = [];
  (t.replies_data||[]).forEach((r,i)=>{
    const item = {...r, id:t.slug+':'+i};
    if(r.nested && groups.length) groups[groups.length-1].children.push(item);
    else groups.push({...item, children:[]});
  });
  (DB.forumPosts()[t.slug]||[]).forEach((r,i)=> groups.push({...r, id:t.slug+':u'+i, likes:0, role:r.role||'', children:[], mine:true}));
  if(replySort==='useful') return groups.slice().sort((a,b)=>b.likes-a.likes);
  return groups.slice().reverse();
}
function replyHTML(r, user, nested){
  const liked = DB.hasLiked(DB.key(user), r.id);
  const likes = (r.likes||0) + (liked?1:0);
  return `<div class="reply ${nested?'nested':''}">
    <div class="reply-top">
      <div class="who-line">${personAvatar(r.who,34)}<div><b>${esc(r.who)}</b><span>${esc(r.role||'')}</span></div></div>
      <span>${esc(r.when)}</span>
    </div>
    <p>${esc(r.text)}</p>
    <div class="reply-foot">
      <button class="reply-link" data-replyto="${esc(r.who)}">${T('action_reply_plain')}</button>
      <button class="${liked?'liked':''}" data-like="${r.id}">${icon('heart',16)} ${T('like_word')} (${likes})</button>
    </div>
  </div>`;
}
function renderTopic(slug){
  const t = topicBySlug(slug);
  if(!t) return render404();
  const user = DB.currentUser(); const ukey = DB.key(user);
  const cat = CATEGORIES.find(c=>c.id===t.cat);
  const related = (t.related||[]).map(topicBySlug).filter(Boolean);
  const threads = topicThreads(t);
  const count = threads.reduce((a,g)=>a+1+g.children.length,0);
  const liked = DB.hasLiked(ukey,'topic:'+slug);
  const saved = DB.hasBookmark(ukey, slug);
  const isInstructor = t.author===INSTRUCTOR.name;
  const flagship = allCourses().find(c=>c.flagship) || allCourses()[0];
  return `<div class="topic-page"><div class="container">
    ${crumbs([[T('crumb_home'),'#/'],[T('crumb_library'),'#/library'],[cat?T(cat.key):'', '#/library'],[T('crumb_topic')]])}
    <div class="detail-layout">
      <div>
        <article class="card op-post">
          <div class="op-head">
            <h1>${esc(L(t,'title'))}</h1>
            <div class="tagset">${(L(t,'tags')||[]).map(tg=>`<span class="tag">${esc(tg)}</span>`).join('')}</div>
          </div>
          <div class="op-author">
            <div class="who-line">${personAvatar(t.author,34)}<div><b>${esc(t.author)}</b><span>${esc(t.role||'')}</span></div></div>
            <span>${esc(t.when)}</span>
          </div>
          <div class="op-body">
            ${(LANG!=='pt' && !t.custom) ? `<p class="content-note">${T('content_note')}</p>` : ''}
            ${t.body}
          </div>
          <div class="action-bar">
            <button class="btn btn-light btn-xs ${liked?'on':''}" data-like="topic:${slug}">${icon('heart',16)} ${T('like_word')} (${(t.likes||15)+(liked?1:0)})</button>
            <button class="btn btn-light btn-xs" data-scroll="replyForm">${icon('reply',16)} ${T('action_reply_plain')}</button>
            <button class="btn btn-light btn-xs" id="btnShare">${icon('share',16)} ${T('share_word')}</button>
            <span class="spacer"></span>
            <button class="btn btn-light btn-xs ${saved?'on':''}" id="btnBookmark" data-slug="${slug}">${icon('bookmark',16)} ${saved?T('saved_word'):T('bookmark_word')}</button>
          </div>
        </article>

        <div class="replies-head">
          <h2>${count} ${T('replies_cap')}</h2>
          <label class="sort-field">${T('sort_label')}
            <select id="replySort"><option value="recent" ${replySort==='recent'?'selected':''}>${T('sort_recent')}</option><option value="useful" ${replySort==='useful'?'selected':''}>${T('sort_useful')}</option></select>
          </label>
        </div>
        <div class="card replies">
          ${threads.map(g=> replyHTML(g,user,false) + g.children.map(ch=>replyHTML(ch,user,true)).join('')).join('')}
          <div class="reply-form" id="replyForm">
            <h3>${T('reply_title')}</h3>
            <textarea id="replyText" rows="3" placeholder="${T('reply_ph')}"></textarea>
            <button class="btn btn-primary btn-sm" style="margin-top:10px;" id="btnSubmitReply" data-slug="${t.slug}">${T('reply_submit')}</button>
            <p class="hint">${T('forum_local_note')}</p>
          </div>
        </div>
      </div>

      <aside>
        <div class="card sidebar-card">
          <h3>${T('about_author_h')}</h3>
          <div class="author-block">${personAvatar(t.author,54)}<div><b>${esc(t.author)}</b><span>${esc(isInstructor?instructorRole():t.role||'')}</span></div></div>
          <p class="author-bio">${isInstructor ? instructorBio() : T('contrib_generic')}</p>
          ${isInstructor ? `<div class="side-links"><a href="#/about">${icon('user',16)} ${T('profile_word')}</a><a href="#/academy">${icon('book',16)} ${T('publications_word')}</a></div>` : ''}
        </div>
        ${related.length ? `<div class="card sidebar-card"><h3>${T('related_topics_h')}</h3>${related.map(r=>`<a class="related-link" href="#/library/${r.slug}">${esc(L(r,'title'))}</a>`).join('')}</div>` : ''}
        ${flagship ? `<div class="card sidebar-card promo-banner">
          <h3>${T('promo_banner_h')}</h3>
          <a class="promo-inner" href="#/academy/${flagship.slug}" style="background-image:url('assets/img/promo-banner.jpg')">
            <b>${esc(L(flagship,'title'))}</b><small>${T('promo_banner_sub')}</small><span>${T('promo_banner_cta')} →</span>
          </a>
        </div>` : ''}
      </aside>
    </div>
  </div></div>`;
}

/* ==========================================================================
   PHYSICIAN ACADEMY — catálogo
   ========================================================================== */
let priceFilter='', levelFilter='', specFilter='', courseSort='popular';
function courseMatchesSpecialty(c, spec){
  if(!spec) return true;
  const t = (c.tag||'').toLowerCase();
  const map = {esportiva:'medicina esportiva', ortopedia:'ortopedia', cardio:'cardiologia', farmaco:'antidoping', nutro:'nutri'};
  return t.includes(map[spec]||spec);
}
function courseMatchesPrice(c, p){
  if(!p) return true;
  const n = c.priceNum||0;
  if(p==='p1') return n<=400; if(p==='p2') return n>400 && n<=600; if(p==='p3') return n>600;
  return true;
}
function selectBtn(id, options, value){
  return `<span class="select-btn"><select id="${id}">${options.map(([v,l])=>`<option value="${v}" ${v===value?'selected':''}>${l}</option>`).join('')}</select>${icon('chevronDown',17)}</span>`;
}
function courseCardHTML(c){
  const user = DB.currentUser();
  const access = DB.hasAccess(user, c.slug);
  const inCart = DB.cart().includes(c.slug);
  const tag = (L(c,'tag')||'').split('·')[0].trim();
  return `<article class="course-card">
    <a class="course-thumb" href="#/academy/${c.slug}"><img src="${c.img||'assets/img/course-medicina-esporte.jpg'}" alt="" loading="lazy"><span class="badge-cat">${esc(tag)}</span></a>
    <h3><a href="#/academy/${c.slug}">${esc(L(c,'title'))}</a></h3>
    <div class="instr-mini">${personAvatar(INSTRUCTOR.name,30)} ${INSTRUCTOR.name}</div>
    <div class="rating-line">${stars(c.rating)} ${c.rating}/5 (${c.ratingCount} ${T('reviews_word')})</div>
    <div class="course-foot"><span>${c.hours} ${T('hours_word')} • ${T('video_lessons')}</span><span class="price-green">${c.price}</span></div>
    <div class="actions">
      ${access
        ? `<a href="#/academy/${c.slug}" class="btn btn-success btn-block">${icon('playCircle',18)} ${T('btn_go_to_course')}</a>`
        : `<a href="#/academy/${c.slug}" class="btn btn-primary btn-block btn-detail">${T('btn_details')}</a>
           <button class="btn ${inCart?'btn-light in-cart':'btn-success'} btn-block btn-cart-hover" data-addcart="${c.slug}">${icon(inCart?'check':'cart',18)} ${inCart?T('in_cart'):T('btn_cart')}</button>`}
    </div>
  </article>`;
}
function renderAcademy(){
  let list = allCourses();
  if(specFilter) list = list.filter(c=>courseMatchesSpecialty(c,specFilter));
  if(levelFilter) list = list.filter(c=>c.level===levelFilter);
  if(priceFilter) list = list.filter(c=>courseMatchesPrice(c,priceFilter));
  const sorters = {
    popular:(a,b)=>num(b.students)-num(a.students),
    rating:(a,b)=>num(b.rating)-num(a.rating),
    price_asc:(a,b)=>(a.priceNum||0)-(b.priceNum||0),
    price_desc:(a,b)=>(b.priceNum||0)-(a.priceNum||0),
  };
  list = list.slice().sort(sorters[courseSort]||sorters.popular);
  const chips = [];
  if(specFilter) chips.push(['spec', T('cat_'+specFilter)]);
  if(levelFilter) chips.push(['level', T('level_'+levelFilter)]);
  if(priceFilter) chips.push(['price', T('price_'+priceFilter)]);
  return `
  <section class="hero academy-hero" style="background-image:url('assets/img/hero-academy.jpg')">
    <div class="container"><h1>${T('academy_hero_title')}</h1><p class="lede">${T('academy_hero_sub')}</p></div>
  </section>
  <div class="filter-band"><div class="container filter-inner">
    <label>${T('filter_by')}</label>
    ${selectBtn('fSpec', [['',T('filter_specialty')], ...CATEGORIES.map(c=>[c.id,T(c.key)])], specFilter)}
    ${selectBtn('fLevel', [['',T('filter_level')],['iniciante',T('level_iniciante')],['intermediario',T('level_intermediario')],['avancado',T('level_avancado')]], levelFilter)}
    ${selectBtn('fPrice', [['',T('filter_price')],['p1',T('price_p1')],['p2',T('price_p2')],['p3',T('price_p3')]], priceFilter)}
    ${chips.map(([k,label])=>`<span class="chip">${label}<button data-clear="${k}" aria-label="${T('clear_filters')}">${icon('x',15)}</button></span>`).join('')}
    ${chips.length>1 ? `<button class="clear-all" id="clearAllFilters">${T('clear_filters')}</button>` : ''}
    <div class="sort-wrap">${selectBtn('fSort', [['popular',T('sort_by')+' '+T('sort_popular')],['rating',T('sort_by')+' '+T('sort_rating')],['price_asc',T('sort_by')+' '+T('sort_price_asc')],['price_desc',T('sort_by')+' '+T('sort_price_desc')]], courseSort)}</div>
  </div></div>
  <div class="academy-body"><div class="container academy-layout">
    <div>${list.length ? `<div class="course-grid">${list.map(courseCardHTML).join('')}</div>`
      : `<div class="empty-state"><h3>${T('no_courses')}</h3><p>${T('no_courses_cta')}</p><button class="btn btn-primary btn-sm" id="clearAllFilters2">${T('clear_filters')}</button></div>`}</div>
    <aside class="free-promo">
      <span class="pill-solid">${T('free_promo_label')}</span>
      <h3>${T('free_promo_h')}</h3>
      <img src="assets/img/promo-gratuito.jpg" alt="" loading="lazy">
      <a href="#/free" class="btn btn-primary btn-block">${T('free_promo_btn')}</a>
    </aside>
  </div></div>`;
}

/* ==========================================================================
   PÁGINA DO CURSO
   ========================================================================== */
let openModules = {0:true};
let currentLessonKey = "0-0";
let lastCourseSlug = null;
let courseTab = 'content';
let playerStarted = false;
function renderCourse(slug){
  const c = courseBySlug(slug);
  if(!c) return render404();
  const user = DB.currentUser(); const ukey = DB.key(user);
  const access = DB.hasAccess(user, c.slug);
  const mods = c.modules||[];
  const [cm,cl] = currentLessonKey.split('-').map(Number);
  const curLesson = (mods[cm] && mods[cm].lessons[cl]) || (mods[0] && mods[0].lessons[0]) || {n:L(c,'title'), d:''};
  const total = totalLessonsOf(c), done = doneLessonsOf(user,c), pct = coursePct(user,c);
  const tag = (L(c,'tag')||'').split('·')[0].trim();
  const others = allCourses().filter(x=>x.slug!==c.slug);
  const reviews = REVIEWS[c.slug]||[];
  const shareUrl = encodeURIComponent(location.href), shareTxt = encodeURIComponent(L(c,'title'));

  const player = access && playerStarted
    ? `<video id="coursePlayer" controls autoplay playsinline src="${getVideoSrc(c)}"></video>`
    : `<button class="video-poster" id="videoPoster" style="background-image:url('${c.img||'assets/img/course-medicina-esporte.jpg'}')" aria-label="${T('play_word')}"><span class="play-btn">${icon(access?'play':'lock',34)}</span></button>`;

  return `<div class="course-page"><div class="container">
    <div class="course-top">
      <div>
        <span class="pill pill-solid">${esc(tag)}</span>
        <h1>${esc(L(c,'title'))}</h1>
        <p class="desc">${esc(L(c,'short'))}</p>
        <div class="instr-big">${personAvatar(INSTRUCTOR.name,78)}
          <div><b>${INSTRUCTOR.name}</b><small>${instructorRole()}</small><div class="rating-line">${stars(c.rating)} <b>${c.rating}</b> (${c.ratingCount} ${T('reviews_word')})</div></div>
        </div>
        <div class="course-stats">
          <span>${icon('clock',20)} ${c.hours} ${T('hours_word')}</span>
          <span>${icon('video',20)} ${c.lessons} ${T('label_lessons')}</span>
          <span>${icon('users',20)} ${c.students} ${T('label_students')}</span>
          <span>${icon('certificate',20)} ${T('label_certificate')}</span>
        </div>
      </div>
      <div>
        <div class="video-card" id="lessons">${player}</div>
        <div class="video-caption"><span><b id="playerLessonName">${esc(curLesson.n)}</b></span><span>${curLesson.d||''}</span></div>
        ${access ? '' : `<div class="video-locked">${icon('lock',16)} ${T('locked_msg')}</div>`}
      </div>
      <div class="buy-col">
        <div class="buy-card">
          ${access ? `
            <div class="form-ok" style="justify-content:center;font-size:15px;margin-bottom:12px;">${icon('checkCircle',18)} ${T('has_access')}</div>
            <button class="btn btn-success btn-pill btn-block" id="btnContinue">${icon('playCircle',20)} ${T('continue_watching')}</button>
            <div class="progress-box">
              <div class="row"><span>${T('progress_label')}</span><span>${done}/${total} · ${pct}%</span></div>
              <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
              ${pct===100 && total ? `<button class="btn btn-outline btn-block btn-sm" id="btnCertificate" data-slug="${c.slug}" style="margin-top:8px;font-size:14px;">${icon('award',17)} ${T('btn_certificate')}</button>` : ''}
            </div>
          ` : `
            <div class="price">${c.price}</div>
            <button class="btn btn-success btn-pill btn-block" id="btnBuyCourse" data-slug="${c.slug}">${T('btn_buy')}</button>
            <button class="btn btn-outline btn-pill btn-block" data-addcart="${c.slug}">${DB.cart().includes(c.slug)?T('in_cart'):T('btn_cart')}</button>
          `}
          <div class="perks"><span class="perk">${icon('infinity',15)} ${T('perk_lifetime')}</span><span class="perk green">${icon('shield',15)} ${T('perk_guarantee')}</span></div>
        </div>
        <div class="share-row">
          <a class="li" href="https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}" target="_blank" rel="noopener" aria-label="LinkedIn">${icon('linkedin',20)}</a>
          <a class="tw" href="https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTxt}" target="_blank" rel="noopener" aria-label="Twitter">${icon('twitter',19)}</a>
          <a class="fb" href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" rel="noopener" aria-label="Facebook">${icon('facebook',20)}</a>
        </div>
      </div>
    </div>

    <div class="course-tabs">
      <div class="tabs" role="tablist">
        ${[['about','tab_about_course'],['content','tab_content'],['instructor','tab_instructor'],['reviews','tab_reviews']].map(([k,key])=>`<button class="${courseTab===k?'active':''}" data-ctab="${k}">${T(key)}</button>`).join('')}
      </div>
    </div>

    <div class="tab-panel ${courseTab==='about'?'active':''}">
      <div class="course-body">
        <div class="about-course"><p>${esc(L(c,'short'))}</p><p>${T('course_about_p')}</p>
          <p><b>${T('filter_level')}:</b> ${T('level_'+(c.level||'iniciante'))} · <b>${T('tab_content')}:</b> ${mods.length} ${T('label_modules')}, ${total} ${T('label_lessons')}</p></div>
        ${learnPanel(c, others)}
      </div>
    </div>

    <div class="tab-panel ${courseTab==='content'?'active':''}">
      <div class="course-body">
        <div class="card module-acc" id="moduleAcc">
          ${mods.length ? mods.map((m,i)=>`
            <div class="mod ${openModules[i]?'open':''}">
              <button class="mod-head" data-mod="${i}" aria-expanded="${!!openModules[i]}"><b>${esc(m.title)}</b><small>${m.lessons.length} ${T('label_lessons')}</small>${icon(openModules[i]?'chevronUp':'chevronDown',20)}</button>
              <div class="mod-body">
                ${m.lessons.map((l,j)=>{
                  const key=i+'-'+j; const isDone = access && DB.isLessonDone(ukey,c.slug,key);
                  return `<button class="lesson-line ${currentLessonKey===key?'current':''}" data-lesson="${key}" data-name="${esc(l.n)}" data-dur="${l.d}">
                    ${access ? `<input type="checkbox" ${isDone?'checked':''} data-progress="${key}" aria-label="${T('mark_done')}">` : `<span class="lock">${icon('lock',18)}</span>`}
                    ${icon('playCircle',20)}
                    <span class="lname"><strong>${T('lesson_word')} ${i+1}.${j+1}:</strong> ${esc(l.n)} (${l.d} min)</span>
                  </button>${currentLessonKey===key && access && playerStarted ? `<div class="lesson-progress"><div></div></div>` : ''}`;
                }).join('')}
              </div>
            </div>`).join('') : `<div class="card-pad muted">${T('no_modules')}</div>`}
        </div>
        ${learnPanel(c, others)}
      </div>
    </div>

    <div class="tab-panel ${courseTab==='instructor'?'active':''}">
      <div class="card card-pad" style="max-width:760px;">
        <div class="instr-big">${personAvatar(INSTRUCTOR.name,90)}<div><b style="font-size:19px;">${INSTRUCTOR.name}</b><small>${instructorRole()}</small></div></div>
        <p class="author-bio" style="font-size:16px;">${instructorBio()}</p>
        <div class="social-row" style="justify-content:flex-start;">
          <a href="${CONTACT.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon('instagram',24)}</a>
          <a href="${CONTACT.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icon('facebook',24)}</a>
        </div>
      </div>
    </div>

    <div class="tab-panel ${courseTab==='reviews'?'active':''}">
      <div class="card card-pad" style="max-width:760px;">
        <div class="review-summary"><span class="big">${c.rating}</span><div>${stars(c.rating,20)}<div class="muted">${c.ratingCount} ${T('reviews_word')}</div></div></div>
        ${reviews.length ? reviews.map(r=>`<div class="review">
          <div class="who-line">${personAvatar(r.who,36)}<div><b>${esc(r.who)}</b><span>${esc(r.role)} · ${r.when}</span></div></div>
          <div style="margin-top:6px;">${stars(r.stars,14)}</div><p>${esc(r.text)}</p></div>`).join('') : `<p class="muted">${T('no_reviews')}</p>`}
      </div>
    </div>
  </div></div>`;
}
function learnPanel(c, others){
  return `<div>
    <div class="info-panel">
      <div class="info-cols">
        <div><h3>${T('heading_learn')}</h3><ul class="check-list">${['learn1','learn2','learn3','learn4','learn5'].map(k=>`<li>${icon('check',16)}<span>${T(k)}</span></li>`).join('')}</ul></div>
        <div><h3>${T('heading_req')}</h3><ul class="check-list">${['req1','req2','req3'].map(k=>`<li>${icon('check',16)}<span>${T(k)}</span></li>`).join('')}</ul></div>
      </div>
    </div>
    ${others.length ? `
    <div class="related-head"><h3>${T('related_courses')}</h3>
      <div class="carousel-nav"><button data-carousel="-1" aria-label="‹">${icon('chevronLeft',18)}</button><button data-carousel="1" aria-label="›">${icon('chevronRight',18)}</button></div></div>
    <div class="carousel">${others.map(o=>`<a class="mini-course" href="#/academy/${o.slug}"><img src="${o.img||'assets/img/course-medicina-esporte.jpg'}" alt="" loading="lazy"><div><b>${esc(L(o,'title'))}</b><small>${INSTRUCTOR.name}</small><div class="p">${o.price}</div></div></a>`).join('')}</div>` : ''}
  </div>`;
}

/* ==========================================================================
   CONTEÚDO GRATUITO
   ========================================================================== */
function renderFree(){
  const kindIco = {video:'video', pdf:'file', quiz:'quiz'};
  return `
  <section class="hero free-hero" style="background-image:url('assets/img/hero-free.jpg')">
    <div class="container">
      <h1>${T('free_title')}</h1>
      <p class="lede">${T('free_sub')}</p>
      <a href="#freeList" class="btn btn-primary" data-scroll="freeList">${T('free_hero_btn')}</a>
    </div>
  </section>
  <div class="container">
    <div class="free-list" id="freeList">
      ${FREE.map((f,i)=>`
      <article class="free-card">
        <div class="free-thumb"><img src="${f.img}" alt="" loading="lazy"><span class="badge-free">${T('free_tag')}</span></div>
        <div>
          <span class="cat">${esc(L(f,'tag'))}</span>
          <h3>${esc(L(f,'title'))}</h3>
          <p>${esc(L(f,'desc'))}</p>
          <div class="kinds">${(f.kinds||[]).map(k=>`<span>${icon(kindIco[k],17)} ${T('kind_'+k)}</span>`).join('')}<span>${icon('clock',17)} ${f.minutes} ${T('minutes_word')}</span></div>
          <button class="btn btn-primary btn-block" data-free="${i}">${T('btn_access')}</button>
          <a class="btn-link" href="#/academy/${f.course}">${T('see_full_course')} ${icon('arrowRight',16)}</a>
        </div>
      </article>`).join('')}
    </div>
    <div class="cta-box">
      <h2>${T('cta_h')}</h2>
      <p>${T('cta_p')}</p>
      <div class="cta-row">
        <ul><li>${T('cta_b1')}</li><li>${T('cta_b2')}</li><li>${T('cta_b3')}</li></ul>
        <a href="#/academy" class="btn btn-success btn-lg">${T('cta_btn')}</a>
      </div>
      <div class="testimonial">
        <div class="t-avatar"><span class="avatar">${icon('user',26)}</span>${stars(5,10)}</div>
        <div><p>${T('testimonial')}</p><span>${T('testimonial_author')}</span></div>
      </div>
    </div>
    <div class="how">
      <h2>${T('how_title')}</h2>
      <div class="how-grid">
        <div>${icon('userPlus',46)}<b>${T('how1_h')}</b><p>${T('step1')}</p></div>
        <div>${icon('monitorPlay',46)}<b>${T('how2_h')}</b><p>${T('step2')}</p></div>
        <div>${icon('graduation',46)}<b>${T('how3_h')}</b><p>${T('step3')}</p></div>
      </div>
    </div>
  </div>`;
}

/* ==========================================================================
   SOBRE / CONTATO
   ========================================================================== */
function renderAbout(){
  return `
  <section class="hero page-hero" style="background-image:url('assets/img/hero-about.jpg')">
    <div class="container"><h1>${T('about_title')}</h1><p class="lede">${T('about_sub')}</p></div>
  </section>
  <div class="inner-page"><div class="container about-grid">
    <div class="prose">
      <h2 style="margin-top:0;">${T('about_mission_h')}</h2><p>${T('about_mission_p')}</p>
      <h2>${T('about_content_h')}</h2><p>${T('about_content_p')}</p>
      <div class="stat-row">
        <div class="stat-tile"><b>5.000+</b><span>${T('about_stat1')}</span></div>
        <div class="stat-tile"><b>${allCourses().length}</b><span>${T('about_stat2')}</span></div>
        <div class="stat-tile"><b>4,8/5</b><span>${T('about_stat3')}</span></div>
      </div>
    </div>
    <div class="card card-pad">
      <h3 class="card-title">${T('about_instructor_h')}</h3>
      <div class="author-block">${personAvatar(INSTRUCTOR.name,72)}<div><b>${INSTRUCTOR.name}</b><span>${instructorRole()}</span></div></div>
      <p class="author-bio">${instructorBio()}</p>
      <a href="#/academy" class="btn btn-primary btn-sm">${T('btn_view_courses')}</a>
    </div>
  </div></div>`;
}
function renderContact(){
  const user = DB.currentUser();
  return `<div class="inner-page"><div class="container">
    ${crumbs([[T('crumb_home'),'#/'],[T('crumb_contact')]])}
    <h1 class="page-title">${T('contact_title')}</h1><p class="page-sub">${T('contact_sub')}</p>
    <div class="contact-grid">
      <form class="card card-pad" id="contactForm" novalidate>
        <div class="field-row">
          <div class="field"><label for="ctName">${T('ud_name')}</label><input id="ctName" value="${esc(user&&user.name||'')}"></div>
          <div class="field"><label for="ctEmail">${T('ud_email')}</label><input id="ctEmail" type="email" value="${esc(user&&user.email||'')}"></div>
        </div>
        <div class="field"><label for="ctMsg">${T('contact_msg')}</label><textarea id="ctMsg" rows="6"></textarea></div>
        <div id="ctFeedback"></div>
        <button class="btn btn-primary" type="submit">${icon('mail',18)} ${T('contact_send')}</button>
      </form>
      <div class="card card-pad">
        <h3 class="card-title">${T('contact_direct')}</h3>
        <div class="author-block" style="margin-bottom:14px;">${personAvatar(INSTRUCTOR.name,54)}<div><b>${INSTRUCTOR.name}</b><span>${instructorRole()}</span></div></div>
        <a class="contact-line" href="mailto:${CONTACT.email}">${icon('mail',18)} ${CONTACT.email}</a>
        <a class="contact-line" href="${CONTACT.instagram}" target="_blank" rel="noopener">${icon('instagram',18)} @drseleniocf</a>
        <a class="contact-line" href="${CONTACT.facebook}" target="_blank" rel="noopener">${icon('facebook',18)} /drseleniocf</a>
      </div>
    </div>
  </div></div>`;
}

/* ==========================================================================
   ÁREA DO ALUNO / ADMIN / BUSCA / 404
   ========================================================================== */
function renderMyCourses(){
  const user = DB.currentUser();
  const mine = allCourses().filter(c=>DB.hasAccess(user,c.slug));
  return `<div class="inner-page"><div class="container">
    ${crumbs([[T('crumb_home'),'#/'],[T('crumb_my')]])}
    <h1 class="page-title">${T('my_courses_title')}</h1><p class="page-sub">${T('my_courses_sub')}</p>
    ${mine.length ? `<div class="card-grid">${mine.map(c=>{ const pct=coursePct(user,c); return `
      <article class="course-card">
        <a class="course-thumb" href="#/academy/${c.slug}"><img src="${c.img||'assets/img/course-medicina-esporte.jpg'}" alt=""></a>
        <h3><a href="#/academy/${c.slug}">${esc(L(c,'title'))}</a></h3>
        <div class="progress-box" style="margin:0 0 12px;"><div class="row"><span>${T('progress_label')}</span><span>${pct}%</span></div><div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div></div>
        <a href="#/academy/${c.slug}" class="btn btn-primary btn-block" style="margin-top:auto;">${T('continue_watching')}</a>
      </article>`; }).join('')}</div>`
    : `<div class="empty-state"><h3>${T('my_courses_empty_h')}</h3><p>${T('my_courses_empty_p')}</p><a href="#/academy" class="btn btn-primary btn-sm">${T('my_courses_empty_cta')}</a></div>`}
    <p class="note">${T('account_area_note')}</p>
  </div></div>`;
}
function renderAdmin(){
  const user = DB.currentUser();
  if(!user || !user.isAdmin) return `<div class="inner-page"><div class="container"><div class="empty-state"><h3>${T('admin_denied')}</h3></div></div></div>`;
  const customC = DB.customCourses(); const customT = DB.customTopics();
  const users = DB.users();
  const courses = allCourses();
  return `<div class="inner-page"><div class="container">
    ${crumbs([[T('crumb_home'),'#/'],[T('crumb_admin')]])}
    <h1 class="page-title">${T('admin_title')}</h1><p class="page-sub">${T('admin_sub')}</p>

    <div class="card card-pad">
      <h3 class="card-title">${T('admin_users_h')}</h3>
      <p class="muted" style="margin:-4px 0 10px;">${T('admin_access_note')}</p>
      <div style="overflow-x:auto;"><table class="admin-table"><tbody>
        ${users.map(u=>{ const k=DB.key(u); return `<tr>
          <td><div class="who-line">${personAvatar(u.name,32,u.photo)}<div><b>${esc(u.name)}</b><span>${esc(u.username?'@'+u.username:'')} ${esc(u.email||'')}</span></div></div></td>
          <td>${u.isAdmin ? `<span class="tag">${T('admin_role_admin')}</span>` : courses.map(c=>{ const on=DB.isEnrolled(k,c.slug); return `<label style="display:flex;gap:6px;align-items:center;font-weight:400;margin:2px 0;"><input type="checkbox" style="width:auto;" data-grant="${esc(k)}" data-course="${c.slug}" ${on?'checked':''}> ${esc(L(c,'title'))}</label>`; }).join('')}</td>
        </tr>`; }).join('')}
      </tbody></table></div>
    </div>

    <div class="admin-grid">
      <div class="card card-pad">
        <h3 class="card-title">${T('admin_add_course')}</h3>
        <div class="field"><label for="acTitle">${T('admin_field_title')}</label><input id="acTitle"></div>
        <div class="field"><label for="acTag">${T('admin_field_tag')}</label><input id="acTag" value="Medicina Esportiva"></div>
        <div class="field"><label for="acPrice">${T('admin_field_price')}</label><input id="acPrice" placeholder="R$ 297,00"></div>
        <div class="field"><label for="acShort">${T('admin_field_short')}</label><textarea id="acShort" rows="2"></textarea></div>
        <div id="acMsg"></div>
        <button class="btn btn-primary btn-sm" id="acSubmit">${T('admin_submit_course')}</button>
        <table class="admin-table" style="margin-top:18px;"><tbody>
          ${courses.map(c=>`<tr><td>${esc(L(c,'title'))}</td><td>${c.price}</td><td>${customC.find(x=>x.slug===c.slug)?`<button class="btn btn-light btn-xs" data-rm-course="${c.slug}">${T('admin_remove')}</button>`:`<span class="muted">${T('admin_seed')}</span>`}</td></tr>`).join('')}
        </tbody></table>
      </div>
      <div class="card card-pad">
        <h3 class="card-title">${T('admin_add_topic')}</h3>
        <div class="field"><label for="atCat">${T('new_topic_cat')}</label><select id="atCat">${CATEGORIES.map(c=>`<option value="${c.id}">${T(c.key)}</option>`).join('')}</select></div>
        <div class="field"><label for="atTitle">${T('admin_field_title')}</label><input id="atTitle"></div>
        <div class="field"><label for="atBody">${T('admin_field_body')}</label><textarea id="atBody" rows="2"></textarea></div>
        <div id="atMsg"></div>
        <button class="btn btn-primary btn-sm" id="atSubmit">${T('admin_submit_topic')}</button>
        <table class="admin-table" style="margin-top:18px;"><tbody>
          ${allTopics().map(t=>`<tr><td>${esc(L(t,'title'))}</td><td>${T('cat_'+t.cat)}</td><td>${customT.find(x=>x.slug===t.slug)?`<button class="btn btn-light btn-xs" data-rm-topic="${t.slug}">${T('admin_remove')}</button>`:`<span class="muted">${T('admin_seed')}</span>`}</td></tr>`).join('')}
        </tbody></table>
      </div>
    </div>
    <p class="note">${T('account_area_note')}</p>
  </div></div>`;
}
function searchAll(query){
  const q = (query||'').toLowerCase().trim();
  if(!q) return {topics:[], courses:[]};
  const topics = allTopics().filter(t=> L(t,'title').toLowerCase().includes(q) || L(t,'excerpt').toLowerCase().includes(q) || (L(t,'tags')||[]).some(tg=>tg.toLowerCase().includes(q)));
  const courses = allCourses().filter(c=> L(c,'title').toLowerCase().includes(q) || L(c,'short').toLowerCase().includes(q) || (L(c,'tag')||'').toLowerCase().includes(q));
  return {topics, courses};
}
function renderSearch(query){
  const {topics, courses} = searchAll(query);
  const total = topics.length + courses.length;
  return `<div class="inner-page"><div class="container">
    ${crumbs([[T('crumb_home'),'#/'],[T('crumb_search')]])}
    <h1 class="page-title">${T('crumb_search')}: “${esc(query)}”</h1>
    <p class="page-sub">${total} ${T('results_word')}</p>
    ${total===0 ? `<div class="empty-state"><h3>${T('search_empty')}</h3></div>` : `
      ${courses.length ? `<div class="result-group"><h2>${T('search_courses')}</h2><div class="card-grid">${courses.map(courseCardHTML).join('')}</div></div>` : ''}
      ${topics.length ? `<div class="result-group"><h2>${T('search_topics')}</h2><div class="card">${topics.map(t=>`<a class="result-topic" href="#/library/${t.slug}"><b>${esc(L(t,'title'))}</b><span>${esc(L(t,'excerpt'))}</span></a>`).join('')}</div></div>` : ''}`}
  </div></div>`;
}
function render404(){
  return `<div class="inner-page"><div class="container">
    <div class="empty-state"><h3>${T('not_found_h')}</h3><p>${T('not_found_p')}</p><a href="#/" class="btn btn-primary btn-sm">${T('not_found_cta')}</a></div>
  </div></div>`;
}

/* ---------- Termos de uso / Privacidade (modelo — revisar com advogado) ---------- */
function legalDoc(kind){
  const isTerms = kind==='terms';
  const title = isTerms ? T('terms_title') : T('privacy_title');
  const body = isTerms ? `
    <h3>1. Aceitação dos termos</h3><p>Ao acessar a Physician Academy &amp; Library, você concorda com estes termos de uso. Se não concordar, não utilize a plataforma.</p>
    <h3>2. Quem pode usar</h3><p>O fórum clínico e os cursos são destinados a profissionais de saúde. O conteúdo tem finalidade educacional e não substitui o julgamento clínico individual nem a avaliação presencial do paciente.</p>
    <h3>3. Conta de usuário</h3><p>Você é responsável por manter a confidencialidade das suas credenciais de acesso e por todas as atividades realizadas em sua conta.</p>
    <h3>4. Conteúdo do fórum</h3><p>Discussões clínicas devem preservar a confidencialidade do paciente (nunca inclua dados que permitam identificação). A moderação pode remover conteúdo que viole diretrizes éticas, leis aplicáveis ou estas condições.</p>
    <h3>5. Cursos e pagamentos</h3><p>O acesso a cursos pagos é concedido após confirmação de pagamento processado por um provedor terceirizado. Política de reembolso e garantia estão descritas na página de cada curso.</p>
    <h3>6. Propriedade intelectual</h3><p>Todo o conteúdo (textos, vídeos, materiais) é protegido por direitos autorais e não pode ser redistribuído sem autorização.</p>
    <h3>7. Limitação de responsabilidade</h3><p>A plataforma não se responsabiliza por decisões clínicas tomadas com base no conteúdo aqui disponibilizado; a responsabilidade profissional permanece do médico assistente.</p>
    <h3>8. Alterações</h3><p>Estes termos podem ser atualizados periodicamente; o uso contínuo da plataforma após alterações implica concordância com a nova versão.</p>
  ` : `
    <h3>1. Controlador dos dados</h3><p>A Physician Academy &amp; Library é a controladora dos dados pessoais coletados nesta plataforma, nos termos da Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018).</p>
    <h3>2. Dados coletados</h3><p>Coletamos: dados de cadastro (nome, e-mail), dados de uso (cursos acessados, progresso, interações no fórum) e, quando aplicável, dados de pagamento processados diretamente por um provedor terceirizado (nunca armazenamos números de cartão em nossos servidores).</p>
    <h3>3. Finalidade do tratamento</h3><p>Os dados são usados para: autenticação e gestão de conta, emissão de certificados, personalização de conteúdo, comunicação sobre cursos e cumprimento de obrigações legais.</p>
    <h3>4. Compartilhamento</h3><p>Não vendemos dados pessoais. Dados podem ser compartilhados com processadores de pagamento e provedores de hospedagem/streaming estritamente para viabilizar o serviço.</p>
    <h3>5. Cookies</h3><p>Utilizamos cookies essenciais ao funcionamento do site e, mediante seu consentimento, cookies de analytics para entender o uso da plataforma.</p>
    <h3>6. Direitos do titular</h3><p>Você pode solicitar a qualquer momento: confirmação de tratamento, acesso, correção, anonimização, portabilidade ou eliminação dos seus dados, conforme art. 18 da LGPD.</p>
    <h3>7. Contato do encarregado (DPO)</h3><p>Solicitações sobre dados pessoais podem ser enviadas para o e-mail de contato indicado na página "Contato".</p>
    <h3>8. Retenção</h3><p>Dados são mantidos pelo tempo necessário às finalidades descritas ou conforme exigido por lei, sendo eliminados ou anonimizados após esse período.</p>
  `;
  return `<div class="inner-page"><div class="container">
    ${DB.currentUser() ? crumbs([[T('crumb_home'),'#/'],[title]]) : `<a class="btn-link" href="#/" style="margin-bottom:16px;">${icon('chevronLeft',16)} ${T('back_to_login')}</a>`}
    <div class="legal-body">
      <h1 class="page-title">${title}</h1>
      <p class="content-note">${T('legal_disclaimer')}</p>
      ${body}
    </div>
  </div></div>`;
}
