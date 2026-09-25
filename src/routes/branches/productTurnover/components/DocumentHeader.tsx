'use client'

import { Avatar, AvatarFallback } from '@/src/shared/components/ui/Avatar'
import InfoCardField from '@/src/shared/components/infoCard/components/InfoCardField'
import { cn } from '@shared/libs/utils'
import type { ProductTurnoverDocumentHeaderData } from '../constants'

type DocumentHeaderProps = ProductTurnoverDocumentHeaderData & {
    className?: string
}

const DocumentHeader = ({
    documentNumber,
    registeredAt,
    documentType,
    branch,
    warehouse,
    counterparty,
    registrar,
    status,
    className,
}: DocumentHeaderProps) => {
    return (
        <div
            className={cn(
                'rounded-card-md border border-outline-variant bg-surface-container-lowest p-6',
                className
            )}
            dir='rtl'
        >
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
                <InfoCardField label='شماره سند' value={documentNumber} />
                <InfoCardField label='تاریخ ثبت' value={registeredAt} />
                <InfoCardField label='نوع سند' value={documentType} />
                <InfoCardField label='شعبه' value={branch} />
            </div>

            <hr className='my-6 border-0 border-t border-dashed border-outline-variant' />

            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
                <InfoCardField label='انبار' value={warehouse} />
                <InfoCardField label='طرف حساب' value={counterparty} />
                <div className='flex flex-col gap-1 text-right'>
                    <span className='text-label-md text-outline'>ثبت‌کننده</span>
                    <div className='flex flex-row items-center gap-2'>
                        <Avatar size='sm'>
                            <AvatarFallback className='bg-surface-container-highest text-label-sm text-on-surface-variant'>
                                {registrar.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <span className='text-label-lg text-on-surface-variant'>
                            {registrar}
                        </span>
                    </div>
                </div>
                <InfoCardField label='وضعیت' value={status} />
            </div>
        </div>
    )
}

export default DocumentHeader
