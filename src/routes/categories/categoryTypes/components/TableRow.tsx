"use client";

import { useState } from "react";
import IconButton from "@/src/shared/components/ui/IconButton";
import { Pill } from "@/src/shared/components/ui/Pill";
import { Icon } from "@/src/shared/components/Icons/Icon";
import { useTable } from "@/src/shared/context/TableProvider";
import { ModalTypes } from "@/src/shared/components/modals/types";
import { useModalStore } from "@/src/shared/store/modal-store";
import { cn } from "@shared/libs/utils";
import { CATEGORY_CELL_CLASS } from "../constants";

export type CategoryStatus = "active" | "inactive";

export type CategoryRowData = {
    title: string;
    id: string;
    level: number;
    directItems: number;
    totalProducts: number;
    status: CategoryStatus;
    subCategories?: CategoryRowData[];
};

type CategoryTableRowProps = {
    data: CategoryRowData;
    isSubCategoryLevel?: number;
};

const statusConfig: Record<
    CategoryStatus,
    { text: string; variant: "success" | "error" }
> = {
    active: { text: "فعال", variant: "success" },
    inactive: { text: "غیرفعال", variant: "error" },
};

const CategoryTableRow = ({
    data,
    isSubCategoryLevel = 1,
}: CategoryTableRowProps) => {
    const { TableColoumn } = useTable();
    const { openModal } = useModalStore();
    const [isExpanded, setIsExpanded] = useState(false);
    const hasSubCategories = Boolean(data.subCategories?.length);
    const status = statusConfig[data.status];

    const openCategoryDetail = () => {
        openModal(ModalTypes.CATEGORY_DETAIL, { category: data });
    };

    return (
        <>
            {TableColoumn[0]?.isChecked && (
                <div
                    role="button"
                    tabIndex={0}
                    onClick={openCategoryDetail}

                    className={cn(
                        CATEGORY_CELL_CLASS,
                        "flex cursor-pointer items-center gap-x-2 rounded-s-card-md ps-4 pe-2",
                        isSubCategoryLevel === 2 && "w-4/5 mr-auto",
                        isSubCategoryLevel === 3 && "w-3/5 mr-auto",
                    )}
                >
                    {hasSubCategories ? (
                        <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation();
                                setIsExpanded((prev) => !prev);
                            }}
                            className="flex size-6 items-center justify-center rounded-full transition-colors hover:bg-surface-container-high"
                            aria-expanded={isExpanded}
                            aria-label={
                                isExpanded
                                    ? "بستن زیردسته‌ها"
                                    : "نمایش زیردسته‌ها"
                            }
                        >
                            <Icon
                                label="keyboardArrowDown300Broken"
                                className={cn(
                                    "size-6! text-on-surface-variant transition-transform",
                                    isExpanded && "rotate-180",
                                )}
                            />
                        </button>
                    ) : (
                        <span className="size-6" />
                    )}
                    <span className="truncate">{data.title}</span>
                </div>
            )}
            {TableColoumn[1]?.isChecked && (
                <span
                    role="button"
                    tabIndex={0}
                    // onClick={openCategoryDetail}
                    className={cn(CATEGORY_CELL_CLASS, "cursor-pointer px-2")}
                >
                    {data.id}
                </span>
            )}
            {TableColoumn[2]?.isChecked && (
                <span
                    role="button"
                    tabIndex={0}
                    // onClick={openCategoryDetail}
                    className={cn(CATEGORY_CELL_CLASS, "cursor-pointer px-2")}
                >
                    {data.level}
                </span>
            )}
            {TableColoumn[3]?.isChecked && (
                <span
                    role="button"
                    tabIndex={0}
                    // onClick={openCategoryDetail}
                    className={cn(CATEGORY_CELL_CLASS, "cursor-pointer px-2")}
                >
                    {data.directItems}
                </span>
            )}
            {TableColoumn[4]?.isChecked && (
                <span
                    role="button"
                    tabIndex={0}
                    // onClick={openCategoryDetail}
                    className={cn(CATEGORY_CELL_CLASS, "cursor-pointer px-2")}
                >
                    {data.totalProducts}
                </span>
            )}
            {TableColoumn[5]?.isChecked && (
                <div
                    role="button"
                    tabIndex={0}
                    // onClick={openCategoryDetail}
                    className={cn(CATEGORY_CELL_CLASS, "cursor-pointer px-2")}
                >
                    <Pill
                        className="border-0"
                        variant={status.variant}
                        text={status.text}
                    />
                </div>
            )}
            {TableColoumn[6]?.isChecked && (
                <div
                    className={cn(
                        CATEGORY_CELL_CLASS,
                        "flex justify-end pe-4 ps-2",
                    )}
                >
                    <IconButton
                        iconClassName="size-6!"
                        icon="chevronLeft300Broken"
                        onClick={openCategoryDetail}
                    />
                </div>
            )}

            {isExpanded &&
                data.subCategories?.map((subCategory) => (
                    <CategoryTableRow
                        key={subCategory.id}
                        data={subCategory}
                        isSubCategoryLevel={subCategory.level}
                    />
                ))}
        </>
    );
};

export default CategoryTableRow;
