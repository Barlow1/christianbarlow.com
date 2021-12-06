import { Link, useLoaderData } from "remix";
import { H1 } from "~/components/Typography";
import { getProjects, Project } from "~/utils/projects";

export const loader = () => {
  return getProjects();
};

export default function Projects() {
  const posts: Project[] = useLoaderData();
  return (
    <div className="remix__page">
      <div>
        <H1>Projects</H1>
        <ul className="list-disc pl-10">
          {posts.map((project: Project) => (
            <li key={project.url}>
              <a href={project.url}>{project.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
