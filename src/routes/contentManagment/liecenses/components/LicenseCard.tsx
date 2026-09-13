'use client'

import IconButton from '@/src/shared/components/ui/IconButton'
import { Switch } from '@/src/shared/components/ui/Switch'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { formatFaDate } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import { LICENSE_FILE_TYPE_STYLES, type LicenseCardData } from '../constants'
import { useModalStore } from '@/src/shared/store/modal-store'
import { ModalTypes } from '@/src/shared/components/modals/types'

type LicenseCardProps = {
    data: LicenseCardData
    onVisibleChange?: (visible: boolean) => void
    onView?: () => void
    onEdit?: () => void
    onDelete?: () => void
    className?: string
}

const LicenseCard = ({
    data,
    onVisibleChange,
    onView,
    onEdit,
    onDelete,
    className,
}: LicenseCardProps) => {
    const { title, code, issuer, issuedAt, fileType, visibleOnSite } = data
    const fileStyles = LICENSE_FILE_TYPE_STYLES[fileType]
    const { openModal } = useModalStore()
    const onOpen = () => {
        openModal(ModalTypes.VIEW_LICENSE, {
            data,
        })
    }
    return (
        <div
            className={cn(
                'flex flex-col gap-3 rounded-card-md bg-surface-container-high',
                className
            )}
            dir="rtl"
        >
            <div
                className="flex min-h-40 overflow-hidden rounded-card-sm bg-surface-container-lowest"
                dir="ltr"
            >
                <div
                    className="flex grow flex-col justify-center gap-1.5 px-4 py-4 text-right"
                    dir="rtl"
                >
                    <span className="text-label-lg font-semibold leading-7 text-on-surface">
                        {title}
                    </span>
                    <span className="text-label-md text-on-surface-variant">
                        {issuer}
                    </span>
                    <span className="text-label-md text-outline">
                        {code} · صدور {formatFaDate(issuedAt)}
                    </span>
                </div>

                <div
                    className={cn(
                        'relative flex w-1/3 items-center justify-center',
                        fileStyles.previewBg
                    )}
                >
                    <span className="absolute top-2.5 right-2.5 rounded-button-sm bg-[#5C5346] px-2 py-0.5 text-[10px] font-extrabold tracking-wide text-white">
                        {fileStyles.badge}
                    </span>
                    <div className="flex size-16 items-center justify-center rounded-card-md bg-surface-container-lowest shadow-sm">
                        <Icon
                            label={fileStyles.icon}
                            className={fileStyles.iconClassName}
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between gap-2  p-3">
                <div className='bg-surface-container-lowest rounded-card-md p-2'>
                    <label className="flex cursor-pointer items-center gap-2">
                        <Switch
                            checked={visibleOnSite}
                            onCheckedChange={onVisibleChange}
                        />
                        <span
                            className={cn(
                                'text-label-md font-semibold',
                                visibleOnSite ? 'text-primary' : 'text-outline'
                            )}
                        >
                            نمایش در سایت
                        </span>
                    </label>
                </div>

                <div className="flex items-center gap-1" dir="ltr">
                    <IconButton
                        icon="chevronLeft400Linear"
                        variant="default"
                        className="size-9!"
                        iconClassName="size-5! text-outline"
                        onClick={onOpen}
                    />
                    <IconButton
                        icon="delete400Linear"
                        variant="default"
                        className="size-9!"
                        iconClassName="size-5! text-outline"
                        onClick={onDelete}
                    />
                    <IconButton
                        icon="editSquare400Linear"
                        variant="default"
                        className="size-9!"
                        iconClassName="size-5! text-outline"
                        onClick={onEdit}
                    />
                    <IconButton
                        icon="visibility400Linear"
                        variant="default"
                        className="size-9!"
                        iconClassName="size-5! text-outline"
                        onClick={onView}
                    />
                </div>
            </div>
        </div>
    )
}

export default LicenseCard
