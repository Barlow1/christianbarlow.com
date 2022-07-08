import getPostsMetaData from "./getPostMetaData";
import fetchPost from "./fetchPost";
import incrementViews from "./incrementPostViews";
import { Post } from "@prisma/client";


export type PostMarkdownAttributes = {
  title: string;
};

export async function getPosts(): Promise<Post[]> {
  return getPostsMetaData();
}

export async function getPost(slug: string) {
  const post = await fetchPost(slug);
  if (post) {
    return {
      slug: post?.slug,
      title: post?.title,
      code: post?.body,
      date: post?.createdAt,
      views: post?.views,
      img: post?.img,
    };
  }
  return undefined;
}

export async function incrementPostViews(slug: string) {
  return incrementViews(slug);
}
