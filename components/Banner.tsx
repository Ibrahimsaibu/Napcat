import Image from "next/image";
import Link from "next/link";
import urlFor from "../lib/urlFor";
import ClientSideRoute from "./ClientSideRoute";

function Banner({ post }: { post: Post }) {
  return (
    <section className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl px-4 mx-auto md:my-10 my-6">
      <ClientSideRoute key={post._id} route={`/post/${post.slug.current}`}>
        <div className="flex flex-col md:flex-row md:space-x-12 space-y-4 md:space-y-0 md:items-start justify-between font-bold cursor-pointer py-4  mb-10 ">
          <div className="relative md:w-2/5 w-full">
            <Image
              src={urlFor(post.mainImage.asset._ref).url()}
              alt={post.author.name}
              width={500}
              height={303}
              className="object-cover lg:object-center rounded-lg h-full "
            />
          </div>
          <div className="flex-1">
            <h1 className=" md:text-[36px] text-xl font-bold text-[#121926] md:leading-[58px] line-clamp-3">
              {post.title}
            </h1>
            <p className="text-sm mt-4 font-normal text-[#4B5565]">
              {new Date(post._createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </ClientSideRoute>
    </section>
  );
}

export default Banner;
