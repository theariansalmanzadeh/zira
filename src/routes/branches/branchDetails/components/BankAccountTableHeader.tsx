'use client'

import { cn } from '@/src/shared/libs/utils'
import { BANK_ACCOUNT_COLUMNS, BANK_ACCOUNT_GRID_CLASS } from '../constants'

const BankAccountTableHeader = () => {
    return (
        <div
            className={cn(
                BANK_ACCOUNT_GRID_CLASS,
                'min-w-[1100px] rounded-t-card-md bg-surface-container-high px-3 py-3 text-label-lg font-normal text-outline'
            )}
        >
            {BANK_ACCOUNT_COLUMNS.map((column) => (
                <div key={column.id}>{column.label}</div>
            ))}
        </div>
    )
}

export default BankAccountTableHeader
