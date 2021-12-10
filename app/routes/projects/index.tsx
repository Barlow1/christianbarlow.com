import { Link, useLoaderData } from "remix";
import ProjectCard from "~/components/ProjectCard";
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
        {posts.map((project: Project) => (
          <ProjectCard key={project.url} project={project} />
        ))}
      </div>
    </div>
  );
}
