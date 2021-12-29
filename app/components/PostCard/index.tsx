import React from "react";
import { Link } from "remix";
import { H4 } from "../Typography";
import { routes } from "~/routes";
import { Post } from "@prisma/client";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      className="hover:no-underline"
      to={`${routes.posts.path}/${post.slug}`}
      prefetch="intent"
    >
      <div className="relative border-2 hover:border-primary border-secondary rounded-lg m-2 p-5 bg-secondary">
        {post.img && <img src={post.img} />}
        <H4>{post.title}</H4>
      </div>
    </Link>
  );
}

export default PostCard;
