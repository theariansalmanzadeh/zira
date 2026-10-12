'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useGetStaffProfile } from '@/src/routes/userManagment/hooks/me'
import { Spinner } from '@/src/shared/components/ui/spinner'

const GuardLayout = ({ children }: { children: React.ReactNode }) => {
    const { replace } = useRouter()
    const { data, isPending, isError } = useGetStaffProfile()

    useEffect(() => {
        if (isPending || data) return
        if (isError || !data) replace('/admin/login')
    }, [data, isError, isPending, replace])

    if (isPending) {
        return (
            <div className='flex min-h-[50vh] items-center justify-center'>
                <Spinner className='size-6' />
            </div>
        )
    }

    if (!data) return null

    return children
}

export default GuardLayout
