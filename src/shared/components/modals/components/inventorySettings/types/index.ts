export type InventorySettingTab = "details" | "map" | "employees";

export type InventoryEmployeeStatus = "active" | "inactive";

export type InventoryEmployee = {
    userName: string;
    userId: string;
    status: InventoryEmployeeStatus;
    avatarUrl?: string;
};

export type InventoryDetails = {
    name: string;
    id: string;
    managerName: string;
    managerAvatarUrl?: string;
    startDate: string;
    status: string;
    area: string;
    insuranceStatus: string;
    description: string;
    address: string;
    postalCode: string;
    landlinePhone: string;
};

export type InventorySettingModalData = {
    details?: InventoryDetails;
    employees?: InventoryEmployee[];
    defaultTab?: InventorySettingTab;
    onEdit?: () => void;
    onAddEmployee?: () => void;
    onDeleteInventory?: () => void;
};
