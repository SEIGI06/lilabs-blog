import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

// Type pour les données du formulaire
interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export async function POST(request: NextRequest) {
    try {
        // 1. Parser les données du formulaire
        const body: ContactFormData = await request.json();
        const { name, email, subject, message } = body;

        // 2. Validation basique
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Tous les champs sont requis' },
                { status: 400 }
            );
        }

        // Validation email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Format d\'email invalide' },
                { status: 400 }
            );
        }

        // 3. Récupérer les informations de la requête (anti-spam)
        const ip = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown';
        const userAgent = request.headers.get('user-agent') || 'unknown';

        // 4. Vérifier la configuration Supabase
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey || supabaseUrl === 'https://placeholder.supabase.co') {
            console.error('Supabase configuration missing or invalid');
            return NextResponse.json(
                {
                    error: 'Configuration Supabase manquante',
                    details: 'Les variables d\'environnement Supabase ne sont pas configurées'
                },
                { status: 500 }
            );
        }

        // 5. Enregistrer dans Supabase
        const supabase = createClient();
        const { error: supabaseError } = await supabase
            .from('contact_messages')
            .insert([
                {
                    name,
                    email,
                    subject,
                    message,
                    ip_address: ip,
                    user_agent: userAgent,
                    status: 'new'
                }
            ]);
        // Note: On n'utilise PAS .select() car les utilisateurs anon n'ont pas le droit de lire (RLS)

        if (supabaseError) {
            console.error('Supabase error:', supabaseError);

            // Messages d'erreur plus détaillés
            let errorMessage = 'Erreur lors de l\'enregistrement du message';
            let errorDetails = supabaseError.message;

            if (supabaseError.code === '42P01') {
                errorMessage = 'La table contact_messages n\'existe pas';
                errorDetails = 'Veuillez exécuter le script SQL dans Supabase (voir SETUP_CONTACT.md)';
            } else if (supabaseError.code === '42501') {
                errorMessage = 'Permissions insuffisantes';
                errorDetails = 'Vérifiez les politiques RLS dans Supabase';
            }

            return NextResponse.json(
                {
                    error: errorMessage,
                    details: errorDetails,
                    code: supabaseError.code
                },
                { status: 500 }
            );
        }

        // 6. Retourner le succès
        // Note: L'envoi d'email via EmailJS se fait côté client pour des raisons de sécurité
        return NextResponse.json(
            {
                success: true,
                message: 'Message envoyé avec succès'
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Une erreur est survenue' },
            { status: 500 }
        );
    }
}
