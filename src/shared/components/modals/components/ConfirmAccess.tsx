'use client'

import { useState } from 'react'
import { Button } from '@shared/components/ui/button'
import type { BaseModalProps } from '../types'
import AccessGroupSection from './confirmAccess/components/AccessGroupSection'
import { INITIAL_ACCESS_GROUPS } from './confirmAccess/constants'
import type {
    AccessPermissionGroup,
    AccessPermissionItem,
    ConfirmAccessModalData,
} from './confirmAccess/types'

const getGroupCheckedState = (
    items: AccessPermissionItem[]
): boolean | 'indeterminate' => {
    const checkedCount = items.filter((item) => item.checked).length

    if (checkedCount === 0) return false
    if (checkedCount === items.length) return true
    return 'indeterminate'
}

export function ConfirmAccess({ closeModal, data }: BaseModalProps) {
    const modalData = data as ConfirmAccessModalData | null | undefined
    const [accessGroups, setAccessGroups] = useState<AccessPermissionGroup[]>(
        INITIAL_ACCESS_GROUPS
    )
    const [expandedGroupId, setExpandedGroupId] = useState<string | null>(
        INITIAL_ACCESS_GROUPS[0]?.id ?? null
    )

    const updateAccessItem = (
        groupId: string,
        itemId: string,
        checked: boolean
    ) => {
        setAccessGroups((groups) =>
            groups.map((group) =>
                group.id === groupId
                    ? {
                          ...group,
                          items: group.items.map((item) =>
                              item.id === itemId ? { ...item, checked } : item
                          ),
                      }
                    : group
            )
        )
    }

    const toggleAccessGroup = (groupId: string, checked: boolean) => {
        setAccessGroups((groups) =>
            groups.map((group) =>
                group.id === groupId
                    ? {
                          ...group,
                          items: group.items.map((item) => ({
                              ...item,
                              checked,
                          })),
                      }
                    : group
            )
        )
    }

    const handleToggleExpand = (groupId: string) => {
        setExpandedGroupId((current) => (current === groupId ? null : groupId))
    }

    const handleApply = () => {
        modalData?.onApply?.(accessGroups)
        closeModal()
    }

    return (
        <div className="flex w-full flex-col gap-6" dir="rtl">
            <div className="flex flex-col gap-3">
                {accessGroups.map((group) => (
                    <AccessGroupSection
                        key={group.id}
                        group={group}
                        isExpanded={expandedGroupId === group.id}
                        groupCheckedState={getGroupCheckedState(group.items)}
                        onToggleExpand={() => handleToggleExpand(group.id)}
                        onToggleGroup={(checked) =>
                            toggleAccessGroup(group.id, checked)
                        }
                        onToggleItem={(itemId, checked) =>
                            updateAccessItem(group.id, itemId, checked)
                        }
                    />
                ))}
            </div>

            <div className="flex flex-row items-center justify-between pt-2">
                <Button type="button" variant="ghost" onClick={closeModal}>
                    بازگشت
                </Button>
                <Button type="button" variant="primary" onClick={handleApply}>
                    اعمال تغییرات
                </Button>
            </div>
        </div>
    )
}

export default ConfirmAccess
