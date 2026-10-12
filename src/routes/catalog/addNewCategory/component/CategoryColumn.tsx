'use client'

import { useState } from 'react'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Input } from '@/src/shared/components/ui/Input'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import type { CategoryItem } from '../provider/createCategoryProvider'

type CategoryColumnProps = {
    indexLabel: string
    title: string
    count: number
    items: CategoryItem[]
    selectedId: string | null
    placeholder: string
    emptyMessage?: string
    canAdd: boolean
    onSelect: (id: string) => void
    onAdd: (title: string) => void
    onRemove: (id: string) => void
}

const CategoryColumn = ({
    indexLabel,
    title,
    count,
    items,
    selectedId,
    placeholder,
    emptyMessage,
    canAdd,
    onSelect,
    onAdd,
    onRemove,
}: CategoryColumnProps) => {
    const [draft, setDraft] = useState('')
    const trimmed = draft.trim()

    const submit = () => {
        if (!canAdd || !trimmed) return
        onAdd(trimmed)
        setDraft('')
    }

    return (
        <section className='flex min-h-80 flex-col gap-3 rounded-card-lg border border-outline-variant bg-surface-container-lowest p-4'>
            <div className='flex items-center justify-between gap-2'>
                <h3 className='text-title-md font-bold text-on-surface'>
                    {indexLabel}. {title}
                </h3>
                <span className='rounded-full bg-surface-container-high px-2.5 py-1 text-label-sm text-on-surface-variant'>
                    {formatFaNumber(count)} دسته
                </span>
            </div>
            <div className='flex w-full items-center gap-2'>
                <div className='min-w-0 flex-1'>
                    <Input
                        value={draft}
                        placeholder={placeholder}
                        className='w-full'
                        wrapperClassName='w-full bg-surface-container-lowest border border-outline-variant'
                        onChange={setDraft}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') submit()
                        }}
                    />
                </div>
                <IconButton
                    icon='addSm400Linear'
                    variant='primary'
                    className='shrink-0'
                    iconClassName='text-on-primary'
                    disabled={!canAdd || !trimmed}
                    onClick={submit}
                />
            </div>
            {emptyMessage ? (
                <p className='flex flex-1 items-center justify-center px-4 text-center text-body-md text-outline'>
                    {emptyMessage}
                </p>
            ) : (
                <div className='flex flex-col gap-2'>
                    {items.map((item) => {
                        const selected = item.id === selectedId

                        return (
                            <div
                                key={item.id}
                                role='button'
                                tabIndex={0}
                                onClick={() => onSelect(item.id)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') onSelect(item.id)
                                }}
                                className={cn(
                                    'flex cursor-pointer items-center justify-between gap-3 rounded-card-md border border-outline-variant px-3 py-3',
                                    selected && 'border-error/30 bg-error-container'
                                )}
                            >
                                <div className='flex min-w-0 flex-col gap-1 text-start'>
                                    <span
                                        className={cn(
                                            'truncate text-label-lg font-semibold text-on-surface',
                                            selected && 'text-error'
                                        )}
                                    >
                                        {item.title}
                                    </span>
                                    <span className='text-label-sm text-outline'>
                                        {item.detail}
                                    </span>
                                </div>
                                <div className='flex shrink-0 items-center gap-1'>
                                    <span onClick={(event) => event.stopPropagation()}>
                                        <IconButton
                                            icon='edit400Linear'
                                            variant='ghost'
                                            iconClassName='size-4! text-on-surface-variant'
                                            className='size-4! bg-transparent'
                                        />
                                    </span>
                                    <span onClick={(event) => event.stopPropagation()}>
                                        <IconButton
                                            icon='delete400Linear'
                                            variant='ghost'
                                            iconClassName='size-4! text-on-surface-variant'
                                            className='size-4! bg-transparent'
                                            onClick={() => onRemove(item.id)}
                                        />
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </section>
    )
}

export default CategoryColumn
