'use client'

import { Suspense, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { BlogPostListOut } from '@/src/api/types/admin/cms/blog'
import {
    useListBlogCategories,
    useListPosts,
} from '@/src/routes/contentManagment/hooks/blog'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import { TABLE_COLOUMN, type BlogRowData } from './constants'

const toBlogRow = (item: BlogPostListOut): BlogRowData => ({
    id: item.id,
    code: item.article_code,
    title: item.title,
    subject: item.subject,
    author: item.author_name,
    source: item.source,
    createdAt: item.created_at,
    category: item.category_id ?? '',
    categories: item.category_name ? [item.category_name] : [],
    summary: '',
    content: '',
    views: item.view_count,
})

const BlogContent = () => {
    const { push } = useRouter()
    const searchParams = useSearchParams()
    const activeCategory = searchParams.get('cat') ?? 'all'
    const { data: categoryPage } = useListBlogCategories()
    const { data: postsPage } = useListPosts(
        activeCategory !== 'all' ? { category_id: activeCategory } : undefined
    )
    const [expandedId, setExpandedId] = useState<string | null>(null)
    const toggleButtonValue = useMemo(
        () => [
            { label: 'همه', value: 'all' },
            ...(categoryPage?.results ?? []).map((category) => ({
                label: category.name,
                value: category.id,
            })),
        ],
        [categoryPage]
    )
    const items = useMemo(
        () => (postsPage?.results ?? []).map(toBlogRow),
        [postsPage]
    )

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value="all"
                toggleButtonValue={toggleButtonValue}
                hasHeaderActions
                searchPlaceholder="جستجوی مقاله…"
            >
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    <Table className="border-collapse border-spacing-y-4">
                        <TableHeader />
                        <TableBody>
                            {items.map((item) => (
                                <TableRow
                                    key={item.id}
                                    data={item}
                                    isExpanded={expandedId === item.id}
                                    onToggleExpand={() =>
                                        setExpandedId((prev) =>
                                            prev === item.id ? null : item.id
                                        )
                                    }
                                    onEdit={() =>
                                        push(
                                            `/admin/content-managment/blog/edit?id=${item.id}`
                                        )
                                    }
                                />
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    className="mt-2"
                    totalAmount={postsPage?.total ?? items.length}
                />
            </TableListLayout>
        </div>
    )
}

const Blog = () => (
    <Suspense fallback={null}>
        <BlogContent />
    </Suspense>
)

export default Blog
