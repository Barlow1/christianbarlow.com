import {
  LoaderFunction,
  LinksFunction,
  ActionFunction,
  json,
  MetaFunction,
} from "@remix-run/node";

import { useLoaderData, useFetcher, useCatch } from "@remix-run/react";
import invariant from "tiny-invariant";
import Grid from "~/components/Grid";
import {
  getPost,
  getPosts,
  incrementPostViews,
} from "~/utils/posts/posts.server";
import { getMDXComponent } from "mdx-bundler/client";
import { useEffect, useMemo, useRef } from "react";
import { Paragraph } from "~/components/Typography";
import { SEOHandle } from "@balavishnuvj/remix-seo";
import { getSocialMetas } from "~/utils/posts/seo";
import { getDisplayUrl } from "~/utils/url";

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

  const post = await getPost(params.slug);

  if (!post) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return post;
};

export const action: ActionFunction = async ({ request, params }) => {
  const { slug } = params;
  let data;
  invariant(slug, "missing slug param");
  console.log("context", process.env.CONTEXT);
  if (process.env.CONTEXT === "production") {
    console.log("marking as read");
    data = await incrementPostViews(slug);
  }
  return json({ success: true, data: data });
};

export const meta: MetaFunction = ({ data, parentsData }) => {
  const { requestInfo } = parentsData.root;
  if (data) {
    return getSocialMetas({
      url: getDisplayUrl(requestInfo),
      title: data.title,
      image: data.img,
    });
  }
  return {};
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

export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <div>
      <h1>
        {caught.status}: {caught.statusText}
      </h1>
      {message}
    </div>
  );
}
