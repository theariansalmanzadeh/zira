import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const NewWasteItem = dynamic(
    () =>
        import(
            '@/src/routes/inventoryManagment/newWasteItem/NewWasteItem'
        ),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function NewWastePage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <section className='max-w-[900px] mx-auto'>
                <NewWasteItem />
            </section>
        </Suspense>
    )
}
