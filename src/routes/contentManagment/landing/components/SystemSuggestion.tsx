'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/src/shared/components/ui/Accordion'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import { cn } from '@/src/shared/libs/utils'

type SuggestionItem = {
    id: string
    title: string
    addedDaysAgo: number
    price: number
    thumbClassName: string
}

const SUGGESTION_ITEMS: SuggestionItem[] = [
    {
        id: '1',
        title: 'ست راحتی پسرانه',
        addedDaysAgo: 6,
        price: 258000,
        thumbClassName: 'bg-[#C5D4B8]',
    },
    {
        id: '2',
        title: 'ست راحتی مردانه دو تکه',
        addedDaysAgo: 7,
        price: 468000,
        thumbClassName: 'bg-[#D4C8E0]',
    },
    {
        id: '3',
        title: 'شورت زنانه نخی',
        addedDaysAgo: 8,
        price: 168000,
        thumbClassName: 'bg-[#E5C4A8]',
    },
    {
        id: '4',
        title: 'زیرپوش آستین‌دار پنبه',
        addedDaysAgo: 9,
        price: 176000,
        thumbClassName: 'bg-[#B8D4D0]',
    },
    {
        id: '5',
        title: 'بوکسر مردانه نخی',
        addedDaysAgo: 11,
        price: 224000,
        thumbClassName: 'bg-[#E0C0C8]',
    },
]

type SystemSuggestionProps = {
    className?: string
    items?: SuggestionItem[]
}

const SystemSuggestion = ({
    className,
    items = SUGGESTION_ITEMS,
}: SystemSuggestionProps) => {
    const onAddAll = () => {
        console.log('add all')
    }
    const onAddItem = (id: string) => {
        console.log('add item', id)
    }
    return (
        <Accordion
            type='single'
            collapsible
            defaultValue='system-suggestion'
            className={cn(
                'overflow-hidden rounded-card-lg border border-outline-variant bg-surface-container-lowest w-full',
                className
            )}
            dir='rtl'
        >
            <AccordionItem value='system-suggestion' className='border-0'>
                <div className='flex flex-row items-center gap-3 border-b border-outline-variant px-4 py-3'>
                    <AccordionTrigger
                        iconType='chevronDown400Linear'
                        className='flex-1 justify-between gap-3 py-0 text-right hover:no-underline [&[data-state=open]>svg]:rotate-180'
                    >
                        <div className='flex flex-1 flex-row items-center gap-3'>
                            <div className='flex min-w-0 flex-col gap-0.5 text-right'>
                                <span className='text-title-md font-bold text-on-surface'>
                                    پیشنهاد سیستم
                                </span>
                                <span className='text-label-md text-outline'>
                                    {formatFaNumber(items.length)} کالا بر اساس
                                    تاریخ افزودن به انبار
                                </span>
                            </div>
                        </div>
                        <Button
                            type='button'
                            variant='outline'
                            size='sm'
                            className='shrink-0 border-0 bg-info-container text-info hover:bg-info-container/80'
                            onClick={(event) => {
                                event.stopPropagation()
                                onAddAll?.()
                            }}
                        >
                            افزودن همه
                        </Button>
                    </AccordionTrigger>
                </div>

                <AccordionContent className='px-4 pb-4 pt-3'>
                    <div className='flex flex-col gap-2.5'>
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className='flex flex-row items-center gap-3 rounded-card-md border border-outline-variant bg-surface-container-lowest px-3 py-2.5'
                            >
                                <span
                                    className={cn(
                                        'size-12 shrink-0 rounded-card-sm',
                                        item.thumbClassName
                                    )}
                                />
                                <div className='flex min-w-0 flex-1 flex-col gap-0.5 text-right'>
                                    <span className='truncate text-label-lg font-bold text-on-surface'>
                                        {item.title}
                                    </span>
                                    <span className='text-label-md text-info'>
                                        افزوده شده{' '}
                                        {formatFaNumber(item.addedDaysAgo)} روز
                                        پیش
                                    </span>
                                </div>
                                <span className='shrink-0 text-label-md text-outline'>
                                    {formatPrice(item.price)} تومان
                                </span>
                                <Button
                                    type='button'
                                    variant='ghost'
                                    size='icon'
                                    className='size-9! shrink-0 rounded-card-sm bg-success-container text-success hover:bg-success-container/80'
                                    onClick={() => onAddItem?.(item.id)}
                                >
                                    <Icon
                                        label='addSm400Linear'
                                        className='size-5! text-success'
                                    />
                                </Button>
                            </div>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default SystemSuggestion
