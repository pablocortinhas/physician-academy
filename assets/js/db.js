/* Physician Academy & Library — "backend" de demonstracao (localStorage).
   Substituir por servidor + banco de dados antes de ir para producao com usuarios reais. */
const DB = {
  users(){ return JSON.parse(localStorage.getItem('pa_users')||'[]'); },
  saveUsers(u){ localStorage.setItem('pa_users', JSON.stringify(u)); },
  // Cada conta é identificada por uma "chave": o nome de usuário (ou o e-mail, em contas antigas sem usuário).
  // Nos métodos abaixo, o parâmetro "email" é essa chave.
  key(u){ return u ? (u.username || u.email) : null; },
  findByLogin(id){ const q=String(id||'').trim().toLowerCase(); if(!q) return null; return this.users().find(u=>(u.username||'').toLowerCase()===q || (u.email||'').toLowerCase()===q) || null; },
  session(){ return localStorage.getItem('pa_session'); },
  setSession(key){ if(key) localStorage.setItem('pa_session', key); else localStorage.removeItem('pa_session'); },
  currentUser(){ const k=this.session(); return k ? this.users().find(u=>this.key(u)===k) || null : null; },
  enrollments(){ return JSON.parse(localStorage.getItem('pa_enrollments')||'{}'); },
  saveEnrollments(o){ localStorage.setItem('pa_enrollments', JSON.stringify(o)); },
  isEnrolled(email,slug){ const e=this.enrollments(); return !!(e[email]&&e[email].includes(slug)); },
  enroll(email,slug){ const e=this.enrollments(); e[email]=e[email]||[]; if(!e[email].includes(slug)) e[email].push(slug); this.saveEnrollments(e); },
  unenroll(email,slug){ const e=this.enrollments(); e[email]=(e[email]||[]).filter(s=>s!==slug); this.saveEnrollments(e); },
  // Regra de acesso às aulas: só quem pagou (matriculado) — ou administrador.
  hasAccess(user,slug){ return !!user && (user.isAdmin || this.isEnrolled(this.key(user), slug)); },
  progress(){ return JSON.parse(localStorage.getItem('pa_progress')||'{}'); },
  saveProgress(o){ localStorage.setItem('pa_progress', JSON.stringify(o)); },
  toggleLesson(email,slug,key){ const p=this.progress(); p[email]=p[email]||{}; p[email][slug]=p[email][slug]||{}; p[email][slug][key]=!p[email][slug][key]; this.saveProgress(p); return p[email][slug][key]; },
  isLessonDone(email,slug,key){ const p=this.progress(); return !!(p[email]&&p[email][slug]&&p[email][slug][key]); },
  forumPosts(){ return JSON.parse(localStorage.getItem('pa_forum_posts')||'{}'); },
  addForumPost(slug,post){ const f=this.forumPosts(); f[slug]=f[slug]||[]; f[slug].push(post); localStorage.setItem('pa_forum_posts', JSON.stringify(f)); },
  customTopics(){ return JSON.parse(localStorage.getItem('pa_custom_topics')||'[]'); },
  addCustomTopic(t){ const l=this.customTopics(); l.unshift(t); localStorage.setItem('pa_custom_topics', JSON.stringify(l)); },
  removeCustomTopic(slug){ const l=this.customTopics().filter(t=>t.slug!==slug); localStorage.setItem('pa_custom_topics', JSON.stringify(l)); },
  customCourses(){ return JSON.parse(localStorage.getItem('pa_custom_courses')||'[]'); },
  addCustomCourse(c){ const l=this.customCourses(); l.unshift(c); localStorage.setItem('pa_custom_courses', JSON.stringify(l)); },
  removeCustomCourse(slug){ const l=this.customCourses().filter(c=>c.slug!==slug); localStorage.setItem('pa_custom_courses', JSON.stringify(l)); },
  // carrinho (por navegador, independe de login)
  cart(){ return JSON.parse(localStorage.getItem('pa_cart')||'[]'); },
  saveCart(l){ localStorage.setItem('pa_cart', JSON.stringify(l)); },
  addToCart(slug){ const l=this.cart(); if(!l.includes(slug)) l.push(slug); this.saveCart(l); },
  removeFromCart(slug){ this.saveCart(this.cart().filter(s=>s!==slug)); },
  // curtidas e tópicos salvos (por usuário)
  _userMap(key){ return JSON.parse(localStorage.getItem(key)||'{}'); },
  _toggle(key,email,id){ const m=this._userMap(key); m[email]=m[email]||[]; const i=m[email].indexOf(id); if(i>=0) m[email].splice(i,1); else m[email].push(id); localStorage.setItem(key, JSON.stringify(m)); return i<0; },
  _has(key,email,id){ const m=this._userMap(key); return !!(m[email]&&m[email].includes(id)); },
  toggleLike(email,id){ return this._toggle('pa_likes',email,id); },
  hasLiked(email,id){ return this._has('pa_likes',email,id); },
  toggleBookmark(email,slug){ return this._toggle('pa_bookmarks',email,slug); },
  hasBookmark(email,slug){ return this._has('pa_bookmarks',email,slug); },
};
/* Conta inicial "docdoc": administradora e sem senha (entra só com o nome de usuário).
   Pode liberar acesso a cursos para outros usuários no Painel Administrativo. */
function seedFirstAccount(){
  const users = DB.users();
  if(!users.find(u=>u.username==='docdoc')){
    users.unshift({name:'docdoc', username:'docdoc', email:'', password:'', noPassword:true, isAdmin:true, photo:null});
  }
  users.forEach(u=>{ if(u.photo==='instructor.jpg') u.photo = INSTRUCTOR.photo; }); // caminho salvo pela versão antiga
  DB.saveUsers(users);
}
seedFirstAccount();

function allTopics(){ return [...DB.customTopics(), ...TOPICS]; }
function allCourses(){ return [...DB.customCourses(), ...COURSES]; }
function slugify(s){ return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'').slice(0,60) + '-' + Date.now().toString(36).slice(-4); }
