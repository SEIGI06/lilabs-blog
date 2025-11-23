'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath?: string;
}

export function Pagination({ currentPage, totalPages, basePath = '/blog' }: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages: (number | string)[] = [];

    // Logic pour afficher les numéros de page
    if (totalPages <= 7) {
        // Si moins de 7 pages, afficher toutes
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        // Toujours afficher la première page
        pages.push(1);

        if (currentPage > 3) {
            pages.push('...');
        }

        // Pages autour de la page actuelle
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 2) {
            pages.push('...');
        }

        // Toujours afficher la dernière page
        pages.push(totalPages);
    }

    return (
        <nav className="flex justify-center items-center gap-2 mt-12" aria-label="Pagination">
            {/* Bouton Précédent */}
            {currentPage > 1 ? (
                <Link
                    href={`${basePath}?page=${currentPage - 1}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg glass-effect hover:bg-gray-800/50 transition-colors border border-gray-700"
                    aria-label="Page précédente"
                >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Précédent</span>
                </Link>
            ) : (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass-effect opacity-50 cursor-not-allowed border border-gray-800">
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Précédent</span>
                </div>
            )}

            {/* Numéros de page */}
            <div className="flex gap-2">
                {pages.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-4 py-2 text-gray-500"
                            >
                                ...
                            </span>
                        );
                    }

                    const pageNumber = page as number;
                    const isActive = pageNumber === currentPage;

                    return (
                        <Link
                            key={pageNumber}
                            href={`${basePath}?page=${pageNumber}`}
                            className={`px-4 py-2 rounded-lg transition-all border ${isActive
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-transparent font-semibold'
                                    : 'glass-effect hover:bg-gray-800/50 border-gray-700'
                                }`}
                            aria-label={`Page ${pageNumber}`}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {pageNumber}
                        </Link>
                    );
                })}
            </div>

            {/* Bouton Suivant */}
            {currentPage < totalPages ? (
                <Link
                    href={`${basePath}?page=${currentPage + 1}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg glass-effect hover:bg-gray-800/50 transition-colors border border-gray-700"
                    aria-label="Page suivante"
                >
                    <span className="hidden sm:inline">Suivant</span>
                    <ChevronRight className="w-4 h-4" />
                </Link>
            ) : (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass-effect opacity-50 cursor-not-allowed border border-gray-800">
                    <span className="hidden sm:inline">Suivant</span>
                    <ChevronRight className="w-4 h-4" />
                </div>
            )}
        </nav>
    );
}
