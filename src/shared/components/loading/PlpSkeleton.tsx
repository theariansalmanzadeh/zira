type PlpSkeletonProps = {
    count?: number
    className?: string
}

const PlpSkeleton = ({ count = 8, className }: PlpSkeletonProps) => {
    return (
        <div
            className={`grid grid-cols-4 gap-3 md:gap-10 ${className ?? ''}`}
            aria-busy="true"
            aria-live="polite"
        >
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="h-[464px] w-[288px] animate-pulse rounded-card-lg bg-surface-container-high"
                />
            ))}
        </div>
    )
}

export default PlpSkeleton
