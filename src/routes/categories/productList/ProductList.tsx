import { Table, TableBody } from '@/src/shared/components/ui/Table'
import Tablerow, { TablerowProps } from './components/Tablerow'
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
            stock: '۳۱۲ آیتم در ۲ متغیر',
            status: 'pending',
        },
    },
]

const ProductList = ({ data = PRODUCT_LIST_DUMMY }: { data?: TablerowProps[] }) => {
    return (
        <div className='bg-surface-container-high rounded-card-lg p-2'>
            <TableListLayout TableColoumn={TABLE_COLOUMN}>
                <div className='rounded-card-lg bg-surface-container-high p-2'>
                    <Table className='border-collapse border-spacing-y-4'>
                        <TableHeader />
                        <TableBody>
                            {data.map((item, index) => (
                                <Tablerow key={index} data={item.data} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </TableListLayout>
        </div>
    )
}

export default ProductList
