'use client'

import { Button } from '@/src/shared/components/ui/button'
import { cn } from '@shared/libs/utils'

export type AdminActionsMeta = {
    initialApprovalDate: string
    finalApprovalDate: string
    documentNumber: string
}

type AdminActionsProps = {
    meta?: AdminActionsMeta
    recountRequested?: boolean
    finalDiscrepancyConfirmed?: boolean
    accountingIssued?: boolean
    onRequestRecount?: () => void
    onConfirmFinalDiscrepancy?: () => void
    onIssueAccounting?: () => void
    onPrintAccounting?: () => void
    className?: string
}

const DEFAULT_META: AdminActionsMeta = {
    initialApprovalDate: '۱۴۰۴/۱۲/۱۳',
    finalApprovalDate: '۱۴۰۴/۱۲/۱۵',
    documentNumber: '—',
}

const AdminActions = ({
    meta = DEFAULT_META,
    recountRequested = true,
    finalDiscrepancyConfirmed = false,
    accountingIssued = false,
    onRequestRecount,
    onConfirmFinalDiscrepancy,
    onIssueAccounting,
    onPrintAccounting,
    className,
}: AdminActionsProps) => {
    return (
        <div
            className={cn(
                'flex h-fit flex-col gap-4 rounded-card-lg border border-outline-variant bg-surface-container-lowest p-4',
                className
            )}
            dir='rtl'
        >
            <h3 className='text-title-md font-semibold text-on-surface'>
                اکشن‌های ادمین کل
            </h3>

            <div className='flex flex-col gap-2'>
                <Button
                    type='button'
                    variant='default-high'
                    className='h-auto w-full whitespace-normal px-3 py-3 text-label-md'
                    onClick={onRequestRecount}
                >
                    درخواست شمارش مجدد مغایرت‌ها
                </Button>
                <Button
                    type='button'
                    variant='default-high'
                    className='h-auto w-full whitespace-normal px-3 py-3 text-label-md'
                    disabled={!recountRequested || finalDiscrepancyConfirmed}
                    onClick={onConfirmFinalDiscrepancy}
                >
                    مغایرت نهایی تایید شد
                </Button>
                <Button
                    type='button'
                    variant='ghost'
                    className='h-auto w-full whitespace-normal bg-error-container px-3 py-3 text-label-md text-error hover:bg-error-container/80'
                    onClick={onIssueAccounting}
                >
                    صدور سند حسابداری
                </Button>
                <Button
                    type='button'
                    variant='default-high'
                    className='h-auto w-full whitespace-normal px-3 py-3 text-label-md'
                    disabled={!accountingIssued}
                    onClick={onPrintAccounting}
                >
                    چاپ سند حسابداری
                </Button>
            </div>

            {recountRequested && (
                <p className='text-label-sm leading-6 text-outline'>
                    شمارش مجدد مغایرت‌ها درخواست شد؛ مقدار مغایرت نهایی را در
                    ستون آخر جدول وارد کنید.
                </p>
            )}

            <div className='border-t border-outline-variant' />

            <div className='flex flex-col gap-3'>
                <div className='flex flex-row items-center justify-between gap-3 text-label-md'>
                    <span className='text-on-surface-variant'>
                        تاریخ تایید اولیه
                    </span>
                    <span className='text-on-surface'>
                        {meta.initialApprovalDate}
                    </span>
                </div>
                <div className='flex flex-row items-center justify-between gap-3 text-label-md'>
                    <span className='text-on-surface-variant'>
                        تاریخ تایید نهایی
                    </span>
                    <span className='text-on-surface'>
                        {meta.finalApprovalDate}
                    </span>
                </div>
                <div className='flex flex-row items-center justify-between gap-3 text-label-md'>
                    <span className='text-on-surface-variant'>شماره سند</span>
                    <span className='text-on-surface'>
                        {meta.documentNumber}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default AdminActions
