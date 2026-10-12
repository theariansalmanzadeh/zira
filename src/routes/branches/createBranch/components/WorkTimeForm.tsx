'use client'

import { Dispatch, SetStateAction } from 'react'
import { Checkbox } from '@/src/shared/components/ui/Checkbox'
import FormDropdown, {
    type FormDropdownOption,
} from '@/src/shared/components/ui/FormDropdown'
import { Button } from '@/src/shared/components/ui/button'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { cn } from '@shared/libs/utils'
import {
    useCreateBranchContext,
    type WorkDay,
} from '../provider/CreateBranchProvider'

const TIME_OPTIONS: FormDropdownOption[] = [
    { label: '07:00', value: '07:00' },
    { label: '08:00', value: '08:00' },
    { label: '09:00', value: '09:00' },
    { label: '10:00', value: '10:00' },
    { label: '11:00', value: '11:00' },
    { label: '12:00', value: '12:00' },
    { label: '13:00', value: '13:00' },
    { label: '14:00', value: '14:00' },
    { label: '15:00', value: '15:00' },
    { label: '16:00', value: '16:00' },
    { label: '17:00', value: '17:00' },
    { label: '18:00', value: '18:00' },
    { label: '19:00', value: '19:00' },
    { label: '20:00', value: '20:00' },
    { label: '21:00', value: '21:00' },
    { label: '22:00', value: '22:00' },
]

type WorkTimeFormProps = {
    setActiveStep?: Dispatch<SetStateAction<number>>
}

const WorkTimeForm = ({
    setActiveStep: propSetActiveStep,
}: WorkTimeFormProps) => {
    const {
        workDays,
        updateWorkDay,
        setActiveStep: contextSetActiveStep,
    } = useCreateBranchContext()

    const setActiveStep = propSetActiveStep || contextSetActiveStep

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <span className="text-label-lg font-medium text-outline">
                ساعات کاری
            </span>
            <div className="rounded-card-md bg-surface-container-lowest p-6">
                <div className="flex flex-col gap-6">
                    {workDays.map((day: WorkDay) => (
                        <div
                            key={day.id}
                            className="grid grid-cols-1 items-end gap-3 md:grid-cols-[1fr_2fr_2fr]"
                        >
                            <div className="flex items-center gap-3 pb-2.5">
                                <Checkbox
                                    className="size-6"
                                    checked={day.enabled}
                                    onCheckedChange={(checked) =>
                                        updateWorkDay(day.id, {
                                            enabled: checked === true,
                                        })
                                    }
                                />
                                <span
                                    className={cn(
                                        'text-label-lg',
                                        day.enabled
                                            ? 'text-on-surface'
                                            : 'text-on-surface-variant'
                                    )}
                                >
                                    {day.label}
                                </span>
                            </div>

                            <div
                                className={cn(
                                    'grid grid-cols-2 gap-3 md:col-span-2',
                                    !day.enabled &&
                                        'pointer-events-none opacity-50'
                                )}
                            >
                                <div className="flex flex-row gap-1.5 items-center justify-between">
                                    <span className="text-label-lg text-on-surface-variant">
                                        از
                                    </span>
                                    <FormDropdown
                                        className="w-full"
                                        value={day.start}
                                        options={TIME_OPTIONS}
                                        onChange={(start) =>
                                            updateWorkDay(day.id, { start })
                                        }
                                    />
                                </div>
                                <div className="flex flex-row gap-1.5 items-center justify-between">
                                    <span className="text-label-lg text-on-surface-variant">
                                        تا
                                    </span>
                                    <FormDropdown
                                        className="w-full"
                                        value={day.end}
                                        options={TIME_OPTIONS}
                                        onChange={(end) =>
                                            updateWorkDay(day.id, { end })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex flex-row gap-3">
                    <Button
                        type="button"
                        variant="ghost"
                        className="w-fit gap-2 self-end text-on-surface-variant"
                        onClick={() => setActiveStep(1)}
                    >
                        <Icon label="arrorwRight400Linear" />
                        <span className="text-label-lg">بازگشت</span>
                    </Button>
                    <Button
                        type="button"
                        variant="primary"
                        size="lg"
                        className="w-full text-label-lg"
                        onClick={() => setActiveStep(3)}
                    >
                        ادامه
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default WorkTimeForm
