"use client";

import { formatFaDateTime } from "@/src/shared/libs/formatter";
import { Icon } from "@/src/shared/components/Icons/Icon";
import { useTable } from "@/src/shared/context/TableProvider";
import IconButton from "@/src/shared/components/ui/IconButton";
import { Pill, PillVariants } from "@/src/shared/components/ui/Pill";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import { IconLabel } from "@/src/shared/types/icon";
import { VariantProps } from "class-variance-authority";

export type WasteStatus = "under-review" | "approved" | "rejected";
export type WasteFilterTab = "all" | "under-review" | "approved" | "rejected";

export type WasteRowData = {
    id: string;
    productTitle: string;
    quantity: number;
    reason: string;
    registeredAt: string;
    totalAmount: string;
    status: WasteStatus;
    filterTab: Exclude<WasteFilterTab, "all">;
};

const STATUS_CONFIG: Record<
    WasteStatus,
    {
        text: string;
        variant: VariantProps<typeof PillVariants>["variant"];
        icon: IconLabel;
    }
> = {
    "under-review": {
        text: "در حال بررسی",
        variant: "info",
        icon: "visibility400Linear",
    },
    approved: {
        text: "تایید شده",
        variant: "success",
        icon: "visibility400Linear",
    },
    rejected: {
        text: "رد شده",
        variant: "error",
        icon: "visibility400Linear",
    },
};

export type TableRowProps = {
    data: WasteRowData;
};

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable();
    const {
        id,
        productTitle,
        quantity,
        reason,
        registeredAt,
        totalAmount,
        status,
    } = data;
    const statusConfig = STATUS_CONFIG[status];

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && <TableCell>{id}</TableCell>}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>
                        <div className="flex flex-row-reverse items-center justify-end gap-2">
                            <span>{productTitle}</span>
                            <div className="size-8 shrink-0 rounded-card-sm bg-surface-container-highest" />
                        </div>
                    </TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{quantity}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && <TableCell>{reason}</TableCell>}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>{formatFaDateTime(registeredAt)}</TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell>
                        <div className="flex items-center gap-1">
                            <span>{totalAmount}</span>
                            <span>تومان</span>
                            <Icon label="currency" className="size-5!" />
                        </div>
                    </TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell>
                        <Pill
                            variant={statusConfig.variant}
                            text={statusConfig.text}
                            icon={statusConfig.icon}
                            className="border-0"
                        />
                    </TableCell>
                )}
                {TableColoumn[7]?.isChecked && (
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
