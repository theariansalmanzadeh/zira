"use client"

import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { getCreateRouteFromTab } from '../utils/createRoutes'

const UserManagementHeader = () => {
    const searchParams = useSearchParams()
    const { push } = useRouter()

    const section = searchParams.get('sub')
    const activeTab =
        section === 'group' ? 'groups' : section === 'role' ? 'role' : 'users'
    const showAddButton = activeTab === 'users'

    return (
        <div
            className={`flex flex-row items-center ${showAddButton ? 'justify-between' : 'justify-end'}`}
        >
            {showAddButton && (
                <Button
                    variant="primary"
                    onClick={() => push(getCreateRouteFromTab(activeTab))}
                >
                    <Icon label="addSm400Linear" className="size-6! text-on-primary" />
                    افزودن جدید
                </Button>
            )}
            <Button variant="secondary">
                <Icon label="export300Linear" className="size-6! text-on-surface-variant" />
                <span>خروجی اکسل</span>
            </Button>
        </div>
    )
}

export default UserManagementHeader
