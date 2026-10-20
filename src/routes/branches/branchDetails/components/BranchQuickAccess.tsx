'use client'

import type { Branch } from '@/src/api/types/admin/organization'
import QuickAccessCard, {
    QuickAccessCardContent,
    QuickAccessCardItem,
    QuickAccessCardList,
} from '@/src/shared/components/quickAccessCard'
import { useSearchParam } from '@/src/shared/hooks/useSearchParam'
import { useModalStore } from '@/src/shared/store/modal-store'
import {
    mapQuickAccessItems,
    quickAccessSummary,
    type QuickAccessStat,
} from '../constants'

type BranchQuickAccessProps = {
    branchId: string
    branch?: Branch | null
}

const BranchQuickAccess = ({ branchId, branch }: BranchQuickAccessProps) => {
    const { openModal } = useModalStore()
    const { addSearchParam } = useSearchParam()
    const quickAccessItems = mapQuickAccessItems(branch)

    const handleQuickAccessClick = (item: QuickAccessStat) => {
        if (!branch) return
        if (item.modalType) {
            openModal(item.modalType, {
                values: item.values,
                branchId,
                warehouses: branch.warehouses,
                posDevices: branch.pos_devices,
                permit: branch.permit,
            })
            return
        }
        if (item.tableValue) {
            addSearchParam('cat', item.tableValue)
        }
    }

    return (
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
                                onClick={() => handleQuickAccessClick(item)}
                            />
                        ))}
                    </QuickAccessCardList>
                </QuickAccessCardContent>
            </QuickAccessCard>
        </div>
    )
}

export default BranchQuickAccess
