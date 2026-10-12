"use client";

import IconButton from "@/src/shared/components/ui/IconButton";
import { useTable } from "@/src/shared/context/TableProvider";
import { Pill } from "@/src/shared/components/ui/Pill";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import { formatFaDate } from "@/src/shared/libs/formatter";

export interface DiscountRowProps {
    data: {
        title: string;
        contractId: string;
        date: string;
        scope: string;
        discountPercent: string;
        startDate: string;
        endDate: string;
        remainingDays: string;
        status?: "valid" | "invalid" | "draft";
    };
}

const TableRow = ({
    data: {
        title,
        contractId,
        date,
        scope,
        discountPercent,
        status,
        startDate,
        endDate,
        remainingDays,
    },
}: DiscountRowProps) => {
    const { TableColoumn } = useTable();
    return (
        <>
            <UiTableRow className="*:text-on-surface-variant! *:text-label-lg *:font-normal">
                {TableColoumn[0]?.isChecked && <TableCell>{title}</TableCell>}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>{contractId}</TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{formatFaDate(date)}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && <TableCell>{scope}</TableCell>}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>{discountPercent}</TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell>{formatFaDate(startDate)}</TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell>{formatFaDate(endDate)}</TableCell>
                )}
                {TableColoumn[7]?.isChecked && (
                    <TableCell>{remainingDays}</TableCell>
                )}
                {TableColoumn[8]?.isChecked && (
                    <TableCell>
                        <Pill
                            variant={
                                status === "valid"
                                    ? "success"
                                    : status === "invalid"
                                      ? "error"
                                      : "warning"
                            }
                            text={status || ""}
                            hasDot
                        />
                    </TableCell>
                )}
                {TableColoumn[9]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <IconButton icon="chevronLeft400Linear" />
                    </TableCell>
                )}
            </UiTableRow>
            <div className="py-1" />
        </>
    );
};

export default TableRow;
