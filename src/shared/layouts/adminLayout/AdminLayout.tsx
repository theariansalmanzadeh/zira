"use client"

import React, { Suspense } from 'react'
import { ToggleGroup, ToggleGroupItem } from "@/src/shared/components/ui/ToggleGroup";
import IconButton from '@/src/shared/components/ui/IconButton';
import AdminProvider, { useAdmin } from '@/src/shared/context/AdminProvider';
import TableProvider from '@/src/shared/context/TableProvider';
import Filter from './components/Filter';
import Sort from './components/Sort';
import Search from './components/Search';

const AdminLayoutContent = ({ children }: { children: React.ReactNode }) => {
    const { isExpanded, setIsExpanded } = useAdmin();

    return (
        <section className={`bg-surface-container-lowest p-md rounded-container-xl ${isExpanded ? "fixed inset-0 z-50 bg-surface-container-lowest" : ""}`}
        >
            <div className='bg-surface-container-lowest flex flex-row justify-between pb-2'>
                <ToggleGroup type="single" value="table" variant="filled" className="p-1.5 rounded-container-md! bg-surface-container-high">
                    <ToggleGroupItem value="table">
                        dummy text
                    </ToggleGroupItem>
                    <ToggleGroupItem value="list">
                        dummy text
                    </ToggleGroupItem>
                </ToggleGroup>
                <div className='flex flex-row mr-auto'>
                    <Search />
                    <Filter />
                    <IconButton icon='star' />
                    <IconButton icon='star' />
                    <Sort />
                    <IconButton
                        icon={isExpanded ? 'collapseContent' : 'expandContent'}
                        onClick={() => setIsExpanded((prev) => !prev)}
                    />
                </div>
            </div >
            <div id="admin-layout-content">
                {children}
            </div>
        </section>
    )
}

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AdminProvider>
            <TableProvider>
                <Suspense fallback={null}>
                    <AdminLayoutContent>{children}</AdminLayoutContent>
                </Suspense>
            </TableProvider>
        </AdminProvider>
    );
};

export default AdminLayout
