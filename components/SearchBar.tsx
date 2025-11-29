'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Article } from '@/lib/data';
import { formatDateShort, calculateReadingTime } from '@/lib/utils';

interface SearchBarProps {
    onSearch?: (results: Article[]) => void;
    placeholder?: string;
    className?: string;
}

export function SearchBar({ onSearch, placeholder = 'Rechercher des articles...', className }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    // Debounced search function
    const performSearch = useCallback(async (searchQuery: string) => {
        if (searchQuery.trim().length < 2) {
            setResults([]);
            setIsLoading(false);
            if (onSearch) onSearch([]);
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
            if (response.ok) {
                const data = await response.json();
                setResults(data.results || []);
                if (onSearch) onSearch(data.results || []);
            } else {
                setResults([]);
                if (onSearch) onSearch([]);
            }
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
            if (onSearch) onSearch([]);
        } finally {
            setIsLoading(false);
        }
    }, [onSearch]);

    // Debounce effect
    useEffect(() => {
        const timer = setTimeout(() => {
            performSearch(query);
        }, 300);

        return () => clearTimeout(timer);
    }, [query, performSearch]);

    // Keyboard shortcut: Ctrl+K or Cmd+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInputRef.current?.focus();
                setIsOpen(true);
            }
            // Escape to close
            if (e.key === 'Escape') {
                setIsOpen(false);
                searchInputRef.current?.blur();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleClear = () => {
        setQuery('');
        setResults([]);
        setIsOpen(false);
        if (onSearch) onSearch([]);
        searchInputRef.current?.focus();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        setIsOpen(value.length > 0);
    };

    return (
        <div ref={searchContainerRef} className={`relative w-full ${className || ''}`}>
            {/* Search Input */}
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Search className="w-5 h-5" />
                    )}
                </div>

                <input
                    ref={searchInputRef}
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => setIsOpen(query.length > 0)}
                    placeholder={placeholder}
                    className="w-full pl-12 pr-20 py-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl
                             text-white placeholder-gray-500 
                             focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                             transition-all duration-200"
                    aria-label="Rechercher des articles"
                />

                {/* Keyboard shortcut hint and clear button */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {query && (
                        <button
                            onClick={handleClear}
                            className="p-1 hover:bg-gray-800 rounded transition-colors"
                            aria-label="Effacer la recherche"
                        >
                            <X className="w-4 h-4 text-gray-400" />
                        </button>
                    )}
                    {!query && (
                        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-500 bg-gray-800/50 border border-gray-700 rounded">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    )}
                </div>
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
                {isOpen && query.length >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 w-full bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden z-50"
                    >
                        {isLoading ? (
                            <div className="p-8 text-center">
                                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-500" />
                                <p className="text-sm text-gray-400">Recherche en cours...</p>
                            </div>
                        ) : results.length > 0 ? (
                            <div className="max-h-[400px] overflow-y-auto">
                                {results.slice(0, 5).map((article, index) => (
                                    <Link
                                        key={article.id}
                                        href={`/blog/${article.slug}`}
                                        onClick={() => {
                                            setIsOpen(false);
                                            setQuery('');
                                        }}
                                        className="block p-4 hover:bg-gray-800/50 transition-colors border-b border-gray-800 last:border-b-0"
                                    >
                                        <div className="flex flex-col gap-2">
                                            <h4 className="font-semibold text-white line-clamp-1">
                                                {article.title}
                                            </h4>
                                            <p className="text-sm text-gray-400 line-clamp-2">
                                                {article.excerpt}
                                            </p>
                                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                                <span>{formatDateShort(article.date)}</span>
                                                <span>•</span>
                                                <span>{calculateReadingTime(article.content)} min</span>
                                                {article.tags && article.tags.length > 0 && (
                                                    <>
                                                        <span>•</span>
                                                        <span className="text-blue-500">{article.tags[0]}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ))}

                                {results.length > 5 && (
                                    <div className="p-3 text-center border-t border-gray-800 bg-gray-900/50">
                                        <p className="text-sm text-gray-400">
                                            +{results.length - 5} autre{results.length - 5 > 1 ? 's' : ''} résultat{results.length - 5 > 1 ? 's' : ''}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="p-8 text-center">
                                <div className="w-16 h-16 rounded-full bg-gray-800 mx-auto mb-4 flex items-center justify-center">
                                    <Search className="w-8 h-8 text-gray-600" />
                                </div>
                                <h4 className="font-semibold mb-1">Aucun résultat</h4>
                                <p className="text-sm text-gray-400">
                                    Aucun article ne correspond à &quot;{query}&quot;
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
