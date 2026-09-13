import InfoCard from '@/src/shared/components/infoCard/InfoCard'
import UserManagementHeader from '../../components/UserManagementHeader'

const GROUP_CARDS = [
    {
        title: 'عنوان گروه',
        subtitle: 'شناسه گروه',
        manager: { label: 'ادمین', value: 'نام کاربر' },
        managerAvatar: true,
        email: { label: 'تعداد نقش', value: '4' },
        phone: { label: 'تعداد کاربران', value: '12' },
        href: '/admin/user-management/group-details/1'
    },
    {
        title: 'عنوان گروه',
        subtitle: 'شناسه گروه',
        manager: { label: 'ادمین', value: 'نام کاربر' },
        managerAvatar: true,
        email: { label: 'تعداد نقش', value: '4' },
        phone: { label: 'تعداد کاربران', value: '12' },
        href: '/admin/user-management/group-details/2'
    },
    {
        title: 'عنوان گروه',
        subtitle: 'شناسه گروه',
        manager: { label: 'ادمین', value: 'نام کاربر' },
        managerAvatar: true,
        email: { label: 'تعداد نقش', value: '4' },
        phone: { label: 'تعداد کاربران', value: '12' },
        href: '/admin/user-management/group-details/3'
    },
]

const GroupList = () => {
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {GROUP_CARDS.map((card, index) => (
                    <InfoCard key={index} {...card} />
                ))}
            </div>
        </>
    )
}

export default GroupList