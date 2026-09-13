import { Pill } from "@/src/shared/components/ui/Pill";
import { BLOG_CONTENT } from "./contnet";
import Image from "next/image";
import Recomendations from "./components/Recomendations";
import SubscribeBlogs from "@/src/shared/components/ui/SubscribeBlogs";

const Blog = () => {
    return <section className="bg-transparent!">
        <div className="flex flex-col gap-2xl md:pt-6xl">
            <div className='px-lg md:px-2xl lg:px-30 max-w-[835px] mx-auto'>

                <div className="flex flex-row gap-lg">
                    {BLOG_CONTENT.tags.map((tag) => (
                        <Pill key={tag} text={tag} size="lg" variant="contained-inverse" />
                    ))}
                </div>
                <h1 className="pb-2xl text-headline-sm lg:text-headline-lg border-b border-outline-variant">{BLOG_CONTENT.title}</h1>
                {BLOG_CONTENT.headline && <p className="text-body-lg text-on-surface-variant">
                    {BLOG_CONTENT.headline}
                </p>}
                {BLOG_CONTENT.mainContent.map((content, index) => (
                    <div key={index}>
                        {content.type === "title" && <h2 className="text-title-md">{content.content}</h2>}
                        {content.type === "text" && <p className="text-body-lg text-on-surface-variant whitespace-pre-line">{content.content}</p>}
                        {content.type === "image" && <Image src={content.content} alt={content.content} fill className="w-full object-cover rounded-container-lg" />}
                    </div>
                ))}
            </div>
            <div className="md:pt-[120px]">
                <Recomendations />
                <SubscribeBlogs />
            </div>
        </div>
    </section>

};

export default Blog;
