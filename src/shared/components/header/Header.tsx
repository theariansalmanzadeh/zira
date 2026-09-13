"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@shared/components/Icons/Icon";
import IconButton from "@shared/components/ui/IconButton";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@shared/components/ui/Breadcrumb";

const Header = () => {
    const { push } = useRouter();

    return (
        <header className="flex flex-row items-center justify-between p-lg">
            <div className="flex flex-row items-center gap-sm">
                <Icon label="sidebar" />
                <Breadcrumb className="*:text-outline *:text-label-md">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>داشبورد</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex flex-row gap-sm">
                <IconButton icon="search400Linear" onClick={() => { }} />
                <IconButton
                    icon="notification400Linear"
                    onClick={() => push("/admin/notification")}
                />
            </div>
        </header>
    );
};

export default Header;