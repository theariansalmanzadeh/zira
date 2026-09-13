import type { ReactNode } from 'react'
import { cn } from '@shared/libs/utils'

type SectionTitleProps = {
    children: ReactNode
    className?: string
}

const SectionTitle = ({ children, className }: SectionTitleProps) => (
    <div className={cn('mb-4 flex items-center gap-2', className)}>
        <span className='h-4 w-1 shrink-0 rounded-full bg-primary' />
        <h3 className='text-title-md font-bold text-on-surface'>{children}</h3>
    </div>
)

export default SectionTitle
