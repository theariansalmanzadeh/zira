'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Button } from '@/src/shared/components/ui/button'
import { Pill } from '@/src/shared/components/ui/Pill'
import {
    formatFaDate,
    formatFaNumber,
    formatPrice,
} from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import {
    CUSTOMER_VERIFICATION_FIELDS,
    GUARANTEE_CARDS,
    GUARANTEE_STATUS_CONFIG,
    GUARANTEE_TYPE_CLASSNAME,
    type GuaranteeCardItem,
    type GuaranteeField,
    type InfoField,
} from '../constants/customerInfo'

const formatFieldValue = (field: InfoField | GuaranteeField) => {
    if ('isDate' in field && field.isDate) {
        return formatFaDate(field.value)
    }
    if (field.isNumeric) {
        return formatFaNumber(field.value)
    }
    return field.value
}

const InfoFieldItem = ({ field }: { field: InfoField }) => (
    <div className="min-w-0">
        <div className="mb-1 text-label-sm text-outline">{field.label}</div>
        <div
            className="text-label-lg font-semibold text-on-surface"
            dir={field.dir}
        >
            {formatFieldValue(field)}
        </div>
    </div>
)

const VerificationCard = () => (
    <div className="rounded-card-lg border border-outline-variant bg-surface-container-lowest p-6">
        <div className="mb-5 flex flex-col gap-1">
            <h3 className="text-title-md font-semibold text-on-surface">
                تایید مدارک
            </h3>
            <p className="text-label-md text-outline">
                اطلاعات و مدارک متقاضی را پیش از تایید بررسی کنید.
            </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {CUSTOMER_VERIFICATION_FIELDS.map((field) => (
                <InfoFieldItem key={field.label} field={field} />
            ))}
        </div>
    </div>
)

const GuaranteeFieldItem = ({ field }: { field: GuaranteeField }) => (
    <div className="min-w-0">
        <div className="mb-1 text-label-sm text-outline">{field.label}</div>
        <div
            className="text-label-lg font-semibold text-on-surface"
            dir={field.dir}
        >
            {formatFieldValue(field)}
        </div>
    </div>
)

const GuaranteeCard = ({ card }: { card: GuaranteeCardItem }) => {
    const status = GUARANTEE_STATUS_CONFIG[card.status]

    return (
        <div className="overflow-hidden rounded-card-lg border border-outline-variant bg-surface-container-lowest">
            <div className="flex flex-row flex-wrap items-center justify-between gap-3 px-5 py-4">
                <div className="flex min-w-0 flex-row flex-wrap items-center gap-2.5">
                    <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-container-high text-label-sm text-on-surface-variant">
                        {formatFaNumber(card.index)}
                    </span>
                    <Pill
                        text={card.typeLabel}
                        className={cn(
                            'rounded-full!',
                            GUARANTEE_TYPE_CLASSNAME[card.type]
                        )}
                    />
                    <div className="flex flex-row items-center gap-1.5 text-label-md text-on-surface">
                        <span>{card.creditLabel}</span>
                        <span className="inline-flex items-center gap-0.5 font-bold">
                            <span>{formatPrice(card.amount)}</span>
                            <Icon label="currency" className="size-4!" />
                        </span>
                    </div>
                    <Pill
                        text={status.text}
                        variant={status.variant}
                        className="border-0"
                    />
                </div>

                <div className="flex flex-row items-center gap-1">
                    <IconButton
                        icon="attachment400Linear"
                        variant="ghost"
                        iconClassName="size-5! text-outline"
                    />
                    <IconButton
                        icon="edit400Linear"
                        variant="ghost"
                        iconClassName="size-5! text-outline"
                    />
                </div>
            </div>

            <div className="border-t border-outline-variant px-5 py-4">
                <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                    {card.fields.map((field) => (
                        <GuaranteeFieldItem key={field.label} field={field} />
                    ))}
                </div>
            </div>
        </div>
    )
}

const GuaranteesSection = () => (
    <div className="flex flex-col gap-3">
        <div className="flex flex-row flex-wrap items-center justify-between gap-3">
            <div className="flex flex-row items-center gap-2">
                <h3 className="text-title-md font-semibold text-on-surface">
                    ضمانت‌ها
                </h3>
                <Pill
                    text="فقط ادمین"
                    icon="vpnLocked400Linear"
                    className="border-0 bg-primary-container text-on-primary-container [&_svg]:text-on-primary-container"
                />
            </div>
            <Button
                variant="outline"
                className="border-error text-error hover:bg-error-container/40 hover:text-error"
            >
                <Icon label="addSm400Linear" className="size-5! text-error" />
                افزودن ضمانت
            </Button>
        </div>

        <div className="flex flex-col gap-3">
            {GUARANTEE_CARDS.map((card) => (
                <GuaranteeCard key={card.id} card={card} />
            ))}
        </div>
    </div>
)

const CustomerInfo = () => {
    return (
        <div className="flex flex-col gap-4" dir="rtl">
            <VerificationCard />
            <GuaranteesSection />
        </div>
    )
}

export default CustomerInfo
