'use client'

import { useMemo, useState } from 'react'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow, {
    type ChangeAddressFilterTab,
    type ChangeAddressRowData,
} from './components/TableRow'
import { TABLE_COLOUMN } from './constants'

export const CHANGE_ADDRESS_DUMMY: ChangeAddressRowData[] = [
    {
        id: 'REL-219',
        productTitle: 'عنوان کالا',
        oldAddress: 'A-R1-S2-B03',
        newAddress: 'A-R2-S1-B05',
        registeredAt: '2025-12-09T14:53:00.000Z',
    },
    {
        id: 'REL-218',
        productTitle: 'عنوان کالا',
        oldAddress: 'B-R3-S1-B12',
        newAddress: 'B-R1-S4-B02',
        registeredAt: '2025-12-09T13:15:00.000Z',
        filterTab: 'pending',
    },
    {
        id: 'REL-217',
        productTitle: 'عنوان کالا',
        oldAddress: 'C-R2-S3-B08',
        newAddress: 'C-R2-S2-B11',
        registeredAt: '08/12/1404 - 14:10',
        filterTab: 'in-transit',
    },
    {
        id: 'REL-216',
        productTitle: 'عنوان کالا',
        oldAddress: 'A-R4-S1-B01',
        newAddress: 'A-R1-S1-B09',
        registeredAt: '07/12/1404 - 11:30',
        filterTab: 'completed',
    },
]

const ChangeAddress = ({ data = CHANGE_ADDRESS_DUMMY }: { data?: ChangeAddressRowData[] }) => {
    const [statusFilter] = useState<ChangeAddressFilterTab>('all')

    const filteredData = useMemo(() => {
        if (statusFilter === 'all') return data
        return data.filter((item) => item.filterTab === statusFilter)
    }, [data, statusFilter])

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value={statusFilter}
                toggleButtonValue={ROUTE_CONFIGS.changeAddress.TOGGLE_BUTTON_VALUE}
            >
                <div className='rounded-card-lg bg-surface-container-high p-2'>
                    <Table className='border-collapse border-spacing-y-4'>
                        <TableHeader />
                        <TableBody>
                            {filteredData.map((item) => (
                                <TableRow key={item.id} data={item} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </TableListLayout>
        </div>
    )
}

export default ChangeAddress
