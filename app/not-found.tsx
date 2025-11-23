import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-6">
            <div className="text-center max-w-2xl">
                <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 blur-3xl opacity-20 animate-pulse"></div>
                    <h1 className="text-9xl font-bold mb-4 relative gradient-text">404</h1>
                </div>

                <h2 className="text-3xl font-bold mb-4">Page introuvable</h2>
                <p className="text-lg text-gray-400 mb-8">
                    Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                        Retour à l'accueil
                    </Link>
                    <Link
                        href="/blog"
                        className="px-6 py-3 glass-effect rounded-lg font-medium hover:bg-gray-800/50 transition-colors border border-gray-700"
                    >
                        Voir le blog
                    </Link>
                </div>

                <div className="mt-12 pt-12 border-t border-gray-800">
                    <p className="text-sm text-gray-500 mb-4">Suggestions :</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                            À propos
                        </Link>
                        <span className="text-gray-700">•</span>
                        <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Contact
                        </Link>
                        <span className="text-gray-700">•</span>
                        <Link href="/newsletter" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Newsletter
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
