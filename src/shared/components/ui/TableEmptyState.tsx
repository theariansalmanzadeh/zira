import type { ReactNode } from 'react'
import { Ghost } from 'lucide-react'
import { cn } from '@shared/libs/utils'

type TableEmptyStateProps = {
    title: ReactNode
    colSpan?: number
    className?: string
}

const TableEmptyState = ({ title, colSpan, className }: TableEmptyStateProps) => {
    const content = (
        <div
            className={cn(
                'flex flex-col items-center justify-center gap-3 py-10',
                className
            )}
        >
            <Ghost className='size-12 text-outline' strokeWidth={1.25} />
            <p className='text-label-md text-outline'>{title}</p>
        </div>
    )

    if (!colSpan) return content

    return (
        <tr>
            <td colSpan={colSpan}>{content}</td>
        </tr>
    )
}

export default TableEmptyState
