import { useLoaderData } from "@remix-run/react";
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
        <H1 className="py-5">Projects</H1>
        <div className="md:grid md:grid-cols-2 md:gap-4 pb-5">
          {posts.map((project: Project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
