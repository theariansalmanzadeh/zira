type TableLoadingSkeletonProps = {
    rows?: number
    isPending?: boolean
    className?: string
}

const TableLoadingSkeleton = ({
    rows = 8,
    isPending = true,
    className,
}: TableLoadingSkeletonProps) => {
    if (!isPending) return null

    return (
        <div
            className={`flex flex-col gap-2 ${className ?? ''}`}
            aria-busy='true'
            aria-live='polite'
        >
            {Array.from({ length: rows }).map((_, index) => (
                <div
                    key={index}
                    className='flex h-14 w-full animate-pulse items-center gap-3 rounded-card-md bg-surface-container-high px-4'
                >
                    <div className='h-4 w-20 shrink-0 rounded bg-surface-container-highest' />
                    <div className='h-4 w-32 shrink-0 rounded bg-surface-container-highest' />
                    <div className='h-4 flex-1 rounded bg-surface-container-highest' />
                    <div className='h-4 w-24 shrink-0 rounded bg-surface-container-highest' />
                    <div className='h-4 w-16 shrink-0 rounded bg-surface-container-highest' />
                </div>
            ))}
        </div>
    )
}

export default TableLoadingSkeleton
