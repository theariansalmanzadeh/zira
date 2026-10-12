'use client'

import { useParams, useSearchParams } from 'next/navigation'
import InfoCardField from '@/src/shared/components/infoCard/components/InfoCardField'
import { Avatar, AvatarFallback } from '@/src/shared/components/ui/Avatar'
import QuickAccessCard, {
    QuickAccessCardContent,
    QuickAccessCardItem,
    QuickAccessCardList,
} from '@/src/shared/components/quickAccessCard'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { useModalStore } from '@/src/shared/store/modal-store'
import { useSearchParam } from '@/src/shared/hooks/useSearchParam'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import { useGetBranch } from '@/src/routes/branches/hooks/organization'
import ProductTableHeader from './components/TableHeader'
import ProductTableRow from './components/TableRow'
import CashRegisterTableHeader from './components/CashRegisterTableHeader'
import CashRegisterTableRow from './components/CashRegisterTableRow'
import BankAccountTableHeader from './components/BankAccountTableHeader'
import BankAccountTableRow from './components/BankAccountTableRow'
import Header from './components/Header'
import {
    BANK_ACCOUNT_DUMMY,
    BANK_ACCOUNT_TABLE_COLOUMN,
    CASH_REGISTER_DUMMY,
    PRODUCT_TABLE_COLOUMN,
    TABLE_COLOUMN,
    mapQuickAccessItems,
    quickAccessSummary,
    type QuickAccessStat,
} from './constants'

const SectionDivider = () => (
    <hr className='border-0 border-t border-dashed border-outline-variant' />
)

const getTableColumns = (tableView: string) => {
    if (tableView === 'cashRegisters') return TABLE_COLOUMN
    if (tableView === 'bankAccounts') return BANK_ACCOUNT_TABLE_COLOUMN
    return PRODUCT_TABLE_COLOUMN
}

const BranchDetails = () => {
    const { openModal } = useModalStore()
    const { addSearchParam } = useSearchParam()
    const searchParams = useSearchParams()
    const params = useParams<{ id: string }>()
    const branchId = params.id ?? ''
    const { data: branch } = useGetBranch(branchId)
    const tableView = searchParams.get('cat') ?? 'products'
    const isCashRegisters = tableView === 'cashRegisters'
    const isBankAccounts = tableView === 'bankAccounts'
    const quickAccessItems = mapQuickAccessItems(branch)
    const address =
        branch?.full_address ||
        [branch?.province, branch?.city, branch?.address_details]
            .filter(Boolean)
            .join('، ')

    const handleQuickAccessClick = (item: QuickAccessStat) => {
        if (!branch) return
        if (item.modalType) {
            openModal(item.modalType, {
                values: item.values,
                branchId,
                warehouses: branch.warehouses,
                posDevices: branch.pos_devices ?? [],
                permit: branch.permit,
            })
            return
        }
        if (item.tableValue) {
            addSearchParam('cat', item.tableValue)
        }
    }

    return (
        <div dir='rtl'>
            <Header
                name={branch?.name ?? ''}
                code={branch?.code ?? ''}
                status={branch?.status}
                statusDisplay={branch?.status_display}
            />
            <div className='flex h-full flex-col gap-6'>
                <div className='rounded-card-md bg-surface-container-lowest p-6'>
                    <div className='grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-5'>
                        <div className='flex flex-col gap-1 text-right'>
                            <span className='text-label-md text-outline'>
                                مسئول شعبه
                            </span>
                            <div className='flex flex-row items-center gap-2'>
                                <Avatar size='sm'>
                                    <AvatarFallback className='bg-surface-container-highest text-label-sm text-on-surface-variant'>
                                        —
                                    </AvatarFallback>
                                </Avatar>
                                <span className='text-label-lg text-on-surface-variant'>
                                    —
                                </span>
                            </div>
                        </div>
                        <InfoCardField label='تعداد اقلام' value='—' />
                        <InfoCardField label='متراژ' value='—' />
                        <InfoCardField label='موجودی' value='—' />
                        <InfoCardField label='وضعیت بیمه' value='—' />
                    </div>
                    <SectionDivider />
                    <div className='grid grid-cols-1 gap-6 py-6 lg:grid-cols-5'>
                        <InfoCardField
                            label='شماره تماس'
                            value={branch?.phone || '—'}
                        />
                        <InfoCardField
                            label='آدرس'
                            value={address || '—'}
                            className='col-span-2'
                        />
                    </div>
                    <SectionDivider />
                    <div className='pt-6'>
                        <QuickAccessCard>
                            <QuickAccessCardContent>
                                <QuickAccessCardList className='gap-2'>
                                    {quickAccessItems.map((item) => (
                                        <QuickAccessCardItem
                                            key={item.label}
                                            label={item.label}
                                            value={quickAccessSummary(
                                                item.label,
                                                item.values
                                            )}
                                            href={item.href}
                                            className='max-w-[186px] cursor-pointer'
                                            onClick={() =>
                                                handleQuickAccessClick(item)
                                            }
                                        />
                                    ))}
                                </QuickAccessCardList>
                            </QuickAccessCardContent>
                        </QuickAccessCard>
                    </div>
                </div>
                <div className='mt-auto'>
                    <TableListLayout
                        key={tableView}
                        TableColoumn={getTableColumns(tableView)}
                        value={tableView}
                        toggleButtonValue={
                            ROUTE_CONFIGS.branchDetails.TOGGLE_BUTTON_VALUE
                        }
                    >
                        <div className='rounded-card-lg bg-surface-container-high p-2'>
                            {isBankAccounts ? (
                                <div className='overflow-x-auto overflow-hidden rounded-card-md bg-surface-container-lowest'>
                                    <BankAccountTableHeader />
                                    <div className='flex flex-col'>
                                        {BANK_ACCOUNT_DUMMY.map((item) => (
                                            <BankAccountTableRow
                                                key={item.id}
                                                data={item}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <Table className='border-collapse border-spacing-y-4'>
                                    {isCashRegisters ? (
                                        <>
                                            <CashRegisterTableHeader />
                                            <TableBody>
                                                {CASH_REGISTER_DUMMY.map(
                                                    (item) => (
                                                        <CashRegisterTableRow
                                                            key={item.id}
                                                            data={item}
                                                        />
                                                    )
                                                )}
                                            </TableBody>
                                        </>
                                    ) : (
                                        <>
                                            <ProductTableHeader />
                                            <TableBody>
                                                <ProductTableRow
                                                    data={{
                                                        productName: 'محصول 1',
                                                        imgUrl: 'https://via.placeholder.com/150',
                                                        code: '1234567890',
                                                        brand: 'برند 1',
                                                        category: 'دسته بندی 1',
                                                        stockInfo: '100',
                                                    }}
                                                />
                                            </TableBody>
                                        </>
                                    )}
                                </Table>
                            )}
                        </div>
                    </TableListLayout>
                </div>
            </div>
        </div>
    )
}

export default BranchDetails
