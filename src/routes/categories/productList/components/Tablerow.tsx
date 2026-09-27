"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import IconButton from "@/src/shared/components/ui/IconButton";
import { Pill } from "@/src/shared/components/ui/Pill";
import { TableCell, TableRow } from "@/src/shared/components/ui/Table";
import { useTable } from "@/src/shared/context/TableProvider";
import { IconLabel } from "@/src/shared/types/icon";
import Image from "next/image";
import { Status, statusType } from "../utils";

export interface TablerowProps {
    data: {
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
        status: Status;
    };
}

const Tablerow = ({
    data: { id, productName, imgUrl, sku, brand, category, stock, status },
}: TablerowProps) => {
    const { TableColoumn } = useTable();
    const { push } = useRouter();
    const pillData = statusType(status);
    const href = `/admin/categories/products/${id}`;

    return (
        <>
            <TableRow
                className="cursor-pointer [&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal"
                onClick={() => push(href)}
            >
                {TableColoumn[0]?.isChecked && (
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
                            <span>{productName}</span>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[1]?.isChecked && <TableCell>{sku}</TableCell>}
                {TableColoumn[2]?.isChecked && <TableCell>{brand}</TableCell>}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>{category}</TableCell>
                )}
                {TableColoumn[4]?.isChecked && <TableCell>{stock}</TableCell>}
                {TableColoumn[5]?.isChecked && (
                    <TableCell>
                        <Pill
                            className="border-0"
                            icon={pillData.icon as IconLabel}
                            variant={pillData.variant}
                            text={pillData.text}
                        />
                    </TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
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
                {TableColoumn[7]?.isChecked && (
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
                {TableColoumn[8]?.isChecked && (
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
