"use client"

import { useState } from 'react'
import { Calendar } from 'lucide-react'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/src/shared/components/ui/ToggleGroup'

const PERIOD_OPTIONS = [
    { value: 'month', label: 'ماه' },
    { value: 'week', label: 'هفته' },
    { value: 'today', label: 'امروز' },
] as const

const PERIOD_LABEL: Record<(typeof PERIOD_OPTIONS)[number]['value'], string> = {
    month: 'این ماه',
    week: 'این هفته',
    today: 'امروز',
}

type HeaderProps = {
    onNewBranch?: () => void
    onSelectRange?: () => void
}

const Header = ({ onNewBranch, onSelectRange }: HeaderProps) => {
    const [period, setPeriod] = useState<string>('month')

    return (
        <div className='flex flex-row items-start justify-between gap-3'>
            <div className='flex flex-col gap-1 text-right'>
                <h1 className='text-title-lg font-bold text-on-surface'>داشبورد شعب</h1>
                <p className='text-label-md text-on-surface-variant'>
                    نمای کلی شبکه شعب، فروش و عملکرد — دوره: {PERIOD_LABEL[period as keyof typeof PERIOD_LABEL]}
                </p>
            </div>

            <div className='flex shrink-0 flex-row items-center gap-2'>
                <ToggleGroup
                    type='single'
                    value={period}
                    variant='filled'
                    className='rounded-container-md! bg-surface-container-high p-1.5'
                    onValueChange={(value) => value && setPeriod(value)}
                >
                    {PERIOD_OPTIONS.map((option) => (
                        <ToggleGroupItem key={option.value} value={option.value}>
                            {option.label}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>

                <Button variant='outline' onClick={onSelectRange}>
                    <Calendar className='size-4 text-outline' />
                    <span className='text-label-sm'>انتخاب بازه</span>
                </Button>

                <span className='text-outline'>-</span>

                <Button variant='primary' onClick={onNewBranch}>
                    <span className='text-label-sm text-on-primary'>شعبه جدید</span>
                    <Icon label='plus' />
                </Button>
            </div>
        </div>
    )
}

export default Header
