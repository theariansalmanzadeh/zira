"use client";

import IconButton from "@/src/shared/components/ui/IconButton";
import { Avatar, AvatarFallback } from "@/src/shared/components/ui/Avatar";
import { Pill, PillVariants } from "@/src/shared/components/ui/Pill";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import { useTable } from "@/src/shared/context/TableProvider";
import type { VariantProps } from "class-variance-authority";

export type InventoryEmployeeStatus = "active" | "inactive";

export type InventoryEmployeeRowData = {
    id: string;
    name: string;
    code: string;
    role: string;
    permissions: string;
    status: InventoryEmployeeStatus;
};

const STATUS_CONFIG: Record<
    InventoryEmployeeStatus,
    { text: string; variant: VariantProps<typeof PillVariants>["variant"] }
> = {
    active: { text: "فعال", variant: "success" },
    inactive: { text: "غیرفعال", variant: "tonal" },
};

export type TableRowProps = {
    data: InventoryEmployeeRowData;
};

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable();
    const { name, code, role, permissions, status } = data;
    const statusConfig = STATUS_CONFIG[status];

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && (
                    <TableCell>
                        <div className="flex flex-row items-center gap-2">
                            <Avatar>
                                <AvatarFallback className="bg-surface-container-highest text-label-sm text-on-surface-variant">
                                    {name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <span>{name}</span>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[1]?.isChecked && <TableCell>{code}</TableCell>}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{role || "-"}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>{permissions || "-"}</TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>
                        <Pill
                            variant={statusConfig.variant}
                            text={statusConfig.text}
                            className="border-0"
                        />
                    </TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <div className="flex items-center justify-end">
                            <IconButton
                                icon="moreVertical300Linear"
                                iconClassName="rotate-90 size-6!"
                            />
                            <IconButton
                                icon="chevronLeft300Linear"
                                iconClassName="size-6!"
                            />
                        </div>
                    </TableCell>
                )}
            </UiTableRow>
            <div className="py-1" />
        </>
    );
};

export default TableRow;
