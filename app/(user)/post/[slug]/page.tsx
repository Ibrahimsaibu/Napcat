import { groq } from "next-sanity";
import { client } from "../../../../lib/sanity.client";
import urlFor from "../../../../lib/urlFor";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { RichTextComponents } from "../../../../components/RichTextComponents";
import ClientSideRoute from "../../../../components/ClientSideRoute";

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 60; // revalidate this page every 60 sec

export async function generateStaticParams() {
  const query = groq`*[_type=="post"]
  {slug}`;

  const slugs: Post[] = await client.fetch(query);

  const slugRoutes = slugs.map((slug) => slug.slug.current);

  return slugRoutes.map((slug) => ({
    slug,
  }));
}

async function Post({ params: { slug } }: Props) {
  const query = groq`
  *[_type=="post" && slug.current == $slug][0]
  {...,
  author->,
  categories[]->}`;

  const relatedQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  title,
  

  categories[]->,
  "related": *[_type == "post"  && _id != $postId  && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc, _createdAt desc) [0..3] {
     title,
     slug,
     mainImage,

   }
}`;

  const post: Post = await client.fetch(query, { slug });
  const relatedPosts: any = await client.fetch(relatedQuery, {
    slug,
    postId: post._id,
  });

  return (
    <section className="flex flex-col lg:flex-row lg:justify-between lg:space-x-32 space-y-10   w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl px-4 mx-auto md:my-10 my-6 ">
      <article className="lg:w-2/3 w-full">
        <section className="mb-12 space-y-4 ">
          <div className="">
            <h1 className="md:text-3xl text-xl font-semibold">{post.title}</h1>
            <p className="font-medium text-[#4B5565] mt-2">
              {new Date(post._createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="relative rounded-lg border border-[#E8D2FF]  lg:h-96 h-52">
            {post.mainImage && (
              <Image
                src={urlFor(post.mainImage.asset._ref).url()}
                alt={post.author.name}
                fill
                className="object-cover  lg:object-center rounded-lg  "
              />
            )}
          </div>
        </section>

        <PortableText
          value={post.body}
          components={RichTextComponents}
          key={post._id}
        />
      </article>
      <aside className="lg:w-1/3 w-full ">
        <div className="px-4 mb-6">
          <h6 className="text-xl font-medium mb-1">Author</h6>
          <div className="relative   ">
            {post.author.image ? (
              <Image
                className="object-cover  lg:object-center rounded-full w-12 h-12 "
                src={urlFor(post.author.image.asset._ref).url()}
                alt="related post"
                width={50}
                height={50}
              />
            ) : null}
          </div>
          <p className="font-semibold text-lg italic text-[#4B5565] ">
            {post.author.name}
          </p>
        </div>
        {relatedPosts.related.length > 0 && (
          <div>
            <h6 className="text-xl font-medium text-[#1E2329] px-4 my-2">
              Related Posts
            </h6>

            {relatedPosts.related.map((relatedPost: any) => (
              <ClientSideRoute
                key={relatedPost._id}
                route={`/post/${relatedPost.slug.current}`}
              >
                <article className="flex flex-col  cursor-pointer  w-full md:max-w-96  rounded-lg hover:bg-gray-200 hover:bg-opacity-40  p-4  ">
                  <div className="relative   ">
                    {relatedPost.mainImage && (
                      <Image
                        className="object-cover  lg:object-center rounded-lg w-full h-32 "
                        src={urlFor(relatedPost.mainImage.asset._ref).url()}
                        alt="related post"
                        width={300}
                        height={128}
                      />
                    )}
                  </div>
                  <div>
                    <p className=" text-[#1E2329] text-sm line-clamp-2 mt-2 ">
                      {relatedPost.title}
                    </p>
                  </div>
                </article>
              </ClientSideRoute>
            ))}
          </div>
        )}
      </aside>
    </section>
  );
}

export default Post;
