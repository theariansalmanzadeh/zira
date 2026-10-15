'use client'

import { Input } from '@/src/shared/components/ui/Input'
import type { UserListFilter } from '../utils/filterUsers'

type FilterProps = {
    value: UserListFilter
    onChange: (value: UserListFilter) => void
}

const Filter = ({ value, onChange }: FilterProps) => {
    const update = (key: keyof UserListFilter, next: string) => {
        onChange({ ...value, [key]: next })
    }

    return (
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2' dir='rtl'>
            <Input
                label='عنوان شغلی'
                value={value.job_title}
                onChange={(next) => update('job_title', next)}
            />
            <Input
                label='نام کاربری'
                value={value.username}
                onChange={(next) => update('username', next)}
            />
            <Input
                label='نام'
                value={value.first_name}
                onChange={(next) => update('first_name', next)}
            />
            <Input
                label='شماره تلفن'
                value={value.phone_number}
                onChange={(next) => update('phone_number', next)}
            />
        </div>
    )
}

export default Filter
