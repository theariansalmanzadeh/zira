"use client"

import { useSearchParams } from 'next/navigation'
import type { ContractOut, ContractStatusEnum } from '@/src/api/types/admin/pricing'
import { useListContracts } from '@/src/routes/catalog/hooks/pricing'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { Spinner } from '@/src/shared/components/ui/spinner'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableHeader from './components/TableHeader'
import ContractRow, { PricingRowProps } from './components/TableRow'
import { TABLE_COLOUMN } from './constants'

const CONTRACT_STATUSES: ContractStatusEnum[] = [
    'DRAFT',
    'APPLIED',
    'CANCELLED',
]

const toContractRow = (contract: ContractOut): PricingRowProps => ({
    data: {
        id: contract.id,
        contractTitle: contract.name,
        contractId: contract.code,
        date: contract.valid_from || contract.created_at,
        scope: contract.scope_count
            ? `${formatFaNumber(contract.scope_count)} قلم`
            : '—',
        percent:
            contract.direction === 'DECREASE'
                ? `-${contract.adjustment_pct}`
                : contract.adjustment_pct,
    },
})

const Contracts = () => {
    const searchParams = useSearchParams()
    const category = searchParams.get('cat')
    const status = CONTRACT_STATUSES.includes(category as ContractStatusEnum)
        ? (category as ContractStatusEnum)
        : 'DRAFT'
    const { data, isPending } = useListContracts({
        page: 1,
        page_size: 100,
        status,
    })
    const contracts: ContractOut[] = data?.results ?? []

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value={status}
                toggleButtonValue={ROUTE_CONFIGS.contracts.TOGGLE_BUTTON_VALUE}
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
                                contracts.map((contract) => (
                                    <ContractRow
                                        key={contract.id}
                                        data={toContractRow(contract).data}
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

export default Contracts
