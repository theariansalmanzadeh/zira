"use client";

import { formatFaDate } from "@/src/shared/libs/formatter";
import IconButton from "@/src/shared/components/ui/IconButton";
import { useTable } from "@/src/shared/context/TableProvider";
import { Avatar, AvatarFallback } from "@/src/shared/components/ui/Avatar";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";

export type ConsignmentSalesRowData = {
    id: string;
    date: string;
    customerName: string;
    itemsSummary: string;
    totalAmount?: string;
    returnDate: string;
    isDraft?: boolean;
};

export type TableRowProps = {
    data: ConsignmentSalesRowData;
};

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable();
    const { id, date, customerName, itemsSummary, totalAmount, returnDate } =
        data;

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && <TableCell>{id}</TableCell>}
                {TableColoumn[1]?.isChecked && <TableCell>{formatFaDate(date)}</TableCell>}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>
                        <div className="flex flex-row-reverse items-center justify-end gap-2">
                            <span>{customerName}</span>
                            <Avatar size="sm">
                                <AvatarFallback className="bg-surface-container-highest text-label-sm text-on-surface-variant">
                                    {customerName.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>{itemsSummary}</TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>{totalAmount ?? "-"}</TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell>{formatFaDate(returnDate)}</TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <IconButton
                            icon="moreVertical300Linear"
                            iconClassName="rotate-90"
                        />
                    </TableCell>
                )}
                {TableColoumn[7]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <IconButton icon="chevronLeft300Linear" />
                    </TableCell>
                )}
            </UiTableRow>
            <div className="py-1" />
        </>
    );
};

export default TableRow;
