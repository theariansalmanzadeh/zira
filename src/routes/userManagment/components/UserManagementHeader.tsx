"use client"

import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { getCreateRouteFromTab } from '../utils/createRoutes'
import { getTabValueFromSearchParams } from '../utils/tabSearchParams'

const UserManagementHeader = () => {
    const searchParams = useSearchParams()
    const { push } = useRouter()

    const activeTab = getTabValueFromSearchParams({
        group: searchParams.get('group') ?? undefined,
        user: searchParams.get('user') ?? undefined,
        role: searchParams.get('role') ?? undefined,
    })

    return (
        <div className="flex flex-row items-center justify-between">
            <Button
                variant="primary"
                onClick={() => push(getCreateRouteFromTab(activeTab))}
            >
                <Icon label="addSm400Linear" className="size-6! text-on-primary" />
                افزودن جدید
            </Button>
            <Button variant="secondary">
                <Icon label="export300Linear" className="size-6! text-on-surface-variant" />
                <span>خروجی اکسل</span>
            </Button>
        </div>
    )
}

export default UserManagementHeader
