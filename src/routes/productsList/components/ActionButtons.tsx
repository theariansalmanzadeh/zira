'use client'

import { useState } from 'react'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import IconButton from '@/src/shared/components/ui/IconButton'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/src/shared/components/ui/Popover'
import Filters from './Filters'

const SORT_OPTIONS = ['جدیدترین', 'قدیمی‌ترین', 'بیشترین مبلغ']

const ActionButtons = () => {
    const [sort, setSort] = useState(SORT_OPTIONS[0])
    const [sortOpen, setSortOpen] = useState(false)

    return (
        <div className='flex flex-row items-center justify-center gap-sm'>
            <IconButton variant='outline' icon='cozy' onClick={() => { }} />
            <IconButton variant='outline' icon='sort400Linear' onClick={() => { }} />
            <Popover open={sortOpen} onOpenChange={setSortOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant='outline'
                        className='flex flex-row-reverse items-center justify-center gap-sm'
                    >
                        {sort}
                        <Icon
                            label='filter400Linear'
                            className='size-4 text-on-surface-variant'
                        />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    align='end'
                    className='w-56 bg-surface-container-lowest'
                    dir='rtl'
                >
                    <span className='text-outline'>مرتب‌سازی بر اساس:</span>
                    <ul className='[&_li]:cursor-pointer [&_li]:p-2 [&_li]:text-label-md'>
                        {SORT_OPTIONS.map((option) => (
                            <li
                                key={option}
                                className={option === sort ? 'text-primary' : undefined}
                                onClick={() => {
                                    setSort(option)
                                    setSortOpen(false)
                                }}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </PopoverContent>
            </Popover>
            <Filters />
        </div>
    )
}

export default ActionButtons
