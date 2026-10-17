import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Pill } from "@/src/shared/components/ui/Pill";
import Recomendations from "./components/Recomendations";
import SubscribeBlogs from "@/src/shared/components/ui/SubscribeBlogs";
import type { PublicBlogPostDetailOut } from "@/src/api/types/public/cms";

type BlogProps = {
    post: PublicBlogPostDetailOut;
};

const Blog = ({ post }: BlogProps) => {
    return <section className="bg-transparent!">
        <div className="flex flex-col gap-2xl md:pt-6xl">
            <div className='px-lg md:px-2xl lg:px-30 sm:min-w-[835px] mx-auto'>

                <div className="flex flex-row gap-lg">
                    {post.tags.map((tag) => (
                        <Pill key={tag.slug} text={tag.name} size="lg" variant="contained-inverse" />
                    ))}
                </div>
                <h1 className="pb-2xl text-headline-sm lg:text-headline-lg border-b border-outline-variant">{post.title}</h1>
                {post.summary && <p className="text-body-lg text-on-surface-variant">
                    {post.summary}
                </p>}
                {[...post.images]
                    .sort((a, b) => a.sort_order - b.sort_order)
                    .map((image) => image.url ? (
                        <div key={image.id} className="relative h-[360px] w-full overflow-hidden rounded-container-lg">
                            <Image
                                src={image.url.startsWith("http") ? image.url : `https://api.bonksaz.ir${image.url}`}
                                alt={post.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : null)}
                <div className="flex flex-col gap-3 text-body-lg leading-8 text-on-surface-variant [&_a]:text-primary [&_a]:underline [&_h2]:text-title-md [&_h2]:text-on-surface [&_img]:w-full [&_img]:rounded-container-lg [&_img]:object-cover [&_ol]:list-decimal [&_ol]:ps-5 [&_p]:whitespace-pre-line [&_ul]:list-disc [&_ul]:ps-5">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </div>
            <div className="md:pt-[120px]">
                <Recomendations />
                <SubscribeBlogs />
            </div>
        </div>
    </section>

};

export default Blog;
