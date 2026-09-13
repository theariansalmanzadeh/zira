"use client";

import { formatFaDateTime } from "@/src/shared/libs/formatter";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import { useTable } from "@/src/shared/context/TableProvider";
import { Pill, PillVariants } from "@/src/shared/components/ui/Pill";
import IconButton from "@/src/shared/components/ui/IconButton";
import { cn } from "@shared/libs/utils";
import { VariantProps } from "class-variance-authority";
import { PILL_VARIANT_ICON } from "@/src/routes/support/constants/pillVariantIcons";

export type UserTicketIdVariant = "success" | "warning" | "error";

export type UserTicketStatus =
    | "waitingResponse"
    | "waitingUser"
    | "reviewing"
    | "closed";

export type UserTicketRowData = {
    id: string;
    idVariant: UserTicketIdVariant;
    subject: string;
    department: string;
    status: UserTicketStatus;
    lastActivity: string;
};

const STATUS_CONFIG: Record<
    UserTicketStatus,
    { text: string; variant: VariantProps<typeof PillVariants>["variant"] }
> = {
    waitingResponse: { text: "در انتظار پاسخ", variant: "warning" },
    waitingUser: { text: "منتظر کاربر", variant: "info" },
    reviewing: { text: "در حال بررسی", variant: "info" },
    closed: { text: "بسته‌شده", variant: "tonal" },
};

const ID_VARIANT_CLASS: Record<UserTicketIdVariant, string> = {
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error",
};

export type TableRowProps = {
    data: UserTicketRowData;
};

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable();
    const { id, idVariant, subject, department, status, lastActivity } = data;
    const statusConfig = STATUS_CONFIG[status];

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && (
                    <TableCell>
                        <div className="flex flex-row-reverse items-center justify-end gap-2">
                            <span>{id}</span>
                            <span
                                className={cn(
                                    "size-2 shrink-0 rounded-full",
                                    ID_VARIANT_CLASS[idVariant]
                                )}
                            />
                        </div>
                    </TableCell>
                )}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>{subject}</TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{department}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>
                        <Pill
                            className="gap-1 border-0"
                            variant={statusConfig.variant}
                            text={statusConfig.text}
                            icon={
                                statusConfig.variant
                                    ? PILL_VARIANT_ICON[statusConfig.variant]
                                    : undefined
                            }
                        />
                    </TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>{formatFaDateTime(lastActivity)}</TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <IconButton
                            icon="chevronLeft400Broken"
                            iconClassName="size-6! text-on-surface-variant"
                        />
                    </TableCell>
                )}
            </UiTableRow>
            <div className="py-1" />
        </>
    );
};

export default TableRow;
