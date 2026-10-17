'use client'

import { useRouter } from 'next/navigation'
import type { AttributeOut } from '@/src/api/types/admin/catalog'
import { useListAttributes } from '@/src/routes/catalog/hooks/catalog'
import { Spinner } from '@/src/shared/components/ui/spinner'
import TableEmptyState from '@/src/shared/components/ui/TableEmptyState'
import VariableCard from './components/VariableCard'

const Variable = () => {
    const { push } = useRouter()
    const { data, isLoading } = useListAttributes({ page: 1, page_size: 100 })

    const attributes = data?.results ?? []

    if (isLoading) {
        return (
            <div className='flex justify-center py-10'>
                <Spinner className='size-6' />
            </div>
        )
    }

    if (attributes.length === 0) {
        return <TableEmptyState title='ویژگی‌ای یافت نشد.' />
    }

    return (
        <div className='grid w-full grid-cols-2 gap-3' dir='rtl'>
            {attributes.map((item: AttributeOut) => (
                <VariableCard
                    key={item.id}
                    data={item}
                    onManage={() =>
                        push(`/admin/catalog/variable/${item.id}/edit`)
                    }
                />
            ))}
        </div>
    )
}

export default Variable
