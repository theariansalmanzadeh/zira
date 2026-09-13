import { cn } from '@shared/libs/utils'

export type BoxStatus = 'success' | 'warning' | 'default'

const BOX_STATUS_CLASS: Record<BoxStatus, string> = {
    success: 'bg-success-container text-on-success-container',
    warning: 'bg-warning-container text-on-warning-container',
    default: 'bg-surface-container-high text-on-surface',
}

type BoxProps = {
    status?: BoxStatus
    label: string
    className?: string
}

export const Box = ({ status = 'default', label, className }: BoxProps) => {
    return (
        <div
            className={cn(
                'flex h-[24px] w-[135px] items-center justify-center rounded-card-sm text-label-sm leading-none',
                BOX_STATUS_CLASS[status],
                className
            )}
        >
            {label}
        </div>
    )
}

export type ShelfBox = {
    id?: string
    label: string
    status?: BoxStatus
}

type ShelfProps = {
    title: string
    boxes: ShelfBox[]
    className?: string
}

const Shelf = ({ title, boxes, className }: ShelfProps) => {
    return (
        <div
            dir="rtl"
            className={cn(
                'flex w-fit flex-col gap-3 rounded-card-lg bg-surface-container-lowest p-3',
                className
            )}
        >
            <span className="text-label-md text-on-surface">{title}</span>
            <div className="grid grid-cols-4 gap-2">
                {boxes.map((box, index) => (
                    <Box
                        key={box.id ?? index}
                        label={box.label}
                        status={box.status}
                    />
                ))}
            </div>
        </div>
    )
}

export default Shelf
