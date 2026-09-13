"use client";

import { formatFaDateTime } from "@/src/shared/libs/formatter";
import IconButton from "@/src/shared/components/ui/IconButton";
import { useTable } from "@/src/shared/context/TableProvider";
import { Avatar, AvatarFallback } from "@/src/shared/components/ui/Avatar";
import { Pill, PillVariants } from "@/src/shared/components/ui/Pill";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import { VariantProps } from "class-variance-authority";

export type StockReturnStatus =
    | "returned-to-stock"
    | "awaiting-receipt"
    | "quality-check";

export type StockReturnFilterTab = "all" | "under-review" | "awaiting-receipt";

export type StockReturnRowData = {
    id: string;
    customerName: string;
    consignmentId: string;
    itemCount: string;
    status: StockReturnStatus;
    registeredAt: string;
    filterTab?: Exclude<StockReturnFilterTab, "all">;
};

const STATUS_CONFIG: Record<
    StockReturnStatus,
    { text: string; variant: VariantProps<typeof PillVariants>["variant"] }
> = {
    "returned-to-stock": { text: "بازگشت به موجودی", variant: "success" },
    "awaiting-receipt": { text: "در انتظار دریافت", variant: "warning" },
    "quality-check": { text: "در حال بررسی کیفیت", variant: "info" },
};

export type TableRowProps = {
    data: StockReturnRowData;
};

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable();
    const { id, customerName, consignmentId, itemCount, status, registeredAt } =
        data;
    const statusConfig = STATUS_CONFIG[status];

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && <TableCell>{id}</TableCell>}
                {TableColoumn[1]?.isChecked && (
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
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{consignmentId}</TableCell>
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
