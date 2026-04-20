# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projet

Site web B2B premium pour **Eureka BTP** — spécialiste en pièces détachées et véhicules pour le béton (toupies, pompes, centrales). L'objectif est une expérience utilisateur haut de gamme, fluide et interactive.

## Commandes

```bash
npm run dev      # Serveur de développement Vite
npm run build    # Build statique vers dist/
npm run preview  # Prévisualiser le build
```

## Stack

- **HTML/CSS/JS vanilla** — aucun framework, aucun Tailwind
- **Vite** — seul outil de build (dev dependency)
- **Librairies tierces via CDN uniquement** (pas installées via npm) :
  - GSAP 3 + ScrollTrigger — toutes les animations au scroll
  - Swiper 11 — carrousel Coverflow "Pièces Détachées"
  - Vanilla-tilt 1.8.1 — effet 3D hover sur les cartes véhicules
  - Inter (Google Fonts) — typographie unique

## Architecture

### Pages
- `index.html` — Accueil : Hero vidéo, stats, teaser identité, services (Z-pattern), carrousel pièces, vente véhicules (3D tilt), avis clients, contact + maps
- `pieces.html` — Catalogue : header Blueprint, barre de recherche, grille `.catalog-grid` (12 cartes)
- `identite.html` — Page "Notre Identité" : hero photo, présentation SARL fondée 2001, équipe, valeurs, galerie soudure/structure
- `pieces_old.html` — Ancienne version du catalogue (archive, ne pas modifier)

### Fichiers clés
- `css/style.css` — Variables CSS globales, typographie, styles page d'accueil (~1 870 lignes)
- `css/pieces.css` — Styles spécifiques au catalogue
- `js/main.js` — Toute la logique JS : navbar scroll, GSAP ScrollTrigger, Swiper init, form submit

### Assets images
- `images/camion/` — Photos véhicules (toupies, camions)
- `images/brands/` — Logos SVG marques (Liebherr, Putzmeister, Schwing, Stetter, Cifa, Imer, Mercedes, Renault Trucks)
- `images/soudure/` — Photos atelier soudure (page identité)
- `images/structure/` — Photos structure/locaux (page identité)
- `images/pompe_beton.png`, `images/handshake.png` — Icônes services
- `videos/hero-video.mp4` — Vidéo hero accueil

### Dossiers
- `backup/` — Snapshots de sauvegarde (ne pas modifier)
- `eurekabtp/` — Documents internes (ne pas versionner)
- `dist/` — Build Vite (généré automatiquement)

### Variables CSS (`:root` dans `style.css`)
- Couleurs : Anthracite `#2b2b2b`, Gris clair `#f4f5f7`, Orange accent `#f4650a`
- Shadows, transitions et spacing standardisés

### Sections `index.html` (dans l'ordre)
1. `#hero` — Slider vidéo/photo, autoplay continu
2. `#identite-teaser` — Bloc "Qui sommes-nous" avec CTA vers `identite.html`
3. `#services` — Services principaux (Z-pattern)
4. `#pieces` — Carrousel Swiper Coverflow pièces détachées
5. `#vente` — Grille matériels à la vente (Vanilla-tilt 3D)
6. `#avis` — Témoignages clients
7. `#contact-strip` + formulaire contact

### Patterns JS dans `main.js`
- Navbar : classe `.scrolled` ajoutée à 60px de scroll, burger menu toggle
- Hero slider : autoplay continu, pas de dots, transition fade
- Animations GSAP : chaque section a son propre bloc ScrollTrigger avec `trigger` + `start`
- Éléments génériques animables : attribut `data-animate` (fade-in automatique)
- Vanilla-tilt : appliqué sur `.vehicle-card[data-tilt]`
- Form contact `#contactForm` : simule un envoi async (délai 1.2s), reset auto après 3.5s

## Règles

- **Couleurs** : ne jamais introduire de nouvelles couleurs hors Noir/Gris/Blanc/Orange `#f4650a`
- **Assets** : ne pas renommer les chemins `videos/hero-video.mp4` ou `images/camion/...` sans mettre à jour tout le HTML
- **Responsive** : grilles passent de 3-4 colonnes à 1 colonne sur mobile — toujours vérifier les media queries
- **CDN** : ne pas installer GSAP/Swiper/Vanilla-tilt via npm, ils sont chargés via `<script>` CDN dans le HTML
- **Logos marques** : fichiers SVG dans `images/brands/`, ne pas remplacer par PNG
