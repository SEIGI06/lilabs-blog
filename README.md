# Lilabs Blog 🚀

Un blog moderne et élégant sur l'intelligence artificielle, l'investissement et les innovations technologiques.

## ✨ Fonctionnalités

- 🎨 **Design moderne** - Gradients, animations fluides, glass morphism
- 📱 **Responsive** - Mobile-first, menu hamburger, design adaptatif
- 🖼️ **Support images** - Cover images pour tous les articles
- 📝 **Markdown** - Articles formatés en Markdown avec syntax highlighting
- 🔍 **SEO optimisé** - Meta tags, structure sémantique
- ⚡ **Performance** - Next.js 16 avec Turbopack
- 🎯 **Navigation intuitive** - Navbar sticky, back to top, breadcrumbs
- 📧 **Newsletter** - Formulaire d'inscription intégré
- 🔗 **Partage social** - Twitter, LinkedIn, Facebook, copie de lien

## 🛠️ Stack Technique

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Markdown:** React Markdown

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- npm ou yarn
- Compte Supabase

### Installation

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd "new site web"
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**

Créez un fichier `.env.local` :
```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon
```

4. **Configurer la base de données**

Exécutez le schéma SQL dans Supabase :
```bash
# Voir supabase/README.md pour les instructions détaillées
```

5. **Lancer le serveur de développement**
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
├── app/                    # Pages Next.js (App Router)
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Layout principal
│   ├── blog/              # Pages blog
│   ├── about/             # Page à propos
│   ├── contact/           # Page contact
│   └── newsletter/        # Page newsletter
├── components/            # Composants React
│   ├── ui/               # Composants UI réutilisables
│   ├── HeroSection.tsx   # Hero de la homepage
│   ├── Newsletter.tsx    # Formulaire newsletter
│   └── ShareButtons.tsx  # Boutons de partage
├── lib/                  # Utilitaires et helpers
│   ├── data.ts          # Fetching Supabase
│   ├── supabase.ts      # Client Supabase
│   └── utils.ts         # Fonctions utilitaires
├── supabase/            # Configuration et migrations
│   ├── schema.sql       # Schéma de base
│   └── migrations/      # Scripts de migration
└── public/              # Assets statiques

```

## 🎨 Pages Disponibles

- `/` - Homepage avec liste d'articles
- `/blog` - Liste complète des articles
- `/blog/[slug]` - Détail d'un article
- `/about` - À propos
- `/contact` - Formulaire de contact
- `/newsletter` - Inscription newsletter

## 📝 Gestion des Articles

Les articles sont stockés dans Supabase et formatés en Markdown.

### Structure d'un Article

```typescript
{
  title: string;          // Titre
  slug: string;           // URL-friendly
  summary: string;        // Résumé court
  content: string;        // Contenu Markdown
  cover_image?: string;   // URL image de couverture
  author?: string;        // Nom de l'auteur
  tags: string[];         // Tags
  created_at: Date;       // Date de création
}
```

Voir `supabase/migrations/example_article.sql` pour un exemple complet.

## 🎯 Scripts Disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build production
npm run start    # Serveur production
npm run lint     # Linter ESLint
```

## 🌐 Déploiement

### Vercel (Recommandé)

1. Pushez votre code sur GitHub
2. Importez sur [Vercel](https://vercel.com)
3. Configurez les variables d'environnement
4. Déployez !

### Autres Plateformes

Compatible avec Netlify, Railway, ou tout hébergeur supportant Next.js.

## 📚 Documentation Supplémentaire

- [Guide Markdown](../.gemini/antigravity/brain/.../markdown_guide.md)
- [Guide Images](../.gemini/antigravity/brain/.../images_reference.md)
- [Configuration Supabase](./supabase/README.md)

## 🤝 Contribution

Ce projet est privé. Pour toute question, contactez l'équipe.

## 📄 Licence

Propriétaire - Tous droits réservés

---

Développé avec ❤️ par Lilabs Team
