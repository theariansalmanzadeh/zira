'use client'

import { Fragment, useMemo, useState } from 'react'
import { Input } from '@/src/shared/components/ui/Input'
import { Switch } from '@/src/shared/components/ui/Switch'
import { useListAttributes } from '@/src/routes/catalog/hooks/catalog'
import { useCreateProducts } from '../../../../provider/createProductsProvider'
import {
    PRODUCT_ATTRIBUTE_LIST_PARAMS,
    attributeValueMap,
} from '../../../../utils/attributes'

type RowState = {
    basePrice: string
    capacity: string
    active: boolean
}

const emptyRow = (): RowState => ({
    basePrice: '',
    capacity: '',
    active: true,
})

const PriceInputSection = () => {
    const { packs, sizes, colors } = useCreateProducts()
    const { data: attributes } = useListAttributes(PRODUCT_ATTRIBUTE_LIST_PARAMS)
    const [rows, setRows] = useState<Record<string, RowState>>({})
    const values = useMemo(
        () => attributeValueMap(attributes?.items ?? []),
        [attributes]
    )
    const salesUnitGroups = packs.map((pack) => ({
        id: pack,
        label: values.get(pack)?.label ?? pack,
    }))
    const sizeItems = sizes.map((value) => ({
        value,
        label: values.get(value)?.label ?? value,
    }))
    const colorItems = colors.map((value) => ({
        value,
        label: values.get(value)?.label ?? value,
        hex: values.get(value)?.hex ?? '#BFBFBF',
    }))
    const matrixColors = colorItems.length > 0 ? colorItems : [null]

    const updateRow = (key: string, updates: Partial<RowState>) => {
        setRows((current) => ({
            ...current,
            [key]: { ...emptyRow(), ...current[key], ...updates },
        }))
    }

    return (
        <div className='grid gap-y-2 bg-surface-container-high' dir='rtl'>
            <div className='grid grid-cols-[minmax(7rem,auto)_minmax(4rem,auto)_minmax(6rem,auto)_1fr] items-center gap-x-4 px-2 text-label-md text-outline'>
                <span>واحد فروش</span>
                <span>سایز</span>
                <span>رنگ</span>
                <div className='flex items-center gap-x-4 px-4'>
                    <span>قیمت پایه</span>
                    <span>ظرفیت پیش‌سفارش</span>
                    <span />
                </div>
            </div>

            {salesUnitGroups.map((unit) => (
                <div
                    key={unit.id}
                    className='grid grid-cols-[minmax(7rem,auto)_minmax(4rem,auto)_minmax(6rem,auto)_1fr] gap-x-4 gap-y-2 items-center rounded-card-lg p-2'
                >
                    <div
                        className='flex items-start self-stretch text-label-lg text-on-surface-variant'
                        style={{
                            gridRow: `span ${Math.max(sizeItems.length * matrixColors.length, 1)}`,
                        }}
                    >
                        {unit.label}
                    </div>

                    {sizeItems.flatMap((size) =>
                        matrixColors.map((color) => {
                            const key = `${unit.id}-${size.value}-${color?.value ?? 'none'}`
                            const row = rows[key] ?? emptyRow()

                            return (
                                <Fragment key={key}>
                                    <span className='text-label-md text-on-surface-variant'>
                                        {size.label}
                                    </span>
                                    <span className='flex items-center gap-2 text-label-md text-on-surface'>
                                        {color ? (
                                            <>
                                                <span
                                                    className='size-4 shrink-0 rounded-full border border-outline-variant'
                                                    style={{ backgroundColor: color.hex }}
                                                />
                                                {color.label}
                                            </>
                                        ) : (
                                            '—'
                                        )}
                                    </span>
                                    <div className='flex bg-surface-container-lowest justify-between px-3 py-3.5'>
                                        <div className='flex flex-row grow w-full'>
                                            <Input
                                                className='w-full'
                                                placeholder='-'
                                                value={row.basePrice}
                                                onChange={(value) =>
                                                    updateRow(key, { basePrice: value })
                                                }
                                            />
                                            <Input
                                                className='w-full'
                                                placeholder='-'
                                                value={row.capacity}
                                                onChange={(value) =>
                                                    updateRow(key, { capacity: value })
                                                }
                                            />
                                        </div>
                                        <div className='grid grid-cols-[auto_auto] items-center gap-x-2'>
                                            <Switch
                                                checked={row.active}
                                                onCheckedChange={(active) =>
                                                    updateRow(key, { active })
                                                }
                                            />
                                            <span className='text-label-md text-on-surface-variant'>
                                                فعال
                                            </span>
                                        </div>
                                    </div>
                                </Fragment>
                            )
                        })
                    )}
                </div>
            ))}
        </div>
    )
}

export default PriceInputSection
