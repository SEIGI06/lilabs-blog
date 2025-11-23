'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

interface NewsletterProps {
    title?: string;
    description?: string;
    compact?: boolean;
}

export function Newsletter({
    title = "Restez informé",
    description = "Recevez les derniers articles sur l'IA, l'investissement et la tech directement dans votre boîte mail.",
    compact = false
}: NewsletterProps) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            setStatus('error');
            setMessage('Veuillez entrer une adresse email valide.');
            return;
        }

        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setMessage('Merci ! Vous êtes maintenant inscrit à notre newsletter.');
            setEmail('');
        }, 1000);
    };

    if (compact) {
        return (
            <div className="glass-effect rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <h3 className="font-semibold">{title}</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">{description}</p>
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre@email.com"
                        className="flex-1 px-4 py-2 rounded-lg bg-black/50 border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors text-sm"
                        disabled={status === 'loading' || status === 'success'}
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
                    >
                        {status === 'loading' ? 'En cours...' : status === 'success' ? '✓' : "S'inscrire"}
                    </button>
                </form>
                {message && (
                    <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-xs mt-2 flex items-center gap-1 ${status === 'success' ? 'text-green-500' : 'text-red-500'
                            }`}
                    >
                        {status === 'success' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        {message}
                    </motion.p>
                )}
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-effect rounded-2xl p-12 text-center"
        >
            <div className="max-w-2xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
                    <Mail className="w-8 h-8" />
                </div>

                <h2 className="text-3xl font-bold mb-4">{title}</h2>
                <p className="text-lg text-gray-400 mb-8">{description}</p>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="flex gap-3 mb-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="votre@email.com"
                            className="flex-1 px-5 py-4 rounded-lg bg-black/50 border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
                            disabled={status === 'loading' || status === 'success'}
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading' || status === 'success'}
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap"
                        >
                            {status === 'loading' ? 'En cours...' : status === 'success' ? 'Inscrit ✓' : "S'inscrire"}
                        </button>
                    </div>

                    {message && (
                        <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`text-sm flex items-center justify-center gap-2 ${status === 'success' ? 'text-green-500' : 'text-red-500'
                                }`}
                        >
                            {status === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                            {message}
                        </motion.p>
                    )}
                </form>

                <p className="text-sm text-gray-500 mt-6">
                    Pas de spam. Désabonnez-vous à tout moment.
                </p>
            </div>
        </motion.div>
    );
}
