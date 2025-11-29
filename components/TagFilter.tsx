'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Tag as TagIcon } from 'lucide-react';

interface TagFilterProps {
    selectedTag: string | null;
    onTagSelect: (tag: string | null) => void;
    className?: string;
}

export function TagFilter({ selectedTag, onTagSelect, className }: TagFilterProps) {
    const [tags, setTags] = useState<{ tag: string; count: number }[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        try {
            const response = await fetch('/api/tags');
            if (response.ok) {
                const data = await response.json();
                setTags(data.tags || []);
            }
        } catch (error) {
            console.error('Error fetching tags:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className={`flex items-center gap-2 ${className || ''}`}>
                <div className="w-20 h-9 bg-gray-800 rounded-full animate-pulse"></div>
                <div className="w-24 h-9 bg-gray-800 rounded-full animate-pulse"></div>
                <div className="w-28 h-9 bg-gray-800 rounded-full animate-pulse"></div>
            </div>
        );
    }

    if (tags.length === 0) {
        return null;
    }

    return (
        <div className={`${className || ''}`}>
            <div className="flex items-center gap-2 mb-3">
                <TagIcon className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-400">Filtrer par catégorie :</span>
            </div>

            <div className="flex flex-wrap gap-2">
                {/* Tag "Tous" */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onTagSelect(null)}
                    className={`
                        px-4 py-2 rounded-full text-sm font-medium transition-all
                        ${selectedTag === null
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                            : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800 border border-gray-700'
                        }
                    `}
                >
                    Tous
                </motion.button>

                {/* Tags dynamiques */}
                {tags.map(({ tag, count }) => (
                    <motion.button
                        key={tag}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onTagSelect(tag)}
                        className={`
                            px-4 py-2 rounded-full text-sm font-medium transition-all
                            flex items-center gap-2
                            ${selectedTag === tag
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800 border border-gray-700'
                            }
                        `}
                    >
                        <span>{tag}</span>
                        <span className={`
                            text-xs px-2 py-0.5 rounded-full
                            ${selectedTag === tag
                                ? 'bg-white/20'
                                : 'bg-gray-700'
                            }
                        `}>
                            {count}
                        </span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
