import { Pill } from '@/src/shared/components/ui/Pill'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/src/shared/components/ui/Table'

const ITEM_LIST_HEADERS = [
    'کد محصول',
    'نوع محصول',
    'نام محصول',
    'سایز',
    'رنگ',
    'واحد',
    'تعداد درخواستی',
    'آدرس کالا در انبار',
    'تعداد برداشت شده',
    'وضعیت قلم',
]

export type PreparationExitItem = {
    id: string
    productCode: string
    productType: string
    productName: string
    size: string
    color: string
    colorHex: string
    unit: string
    requestedQuantity: string
    warehouseAddress: string
    pickedQuantity: string
    status: string
}

const ITEM_LIST_ROWS: PreparationExitItem[] = [
    {
        id: 'item-1',
        productCode: '7352-63',
        productType: 'ست',
        productName: 'لباس خواب ساتن',
        size: 'L',
        color: 'زغالی',
        colorHex: '#1a1a1a',
        unit: 'عدد',
        requestedQuantity: '۲',
        warehouseAddress: 'A-R1-S2-B03',
        pickedQuantity: '۲',
        status: 'در انتظار',
    },
]

const ItemList = ({ items = ITEM_LIST_ROWS }: { items?: PreparationExitItem[] }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {ITEM_LIST_HEADERS.map((label) => (
                        <TableHead key={label}>{label}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.productCode}</TableCell>
                        <TableCell>{item.productType}</TableCell>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>{item.size}</TableCell>
                        <TableCell>
                            <span className="inline-flex items-center gap-2">
                                {item.color}
                                <span
                                    className="size-3 shrink-0 rounded-full"
                                    style={{ backgroundColor: item.colorHex }}
                                />
                            </span>
                        </TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell>{item.requestedQuantity}</TableCell>
                        <TableCell>{item.warehouseAddress}</TableCell>
                        <TableCell>{item.pickedQuantity}</TableCell>
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

export default ItemList
