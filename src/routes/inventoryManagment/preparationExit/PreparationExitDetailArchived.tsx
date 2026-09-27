import { Pill, PillVariants } from '@/src/shared/components/ui/Pill'
import { VariantProps } from 'class-variance-authority'
import { getPreparationExitById } from './constants/exits'
import ExitDetailFields from './components/ExitDetailFields'
import NameWithAvatar from './components/NameWithAvatar'

const SHIPMENT_STATUS_VARIANT: Record<
    string,
    VariantProps<typeof PillVariants>['variant']
> = {
    'تحویل شده': 'success',
    'ارسال شده': 'info',
}

const renderShipmentStatus = (value: string) => (
    <Pill
        variant={SHIPMENT_STATUS_VARIANT[value] ?? 'warning'}
        text={value}
        hasDot
        className="w-fit border-0"
    />
)

const DETAIL_FIELDS = [
    { key: 'dateTime', label: 'تاریخ خروج' },
    { key: 'invoiceNumber', label: 'شماره فاکتور' },
    { key: 'customerCode', label: 'کد مشتری' },
    {
        key: 'customerName',
        label: 'نام مشتری',
        render: (value: string) => <NameWithAvatar name={value} />,
    },
    { key: 'customerPhone', label: 'شماره تماس مشتری' },
    { key: 'warehouseCode', label: 'کد انبار' },
    { key: 'warehouseName', label: 'نام انبار' },
    { key: 'warehouseItems', label: 'اقلام این انبار' },
    { key: 'totalQuantity', label: 'مجموع تعداد' },
    {
        key: 'lastShipmentStatus',
        label: 'آخرین وضعیت مرسوله',
        render: renderShipmentStatus,
    },
    {
        key: 'approverName',
        label: 'نام تایید کننده',
        render: (value: string) => <NameWithAvatar name={value} />,
    },
    { key: 'description', label: 'توضیحات' },
]

const PreparationExitDetailArchived = ({ id }: { id: string }) => {
    const record = getPreparationExitById(id)

    return (
        <div className="flex flex-col gap-4" dir="rtl">
            <ExitDetailFields
                fields={DETAIL_FIELDS}
                values={record as Record<string, string> | undefined}
            />
        </div>
    )
}

export default PreparationExitDetailArchived
