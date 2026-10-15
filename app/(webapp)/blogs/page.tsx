import { listPublicBlogPosts } from '@/src/api/public/cms'
import Blogs from '@/src/routes/blogs/Blogs'

export default async function BlogsPage() {
    const result = await listPublicBlogPosts({ page: 1, page_size: 20 })

    return <Blogs posts={result.success ? result.data.results : []} />
}
