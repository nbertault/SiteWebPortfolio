import { PageController } from './PageController.js';
import { HomeView } from '../views/HomeView.js';

/** Accueil : infobulle + navigation depuis les zones de la voiture, formulaire de contact. */
export class HomeController extends PageController {
  constructor() {
    super('home');
    this.view = new HomeView(this.root);
    this.tip = Object.assign(document.createElement('div'), { id: 'tip' });
    document.body.append(this.tip);
    this.bindHome();
  }

  renderPage(s) { this.view.render(s); }

  zone(el) { return this.content.data.home.zones[el.dataset.zone]; }

  bindHome() {
    this.root.addEventListener('mouseover', (e) => {
      const el = e.target.closest('.zone');
      if (!el) { this.tip.style.opacity = 0; return; }
      const z = this.zone(el), l = this.settings.lang;
      this.tip.innerHTML = `<b>${z.title[l]}</b>${z.desc[l]}`;
      this.tip.style.opacity = 1;
    });
    addEventListener('mousemove', (e) => {
      this.tip.style.left = Math.min(e.clientX + 16, innerWidth - 260) + 'px';
      this.tip.style.top = e.clientY + 16 + 'px';
    });
    this.root.addEventListener('click', (e) => {
      const el = e.target.closest('.zone');
      if (el) location.href = this.zone(el).href;
    });
    this.root.addEventListener('keydown', (e) => {
      const el = e.target.closest?.('.zone');
      if (el && e.key === 'Enter') location.href = this.zone(el).href;
    });
    this.root.addEventListener('submit', (e) => {
      if (e.target.id !== 'contact-form') return;
      e.preventDefault(); // pas de back-end : on ouvre le client mail
      const f = new FormData(e.target), { email } = this.content.data.contact;
      location.href = `mailto:${email}?subject=${encodeURIComponent('Portfolio — ' + f.get('name'))}&body=${encodeURIComponent(f.get('message') + '\n\n' + f.get('email'))}`;
    });
  }
}
