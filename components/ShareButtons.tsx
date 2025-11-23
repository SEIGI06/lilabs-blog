'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Twitter, Linkedin, Facebook, Link as LinkIcon, Check } from 'lucide-react';

interface ShareButtonsProps {
    url: string;
    title: string;
    description?: string;
}

export function ShareButtons({ url, title, description }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const shareUrl = typeof window !== 'undefined' ? window.location.origin + url : url;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const shareLinks = [
        {
            name: 'Twitter',
            icon: Twitter,
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
            color: 'hover:text-[#1DA1F2]'
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
            color: 'hover:text-[#0A66C2]'
        },
        {
            name: 'Facebook',
            icon: Facebook,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            color: 'hover:text-[#1877F2]'
        }
    ];

    const handleShare = (link: string) => {
        window.open(link, '_blank', 'width=600,height=400');
    };

    // Native Web Share API for mobile
    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: description,
                    url: shareUrl,
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={handleNativeShare}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors border border-gray-700"
                aria-label="Partager l'article"
            >
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-medium">Partager</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 right-0 glass-effect rounded-xl p-3 shadow-xl border border-gray-700 z-10"
                    >
                        <div className="flex flex-col gap-2 min-w-[180px]">
                            {shareLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => handleShare(link.url)}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800/50 transition-colors text-left ${link.color}`}
                                >
                                    <link.icon className="w-5 h-5" />
                                    <span className="text-sm font-medium">{link.name}</span>
                                </button>
                            ))}
                            <div className="border-t border-gray-700 my-1"></div>
                            <button
                                onClick={handleCopyLink}
                                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800/50 transition-colors text-left hover:text-green-500"
                            >
                                {copied ? <Check className="w-5 h-5 text-green-500" /> : <LinkIcon className="w-5 h-5" />}
                                <span className="text-sm font-medium">{copied ? 'Copié !' : 'Copier le lien'}</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Overlay to close dropdown */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}
