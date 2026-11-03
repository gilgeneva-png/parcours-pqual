# Parcours PQual — version bêta

Site d'accompagnement à la préparation du travail pratique oral (CFC employé·e de commerce).
Même moteur que le site des mandats pratiques.

Adresse prévue : https://gilgeneva-png.github.io/parcours-pqual/

## Mettre en ligne (une seule fois)

1. Sur github.com, créer un dépôt public nommé `parcours-pqual`.
2. **Add file → Upload files**, puis glisser **tout le contenu** du dossier
   (index.html, etape.html, parcours.yml, README.md et le dossier `assets`).
3. **Commit changes**.
4. **Settings → Pages** : Source « Deploy from a branch », branche `main`, dossier `/ (root)`, **Save**.
5. Après une à deux minutes, le site est à l'adresse ci-dessus.

## Mettre à jour le site

Le seul fichier à modifier est **`parcours.yml`** (crayon en haut à droite, puis Commit changes).

- Pour activer un outil « bientôt » : coller son adresse dans le champ `url` de l'activité.
- Pour déplacer une étape : changer ses dates `debut` et `fin`.
- Si le fichier contient une erreur, le site affiche le numéro de la ligne à corriger.

Aperçu d'un brouillon sans toucher au site publié : copier le fichier sous un autre nom
(ex. `parcours-test.yml`) et ouvrir `…/parcours-pqual/?fichier=parcours-test.yml`.

## Contenu du dépôt

| Fichier | Rôle | À modifier ? |
|---|---|---|
| `parcours.yml` | Toutes les données : dates, étapes, outils, liens | Oui |
| `index.html` | Accueil : planning (Gantt) et ressources | Non |
| `etape.html` | Page d'une étape | Non |
| `assets/` | Mise en forme et fonctionnement (repris des mandats pratiques) | Non |
| `assets/konvink.js` | Liens vers le Guide pratique (Konvink), un par compétence | Oui, pour compléter les liens |
| `jeux/tp5.html` | Outil « Préparer mon TP5 » (entretien de réflexion) | Non |

## Le Guide pratique

Il n'est pas dans ce dépôt (public) : il reste sur le Drive institutionnel, accès interne.
Coller le lien Drive du fichier `guide-pratique.html` dans `parcours.yml`, à trois endroits
signalés par un commentaire (`guide_pratique`, l'activité de l'étape 3, la ressource de l'accueil).
