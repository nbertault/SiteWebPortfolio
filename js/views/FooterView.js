import { View } from './View.js';

/** Footer commun : réseaux pro et contact. */
export class FooterView extends View {
  template({ content, lang }) {
    const { contact, ui } = content.data;
    return `<div><a href="${contact.linkedin}">LinkedIn</a><a href="${contact.github}">GitHub</a><a href="mailto:${contact.email}">Email</a></div>
      <span>${ui.footer[lang]}</span>`;
  }
}
