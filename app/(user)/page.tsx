import { previewData } from "next/headers";
import { groq } from "next-sanity";
import { client } from "../../lib/sanity.client";
import PreviewSuspense from "../../components/PreviewSuspense";
import PreviewBlogList from "../../components/PreviewBlogList";
import BlogList from "../../components/BlogList";
import Banner from "../../components/Banner";

const query = groq`
  *[_type=='post'] {
    ...,
    author->,
    categories[]->
  } | order(_createdAt desc)
`;

export const revalidate = 60; // revalidate this page every 60 sec

export default async function HomePage() {
  if (previewData()) {
    return (
      <PreviewSuspense
        fallback={
          <div role="status">
            <p className="text-center text-lg animate-pulse text-[#7000ff]">
              Loading Preview Data...
            </p>
          </div>
        }
      >
        <PreviewBlogList query={query} />
      </PreviewSuspense>
    );
  }

  const posts = await client.fetch(query);
  const bannerPost = posts[0];

  return (
    <div>
      <div className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl px-4 mx-auto md:my-10 my-6">
        <Banner post={bannerPost} />
      </div>

      <BlogList posts={posts} />
    </div>
  );
}
