import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/src/shared/components/ui/button'

export const metadata: Metadata = {
    title: 'صفحه پیدا نشد',
}

export default function NotFound() {
    return (
        <div
            className="flex min-h-screen w-full flex-col items-center justify-center bg-surface-container-high px-4 py-12"
            dir="rtl"
        >
            <div className="flex w-full max-w-[900px] flex-col items-center gap-6 rounded-card-lg bg-surface-container-lowest p-8 text-center shadow-xs">
                <span className="text-display-lg font-black tracking-wider text-primary">
                    ۴۰۴
                </span>
                <div className="flex flex-col gap-2">
                    <h1 className="text-headline-sm font-bold text-on-surface">
                        صفحه مورد نظر یافت نشد
                    </h1>
                    <p className="text-label-md text-outline">
                        متأسفانه صفحه‌ای که به دنبال آن بودید وجود ندارد، حذف شده
                        یا آدرس آن تغییر کرده است.
                    </p>
                </div>
                <div className="flex w-full flex-col gap-3 sm:flex-row">
                    <Button asChild variant="primary" className="flex-1">
                        <Link href="/">بازگشت به صفحه اصلی</Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                        <Link href="/admin">پنل مدیریت</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
