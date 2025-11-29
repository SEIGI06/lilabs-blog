import { NextResponse } from 'next/server';
import { getPostsByTag } from '@/lib/data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const tag = searchParams.get('tag');

        if (!tag) {
            return NextResponse.json({
                articles: [],
                count: 0,
                error: 'Tag parameter is required'
            }, { status: 400 });
        }

        const articles = await getPostsByTag(tag);

        return NextResponse.json({
            articles,
            count: articles.length,
            tag
        });
    } catch (error) {
        console.error('Posts by tag API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch posts', articles: [], count: 0 },
            { status: 500 }
        );
    }
}
