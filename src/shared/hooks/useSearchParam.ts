"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const buildPathWithParams = (pathname: string, params: URLSearchParams) => {
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
};

export function useSearchParam() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const addSearchParam = useCallback(
        (key: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(key, value);
            router.push(buildPathWithParams(pathname, params));
        },
        [pathname, router, searchParams]
    );

    const removeSearchParam = useCallback(
        (key: string, _value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete(key);
            router.push(buildPathWithParams(pathname, params));
        },
        [pathname, router, searchParams]
    );

    return { addSearchParam, removeSearchParam };
}
