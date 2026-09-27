export type PreparationExitType = 'in-person' | 'online' | 'archive' | 'rejected'

export const PREPARATION_EXIT_TYPES: {
    label: string
    value: PreparationExitType
}[] = [
    { label: 'فروش حضوری', value: 'in-person' },
    { label: 'فروش آنلاین', value: 'online' },
    { label: 'بایگانی خروج', value: 'archive' },
    { label: 'رد شده', value: 'rejected' },
]

export type PreparationExitAction =
    | 'invoice-cartable'
    | 'transfer-warehouse'
    | 'deliver-customer'
    | 'delivered'
    | 'transfer-consolidation'
    | 'send-customer'

export type PreparationExitRecord = {
    id: string
    type: PreparationExitType
    action: PreparationExitAction
    dateTime: string
    invoiceNumber: string
    customerCode: string
    customerName: string
    customerPhone: string
    sellerName: string
    salesChannel: string
    settlementStatus: string
    cashier: string
    actionType: string
    warehouse: string
    warehouseCode: string
    warehouseName: string
    warehouseItems: string
    totalQuantity?: string
    shippingMethod?: string
    consolidationStatus?: string
    currentStage?: string
    lastShipmentStatus?: string
    approverName?: string
    description?: string
}

export const PREPARATION_EXIT_ACTIONS: Record<
    PreparationExitType,
    { label: string; value: PreparationExitAction }[]
> = {
    'in-person': [
        { label: 'کارتابل فاکتورها', value: 'invoice-cartable' },
        { label: 'انتقال به انبار تحویل دهنده', value: 'transfer-warehouse' },
        { label: 'تحویل به مشتری', value: 'deliver-customer' },
        { label: 'تحویل شده', value: 'delivered' },
    ],
    online: [
        { label: 'کارتابل فاکتورها', value: 'invoice-cartable' },
        { label: 'انتقال برای تجمیع', value: 'transfer-consolidation' },
        { label: 'ارسال به مشتری', value: 'send-customer' },
    ],
    archive: [
        { label: 'ارسال به مشتری', value: 'send-customer' },
        { label: 'انتقال برای تجمیع', value: 'transfer-consolidation' },
    ],
    rejected: [],
}

