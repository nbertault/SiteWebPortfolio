import { View } from './View.js';

/** Header commun : logo, navigation (1 mot par page), thème, langue. */
export class HeaderView extends View {
  template({ content, lang, theme, key }) {
    const { nav, site } = content.data;
    const links = nav.map((n) => `<a href="${n.href}" class="${n.key === key ? 'on' : ''}">${n.label[lang]}</a>`).join('');
    return `<a class="logo" href="index.html"> <img src="assets/ProN&B.png" alt="${site.name.toUpperCase()}<b>.</b>" style="width: 150px; height: auto;"/> </a>
      <nav class="nav">${links}</nav>
      <div class="tools">
        <button class="btn-ghost" data-action="theme" aria-label="Theme">${theme === 'dark' ? '☀' : '☾'}</button>
        <button class="btn-ghost" data-action="lang" aria-label="Language">${lang === 'fr' ? 'EN' : 'FR'}</button>
      </div>`;
  }
}
