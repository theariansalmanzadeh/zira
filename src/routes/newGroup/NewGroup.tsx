import InfoCard, { InfoCardProps } from '@/src/shared/components/infoCard/InfoCard'

const GROUP_CARDS: InfoCardProps[] = [
    {
        title: 'عنوان گروه',
        subtitle: 'شناسه گروه',
        manager: { label: 'ادمین', value: 'نام کاربر' },
        managerAvatar: true,
        email: { label: 'تعداد نقش', value: '4' },
        phone: { label: 'تعداد کاربران', value: '12' },
    },
    {
        title: 'گروه فروش',
        subtitle: 'GRP-001',
        manager: { label: 'ادمین', value: 'نام کاربر' },
        managerAvatar: true,
        email: { label: 'تعداد نقش', value: '4' },
        phone: { label: 'تعداد کاربران', value: '12' },
    },
    {
        title: 'گروه انبار',
        subtitle: 'GRP-002',
        manager: { label: 'ادمین', value: 'نام کاربر' },
        managerAvatar: true,
        email: { label: 'تعداد نقش', value: '4' },
        phone: { label: 'تعداد کاربران', value: '12' },
    },
    {
        title: 'گروه پشتیبانی',
        subtitle: 'GRP-003',
        status: 'غیر فعال',
        statusVariant: 'tonal',
        manager: { label: 'ادمین', value: 'نام کاربر' },
        managerAvatar: true,
        email: { label: 'تعداد نقش', value: '4' },
        phone: { label: 'تعداد کاربران', value: '12' },
    },
]

const NewGroup = () => {
    return (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {GROUP_CARDS.map((card, index) => (
                <InfoCard key={index} {...card} />
            ))}
        </div>
    )
}

export default NewGroup
