"use client";

import React, { Suspense, useState, useTransition } from "react";
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/src/shared/components/ui/ToggleGroup";
import IconButton from "@/src/shared/components/ui/IconButton";
import Filter from "./components/Filter";
import Sort from "./components/Sort";
import Search from "./components/Search";
import TableListContent from "./components/TableListContent";
import { ROUTE_CONFIGS } from "../../constants/routeConfigs";
import { ModalTypes } from "@/src/shared/components/modals/types";
import { useModalStore } from "@/src/shared/store/modal-store";
import type { TableFilterItem } from "@/src/shared/store/table-actions-store";
import { useSearchParam } from "@/src/shared/hooks/useSearchParam";
import { useSearchParams } from "next/navigation";
import TableLoadingSkeleton from "@/src/shared/components/loading/TableLoadingSkeleton";
import TableProvider, { useTable } from "@/src/shared/context/TableProvider";
import { cn } from "@/src/shared/libs/utils";
import { formatFaNumber } from "@/src/shared/libs/formatter";

export type ToggleButtonItem = {
    label: string;
    value: string;
    count?: number;
};

type TableListLayoutProps = {
    children: React.ReactNode;
    value?: string;
    TableColoumn?: TableFilterItem[];
    toggleButtonValue?: ToggleButtonItem[];
    hasHeaderActions?: boolean;
    isCardLayout?: boolean;
    className?: string;
    hasTableSettings?: boolean;
    hasExpand?: boolean;
    hasFilter?: boolean;
    hasSort?: boolean;
    hasSearch?: boolean;
    searchPlaceholder?: string;
    defaultSearchOpen?: boolean;
};

const TableListLayoutInner = ({
    children,
    value: defaultValue,
    toggleButtonValue = ROUTE_CONFIGS.userManagement.TOGGLE_BUTTON_VALUE,
    hasHeaderActions = true,
    isCardLayout = false,
    className,
    hasTableSettings = true,
    hasExpand = true,
    hasFilter = true,
    hasSort = true,
    hasSearch = true,
    searchPlaceholder,
    defaultSearchOpen = false,
}: TableListLayoutProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPending, startTransition] = useTransition();
    const { openModal } = useModalStore();
    const { TableColoumn, setTableColoumn } = useTable();
    const { addSearchParam, removeSearchParam } = useSearchParam();
    const searchParams = useSearchParams();
    const category = searchParams.get("cat");
    const handleOpenTableSettings = () => {
        openModal(ModalTypes.TABLE_SETTINGS, {
            TableColoumn,
            onApply: setTableColoumn,
        });
    };

    const handleValueChange = (nextValue: string) => {
        if (!nextValue) return;

        startTransition(() => {
            if (nextValue === "all") {
                removeSearchParam("cat", nextValue);
            } else {
                addSearchParam("cat", nextValue);
            }
        });
    };

    const showToolbar =
        hasSearch || hasFilter || hasTableSettings || hasSort || hasExpand;
    const showHeader =
        (defaultSearchOpen && hasSearch) || hasHeaderActions || showToolbar;

    return (
        <section
            className={cn(
                "bg-surface-container-lowest p-md rounded-container-xl",
                isExpanded && "fixed inset-0 z-50 bg-surface-container-lowest",
                className
            )}
        >
            {showHeader && (
            <div className="bg-surface-container-lowest flex flex-row items-center justify-between gap-2 pb-2">
                {defaultSearchOpen && hasSearch && (
                    <div className="min-w-0 flex-1">
                        <Search
                            defaultOpen
                            placeholder={searchPlaceholder}
                        />
                    </div>
                )}
                {hasHeaderActions && (
                    <ToggleGroup
                        type="single"
                        value={category ?? defaultValue ?? "all"}
                        variant="filled"
                        className="p-1.5 rounded-container-md! bg-surface-container-high flex-row-reverse"
                        onValueChange={handleValueChange}
                    >
                        {toggleButtonValue.map((item) => (
                            <ToggleGroupItem
                                key={item.value}
                                value={item.value}
                                className="gap-2"
                            >
                                <span>{item.label}</span>
                                {item.count != null && (
                                    <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-label-sm text-on-surface-variant group-data-[state=on]/toggle:bg-error-container group-data-[state=on]/toggle:text-error">
                                        {formatFaNumber(item.count)}
                                    </span>
                                )}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                )}
                {showToolbar && (
                    <div
                        className={cn(
                            "flex flex-row",
                            !defaultSearchOpen && "mr-auto"
                        )}
                    >
                        {hasSearch && !defaultSearchOpen && (
                            <Search placeholder={searchPlaceholder} />
                        )}
                        {hasFilter && <Filter />}
                        {hasTableSettings && (
                            <IconButton
                                icon="tune400Linear"
                                onClick={handleOpenTableSettings}
                            />
                        )}
                        {hasSort && <Sort />}
                        {hasExpand && (
                            <IconButton
                                icon={
                                    isExpanded
                                        ? "collapseContent400Linear"
                                        : "expandContent400Linear"
                                }
                                onClick={() => setIsExpanded((prev) => !prev)}
                            />
                        )}
                    </div>
                )}
            </div>
            )}
            <div id="admin-layout-content">
                <Suspense fallback={<TableLoadingSkeleton isPending />}>
                    <TableListContent
                        isPending={isPending}
                        isCardLayout={isCardLayout}
                    >
                        {children}
                    </TableListContent>
                </Suspense>
            </div>
        </section>
    );
};

const TableListLayout = (props: TableListLayoutProps) => {
    return (
        <Suspense fallback={null}>
            <TableProvider TableColoumn={props.TableColoumn}>
                <TableListLayoutInner {...props} />
            </TableProvider>
        </Suspense>
    );
};

export default TableListLayout;
