import { SubPageView } from './SubPageView.js';
import { CAR_DEFS } from './svg/car.js';
import { AERO } from './svg/aero.js';

/**
 * Apports : fond voiture aéro, sections, puis un RÉSUMÉ du CV avec deux boutons :
 * « Afficher » (page cv.html, version web) et « Télécharger » (PDF).
 */
export class ApportsView extends SubPageView {
  constructor(root, bg) { super(root, bg, 'apports', AERO); }
  background() { return CAR_DEFS + AERO; }

  extra({ content, lang }) {
    const { ui, cv } = content.data, t = (v) => v[lang];
    const facts = cv.facts.map((f) => `<li><b>${f.value}</b><span>${t(f.label)}</span></li>`).join('');
    const chips = cv.chips.map((c) => `<span class="chip">${c}</span>`).join('');
    return `<section class="cvs reveal">
      <div class="cvs__card">
        <span class="eyebrow">${ui.cvSummary[lang]}</span>
        <h2>${cv.name}</h2>
        <p class="cvs__role">${t(cv.role)}</p>
        <p class="cvs__text">${t(cv.short)}</p>
        <ul class="cvs__facts">${facts}</ul>
        <div class="chips">${chips}</div>
        <div class="cvs__actions">
          <a class="btn" href="cv.html">${ui.cvView[lang]}</a>
          <a class="btn btn--ghost" href="${cv.pdf}" download="${cv.pdfName}">${ui.cvDownload[lang]}</a>
        </div>
      </div>
    </section>`;
  }
}
