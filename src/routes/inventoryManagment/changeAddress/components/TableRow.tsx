"use client";

import { formatFaDateTime } from "@/src/shared/libs/formatter";
import IconButton from "@/src/shared/components/ui/IconButton";
import { useTable } from "@/src/shared/context/TableProvider";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";

export type ChangeAddressFilterTab =
    | "all"
    | "pending"
    | "in-transit"
    | "completed";

export type ChangeAddressRowData = {
    id: string;
    productTitle: string;
    oldAddress: string;
    newAddress: string;
    registeredAt: string;
    filterTab?: Exclude<ChangeAddressFilterTab, "all">;
};

export type TableRowProps = {
    data: ChangeAddressRowData;
};

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable();
    const { id, productTitle, oldAddress, newAddress, registeredAt } = data;

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && <TableCell>{id}</TableCell>}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>
                        <div className="flex flex-row-reverse items-center justify-end gap-2">
                            <span>{productTitle}</span>
                            <div className="size-8 shrink-0 rounded-card-sm bg-surface-container-highest" />
                        </div>
                    </TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{oldAddress}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>{newAddress}</TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>{formatFaDateTime(registeredAt)}</TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
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
