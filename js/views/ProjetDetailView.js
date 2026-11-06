import { SubPageView } from './SubPageView.js';
import { computeTimings, fmtWeeks } from '../models/TimingModel.js';

/** Page dédiée à un projet : le projet affiché est donné par <body data-project="slug">. */
export class ProjetDetailView extends SubPageView {
  constructor(root, bg) { super(root, bg, 'projets', ''); }

  template({ content, lang }) {
    const p = content.page('projets'), ui = content.data.ui, T = ui.timing, t = (v) => v[lang];
    const i = Math.max(0, p.projects.findIndex((x) => x.slug === document.body.dataset.project));
    const pr = p.projects[i], tm = computeTimings(p.projects)[i], unit = t(T.unit);
    const secs = tm.sectors.map((s, k) => `<div class="tt-s tt-s--${s.color}" data-label="S${k + 1} · ${t(T.sectors[k])}">${fmtWeeks(s.weeks, unit)}</div>`).join('');
    return `<section class="pj-detail">
      <a class="pj-back" href="projets.html">${ui.back[lang]}</a>
      <span class="eyebrow">P${i + 1} · ${t(pr.meta)}</span><h1 class="accent">${t(pr.title)}</h1>
      <div class="tt-state tt-state--${pr.state}"><i></i>${t(T.states[pr.state])}</div>
      <div class="pj-secs">${secs}<div class="tt-total"><b>${fmtWeeks(tm.total, unit)}</b><small>${t(T.total)}</small></div></div>
      <p class="pj-lead">${t(pr.text)}</p>
      <div class="tt-tags">${pr.tags.map((g) => `<span>${typeof g === 'object' ? g[lang] : g}</span>`).join('')}</div>
      <p class="pj-todo">${ui.todo[lang]}</p></section>`;
  }
}