export const PREPARATION_EXIT_RECORDS: PreparationExitRecord[] = [
    {
        id: 'EX-1404-01',
        type: 'in-person',
        action: 'invoice-cartable',
        customerPhone: '+۹۸ ۹۱۲ ۳۴۵ ۶۷۸۹',
        salesChannel: 'فروش حضوری',
        dateTime: '۱۴۰۴/۱۰/۱۲ — ۱۴:۳۰',
        invoiceNumber: 'SF-982032',
        customerCode: 'CU-2344',
        customerName: 'حسین احمدی',
        sellerName: 'مریم رضایی',
        settlementStatus: 'تسویه شده',
        cashier: 'رضا کاظمی',
        actionType: 'فروش حضوری',
        warehouse: 'انبار مرکزی تهران',
        warehouseCode: 'WH-1001',
        warehouseName: 'انبار مرکزی تهران',
        warehouseItems: '۱۲ قلم',
    },
    {
        id: 'EX-1404-02',
        type: 'in-person',
        action: 'transfer-warehouse',
        customerPhone: '+۹۸ ۹۳۵ ۱۲۰ ۸۸۴۵',
        salesChannel: 'فروش حضوری',
        dateTime: '۱۴۰۴/۱۰/۱۱ — ۱۱:۰۵',
        invoiceNumber: 'SF-982018',
        customerCode: 'CU-1180',
        customerName: 'نگار محمدی',
        sellerName: 'علی حسینی',
        settlementStatus: 'در انتظار تسویه',
        cashier: 'سارا نوری',
        actionType: 'فروش حضوری',
        warehouse: 'انبار کرج',
        warehouseCode: 'WH-1004',
        warehouseName: 'انبار کرج',
        warehouseItems: '۶ قلم',
    },
    {
        id: 'EX-1404-03',
        type: 'online',
        action: 'invoice-cartable',
        customerPhone: '+۹۸ ۹۲۱ ۴۴۰ ۱۱۰۲',
        salesChannel: 'فروش آنلاین',
        dateTime: '۱۴۰۴/۱۰/۱۲ — ۱۸:۴۰',
        invoiceNumber: 'SF-771204',
        customerCode: 'CU-4401',
        customerName: 'کیان پارسا',
        sellerName: 'فروشگاه آنلاین',
        settlementStatus: 'تسویه شده',
        cashier: '—',
        actionType: 'فروش آنلاین',
        warehouse: 'انبار مرکزی تهران',
        warehouseCode: 'WH-1001',
        warehouseName: 'انبار مرکزی تهران',
        warehouseItems: '۳ قلم',
        totalQuantity: '۱۲',
        shippingMethod: 'پیک',
        consolidationStatus: 'در انتظار تجمیع',
        currentStage: 'کارتابل فاکتورها',
    },
    {
        id: 'EX-1404-04',
        type: 'archive',
        action: 'send-customer',
        customerPhone: '+۹۸ ۹۱۳ ۰۹۰ ۲۲۱۰',
        salesChannel: 'فروش حضوری',
        dateTime: '۱۴۰۴/۰۹/۲۸ — ۰۹:۱۵',
        invoiceNumber: 'SF-650112',
        customerCode: 'CU-0902',
        customerName: 'شرکت پارس پوش',
        sellerName: 'مریم رضایی',
        settlementStatus: 'بایگانی شده',
        cashier: 'رضا کاظمی',
        actionType: 'بایگانی خروج',
        warehouse: 'انبار اصفهان',
        warehouseCode: 'WH-1008',
        warehouseName: 'انبار اصفهان',
        warehouseItems: '۲۴ قلم',
        totalQuantity: '۲۴',
        lastShipmentStatus: 'تحویل شده',
        approverName: 'رضا کاظمی',
        description: 'خروج کالا بایگانی شد',
    },
    {
        id: 'EX-1404-05',
        type: 'rejected',
        action: 'invoice-cartable',
        customerPhone: '+۹۸ ۹۱۲ ۳۳۱ ۰۹۸۰',
        salesChannel: 'فروش آنلاین',
        dateTime: '۱۴۰۴/۱۰/۰۹ — ۱۶:۲۰',
        invoiceNumber: 'SF-650098',
        customerCode: 'CU-3310',
        customerName: 'الهام کریمی',
        sellerName: 'علی حسینی',
        settlementStatus: 'رد شده',
        cashier: 'سارا نوری',
        actionType: 'رد شده',
        warehouse: 'انبار مرکزی تهران',
        warehouseCode: 'WH-1001',
        warehouseName: 'انبار مرکزی تهران',
        warehouseItems: '۲ قلم',
    },
    {
        id: 'EX-1404-06',
        type: 'in-person',
        action: 'deliver-customer',
        customerPhone: '+۹۸ ۹۱۲ ۶۶۰ ۱۱۴۴',
        salesChannel: 'فروش حضوری',
        dateTime: '۱۴۰۴/۱۰/۱۰ — ۱۰:۰۰',
        invoiceNumber: 'SF-982010',
        customerCode: 'CU-2201',
        customerName: 'مینا عباسی',
        sellerName: 'مریم رضایی',
        settlementStatus: 'تسویه شده',
        cashier: 'رضا کاظمی',
        actionType: 'فروش حضوری',
        warehouse: 'انبار مرکزی تهران',
        warehouseCode: 'WH-1001',
        warehouseName: 'انبار مرکزی تهران',
        warehouseItems: '۴ قلم',
    },
    {
        id: 'EX-1404-07',
        type: 'in-person',
        action: 'delivered',
        customerPhone: '+۹۸ ۹۳۰ ۲۲۰ ۱۸۱۸',
        salesChannel: 'فروش حضوری',
        dateTime: '۱۴۰۴/۱۰/۰۸ — ۱۳:۴۵',
        invoiceNumber: 'SF-981990',
        customerCode: 'CU-1502',
        customerName: 'حمید جعفری',
        sellerName: 'علی حسینی',
        settlementStatus: 'تسویه شده',
        cashier: 'سارا نوری',
        actionType: 'فروش حضوری',
        warehouse: 'انبار کرج',
        warehouseCode: 'WH-1004',
        warehouseName: 'انبار کرج',
        warehouseItems: '۸ قلم',
    },
    {
        id: 'EX-1404-08',
        type: 'online',
        action: 'transfer-consolidation',
        customerPhone: '+۹۸ ۹۱۹ ۸۸۰ ۳۳۲۱',
        salesChannel: 'فروش آنلاین',
        dateTime: '۱۴۰۴/۱۰/۱۲ — ۱۶:۱۰',
        invoiceNumber: 'SF-771188',
        customerCode: 'CU-4418',
        customerName: 'نیلوفر صالحی',
        sellerName: 'فروشگاه آنلاین',
        settlementStatus: 'تسویه شده',
        cashier: '—',
        actionType: 'فروش آنلاین',
        warehouse: 'انبار مرکزی تهران',
        warehouseCode: 'WH-1001',
        warehouseName: 'انبار مرکزی تهران',
        warehouseItems: '۵ قلم',
        totalQuantity: '۸',
        shippingMethod: 'پست',
        consolidationStatus: 'در حال تجمیع',
        currentStage: 'انتقال برای تجمیع',
    },
    {
        id: 'EX-1404-09',
        type: 'online',
        action: 'send-customer',
        customerPhone: '+۹۸ ۹۱۲ ۷۷۰ ۴۴۵۵',
        salesChannel: 'فروش آنلاین',
        dateTime: '۱۴۰۴/۱۰/۱۱ — ۱۹:۲۵',
        invoiceNumber: 'SF-771090',
        customerCode: 'CU-4502',
        customerName: 'آرمان نادری',
        sellerName: 'فروشگاه آنلاین',
        settlementStatus: 'تسویه شده',
        cashier: '—',
        actionType: 'فروش آنلاین',
        warehouse: 'انبار کرج',
        warehouseCode: 'WH-1004',
        warehouseName: 'انبار کرج',
        warehouseItems: '۲ قلم',
        totalQuantity: '۴',
        shippingMethod: 'ارسال فروشگاه',
        consolidationStatus: 'تجمیع شده',
        currentStage: 'ارسال به مشتری',
    },
    {
        id: 'EX-1404-10',
        type: 'archive',
        action: 'transfer-consolidation',
        customerPhone: '+۹۸ ۹۱۳ ۵۵۰ ۶۶۷۷',
        salesChannel: 'فروش حضوری',
        dateTime: '۱۴۰۴/۰۹/۲۰ — ۱۲:۰۰',
        invoiceNumber: 'SF-650080',
        customerCode: 'CU-0881',
        customerName: 'فروشگاه نقشینه',
        sellerName: 'علی حسینی',
        settlementStatus: 'بایگانی شده',
        cashier: 'رضا کاظمی',
        actionType: 'بایگانی خروج',
        warehouse: 'انبار اصفهان',
        warehouseCode: 'WH-1008',
        warehouseName: 'انبار اصفهان',
        warehouseItems: '۱۵ قلم',
        totalQuantity: '۱۵',
        lastShipmentStatus: 'ارسال شده',
        approverName: 'سارا نوری',
        description: 'انتقال برای تجمیع انجام شد',
    },
]

