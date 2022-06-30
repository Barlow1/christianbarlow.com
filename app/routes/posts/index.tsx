import { Post } from "@prisma/client";
import { Link, useLoaderData } from "remix";
import PostCard from "~/components/PostCard";
import { H1 } from "~/components/Typography";
import { getPosts } from "~/utils/posts/posts.server";

export const loader = async () => {
    return getPosts();
}

export default function Posts() {
     const posts: Post[] = useLoaderData();
    return (
      <div className="remix__page">
        <div>
          <H1 className="py-5">Posts</H1>
          <div className="md:grid md:grid-cols-2 md:gap-4">
            {posts.map((post: Post) => (
              <PostCard key={post.slug} post={post} />
            ))}
            </div>
        </div>
      </div>
    );
}