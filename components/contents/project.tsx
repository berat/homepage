import React from "react";

import { ProjectDetailType, ProjectType } from "@/models/project";

import { updateViewPost } from "@/actions/common";
import { getProject, getSingleProject } from "@/actions/project";

import ProjectCard from "../cards/project";
import ProjectDetailView from "../view/project";

type Props = {
  data: ProjectType[];
};

type GroupedData = Record<string, ProjectType[]>;
const statusDescription = {
  "Şu an": "Bugünlerde çalıştığım projeler.",
  Gelecek: "Aklımda olup ama henüz geliştirmeye zamanım olmayan projeler.",
  Geçmiş: "Bir zamanlar bu projeleri yapmıştım, hey gidi günler!",
};

const ProjectList: React.FC<Props> = async ({ data }) => {
  const statusOrder = ["Şu an", "Gelecek", "Geçmiş"];

  const sortedGroups = data.reduce((acc: GroupedData, item: ProjectType) => {
    const { status } = item;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(item);
    return acc;
  }, {});

  const orderedGroups = statusOrder.reduce(
    (acc: GroupedData, status: string) => {
      if (sortedGroups[status]) {
        acc[status] = sortedGroups[status];
      }
      return acc;
    },
    {},
  );

  return Object.keys(orderedGroups)
    .sort((a: string, b: string) => Number(b) - Number(a))
    .map((key: string) => (
      <ul key={key} className="w-full my-4 block">
        <h3 className="text-2xl text-black font-semibold">{key}</h3>
        <span className="text-sm mb-3 inline-block text-slate-500 opacity-70">
          {statusDescription[key]}
        </span>
        <div className={"flex gap-4 flex-wrap"}>
          {orderedGroups[key].map((post: ProjectType) => (
            <ProjectCard key={post.id} post={post} />
          ))}
        </div>
      </ul>
    ));
};

const ProjectContent = async () => {
  const { data } = await getProject();

  return (
    <div className={"flex gap-4 flex-col pb-2 items-start "}>
      <ProjectList data={data} />
    </div>
  );
};

export const ProjectDetail = async ({ slug }: { slug: string }) => {
  const post = await getSingleProject(slug);

  if (typeof post === "boolean") {
    return null;
  }

  const updateView = async () => {
    "use server";
    if (process.env.NODE_ENV === "production") {
      const viewed = await updateViewPost(post.post.id, post.post.view + 1);
      return viewed;
    }
    return false;
  };

  return (
    <ProjectDetailView
      post={post as ProjectDetailType}
      updateView={updateView}
    />
  );
};

export default ProjectContent;
