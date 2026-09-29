import type { SubSidebarSection } from '@/src/shared/components/sidebar/content/types'
import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export type SectionHeading = {
    title: string
    subtitle?: string
    hasBackButton?: boolean
}

export const sectionToHeading: Record<string, SectionHeading> = {
    'user-details': {
        title: 'جزئیات کاربر',
        subtitle: 'مشاهده اطلاعات کاربر',
        hasBackButton: true,
    },
    'group-details': {
        title: 'جزئیات گروه',
        subtitle: 'مشاهده اطلاعات گروه',
        hasBackButton: true,
    },
    'role-details': {
        title: 'جزئیات نقش',
        subtitle: 'مشاهده اطلاعات نقش و دسترسی‌ها',
        hasBackButton: true,
    },
    group: {
        title: 'گروه‌ها',
        subtitle: 'مدیریت گروه‌های کاربری',
    },
    role: {
        title: 'نقش‌ها',
        subtitle: 'مدیریت نقش‌ها و دسترسی‌ها',
    },
    'create-group': {
        title: 'ایجاد گروه',
        subtitle: 'تعریف گروه جدید و انتخاب کاربران',
        hasBackButton: true,
    },
    'create-role': {
        title: 'ایجاد نقش',
        subtitle: 'تعریف نقش جدید و دسترسی‌ها',
        hasBackButton: true,
    },
}

export const getUserManagementSectionKey = (
    pathname: string,
    sub?: string | null
) => {
    if (pathname.includes('/user-details/')) return 'user-details'
    if (
        pathname.includes('/group-details/') ||
        pathname.includes('/groupDetails/')
    ) {
        return 'group-details'
    }
    if (pathname.includes('/role-details/')) return 'role-details'
    if (pathname.includes('/create-new-group')) return 'create-group'
    if (pathname.includes('/create-new-role')) return 'create-role'
    if (sub === 'group') return 'group'
    if (sub === 'role') return 'role'
    return null
}

export const USER_MANAGEMENT_SUB_SIDEBAR_SECTIONS: readonly SubSidebarSection[] =
    [
        {
            title: 'مدیریت کاربران',
            links: [
                { label: 'کاربران', href: '/admin/user-management?sub=user' },
                { label: 'گروه‌ها', href: '/admin/user-management?sub=group' },
                { label: 'نقش‌ها', href: '/admin/user-management?sub=role' },
            ],
        },
    ]

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: "col-0", header_label: "نام کاربر", isChecked: true },
    { id: "col-1", header_label: "کد کاربر", isChecked: true },
    { id: "col-2", header_label: "نقش‌ها", isChecked: true },
    { id: "col-3", header_label: "دسترسی‌ها", isChecked: true },
    { id: "col-4", header_label: "وضعیت", isChecked: true },
    { id: "actions-0", header_label: "", isChecked: true },
    { id: "actions-1", header_label: "", isChecked: true },
]
