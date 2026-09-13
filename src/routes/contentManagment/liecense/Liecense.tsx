'use client'

import { Suspense, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import LicenseCard from '../liecenses/components/LicenseCard'
import {
    filterLicenses,
    LICENSES_DUMMY,
    LICENSES_TOGGLE_BUTTON_VALUE,
    TABLE_COLOUMN,
    type LicenseCardData,
    type LicenseTab,
} from '../liecenses/constants'

const LiecenseContent = () => {
    const searchParams = useSearchParams()
    const activeTab = (searchParams.get('cat') ??
        'certificates') as LicenseTab | string
    const [items, setItems] = useState<LicenseCardData[]>(LICENSES_DUMMY)

    const filteredItems = useMemo(
        () => filterLicenses(items, activeTab),
        [items, activeTab]
    )

    const updateItem = (id: string, patch: Partial<LicenseCardData>) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, ...patch } : item))
        )
    }

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id))
    }

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value="certificates"
                toggleButtonValue={[...LICENSES_TOGGLE_BUTTON_VALUE]}
                hasHeaderActions
                isCardLayout
                hasTableSettings={false}
                hasFilter={false}
                hasSort={false}
                hasExpand={false}
            >
                {filteredItems.map((item) => (
                    <LicenseCard
                        key={item.id}
                        data={item}
                        onVisibleChange={(visibleOnSite) =>
                            updateItem(item.id, { visibleOnSite })
                        }
                        onDelete={() => removeItem(item.id)}
                    />
                ))}
            </TableListLayout>
        </div>
    )
}

const Liecense = () => (
    <Suspense fallback={null}>
        <LiecenseContent />
    </Suspense>
)

export default Liecense
