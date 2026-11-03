import { View } from './View.js';

/** Gabarit des pages secondaires : fond schéma, intro, sections révélées au scroll. */
export class SubPageView extends View {
  constructor(root, bgRoot, key, art) {
    super(root);
    this.bgRoot = bgRoot; this.key = key; this.art = art;
  }

  /** Surchargeable : définitions SVG partagées nécessaires au fond. */
  background() { return this.art; }
  /** Surchargeable : contenu additionnel après les sections. */
  extra() { return ''; }

  render(state) {
    this.bgRoot.innerHTML = this.background();
    super.render(state);
  }

  template(state) {
    const { content, lang } = state;
    const page = content.page(this.key), ui = content.data.ui;
    const n = content.index(this.key);
    const items = page.sections.map((s, i) => `
      <article class="item">
        <div class="item__img">${ui.image[lang]}</div>
        <div><span class="eyebrow">0${i + 1}</span><h2>${s.title[lang]}</h2><p>${s.text[lang]}</p></div>
      </article>`).join('');
    return `<section class="hero"><div class="hero__text">
        <span class="eyebrow">0${n}</span><h1 class="accent">${page.title[lang]}</h1><p>${page.intro[lang]}</p>
        <span class="hint">${ui.scroll[lang]}</span></div></section>
      <div class="sections">${items}</div>${this.extra(state)}`;
  }
}
