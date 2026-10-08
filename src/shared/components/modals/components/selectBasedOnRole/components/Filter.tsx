'use client'

import { Input } from '@/src/shared/components/ui/Input'

type FilterProps = {
    search: string
    onSearchChange: (value: string) => void
    onSelectAll: () => void
}

const Filter = ({ search, onSearchChange, onSelectAll }: FilterProps) => {
    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <Input
                value={search}
                onChange={onSearchChange}
                placeholder='نام یا کد نقش...'
                iconId='search400Linear'
                wrapperClassName='w-full flex-row-reverse bg-surface-container-lowest border border-outline-variant'
                className='text-right'
            />
            <div className='flex justify-start'>
                <button
                    type='button'
                    onClick={onSelectAll}
                    className='text-label-md font-medium text-primary'
                >
                    انتخاب همه
                </button>
            </div>
        </div>
    )
}

export default Filter
