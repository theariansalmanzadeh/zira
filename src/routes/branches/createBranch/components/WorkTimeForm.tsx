"use client"

import { Dispatch, SetStateAction, useState } from 'react'
import { Checkbox } from '@/src/shared/components/ui/Checkbox'
import FormDropdown, { type FormDropdownOption } from '@/src/shared/components/ui/FormDropdown'
import { Button } from '@/src/shared/components/ui/button'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { cn } from '@shared/libs/utils'

const TIME_OPTIONS: FormDropdownOption[] = [
    { label: '08:00', value: '08:00' },
    { label: '09:00', value: '09:00' },
    { label: '12:00', value: '12:00' },
    { label: '14:00', value: '14:00' },
    { label: '18:00', value: '18:00' },
    { label: '20:00', value: '20:00' },
]

type WorkDay = {
    id: string
    label: string
    enabled: boolean
    start: string
    end: string
}

const INITIAL_WORK_DAYS: WorkDay[] = [
    { id: 'saturday', label: 'شنبه', enabled: true, start: '09:00', end: '18:00' },
    { id: 'sunday', label: 'یکشنبه', enabled: true, start: '09:00', end: '18:00' },
    { id: 'monday', label: 'دوشنبه', enabled: true, start: '09:00', end: '18:00' },
    { id: 'tuesday', label: 'سه‌شنبه', enabled: true, start: '09:00', end: '18:00' },
    { id: 'wednesday', label: 'چهارشنبه', enabled: true, start: '09:00', end: '18:00' },
    { id: 'thursday', label: 'پنجشنبه', enabled: false, start: '09:00', end: '14:00' },
    { id: 'friday', label: 'جمعه', enabled: false, start: '09:00', end: '14:00' },
]

const WorkTimeForm = ({ setActiveStep }: { setActiveStep: Dispatch<SetStateAction<number>> }) => {
    const [workDays, setWorkDays] = useState<WorkDay[]>(INITIAL_WORK_DAYS)

    const updateDay = (id: string, patch: Partial<WorkDay>) => {
        setWorkDays((days) =>
            days.map((day) => (day.id === id ? { ...day, ...patch } : day))
        )
    }

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <span className='text-label-lg font-medium text-outline'>ساعات کاری</span>
            <div className='rounded-card-md bg-surface-container-lowest p-6'>
                <div className='flex flex-col gap-6'>
                    {workDays.map((day) => (
                        <div
                            key={day.id}
                            className='grid grid-cols-1 items-end gap-3 md:grid-cols-[1fr_2fr_2fr]'
                        >
                            <div className='flex items-center gap-3 pb-2.5'>
                                <Checkbox
                                    className='size-6'
                                    checked={day.enabled}
                                    onCheckedChange={(checked) =>
                                        updateDay(day.id, { enabled: checked === true })
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
                                    !day.enabled && 'pointer-events-none opacity-50'
                                )}
                            >
                                <div className='flex flex-row gap-1.5 items-center justify-between'>
                                    <span className='text-label-lg text-on-surface-variant'>از</span>
                                    <FormDropdown
                                        className='w-full'
                                        value={day.start}
                                        options={TIME_OPTIONS}
                                        onChange={(start) => updateDay(day.id, { start })}
                                    />
                                </div>
                                <div className='flex flex-row gap-1.5 items-center justify-between'>
                                    <span className='text-label-lg text-on-surface-variant'>تا</span>
                                    <FormDropdown
                                        className='w-full'
                                        value={day.end}
                                        options={TIME_OPTIONS}
                                        onChange={(end) => updateDay(day.id, { end })}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='mt-6 flex flex-row gap-3'>
                    <Button
                        type='button'
                        variant='ghost'
                        className='w-fit gap-2 self-end text-on-surface-variant'
                        onClick={() => setActiveStep(1)}
                    >
                        <Icon label='arrorwRight400Linear' />
                        <span className='text-label-lg'>بازگشت</span>
                    </Button>
                    <Button
                        type='button'
                        variant='primary'
                        size='lg'
                        className='w-full text-label-lg'
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
