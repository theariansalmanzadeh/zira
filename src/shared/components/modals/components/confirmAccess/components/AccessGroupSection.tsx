'use client'

import { Icon } from '@shared/components/Icons/Icon'
import { Checkbox } from '@shared/components/ui/Checkbox'
import { Label } from '@shared/components/ui/Label'
import { cn } from '@shared/libs/utils'
import type { AccessPermissionGroup } from '../types'

type AccessGroupSectionProps = {
    group: AccessPermissionGroup
    isExpanded: boolean
    groupCheckedState: boolean | 'indeterminate'
    onToggleExpand: () => void
    onToggleGroup: (checked: boolean) => void
    onToggleItem: (itemId: string, checked: boolean) => void
}

const AccessGroupSection = ({
    group,
    isExpanded,
    groupCheckedState,
    onToggleExpand,
    onToggleGroup,
    onToggleItem,
}: AccessGroupSectionProps) => {
    return (
        <div className="overflow-hidden rounded-card-md border border-outline-variant bg-surface-container-high">
            <div className="flex flex-row items-center justify-between gap-3 px-4 py-3">
                <button
                    type="button"
                    onClick={onToggleExpand}
                    className="flex size-8 shrink-0 items-center justify-center rounded-full text-on-surface-variant"
                    aria-expanded={isExpanded}
                >
                    <Icon
                        label={isExpanded ? 'chevronUp300Linear' : 'chevronDown300Linear'}
                        className="size-5"
                    />
                </button>

                <div className="flex flex-1 flex-row items-center justify-end gap-3">
                    <Label
                        htmlFor={`${group.id}-all`}
                        className="text-label-lg font-normal text-on-surface"
                    >
                        {group.label}
                    </Label>
                    <Checkbox
                        id={`${group.id}-all`}
                        checked={groupCheckedState}
                        onCheckedChange={(checked) => {
                            if (checked === 'indeterminate') return
                            onToggleGroup(checked === true)
                        }}
                    />
                </div>
            </div>

            <div
                className={cn(
                    'grid transition-[grid-template-rows] duration-200 ease-out',
                    isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                )}
            >
                <div className="overflow-hidden">
                    <div className="flex flex-col gap-1 border-t border-outline-variant px-4 py-2">
                        {group.items.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-row items-center justify-between py-2"
                            >
                                <Checkbox
                                    id={item.id}
                                    checked={item.checked}
                                    onCheckedChange={(checked) =>
                                        onToggleItem(item.id, checked === true)
                                    }
                                />
                                <Label
                                    htmlFor={item.id}
                                    className="text-label-lg font-normal text-on-surface"
                                >
                                    {item.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccessGroupSection
