import React from "react";
import { Link } from "remix";
import { Post } from "~/utils/posts/posts.server";
import { H4 } from "../Typography";
import { routes } from "~/routes";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      className="hover:no-underline"
      to={`${routes.posts.path}/${post.slug}`}
      prefetch="intent"
    >
      <div className="relative border-2 hover:border-primary border-secondary rounded-lg m-2 p-5 bg-secondary">
        <H4>{post.title}</H4>
      </div>
    </Link>
  );
}

export default PostCard;
