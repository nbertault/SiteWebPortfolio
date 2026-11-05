import { SubPageController } from '../controllers/SubPageController.js';
import { ProjetDetailView } from '../views/ProjetDetailView.js';
new SubPageController('projets', ProjetDetailView).start();
