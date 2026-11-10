import { SubPageController } from './SubPageController.js';
import { ApportsView } from '../views/ApportsView.js';

/** Apports : survol (ou focus / tap) d'un secteur → affiche l'apport ; un clic « épingle » l'apport. */
export class ApportsController extends SubPageController {
  constructor() {
    super('apports', ApportsView);
    this.hov = null; this.pin = null;
    const sectorOf = (e) => { const el = e.target.closest && e.target.closest('[data-s]'); return el ? +el.dataset.s : null; };
    this.root.addEventListener('mouseover', (e) => { const i = sectorOf(e); if (i !== this.hov) { this.hov = i; this.sync(); } });
    this.root.addEventListener('mouseleave', () => { this.hov = null; this.sync(); });
    this.root.addEventListener('focusin', (e) => { const i = sectorOf(e); if (i !== null) { this.hov = i; this.sync(); } });
    this.root.addEventListener('focusout', () => { this.hov = null; this.sync(); });
    this.root.addEventListener('click', (e) => { const i = sectorOf(e); if (i !== null) { this.pin = this.pin === i ? null : i; this.sync(); } });
    this.root.addEventListener('keydown', (e) => {
      const i = sectorOf(e);
      if ((e.key === 'Enter' || e.key === ' ') && i !== null) { e.preventDefault(); this.pin = this.pin === i ? null : i; this.sync(); }
    });
  }

  afterRender() { super.afterRender(); this.sync(); }

  sync() {
    const board = this.root.querySelector('.ap-board');
    if (!board) return;
    const active = this.hov !== null ? this.hov : this.pin;
    board.dataset.active = active === null ? '' : active;
    board.querySelectorAll('[data-s]').forEach((el) => el.classList.toggle('on', +el.dataset.s === active));
    board.classList.toggle('has-active', active !== null);
  }
}
