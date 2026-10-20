'use client'

import { Badge } from '@/src/shared/components/ui/Badge'
import ColorPill from '@/src/shared/components/ui/ColorPill'
import SectionTitle from '@/src/shared/components/ui/SectionTitle'
import { cn } from '@shared/libs/utils'
import type {
    ColorOption,
    SpecField,
    SpecificationsProps,
} from '../types'

export type { ColorOption, SpecField, SpecificationsProps }

export const COLORS_DUMMY: ColorOption[] = [
    { label: 'مشکی', color: '#1A1A1A' },
    { label: 'کرم', color: '#E8D5C4' },
    { label: 'گلبهی', color: '#E8A0A0' },
]

export const SIZES_DUMMY = ['۷۵B', '۸۰B', '۸۰C']

export const SALE_UNITS_DUMMY = ['عددی', 'پک ۶ عددی']

export const TECH_SPECS_DUMMY: SpecField[] = [
    { label: 'جنس', value: 'نخ پنبه' },
    { label: 'مدل', value: 'لوسی' },
    { label: 'فصل کاربرد', value: 'چهارفصل' },
    { label: 'کشور سازنده', value: 'ایران' },
]

export const PRODUCT_LABELS_DUMMY = [
    'نخی',
    'ضدحساسیت',
    'پرفروش',
    'چهارفصل',
]

const Specifications = ({
    colors,
    sizes,
    saleUnits,
    fields,
    className,
}: SpecificationsProps) => {
    return (
        <div className={cn('flex flex-col gap-4', className)} dir='rtl'>
            <div className='rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5'>
                <SectionTitle>متغیرها</SectionTitle>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-label-md text-outline'>
                            رنگ‌ها (رنگ‌های پایه)
                        </span>
                        <div className='flex flex-wrap gap-2'>
                            {colors?.map((item) => (
                                <ColorPill
                                    key={item.label}
                                    hex={item.color}
                                    label={item.label}
                                />
                            ))}
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <span className='text-label-md text-outline'>
                            سایزها (حروفی (SX-XXL))
                        </span>
                        <div className='flex flex-wrap gap-2'>
                            {sizes?.map((size) => (
                                <Badge
                                    key={size}
                                    variant='default'
                                    className='rounded-container-md border-0 bg-surface-container-high px-3 py-1.5 text-label-md text-on-surface'
                                >
                                    {size}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <span className='text-label-md text-outline'>
                            واحد فروش
                        </span>
                        <div className='flex flex-wrap gap-2'>
                            {saleUnits?.map((unit) => (
                                <Badge
                                    key={unit}
                                    variant='default'
                                    className='rounded-container-md border-0 bg-surface-container-high px-3 py-1.5 text-label-md text-on-surface'
                                >
                                    {unit}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className='rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5'>
                <SectionTitle>مشخصات فنی</SectionTitle>
                <div className='grid grid-cols-1 gap-x-8 gap-y-0 sm:grid-cols-2'>
                    {fields?.map((field, index) => (
                        <div
                            key={field.label}
                            className={cn(
                                'flex items-center justify-between gap-4 py-3',
                                index < fields.length - 2 &&
                                'border-0 border-b border-outline-variant'
                            )}
                        >
                            <span className='text-label-md text-outline'>
                                {field.label}
                            </span>
                            <span className='text-label-lg text-on-surface'>
                                {field.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Specifications
