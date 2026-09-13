"use client";

import { TableCell, TableRow } from "@/src/shared/components/ui/Table";
import { useTable } from "@/src/shared/context/TableProvider";
import IconButton from "@/src/shared/components/ui/IconButton";
import Image from "next/image";
import { Pill } from "@/src/shared/components/ui/Pill";

export type Status = "active" | "diactive";

export interface SupplierRowProps {
    data: {
        item: {
            name: string;
            imgUrl?: string;
        };
        supplierId: string;
        phoneNumber: string;
        email: string;
        productVariaty: {
            variaty: string | number;
            packs: string | number;
        };
        status: Status;
    };
}

const SupplierRow = ({
    data: { item, status, supplierId, phoneNumber, email, productVariaty },
}: SupplierRowProps) => {
    const { TableColoumn } = useTable();
    return (
        <>
            <TableRow className="[&>*]:text-on-surface-variant!">
                {TableColoumn[0]?.isChecked && (
                    <TableCell>
                        <div className="flex flex-row gap-3 items-center">
                            <div className="w-10 h-10 rounded-card-md bg-surface-container-highest">
                                {item.imgUrl && (
                                    <Image
                                        src={item.imgUrl}
                                        alt={item.imgUrl}
                                        width={40}
                                        height={40}
                                    />
                                )}
                            </div>
                            <span className="text-on-surface-variant">
                                {item.name}
                            </span>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>{supplierId}</TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{phoneNumber}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && <TableCell>{email}</TableCell>}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>
                        <div className="flex items-center gap-2">
                            <span>{productVariaty.variaty}</span>
                            <span>محصول در</span>
                            <span>{productVariaty.packs}</span>
                            <span>دسته بندی</span>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell>
                        <Pill
                            className="border-0"
                            variant={
                                status === "active" ? "success" : "warning"
                            }
                            text={status}
                        />
                    </TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <IconButton icon="more" iconClassName="rotate-90" />
                    </TableCell>
                )}
                {TableColoumn[7]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <IconButton icon="receipt" />
                    </TableCell>
                )}
                {TableColoumn[8]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <IconButton icon="chevron" />
                    </TableCell>
                )}
            </TableRow>
            <div className="py-1"></div>
        </>
    );
};

export default SupplierRow;
