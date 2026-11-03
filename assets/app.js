/* ==========================================================
   Parcours PQual — moteur du site
   Repris du site des mandats pratiques. Lit parcours.yml et construit
   les pages. Aucune modification n'est nécessaire ici.
   ========================================================== */
(function(){
"use strict";

/* ---------- Thèmes ----------
   Chaque apprenti choisit son thème ; le choix reste sur son appareil. */
const SKINS = {
  classique:{label:"Classique", sw:["#EEF1F5","#2F6CC4"],
    palette:["#2F6CC4","#A35C00","#2E8558","#A8378A","#137F8C","#6849C4","#C43E57","#5B7316"]},
  soiree:{label:"Soirée", sw:["#160F2E","#FF4FA3"],
    palette:["#FF4FA3","#3EE0F0","#B6F23A","#FFB020","#B590FF","#FF7A5C","#4DFFB0","#F5E04A"]},
  ferme:{label:"Ferme", sw:["#F1E8D6","#B3261E"],
    palette:["#B3261E","#2F6B3A","#8A5D00","#2D5F8A","#7A4A23","#8A3E6B","#55661C","#B0480F"]},
  plage:{label:"Plage", sw:["#DDF3F5","#0A7FA6"],
    palette:["#0A7FA6","#C7402B","#0B7F74","#B4530B","#2E59A8","#B8336A","#5E7213","#8F5A08"]},
  banque:{label:"Banque", sw:["#0F1E33","#B08A2E"],
    palette:["#1B3A6B","#1F5E4A","#8A1C34","#7D5F10","#4A5A70","#5A3E7A","#2D6E7E","#6B4E2E"]},
  sport:{label:"Sport", sw:["#FFFFFF","#E11D2E"],
    palette:["#D61A2B","#1D4ED8","#15803D","#C2410C","#111827","#7C3AED","#0E7490","#A16207"]},
  arcade:{label:"Arcade", sw:["#12152B","#F0E442"], dark:true, symbols:true,
    palette:["#56B4E9","#E69F00","#F0E442","#009E73","#CC79A7","#D55E00","#FFFFFF","#3D8FD6"]}
};
SKINS.soiree.dark = true;
/* Palettes « couleurs bien distinctes » (Okabe-Ito), lisibles par les personnes daltoniennes */
const CVD_LIGHT = ["#0072B2","#D55E00","#007A5E","#A8457F","#9A6200","#1A1A1A","#2F86C0","#6E6400"];
const CVD_DARK  = ["#56B4E9","#E69F00","#F0E442","#009E73","#CC79A7","#D55E00","#FFFFFF","#3D8FD6"];

/* Réglages personnels, combinables avec n'importe quel thème */
const PREFS_DEF = [
  ["cvd",   "Couleurs bien distinctes", "Couleurs choisies pour rester différentes pour tout le monde, avec un symbole par mandat"],
  ["big",   "Texte plus grand", "Agrandit tout le site"],
  ["plain", "Titres simples", "Remplace les polices fantaisie par une police très lisible"],
  ["still", "Sans animation", "Coupe tous les mouvements"]
];
let PREFS = {};
try{ PREFS = JSON.parse(localStorage.getItem("mp-prefs") || "{}") || {}; }catch(e){ PREFS = {}; }
function applyPrefs(){
  const r = document.documentElement;
  PREFS_DEF.forEach(([k]) => { if (PREFS[k]) r.setAttribute("data-"+k, ""); else r.removeAttribute("data-"+k); });
  if (useSymbols()) r.setAttribute("data-symbols",""); else r.removeAttribute("data-symbols");
}
const useSymbols = () => !!(SKINS[SKIN].symbols || PREFS.cvd);
let SKIN = "classique";
try{ const k = localStorage.getItem("mp-theme"); if (SKINS[k]) SKIN = k; }catch(e){}
document.documentElement.dataset.skin = SKIN;
const palette = () => PREFS.cvd ? (SKINS[SKIN].dark ? CVD_DARK : CVD_LIGHT) : SKINS[SKIN].palette;
applyPrefs();

/* Texte lisible sur une couleur de fond donnée */
function onColor(hex){
  const h = String(hex).replace("#",""); if (h.length !== 6) return "#FFFFFF";
  const ch = i => { const c = parseInt(h.slice(i,i+2),16)/255; return c <= .03928 ? c/12.92 : Math.pow((c+.055)/1.055, 2.4); };
  const L = .2126*ch(0) + .7152*ch(2) + .0722*ch(4);
  return L > .36 ? "#12152B" : "#FFFFFF";
}
/* Symboles de manette : un par mandat, pour ne jamais dépendre de la couleur seule */
const SYMS = [
  '<path d="M8 1.6 15 14.4H1z"/>',
  '<circle cx="8" cy="8" r="6.4"/>',
  '<path d="M2.2 4.6 4.6 2.2 8 5.6l3.4-3.4 2.4 2.4L10.4 8l3.4 3.4-2.4 2.4L8 10.4l-3.4 3.4-2.4-2.4L5.6 8z"/>',
  '<rect x="2" y="2" width="12" height="12"/>',
  '<path d="M8 .8l2.1 4.6 5 .5-3.8 3.4 1.1 4.9L8 11.7l-4.4 2.5 1.1-4.9L.9 5.9l5-.5z"/>',
  '<path d="M8 .8 15.2 8 8 15.2.8 8z"/>',
  '<path d="M5.8 1.2h4.4v4.6h4.6v4.4h-4.6v4.6H5.8v-4.6H1.2V5.8h4.6z"/>',
  '<path d="M4.3 1.6h7.4L15.4 8l-3.7 6.4H4.3L.6 8z"/>'
];
function sym(m, extra=""){
  if (!useSymbols()) return "";
  return `<svg class="sym ${extra}" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">${SYMS[m.index % SYMS.length]}</svg>`;
}
function hasTextLoose(v){ return typeof v === "string" && v.trim() !== ""; }
const MOIS = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
const MOIS_COURT = ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."];
const JOURS = ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"];
const DAY = 86400000;

/* ---------- Petits outils ---------- */
const $ = (sel, root=document) => root.querySelector(sel);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

function toDate(v){
  if (v instanceof Date) return new Date(Date.UTC(v.getUTCFullYear(), v.getUTCMonth(), v.getUTCDate()));
  if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v.trim())){
    const [y,m,d] = v.trim().split("-").map(Number); return new Date(Date.UTC(y,m-1,d));
  }
  return null;
}
function today(){ const n=new Date(); return new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())); }
function daysBetween(a,b){ return Math.round((b-a)/DAY); }
function fmtLong(d){ return `${JOURS[d.getUTCDay()]} ${d.getUTCDate()} ${MOIS[d.getUTCMonth()]}`; }
function fmtShort(d){ return `${d.getUTCDate()} ${MOIS_COURT[d.getUTCMonth()]}`; }
function ymd(d){ return d.toISOString().slice(0,10).replace(/-/g,""); }
function cap(s){ return s.charAt(0).toUpperCase()+s.slice(1); }
function inDays(n){
  if (n === 0) return "aujourd'hui";
  if (n === 1) return "demain";
  if (n > 1) return `dans ${n} jours`;
  if (n === -1) return "hier";
  return `il y a ${-n} jours`;
}
function asList(v){ return Array.isArray(v) ? v.filter(x => x !== null && x !== undefined && String(x).trim() !== "") : []; }
function hasText(v){ return typeof v === "string" && v.trim() !== ""; }

