import { cn } from '@/src/shared/libs/utils'
import type { BranchInfoData } from '../constants'

type BranchInfoProps = {
    data: BranchInfoData
    className?: string
}

const InfoField = ({ label, value }: { label: string; value: string }) => (
    <div className='flex min-w-0 flex-col gap-1'>
        <span className='text-label-md text-outline'>{label}</span>
        <span className='text-label-lg font-semibold text-on-surface'>
            {value}
        </span>
    </div>
)

const BranchInfo = ({ data, className }: BranchInfoProps) => {
    return (
        <div
            className={cn(
                'flex flex-col gap-4 rounded-card-lg border border-outline-variant bg-surface-container-lowest p-4',
                className
            )}
            dir='rtl'
        >
            <div className='grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5'>
                <InfoField label='کد شعبه' value={data.code} />
                <InfoField label='نام شعبه' value={data.name} />
                <InfoField label='مدیر شعبه' value={data.manager} />
                <InfoField label='تلفن تماس' value={data.phone} />
                <InfoField
                    label='تعداد انبارها'
                    value={data.warehouseCountLabel}
                />
            </div>

            <InfoField label='نشانی' value={data.address} />
        </div>
    )
}

export default BranchInfo
