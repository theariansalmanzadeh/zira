'use client'

import { useParams } from 'next/navigation'
import { useGetUser } from '@/src/routes/userManagment/hooks/user'
import EditUser from '@/src/routes/userManagment/user/editUser/EditUser'
import { Spinner } from '@/src/shared/components/ui/spinner'

export default function EditUserPage() {
    const { id } = useParams<{ id: string }>()
    const { data: user, isPending } = useGetUser(id)

    if (isPending) {
        return (
            <div className='flex justify-center py-10'>
                <Spinner className='size-6' />
            </div>
        )
    }

    if (!user) return null

    return <EditUser user={user} />
}
