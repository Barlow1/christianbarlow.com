import React, { ReactNode } from "react";
import { Project } from "~/utils/projects";
import Grid from "../Grid";
import { H4, Paragraph } from "../Typography";

const Tag = ({ name }: { name: string }) => {
  return (
    <div
      style={{ width: "fit-content" }}
      className="bg-alt rounded-md p-1 mr-2"
      key={name}
    >
      <span>{name}</span>
    </div>
  );
};

const TagList = ({ children }: { children: ReactNode }) => {
  return <div className="flex">{children}</div>;
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="relative border-2 border-secondary rounded-lg m-2 p-5">
      <H4>{project.name}</H4>
      {project.description && <Paragraph>{project.description}</Paragraph>}
      {project.libraries && (
        <TagList>
          {project.libraries.map((library) => {
            return <Tag name={library}></Tag>;
          })}
        </TagList>
      )}
      <div className="flex flex-wrap">
        {project.url && (
          <div className="pr-5">
            <a href={project.url}>View Site</a>
          </div>
        )}
        {project.repo && (
          <div>
            <a href={project.repo}>View Code</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
