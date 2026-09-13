"use client";

import { formatFaDate } from "@/src/shared/libs/formatter";
import IconButton from "@/src/shared/components/ui/IconButton";
import { useTable } from "@/src/shared/context/TableProvider";
import { Pill, PillVariants } from "@/src/shared/components/ui/Pill";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import { cn } from "@shared/libs/utils";
import { VariantProps } from "class-variance-authority";

export type PaymentNoticeFilterTab = "all" | "draft";

export type PaymentNoticeType = "cheque" | "transfer" | "cash";

export type PaymentNoticeStatus = "pendingApproval" | "approved" | "draft";

export type PaymentNoticeRowData = {
    id: string;
    date: string;
    counterparty: string;
    type: PaymentNoticeType;
    amount: string;
    status: PaymentNoticeStatus;
    filterTab: PaymentNoticeFilterTab;
};

const PAYMENT_TYPE_LABEL: Record<PaymentNoticeType, string> = {
    cheque: "چک",
    transfer: "حواله",
    cash: "نقدی",
};

const STATUS_CONFIG: Record<
    PaymentNoticeStatus,
    { text: string; variant: VariantProps<typeof PillVariants>["variant"] }
> = {
    pendingApproval: { text: "در انتظار تایید", variant: "info" },
    approved: { text: "تایید شده", variant: "success" },
    draft: { text: "پیش‌نویس", variant: "tonal" },
};

export type TableRowProps = {
    data: PaymentNoticeRowData;
};

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable();
    const { id, date, counterparty, type, amount, status } = data;
    const statusConfig = STATUS_CONFIG[status];

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && <TableCell>{id}</TableCell>}
                {TableColoumn[1]?.isChecked && <TableCell>{formatFaDate(date)}</TableCell>}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{counterparty}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>{PAYMENT_TYPE_LABEL[type]}</TableCell>
                )}
                {TableColoumn[4]?.isChecked && <TableCell>{amount}</TableCell>}
                {TableColoumn[5]?.isChecked && (
                    <TableCell>
                        <Pill
                            className={cn("gap-1.5 border-0")}
                            variant={statusConfig.variant}
                            text={statusConfig.text}
                            hasDot
                        />
                    </TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <IconButton
                            icon="edit400Broken"
                            iconClassName="size-6!"
                        />
                    </TableCell>
                )}
                {TableColoumn[7]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <IconButton
                            icon="chevronLeft400Linear"
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
