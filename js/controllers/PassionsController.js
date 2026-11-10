import { PageController } from './PageController.js';
import { PassionsView, angleOf } from '../views/PassionsView.js';

/**
 * Passions : survol d'une zone → l'aiguille monte à sa vitesse et son nom s'affiche ;
 * clic → l'affiche s'ouvre au-dessus et le compteur se baisse ; re-clic / Échap / ✕ → fermeture.
 */
export class PassionsController extends PageController {
  constructor() {
    super('passions');
    this.view = new PassionsView(this.root);
    this.sel = null; this.hov = null; this.shown = null; this.speed = 0; this.first = true;
    this.bindPassions();
  }

  get items() { return this.content.page('passions').sections; }
  renderPage(s) { this.shown = null; this.view.render(s); }

  afterRender() {
    const r = this.root;
    this.q = { pass: r.querySelector('.pass'), poster: r.querySelector('.pass-poster'), slot: r.querySelector('.pass-poster__slot'),
      needle: r.querySelector('.needle'), num: r.querySelector('.gauge__num'), label: r.querySelector('.gauge__label'),
      zones: [...r.querySelectorAll('.zone')] };
    this.speed = 0;
    this.sync(true);
    if (this.first) { this.first = false; this.sweep(); }     // démarrage façon tableau de bord
  }

  bindPassions() {
    const zoneOf = (e) => { const z = e.target.closest && e.target.closest('[data-zone]'); return z ? +z.dataset.zone : null; };
    const toggle = (i) => this.select(i === this.sel ? null : i);
    this.root.addEventListener('mouseover', (e) => { const i = zoneOf(e); if (i !== this.hov) { this.hov = i; this.sync(); } });
    this.root.addEventListener('mouseleave', () => { this.hov = null; this.sync(); });
    this.root.addEventListener('focusin', (e) => { const i = zoneOf(e); if (i !== null) { this.hov = i; this.sync(); } });
    this.root.addEventListener('focusout', (e) => { if (zoneOf(e) !== null) { this.hov = null; this.sync(); } });
    this.root.addEventListener('click', (e) => {
      if (e.target.closest('.poster__close')) return this.select(null);
      const i = zoneOf(e); if (i !== null) toggle(i);
    });
    this.root.addEventListener('keydown', (e) => {
      const i = zoneOf(e);
      if ((e.key === 'Enter' || e.key === ' ') && i !== null) { e.preventDefault(); toggle(i); }
    });
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && this.sel !== null) this.select(null); });
  }

  select(i) {
    this.sel = i; this.sync();
    if (i !== null) setTimeout(() => this.q.poster.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
  }

  /** Applique l'état (survol / sélection) à l'interface. */
  sync(instant = false) {
    const { pass, poster, slot, label, zones } = this.q, items = this.items;
    pass.classList.toggle('open', this.sel !== null);
    poster.inert = this.sel === null;
    zones.forEach((z, k) => { z.classList.toggle('is-sel', k === this.sel); z.classList.toggle('is-hover', k === this.hov); });

    if (this.sel !== null && this.shown !== this.sel) {
      slot.innerHTML = this.view.poster(items[this.sel], this.sel, items.length, this.state);
      this.shown = this.sel;
    }
    const focus = this.hov !== null ? this.hov : this.sel;
    this.moveNeedle(focus !== null ? items[focus].speed : 0, instant);

    if (this.hov !== null) {
      const z = zones[this.hov], it = items[this.hov], l = this.state.lang;
      label.innerHTML = `${it.title[l]}<small>${it.speed} KM/H</small>`;
      Object.assign(label.style, { left: z.dataset.lx + '%', top: z.dataset.ly + '%', borderColor: getComputedStyle(z).getPropertyValue('--zc') });
      label.hidden = false;
    } else label.hidden = true;
  }

  moveNeedle(target, instant) {
    const n = this.q.needle;
    n.style.transition = instant ? 'none' : 'transform .9s cubic-bezier(.25,1.35,.45,1)';
    n.style.transform = `rotate(${angleOf(target)}deg)`;
    if (target !== this.speed) this.countTo(target, instant);
    this.speed = target;
  }

  countTo(to, instant) {
    const el = this.q.num, from = +el.textContent || 0;
    cancelAnimationFrame(this.raf);
    if (instant) { el.textContent = to; return; }
    const t0 = performance.now(), dur = 800;
    const step = (t) => { const k = Math.min(1, (t - t0) / dur); el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3))); if (k < 1) this.raf = requestAnimationFrame(step); };
    this.raf = requestAnimationFrame(step);
  }

  sweep() {
    const n = this.q.needle;
    n.style.transition = 'transform 1.1s cubic-bezier(.5,0,.3,1)'; n.style.transform = `rotate(${angleOf(280)}deg)`; this.countTo(280);
    setTimeout(() => { if (this.hov === null && this.sel === null) { this.speed = 280; this.moveNeedle(0, false); } }, 1250);
  }
}
