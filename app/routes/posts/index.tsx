import { Link, useLoaderData } from "remix";
import { H1 } from "~/components/Typography";
import { getPosts, Post } from "~/utils/posts.server";

export const loader = () => {
    return getPosts();
}

export default function Posts() {
     const posts: Post[] = useLoaderData();
    return (
      <div className="remix__page">
        <div>
          <H1>Posts</H1>
          <ul className="list-disc pl-10">
            {posts.map((post: Post) => (
              <li key={post.slug}>
                <Link to={post.slug}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}