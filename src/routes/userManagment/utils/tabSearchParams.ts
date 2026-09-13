import type { UserManagementSearchParams } from "../index";

const TAB_SEARCH_PARAM_MAP = {
    groups: "group",
    users: "user",
    role: "role",
} as const;

export type TableListTabValue = keyof typeof TAB_SEARCH_PARAM_MAP;

export function getTabValueFromSearchParams(
    params: UserManagementSearchParams
): TableListTabValue {
    if (params.group !== undefined) return "groups";
    if (params.role !== undefined) return "role";
    return "users";
}

export function createTabSearchQuery(value: string): string {
    if (value === "users") {
        return "";
    }

    const paramKey = TAB_SEARCH_PARAM_MAP[value as TableListTabValue];

    if (!paramKey) {
        return "";
    }

    const searchParams = new URLSearchParams();
    searchParams.set(paramKey, value);

    return searchParams.toString();
}
