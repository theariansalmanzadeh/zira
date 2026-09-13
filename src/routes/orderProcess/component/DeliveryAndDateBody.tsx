'use client'

import { useReducer } from 'react'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { Pill } from '@/src/shared/components/ui/Pill'
import { cn } from '@/src/shared/libs/utils'
import { DeliverySelectionState, DeliverySelectionAction } from '../types'
import { DELIVERY_METHODS, DELIVERY_DATES, DELIVERY_TIMES } from '../content'
import DeliveryMethodCard from './DeliveryMethodCard'

const INITIAL_SELECTION_STATE: DeliverySelectionState = {
    methodId: 'tipax',
    dateId: null,
    timeId: null,
    showError: false,
}

export const deliverySelectionReducer = (
    state: DeliverySelectionState,
    action: DeliverySelectionAction
): DeliverySelectionState => {
    switch (action.type) {
        case 'SET_METHOD':
            return { ...state, methodId: action.payload, showError: false }
        case 'SET_DATE':
            return { ...state, dateId: action.payload, showError: false }
        case 'SET_TIME':
            return { ...state, timeId: action.payload, showError: false }
        case 'SHOW_ERROR':
            return { ...state, showError: true }
        case 'CLEAR_ERROR':
            return { ...state, showError: false }
        case 'RESET':
            return INITIAL_SELECTION_STATE
        default:
            return state
    }
}

type DeliveryAndDateBodyProps = {
    onConfirm: (selection: {
        methodId: string
        dateId: string
        timeId: string
    }) => void
    isPhysicalDelivery: boolean
}

const DeliveryAndDateBody = ({ onConfirm, isPhysicalDelivery }: DeliveryAndDateBodyProps) => {
    const [state, dispatch] = useReducer(
        deliverySelectionReducer,
        INITIAL_SELECTION_STATE
    )

    const handleConfirm = () => {
        if (!state.methodId || !state.dateId || !state.timeId) {
            dispatch({ type: 'SHOW_ERROR' })
            return
        }

        onConfirm({
            methodId: state.methodId,
            dateId: state.dateId,
            timeId: state.timeId,
        })
    }

    return (
        <div className="flex flex-col gap-4" dir="rtl">
            <div className="flex flex-col gap-3">
                {isPhysicalDelivery && DELIVERY_METHODS.map((method) => {
                    const isSelected = state.methodId === method.id

                    return (
                        <DeliveryMethodCard
                            key={method.id}
                            method={method}
                            isSelected={isSelected}
                            dispatch={dispatch}
                        />
                    )
                })}
            </div>

            <div className="border-t border-dashed border-outline-variant" />

            <div className="flex flex-row gap-2 overflow-x-auto">
                {DELIVERY_DATES.map((date) => {
                    const isSelected = state.dateId === date.id

                    return (
                        <button
                            key={date.id}
                            type="button"
                            onClick={() =>
                                dispatch({
                                    type: 'SET_DATE',
                                    payload: date.id,
                                })
                            }
                            className={cn(
                                'flex min-w-16 flex-col items-center gap-1 rounded-card-md border px-3 py-2',
                                isSelected
                                    ? 'border-primary bg-surface-container-lowest'
                                    : 'border-outline-variant bg-surface-container-lowest'
                            )}
                        >
                            <span className="text-label-sm text-outline">
                                {date.dayLabel}
                            </span>
                            <span className="text-label-md text-on-surface">
                                {date.dateLabel}
                            </span>
                        </button>
                    )
                })}
            </div>

            <div className="border-t border-dashed border-outline-variant" />

            <div className="flex flex-col gap-3">
                {DELIVERY_TIMES.map((time) => {
                    const isSelected = state.timeId === time.id

                    return (
                        <button
                            key={time.id}
                            type="button"
                            onClick={() =>
                                dispatch({
                                    type: 'SET_TIME',
                                    payload: time.id,
                                })
                            }
                            className="flex flex-row items-center gap-3 text-right"
                        >
                            <span
                                className={cn(
                                    'flex size-5 items-center justify-center rounded-full border',
                                    isSelected
                                        ? 'border-primary'
                                        : 'border-outline-variant'
                                )}
                            >
                                {isSelected && (
                                    <span className="size-2.5 rounded-full bg-primary" />
                                )}
                            </span>
                            <span className="text-label-md text-on-surface">
                                {time.label}
                            </span>
                        </button>
                    )
                })}

                {state.showError && (
                    <div className="flex flex-row items-center gap-2 text-error">
                        <Icon
                            label="info400Linear"
                            className="size-4! text-error"
                        />
                        <span className="text-label-sm">
                            لطفا روز و ساعت ارسال را انتخاب کنید.
                        </span>
                    </div>
                )}
            </div>

            <Button
                type="button"
                variant="primary"
                className="mt-2 w-full rounded-button-lg py-3"
                onClick={handleConfirm}
            >
                <span className="text-label-lg text-on-primary">
                    تایید و ادامه
                </span>
            </Button>
        </div>
    )
}

export default DeliveryAndDateBody
