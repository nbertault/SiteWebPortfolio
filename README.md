# Portfolio — Nolhan

Site statique, **une page = un fichier HTML**, JavaScript en **architecture MVC** (modules ES, sans dépendance).

## Lancer
Les modules ES et `fetch` nécessitent un serveur local (pas de double-clic sur le fichier) :

    python3 -m http.server 8000      # puis http://localhost:8000
    # ou : npx serve   /  extension « Live Server » de VS Code

## Structure
    index.html · passions.html · projets.html (+ projet-*.html : une page dédiée par projet) · parcours.html · apports.html   ← 1 fichier par page
    css/    base.css (thèmes, couleur par page) · layout.css (header/footer/hero) · home.css · subpage.css
    data/   content.json         ← TOUS les textes, bilingues { fr, en }
    assets/ cv.pdf               ← remplacez par votre vrai CV
    js/
      models/       SettingsModel (thème + langue, persistés)  ·  ContentModel (chargement du contenu)
      views/        View (base) · HeaderView · FooterView · HomeView · SubPageView (gabarit commun)
                    PassionsView · ProjetsView · ParcoursView · ApportsView
                    svg/  car · engine · mirror · helmet · aero   (les schémas)
      controllers/  PageController (commun : thème, langue, header qui se masque)
                    HomeController (zones de la voiture, infobulle, contact)
                    SubPageController (fond qui sort sur le côté, sections une à une)
      pages/        un point d'entrée par page (3 lignes)

## MVC ici
- **Modèle** : données et état (contenu, préférences), sans HTML.
- **Vue** : état → HTML, sans logique métier.
- **Contrôleur** : relie les deux, gère les événements (clics, scroll, survol).

## Modifier
- Un texte, un lien, l'email : `data/content.json` (FR et EN).
- Une couleur de page : `css/base.css` (`body[data-page=…]`).
- Ajouter une page : un `.html`, une vue (`extends SubPageView`), une entrée dans `js/pages/` et dans `nav` du JSON.
- Formulaire de contact : ouvre le client mail (pas de serveur). Branchez un service (Formspree…) dans `HomeController`.
- Traduction : textes écrits dans les deux langues dans le JSON (pas de traduction automatique à la volée).


## Nouveautés
- **Header** : logo, dégradé, commandes langue/thème ; sa hauteur est mesurée (`--header-h`) et le contenu des pages s'y adapte.
- **Parcours** : 3 casques combinés (formations) + voitures alternées (expériences) — textes et images dans `data/content.json` (`image`, `logo`).
- **Projets** : tableau de chronométrage (1 ligne = 1 projet : titre cliquable, délais en violet, description). Nouveau projet = une entrée dans `pages.projets.projects` + une copie de `projet-*.html` (changer `data-project`).
