"use client"

import { useSearchParams } from 'next/navigation'
import type { PriceListOut, PriceListStatusEnum } from '@/src/api/types/admin/pricing'
import { useListPriceLists } from '@/src/routes/catalog/hooks/pricing'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { Spinner } from '@/src/shared/components/ui/spinner'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import PricingRow, { PricingRowProps } from './components/TableRow'
import { TABLE_COLOUMN } from './constants'

export type PricingStatus = 'published' | 'draft'

const PRICE_LIST_STATUSES: PriceListStatusEnum[] = [
    'DRAFT',
    'SCHEDULED',
    'PUBLISHED',
    'CANCELLED',
]

const SOURCE_LABEL: Record<PriceListOut['source'], string> = {
    MANUAL: 'دستی',
    CONTRACT: 'قرارداد',
    IMPORT: 'ورود فایل',
}

const toPricingRow = (priceList: PriceListOut): PricingRowProps => ({
    data: {
        id: priceList.id,
        contractTitle: priceList.name,
        contractId: priceList.code,
        date: priceList.effective_from || priceList.created_at,
        scope: priceList.line_count
            ? `${formatFaNumber(priceList.line_count)} قلم`
            : SOURCE_LABEL[priceList.source],
        percent: null,
    },
})

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

const Pricing = () => {
    const searchParams = useSearchParams()
    const category = searchParams.get('cat')
    const status = PRICE_LIST_STATUSES.includes(category as PriceListStatusEnum)
        ? (category as PriceListStatusEnum)
        : 'DRAFT'
    const { data, isPending } = useListPriceLists({
        page: 1,
        page_size: 100,
        status,
    })
    const priceLists: PriceListOut[] = data?.results ?? []

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value={status}
                toggleButtonValue={ROUTE_CONFIGS.pricing.TOGGLE_BUTTON_VALUE}
            >
                <div className='bg-surface-container-high rounded-card-lg p-2'>
                    <Table className='border-collapse border-spacing-y-4'>
                        <TableHeader />
                        <TableBody>
                            {isPending ? (
                                <tr>
                                    <td colSpan={6} className='py-10'>
                                        <div className='flex justify-center'>
                                            <Spinner className='size-6' />
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                priceLists.map((priceList) => (
                                    <PricingRow
                                        key={priceList.id}
                                        data={toPricingRow(priceList).data}
                                    />
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </TableListLayout>
        </div>
    )
}

export default Pricing
