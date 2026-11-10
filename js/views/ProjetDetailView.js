import { SubPageView } from './SubPageView.js';
import { computeTimings, fmtWeeks } from '../models/TimingModel.js';
import { illus } from './svg/illus.js';

const DOC_ICON = '<svg viewBox="0 0 64 80" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" aria-hidden="true"><path d="M8 4h34l16 16v56H8Z" fill="currentColor" fill-opacity=".1"/><path d="M42 4v16h16"/><path d="M18 40h32M18 50h32M18 60h20"/></svg>';

/**
 * Page dédiée à un projet (le projet affiché vient de <body data-project="slug">) :
 * en-tête façon chronométrage, chiffres clés, blocs « court paragraphe + image » le long d'une frise,
 * rapport joint (facultatif : affiché seulement si `report` existe) et navigation vers les autres projets.
 */
export class ProjetDetailView extends SubPageView {
  constructor(root, bg) { super(root, bg, 'projets', ''); }

  template({ content, lang }) {
    const p = content.page('projets'), ui = content.data.ui, T = ui.timing, t = (v) => (v && typeof v === 'object' ? v[lang] : v);
    const n = p.projects.length;
    const i = Math.max(0, p.projects.findIndex((x) => x.slug === document.body.dataset.project));
    const pr = p.projects[i], tm = computeTimings(p.projects)[i], unit = t(T.unit);

    const secs = tm.sectors.map((s, k) => `<div class="tt-s tt-s--${s.color}" data-label="S${k + 1} · ${t(T.sectors[k])}">${fmtWeeks(s.weeks, unit)}</div>`).join('');

    const facts = (pr.facts || []).map((f) => `<li><b>${t(f.value)}</b><span>${t(f.unit)}</span></li>`).join('');

    const blocks = (pr.blocks || []).map((b, k) => {
      const media = b.image ? `<img src="${b.image}" alt="${t(b.caption) || ''}" loading="lazy">` : illus(b.visual);
      const sector = b.sector != null ? `<span class="pj-chip">S${b.sector + 1} · ${t(T.sectors[b.sector])}</span>` : '';
      return `<article class="pj-block ${k % 2 ? 'pj-block--flip' : ''} reveal" style="--d:${k * 60}ms">
        <div class="pj-block__txt">${sector}<span class="pj-kicker">${t(b.kicker)}</span><h2>${t(b.title)}</h2><p>${t(b.text)}</p></div>
        <i class="pj-dot">${String(k + 1).padStart(2, '0')}</i>
        <figure class="pj-fig"><div class="pj-fig__frame ${b.image ? '' : 'is-ph'}">${media}</div>
          <figcaption>${t(ui.fig)} ${String(k + 1).padStart(2, '0')}${b.caption ? ' — ' + t(b.caption) : ''}${b.image ? '' : ` · ${t(ui.imageToAdd)}`}</figcaption></figure>
      </article>`;
    }).join('');

    const r = pr.report && pr.report.file ? `
      <section class="pj-report reveal">
        <div class="pj-report__icon">${DOC_ICON}</div>
        <div><span class="pj-report__tag">${t(ui.reportTag)}</span><h3>${t(pr.report.title) || t(ui.report)}</h3>
          <p>${t(pr.report.text) || ''}${pr.report.meta ? ` <b>${pr.report.meta}</b>` : ''}</p></div>
        <div class="pj-report__actions">
          <a class="btn" href="${pr.report.file}" target="_blank" rel="noopener">${t(ui.reportView)}</a>
          <a class="btn btn--ghost" href="${pr.report.file}" download>${t(ui.reportDownload)}</a>
        </div>
      </section>` : '';

    const prev = p.projects[(i - 1 + n) % n], next = p.projects[(i + 1) % n];
    const nav = n > 1 ? `<nav class="pj-nav"><a class="prev" href="${prev.page}"><small>← ${t(ui.prevProject)}</small><b>${t(prev.title)}</b></a>
      <a class="next" href="${next.page}"><small>${t(ui.nextProject)} →</small><b>${t(next.title)}</b></a></nav>` : '';

    return `<div class="pj">
      <a class="pj-back" href="projets.html">${t(ui.back)}</a>
      <header class="pj-hero reveal">
        <span class="pj-hero__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <div class="pj-hero__top"><span class="pj-pos">P${i + 1}</span><span class="pj-meta">${t(pr.meta)}</span></div>
        <h1>${t(pr.title)}</h1>
        <p class="pj-lead">${t(pr.lead) || t(pr.text)}</p>
        <div class="tt-state tt-state--${pr.state}"><i></i>${t(T.states[pr.state])}</div>
        <div class="pj-secs">${secs}<div class="tt-total"><b>${fmtWeeks(tm.total, unit)}</b><small>${t(T.total)}</small></div></div>
        <div class="tt-tags">${pr.tags.map((g) => `<span>${t(g)}</span>`).join('')}</div>
      </header>
      ${facts ? `<ul class="pj-facts reveal" aria-label="${t(ui.keyFigures)}">${facts}</ul>` : ''}
      <section class="pj-flow">${blocks || `<p class="pj-todo">${t(ui.todo)}</p>`}</section>
      ${r}${nav}
    </div>`;
  }
}
