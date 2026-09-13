"use client";

import { formatFaDate } from "@/src/shared/libs/formatter";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import { useTable } from "@/src/shared/context/TableProvider";

export type LedgerReportRowData = {
    id: string;
    documentNumber: string;
    date: string;
    description: string;
    debit: string;
    credit: string;
    balance: string;
};

export type TableRowProps = {
    data: LedgerReportRowData;
};

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable();
    const { documentNumber, date, description, debit, credit, balance } = data;

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>td]:py-5 [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && (
                    <TableCell>{documentNumber}</TableCell>
                )}
                {TableColoumn[1]?.isChecked && <TableCell>{formatFaDate(date)}</TableCell>}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{description}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && <TableCell>{debit}</TableCell>}
                {TableColoumn[4]?.isChecked && <TableCell>{credit}</TableCell>}
                {TableColoumn[5]?.isChecked && <TableCell>{balance}</TableCell>}
            </UiTableRow>
            <div className="py-1" />
        </>
    );
};

export default TableRow;
