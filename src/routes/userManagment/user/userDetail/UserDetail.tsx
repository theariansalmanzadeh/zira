'use client'

import { useState } from 'react'
import type { User } from '@/src/api/types/admin/user'
import {
    ToggleGroup,
    ToggleGroupItem,
} from '@/src/shared/components/ui/ToggleGroup'
import Departments from './component/Departments'
import Header from './component/header'
import PersonnelInfo from './component/PersonnelInfo'
import Role from './component/Role'
import SecurityStatus from './component/SecurityStatus'
import SessionManagement from './component/SessionManagement'

const USER_DETAIL_TABS = [
    { label: 'اطلاعات پرسنلی', value: 'personnel' },
    { label: 'نقش', value: 'role' },
    { label: 'دپارتمان‌ها', value: 'departments' },
    { label: 'مدیریت نشست', value: 'sessions' },
    { label: 'امنیت و وضعیت', value: 'security' },
] as const

type UserDetailTab = (typeof USER_DETAIL_TABS)[number]['value']

const UserDetail = ({ user }: { user: User }) => {
    const [tab, setTab] = useState<UserDetailTab>('personnel')

    return (
        <div className='flex w-full flex-col gap-4' dir='rtl'>
            <Header user={user} />
            <ToggleGroup
                type='single'
                value={tab}
                variant='filled'
                className='w-fit rounded-container-md! bg-surface-container-high p-1.5'
                onValueChange={(value) => {
                    if (
                        value === 'personnel' ||
                        value === 'role' ||
                        value === 'departments' ||
                        value === 'sessions' ||
                        value === 'security'
                    ) {
                        setTab(value)
                    }
                }}
            >
                {USER_DETAIL_TABS.map((item) => (
                    <ToggleGroupItem key={item.value} value={item.value}>
                        {item.label}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>

            {tab === 'personnel' ? <PersonnelInfo user={user} /> : null}
            {tab === 'role' ? (
                <Role userId={user.id} roles={user.roles} />
            ) : null}
            {tab === 'departments' ? (
                <Departments departments={user.departments} />
            ) : null}
            {tab === 'sessions' ? <SessionManagement /> : null}
            {tab === 'security' ? <SecurityStatus /> : null}
        </div>
    )
}

export default UserDetail
