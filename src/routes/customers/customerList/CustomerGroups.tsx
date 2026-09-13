'use client'

import CustomerGroupCard from '../components/CustomerGroupCard'

const CUSTOMER_GROUPS_DUMMY = [
    {
        id: 'CG-732698',
        title: 'پوشاک تهران بزرگ',
        subtitle: 'CG-732698',
        status: 'فعال',
        customerCount: 824,
        discountPercent: 9,
        marketerPercent: 3,
        userLevel: 'سطح ۳',
        marketerName: 'رضا کریمی',
        chequeLevel: 'سطح ۵ (راس تا ۵ ماه)',
        goldLevel: 'سطح ۴',
        userStatus: 'فعال',
    },
    {
        id: 'CG-732701',
        title: 'عمده‌فروشان شمال',
        subtitle: 'CG-732701',
        status: 'فعال',
        customerCount: 120,
        discountPercent: 1,
        marketerPercent: 2,
        userLevel: 'سطح ۲',
        marketerName: 'مهدی رشیدی',
        chequeLevel: 'سطح ۳ (راس تا ۳ ماه)',
        goldLevel: 'سطح ۲',
        userStatus: 'فعال',
    },
    {
        id: 'CG-732735',
        title: 'صنف زیرپوش',
        subtitle: 'CG-732735',
        status: 'غیرفعال',
        statusVariant: 'tonal' as const,
        customerCount: 321,
        discountPercent: 4,
        marketerPercent: 2,
        userLevel: 'سطح ۱',
        marketerName: 'مهدی رشیدی',
        chequeLevel: 'سطح ۲ (راس تا ۲ ماه)',
        goldLevel: 'سطح ۱',
        userStatus: 'غیرفعال',
    },
]

const CustomerGroups = () => {
    return (
        <>
            {CUSTOMER_GROUPS_DUMMY.map((group) => (
                <CustomerGroupCard
                    key={group.id}
                    title={group.title}
                    subtitle={group.subtitle}
                    status={group.status}
                    statusVariant={group.statusVariant}
                    customerCount={group.customerCount}
                    discountPercent={group.discountPercent}
                    marketerPercent={group.marketerPercent}
                    userLevel={group.userLevel}
                    marketerName={group.marketerName}
                    chequeLevel={group.chequeLevel}
                    goldLevel={group.goldLevel}
                    userStatus={group.userStatus}
                />
            ))}
        </>
    )
}

export default CustomerGroups
