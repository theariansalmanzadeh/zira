'use client'

import { Fragment, useMemo, useState } from 'react'
import { Input } from '@/src/shared/components/ui/Input'
import { Switch } from '@/src/shared/components/ui/Switch'
import { useListAttributes } from '@/src/routes/catalog/hooks/catalog'
import { useCreateProducts } from '../../../../provider/createProductsProvider'
import {
    PRODUCT_ATTRIBUTE_LIST_PARAMS,
    isColorAttribute,
} from '../../../../utils/attributes'

type RowState = {
    basePrice: string
    capacity: string
    active: boolean
}

type MatrixItem = {
    value: string
    label: string
    hex?: string | null
}

type MatrixAxis = {
    id: string
    name: string
    items: MatrixItem[]
}

const emptyRow = (): RowState => ({
    basePrice: '',
    capacity: '',
    active: true,
})

const combinations = (axes: MatrixAxis[]): MatrixItem[][] =>
    axes.reduce<MatrixItem[][]>(
        (rows, axis) =>
            rows.flatMap((row) => axis.items.map((item) => [...row, item])),
        [[]]
    )

const MatrixLabel = ({ item }: { item: MatrixItem }) => (
    <span className='flex items-center gap-2 text-label-md text-on-surface'>
        {item.hex ? (
            <span
                className='size-4 shrink-0 rounded-full border border-outline-variant'
                style={{ backgroundColor: item.hex }}
            />
        ) : null}
        {item.label}
    </span>
)

const PriceInputSection = () => {
    const { attributeSelections, basePriceBasis } = useCreateProducts()
    const { data: attributes } = useListAttributes(PRODUCT_ATTRIBUTE_LIST_PARAMS)
    const [rows, setRows] = useState<Record<string, RowState>>({})

    const axes = useMemo(() => {
        const byId = new Map(
            (attributes?.results ?? []).map((attribute) => [attribute.id, attribute])
        )

        return basePriceBasis.flatMap((attributeId) => {
            const attribute = byId.get(attributeId)
            const selected = attributeSelections[attributeId]?.values ?? []
            if (!attribute || selected.length === 0) return []

            const selectedIds = new Set(selected)
            const showHex = isColorAttribute(attribute)
            const items = [...(attribute.values ?? [])]
                .filter((value) => selectedIds.has(value.id))
                .sort((left, right) => left.sort_order - right.sort_order)
                .map((value) => ({
                    value: value.id,
                    label: value.value,
                    hex: showHex ? value.hex_code : null,
                }))

            if (items.length === 0) return []

            return [
                {
                    id: attribute.id,
                    name: attribute.name,
                    items,
                },
            ]
        })
    }, [attributeSelections, attributes, basePriceBasis])

    const updateRow = (key: string, updates: Partial<RowState>) => {
        setRows((current) => ({
            ...current,
            [key]: { ...emptyRow(), ...current[key], ...updates },
        }))
    }

    if (axes.length === 0) return null

    const [lead, ...nestedAxes] = axes
    const nestedRows = nestedAxes.length > 0 ? combinations(nestedAxes) : [[]]
    const gridTemplateColumns = `repeat(${axes.length}, minmax(4rem, auto)) minmax(16rem, 1fr)`

    return (
        <div className='grid gap-y-2 bg-surface-container-high' dir='rtl'>
            <div
                className='grid items-center gap-x-4 px-2 text-label-md text-outline'
                style={{ gridTemplateColumns }}
            >
                {axes.map((axis) => (
                    <span key={axis.id}>{axis.name}</span>
                ))}
                <div className='flex items-center gap-x-4 px-4'>
                    <span>قیمت پایه</span>
                    <span>ظرفیت پیش‌سفارش</span>
                    <span />
                </div>
            </div>

            {lead.items.map((leadItem) => (
                <div
                    key={leadItem.value}
                    className='grid items-center gap-x-4 gap-y-2 rounded-card-lg p-2'
                    style={{ gridTemplateColumns }}
                >
                    <div
                        className='flex items-start self-stretch'
                        style={{ gridRow: `span ${nestedRows.length}` }}
                    >
                        <MatrixLabel item={leadItem} />
                    </div>

                    {nestedRows.map((row) => {
                        const cells = [leadItem, ...row]
                        const key = cells.map((item) => item.value).join('-')
                        const rowState = rows[key] ?? emptyRow()

                        return (
                            <Fragment key={key}>
                                {row.map((item) => (
                                    <MatrixLabel key={item.value} item={item} />
                                ))}
                                <div className='flex justify-between bg-surface-container-lowest px-3 py-3.5'>
                                    <div className='flex w-full grow flex-row'>
                                        <Input
                                            className='w-full'
                                            placeholder='-'
                                            value={rowState.basePrice}
                                            onChange={(value) =>
                                                updateRow(key, { basePrice: value })
                                            }
                                        />
                                        <Input
                                            className='w-full'
                                            placeholder='-'
                                            value={rowState.capacity}
                                            onChange={(value) =>
                                                updateRow(key, { capacity: value })
                                            }
                                        />
                                    </div>
                                    <div className='grid grid-cols-[auto_auto] items-center gap-x-2'>
                                        <Switch
                                            checked={rowState.active}
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
                    })}
                </div>
            ))}
        </div>
    )
}

export default PriceInputSection
