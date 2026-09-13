import Image from 'next/image'
import { Button } from '@/src/shared/components/ui/button'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Pill } from '@/src/shared/components/ui/Pill'
import { Icon } from '@/src/shared/components/Icons/Icon'
import type { BankAccountData } from '../constants'

type BankCardProps = {
    data: BankAccountData
}

const BankCard = ({ data }: BankCardProps) => {
    const { name, code, logoUrl, balance = '-', status } = data

    return (
        <div
            className="flex flex-col gap-3 rounded-card-md  bg-surface-container-high p-4"
            dir="rtl"
        >
            <div className="bg-surface-container-lowest rounded-card-sm p-2 flex flex-col gap-6 items-start">

                <div className="flex items-start justify-between gap-3 w-full">
                    <div className="flex items-center gap-2">
                        <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-surface-container-high">
                            <Image
                                src={logoUrl}
                                alt={name}
                                width={64}
                                height={64}
                                className="size-full object-contain"
                            />
                        </div>
                        <div className="flex flex-col gap-0.5 text-right">
                            <span className="text-label-lg font-medium text-on-surface">
                                {name}
                            </span>
                            <span className="text-label-md text-outline">{code}</span>
                        </div>
                    </div>
                    <Pill
                        text={status === 'active' ? 'فعال' : 'غیرفعال'}
                        variant="success"
                        className="shrink-0 border-0"
                    />
                </div>

                <hr className="w-full border-0 border-t border-dashed border-outline" />

                <div className="flex flex-col gap-1 text-right">
                    <span className="text-label-md text-outline">موجودی فعلی</span>
                    <span className="text-label-lg text-on-surface">{balance}</span>
                </div>
            </div>

            <div className="flex items-center gap-2 justify-end">
                <Button
                    variant="default"
                    className="flex-1 justify-center gap-2 rounded-card-md px-4!"
                >
                    <Icon label="refresh400Linear" className="size-5!" />
                    <span className="text-label-md">مغایرت‌گیری</span>
                </Button>
                <IconButton
                    icon="chevronLeft300Linear"
                    variant="default"
                    className="size-10 shrink-0 rounded-card-md"
                    iconClassName="size-5!"
                />
            </div>
        </div>
    )
}

export default BankCard
