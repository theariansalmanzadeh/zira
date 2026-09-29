"use client";

import TableListLayout from "@/src/shared/layouts/tableListLayout/TableListLayout";
import type { UserManagementSearchParams } from "../index";
import UserManagementHeader from "./UserManagementHeader";
import { TABLE_COLOUMN } from '../constants'

type UserManagementLayoutProps = {
    children: React.ReactNode;
    searchParams: UserManagementSearchParams;
};

const UserManagementLayout = ({
    children,
}: UserManagementLayoutProps) => {
    return (
        <>
            <UserManagementHeader />
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                hasHeaderActions={false}
            >
                {children}
            </TableListLayout>
        </>
    );
};

export default UserManagementLayout;
