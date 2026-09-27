'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import Tablerow, { TablerowProps } from './components/Tablerow'
import Filter from './components/Filter'
import TableHeader from './components/TableHeader'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { TABLE_COLOUMN } from './constants'

export const PRODUCT_LIST_DUMMY: TablerowProps[] = [
    {
        data: {
            id: '1',
            productName: 'بادی گیپور',
            imgUrl: '/images/product1.jpg',
            sku: '۷۶۲۳-۷۳۵۲',
            brand: 'Lorenzo',
            category: 'لباس زیر زنانه',
            mainCategory: 'underwear',
            subCategory: 'women',
            finalCategory: 'body',
            size: 'M',
            color: 'guipure',
            stock: '۴۲۰ آیتم در ۲ متغیر',
            status: 'pending',
        },
    },
    {
        data: {
            id: '2',
            productName: 'ست لباس خواب ساتن',
            imgUrl: '/images/product1.jpg',
            sku: '۸۴۱۲-۹۰۳۱',
            brand: 'Victoria',
            category: 'لباس خواب',
            mainCategory: 'sleepwear',
            subCategory: 'women',
            finalCategory: 'set',
            size: 'L',
            color: 'satin',
            stock: '۱۵۶ آیتم در ۳ متغیر',
            status: 'active',
        },
    },
    {
        data: {
            id: '3',
            productName: 'شورت کشی مشکی',
            imgUrl: '/images/product1.jpg',
            sku: '۵۵۰۱-۲۲۸۷',
            brand: 'Lorenzo',
            category: 'لباس زیر زنانه',
            mainCategory: 'underwear',
            subCategory: 'women',
            finalCategory: 'brief',
            size: 'S',
            color: 'black',
            stock: '۸۹۰ آیتم در ۱ متغیر',
            status: 'active',
        },
    },
    {
        data: {
            id: '4',
            productName: 'سوتین پوش دار',
            imgUrl: '/images/product1.jpg',
            sku: '۳۳۰۹-۶۱۴۴',
            brand: 'Calvin Klein',
            category: 'لباس زیر زنانه',
            mainCategory: 'underwear',
            subCategory: 'women',
            finalCategory: 'bra',
            size: 'XL',
            color: 'white',
            stock: '۲۴۵ آیتم در ۴ متغیر',
            status: 'diactive',
        },
    },
    {
        data: {
            id: '5',
            productName: 'تاپ ورزشی زنانه',
            imgUrl: '/images/product1.jpg',
            sku: '۹۹۲۰-۴۵۶۳',
            brand: 'Nike',
            category: 'لباس ورزشی',
            mainCategory: 'sport',
            subCategory: 'comfort',
            finalCategory: 'top',
            size: 'M',
            color: 'black',
            stock: '۳۱۲ آیتم در ۲ متغیر',
            status: 'pending',
        },
    },
]

const matchesFilter = (value: string | undefined, selected: string | null) => {
    if (!selected || selected === 'all') return true
    return value === selected
}

const ProductList = ({ data = PRODUCT_LIST_DUMMY }: { data?: TablerowProps[] }) => {
    const searchParams = useSearchParams()
    const filteredData = useMemo(() => {
        const query = (searchParams.get('q') || '').trim().toLowerCase()

        return data.filter((item) => {
            const product = item.data
            const matchesQuery =
                !query ||
                product.productName.toLowerCase().includes(query) ||
                product.sku.toLowerCase().includes(query)

            return (
                matchesQuery &&
                matchesFilter(product.mainCategory, searchParams.get('main')) &&
                matchesFilter(
                    product.subCategory,
                    searchParams.get('subCategory')
                ) &&
                matchesFilter(product.finalCategory, searchParams.get('final')) &&
                matchesFilter(product.brand, searchParams.get('brand')) &&
                matchesFilter(product.size, searchParams.get('size')) &&
                matchesFilter(product.color, searchParams.get('color'))
            )
        })
    }, [data, searchParams])

    return (
        <div className='flex flex-col gap-3'>
            <Filter />
            <div className='bg-surface-container-high rounded-card-lg p-2'>
            <TableListLayout TableColoumn={TABLE_COLOUMN}>
                <div className='rounded-card-lg bg-surface-container-high p-2'>
                    <Table className='border-collapse border-spacing-y-4'>
                        <TableHeader />
                        <TableBody>
                            {filteredData.map((item) => (
                                <Tablerow key={item.data.id} data={item.data} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    className="mt-2"
                    page={1}
                    totalAmount={filteredData.length}
                />
            </TableListLayout>
            </div>
        </div>
    )
}

export default ProductList
