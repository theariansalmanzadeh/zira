import { Carousel, CarouselContent, CarouselItem } from "@/src/shared/components/ui/Carousel"
import { Icon } from "@/src/shared/components/Icons/Icon"
import { BLOGS_CONTENT } from "../contnet"
import Link from "next/link";
import BlogCard from "@/src/shared/components/ui/BlogCard";

const Recomendations = () => {
    return (
        <div className="flex flex-col gap-10 bg-surface-container-lowest w-full">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-title-lg font-bold text-on-surface">پیشنهادات</h2>
                <Link href="/blogs" className="flex flex-row items-center gap-1">
                    <p className="text-body-lg text-on-surface-variant">
                        مشاهده همه
                    </p>
                    <Icon label="chavaron" />
                </Link>
            </div>
            <Carousel className="w-full" dir="rtl" opts={{ direction: "rtl" }}>
                <CarouselContent className="-ml-1 gap-10">
                    {BLOGS_CONTENT.slice(0, 3).map((blog) => (
                        <CarouselItem key={blog.title} className="basis-3/5 md:basis-1/3!">
                            <BlogCard
                                // isCarousel={true}
                                href={blog.href}
                                title={blog.title}
                                image={blog.image}
                                date={blog.date}
                                readTime={blog.readTime}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
};

export default Recomendations;