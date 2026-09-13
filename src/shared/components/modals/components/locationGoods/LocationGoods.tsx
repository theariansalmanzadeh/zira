'use client'

import { useMemo } from 'react'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import { DialogTitle } from '@/src/shared/components/ui/Dialog'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { useTableActionsStore } from '@/src/shared/store/table-actions-store'
import type { BaseModalProps } from '../../types'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import {
    DEFAULT_LOCATION_GOODS_TITLE,
    LOCATION_GOODS_DUMMY,
    TABLE_COLOUMN,
} from './constants'
import type { LocationGoodsModalData } from './types'

const LocationGoods = ({ data }: BaseModalProps) => {
    const modalData = data as LocationGoodsModalData | null | undefined
    const title = modalData?.title ?? DEFAULT_LOCATION_GOODS_TITLE
    const items = modalData?.items ?? LOCATION_GOODS_DUMMY
    const search = useTableActionsStore((state) => state.search)

    const filteredItems = useMemo(() => {
        const query = search.trim()
        if (!query) return items

        return items.filter(
            (item) =>
                item.title.includes(query) ||
                item.sku.includes(query) ||
                item.warehouseAddress.includes(query)
        )
    }, [items, search])

    return (
        <div className="flex w-full flex-col gap-4" dir="rtl">
            <DialogTitle className="text-right text-title-md font-medium text-on-surface">
                {title}
            </DialogTitle>
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                hasHeaderActions={false}
                hasTableSettings={false}
                hasExpand={false}
                defaultSearchOpen
                searchPlaceholder="جستجو با کد یا نام محصول..."
                className="p-0"
            >
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    <Table className="border-collapse border-spacing-y-4">
                        <TableHeader />
                        <TableBody>
                            {filteredItems.map((item) => (
                                <TableRow key={item.id} data={item} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    className="mt-2"
                    page={1}
                    totalAmount={31}
                    quantityRows={['8', '20', '50']}
                />
            </TableListLayout>
        </div>
    )
}

export default LocationGoods
