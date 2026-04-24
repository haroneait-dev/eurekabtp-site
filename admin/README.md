# Admin CMS — Eureka BTP

Interface d'administration pour modifier le contenu du site sans toucher au code.

## Phase 1 — Schéma DB + admin basique ✅

### Déploiement initial

1. **Connecte-toi à Supabase** → projet Eureka BTP → onglet **SQL Editor**
2. Ouvre le fichier `supabase/migrations/001_cms_schema.sql` et copie son contenu
3. Colle-le dans le SQL Editor → **Run**
4. Vérifie sous **Table editor** que les tables `pages` et `sections` sont créées
5. Vérifie sous **Storage** que le bucket `site-assets` existe
6. Push le code sur Vercel (déjà fait)

### Accès admin

- URL de connexion : `https://eurekabtp-site.vercel.app/login.html`
- Après login → redirige automatiquement vers `/admin/index.html` (tableau de bord)
- Les utilisateurs sont créés depuis Supabase → **Authentication → Users → Add user**

### Structure des pages

`/admin/index.html` — Tableau de bord listant toutes les pages éditables
`/admin/page.html?slug=<slug>` — Édition d'une page (ses sections)
`/admin/pieces.html` — Catalogue des pièces (existant)

### Types de sections supportés (Phase 1)

| Type | Description | Champs `data` |
|---|---|---|
| `hero` | Bandeau hero plein écran avec image de fond | `eyebrow`, `title`, `subtitle`, `bg_image` |
| `split` | Bloc texte + image côte à côte | `eyebrow`, `title`, `text`, `image`, `variant` (light/dark), `image_position` (left/right), `cta_label`, `cta_url` |
| `process_intro` | Bandeau de transition centré | `eyebrow`, `title` |
| `cta` | Appel à l'action coloré | `eyebrow`, `title`, `text`, `cta_label`, `cta_url` |

D'autres types seront ajoutés en Phase 3 (`gallery`, `list`, etc.).

## Prochaines phases

- **Phase 2** — Connecter le rendu public (les pages HTML lisent depuis Supabase)
- **Phase 3** — Types additionnels (galerie, liste à puces, témoignages)
- **Phase 4** — Drag-and-drop pour réorganiser + compression d'image automatique
