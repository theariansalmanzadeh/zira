"use client"

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Icon } from "@shared/components/Icons/Icon";
import IconButton from "@shared/components/ui/IconButton";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@shared/components/ui/Breadcrumb";
import { getBreadcrumbsForRoute } from "./constants/breadcrumbs";
import Notification from "./components/Notification";

const AdminHeader = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const crumbs = getBreadcrumbsForRoute(pathname, searchParams);

    return (
        <header className="flex flex-row items-center justify-between p-lg">
            <div className="flex flex-row items-center gap-sm">
                <Icon label="sidebar" className="text-outline-variant" />
                <Breadcrumb className="*:text-outline *:text-label-md">
                    <BreadcrumbList>
                        {crumbs.map((crumb, index) => (
                            <React.Fragment key={`${crumb}-${index}`}>
                                {index > 0 && <BreadcrumbSeparator className="rotate-180" />}
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{crumb}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex flex-row gap-sm">
                <IconButton icon="search400Linear" onClick={() => { }} />
                <Notification />
            </div>
        </header>
    );
};

export default AdminHeader;
