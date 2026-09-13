"use client";

import TableListLayout from "@/src/shared/layouts/tableListLayout/TableListLayout";
import type { UserManagementSearchParams } from "../index";
import { getTabValueFromSearchParams } from "../utils/tabSearchParams";
import UserManagementHeader from "./UserManagementHeader";
import { TABLE_COLOUMN } from '../constants'

type UserManagementLayoutProps = {
    children: React.ReactNode;
    searchParams: UserManagementSearchParams;
};

const UserManagementLayout = ({
    children,
    searchParams,
}: UserManagementLayoutProps) => {
    const activeTab = getTabValueFromSearchParams(searchParams);

    return (
        <>
            <UserManagementHeader />
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value={activeTab}
            >
                {children}
            </TableListLayout>
        </>
    );
};

export default UserManagementLayout;
