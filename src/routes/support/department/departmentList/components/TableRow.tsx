"use client";

import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import { useTable } from "@/src/shared/context/TableProvider";
import IconButton from "@/src/shared/components/ui/IconButton";
import { Avatar, AvatarFallback } from "@/src/shared/components/ui/Avatar";
import Link from "next/link";

export type Status = "active" | "diactive";

export interface DepartmentRowProps {
    data: {
        name: string;
        id: string;
        deputy: string;
        lastTimeAnswered: number;
        status: Status;
    };
}

const TableRow = ({
    data: { name, id, deputy, lastTimeAnswered, status },
}: DepartmentRowProps) => {
    const { TableColoumn } = useTable();
    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant!">
                {TableColoumn[0]?.isChecked && <TableCell>{name}</TableCell>}
                {TableColoumn[1]?.isChecked && <TableCell>{id}</TableCell>}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>
                        <div className="flex flex-row-reverse justify-end items-center gap-1">
                            <span className="text-label-md text-on-surface-variant">
                                {deputy}
                            </span>
                            <Avatar size="sm">
                                <AvatarFallback className="bg-surface-container-highest text-label-sm text-on-surface-variant">
                                    {deputy.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>{lastTimeAnswered}</TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <Link href={`/admin/support/department/${id}`}>
                            <IconButton
                                icon="chevronLeft400Broken"
                                iconClassName="size-6! text-on-surface-variant"
                            />
                        </Link>
                    </TableCell>
                )}
            </UiTableRow>
            <div className="py-1"></div>
        </>
    );
};

export default TableRow;
