import { Icon } from '@/src/shared/components/Icons/Icon'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/src/shared/components/ui/Breadcrumb'
import React from 'react'

const ProductBreadCrumb = ({ id }: { id: string }) => {
    return (
        <Breadcrumb dir='rtl'>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/plp' className='text-label-lg text-outline hover:text-on-surface'>
                        محصولات همه
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                    <Icon label='chavaron' className='size-4' />
                </BreadcrumbSeparator>
                <BreadcrumbItem className='text-label-lg text-outline hover:text-on-surface'>
                    دسته بندی
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                    <Icon label='chavaron' className='size-4' />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                    <BreadcrumbLink href={`/product/${id}`} className='text-label-lg text-on-surface'>
                        {id}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default ProductBreadCrumb