import { SubPageView } from './SubPageView.js';
import { SECTOR_PATHS, FULL_PATH, BADGES, CORNERS, START, STRAIGHT_LABEL, VIEW } from './svg/lemans.js';

const COLORS = ['#38bdf8', '#a3e635', '#f59e0b', '#f472b6', '#a78bfa'];   // un secteur = une couleur

/**
 * Apports : circuit des 24 Heures du Mans découpé en 5 secteurs ; au survol d'un secteur, l'apport correspondant
 * s'affiche. Sous le circuit : résumé du CV (boutons « Afficher » / « Télécharger »).
 */
export class ApportsView extends SubPageView {
  constructor(root, bg) { super(root, bg, 'apports', ''); }

  template(state) {
    const { content, lang } = state;
    const page = content.page('apports'), ui = content.data.ui, t = (v) => v[lang];
    const items = page.sections;

    const sectors = items.map((it, i) => `
      <g class="sector" data-s="${i}" tabindex="0" role="button" aria-label="${ui.apSector[lang]} ${i + 1} — ${t(it.title)}" style="--sc:${COLORS[i]}">
        <path class="trk-edge" d="${SECTOR_PATHS[i]}"/><path class="trk-road" d="${SECTOR_PATHS[i]}"/>
        <path class="trk-line" d="${SECTOR_PATHS[i]}"/><path class="trk-hit" d="${SECTOR_PATHS[i]}"/>
      </g>`).join('');

    const badges = items.map((_, i) => `
      <g class="badge" data-s="${i}" style="--sc:${COLORS[i]}" transform="translate(${BADGES[i].x.toFixed(1)} ${BADGES[i].y.toFixed(1)})">
        <circle r="15"/><text y="4.5" text-anchor="middle">S${i + 1}</text></g>`).join('');

    const corners = CORNERS.map(([name, p, a]) => `<text class="trk-lbl" x="${p.x.toFixed(1)}" y="${p.y.toFixed(1)}" text-anchor="${a}">${name}</text>`).join('');
    const sl = STRAIGHT_LABEL;

    const cards = items.map((it, i) => `
      <article class="ap-card" data-s="${i}" style="--sc:${COLORS[i]}">
        <header><span class="ap-badge">S${i + 1}</span><small>${t(it.zone)}</small></header>
        <h2>${t(it.title)}</h2><p>${t(it.text)}</p>
        <div class="chips">${it.tags.map((g) => `<span class="chip">${typeof g === 'object' ? g[lang] : g}</span>`).join('')}</div>
      </article>`).join('');

    const list = items.map((it, i) => `
      <li data-s="${i}" tabindex="0" style="--sc:${COLORS[i]}"><b>S${i + 1}</b><span>${t(it.title)}</span></li>`).join('');

    return `<section class="ap">
      <header class="ap-head"><span class="eyebrow">04 · 24 HEURES DU MANS</span><h1 class="accent">${t(page.title)}</h1><p>${t(page.intro)}</p></header>
      <div class="ap-board">
        <div class="ap-map">
          <svg class="ap-svg" viewBox="0 0 ${VIEW.w} ${VIEW.h}" role="group" aria-label="Circuit de la Sarthe">
            <text class="trk-lbl trk-lbl--big" transform="translate(${sl.at.x.toFixed(1)} ${sl.at.y.toFixed(1)}) rotate(${sl.angle.toFixed(1)})" text-anchor="middle">${ui.apStraight[lang]}</text>
            ${sectors}
            <g class="start"><line class="start__a" x1="${START.x - 17}" x2="${START.x + 17}" y1="${START.y}" y2="${START.y}"/><line class="start__b" x1="${START.x - 17}" x2="${START.x + 17}" y1="${START.y}" y2="${START.y}"/>
              <text class="trk-lbl" x="${START.x - 26}" y="${START.y + 4}" text-anchor="end">${ui.apStart[lang]}</text></g>
            ${corners}${badges}
            <circle class="trk-car" r="5"><animateMotion dur="34s" repeatCount="indefinite" rotate="auto" path="${FULL_PATH}"/></circle>
          </svg>
          <p class="ap-note">${t(ui.apNote)}</p>
        </div>
        <aside class="ap-panel">
          <div class="ap-stack"><div class="ap-idle"><b>${t(ui.apHint)}</b><span>5 ${ui.apSector[lang].toLowerCase()}s · 5 apports</span></div>${cards}</div>
          <ol class="ap-list">${list}</ol>
        </aside>
      </div>
    </section>${this.extra(state)}`;
  }

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
