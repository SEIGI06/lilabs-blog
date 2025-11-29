import { NextResponse } from 'next/server';
import { getAllTags } from '@/lib/data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        const tags = await getAllTags();

        return NextResponse.json({
            tags,
            count: tags.length
        });
    } catch (error) {
        console.error('Tags API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch tags', tags: [], count: 0 },
            { status: 500 }
        );
    }
}
