import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { getPublicBlogPost } from '@/src/api/public/cms'
import Blog from '@/src/routes/blog/Blog'
import { buildMetadata, SITE_NAME } from '@/src/shared/constants/seo'

type BlogPageProps = {
    params: Promise<{ id: string }>
}

const loadPublicBlogPost = cache(async (slug: string) => {
    const result = await getPublicBlogPost(slug)
    return result.success ? result.data : null
})

export async function generateMetadata({
    params,
}: BlogPageProps): Promise<Metadata> {
    const { id } = await params
    const post = await loadPublicBlogPost(id)

    if (!post) {
        return buildMetadata({
            title: 'بلاگ',
            description: `مطلب بلاگ در ${SITE_NAME}`,
            path: `/blog/${id}`,
            type: 'article',
        })
    }

    return buildMetadata({
        title: post.meta_title || post.title,
        description: post.meta_description || post.summary,
        path: `/blog/${post.slug}`,
        images: post.cover_url ? [post.cover_url] : undefined,
        type: 'article',
    })
}

export default async function BlogPage({ params }: BlogPageProps) {
    const { id } = await params
    const post = await loadPublicBlogPost(id)

    if (!post) notFound()

    return <Blog post={post} />
}
