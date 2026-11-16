import { SettingsModel } from '../models/SettingsModel.js';
import { ContentModel } from '../models/ContentModel.js';
import { HeaderView } from '../views/HeaderView.js';
import { FooterView } from '../views/FooterView.js';

/**
 * Contrôleur de base (commun à toutes les pages) :
 * charge les modèles, rend header/footer, gère thème, langue et masquage du header au scroll.
 * Les fichiers JSON chargés sont ceux déclarés par le header, le footer et la vue de la page (`static data`).
 */
export class PageController {
  constructor(key) {
    this.key = key;
    this.settings = new SettingsModel();
    this.root = document.getElementById('app');
    this.headerEl = document.getElementById('header');
  }

  async start() {
    const sources = [HeaderView, FooterView, this.view?.constructor].flatMap((V) => V?.data ?? []);
    this.content = await ContentModel.load(sources);
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
    this.translateIfNeeded();
  }

  /** En anglais, traduit à la volée les textes absents de data/i18n/en.json puis ré‑affiche. */
  async translateIfNeeded() {
    if (this.settings.lang !== 'en' || this.translating || !this.content.pending.size) return;
    this.translating = true;
    try {
      if (await this.content.translatePending() && this.settings.lang === 'en') { this.translating = false; this.render(); }
    } finally { this.translating = false; }
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
