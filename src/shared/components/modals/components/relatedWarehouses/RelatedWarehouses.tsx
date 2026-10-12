'use client'

import type { BranchWarehouseLink } from '@/src/api/types/admin/organization'
import type { BaseModalProps } from '../../types'
import { type RelatedWarehouseItem } from './constants'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

type RelatedWarehousesModalData = {
    values?: string[]
    warehouses?: BranchWarehouseLink[]
}

const toWarehouseItem = (
    warehouse: BranchWarehouseLink
): RelatedWarehouseItem => ({
    id: warehouse.warehouse_id || warehouse.id,
    name: warehouse.warehouse_name,
    code: warehouse.warehouse_code,
    type: warehouse.is_primary ? 'انبار اصلی' : 'انبار فرعی',
    area: 0,
    fillPercent: 0,
    manager: '—',
    phone: '—',
    itemCount: 0,
    stock: 0,
})

const toValueItem = (name: string, index: number): RelatedWarehouseItem => ({
    id: `${index}-${name}`,
    name,
    code: '—',
    type: '—',
    area: 0,
    fillPercent: 0,
    manager: '—',
    phone: '—',
    itemCount: 0,
    stock: 0,
})

const RelatedWarehouses = ({ closeModal, data }: BaseModalProps) => {
    const modalData = data as RelatedWarehousesModalData | null | undefined
    const rows = modalData?.warehouses
        ? modalData.warehouses.map(toWarehouseItem)
        : (modalData?.values ?? []).map(toValueItem)

    return (
        <div className='flex w-full flex-col gap-4' dir='rtl'>
            <div className='overflow-x-auto rounded-card-lg bg-surface-container-high p-2'>
                <div className='overflow-hidden rounded-card-md bg-surface-container-lowest'>
                    <TableHeader />
                    <div className='flex flex-col'>
                        {rows.length === 0 ? (
                            <p className='px-3 py-6 text-center text-label-lg text-outline'>
                                انباری ثبت نشده است.
                            </p>
                        ) : (
                            rows.map((item) => (
                                <TableRow
                                    key={item.id}
                                    data={item}
                                    onNavigate={closeModal}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RelatedWarehouses
