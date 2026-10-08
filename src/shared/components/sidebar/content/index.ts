import { IconLabel } from "@/src/shared/types/icon"
import { ORDER_SUB_SIDEBAR_SECTIONS } from "@/src/routes/orderManagment/constants"
import { SALES_SUB_SIDEBAR_SECTIONS } from "@/src/routes/sales/constants"
import { ACCOUNTING_SUB_SIDEBAR_SECTIONS } from "@/src/routes/Accounting/constants"
import { INVENTORY_SUB_SIDEBAR_SECTIONS } from "@/src/routes/inventoryManagment/constants"
import { CUSTOMERS_SUB_SIDEBAR_SECTIONS } from "@/src/routes/customers/constants"
import { CONTENT_SUB_SIDEBAR_SECTIONS } from "@/src/routes/contentManagment/constants"
import { EVENTS_SUB_SIDEBAR_SECTIONS } from "@/src/routes/events/constants"
import { USER_MANAGEMENT_SUB_SIDEBAR_SECTIONS } from "@/src/routes/userManagment/constants"
import { LOCAL_SUB_SIDEBAR_CONTENT } from "./localSubSidebars"
import type { SubSidebarContent } from "./types"

export type { SubSidebarContent, SubSidebarLink, SubSidebarSection } from "./types"

export const SIDEBAR_CONTENT: {
    title: string
    faLabel: string
    icon: IconLabel
    breadcrumb: string
    link: string
}[] = [
    {
        title: "Dashboard",
        faLabel: "داشبورد",
        icon: "dashboard400Linear",
        breadcrumb: "داشبورد",
        link: "/dashboard",
    },
    {
        title: "order-managment",
        faLabel: "مدیریت سفارشات",
        breadcrumb: "مدیریت سفارشات",
        icon: "order400Linear",
        link: "/admin/order-managment",
    },
    {
        title: "branches",
        faLabel: "شعب",
        breadcrumb: "شعب",
        icon: "store400Linear",
        link: "/admin/branches",
    },
    {
        title: "Settings",
        faLabel: "تنظیمات",
        breadcrumb: "Settings",
        icon: "settings",
        link: "/admin/settings",
    },
    {
        title: "warehouse",
        faLabel: "انبارداری",
        breadcrumb: "انبارداری",
        icon: "warehouse",
        link: "/admin/inventory-managment",
    },
    {
        title: "customers",
        faLabel: "مدیریت مشتریان",
        breadcrumb: "مدیریت مشتریان",
        icon: "groups",
        link: "/admin/customers",
    },
    {
        title: "content-managment",
        faLabel: "مدیریت محتوا",
        breadcrumb: "مدیریت محتوا",
        icon: "description400Linear",
        link: "/admin/content-managment",
    },
    {
        title: "create field",
        faLabel: "فروش",
        breadcrumb: "New Field Profile",
        icon: "analytics",
        link: "/admin/sales",
    },
    {
        title: "categories",
        faLabel: "مدیریت کالا",
        breadcrumb: "New Field Profile",
        icon: "product400Linear",
        link: "/admin/categories",
    },
    {
        title: "Accounting",
        faLabel: "حسابداری",
        breadcrumb: "Accounting",
        icon: "heapSnapshot400Linear",
        link: "/admin/accounting",
    },
    {
        title: "create field",
        faLabel: "فیلد",
        breadcrumb: "New Field Profile",
        icon: "storeFront",
        link: "/field",
    },
    {
        title: "create field",
        faLabel: "پشتیبانی",
        breadcrumb: "New Field Profile",
        icon: "conversation",
        link: "/admin/support",
    },
    {
        title: "Notifications",
        faLabel: "اعلان‌ها",
        breadcrumb: "Notifications",
        icon: "notification",
        link: "/admin/notification",
    },
    {
        title: "events",
        faLabel: "رخدادها",
        breadcrumb: "رخدادها",
        icon: "history400Linear",
        link: "/admin/events",
    },
    {
        title: "user-management",
        faLabel: "مدیریت کاربران",
        breadcrumb: "مدیریت کاربران",
        icon: "groups",
        link: "/admin/user-management",
    },
]

export const SUB_SIDEBAR_CONTENT: Record<string, SubSidebarContent> = {
    ...LOCAL_SUB_SIDEBAR_CONTENT,
    sales: {
        headerIcon: "upload300Linear",
        header: "فروش",
        faLabel: "فروش",
        subheader: "پیش‌فاکتور تا تسویه",
        itemsList: SALES_SUB_SIDEBAR_SECTIONS,
    },
    'order-managment': {
        headerIcon: "order300Linear",
        header: "مدیریت سفارشات",
        faLabel: "مدیریت سفارشات",
        subheader: "ثبت و پیگیری سفارش‌ها",
        itemsList: ORDER_SUB_SIDEBAR_SECTIONS,
    },
    accounting: {
        headerIcon: "heapSnapshot400Linear",
        header: "حسابداری و مالی",
        faLabel: "حسابداری",
        subheader: "دفتر کل تا خزانه و مالیات",
        itemsList: ACCOUNTING_SUB_SIDEBAR_SECTIONS,
    },
    customers: {
        headerIcon: "groups",
        header: "مدیریت مشتریان",
        faLabel: "مدیریت مشتریان",
        subheader: "زیرا مارکت",
        itemsList: CUSTOMERS_SUB_SIDEBAR_SECTIONS,
    },
    'inventory-managment': {
        headerIcon: 'warehouse',
        header: 'انبارداری',
        faLabel: 'انبارداری',
        subheader: 'مدیریت انبار و موجودی',
        itemsList: INVENTORY_SUB_SIDEBAR_SECTIONS,
    },
    'content-managment': {
        headerIcon: 'description400Linear',
        header: 'مدیریت محتوا',
        faLabel: 'مدیریت محتوا',
        subheader: 'زیرا مارکت',
        itemsList: CONTENT_SUB_SIDEBAR_SECTIONS,
    },
    events: {
        headerIcon: 'history400Linear',
        header: 'رخدادها',
        faLabel: 'رخدادها',
        subheader: 'ثبت و پایش رخدادهای سامانه',
        itemsList: EVENTS_SUB_SIDEBAR_SECTIONS,
    },
    'user-management': {
        headerIcon: 'groups',
        header: 'مدیریت کاربران',
        faLabel: 'مدیریت کاربران',
        subheader: 'کاربران، گروه‌ها، نقش‌ها و دپارتمان‌ها',
        itemsList: USER_MANAGEMENT_SUB_SIDEBAR_SECTIONS,
    },
}
