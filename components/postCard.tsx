import Image from "next/image";
import urlFor from "../lib/urlFor";

interface IPostCard {
  imageUrl: string;
  authorName: string;
  title: string;
  description: string;
  createdAt: string;
}

export const PostCard = ({
  imageUrl,
  authorName,
  title,
  description,
  createdAt,
}: IPostCard) => {
  return (
    <article className="flex flex-col  space-y-2.5 cursor-pointer w-full md:max-w-96  rounded-lg hover:bg-gray-200 hover:bg-opacity-40   ">
      <div className="relative  md:h-52 h-60  ">
        <Image
          className="object-cover  lg:object-center rounded-lg "
          src={urlFor(imageUrl).url()}
          alt={authorName}
          fill
        />
      </div>
      <div>
        <p className="font-semibold text-xl line-clamp-2 ">{title}</p>
        <p className="text-sm mt-1 line-clamp-2 text-[#364152]">
          {description}
        </p>
        <p className="text-sm mt-5 text-[#4B5565]">
          {new Date(createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </article>
  );
};
