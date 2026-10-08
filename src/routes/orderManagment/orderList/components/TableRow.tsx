"use client";

import { formatFaDateTime, formatPrice } from "@/src/shared/libs/formatter";
import IconButton from "@/src/shared/components/ui/IconButton";
import { useTable } from "@/src/shared/context/TableProvider";
import { Pill, PillVariants } from "@/src/shared/components/ui/Pill";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import { cn } from "@shared/libs/utils";
import { VariantProps } from "class-variance-authority";
import Link from "next/link";

export type OrderListStatus =
    | "preparing"
    | "completed"
    | "readyToShip"
    | "awaitingPrep"
    | "cancelled"
    | "returned";

export type OrderListFilterTab =
    | "all"
    | "pending"
    | "completed"
    | "cancelled"
    | "returned";

export type SettlementType = "cash" | "credit" | "cheque";

export type OrderListRowData = {
    id: string;
    customerName: string;
    customerTier: string;
    registeredAt: string;
    itemsCount: number;
    totalAmount: number;
    settlementType: SettlementType;
    status: OrderListStatus;
    filterTab: OrderListFilterTab;
};

const SETTLEMENT_TYPE_LABEL: Record<SettlementType, string> = {
    cash: "نقدی",
    credit: "اعتباری",
    cheque: "چکی",
};

const STATUS_CONFIG: Record<
    OrderListStatus,
    { text: string; variant: VariantProps<typeof PillVariants>["variant"] }
> = {
    preparing: { text: "در حال آماده‌سازی", variant: "success" },
    completed: { text: "تکمیل شد", variant: "tonal" },
    readyToShip: { text: "آماده ارسال", variant: "info" },
    awaitingPrep: { text: "در انتظار آماده‌سازی", variant: "warning" },
    cancelled: { text: "لغو شده", variant: "error" },
    returned: { text: "مرجوعی", variant: "outlined" },
};

export type TableRowProps = {
    data: OrderListRowData;
};

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable();
    const {
        id,
        customerName,
        customerTier,
        registeredAt,
        itemsCount,
        totalAmount,
        settlementType,
        status,
    } = data;
    const statusConfig = STATUS_CONFIG[status];

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && <TableCell>{id}</TableCell>}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>
                        <div className="flex flex-col items-start gap-0.5">
                            <span className="text-label-lg text-on-surface">
                                {customerName}
                            </span>
                            <span className="text-label-sm text-outline">
                                {customerTier}
                            </span>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{formatFaDateTime(registeredAt)}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>{itemsCount}</TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>{formatPrice(totalAmount)}</TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell>
                        {SETTLEMENT_TYPE_LABEL[settlementType]}
                    </TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell>
                        <Pill
                            className={cn("gap-1.5 border-0")}
                            variant={statusConfig.variant}
                            text={statusConfig.text}
                            hasDot
                        />
                    </TableCell>
                )}
                {TableColoumn[7]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <Link
                            href={`/admin/order-managment/order-details/${id}`}
                        >
                            <IconButton icon="chevronLeft300Linear" />
                        </Link>
                    </TableCell>
                )}
            </UiTableRow>
            <div className="py-1" />
        </>
    );
};

export default TableRow;
