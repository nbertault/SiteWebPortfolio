/**
 * Modèle : contenu du site, chargé depuis les fichiers JSON de data/ (plus de content.json monolithique).
 *
 * Chaque page ne charge que ce dont elle a besoin : les vues déclarent leurs sources dans `static data = [...]`
 * (clés de SOURCES ci‑dessous), et les contrôleurs en font l'union avec celles du header et du footer.
 * Les `{ "$include": "chemin.json" }` (chemin relatif à data/) sont résolus au chargement.
 *
 * Les fichiers ne contiennent que le français : { "fr": "…" }. L'anglais vient de la mémoire data/i18n/en.json
 * (clé = texte français), puis du cache navigateur, puis — à la demande — de la traduction automatique.
 * Tant qu'une traduction manque, le texte français s'affiche à la place.
 */
import { TranslationModel } from './TranslationModel.js';

/** clé de donnée → fichier. La clé « pages.xxx » se range dans data.pages.xxx. */
export const SOURCES = {
  site: 'site.json',
  nav: 'nav.json',
  contact: 'contact.json',
  ui: 'ui.json',
  home: 'home.json',
  cv: 'cv.json',
  'pages.passions': 'pages/passions.json',
  'pages.projets': 'pages/projets.json',
  'pages.parcours': 'pages/parcours.json',
  'pages.apports': 'pages/apports.json',
};

const MEMORY = 'i18n/en.json';
const CONFIG = 'i18n/config.json';

export class ContentModel {
  constructor(data, { base = 'data/', memory = {}, translator = null } = {}) {
    this.data = data;
    this.base = base;
    this.memory = memory;
    this.translator = translator;
    this.pending = new Map();    // texte fr → objets { fr } qui attendent leur version anglaise
    this.failed = new Set();     // textes dont la traduction automatique a échoué (pas de nouvel essai en boucle)
    this.#localize();
  }

  /**
   * @param {string[]} keys  clés de SOURCES à charger (dédoublonnées)
   * @param {{base?: string}} opts  dossier des données (« data/ » par défaut, « ../data/ » depuis tools/)
   */
  static async load(keys, { base = 'data/' } = {}) {
    const getJSON = ContentModel.#fetcher(base);
    const unique = [...new Set(keys)];
    const unknown = unique.filter((k) => !SOURCES[k]);
    if (unknown.length) throw new Error(`Source de données inconnue : ${unknown.join(', ')}`);

    const [loaded, memory, config] = await Promise.all([
      Promise.all(unique.map(async (k) => [k, await ContentModel.#resolve(await getJSON(SOURCES[k]), getJSON)])),
      getJSON(MEMORY).catch(() => ({})),     // mémoire / config facultatives : le site marche sans
      getJSON(CONFIG).catch(() => ({})),
    ]);

    const data = {};
    for (const [key, value] of loaded) {
      const [a, b] = key.split('.');
      if (b) (data[a] ??= {})[b] = value; else data[a] = value;
    }
    return new ContentModel(data, { base, memory, translator: new TranslationModel(config) });
  }

  /** Tous les fichiers (outil de traduction). */
  static loadAll(opts) { return ContentModel.load(Object.keys(SOURCES), opts); }

  static #fetcher(base) {
    const cache = new Map();   // un même fichier n'est demandé qu'une fois
    return (file) => {
      if (!cache.has(file)) {
        cache.set(file, fetch(base + file).then((res) => {
          if (!res.ok) throw new Error(`Fichier introuvable : ${base + file} (${res.status})`);
          return res.json();
        }));
      }
      return cache.get(file);
    };
  }

  /** Remplace récursivement chaque { "$include": "x.json" } par le contenu du fichier. */
  static async #resolve(node, getJSON, depth = 0) {
    if (depth > 10) throw new Error('$include trop profond (boucle ?)');
    if (Array.isArray(node)) return Promise.all(node.map((n) => ContentModel.#resolve(n, getJSON, depth)));
    if (node && typeof node === 'object') {
      if (typeof node.$include === 'string') return ContentModel.#resolve(await getJSON(node.$include), getJSON, depth + 1);
      const out = {};
      await Promise.all(Object.entries(node).map(async ([k, v]) => { out[k] = await ContentModel.#resolve(v, getJSON, depth); }));
      return out;
    }
    return node;
  }

  page(key) { return this.data.pages[key]; }
  /** Position de la page dans la navigation (pour la numérotation). */
  index(key) { return this.data.nav.findIndex((n) => n.key === key); }

  /* ---------- traduction ---------- */

  /** Visite chaque objet { fr: "…" } des données. */
  #each(fn, node = this.data) {
    if (Array.isArray(node)) node.forEach((n) => this.#each(fn, n));
    else if (node && typeof node === 'object') {
      if (typeof node.fr === 'string') fn(node);
      Object.values(node).forEach((v) => this.#each(fn, v));
    }
  }

  /** Complète `en` depuis la mémoire / le cache ; sinon `en` = français en attendant, et le texte est mis en attente. */
  #localize() {
    this.#each((o) => {
      if (typeof o.en === 'string' && !this.pending.has(o.fr)) return;
      const hit = this.memory[o.fr] ?? this.translator?.cached(o.fr);
      if (hit) { o.en = hit; return; }
      o.en = o.fr;
      (this.pending.get(o.fr) ?? this.pending.set(o.fr, []).get(o.fr)).push(o);
    });
  }

  /** Tous les textes français des données chargées. */
  texts() { const s = new Set(); this.#each((o) => s.add(o.fr)); return [...s]; }
  /** Textes français sans traduction dans data/i18n/en.json. */
  missingFromMemory() { return this.texts().filter((t) => !this.memory[t]); }

  /**
   * Traduit via le service configuré les textes encore en attente.
   * Retourne le nombre de textes traduits (le contrôleur ré‑affiche la page s'il est > 0).
   */
  async translatePending() {
    const todo = [...this.pending.keys()].filter((t) => !this.failed.has(t));
    if (!todo.length || !this.translator?.enabled) return 0;
    const res = await this.translator.translate(todo, 'en', 'fr');
    todo.forEach((t) => {
      const en = res.get(t);
      if (!en) { this.failed.add(t); return; }
      this.pending.get(t).forEach((o) => { o.en = en; });
      this.pending.delete(t);
    });
    return res.size;
  }
}
