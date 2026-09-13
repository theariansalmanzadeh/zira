"use client";

import Image from "next/image";
import IconButton from "@/src/shared/components/ui/IconButton";
import { Pill, PillVariants } from "@/src/shared/components/ui/Pill";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import { useTable } from "@/src/shared/context/TableProvider";
import type { VariantProps } from "class-variance-authority";

export type GoodsListStatus = "in-stock" | "out-of-stock";

export type GoodsListRowData = {
    id: string;
    title: string;
    sku: string;
    warehouseAddress: string;
    status: GoodsListStatus;
    quantity: string;
    variantCount: string;
    imgUrl?: string;
};

const STATUS_CONFIG: Record<
    GoodsListStatus,
    { text: string; variant: VariantProps<typeof PillVariants>["variant"] }
> = {
    "in-stock": { text: "موجود", variant: "success" },
    "out-of-stock": { text: "ناموجود", variant: "tonal" },
};

export type GoodsListTableRowProps = {
    data: GoodsListRowData;
};

const GoodsListTableRow = ({ data }: GoodsListTableRowProps) => {
    const { TableColoumn } = useTable();
    const {
        title,
        sku,
        warehouseAddress,
        status,
        quantity,
        variantCount,
        imgUrl,
    } = data;
    const statusConfig = STATUS_CONFIG[status];

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && (
                    <TableCell>
                        <div className="flex flex-row items-center gap-3">
                            <div className="size-10 shrink-0 overflow-hidden rounded-card-md bg-surface-container-highest">
                                {imgUrl ? (
                                    <Image
                                        src={imgUrl}
                                        alt={title}
                                        width={40}
                                        height={40}
                                        className="size-full object-cover"
                                    />
                                ) : null}
                            </div>
                            <span>{title}</span>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[1]?.isChecked && <TableCell>{sku}</TableCell>}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{warehouseAddress}</TableCell>
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
                    <TableCell>
                        {quantity} عدد در {variantCount} متغیر
                    </TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <div className="flex items-center justify-end">
                            <IconButton
                                icon="moreVertical300Linear"
                                iconClassName="rotate-90 size-6!"
                            />
                            <IconButton
                                icon="chevronLeft300Linear"
                                iconClassName="size-6!"
                            />
                        </div>
                    </TableCell>
                )}
            </UiTableRow>
            <div className="py-1" />
        </>
    );
};

export default GoodsListTableRow;
