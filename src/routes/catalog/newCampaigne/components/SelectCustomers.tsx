'use client'

import { useMemo, type ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { ModalTypes } from '@/src/shared/components/modals/types'
import type { AddCustomerRow } from '@/src/shared/components/modals/components/addCustomer/constants'
import { LEVEL_CONFIG } from '@/src/shared/components/modals/components/addCustomer/constants'
import { Pill } from '@/src/shared/components/ui/Pill'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/src/shared/components/ui/Table'
import TableEmptyState from '@/src/shared/components/ui/TableEmptyState'
import { useModalStore } from '@/src/shared/store/modal-store'
import type { TableFilterItem } from '@/src/shared/store/table-actions-store'
import { useTable } from '@/src/shared/context/TableProvider'
import { formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import { randomColorGenerator } from '@/src/shared/libs/color'
import { cn } from '@/src/shared/libs/utils'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import type { CampaignFormValues } from './schema'

const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'name', header_label: 'نام و نام خانوادگی', isChecked: true },
    { id: 'code', header_label: 'شناسه مشتری', isChecked: true },
    { id: 'level', header_label: 'سطح کاربر', isChecked: true },
    { id: 'credit', header_label: 'سقف اعتبار', isChecked: true },
    { id: 'phone', header_label: 'شماره تماس', isChecked: true },
]

const SelectedCustomersHeader = () => {
    const { visibleTableColoumn } = useTable()

    return (
        <TableHeader className='rounded-xl'>
            <TableRow className='hover:bg-transparent [&>*]:text-label-lg [&>*]:font-normal [&>*]:text-outline'>
                {visibleTableColoumn.map((column) => (
                    <TableHead key={column.id}>{column.header_label}</TableHead>
                ))}
            </TableRow>
        </TableHeader>
    )
}

const SelectedCustomerRow = ({ customer }: { customer: AddCustomerRow }) => {
    const { visibleTableColoumn } = useTable()
    const levelConfig = LEVEL_CONFIG[customer.level]
    const avatarColor = useMemo(() => randomColorGenerator(), [])

    const cells: Record<string, ReactNode> = {
        name: (
            <div className='flex flex-row items-center gap-3'>
                <div
                    className={cn(
                        'flex size-10 shrink-0 items-center justify-center rounded-full text-label-lg font-medium',
                        avatarColor.className
                    )}
                >
                    {customer.name.charAt(0)}
                </div>
                <span className='text-label-lg font-semibold text-on-surface'>
                    {customer.name}
                </span>
            </div>
        ),
        code: <span className='text-outline'>{customer.code}</span>,
        level: (
            <Pill
                className='border-0'
                variant={levelConfig.variant}
                text={levelConfig.text}
                hasDot
            />
        ),
        credit: (
            <span className='text-success'>{formatPrice(customer.credit)}</span>
        ),
        phone: (
            <span className='text-right text-outline' dir='ltr'>
                {formatFaNumber(customer.phone)}
            </span>
        ),
    }

    return (
        <TableRow className='[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface-variant'>
            {visibleTableColoumn.map((column) => (
                <TableCell key={column.id}>{cells[column.id]}</TableCell>
            ))}
        </TableRow>
    )
}

const SelectCustomers = ({ hasGroup = true }: { hasGroup?: boolean }) => {
    const { openModal } = useModalStore()
    const { getValues, setValue, watch } = useFormContext<CampaignFormValues>()
    const customers = watch('customers') ?? []

    const handleCustomersChange = (selected: AddCustomerRow[]) => {
        const current = getValues('customers') ?? []
        const existingIds = new Set(current.map((customer) => customer.id))
        setValue(
            'customers',
            [
                ...current,
                ...selected.filter((customer) => !existingIds.has(customer.id)),
            ],
            { shouldDirty: true }
        )
    }

    return (
        <div
            className='rounded-card-lg bg-surface-container-lowest p-6'
            dir='rtl'
        >
            <div className='mb-4 flex items-center justify-between gap-4'>
                <div className='flex flex-col gap-1 text-right'>
                    <span className='text-label-lg text-on-surface'>
                        مشتریان منتخب
                    </span>
                    <span className='text-label-md text-outline'>
                        مشتریان هدف این کمپین را از لیست انتخاب کنید
                    </span>
                </div>
                <Button
                    type='button'
                    variant='primary'
                    size='default'
                    className='shrink-0 gap-1.5'
                    onClick={() =>
                        openModal(ModalTypes.ADD_CUSTOMER, {
                            hasGroup,
                            selectedIds: customers.map((customer) => customer.id),
                            onChange: handleCustomersChange,
                        })
                    }
                >
                    <Icon label='addSm400Broken' className='size-5!' />
                    افزودن مشتری
                </Button>
            </div>

            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                hasHeaderActions={false}
                hasSearch={false}
                hasFilter={false}
                hasSort={false}
                hasTableSettings={false}
                hasExpand={false}
            >
                <div className='rounded-card-lg bg-surface-container-high p-2'>
                    <Table className='border-collapse border-spacing-y-4'>
                        <SelectedCustomersHeader />
                        <TableBody>
                            {customers.length === 0 ? (
                                <TableEmptyState
                                    colSpan={TABLE_COLOUMN.length}
                                    title='مشتری‌ای انتخاب نشده است.'
                                />
                            ) : (
                                customers.map((customer) => (
                                    <SelectedCustomerRow
                                        key={customer.id}
                                        customer={customer}
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

export default SelectCustomers
