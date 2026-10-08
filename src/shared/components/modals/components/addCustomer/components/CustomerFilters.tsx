'use client'

import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { LEVEL_OPTIONS } from '../constants'

type CustomerFiltersProps = {
    level: string
    search: string
    onLevelChange: (value: string) => void
    onSearchChange: (value: string) => void
}

const CustomerFilters = ({
    level,
    search,
    onLevelChange,
    onSearchChange,
}: CustomerFiltersProps) => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormDropdown
                label="سطح کاربر"
                value={level}
                options={LEVEL_OPTIONS}
                onChange={onLevelChange}
            />
            <Input
                label="جستجو"
                value={search}
                onChange={onSearchChange}
                iconId="search400Linear"
                placeholder="جستجو با نام، شناسه یا شماره تماس..."
                wrapperClassName="w-full flex-row-reverse"
                className="text-right"
            />
        </div>
    )
}

export default CustomerFilters
