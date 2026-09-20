'use client'

const EventsPlaceholder = ({ title }: { title: string }) => {
    return (
        <div
            className='flex min-h-48 items-center justify-center rounded-card-lg bg-surface-container-lowest p-6 text-label-lg text-outline'
            dir='rtl'
        >
            {title} — به‌زودی
        </div>
    )
}

export default EventsPlaceholder
