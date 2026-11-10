import { View } from './View.js';

/* ---- géométrie du compteur : 0 → 280 km/h sur 240°, centre (400,400), rayon 300 ---- */
const CX = 400, CY = 400, R = 300, MAX = 280, A0 = 150, SPAN = 240, VBW = 800, VBH = 590;
export const angleOf = (s) => A0 + (Math.min(Math.max(s, 0), MAX) / MAX) * SPAN;
const pol = (r, a) => [CX + r * Math.cos((a * Math.PI) / 180), CY + r * Math.sin((a * Math.PI) / 180)];
const f = (n) => n.toFixed(1);
const arc = (r, s0, s1) => {
  const [x0, y0] = pol(r, angleOf(s0)), [x1, y1] = pol(r, angleOf(s1));
  return `M${f(x0)} ${f(y0)}A${r} ${r} 0 ${angleOf(s1) - angleOf(s0) > 180 ? 1 : 0} 1 ${f(x1)} ${f(y1)}`;
};
const zoneColor = (s) => `hsl(${Math.round(125 - (s / MAX) * 125)} 85% 52%)`;   // vert (lent) → rouge (rapide)

/** Passions : compteur de vitesse. Plus la passion compte, plus sa zone est haute dans la plage de vitesse. */
export class PassionsView extends View {
  template({ content, lang }) {
    const page = content.page('passions'), ui = content.data.ui, t = (v) => v[lang];
    const items = page.sections;

    let ticks = '', nums = '';
    for (let s = 0; s <= MAX; s += 10) {
      const major = s % 20 === 0, a = angleOf(s);
      const [x0, y0] = pol(R - 20, a), [x1, y1] = pol(R - (major ? 42 : 32), a);
      ticks += `<line x1="${f(x0)}" y1="${f(y0)}" x2="${f(x1)}" y2="${f(y1)}" class="tk${major ? ' tk--major' : ''}"/>`;
      if (s % 40 === 0) { const [nx, ny] = pol(R - 70, a); nums += `<text x="${f(nx)}" y="${f(ny)}" class="gauge__n">${s}</text>`; }
    }

    const zones = items.map((it, i) => {
      const s0 = Math.max(0, it.speed - 18), s1 = Math.min(MAX, it.speed + 18), [lx, ly] = pol(R + 56, angleOf(it.speed));
      return `<g class="zone" data-zone="${i}" tabindex="0" role="button" aria-label="${t(it.title)} — ${it.speed} km/h"
          style="--zc:${zoneColor(it.speed)}" data-lx="${(lx / VBW * 100).toFixed(2)}" data-ly="${(ly / VBH * 100).toFixed(2)}">
        <path class="zone__arc" d="${arc(R, s0, s1)}"/><path class="zone__hit" d="${arc(R, s0 - 6, s1 + 6)}"/></g>`;
    }).join('');

    return `<div class="pass">
      <h1 class="sr-only">${t(page.title)}</h1><p class="sr-only">${t(page.intro)}</p>
      <div class="pass-poster" inert><div class="pass-poster__clip"><div class="pass-poster__slot"></div></div></div>
      <div class="gauge">
        <svg class="gauge__svg" viewBox="0 0 ${VBW} ${VBH}" role="group" aria-label="${t(page.title)}">
          <defs>
            <radialGradient id="gFace" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#1c2230"/><stop offset=".75" stop-color="#10141d"/><stop offset="1" stop-color="#0a0d13"/></radialGradient>
            <clipPath id="gClip"><rect width="${VBW}" height="${VBH - 10}"/></clipPath>
          </defs>
          <g clip-path="url(#gClip)"><circle class="gauge__face" cx="${CX}" cy="${CY}" r="${R + 46}" fill="url(#gFace)"/></g>
          <path class="gauge__track" d="${arc(R, 0, MAX)}"/>
          ${ticks}${nums}${zones}
          <g transform="translate(${CX} ${CY})"><g class="needle" style="transform:rotate(${A0}deg)"><polygon class="needle__body" points="-32,-6 ${R - 48},-1.6 ${R - 48},1.6 -32,6"/></g>
            <circle class="hub" r="34"/><circle class="hub__c" r="12"/></g>
          <text class="gauge__num" x="${CX}" y="500" text-anchor="middle">0</text>
          <text class="gauge__unit" x="${CX}" y="530" text-anchor="middle">KM/H</text>
        </svg>
        <div class="gauge__label" hidden></div>
      </div>
      <p class="pass-hint">${t(ui.passionsHint)}</p>
    </div>`;
  }

  /** Affichage « affiche » : en-tête, étiquette, 3 cadres d'illustration, titre, texte, 3 chiffres. */
  poster(it, i, total, { content, lang }) {
    const page = content.page('passions'), ui = content.data.ui, t = (v) => (v && typeof v === 'object' ? v[lang] : v);
    const frames = [0, 1, 2].map((k) => {
      const src = it.images && it.images[k];
      return `<figure class="poster__frame">${src ? `<img src="${src}" alt="">` : `<span>${t(ui.illustration)} 0${k + 1}</span>`}</figure>`;
    }).join('');
    const stats = it.stats.map((s) => `<li><b>${t(s.value)}</b> ${t(s.unit)}</li>`).join('');
    return `<article class="poster" aria-label="${t(it.title)}">
      <button class="poster__close" type="button" aria-label="${t(ui.close)}">✕</button>
      <header class="poster__top">
        <div class="poster__brand"><b>NOLHAN</b><i></i><small>${t(page.title)}</small></div>
        <div class="poster__speed" aria-hidden="true"><b>${it.speed}</b><small>KM/H</small></div>
      </header>
      <div class="poster__tag">${t(it.tag)}</div>
      <div class="poster__frames">${frames}</div>
      <h2 class="poster__title">${t(it.title)}</h2>
      <p class="poster__kicker">${t(ui.passionWord)} 0${i + 1} / 0${total}</p>
      <p class="poster__text">${t(it.text)}</p>
      <hr class="poster__rule">
      <ul class="poster__stats">${stats}</ul>
    </article>`;
  }
}
