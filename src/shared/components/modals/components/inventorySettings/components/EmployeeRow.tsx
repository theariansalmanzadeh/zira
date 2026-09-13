"use client";

import IconButton from "@shared/components/ui/IconButton";
import { Pill } from "@shared/components/ui/Pill";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@shared/components/ui/Table";
import type { InventoryEmployee, InventoryEmployeeStatus } from "../types";

const statusConfig: Record<
    InventoryEmployeeStatus,
    { text: string; variant: "success" | "tonal" }
> = {
    active: { text: "فعال", variant: "success" },
    inactive: { text: "غیرفعال", variant: "tonal" },
};

type EmployeeRowProps = {
    employee: InventoryEmployee;
};

const EmployeeRow = ({ employee }: EmployeeRowProps) => {
    const status = statusConfig[employee.status];

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                <TableCell>
                    <div className="flex flex-row items-center gap-3">
                        <div className="h-8 w-8 shrink-0 rounded-full bg-surface-container-highest" />
                        <span>{employee.userName}</span>
                    </div>
                </TableCell>
                <TableCell>{employee.userId}</TableCell>
                <TableCell>
                    <Pill
                        className="border-0"
                        variant={status.variant}
                        text={status.text}
                    />
                </TableCell>
                <TableCell className="w-[1%] whitespace-nowrap">
                    <IconButton icon="more" iconClassName="rotate-90" />
                </TableCell>
                <TableCell className="w-[1%] whitespace-nowrap">
                    <IconButton icon="chevron" />
                </TableCell>
            </UiTableRow>
            <div className="py-1"></div>
        </>
    );
};

export default EmployeeRow;
