"use client";

import { formatFaDate } from "@/src/shared/libs/formatter";
import IconButton from "@/src/shared/components/ui/IconButton";
import { useTable } from "@/src/shared/context/TableProvider";
import { Avatar, AvatarFallback } from "@/src/shared/components/ui/Avatar";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import { cn } from "@shared/libs/utils";

export type ReturnSalesStatus = "approved" | "rejected" | "draft";

export type ReturnSalesRowData = {
    id: string;
    date: string;
    referenceInvoice: string;
    customerName: string;
    itemsSummary: string;
    totalAmount?: string;
    status: ReturnSalesStatus;
};

const STATUS_CONFIG: Record<
    ReturnSalesStatus,
    {
        text: string;
        dotClassName: string;
        containerClassName: string;
        textClassName: string;
    }
> = {
    approved: {
        text: "تاییدشده",
        dotClassName: "bg-success",
        containerClassName: "bg-success-container",
        textClassName: "text-on-success-container",
    },
    rejected: {
        text: "رد شد",
        dotClassName: "bg-error",
        containerClassName: "bg-error-container",
        textClassName: "text-on-error-container",
    },
    draft: {
        text: "پیش‌نویس",
        dotClassName: "bg-outline",
        containerClassName: "bg-surface-container-highest",
        textClassName: "text-on-surface-variant",
    },
};

export type TableRowProps = {
    data: ReturnSalesRowData;
};

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable();
    const {
        id,
        date,
        referenceInvoice,
        customerName,
        itemsSummary,
        totalAmount,
        status,
    } = data;
    const statusConfig = STATUS_CONFIG[status];

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && <TableCell>{id}</TableCell>}
                {TableColoumn[1]?.isChecked && <TableCell>{formatFaDate(date)}</TableCell>}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{referenceInvoice}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
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
                {TableColoumn[4]?.isChecked && (
                    <TableCell>{itemsSummary}</TableCell>
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
                        <IconButton
                            icon="moreVertical300Linear"
                            iconClassName="rotate-90"
                        />
                    </TableCell>
                )}
                {TableColoumn[8]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <IconButton icon="chevronLeft300Linear" />
                    </TableCell>
                )}
            </UiTableRow>
            <div className="py-1" />
        </>
    );
};

export default TableRow;
