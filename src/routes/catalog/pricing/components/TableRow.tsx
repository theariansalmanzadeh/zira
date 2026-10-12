"use client";

import Link from "next/link";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import { useTable } from "@/src/shared/context/TableProvider";
import IconButton from "@/src/shared/components/ui/IconButton";
import { cn } from "@shared/libs/utils";
import { formatFaDate } from "@/src/shared/libs/formatter";
import { getAdjustmentPercentDisplay } from "../utils";

export interface PricingRowProps {
    data: {
        id?: string;
        contractTitle: string;
        contractId: string;
        date: string;
        scope: string;
        percent?: string | number | null;
        status?: "published" | "draft";
    };
}

const TableRow = ({
    data: { id, contractTitle, contractId, date, scope, percent },
}: PricingRowProps) => {
    const { TableColoumn } = useTable();
    const percentDisplay =
        percent == null || percent === ''
            ? null
            : getAdjustmentPercentDisplay(percent);

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant! [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && (
                    <TableCell>{contractTitle}</TableCell>
                )}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>{contractId}</TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{formatFaDate(date)}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && <TableCell>{scope}</TableCell>}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>
                        <span
                            className={cn(
                                "font-semibold",
                                percentDisplay?.className
                            )}
                        >
                            {percentDisplay?.text ?? '—'}
                        </span>
                    </TableCell>
                )}

                <TableCell className="w-[1%] whitespace-nowrap">
                    <Link href={`/admin/catalog/pricing/${id ?? contractId}`}>
                        <IconButton
                            icon="edit400Linear"
                            iconClassName="size-5! text-outline"
                        />
                    </Link>
                </TableCell>
            </UiTableRow>
            <div className="py-1" />
        </>
    );
};

export default TableRow;
