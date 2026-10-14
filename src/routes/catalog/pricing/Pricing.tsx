'use client'

import { useSearchParams } from 'next/navigation'
import type { PriceListOut, PriceListStatusEnum } from '@/src/api/types/admin/pricing'
import { useListPriceLists } from '@/src/routes/catalog/hooks/pricing'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { Spinner } from '@/src/shared/components/ui/spinner'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import PriceListRow from './components/TableRow'
import { TABLE_COLOUMN } from './constants'

const FILTER_STATUSES: PriceListStatusEnum[] = ['PUBLISHED', 'SCHEDULED']

const Pricing = () => {
    const searchParams = useSearchParams()
    const category = searchParams.get('cat')
    const status = FILTER_STATUSES.includes(category as PriceListStatusEnum)
        ? (category as PriceListStatusEnum)
        : undefined
    const { data, isPending, isError } = useListPriceLists({
        page: 1,
        page_size: 100,
        status,
    })
    const priceLists: PriceListOut[] = data?.results ?? []

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value={status ?? 'all'}
                toggleButtonValue={ROUTE_CONFIGS.pricing.TOGGLE_BUTTON_VALUE}
            >
                <div className='rounded-card-lg bg-surface-container-high p-2'>
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
                            ) : isError ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className='py-6 text-center text-label-md text-outline'
                                    >
                                        دریافت لیست‌های قیمت با خطا مواجه شد.
                                    </td>
                                </tr>
                            ) : priceLists.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className='py-6 text-center text-label-md text-outline'
                                    >
                                        لیست قیمتی یافت نشد.
                                    </td>
                                </tr>
                            ) : (
                                priceLists.map((priceList) => (
                                    <PriceListRow
                                        key={priceList.id}
                                        data={{
                                            id: priceList.id,
                                            name: priceList.name,
                                            source: priceList.source,
                                            code: priceList.code,
                                            status: priceList.status,
                                        }}
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
