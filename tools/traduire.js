import { ContentModel } from '../js/models/ContentModel.js';

const $ = (s) => document.querySelector(s), log = (m) => { $('#log').textContent = m; };
const content = await ContentModel.loadAll({ base: '../data/' });
const missing = content.missingFromMemory();
log(missing.length ? `${missing.length} texte(s) sans traduction en mémoire.` : 'Tout est déjà traduit en mémoire. ✅');

const allTexts = () => content.texts();
