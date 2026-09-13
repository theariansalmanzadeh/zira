import { Icon } from '@/src/shared/components/Icons/Icon'
import { Pill } from '@/src/shared/components/ui/Pill'
import { cn } from '@/src/shared/libs/utils'
import React from 'react'
import { DeliveryMethodOption, DeliverySelectionAction } from '../types'

type DeliveryMethodCardProps = {
    method: DeliveryMethodOption
    isSelected: boolean
    dispatch: (action: DeliverySelectionAction) => void
}

const DeliveryMethodCard = ({ method, isSelected, dispatch }: DeliveryMethodCardProps) => {
    return (
        <button
            key={method.id}
            type="button"
            onClick={() =>
                dispatch({
                    type: 'SET_METHOD',
                    payload: method.id,
                })
            }
            className={cn(
                'flex w-full flex-row items-center justify-between gap-3 rounded-card-lg border p-4 text-right transition-colors',
                isSelected
                    ? 'border-primary bg-surface-container-lowest'
                    : 'border-outline-variant bg-surface-container-lowest'
            )}
        >
            <div className="flex flex-row items-center gap-3">
                <div className="size-12 shrink-0 rounded-card-md bg-surface-container-high" />
                <div className="flex flex-col gap-1">
                    <span className="text-label-lg text-on-surface">
                        {method.name}
                    </span>
                    <span className="text-label-sm text-outline">
                        {method.description}
                    </span>
                </div>
            </div>

            <div className="flex flex-col items-end gap-2">
                <Pill
                    text={method.duration}
                    variant="tonal"
                    className="border-0"
                />
                <div className="flex flex-row items-center gap-1 text-label-md text-on-surface-variant">
                    <span>{method.price}</span>
                    <Icon
                        label="currency"
                        className="size-4! text-on-surface-variant"
                    />
                </div>
            </div>
        </button>
    )
}

export default DeliveryMethodCard