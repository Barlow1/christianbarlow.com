import type { MetaFunction, LoaderFunction, LinksFunction } from "remix";
import { useLoaderData, json, Link } from "remix";
import { H2, Paragraph } from "~/components/Typography";
import { getPosts, Post } from "~/utils/posts.server";
import { getProjects } from "~/utils/projects";

type IndexData = {
  posts: Array<Post>;
  projects: Array<{ name: string; url: string }>;
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
    <div className="remix__page">
      <main>
        <img
          className="rounded-lg max-h-64 md:max-h-96 m-auto mb-5"
          aria-label="Head shot of me in a t-shirt"
          src="/me_at_the_plaza.png"
        />
        <H2>React, Typescript, UX and Serverless, Oh my!</H2>
        <Paragraph>
          Using code to fulfill my passions for fan engagement, student success, realty, and 3D
          virtual reality experiences. 
        </Paragraph>
      </main>
      <aside>
        <H2>Recommended Posts</H2>
        <ul className="list-disc pl-10">
          {data.posts.map((demo) => (
            <li key={demo.slug} className="remix__page__resource">
              <Link to={`posts/${demo.slug}`} prefetch="intent">
                {demo.title}
              </Link>
            </li>
          ))}
        </ul>
        <H2>Projects</H2>
        <ul className="list-disc pl-10">
          {data.projects.map((resource) => (
            <li key={resource.url} className="remix__page__resource">
              <a href={resource.url}>{resource.name}</a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
