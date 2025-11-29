'use client';

import { useState } from 'react';
import { Article } from '@/lib/data';
import { Card } from '@/components/ui/Card';
import { formatDateShort } from '@/lib/utils';
import { TagFilter } from '@/components/TagFilter';

interface BlogContentProps {
    initialArticles: Article[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
}

export function BlogContent({ initialArticles, totalCount }: BlogContentProps) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(initialArticles);
    const [isFiltering, setIsFiltering] = useState(false);

    const handleTagSelect = async (tag: string | null) => {
        setSelectedTag(tag);

        if (tag === null) {
            // Reset to initial articles
            setFilteredArticles(initialArticles);
            return;
        }

        // Fetch articles by tag
        setIsFiltering(true);
        try {
            const response = await fetch(`/api/posts-by-tag?tag=${encodeURIComponent(tag)}`);
            if (response.ok) {
                const data = await response.json();
                setFilteredArticles(data.articles || []);
            }
        } catch (error) {
            console.error('Error fetching articles by tag:', error);
        } finally {
            setIsFiltering(false);
        }
    };

    const displayedArticles = selectedTag ? filteredArticles : initialArticles;
    const articlesCount = displayedArticles.length;

    return (
        <>
            {/* Tag Filter */}
            <div className="mb-8">
                <TagFilter
                    selectedTag={selectedTag}
                    onTagSelect={handleTagSelect}
                />
            </div>

            {/* Articles count indicator */}
            {selectedTag && (
                <div className="mb-6 text-sm text-gray-400">
                    {articlesCount} article{articlesCount > 1 ? 's' : ''} avec le tag <span className="text-blue-500 font-medium">{selectedTag}</span>
                </div>
            )}

            {/* Loading state */}
            {isFiltering && (
                <div className="text-center py-12">
                    <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-gray-400 mt-4">Chargement...</p>
                </div>
            )}

            {/* Articles or empty state */}
            {!isFiltering && displayedArticles.length === 0 ? (
                <div className="text-center py-12">
                    <div className="glass-effect rounded-2xl p-12 max-w-md mx-auto">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 flex items-center justify-center">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                            {selectedTag ? `Aucun article avec le tag "${selectedTag}"` : 'Aucun article pour le moment'}
                        </h3>
                        <p className="text-gray-400">
                            {selectedTag ? 'Essayez de sélectionner un autre tag.' : 'Nous préparons des contenus exceptionnels. Revenez bientôt !'}
                        </p>
                    </div>
                </div>
            ) : !isFiltering && (
                <div className="space-y-0 divide-y divide-gray-800">
                    {displayedArticles.map((article, index) => (
                        <div key={article.id} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                            <Card
                                title={article.title}
                                date={formatDateShort(article.date)}
                                excerpt={article.excerpt}
                                href={`/blog/${article.slug}`}
                                tags={article.tags}
                                content={article.content}
                                coverImage={article.coverImage}
                                author={article.author}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination hidden when filtering */}
            {!selectedTag && totalCount > 12 && (
                <div className="mt-8 text-sm text-gray-500 text-center">
                    Pagination disponible sur la version complète
                </div>
            )}
        </>
    );
}
