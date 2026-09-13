import PlpSkeleton from '@/src/shared/components/loading/PlpSkeleton'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

export default function TempSkeletonsPage() {
    return (
        <div className="flex w-full flex-col gap-10 p-lg" dir="rtl">
            <section className="flex flex-col gap-4">
                <h2 className="text-title-lg font-medium text-on-surface">
                    PlpSkeleton
                </h2>
                <PlpSkeleton />
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-title-lg font-medium text-on-surface">
                    TableLoadingSkeleton
                </h2>
                <TableLoadingSkeleton isPending />
            </section>
        </div>
    )
}
