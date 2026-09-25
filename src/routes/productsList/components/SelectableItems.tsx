'use client'

import { useState } from 'react'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Checkbox } from '@/src/shared/components/ui/Checkbox'
import { Input } from '@/src/shared/components/ui/Input'

type SelectableItem = {
    id: string
    label: string
}

type SelectableItemsProps = {
    title: string
    hint: string
    searchPlaceholder: string
    items: SelectableItem[]
    onBack: () => void
}

const SelectableItems = ({
    title,
    hint,
    searchPlaceholder,
    items,
    onBack,
}: SelectableItemsProps) => {
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState<string[]>([])
    const visibleItems = items.filter((item) => item.label.includes(query.trim()))

    const toggle = (id: string) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        )
    }

    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <div className='relative flex items-center justify-center py-2'>
                <button
                    type='button'
                    aria-label='بازگشت'
                    className='absolute right-0 inline-flex size-8 items-center justify-center'
                    onClick={onBack}
                >
                    <Icon label='chevronRight400Linear' className='size-6 text-on-surface' />
                </button>
                <span className='text-title-md font-medium text-on-surface'>{title}</span>
            </div>
            <p className='text-label-md text-outline'>{hint}</p>
            <Input
                value={query}
                onChange={setQuery}
                placeholder={searchPlaceholder}
                iconId='search400Linear'
                iconClassName='size-5 text-outline'
            />
            <div className='flex flex-col gap-1'>
                {visibleItems.map((item) => (
                    <label
                        key={item.id}
                        className='flex cursor-pointer items-center justify-between py-3'
                    >
                        <span className='text-label-lg text-on-surface'>{item.label}</span>
                        <Checkbox
                            checked={selected.includes(item.id)}
                            onCheckedChange={() => toggle(item.id)}
                            variant='default-outline'
                            className='size-5 rounded-md'
                        />
                    </label>
                ))}
            </div>
        </div>
    )
}

export default SelectableItems
