import Seperator from '@/src/shared/components/ui/Seperator'

type PreviewRowProps = {
    label: string
    value: string
}

const PreviewRow = ({ label, value }: PreviewRowProps) => (
    <div className='flex flex-row items-center justify-between gap-3'>
        <span className='text-label-md text-outline'>{label}</span>
        <span className='text-label-md text-on-surface-variant'>{value}</span>
    </div>
)

const PreviewCode = () => {
    return (
        <div className='w-full' dir='rtl'>
            <div className='flex flex-col gap-4 rounded-card-md bg-surface-container-lowest p-6'>
                <div className='flex items-center justify-center rounded-card-md bg-surface-container-high px-4 py-3 h-[160px]'>
                    <span className='text-title-md font-bold text-on-surface'>BAHAR1404</span>
                </div>

                <PreviewRow label='کد' value='درصدی' />
                <PreviewRow label='نوع' value='-' />
                <PreviewRow label='روی' value='همه کالاها' />
                <PreviewRow label='برای' value='همه مشتریان' />

                <Seperator />

                <PreviewRow label='بازه' value='1404/12/02-1404/12/20' />
            </div>
        </div>
    )
}

export default PreviewCode
