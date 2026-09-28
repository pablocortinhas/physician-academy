/* Physician Academy & Library — ícones SVG em linha (traço 1.8, viewBox 24).
   Uso: icon('search')  ou  icon('star', 16, 'filled') */
const ICONS = {
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  bell:'<path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  cart:'<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3h2.7l2.4 11.6a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.5L21.5 7H6.2"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  userPlus:'<circle cx="10" cy="8" r="4"/><path d="M2.5 21a7.5 7.5 0 0 1 13.2-4.9"/><path d="M19 14v6M16 17h6"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.3a3.5 3.5 0 0 1 0 7.4M18 14.3a6.5 6.5 0 0 1 3.5 5.7"/>',
  menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  x:'<path d="M18 6 6 18M6 6l12 12"/>',
  chevronDown:'<path d="m6 9 6 6 6-6"/>',
  chevronUp:'<path d="m18 15-6-6-6 6"/>',
  chevronRight:'<path d="m9 6 6 6-6 6"/>',
  chevronLeft:'<path d="m15 6-6 6 6 6"/>',
  arrowRight:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  play:'<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/>',
  playCircle:'<circle cx="12" cy="12" r="9"/><path d="M10 8.8v6.4l5.2-3.2z"/>',
  video:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M10 9.2v5.6l4.6-2.8z"/>',
  monitorPlay:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M10.2 8v5l4-2.5z"/>',
  file:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>',
  quiz:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  checkCircle:'<circle cx="12" cy="12" r="9"/><path d="m8.5 12.3 2.4 2.4 4.8-5"/>',
  heart:'<path d="M12 20s-7.5-4.6-9.2-9.3C1.6 7.2 3.8 4 7.2 4c2 0 3.4 1.1 4.8 2.8C13.4 5.1 14.8 4 16.8 4c3.4 0 5.6 3.2 4.4 6.7C19.5 15.4 12 20 12 20z"/>',
  message:'<path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.5L3 21l2-5.3A8.5 8.5 0 1 1 21 11.5z"/>',
  eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  paperclip:'<path d="m21 11.5-8.5 8.5a5.5 5.5 0 0 1-7.8-7.8l9-9a3.7 3.7 0 0 1 5.2 5.2l-9 9a1.8 1.8 0 0 1-2.6-2.6l8.3-8.3"/>',
  share:'<circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="m8.3 13.3 7.4 4.4M15.7 6.3l-7.4 4.4"/>',
  reply:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5A5.5 5.5 0 0 1 20 14.5V20"/>',
  bookmark:'<path d="M18 21 12 17 6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  star:'<path d="m12 3 2.8 5.8 6.2.9-4.5 4.4 1.1 6.2L12 17.4l-5.6 2.9 1.1-6.2L3 9.7l6.2-.9z"/>',
  filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',
  lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7.5a4 4 0 0 1 8 0V11"/>',
  download:'<path d="M12 4v11M7 10.5l5 5 5-5M4 20h16"/>',
  infinity:'<path d="M6.5 8.5C3.9 8.5 2.5 10.2 2.5 12s1.4 3.5 4 3.5c3.8 0 7.2-7 11-7 2.6 0 4 1.7 4 3.5s-1.4 3.5-4 3.5c-3.8 0-7.2-7-11-7z"/>',
  shield:'<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
  award:'<circle cx="12" cy="9" r="6"/><path d="m8.5 14.2-1.5 7.3 5-2.8 5 2.8-1.5-7.3"/>',
  certificate:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M7 9h10M7 12.5h6"/><circle cx="17" cy="17" r="2.5"/><path d="m15.8 19.2-.8 2.8 2-1 2 1-.8-2.8"/>',
  graduation:'<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11.2V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.8"/><path d="M22 9v5"/>',
  book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/>',
  /* ícones das categorias do fórum */
  run:'<circle cx="15.5" cy="4" r="2"/><path d="M14 8.5 11.5 14"/><path d="M13.6 9.3 9.8 9.8 7.8 12.5"/><path d="m13.6 9.3 2.6 2.4 2.8-.6"/><path d="m11.5 14 3.2 2.3-1 4.7"/><path d="m11.5 14-2.2 3.8-4.3 1.2"/>',
  bone:'<path d="M17 10c.7-.7 1.7 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .8.7 1.8 0 2.5l-7 7c-.7.7-1.7 0-2.5 0a2.5 2.5 0 0 0 0 5c.3 0 .5.2.5.5a2.5 2.5 0 1 0 5 0c0-.8-.7-1.8 0-2.5z"/>',
  heartPulse:'<path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 0 1 12 6a5 5 0 0 1 7.5 6.6"/><path d="M3.5 12h5l1.2-2.2 2.3 5 1.8-6.3 1.5 3.5h5.2"/>',
  pill:'<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7z"/><path d="m8.5 8.5 7 7"/>',
  apple:'<path d="M12 20.9c1.5 0 2.8 1.1 4 1.1 3 0 6-8 6-12.2A4.9 4.9 0 0 0 17 5c-2.2 0-4 1.4-5 2-1-.6-2.8-2-5-2a4.9 4.9 0 0 0-5 4.8C2 14 5 22 8 22c1.3 0 2.5-1.1 4-1.1z"/><path d="M10 2c1 .5 2 2 2 5"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
  phone:'<path d="M21 16.5v3a2 2 0 0 1-2.2 2A19 19 0 0 1 2.5 5.2 2 2 0 0 1 4.5 3h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.4 10.9a16 16 0 0 0 4.7 4.7l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  trash:'<path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/>',
  instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r=".9" fill="currentColor"/>',
  facebook:'<path d="M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V9a.5.5 0 0 1 .5-.5z"/>',
  linkedin:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M8 7.2v.1M12 17v-6.5M12 13.5c0-1.7 1-3 2.6-3 1.5 0 2.4 1 2.4 3V17"/>',
  twitter:'<path d="M22 5.8a8 8 0 0 1-2.4.7 4.1 4.1 0 0 0 1.8-2.3 8 8 0 0 1-2.6 1 4.1 4.1 0 0 0-7 3.8A11.7 11.7 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5 4 4 0 0 1-1.9-.5 4.1 4.1 0 0 0 3.3 4 4.1 4.1 0 0 1-1.8.1 4.1 4.1 0 0 0 3.8 2.9A8.2 8.2 0 0 1 2 18.3 11.6 11.6 0 0 0 8.3 20c7.5 0 11.7-6.3 11.7-11.7v-.5A8.3 8.3 0 0 0 22 5.8z"/>',
  youtube:'<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9.2 5 2.8-5 2.8z"/>',
};
function icon(name, size, cls){
  const s = size || 18;
  return `<svg class="ico ${cls||''}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]||''}</svg>`;
}
function stars(rating, size){
  const n = parseFloat(String(rating).replace(',', '.')) || 0;
  let out = '';
  for(let i=1;i<=5;i++) out += icon('star', size||15, i<=Math.round(n) ? 'star-on' : 'star-off');
  return `<span class="stars" aria-label="${rating} / 5">${out}</span>`;
}

