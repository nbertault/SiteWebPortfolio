import { SubPageView } from './SubPageView.js';

/** Projets : tableau de chronométrage (style GT World Challenge) — 1 ligne = 1 projet. */
export class ProjetsView extends SubPageView {
  constructor(root, bg) { super(root, bg, 'projets', ''); }

  template({ content, lang }) {
    const p = content.page('projets'), ui = content.data.ui, t = (v) => v[lang];
    const rows = p.projects.map((pr, i) => `
      <article class="tt-row reveal" style="--d:${i * 120}ms">
        <div class="tt-pos">${i + 1}</div>
        <a class="tt-name" href="${pr.page}"><span>${t(pr.title)}</span><i aria-hidden="true">›</i></a>
        <div class="tt-sector"><small>${ui.delay[lang]}</small><b>${t(pr.delay)}</b></div>
        <p class="tt-desc">${t(pr.text)}</p>
      </article>`).join('');
    return `<section class="pj-head"><h1 class="accent">${t(p.title)}</h1><p>${t(p.intro)}</p></section>
      <section class="timing">
        <div class="tt-bar"><span>${ui.pos[lang]}</span><span>${ui.project[lang]}</span><span>${ui.delay[lang]}</span><span>${ui.description[lang]}</span></div>
        ${rows}
      </section>`;
  }
}
