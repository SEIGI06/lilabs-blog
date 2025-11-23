import Link from 'next/link';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { Newsletter } from '../Newsletter';

export function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        navigation: [
            { label: 'Accueil', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: 'À propos', href: '/about' },
            { label: 'Contact', href: '/contact' },
        ],
        social: [
            { label: 'Twitter', href: '#', icon: Twitter },
            { label: 'GitHub', href: '#', icon: Github },
            { label: 'LinkedIn', href: '#', icon: Linkedin },
        ],
    };

    return (
        <footer className="border-t border-gray-800 mt-32">
            {/* Newsletter Section */}
            <div className="max-w-6xl mx-auto px-6 py-16">
                <Newsletter compact />
            </div>

            <div className="border-t border-gray-800">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                        {/* Brand */}
                        <div>
                            <h3 className="font-bold text-xl mb-3 gradient-text">Lilabs</h3>
                            <p className="text-sm text-gray-400 leading-relaxed mb-4">
                                Explorez l'avenir de la technologie, de l'investissement et de l'intelligence artificielle.
                            </p>
                            <div className="flex gap-3">
                                {footerLinks.social.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors group"
                                    >
                                        <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Navigation */}
                        <div>
                            <h4 className="font-semibold mb-4">Navigation</h4>
                            <ul className="space-y-2">
                                {footerLinks.navigation.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-400 hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="font-semibold mb-4">Contact</h4>
                            <p className="text-sm text-gray-400 mb-3">
                                Des questions ? N'hésitez pas à nous contacter.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 text-sm text-blue-500 hover:text-blue-400 transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                Envoyer un message
                            </Link>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                        <p>© {currentYear} Lilabs. Tous droits réservés.</p>
                        <div className="flex gap-6">
                            <Link href="#" className="hover:text-white transition-colors">
                                Confidentialité
                            </Link>
                            <Link href="#" className="hover:text-white transition-colors">
                                Conditions
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