/* Ilustrações coloridas da Home (Physician Library / Academy e faixa de números) */
const ILLUSTRATIONS = {
  /* livro aberto */
  library:`<svg viewBox="0 0 120 110" aria-hidden="true"><path d="M60 26C48 16 30 13 12 16v70c18-3 36 0 48 10z" fill="#EDF3FE" stroke="#123E86" stroke-width="5" stroke-linejoin="round"/><path d="M60 26c12-10 30-13 48-10v70c-18-3-36 0-48 10z" fill="#1F63E0" stroke="#123E86" stroke-width="5" stroke-linejoin="round"/><path d="M60 26v70" stroke="#123E86" stroke-width="5"/><path d="M24 36c9-1 18 1 25 5M24 50c9-1 18 1 25 5M24 64c9-1 18 1 25 5" stroke="#1F63E0" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M96 36c-9-1-18 1-25 5M96 50c-9-1-18 1-25 5M96 64c-9-1-18 1-25 5" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`,
  /* capelo de formatura */
  academy:`<svg viewBox="0 0 120 110" aria-hidden="true"><path d="M60 14 6 38l54 24 54-24z" fill="#1F63E0" stroke="#123E86" stroke-width="5" stroke-linejoin="round"/><path d="M28 50v22c0 9 14 16 32 16s32-7 32-16V50L60 64z" fill="#2F76F0" stroke="#123E86" stroke-width="5" stroke-linejoin="round"/><path d="M60 38 100 45v30" fill="none" stroke="#123E86" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M94 75h12l3 16H91z" fill="#18A058" stroke="#123E86" stroke-width="4" stroke-linejoin="round"/><circle cx="60" cy="38" r="5" fill="#123E86"/></svg>`,
  members:`<svg viewBox="0 0 80 70" aria-hidden="true"><circle cx="20" cy="22" r="10" fill="#18A058"/><path d="M4 52a16 16 0 0 1 32 0z" fill="#18A058"/><circle cx="58" cy="22" r="10" fill="#1F63E0"/><path d="M42 52a16 16 0 0 1 32 0z" fill="#1F63E0"/><circle cx="39" cy="18" r="12" fill="#2F76F0"/><path d="M19 54a20 20 0 0 1 40 0z" fill="#2F76F0"/><circle cx="62" cy="52" r="12" fill="#18A058" stroke="#fff" stroke-width="3"/><path d="M62 45v14M55 52h14" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/></svg>`,
  calendar:`<svg viewBox="0 0 80 70" aria-hidden="true"><rect x="4" y="8" width="56" height="52" rx="7" fill="#fff" stroke="#1F63E0" stroke-width="4"/><path d="M4 22h56" stroke="#1F63E0" stroke-width="6"/><path d="M18 3v12M46 3v12" stroke="#1F63E0" stroke-width="5" stroke-linecap="round"/><g fill="#1F63E0"><rect x="12" y="29" width="8" height="7" rx="1.5"/><rect x="24" y="29" width="8" height="7" rx="1.5"/><rect x="36" y="29" width="8" height="7" rx="1.5"/><rect x="12" y="40" width="8" height="7" rx="1.5"/><rect x="24" y="40" width="8" height="7" rx="1.5"/></g><path d="M58 38c-10 0-18 6-18 14 0 4 2 8 6 10l-2 7 8-4c2 .5 4 .8 6 .8 10 0 18-6 18-14s-8-13.8-18-13.8z" fill="#18A058"/><g fill="#fff"><circle cx="50" cy="52" r="2.4"/><circle cx="58" cy="52" r="2.4"/><circle cx="66" cy="52" r="2.4"/></g></svg>`,
  shieldBooks:`<svg viewBox="0 0 80 70" aria-hidden="true"><path d="M30 2 6 11v17c0 16 11 28 24 32 13-4 24-16 24-32V11z" fill="#1F63E0" stroke="#123E86" stroke-width="3"/><path d="M30 8 12 15v13c0 12 8 21 18 24z" fill="#2F76F0"/><path d="m19 29 8 8 15-16" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><g stroke="#123E86" stroke-width="2.5"><rect x="42" y="50" width="34" height="8" rx="2" fill="#18A058"/><rect x="44" y="42" width="32" height="8" rx="2" fill="#1F63E0"/><rect x="40" y="58" width="36" height="8" rx="2" fill="#2F76F0"/></g></svg>`,
};
