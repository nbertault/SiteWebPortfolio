import { View } from './View.js';

const SUN = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const MOON = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

/** Header commun : logo, navigation (1 mot par page), sélecteur de langue et interrupteur de thème. */
export class HeaderView extends View {
  template({ content, lang, theme, key }) {
    const { nav, site } = content.data;
    const links = nav.map((n) => `<a href="${n.href}" class="${n.key === key ? 'on' : ''}">${n.label[lang]}</a>`).join('');
    return `<a class="logo" href="index.html"><img src="assets/Logos/LogoHeader.png" alt="${site.name.toUpperCase()}" style="width: 75px; height: auto;"></a>
      <nav class="nav">${links}</nav>
      <div class="tools">
        <button class="seg" data-action="lang" data-lang="${lang}" aria-label="Language">
          <i class="seg__thumb"></i><span>FR</span><span>EN</span>
        </button>
        <button class="switch ${theme}" data-action="theme" aria-label="Theme" aria-pressed="${theme === 'dark'}">
          <i class="switch__thumb">${theme === 'dark' ? MOON : SUN}</i>
        </button>
      </div>`;
  }
}
