import { getPostsPaginated, getTotalPostsCount } from '@/lib/data';
import { Metadata } from 'next';
import { SearchBar } from '@/components/SearchBar';
import { BlogContent } from '@/components/BlogContent';

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
                        {totalCount} article{totalCount > 1 ? 's' : ''}
                    </p>
                )}
            </div>

            {/* Search Bar */}
            <div className="mb-8">
                <SearchBar />
            </div>

            {/* Blog Content with Tag Filtering */}
            <BlogContent
                initialArticles={articles}
                totalCount={totalCount}
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </div>
    );
}


