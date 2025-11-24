-- Migration: Create contact_messages table
-- Description: Table pour stocker tous les messages de contact du site
-- Date: 2025-11-24

-- ==============================================================================
-- TABLE: contact_messages
-- ==============================================================================

CREATE TABLE IF NOT EXISTS contact_messages (
  -- Identifiant unique
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Informations du contact
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  
  -- Métadonnées
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
  
  -- Informations techniques (anti-spam)
  ip_address TEXT,
  user_agent TEXT
);

-- ==============================================================================
-- INDEXES
-- ==============================================================================

-- Index pour tri par date (plus récent en premier)
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at 
  ON contact_messages(created_at DESC);

-- Index pour filtrer par statut
CREATE INDEX IF NOT EXISTS idx_contact_messages_status 
  ON contact_messages(status);

-- Index composite pour recherche email + date
CREATE INDEX IF NOT EXISTS idx_contact_messages_email_date 
  ON contact_messages(email, created_at DESC);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ==============================================================================

-- Activer RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy 1: TOUT LE MONDE peut insérer un message (visiteurs anonymes + utilisateurs connectés)
-- IMPORTANT: "anon" = visiteurs NON CONNECTÉS (c'est ce qu'on veut!)
CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages 
  FOR INSERT
  TO public  -- public = anon + authenticated combinés
  WITH CHECK (true);

-- Policy 2: Seuls les utilisateurs authentifiés peuvent lire (pour le dashboard admin)
CREATE POLICY "Authenticated users can view all messages"
  ON contact_messages 
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy 3: Seuls les utilisateurs authentifiés peuvent modifier le statut
CREATE POLICY "Authenticated users can update status"
  ON contact_messages 
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ==============================================================================
-- COMMENTAIRES
-- ==============================================================================

COMMENT ON TABLE contact_messages IS 'Messages de contact envoyés via le formulaire du site';
COMMENT ON COLUMN contact_messages.status IS 'Statut du message: new, read, archived';
COMMENT ON COLUMN contact_messages.ip_address IS 'IP du visiteur (anti-spam)';
COMMENT ON COLUMN contact_messages.user_agent IS 'User agent du navigateur (anti-spam)';

-- ==============================================================================
-- VERIFICATION
-- ==============================================================================

-- Vérifier que la table a été créée
SELECT 
  table_name, 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns
WHERE table_name = 'contact_messages'
ORDER BY ordinal_position;
