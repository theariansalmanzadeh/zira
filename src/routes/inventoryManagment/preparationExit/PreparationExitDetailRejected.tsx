import { getPreparationExitById } from './constants/exits'
import ExitDetailFields from './components/ExitDetailFields'

const DETAIL_FIELDS = [
    { key: 'dateTime', label: 'تاریخ رد' },
    { key: 'salesChannel', label: 'کانال فروش' },
    { key: 'invoiceNumber', label: 'شماره فاکتور' },
    { key: 'customerCode', label: 'کد مشتری' },
    { key: 'customerName', label: 'نام مشتری' },
    { key: 'customerPhone', label: 'شماره تماس مشتری' },
]

const PreparationExitDetailRejected = ({ id }: { id: string }) => {
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

export default PreparationExitDetailRejected
