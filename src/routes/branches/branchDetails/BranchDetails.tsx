'use client'

import { useParams, useSearchParams } from 'next/navigation'
import InfoCardField from '@/src/shared/components/infoCard/components/InfoCardField'
import { Avatar, AvatarFallback } from '@/src/shared/components/ui/Avatar'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { Table, TableBody, TableCell, TableRow } from '@/src/shared/components/ui/Table'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import { useGetBranch } from '@/src/routes/branches/hooks/organization'
import ProductTableHeader from './components/TableHeader'
import ProductTableRow from './components/TableRow'
import CashBoxTable from './components/CashBoxTable'
import EmployeeTableHeader from './components/EmployeeTableHeader'
import EmployeeTableRow from './components/EmployeeTableRow'
import BankAccountTableHeader from './components/BankAccountTableHeader'
import BankAccountTableRow from './components/BankAccountTableRow'
import Header from './components/Header'
import BranchQuickAccess from './components/BranchQuickAccess'
import {
    BANK_ACCOUNT_DUMMY,
    BANK_ACCOUNT_TABLE_COLOUMN,
    CASH_BOX_TABLE_COLOUMN,
    EMPLOYEE_TABLE_COLOUMN,
    PRODUCT_TABLE_COLOUMN,
} from './constants'

const SectionDivider = () => (
    <hr className='border-0 border-t border-dashed border-outline-variant' />
)

const getTableColumns = (tableView: string) => {
    if (tableView === 'cashRegisters') return CASH_BOX_TABLE_COLOUMN
    if (tableView === 'bankAccounts') return BANK_ACCOUNT_TABLE_COLOUMN
    if (tableView === 'employees') return EMPLOYEE_TABLE_COLOUMN
    return PRODUCT_TABLE_COLOUMN
}

const BranchDetails = () => {
    const searchParams = useSearchParams()
    const params = useParams<{ id: string }>()
    const branchId = params.id ?? ''
    const { data: branch } = useGetBranch(branchId)
    const tableView = searchParams.get('cat') ?? 'products'
    const isCashRegisters = tableView === 'cashRegisters'
    const isBankAccounts = tableView === 'bankAccounts'
    const isEmployees = tableView === 'employees'
    const employees = branch?.employees ?? []
    const address =
        branch?.full_address ||
        [branch?.province, branch?.city, branch?.address_details]
            .filter(Boolean)
            .join('، ')

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
                    <BranchQuickAccess branchId={branchId} branch={branch} />
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
                                    {isEmployees ? (
                                        <>
                                            <EmployeeTableHeader />
                                            <TableBody>
                                                {employees.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell
                                                            colSpan={9}
                                                            className='py-6 text-center text-label-lg text-outline'
                                                        >
                                                            کارمندی ثبت نشده است.
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    employees.map((employee) => (
                                                        <EmployeeTableRow
                                                            key={
                                                                employee?.id ||
                                                                employee?.user_id
                                                            }
                                                            data={employee}
                                                        />
                                                    ))
                                                )}
                                            </TableBody>
                                        </>
                                    ) : isCashRegisters ? (
                                        <CashBoxTable
                                            cashBoxes={branch?.cash_boxes}
                                        />
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
