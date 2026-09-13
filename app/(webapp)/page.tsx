import Link from 'next/link'
import { Button } from '@/src/shared/components/ui/button'

export default function WebAppHomePage() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4" dir="rtl">
            <Button asChild variant="primary" size="lg">
                <Link href="/admin">ادمین</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
                <Link href="/landing">لندینگ</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
                <Link href="/plp">لیست محصولاتس</Link>
            </Button>
        </div>
    )
}
