import { View } from './View.js';
import { CAR_LINES, CAR_CALLOUTS, carZones } from './svg/car.js';

/** Page d'accueil : voiture interactive + formulaire de contact. */
export class HomeView extends View {
  template({ content, lang }) {
    const { site, home, ui } = content.data;
    const profile = home.profile, ct = home.contact, links = content.data.contact;
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
        <img src="assets/Logos/LogoAccueil.png" alt="${site.name.toUpperCase()}" class="hero__logo" style="width: 250px; height: auto;">
        <h1>${home.title[lang]}</h1>
        <p>${home.subtitle[lang]}</p><span class="hint">${ui.hover[lang]}</span>
        <div class="car"><img class="car__photo" src="assets/Voitures/CivicEF9.png" alt="Honda Civic EF9"><svg class="car__lines" viewBox="0 0 591 260" role="img" aria-label="Honda Civic EF9">${CAR_LINES}${CAR_CALLOUTS}${carZones(home.zones, lang)}</svg></div>
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
          <div class="race-profile__number" aria-hidden="true">12</div>
        </div>
        <div class="race-profile__grid">
          <section class="race-panel race-panel--identity">
            <div class="race-panel__label"><span>01 / ID</span><span>${profile.location[lang]}</span></div>
            <p class="race-profile__intro">${profile.intro[lang]}</p>
            <div class="race-panel__visual">
              <img src="assets/CarteLeMans.png" alt="Carte de la Sarthe, Le Mans, France" class="race-panel__map">
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
      <section class="race-profile race-contact" aria-labelledby="race-contact-title">
        <div class="race-profile__topline">
          <span>${ct.eyebrow[lang]}</span>
          <span class="race-profile__serial">NB — 02 / 26</span>
        </div>
        <div class="race-profile__heading">
          <div>
            <p class="race-profile__kicker">${ct.kicker[lang]}</p>
            <h2 id="race-contact-title">${ui.contactTitle[lang]}</h2>
            <p class="race-profile__intro">${ui.contactSub[lang]}</p>
          </div>
        </div>
        <div class="race-profile__grid">
          <section class="race-panel">
            <div class="race-panel__label"><span>01 / ${ct.channels[lang]}</span><span>${profile.location[lang]}</span></div>
            <div class="race-panel__rows">
              <article class="race-row"><span class="race-row__index">01</span><div><h4><a href="mailto:${links.email}">${links.email}</a></h4><p>EMAIL</p></div></article>
              <article class="race-row"><span class="race-row__index">02</span><div><h4><a href="${links.linkedin}" target="_blank" rel="noopener">LinkedIn</a></h4><p>${lang === 'fr' ? 'RÉSEAU PROFESSIONNEL' : 'PROFESSIONAL NETWORK'}</p></div></article>
              <article class="race-row"><span class="race-row__index">03</span><div><h4><a href="${links.github}" target="_blank" rel="noopener">GitHub</a></h4><p>${lang === 'fr' ? 'CODE · PROJETS' : 'CODE · PROJECTS'}</p></div></article>
            </div>
          </section>
          <section class="race-panel race-panel--form">
            <div class="race-panel__label"><span>02 / ${ct.transmission[lang]}</span><span class="race-live"><i></i>${ct.onair[lang]}</span></div>
            <form id="contact-form" class="race-form">
              <label class="race-field"><span>01 / ${ct.fields.name[lang]}</span><input name="name" required autocomplete="name"></label>
              <label class="race-field"><span>02 / ${ct.fields.email[lang]}</span><input name="email" type="email" required autocomplete="email"></label>
              <label class="race-field race-field--wide"><span>03 / ${ct.fields.message[lang]}</span><textarea name="message" rows="5" required></textarea></label>
              <button class="race-profile__link race-send" type="submit">${ct.send[lang]} <span>↗</span></button>
            </form>
          </section>
        </div>
        <div class="race-profile__bottom"><span>${ct.bottom[lang]}</span><span>EMBEDDED SYSTEMS · MOTORSPORT</span><span>${ct.end[lang]}</span></div>
      </section>`;
  }
}
