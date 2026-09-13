"use client";

import { formatFaDateTime } from "@/src/shared/libs/formatter";
import { Icon } from "@/src/shared/components/Icons/Icon";
import { useTable } from "@/src/shared/context/TableProvider";
import { Pill, PillVariants } from "@/src/shared/components/ui/Pill";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import { VariantProps } from "class-variance-authority";

export type TransferStatus = "transferred" | "pending" | "in-transit";
export type TransferFilterTab = "all" | "pending" | "in-transit" | "completed";

export type TransferRowData = {
    id: string;
    origin: string;
    destination: string;
    itemCount: string;
    status: TransferStatus;
    registeredAt: string;
    filterTab?: Exclude<TransferFilterTab, "all">;
};

const STATUS_CONFIG: Record<
    TransferStatus,
    { text: string; variant: VariantProps<typeof PillVariants>["variant"] }
> = {
    transferred: { text: "منتقل شد", variant: "success" },
    pending: { text: "در انتظار", variant: "warning" },
    "in-transit": { text: "در حال انتقال", variant: "info" },
};

export type TableRowProps = {
    data: TransferRowData;
};

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable();
    const { id, origin, destination, itemCount, status, registeredAt } = data;
    const statusConfig = STATUS_CONFIG[status];

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && <TableCell>{id}</TableCell>}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>
                        <div className="flex flex-row-reverse items-center justify-end gap-2">
                            <span>{destination}</span>
                            <Icon
                                label="arrowLeft300Linear"
                                className="size-4 shrink-0 text-on-surface-variant"
                            />
                            <span>{origin}</span>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{itemCount}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>
                        <Pill
                            variant={statusConfig.variant}
                            text={statusConfig.text}
                            hasDot
                            className="border-0"
                        />
                    </TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>{formatFaDateTime(registeredAt)}</TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <Icon
                            label="arrowLeft300Linear"
                            className="size-6 text-on-surface-variant"
                        />
                    </TableCell>
                )}
            </UiTableRow>
            <div className="py-1" />
        </>
    );
};

export default TableRow;
