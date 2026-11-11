import { SubPageView } from './SubPageView.js';

/**
 * Casque découpé en 3 morceaux (un par formation).
 * Toutes les valeurs sont en unités du viewBox de assets/helmet.svg (1600 × 1400).
 *  - crop : zone affichée [x0, y0, x1, y1] = le casque + une petite marge
 *  - cuts : abscisses des 2 coupes. Elles suivent les changements de livrée du dessin
 *           (violet/bleu | blanc/violet | bleu nuit) ; modifiables aussi via `helmet` dans content.json.
 * Si le nombre de formations ≠ 3, les coupes sont réparties à largeur égale.
 */
const HELMET = {
  src: 'assets/Images/helmet.svg',
  canvas: [1600, 1400],
  crop: [10, 60, 1590, 1296],
  cuts: [685, 1114]
};

/**
 * Parcours : titre centré, « Formations » (1 casque découpé en 3 morceaux, un par formation) puis
 * « Expériences professionnelles » (voitures alternées gauche / droite).
 * Les images (formation.image, formation.logo, experience.image) sont optionnelles dans data/content.json.
 */
export class ParcoursView extends SubPageView {
  constructor(root, bg) { super(root, bg, 'parcours', ''); }

  template({ content, lang }) {
    const p = content.page('parcours'), t = (v) => v[lang];

    const H = { ...HELMET, ...(p.helmet || {}) };
    const [x0, y0, x1, y1] = H.crop, [cw, ch] = H.canvas, n = p.formations.length;
    const edges = H.cuts.length === n - 1
      ? [x0, ...H.cuts, x1]
      : Array.from({ length: n + 1 }, (_, k) => x0 + (x1 - x0) * k / n);

    const formations = p.formations.map((f, i) => {
      const from = edges[i], span = edges[i + 1] - from;
      // Un <svg> par morceau : son viewBox ne montre que la zone [from → from+span] du casque, à l'échelle exacte.
      // flex-grow = largeur du morceau → les 3 colonnes se raccordent sans déformation.
      return `
      <article class="formation reveal" style="--d:${i * 140}ms;flex-grow:${span}" tabindex="0">
        <svg class="slice" viewBox="${from} ${y0} ${span} ${y1 - y0}" aria-hidden="true" focusable="false">
          <image href="${f.image || H.src}" x="0" y="0" width="${cw}" height="${ch}" preserveAspectRatio="${f.image ? 'xMidYMid slice' : 'none'}"/>
        </svg>
        <h3 class="formation__title">${t(f.title)}</h3>
        <div class="formation__details">
          <p>${t(f.text)}</p>
          <div class="formation__meta">
            ${f.logo ? `<img class="school-logo" src="${f.logo}" alt="${f.school}">` : `<span class="school-logo school-logo--ph">${f.school}</span>`}
            <span class="badge">${t(f.status)}</span>
          </div>
        </div>
      </article>`;
    }).join('');

    const experiences = p.experiences.map((e, i) => `
      <article class="exp exp--${i % 2 ? 'right' : 'left'} reveal" tabindex="0">
        <div class="exp__car ${e.flip === false ? 'exp__car--noflip' : ''}"><img src="${e.image || 'assets/CivicEF9.png'}" alt=""></div>
        <div class="exp__info">
          <h3>${t(e.title)}</h3>
          <p class="exp__company">${e.company}</p>
          <p class="exp__text">${t(e.text)}</p>
        </div>
      </article>`).join('');

    return `<section class="pc-head"><h1 class="accent">${t(p.title)}</h1><h2 class="pc-sub">${t(p.formationsTitle)}</h2></section>
      <section class="helmets">${formations}</section>
      <h2 class="pc-sub pc-sub--exp reveal">${t(p.experiencesTitle)}</h2>
      <section class="exps">${experiences}</section>`;
  }
}
