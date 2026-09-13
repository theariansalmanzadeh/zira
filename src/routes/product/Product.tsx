"use client"

import { useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from '@/src/shared/components/ui/ToggleGroup'
import CTA from './components/CTA'
import Details from './components/Details'
import DeliveryInfo from './components/DeliveryInfo'
import Heading from './components/Heading'
import ProductCarousel from './components/ProductCarousel'
import {
    COLOR_ITEMS,
    PRODUCT_DETAILS,
    QUANTITY_ITEMS,
    SIZE_ITEMS,
} from './content/dummy'
import type { PlpProduct } from '@/src/routes/productsList/constants'

const handleToggleChange =
    (setter: (value: string) => void) => (value: string) => {
        if (value) setter(value)
    }

const Product = ({ product }: { product?: PlpProduct }) => {
    const [quantity, setQuantity] = useState(QUANTITY_ITEMS[0].value)
    const [size, setSize] = useState(SIZE_ITEMS[0].value)
    const [color, setColor] = useState(COLOR_ITEMS[0].value)

    return (
        <div className='flex flex-col gap-xl pt-2xl'>
            <div className="flex flex-col md:flex-row justify-between md:gap-10 gap-xl w-full">
                <Heading />
                <div className="basis-1/2 rounded-t-2xl p-lg flex flex-col gap-xl relative -mt-xl">
                    <span className="text-outline">{product?.brand ?? 'برند'}</span>
                    <h2 className="text-title-lg font-bold text-on-surface">{product?.title ?? 'عنوان محصول'}</h2>
                    <div className="flex flex-col gap-3">
                        <span className="text-title-md font-normal text-on-surface-variant">تعداد</span>
                        <ToggleGroup
                            dir='rtl'
                            variant="outline"
                            type="single"
                            className='flex-wrap'
                            value={quantity}
                            onValueChange={handleToggleChange(setQuantity)}
                        >
                            {QUANTITY_ITEMS.map((item) => (
                                <ToggleGroupItem
                                    key={item.value}
                                    className='text-title-md'
                                    value={item.value}
                                    aria-label={item.label}
                                >
                                    {item.label}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-row justify-between items-center">
                            <span className="text-title-md font-normal text-on-surface-variant">سایز</span>
                            <span className="text-body-md text-primary">راهنمای سایز‌بندی</span>
                        </div>
                        <ToggleGroup
                            dir='rtl'
                            variant="outline"
                            type="single"
                            className='flex-wrap'
                            value={size}
                            onValueChange={handleToggleChange(setSize)}
                        >
                            {SIZE_ITEMS.map((item) => (
                                <ToggleGroupItem
                                    key={item.value}
                                    className=' text-title-md'
                                    value={item.value}
                                    aria-label={item.label}
                                >
                                    {item.label}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="text-title-md font-normal text-on-surface-variant">رنگ</span>
                        <ToggleGroup
                            dir='rtl'
                            variant="filled"
                            type="single"
                            className='flex-wrap'
                            value={color}
                            onValueChange={handleToggleChange(setColor)}
                        >
                            {COLOR_ITEMS.map((item) => (
                                <ToggleGroupItem
                                    key={item.value}
                                    className='text-title-md px-1 py-1'
                                    value={item.value}
                                    aria-label={item.label}
                                >
                                    <div className='flex flex-row items-center gap-1'>
                                        <div
                                            className='h-6 w-6 rounded-full'
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <span>{item.label}</span>
                                    </div>
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                    </div>
                    <DeliveryInfo quantity={10} deliveryTime="۳ تا ۵ روز کاری" />
                    <CTA discount={10} price={1343930000} quantity={1} />
                    <Details details={PRODUCT_DETAILS} />
                </div>
            </div>
            <div className='py-[64px]'>
                <ProductCarousel title="محصولات مرتبط" />
            </div>
            <div className='py-[64px]'>
                <ProductCarousel title="محصولات مشابه" />
            </div>
        </div>
    )
}

export default Product
