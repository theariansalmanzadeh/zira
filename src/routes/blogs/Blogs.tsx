"use client"
import React from "react";
import BlogCard from "../../shared/components/ui/BlogCard";
import Link from "next/link";
import { Icon } from "@/src/shared/components/Icons/Icon";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselDots } from "@/src/shared/components/ui/Carousel";
import SubscribeBlogs from "@/src/shared/components/ui/SubscribeBlogs";
import { BLOGS_CAROUSEL, BLOGS_LATEST } from "./content";

const Blogs = () => {
    return <div>
        <Carousel className="h-[80vh]! lg:h-40vh!">
            <CarouselContent className="h-full">
                {BLOGS_CAROUSEL.map((blog) => (
                    <CarouselItem key={blog.href} className="h-full overflow-hidden">
                        <BlogCard
                            isCarousel
                            href={blog.href}
                            image={blog.image}
                            title={blog.title}
                            date={blog.date}
                            readTime={blog.readTime}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext className="hidden md:block size-10 p-lg! bg-white! shadow-xl! -translate-x-2/3 opacity-100! border-0 rounded-container-md!" />
            <CarouselPrevious className="hidden md:block size-10 p-lg! bg-white! shadow-xl! translate-x-2/3 opacity-100! border-0 rounded-container-md!" />
            <CarouselDots className="mt-xl" />
        </Carousel>
        <div className="flex flex-row justify-between items-center pt-6xl pb-2xl">
            <h6 className="text-2xl font-bold">جدیدترین مطالب</h6>
            <Link href="/blogs" className="text-on-surface-variant! flex flex-row items-center gap-1">
                مشاهده همه
                <Icon label="chavaron" className="size-5 fill-on-surface-variant" />
            </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-6xl">
            {BLOGS_LATEST.map((blog) => (
                <BlogCard
                    key={blog.href}
                    href={blog.href}
                    image={blog.image}
                    title={blog.title}
                    date={blog.date}
                    readTime={blog.readTime}
                />
            ))}
        </div>
        <SubscribeBlogs />
    </div>
};

export default Blogs;
