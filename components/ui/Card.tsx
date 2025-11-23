import Link from 'next/link';
import { cn, calculateReadingTime } from '@/lib/utils';
import { Clock, Tag, User } from 'lucide-react';
import Image from 'next/image';

interface CardProps {
    title: string;
    date: string;
    excerpt: string;
    href: string;
    className?: string;
    tags?: string[];
    content?: string;
    coverImage?: string;
    author?: string;
}

export function Card({ title, date, excerpt, href, className, tags, content, coverImage, author }: CardProps) {
    const readingTime = content ? calculateReadingTime(content) : null;

    return (
        <Link
            href={href}
            className={cn(
                "group block py-8 transition-all",
                className
            )}
        >
            <article className="flex flex-col md:flex-row gap-6">
                {/* Cover Image */}
                {coverImage && (
                    <div className="relative w-full md:w-80 aspect-video flex-shrink-0 rounded-xl overflow-hidden bg-gray-800">
                        <Image
                            src={coverImage}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, 320px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                )}

                <div className="flex-1 flex flex-col gap-4">
                    {/* Meta information */}
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                        {author && (
                            <>
                                <div className="flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5" />
                                    <span>{author}</span>
                                </div>
                                <span>•</span>
                            </>
                        )}
                        <time className="flex items-center gap-1.5">
                            {date}
                        </time>
                        {readingTime && (
                            <>
                                <span>•</span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5" />
                                    {readingTime} min
                                </span>
                            </>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white group-hover:text-gray-200 transition-colors leading-tight">
                        {title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-400 leading-relaxed line-clamp-2">
                        {excerpt}
                    </p>

                    {/* Tags */}
                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-800/50 text-gray-300 border border-gray-700 hover:border-gray-600 transition-colors"
                                >
                                    <Tag className="w-3 h-3" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Read more */}
                    <div className="flex items-center gap-2 text-sm font-medium text-blue-500 group-hover:text-blue-400 transition-colors mt-auto">
                        Lire l'article
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </article>
        </Link>
    );
}


