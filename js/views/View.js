/** Vue de base : transforme un état en HTML dans un élément racine. */
export class View {
  constructor(root) { this.root = root; }
  template() { return ''; }
  render(state) { this.root.innerHTML = this.template(state); }
}
