'use client'

import IconButton from '@/src/shared/components/ui/IconButton'
import { Pill } from '@/src/shared/components/ui/Pill'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import type { BaseModalProps } from '../types'
import type { CategoryRowData } from '@/src/routes/categories/categoryTypes/components/TableRow'

export type CategoryDetailModalData = {
    category: CategoryRowData
    breadcrumb?: string[]
    features?: string[]
    activeProducts?: number
}

type CategoryDetailProps = BaseModalProps & {
    features?: string[]
}

const CategoryDetail = ({
    data,
    features = ['رنگ', 'سایز', 'جنس پارچه', 'فنردار بودن'],
}: CategoryDetailProps) => {
    const modalData = data as CategoryDetailModalData | null | undefined
    const category = modalData?.category

    if (!category) return null

    const status =
        category.status === 'active'
            ? { text: 'فعال', variant: 'success' as const }
            : { text: 'غیرفعال', variant: 'error' as const }

    const breadcrumb =
        modalData?.breadcrumb ?? ['زیرا مارکت', 'لباس زیر زنانه', category.title]
    const featureList = modalData?.features ?? features
    const subCategories = category.subCategories ?? []
    const activeProducts =
        modalData?.activeProducts ?? Math.max(0, category.totalProducts - 17)

    return (
        <div className='flex w-full flex-col gap-5' dir='rtl'>
            <div className='flex flex-row items-start justify-start gap-4'>
                <div className='flex min-w-0 flex-row items-center gap-3'>
                    <div className='flex size-12 shrink-0 items-center justify-center rounded-card-md bg-success-container'>
                        <Icon
                            label='folder400Linear'
                            className='size-6 text-on-success-container'
                        />
                    </div>
                    <div className='flex min-w-0 flex-col gap-1.5'>
                        <div className='flex flex-row flex-wrap items-center gap-2'>
                            <span className='text-title-md font-bold text-on-surface'>
                                {category.title}
                            </span>
                            <Pill
                                className='border-0'
                                variant={status.variant}
                                text={status.text}
                                hasDot
                            />
                        </div>
                        <span className='truncate text-label-md text-outline'>
                            {breadcrumb.join(' / ')}
                        </span>
                    </div>
                </div>
            </div>

            <hr className='border-0 border-t border-outline-variant' />
            <div className='flex shrink-0 w-fit jus flex-row items-center gap-2 rounded-card-md border border-outline-variant'>
                <IconButton
                    icon='edit400Linear'
                    variant='default'
                    className='size-10!'
                    iconClassName='size-5! text-outline'
                />
                <span className='text-label-md text-on-surface-variant'>
                    ویرایش
                </span>
            </div>

            <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
                {[
                    { value: category.totalProducts, label: 'کل کالاها' },
                    { value: subCategories.length, label: 'زیردسته' },
                    { value: activeProducts, label: 'کالای فعال' },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className='flex flex-col items-center gap-1 rounded-card-md border border-outline-variant bg-surface-container-lowest px-4 py-4 text-center'
                    >
                        <span className='text-title-lg font-bold text-on-surface'>
                            {formatFaNumber(stat.value)}
                        </span>
                        <span className='text-label-md text-outline'>
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>

            <div className='flex flex-col gap-3'>
                <h4 className='text-label-lg font-semibold text-on-surface'>
                    ویژگی‌های اختصاصی این دسته
                </h4>
                <div className='flex flex-row flex-wrap gap-2'>
                    {featureList.map((feature) => (
                        <Pill
                            key={feature}
                            className='border-0'
                            variant='tonal'
                            text={feature}
                        />
                    ))}
                </div>
            </div>

            <div className='flex flex-col gap-3'>
                <h4 className='text-label-lg font-semibold text-on-surface'>
                    دسته‌های زیرمجموعه
                </h4>
                {subCategories.length > 0 ? (
                    <div className='flex flex-col gap-2'>
                        {subCategories.map((subCategory) => (
                            <div
                                key={subCategory.id}
                                className='flex flex-row items-center justify-between gap-3 rounded-card-md border border-outline-variant bg-surface-container-lowest px-4 py-3'
                            >
                                <div className='flex flex-row items-center gap-2'>
                                    <span className='size-1.5 rounded-full bg-outline' />
                                    <span className='text-label-lg text-on-surface'>
                                        {subCategory.title}
                                    </span>
                                </div>
                                <span className='text-label-md text-outline'>
                                    {formatFaNumber(subCategory.totalProducts)}{' '}
                                    کالا
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-row items-center justify-between gap-3 rounded-card-md border border-outline-variant bg-surface-container-lowest px-4 py-3'>
                        <div className='flex flex-row items-center gap-2'>
                            <span className='size-1.5 rounded-full bg-outline' />
                            <span className='text-label-lg text-on-surface-variant'>
                                بدون زیردسته
                            </span>
                        </div>
                        <span className='text-label-md text-outline'>۰ کالا</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CategoryDetail