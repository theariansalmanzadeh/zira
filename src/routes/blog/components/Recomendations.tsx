import { Carousel, CarouselContent, CarouselItem } from "@/src/shared/components/ui/Carousel"
import { Icon } from "@/src/shared/components/Icons/Icon"
import Link from "next/link";
import BlogCard from "@/src/shared/components/ui/BlogCard";
import { listPublicBlogPosts } from "@/src/api/public/cms";
import type { PublicBlogPostCardOut } from "@/src/api/types/public/cms";

const toBlogCard = (post: PublicBlogPostCardOut) => ({
    href: post.slug,
    image: post.cover_url ?? post.images?.find((image) => image.url)?.url ?? "",
    title: post.title,
    date: post.published_at ?? "",
    readTime: Math.max(1, Math.round((post.summary?.length ?? 0) / 400)),
});

const Recomendations = async () => {
    const result = await listPublicBlogPosts({ page: 1, page_size: 20 })
    const posts = result.success ? result.data.results : []

    if (posts.length === 0) return null

    const cards = posts.length > 3 ? posts.slice(0, 3) : posts

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
                    {cards.map((post) => {
                        const blog = toBlogCard(post)
                        return (
                            <CarouselItem key={blog.href} className="basis-3/5 md:basis-1/3!">
                                <BlogCard
                                    href={blog.href}
                                    title={blog.title}
                                    image={blog.image}
                                    date={blog.date}
                                    readTime={blog.readTime}
                                />
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
            </Carousel>
        </div>
    );
};

export default Recomendations;