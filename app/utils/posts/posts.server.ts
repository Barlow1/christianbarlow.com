import getPostsMetaData from "./getPostMetaData";
import fetchPost from "./fetchPost";

export type Post = {
  slug: string;
  title: string;
};

export type PostMarkdownAttributes = {
  title: string;
};

export async function getPosts(): Promise<Post[]> {
  return getPostsMetaData();
}

export async function getPost(slug: string) {
  const post = await fetchPost(slug);
  return {
    slug: post.slug,
    title: post.title,
    code: post.body,
    date: post.createdAt,
    views: post.views,
  };
}
