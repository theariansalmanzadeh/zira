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

export type PrePurchaseStatus = "approved" | "pending" | "rejected";

export type PrePurchaseRowData = {
    referenceId: string;
    date: string;
    customerName: string;
    title: string;
    subtitle: string;
    status: PrePurchaseStatus;
};

const STATUS_CONFIG: Record<
    PrePurchaseStatus,
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

export type PrePurchaseTableRowProps = {
    data: PrePurchaseRowData;
};

const TableRow = ({ data }: PrePurchaseTableRowProps) => {
    const { TableColoumn } = useTable();
    const { referenceId, date, customerName, title, subtitle, status } = data;
    const statusConfig = STATUS_CONFIG[status];

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && (
                    <TableCell>{referenceId}</TableCell>
                )}
                {TableColoumn[1]?.isChecked && <TableCell>{formatFaDate(date)}</TableCell>}
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
                    <TableCell>
                        <div className="flex flex-col gap-0.5">
                            <span>{title}</span>
                            <span className="text-label-sm text-outline">
                                {subtitle}
                            </span>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[4]?.isChecked && <TableCell>-</TableCell>}
                {TableColoumn[5]?.isChecked && <TableCell>-</TableCell>}
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
