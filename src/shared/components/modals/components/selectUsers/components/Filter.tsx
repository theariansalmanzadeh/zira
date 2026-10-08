'use client'

import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { BRANCH_FILTER_OPTIONS, ROLE_FILTER_OPTIONS } from '../constants'

type FilterProps = {
    search: string
    role: string
    branch: string
    onSearchChange: (value: string) => void
    onRoleChange: (value: string) => void
    onBranchChange: (value: string) => void
}

const Filter = ({
    search,
    role,
    branch,
    onSearchChange,
    onRoleChange,
    onBranchChange,
}: FilterProps) => {
    return (
        <>
            <div
                className='flex flex-col gap-3 sm:flex-row sm:items-end'
                dir='rtl'
            >
                <FormDropdown
                    value={role}
                    options={ROLE_FILTER_OPTIONS}
                    onChange={onRoleChange}
                    placeholder='همه نقش‌ها'
                    className='w-full sm:w-40 [&>span:first-child]:mb-0 [&>span:first-child]:hidden'
                />
                <FormDropdown
                    value={branch}
                    options={BRANCH_FILTER_OPTIONS}
                    onChange={onBranchChange}
                    placeholder='همه شعب'
                    className='w-full sm:w-40 [&>span:first-child]:mb-0 [&>span:first-child]:hidden'
                />
            </div>
            <Input
                value={search}
                onChange={onSearchChange}
                placeholder='نام، کد پرسنلی یا موبایل...'
                iconId='search400Linear'
                iconClassName='text-on-surface-variant'
                wrapperClassName='w-full flex-1 flex-row-reverse bg-surface-container-lowest border border-outline-variant'
                className='text-right'
            />
        </>
    )
}

export default Filter
