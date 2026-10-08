import { cn } from '@shared/libs/utils'
import { Icon } from '../Icons/Icon'
import { PillVariants } from './Pill'

type ColorPillProps = {
    hex: string
    label: string
    className?: string
    onClose?: () => void
}

const ColorPill = ({ hex, label, className, onClose }: ColorPillProps) => {
    return (
        <div className={cn(PillVariants({ variant: 'tonal' }), 'gap-xs', className)}>
            <span
                className='size-4 rounded-md border border-outline-variant'
                style={{ backgroundColor: hex }}
            />
            <span className='text-nowrap font-regular'>{label}</span>
            {onClose && (
                <button
                    type='button'
                    aria-label='بستن'
                    onClick={(event) => {
                        event.stopPropagation()
                        onClose()
                    }}
                    className='inline-flex size-4! shrink-0 cursor-pointer items-center justify-center rounded-full'
                >
                    <Icon label='closeSm400Linear' className='size-4! text-on-surface' />
                </button>
            )}
        </div>
    )
}

export default ColorPill
