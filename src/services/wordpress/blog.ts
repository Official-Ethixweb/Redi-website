import type { BlogPost } from '@/types/wordpress';
import seed from '@/content/seed/blog-posts.json';
import { wpFetch } from './client';

export interface BlogQuery {
  search?: string;
  tag?: string;
  sort?: 'recent' | 'oldest';
  page?: number;
  perPage?: number;
}

async function getAllPosts(): Promise<BlogPost[]> {
  const remote = await wpFetch<BlogPost[]>('/wp-json/wp/v2/posts?_embed');
  return remote ?? (seed as BlogPost[]);
}

export async function getBlogPosts(query: BlogQuery = {}) {
  const { search = '', tag, sort = 'recent', page = 1, perPage = 6 } = query;
  let posts = await getAllPosts();

  if (search.trim()) {
    const q = search.trim().toLowerCase();
    posts = posts.filter(
      (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q),
    );
  }

  if (tag) {
    posts = posts.filter((p) => p.tags.includes(tag));
  }

  posts = [...posts].sort((a, b) => {
    const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
    return sort === 'recent' ? -diff : diff;
  });

  const total = posts.length;
  const start = (page - 1) * perPage;
  const items = posts.slice(start, start + perPage);

  return { items, total, page, perPage, totalPages: Math.max(1, Math.ceil(total / perPage)) };
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug);
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
}
