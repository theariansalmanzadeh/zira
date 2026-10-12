"use client";

import Link from "next/link";
import { Icon } from "@/src/shared/components/Icons/Icon";
import IconButton from "@/src/shared/components/ui/IconButton";
import { Pill } from "@/src/shared/components/ui/Pill";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import { useTable } from "@/src/shared/context/TableProvider";
import { formatPrice } from "@/src/shared/libs/formatter";

export type CustomerLevel = "gold" | "silver" | "bronze";

export type CustomerListRowData = {
    id: string;
    code: string;
    name: string;
    level: CustomerLevel;
    credit: number;
    phone: string;
    email: string;
};

const LEVEL_CONFIG: Record<
    CustomerLevel,
    { text: string; variant: "warning" | "tonal" | "outlined" }
> = {
    gold: { text: "طلایی", variant: "warning" },
    silver: { text: "نقره‌ای", variant: "tonal" },
    bronze: { text: "برنزی", variant: "outlined" },
};

export type TableRowProps = {
    data: CustomerListRowData;
};

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable();
    const { id, code, name, level, credit, phone, email } = data;
    const levelConfig = LEVEL_CONFIG[level];

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && (
                    <TableCell>
                        <div className="flex flex-row items-center gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full text-label-lg font-medium text-on-primary">
                                {name.charAt(0)}
                            </div>
                            <span className="text-label-lg font-semibold text-on-surface">
                                {name}
                            </span>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[1]?.isChecked && (
                    <TableCell className="text-outline">{code}</TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>
                        <Pill
                            className="border-0"
                            variant={levelConfig.variant}
                            text={levelConfig.text}
                            hasDot
                        />
                    </TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell className="text-success">
                        <span className="inline-flex items-center gap-0.5">
                            <span>{formatPrice(credit)}</span>
                            <Icon
                                label="currency"
                                className="size-4! text-success"
                            />
                        </span>
                    </TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell className="text-outline text-right" dir="ltr">
                        {phone}
                    </TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell className="text-outline">{email}</TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <Link href={`/admin/customers/${id}`}>
                            <IconButton
                                icon="chevronLeft300Linear"
                                iconClassName="size-6! text-outline"
                            />
                        </Link>
                    </TableCell>
                )}
            </UiTableRow>
            <div className="py-1" />
        </>
    );
};

export default TableRow;
