# Formulaire de Contact - README 📧

## Vue d'Ensemble

Le formulaire de contact implémente une **double fonctionnalité** professionnelle :

✅ **Stockage permanent** : Tous les messages sont sauvegardés dans Supabase  
✅ **Notification email** : Vous recevez un email instantané via EmailJS  
✅ **100% Gratuit** : Jusqu'à 200 emails/mois  
✅ **Professionnel** : Email dédié séparé de votre email personnel

---

## 🎯 Fichiers Modifiés

### Code Implémenté

1. **`supabase/migrations/003_contact_messages.sql`**
   - Script SQL pour créer la table `contact_messages`
   - Politiques RLS (Row Level Security) configurées
   - Index pour performances optimales

2. **`app/api/contact/route.ts`** (NOUVEAU)
   - API Route Next.js pour gérer les soumissions
   - Validation des données
   - Enregistrement dans Supabase
   - Gestion d'erreurs

3. **`app/contact/page.tsx`** (MODIFIÉ)
   - Formulaire connecté à l'API
   - Intégration EmailJS pour notifications
   - Messages de succès/erreur améliorés
   - Email dynamique depuis variables d'environnement

4. **`lib/supabase.ts`** (MODIFIÉ)
   - Ajout de fonction `createClient()` pour usage serveur

5. **`package.json`** (MODIFIÉ)
   - Ajout de `@emailjs/browser` en dépendance

---

## 🚀 Prochaines Étapes (Actions Utilisateur)

### 1. Créer une Adresse Email Dédiée

Créez une nouvelle adresse pour recevoir les messages de contact :
- Option 1 : Gmail (`contact.lilabs@gmail.com`)
- Option 2 : Domaine personnalisé (`contact@lilabs.fr`)
- Option 3 : Outlook/autre service

⚠️ **Important** : Cette adresse sera affichée publiquement sur la page contact.

---

### 2. Exécuter le Script SQL dans Supabase

1. Connectez-vous à votre [dashboard Supabase](https://supabase.com)
2. Sélectionnez votre projet `lilabs-blog`
3. Allez dans **SQL Editor** (menu gauche)
4. Cliquez sur **New Query**
5. Copiez-collez le contenu de `supabase/migrations/003_contact_messages.sql`
6. Cliquez sur **Run** ou appuyez sur `Ctrl+Enter`
7. Vérifiez le succès : ✅ "Success. No rows returned"

**Vérification :**
```sql
SELECT * FROM contact_messages LIMIT 1;
```
Devrait retourner un tableau vide (normal, aucun message encore).

---

###3. Configurer EmailJS

📖 **Guide détaillé** : Consultez `supabase/SETUP_CONTACT.md` pour les étapes complètes avec captures d'écran.

**Résumé rapide :**
1. Créer un compte sur https://www.emailjs.com/
2. Connecter votre service email (Gmail, Outlook, etc.)
3. Créer un template de notification
4. Noter 3 clés :
   - Service ID (ex: `service_abc123`)
   - Template ID (ex: `template_xyz789`)
   - Public Key (ex: `abc123XYZ456`)

---

### 4. Configurer les Variables d'Environnement sur Vercel

1. Dashboard Vercel → **Settings** → **Environment Variables**
2. Ajouter ces **4 variables** :

| Variable | Valeur | Environnements |
|----------|--------|----------------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Votre Service ID | Production, Preview, Dev |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Votre Template ID | Production, Preview, Dev |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Votre Public Key | Production, Preview, Dev |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `contact@lilabs.fr` | Production, Preview, Dev |

3. **Save** chaque variable
4. Vercel redéploiera automatiquement

---

### 5. Commit & Push sur GitHub

```bash
# Commiter tous les fichiers
git add .
git commit -m "feat: implement functional contact form with Supabase + EmailJS"
git push origin main
```

Vercel détectera le push et déploiera automatiquement.

---

### 6. Tester en Production

Une fois déployé :

1. Allez sur `https://votresite.vercel.app/contact`
2. Remplissez le formulaire avec des données de test
3. Cliquez sur **Envoyer le message**
4. Vérifiez :
   - ✅ Message "Message envoyé !" s'affiche
   - ✅ Message apparaît dans Supabase (Table Editor → `contact_messages`)
   - ✅ Email reçu dans votre boîte (vérifiez les spams)

---

## 📊 Consulter les Messages

### Via Supabase Dashboard

1. **Table Editor** → `contact_messages`
2. Tous les messages sont accessibles
3. Vous pouvez :
   - Filtrer par statut (`new`, `read`, `archived`)
   - Trier par date
   - Exporter en CSV

### Requêtes SQL Utiles

**Nouveaux messages :**
```sql
SELECT name, email, subject, created_at 
FROM contact_messages 
WHERE status = 'new' 
ORDER BY created_at DESC;
```

**Marquer un message comme lu :**
```sql
UPDATE contact_messages 
SET status = 'read' 
WHERE id = 'votre-uuid-ici';
```

**Statistiques :**
```sql
SELECT 
  COUNT(*) as total_messages,
  COUNT(*) FILTER (WHERE status = 'new') as non_lus,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') as cette_semaine
FROM contact_messages;
```

---

## 🔧 Dépannage

### Le message n'est pas enregistré

- Vérifiez que la table existe : `SELECT * FROM contact_messages`
- Vérifiez la console navigateur (F12) pour erreurs
- Vérifiez que le formulaire ne retourne pas d'erreur API

### Je ne reçois pas l'email

1. ⚠️ Vérifiez vos **spams**
2. Vérifiez le **Service Status** dans EmailJS (doit être vert)
3. Testez via le dashboard EmailJS : Templates → Test Template
4. Vérifiez les variables d'environnement sur Vercel
5. Assurez-vous d'avoir redéployé après ajout des variables

### Erreur "Cannot find module"

Normal en développement local sans `node_modules`. Sur Vercel, tout sera installé automatiquement lors du build.

---

## 📈 Statistiques & Limites

**EmailJS (Plan Gratuit) :**
- 200 emails/mois
- Suffisant pour un site vitrine
- Si dépassement : upgrade à $10/mois pour 1000 emails

**Supabase (Plan Gratuit) :**
- 500 Mo de stockage
- 50 000 requêtes/mois
- Largement suffisant pour les messages de contact

---

## 🎉 Résultat Final

Une fois tout configuré, vous aurez :

✅ Formulaire 100% fonctionnel  
✅ Stockage sécurisé dans Supabase  
✅ Notification email instantanée  
✅ Historique complet des messages  
✅ Email professionnel dédié  
✅ Système anti-spam basique (IP tracking)  

**Documentation complète** : `supabase/SETUP_CONTACT.md`
