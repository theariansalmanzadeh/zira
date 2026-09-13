"use client";

import { formatFaDate } from "@/src/shared/libs/formatter";
import IconButton from "@/src/shared/components/ui/IconButton";
import { useTable } from "@/src/shared/context/TableProvider";
import { Pill, PillVariants } from "@/src/shared/components/ui/Pill";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import { cn } from "@shared/libs/utils";
import { VariantProps } from "class-variance-authority";

export type AccountingDocumentFilterTab =
    | "all"
    | "temporary"
    | "permanent"
    | "openingClosing";

export type AccountingDocumentType =
    | "temporary"
    | "permanent"
    | "openingClosing";

export type AccountingDocumentStatus = "temporary" | "permanent";

export type AccountingDocumentRowData = {
    id: string;
    date: string;
    description: string;
    debit: string;
    credit: string;
    type: AccountingDocumentType;
    status: AccountingDocumentStatus;
    filterTab: Exclude<AccountingDocumentFilterTab, "all">;
};

const DOCUMENT_TYPE_LABEL: Record<AccountingDocumentType, string> = {
    temporary: "موقت",
    permanent: "دائم",
    openingClosing: "افتتاحیه/اختتامیه",
};

const STATUS_CONFIG: Record<
    AccountingDocumentStatus,
    { text: string; variant: VariantProps<typeof PillVariants>["variant"] }
> = {
    temporary: { text: "موقت", variant: "warning" },
    permanent: { text: "دائم", variant: "success" },
};

export type TableRowProps = {
    data: AccountingDocumentRowData;
};

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable();
    const { id, date, description, debit, credit, type, status } = data;
    const statusConfig = STATUS_CONFIG[status];

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && <TableCell>{id}</TableCell>}
                {TableColoumn[1]?.isChecked && <TableCell>{formatFaDate(date)}</TableCell>}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{description}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && <TableCell>{debit}</TableCell>}
                {TableColoumn[4]?.isChecked && <TableCell>{credit}</TableCell>}
                {TableColoumn[5]?.isChecked && (
                    <TableCell>{DOCUMENT_TYPE_LABEL[type]}</TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell>
                        <Pill
                            className={cn("gap-1.5 border-0")}
                            variant={statusConfig.variant}
                            text={statusConfig.text}
                            hasDot
                        />
                    </TableCell>
                )}
                {TableColoumn[7]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <IconButton
                            icon="moreVertical400Linear"
                            iconClassName="rotate-90"
                        />
                    </TableCell>
                )}
                {TableColoumn[8]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <IconButton icon="edit400Broken" />
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
