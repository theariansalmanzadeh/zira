'use client'

import IconButton from '@/src/shared/components/ui/IconButton'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/src/shared/components/ui/Popover'
import { useTableActionsStore } from '@/src/shared/store/table-actions-store'

const SORT_OPTIONS = ['جدیدترین', 'قدیمی‌ترین', 'بیشترین مبلغ']

const Sort = () => {
    const sort = useTableActionsStore((state) => state.sort)
    const setSort = useTableActionsStore((state) => state.setSort)

    return (
        <Popover>
            <PopoverTrigger asChild>
                <IconButton icon="sort400Linear" />
            </PopoverTrigger>
            <PopoverContent side="left">
                <span className="text-outline">مرتب‌سازی بر اساس:</span>
                <ul className="[&_li]:cursor-pointer [&_li]:p-2 [&_li]:text-label-md">
                    {SORT_OPTIONS.map((option, index) => (
                        <li
                            key={option}
                            onClick={() => setSort(index === 0 ? !sort : true)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            </PopoverContent>
        </Popover>
    )
}

export default Sort
