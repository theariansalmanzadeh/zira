'use client'

import type { UserManagementSearchParams } from '../index'
import UserManagementHeader from './UserManagementHeader'

type UserManagementLayoutProps = {
    children: React.ReactNode
    searchParams: UserManagementSearchParams
}

const UserManagementLayout = ({ children }: UserManagementLayoutProps) => {
    return (
        <>
            <UserManagementHeader />
            {children}
        </>
    )
}

export default UserManagementLayout
