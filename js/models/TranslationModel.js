/**
 * Modèle : traduction automatique (FR → EN) avec cache navigateur.
 * Le fournisseur se règle dans data/i18n/config.json :
 *   "google"        Google Translate (point d'accès public, sans clé)        ← par défaut
 *   "google-cloud"  API officielle Google Cloud Translation (clé "apiKey")
 *   "mymemory"      MyMemory (gratuit, sans clé, quota quotidien)
 *   "libretranslate" LibreTranslate (champs "endpoint" et "apiKey")
 *   "none"          aucune traduction automatique (seule la mémoire data/i18n/en.json sert)
 * Une traduction obtenue est gardée dans localStorage : elle n'est demandée qu'une fois par navigateur.
 */
const CACHE_KEY = 'portfolio.i18n.v1';

const withTimeout = async (url, opts = {}, ms = 8000) => {
  const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), ms);
  try {
    const res = await fetch(url, { ...opts, signal: ctl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally { clearTimeout(timer); }
};

/** Un fournisseur = une fonction (texte, from, to, config) → texte traduit */
const PROVIDERS = {
  google: async (q, from, to, c) => {
    const url = `${c.endpoint || 'https://translate.googleapis.com/translate_a/single'}?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(q)}`;
    const j = await withTimeout(url, {}, c.timeoutMs);
    return j[0].map((seg) => seg[0]).join('');
  },
  'google-cloud': async (q, from, to, c) => {
    const j = await withTimeout(`https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(c.apiKey)}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ q, source: from, target: to, format: 'text' }) }, c.timeoutMs);
    return j.data.translations[0].translatedText;
  },
  mymemory: async (q, from, to, c) => {
    const j = await withTimeout(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=${from}|${to}`, {}, c.timeoutMs);
    return j.responseData.translatedText;
  },
  libretranslate: async (q, from, to, c) => {
    const j = await withTimeout(c.endpoint || 'https://libretranslate.com/translate',
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ q, source: from, target: to, format: 'text', api_key: c.apiKey || '' }) }, c.timeoutMs);
    return j.translatedText;
  },
};

export class TranslationModel {
  constructor(cfg = {}) {
    this.cfg = { provider: 'google', concurrency: 4, timeoutMs: 8000, ...cfg };
    try { this.cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}'); } catch { this.cache = {}; }
  }

  get enabled() { return this.cfg.provider !== 'none' && !!PROVIDERS[this.cfg.provider]; }
  cached(text, to = 'en') { return this.cache[`${to}|${text}`]; }

  /**
   * Traduit une liste de textes. Retourne une Map texte → traduction (les échecs en sont absents).
   * `onNetwork` est appelé juste avant le premier appel réseau (pour afficher un indicateur).
   */
  async translate(texts, to = 'en', from = 'fr', { onNetwork, force = false } = {}) {
    const out = new Map(), todo = [];
    for (const t of texts) {
      const hit = force ? null : this.cached(t, to);
      if (hit) out.set(t, hit); else todo.push(t);
    }
    if (!todo.length || !this.enabled) return out;
    onNetwork?.();

    const provider = PROVIDERS[this.cfg.provider];
    const queue = [...todo];
    const worker = async () => {
      while (queue.length) {
        const text = queue.shift();
        for (let attempt = 0; attempt < 2; attempt++) {                      // 1 nouvelle tentative
          try {
            const res = (await provider(text, from, to, this.cfg)).trim();
            if (res) { out.set(text, res); this.cache[`${to}|${text}`] = res; }
            break;
          } catch (err) {
            if (attempt) console.warn('[i18n] échec de traduction :', text.slice(0, 40), err.message);
            else await new Promise((r) => setTimeout(r, 400));
          }
        }
      }
    };
    await Promise.all(Array.from({ length: Math.min(this.cfg.concurrency, todo.length) }, worker));
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(this.cache)); } catch { /* stockage plein ou indisponible */ }
    return out;
  }
}
