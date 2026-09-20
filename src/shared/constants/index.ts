export const ALLOWED_URLS: Record<string, string> = {
    settings: "/admin/settings",
    "add-field": "/add-field",
    "create-field": "/create-field",
    dashboard: "/dashboard",
    "order-managment": "/admin/order-managment",
    branches: "/admin/branches",
    warehouse: "/warehouse",
    "inventory-managment": "/admin/inventory-managment",
    sales: "/admin/sales",
    accounting: "/admin/accounting",
    field: "/field",
    support: "/admin/support",
    notification: "/admin/notification",
    purchase: "/admin/purchase",
    categories: "/admin/categories",
    customers: "/admin/customers",
    "content-managment": "/admin/content-managment",
    "user-management": "/admin/user-management",
    events: "/admin/events",
};

export const PUBLIC_ROUTES = {
    login: "/login",
    otp: "/otp",
    allProducts: "/plp",
    plp: "/plp",
    landing: "/landing",
    terms: "/terms&conditions",

}


export const ADMIN_PANEL_ROUTES = {
    users: "/users",
    userDetails: "/users/:id",
    groups: "user-management/groups",
    groupDetails: "user-management/groups/:id",
}