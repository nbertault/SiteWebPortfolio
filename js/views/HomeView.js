import { View } from './View.js';
import { CAR_LINES, carZones } from './svg/car.js';

/** Page d'accueil : voiture interactive + formulaire de contact. */
export class HomeView extends View {
  template({ content, lang }) {
    const { site, home, ui } = content.data;
    const profile = home.profile;
    const formation = profile.formation.map((item) => `
          <article class="race-row">
            <span class="race-row__index">${item.date}</span>
            <div><h4>${item.title[lang]}</h4><p>${item.place}</p></div>
          </article>`).join('');
    const experience = profile.experience.map((item) => `
          <article class="race-row race-row--experience">
            <span class="race-row__tag">${item.date[lang]}</span>
            <div><h4>${item.title[lang]}</h4><p>${item.place}</p></div>
          </article>`).join('');
    const skills = profile.skills.map((item, i) => `
          <li><span>0${i + 1}</span>${item[lang]}</li>`).join('');
    return `      <section class="hero hero--home">
        <img src="assets/LogoAccueil.png" alt="${site.name.toUpperCase()}" class="hero__logo" style="width: 250px; height: auto;">
        <h1 style="color: #c20396;>${home.title[lang]}</h1>
        <p>${home.subtitle[lang]}</p><span class="hint">${ui.hover[lang]}</span>
        <div class="car"><img class="car__photo" src="assets/CivicEF9.png" alt="Honda Civic EF9"><svg class="car__lines" viewBox="0 0 591 225" role="img" aria-label="Honda Civic EF9">${CAR_LINES}${carZones(home.zones, lang)}</svg></div>
      </section>
      <section class="race-profile" aria-labelledby="race-profile-title">
        <div class="race-profile__topline">
          <span>${profile.eyebrow[lang]}</span>
          <span class="race-profile__serial">NB — 01 / 26</span>
        </div>
        <div class="race-profile__heading">
          <div>
            <p class="race-profile__kicker">${profile.number[lang]}</p>
            <h2 id="race-profile-title">${profile.title[lang]}</h2>
          </div>
          <div class="race-profile__number" aria-hidden="true">01</div>
        </div>
        <div class="race-profile__grid">
          <section class="race-panel race-panel--identity">
            <div class="race-panel__label"><span>01 / ID</span><span>${profile.location[lang]}</span></div>
            <p class="race-profile__intro">${profile.intro[lang]}</p>
            <div class="race-panel__visual">
              <img src="assets/CarteLeMans.png" alt="Carte de la ville du Mans" class="race-panel__map">
              <span class="race-panel__watermark">TRACK<br>ENGINEERING</span>
            </div>
            <p class="race-panel__caption">${lang === 'fr' ? 'PASSION MÉCANIQUE · PRÉCISION NUMÉRIQUE' : 'MOTORSPORT PASSION · DIGITAL PRECISION'}</p>
          </section>
          <section class="race-panel">
            <div class="race-panel__label"><span>02 / ${profile.formationTitle[lang]}</span><span>01—02</span></div>
            <div class="race-panel__rows">${formation}</div>
            <div class="race-panel__label race-panel__label--sub"><span>03 / ${profile.experienceTitle[lang]}</span><span>ON TRACK</span></div>
            <div class="race-panel__rows">${experience}</div>
          </section>
          <section class="race-panel race-panel--skills">
            <div class="race-panel__label"><span>04 / ${profile.skillsTitle[lang]}</span><span>CORE</span></div>
            <ul class="race-skills">${skills}</ul>
            <div class="race-tools">
              <span>${profile.toolsTitle[lang]}</span>
              <strong>${profile.tools[lang]}</strong>
            </div>
            <a class="race-profile__link" href="parcours.html">${profile.cta[lang]} <span>↗</span></a>
          </section>
        </div>
        <div class="race-profile__bottom"><span>BUILT FOR THE GRID</span><span>EMBEDDED SYSTEMS · MOTORSPORT · LE MANS / FRANCE</span><span>END OF BRIEF — 01</span></div>
      </section>
      <section class="contact">
        <h2>${ui.contactTitle[lang]}</h2><p>${ui.contactSub[lang]}</p>
        <form id="contact-form">
          <input name="name" required placeholder="${ui.name[lang]}">
          <input name="email" type="email" required placeholder="Email">
          <textarea name="message" rows="5" required placeholder="Message"></textarea>
          <button class="btn">${ui.send[lang]}</button>
        </form>
      </section>`;
  }
}
