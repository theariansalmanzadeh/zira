'use client'

import { Fragment, useMemo } from 'react'
import { Input } from '@/src/shared/components/ui/Input'
import { Switch } from '@/src/shared/components/ui/Switch'
import {
    useListAttributes,
    useListColors,
    useListSizes,
} from '@/src/routes/catalog/hooks/catalog'
import { useCreateProducts } from '../../../../provider/createProductsProvider'
import {
    COLOR_BASIS_ID,
    PRODUCT_ATTRIBUTE_LIST_PARAMS,
    SIZE_BASIS_ID,
    isColorAttribute,
} from '../../../../utils/attributes'

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

const combinations = (axes: MatrixAxis[]): MatrixItem[][] =>
    axes.reduce<MatrixItem[][]>(
        (rows, axis) =>
            rows.flatMap((row) => axis.items.map((item) => [...row, item])),
        [[]]
    )

const MatrixLabel = ({ item }: { item: MatrixItem }) => (
    <span className="flex items-center gap-2 text-label-md text-on-surface">
        {item.hex ? (
            <span
                className="size-4 shrink-0 rounded-full border border-outline-variant"
                style={{ backgroundColor: item.hex }}
            />
        ) : null}
        {item.label}
    </span>
)

const FIXED_COLUMN_COUNT = 4

const PriceInputSection = () => {
    const {
        attributeSelections,
        basePriceBasis,
        sizes,
        colors,
        pricingRows,
        updatePricingRow,
    } = useCreateProducts()
    const { data: attributes } = useListAttributes(PRODUCT_ATTRIBUTE_LIST_PARAMS)
    const { data: sizesPage } = useListSizes({ page: 1, page_size: 100 })
    const { data: colorsPage } = useListColors({ page: 1, page_size: 100 })

    const axes = useMemo(() => {
        const result: MatrixAxis[] = []
        const selectedBasis = new Set(basePriceBasis)

        if (selectedBasis.has(SIZE_BASIS_ID) && sizes.length > 0) {
            const selectedIds = new Set(sizes)
            const items = (sizesPage?.results ?? [])
                .filter((size) => selectedIds.has(size.id))
                .map((size) => ({
                    value: size.id,
                    label: size.name,
                    hex: null,
                }))
            if (items.length > 0) {
                result.push({ id: SIZE_BASIS_ID, name: 'سایز', items })
            }
        }

        if (selectedBasis.has(COLOR_BASIS_ID) && colors.length > 0) {
            const selectedIds = new Set(colors)
            const items = (colorsPage?.results ?? [])
                .filter((color) => selectedIds.has(color.id))
                .map((color) => ({
                    value: color.id,
                    label: color.name,
                    hex: color.hex_code,
                }))
            if (items.length > 0) {
                result.push({ id: COLOR_BASIS_ID, name: 'رنگ', items })
            }
        }

        const byId = new Map(
            (attributes?.results ?? []).map((attribute) => [
                attribute.id,
                attribute,
            ])
        )

        for (const attributeId of basePriceBasis) {
            if (
                attributeId === SIZE_BASIS_ID ||
                attributeId === COLOR_BASIS_ID
            ) {
                continue
            }

            const attribute = byId.get(attributeId)
            const selected = attributeSelections[attributeId]?.values ?? []
            if (!attribute || selected.length === 0) continue

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

            if (items.length === 0) continue

            result.push({
                id: attribute.id,
                name: attribute.name,
                items,
            })
        }

        return result
    }, [
        attributeSelections,
        attributes,
        basePriceBasis,
        colors,
        colorsPage,
        sizes,
        sizesPage,
    ])

    const columnCount = axes.length + FIXED_COLUMN_COUNT
    const gridTemplateColumns = `repeat(${columnCount}, minmax(0, 1fr))`

    if (axes.length === 0) return null

    const [lead, ...nestedAxes] = axes
    const nestedRows = nestedAxes.length > 0 ? combinations(nestedAxes) : [[]]
    const sizeAxisIndex = axes.findIndex((axis) => axis.id === SIZE_BASIS_ID)
    const colorAxisIndex = axes.findIndex((axis) => axis.id === COLOR_BASIS_ID)

    return (
        <div className="grid gap-y-2 bg-surface-container-high" dir="rtl">
            <div
                className="grid items-center gap-x-4 px-2 text-label-md text-outline"
                style={{ gridTemplateColumns }}
            >
                {axes.map((axis) => (
                    <span key={axis.id}>{axis.name}</span>
                ))}
                <span>کد</span>
                <span>قیمت پایه</span>
                <span>ظرفیت پیش‌سفارش</span>
                <span>فعال</span>
            </div>

            {lead.items.map((leadItem) => (
                <div
                    key={leadItem.value}
                    className="grid items-center gap-x-4 gap-y-2 rounded-card-lg p-2"
                    style={{ gridTemplateColumns }}
                >
                    <div
                        className="flex items-start self-stretch"
                        style={{ gridRow: `span ${nestedRows.length}` }}
                    >
                        <MatrixLabel item={leadItem} />
                    </div>

                    {nestedRows.map((row) => {
                        const cells = [leadItem, ...row]
                        const key = cells.map((item) => item.value).join('-')
                        const sizeId =
                            sizeAxisIndex >= 0
                                ? (cells[sizeAxisIndex]?.value ?? '')
                                : ''
                        const colorId =
                            colorAxisIndex >= 0
                                ? (cells[colorAxisIndex]?.value ?? '')
                                : ''
                        const displayName = cells
                            .map((item) => item.label)
                            .join(' / ')
                        const rowState = pricingRows[key] ?? {
                            sizeId,
                            colorId,
                            code: '',
                            displayName,
                            basePrice: '',
                            capacity: '',
                            active: true,
                        }

                        const patchRow = (
                            updates: Partial<{
                                code: string
                                basePrice: string
                                capacity: string
                                active: boolean
                            }>
                        ) =>
                            updatePricingRow(key, {
                                sizeId,
                                colorId,
                                displayName,
                                ...updates,
                            })

                        return (
                            <Fragment key={key}>
                                {row.map((item) => (
                                    <MatrixLabel
                                        key={item.value}
                                        item={item}
                                    />
                                ))}
                                <Input
                                    className="w-full"
                                    placeholder="-"
                                    wrapperClassName="bg-surface-container-lowest"
                                    value={rowState.code}
                                    onChange={(value) =>
                                        patchRow({ code: value })
                                    }
                                />
                                <Input
                                    className="w-full"
                                    placeholder="-"
                                    wrapperClassName="bg-surface-container-lowest"
                                    value={rowState.basePrice}
                                    onChange={(value) =>
                                        patchRow({ basePrice: value })
                                    }
                                />
                                <Input
                                    className="w-full"
                                    placeholder="-"
                                    wrapperClassName="bg-surface-container-lowest"
                                    value={rowState.capacity}
                                    onChange={(value) =>
                                        patchRow({ capacity: value })
                                    }
                                />
                                <div className="flex items-center gap-x-2">
                                    <Switch
                                        checked={rowState.active}
                                        onCheckedChange={(active) =>
                                            patchRow({ active })
                                        }
                                    />
                                    <span className="text-label-md text-on-surface-variant">
                                        فعال
                                    </span>
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
