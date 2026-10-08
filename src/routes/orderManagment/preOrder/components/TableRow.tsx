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

export type PreOrderStatus =
    | "confirmed"
    | "pendingPayment"
    | "cancelled"
    | "rejected";

export type PreOrderFilterTab =
    | "all"
    | "confirmed"
    | "pendingPayment"
    | "cancelled"
    | "rejected";

export type SettlementType = "cash" | "credit" | "cheque";

export type PreOrderRowData = {
    id: string;
    customerName: string;
    customerTier: string;
    registeredAt: string;
    productName: string;
    productCode: string;
    quantity: number;
    settlementType: SettlementType;
    status: PreOrderStatus;
    filterTab: PreOrderFilterTab;
};

const SETTLEMENT_TYPE_LABEL: Record<SettlementType, string> = {
    cash: "نقدی",
    credit: "اعتباری",
    cheque: "چکی",
};

const STATUS_CONFIG: Record<
    PreOrderStatus,
    { text: string; variant: VariantProps<typeof PillVariants>["variant"] }
> = {
    confirmed: { text: "تایید شده", variant: "success" },
    pendingPayment: { text: "در انتظار پرداخت", variant: "warning" },
    cancelled: { text: "لغو شده", variant: "tonal" },
    rejected: { text: "رد شده", variant: "error" },
};

export type TableRowProps = {
    data: PreOrderRowData;
};

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable();
    const {
        id,
        customerName,
        customerTier,
        registeredAt,
        productName,
        productCode,
        quantity,
        settlementType,
        status,
    } = data;
    const statusConfig = STATUS_CONFIG[status];

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && <TableCell>{id}</TableCell>}
                {TableColoumn[1]?.isChecked && (
                    <TableCell className="align-middle">
                        <div className="flex flex-col items-center justify-center gap-0.5">
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
                    <TableCell className="align-middle">
                        <div className="flex flex-col items-center justify-center gap-0.5">
                            <span className="text-label-lg text-on-surface">
                                {productName}
                            </span>
                            <span className="text-label-sm text-outline">
                                {productCode}
                            </span>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>{quantity}</TableCell>
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
                        />
                    </TableCell>
                )}
                {TableColoumn[7]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <Link
                            href={`/admin/order-managment/pre-order-details/${id}`}
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
