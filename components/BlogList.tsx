import ClientSideRoute from "./ClientSideRoute";
import { PostCard } from "./postCard";

export type Props = {
  posts: Post[];
};

function BlogList({ posts }: Props) {
  return (
    <section className="w-full from-[#E4FFFD] via-[#FBF2FF] to-[#E8FFFD] bg-gradient-95  py-16  ">
      <div className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl px-4 mx-auto  w-full">
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  gap-x-6 gap-y-16  ">
          {posts.map((post) => (
            <ClientSideRoute
              key={post._id}
              route={`/post/${post.slug.current}`}
            >
              <PostCard
                imageUrl={post.mainImage.asset._ref}
                authorName={post.author.name}
                title={post.title}
                description={post.description}
                createdAt={post._createdAt}
              />
            </ClientSideRoute>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogList;
