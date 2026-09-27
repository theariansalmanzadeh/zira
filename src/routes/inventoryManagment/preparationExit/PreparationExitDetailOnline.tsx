import { Pill } from '@/src/shared/components/ui/Pill'
import { getPreparationExitById } from './constants/exits'
import ExitDetailFields from './components/ExitDetailFields'
import ExitDetailTables from './components/ExitDetailTables'
import NameWithAvatar from './components/NameWithAvatar'

const DETAIL_FIELDS = [
    { key: 'dateTime', label: 'تاریخ ارجاع' },
    { key: 'invoiceNumber', label: 'شماره فاکتور' },
    { key: 'customerCode', label: 'کد مشتری' },
    {
        key: 'customerName',
        label: 'نام مشتری',
        render: (value: string) => <NameWithAvatar name={value} />,
    },
    {
        key: 'actionType',
        label: 'نوع خروج',
        render: (value: string) => (
            <Pill variant="info" text={value} hasDot className="w-fit border-0" />
        ),
    },
    { key: 'warehouse', label: 'انبار ارسال کننده' },
    { key: 'warehouseCode', label: 'کد انبار' },
    { key: 'warehouseName', label: 'نام انبار' },
    { key: 'warehouseItems', label: 'اقلام این انبار' },
    { key: 'totalQuantity', label: 'مجموع تعداد' },
    { key: 'shippingMethod', label: 'نحوه ارسال' },
    { key: 'consolidationStatus', label: 'وضعیت تجمیع اقلام' },
    { key: 'currentStage', label: 'مرحله جاری' },
]

const PreparationExitDetailOnline = ({ id }: { id: string }) => {
    const record = getPreparationExitById(id)

    return (
        <div className="flex flex-col gap-4" dir="rtl">
            <ExitDetailFields
                fields={DETAIL_FIELDS}
                values={record as Record<string, string> | undefined}
            />
            <ExitDetailTables />
        </div>
    )
}

export default PreparationExitDetailOnline
