import { LoaderFunction, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import Grid from "~/components/Grid";
import { getPost } from "~/utils/posts.server";
import { getMDXComponent } from "mdx-bundler/client";
import { bundleMDX } from "mdx-bundler";
import { useMemo } from "react";

export type MDXPost = {
  slug: string;
  title: string;
  html: string;
  code: string;
  frontmatter: {[key: string]: any};
};

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

  return (
    <Grid className="prose prose-light dark:prose-dark mb-24 mt-5 mx-auto">
      <MDXContentComponent />
    </Grid>
  );
}
