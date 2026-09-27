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
                    <Icon label='chevronLeft400Linear' className='size-4 text-outline' />
                </BreadcrumbSeparator>
                <BreadcrumbItem className='text-label-lg text-outline hover:text-on-surface'>
                    دسته بندی
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                    <Icon label='chevronLeft400Linear' className='size-4 text-outline!' />
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