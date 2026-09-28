/* Physician Academy & Library — configurações gerais.
   Tudo o que muda entre ambiente de demonstração e produção fica aqui. */

/* ANALYTICS — desativado por padrão. Para ativar o Plausible:
   1) crie uma conta em plausible.io (ou self-host) com o domínio real
   2) mude ANALYTICS_ENABLED para true e preencha ANALYTICS_DOMAIN
   O script só carrega depois que o visitante aceita o banner de cookies. */
const ANALYTICS_ENABLED = false;
const ANALYTICS_DOMAIN = "seu-dominio.com";
function loadAnalyticsIfConsented(){
  if(!ANALYTICS_ENABLED) return;
  if(localStorage.getItem('pa_cookie_consent') !== 'accepted') return;
  if(document.getElementById('plausible-script')) return;
  const s = document.createElement('script');
  s.id = 'plausible-script'; s.defer = true; s.setAttribute('data-domain', ANALYTICS_DOMAIN);
  s.src = 'https://plausible.io/js/script.js';
  document.head.appendChild(s);
}

/* VÍDEO — hoje usa um vídeo de amostra CC0, tocado direto no <video>.
   Produção: trocar por Cloudflare Stream / Bunny Stream / Mux com URL assinada
   e com prazo de validade por aluno matriculado, em vez de link público. */
function getVideoSrc(course){ return course.video; }

/* CONTATO E REDES — usados no rodapé, na página de contato e no formulário. */
const CONTACT = {
  email: "selenio7@bol.com.br",
  instagram: "https://www.instagram.com/drseleniocf/",
  facebook: "https://www.facebook.com/drseleniocf/",
};
