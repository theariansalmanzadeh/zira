'use client'

import { useState } from 'react'
import { Icon } from '@/src/shared/components/Icons/Icon'
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

const RangItems = ({ onBack }: RangItemsProps) => {
    const [range, setRange] = useState([MIN_PRICE, MAX_PRICE])

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
                    onValueChange={setRange}
                    className='[&_[data-slot=slider-track]]:h-1.5 [&_[data-slot=slider-track]]:bg-surface-container-high [&_[data-slot=slider-range]]:!h-1.5 [&_[data-slot=slider-range]]:bg-primary [&_[data-slot=slider-thumb]]:size-6 [&_[data-slot=slider-thumb]]:border-outline-variant'
                />
                <div className='flex items-center justify-between'>
                    <PriceLabel value={range[0]} />
                    <PriceLabel value={range[1]} />
                </div>
            </div>
        </div>
    )
}

export default RangItems
