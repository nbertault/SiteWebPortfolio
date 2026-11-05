import { SubPageView } from './SubPageView.js';

/** Page dédiée à un projet : le projet affiché est donné par <body data-project="slug">. */
export class ProjetDetailView extends SubPageView {
  constructor(root, bg) { super(root, bg, 'projets', ''); }

  template({ content, lang }) {
    const p = content.page('projets'), ui = content.data.ui, t = (v) => v[lang];
    const i = Math.max(0, p.projects.findIndex((x) => x.slug === document.body.dataset.project));
    const pr = p.projects[i];
    return `<section class="pj-detail">
      <a class="pj-back" href="projets.html">${ui.back[lang]}</a>
      <span class="eyebrow">P${i + 1}</span><h1 class="accent">${t(pr.title)}</h1>
      <div class="tt-sector tt-sector--inline"><small>${ui.delay[lang]}</small><b>${t(pr.delay)}</b></div>
      <p class="pj-lead">${t(pr.text)}</p><p class="pj-todo">${ui.todo[lang]}</p></section>`;
  }
}
