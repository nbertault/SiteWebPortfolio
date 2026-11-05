import { SettingsModel } from '../models/SettingsModel.js';
import { ContentModel } from '../models/ContentModel.js';
import { HeaderView } from '../views/HeaderView.js';
import { FooterView } from '../views/FooterView.js';

/**
 * Contrôleur de base (commun à toutes les pages) :
 * charge les modèles, rend header/footer, gère thème, langue et masquage du header au scroll.
 */
export class PageController {
  constructor(key) {
    this.key = key;
    this.settings = new SettingsModel();
    this.root = document.getElementById('app');
    this.headerEl = document.getElementById('header');
  }

  async start() {
    this.content = await ContentModel.load();
    this.header = new HeaderView(this.headerEl);
    this.footer = new FooterView(document.getElementById('footer'));
    this.bindCommon();
    this.trackHeaderHeight();
    this.settings.subscribe(() => this.render());
    this.render();
  }

  /** Mesure le header (logo, polices, redimensionnement) et expose sa hauteur en CSS : var(--header-h). */
  trackHeaderHeight() {
    const sync = () => document.documentElement.style.setProperty('--header-h', this.headerEl.offsetHeight + 'px');
    sync();
    new ResizeObserver(sync).observe(this.headerEl, { box: 'border-box' });
    addEventListener('load', sync);
  }

  get state() {
    return { content: this.content, lang: this.settings.lang, theme: this.settings.theme, key: this.key };
  }

  render() {
    const y = scrollY, s = this.state;
    document.documentElement.dataset.theme = s.theme;
    document.documentElement.lang = s.lang;
    this.header.render(s);
    this.footer.render(s);
    this.renderPage(s);
    this.afterRender(s);
    scrollTo(0, y);
  }

  renderPage() {}   // à surcharger : rend la vue de la page
  afterRender() {}  // à surcharger : branchements propres à la page
  onScroll() {}     // à surcharger : comportement au scroll

  bindCommon() {
    this.headerEl.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      btn.dataset.action === 'theme' ? this.settings.toggleTheme() : this.settings.toggleLang();
    });
    let last = 0;
    addEventListener('scroll', () => {
      const y = scrollY;
      this.headerEl.classList.toggle('hide', y > last && y > 80); // masqué en descendant, visible en remontant
      last = y;
      this.onScroll(y);
    }, { passive: true });
  }
}
