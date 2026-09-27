'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { Checkbox } from '@/src/shared/components/ui/Checkbox'
import { Input } from '@/src/shared/components/ui/Input'

export type FilterQueryKey = 'size' | 'color' | 'brand' | 'price' | 'category'

type SelectableItem = {
    id: string
    label: string
}

type SelectableItemsProps = {
    title: string
    hint: string
    searchPlaceholder: string
    items: SelectableItem[]
    queryKey: Exclude<FilterQueryKey, 'price'>
    onBack: () => void
}

const SelectableItems = ({
    title,
    hint,
    searchPlaceholder,
    items,
    queryKey,
    onBack,
}: SelectableItemsProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState<string[]>(() =>
        searchParams.getAll(queryKey)
    )
    const visibleItems = items.filter((item) => item.label.includes(query.trim()))

    useEffect(() => {
        setSelected(searchParams.getAll(queryKey))
    }, [queryKey, searchParams])

    const replaceQuery = (next: string[]) => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete(queryKey)
        next.forEach((value) => params.append(queryKey, value))
        const queryString = params.toString()
        router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
            scroll: false,
        })
    }

    const toggle = (id: string) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        )
    }

    const applyFilter = () => {
        replaceQuery(selected)
    }

    const clearFilter = () => {
        setSelected([])
        replaceQuery([])
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
            <div className='flex flex-col gap-1 h-159.25 overflow-y-auto'>
                {visibleItems.map((item) => (
                    <label
                        key={item.id}
                        className='flex cursor-pointer items-center justify-start py-3'
                    >
                        <Checkbox
                            checked={selected.includes(item.id)}
                            onCheckedChange={() => toggle(item.id)}
                            variant='default-outline'
                            className='size-5 rounded-md '
                        />
                        <span className='text-label-lg text-on-surface'>{item.label}</span>
                    </label>
                ))}
            </div>
            <div className='flex items-center gap-2'>
                <Button
                    type='button'
                    variant='primary'
                    className='h-10 flex-1'
                    onClick={applyFilter}
                >
                    اعمال فیلتر
                </Button>
                <Button
                    type='button'
                    variant='outline'
                    className='h-10 flex-1'
                    onClick={clearFilter}
                >
                    پاک کردن
                </Button>
            </div>
        </div>
    )
}

export default SelectableItems
