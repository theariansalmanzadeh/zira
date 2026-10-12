import { Suspense } from 'react'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import CategoriesPageContent from './CategoriesPageContent'

export default function CategoriesPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <CategoriesPageContent />
        </Suspense>
    )
}
