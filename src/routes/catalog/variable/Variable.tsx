'use client'

import { useRouter } from 'next/navigation'
import type { AttributeOut } from '@/src/api/types/admin/catalog'
import { useListAttributes } from '@/src/routes/catalog/hooks/catalog'
import { Spinner } from '@/src/shared/components/ui/spinner'
import VariableCard from './components/VariableCard'

const Variable = () => {
    const { push } = useRouter()
    const { data, isLoading } = useListAttributes({ page: 1, page_size: 100 })
    const attributes = data?.items ?? []

    if (isLoading) {
        return (
            <div className='flex justify-center py-10'>
                <Spinner className='size-6' />
            </div>
        )
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
