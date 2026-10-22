'use client'

import { useMemo } from 'react'
import type { User } from '@/src/api/types/admin/user'
import {
    EDUCATION_OPTIONS,
    GENDER_OPTIONS,
    MARITAL_STATUS_OPTIONS,
} from '@/src/routes/userManagment/user/createNewUser/constants'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/src/shared/components/ui/Accordion'
import { formatFaDate, formatFaNumber } from '@/src/shared/libs/formatter'

type PersonnelField = {
    label: string
    value: string
    dir?: 'ltr'
    format?: 'date'
}

type PersonnelSection = {
    value: string
    title: string
    fields: PersonnelField[]
}

const display = (value?: string | number | null) => {
    if (value === undefined || value === null || value === '') return '—'
    return String(value)
}

const optionLabel = (
    options: { label: string; value: string }[],
    value?: string | null
) => {
    if (!value) return '—'
    return options.find((option) => option.value === value)?.label ?? value
}

const toPersonnelSections = (user: User): PersonnelSection[] => {
    const identity = user.identity
    const address = user.addresses?.[0]
    const bank = user.bank_accounts?.[0]
    const department =
        user.departments?.[0]?.name || user.department || '—'

    return [
        {
            value: 'identity',
            title: 'اطلاعات هویتی',
            fields: [
                { label: 'نام', value: display(user.first_name) },
                { label: 'نام خانوادگی', value: display(user.last_name) },
                { label: 'کد ملی', value: display(user.national_id) },
                { label: 'نام پدر', value: display(identity?.father_name) },
                {
                    label: 'تاریخ تولد',
                    value: identity?.birth_date || '',
                    format: 'date',
                },
                {
                    label: 'جنسیت',
                    value: optionLabel(GENDER_OPTIONS, identity?.gender),
                },
                {
                    label: 'وضعیت تاهل',
                    value: optionLabel(
                        MARITAL_STATUS_OPTIONS,
                        identity?.marital_status
                    ),
                },
                {
                    label: 'تعداد فرزند',
                    value:
                        identity?.children_count == null
                            ? '—'
                            : formatFaNumber(identity.children_count),
                },
                {
                    label: 'آخرین مدرک تحصیلی',
                    value: optionLabel(
                        EDUCATION_OPTIONS,
                        identity?.educational_qualification
                    ),
                },
                {
                    label: 'شماره بیمه تامین اجتماعی',
                    value: display(identity?.social_security_no),
                },
            ],
        },
        {
            value: 'contact',
            title: 'آدرس و تماس',
            fields: [
                {
                    label: 'موبایل شخصی',
                    value: display(user.phone_number || address?.mobile_1),
                },
                {
                    label: 'تلفن ثابت',
                    value: display(address?.phone),
                },
                {
                    label: 'ایمیل',
                    value: display(user.email),
                    dir: 'ltr',
                },
                {
                    label: 'آدرس منزل — استان / شهر',
                    value:
                        address?.province || address?.city
                            ? [address?.province, address?.city]
                                  .filter(Boolean)
                                  .join(' / ')
                            : '—',
                },
                {
                    label: 'کد پستی',
                    value: display(address?.postal_code),
                },
                {
                    label: 'آدرس کامل',
                    value: display(address?.full_address),
                },
            ],
        },
        {
            value: 'job',
            title: 'اطلاعات شغلی',
            fields: [
                { label: 'بخش محل فعالیت', value: display(department) },
                {
                    label: 'شعبه محل فعالیت',
                    value: display(user.primary_branch_id),
                },
                {
                    label: 'مدیر مستقیم',
                    value: display(user.direct_manager_id),
                },
                { label: 'عنوان شغلی', value: display(user.job_title) },
                {
                    label: 'تاریخ ایجاد حساب',
                    value: user.created_at || '',
                    format: 'date',
                },
                {
                    label: 'قرارداد فروش درصدی',
                    value: user.has_commission_contract
                        ? `فعال${
                              user.commission_percent != null
                                  ? ` — ${formatFaNumber(user.commission_percent)}٪`
                                  : ''
                          }`
                        : 'غیرفعال',
                },
            ],
        },
        {
            value: 'bank',
            title: 'اطلاعات بانکی — حساب پیش‌فرض',
            fields: [
                { label: 'نام بانک', value: display(bank?.bank_name) },
                { label: 'شماره حساب', value: display(bank?.account_no) },
                { label: 'شماره کارت', value: display(bank?.card_no) },
                {
                    label: 'شماره شبا',
                    value: display(bank?.iban),
                    dir: 'ltr',
                },
            ],
        },
    ]
}

const Field = ({ label, value, dir, format }: PersonnelField) => (
    <div className='flex min-w-0 flex-col gap-1 text-right'>
        <span className='text-label-md text-outline'>{label}</span>
        <span className='text-label-lg font-semibold text-on-surface' dir={dir}>
            {format === 'date'
                ? value
                    ? formatFaDate(value, { timeZone: 'UTC' })
                    : '—'
                : value}
        </span>
    </div>
)

const PersonnelInfo = ({ user }: { user: User }) => {
    const sections = useMemo(() => toPersonnelSections(user), [user])

    return (
        <Accordion
            type='multiple'
            defaultValue={sections.map((section) => section.value)}
            className='flex flex-col gap-4'
            dir='rtl'
        >
            {sections.map((section) => (
                <AccordionItem
                    key={section.value}
                    value={section.value}
                    className='rounded-card-lg border-0 bg-surface-container-lowest px-6'
                >
                    <AccordionTrigger className='py-5 text-on-surface hover:no-underline [&_svg]:hidden'>
                        <span className='flex flex-row items-center gap-2'>
                            <span className='h-5 w-1 rounded-full bg-error' />
                            <span className='text-title-md font-bold'>
                                {section.title}
                            </span>
                        </span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className='grid grid-cols-1 gap-x-8 gap-y-6 pb-2 sm:grid-cols-2'>
                            {section.fields.map((field) => (
                                <Field key={field.label} {...field} />
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}

export default PersonnelInfo
