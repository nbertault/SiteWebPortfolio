import { PageController } from './PageController.js';

/**
 * Pages secondaires (communes) : le schéma de fond sort sur le côté au scroll,
 * puis les sections apparaissent une à une.
 */
export class SubPageController extends PageController {
  constructor(key, ViewClass) {
    super(key);
    this.bg = document.getElementById('bg');
    this.view = new ViewClass(this.root, this.bg);
  }

  renderPage(s) { this.view.render(s); }

  afterRender() {
    this.io?.disconnect();
    this.io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.25 });
    this.root.querySelectorAll('.item').forEach((el) => this.io.observe(el));
    this.onScroll(scrollY);
  }

  onScroll(y) {
    const p = Math.min(1, y / (innerHeight * 0.9));
    this.bg.style.transform = `translateX(${-p * 115}%)`;
    this.bg.style.opacity = 1 - p * 0.6;
  }
}
