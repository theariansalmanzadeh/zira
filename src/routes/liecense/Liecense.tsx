import { LICENSES_DUMMY } from '@/src/routes/contentManagment/liecenses/constants'
import { getLiecenseDetails } from '@/src/routes/contentManagment/liecenseDetails/constants'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/src/shared/components/ui/Carousel'
import LiecenseCard from './components/LiecenseCard'

const Liecense = () => {
    const items = LICENSES_DUMMY.map((item) => getLiecenseDetails(item.id))

    return (
        <section
            className="flex w-full flex-col gap-6 py-10"
            dir="rtl"
        >
            <h1 className="text-title-lg font-bold text-on-surface">
                گواهی‌ها و مجوزها
            </h1>
            <Carousel className="w-full" dir="rtl" opts={{ direction: 'rtl' }}>
                <CarouselContent>
                    {items.map((item) => (
                        <CarouselItem key={item.id} className="basis-1/5">
                            <LiecenseCard className="w-1/3" data={item} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    )
}

export default Liecense
