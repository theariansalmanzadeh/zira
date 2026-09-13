'use client'

import { useMemo, useState } from 'react'
import { ROUTE_CONFIGS } from '@/src/shared/constants/routeConfigs'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import BankCard from './components/BankCard'
import {
    BANK_ACCOUNTS_DUMMY,
    filterBankAccounts,
    type BankAccountTab,
} from './constants'

const BankAndVaults = () => {
    const [activeTab] = useState<BankAccountTab | string>(
        'bankAccounts'
    )

    const filteredAccounts = useMemo(
        () => filterBankAccounts(BANK_ACCOUNTS_DUMMY, activeTab),
        [activeTab]
    )

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <TableListLayout
                value={activeTab}
                toggleButtonValue={ROUTE_CONFIGS.bankAndVaults.TOGGLE_BUTTON_VALUE}
                hasHeaderActions
                isCardLayout
            >
                {filteredAccounts.map((account) => (
                    <BankCard key={account.id} data={account} />
                ))}
            </TableListLayout>
        </div>
    )
}

export default BankAndVaults
