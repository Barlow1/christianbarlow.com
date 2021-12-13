import { Link, useLoaderData } from "remix";
import PostCard from "~/components/PostCard";
import { H1 } from "~/components/Typography";
import { getPosts, Post } from "~/utils/posts.server";

export const loader = async () => {
    return getPosts();
}

export default function Posts() {
     const posts: Post[] = useLoaderData();
    return (
      <div className="remix__page">
        <div>
          <H1>Posts</H1>
            {posts.map((post: Post) => (
              <PostCard key={post.slug} post={post} />
            ))}
        </div>
      </div>
    );
}