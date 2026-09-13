"use client"

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import PricingRow, { PricingRowProps } from './components/TableRow'
import { TABLE_COLOUMN } from './constants'
import { parsePercentValue } from './utils'

export type PricingFilter = 'all' | 'discount' | 'increase'
export type PricingStatus = 'published' | 'draft'

export const PRICING_LIST_DUMMY: PricingRowProps[] = [
    {
        data: {
            contractTitle: 'افزایش فصلی',
            contractId: 'PL-7629',
            date: '2025-12-09T00:00:00.000Z',
            scope: 'همه محصولات',
            percent: '8%',
            status: 'published',
        },
    },
    {
        data: {
            contractTitle: 'تخفیف عمده پاییز',
            contractId: 'PL-7630',
            date: '2025-12-09T00:00:00.000Z',
            scope: '1 دسته اصلی',
            percent: '-4%',
            status: 'published',
        },
    },
    {
        data: {
            contractTitle: 'قرارداد VIP طلایی',
            contractId: 'PL-7631',
            date: '2025-12-09T00:00:00.000Z',
            scope: '140 محصول',
            percent: '11%',
            status: 'draft',
        },
    },
    {
        data: {
            contractTitle: 'تخفیف عمده بهار',
            contractId: 'PL-7632',
            date: '2025-12-09T00:00:00.000Z',
            scope: '2 دسته اصلی',
            percent: '-8%',
            status: 'draft',
        },
    },
]

const Pricing = ({ data = PRICING_LIST_DUMMY }: { data?: PricingRowProps[] }) => {
    const searchParams = useSearchParams()
    const typeFilter =
        (searchParams.get('cat') as PricingFilter | null) ?? 'all'

    const filteredData = useMemo(() => {
        if (typeFilter === 'all') return data
        return data.filter((item) => {
            const percent = parsePercentValue(item.data.percent)
            if (typeFilter === 'discount') return percent < 0
            if (typeFilter === 'increase') return percent > 0
            return true
        })
    }, [data, typeFilter])

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value={typeFilter}
                toggleButtonValue={ROUTE_CONFIGS.pricing.TOGGLE_BUTTON_VALUE}
            >
                <div className='bg-surface-container-high rounded-card-lg p-2'>
                    <Table className='border-collapse border-spacing-y-4'>
                        <TableHeader />
                        <TableBody>
                            {filteredData.map((item, index) => (
                                <PricingRow key={index} data={item.data} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </TableListLayout>
        </div>
    )
}

export default Pricing
