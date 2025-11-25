'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // 1. Enregistrer dans Supabase via l'API
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                // Afficher le message d'erreur détaillé
                console.error('API Error:', data);
                throw new Error(data.details || data.error || 'Erreur lors de l\'envoi');
            }

            // 2. Envoyer l'email via EmailJS (côté client)
            const emailjs = (await import('@emailjs/browser')).default;

            // Vérifier que les variables EmailJS sont configurées
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

            if (serviceId && templateId && publicKey) {
                await emailjs.send(
                    serviceId,
                    templateId,
                    {
                        from_name: formData.name,
                        from_email: formData.email,
                        subject: formData.subject,
                        message: formData.message,
                        sent_at: new Date().toLocaleString('fr-FR'),
                    },
                    publicKey
                );
            } else {
                console.warn('EmailJS not configured - message saved to database only');
            }

            // 3. Succès
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Reset le statut après 5 secondes
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Error:', error);
            setStatus('error');

            // Reset le statut d'erreur après 5 secondes
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Contactez-<span className="gradient-text">nous</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Une question, une suggestion ou simplement envie de discuter ? N'hésitez pas à nous contacter.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="glass-effect rounded-xl p-6 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600/20 mb-4">
                            <Mail className="w-6 h-6 text-blue-500" />
                        </div>
                        <h3 className="font-semibold mb-2">Email</h3>
                        <p className="text-sm text-gray-400">
                            {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@lilabs.fr'}
                        </p>
                    </div>

                    <div className="glass-effect rounded-xl p-6 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-600/20 mb-4">
                            <MapPin className="w-6 h-6 text-purple-500" />
                        </div>
                        <h3 className="font-semibold mb-2">Localisation</h3>
                        <p className="text-sm text-gray-400">Paris, France</p>
                    </div>

                    <div className="glass-effect rounded-xl p-6 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-600/20 mb-4">
                            <Send className="w-6 h-6 text-cyan-500" />
                        </div>
                        <h3 className="font-semibold mb-2">Réponse</h3>
                        <p className="text-sm text-gray-400">Sous 24-48h</p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="glass-effect rounded-2xl p-8"
                >
                    <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    Nom
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
                                    placeholder="Votre nom"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
                                    placeholder="votre@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                Sujet
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
                                placeholder="De quoi souhaitez-vous parler ?"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={6}
                                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                placeholder="Votre message..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {status === 'loading' ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Envoi en cours...
                                </>
                            ) : status === 'success' ? (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    Message envoyé !
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Envoyer le message
                                </>
                            )}
                        </button>

                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-3"
                            >
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <p className="text-sm text-green-500">
                                    Merci pour votre message ! Nous vous répondrons très bientôt.
                                </p>
                            </motion.div>
                        )}

                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3"
                            >
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                <p className="text-sm text-red-500">
                                    Une erreur est survenue. Veuillez réessayer.
                                </p>
                            </motion.div>
                        )}
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
}
