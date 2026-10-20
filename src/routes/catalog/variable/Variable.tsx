'use client'

import { useRouter } from 'next/navigation'
import type { AttributeOut } from '@/src/api/types/admin/catalog'
import {
    useListAttributes,
    useListColors,
    useListSizes,
} from '@/src/routes/catalog/hooks/catalog'
import { Spinner } from '@/src/shared/components/ui/spinner'
import TableEmptyState from '@/src/shared/components/ui/TableEmptyState'
import VariableCard from './components/VariableCard'

const Variable = () => {
    const { push } = useRouter()
    const { data, isLoading } = useListAttributes({ page: 1, page_size: 100 })
    const { data: sizesPage } = useListSizes({ page: 1, page_size: 100 })
    const { data: colorsPage } = useListColors({ page: 1, page_size: 100 })

    const attributes = data?.results ?? []
    const sizes = (sizesPage?.results ?? []).map((size) => ({
        id: size.id,
        label: size.name,
    }))
    const colors = (colorsPage?.results ?? []).map((color) => ({
        id: color.id,
        label: color.name,
        hex: color.hex_code,
    }))

    if (isLoading) {
        return (
            <div className='flex justify-center py-10'>
                <Spinner className='size-6' />
            </div>
        )
    }

    return (
        <div className='flex w-full flex-col gap-3' dir='rtl'>
            {attributes.length === 0 ? (
                <TableEmptyState title='ویژگی‌ای یافت نشد.' />
            ) : (
                <div className='grid w-full grid-cols-2 gap-3'>
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
            )}
            <div className='grid w-full grid-cols-2 gap-3'>
                <VariableCard
                    title='سایز'
                    items={sizes}
                    onManage={() =>
                        push('/admin/catalog/variable/new?cat=size')
                    }
                />
                <VariableCard
                    title='رنگ'
                    items={colors}
                    onManage={() =>
                        push('/admin/catalog/variable/new?cat=color')
                    }
                />
            </div>
        </div>
    )
}

export default Variable
