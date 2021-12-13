import {
  useLocation,
  LinksFunction,
  Outlet,
  LoaderFunction,
  useLoaderData,
} from "remix";
import invariant from "tiny-invariant";
import Grid from "~/components/Grid";
import { Paragraph } from "~/components/Typography";
import { routes } from "~/routes";
import { getPosts, Post } from "~/utils/posts.server";
export type MDXPost = {
  slug: string;
  title: string;
  html: string;
  code: string;
  date: string;
  frontmatter: { [key: string]: any };
};

export let links: LinksFunction = () => {
  return [
    {
      rel: "image",
      href: "/rocket.png",
    },
  ];
};

export const loader: LoaderFunction = async () => {
  return getPosts();
};

export default function PostSlug() {
  const location = useLocation();
  const posts = useLoaderData();
  const slug = location.pathname.split("/")[2];
  const post = posts.find((blogPost: Post) => blogPost.slug === slug);
  let postedDate;
  if (post) {
    postedDate = new Date(post.date).toLocaleString();
  }

  return location.pathname === routes.posts.path ? (
    <Outlet />
  ) : (
    <>
      <Paragraph className="mt-2">Posted: {postedDate}</Paragraph>
      <Grid className="prose prose-light dark:prose-dark mb-24 mt-5 mx-auto">
        <Outlet />
      </Grid>
    </>
  );
}
