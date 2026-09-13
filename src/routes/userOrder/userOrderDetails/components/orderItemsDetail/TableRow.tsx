"use client";

import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import { useTable } from "@/src/shared/context/TableProvider";

export type OrderItemRowData = {
    id: string;
    productName: string;
    productCode: string;
    brand?: string;
    quantity?: string | number;
    color?: string;
    size?: string;
    totalPrice?: string;
};

export type TableRowProps = {
    data: OrderItemRowData;
};

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable();
    const {
        productName,
        productCode,
        brand,
        quantity,
        color,
        size,
        totalPrice,
    } = data;

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal bg-surface-container-lowest rounded-card-md">
                {TableColoumn[0]?.isChecked && (
                    <TableCell>
                        <div className="flex flex-row-reverse items-center justify-end gap-3">
                            <span className="text-label-lg text-on-surface">
                                {productName}
                            </span>
                            <div className="size-10 shrink-0 rounded-container-md bg-surface-container-highest" />
                        </div>
                    </TableCell>
                )}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>{productCode}</TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{brand ?? "-"}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>{quantity ?? "-"}</TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>{color ?? "-"}</TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell>{size ?? "-"}</TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell>{totalPrice ?? "- تومان"}</TableCell>
                )}
            </UiTableRow>
            <div className="py-1" />
        </>
    );
};

export default TableRow;
