export const ROUTE_CONFIGS = {
    userManagement: { TOGGLE_BUTTON_VALUE: [{ label: "گروه ها", value: "groups" }, { label: "کاربران", value: "users" }, { label: "نقش‌ها و دسترسي", value: "role" }], },
    support: { TOGGLE_BUTTON_VALUE: [{ label: "داشبورد", value: "dashboard" }, { label: "دپارتمان ها", value: "department" }], },
    tickets: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "تیکت‌های باز", value: "open" },
            { label: "در انتظار پاسخ", value: "pending" },
            { label: "بسته‌شده", value: "closed" },
        ],
    },
    branches: { TOGGLE_BUTTON_VALUE: [{ label: "همه", value: "all" }, { label: "فعال", value: "active" }, { label: "غیرفعال", value: "inactive" }], },
    bundle: { TOGGLE_BUTTON_VALUE: [{ label: "همه", value: "all" }, { label: "فعال", value: "active" }, { label: "غیرفعال", value: "inactive" }], },
    brands: { TOGGLE_BUTTON_VALUE: [{ label: "همه", value: "all" }, { label: "فعال", value: "active" }, { label: "غیرفعال", value: "inactive" }], },
    packsList: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه پک ها", value: "all" },
            { label: "نمایش عمومی", value: "public" },
            { label: "گروه مشتریان", value: "customer-group" },
            { label: "عدم نمایش", value: "hidden" },
        ],
    },
    branchDetails: {
        TOGGLE_BUTTON_VALUE: [
            { label: "لیست کالا", value: "products" },
            { label: "نقشه انبار", value: "warehouseMap" },
            { label: "کارمندان", value: "employees" },
            { label: "صندوق ها", value: "cashRegisters" },
            { label: "حساب های بانکی", value: "bankAccounts" },
        ],
    },
    prePurchase: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "تاییدشده", value: "approved" },
            { label: "در انتظار شورا", value: "pendingCouncil" },
            { label: "رد شده", value: "rejected" },
        ],
    },
    backFromBuying: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "تایید شده", value: "approved" },
            { label: "در انتظار شورا", value: "pendingCouncil" },
            { label: "رد شده", value: "rejected" },
        ],
    },
    escrowPurchase: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "پیش نویس", value: "draft" },
        ],
    },
    discount: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "تخفیف ترکیبی", value: "combined" },
            { label: "تخفیف خرید نقدی", value: "cash" },
        ],
    },
    campaign: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "فعال", value: "active" },
            { label: "غیرفعال", value: "inactive" },
            { label: "آرشیو", value: "archive" },
            { label: "پیش‌نویس", value: "draft" },
        ],
    },
    pricing: {
        TOGGLE_BUTTON_VALUE: [
            { label: "پیش‌نویس", value: "DRAFT" },
            { label: "زمان‌بندی‌شده", value: "SCHEDULED" },
            { label: "منتشرشده", value: "PUBLISHED" },
            { label: "لغو شده", value: "CANCELLED" },
        ],
    },
    preFactor: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "پیش‌نویس", value: "draft" },
        ],
    },
    returnSales: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "پیش‌نویس", value: "draft" },
        ],
    },
    salesFactor: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "پیش‌نویس", value: "draft" },
        ],
    },
    consignmentSales: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "پیش‌نویس", value: "draft" },
        ],
    },
    orderList: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "در انتظار تایید", value: "pending" },
            { label: "تکمیل شده", value: "completed" },
            { label: "لغو شده", value: "cancelled" },
            { label: "مرجوعی", value: "returned" },
        ],
    },
    preOrder: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "در انتظار پرداخت", value: "pendingPayment" },
            { label: "تایید شده", value: "confirmed" },
            { label: "رد شده", value: "rejected" },
            { label: "لغو شده", value: "cancelled" },
        ],
    },
    factor: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "نقدی", value: "cash" },
            { label: "چکی", value: "cheque" },
            { label: "اعتباری", value: "credit" },
        ],
    },
    accountingDocuments: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "موقت", value: "temporary" },
            { label: "دائم", value: "permanent" },
            { label: "افتتاحیه/اختتامیه", value: "openingClosing" },
        ],
    },
    accountReceipt: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "پیش‌نویس", value: "draft" },
        ],
    },
    paymentNotices: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "نقدی", value: "cash" },
            { label: "خرج چک", value: "cheque" },
            { label: "برداشت چک", value: "withdrawalCheque" },
        ],
    },
    chequeManagment: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "دریافتنی", value: "receivable" },
            { label: "پرداختنی", value: "payable" },
            { label: "وصولی", value: "collected" },
            { label: "برگشتی", value: "returned" },
        ],
    },
    internalTransfers: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "انتقال بانکی", value: "bankTransfer" },
            { label: "تهاتر", value: "barter" },
        ],
    },
    bankAndVaults: {
        TOGGLE_BUTTON_VALUE: [
            { label: "حساب‌های بانکی", value: "bankAccounts" },
            { label: "صندوق‌ها", value: "vaults" },
            { label: "کارتخوان‌ها", value: "pos" },
            { label: "دسته‌چک‌ها", value: "checkbooks" },
        ],
    },
    customerAnalysis: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "بدهکار", value: "debtor" },
            { label: "بستانکار", value: "creditor" },
        ],
    },
    payroll: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "قطعی", value: "finalized" },
            { label: "در حال محاسبه", value: "calculating" },
            { label: "پیش‌نویس", value: "draft" },
        ],
    },
    userOrder: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "در انتظار تایید", value: "pending" },
            { label: "تکمیل شده", value: "completed" },
            { label: "لغو شده", value: "cancelled" },
            { label: "مرجوعی", value: "returned" },
        ],
    },
    requestManagment: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "در انتظار پرداخت", value: "pendingPayment" },
            { label: "تایید شده", value: "approved" },
            { label: "رد شده", value: "rejected" },
            { label: "لغو شده", value: "cancelled" },
        ],
    },
    chartOfAccount: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "دارایی‌ها", value: "assets" },
            { label: "بدهی‌ها", value: "liabilities" },
            { label: "حقوق صاحبان سهام", value: "equity" },
            { label: "درآمد", value: "revenue" },
            { label: "هزینه", value: "expense" },
            { label: "انتظامی", value: "memorandum" },
        ],
    },
    inventoryList: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "فعال", value: "active" },
            { label: "غیرفعال", value: "inactive" },
        ],
    },
    inventoryInvoice: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "در انتظار", value: "pending" },
            { label: "تعیین‌نشده", value: "unassigned" },
            { label: "تأییدشده", value: "confirmed" },
        ],
    },
    preparationExit: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "در انتظار", value: "pending" },
            { label: "تعیین‌نشده", value: "unassigned" },
            { label: "تأییدشده", value: "confirmed" },
        ],
    },
    warehouseTransferTracking: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "در انتظار تأیید", value: "accepting" },
            { label: "در حال جابجایی", value: "transferring" },
            { label: "دریافت شده", value: "received" },
            { label: "قطعی شده", value: "completed" },
            { label: "لغو شده", value: "cancelled" },
        ],
    },
    shipmentStatus: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all", count: 7 },
            { label: "در حال آماده‌سازی", value: "preparing", count: 1 },
            { label: "در حال انتقال داخلی", value: "internal-transfer", count: 1 },
            { label: "در حال ارسال به مشتری", value: "sending-to-customer", count: 2 },
            { label: "ارسال شد", value: "sent", count: 1 },
            { label: "دریافت توسط مشتری", value: "received-by-customer", count: 2 },
        ],
    },
    waste: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "در حال بررسی", value: "under-review" },
            { label: "تایید شده", value: "approved" },
            { label: "رد شده", value: "rejected" },
        ],
    },
    stockReturn: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "در حال بررسی", value: "under-review" },
            { label: "در انتظار دریافت", value: "awaiting-receipt" },
        ],
    },
    customers: {
        TOGGLE_BUTTON_VALUE: [
            { label: "مشتریان", value: "customers" },
            { label: "گروه مشتریان", value: "groups" },
        ],
    },
    inventoryDetail: {
        TOGGLE_BUTTON_VALUE: [
            { label: "لیست کالا", value: "products" },
            { label: "نقشه انبار", value: "warehouseMap" },
            { label: "کارمندان", value: "employees" },
        ],
    },
    changeAddress: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "در انتظار", value: "pending" },
            { label: "در حال انتقال", value: "in-transit" },
            { label: "تکمیل شده", value: "completed" },
        ],
    },
    transfer: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه", value: "all" },
            { label: "در انتظار", value: "pending" },
            { label: "در حال انتقال", value: "in-transit" },
            { label: "تکمیل شده", value: "completed" },
        ],
    },
    events: {
        TOGGLE_BUTTON_VALUE: [
            { label: "همه رخدادها", value: "all" },
            { label: "حساس", value: "sensitive" },
            { label: "ناموفق", value: "failed" },
        ],
    },
}
