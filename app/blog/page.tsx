import { getPostsPaginated, getTotalPostsCount } from '@/lib/data';
import { Card } from '@/components/ui/Card';
import { Metadata } from 'next';
import { formatDateShort } from '@/lib/utils';
import { Pagination } from '@/components/Pagination';
import { SearchBar } from '@/components/SearchBar';

const POSTS_PER_PAGE = 12;

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ page?: string }> }): Promise<Metadata> {
    const params = await searchParams;
    const page = Number(params.page) || 1;

    return {
        title: page > 1 ? `Blog - Page ${page} | Lilabs` : 'Blog | Lilabs',
        description: 'Découvrez nos articles sur l\'IA, l\'investissement et la technologie.',
    };
}

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;

    const [articles, totalCount] = await Promise.all([
        getPostsPaginated(currentPage, POSTS_PER_PAGE),
        getTotalPostsCount()
    ]);

    const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

    return (
        <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Notre <span className="gradient-text">Blog</span>
                </h1>
                <p className="text-lg text-gray-400">
                    Explorez nos derniers articles sur l'intelligence artificielle, l'investissement et les innovations technologiques.
                </p>
                {totalCount > 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                        {totalCount} article{totalCount > 1 ? 's' : ''} • Page {currentPage} sur {totalPages}
                    </p>
                )}
            </div>

            {/* Search Bar */}
            <div className="mb-8">
                <SearchBar />
            </div>

            {articles.length === 0 ? (
                <div className="text-center py-12">
                    <div className="glass-effect rounded-2xl p-12 max-w-md mx-auto">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 flex items-center justify-center">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Aucun article pour le moment</h3>
                        <p className="text-gray-400">
                            Nous préparons des contenus exceptionnels. Revenez bientôt !
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="space-y-0 divide-y divide-gray-800">
                        {articles.map((article, index) => (
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

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        basePath="/blog"
                    />
                </>
            )}
        </div>
    );
}


