"use client";

import { formatFaDateTime } from "@/src/shared/libs/formatter";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import { useTable } from "@/src/shared/context/TableProvider";
import { Avatar, AvatarFallback } from "@/src/shared/components/ui/Avatar";
import { Pill } from "@/src/shared/components/ui/Pill";
import IconButton from "@/src/shared/components/ui/IconButton";
import { cn } from "@shared/libs/utils";
import { VariantProps } from "class-variance-authority";
import { PillVariants } from "@/src/shared/components/ui/Pill";
import { useRouter } from "next/navigation";
import { PILL_VARIANT_ICON } from "@/src/routes/support/constants/pillVariantIcons";

export type TicketIdVariant = "success" | "warning" | "error";
export type TicketStatus = "open" | "waiting" | "reviewing" | "closed";

export type TicketRowData = {
    id: string;
    idVariant: TicketIdVariant;
    contact: string;
    subject: string;
    department: string;
    status: TicketStatus;
    lastActivity: string;
};

const STATUS_CONFIG: Record<
    TicketStatus,
    { text: string; variant: VariantProps<typeof PillVariants>["variant"] }
> = {
    open: { text: "باز", variant: "success" },
    waiting: { text: "منتظر کاربر", variant: "warning" },
    reviewing: { text: "در حال بررسی", variant: "info" },
    closed: { text: "بسته", variant: "tonal" },
};

const ID_VARIANT_CLASS: Record<TicketIdVariant, string> = {
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error",
};

const TicketRow = ({ data }: { data: TicketRowData }) => {
    const { TableColoumn } = useTable()
    const {
        id,
        idVariant,
        contact,
        subject,
        department,
        status,
        lastActivity,
    } = data;
    const statusConfig = STATUS_CONFIG[status];
    const { push } = useRouter();
    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant!">
                {TableColoumn[0]?.isChecked && (
                    <TableCell>
                        <div className="flex flex-row-reverse items-center justify-end gap-2">
                            <span>{id}</span>
                            <span
                                className={cn(
                                    "size-2 shrink-0 rounded-full",
                                    ID_VARIANT_CLASS[idVariant],
                                )}
                            />
                        </div>
                    </TableCell>
                )}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>
                        <div className="flex flex-row-reverse items-center justify-end gap-2">
                            <span>{contact}</span>
                            <Avatar size="sm">
                                <AvatarFallback className="bg-surface-container-highest text-label-sm text-on-surface-variant">
                                    {contact.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[2]?.isChecked && <TableCell>{subject}</TableCell>}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>{department}</TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
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
                {TableColoumn[5]?.isChecked && (
                    <TableCell>{formatFaDateTime(lastActivity)}</TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <IconButton
                            icon="chevronLeft400Broken"
                            iconClassName="size-6! text-on-surface-variant"
                            onClick={() => push(`/admin/support/ticket/${id}`)}
                        />
                    </TableCell>
                )}
            </UiTableRow>
            <div className="py-1" />
        </>
    );
};

export default TicketRow;
