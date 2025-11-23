import { supabase, supabaseUrl, supabaseAnonKey } from './supabase';

export interface Article {
    id: string;
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    content: string;
    tags: string[];
    coverImage?: string;
    author?: string;
}

export async function getPosts(limit?: number): Promise<Article[]> {
    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('Supabase credentials missing, returning empty list');
        return [];
    }

    let query = supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (limit) {
        query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching posts:', error);
        return [];
    }

    return data.map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        date: post.created_at,
        excerpt: post.summary,
        content: post.content,
        tags: post.tags || ['Tech', 'Innovation'],
        coverImage: post.cover_image,
        author: post.author || 'Lilabs Team',
    }));
}

export async function getPostsPaginated(page: number = 1, pageSize: number = 12): Promise<Article[]> {
    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('Supabase credentials missing, returning empty list');
        return [];
    }

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) {
        console.error('Error fetching posts:', error);
        return [];
    }

    return data.map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        date: post.created_at,
        excerpt: post.summary,
        content: post.content,
        tags: post.tags || ['Tech', 'Innovation'],
        coverImage: post.cover_image,
        author: post.author || 'Lilabs Team',
    }));
}

export async function getTotalPostsCount(): Promise<number> {
    if (!supabaseUrl || !supabaseAnonKey) {
        return 0;
    }

    const { count, error } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.error('Error counting posts:', error);
        return 0;
    }

    return count || 0;
}

export async function getPostBySlug(slug: string): Promise<Article | null> {
    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('Supabase credentials missing, returning null');
        return null;
    }

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching post:', error);
        return null;
    }

    return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        date: data.created_at,
        excerpt: data.summary,
        content: data.content,
        tags: data.tags || ['Tech', 'Innovation'],
        coverImage: data.cover_image,
        author: data.author || 'Lilabs Team',
    };
}

