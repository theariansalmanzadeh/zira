'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { BrandOut } from '@/src/api/types/admin/catalog'
import { useListBrands } from '@/src/routes/catalog/hooks/catalog'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import { Spinner } from '@/src/shared/components/ui/spinner'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import { TABLE_COLOUMN, type BrandItem, type BrandStatus } from './constants'

const API_STATUS: Record<Exclude<BrandStatus, 'all'>, string> = {
    active: 'ACTIVE',
    inactive: 'INACTIVE',
}

const toBrandItem = (brand: BrandOut): BrandItem => ({
    id: brand.id,
    name: brand.name,
    slug: brand.tagline,
    initial: brand.name.trim().charAt(0) || '—',
    avatarClassName: 'bg-primary/70 text-on-primary',
    logoUrl: brand.logo_url,
    field: brand.intro,
    productsCount: brand.history.length,
    country: brand.is_main ? 'برند اصلی' : '—',
    status: brand.status === 'ACTIVE' ? 'active' : 'inactive',
    statusLabel: brand.status_display,
})

const BrandsList = () => {
    const { push } = useRouter()
    const searchParams = useSearchParams()
    const statusFilter = (searchParams.get('cat') as BrandStatus | null) ?? 'all'
    const { data, isPending } = useListBrands({
        page: 1,
        page_size: 100,
        status: statusFilter === 'all' ? undefined : API_STATUS[statusFilter],
    })
    const items: BrandOut[] = data?.items ?? []
    const brands = items.map(toBrandItem)

    return (
        <div className="rounded-card-lg bg-surface-container-high p-2" dir="rtl">
            <TableListLayout
                value={statusFilter}
                TableColoumn={TABLE_COLOUMN}
                toggleButtonValue={ROUTE_CONFIGS.brands.TOGGLE_BUTTON_VALUE}
            >
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    {isPending ? (
                        <div className="flex justify-center py-10">
                            <Spinner className="size-6" />
                        </div>
                    ) : (
                        <Table className="border-collapse border-spacing-y-4">
                            <TableHeader />
                            <TableBody>
                                {brands.map((brand) => (
                                    <TableRow
                                        key={brand.id}
                                        data={brand}
                                        onEdit={() =>
                                            push(
                                                `/admin/catalog/brands/${brand.id}/edit`
                                            )
                                        }
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </TableListLayout>
        </div>
    )
}

export default BrandsList
