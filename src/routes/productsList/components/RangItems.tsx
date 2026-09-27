'use client'

import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { Slider } from '@/src/shared/components/ui/Slider'
import { formatFaNumber } from '@/src/shared/libs/formatter'

const MIN_PRICE = 100_000
const MAX_PRICE = 100_000_000

type RangItemsProps = {
    onBack: () => void
}

const PriceLabel = ({ value }: { value: number }) => (
    <span className='inline-flex items-center gap-1 text-label-md text-outline'>
        {formatFaNumber(value)}
        <Icon label='currency' className='size-4' />
    </span>
)

const parsePriceParam = (value: string | null): [number, number] => {
    const [min, max] = (value ?? '').split('-').map(Number)
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
        return [MIN_PRICE, MAX_PRICE]
    }
    return [min, max]
}

const RangItems = ({ onBack }: RangItemsProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [range, setRange] = useState<[number, number]>(() =>
        parsePriceParam(searchParams.get('price'))
    )

    const replacePrice = (next: [number, number] | null) => {
        const params = new URLSearchParams(searchParams.toString())
        if (!next || (next[0] === MIN_PRICE && next[1] === MAX_PRICE)) {
            params.delete('price')
        } else {
            params.set('price', `${next[0]}-${next[1]}`)
        }
        const queryString = params.toString()
        router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
            scroll: false,
        })
    }

    const applyFilter = () => {
        replacePrice(range)
    }

    const clearFilter = () => {
        setRange([MIN_PRICE, MAX_PRICE])
        replacePrice(null)
    }

    return (
        <div className='flex flex-col gap-8' dir='rtl'>
            <div className='relative flex items-center justify-center py-2'>
                <button
                    type='button'
                    aria-label='بازگشت'
                    className='absolute right-0 inline-flex size-8 items-center justify-center'
                    onClick={onBack}
                >
                    <Icon label='chevronRight400Linear' className='size-6 text-on-surface' />
                </button>
                <span className='text-title-md font-medium text-on-surface'>محدوده قیمت</span>
            </div>
            <p className='text-center text-label-lg text-on-surface'>
                بازه ی قیمت مورد نظر خود را تعیین کنید.
            </p>
            <div className='flex flex-col gap-3 px-2' dir='ltr'>
                <Slider
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={100_000}
                    value={range}
                    onValueChange={(value) => setRange([value[0], value[1]])}
                    className='[&_[data-slot=slider-track]]:h-1.5 [&_[data-slot=slider-track]]:bg-surface-container-high [&_[data-slot=slider-range]]:!h-1.5 [&_[data-slot=slider-range]]:bg-primary [&_[data-slot=slider-thumb]]:size-6 [&_[data-slot=slider-thumb]]:border-outline-variant'
                />
                <div className='flex items-center justify-between'>
                    <PriceLabel value={range[0]} />
                    <PriceLabel value={range[1]} />
                </div>
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

export default RangItems
