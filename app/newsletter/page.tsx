import { Newsletter } from '@/components/Newsletter';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Newsletter | Lilabs',
    description: 'Abonnez-vous à notre newsletter pour recevoir les derniers articles sur l\'IA, l\'investissement et la tech.',
};

export default function NewsletterPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="mb-12">
                <Newsletter />
            </div>

            <div className="glass-effect rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Ce que vous recevrez</h2>
                <div className="space-y-6">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Articles exclusifs</h3>
                            <p className="text-gray-400 text-sm">
                                Recevez nos meilleurs articles directement dans votre boîte mail avant leur publication sur le site.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center">
                            <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Analyses approfondies</h3>
                            <p className="text-gray-400 text-sm">
                                Des analyses détaillées sur les tendances de l'IA, les opportunités d'investissement et les innovations tech.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-cyan-600/20 flex items-center justify-center">
                            <svg className="w-6 h-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Pas de spam</h3>
                            <p className="text-gray-400 text-sm">
                                Une seule newsletter par semaine, maximum. Vous pouvez vous désabonner à tout moment.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
