'use client'

import { Checkbox } from '@/src/shared/components/ui/Checkbox'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import type { SelectRoleItem } from '../types'

type ItemRowProps = {
    role: SelectRoleItem
    checked: boolean
    onCheckedChange: (checked: boolean) => void
}

const ItemRow = ({ role, checked, onCheckedChange }: ItemRowProps) => {
    return (
        <button
            type='button'
            onClick={() => onCheckedChange(!checked)}
            className='flex w-full items-center justify-between gap-3 rounded-card-md border border-outline-variant bg-surface-container-lowest px-3 py-3 text-right transition-colors hover:bg-surface-container-low'
            dir='rtl'
        >
            <div className='flex min-w-0 flex-1 items-start gap-3'>
                <Checkbox
                    checked={checked}
                    onCheckedChange={(value) => onCheckedChange(value === true)}
                    onClick={(event) => event.stopPropagation()}
                    className='mt-0.5 size-5! rounded-full!'
                    variant='primary-outline'
                />
                <div className='flex min-w-0 flex-col gap-0.5'>
                    <div className='flex flex-wrap items-center gap-2'>
                        <span className='text-label-lg font-semibold text-on-surface'>
                            {role.name}
                        </span>
                        <span className='text-label-md text-outline' dir='ltr'>
                            {role.slug}
                        </span>
                    </div>
                    <span className='text-label-md text-outline'>
                        {role.category}
                    </span>
                </div>
            </div>
            <span className='shrink-0 rounded-full bg-info-container px-2.5 py-1 text-label-md text-on-info-container'>
                {formatFaNumber(role.memberCount)} عضو
            </span>
        </button>
    )
}

export default ItemRow
