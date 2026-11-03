/** Modèle : contenu du site (data/content.json). Textes bilingues { fr, en }. */
export class ContentModel {
  constructor(data) { this.data = data; }

  static async load(url = 'data/content.json') {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Contenu introuvable (${res.status})`);
    return new ContentModel(await res.json());
  }

  page(key) { return this.data.pages[key]; }
  /** Position de la page dans la navigation (pour la numérotation). */
  index(key) { return this.data.nav.findIndex((n) => n.key === key); }
}
