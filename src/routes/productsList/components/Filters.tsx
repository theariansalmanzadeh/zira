'use client'

import { useState } from 'react'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/src/shared/components/ui/Sheet'
import RangItems from './RangItems'
import SelectableItems from './SelectableItems'
import { DialogClose } from '@/src/shared/components/ui/Dialog'

const FILTER_ITEMS = [
    { id: 'brand', label: 'برند', value: 'زرین پال، لورنزو' },
    { id: 'color', label: 'طیف رنگ', value: 'زرد، سبز، آبی' },
    { id: 'size', label: 'سایز', value: 'M، L، XL' },
    { id: 'price', label: 'محدوده قیمت', value: '۵۰۰٬۰۰۰ تا ۲٬۰۰۰٬۰۰۰' },
    { id: 'category', label: 'دسته‌بندی', value: 'پوشاک زنانه، لباس خواب' },
]

const SELECTABLE_OPTIONS: Record<string, { hint: string; searchPlaceholder: string; items: { id: string; label: string }[] }> = {
    brand: {
        hint: 'حداقل یک برند انتخاب کنید.',
        searchPlaceholder: 'برند را جستجو کنید',
        items: [
            { id: 'zarinpal', label: 'زرین پال' },
            { id: 'lorenzo', label: 'لورنزو' },
            { id: 'nike', label: 'نایک' },
            { id: 'adidas', label: 'آدیداس' },
        ],
    },
    color: {
        hint: 'حداقل یک رنگ انتخاب کنید.',
        searchPlaceholder: 'رنگ را جستجو کنید',
        items: [
            { id: 'yellow', label: 'زرد' },
            { id: 'green', label: 'سبز' },
            { id: 'blue', label: 'آبی' },
            { id: 'red', label: 'قرمز' },
        ],
    },
    size: {
        hint: 'حداقل یک سایز انتخاب کنید.',
        searchPlaceholder: 'سایز را جستجو کنید',
        items: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '۳۶', '۳۸', '۴۰', '۴۲'].map((label) => ({
            id: label,
            label,
        })),
    },
    category: {
        hint: 'حداقل یک دسته‌بندی انتخاب کنید.',
        searchPlaceholder: 'دسته‌بندی را جستجو کنید',
        items: [
            { id: 'women', label: 'پوشاک زنانه' },
            { id: 'sleep', label: 'لباس خواب' },
            { id: 'men', label: 'پوشاک مردانه' },
            { id: 'kids', label: 'پوشاک کودک' },
        ],
    },
}

const FilterRows = ({ onSelect }: { onSelect: (id: string) => void }) => (
    <div className='flex flex-col cursor-pointer' dir='rtl'>
        {FILTER_ITEMS.map((item) => (
            <button
                key={item.id}
                type='button'
                onClick={() => onSelect(item.id)}
                className='flex items-center justify-between gap-3 border-b border-outline-variant py-4 text-right'
            >
                <div className='flex flex-col gap-1'>
                    <span className='text-title-md text-on-surface'>{item.label}</span>
                    {item.value && (
                        <span className='text-label-md text-outline'>{item.value}</span>
                    )}
                </div>
                <Icon label='chevronLeft300Linear' className='size-5 shrink-0 text-on-surface-variant' />
            </button>
        ))}
    </div>
)

const FilterHeader = ({ onClose }: { onClose?: () => void }) => (
    <div className='relative flex items-center justify-center py-4' dir='rtl'>
        <span className='text-title-md font-medium text-on-surface'>فیلترها</span>
        {onClose ? (
            <button
                type='button'
                aria-label='بستن'
                className='absolute left-0 inline-flex size-8 items-center justify-center'
                onClick={onClose}
            >
                <Icon label='closeSm400Linear' className='size-6 text-on-surface' />
            </button>
        ) : (
            <DialogClose className='absolute left-0 inline-flex size-8 items-center justify-center'>
                <Icon label='closeSm400Linear' className='size-6 text-on-surface' />
            </DialogClose>
        )}
    </div>
)

const FilterTrigger = (
    <Button
        variant='outline'
        className='flex flex-row-reverse items-center justify-center gap-sm text-on-surface-variant'
    >
        فیلتر ها
        <Icon label='tune400Linear' className='size-4' />
    </Button>
)

const Filters = () => {
    const [open, setOpen] = useState(false)
    const [activeId, setActiveId] = useState<string | null>(null)
    const selectable = activeId ? SELECTABLE_OPTIONS[activeId] : undefined
    const activeLabel = FILTER_ITEMS.find((item) => item.id === activeId)?.label ?? ''

    const handleOpenChange = (next: boolean) => {
        setOpen(next)
        if (!next) setActiveId(null)
    }

    const panel = activeId === 'price' ? (
        <RangItems onBack={() => setActiveId(null)} />
    ) : selectable ? (
        <SelectableItems
            title={activeLabel}
            hint={selectable.hint}
            searchPlaceholder={selectable.searchPlaceholder}
            items={selectable.items}
            onBack={() => setActiveId(null)}
        />
    ) : (
        <>
            <FilterHeader onClose={() => setOpen(false)} />
            <FilterRows onSelect={setActiveId} />
        </>
    )

    return (
        <>
            <div className='hidden sm:block w-full'>
                <Sheet open={open} onOpenChange={handleOpenChange}>
                    <SheetTrigger asChild>{FilterTrigger}</SheetTrigger>
                    <SheetContent
                        side='right'
                        className='w-full overflow-y-auto bg-surface-container-lowest px-5 [&>button]:hidden sm:w-[560px] sm:max-w-[560px] sm:px-20'
                    >
                        {panel}
                    </SheetContent>
                </Sheet>
            </div>
            {/* <div className='block sm:hidden w-full'>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>{FilterTrigger}</DialogTrigger>
                    <DialogContent
                        showCloseButton={false}
                        className='px-5 block sm:hidden w-full sm:max-w-none sm:w-[560px] sm:px-20'
                        dir='rtl'
                    >
                        <DialogTitle className='sr-only'>فیلترها</DialogTitle>
                        <FilterHeader />
                        <FilterRows />
                    </DialogContent>
                </Dialog>
            </div> */}

        </>
    )
}

export default Filters
