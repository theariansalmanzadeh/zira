"use client";

import { cn } from "@shared/libs/utils";
import { useModalStore } from "@/src/shared/store/modal-store";
import { ModalTypes } from "../../../types";
import type { InventorySettingTab } from "../types";
import { SIDEBAR_ITEMS } from "../constants";

type SidebarProps = {
    activeTab: InventorySettingTab;
    onTabChange: (tab: InventorySettingTab) => void;
};

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
    const openModal = useModalStore((state) => state.openModal);

    const handleDeleteInventory = () => {
        openModal(ModalTypes.DELETE_PERMISSION);
    };

    return (
        <aside className="flex w-[180px] shrink-0 flex-col gap-1">
            {SIDEBAR_ITEMS.map((item) => (
                <button
                    key={item.id}
                    type="button"
                    onClick={() => onTabChange(item.id)}
                    className={cn(
                        "rounded-card-md px-3 py-2 text-right text-label-lg transition-colors",
                        activeTab === item.id
                            ? "bg-primary-container text-primary font-medium"
                            : "text-on-surface-variant hover:bg-surface-container-high"
                    )}
                >
                    {item.label}
                </button>
            ))}

            <hr className="my-2 border-0 border-t border-dashed border-outline-variant" />

            <button
                type="button"
                onClick={handleDeleteInventory}
                className="rounded-card-md px-3 py-2 text-right text-label-lg text-primary hover:bg-error-container/40"
            >
                حذف انبار
            </button>
        </aside>
    );
};

export default Sidebar;
