import type {
    CustomerGroup,
    CustomerGroupMember as ApiCustomerGroupMember,
} from '@/src/api/types/admin/customers'
import type { CustomerGroupMember } from '@/src/shared/components/modals/components/CustomerGroupDetails.types'

const AVATAR_COLORS = [
    '#D74E54',
    '#2A6FDB',
    '#1B8A5A',
    '#C47A12',
    '#7B5EA7',
    '#0E7490',
]

const avatarColorFromId = (value: string) => {
    let hash = 0
    for (let i = 0; i < value.length; i += 1) {
        hash = (hash + value.charCodeAt(i) * (i + 1)) % AVATAR_COLORS.length
    }
    return AVATAR_COLORS[hash] ?? AVATAR_COLORS[0]
}

export const mapGroupToHeader = (group: CustomerGroup) => ({
    code: group.code,
    name: group.name,
    marketerName: group.marketer_name || '—',
    customerCount: group.member_count ?? 0,
    marketerPercent: Number(group.marketer_percent) || 0,
    discountPercent: 0,
    userStatus: group.is_active ? 'فعال' : 'غیرفعال',
    userLevel: '—',
    chequeLevel: '—',
    goldLevel: '—',
})

export const mapMemberToRow = (
    member: ApiCustomerGroupMember
): CustomerGroupMember => ({
    id: member.customer_id,
    membershipId: member.membership_id,
    code: member.customer_code,
    name: member.full_name || member.store_name || '—',
    avatarColor: avatarColorFromId(member.customer_id || member.membership_id),
    level: '—',
    status: 'فعال',
})
