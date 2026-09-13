"use client";

import { useTable } from "@/src/shared/context/TableProvider";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import type { TrialBalanceRowData } from "../types";

export type TableRowProps = {
    data: TrialBalanceRowData;
};

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable();
    const {
        code,
        title,
        debitTurnover,
        creditTurnover,
        debitBalance,
        creditBalance,
    } = data;

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && <TableCell>{code}</TableCell>}
                {TableColoumn[1]?.isChecked && <TableCell>{title}</TableCell>}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{debitTurnover}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>{creditTurnover}</TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell className="text-success">{debitBalance}</TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell className="text-primary">{creditBalance}</TableCell>
                )}
            </UiTableRow>
            <div className="py-1" />
        </>
    );
};

export default TableRow;
