import { cn } from '@shared/libs/utils'

type DetailRowProps = {
    label: string
    value: React.ReactNode
}

export const DetailRow = ({ label, value }: DetailRowProps) => {
    return (
        <div className='flex flex-row items-center justify-between gap-3'>
            <span className='text-label-md text-outline shrink-0'>{label}</span>
            <div className='text-label-lg text-on-surface text-left'>{value}</div>
        </div>
    )
}

type DetailCardProps = {
    title: string
    children: React.ReactNode
    className?: string
}

export const DetailCard = ({ title, children, className }: DetailCardProps) => {
    return (
        <div className={cn('flex flex-col gap-2', className)}>
            <span className='text-title-md font-medium text-on-surface'>{title}</span>
            <div className='rounded-card-lg bg-surface-container-lowest p-6 flex flex-col gap-3'>
                {children}
            </div>
        </div>
    )
}
