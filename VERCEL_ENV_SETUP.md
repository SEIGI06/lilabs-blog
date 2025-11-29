# 🚨 SOLUTION : Variables d'Environnement Manquantes sur Vercel

## Problème Identifié

L'erreur **"Vérifiez les politiques RLS"** vient du fait que **Vercel ne connaît PAS vos variables d'environnement Supabase**.

Votre `.env.local` existe en local, MAIS Vercel a besoin de SES propres variables.

---

## ✅ Solution (5 minutes)

### Étape 1 : Aller dans les Paramètres Vercel

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet `lilabs-blog`
3. Cliquez sur **Settings** (en haut)
4. Cliquez sur **Environment Variables** (menu gauche)

---

### Étape 2 : Ajouter les 2 Variables Supabase

Copiez ces valeurs depuis votre `.env.local` :

**Variable 1 :**
- **Name :** `NEXT_PUBLIC_SUPABASE_URL`
- **Value :** `https://ytpyeazdzyrkbxkcjfeh.supabase.co`
- **Environment :** Cochez `Production`, `Preview`, `Development`
- Cliquez **Save**

**Variable 2 :**
- **Name :** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value :** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cHllYXpkenlya2J4a2NqZmVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4ODA5NjUsImV4cCI6MjA3OTQ1Njk2NX0.cNyVwSrjXDscYQY75Jl2Saf3Qo6QirA-j3L0xjpYsP4`
- **Environment :** Cochez `Production`, `Preview`, `Development`
- Cliquez **Save**

---

### Étape 3 : Redéployer

Après avoir ajouté les variables, **Vercel va automatiquement redéployer** votre site (1-2 minutes).

Sinon, forcez le redéploiement :
1. **Deployments** (menu haut)
2. Cliquez sur les **3 points** du dernier déploiement
3. **Redeploy**

---

### Étape 4 : Tester le Formulaire

Une fois le déploiement terminé :

1. Allez sur `https://votresite.vercel.app/contact`
2. Remplissez le formulaire
3. Cliquez sur **Envoyer**

**Cette fois, ça devrait fonctionner !** ✅

---

## Vérification

Après redéploiement, dans votre dashboard Vercel → **Settings** → **Environment Variables**, vous devriez voir :

- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Pourquoi ça ne marchait pas ?

**Sans ces variables sur Vercel :**
- L'API route utilise les valeurs par défaut : `https://placeholder.supabase.co`
- Supabase rejette les requêtes car elles ne viennent pas de votre projet
- Erreur 500 : "Vérifiez les politiques RLS"

**Avec les variables configurées :**
- L'API route se connecte à VOTRE projet Supabase
- Les politiques RLS autorisent les insertions anonymes
- ✅ Formulaire fonctionnel !

---

## Captures d'Écran (Guide)

**Où trouver les variables d'environnement sur Vercel :**

```
Dashboard Vercel
└── Votre Projet (lilabs-blog)
    └── Settings (menu haut)
        └── Environment Variables (menu gauche)
            └── Add New (bouton)
```

---

**Faites cette manipulation et dites-moi quand c'est fait !** 🚀
