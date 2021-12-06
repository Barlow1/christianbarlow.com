import { LoaderFunction, useLoaderData, LinksFunction } from "remix";
import invariant from "tiny-invariant";
import Grid from "~/components/Grid";
import { getPost } from "~/utils/posts.server";
import { getMDXComponent } from "mdx-bundler/client";
import { bundleMDX } from "mdx-bundler";
import { useMemo } from "react";
import { Paragraph } from "~/components/Typography";

export type MDXPost = {
  slug: string;
  title: string;
  html: string;
  code: string;
  date: string;
  frontmatter: {[key: string]: any};
};

export let links: LinksFunction = () => {
  return [
        {
      rel: "image",
      href: "/rocket.png",
    },
  ]
}

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, 'expected param "slug"');
  return getPost(params.slug);
};

export default function PostSlug() {
  const post: MDXPost = useLoaderData();
  const MDXContentComponent = useMemo(
    () => getMDXComponent(post.code),
    [post.code]
  );

  const postdate = new Date(post.date);
  const datePosted = postdate.toLocaleString();

  return (
    <>
      <Grid className="prose prose-light dark:prose-dark mb-24 mt-5 mx-auto">
        <MDXContentComponent />
      </Grid>
      <Paragraph className="mb-2">Posted: {datePosted}</Paragraph>
    </>
  );
}
