import { ContentModel } from '../js/models/ContentModel.js';

const $ = (s) => document.querySelector(s), log = (m) => { $('#log').textContent = m; };
const content = await ContentModel.load('../data/content.json');
const missing = content.missingFromMemory();
log(missing.length ? `${missing.length} texte(s) sans traduction en mémoire.` : 'Tout est déjà traduit en mémoire. ✅');

const allTexts = () => { const s = new Set(); (function walk(n) {
  if (Array.isArray(n)) n.forEach(walk);
  else if (n && typeof n === 'object') { if (typeof n.fr === 'string' && typeof n.en !== 'string') s.add(n.fr); Object.values(n).forEach(walk); } })(content.data); return [...s]; };

async function run(texts, force) {
  log(`Traduction de ${texts.length} texte(s)…`);
  const res = await content.translator.translate(texts, 'en', 'fr', { force });
  const merged = { ...content.memory };
  texts.forEach((t) => { if (res.has(t)) merged[t] = res.get(t); });
  // on ne garde que les textes encore présents dans le site
  const used = new Set(allTexts()); const clean = Object.fromEntries(Object.entries(merged).filter(([k]) => used.has(k)));
  $('#out').value = JSON.stringify(clean, null, 2);
  $('#dl').disabled = false;
  log(`${res.size}/${texts.length} traduit(s)${res.size < texts.length ? ' — certains ont échoué (service indisponible ?)' : ''}. Vérifiez puis téléchargez.`);
}
$('#go').onclick = () => run(missing, false);
$('#all').onclick = () => run(allTexts(), true);
$('#dl').onclick = () => {
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([$('#out').value], { type: 'application/json' })), download: 'en.json' });
  a.click();
};
