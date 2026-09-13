'use client'

import { useMemo, useState } from 'react'
import { Button } from '@shared/components/ui/button'
import { Input } from '@shared/components/ui/Input'
import { Table, TableBody } from '@shared/components/ui/Table'
import type { BaseModalProps } from '../../types'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import { SELECT_PRODUCT_DUMMY } from './constants'
import type { SelectProductItem, SelectProductModalData } from './types'

const SelectProduct = ({ closeModal, data }: BaseModalProps) => {
    const modalData = data as SelectProductModalData | null | undefined
    const [searchQuery, setSearchQuery] = useState('')
    const [inCartIds, setInCartIds] = useState(
        () => new Set(modalData?.selectedIds ?? [])
    )

    const filteredProducts = useMemo(() => {
        const query = searchQuery.trim()
        if (!query) return SELECT_PRODUCT_DUMMY

        return SELECT_PRODUCT_DUMMY.filter(
            (product) =>
                product.name.includes(query) ||
                product.sku.includes(query) ||
                product.brand.includes(query) ||
                product.category.includes(query)
        )
    }, [searchQuery])

    const handleAdd = (product: SelectProductItem) => {
        if (inCartIds.has(product.id)) return
        modalData?.onSelect?.(product)
        setInCartIds((prev) => new Set(prev).add(product.id))
    }

    return (
        <div className="flex w-full flex-col gap-4" dir="rtl">
            <div className="flex flex-col items-start justify-between gap-3">
                <h3 className="text-title-md font-medium text-on-surface">
                    انتخاب کالا
                </h3>
                <Input
                    dir="rtl"
                    value={searchQuery}
                    onChange={setSearchQuery}
                    iconId="search400Linear"
                    placeholder="جستجو با نام یا شناسه کالا..."
                    wrapperClassName="w-full self-stretch rounded-full flex-row-reverse px-1"
                    className="text-right"
                />
            </div>

            <div className="rounded-card-lg bg-surface-container-high p-2">
                <Table className="border-collapse border-spacing-y-4">
                    <TableHeader />
                    <TableBody>
                        {filteredProducts.map((product) => (
                            <TableRow
                                key={product.id}
                                product={product}
                                isInCart={inCartIds.has(product.id)}
                                onAdd={handleAdd}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex flex-row items-center justify-between pt-2">
                <Button type="button" variant="ghost" onClick={closeModal}>
                    بازگشت
                </Button>
            </div>
        </div>
    )
}

export default SelectProduct
