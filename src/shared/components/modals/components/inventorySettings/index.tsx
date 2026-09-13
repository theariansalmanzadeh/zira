"use client";

import { useState } from "react";
import type { BaseModalProps } from "../../types";
import { ModalTypes } from "../../types";
import { useModalStore } from "@shared/store/modal-store";
import {
    DEFAULT_INVENTORY_DETAILS,
    DEFAULT_INVENTORY_EMPLOYEES,
} from "./constants";
import Sidebar from "./components/Sidebar";
import DetailsTab from "./components/DetailsTab";
import MapTab from "./components/MapTab";
import EmployeesTab from "./components/EmployeesTab";
import type {
    InventorySettingModalData,
    InventorySettingTab,
} from "./types";

export type {
    InventorySettingModalData,
    InventoryDetails,
    InventoryEmployee,
} from "./types";

export function InventorySettings({ data }: BaseModalProps) {
    const modalData = data as InventorySettingModalData | null | undefined;
    const openModal = useModalStore((state) => state.openModal);

    const [activeTab, setActiveTab] = useState<InventorySettingTab>(
        modalData?.defaultTab ?? "details"
    );

    const details = modalData?.details ?? DEFAULT_INVENTORY_DETAILS;
    const employees = modalData?.employees ?? DEFAULT_INVENTORY_EMPLOYEES;

    return (
        <div
            className="flex w-full min-w-[720px] flex-col gap-4 rounded-2xl bg-surface-container-lowest px-6 py-4.5"
            dir="rtl"
        >
            <div className="flex min-h-[420px] gap-4">
                <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

                {activeTab === "details" && (
                    <DetailsTab details={details} onEdit={modalData?.onEdit} />
                )}
                {activeTab === "map" && <MapTab />}
                {activeTab === "employees" && (
                    <EmployeesTab
                        employees={employees}
                        onAddEmployee={
                            modalData?.onAddEmployee ??
                            (() =>
                                openModal(ModalTypes.SELECT_USER_AND_GROUPS, {
                                    hasOnlyUsers: true,
                                }))
                        }
                    />
                )}
            </div>
        </div>
    );
}

export default InventorySettings;
