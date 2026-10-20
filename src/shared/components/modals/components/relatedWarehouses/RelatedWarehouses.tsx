'use client'

import { useRouter } from 'next/navigation'
import type { BranchWarehouse } from '@/src/api/types/admin/organization'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import type { BaseModalProps } from '../../types'
import { type RelatedWarehouseItem } from './constants'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

type RelatedWarehousesModalData = {
    values?: string[]
    warehouses?: BranchWarehouse[]
    branchId?: string
}

const toWarehouseItem = (
    warehouse?: BranchWarehouse
): RelatedWarehouseItem => ({
    id: warehouse?.warehouse_id,
    name: warehouse?.name,
    code: warehouse?.code,
    type: warehouse?.is_primary ? 'انبار اصلی' : 'انبار فرعی',
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
    const { push } = useRouter()
    const modalData = data as RelatedWarehousesModalData | null | undefined
    const branchId = modalData?.branchId ?? ''
    const rows = modalData?.warehouses
        ? modalData?.warehouses?.map(toWarehouseItem)
        : (modalData?.values ?? []).map(toValueItem)

    const openInventoryForm = (href: string) => {
        push(href)
        closeModal()
    }

    return (
        <div className='flex w-full flex-col gap-4' dir='rtl'>
            {branchId && (
                <div className='flex justify-end'>
                    <Button
                        type='button'
                        variant='primary'
                        className='gap-1.5'
                        onClick={() =>
                            openInventoryForm(
                                `/admin/branches/details/${branchId}/new`
                            )
                        }
                    >
                        <Icon
                            label='addSm400Broken'
                            className='size-4 text-on-primary'
                        />
                        افزودن انبار
                    </Button>
                </div>
            )}
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
                                    key={item?.id}
                                    data={item}
                                    branchId={branchId}
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
