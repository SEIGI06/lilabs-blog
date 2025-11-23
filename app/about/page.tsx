import { Metadata } from 'next';
import { Sparkles, Target, Eye, Heart, Zap, Users, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
    title: 'À propos | Lilabs',
    description: 'Découvrez notre mission et notre vision pour l\'avenir de la technologie, l\'IA et l\'investissement.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">À propos de Lilabs</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Explorons le <span className="gradient-text">futur</span> ensemble
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Lilabs est votre source d'information de confiance sur l'intelligence artificielle, l'investissement et les innovations technologiques.
                    </p>
                </div>

                {/* Mission */}
                <section className="mb-16">
                    <div className="glass-effect rounded-2xl p-8 md:p-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                                <Target className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold">Notre Mission</h2>
                        </div>
                        <p className="text-lg text-gray-300 leading-relaxed mb-4">
                            Chez <span className="font-semibold text-white">Lilabs</span>, nous croyons que la technologie et l'innovation sont les clés pour façonner un avenir meilleur. Notre mission est de démystifier les concepts complexes de l'IA, de la blockchain et de la fintech pour les rendre accessibles à tous.
                        </p>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Nous analysons les tendances émergentes, décortiquons les innovations technologiques et partageons des insights précieux pour vous aider à naviguer dans le monde en constante évolution de la tech et de l'investissement.
                        </p>
                    </div>
                </section>

                {/* Vision */}
                <section className="mb-16">
                    <div className="glass-effect rounded-2xl p-8 md:p-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                                <Eye className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold">Notre Vision</h2>
                        </div>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Devenir la référence francophone en matière d'analyse technologique et d'investissement intelligent. Nous aspirons à créer une communauté de passionnés qui partagent nos valeurs d'innovation, de transparence et d'excellence.
                        </p>
                    </div>
                </section>

                {/* Values */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Nos <span className="gradient-text">Valeurs</span>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Innovation */}
                        <div className="glass-effect rounded-xl p-6 hover:bg-gray-800/50 transition-all group">
                            <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Zap className="w-6 h-6 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Innovation</h3>
                            <p className="text-gray-400">
                                Nous restons à l'avant-garde des technologies émergentes et des tendances du marché.
                            </p>
                        </div>

                        {/* Excellence */}
                        <div className="glass-effect rounded-xl p-6 hover:bg-gray-800/50 transition-all group">
                            <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <TrendingUp className="w-6 h-6 text-purple-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Excellence</h3>
                            <p className="text-gray-400">
                                Chaque article est soigneusement recherché et vérifié pour garantir la qualité.
                            </p>
                        </div>

                        {/* Communauté */}
                        <div className="glass-effect rounded-xl p-6 hover:bg-gray-800/50 transition-all group">
                            <div className="w-12 h-12 rounded-lg bg-pink-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Users className="w-6 h-6 text-pink-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Communauté</h3>
                            <p className="text-gray-400">
                                Nous construisons une communauté de passionnés qui apprennent et grandissent ensemble.
                            </p>
                        </div>
                    </div>
                </section>

                {/* What we cover */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Ce que nous <span className="gradient-text">couvrons</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
                            <h3 className="text-xl font-bold mb-3">🤖 Intelligence Artificielle</h3>
                            <p className="text-gray-400">
                                Machine Learning, Deep Learning, LLMs, et applications pratiques de l'IA dans différents secteurs.
                            </p>
                        </div>
                        <div className="border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
                            <h3 className="text-xl font-bold mb-3">💰 Investissement</h3>
                            <p className="text-gray-400">
                                Analyse de marché, stratégies d'investissement, crypto-monnaies et fintech.
                            </p>
                        </div>
                        <div className="border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
                            <h3 className="text-xl font-bold mb-3">⚛️ Technologies Émergentes</h3>
                            <p className="text-gray-400">
                                Quantum computing, blockchain, IoT, et innovations qui façonnent demain.
                            </p>
                        </div>
                        <div className="border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
                            <h3 className="text-xl font-bold mb-3">🌱 Innovation Durable</h3>
                            <p className="text-gray-400">
                                Green tech, énergies renouvelables et technologies pour un avenir durable.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center">
                    <div className="glass-effect rounded-2xl p-12">
                        <Heart className="w-16 h-16 mx-auto mb-6 text-pink-500" />
                        <h2 className="text-3xl font-bold mb-4">
                            Rejoignez la communauté
                        </h2>
                        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                            Abonnez-vous à notre newsletter pour recevoir nos derniers articles et analyses directement dans votre boîte mail.
                        </p>
                        <a
                            href="/newsletter"
                            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                        >
                            S'abonner à la newsletter
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
