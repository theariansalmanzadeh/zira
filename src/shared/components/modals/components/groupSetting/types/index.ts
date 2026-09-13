export type GroupSettingTab = "details" | "users";

export type GroupUserStatus = "active" | "inactive";

export type GroupUser = {
    userName: string;
    userId: string;
    status: GroupUserStatus;
    avatarUrl?: string;
};

export type GroupDetails = {
    name: string;
    id: string;
    role: string;
    managerName: string;
    managerAvatarUrl?: string;
    status: string;
    description: string;
};

export type GroupSettingModalData = {
    details?: GroupDetails;
    users?: GroupUser[];
    defaultTab?: GroupSettingTab;
    onEdit?: () => void;
    onAddUser?: () => void;
    onDeleteGroup?: () => void;
};
