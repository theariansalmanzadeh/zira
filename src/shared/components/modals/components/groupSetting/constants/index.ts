import type { GroupDetails, GroupUser } from "../types";

export const DEFAULT_GROUP_DETAILS: GroupDetails = {
    name: "عنوان گروه",
    id: "GR-5318_92",
    role: "-",
    managerName: "نام کاربر",
    status: "فعال",
    description: "-",
};

export const DEFAULT_GROUP_USERS: GroupUser[] = [
    { userName: "نام کاربر", userId: "PR0239", status: "active" },
    { userName: "نام کاربر", userId: "PR0239", status: "inactive" },
    { userName: "نام کاربر", userId: "PR0239", status: "active" },
    { userName: "نام کاربر", userId: "PR0239", status: "inactive" },
    { userName: "نام کاربر", userId: "PR0239", status: "active" },
    { userName: "نام کاربر", userId: "PR0239", status: "inactive" },
];

export const SIDEBAR_ITEMS = [
    { id: "details" as const, label: "مشخصات" },
    { id: "users" as const, label: "کاربران" },
];
