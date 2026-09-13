"use client";

import IconButton from "@/src/shared/components/ui/IconButton";
import { useTable } from "@/src/shared/context/TableProvider";
import {
    TableCell,
    TableRow as UiTableRow,
} from "@/src/shared/components/ui/Table";
import Image from "next/image";

export type BranchProductRowData = {
    productName: string;
    imgUrl?: string;
    code: string;
    brand: string;
    category: string;
    stockInfo: string;
};

export type BranchProductRowProps = {
    data: BranchProductRowData;
};

const TableRow = ({
    data: { productName, imgUrl, code, brand, category, stockInfo },
}: BranchProductRowProps) => {
    const { TableColoumn } = useTable();
    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                {TableColoumn[0]?.isChecked && (
                    <TableCell>
                        <div className="flex flex-row items-center gap-3">
                            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-card-md bg-surface-container-highest">
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
                {TableColoumn[1]?.isChecked && <TableCell>{code}</TableCell>}
                {TableColoumn[2]?.isChecked && <TableCell>{brand}</TableCell>}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>{category}</TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>{stockInfo}</TableCell>
                )}
                {TableColoumn[5]?.isChecked && <TableCell>-</TableCell>}
                {TableColoumn[6]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <IconButton icon="more" iconClassName="rotate-90" />
                    </TableCell>
                )}
                {TableColoumn[7]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <IconButton icon="edit" />
                    </TableCell>
                )}
                {TableColoumn[8]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <IconButton icon="chevron" />
                    </TableCell>
                )}
            </UiTableRow>
            <div className="py-1" />
        </>
    );
};

export default TableRow;
