# Supabase Configuration 🗄️

Ce dossier contient la documentation et les templates pour la base de données Supabase.

## 📁 Fichiers

### `migrations/example_article.sql`
Exemple complet d'article bien formaté en Markdown :
- Contenu riche avec titres, listes, citations
- Code examples
- Structure recommandée
- **À utiliser comme template** pour vos nouveaux articles

> **Note :** Les migrations SQL de base ont déjà été exécutées dans Supabase.
> Ce fichier est conservé comme référence pour créer de futurs articles.

## 🚀 Utiliser l'Exemple

### Copier le Template

1. Ouvrez `migrations/example_article.sql`
2. Copiez la structure de l'INSERT
3. Adaptez le contenu à votre article
4. Exécutez dans Supabase SQL Editor

### Structure d'un Article
Exemple complet d'article bien formaté :
- Contenu Markdown riche
- Structure recommandée
- À utiliser comme template

## 🚀 Guide de Démarrage

### 1. Créer un Projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez votre URL et clé API

### 2. Configurer l'Application

Ajoutez dans `.env.local` :
```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon
```

### 3. Exécuter les Migrations

Dans Supabase → SQL Editor :

1. Copiez le contenu de `schema.sql` → Run
2. Copiez le contenu de `migrations/add_image_support.sql` → Run
3. Copiez le contenu de `migrations/add_cover_images.sql` → Run

### 4. Vérifier

```sql
SELECT id, title, slug, cover_image, author, tags 
FROM posts 
ORDER BY created_at DESC;
```

## 📝 Ajouter un Article

### Via SQL

```sql
INSERT INTO posts (title, slug, summary, content, cover_image, author, tags)
VALUES (
  'Titre de l''Article',
  'titre-article',
  'Résumé court',
  '# Titre

Contenu en Markdown...',
  'https://images.unsplash.com/photo-xxx?w=1200',
  'Lilabs Team',
  ARRAY['Tech', 'Innovation']
);
```

### Via Interface Supabase

1. Table Editor → posts → Insert row
2. Remplissez les champs
3. Save

## 🖼️ Sources d'Images

- **Unsplash** : [unsplash.com](https://unsplash.com)
- **Pexels** : [pexels.com](https://pexels.com)
- **Pixabay** : [pixabay.com](https://pixabay.com)

Format recommandé : `https://images.unsplash.com/photo-xxx?w=1200&q=80`

## 🔍 Requêtes Utiles

### Compter les Articles
```sql
SELECT COUNT(*) FROM posts WHERE published = true;
```

### Articles par Tag
```sql
SELECT * FROM posts WHERE 'IA' = ANY(tags);
```

### Articles sans Image
```sql
SELECT title, slug FROM posts WHERE cover_image IS NULL;
```

### Mettre à Jour un Article
```sql
UPDATE posts 
SET cover_image = 'https://...',
    author = 'Nom Auteur',
    tags = ARRAY['Tag1', 'Tag2']
WHERE slug = 'votre-slug';
```

## 🛡️ Sécurité

Les Row Level Security (RLS) policies ne sont pas encore configurées.
Pour la production, ajoutez :

```sql
-- Activer RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Policy publique en lecture
CREATE POLICY "Public read access"
ON posts FOR SELECT
TO public
USING (published = true);
```

## 📚 Documentation

- [Guide Markdown](../../.gemini/antigravity/brain/.../markdown_guide.md)
- [Référence Images](../../.gemini/antigravity/brain/.../images_reference.md)
- [Exemple Article](migrations/example_article.sql)

---

Pour toute question, consultez la [documentation Supabase](https://supabase.com/docs).
