import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export type LicenseTab = 'certificates' | 'licenses'

export type LicenseStatus = 'active' | 'inactive'

export type LicenseFileType = 'pdf' | 'image'

export type LicenseCardData = {
    id: string
    title: string
    code: string
    issuer: string
    issuedAt: string
    status: LicenseStatus
    fileType: LicenseFileType
    visibleOnSite: boolean
    tab: LicenseTab
}

export const LICENSES_TOGGLE_BUTTON_VALUE = [
    { label: 'گواهی‌ها', value: 'certificates' },
    { label: 'مجوزها و استانداردها', value: 'licenses' },
] as const

export const LICENSE_FILE_TYPE_STYLES: Record<
    LicenseFileType,
    { badge: string; previewBg: string; icon: 'fileCheck400Linear' | 'layers400Linear'; iconClassName: string }
> = {
    pdf: {
        badge: 'PDF',
        previewBg: 'bg-warning-container',
        icon: 'fileCheck400Linear',
        iconClassName: 'size-7! text-error',
    },
    image: {
        badge: 'IMG',
        previewBg: 'bg-info-container',
        icon: 'layers400Linear',
        iconClassName: 'size-7! text-info',
    },
}

export const LICENSES_DUMMY: LicenseCardData[] = [
    {
        id: 'cert-0',
        title: 'گواهی استاندارد ملی نساجی',
        code: 'ZR-C1000',
        issuer: 'اتحادیه پوشاک ایران',
        issuedAt: '2025-09-03T00:00:00.000Z',
        status: 'active',
        fileType: 'pdf',
        visibleOnSite: true,
        tab: 'certificates',
    },
    {
        id: 'cert-1',
        title: 'گواهی کنترل کیفیت محصول',
        code: 'ZR-C1007',
        issuer: 'اتحادیه پوشاک ایران',
        issuedAt: '2025-08-19T00:00:00.000Z',
        status: 'active',
        fileType: 'image',
        visibleOnSite: true,
        tab: 'certificates',
    },
    {
        id: 'cert-2',
        title: 'گواهی عضویت اتحادیه پوشاک',
        code: 'ZR-C1014',
        issuer: 'اتحادیه پوشاک ایران',
        issuedAt: '2025-07-01T00:00:00.000Z',
        status: 'active',
        fileType: 'pdf',
        visibleOnSite: false,
        tab: 'certificates',
    },
    {
        id: 'cert-3',
        title: 'تاییدیه آزمایشگاه پارچه',
        code: 'ZR-C1021',
        issuer: 'اتحادیه پوشاک ایران',
        issuedAt: '2025-06-12T00:00:00.000Z',
        status: 'active',
        fileType: 'pdf',
        visibleOnSite: true,
        tab: 'certificates',
    },
    {
        id: 'lic-0',
        title: 'مجوز بهره‌برداری تولید',
        code: 'ZR-L1000',
        issuer: 'سازمان صنعت، معدن و تجارت',
        issuedAt: '2025-05-05T00:00:00.000Z',
        status: 'active',
        fileType: 'pdf',
        visibleOnSite: true,
        tab: 'licenses',
    },
    {
        id: 'lic-1',
        title: 'پروانه کسب صنفی',
        code: 'ZR-L1007',
        issuer: 'سازمان صنعت، معدن و تجارت',
        issuedAt: '2025-02-26T00:00:00.000Z',
        status: 'active',
        fileType: 'image',
        visibleOnSite: true,
        tab: 'licenses',
    },
    {
        id: 'lic-2',
        title: 'استاندارد ISO 9001',
        code: 'ZR-L1014',
        issuer: 'سازمان صنعت، معدن و تجارت',
        issuedAt: '2025-02-08T00:00:00.000Z',
        status: 'inactive',
        fileType: 'pdf',
        visibleOnSite: false,
        tab: 'licenses',
    },
]

export const filterLicenses = (
    items: LicenseCardData[],
    tab: LicenseTab | string
) => items.filter((item) => item.tab === tab)

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'title', header_label: 'عنوان', isChecked: true },
    { id: 'code', header_label: 'کد', isChecked: true },
    { id: 'issuer', header_label: 'مرجع صدور', isChecked: true },
    { id: 'status', header_label: 'وضعیت', isChecked: true },
]
