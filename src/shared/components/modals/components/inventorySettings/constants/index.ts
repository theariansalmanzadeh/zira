import type { InventoryDetails, InventoryEmployee } from "../types";

export const DEFAULT_INVENTORY_DETAILS: InventoryDetails = {
    name: "انبار مرکزی تهران",
    id: "WR-1005",
    managerName: "رضا کاظمی",
    startDate: "-",
    status: "فعال",
    area: "450",
    insuranceStatus: "معتبر تا 1404/10",
    description: "-",
    address: "تهران، پاسداران، اطلس مال، طبقه 11، پلاک 10",
    postalCode: "-",
    landlinePhone: "-",
};

export const DEFAULT_INVENTORY_EMPLOYEES: InventoryEmployee[] = [
    { userName: "نام کاربر", userId: "PR0239", status: "active" },
    { userName: "نام کاربر", userId: "PR0239", status: "inactive" },
    { userName: "نام کاربر", userId: "PR0239", status: "active" },
    { userName: "نام کاربر", userId: "PR0239", status: "inactive" },
    { userName: "نام کاربر", userId: "PR0239", status: "active" },
    { userName: "نام کاربر", userId: "PR0239", status: "inactive" },
];

export const SIDEBAR_ITEMS = [
    { id: "details" as const, label: "مشخصات" },
    { id: "map" as const, label: "نقشه انبار" },
    { id: "employees" as const, label: "کارمندان" },
];
