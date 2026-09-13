'use client'

import CustomerGroupCard from '../../components/CustomerGroupCard'

const CUSTOMER_MEMBER_GROUPS_DUMMY = [
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
]

const Groups = () => {
    return (
        <div
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 bg-surface-container-lowest rounded-card-md p-4"
            dir="rtl"
        >
            {CUSTOMER_MEMBER_GROUPS_DUMMY.map((group) => (
                <CustomerGroupCard
                    key={group.id}
                    title={group.title}
                    subtitle={group.subtitle}
                    status={group.status}
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
        </div>
    )
}

export default Groups
