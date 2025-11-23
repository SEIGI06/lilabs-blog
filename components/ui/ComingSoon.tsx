'use client';

import { motion } from 'framer-motion';

interface ComingSoonProps {
    title?: string;
    description?: string;
    showSubscribe?: boolean;
}

export function ComingSoon({
    title = "Bientôt disponible",
    description = "Cette fonctionnalité arrive très prochainement. Restez à l'écoute !",
    showSubscribe = true
}: ComingSoonProps) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-2xl"
            >
                <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 blur-3xl opacity-20 animate-pulse"></div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 relative">
                        <span className="gradient-text">{title}</span>
                    </h1>
                </div>

                <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                    {description}
                </p>

                {showSubscribe && (
                    <div className="glass-effect rounded-2xl p-8 max-w-md mx-auto">
                        <h3 className="text-lg font-semibold mb-4">Soyez informé du lancement</h3>
                        <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Votre email"
                                className="flex-1 px-4 py-3 rounded-lg bg-black/50 border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition-opacity"
                            >
                                Notifier
                            </button>
                        </form>
                        <p className="text-sm text-gray-500 mt-3">Nous respectons votre vie privée.</p>
                    </div>
                )}

                <div className="mt-12 flex justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </motion.div>
        </div>
    );
}
