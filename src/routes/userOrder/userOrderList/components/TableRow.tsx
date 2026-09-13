"use client";

import { formatFaDateTime } from "@/src/shared/libs/formatter";
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

export type UserOrderStatus =
    | "preparing"
    | "completed"
    | "readyToShip"
    | "awaitingPrep"
    | "cancelled"
    | "returned";

export type UserOrderFilterTab =
    | "all"
    | "pending"
    | "completed"
    | "cancelled"
    | "returned";

export type SettlementType = "cash" | "credit" | "cheque";

export type UserOrderRowData = {
    id: string;
    registeredAt: string;
    itemsCount: number;
    totalAmount: string;
    settlementType: SettlementType;
    status: UserOrderStatus;
    filterTab: Exclude<UserOrderFilterTab, "all">;
};

const SETTLEMENT_TYPE_LABEL: Record<SettlementType, string> = {
    cash: "نقدی",
    credit: "اعتباری",
    cheque: "چکی",
};

const STATUS_CONFIG: Record<
    UserOrderStatus,
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
    data: UserOrderRowData;
};

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable();
    const {
        id,
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
                    <TableCell>{formatFaDateTime(registeredAt)}</TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{itemsCount}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>{totalAmount}</TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>
                        {SETTLEMENT_TYPE_LABEL[settlementType]}
                    </TableCell>
                )}
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
                        <IconButton icon="listAltCheck" />
                    </TableCell>
                )}
                {TableColoumn[7]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <Link href={`/orders/details/${id}`}>
                            <IconButton icon="chevronLeft400Linear" />
                        </Link>
                    </TableCell>
                )}
            </UiTableRow>
            <div className="py-1" />
        </>
    );
};

export default TableRow;
