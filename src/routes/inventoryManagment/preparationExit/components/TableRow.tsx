"use client";

import IconButton from "@/src/shared/components/ui/IconButton";
import { useTable } from "@/src/shared/context/TableProvider";
import { Avatar, AvatarFallback } from "@/src/shared/components/ui/Avatar";
import { Pill, PillVariants } from "@/src/shared/components/ui/Pill";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import { VariantProps } from "class-variance-authority";

export type PreparationExitStatus = "preparing" | "shipped";
export type PreparationExitFilterTab =
    | "all"
    | "pending"
    | "unassigned"
    | "confirmed";

export type PreparationExitRowData = {
    id: string;
    orderId: string;
    customerName: string;
    itemCount: string;
    status: PreparationExitStatus;
    filterTab: Exclude<PreparationExitFilterTab, "all">;
};

const STATUS_CONFIG: Record<
    PreparationExitStatus,
    { text: string; variant: VariantProps<typeof PillVariants>["variant"] }
> = {
    preparing: { text: "در حال آماده‌سازی", variant: "success" },
    shipped: { text: "ارسال شد", variant: "tonal" },
};

export type TableRowProps = {
    data: PreparationExitRowData;
};

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable();
    const { id, orderId, customerName, itemCount, status } = data;
    const statusConfig = STATUS_CONFIG[status];

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && <TableCell>{id}</TableCell>}
                {TableColoumn[1]?.isChecked && <TableCell>{orderId}</TableCell>}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>
                        <div className="flex flex-row-reverse items-center justify-end gap-2">
                            <span>{customerName}</span>
                            <Avatar size="sm">
                                <AvatarFallback className="bg-surface-container-highest text-label-sm text-on-surface-variant">
                                    {customerName.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>{itemCount}</TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>
                        <Pill
                            variant={statusConfig.variant}
                            text={statusConfig.text}
                            hasDot
                            className="border-0"
                        />
                    </TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <IconButton
                            icon="chevronLeft300Linear"
                            iconClassName="size-6!"
                        />
                    </TableCell>
                )}
            </UiTableRow>
            <div className="py-1" />
        </>
    );
};

export default TableRow;
