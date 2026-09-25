'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { Pill, PillVariants } from '@/src/shared/components/ui/Pill'
import type { IconLabel } from '@/src/shared/types/icon'
import type { VariantProps } from 'class-variance-authority'

export type ProductTag = {
    id: string
    label: string
    variant?: VariantProps<typeof PillVariants>['variant']
    icon?: IconLabel
}

const Tags = ({ tags }: { tags: ProductTag[] }) => (
    <div className='flex flex-col gap-3' dir='rtl'>
        <div className='flex items-center gap-2'>
            <Icon label='tag400Linear' className='size-5 text-error' />
            <span className='text-title-md font-medium text-on-surface'>
                برچسب‌ها و مشخصات خاص
            </span>
        </div>
        <div className='flex flex-wrap items-center gap-2'>
            {tags.map((tag) => (
                <Pill
                    key={tag.id}
                    variant={tag.variant ?? 'tonal'}
                    text={tag.label}
                    icon={tag.icon}
                    hasDot={!tag.variant}
                    className='border-0 px-3 py-1.5'
                />
            ))}
        </div>
    </div>
)

export default Tags
