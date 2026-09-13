"use client";

import { useState } from "react";
import { Button } from "@shared/components/ui/button";
import IconButton from "@shared/components/ui/IconButton";
import { Icon } from "@shared/components/Icons/Icon";
import { Input } from "@shared/components/ui/Input";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@shared/components/ui/Table";
import type { GroupUser } from "../types";
import UserRow from "./UserRow";

type UsersTabProps = {
    users: GroupUser[];
    onAddUser?: () => void;
};

const UsersTab = ({ users, onAddUser }: UsersTabProps) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className={`flex flex-1 flex-col gap-2 ${isExpanded ? "fixed inset-0 z-50 bg-surface-container-lowest p-4" : ""}`}
        >
            <div className="flex flex-row items-center justify-between pb-2">
                <Button type="button" variant="primary" onClick={onAddUser}>
                    <Icon label="plus" className="size-4" />
                    افزودن کاربر
                </Button>

                <div className="mr-auto flex flex-row items-center gap-1">
                    {isSearchOpen ? (
                        <Input
                            dir="rtl"
                            iconId="magnifier"
                            placeholder="جستجو..."
                            wrapperClassName="rounded-full flex-row-reverse min-w-[240px] px-1"
                            className="text-right"
                            autoFocus
                            onBlur={() => setIsSearchOpen(false)}
                        />
                    ) : (
                        <IconButton
                            icon="magnifier"
                            onClick={() => setIsSearchOpen(true)}
                        />
                    )}
                    <IconButton icon="filter" />
                    <IconButton icon="sort" />
                    <IconButton
                        icon={isExpanded ? "collapseContent" : "expandContent"}
                        onClick={() => setIsExpanded((prev) => !prev)}
                    />
                </div>
            </div>

            <div className="rounded-card-lg bg-surface-container-high p-2">
                <Table className="border-collapse border-spacing-y-4">
                    <TableHeader className="rounded-xl">
                        <TableRow className="[&>*]:text-outline [&>*]:text-label-lg [&>*]:font-normal">
                            <TableHead>نام کاربر</TableHead>
                            <TableHead>شناسه کاربر</TableHead>
                            <TableHead>وضعیت</TableHead>
                            <TableHead />
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user, index) => (
                            <UserRow key={`${user.userId}-${index}`} user={user} />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default UsersTab;
