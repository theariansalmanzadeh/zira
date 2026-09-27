import { Icon } from '@/src/shared/components/Icons/Icon'
import { LICENSE_FILE_TYPE_STYLES } from '@/src/routes/contentManagment/liecenses/constants'
import { cn } from '@shared/libs/utils'
import type { LiecenseDetailsData } from '@/src/routes/contentManagment/liecenseDetails/constants'

type LiecenseCardProps = {
    data: LiecenseDetailsData
    className?: string
}

const LiecenseCard = ({ data, className }: LiecenseCardProps) => {
    const fileStyles = LICENSE_FILE_TYPE_STYLES[data.fileType]

    return (
        <article
            className={cn(
                'flex flex-col overflow-hidden rounded-card-md border border-outline-variant bg-surface-container-lowest',
                className
            )}
            dir="rtl"
        >
            {data.fileType === 'image' ? (
                <img
                    src={data.previewUrl}
                    alt={data.title}
                    className="h-48 w-full object-cover"
                />
            ) : (
                <div
                    className={cn(
                        'relative flex h-48 items-center justify-center',
                        fileStyles.previewBg
                    )}
                >
                    <span className="absolute top-3 right-3 rounded-button-sm bg-[#5C5346] px-2 py-0.5 text-[10px] font-extrabold tracking-wide text-white">
                        {fileStyles.badge}
                    </span>
                    <div className="flex size-16 items-center justify-center rounded-card-md bg-surface-container-lowest shadow-sm">
                        <Icon
                            label={fileStyles.icon}
                            className={fileStyles.iconClassName}
                        />
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-2 px-4 py-4">
                <h2 className="text-label-lg font-semibold text-on-surface">
                    {data.title}
                </h2>
                <p className="text-label-md text-on-surface-variant">
                    {data.description}
                </p>
            </div>
        </article>
    )
}

export default LiecenseCard
