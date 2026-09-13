"use client";

import { useTable } from "@/src/shared/context/TableProvider";
import { Pill, PillVariants } from "@/src/shared/components/ui/Pill";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import { cn } from "@shared/libs/utils";
import { VariantProps } from "class-variance-authority";

export type CustomerAnalysisFilterTab = "all" | "debtor" | "creditor";

export type CustomerAnalysisLevel = "طلایی" | "نقره‌ای" | "برنزی";

export type CustomerAnalysisCreditRating =
    | "عالی"
    | "خوب"
    | "متوسط"
    | "ضعیف";

export type CustomerAnalysisRowData = {
    id: string;
    customerName: string;
    level: CustomerAnalysisLevel;
    purchaseVolume: string;
    debtAmount: string;
    bouncedCheck: string;
    creditLimit: string;
    remainingCredit: string;
    creditRating: CustomerAnalysisCreditRating;
    filterTab: CustomerAnalysisFilterTab;
};

const LEVEL_CONFIG: Record<
    CustomerAnalysisLevel,
    { variant: VariantProps<typeof PillVariants>["variant"] }
> = {
    طلایی: { variant: "warning" },
    نقره‌ای: { variant: "tonal" },
    برنزی: { variant: "outlined" },
};

const RATING_CONFIG: Record<
    CustomerAnalysisCreditRating,
    { variant: VariantProps<typeof PillVariants>["variant"] }
> = {
    عالی: { variant: "success" },
    خوب: { variant: "info" },
    متوسط: { variant: "warning" },
    ضعیف: { variant: "error" },
};

export type TableRowProps = {
    data: CustomerAnalysisRowData;
};

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable();
    const {
        customerName,
        level,
        purchaseVolume,
        debtAmount,
        bouncedCheck,
        creditLimit,
        remainingCredit,
        creditRating,
    } = data;
    const levelConfig = LEVEL_CONFIG[level];
    const ratingConfig = RATING_CONFIG[creditRating];

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && (
                    <TableCell className="underline">{customerName}</TableCell>
                )}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>
                        <Pill
                            className={cn("gap-1.5 border-0")}
                            variant={levelConfig.variant}
                            text={level}
                            hasDot
                        />
                    </TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{purchaseVolume}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>{debtAmount}</TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>{bouncedCheck}</TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell>{creditLimit}</TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell>{remainingCredit}</TableCell>
                )}
                {TableColoumn[7]?.isChecked && (
                    <TableCell>
                        <Pill
                            className={cn("gap-1.5 border-0")}
                            variant={ratingConfig.variant}
                            text={creditRating}
                            hasDot
                        />
                    </TableCell>
                )}
            </UiTableRow>
            <div className="py-1" />
        </>
    );
};

export default TableRow;
