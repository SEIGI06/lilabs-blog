'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative max-w-5xl mx-auto px-6 py-24 md:py-32 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl animate-pulse"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-8"
                >
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">Bienvenue sur Lilabs</span>
                </motion.div>

                {/* Main heading */}
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                    Explorez l'avenir de{' '}
                    <span className="gradient-text">l'IA</span>,{' '}
                    <span className="gradient-text">la tech</span> et{' '}
                    <span className="gradient-text">l'investissement</span>
                </h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto mb-12"
                >
                    Découvrez des analyses approfondies, des insights exclusifs et des perspectives innovantes sur les technologies qui façonnent notre avenir.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        href="/blog"
                        className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition-all hover:scale-105"
                    >
                        Découvrir les articles
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="/newsletter"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 glass-effect rounded-lg font-medium hover:bg-gray-800/50 transition-all border border-gray-700 hover:border-gray-600"
                    >
                        S'abonner à la newsletter
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}

