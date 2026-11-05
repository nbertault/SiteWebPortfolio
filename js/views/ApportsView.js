import { SubPageView } from './SubPageView.js';
import { CAR_DEFS } from './svg/car.js';
import { AERO } from './svg/aero.js';

/** Apports : fond voiture aéro + CV affiché et téléchargeable (assets/cv.pdf). */
export class ApportsView extends SubPageView {
  constructor(root, bg) { super(root, bg, 'apports', AERO); }
  background() { return CAR_DEFS + AERO; }
  extra({ content, lang }) {
    const ui = content.data.ui;
    return `<section class="cv"><h2>${ui.cvTitle[lang]}</h2>
      <object class="cv__viewer" data="assets/cvs.pdf" type="application/pdf"><p>${ui.cvFallback[lang]}</p></object>
      <a class="btn" href="assets/cvs.pdf" download="CV_Nolhan.pdf">${ui.cvDownload[lang]}</a></section>`;
  }
}
