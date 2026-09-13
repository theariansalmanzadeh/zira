"use client"

import { Table, TableBody } from '@/src/shared/components/ui/Table'
import SupplierRow, { SupplierRowProps } from './components/TableRow'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import TableHeader from './components/TableHeader'
import TableProvider from '@/src/shared/context/TableProvider'
import { TABLE_COLOUMN } from './constants'

export const SUPPLIER_DUMMY: SupplierRowProps[] = [
    {
        data: {
            item: {
                name: "Tomatoes",
                imgUrl: "/images/tomatoes.png"
            },
            supplierId: "SUP-001",
            phoneNumber: "+1 555 123 4567",
            email: "tomatoes@supplier.com",
            productVariaty: {
                variaty: "Cherry",
                packs: 120
            },
            status: "active"
        }
    },
    {
        data: {
            item: {
                name: "Potatoes",
                imgUrl: "/images/potatoes.png"
            },
            supplierId: "SUP-002",
            phoneNumber: "+1 555 987 6543",
            email: "potatoes@supplier.com",
            productVariaty: {
                variaty: "Russet",
                packs: 200
            },
            status: "active"
        }
    },
    {
        data: {
            item: {
                name: "Onions"
            },
            supplierId: "SUP-003",
            phoneNumber: "+1 555 222 1111",
            email: "onions@supplier.com",
            productVariaty: {
                variaty: "Red",
                packs: 90
            },
            status: "diactive"
        }
    },
    {
        data: {
            item: {
                name: "Carrots",
            },
            supplierId: "SUP-004",
            phoneNumber: "+1 555 444 8888",
            email: "carrots@supplier.com",
            productVariaty: {
                variaty: "Organic",
                packs: 150
            },
            status: "active"
        }
    }
]

const Supplier = () => {
    return (
        <TableProvider TableColoumn={TABLE_COLOUMN}>
            <div>
            <div className='bg-surface-container-high rounded-card-lg p-2'>
                <Table className='border-spacing-y-4 border-collapse' >
                    <TableHeader />
                    <TableBody className=''>
                        {SUPPLIER_DUMMY.filter((item) => item.data.status === "active").map((item, index) => <SupplierRow key={index} data={item.data} />)}
                    </TableBody>
                </Table>
            </div>
            <TablePagination className='mt-2' />
        </div>
        </TableProvider>
    )
}

export default Supplier