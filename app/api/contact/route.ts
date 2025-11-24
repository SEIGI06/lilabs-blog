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

        // 4. Enregistrer dans Supabase
        const supabase = createClient();
        const { data, error: supabaseError } = await supabase
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
            ])
            .select()
            .single();

        if (supabaseError) {
            console.error('Supabase error:', supabaseError);
            return NextResponse.json(
                { error: 'Erreur lors de l\'enregistrement du message' },
                { status: 500 }
            );
        }

        // 5. Retourner le succès
        // Note: L'envoi d'email via EmailJS se fait côté client pour des raisons de sécurité
        return NextResponse.json(
            {
                success: true,
                message: 'Message envoyé avec succès',
                id: data.id
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