/* Mise en forme légère : **gras**, *italique*, [lien](url), listes « - » */
function inline(s){
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}
function md(text){
  if (!hasText(text)) return "";
  const lines = String(text).replace(/\r/g,"").split("\n");
  let html = "", para = [], list = null;
  const flushP = () => { if (para.length){ html += `<p>${inline(para.join(" "))}</p>`; para = []; } };
  const flushL = () => { if (list){ html += `<ul>${list.map(i=>`<li>${inline(i)}</li>`).join("")}</ul>`; list = null; } };
  for (const raw of lines){
    const line = raw.trim();
    const m = line.match(/^[-•]\s+(.*)$/);
    if (m){ flushP(); (list ||= []).push(m[1]); }
    else if (line === ""){ flushP(); flushL(); }
    else if (list && /^\s{2,}/.test(raw)){ list[list.length-1] += " " + line; }
    else { flushL(); para.push(line); }
  }
  flushP(); flushL();
  return html;
}

/* ==========================================================
   PARCOURS PQUAL — partie propre au site
   ========================================================== */
const TYPES = {
  quiz:      {label:"Quiz",                 icon:'<path d="M9.1 9a3 3 0 1 1 4.2 2.7c-.8.4-1.3 1.1-1.3 2v.3M12 17.5h.01"/><circle cx="12" cy="12" r="9"/>'},
  situation: {label:"Mise en situation",    icon:'<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.3-4.3"/>'},
  transfert: {label:"Exercice de transfert",icon:'<path d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5"/>'},
  chrono:    {label:"Entraînement chronométré", icon:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9.5 2.5h5"/>'},
  oral:      {label:"Entraînement oral",    icon:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>'},
  ressource: {label:"Ressource",            icon:'<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5zM5 19.5A1.5 1.5 0 0 0 6.5 21H19"/>'}
};
const typeIcon = t => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${(TYPES[t]||TYPES.ressource).icon}</svg>`;
const ICON_CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4M12 13v5M9.5 15.5h5"/></svg>';
const ICON_BOOK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5zM5 19.5A1.5 1.5 0 0 0 6.5 21H19"/></svg>';
const ICON_TEST = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 11l2.5 2.5L16 9"/><rect x="4" y="3" width="16" height="18" rx="3"/></svg>';
const ICON_LINK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/></svg>';
const DCO_NOMS = {A:"Domaine a",B:"Domaine b",C:"Domaine c",D:"Domaine d",E:"Domaine e",F:"Domaine f · IA"};

const kw = e => hasTextLoose(e.mot_cle) ? e.mot_cle : (e.titre || "");
const isExternal = u => /^https?:/i.test(u);
const target = u => isExternal(u) ? ' target="_blank" rel="noopener"' : "";

/* ---------- Fichier source ---------- */
const DEFAULT_SRC = "parcours.yml";
const SRC = (() => {
  const f = new URLSearchParams(location.search).get("fichier");
  return f && /^[\w-]+\.yml$/.test(f) ? f : DEFAULT_SRC;
})();

async function fetchYaml(name){
  let txt;
  try{
    const r = await fetch(name + "?v=" + Date.now(), {cache:"no-store"});
    if (!r.ok) throw new Error("HTTP " + r.status);
    txt = await r.text();
  }catch(e){
    throw {title:`Le fichier ${name} est introuvable`,
      detail:"Vérifiez qu'il se trouve bien à côté de index.html, avec ce nom exact.\n(" + e.message + ")"};
  }
  try{ return jsyaml.load(txt) || {}; }
  catch(e){
    const line = e.mark ? e.mark.line + 1 : "?";
    throw {title:`Erreur dans ${name}, ligne ${line}`,
      detail:"Le site ne peut pas lire le fichier maître. Causes les plus fréquentes :\n" +
        "– une tabulation au lieu d'espaces, ou un décalage d'indentation ;\n" +
        "– un texte contenant « : » ou « # » sans guillemets ;\n" +
        "– un guillemet ouvert et pas refermé.\n\nMessage technique : " + (e.reason || e.message)};
  }
}

function store(k, v){
  try{
    if (v === undefined) return localStorage.getItem(k);
    localStorage.setItem(k, v);
  }catch(e){ return null; }
}

function normalize(d){
  const site = d.site || {}, p = d.parcours || {}, ex = d.examens || {};
  const warnings = [];
  const etapes = asList(d.etapes).map((e,i) => {
    if (!e.id) warnings.push(`L'étape n°${i+1} (« ${e.titre || "sans titre"} ») n'a pas d'id.`);
    const color = e.couleur || palette()[i % palette().length];
    const out = Object.assign({}, e, {color, on:onColor(color), index:i, num:i+1,
      debut:toDate(e.debut), fin:toDate(e.fin)});
    if (!out.debut || !out.fin) warnings.push(`L'étape « ${kw(e)} » n'a pas de dates complètes (debut et fin).`);
    else if (out.fin < out.debut) warnings.push(`L'étape « ${kw(e)} » se termine avant de commencer.`);
    return out;
  });
  return {
    site, warnings, etapes,
    start: toDate(p.debut), end: toDate(p.fin),
    exam: {nom: ex.nom || "Examens", debut: toDate(ex.debut), fin: toDate(ex.fin) || toDate(ex.debut)},
    cal: asList(d.calendrier).map(c => ({...c, debut:toDate(c.debut), fin:toDate(c.fin) || toDate(c.debut)})).filter(c => c.debut),
    ressources: asList(d.ressources),
    une: (d.a_la_une && hasText(d.a_la_une.titre)) ? d.a_la_une : null
  };
}

