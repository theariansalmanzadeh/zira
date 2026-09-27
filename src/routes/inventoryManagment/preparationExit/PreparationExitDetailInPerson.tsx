import { Pill } from '@/src/shared/components/ui/Pill'
import { getPreparationExitById } from './constants/exits'
import ExitDetailFields from './components/ExitDetailFields'
import ExitDetailTables from './components/ExitDetailTables'
import InPersonActions from './components/InPersonActions'
import NameWithAvatar from './components/NameWithAvatar'

const DETAIL_FIELDS = [
    { key: 'dateTime', label: 'تاریخ و ساعت' },
    { key: 'invoiceNumber', label: 'شماره فاکتور فروش' },
    {
        key: 'customerCode',
        label: 'کد مشتری',
        render: (value: string) => (
            <Pill variant="tonal" text={value} className="w-fit border-0" />
        ),
    },
    {
        key: 'customerName',
        label: 'نام مشتری',
        render: (value: string) => <NameWithAvatar name={value} />,
    },
    {
        key: 'sellerName',
        label: 'نام فروشنده',
        render: (value: string) => <NameWithAvatar name={value} />,
    },
    {
        key: 'cashier',
        label: 'صندوقدار',
        render: (value: string) => <NameWithAvatar name={value} />,
    },
    { key: 'settlementStatus', label: 'وضعیت تسویه مالی' },
    { key: 'actionType', label: 'نوع اقدام' },
    { key: 'warehouse', label: 'انبار تحویل دهنده' },
    { key: 'warehouseCode', label: 'کد انبار' },
    { key: 'warehouseName', label: 'نام انبار' },
    { key: 'warehouseItems', label: 'اقلام این انبار' },
]

const PreparationExitDetailInPerson = ({ id }: { id: string }) => {
    const record = getPreparationExitById(id)

    return (
        <div className="flex flex-col gap-4" dir="rtl">
            <ExitDetailFields
                fields={DETAIL_FIELDS}
                values={record as Record<string, string> | undefined}
            />
            <InPersonActions />
            <ExitDetailTables />
        </div>
    )
}

export default PreparationExitDetailInPerson
