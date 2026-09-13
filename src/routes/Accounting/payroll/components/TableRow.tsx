"use client";

import IconButton from "@/src/shared/components/ui/IconButton";
import { useTable } from "@/src/shared/context/TableProvider";
import { Pill, PillVariants } from "@/src/shared/components/ui/Pill";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import { cn } from "@shared/libs/utils";
import { VariantProps } from "class-variance-authority";

export type PayrollFilterTab = "all" | "finalized" | "calculating" | "draft";

export type PayrollStatus = "finalized" | "calculating" | "draft";

export type PayrollRowData = {
    id: string;
    period: string;
    employeeCount: string;
    netPay: string;
    insuranceTax: string;
    documentId: string;
    status: PayrollStatus;
    filterTab: Exclude<PayrollFilterTab, "all">;
};

const STATUS_CONFIG: Record<
    PayrollStatus,
    { text: string; variant: VariantProps<typeof PillVariants>["variant"] }
> = {
    calculating: { text: "در حال محاسبه", variant: "info" },
    finalized: { text: "قطعی", variant: "success" },
    draft: { text: "پیش‌نویس", variant: "tonal" },
};

export type TableRowProps = {
    data: PayrollRowData;
};

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable();
    const { period, employeeCount, netPay, insuranceTax, documentId, status } =
        data;
    const statusConfig = STATUS_CONFIG[status];

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && <TableCell>{period}</TableCell>}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>{employeeCount}</TableCell>
                )}
                {TableColoumn[2]?.isChecked && <TableCell>{netPay}</TableCell>}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>{insuranceTax}</TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>{documentId}</TableCell>
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
