import { NextResponse } from 'next/server';
import { searchPosts } from '@/lib/data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q') || '';

        if (!query || query.trim().length < 2) {
            return NextResponse.json({
                results: [],
                count: 0
            });
        }

        const results = await searchPosts(query);

        return NextResponse.json({
            results,
            count: results.length,
            query
        });
    } catch (error) {
        console.error('Search API error:', error);
        return NextResponse.json(
            { error: 'Search failed', results: [], count: 0 },
            { status: 500 }
        );
    }
}
