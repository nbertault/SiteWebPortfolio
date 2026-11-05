import { SubPageView } from './SubPageView.js';

/**
 * Parcours : titre centré, « Formations » (3 casques combinés, 1/3 chacun) puis
 * « Expériences professionnelles » (voitures alternées gauche / droite).
 * Les images (formation.image, formation.logo, experience.image) sont optionnelles dans data/content.json.
 */
export class ParcoursView extends SubPageView {
  constructor(root, bg) { super(root, bg, 'parcours', ''); }

  template({ content, lang }) {
    const p = content.page('parcours'), t = (v) => v[lang];

    const formations = p.formations.map((f, i) => `
      <article class="formation reveal" style="--i:${i};--d:${i * 140}ms" tabindex="0">
        <div class="slice ${f.image ? 'slice--photo' : ''}" ${f.image ? `style="--img:url(${f.image})"` : ''}></div>
        <h3 class="formation__title">${t(f.title)}</h3>
        <div class="formation__details">
          <p>${t(f.text)}</p>
          <div class="formation__meta">
            ${f.logo ? `<img class="school-logo" src="${f.logo}" alt="${f.school}">` : `<span class="school-logo school-logo--ph">${f.school}</span>`}
            <span class="badge">${t(f.status)}</span>
          </div>
        </div>
      </article>`).join('');

    const experiences = p.experiences.map((e, i) => `
      <article class="exp exp--${i % 2 ? 'right' : 'left'} reveal" tabindex="0">
        <div class="exp__car"><img src="${e.image || 'assets/civic-ef9.png'}" alt=""></div>
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
