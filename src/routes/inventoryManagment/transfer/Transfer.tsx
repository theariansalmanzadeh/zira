'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow, { type TransferRowData } from './components/TableRow'
import TransferListTableHeader from './components/TransferListTableHeader'
import TransferListTableRow from './components/TransferListTableRow'
import {
    LIST_TABLE_COLOUMN,
    LIST_TOGGLE_BUTTONS,
    REQUEST_TOGGLE_BUTTONS,
    TABLE_COLOUMN,
    TRANSFER_LIST_DUMMY,
    type TransferListDirection,
    type TransferListRowData,
} from './constants'

const VIEW_OPTIONS = [
    { label: 'درخواست‌ها', value: 'requests' },
    { label: 'لیست انتقال‌ها', value: 'list' },
]

export const TRANSFER_DUMMY: TransferRowData[] = [
    {
        id: 'TRF-3301',
        rowNumber: '۱',
        requestDate: '2025-12-09T00:00:00.000Z',
        productCode: '7352-90',
        productType: 'ست تکی',
        productName: 'نیم تنه ورزشی',
        unit: 'عدد',
        quantity: '۴۰',
        warehouseAddress: 'A-R1-S1-B01',
        originWarehouse: 'مرکزی تهران',
        destinationWarehouse: 'شعبه کرج',
        requesterName: 'علی رضایی',
        invoiceNumber: 'INV-1044',
        insuranceStatus: 'insured',
        description: 'انتقال سیستمی موجودی شعبه',
        source: 'system',
    },
    {
        id: 'TRF-3300',
        rowNumber: '۲',
        requestDate: '2025-12-08T00:00:00.000Z',
        productCode: '4410-09',
        productType: 'تکی',
        productName: 'حوله حمام',
        unit: 'عدد',
        quantity: '۱۲',
        warehouseAddress: 'B-R2-S3-B04',
        originWarehouse: 'مرکزی تهران',
        destinationWarehouse: 'شعبه اصفهان',
        requesterName: 'مریم احمدی',
        invoiceNumber: 'INV-1038',
        insuranceStatus: 'uninsured',
        description: 'کمبود موجودی شعبه اصفهان',
        source: 'system',
    },
    {
        id: 'TRF-3299',
        rowNumber: '۳',
        requestDate: '2025-12-07T00:00:00.000Z',
        productCode: '8120-14',
        productType: 'ست',
        productName: 'روتختی نخی',
        unit: 'دست',
        quantity: '۸',
        warehouseAddress: 'C-R1-S2-B08',
        originWarehouse: 'شعبه کرج',
        destinationWarehouse: 'مرکزی تهران',
        requesterName: 'حسین کریمی',
        invoiceNumber: 'INV-1021',
        insuranceStatus: 'insured',
        description: 'ثبت دستی توسط انباردار',
        source: 'manual',
    },
    {
        id: 'TRF-3298',
        rowNumber: '۴',
        requestDate: '2025-12-06T00:00:00.000Z',
        productCode: '2201-55',
        productType: 'تکی',
        productName: 'تی‌شرت نخی',
        unit: 'عدد',
        quantity: '۱۸',
        warehouseAddress: 'D-R2-S1-B11',
        originWarehouse: 'شعبه مشهد',
        destinationWarehouse: 'شعبه تبریز',
        requesterName: 'زهرا نوری',
        invoiceNumber: 'INV-1012',
        insuranceStatus: 'insured',
        description: 'درخواست دستی بین شعب',
        source: 'manual',
    },
]

const Transfer = ({
    data = TRANSFER_DUMMY,
    listData = TRANSFER_LIST_DUMMY,
}: {
    data?: TransferRowData[]
    listData?: TransferListRowData[]
}) => {
    const [view, setView] = useState<'requests' | 'list'>('requests')
    const searchParams = useSearchParams()
    const category = searchParams.get('cat')

    const filteredData = useMemo(() => {
        const source = category === 'manual' ? 'manual' : 'system'
        return data.filter((item) => item.source === source)
    }, [category, data])

    const filteredList = useMemo(() => {
        if (category !== 'send' && category !== 'receive') return listData
        return listData.filter((item) => item.direction === (category as TransferListDirection))
    }, [category, listData])

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <div className='rounded-card-lg bg-surface-container-lowest p-3'>
                <FormDropdown
                    className='w-full max-w-70'
                    value={view}
                    options={VIEW_OPTIONS}
                    onChange={(value) => setView(value as 'requests' | 'list')}
                />
            </div>

            {view === 'requests' ? (
                <TableListLayout
                    TableColoumn={TABLE_COLOUMN}
                    value='system'
                    toggleButtonValue={REQUEST_TOGGLE_BUTTONS}
                >
                    <div className='flex flex-col gap-1 rounded-card-lg bg-surface-container-high p-2'>
                        <TableHeader />
                        {filteredData.map((item) => (
                            <TableRow key={item.id} data={item} />
                        ))}
                    </div>
                </TableListLayout>
            ) : (
                <TableListLayout
                    key='transfer-list'
                    TableColoumn={LIST_TABLE_COLOUMN}
                    value='all'
                    toggleButtonValue={LIST_TOGGLE_BUTTONS}
                >
                    <div className='flex flex-col gap-1 rounded-card-lg bg-surface-container-high p-2'>
                        <TransferListTableHeader />
                        {filteredList.map((item) => (
                            <TransferListTableRow key={item.id} data={item} />
                        ))}
                    </div>
                </TableListLayout>
            )}
        </div>
    )
}

export default Transfer
