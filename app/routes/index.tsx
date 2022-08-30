import { Post } from "@prisma/client";
import type {
  MetaFunction,
  LoaderFunction,
  LinksFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import Divider from "~/components/Divider";
import PostCard from "~/components/PostCard";
import { ProjectCard } from "~/components/ProjectCard";
import SocialBar from "~/components/SocialBar";
import { H1, H2, Paragraph } from "~/components/Typography";
import { getPosts } from "~/utils/posts/posts.server";
import { getProjects, Project } from "~/utils/projects";

type IndexData = {
  posts: Array<Post>;
  projects: Array<Project>;
};

export let links: LinksFunction = () => {
  return [
    {
      rel: "image",
      href: "/me_at_the_plaza.png",
    },
  ];
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async () => {
  let data: IndexData = {
    posts: await getPosts(),
    projects: getProjects(),
  };

  // https://remix.run/api/remix#json
  return json(data);
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Christian Barlow",
    description: "Welcome to my website!",
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData<IndexData>();

  return (
    <div className="remix__page justify-center content-center">
      <SocialBar />
      <main>
        <div className="md:grid md:grid-cols-2 md:gap-4 py-10">
          <img
            className="rounded-lg max-h-64 md:max-h-96 m-auto mb-5"
            aria-label="Head shot of me in a t-shirt"
            src="/me_at_the_plaza.png"
          />
          <div className="flex flex-col justify-center gap-4 text-center">
            <H1>React, Typescript, Remix and UX, Oh my!</H1>
            <Paragraph>
              Using code and writing to fulfill my passions for mentoring,
              student success, realty, and 3D virtual reality experiences. I
              like to break away from the computer to travel, cook, and explore
              with my wife Emma and cat Max.
            </Paragraph>
          </div>
        </div>
        <div className="py-10">
          <H2 className="py-5 text-center">Recommended Posts</H2>
          <div className="md:grid md:grid-cols-2 md:gap-4">
            {data.posts?.map((demo) => (
              <PostCard post={demo} key={demo.slug} />
            ))}
          </div>
        </div>
        <Divider />
        <div className="py-10">
          <H2 className="py-5 text-center">Projects</H2>
          <div className="md:grid md:grid-cols-2 md:gap-4 justify-items-center">
            {data.projects.map((resource) => (
              <ProjectCard project={resource} key={resource.name} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
