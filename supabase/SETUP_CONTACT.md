# Guide de Configuration : Formulaire de Contact 📧

Ce guide vous accompagne pas à pas pour rendre votre formulaire de contact **100% fonctionnel**.

---

## 🎯 Ce que vous allez obtenir

✅ Les messages sont **stockés dans Supabase** (historique permanent)  
✅ Vous recevez une **notification email instantanée** pour chaque message  
✅ **Gratuit** : 200 emails/mois avec EmailJS  
✅ **Professionnel** : Email dédié séparé de votre email personnel

---

## 📋 Prérequis

- [ ] Compte Supabase déjà configuré ✅
- [ ] Nouvelle adresse email créée (ex: `contact@lilabs.fr` ou `contact.lilabs@gmail.com`)
- [ ] Compte Vercel actif (pour déploiement)

---

## Étape 1️⃣ : Créer la Table Supabase

### 1.1 Accéder à Supabase

1. Allez sur https://supabase.com
2. Connectez-vous à votre projet `lilabs-blog`
3. Cliquez sur **SQL Editor** dans le menu de gauche

### 1.2 Exécuter la Migration

1. Cliquez sur **New Query**
2. Copiez-collez le contenu du fichier `migrations/003_contact_messages.sql`
3. Cliquez sur **Run** (bouton vert en bas à droite)
4. Vous devriez voir : ✅ **Success. No rows returned**

### 1.3 Vérifier la Création

Exécutez cette requête pour vérifier :

```sql
SELECT * FROM contact_messages LIMIT 1;
```

Vous devriez voir un tableau vide (normal, aucun message encore).

---

## Étape 2️⃣ : Configurer EmailJS (GRATUIT)

### 2.1 Créer un Compte

1. Allez sur https://www.emailjs.com/
2. Cliquez sur **Sign Up** (inscription gratuite)
3. Utilisez votre **nouvelle adresse email dédiée** pour vous inscrire
4. Vérifiez votre email et confirmez le compte

### 2.2 Ajouter un Service Email

1. Dans le dashboard EmailJS, cliquez sur **Email Services**
2. Cliquez sur **Add New Service**
3. Choisissez votre fournisseur :
   - **Gmail** si vous avez créé `contact.lilabs@gmail.com`
   - **Outlook** si vous avez créé `contact@outlook.com`
   - **Autre** selon votre choix
4. Suivez les instructions pour **connecter votre email**
5. Une fois connecté, notez le **Service ID** (ex: `service_abc123`)

### 2.3 Créer un Template d'Email

1. Cliquez sur **Email Templates**
2. Cliquez sur **Create New Template**
3. Configurez le template comme suit :

**Subject (Sujet) :**
```
Nouveau message de {{from_name}} - Site Lilabs
```

**Content (Corps de l'email) :**
```
Vous avez reçu un nouveau message depuis votre site Lilabs Blog :

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 EXPÉDITEUR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nom : {{from_name}}
Email : {{from_email}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 SUJET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{subject}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🕐 DATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Reçu le : {{sent_at}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pour répondre, utilisez : {{from_email}}

---
Cet email a été généré automatiquement par votre site Lilabs Blog.
```

4. **To Email** : Mettez votre nouvelle adresse email (où vous voulez recevoir les notifications)
5. **From Name** : `Lilabs Blog Contact Form`
6. Cliquez sur **Save**
7. Notez le **Template ID** (ex: `template_xyz789`)

### 2.4 Obtenir votre Public Key

1. Cliquez sur **Account** (icône profil en haut à droite)
2. Cliquez sur **General**
3. Trouvez **Public Key** (ex: `abc123XYZ456`)
4. Copiez-la

---

## Étape 3️⃣ : Configurer les Variables d'Environnement

### 3.1 Sur Vercel (Production)

1. Allez sur https://vercel.com
2. Sélectionnez votre projet `lilabs-blog`
3. **Settings** → **Environment Variables**
4. Ajoutez ces **4 nouvelles variables** :

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | `service_abc123` (votre Service ID) | Production, Preview, Development |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | `template_xyz789` (votre Template ID) | Production, Preview, Development |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | `abc123XYZ456` (votre Public Key) | Production, Preview, Development |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `contact@lilabs.fr` (votre email) | Production, Preview, Development |

5. Cliquez sur **Save** pour chaque variable

### 3.2 Redéployer

Après avoir ajouté les variables, **Vercel va automatiquement redéployer** votre site.

Sinon, allez dans **Deployments** et cliquez sur **Redeploy** sur le dernier déploiement.

---

## Étape 4️⃣ : Tester le Formulaire

1. Une fois le déploiement terminé, allez sur votre site : `https://votresite.vercel.app/contact`
2. Remplissez le formulaire avec des données de test
3. Cliquez sur **Envoyer le message**
4. Vous devriez voir : ✅ **Message envoyé !**

### Vérifications :

**✅ Dans Supabase :**
1. Allez dans **Table Editor** → `contact_messages`
2. Vous devriez voir votre message test

**✅ Dans votre Email :**
1. Vérifiez votre boîte email (contact@lilabs.fr)
2. Vous devriez avoir reçu une notification EmailJS
3. ⚠️ Si rien, vérifiez les **spams**

---

## ❓ Résolution de Problèmes

### Le message n'apparaît pas dans Supabase

- Vérifiez que la table a bien été créée (Étape 1.3)
- Vérifiez la console du navigateur (F12) pour les erreurs

### Je ne reçois pas l'email

1. Vérifiez vos **spams**
2. Vérifiez que le **Service EmailJS est bien connecté** (Email Services → Status doit être vert)
3. Vérifiez le **Template ID** et **Service ID** dans Vercel
4. Testez l'envoi via EmailJS dashboard : **Email Templates** → votre template → **Test it**

### Erreur "Failed to send message"

- Vérifiez les variables d'environnement sur Vercel
- Assurez-vous qu'elles commencent par `NEXT_PUBLIC_`
- Redéployez après avoir modifié les variables

---

## 📊 Consulter les Messages

### Via Supabase Dashboard

1. **Table Editor** → `contact_messages`
2. Triez par `created_at` (plus récent en premier)
3. Double-cliquez sur une ligne pour voir le message complet

### Requêtes Utiles

**Tous les nouveaux messages :**
```sql
SELECT * FROM contact_messages 
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
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE status = 'new') as nouveaux,
  COUNT(*) FILTER (WHERE status = 'read') as lus
FROM contact_messages;
```

---

## 🎉 C'est Terminé !

Votre formulaire de contact est maintenant **100% fonctionnel** !

**Vous avez :**
- ✅ Stockage permanent dans Supabase
- ✅ Notifications email instantanées
- ✅ Email professionnel dédié
- ✅ Historique complet des messages
- ✅ Anti-spam basique

**Prochaines étapes (optionnel) :**
- Ajouter un système anti-spam plus robuste (Turnstile, reCAPTCHA)
- Créer un dashboard admin pour gérer les messages
- Ajouter des emails de confirmation automatiques aux visiteurs
