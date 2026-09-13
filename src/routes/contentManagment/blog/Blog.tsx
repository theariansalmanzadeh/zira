'use client'

import { Suspense, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import {
    BLOG_DUMMY,
    BLOG_TOGGLE_BUTTON_VALUE,
    TABLE_COLOUMN,
    filterBlogs,
    type BlogCategoryId,
    type BlogRowData,
} from './constants'

const BlogContent = () => {
    const { push } = useRouter()
    const searchParams = useSearchParams()
    const activeCategory = (searchParams.get('cat') ?? 'all') as
        | BlogCategoryId
        | string
    const [items, setItems] = useState<BlogRowData[]>(BLOG_DUMMY)
    const [expandedId, setExpandedId] = useState<string | null>(null)

    const filteredItems = useMemo(
        () => filterBlogs(items, activeCategory),
        [items, activeCategory]
    )

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id))
        if (expandedId === id) setExpandedId(null)
    }

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value="all"
                toggleButtonValue={[...BLOG_TOGGLE_BUTTON_VALUE]}
                hasHeaderActions
                searchPlaceholder="جستجوی مقاله…"
            >
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    <Table className="border-collapse border-spacing-y-4">
                        <TableHeader />
                        <TableBody>
                            {filteredItems.map((item) => (
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
                                            '/admin/content-managment/blog/edit'
                                        )
                                    }
                                    onDelete={() => removeItem(item.id)}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    className="mt-2"
                    totalAmount={filteredItems.length}
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
