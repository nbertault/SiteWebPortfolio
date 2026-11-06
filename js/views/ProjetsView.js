import { SubPageView } from './SubPageView.js';
import { computeTimings, fmtWeeks } from '../models/TimingModel.js';

const ICONS = {
  wheel: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="24" cy="24" r="18"/><circle cx="24" cy="24" r="5"/><path d="M6.5 22.5C13 24 17 23.5 19.5 23M41.5 22.5C35 24 31 23.5 28.5 23M24 29V41"/></svg>',
  robot: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="16" width="28" height="22" rx="6"/><path d="M24 16V8M20 8h8"/><circle cx="18" cy="27" r="3"/><circle cx="30" cy="27" r="3"/><path d="M18 34h12"/></svg>',
  drone: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><rect x="19" y="19" width="10" height="10" rx="3"/><path d="M19 19L10 10M29 19L38 10M19 29L10 38M29 29L38 38"/><circle cx="9" cy="9" r="5"/><circle cx="39" cy="9" r="5"/><circle cx="9" cy="39" r="5"/><circle cx="39" cy="39" r="5"/></svg>',
  plus: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="1 6"><circle cx="24" cy="24" r="18"/><path d="M24 15v18M15 24h18" stroke-dasharray="none"/></svg>',
};

/** Projets : tableau de chronométrage (style GT World Challenge) — 1 ligne = 1 projet. */
export class ProjetsView extends SubPageView {
  constructor(root, bg) { super(root, bg, 'projets', ''); }

  template({ content, lang }) {
    const p = content.page('projets'), ui = content.data.ui, T = ui.timing, t = (v) => v[lang];
    const timings = computeTimings(p.projects);
    const unit = t(T.unit);

    const rows = p.projects.map((pr, i) => {
      const tm = timings[i];
      const secs = tm.sectors.map((s, k) => `<div class="tt-s tt-s--${s.color}" data-label="${t(T.sectors[k])}">${fmtWeeks(s.weeks, unit)}</div>`).join('');
      const bar = tm.total ? `<div class="tt-bar-mini">${tm.sectors.map((s) => s.weeks ? `<i class="c-${s.color}" style="flex:${s.weeks}"></i>` : '').join('')}</div>` : '';
      const thumb = pr.image ? `<img src="${pr.image}" alt="">` : (ICONS[pr.icon] || '');
      return `<article class="tt-row reveal" style="--d:${i * 110}ms;--k:${i}">
        <div class="tt-pos">${i + 1}</div>
        <div class="tt-thumb">${thumb}</div>
        <div class="tt-main">
          <a class="tt-name" href="${pr.page}"><span>${t(pr.title)}</span><i aria-hidden="true">›</i></a>
          <div class="tt-meta">${t(pr.meta)}</div>
          <p class="tt-desc">${t(pr.text)}</p>
          <div class="tt-tags">${pr.tags.map((g) => `<span>${typeof g === 'object' ? g[lang] : g}</span>`).join('')}</div>
        </div>
        ${secs}
        <div class="tt-total"><b>${fmtWeeks(tm.total, unit)}</b>${bar}</div>
        <div class="tt-state tt-state--${pr.state}"><i></i>${t(T.states[pr.state])}</div>
      </article>`;
    }).join('');

    const head = `<span>${ui.pos[lang]}</span><span></span><span>${ui.project[lang]}</span>${T.sectors.map((s, k) => `<span class="tt-hs">S${k + 1}<small>${t(s)}</small></span>`).join('')}<span>${t(T.total)}</span><span>${t(T.status)}</span>`;

    return `<section class="pj-head"><h1 class="accent">${t(p.title)}</h1><p>${t(p.intro)}</p></section>
      <section class="timing">
        <div class="tt-top"><span class="tt-live"><i></i>${t(T.live)}</span>
          <span class="tt-legend"><b class="c-purple"></b>${t(T.legend.best)}<b class="c-green"></b>${t(T.legend.good)}<b class="c-yellow"></b>${t(T.legend.slow)}</span></div>
        <div class="tt-head">${head}</div>
        ${rows}
      </section>`;
  }
}
