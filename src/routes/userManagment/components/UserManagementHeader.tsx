"use client"

import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'

const UserManagementHeader = () => {
    return (
        <div className="flex flex-row items-center justify-end">
            {/* <Button variant="secondary">
                <Icon label="export300Linear" className="size-6! text-on-surface-variant" />
                <span>خروجی اکسل</span>
            </Button> */}
        </div>
    )
}

export default UserManagementHeader
