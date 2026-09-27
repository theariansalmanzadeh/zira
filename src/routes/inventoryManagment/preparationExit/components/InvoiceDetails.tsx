import { Pill } from '@/src/shared/components/ui/Pill'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/src/shared/components/ui/Table'

const INVOICE_HEADERS = [
    'ردیف',
    'کد محصول',
    'نام محصول',
    'واحد',
    'تعداد',
    'انبار تامین کننده قلم',
    'وضعیت قلم',
]

export type InvoiceDetailItem = {
    id: string
    row: string
    productCode: string
    productName: string
    unit: string
    quantity: string
    supplyingWarehouse: string
    status: string
}

const INVOICE_ROWS: InvoiceDetailItem[] = [
    {
        id: 'invoice-item-1',
        row: '۱',
        productCode: '7352-63',
        productName: 'لباس خواب ساتن',
        unit: 'عدد',
        quantity: '۲',
        supplyingWarehouse: 'انبار مرکزی تهران',
        status: 'در انتظار',
    },
]

const InvoiceDetails = ({
    items = INVOICE_ROWS,
}: {
    items?: InvoiceDetailItem[]
}) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {INVOICE_HEADERS.map((label) => (
                        <TableHead key={label}>{label}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.row}</TableCell>
                        <TableCell>{item.productCode}</TableCell>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.supplyingWarehouse}</TableCell>
                        <TableCell>
                            <Pill
                                variant="warning"
                                text={item.status}
                                hasDot
                                className="border-0"
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default InvoiceDetails
