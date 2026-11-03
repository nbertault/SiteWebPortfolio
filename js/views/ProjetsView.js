import { SubPageView } from './SubPageView.js';
import { MIRROR } from './svg/mirror.js';

export class ProjetsView extends SubPageView {
  constructor(root, bg) { super(root, bg, 'projets', MIRROR); }
}
