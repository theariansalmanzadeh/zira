"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import IconButton from "@/src/shared/components/ui/IconButton";
import { Pill } from "@/src/shared/components/ui/Pill";
import { TableCell, TableRow } from "@/src/shared/components/ui/Table";
import { useTable } from "@/src/shared/context/TableProvider";
import { IconLabel } from "@/src/shared/types/icon";
import Image from "next/image";
import { Status, statusType, formatCountWithCap } from "../utils";

export interface TablerowData {
    id: string;
    productName: string;
    imgUrl?: string;
    sku: string;
    brand: string;
    category: string;
    mainCategory?: string;
    subCategory?: string;
    finalCategory?: string;
    size?: string;
    color?: string;
    stock: string;
    colorCount?: number;
    sizeCount?: number;
    status: Status;
}

export interface TablerowProps {
    data: TablerowData;
}

const Tablerow = ({
    data: {
        id,
        productName,
        imgUrl,
        sku,
        brand,
        category,
        stock,
        colorCount,
        sizeCount,
        status,
    },
}: TablerowProps) => {
    const { TableColoumn } = useTable();
    const { push } = useRouter();
    const pillData = statusType(status);
    const href = `/admin/catalog/products/${id}`;

    const isColVisible = (colId: string, index: number) => {
        const found = TableColoumn.find((c) => c.id === colId);
        if (found) return found.isChecked;
        return TableColoumn[index]?.isChecked ?? true;
    };

    return (
        <>
            <TableRow
                className="cursor-pointer *:text-on-surface-variant *:text-label-lg *:font-normal"
                onClick={() => push(href)}
            >
                {isColVisible("col-0", 0) && (
                    <TableCell>
                        <div className="flex flex-row items-center gap-3">
                            <div className="h-10 w-10 rounded-card-md bg-surface-container-highest overflow-hidden">
                                {imgUrl && (
                                    <Image
                                        src={imgUrl}
                                        alt={productName}
                                        width={40}
                                        height={40}
                                        className="h-full w-full object-cover"
                                    />
                                )}
                            </div>
                            <span
                                className="max-w-[180px] truncate"
                                title={productName}
                            >
                                {productName}
                            </span>
                        </div>
                    </TableCell>
                )}
                {isColVisible("col-1", 1) && <TableCell>{sku}</TableCell>}
                {isColVisible("col-2", 2) && <TableCell>{brand}</TableCell>}
                {isColVisible("col-3", 3) && <TableCell>{category}</TableCell>}
                {isColVisible("col-4", 4) && <TableCell>{stock}</TableCell>}
                {isColVisible("col-5", 5) && (
                    <TableCell>
                        <span className="text-on-surface" dir="ltr">
                            {formatCountWithCap(colorCount)}
                        </span>
                    </TableCell>
                )}
                {isColVisible("col-6", 6) && (
                    <TableCell>
                        <span className="text-on-surface" dir="ltr">
                            {formatCountWithCap(sizeCount)}
                        </span>
                    </TableCell>
                )}
                {isColVisible("col-7", 7) && (
                    <TableCell>
                        <Pill
                            className="border-0"
                            icon={pillData.icon as IconLabel}
                            variant={pillData.variant}
                            text={pillData.text}
                        />
                    </TableCell>
                )}
                {isColVisible("actions-0", 8) && (
                    <TableCell
                        className="w-[1%] whitespace-nowrap"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <IconButton
                            iconClassName="size-6!"
                            icon="moreHorizontal300Broken"
                        />
                    </TableCell>
                )}
                {isColVisible("actions-1", 9) && (
                    <TableCell
                        className="w-[1%] whitespace-nowrap"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <IconButton
                            iconClassName="size-6!"
                            icon="receipt300Linear"
                        />
                    </TableCell>
                )}
                {isColVisible("actions-2", 10) && (
                    <TableCell
                        className="w-[1%] whitespace-nowrap"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <Link href={href}>
                            <IconButton
                                iconClassName="size-6!"
                                icon="chevronLeft300Broken"
                            />
                        </Link>
                    </TableCell>
                )}
            </TableRow>
            <div className="py-1"></div>
        </>
    );
};

export default Tablerow;
