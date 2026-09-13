"use client";

import { Icon } from "@/src/shared/components/Icons/Icon";
import { useTable } from "@/src/shared/context/TableProvider";
import IconButton from "@/src/shared/components/ui/IconButton";
import { Pill, PillVariants } from "@/src/shared/components/ui/Pill";
import { TableCell, TableRow } from "@/src/shared/components/ui/Table";
import { IconLabel } from "@/src/shared/types/icon";
import {
    orderPaymentStatusType,
    type OrderPaymentStatus,
} from "../utils/status";
import { VariantProps } from "class-variance-authority";

interface OrderManagmentProps {
    data: {
        orderId: string;
        orderDate: string;
        totalOrder: string;
        paymentMethod: string;
        status: OrderPaymentStatus;
        state: string;
    };
}

const OrderManagmentTableRow = ({
    data: { orderId, orderDate, paymentMethod, state, status, totalOrder },
}: OrderManagmentProps) => {
    const { TableColoumn } = useTable();
    const pillData = orderPaymentStatusType(status);
    return (
        <TableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
            {TableColoumn[0]?.isChecked && <TableCell>{orderId}</TableCell>}
            {TableColoumn[1]?.isChecked && <TableCell>{orderDate}</TableCell>}
            {TableColoumn[2]?.isChecked && (
                <TableCell>
                    <div className="flex items-center gap-2">
                        <span>{totalOrder}</span>
                        <Icon label="currency" />
                    </div>
                </TableCell>
            )}
            {TableColoumn[3]?.isChecked && (
                <TableCell>{paymentMethod}</TableCell>
            )}
            {TableColoumn[4]?.isChecked && (
                <TableCell>
                    <Pill
                        className="border-0"
                        icon={pillData?.icon as IconLabel}
                        variant={
                            pillData?.variant as VariantProps<
                                typeof PillVariants
                            >["variant"]
                        }
                        text={pillData?.text}
                    />
                </TableCell>
            )}
            {TableColoumn[5]?.isChecked && <TableCell>{state}</TableCell>}
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
    );
};

export default OrderManagmentTableRow;
