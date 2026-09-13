'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import InfoCardField from '@/src/shared/components/infoCard/components/InfoCardField'
import { Avatar, AvatarFallback } from '@/src/shared/components/ui/Avatar'
import { Button } from '@/src/shared/components/ui/button'
import { Pill } from '@/src/shared/components/ui/Pill'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { useModalStore } from '@/src/shared/store/modal-store'

type HeaderProps = {
    title?: string
    code?: string
    statusText?: string
    managerName?: string
    itemsCount?: string
    area?: string
    stockValue?: string
    insuranceStatus?: string
    phone?: string
    address?: string
}

const Header = ({
    title = 'انبار مرکزی تهران',
    code = 'WH-1001',
    statusText = 'فعال',
    managerName = 'رضا کاظمی',
    itemsCount = '8,240 قلم',
    area = '450 متر مربع',
    stockValue = '2.9 میلیارد تومان',
    insuranceStatus = 'معتبر تا 1404/10',
    phone = '+98 912 2571 928',
    address = 'تهران، پاسداران، اطلس مال، طبقه 11، پلاک 10',
}: HeaderProps) => {
    const openModal = useModalStore((state) => state.openModal)

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <div className="flex flex-row items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row items-center gap-2">
                        <span className="text-title-md font-medium text-on-surface">
                            {title}
                        </span>
                        <Pill text={statusText} variant="success" className="border-0" />
                    </div>
                    <span className="text-label-md text-outline">{code}</span>
                </div>

                <div className="flex flex-row items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={() => openModal(ModalTypes.INVENTORY_SETTINGS)}
                    >
                        <Icon label="tune400Linear" className="size-5!" />
                        <span className="text-label-sm">تنظیمات انبار</span>
                    </Button>
                    <Button variant="primary">
                        <Icon label="import400Linear" className="size-5!" />
                        <span className="text-label-sm text-on-primary">ورود کالا</span>
                    </Button>
                </div>
            </div>

            <div className="rounded-card-md bg-surface-container-lowest p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                    <div className="flex flex-col gap-1 text-right">
                        <span className="text-label-md text-outline">مسئول انبار</span>
                        <div className="flex flex-row items-center gap-2">
                            <Avatar size="sm">
                                <AvatarFallback className="bg-surface-container-highest text-label-sm text-on-surface-variant">
                                    {managerName.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <span className="text-label-lg text-on-surface-variant">
                                {managerName}
                            </span>
                        </div>
                    </div>
                    <InfoCardField label="تعداد اقلام" value={itemsCount} />
                    <InfoCardField label="متراژ" value={area} />
                    <InfoCardField label="موجودی" value={stockValue} />
                    <InfoCardField label="وضعیت بیمه" value={insuranceStatus} />
                </div>

                <hr className="my-6 border-0 border-t border-dashed border-outline-variant" />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                    <InfoCardField label="شماره تماس" value={phone} />
                    <InfoCardField
                        label="آدرس"
                        value={address}
                        className="lg:col-span-2"
                    />
                </div>
            </div>
        </div>
    )
}

export default Header
