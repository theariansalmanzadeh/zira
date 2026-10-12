export type CustomerGroupMember = {
    id?: string
    membershipId?: string
    code: string
    name: string
    avatarColor: string
    level: string
    status: string
}

export const DEFAULT_CUSTOMER_GROUP_DETAILS = {
    code: 'CG-732698',
    name: 'پوشاک تهران بزرگ',
    userLevel: 'سطح ۳',
    marketerName: 'رضا کریمی',
    chequeLevel: 'سطح ۵ (راس تا ۵ ماه)',
    goldLevel: 'سطح ۴',
    userStatus: 'فعال',
    customerCount: 824,
    discountPercent: 9,
    marketerPercent: 3,
    members: [
        {
            code: 'C-10021',
            name: 'سارا محمدی',
            avatarColor: '#D74E54',
            level: 'سطح ۳',
            status: 'فعال',
        },
        {
            code: 'C-10048',
            name: 'علی رضایی',
            avatarColor: '#2A6FDB',
            level: 'سطح ۲',
            status: 'فعال',
        },
    ] satisfies CustomerGroupMember[],
}
