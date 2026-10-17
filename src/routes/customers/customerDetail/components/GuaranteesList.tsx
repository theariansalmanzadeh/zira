'use client'

import { useMemo } from 'react'
import type {
    CreditType,
    Guarantee,
    GuaranteeStatus,
} from '@/src/api/types/admin/customerDetails'
import {
    useGetCustomerCreditSummary,
    useListCustomerGuarantees,
} from '@/src/routes/customers/hooks/customerDetails'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { Button } from '@/src/shared/components/ui/button'
import { Pill } from '@/src/shared/components/ui/Pill'
import { Spinner } from '@/src/shared/components/ui/spinner'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/src/shared/components/ui/Table'
import TableEmptyState from '@/src/shared/components/ui/TableEmptyState'
import { formatFaDate } from '@/src/shared/libs/formatter'
import { useModalStore } from '@/src/shared/store/modal-store'
import CreditAmount from './CreditAmount'

const HEADERS = [
    'اعتبار مربوطه',
    'نوع ضمانت',
    'مبلغ / مقدار',
    'شماره سند',
    'نام بانک',
    'تاریخ سررسید',
    'ضامن',
    'وضعیت',
]

const STATUS_CONFIG: Record<
    GuaranteeStatus,
    { text: string; variant: 'success' | 'warning' | 'tonal' }
> = {
    ACTIVE: { text: 'فعال', variant: 'success' },
    PENDING_APPROVAL: { text: 'در انتظار تایید', variant: 'warning' },
    RELEASED: { text: 'آزاد شده', variant: 'tonal' },
}

const CREDIT_LABEL: Record<
    CreditType,
    { text: string; className: string }
> = {
    CHEQUE: {
        text: 'اعتبار چکی',
        className: 'border-0 bg-[#F1ECF7] [&_span]:text-[#8E6CB0]',
    },
    GOLDEN: {
        text: 'اعتبار طلایی',
        className: 'border-0 bg-[#FBF0E2] [&_span]:text-[#C8841A]',
    },
}

type GuaranteeRow = {
    id: string
    creditType?: CreditType
    typeLabel: string
    amount: number
    documentNo: string
    bankName: string
    dueDate: string
    guarantor: string
    status: GuaranteeStatus
}

const displayText = (value?: string | null) =>
    value == null || value.trim() === '' ? '—' : value

const GuaranteesList = ({ customerId }: { customerId: string }) => {
    const openModal = useModalStore((state) => state.openModal)
    const { data, isPending, isError } = useListCustomerGuarantees(
        customerId,
        { page: 1, page_size: 20 },
        Boolean(customerId)
    )
    const { data: summary } = useGetCustomerCreditSummary(
        customerId,
        Boolean(customerId)
    )
    const creditTypeByAccount = useMemo(() => {
        const map = new Map<string, CreditType>()
        for (const account of summary?.credit_accounts ?? []) {
            map.set(account.id, account.credit_type)
        }
        return map
    }, [summary])

    const rows = useMemo<GuaranteeRow[]>(
        () =>
            (data?.results ?? []).map((guarantee: Guarantee) => ({
                id: guarantee.id,
                creditType: creditTypeByAccount.get(guarantee.credit_account_id),
                typeLabel:
                    guarantee.guarantee_type === 'PERSONAL_CHEQUE'
                        ? 'چک شخصی'
                        : 'سفته',
                amount: Number(guarantee.amount) || 0,
                documentNo: displayText(guarantee.document_no),
                bankName: displayText(guarantee.bank_branch_name),
                dueDate: guarantee.due_date
                    ? formatFaDate(guarantee.due_date)
                    : '—',
                guarantor: displayText(guarantee.guarantor_name),
                status: guarantee.status,
            })),
        [data, creditTypeByAccount]
    )
    const activeTotal = rows.reduce(
        (sum, row) => (row.status === 'ACTIVE' ? sum + row.amount : sum),
        0
    )

    return (
        <div
            className="overflow-hidden rounded-card-md border border-outline-variant bg-surface-container-lowest lg:col-span-2"
            dir="rtl"
        >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant px-5 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#FBF0E2] text-[#A9744B]">
                        <Icon label="shield300Linear" className="size-5!" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-title-md font-semibold text-on-surface">
                            ضمانت‌ها
                        </span>
                        <span className="text-label-sm text-outline">
                            هر نوع اعتبار می‌تواند چند ضمانت داشته باشد.
                        </span>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex flex-col items-start gap-0.5">
                        <span className="text-label-sm text-outline">
                            جمع ضمانت‌های فعال
                        </span>
                        <CreditAmount
                            value={activeTotal}
                            className="text-title-md text-[#A9744B]"
                        />
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        className="border-[#E7A8A0] text-[#C45C5C] hover:bg-[#FDF4F3]"
                        onClick={() =>
                            openModal(ModalTypes.ADD_CUSTOMER_GUARANTEE, {
                                customerId,
                            })
                        }
                    >
                        + افزودن ضمانت
                    </Button>
                </div>
            </div>

            {isPending ? (
                <div className="flex justify-center p-6">
                    <Spinner className="size-6 text-outline" />
                </div>
            ) : isError ? (
                <p className="p-6 text-center text-label-md text-outline">
                    دریافت ضمانت‌ها با خطا مواجه شد.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <Table className="min-w-[980px] border-collapse">
                        <TableHeader className="bg-surface-container-high">
                            <TableRow className="border-b border-outline-variant hover:bg-transparent [&>*]:text-label-sm [&>*]:font-bold [&>*]:text-outline">
                                {HEADERS.map((label) => (
                                    <TableHead key={label}>{label}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.length === 0 ? (
                                <TableEmptyState
                                    colSpan={HEADERS.length}
                                    title="ضمانتی یافت نشد."
                                />
                            ) : (
                                rows.map((row) => {
                                    const status = STATUS_CONFIG[row.status]
                                    const credit = row.creditType
                                        ? CREDIT_LABEL[row.creditType]
                                        : null

                                    return (
                                        <TableRow
                                            key={row.id}
                                            className="[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface-variant"
                                        >
                                            <TableCell>
                                                {credit ? (
                                                    <Pill
                                                        text={credit.text}
                                                        variant="tonal"
                                                        className={`w-fit ${credit.className}`}
                                                    />
                                                ) : (
                                                    '—'
                                                )}
                                            </TableCell>
                                            <TableCell>{row.typeLabel}</TableCell>
                                            <TableCell>
                                                <CreditAmount value={row.amount} />
                                            </TableCell>
                                            <TableCell dir="ltr" className="text-right">
                                                {row.documentNo}
                                            </TableCell>
                                            <TableCell>{row.bankName}</TableCell>
                                            <TableCell>
                                                <span dir="ltr">{row.dueDate}</span>
                                            </TableCell>
                                            <TableCell>{row.guarantor}</TableCell>
                                            <TableCell>
                                                <Pill
                                                    text={status?.text ?? row.status}
                                                    variant={status?.variant ?? 'tonal'}
                                                    hasDot
                                                    className="w-fit border-0"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    )
}

export default GuaranteesList
