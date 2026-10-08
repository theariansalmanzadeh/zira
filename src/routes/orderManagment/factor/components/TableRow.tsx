"use client";

import { Icon } from "@/src/shared/components/Icons/Icon";
import { useTable } from "@/src/shared/context/TableProvider";
import IconButton from "@/src/shared/components/ui/IconButton";
import { Avatar, AvatarFallback } from "@/src/shared/components/ui/Avatar";
import { Button } from "@/src/shared/components/ui/button";
import { Pill, PillVariants } from "@/src/shared/components/ui/Pill";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import { formatFaNumber, formatFaDate, formatPrice } from "@/src/shared/libs/formatter";
import Link from "next/link";
import type { VariantProps } from "class-variance-authority";

export type FactorFilterTab = "all" | "cash" | "cheque" | "credit";

export type SettlementType = "cash" | "credit" | "cheque";

export type FactorRowData = {
    invoiceId: string;
    orderId: string;
    customerName: string;
    customerInitial: string;
    customerSwatch: string;
    customerCode: string;
    itemsCount: number;
    issuedAt: string;
    amount: number;
    settlementType: SettlementType;
    settlementDate: string;
    filterTab: Exclude<FactorFilterTab, "all">;
};

type PillVariant = NonNullable<VariantProps<typeof PillVariants>["variant"]>;

const SETTLEMENT_CONFIG: Record<
    SettlementType,
    { label: string; variant: PillVariant }
> = {
    cash: {
        label: "نقدی",
        variant: "success",
    },
    cheque: {
        label: "چکی",
        variant: "tonal",
    },
    credit: {
        label: "اعتباری",
        variant: "info",
    },
};

export type TableRowProps = {
    data: FactorRowData;
};

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable();
    const {
        invoiceId,
        orderId,
        customerName,
        customerCode,
        itemsCount,
        issuedAt,
        amount,
        settlementType,
        settlementDate,
    } = data;

    const settlement = SETTLEMENT_CONFIG[settlementType];

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && (
                    <TableCell>{invoiceId}</TableCell>
                )}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>
                        <div className="flex flex-col items-start gap-0.5">
                            <div className="flex flex-row-reverse items-center justify-end gap-2">
                                <span>{customerName}</span>
                                <Avatar size="sm">
                                    <AvatarFallback className="bg-surface-container-highest text-label-sm text-on-surface-variant">
                                        {customerName.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            {/* <span className='text-label-sm text-outline' dir='ltr'>
                            {orderId}
                        </span> */}
                        </div>
                    </TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>
                        <span dir="ltr">{customerCode}</span>
                    </TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>
                        <Button
                            type="button"
                            variant="ghost"
                            className="h-auto gap-1.5 rounded-full bg-info-container px-2 py-1 text-label-md text-info hover:bg-info-container"
                        >
                            <span dir="ltr">
                                {formatFaNumber(itemsCount)} قلم
                            </span>
                            <Icon label="menu300Linear" className="size-3.5!" />
                        </Button>
                    </TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>
                        <span dir="ltr">{formatFaDate(issuedAt)}</span>
                    </TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell>{formatPrice(amount)}</TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell>
                        <Pill
                            text={settlement.label}
                            variant={settlement.variant}
                            hasDot
                        />
                    </TableCell>
                )}
                {TableColoumn[7]?.isChecked && (
                    <TableCell>
                        <span dir="ltr">{formatFaDate(settlementDate)}</span>
                    </TableCell>
                )}
                {TableColoumn[8]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <IconButton
                            icon="print300Linear"
                            onClick={() => window.print()}
                        />
                    </TableCell>
                )}
                {TableColoumn[9]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <Link
                            href={`/admin/order-managment/order-details/${orderId}`}
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
