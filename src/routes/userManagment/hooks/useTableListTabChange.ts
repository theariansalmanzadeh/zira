"use client";

import { usePathname, useRouter } from "next/navigation";
import { createTabSearchQuery } from "../utils/tabSearchParams";

export function useTableListTabChange() {
    const router = useRouter();
    const pathname = usePathname();

    return (value: string) => {
        const query = createTabSearchQuery(value);
        router.push(query ? `${pathname}?${query}` : pathname);
    };
}