/* ---------- Je me teste : coches enregistrées sur l'appareil ---------- */
const ckKey = e => `pq-check-${e.id}`;
function checked(e){
  try{ return JSON.parse(store(ckKey(e)) || "[]") || []; }catch(x){ return []; }
}
function progress(e){
  const total = asList(e.je_me_teste).length;
  const done = checked(e).filter(i => i < total).length;
  return {total, done};
}

/* Étape du calendrier : un repère de date, pas un suivi de l'apprenti·e */
function stageOfDay(data, now){
  const cur = data.etapes.find(e => e.debut && e.fin && now >= e.debut && now <= e.fin);
  if (cur) return {e:cur, k:"in"};
  const next = data.etapes.find(e => e.debut && e.debut > now);
  if (next) return {e:next, k:"next"};
  return null;
}

/* ---------- Fichier agenda (.ics) ---------- */
function icsEscape(s){ return String(s||"").replace(/\\/g,"\\\\").replace(/\n/g,"\\n").replace(/[,;]/g, m => "\\"+m); }
function fold(line){
  const out = []; let s = line;
  while (s.length > 74){ out.push(s.slice(0,74)); s = " " + s.slice(74); }
  out.push(s); return out.join("\r\n");
}
function buildIcs(data){
  const base = location.href.replace(/[^/]*([?#].*)?$/, "");
  const stamp = new Date().toISOString().replace(/[-:]/g,"").slice(0,15) + "Z";
  const L = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//parcours-pqual//FR","CALSCALE:GREGORIAN","METHOD:PUBLISH"];
  const ev = (uid, d, title, desc, url) => L.push("BEGIN:VEVENT", `UID:${uid}@parcours-pqual`, `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${ymd(d)}`, `DTEND;VALUE=DATE:${ymd(new Date(+d + DAY))}`,
    `SUMMARY:${icsEscape(title)}`, `DESCRIPTION:${icsEscape(desc + "\n\n" + url)}`, `URL:${url}`, "END:VEVENT");
  for (const e of data.etapes){
    if (!e.debut) continue;
    const url = `${base}etape.html?id=${encodeURIComponent(e.id)}`;
    ev(`${e.id}-debut`, e.debut, `PQual · étape ${e.num} : ${kw(e)}`, (e.en_bref||"").replace(/\s+/g," ").trim(), url);
    if (e.fin) ev(`${e.id}-test`, e.fin, `PQual · je me teste : ${kw(e)}`, "Faites le point sur l'étape avant de passer à la suivante.", url);
  }
  if (data.exam.debut) ev("examens", data.exam.debut, `PQual · ${data.exam.nom}`, "Début de la période d'examens.", base);
  L.push("END:VCALENDAR");
  return L.map(fold).join("\r\n");
}
function downloadIcs(name, text){
  const blob = new Blob([text], {type:"text/calendar;charset=utf-8"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}

/* ---------- Éléments communs ---------- */
function decoHero(){
  const d = window.MP_DECO && window.MP_DECO[SKIN];
  return d ? `<div class="deco deco-hero" aria-hidden="true">${d.hero}</div>` : "";
}
let prefsOpen = false;
function themePicker(){
  return `<div class="skins" role="group" aria-label="Thème du site"><span class="skins-k">Thème</span>${
    Object.entries(SKINS).map(([k,v]) => `<button type="button" class="skin${k===SKIN?" on":""}" data-skin="${k}" aria-pressed="${k===SKIN}">
      <i style="--a:${v.sw[0]};--b:${v.sw[1]}"></i>${v.label}</button>`).join("")}
    <details class="prefs"${prefsOpen?" open":""}><summary>Mes réglages${Object.values(PREFS).filter(Boolean).length ? ` (${Object.values(PREFS).filter(Boolean).length})` : ""}</summary>
      <div class="prefs-box">${PREFS_DEF.map(([k,t,d]) => `<label class="pref"><input type="checkbox" data-pref="${k}"${PREFS[k]?" checked":""}><span><b>${t}</b><small>${d}</small></span></label>`).join("")}
      <p class="prefs-note">Ces réglages restent sur cet appareil et marchent avec tous les thèmes.</p></div>
    </details></div>`;
}
function footer(data){
  const s = data.site, bits = [];
  if (hasText(s.formateur)) bits.push(`Conception : ${esc(s.formateur)}, Espace Entreprise`);
  if (hasText(s.contact)) bits.push(`<a href="mailto:${esc(s.contact)}">${esc(s.contact)}</a>`);
  return `<footer class="foot wrap">${document.body.dataset.page !== "home" ? themePicker() : ""}${bits.join("<br>")}</footer>`;
}
function betaBar(data){
  return data.site.beta ? `<div class="draft-bar beta-bar">Version bêta : le site se complète au fil de l'année. Les outils marqués « bientôt » arrivent prochainement.</div>` : "";
}
function showError(err){
  const t = err && err.title ? err : {title:"Erreur inattendue", detail:String(err && err.message || err)};
  document.body.innerHTML = `<main class="wrap narrow"><div class="error" role="alert"><h2>${esc(t.title)}</h2><pre>${esc(t.detail)}</pre></div></main>`;
}
function warningsHtml(data){
  if (!data.warnings.length) return "";
  return `<div class="warn" role="status"><b>À corriger dans ${esc(SRC)} :</b><ul style="margin:6px 0 0;padding-left:20px">${data.warnings.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`;
}
function block(title, inner, id){ return `<section class="block"${id?` id="${id}"`:""}><h2>${title}</h2>${inner}</section>`; }
const etapeHref = e => `etape.html?id=${encodeURIComponent(e.id)}`;

/* Le guide peut être une page web (lien direct vers une partie : …#c3)
   ou un fichier sur le Drive (un seul lien, sans partie). */
function guideLink(data, code){
  const base = String(data.site.guide_pratique || "").trim();
  const c = String(code).trim();
  const label = /^[A-F]$/.test(c) ? DCO_NOMS[c] : `Compétence ${c.toLowerCase()}`;
  if (!base) return `<span class="btn" aria-disabled="true" style="border-style:dashed;opacity:.6">${ICON_BOOK}${esc(label)}</span>`;
  const deep = !/drive\.google|docs\.google/i.test(base);
  return `<a class="btn" href="${esc(deep ? base + "#" + c : base)}"${target(base)}>${ICON_BOOK}${esc(label)}</a>`;
}

function activityCard(a){
  const t = TYPES[a.type] ? a.type : "ressource";
  const ok = hasText(a.url);
  const tag = ok ? "a" : "div";
  const attr = ok ? ` href="${esc(a.url)}"${target(a.url)}` : ` aria-disabled="true"`;
  return `<${tag} class="act${ok?"":" soon"}"${attr}>
    <span class="act-ico">${typeIcon(t)}</span>
    <span class="act-body">
      <span class="act-meta">${esc(TYPES[t].label)}${hasText(a.duree) ? ` · ${esc(a.duree)}` : ""}</span>
      <span class="act-t">${esc(a.titre || "")}</span>
      ${hasText(a.description) ? `<span class="act-d">${inline(a.description)}</span>` : ""}
    </span>
    <span class="act-go">${ok ? "Ouvrir" : "Bientôt"}</span>
  </${tag}>`;
}

/* ==========================================================
   PAGE D'ACCUEIL
   ========================================================== */
function renderHome(data){
  const s = data.site, now = today();
  document.title = s.titre || "Parcours PQual";
  const so = stageOfDay(data, now);
  const nEx = data.exam.debut ? daysBetween(now, data.exam.debut) : null;

  let hero = "";
  if (nEx !== null && nEx >= 0){
    const e = so && so.e;
    hero = `<section class="next has-deco-maybe${decoHero()?" has-deco":""}" style="--c:${e ? e.color : "var(--ink)"}" aria-label="Où en est le calendrier">
      <div class="days">${nEx}<small>${nEx===1?"jour":"jours"}</small></div>
      <div class="what">
        <p class="kicker">avant les ${esc(data.exam.nom.toLowerCase())}</p>
        ${e ? `<h2><a href="${etapeHref(e)}">${sym(e,"big")}${so.k==="in" ? "Étape du moment" : "Prochaine étape"} : ${esc(kw(e))}</a></h2>
        <p class="next-title">${so.k==="in" ? `Selon le calendrier, jusqu'au ${fmtLong(e.fin)}.` : `Elle commence le ${fmtLong(e.debut)}.`} Vous pouvez ouvrir n'importe quelle étape, dans l'ordre qui vous convient.</p>` : ""}
      </div>
      ${e ? `<div class="actions"><a class="btn solid" href="${etapeHref(e)}">Ouvrir l'étape</a><a class="btn" href="${etapeHref(e)}#test">${ICON_TEST}Me tester</a></div>` : ""}
      ${decoHero()}
    </section>`;
  } else if (nEx !== null){
    hero = `<section class="next done" style="--c:var(--ink)"><div class="what"><h2>Les examens sont passés. Bravo pour tout ce travail.</h2></div></section>`;
  }

  const res = data.ressources.filter(r => r && hasText(r.titre));
  const u = data.une, uOk = !!u && hasText(u.url);
  const uIn = u ? `<span class="une-body">
        ${hasText(u.surtitre) ? `<span class="une-k">${esc(u.surtitre)}</span>` : ""}
        <span class="une-t">${esc(u.titre)}</span>
        ${hasText(u.description) ? `<span class="une-d">${inline(u.description)}</span>` : ""}
      </span>
      <span class="btn une-go${uOk ? "" : " soon"}">${uOk ? esc(u.bouton || "Ouvrir") + " &rarr;" : "Bientôt"}</span>` : "";
  const une = !u ? "" : uOk
    ? `<a class="une" href="${esc(u.url)}"${target(u.url)}>${uIn}</a>`
    : `<section class="une" aria-disabled="true">${uIn}</section>`;
  document.body.innerHTML = `
  ${betaBar(data)}
  <header class="wrap top">
    <div><h1 class="brand"><a href="./">${esc(s.titre || "Mon parcours PQual")}</a></h1>
      <p class="sub">${esc(s.sous_titre || "")}</p></div>
    <div class="top-tools">${themePicker()}</div>
  </header>
  <main class="wrap">
    ${warningsHtml(data)}
    ${une}
    ${hero}
    <div class="section-head">
      <h2>Le planning</h2>
      <div class="actions"><button class="btn" id="ics-all">${ICON_CAL}Les étapes dans mon agenda</button></div>
    </div>
    ${gantt(data, now)}
    ${mobileList(data, now)}
    ${res.length ? `<div class="section-head"><h2>Les ressources</h2></div>
      <div class="acts res">${res.map(r => activityCard({...r, type:"ressource"})).join("")}</div>` : ""}
  </main>
  ${footer(data)}`;
  $("#ics-all").addEventListener("click", () => downloadIcs("parcours-pqual.ics", buildIcs(data)));
}

function weekStart(d){ const w = (d.getUTCDay()+6)%7; return new Date(+d - w*DAY); }

function gantt(data, now){
  if (!data.start || !data.end) return `<p class="warn">Indiquez parcours.debut et parcours.fin dans ${esc(SRC)} pour afficher le planning.</p>`;
  const t0 = weekStart(data.start);
  const t1 = new Date(+weekStart(data.end) + 7*DAY);
  const total = daysBetween(t0, t1);
  const num = d => Math.max(0, Math.min(total, daysBetween(t0, d))) / total * 100;
  const pct = d => num(d).toFixed(3) + "%";
  const inRange = d => d >= t0 && d <= t1;
  const nWeeks = Math.round(total / 7);
  const step = nWeeks > 26 ? 4 : nWeeks > 16 ? 2 : 1;

  let months = "", weeks = "", cols = "", i = 0;
  let m = new Date(Date.UTC(t0.getUTCFullYear(), t0.getUTCMonth(), 1));
  while (m < t1){
    const left = m < t0 ? t0 : m;
    const nextM = new Date(Date.UTC(m.getUTCFullYear(), m.getUTCMonth()+1, 1));
    const width = daysBetween(left, nextM < t1 ? nextM : t1);
    if (width >= 6) months += `<div class="g-month" style="left:${pct(left)}">${cap(MOIS[m.getUTCMonth()])}</div>`;
    cols += `<div class="g-col g-col-m" style="left:${pct(left)}"></div>`;
    m = nextM;
  }
  for (let w = new Date(t0); w < t1; w = new Date(+w + 7*DAY), i++){
    if (i % step === 0) weeks += `<div class="g-week" style="left:${pct(w)}">${w.getUTCDate()}.${w.getUTCMonth()+1}</div>`;
  }
  let off = "";
  for (const c of data.cal){
    if (!(inRange(c.debut) || inRange(c.fin))) continue;
    if (c.type === "evenement"){
      off += `<div class="g-event" style="left:${pct(c.debut)}" title="${esc(c.nom)}"><span>${esc(c.nom)}</span></div>`;
    } else {
      const end = new Date(+c.fin + DAY);
      off += `<div class="g-off" style="left:${pct(c.debut)};width:calc(${pct(end)} - ${pct(c.debut)})" title="${esc(c.nom)}">${daysBetween(c.debut,end) >= 10 ? `<span>${esc(c.nom.replace(/^Vacances (de |d')/,""))}</span>` : ""}</div>`;
    }
  }
  const ex = data.exam;
  const exam = ex.debut && inRange(ex.debut) ? `<div class="g-exam" style="left:${pct(ex.debut)};width:calc(${pct(new Date(+ex.fin + DAY))} - ${pct(ex.debut)})" title="${esc(ex.nom)}"><span>Examens</span></div>` : "";
  const todayLine = inRange(now) ? `<div class="g-today" style="left:${pct(now)}"><span>Aujourd'hui</span></div>` : "";

  const names = data.etapes.map(e => {
    const p = progress(e);
    return `<div class="g-row"><a class="g-name" style="--c:${e.color}" href="${etapeHref(e)}">
      ${useSymbols() ? sym(e,"dot-sym") : '<span class="dot"></span>'}<span class="t"><span class="kw">${e.num} · ${esc(kw(e))}</span><span class="tt">${p.total ? `${p.done} sur ${p.total} cochés` : esc(e.titre || "")}</span></span></a></div>`;
  }).join("");
  const bars = data.etapes.map(e => {
    if (!e.debut || !e.fin) return `<div class="g-bar-row"></div>`;
    const end = new Date(+e.fin + DAY);
    const past = e.fin < now ? " past" : "";
    const label = `Étape ${e.num}, ${kw(e)} : du ${fmtLong(e.debut)} au ${fmtLong(e.fin)}`;
    const sN = num(e.debut), eN = num(end), w = eN - sN;
    const place = w >= 14 ? "in" : (eN <= 72 ? "right" : "left");
    const txt = `<span class="g-lab g-lab-${place}">${esc(kw(e))}</span>`;
    const style = `--c:${e.color};--on-c:${e.on};left:${sN.toFixed(3)}%;width:${w.toFixed(3)}%`;
    return `<div class="g-bar-row"><a class="g-bar${past}" style="${style}" href="${etapeHref(e)}" title="${esc(label)}" aria-label="${esc(label)}">${place==="in"?txt:""}<span class="pin">${sym(e,"pin-sym")}</span></a>${place!=="in"?`<span class="g-lab-out g-lab-${place}" style="${place==="right"?`left:calc(${eN.toFixed(3)}% + 8px)`:`right:calc(${(100-sN).toFixed(3)}% + 8px)`}">${esc(kw(e))}</span>`:""}</div>`;
  }).join("");

  return `<section class="gantt" aria-label="Planning du parcours">
    <div class="g-grid">
      <div class="g-names"><div class="g-head"></div>${names}</div>
      <div class="g-track">
        <div class="g-months">${months}</div><div class="g-weeks">${weeks}</div>
        ${cols}${off}${exam}${todayLine}
        <div class="g-bars">${bars}</div>
      </div>
    </div>
    <div class="g-legend">
      <span><i style="background:var(--ink-soft);border-radius:999px"></i>Étape, le rond marque le moment de se tester</span>
      <span><i class="h"></i>Vacances et jours fériés : idéal pour rattraper</span>
      <span><i class="x"></i>Examens</span>
    </div>
  </section>`;
}

function mobileList(data, now){
  const items = [];
  for (const e of data.etapes) if (e.debut) items.push({d:e.debut, k:"e", e});
  for (const c of data.cal) items.push({d:c.debut, k:"off", c});
  if (data.exam.debut) items.push({d:data.exam.debut, k:"ex", o:1});
  items.sort((a,b) => (a.d - b.d) || ((a.o||0) - (b.o||0)));
  const li = items.map(it => {
    if (it.k === "e"){
      const e = it.e, p = progress(e);
      return `<li><a class="l-mp${e.fin && e.fin < now ? " past":""}" style="--c:${e.color}" href="${etapeHref(e)}">
        <span class="l-date"><b>${e.debut.getUTCDate()}</b><small>${MOIS_COURT[e.debut.getUTCMonth()]}</small></span>
        <span><span class="t">${sym(e)}${e.num} · ${esc(kw(e))}</span><span class="co">${e.fin ? `Jusqu'au ${fmtShort(e.fin)}` : ""}${p.total ? ` · ${p.done} sur ${p.total} cochés` : ""}</span></span></a></li>`;
    }
    if (it.k === "ex") return `<li class="l-limit">${esc(data.exam.nom)} : dès le ${fmtLong(data.exam.debut)}</li>`;
    const c = it.c, same = +c.debut === +c.fin;
    return `<li class="l-off${c.type==="evenement"?" ev":""}"><i></i>${esc(c.nom)}, ${same ? fmtShort(c.debut) : `du ${fmtShort(c.debut)} au ${fmtShort(c.fin)}`}</li>`;
  }).join("");
  return `<ol class="list" aria-label="Planning du parcours">${li}</ol>`;
}

/* ==========================================================
   PAGE D'UNE ÉTAPE
   ========================================================== */
function renderEtape(data){
  const id = new URLSearchParams(location.search).get("id");
  const e = data.etapes.find(x => x.id === id);
  if (!e){
    showError({title:"Cette étape n'existe pas", detail:`Aucune étape avec l'id « ${id || ""} » dans ${SRC}.`});
    document.querySelector(".error").insertAdjacentHTML("beforeend", '<p><a class="btn" href="./">Retour au planning</a></p>');
    return;
  }
  const s = data.site, now = today();
  document.title = `${kw(e)} – ${s.titre || "Parcours PQual"}`;
  document.documentElement.style.setProperty("--c", e.color);
  document.documentElement.style.setProperty("--on-c", e.on);

  const facts = [];
  if (e.debut && e.fin) facts.push(`<div class="fact"><p class="k">Selon le calendrier</p><p class="v">Du ${fmtShort(e.debut)} au ${fmtShort(e.fin)}<small>${now < e.debut ? `Commence ${inDays(daysBetween(now, e.debut))}` : now <= e.fin ? "En ce moment" : "Période passée, toujours accessible"}</small></p></div>`);
  const nAct = asList(e.activites).length;
  if (nAct) facts.push(`<div class="fact"><p class="k">Outils</p><p class="v">${nAct}<small>${(n => n + (n > 1 ? " disponibles" : " disponible"))(asList(e.activites).filter(a=>hasText(a.url)).length)}</small></p></div>`);

  const blocks = [];
  const obj = asList(e.objectifs);
  if (obj.length) blocks.push(block("Les objectifs de l'étape", `<ul>${obj.map(x=>`<li>${inline(x)}</li>`).join("")}</ul>`));
  if (hasText(e.contenu)) blocks.push(block("L'essentiel", `<div class="prose">${md(e.contenu)}</div>`));
  const acts = asList(e.activites).filter(a => a && hasText(a.titre));
  if (acts.length) blocks.push(block("Pour vous entraîner", `<div class="acts">${acts.map(activityCard).join("")}</div>`));
  const gd = asList(e.guide);
  if (gd.length) blocks.push(block("Dans le Guide pratique", `${hasText(data.site.guide_pratique) && /drive\.google|docs\.google/i.test(data.site.guide_pratique) ? `<p class="muted">Le guide s'ouvre sur le Drive de l'Espace Entreprise. Choisissez ensuite le domaine dans le sommaire.</p>` : ""}<div class="actions">${gd.map(c => guideLink(data, c)).join("")}</div>`));
  const ck = asList(e.je_me_teste);
  if (ck.length){
    blocks.push(block("Je me teste", `<p class="muted">Cochez ce que vous savez faire. Les cases vides vous montrent quoi retravailler.</p>
      <p class="progress" id="ck-prog"></p>
      <ul class="check">${ck.map((x,i)=>`<li><label><input type="checkbox" data-i="${i}"><span>${inline(x)}</span></label></li>`).join("")}</ul>
      <p class="muted" style="font-size:14px;margin-top:8px">Vos coches restent sur cet appareil. Personne d'autre ne les voit.</p>`, "test"));
  }

  const i = data.etapes.indexOf(e), prev = data.etapes[i-1], next = data.etapes[i+1];
  const nav = `<nav class="step-nav" aria-label="Autres étapes">
    ${prev ? `<a class="btn" href="${etapeHref(prev)}">Étape ${prev.num} · ${esc(kw(prev))}</a>` : "<span></span>"}
    ${next ? `<a class="btn solid" href="${etapeHref(next)}">Étape ${next.num} · ${esc(kw(next))}</a>` : ""}
  </nav>`;

  document.body.innerHTML = `
  ${betaBar(data)}
  <main class="wrap narrow">
    <a class="back" href="./">Retour au planning</a>
    <header class="mp-head${decoHero()?" has-deco":""}">${decoHero()}
      <div class="ids"><span class="chip">Étape ${e.num} sur ${data.etapes.length}</span></div>
      <p class="kw-big">${sym(e,"big")}${esc(kw(e))}</p>
      <h1>${esc(e.titre || "")}</h1>
      ${hasText(e.en_bref) ? `<div class="lead">${md(e.en_bref)}</div>` : ""}
    </header>
    <div class="facts">${facts.join("")}</div>
    ${ck.length ? `<div class="actions" style="margin-bottom:22px"><a class="btn" href="#test">${ICON_TEST}Me tester</a></div>` : ""}
    ${blocks.join("")}
    ${nav}
  </main>
  ${footer(data)}`;
  bindChecklist(e, ck.length);
}

function bindChecklist(e, total){
  const boxes = [...document.querySelectorAll(".check input")];
  if (!boxes.length) return;
  const state = checked(e);
  boxes.forEach(b => { b.checked = state.includes(+b.dataset.i); });
  const upd = () => {
    const on = boxes.filter(b => b.checked).map(b => +b.dataset.i);
    store(ckKey(e), JSON.stringify(on));
    $("#ck-prog").textContent = on.length === total ? "Tout est coché : cette étape est solide."
      : on.length === 0 ? `${total} points à vérifier`
      : `${on.length} sur ${total} cochés. Les cases vides sont votre programme.`;
  };
  boxes.forEach(b => b.addEventListener("change", upd));
  upd();
}

/* ---------- Lancement ---------- */
function recolor(data){
  data.etapes.forEach((m,i) => { if (!m.couleur) m.color = palette()[i % palette().length]; m.on = onColor(m.color); });
}
function render(data){
  const y = window.scrollY;
  if (document.body.dataset.page === "etape") renderEtape(data); else renderHome(data);
  const d = window.MP_DECO && window.MP_DECO[SKIN];
  if (d && d.strip) document.body.insertAdjacentHTML("afterbegin", '<div class="deco-strip" aria-hidden="true"></div>');
  if (location.hash){ const t = document.querySelector(location.hash); if (t) setTimeout(() => t.scrollIntoView(), 0); }
  document.querySelectorAll(".skin").forEach(b => b.addEventListener("click", () => {
    SKIN = b.dataset.skin;
    try{ localStorage.setItem("mp-theme", SKIN); }catch(e){}
    document.documentElement.dataset.skin = SKIN;
    applyPrefs(); recolor(data); render(data);
    window.scrollTo(0, y);
    const again = document.querySelector(`.skin[data-skin="${SKIN}"]`); if (again) again.focus();
  }));
  document.querySelectorAll(".prefs").forEach(dt => dt.addEventListener("toggle", () => { prefsOpen = dt.open; }));
  document.querySelectorAll("[data-pref]").forEach(c => c.addEventListener("change", () => {
    const k = c.dataset.pref; PREFS[k] = c.checked;
    try{ localStorage.setItem("mp-prefs", JSON.stringify(PREFS)); }catch(e){}
    prefsOpen = true; applyPrefs(); recolor(data);
    const yy = window.scrollY; render(data); window.scrollTo(0, yy);
    const again = document.querySelector(`[data-pref="${k}"]`); if (again) again.focus();
  }));
}
document.addEventListener("DOMContentLoaded", async () => {
  try{ render(normalize(await fetchYaml(SRC))); }
  catch(e){ console.error(e); showError(e); }
});
})();