const actionColumn = { id: 'actions', header_label: '', isChecked: true }

export const PREPARATION_EXIT_COLUMNS: Record<
    PreparationExitType,
    { id: string; header_label: string; isChecked: boolean }[]
> = {
    'in-person': [
        { id: 'dateTime', header_label: 'تاریخ و ساعت', isChecked: true },
        { id: 'invoiceNumber', header_label: 'شماره فاکتور فروش', isChecked: true },
        { id: 'customerCode', header_label: 'کد مشتری', isChecked: true },
        { id: 'customerName', header_label: 'نام مشتری', isChecked: true },
        { id: 'sellerName', header_label: 'نام فروشنده', isChecked: true },
        { id: 'settlementStatus', header_label: 'وضعیت تسویه مالی', isChecked: true },
        actionColumn,
    ],
    online: [
        { id: 'dateTime', header_label: 'تاریخ ارجاع', isChecked: true },
        { id: 'invoiceNumber', header_label: 'شماره فاکتور', isChecked: true },
        { id: 'customerCode', header_label: 'کد مشتری', isChecked: true },
        { id: 'customerName', header_label: 'نام مشتری', isChecked: true },
        { id: 'actionType', header_label: 'نوع خروج', isChecked: true },
        { id: 'warehouse', header_label: 'انبار ارسال کننده', isChecked: true },
        { id: 'warehouseCode', header_label: 'کد انبار', isChecked: true },
        actionColumn,
    ],
    archive: [
        { id: 'dateTime', header_label: 'تاریخ خروج', isChecked: true },
        { id: 'invoiceNumber', header_label: 'شماره فاکتور', isChecked: true },
        { id: 'customerCode', header_label: 'کد مشتری', isChecked: true },
        { id: 'customerName', header_label: 'نام مشتری', isChecked: true },
        { id: 'customerPhone', header_label: 'شماره تماس مشتری', isChecked: true },
        { id: 'warehouseCode', header_label: 'کد انبار', isChecked: true },
        actionColumn,
    ],
    rejected: [
        { id: 'dateTime', header_label: 'تاریخ رد', isChecked: true },
        { id: 'salesChannel', header_label: 'کانال فروش', isChecked: true },
        { id: 'invoiceNumber', header_label: 'شماره فاکتور', isChecked: true },
        { id: 'customerCode', header_label: 'کد مشتری', isChecked: true },
        { id: 'customerName', header_label: 'نام مشتری', isChecked: true },
        { id: 'customerPhone', header_label: 'شماره تماس مشتری', isChecked: true },
        actionColumn,
    ],
}

export const PREPARATION_EXIT_ROUTE_SEGMENT: Record<
    PreparationExitType,
    string
> = {
    'in-person': 'in-person',
    online: 'online',
    archive: 'archived',
    rejected: 'rejected',
}

export const getPreparationExitHref = (
    record: Pick<PreparationExitRecord, 'id' | 'type'>
) =>
    `/admin/inventory-managment/preparation-exit/${PREPARATION_EXIT_ROUTE_SEGMENT[record.type]}/${record.id}`

export const getPreparationExitById = (id: string) =>
    PREPARATION_EXIT_RECORDS.find((record) => record.id === id)
