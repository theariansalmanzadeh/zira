export type TableAttribute = {
    label: string;
    value: string;
    isActive: boolean;
};

export const ORDER_MANAGMENT: TableAttribute[] = [
    { label: "همه", value: "all", isActive: true },
    { label: "در انتظار تایید", value: "pending_approval", isActive: true },
    { label: "تکمیل شده", value: "completed", isActive: true },
    { label: "لغو شده", value: "canceled", isActive: true },
    { label: "مرجوعی", value: "returned", isActive: true },
];


const TABLE_ATTRIBUTES_BY_PATH: Record<string, TableAttribute[]> = {
    "order": ORDER_MANAGMENT,
};

export const getTableAttributesByPathname = (pathname: string): TableAttribute[] => {
    const pathSegments = pathname.split("/");
    const pathSegment = pathSegments[pathSegments.length - 1];
    return TABLE_ATTRIBUTES_BY_PATH[pathSegment] ?? ORDER_MANAGMENT;
};
