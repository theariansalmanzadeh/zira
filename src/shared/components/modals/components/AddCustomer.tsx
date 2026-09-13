'use client'

import IconButton from '@/src/shared/components/ui/IconButton'
import { Pill } from '@/src/shared/components/ui/Pill'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/src/shared/components/ui/Table'
import { formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import type { BaseModalProps } from '../types'
import type { CustomerLevel } from '@/src/routes/customers/components/TableRow'

type AddCustomerRow = {
    id: string
    name: string
    level: CustomerLevel
    credit: number
    phone: string
    email: string
}

const LEVEL_CONFIG: Record<
    CustomerLevel,
    { text: string; variant: 'warning' | 'tonal' | 'outlined' }
> = {
    gold: { text: 'طلایی', variant: 'warning' },
    silver: { text: 'نقره‌ای', variant: 'tonal' },
    bronze: { text: 'برنزی', variant: 'outlined' },
}

const ADD_CUSTOMER_DUMMY: AddCustomerRow[] = [
    {
        id: 'CU-7362',
        name: 'آیدا میرزایی',
        level: 'gold',
        credit: 200000000,
        phone: '+98 912 673 4123',
        email: 'aida@gmail.com',
    },
    {
        id: 'CU-7363',
        name: 'سارا احمدی',
        level: 'silver',
        credit: 85000000,
        phone: '+98 935 120 8845',
        email: 'sara@gmail.com',
    },
    {
        id: 'CU-7364',
        name: 'رضا کریمی',
        level: 'bronze',
        credit: 42000000,
        phone: '+98 910 772 0098',
        email: 'reza@gmail.com',
    },
    {
        id: 'CU-7365',
        name: 'بهرام اکبری',
        level: 'gold',
        credit: 150000000,
        phone: '+98 912 441 2201',
        email: 'bahram@gmail.com',
    },
]

const TABLE_HEADERS = [
    'نام و نام خانوادگی',
    'شناسه مشتری',
    'سطح کاربر',
    'سقف اعتبار',
    'شماره تماس',
    '',
] as const

const AddCustomer = ({ closeModal }: BaseModalProps) => {
    const handleAdd = (_customerId: string) => {
        closeModal()
    }

    return (
        <div className="flex w-full flex-col gap-4" dir="rtl">
            <div className="overflow-hidden rounded-card-lg bg-surface-container-high p-2">
                <Table className="min-w-[720px] border-collapse border-spacing-y-4">
                    <TableHeader className="rounded-xl">
                        <TableRow className="hover:bg-transparent [&>*]:text-label-lg [&>*]:font-normal [&>*]:text-outline">
                            {TABLE_HEADERS.map((label, index) => (
                                <TableHead
                                    key={label || `action-${index}`}
                                    className={
                                        label === ''
                                            ? 'w-[1%] whitespace-nowrap'
                                            : undefined
                                    }
                                >
                                    {label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {ADD_CUSTOMER_DUMMY.map((customer) => {
                            const levelConfig = LEVEL_CONFIG[customer.level]

                            return (
                                <TableRow
                                    key={customer.id}
                                    className="[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface-variant"
                                >
                                    <TableCell>
                                        <div className="flex flex-row items-center gap-3">
                                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/60 text-label-lg font-medium text-on-primary">
                                                {customer.name.charAt(0)}
                                            </div>
                                            <span className="text-label-lg font-semibold text-on-surface">
                                                {customer.name}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-outline">
                                        {customer.id}
                                    </TableCell>
                                    <TableCell>
                                        <Pill
                                            className="border-0"
                                            variant={levelConfig.variant}
                                            text={levelConfig.text}
                                            hasDot
                                        />
                                    </TableCell>
                                    <TableCell className="text-success">
                                        {formatPrice(customer.credit)}
                                    </TableCell>
                                    <TableCell className="text-outline text-right" dir="ltr">
                                        {formatFaNumber(customer.phone)}
                                    </TableCell>
                                    <TableCell className="w-[1%] whitespace-nowrap">
                                        <IconButton
                                            icon="addSm400Linear"
                                            iconClassName="size-6! text-primary"
                                            onClick={() =>
                                                handleAdd(customer.id)
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default AddCustomer
