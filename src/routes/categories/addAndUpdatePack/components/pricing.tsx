'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/src/shared/components/ui/button'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import type { TableFilterItem } from '@/src/shared/store/table-actions-store'
import PricingFilters, { FILTER_DEFAULTS } from './PricingFilters'
import PricingTableHeader from './PricingTableHeader'
import PricingTableRow from './PricingTableRow'
import type { PricingItem } from './pricingTableShared'

const ALL = 'all'

const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'code', header_label: 'کد کالا', isChecked: true },
    { id: 'name', header_label: 'نام کالا', isChecked: true },
    { id: 'size', header_label: 'سایز', isChecked: true },
    { id: 'color', header_label: 'رنگ', isChecked: true },
    { id: 'price', header_label: 'قیمت فروش', isChecked: true },
    { id: 'stock', header_label: 'موجودی', isChecked: true },
]

const PRICING_ITEMS: PricingItem[] = [
    {
        id: 'zm-1001',
        code: 'ZM-1001',
        name: 'شورت زنانه لمیس نخ پنبه طرح رز — سایز XS',
        size: 'xs',
        color: 'red',
        colorHex: '#C45C5C',
        price: 62000,
        stock: 86,
        mainCategory: 'underwear',
        midCategory: 'shorts',
        subCategory: 'women-shorts',
        brand: 'lemis',
    },
    {
        id: 'zm-1002',
        code: 'ZM-1002',
        name: 'شورت زنانه لمیس نخ پنبه طرح رز — سایز XS',
        size: 'xs',
        color: 'blue',
        colorHex: '#3D6FBF',
        price: 63000,
        stock: 0,
        mainCategory: 'underwear',
        midCategory: 'shorts',
        subCategory: 'women-shorts',
        brand: 'lemis',
    },
    {
        id: 'zm-1003',
        code: 'ZM-1003',
        name: 'شورت زنانه لمیس نخ پنبه طرح رز — سایز XS',
        size: 'xs',
        color: 'green',
        colorHex: '#3E8B57',
        price: 64000,
        stock: 42,
        mainCategory: 'underwear',
        midCategory: 'shorts',
        subCategory: 'women-shorts',
        brand: 'lemis',
    },
    {
        id: 'zm-1004',
        code: 'ZM-1004',
        name: 'شورت زنانه لمیس نخ پنبه طرح رز — سایز S',
        size: 's',
        color: 'red',
        colorHex: '#C45C5C',
        price: 64000,
        stock: 18,
        mainCategory: 'underwear',
        midCategory: 'shorts',
        subCategory: 'women-shorts',
        brand: 'lemis',
    },
    {
        id: 'zm-1005',
        code: 'ZM-1005',
        name: 'شورت زنانه لمیس نخ پنبه طرح رز — سایز S',
        size: 's',
        color: 'blue',
        colorHex: '#3D6FBF',
        price: 65000,
        stock: 7,
        mainCategory: 'underwear',
        midCategory: 'bra',
        subCategory: 'women-bra',
        brand: 'lemis',
    },
    {
        id: 'zm-1006',
        code: 'ZM-1006',
        name: 'شورت زنانه لمیس نخ پنبه طرح رز — سایز S',
        size: 's',
        color: 'green',
        colorHex: '#3E8B57',
        price: 66000,
        stock: 124,
        mainCategory: 'underwear',
        midCategory: 'shorts',
        subCategory: 'women-shorts',
        brand: 'other',
    },
    {
        id: 'zm-1007',
        code: 'ZM-1007',
        name: 'شورت زنانه لمیس نخ پنبه طرح رز — سایز M',
        size: 'm',
        color: 'red',
        colorHex: '#C45C5C',
        price: 66000,
        stock: 0,
        mainCategory: 'sleepwear',
        midCategory: 'shorts',
        subCategory: 'women-shorts',
        brand: 'lemis',
    },
    {
        id: 'zm-1008',
        code: 'ZM-1008',
        name: 'شورت زنانه لمیس نخ پنبه طرح رز — سایز M',
        size: 'm',
        color: 'blue',
        colorHex: '#3D6FBF',
        price: 67000,
        stock: 64,
        mainCategory: 'underwear',
        midCategory: 'shorts',
        subCategory: 'women-shorts',
        brand: 'lemis',
    },
]

const matchesFilter = (value: string, selected: string) =>
    selected === ALL || value === selected

const Pricing = () => {
    const [items] = useState<PricingItem[]>(PRICING_ITEMS)
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [amounts, setAmounts] = useState<Record<string, string>>({})
    const [filters, setFilters] = useState(FILTER_DEFAULTS)
    const showAmount = selectedIds.length > 0

    const filteredItems = useMemo(() => {
        const query = filters.search.trim()
        return items.filter((item) => {
            const matchesSearch =
                !query ||
                item.name.includes(query) ||
                item.code.toLowerCase().includes(query.toLowerCase()) ||
                item.brand.includes(query)

            return (
                matchesSearch &&
                matchesFilter(item.mainCategory, filters.mainCategory) &&
                matchesFilter(item.midCategory, filters.midCategory) &&
                matchesFilter(item.subCategory, filters.subCategory) &&
                matchesFilter(item.brand, filters.brand) &&
                matchesFilter(item.size, filters.size) &&
                matchesFilter(item.color, filters.color)
            )
        })
    }, [filters, items])

    const toggleItem = (id: string, checked: boolean) => {
        setSelectedIds((prev) =>
            checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
        )
        if (!checked) {
            setAmounts((prev) => {
                const next = { ...prev }
                delete next[id]
                return next
            })
        }
    }

    const handleCreate = () => {
        const selected = items
            .filter((item) => selectedIds.includes(item.id))
            .map((item) => ({
                ...item,
                amount: Number(amounts[item.id] || 0),
            }))
        console.log(selected)
    }

    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <PricingFilters filters={filters} onChange={setFilters} />

            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                hasHeaderActions={false}
                hasSearch={false}
                hasFilter={false}
                hasSort={false}
                hasTableSettings={false}
                hasExpand={false}
            >
                <div className='flex flex-col gap-2 rounded-card-lg bg-surface-container-high p-2'>
                    <PricingTableHeader showAmount={showAmount} />
                    {filteredItems.map((item) => (
                        <PricingTableRow
                            key={item.id}
                            item={item}
                            checked={selectedIds.includes(item.id)}
                            showAmount={showAmount}
                            amount={amounts[item.id] ?? ''}
                            onAmountChange={(value) =>
                                setAmounts((prev) => ({
                                    ...prev,
                                    [item.id]: value,
                                }))
                            }
                            onCheckedChange={(checked) =>
                                toggleItem(item.id, checked)
                            }
                        />
                    ))}
                </div>
            </TableListLayout>
            <Button
                type='button'
                variant='primary'
                className='self-end'
                disabled={!showAmount}
                onClick={handleCreate}
            >
                ایجاد
            </Button>
        </div>
    )
}

export default Pricing
