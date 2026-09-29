"use client";

import { useRouter } from "next/navigation";
import IconButton from "@/src/shared/components/ui/IconButton";
import { useTable } from "@/src/shared/context/TableProvider";
import { Pill, PillVariants } from "@/src/shared/components/ui/Pill";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import { statusType, type UserStatus } from "../utils";
import { VariantProps } from "class-variance-authority";

export interface GroupUserRowProps {
    data: {
        userName: string;
        userCode: string;
        roles: string;
        permissions: string;
        status: UserStatus;
    };
    detailHref?: string;
}

const TableRow = ({
    data: { userName, userCode, roles, permissions, status },
    detailHref = `/admin/user-management/user-details/${encodeURIComponent(userCode)}`,
}: GroupUserRowProps) => {
    const { push } = useRouter();
    const { TableColoumn } = useTable();
    const pillData = statusType(status);

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && (
                    <TableCell>
                        <div className="flex flex-row items-center gap-3">
                            <div className="h-8 w-8 shrink-0 rounded-full bg-surface-container-highest" />
                            <span>{userName}</span>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>{userCode}</TableCell>
                )}
                {TableColoumn[2]?.isChecked && <TableCell>{roles}</TableCell>}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>{permissions}</TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>
                        <Pill
                            className="border-0"
                            variant={
                                pillData.variant as VariantProps<
                                    typeof PillVariants
                                >["variant"]
                            }
                            text={pillData.text}
                        />
                    </TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap text-end">
                        <IconButton
                            icon="moreVertical400Linear"
                            className="shrink-0"
                        />
                    </TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap text-end">
                        <IconButton
                            icon="chevronLeft400Linear"
                            className="shrink-0"
                            onClick={() => push(detailHref)}
                        />
                    </TableCell>
                )}
            </UiTableRow>
            <div className="py-1"></div>
        </>
    );
};

export default TableRow;
