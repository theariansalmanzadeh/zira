'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/src/shared/components/ui/Accordion'
import { formatFaDate } from '@/src/shared/libs/formatter'

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

const SECTIONS: PersonnelSection[] = [
    {
        value: 'identity',
        title: 'اطلاعات هویتی',
        fields: [
            { label: 'نام', value: 'علی' },
            { label: 'نام خانوادگی', value: 'رضایی' },
            { label: 'کد ملی', value: '۰۰۷۲۳۳۴۵۶۱' },
            { label: 'نام پدر', value: 'محمود' },
            { label: 'تاریخ تولد', value: '1986-07-03T00:00:00.000Z', format: 'date' },
            { label: 'جنسیت', value: 'مرد' },
            { label: 'وضعیت تاهل', value: 'متاهل' },
            { label: 'تعداد فرزند', value: '۱' },
            { label: 'آخرین مدرک تحصیلی', value: 'کارشناسی' },
            { label: 'شماره بیمه تامین اجتماعی', value: '۱۰۰۰۰۰۰۰۰۰' },
        ],
    },
    {
        value: 'contact',
        title: 'آدرس و تماس',
        fields: [
            { label: 'موبایل شخصی', value: '۰۹۱۲ ۱۴۵۶ ۱۲۰۳' },
            { label: 'تلفن ثابت', value: '۰۲۱ ۸۸۱۴۵ ۱۲۰۰' },
            { label: 'ایمیل', value: 'a.rezaei@zira.ir', dir: 'ltr' },
            { label: 'آدرس منزل — استان / شهر', value: 'تهران / تهران' },
            { label: 'کد پستی', value: '۱۹۸۷۶۵۴۳۲۱' },
            { label: 'آدرس کامل', value: 'سعادت‌آباد، خیابان علامه شمالی' },
        ],
    },
    {
        value: 'job',
        title: 'اطلاعات شغلی',
        fields: [
            { label: 'بخش محل فعالیت', value: 'مدیریت' },
            { label: 'شعبه محل فعالیت', value: 'شعبه مرکزی آزادی' },
            { label: 'مدیر مستقیم', value: '—' },
            { label: 'عنوان شغلی', value: 'مدیر فناوری اطلاعات' },
            { label: 'تاریخ ایجاد حساب', value: '۱۳۹۸/۰۲/۱۵' },
            { label: 'قرارداد فروش درصدی', value: 'غیرفعال' },
        ],
    },
    {
        value: 'bank',
        title: 'اطلاعات بانکی — حساب پیش‌فرض',
        fields: [
            { label: 'نام بانک', value: 'ملت' },
            { label: 'شماره حساب', value: '۳۱۴۵۶۷۸۹۰۱۲' },
            { label: 'شماره کارت', value: '۶۱۰۴ ۳۳۷۸ ۱۲۳۴ ۵۶۷۸' },
            { label: 'شماره شبا', value: 'IR۳۴۰۱۲۰۰۰۰۰۰۰۰۰۳۴۵۶۷۸', dir: 'ltr' },
        ],
    },
]

const Field = ({ label, value, dir, format }: PersonnelField) => (
    <div className='flex min-w-0 flex-col gap-1 text-right'>
        <span className='text-label-md text-outline'>{label}</span>
        <span className='text-label-lg font-semibold text-on-surface' dir={dir}>
            {format === 'date' ? formatFaDate(value, { timeZone: 'UTC' }) : value}
        </span>
    </div>
)

const PersonnelInfo = () => {
    return (
        <Accordion
            type='multiple'
            defaultValue={SECTIONS.map((section) => section.value)}
            className='flex flex-col gap-4'
            dir='rtl'
        >
            {SECTIONS.map((section) => (
                <AccordionItem
                    key={section.value}
                    value={section.value}
                    className='rounded-card-lg border-0 bg-surface-container-lowest px-6'
                >
                    <AccordionTrigger className='py-5 text-on-surface hover:no-underline [&_svg]:hidden'>
                        <span className='flex flex-row items-center gap-2'>
                            <span className='h-5 w-1 rounded-full bg-error' />
                            <span className='text-title-md font-bold'>{section.title}</span>
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
