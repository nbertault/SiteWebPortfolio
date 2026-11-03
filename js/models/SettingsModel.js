/** Modèle : préférences utilisateur (thème, langue), persistées et observables. */
const KEY = 'portfolio.settings';

export class SettingsModel {
  #state;
  #listeners = new Set();

  constructor() {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { /* stockage indisponible */ }
    this.#state = {
      theme: saved.theme ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
      lang: saved.lang ?? (navigator.language?.startsWith('en') ? 'en' : 'fr'),
    };
  }

  get theme() { return this.#state.theme; }
  get lang() { return this.#state.lang; }

  toggleTheme() { this.#update({ theme: this.theme === 'dark' ? 'light' : 'dark' }); }
  toggleLang() { this.#update({ lang: this.lang === 'fr' ? 'en' : 'fr' }); }

  subscribe(fn) { this.#listeners.add(fn); return () => this.#listeners.delete(fn); }

  #update(patch) {
    Object.assign(this.#state, patch);
    try { localStorage.setItem(KEY, JSON.stringify(this.#state)); } catch { /* ignoré */ }
    this.#listeners.forEach((fn) => fn(this.#state));
  }
}
