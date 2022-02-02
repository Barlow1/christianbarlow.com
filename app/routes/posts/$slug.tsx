import {
  LoaderFunction,
  useLoaderData,
  LinksFunction,
  useFetcher,
  ActionFunction,
  json,
} from "remix";
import invariant from "tiny-invariant";
import Grid from "~/components/Grid";
import { getPost, getPosts, incrementPostViews } from "~/utils/posts/posts.server";
import { getMDXComponent } from "mdx-bundler/client";
import { useEffect, useMemo, useRef } from "react";
import { Paragraph } from "~/components/Typography";
import { SEOHandle } from "@balavishnuvj/remix-seo";

export type MDXPost = {
  slug: string;
  title: string;
  html: string;
  code: string;
  date: string;
  frontmatter: { [key: string]: any };
  views: number;
};

export const handle: SEOHandle = {
  getSitemapEntries: async (request) => {
    const blogs = await getPosts();
    return blogs.map((blog) => {
      return { route: `/posts/${blog.slug}`, priority: 0.7 };
    });
  },
};


export let links: LinksFunction = () => {
  return [
    {
      rel: "image",
      href: "/rocket.png",
    },
  ];
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, 'expected param "slug"');
  return getPost(params.slug);
};

export const action: ActionFunction = async ({ request, params }) => {
  const { slug } = params;
  let data;
  invariant(slug, "missing slug param");
  console.log('context', process.env.CONTEXT);
  if (process.env.CONTEXT === "production") {
    console.log("marking as read");
    data = await incrementPostViews(slug);
  }
  return json({ success: true, data: data });
};

const useOnRead = (onRead: Function) => {
  let startTime = new Date().getTime();
  let timeOut = 60000; // 1 min
  let timerId: NodeJS.Timeout;
  let timerFinished = false;

  const startTimer = () => {
    timerId = setTimeout(() => {
      timerFinished = true;
      onRead();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, timeOut);
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      clearTimeout(timerId);
      const elapsedTime = new Date().getTime() - startTime;
      timeOut = timeOut - elapsedTime;
    } else {
      startTime = new Date().getTime();
      startTimer();
    }
  };

  const removeVisibiltyListener = () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  };

  useEffect(() => {
    return () => {
      removeVisibiltyListener();
    };
  }, []);

  useEffect(() => {
    startTimer();
    document.addEventListener("visibilitychange", handleVisibilityChange);
  }, []);
};

export default function PostSlug() {
  const post: MDXPost = useLoaderData();
  const MDXContentComponent = useMemo(
    () => getMDXComponent(post.code),
    [post.code]
  );

  const postdate = new Date(post.date);
  const datePosted = postdate.toLocaleString();

  const markAsRead = useFetcher();
  const markAsReadRef = useRef(markAsRead);
  useEffect(() => {
    markAsReadRef.current = markAsRead;
  }, [markAsRead]);

  useOnRead(() => markAsReadRef.current.submit({}, { method: "post" }));

  return (
    <>
      <Paragraph className="mt-2">Posted: {datePosted}</Paragraph>
      <Paragraph className="mb-2">
        Viewed {post.views} {post.views === 1 ? "time" : "times"}
      </Paragraph>
      <Grid className="prose prose-light dark:prose-dark mb-24 mt-5 mx-auto">
        <MDXContentComponent />
      </Grid>
    </>
  );
}
