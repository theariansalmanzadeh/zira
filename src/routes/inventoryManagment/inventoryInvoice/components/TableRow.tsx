"use client";

import { formatFaDateTime } from "@/src/shared/libs/formatter";
import IconButton from "@/src/shared/components/ui/IconButton";
import { useTable } from "@/src/shared/context/TableProvider";
import { Pill, PillVariants } from "@/src/shared/components/ui/Pill";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import { VariantProps } from "class-variance-authority";

export type InventoryInvoiceStatus = "final-approval" | "pending" | "draft";
export type InventoryInvoiceFilterTab =
    | "all"
    | "pending"
    | "unassigned"
    | "confirmed";

export type InventoryInvoiceRowData = {
    id: string;
    origin: string;
    destination: string;
    itemCount: string;
    status: InventoryInvoiceStatus;
    registeredAt: string;
    filterTab: Exclude<InventoryInvoiceFilterTab, "all">;
};

const STATUS_CONFIG: Record<
    InventoryInvoiceStatus,
    { text: string; variant: VariantProps<typeof PillVariants>["variant"] }
> = {
    "final-approval": { text: "تایید نهایی", variant: "success" },
    pending: { text: "در انتظار تایید", variant: "warning" },
    draft: { text: "پیش‌نویس", variant: "tonal" },
};

export type TableRowProps = {
    data: InventoryInvoiceRowData;
};

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable();
    const { id, origin, destination, itemCount, status, registeredAt } = data;
    const statusConfig = STATUS_CONFIG[status];

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && <TableCell>{id}</TableCell>}
                {TableColoumn[1]?.isChecked && <TableCell>{origin}</TableCell>}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{destination}</TableCell>
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
                    <TableCell>{formatFaDateTime(registeredAt)}</TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
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
