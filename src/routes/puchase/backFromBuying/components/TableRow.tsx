"use client";

import { formatFaDate } from "@/src/shared/libs/formatter";
import IconButton from "@/src/shared/components/ui/IconButton";
import { useTable } from "@/src/shared/context/TableProvider";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import { cn } from "@shared/libs/utils";

export type BackFromBuyingStatus = "approved" | "pending" | "rejected";

export type BackFromBuyingRowData = {
    referenceId: string;
    date: string;
    invoiceReferenceId: string;
    supplierName: string;
    itemsCount: number;
    quantity: number;
    totalAmount?: string;
    status: BackFromBuyingStatus;
};

const STATUS_CONFIG: Record<
    BackFromBuyingStatus,
    {
        text: string;
        dotClassName: string;
        containerClassName: string;
        textClassName: string;
    }
> = {
    approved: {
        text: "تایید شده",
        dotClassName: "bg-success",
        containerClassName: "bg-success-container",
        textClassName: "text-on-success-container",
    },
    pending: {
        text: "در انتظار",
        dotClassName: "bg-warning",
        containerClassName: "bg-warning-container",
        textClassName: "text-on-warning-container",
    },
    rejected: {
        text: "رد شده",
        dotClassName: "bg-error",
        containerClassName: "bg-error-container",
        textClassName: "text-on-error-container",
    },
};

export type BackFromBuyingTableRowProps = {
    data: BackFromBuyingRowData;
};

const TableRow = ({ data }: BackFromBuyingTableRowProps) => {
    const { TableColoumn } = useTable();
    const {
        referenceId,
        date,
        invoiceReferenceId,
        supplierName,
        itemsCount,
        quantity,
        totalAmount,
        status,
    } = data;
    const statusConfig = STATUS_CONFIG[status];

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && (
                    <TableCell>{referenceId}</TableCell>
                )}
                {TableColoumn[1]?.isChecked && <TableCell>{formatFaDate(date)}</TableCell>}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{invoiceReferenceId}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>{supplierName}</TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>
                        {itemsCount} قلم / {quantity} عدد
                    </TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell>{totalAmount ?? "-"}</TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell>
                        <div
                            className={cn(
                                "inline-flex items-center gap-1.5 rounded-full px-2 py-1",
                                statusConfig.containerClassName,
                            )}
                        >
                            <span
                                className={cn(
                                    "size-2 shrink-0 rounded-full",
                                    statusConfig.dotClassName,
                                )}
                            />
                            <span
                                className={cn(
                                    "text-label-md",
                                    statusConfig.textClassName,
                                )}
                            >
                                {statusConfig.text}
                            </span>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[7]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <IconButton icon="more" iconClassName="rotate-90" />
                    </TableCell>
                )}
                {TableColoumn[8]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <IconButton icon="chevron" />
                    </TableCell>
                )}
            </UiTableRow>
            <div className="py-1" />
        </>
    );
};

export default TableRow;
