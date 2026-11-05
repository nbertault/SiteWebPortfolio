import { SubPageView } from './SubPageView.js';

/** Page CV : le CV en interface web (profil, compétences, expériences et formations en frise). */
export class CvView extends SubPageView {
  constructor(root, bg) { super(root, bg, 'apports', ''); }

  template({ content, lang }) {
    const d = content.data, cv = d.cv, L = cv.labels, c = d.contact;
    const t = (v) => (v && typeof v === 'object' ? v[lang] : v);   // texte bilingue ou simple chaîne

    const skills = cv.skills.map((g) => `
      <div class="cvp-skill"><h4>${t(g.label)}</h4>
        <div class="chips">${g.items.map((i) => `<span class="chip">${t(i)}</span>`).join('')}</div></div>`).join('');

    const exps = cv.experiences.map((e, i) => `
      <article class="tl reveal" style="--d:${i * 90}ms">
        <div class="tl__when"><b>${t(e.period)}</b><span>${e.org}</span><small>${e.place}</small></div>
        <i class="tl__dot"></i>
        <div class="tl__card"><h3>${t(e.role)}</h3><ul>${e.points.map((p) => `<li>${t(p)}</li>`).join('')}</ul></div>
      </article>`).join('');

    const edu = cv.education.map((e, i) => `
      <article class="tl reveal" style="--d:${i * 90}ms">
        <div class="tl__when"><b>${t(e.period)}</b><small>${e.place}</small></div>
        <i class="tl__dot"></i>
        <div class="tl__card"><h3>${t(e.title)}</h3>${e.badge ? `<span class="badge-cv">${t(e.badge)}</span>` : ''}</div>
      </article>`).join('');

    const contact = [
      `<a href="mailto:${c.email}">${c.email}</a>`,
      `<a href="${c.linkedin}" target="_blank" rel="noopener">LinkedIn</a>`,
      `<a href="${c.github}" target="_blank" rel="noopener">GitHub</a>`,
      cv.phone ? `<span>${cv.phone}</span>` : '', cv.address ? `<span>${cv.address}</span>` : '',   // facultatifs
    ].join('');

    return `<div class="cvp">
      <header class="cvp-hero reveal">
        <a class="cvp-back" href="apports.html">${t(L.back)}</a>
        <h1>${cv.name}</h1>
        <p class="cvp-role">${t(cv.role)}</p>
        <p class="cvp-lead">${t(cv.summary)}</p>
        <div class="cvs__actions">
          <a class="btn" href="${cv.pdf}" download="${cv.pdfName}">${t(L.download)}</a>
          <a class="btn btn--ghost" href="mailto:${c.email}">Email</a>
        </div>
      </header>
      <div class="cvp-grid">
        <aside class="cvp-side">
          <section class="cvp-box reveal"><h2>${t(L.skills)}</h2>${skills}</section>
          <section class="cvp-box reveal"><h2>${t(L.contact)}</h2><div class="cvp-contact">${contact}</div></section>
        </aside>
        <div class="cvp-main">
          <section><h2 class="cvp-title reveal">${t(L.experience)}</h2><div class="tls">${exps}</div></section>
          <section><h2 class="cvp-title reveal">${t(L.education)}</h2><div class="tls">${edu}</div></section>
        </div>
      </div>
    </div>`;
  }
}
