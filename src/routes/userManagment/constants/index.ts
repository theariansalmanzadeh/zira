import type { SubSidebarSection } from '@/src/shared/components/sidebar/content/types'
import type { TableFilterItem } from '@/src/shared/store/table-actions-store'
import type { IconLabel } from '@/src/shared/types/icon'

export type HeadingButton = {
    label: string
    icon?: IconLabel
    href?: string
    variant: 'primary' | 'default' | 'outline'
}

export type SectionHeading = {
    title: string
    subtitle?: string
    hasBackButton?: boolean
    buttons?: HeadingButton[]
}

export const sectionToHeading: Record<string, SectionHeading> = {
    user: {
        title: 'مدیریت کاربران',
        subtitle: 'مشاهده و مدیریت کاربران سیستم',
        buttons: [
            {
                label: 'افزودن جدید',
                icon: 'addSm400Linear',
                href: '/admin/user-management/create-new-user',
                variant: 'primary',
            },
        ],
    },
    group: {
        title: 'مدیریت گروه ها',
        subtitle: 'مشاهده و مدیریت گروه‌های کاربری',
        buttons: [
            {
                label: 'افزودن جدید',
                icon: 'addSm400Linear',
                href: '/admin/user-management/create-new-group',
                variant: 'primary',
            },
        ],
    },
    role: {
        title: 'مدیریت نقش ها',
        subtitle: 'مشاهده و مدیریت نقش‌ها و دسترسی‌ها',
        buttons: [
            {
                label: 'افزودن جدید',
                icon: 'addSm400Linear',
                href: '/admin/user-management/create-new-role',
                variant: 'primary',
            },
        ],
    },
    department: {
        title: 'دپارتمان‌ها',
        subtitle: 'مشاهده و مدیریت دپارتمان‌ها',
        buttons: [
            {
                label: 'افزودن جدید',
                icon: 'addSm400Linear',
                href: '/admin/user-management/department/new',
                variant: 'primary',
            },
        ],
    },
    'branch-assignment': {
        title: 'انتصاب به شعبه',
        subtitle: 'انتخاب پرسنل و انتصاب به شعبه',
    },
    announcements: {
        title: 'اعلان‌ها',
        subtitle: 'مشاهده و مدیریت اعلان‌های سامانه',
        buttons: [
            {
                label: 'ارسال اعلان جدید',
                icon: 'addSm400Linear',
                href: '/admin/user-management/announcement/new',
                variant: 'primary',
            },
        ],
    },
    sessions: {
        title: 'امنیت و نشست‌ها',
        subtitle: 'مدیریت نشست‌ها و امنیت سامانه',
    },
    'create-announcement': {
        title: 'ارسال اعلان جدید',
        subtitle: 'ثبت و ارسال اعلان برای کاربران',
        hasBackButton: true,
    },
    'announcement-details': {
        title: 'جزئیات اعلان',
        subtitle: 'مشاهده اطلاعات و آمار اعلان',
        hasBackButton: true,
    },
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
    'create-user': {
        title: 'ایجاد کاربر',
        subtitle: 'ثبت کاربر جدید',
        hasBackButton: true,
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
    'department-details': {
        title: 'جزئیات دپارتمان',
        subtitle: 'مشاهده اطلاعات دپارتمان',
        hasBackButton: true,
    },
    'create-department': {
        title: 'ایجاد دپارتمان',
        subtitle: 'ثبت دپارتمان جدید',
        hasBackButton: true,
    },
    'edit-department': {
        title: 'ویرایش دپارتمان',
        subtitle: 'ویرایش اطلاعات دپارتمان',
        hasBackButton: true,
    },
    'edit-user': {
        title: 'ویرایش کاربر',
        subtitle: 'ویرایش اطلاعات کاربر',
        hasBackButton: true,
    },
    preferences: {
        title: 'ترجیحات',
        subtitle: 'اطلاعات حساب و تنظیم اعلان‌ها',
    },
}

export const getUserManagementSectionKey = (
    pathname: string,
    sub?: string | null
) => {
    if (pathname.includes('/user-management/edit/')) return 'edit-user'
    if (pathname.includes('/user-details/')) return 'user-details'
    if (
        pathname.includes('/group-details/') ||
        pathname.includes('/groupDetails/')
    ) {
        return 'group-details'
    }
    if (pathname.includes('/role-details/')) return 'role-details'
    if (pathname.includes('/create-new-user')) return 'create-user'
    if (pathname.includes('/create-new-group')) return 'create-group'
    if (pathname.includes('/create-new-role')) return 'create-role'
    if (pathname.includes('/department/edit/')) return 'edit-department'
    if (pathname.includes('/department/new')) return 'create-department'
    if (pathname.includes('/department/')) return 'department-details'
    if (pathname.includes('/announcement/new')) return 'create-announcement'
    if (pathname.includes('/announcement/')) return 'announcement-details'
    if (pathname.includes('/preferences')) return 'preferences'

    const isIndex =
        pathname === '/admin/user-management' ||
        pathname === '/admin/user-management/'
    if (!isIndex) return null
    if (sub === 'group') return 'group'
    if (sub === 'role') return 'role'
    if (sub === 'department') return 'department'
    if (sub === 'announcements') return 'announcements'
    if (sub === 'sessions') return 'sessions'
    if (sub === 'branch-assignment') return 'branch-assignment'
    return 'user'
}

export const USER_MANAGEMENT_SUB_SIDEBAR_SECTIONS: readonly SubSidebarSection[] =
    [
        {
            title: 'مدیریت کاربران',
            links: [
                { label: 'کاربران', href: '/admin/user-management?sub=user' },
                { label: 'نقش‌ها', href: '/admin/user-management?sub=role' },
                {
                    label: 'دپارتمان‌ها',
                    href: '/admin/user-management?sub=department',
                },
                {
                    label: 'انتصاب به شعبه',
                    href: '/admin/user-management?sub=branch-assignment',
                },
            ],
        },
        {
            title: 'سامانه',
            links: [
                {
                    label: 'امنیت و نشست‌ها',
                    href: '/admin/user-management?sub=sessions',
                },
                {
                    label: 'اعلان‌ها',
                    href: '/admin/user-management?sub=announcements',
                },
                {
                    label: 'ترجیحات',
                    href: '/admin/user-management/preferences',
                },
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
