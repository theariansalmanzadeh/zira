"use client";

import { formatFaDate } from "@/src/shared/libs/formatter";
import IconButton from "@/src/shared/components/ui/IconButton";
import { useTable } from "@/src/shared/context/TableProvider";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";

export type EscrowPurchaseRowData = {
    referenceId: string;
    registrationDate: string;
    supplierName: string;
    itemsCount: number;
    quantity: number;
    warehouseName: string;
    returnDate: string;
};

export type EscrowPurchaseTableRowProps = {
    data: EscrowPurchaseRowData;
};

const TableRow = ({ data }: EscrowPurchaseTableRowProps) => {
    const { TableColoumn } = useTable();
    const {
        referenceId,
        registrationDate,
        supplierName,
        itemsCount,
        quantity,
        warehouseName,
        returnDate,
    } = data;

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && (
                    <TableCell>{referenceId}</TableCell>
                )}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>{formatFaDate(registrationDate)}</TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{supplierName}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>
                        {itemsCount} قلم / {quantity} عدد
                    </TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>{warehouseName}</TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell>{formatFaDate(returnDate)}</TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <IconButton icon="more" iconClassName="rotate-90" />
                    </TableCell>
                )}
                {TableColoumn[7]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <IconButton icon="chevron" />
                    </TableCell>
                )}
            </UiTableRow>
            <div className="py-1" />
        </>
    );
};

export default TableRow;
