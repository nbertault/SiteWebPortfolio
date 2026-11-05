import { View } from './View.js';
import { CAR_LINES, carZones } from './svg/car.js';

/** Page d'accueil : voiture interactive + formulaire de contact. */
export class HomeView extends View {
  template({ content, lang }) {
    const { site, home, ui } = content.data;
    return `      <section class="hero hero--home">
        <img src="assets/ProN&B.png" alt="${site.name.toUpperCase()}" class="hero__logo" style="width: 150px; height: auto;">
        <h1>${home.title[lang]}</h1>
        <p>${home.subtitle[lang]}</p><span class="hint">${ui.hover[lang]}</span>
        <div class="car"><img class="car__photo" src="assets/CivicEF9.png" alt="Honda Civic EF9"><svg class="car__lines" viewBox="0 0 591 225" role="img" aria-label="Honda Civic EF9">${CAR_LINES}${carZones(home.zones, lang)}</svg></div>
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
