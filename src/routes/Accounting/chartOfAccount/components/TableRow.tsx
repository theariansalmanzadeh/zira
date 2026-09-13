"use client";

import IconButton from "@/src/shared/components/ui/IconButton";
import { useTable } from "@/src/shared/context/TableProvider";
import { Pill, PillVariants } from "@/src/shared/components/ui/Pill";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import { cn } from "@shared/libs/utils";
import { VariantProps } from "class-variance-authority";
import { Icon } from "@/src/shared/components/Icons/Icon";

export type ChartOfAccountFilterTab =
    | "all"
    | "assets"
    | "liabilities"
    | "equity"
    | "revenue"
    | "expense"
    | "memorandum";

export type AccountLevel = "کل" | "معین" | "تفصیلی";

export type AccountNature = "بستانکار" | "بدهکار" | "-";

export type AccountStatus = "active" | "inactive";

export type ChartOfAccountRowData = {
    id: string;
    title: string;
    code: string;
    level: AccountLevel;
    nature: AccountNature;
    balance: string;
    status: AccountStatus;
    depth: number;
    hasChildren?: boolean;
    filterTab: Exclude<ChartOfAccountFilterTab, "all">;
};

const STATUS_CONFIG: Record<
    AccountStatus,
    { text: string; variant: VariantProps<typeof PillVariants>["variant"] }
> = {
    active: { text: "فعال", variant: "success" },
    inactive: { text: "غیرفعال", variant: "tonal" },
};

export type TableRowProps = {
    data: ChartOfAccountRowData;
    isExpanded?: boolean;
    onToggleExpand?: () => void;
};

const TableRow = ({
    data,
    isExpanded = false,
    onToggleExpand,
}: TableRowProps) => {
    const { TableColoumn } = useTable();
    const { title, code, level, nature, balance, status, depth, hasChildren } =
        data;
    const statusConfig = STATUS_CONFIG[status];

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && (
                    <TableCell>
                        <div
                            className="flex flex-row items-center gap-2"
                            style={{ paddingInlineStart: `${depth * 24}px` }}
                        >
                            {hasChildren ? (
                                <button
                                    type="button"
                                    onClick={onToggleExpand}
                                    className="flex size-6 items-center justify-center"
                                    aria-label={
                                        isExpanded ? "بستن" : "باز کردن"
                                    }
                                >
                                    <Icon
                                        label="chevronDown400Linear"
                                        className={cn(
                                            "size-4! text-outline transition-transform",
                                            !isExpanded && "rotate-90",
                                        )}
                                    />
                                </button>
                            ) : (
                                <span className="size-6" />
                            )}
                            <span className="text-on-surface">{title}</span>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[1]?.isChecked && <TableCell>{code}</TableCell>}
                {TableColoumn[2]?.isChecked && <TableCell>{level}</TableCell>}
                {TableColoumn[3]?.isChecked && <TableCell>{nature}</TableCell>}
                {TableColoumn[4]?.isChecked && <TableCell>{balance}</TableCell>}
                {TableColoumn[5]?.isChecked && (
                    <TableCell>
                        <Pill
                            className={cn("gap-1.5 border-0")}
                            variant={statusConfig.variant}
                            text={statusConfig.text}
                        />
                    </TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <IconButton icon="chevronDown400Linear" />
                    </TableCell>
                )}
            </UiTableRow>
            <div className="py-1" />
        </>
    );
};

export default TableRow;
