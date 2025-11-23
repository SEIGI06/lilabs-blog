import { getPostBySlug } from "@/lib/data";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import Image from "next/image";
import { ShareButtons } from "@/components/ShareButtons";
import { BackToTop } from "@/components/BackToTop";
import { calculateReadingTime, formatDate } from "@/lib/utils";
import { ArrowLeft, Clock, Calendar, Tag, User } from "lucide-react";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function ArticlePage({ params }: PageProps) {
    const { id } = await params;
    const article = await getPostBySlug(id);

    if (!article) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-24 text-center">
                <div className="glass-effect rounded-2xl p-12">
                    <h1 className="text-3xl font-bold mb-4">Article introuvable</h1>
                    <p className="text-gray-400 mb-8">Cet article n'existe pas ou a été supprimé.</p>
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Retour au blog
                    </Link>
                </div>
            </div>
        );
    }

    const readingTime = calculateReadingTime(article.content);

    return (
        <>
            <article className="max-w-5xl mx-auto px-6 py-12">
                {/* Back button */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-12 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Retour au blog
                </Link>

                {/* Cover Image - Full width */}
                {article.coverImage && (
                    <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12 bg-gray-800">
                        <Image
                            src={article.coverImage}
                            alt={article.title}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 1200px) 100vw, 1200px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Title overlay on image */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                            <div className="max-w-4xl">
                                {/* Tags */}
                                {article.tags && article.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {article.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm text-white border border-white/20"
                                            >
                                                <Tag className="w-3.5 h-3.5" />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-white drop-shadow-lg">
                                    {article.title}
                                </h1>
                            </div>
                        </div>
                    </div>
                )}

                {/* Article header (when no cover image) */}
                {!article.coverImage && (
                    <header className="mb-12 max-w-4xl">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                            {article.title}
                        </h1>

                        {/* Tags */}
                        {article.tags && article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-8">
                                {article.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-800/50 text-gray-300 border border-gray-700"
                                    >
                                        <Tag className="w-3.5 h-3.5" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </header>
                )}

                {/* Article meta */}
                <div className="max-w-4xl mb-12">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                        {article.author && (
                            <>
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span className="font-medium">{article.author}</span>
                                </div>
                                <span>•</span>
                            </>
                        )}
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <time>{formatDate(article.date)}</time>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{readingTime} min de lecture</span>
                        </div>
                    </div>

                    {/* Share buttons */}
                    <div className="flex items-center gap-4 pt-6 border-t border-gray-800">
                        <ShareButtons
                            url={`/blog/${article.slug}`}
                            title={article.title}
                            description={article.excerpt}
                        />
                    </div>
                </div>

                {/* Article content */}
                <div className="max-w-4xl prose prose-invert prose-lg max-w-none
                    prose-headings:font-bold prose-headings:tracking-tight
                    prose-h1:text-4xl prose-h1:mb-4
                    prose-h2:text-3xl prose-h2:mb-3 prose-h2:mt-12
                    prose-h3:text-2xl prose-h3:mb-2 prose-h3:mt-8
                    prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                    prose-a:text-blue-500 prose-a:no-underline hover:prose-a:text-blue-400 hover:prose-a:underline
                    prose-strong:text-white prose-strong:font-semibold
                    prose-code:text-gray-300 prose-code:bg-gray-900 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                    prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800 prose-pre:p-4
                    prose-blockquote:border-l-4 prose-blockquote:border-l-blue-600 prose-blockquote:bg-gray-900/50 prose-blockquote:p-4 prose-blockquote:rounded-r prose-blockquote:text-gray-300
                    prose-ul:list-disc prose-ul:ml-6
                    prose-ol:list-decimal prose-ol:ml-6
                    prose-li:text-gray-300 prose-li:mb-2
                    prose-img:rounded-xl prose-img:shadow-xl prose-img:my-8
                ">
                    <ReactMarkdown>{article.content}</ReactMarkdown>
                </div>

                {/* Article footer */}
                <footer className="max-w-4xl mt-16 pt-8 border-t border-gray-800">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                        <div>
                            <p className="text-sm text-gray-400 mb-2">Vous avez aimé cet article ?</p>
                            <ShareButtons
                                url={`/blog/${article.slug}`}
                                title={article.title}
                                description={article.excerpt}
                            />
                        </div>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 px-6 py-3 glass-effect rounded-lg font-medium hover:bg-gray-800/50 transition-colors border border-gray-700"
                        >
                            Voir tous les articles
                        </Link>
                    </div>
                </footer>
            </article>

            <BackToTop />
        </>
    );
}


